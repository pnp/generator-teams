// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IManifestUpdater } from "../../IManifestUpdater";
import { GeneratorTeamsAppOptions } from "../../../GeneratorTeamsAppOptions";
import { v4 as uuid } from 'uuid';
import { OFFICE_GUID } from "../../../../tab/TabGenerator";
import { parse } from "tldjs";

export class TabManifestUpdater implements IManifestUpdater {

    public updateManifest(manifest: any, options: GeneratorTeamsAppOptions): void {
        if (options.tabType == "static") {
            (<any[]>manifest.staticTabs).push({
                entityId: uuid(),
                name: options.tabTitle,
                contentUrl: `https://{{PUBLIC_HOSTNAME}}/${options.tabName}/?name={loginHint}&tenant={tid}&theme={theme}`,
                scopes: ["personal"]
            });
        }
        else if (options.tabType == "configurable") {
            const tab: any = {
                configurationUrl: `https://{{PUBLIC_HOSTNAME}}/${options.tabName}/config.html?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}`,
                canUpdateConfiguration: true,
                scopes: options.tabScopes
            };
            if (options.tabSharePoint) {
                tab.sharePointPreviewImage = `https://{{PUBLIC_HOSTNAME}}/assets/${options.tabName}-preview.png`;
                tab.supportedSharePointHosts = options.tabSharePointHosts;
            }
            (<any[]>manifest.configurableTabs).push(tab);
        } else if (options.tabType == "viva") {
            const tab: any = {
                entityId: uuid(),
                name: `Portals-${options.tabReactComponentName}`,
                contentUrl: options.vivaUrl + "/_layouts/15/teamslogon.aspx?spfx=true&dest=" + options.vivaUrl + "?app=portals",
                websiteUrl: options.vivaUrl,
                searchUrl: options.vivaUrl + "/_layouts/15/search.aspx?q={searchQuery}",
                scopes: [
                    "personal"
                ],
                supportedPlatform: [
                    "desktop"
                ]
            };
            (<any[]>manifest.staticTabs).push(tab);

            const domain = parse(options.vivaUrl as string);

            manifest.webApplicationInfo = {
                id: OFFICE_GUID,
                resource: `https://${domain.hostname as string}`
            };

            manifest.validDomains.push(
                domain.hostname as string,
                "*.login.microsoftonline.com",
                "*.sharepoint.com",
                "*.sharepoint-df.com",
                "spoppe-a.akamaihd.net",
                "spoprod-a.akamaihd.net",
                "resourceseng.blob.core.windows.net",
                "msft.spoppe.com");
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