export interface IManifestGenerator {
    getManifestFilePath(): string;
    updateTabManifest(manifest: any, parameters: Map<string, any>): void;
    updateBotManifest(manifest: any, parameters: Map<string, any>): void;
    updateMessageExtensionManifest(manifest: any, parameters: Map<string, any>): void;
    updateConnectorManifest(manifest: any, parameters: Map<string, any>): void;
}
