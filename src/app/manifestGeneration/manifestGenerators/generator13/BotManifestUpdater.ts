import { IManifestUpdater } from "../../IManifestUpdater";

let Guid = require('guid');

export class BotManifestUpdater implements IManifestUpdater {
    private botidEnv: string;
    private botName: string;
    private staticTab: boolean;
    private staticTabTitle: string;
    private staticTabName: string;

    constructor(botidEnv: string, botName: string, staticTab: boolean, staticTabTitle: string, staticTabName: string) {
        this.botidEnv = botidEnv;
        this.botName = botName;
        this.staticTab = staticTab;
        this.staticTabTitle = staticTabTitle;
        this.staticTabName = staticTabName;
    }

    updateManifest(manifest: any): void {
        var newbot = {
            botId: `{{${this.botidEnv}}}`,
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

        if (this.staticTab) {
            manifest.staticTabs.push({
                entityId: Guid.raw(),
                name: this.staticTabTitle,
                contentUrl: `https://{{HOSTNAME}}/${this.botName}/${this.staticTabName}.html`,
                scopes: ["personal"]
            });
        }

        (<any[]>manifest.bots).push(newbot);
    }
}