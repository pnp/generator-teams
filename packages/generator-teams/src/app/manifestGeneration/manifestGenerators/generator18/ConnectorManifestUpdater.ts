// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IManifestUpdater } from "../../IManifestUpdater";
import { GeneratorTeamsAppOptions } from "../../../GeneratorTeamsAppOptions";

export class ConnectorManifestUpdater implements IManifestUpdater {

    public updateManifest(manifest: any, options: GeneratorTeamsAppOptions): void {
        manifest.connectors.push({
            connectorId: "{{CONNECTOR_ID}}",
            configurationUrl: `https://{{PUBLIC_HOSTNAME}}/${options.connectorName}/config.html?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}`, 
            scopes: ["team"],
        });
    }
}