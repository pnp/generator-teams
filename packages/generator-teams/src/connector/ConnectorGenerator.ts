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


let yosay = require('yosay');
let path = require('path');


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
                        message: 'What is the ID of your Connector (found in the Connector Developer Portal)?',
                        default: (answers: any) => {
                            return EmptyGuid.empty;
                        },
                        validate: (input) => {
                            return validate(input) || input == EmptyGuid.empty;
                        }
                    },
                    {
                        type: 'input',
                        name: 'connectorName',
                        message: 'What is the name of your Connector?',
                        default: this.options.title,
                        validate: (input) => {
                            if(! (/^[a-zA-Z].*/.test(input))) {
                                return "Must start with an alphabetical character";
                            }
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
                this.options.connectorComponentName = this.options.connectorName.charAt(0).toUpperCase() + this.options.connectorName.slice(1);
                
                this.options.reactComponents = true;
            });
        }
    }
    public writing() {
        if (this.options.connector) {
            if (this.options.connectorType != 'existing') {
                let templateFiles = [
                    "README-{connectorName}.md",
                    "src/client/{connectorName}/{connectorComponentName}Config.tsx",
                    "src/public/{connectorName}/config.html",
                    "src/server/{connectorName}/{connectorComponentName}.ts",
                ];

                if(this.options.unitTestsEnabled) {
                    templateFiles.push(
                        "src/client/{connectorName}/__tests__/{connectorComponentName}Config.spec.tsx"
                    );
                }

                this.sourceRoot()

                templateFiles.forEach(t => {
                    this.fs.copyTpl(
                        this.templatePath(t),
                        Yotilities.fixFileNames(t, this.options),
                        this.options);
                });
            }

            const manifestGeneratorFactory = new ManifestGeneratorFactory();
            const manifestGenerator = manifestGeneratorFactory.createManifestGenerator(this.options.manifestVersion);
            let manifestPath = "src/manifest/manifest.json";
            var manifest: any = this.fs.readJSON(manifestPath);

            manifestGenerator.updateConnectorManifest(manifest, this.options);

            this.fs.writeJSON(manifestPath, manifest);


            Yotilities.addAdditionalDeps([
                ['node-json-db', '0.7.5'],
                ["@fluentui/react-northstar", "~0.51.0"],
                ["react", "^16.8.6"],
                ["react-dom", "^16.8.6"]
            ], this.fs);

            Yotilities.addAdditionalDevDeps([
                ['@types/node-json-db', '0.0.1'],
                ["@types/react", "16.8.10"],
                ["file-loader", "6.1.1"],
                ["typestyle", "2.0.1"]
            ], this.fs);

            // update client.ts
            Yotilities.insertTsExportDeclaration(
                "src/client/client.ts",
                `./${this.options.connectorName}/${this.options.connectorComponentName}Config`,
                `Automatically added for the ${this.options.connectorName} connector`,
                this.fs
            );

            Yotilities.insertTsExportDeclaration(
                "src/server/TeamsAppsComponents.ts",
                `./${this.options.connectorName}/${this.options.connectorComponentName}`,
                `Automatically added for the ${this.options.connectorName} connector`,
                this.fs
            );
        }
    }
}