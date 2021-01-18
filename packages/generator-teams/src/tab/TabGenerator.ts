// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as Generator from 'yeoman-generator';
import * as lodash from 'lodash';
import { GeneratorTeamsAppOptions } from './../app/GeneratorTeamsAppOptions';
import { Yotilities } from './../app/Yotilities';
import { ManifestGeneratorFactory } from '../app/manifestGeneration/ManifestGeneratorFactory';
import validate = require('uuid-validate');
import EmptyGuid = require('../app/EmptyGuid');

export class TabGenerator extends Generator {
    options: GeneratorTeamsAppOptions;

    public constructor(args: any, opts: any) {
        super(args, opts);
        opts.force = true;
        this.options = opts.options;
        this.desc('Adds a tab to a Teams project.');
    }
    public prompting() {
        if (this.options.tab) {
            return this.prompt(
                [
                    {
                        type: 'input',
                        name: 'tabTitle',
                        message: 'Default Tab name? (max 16 characters)',
                        default: this.options.title + ' Tab',
                        validate: (input: string, answers: any) => {
                            if (!(/^[a-zA-Z].*/.test(input))) {
                                return "Must start with an alphabetical character";
                            }
                            let name = lodash.camelCase(input);
                            if (!name.endsWith(`Tab`)) {
                                name += `Tab`;
                            }
                            let className = name.charAt(0).toUpperCase() + name.slice(1);
                            if (this.fs.exists(`src/server/${name}/${className}.ts`)) {
                                return `There's already a file with the name of ${name}/${className}.ts`;
                            }
                            return input.length > 0 && input.length <= 16;
                        },
                    },
                    {
                        type: 'list',
                        name: 'tabType',
                        message: "What kind of Tab would you like to create?",
                        choices: [
                            {
                                name: "Configurable",
                                value: "configurable",
                                disabled: () => {
                                    // only one configurable tab is allowed
                                    return this.options.existingManifest && this.options.existingManifest.configurableTabs && this.options.existingManifest.configurableTabs.length != 0;
                                }
                            },
                            {
                                name: "Personal (static)",
                                value: "static",
                            }
                        ],
                        default: () => {
                            return this.options.existingManifest && this.options.existingManifest.configurableTabs && this.options.existingManifest.configurableTabs.length != 0 ? "static" : "configurable";
                        }
                    },
                    {
                        type: 'checkbox',
                        name: 'tabScopes',
                        message: "What scopes do you intend to use for your Tab?",
                        choices: [
                            {
                                name: "In a Team",
                                value: "team",
                                checked: true
                            },
                            {
                                name: "In a group chat",
                                value: "groupchat",
                                checked: false
                            }
                        ],
                        validate: (input: string, answers: any) => {
                            return input.length > 0;
                        },
                        when: (answers: any) => {
                            return answers.tabType == "configurable";
                        }
                    },
                    {
                        type: 'confirm',
                        name: 'tabSSO',
                        message: 'Do you require Azure AD Single-Sign-On support for the tab?',
                        default: true,
                        when: (answers: any) => {
                            return (this.options.existingManifest === undefined ||
                                    this.options.existingManifest && this.options.existingManifest.webApplicationInfo == undefined);
                        },
                    },
                    {
                        type: 'input',
                        name: 'tabSSOAppId',
                        message: 'What is the Application ID to associate with the SSO Tab?',
                        default: (answers: any) => {
                            return EmptyGuid.empty;
                        },
                        validate: (input: string) => {
                            return validate(input) || input == EmptyGuid.empty;
                        },
                        when: (answers: any) => answers.tabSSO,
                    },
                    {
                        type: 'input',
                        name: 'tabSSOAppUri',
                        message: 'What is the Application ID URI to associate with the SSO Tab?',
                        default: (answers: any) => {
                            return `api://${this.options.hostname}/${answers.tabSSOAppId}`;
                        },
                        validate: (input: string) => {
                            return input.length > 0;
                        },
                        when: (answers: any) => answers.tabSSO,
                    },
                    {
                        type: 'confirm',
                        name: 'tabSharePoint',
                        message: 'Do you want this tab to be available in SharePoint Online?',
                        default: true,
                        when: (answers: any) => {
                            return answers.tabType == "configurable"
                        },
                    },
                    {
                        type: 'checkbox',
                        name: 'tabSharePointHosts',
                        message: "How do you want your tab to be available in SharePoint?",
                        choices: [
                            {
                                name: "As a full page application",
                                value: "sharePointFullPage",
                                checked: true
                            },
                            {
                                name: "As a web part",
                                value: "sharePointWebPart",
                                checked: true
                            }
                        ],
                        when: (answers: any) => {
                            return answers.tabSharePoint;
                        }
                    },

                ]
            ).then((answers: any) => {
                this.options.tabTitle = answers.tabTitle;
                this.options.tabName = lodash.camelCase(this.options.tabTitle);
                this.options.tabUpperName = this.options.tabName.toLocaleUpperCase();
                this.options.tabType = answers.tabType;
                if (!this.options.tabName.endsWith('Tab')) {
                    this.options.tabName = this.options.tabName + 'Tab';
                }
                this.options.tabReactComponentName = this.options.tabName.charAt(0).toUpperCase() + this.options.tabName.slice(1);
                this.options.reactComponents = true;
                this.options.tabSharePointHosts = answers.tabSharePointHosts;
                this.options.tabSharePoint = answers.tabSharePoint;
                this.options.tabScopes = answers.tabScopes;
                this.options.tabSSO = answers.tabSSO;
                this.options.tabSSOAppId = answers.tabSSOAppId;
                this.options.tabSSOAppUri = answers.tabSSOAppUri;
            });
        }
    }
    public writing() {
        if (this.options.tab) {
            let templateFiles = [
                "src/client/{tabName}/{tabReactComponentName}.tsx",
                "src/server/{tabName}/{tabReactComponentName}.ts",
                "src/public/{tabName}/index.html",
            ];
            if (this.options.tabType == "configurable") {
                templateFiles.push(
                    "src/client/{tabName}/{tabReactComponentName}Config.tsx",
                    "src/client/{tabName}/{tabReactComponentName}Remove.tsx",
                    "src/public/{tabName}/remove.html",
                    "src/public/{tabName}/config.html",
                );
            }

            if (this.options.unitTestsEnabled) {
                templateFiles.push(
                    "src/client/{tabName}/__tests__/{tabReactComponentName}.spec.tsx",
                );
                if (this.options.tabType == "configurable") {
                    templateFiles.push(
                        "src/client/{tabName}/__tests__/{tabReactComponentName}Config.spec.tsx",
                        "src/client/{tabName}/__tests__/{tabReactComponentName}Remove.spec.tsx",
                    );
                }
            }

            this.sourceRoot()

            templateFiles.forEach(t => {
                this.fs.copyTpl(
                    this.templatePath(t),
                    Yotilities.fixFileNames(t, this.options),
                    this.options);
            });

            if (this.options.tabSharePoint) {
                const from = "src/public/assets/tab-preview.png";
                const to = "src/public/assets/{tabName}-preview.png";
                this.fs.copy(
                    this.templatePath(from),
                    Yotilities.fixFileNames(to, this.options),
                    {},
                    this.options);
            }


            // Update manifest
            const manifestGeneratorFactory = new ManifestGeneratorFactory();
            const manifestGenerator = manifestGeneratorFactory.createManifestGenerator(this.options.manifestVersion);
            let manifestPath = "src/manifest/manifest.json";
            var manifest: any = this.fs.readJSON(manifestPath);

            manifestGenerator.updateTabManifest(manifest, this.options);

            this.fs.writeJSON(manifestPath, manifest);

            Yotilities.addAdditionalDeps([
                ["@fluentui/react-northstar", "~0.51.0"],
                ["react", "^16.8.6"],
                ["react-dom", "^16.8.6"]
            ], this.fs);

            if (this.options.tabSSO) {
                Yotilities.addAdditionalDeps([
                    ["jwt-decode", "^3.0.0-beta.2"]
                ], this.fs);

                // update .env file
                Yotilities.addOrUpdateEnv(".env", `${this.options.tabUpperName}_APP_ID`, this.options.tabSSOAppId, this.fs);
                Yotilities.addOrUpdateEnv(".env", `${this.options.tabUpperName}_APP_URI`, this.options.tabSSOAppUri, this.fs);
            }

            Yotilities.addAdditionalDevDeps([
                ["@types/react", "16.8.10"],
                ["file-loader", "6.1.1"],
                ["typestyle", "2.0.1"]
            ], this.fs);

            // update client.ts
            Yotilities.insertTsExportDeclaration(
                "src/client/client.ts",
                `./${this.options.tabName}/${this.options.tabReactComponentName}`,
                `Automatically added for the ${this.options.tabName} tab`,
                this.fs
            );
            if (this.options.tabType == "configurable") {
                Yotilities.insertTsExportDeclaration(
                    "src/client/client.ts",
                    `./${this.options.tabName}/${this.options.tabReactComponentName}Config`,
                    undefined,
                    this.fs
                );
                Yotilities.insertTsExportDeclaration(
                    "src/client/client.ts",
                    `./${this.options.tabName}/${this.options.tabReactComponentName}Remove`,
                    undefined,
                    this.fs
                );
            }

            Yotilities.insertTsExportDeclaration(
                "src/server/TeamsAppsComponents.ts",
                `./${this.options.tabName}/${this.options.tabReactComponentName}`,
                `Automatically added for the ${this.options.tabName} tab`,
                this.fs
            );
        }
    }
}