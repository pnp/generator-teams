import { IManifestUpdater } from "../../IManifestUpdater";


export class MessageExtensionManifestUpdater implements IManifestUpdater {
    private messageExtensionName: string;
    private messageExtensionTitle: string;
    private messageExtensionId: string;
    private existingManifest: boolean;

    constructor(messageExtensionName: string, messageExtensionTitle: string, messageExtensionId: string, existingManifest: boolean) {
        this.messageExtensionName = messageExtensionName;
        this.messageExtensionTitle = messageExtensionTitle;
        this.messageExtensionId = messageExtensionId;
        this.existingManifest = existingManifest;
    }

    updateManifest(manifest: any): void {
        if (!manifest.composeExtensions) {
            manifest.composeExtensions = [];
        }

        let command = {
            id: this.messageExtensionName,
            title: this.messageExtensionTitle,
            description: 'Add a clever description here',
            initialRun: true,
            parameters: [
                {
                    name: 'parameter',
                    description: 'Description of the parameter',
                    title: 'Parameter'
                }
            ]
        };

        let composeExtension = manifest.composeExtensions.find((ce: { botId: string; }) => ce.botId == this.messageExtensionId);
        if (this.existingManifest && composeExtension) {
            composeExtension.commands.push(command);
        } else {
            // no existing manifest
            manifest.composeExtensions.push({
                botId: this.messageExtensionId,
                canUpdateConfiguration: true,
                commands: [command]
            });
        }
    }
}