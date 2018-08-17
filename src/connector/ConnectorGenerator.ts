// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as Generator from 'yeoman-generator';
import * as lodash from 'lodash';
import * as chalk from 'chalk';
import { GeneratorTeamsAppOptions } from './../app/GeneratorTeamsAppOptions';
import { Yotilities } from './../app/Yotilities';
import * as ts from 'typescript';


let yosay = require('yosay');
let path = require('path');
let Guid = require('guid');


export class ConnectorGenerator extends Generator {
    options: GeneratorTeamsAppOptions;

    public constructor(args: any, opts: any) {
        super(args, opts);
        opts.force = true;
        this.options = opts.options;
        this.desc('Adds a Connector to a Microsoft Teams Apps project');
    }
    public prompting() {
        if (this.options.connector) {
            return this.prompt(
                [
                    {
                        type: 'list',
                        name: 'connectorType',
                        message: 'What type of Connector would you like to include?',
                        default: 'new',
                        choices: [
                            {
                                name: 'An already existing and running Connector (not hosted in this solution)',
                                value: 'existing'
                            },
                            {
                                name: 'A new Connector hosted in this solution',
                                value: 'new'
                            }
                        ]
                    },
                    {
                        type: 'input',
                        name: 'connectorId',
                        message: 'What is the Id of your Connector (found in the Connector Developer Portal)?',
                        default: (answers: any) => {
                            return Guid.EMPTY;
                        },
                        validate: (input) => {
                            return Guid.isGuid(input);
                        }
                    },
                    {
                        type: 'input',
                        name: 'connectorName',
                        message: 'What is the name of your Connector?',
                        default: this.options.title,
                        validate: (input) => {
                            return input.length > 0;
                        },
                        when: (answers) => answers.connectorType != 'existing'
                    },
                ]
            ).then((answers: any) => {
                this.options.connectorId = answers.connectorId;
                this.options.connectorType = answers.connectorType;
                this.options.connectorTitle = answers.connectorName;
                this.options.connectorName = lodash.camelCase(answers.connectorName);
                if (!this.options.connectorName.endsWith('Connector')) {
                    this.options.connectorName = this.options.connectorName + 'Connector';
                }
                this.options.reactComponents = true;
            });
        }
    }
    public writing() {
        if (this.options.connector) {
            if (this.options.connectorType != 'existing') {
                let templateFiles = [
                    "README-{connectorName}.md",
                    "src/app/{connectorName}.ts",
                    "src/app/web/{connectorName}.html",
                    "src/app/web/{connectorName}Connect.ejs",
                    "src/app/scripts/{connectorName}Connect.tsx",
                    "src/app/web/{connectorName}Connected.html"

                ];

                this.sourceRoot()

                templateFiles.forEach(t => {
                    this.fs.copyTpl(
                        this.templatePath(t),
                        Yotilities.fixFileNames(t, this.options),
                        this.options);
                });
            }

            let manifestPath = "src/manifest/manifest.json";
            var manifest: any = this.fs.readJSON(manifestPath);
            manifest.connectors.push({
                connectorId: this.options.connectorId,
                scopes: ["team"],
            });
            this.fs.writeJSON(manifestPath, manifest);

            Yotilities.addAdditionalDeps([
                ['@types/ejs', '2.6.0'],
                ['@types/node-json-db', '0.0.1'],
                ['ejs', '2.6.1'],
                ['node-json-db', '0.7.5'],
                ["msteams-ui-components-react", "^0.7.3"],
                ["react", "^16.1.0"],
                ["@types/react", "16.4.7"],
                ["react-dom", "^16.2.0"],
                ["file-loader", "1.1.11"],
                ["typestyle", "1.7.2"]
            ], this.fs);

            // update client.ts
            Yotilities.insertTsExportDeclaration(
                "src/app/scripts/client.ts",
                `./${this.options.connectorName}Connect`,
                `Automatically added for the ${this.options.connectorName} connector`,
                this.fs
            );

            Yotilities.insertTsExportDeclaration(
                "src/app/TeamsAppsComponents.ts",
                `./${this.options.connectorName}`,
                `Automatically added for the ${this.options.connectorName} connector`,
                this.fs
            );
        }
    }
}