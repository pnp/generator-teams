// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { BaseManifestGenerator } from "../../BaseManifestGenerator";
import { TabManifestUpdater } from "../generator15/TabManifestUpdater";
import { BotManifestUpdater } from "../generator18/BotManifestUpdater";
import { ConnectorManifestUpdater } from "../generator13/ConnectorManifestUpdater";
import { MessageExtensionManifestUpdater } from "../generator15/MessageExtensionManifestUpdater";
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
        manifest["$schema"] = "https://developer.microsoft.com/en-us/json-schemas/teams/v1.8/MicrosoftTeams.schema.json";
        manifest.manifestVersion = "1.8";

        if (options.mpnId && options.mpnId.length > 0) {
            manifest.developer.mpnId = options.mpnId;
        }
        manifest.showLoadingIndicator = options.showLoadingIndicator;
        manifest.isFullScreen = options.isFullScreen;

        return manifest;
    }

    public supportsUpdateManifest(from: string): boolean {
        return from === "1.3" || from === "1.4" || from === "1.5" || from === "1.6" || from === "1.7";
    }

    public updateManifest(manifest: any, log?: (message?: string, context?: any) => void): any {
        if (manifest.manifestVersion === "1.3" ||
            manifest.manifestVersion === "1.4" ||
            manifest.manifestVersion === "1.5" ||
            manifest.manifestVersion === "1.6" ||
            manifest.manifestVersion === "1.7") {
            manifest["$schema"] = "https://developer.microsoft.com/en-us/json-schemas/teams/v1.8/MicrosoftTeams.schema.json";
            manifest.manifestVersion = "1.8";

            if (manifest.composeExtensions) {
                manifest.composeExtensions.forEach((composeExtension: { commands: { title: string; type: string; }[] }) => {
                    if (composeExtension.commands) {
                        composeExtension.commands.forEach((command: { title: string; type: string; }) => {
                            if (command.type === undefined) {
                                if (log) log(chalk.whiteBright(`Updating Message Extension "${command.title}" with the "type" property set to "query"`));
                                command.type = "query";
                            }
                        });
                    }
                });
            }
            return manifest;
        } else {
            throw "Unable to update manifest";
        }
    };
}
