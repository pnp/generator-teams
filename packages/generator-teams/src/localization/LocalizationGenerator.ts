// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as Generator from 'yeoman-generator';
import * as lodash from 'lodash';
import { GeneratorTeamsAppOptions } from './../app/GeneratorTeamsAppOptions';
import { Yotilities } from './../app/Yotilities';
import { ManifestGeneratorFactory } from '../app/manifestGeneration/ManifestGeneratorFactory';

export class LocalizationGenerator extends Generator {
    options: GeneratorTeamsAppOptions;

    public constructor(args: any, opts: any) {
        super(args, opts);
        opts.force = true;
        this.options = opts.options;
        this.desc('Adds localization support to a Teams project.');
    }
    public prompting() {
        if (this.options.localization) {
            return this.prompt(
                [
                    {
                        type: 'input',
                        name: 'defaultLanguage',
                        message: 'What is the default language tag? (format: en-us)',
                        default: "en-us",
                        validate: (input: string, answers: any) => {
                            return /^[A-Za-z0-9]{1,8}(-[A-Za-z0-9]{1,8}){0,2}$/.test(input); // same def as in the schema
                        },
                        when: (answers) => {
                            // only show if a new project and when an existing project does not already have a default language
                            return this.options.existingManifest === undefined ||
                                this.options.existingManifest.localizationInfo === undefined ||
                                this.options.existingManifest.localizationInfo && this.options.existingManifest.localizationInfo.defaultLanguageTag === undefined;
                        }
                    },
                    {
                        type: 'confirm',
                        name: 'addMoreLanguages',
                        message: 'Would you like to add a translation?',
                        default: true
                    },
                    {
                        type: 'input',
                        name: 'additionalLanguage',
                        message: "What is the language tag of the translation? (format: en-us)",
                        validate: (input: string, answers: any) => {
                            if (input == answers.defaultLanguage ||
                                this.options.existingManifest &&
                                this.options.existingManifest.localizationInfo &&
                                this.options.existingManifest.localizationInfo.defaultLanguageTag == input) {
                                return "Must be different from the default language";
                            }
                            if (this.options.existingManifest &&
                                this.options.existingManifest.localizationInfo &&
                                this.options.existingManifest.localizationInfo.additionalLanguages &&
                                this.options.existingManifest.localizationInfo.additionalLanguages.find((x: any) => x.languageTag == input)) {
                                return "Specified language already exists in the manifest";
                            }
                            return /^[A-Za-z0-9]{1,8}(-[A-Za-z0-9]{1,8}){0,2}$/.test(input); // same def as in the schema
                        },
                        when: (answers) => answers.addMoreLanguages
                    }
                ]
            ).then((answers: any) => {
                this.options.defaultLanguage = answers.defaultLanguage;
                this.options.additionalLanguage = answers.additionalLanguage;
            });
        }
    }
    public writing() {

        // Update manifest
        const manifestGeneratorFactory = new ManifestGeneratorFactory();
        const manifestGenerator = manifestGeneratorFactory.createManifestGenerator(this.options.manifestVersion);
        let manifestPath = "src/manifest/manifest.json";
        const manifest: any = this.fs.readJSON(manifestPath);
        manifestGenerator.updateLocalizationManifest(manifest, this.options);
        this.fs.writeJSON(manifestPath, manifest);

        // Create the localization file
        if (this.options.additionalLanguage) {
            let localizationData: any = {
                "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.5/MicrosoftTeams.Localization.schema.json",
            };
            // name
            localizationData["name.short"] = manifest.name.short;
            localizationData["name.full"] = manifest.name.full;
            // description
            localizationData["description.short"] = manifest.description.short;
            localizationData["description.full"] = manifest.description.full;
            // static tabs
            if (manifest.staticTabs) {
                manifest.staticTabs.forEach((tab: any, idx: number) => {
                    localizationData[`staticTabs[${idx}].name`] = tab.name;
                })
            }
            // bots
            if (manifest.bots) {
                manifest.bots.forEach((bot: any, idx: number) => {
                    if (bot.commandLists) {
                        bot.commandLists.forEach((cl: any, idx2: number) => {
                            if (cl.commands) {
                                cl.commands.forEach((c: any, idx3: number) => {
                                    localizationData[`bots[${idx}].commandLists[${idx2}].commands[${idx3}].title`] = c.title;
                                    localizationData[`bots[${idx}].commandLists[${idx2}].commands[${idx3}].description`] = c.description;
                                });
                            }
                        });
                    }
                })
            }
            // compose extensions
            if (manifest.composeExtensions) {
                manifest.composeExtensions.forEach((ce: any, idx: number) => {
                    if (ce.commands) {
                        ce.commands.forEach((c: any, idx2: number) => {
                            localizationData[`composeExtensions[${idx}].commands[${idx2}].title`] = c.title;
                            localizationData[`composeExtensions[${idx}].commands[${idx2}].description`] = c.description;
                            if (c.parameters) {
                                c.parameters.forEach((p: any, idx3: number) => {
                                    localizationData[`composeExtensions[${idx}].commands[${idx2}].parameters[${idx3}].title`] = p.title;
                                    localizationData[`composeExtensions[${idx}].commands[${idx2}].parameters[${idx3}].description`] = p.description;
                                    localizationData[`composeExtensions[${idx}].commands[${idx2}].parameters[${idx3}].value`] = p.value;
                                    if (p.choices) {
                                        p.choices.forEach((ch: any, idx4: number) => {
                                            localizationData[`composeExtensions[${idx}].commands[${idx2}].parameters[${idx3}].choices[${idx4}].title`] = ch.title;
                                        });
                                    }
                                });
                            }
                            if (c.taskInfo) {
                                localizationData[`composeExtensions[${idx}].commands[${idx2}].taskInfo.title`] = c.taskInfo.title;
                            }
                        });

                    }
                });
            }
            this.fs.writeJSON(`src/manifest/${this.options.additionalLanguage}.json`, localizationData);
        }

    }
}