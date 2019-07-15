// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IManifestUpdater } from "../../IManifestUpdater";
import { GeneratorTeamsAppOptions } from "../../../GeneratorTeamsAppOptions";
import uuid = require('uuid/v1');

export class BotManifestUpdater implements IManifestUpdater {

    public updateManifest(manifest: any, options: GeneratorTeamsAppOptions): void {
        var newbot = {
            botId: `{{${options.botidEnv}}}`,
            needsChannelSelector: true,
            isNotificationOnly: false,
            scopes: ["team", "personal"],
            commandLists: [
                {
                    "scopes": [
                        "team",
                        "personal"
                    ],
                    "commands": [
                        {
                            "title": "Help",
                            "description": "Shows help information"
                        }
                    ]
                }
            ]
        };

        if (options.staticTab) {
            manifest.staticTabs.push({
                entityId: uuid(),
                name: options.staticTabTitle,
                contentUrl: `https://{{HOSTNAME}}/${options.botName}/${options.staticTabName}.html`,
                scopes: ["personal"]
            });
        }

        (<any[]>manifest.bots).push(newbot);
    }
}