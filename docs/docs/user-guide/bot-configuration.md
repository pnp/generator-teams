# Bots and Messaging Extension Configuration

If you are creating a bot or a messaging extension as a part of your Microsoft Teams app you also need to register an *Azure Bot* service in *Microsoft Azure*, before you configure and run your application.

## How to prepare and create resources in Microsoft Azure

* Create or use an existing Resource Group
* Add a new *Azure Bot* resource to the resource group
* Fill in the basic details
* In the *Type of App* you must choose *Multi-tenant* or *Single-tenant*. Using a *Managed Identity* is currently not supported
* After the resource has been created you need to update the *Messaging endpoint* in the Bot *Configuration*. It should contain the URL of where you are hosting your Teams Application and point to the `/api/messages`endpoint.Example: `https://0cbfd984d7b1.ngrok.io/api/messages`
* Ensure to configure the *Microsoft Teams* channel under *Channels*. If you're building a Messaging Extension for Outlook you also need to enable the *Outlook* channel.
* Under *Configuration* you should take a note of the *Microsoft App ID* and also click on *Manage* and under *Certificate & secrets* create a new secret.
* Copy the App ID and secret and update your `.env` file as follows:

```
MICROSOFT_APP_ID=<The Microsoft App Id for the bot>
MICROSOFT_APP_PASSWORD=<The secret you created>
```
