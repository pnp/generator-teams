// Copyright (c) Wictor Wilén. All rights reserved.
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as Generator from 'yeoman-generator';
import * as lodash from 'lodash';
import { GeneratorTeamsAppOptions } from './../app/GeneratorTeamsAppOptions';
import { Yotilities } from './../app/Yotilities';
import { ManifestGeneratorFactory } from '../app/manifestGeneration/ManifestGeneratorFactory';
import EmptyGuid = require('../app/EmptyGuid');
import validate = require('uuid-validate');
import * as semver from "semver";
import { ManifestVersions } from '../app/manifestGeneration/ManifestVersions';

export class BotGenerator extends Generator {
    options: GeneratorTeamsAppOptions;

    public constructor(args: any, opts: any) {
        super(args, opts);
        opts.force = true;
        this.options = opts.options === undefined ? new GeneratorTeamsAppOptions() : opts.options;

        this.desc('Adds a bot to a Teams project.');
    }


    public prompting() {
        const generatorPrefix = "[bot]";

        if (this.options.bot) {
            return this.prompt(

                [
                    {
                        type: 'list',
                        name: 'bottype',
                        message: 'What type of bot would you like to use?',
                        prefix: generatorPrefix,
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
                        prefix: generatorPrefix,
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
                            var message = 'What is the Microsoft App ID for the bot? ';
                            if (answers.bottype == 'botframework') {
                                message += 'If you don\'t specify a value now, you will need to manually edit it later. ';
                            }
                            message += 'It\'s found in the Bot Framework portal (https://dev.botframework.com).';
                            return message;
                        },
                        prefix: generatorPrefix,
                        default: (answers: any) => {
                            if (answers.bottype == 'botframework') {
                                return EmptyGuid.empty;
                            }
                            return ''
                        },
                        validate: (input) => {
                            return validate(input) || input == EmptyGuid.empty;
                        }
                    },
                    {
                        type: 'confirm',
                        name: 'staticTab',
                        message: 'Do you want to add a static tab to your bot?',
                        prefix: generatorPrefix,
                    },
                    {
                        type: 'input',
                        name: 'staticTabName',
                        message: 'What is the title of your static tab for the bot? (max 16 characters)',
                        prefix: generatorPrefix,
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
                        prefix: generatorPrefix,
                        default: false
                    },
                    {
                        type: 'confirm',
                        name: 'botCallingEnabled',
                        message: 'Do you want to include bot calling support?',
                        prefix: generatorPrefix,
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
                        "src/client/{botName}/{staticTabClassName}Tab.tsx",
                        "src/public/{botName}/{staticTabName}.html",
                    );

                    if (this.options.unitTestsEnabled) {
                        templateFiles.push(
                            "src/client/{botName}/__tests__/{staticTabClassName}Tab.spec.tsx"
                        );
                    }
                }
            }

            if (this.options.botType != 'existing') {
                templateFiles.push(
                    "README-{botName}.md",
                    "src/server/{botName}/{botClassName}.ts",
                    "src/server/{botName}/dialogBot.ts",
                    "src/server/{botName}/cards/welcomeCard.json",
                    "src/server/{botName}/cards/welcomeCard.ts"  
                );
                // add additional files if we have a full bot implementation
                if (this.options.bot) {
                    templateFiles.push(
                        "src/server/{botName}/dialogs/mainDialog.ts",
                        "src/server/{botName}/dialogs/helpDialog.ts",
                        "src/server/{botName}/dialogs/mentionUserDialog.ts",
                        "src/server/{botName}/dialogs/teamsInfoDialog.ts",
                    );
                    if (this.options.unitTestsEnabled) {
                        templateFiles.push(
                            "src/server/{botName}/dialogs/__tests__/HelpDialog.spec.ts"
                        );
                        Yotilities.addAdditionalDevDeps([
                            ["botbuilder-testing", "4.14.1"]
                        ], this.fs);
                    };

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
                    "src/client/client.ts",
                    `./${this.options.botName}/${this.options.staticTabClassName}Tab`,
                    `Automatically added for the ${this.options.staticTabName} bot tab`,
                    this.fs
                );
            }

            Yotilities.insertTsExportDeclaration(
                "src/server/TeamsAppsComponents.ts",
                `./${this.options.botName}/${this.options.botClassName}`,
                `Automatically added for the ${this.options.botName} bot`,
                this.fs
            );

            // update .env file
            Yotilities.addOrUpdateEnv(".env", this.options.botidEnv, this.options.botid, this.fs);
        }
    }
}
