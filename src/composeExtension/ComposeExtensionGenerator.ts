import * as Generator from 'yeoman-generator';
import * as lodash from 'lodash';
import * as chalk from 'chalk';
import { GeneratorTeamsAppOptions } from './../app/GeneratorTeamsAppOptions';
import { Yotilities } from './../app/Yotilities';


let yosay = require('yosay');
let path = require('path');
let Guid = require('guid');


export class ComposeExtensionGenerator extends Generator {
    options: GeneratorTeamsAppOptions;

    public constructor(args: any, opts: any) {
        super(args, opts);
        opts.force = true;
        this.options = opts.options;
        this.desc('Adds a Compose Extension to a Microsoft Teams Apps project');
    }
    public prompting() {
        if (this.options.composeExtension) {
            return this.prompt(
                [
                    {
                        type: 'list',
                        name: 'composeExtensionType',
                        message: 'What type of Compose Extension would you like to create ',
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
                        name: 'composeExtensionId',
                        message: (answers) => {
                            var message = 'I need the Microsoft App ID for the Bot used by the Compose Extension. ';
                            return message;
                        },
                        default: (answers: any) => {
                            if (answers.composeExtensionType == 'existing') {
                                return this.options.botid;
                            }
                            return Guid.EMPTY;
                        },
                        validate: (input) => {
                            return Guid.isGuid(input);
                        }
                    },
                    {
                        type: 'input',
                        name: 'composeExtensionName',
                        message: 'What is the name of your Compose Extension command?',
                        validate: (input) => {
                            return input.length > 0;
                        },
                    },
                    {
                        type: 'input',
                        name: 'composeExtensionDescription',
                        message: 'Describe your Compose Extension command?',
                        validate: (input) => {
                            return input.length > 0;
                        }
                    }
                ]
            ).then((answers: any) => {
                this.options.composeExtensionId = answers.composeExtensionId;
                this.options.composeExtensionType = answers.composeExtensionType;
                this.options.composeExtensionTitle = answers.composeExtensionName;
                this.options.composeExtensionDescription = answers.composeExtensionDescription;
                this.options.composeExtensionName = lodash.camelCase(answers.composeExtensionName);
                if (answers.composeExtensionType == 'new') {
                    // we need to add the Bot, even though the users did not choose to create one
                    this.options.bot = true;
                    this.options.botid = answers.composeExtensionId;
                    this.options.botType = 'botframework';
                    this.options.botTitle = answers.composeExtensionName + ' Bot';
                    this.options.botName = lodash.camelCase(this.options.botTitle);
                }
            });
        }
    }
    public writing() {
        if (this.options.composeExtension) {
            let manifestPath = "src/manifest/manifest.json";
            var manifest: any = this.fs.readJSON(manifestPath);
            manifest.composeExtensions.push({
                botId: this.options.composeExtensionId,
                scopes: ["team", "personal"],
                commands: [
                    {
                        id: this.options.composeExtensionName,
                        title: this.options.composeExtensionTitle,
                        description: 'Add a clever description here',
                        initialRun: true,
                        parameters: [
                            {
                                name: 'parameter',
                                description: 'description of the parameter',
                                title: 'Parameter'
                            }
                        ]
                    }
                ]
            });
            this.fs.writeJSON(manifestPath, manifest);
        }
    }
}