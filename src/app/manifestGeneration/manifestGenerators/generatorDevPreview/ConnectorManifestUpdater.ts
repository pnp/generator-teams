// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IManifestUpdater } from "../../IManifestUpdater";
import { GeneratorTeamsAppOptions } from "../../../GeneratorTeamsAppOptions";

export class ConnectorManifestUpdater implements IManifestUpdater {

    public updateManifest(manifest: any, options: GeneratorTeamsAppOptions): void {
        manifest.connectors.push({
            connectorId: "{{CONNECTOR_ID}}",
            configurationUrl: `https://{{HOSTNAME}}/${options.connectorName}/config.html`, 
            scopes: ["team"],
        });
    }
}