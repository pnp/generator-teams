// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { BaseManifestGenerator } from "../../BaseManifestGenerator";
import { TabManifestUpdater } from "../generator18/TabManifestUpdater";
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
        return manifest;
    }

    public supportsUpdateManifest(from: string): boolean {
        return false;
    }

    public updateManifest(manifest: any, log?: (message?: string, context?: any) => void): any {
        throw "Unable to update manifest";
    };
}
