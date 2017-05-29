import * as request from 'request';

// Sample in-memory connector repository
interface IConnectorData {
    webhookUrl: string;
    user: string;
    appType: string;
    groupName: string;
}

export class <%=connectorName%>Connector {
    private connectors: IConnectorData[];
    public constructor() {
        this.connectors = [];

    }

    // See https://docs.microsoft.com/en-us/outlook/actionable-messages/connectors-dev-dashboard
    public Connect(queryString: any) {
        console.log(queryString)
        if (queryString.state === 'myAppsState') {
            this.connectors.push({
                webhookUrl: queryString.webhook_url,
                user: queryString.user_objectId,
                appType: queryString.app_type,
                groupName: queryString.group_name
            });
            console.log('registered')
        }
    }

    public Ping(): Promise<void>[] {
        return this.connectors.map(connector => {
            return new Promise<void>((resolve, reject) => {
                console.log('ping ' + JSON.stringify(connector))
                let body = {
                    "@type": "MessageCard",
                    "@context": "http://schema.org/extensions",
                    "title": "Sample connector",
                    "text": "This is a card from the <%=title%>",
                    "sections": [
                        {
                            "activityTitle": "Ping",
                            "activitySubtitle": "Manual ping",
                            "activityText": "This card is from a manual ping",
                            "activityImage": "<%=host%>/assets/card.png",
                            "facts": [
                                {
                                    "name": "Created by",
                                    "value": connector.user
                                }
                            ]
                        }
                    ],
                    "potentialAction": [{
                        "@context": "http://schema.org",
                        "@type": "ViewAction",
                        "name": "Go to site",
                        "target": ["<%=host%>"]
                    }],
                    "themeColor": "#FFFFFF"
                };
                console.log(JSON.stringify(body));
                request({
                    method: 'POST',
                    uri: decodeURI(connector.webhookUrl),
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(body)
                }, (error: any, response: any, body: any) => {
                    console.log(error)
                    console.log(response.statusCode)
                    if (error) {
                        reject(error)
                    } else {
                        resolve();
                    }
                })
            })
        })
    }
}