import * as Generator from 'yeoman-generator';
import * as lodash from 'lodash';
import * as chalk from 'chalk';
import { GeneratorTeamsAppOptions } from './../app/GeneratorTeamsAppOptions';
import { Yotilities } from './../app/Yotilities';


let yosay = require('yosay');
let path = require('path');
let Guid = require('guid');

export class BotGenerator extends Generator {
    options: GeneratorTeamsAppOptions;

    public constructor(args: any, opts: any) {
        super(args, opts);
        opts.force = true;
        this.options = opts.options === undefined ? new GeneratorTeamsAppOptions() : opts.options;

        this.desc('Adds a Bot to a Teams project.');
    }

    public prompting() {
        if (this.options.bot) {
            return this.prompt(

                [
                    {
                        type: 'list',
                        name: 'bottype',
                        message: 'Would type of bot would you like to use?',
                        default: 'existing',
                        choices: [
                            {
                                name: 'An already existing and running bot (not hosted in this solution)',
                                value: 'existing'
                            },
                            {
                                name: 'A new Bot Framework bot',
                                value: 'botframework'
                            }
                        ]
                    },
                    {
                        type: 'input',
                        name: 'botname',
                        message: 'What is the name of your bot?',
                        default: this.options.title + ' Bot',
                        validate: (input) => {
                            return input.length > 0;
                        },
                        when: (answers) => answers.bottype != 'existing'
                    },
                    {
                        type: 'input',
                        name: 'botid',
                        message: (answers) => {
                            var message = 'I need the Microsoft App ID for the bot. ';
                            if (answers.botTye == 'botframework') {
                                message += 'If you don\'t specify a value now, you will need to manually edit it later. ';
                            }
                            message += 'It\'s found in the Bot Framework portal (https://dev.botframework.com).';
                            return message;
                        },
                        default: (answers: any) => {
                            if (answers.bottype == 'botframework') {
                                return Guid.EMPTY;
                            }
                            return ''
                        },
                        validate: (input) => {
                            return Guid.isGuid(input);
                        }
                    },
                    {
                        type: 'confirm',
                        name: 'staticTab',
                        message: 'Do you want to add a static tab to your bot?',
                    },
                    {
                        type: 'input',
                        name: 'staticTabName',
                        message: 'What is the title of your static tab for the bot? (max 16 characters)',
                        validate: (input) => {
                            return input.length > 0 && input.length <= 16;
                        },
                        when: (answers: any) => {
                            return answers.staticTab;
                        },
                        default: (answers: any) => {
                            return 'About ' + answers.botname;
                        }
                    }
                ]
            ).then((answers: any) => {
                this.options.botid = answers.botid;
                this.options.staticTab = answers.staticTab;
                this.options.staticTabTitle = answers.staticTabName;
                this.options.staticTabName = lodash.camelCase(answers.staticTabName);
                this.options.botType = answers.bottype;
                this.options.botTitle = answers.botname;
                this.options.botName = lodash.camelCase(answers.botname);
            });
        }
    }

    public writing() {
        if (this.options.bot) {
            let manifestPath = "src/manifest/manifest.json";
            var manifest: any = this.fs.readJSON(manifestPath);
            var newbot = {
                botId: this.options.botid,
                needsChannelSelector: true,
                isNotificationOnly: false,
                scopes: ["team", "personal"],
                commandList: [
                    {
                        "scopes": [
                            "team",
                            "personal"
                        ],
                        "commands": [
                            {
                                "title": "Help",
                                "description": "Shows help information"
                            }
                        ]
                    }
                ]
            };

            this.sourceRoot()
            let templateFiles = [];
            if (this.options.staticTab) {
                templateFiles.push(
                    "src/app/scripts/{staticTabName}Tab.ts",
                    "src/app/web/{staticTabName}Tab.html",
                );

                manifest.staticTabs.push({
                    entityId: Guid.raw(),
                    name: this.options.staticTabTitle,
                    contentUrl: `${this.options.host}/${this.options.staticTabName}Tab.html`,
                    scopes:  ["personal"]
                });
            }
            (<any[]>manifest.bots).push(newbot);
            this.fs.writeJSON(manifestPath, manifest);

            if (this.options.botType != 'existing') {
                templateFiles.push('src/app/{botName}.ts')
                templateFiles.push('README-{botName}.md')
            }
            templateFiles.forEach(t => {
                this.fs.copyTpl(
                    this.templatePath(t),
                    Yotilities.fixFileNames(t, this.options),
                    this.options);
            });

            // update client.ts
            if (this.options.staticTab) {
                let clientTsPath = "src/app/scripts/client.ts";
                let clientTs = this.fs.read(clientTsPath);
                clientTs += `\n// Added by generator-teams`;
                clientTs += `\nexport * from './${this.options.staticTabName}Tab';`;
                clientTs += `\n`;
                this.fs.write(clientTsPath, clientTs);
            }
        }
    }
}