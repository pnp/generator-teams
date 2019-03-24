import * as request from "request";
import { Request } from "express";
import { ConnectorDeclaration, IConnector, PreventIframe } from "express-msteams-host";
import { CardFactory } from "botbuilder-core";
import JsonDB = require("node-json-db");
import * as debug from "debug";

const log = debug("msteams");

/**
 * The connector data interface
 */
interface I<%=connectorComponentName%>Data {
    webhookUrl: string;
    user: string;
    appType: string;
    groupName: string;
    color: string;
    existing: boolean;
}

/**
 * Implementation of the "<%=connectorComponentName%>Connector" Office 365 Connector
 */
@ConnectorDeclaration(
    "/api/connector/connect",
    "/api/connector/ping",
    "web/<%=connectorName%>Connect.ejs" // TODO: WHAT, EJS??
)
@PreventIframe("/<%=connectorName%>/config.html")
export class <%=connectorComponentName%> implements IConnector {
    private connectors: any;

    public constructor() {
        // Instantiate the node-json-db database (connectors.json)
        this.connectors = new JsonDB("connectors", true, false);
    }

    public Connect(req: Request) {
        if (req.body.state === "myAppsState") {
            this.connectors.push("/connectors[]", {
                appType: req.body.appType,
                color: req.body.color,
                existing: true,
                groupName: req.body.groupName,
                user: req.body.user,
                webhookUrl: req.body.webhookUrl
            });
        }
    }

    public Ping(req: Request): Array<Promise <void>> {
        // clean up connectors marked to be deleted
        try {
            this.connectors.push("/connectors",
                (this.connectors.getData("/connectors") as I<%=connectorComponentName%>Data[]).filter(((c) => {
                    return c.existing;
                })));
        } catch (error) {
            if (error.name && error.name === "DataError") {
                // there"s no registered connectors
                return [];
            }
            throw error;
        }

        // send pings to all subscribers
        return (this.connectors.getData("/connectors") as I<%=connectorComponentName%>Data[]).map((connector, index) => {
            return new Promise<void>((resolve, reject) => {
                // TODO: implement adaptive cards when supported
                const card = {
                    title: "Sample Connector",
                    text: "This is a sample Office 365 Connector",
                    sections: [
                        {
                            activityTitle: "Ping",
                            activityText: "Sample ping ",
                            activityImage: "https://ytd5.azurewebsites.net/assets/icon.png",
                            facts: [
                                {
                                    name: "Generator",
                                    value: "teams"
                                },
                                {
                                    name: "Created by",
                                    value: connector.user
                                }
                            ]
                        }
                    ],
                    potentialAction: [{
                        "@context": "http://schema.org",
                        "@type": "ViewAction",
                        "name": "Yo Teams",
                        "target": ["http://aka.ms/yoteams"]
                    }],
                };

                log(`Sending card to ${connector.webhookUrl}`);

                request({
                    method: "POST",
                    uri: decodeURI(connector.webhookUrl),
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(card)
                }, (error: any, response: any, body: any) => {
                    log(`Response from Connector endpoint is: ${response.statusCode}`);
                    if (error) {
                        reject(error);
                    } else {
                        // 410 - the user has removed the connector
                        if (response.statusCode === 410) {
                            this.connectors.push(`/connectors[${index}]/existing`, false);
                        }
                        resolve();
                    }
                });
            });
        });
    }
}

