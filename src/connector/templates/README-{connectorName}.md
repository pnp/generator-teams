# <%= connectorTitle %>

## How to configure the Connector in the Connectors Developer Dashboard

All Connectors has to be registered in the [Connectors Developer Dashboard](https://outlook.office.com/connectors/publish), which you have to log in to using a Microsoft Organizational Account, a Microsoft Account (MSA) will not work. If you're building an internal enterprise connector you only have to register it, and not publish it.

1. Choose to add a *New Connector*
2. Give the Connector a name (`<%= connectorTitle %>`), an image and a short and long description. You also need to add your company/Teams Apps website.
3. For *Landing pages* for Groups and Teams, add the following URL, which is used to connect and configure your Connector (`<%=host %>/<%=connectorName%>Connector.html`).
4. In the *Redirect URLs* box enter the Teams Apps website and append `/api/connector/connect` (`<%=host %>/api/connector/connect`).
5. Ensure that you at least enable the Connector for Microsoft Teams.
6. Finally accept the license terms and click *Save*.

## Connector implementation details

### Connector files and pages

* `./src/<%=connectorName%>Connector.ts` - implementation of the Connector that manages registering new subscriptions (`Connect()`) as well as a sample method to send a message to all subscribers (`Ping()`).
* `./src/web/<%=connectorName%>Connector.html` - this is the landing page that the users will end up on when adding a connector.
* `./src/web/<%=connectorName%>ConnectorConnect.ejs` - this is the page used by end-users to configure your Connector.

### Connector end-points

For the Connector you will have two generated end-points, defined in `./src/server.ts`.

* `/api/connector/connect` - this is the end-point that is connected to the `Connect` method of the Connector implementation and is used when registering a Connector. 
* `/api/connector/ping` - this is a test end-point to demonstrate how to invoke the Connector using a simple HTTP GET operation. It is highly recommended that you remove this end-point and implement your own logic for incvoking the connector.