// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

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
                        message: 'What type of Bot would you like to use?',
                        default: 'botframework',
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
                            var message = 'I need the Microsoft App ID for the Bot. ';
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
                            return 'About ' + (answers.bottype != 'existing' ? answers.botname : this.options.title);
                        }
                    }
                ]
            ).then((answers: any) => {
                this.options.botid = answers.botid;
                this.options.staticTab = answers.staticTab;
                this.options.staticTabTitle = answers.staticTabName;
                this.options.staticTabName = lodash.camelCase(answers.staticTabName);
                this.options.staticTabClassName = this.options.staticTabName.charAt(0).toUpperCase() + this.options.staticTabName.slice(1);
                this.options.botType = answers.bottype;
                this.options.botTitle = answers.botname;
                this.options.botName = lodash.camelCase(answers.botname);
                this.options.botClassName = this.options.botName.charAt(0).toUpperCase() + this.options.botName.slice(1);
                if (!this.options.botName.endsWith('Bot')) {
                    this.options.botName = this.options.botName + 'Bot';
                }
                if (this.options.staticTab) {
                    this.options.reactComponents = true;
                }
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
                commandLists: [
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
                    "src/app/scripts/{botName}/{staticTabName}Tab.tsx",
                    "src/app/web/{botName}/{staticTabName}.html",
                    "src/app/{botName}/dialogs/HelpDialog.ts",
                    "src/app/{botName}/dialogs/WelcomeCard.json",
                    "src/app/{botName}/dialogs/WelcomeDialog.ts"
                );

                manifest.staticTabs.push({
                    entityId: Guid.raw(),
                    name: this.options.staticTabTitle,
                    contentUrl: `https://{{HOSTNAME}}/${this.options.botName}/${this.options.staticTabName}.html`,
                    scopes: ["personal"]
                });

                Yotilities.addAdditionalDeps([
                    ["msteams-ui-components-react", "^0.8.1"],
                    ["react", "^16.8.4"],
                    ["@types/react", "16.8.8"],
                    ["react-dom", "^16.8.4"],
                    ["file-loader", "1.1.11"],
                    ["typestyle", "2.0.1"]
                ], this.fs);
            }
            (<any[]>manifest.bots).push(newbot);
            this.fs.writeJSON(manifestPath, manifest);

            if (this.options.botType != 'existing') {
                templateFiles.push('src/app/{botName}/bot.ts')
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
                Yotilities.insertTsExportDeclaration(
                    "src/app/scripts/client.ts",
                    `./${this.options.botName}/${this.options.staticTabName}Tab`,
                    `Automatically added for the ${this.options.staticTabName} bot tab`,
                    this.fs
                );
            }

            Yotilities.insertTsExportDeclaration(
                "src/app/TeamsAppsComponents.ts",
                `./${this.options.botName}/bot`,
                `Automatically added for the ${this.options.botName} bot`,
                this.fs
            );
        }
    }
}