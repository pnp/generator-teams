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
import { ManifestVersions } from '../app/manifestGeneration/ManifestVersions';
import { parse } from "tldjs";

export const OFFICE_GUID = "00000003-0000-0ff1-ce00-000000000000";

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
                                disabled: () => {
                                    // only 16 static tabs are allowed
                                    return this.options.existingManifest && this.options.existingManifest.configurableTabs && this.options.existingManifest.configurableTabs.length > 16;
                                }
                            },
                            {
                                name: "Viva Connections (static tab)",
                                value: "viva",
                                disabled: (answers) => {
                                    if (this.options.manifestVersion == ManifestVersions.v18) {
                                        return true; // don't enable for v1.8
                                    }
                                    if ((this.options.existingManifest &&
                                        this.options.existingManifest.webApplicationInfo)) {
                                        // don't enable Viva if there's SSO configured already
                                        return true;
                                    }
                                    // only 16 static tabs are allowed
                                    return this.options.existingManifest &&
                                        this.options.existingManifest.configurableTabs &&
                                        this.options.existingManifest.configurableTabs.length > 16;
                                }
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
                        default: false,
                        when: (answers: any) => {
                            if (answers.tabType == "viva") {
                                return false; // SSO will automatically be configured for Viva
                            }
                            return (this.options.existingManifest === undefined ||
                                this.options.existingManifest &&
                                this.options.existingManifest.webApplicationInfo == undefined);
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
                            return validate(input) || input.toLocaleLowerCase() == OFFICE_GUID || input == EmptyGuid.empty;
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
                        default: false,
                        when: (answers: any) => {
                            return answers.tabType == "configurable" && !answers.quickScaffolding
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
                    {
                        type: 'input',
                        name: 'vivaUrl',
                        message: 'Enter the link of the SharePoint portal that you want to pin in Teams.',
                        validate: (input: string) => {
                            const domain = parse(input);
                            if (!domain.isValid) {
                                return "Please enter a valid domain"
                            }
                            if (domain.domain !== "sharepoint.com") {
                                return "It has to be a sharepoint.com domain";
                            }
                            return true;
                        },
                        when: (answers: any) => answers.tabType == "viva",
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
                this.options.vivaUrl = answers.vivaUrl;
                if (this.options.vivaUrl && this.options.vivaUrl.endsWith("/")) {
                    this.options.vivaUrl = this.options.vivaUrl.substr(0, this.options.vivaUrl.length - 1);
                }
                if(this.options.tabType == "viva") {
                    this.options.isFullScreen = true;
                }
            });
        }
    }
    public writing() {
        if (this.options.tab) {
            if (this.options.tabType !== "viva") {
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
            }

            // Update manifest
            const manifestGeneratorFactory = new ManifestGeneratorFactory();
            const manifestGenerator = manifestGeneratorFactory.createManifestGenerator(this.options.manifestVersion);
            let manifestPath = "src/manifest/manifest.json";
            var manifest: any = this.fs.readJSON(manifestPath);

            manifestGenerator.updateTabManifest(manifest, this.options);

            this.fs.writeJSON(manifestPath, manifest);

            if (this.options.tabType !== "viva") {
                if (this.options.tabSSO) {
                    Yotilities.addAdditionalDeps([
                        ["jwt-decode", "^3.1.2"]
                    ], this.fs);

                    // update .env file
                    Yotilities.addOrUpdateEnv(".env", `TAB_APP_ID`, this.options.tabSSOAppId, this.fs);
                    Yotilities.addOrUpdateEnv(".env", `TAB_APP_URI`, this.options.tabSSOAppUri, this.fs);
                }

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
}