import * as request from 'request';
import * as teamBuilder from 'botbuilder-teams';
import { ConnectorDeclaration, IConnector } from 'express-msteams-host';
const JsonDB = require('node-json-db');

/**
 * The connector data interface
 */
interface I<%=connectorName%>Data {
    webhookUrl: string;
    user: string;
    appType: string;
    groupName: string;
    color: string;
    existing: boolean;
}

/**
 * Implementation of the "<%=connectorName%>Connector" Office 365 Connector
 */
@ConnectorDeclaration(
    '/api/connector/connect',
    '/api/connector/ping',
    'web/<%=connectorName%>Connect.ejs',
    '/<%=connectorName%>Connected.html'
)
export class <%=connectorName%> implements IConnector {
    private connectors: any;

    public constructor() {
        // Instantiate the node-json-db database (connectors.json)
        this.connectors = new JsonDB('connectors', true, false);
    }

    public Connect(body: any) {
        if (body.state === 'myAppsState') {
            this.connectors.push('/connectors[]', {
                webhookUrl: body.webhookUrl,
                user: body.user,
                appType: body.appType,
                groupName: body.groupName,
                existing: true,
                color: body.color
            });
        }
    }

    public Ping(): Promise <void>[] {
        // clean up connectors marked to be deleted
        try {
            this.connectors.push('/connectors',
                (<I<%=connectorName%>Data[]>this.connectors.getData('/connectors')).filter((c => {
                    return c.existing;
                })));
        } catch (error) {
            if (error.name && error.name == 'DataError') {
                // there's no registered connectors
                return [];
            }
            throw error;
        }
    
        // send pings to all subscribers
        return (<I<%=connectorName%>Data[]>this.connectors.getData('/connectors')).map((connector, index) => {
            return new Promise<void>((resolve, reject) => {
                let card = new teamBuilder.O365ConnectorCard();
                card.title('Sample connector');
                card.text(`This is a sample Office 365 Connector`);

                // set the theme to the user configured theme color
                card.themeColor(connector.color); 

                let section = new teamBuilder.O365ConnectorCardSection();
                section.activityTitle('Ping');
                section.activityText(`This is just a sample ping`);

                let fact = new teamBuilder.O365ConnectorCardFact();
                fact.name('Created by');
                fact.value(connector.user);
                section.facts([fact]);
                card.sections([section]);

                let action = new teamBuilder.O365ConnectorCardViewAction();
                action.name('Yo Teams');
                action.target('http://aka.ms/yoteams');
                card.potentialAction([action]);

                request({
                    method: 'POST',
                    uri: decodeURI(connector.webhookUrl),
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(card.toAttachment().content)
                }, (error: any, response: any, body: any) => {
                    if (error) {
                        reject(error)
                    } else {
                        // 410 - the user has removed the connector
                        if (response.statusCode == 410) {
                            this.connectors.push(`/connectors[${index}]/existing`, false);
                        }
                        resolve();
                    }
                })
            })
        })
    }
}