// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IManifestUpdater } from "../../IManifestUpdater";
import { GeneratorTeamsAppOptions } from "../../../GeneratorTeamsAppOptions";

export class LocalizationManifestUpdater implements IManifestUpdater {

    public updateManifest(manifest: any, options: GeneratorTeamsAppOptions): void {
        if (!manifest.localizationInfo) {
            manifest.localizationInfo = {};
        }
        // Set the default language
        if (options.defaultLanguage) {
            manifest.localizationInfo.defaultLanguageTag = options.defaultLanguage;
        }
        // Additional language
        if (options.additionalLanguage) {
            const lang = {
                languageTag: options.additionalLanguage,
                file: `${options.additionalLanguage}.json`
            };
            if (!manifest.localizationInfo.additionalLanguages) {
                manifest.localizationInfo.additionalLanguages = [];
            }
            manifest.localizationInfo.additionalLanguages.push(lang);
        }
    }
}