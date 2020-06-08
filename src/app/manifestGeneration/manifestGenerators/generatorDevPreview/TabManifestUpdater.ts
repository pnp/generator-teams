// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IManifestUpdater } from "../../IManifestUpdater";
import { GeneratorTeamsAppOptions } from "../../../GeneratorTeamsAppOptions";

export class TabManifestUpdater implements IManifestUpdater {

    // Implementation notes - this is often just a copy of the latest released version
    public updateManifest(manifest: any, options: GeneratorTeamsAppOptions): void {
        if (options.tabType == "static") {
            (<any[]>manifest.staticTabs).push({
                entityId: "default-data",
                name: options.tabTitle,
                contentUrl: `https://{{HOSTNAME}}/${options.tabName}/?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}`,
                scopes: ["personal"]
            });
        }
        else {
            const tab: any = {
                configurationUrl: `https://{{HOSTNAME}}/${options.tabName}/config.html?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}`,
                canUpdateConfiguration: true,
                scopes: options.tabScopes
            };
            if (options.tabSharePoint) {
                tab.sharePointPreviewImage = `https://{{HOSTNAME}}/assets/${options.tabName}-preview.png`;
                tab.supportedSharePointHosts = options.tabSharePointHosts;
            }
            (<any[]>manifest.configurableTabs).push(tab);
        }
        if (options.tabSSO && manifest.webApplicationInfo === undefined) {
            // only add SSO the first time
            manifest.webApplicationInfo = {
                id: `{{${options.tabUpperName}_APP_ID}}`,
                resource: `{{${options.tabUpperName}_APP_URI}}`
            }
        }
    }
}