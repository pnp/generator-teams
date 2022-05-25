# Connector Configuration

The Yo Teams generator supports scaffolding [custom Office 365 Connectors](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/connectors-creating) as a part of the Teams Application.

## Configuration 

All Connectors has to be registered in the [Connectors Developer Dashboard](https://aka.ms/connectorsdashboard), which you have to log in to using a Microsoft Organizational Account, a Microsoft Account (MSA) will not work. If you're building an internal enterprise connector you only have to register it, and not publish it.

You need to specify the following details:

- **Connector Name**
- **Configuration Page** - must contain the full URL to the `/config.html` for your scaffolded connector.
- **Valid domains** --  must contain the domain name of your Teams App
- **Enable Actions on your Connector Cards** - must be set to *Yes*
- **Action URL** - must contain the full URL to the `/api/connector` endpoint

After creating or updating the Connector you must copy the Guid of the Connector (found in the URL when configuring the Connector) and paste that into your `.env` file:

```
CONNECTOR_ID=<your connector guid>
```

## Scaffolded files details

The following files will be scaffolded for a Connector

* `./src/server/<Connector>/<Connector>.ts` - implementation of the Connector that manages registering new subscriptions (`Connect()`) as well as a sample method to send a message to all subscribers (`Ping()`).
* `./src/public/<Connector>/config.html` - the configuration of the Connector .
* `./src/client/<Connector>Config.tsx` - React component of the configuration page page.

## Connector API end-points

For the Connector you will have two generated end-points, defined in `./src/server/server.ts`.

* `/api/connector/connect` - this is the end-point that is connected to the `Connect` method of the Connector implementation and is used when registering a Connector. 
* `/api/connector/ping` - this is a test end-point to demonstrate how to invoke the Connector using a simple HTTP GET operation. It is highly recommended that you remove this end-point and implement your own logic for invoking the connector.
