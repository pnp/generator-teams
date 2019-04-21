import { IManifestGenerator } from "../../IManifestGenerator";
import { TabManifestUpdater } from "./TabManifestUpdater";
import { BotManifestUpdater } from "./BotManifestUpdater";
import { ConnectorManifestUpdater } from "./ConnectorManifestUpdater";
import { MessageExtensionManifestUpdater } from "./MessageExtensionManifestUpdater";

export class ManifestGenerator implements IManifestGenerator {
    updateBotManifest(manifest: any, parameters: Map<string, any>): void {
        const botidEnv = parameters.get("botidEnv");
        const botName = parameters.get("botName");
        const staticTab = parameters.get("staticTab");
        const staticTabTitle = parameters.get("staticTabTitle");
        const staticTabName = parameters.get("staticTabName");

        const updater = new BotManifestUpdater(botidEnv, botName, staticTab, staticTabTitle, staticTabName);
        updater.updateManifest(manifest);
    }
    
    updateMessageExtensionManifest(manifest: any, parameters: Map<string, any>): void {
        const messageExtensionName = parameters.get("messageExtensionName");
        const messageExtensionTitle = parameters.get("messageExtensionTitle");
        const messageExtensionId = parameters.get("messageExtensionId");
        const existingManifest = parameters.get("existingManifest");

        const updater = new MessageExtensionManifestUpdater(messageExtensionName, messageExtensionTitle, messageExtensionId, existingManifest);
        updater.updateManifest(manifest);
    }
    
    updateConnectorManifest(manifest: any, parameters: Map<string, any>): void {
        const connectorName = parameters.get("connectorName");
        const updater = new ConnectorManifestUpdater(connectorName);
        updater.updateManifest(manifest);
    }

    updateTabManifest(manifest: any, parameters: Map<string, any>): void {
        const tabName = parameters.get("tabName");
        const updater = new TabManifestUpdater(tabName);
        updater.updateManifest(manifest);
    }

    getManifestFilePath(): string {
        return "src/manifest/manifest-devPreview.json";
    }
}