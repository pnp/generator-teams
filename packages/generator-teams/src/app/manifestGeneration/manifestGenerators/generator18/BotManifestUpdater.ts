// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IManifestUpdater } from "../../IManifestUpdater";
import { GeneratorTeamsAppOptions } from "../../../GeneratorTeamsAppOptions";
import { v1 as uuid } from 'uuid';

export class BotManifestUpdater implements IManifestUpdater {

    public updateManifest(manifest: any, options: GeneratorTeamsAppOptions): void {
        var newbot: any = {
            botId: `{{${options.botidEnv}}}`,
            needsChannelSelector: true,
            isNotificationOnly: false,
            scopes: ["team", "personal", "groupchat"],
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
                contentUrl: `https://{{PUBLIC_HOSTNAME}}/${options.botName}/${options.staticTabName}.html`,
                scopes: ["personal"]
            });
        }

        if (options.botFilesEnabled) {
            newbot.supportsFiles = true;
        }

        if (options.botCallingEnabled) {
            newbot.supportsCalling = true;
            newbot.supportsVideo = true;
        }

        (<any[]>manifest.bots).push(newbot);
    }
}