// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as Generator from 'yeoman-generator';
import * as lodash from 'lodash';
import * as chalk from 'chalk';
import { GeneratorTeamTabOptions } from './../app/GeneratorTeamTabOptions';
import { Yotilities } from './../app/Yotilities';


let yosay = require('yosay');
let path = require('path');
let Guid = require('guid');

export class BotGenerator extends Generator {
    options: GeneratorTeamTabOptions;

    public constructor(args: any, opts: any) {
        super(args, opts);
        opts.force = true;
        this.options = opts.options === undefined ? new GeneratorTeamTabOptions() : opts.options;

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
                        name: 'pinnedTab',
                        message: 'Do you want to add a pinned tab to your bot?',
                    },
                    {
                        type: 'input',
                        name: 'pinnedTabName',
                        message: 'What is the title of your pinned tab for the bot? (max 16 characters)',
                        validate: (input) => {
                            return input.length > 0 && input.length <=16;
                        },
                        when: (answers: any) => {
                            return answers.pinnedTab;
                        },
                        default: (answers: any) => {
                            return answers.botname + ' Tab';
                        }
                    }
                ]
            ).then((answers: any) => {
                this.options.botid = answers.botid;
                this.options.pinnedTab = answers.pinnedTab;
                this.options.pinnedTabTitle = answers.pinnedTabName;
                this.options.pinnedTabName = lodash.camelCase(answers.pinnedTabName);
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
                mri: this.options.botid,
                pinnedTabs: (<any>[])
            };

            this.sourceRoot()
            let templateFiles = [];
            if (this.options.pinnedTab) {
                templateFiles.push(
                    "src/app/scripts/{pinnedTabName}Tab.ts",
                    "src/app/web/{pinnedTabName}Tab.html",
                );

                newbot.pinnedTabs.push({
                    id: Guid.raw(),
                    definitionId: Guid.raw(),
                    displayName: this.options.pinnedTabTitle,
                    url: `${this.options.host}/${this.options.pinnedTabName}Tab.html`,
                    website: `${this.options.host}/${this.options.pinnedTabName}Tab.html`,
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
            if (this.options.pinnedTab) {
                let clientTsPath = "src/app/scripts/client.ts";
                let clientTs = this.fs.read(clientTsPath);
                clientTs += `\n// Added by generator-teams`;
                clientTs += `\nexport * from './${this.options.pinnedTabName}Tab';`;
                clientTs += `\n`;
                this.fs.write(clientTsPath, clientTs);
            }
        }
    }
}