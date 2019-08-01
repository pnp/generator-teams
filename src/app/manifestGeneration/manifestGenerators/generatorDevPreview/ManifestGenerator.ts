// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { BaseManifestGenerator } from "../../BaseManifestGenerator";
import { TabManifestUpdater } from "./TabManifestUpdater";
import { BotManifestUpdater } from "./BotManifestUpdater";
import { ConnectorManifestUpdater } from "./ConnectorManifestUpdater";
import { MessageExtensionManifestUpdater } from "./MessageExtensionManifestUpdater";
import { GeneratorTeamsAppOptions } from "../../../GeneratorTeamsAppOptions";
import { LocalizationManifestUpdater } from "../generator15/LocalizationManifestUpdater";

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

        if (options.mpnId && options.mpnId.length > 0) {
            manifest.developer.mpnId = options.mpnId;
        }

        return manifest;
    }

    public supportsUpdateManifest(from: string): boolean {
        return from === "1.3" || from === "1.4" || from == "1.5";
    }

    public updateManifest(manifest: any, log?: (message?: string, context?: any) => void): any {
        switch (manifest.manifestVersion) {
            case "1.3":
            case "1.4":
                manifest["$schema"] = "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json";
                manifest.manifestVersion = "devPreview";

                if (manifest.composeExtensions) {
                    manifest.composeExtensions.forEach((composeExtension: { commands: { title: string; type: string; }[] }) => {
                        if (composeExtension.commands) {
                            composeExtension.commands.forEach((command: { title: string; type: string; }) => {
                                if (command.type === undefined) {
                                    if (log) log(chalk.default.whiteBright(`Updating Message Extension "${command.title}" with the "type" property set to "query"`));
                                    command.type = "query";
                                }
                            });
                        }
                    });
                }
                return manifest;
            case "1.5":
                manifest["$schema"] = "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json";
                manifest.manifestVersion = "devPreview";
                return manifest;
            default:
                throw "Unable to update manifest";

        }
    };
}
