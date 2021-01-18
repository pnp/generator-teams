// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { ManifestVersions } from "./ManifestVersions";

import { ManifestGenerator as ManifestGenerator18 } from "./manifestGenerators/generator18/ManifestGenerator";
import { ManifestGenerator as ManifestGeneratorDevPreview } from "./manifestGenerators/generatorDevPreview/ManifestGenerator";
import { BaseManifestGenerator } from "./BaseManifestGenerator";

export class ManifestGeneratorFactory {

    public static supportedManifestVersions = [
        {
            manifestVersion: ManifestVersions.v13,
            schemaUrl: "https://developer.microsoft.com/en-us/json-schemas/teams/v1.3/MicrosoftTeams.schema.json",
            manifestValue: "1.3",
            default: false,
            hide: true
        },
        {
            manifestVersion: ManifestVersions.v14,
            schemaUrl: "https://developer.microsoft.com/en-us/json-schemas/teams/v1.4/MicrosoftTeams.schema.json",
            manifestValue: "1.4",
            default: false,
            hide: true
        },
        {
            manifestVersion: ManifestVersions.v15,
            schemaUrl: "https://developer.microsoft.com/en-us/json-schemas/teams/v1.5/MicrosoftTeams.schema.json",
            manifestValue: "1.5",
            default: false,
            hide: true
        },
        {
            manifestVersion: ManifestVersions.v16,
            schemaUrl: "https://developer.microsoft.com/en-us/json-schemas/teams/v1.6/MicrosoftTeams.schema.json",
            manifestValue: "1.6",
            default: false,
            hide: true
        },
        {
            manifestVersion: ManifestVersions.v17,
            schemaUrl: "https://developer.microsoft.com/en-us/json-schemas/teams/v1.7/MicrosoftTeams.schema.json",
            manifestValue: "1.7",
            default: false,
            hide: true
        },
        {
            manifestVersion: ManifestVersions.v18,
            schemaUrl: "https://developer.microsoft.com/en-us/json-schemas/teams/v1.8/MicrosoftTeams.schema.json",
            manifestValue: "1.8",
            default: true,
            hide: false
        },
        {
            manifestVersion: ManifestVersions.devPreview,
            schemaUrl: "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json",
            manifestValue: "devPreview",
            default: false,
            hide: false
        }
    ]

    constructor() {

    }

    public static getManifestVersionFromValue(value: string): string {
        const versions = ManifestGeneratorFactory.supportedManifestVersions.filter((v) => {
            return v.manifestValue == value;
        });
        if (versions.length === 1) {
            return versions[0].manifestVersion;
        } else {
            throw new Error("Invalid manifest version.");
        }
    }

    public createManifestGenerator(manifestVersion: string): BaseManifestGenerator {
        if (manifestVersion == ManifestVersions.v18) {
            return new ManifestGenerator18();            
        } else if (manifestVersion == ManifestVersions.devPreview) {
            return new ManifestGeneratorDevPreview();
        }else {
            throw new Error("Invalid manifest version.");
        }
    }

    static isSchemaVersionValid(existingManifest: any): boolean {
        if (existingManifest) {
            let retval = false;
            this.supportedManifestVersions.forEach(manifestVersionItem => {
                if (existingManifest["$schema"] == manifestVersionItem.schemaUrl) {
                    retval = true;
                    return;
                }
            });
            return retval;
        } else {
            return true;
        }
    }
}
