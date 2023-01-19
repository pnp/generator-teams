// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { ManifestVersions } from "./ManifestVersions";

import { ManifestGenerator as ManifestGenerator18 } from "./manifestGenerators/generator18/ManifestGenerator";
import { ManifestGenerator as ManifestGenerator19 } from "./manifestGenerators/generator19/ManifestGenerator";
import { ManifestGenerator as ManifestGenerator110 } from "./manifestGenerators/generator110/ManifestGenerator";
import { ManifestGenerator as ManifestGenerator111 } from "./manifestGenerators/generator111/ManifestGenerator";
import { ManifestGenerator as ManifestGenerator112 } from "./manifestGenerators/generator112/ManifestGenerator";
import { ManifestGenerator as ManifestGenerator113 } from "./manifestGenerators/generator113/ManifestGenerator";
import { ManifestGenerator as ManifestGenerator114 } from "./manifestGenerators/generator114/ManifestGenerator";
import { ManifestGenerator as ManifestGenerator115 } from "./manifestGenerators/generator115/ManifestGenerator";
import { ManifestGenerator as ManifestGeneratorDevPreview } from "./manifestGenerators/generatorDevPreview/ManifestGenerator";
import { ManifestGenerator as ManifestGeneratorM365DevPreview } from "./manifestGenerators/generatorM365DevPreview/ManifestGenerator";
import { BaseManifestGenerator } from "./BaseManifestGenerator";

export class ManifestGeneratorFactory {

    public static supportedManifestVersions = [
        {
            manifestVersion: ManifestVersions.v18,
            schemaUrl: "https://developer.microsoft.com/en-us/json-schemas/teams/v1.8/MicrosoftTeams.schema.json",
            manifestValue: "1.8",
            default: false,
            hide: true
        },
        {
            manifestVersion: ManifestVersions.v19,
            schemaUrl: "https://developer.microsoft.com/en-us/json-schemas/teams/v1.9/MicrosoftTeams.schema.json",
            manifestValue: "1.9",
            default: false,
            hide: true
        },
        {
            manifestVersion: ManifestVersions.v110,
            schemaUrl: "https://developer.microsoft.com/en-us/json-schemas/teams/v1.10/MicrosoftTeams.schema.json",
            manifestValue: "1.10",
            default: false,
            hide: true
        },
        {
            manifestVersion: ManifestVersions.v111,
            schemaUrl: "https://developer.microsoft.com/en-us/json-schemas/teams/v1.11/MicrosoftTeams.schema.json",
            manifestValue: "1.11",
            default: false,
            hide: true
        },
        {
            manifestVersion: ManifestVersions.v112,
            schemaUrl: "https://developer.microsoft.com/en-us/json-schemas/teams/v1.12/MicrosoftTeams.schema.json",
            manifestValue: "1.12",
            default: false,
            hide: false
        },
        {
            manifestVersion: ManifestVersions.v113,
            schemaUrl: "https://developer.microsoft.com/en-us/json-schemas/teams/v1.13/MicrosoftTeams.schema.json",
            manifestValue: "1.13",
            default: true,
            hide: false,
            comment: "With support for extending Teams apps to other parts of the Microsoft 365 ecosystem"
        },
        {
            manifestVersion: ManifestVersions.v114,
            schemaUrl: "https://developer.microsoft.com/en-us/json-schemas/teams/v1.14/MicrosoftTeams.schema.json",
            manifestValue: "1.14",
            default: true,
            hide: false,
            comment: "With support for extending Teams apps to other parts of the Microsoft 365 ecosystem"
        },
        {
            manifestVersion: ManifestVersions.v115,
            schemaUrl: "https://developer.microsoft.com/en-us/json-schemas/teams/v1.15/MicrosoftTeams.schema.json",
            manifestValue: "1.15",
            default: true,
            hide: false,
            comment: "With support for extending Teams apps to other parts of the Microsoft 365 ecosystem"
        },
        {
            manifestVersion: ManifestVersions.devPreview,
            schemaUrl: "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json",
            manifestValue: "devPreview",
            default: false,
            hide: false,
            comment: "Developer preview"
        }
        ,
        {
            manifestVersion: ManifestVersions.m365DevPreview,
            schemaUrl: "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json",
            manifestValue: "m365DevPreview",
            default: false,
            hide: false,
            comment: "Developer preview for extended Teams apps"
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
        } else if (manifestVersion == ManifestVersions.v19) {
            return new ManifestGenerator19();
        } else if (manifestVersion == ManifestVersions.v110) {
            return new ManifestGenerator110();
        } else if (manifestVersion == ManifestVersions.v111) {
            return new ManifestGenerator111();
        } else if (manifestVersion == ManifestVersions.v112) {
            return new ManifestGenerator112();
        } else if (manifestVersion == ManifestVersions.v113) {
            return new ManifestGenerator113();
        } else if (manifestVersion == ManifestVersions.v114) {
            return new ManifestGenerator114();
        } else if (manifestVersion == ManifestVersions.v115) {
            return new ManifestGenerator115();
        } else if (manifestVersion == ManifestVersions.devPreview) {
            return new ManifestGeneratorDevPreview();
        } else if (manifestVersion == ManifestVersions.m365DevPreview) {
            return new ManifestGeneratorM365DevPreview();
        } else {
            throw new Error(`Invalid manifest version: ${manifestVersion}.`);
        }
    }

    static isSchemaVersionValid(existingManifest: any): boolean {
        if (existingManifest) {
            let retVal = false;
            this.supportedManifestVersions.forEach(manifestVersionItem => {
                if (existingManifest["$schema"] == manifestVersionItem.schemaUrl) {
                    retVal = true;
                    return;
                }
            });
            return retVal;
        } else {
            return true;
        }
    }
}
