// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as Generator from 'yeoman-generator';
import * as lodash from 'lodash';
import * as chalk from 'chalk';
import { GeneratorTeamsAppOptions } from './../app/GeneratorTeamsAppOptions';
import { Yotilities } from './../app/Yotilities';
import { ManifestGeneratorFactory } from '../app/manifestGeneration/ManifestGeneratorFactory';
import { stringify } from 'querystring';


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
                            if (!(/^[a-zA-Z].*/.test(input))) {
                                return "Must start with an alphabetical character";
                            }
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
                            if (!(/^[a-zA-Z].*/.test(input))) {
                                return "Must start with an alphabetical character";
                            }
                            return input.length > 0 && input.length <= 16;
                        },
                        when: (answers: any) => {
                            return answers.staticTab;
                        },
                        default: (answers: any) => {
                            return 'About ' + (answers.bottype != 'existing' ? answers.botname : this.options.title);
                        }
                    },
                    {
                        type: 'confirm',
                        name: 'botFilesEnabled',
                        message: 'Do you want to support file upload to the bot?',
                        when: (answers: any) => {
                            return this.options.manifestVersion != "1.3"; // Only available in 1.4+
                        },
                        default: false
                    },
                    {
                        type: 'confirm',
                        name: 'botCallingEnabled',
                        message: 'Do you want to include Bot Calling support?',
                        when: (answers: any) => {
                            return this.options.manifestVersion == "devPreview"; // Only available in devPreview for now
                        },
                        default: false
                    }
                ]
            ).then((answers: any) => {
                this.options.botid = answers.botid;
                this.options.staticTab = answers.staticTab;
                this.options.botCallingEnabled = answers.botCallingEnabled;
                this.options.botFilesEnabled = answers.botFilesEnabled;
                if (this.options.staticTab) {
                    this.options.staticTabTitle = answers.staticTabName;
                    this.options.staticTabName = lodash.camelCase(answers.staticTabName);
                    this.options.staticTabClassName = this.options.staticTabName.charAt(0).toUpperCase() + this.options.staticTabName.slice(1);
                }

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
        // This should run if we add a bot or just a messaging extension
        if (this.options.bot || this.options.messagingExtensionBot) {

            this.sourceRoot()
            let templateFiles = [];

            // only when we have a full bot implementation
            if (this.options.bot) {
                const manifestGeneratorFactory = new ManifestGeneratorFactory();
                const manifestGenerator = manifestGeneratorFactory.createManifestGenerator(this.options.manifestVersion);

                let manifestPath = "src/manifest/manifest.json";
                var manifest: any = this.fs.readJSON(manifestPath);

                manifestGenerator.updateBotManifest(manifest, this.options);

                this.fs.writeJSON(manifestPath, manifest);

                if (this.options.staticTab) {
                    templateFiles.push(
                        "src/app/scripts/{botName}/{staticTabClassName}Tab.tsx",
                        "src/app/web/{botName}/{staticTabName}.html",
                    );

                    if (this.options.unitTestsEnabled) {
                        templateFiles.push(
                            "src/app/scripts/{botName}/__tests__/{staticTabClassName}Tab.spec.tsx"
                        );
                    }

                    Yotilities.addAdditionalDeps([
                        ["msteams-ui-components-react", "^0.8.1"],
                        ["react", "^16.8.4"],
                        ["@types/react", "16.8.8"],
                        ["react-dom", "^16.8.4"],
                        ["file-loader", "1.1.11"],
                        ["typestyle", "2.0.1"]
                    ], this.fs);
                }
            }

            if (this.options.botType != 'existing') {
                templateFiles.push(
                    "README-{botName}.md",
                    "src/app/{botName}/{botClassName}.ts",
                );
                // add additional files if we have a full bot implementation
                if (this.options.bot) {
                    templateFiles.push(
                        "src/app/{botName}/dialogs/HelpDialog.ts",
                        "src/app/{botName}/dialogs/WelcomeCard.json",
                        "src/app/{botName}/dialogs/WelcomeDialog.ts"
                    );
                }
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
                    `./${this.options.botName}/${this.options.staticTabClassName}Tab`,
                    `Automatically added for the ${this.options.staticTabName} bot tab`,
                    this.fs
                );
            }

            Yotilities.insertTsExportDeclaration(
                "src/app/TeamsAppsComponents.ts",
                `./${this.options.botName}/${this.options.botClassName}`,
                `Automatically added for the ${this.options.botName} bot`,
                this.fs
            );

            // update .env file
            Yotilities.addOrUpdateEnv(".env", this.options.botidEnv, this.options.botid, this.fs);
        }
    }
}