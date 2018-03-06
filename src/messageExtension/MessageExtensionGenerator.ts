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


export class MessageExtensionGenerator extends Generator {
    options: GeneratorTeamsAppOptions;

    public constructor(args: any, opts: any) {
        super(args, opts);
        opts.force = true;
        this.options = opts.options;
        this.desc('Adds a Message Extension to a Microsoft Teams Apps project');
    }
    public prompting() {
        if (this.options.messageExtension) {
            return this.prompt(
                [
                    {
                        type: 'list',
                        name: 'messageExtensionType',
                        message: 'What type of Message Extension would you like to create ',
                        default: (answers: any) => {
                            if (this.options.botType == 'botframework') {
                                return 'existing';
                            } else {
                                return 'new';
                            }
                        },
                        choices: answers => {
                            var choices: any[] = [];
                            choices.push({
                                name: 'For a Bot hosted somewhere else',
                                value: 'external'
                            });
                            if (this.options.botType == 'botframework') {
                                choices.push({
                                    name: 'For the Bot created in this project',
                                    value: 'existing'
                                });
                            } else {
                                choices.push({
                                    name: 'For a new Bot',
                                    value: 'new'
                                });
                            }
                            return choices;
                        }
                    },
                    {
                        type: 'input',
                        name: 'messageExtensionId',
                        message: (answers) => {
                            var message = 'I need the Microsoft App ID for the Bot used by the Message Extension. ';
                            return message;
                        },
                        default: (answers: any) => {
                            return Guid.EMPTY;
                        },
                        validate: (input) => {
                            return Guid.isGuid(input);
                        },
                        when: (answers: any) => {
                            return answers.messageExtensionType !== 'existing';
                        },
                    },
                    {
                        type: 'input',
                        name: 'messageExtensionName',
                        message: 'What is the name of your Message Extension command?',
                        default: this.options.title + ' Message Extension',
                        validate: (input) => {
                            return input.length > 0;
                        },
                    },
                    {
                        type: 'input',
                        name: 'messageExtensionDescription',
                        message: 'Describe your Message Extension command?',
                        default: `Description of ${this.options.title} message extension`,
                        validate: (input) => {
                            return input.length > 0;
                        }
                    }
                ]
            ).then((answers: any) => {
                this.options.messageExtensionId = answers.messageExtensionId;
                this.options.messageExtensionType = answers.messageExtensionType;
                this.options.messageExtensionTitle = answers.messageExtensionName;
                this.options.messageExtensionDescription = answers.messageExtensionDescription;
                this.options.messageExtensionName = lodash.camelCase(answers.messageExtensionName);
                if (answers.messageExtensionType == 'new') {
                    // we need to add the Bot, even though the users did not choose to create one
                    this.options.bot = true;
                    this.options.botid = answers.messageExtensionId;
                    this.options.botType = 'botframework';
                    this.options.botTitle = answers.messageExtensionName + ' Bot';
                    this.options.botName = lodash.camelCase(this.options.botTitle);
                } else if (answers.messageExtensionType == 'existing') {
                    // reuse the bot id
                    this.options.messageExtensionId = this.options.botid;
                }
                this.options.reactComponents = true;
            });
        }
    }
    public writing() {
        if (this.options.messageExtension) {
            let manifestPath = "src/manifest/manifest.json";
            var manifest: any = this.fs.readJSON(manifestPath);
            if (!manifest.composeExtensions) {
                manifest.composeExtensions = [];
            }
            manifest.composeExtensions.push({
                botId: this.options.messageExtensionId,
                canUpdateConfiguration: true,
                commands: [
                    {
                        id: this.options.messageExtensionName,
                        title: this.options.messageExtensionTitle,
                        description: 'Add a clever description here',
                        initialRun: true,
                        parameters: [
                            {
                                name: 'parameter',
                                description: 'Description of the parameter',
                                title: 'Parameter'
                            }
                        ]
                    }
                ]
            });
            this.fs.writeJSON(manifestPath, manifest);

            let templateFiles = [];
            templateFiles.push(
                "src/app/scripts/{messageExtensionName}Config.tsx",
                "src/app/web/{messageExtensionName}Config.html",
            );
            templateFiles.forEach(t => {
                this.fs.copyTpl(
                    this.templatePath(t),
                    Yotilities.fixFileNames(t, this.options),
                    this.options);
            });

            Yotilities.addAdditionalDeps([
                ["msteams-ui-components-react", "^0.5.0"],
                ["react", "^16.1.0"],
                ["@types/react", "16.0.38"],
                ["react-dom", "^16.2.0"],
                ["file-loader", "1.1.6"],
                ["typestyle", "1.5.1"]
            ], this.fs);

            let clientTsPath = "src/app/scripts/client.ts";
            let clientTs = this.fs.read(clientTsPath);
            clientTs += `\n// Added by generator-teams`;
            clientTs += `\nexport * from './${this.options.messageExtensionName}Config';`;
            clientTs += `\n`;
            this.fs.write(clientTsPath, clientTs);

        }
    }
}