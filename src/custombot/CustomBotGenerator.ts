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


export class CustomBotGenerator extends Generator {
    options: GeneratorTeamsAppOptions;

    public constructor(args: any, opts: any) {
        super(args, opts);
        opts.force = true;
        this.options = opts.options;
        this.desc('Adds an outgoing webhook to a Teams project.');
    }
    public prompting() {
        if (this.options.customBot) {
            return this.prompt(
                [
                    {
                        type: 'input',
                        name: 'title',
                        message: 'Name of your outgoing webhook?',
                        default: this.options.title + ' Outgoing Webhook',
                        validate: (input) => {
                            if(! (/^[a-zA-Z].*/.test(input))) {
                                return "Must start with an alphabetical character";
                            }
                            return input.length > 0;
                        }
                    },
                ]
            ).then((answers: any) => {
                this.options.customBotTitle = answers.title;
                this.options.customBotName = lodash.camelCase(answers.title);
                this.options.customBotClassName = this.options.customBotName.charAt(0).toUpperCase() + this.options.customBotName.slice(1);
                if (!this.options.customBotName.endsWith('OutgoingWebhook')) {
                    this.options.customBotName = this.options.customBotName + 'OutgoingWebhook';
                }
            });
        }
    }
    public writing() {
        if (this.options.customBot) {
            let templateFiles = [
                "README-{customBotName}.md",
                "src/app/{customBotName}/{customBotClassName}.ts"
            ];

            this.sourceRoot()

            templateFiles.forEach(t => {
                this.fs.copyTpl(
                    this.templatePath(t),
                    Yotilities.fixFileNames(t, this.options),
                    this.options);
            });

            Yotilities.insertTsExportDeclaration(
                "src/app/TeamsAppsComponents.ts",
                `./${this.options.customBotName}/${this.options.customBotClassName}`,
                `Automatically added for the ${this.options.customBotName} outgoing webhook`,
                this.fs
            );
        }
    }
}