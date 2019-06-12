// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IManifestUpdater } from "../../IManifestUpdater";
import { GeneratorTeamsAppOptions } from "../../../GeneratorTeamsAppOptions";

export class TabManifestUpdater implements IManifestUpdater {
    public updateManifest(manifest: any, options: GeneratorTeamsAppOptions): void {
        (<any[]>manifest.configurableTabs).push({
            configurationUrl: `https://{{HOSTNAME}}/${options.tabName}/config.html`,
            canUpdateConfiguration: true,
            scopes: options.tabScopes
        });
    }
}