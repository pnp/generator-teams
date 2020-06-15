// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IManifestUpdater } from "../../IManifestUpdater";
import { GeneratorTeamsAppOptions } from "../../../GeneratorTeamsAppOptions";
import { v4 as uuid } from 'uuid';

export class TabManifestUpdater implements IManifestUpdater {
    public updateManifest(manifest: any, options: GeneratorTeamsAppOptions): void {
        if (options.tabType == "static") { 
            (<any[]>manifest.staticTabs).push({
                entityId: uuid(),
                name: options.tabTitle,
                contentUrl: `https://{{HOSTNAME}}/${options.tabName}/?name={loginHint}&tenant={tid}&theme={theme}`,
                scopes: ["personal"]
            });
        }
        else {
            (<any[]>manifest.configurableTabs).push({
                configurationUrl: `https://{{HOSTNAME}}/${options.tabName}/config.html?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}`,
                canUpdateConfiguration: true,
                scopes: options.tabScopes
            });
        }
    }
}