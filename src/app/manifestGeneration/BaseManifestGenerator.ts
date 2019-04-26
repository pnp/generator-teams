import { GeneratorTeamsAppOptions } from "../GeneratorTeamsAppOptions";
import { IManifestUpdater } from "./IManifestUpdater";

// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export abstract class BaseManifestGenerator {
    protected tabUpdater: IManifestUpdater;
    protected botUpdater: IManifestUpdater;
    protected messageExtensionUpdater: IManifestUpdater;
    protected connectorUpdater: IManifestUpdater;

    public generateManifest(options: GeneratorTeamsAppOptions): any {
        return {
            "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.3/MicrosoftTeams.schema.json",
            "manifestVersion": "1.3",
            "id": options.id,
            "version": "0.0.1",
            "packageName": options.packageName,
            "developer": {
                "name": options.developer,
                "websiteUrl": "https://{{HOSTNAME}}",
                "privacyUrl": "https://{{HOSTNAME}}/privacy.html",
                "termsOfUseUrl": "https://{{HOSTNAME}}/tou.html"
            },
            "name": {
                "short": options.title,
                "full": options.title
            },
            "description": {
                "short": "TODO: add short description here",
                "full": "TODO: add full description here"
            },
            "icons": {
                "outline": "icon-outline.png",
                "color": "icon-color.png"
            },
            "accentColor": "#D85028",
            "configurableTabs": [],
            "staticTabs": [],
            "bots": [],
            "connectors": [],
            "composeExtensions": [],
            "permissions": ["identity", "messageTeamMembers"],
            "validDomains": [
                "{{HOSTNAME}}"
            ]
        }
    }

    public updateTabManifest(manifest: any, options: GeneratorTeamsAppOptions): void {
        this.tabUpdater.updateManifest(manifest, options);
    }
    public updateBotManifest(manifest: any, options: GeneratorTeamsAppOptions): void {
        this.botUpdater.updateManifest(manifest, options);
    }
    public updateMessageExtensionManifest(manifest: any, options: GeneratorTeamsAppOptions): void {
        this.messageExtensionUpdater.updateManifest(manifest, options);
    }
    public updateConnectorManifest(manifest: any, options: GeneratorTeamsAppOptions): void {
        this.connectorUpdater.updateManifest(manifest, options);
    }
}
