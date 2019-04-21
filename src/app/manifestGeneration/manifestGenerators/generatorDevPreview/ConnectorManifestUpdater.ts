import { IManifestUpdater } from "../../IManifestUpdater";


export class ConnectorManifestUpdater implements IManifestUpdater {
    private connectorName: string;

    constructor(connectorName: string) {
        this.connectorName = connectorName;
    }

    updateManifest(manifest: any): void {
        manifest.connectors.push({
            connectorId: "{{CONNECTOR_ID}}",
            configurationUrl: `https://{{HOSTNAME}}/${this.connectorName}/config.html`, 
            scopes: ["team"],
        });
    }
}