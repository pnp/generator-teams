// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { BaseManifestGenerator } from "../../BaseManifestGenerator";
import { TabManifestUpdater } from "../generator19/TabManifestUpdater";
import { BotManifestUpdater } from "../generator18/BotManifestUpdater";
import { ConnectorManifestUpdater } from "../generator18/ConnectorManifestUpdater";
import { MessageExtensionManifestUpdater } from "../generator18/MessageExtensionManifestUpdater";
import { GeneratorTeamsAppOptions } from "../../../GeneratorTeamsAppOptions";
import { LocalizationManifestUpdater } from "../generator18/LocalizationManifestUpdater";

import * as chalk from 'chalk';

export class ManifestGenerator extends BaseManifestGenerator {
    constructor() {
        super();
        this.tabUpdater = new TabManifestUpdater();
        this.botUpdater = new BotManifestUpdater();
        this.connectorUpdater = new ConnectorManifestUpdater();
        this.messageExtensionUpdater = new MessageExtensionManifestUpdater();
        this.localizationUpdater = new LocalizationManifestUpdater();

    }

    public generateManifest(options: GeneratorTeamsAppOptions): any {
        const manifest = super.generateManifest(options);
        manifest["$schema"] = "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json";
        manifest.manifestVersion = "devPreview";

        return manifest;
    }

    public supportsUpdateManifest(from: string): boolean {
        return from === "1.8" || from === "1.9" || from === "1.10";
    }

    public updateManifest(manifest: any, log?: (message?: string, context?: any) => void): any {
        switch (manifest.manifestVersion) {
            case "1.8":
            case "1.9":
            case "1.10":
                manifest["$schema"] = "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json";
                manifest.manifestVersion = "devPreview";
                return manifest;
            default:
                throw "Unable to update manifest";

        }
    };
}
