// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { BaseManifestGenerator } from "../../BaseManifestGenerator";
import { TabManifestUpdater } from "./TabManifestUpdater";
import { BotManifestUpdater } from "./BotManifestUpdater";
import { ConnectorManifestUpdater } from "../generator13/ConnectorManifestUpdater"; // same as v1.3
import { MessageExtensionManifestUpdater } from "./MessageExtensionManifestUpdater";
import { GeneratorTeamsAppOptions } from "../../../GeneratorTeamsAppOptions";
import * as chalk from 'chalk';

export class ManifestGenerator extends BaseManifestGenerator {
    constructor() {
        super();
        this.tabUpdater = new TabManifestUpdater();
        this.botUpdater = new BotManifestUpdater();
        this.connectorUpdater = new ConnectorManifestUpdater();
        this.messageExtensionUpdater = new MessageExtensionManifestUpdater();
    }

    public generateManifest(options: GeneratorTeamsAppOptions): any {
        const manifest = super.generateManifest(options);
        manifest["$schema"] = "https://developer.microsoft.com/en-us/json-schemas/teams/v1.4/MicrosoftTeams.schema.json";
        manifest.manifestVersion = "1.4";
        return manifest;
    }

    public supportsUpdateManifest(from: string): boolean {
        return from === "1.3";
    }

    public updateManifest(manifest: any, log?: (message?: string, context?: any) => void): any {
        if (manifest.manifestVersion === "1.3") {
            manifest["$schema"] = "https://developer.microsoft.com/en-us/json-schemas/teams/v1.4/MicrosoftTeams.schema.json";
            manifest.manifestVersion = "1.4";

            if(manifest.composeExtensions) {
                manifest.composeExtensions.forEach((composeExtension: { commands: { title: string; type: string; }[] }) => {
                    if(composeExtension.commands) {
                        composeExtension.commands.forEach( (command: { title: string; type: string; }) => {
                            if(log) log(chalk.whiteBright(`Updating Message Extension "${command.title}" with the "type" property set to "query"`));
                            command.type = "query";
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
