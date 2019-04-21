import { IManifestUpdater } from "../../IManifestUpdater";


export class TabManifestUpdater implements IManifestUpdater {
    private tabName: string;

    constructor(tabName: string) {
        this.tabName = tabName;
    }

    updateManifest(manifest: any): void {
        (<any[]>manifest.configurableTabs).push({
            configurationUrl: `https://{{HOSTNAME}}/${this.tabName}/config.html`,
            canUpdateConfiguration: true,
            scopes: ["team", "groupchat"]
        });
    }
}