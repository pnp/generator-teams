# <%= botTitle %> - `<%= botName%>`

## How to register the bot in the Bot Framework portal

In order to create a bot you need to first register it in the [Azure portal](https://portal.azure.com/).

1. Choose to *Create a resource*, or alternatively go to an existing *resource group* and click *Add*
2. Search for *Bot channels registration* and then click *Create*
3. Give the bot a handle (ex:`<%= botName %>`), choose your subscription and resource group
4. For the messaging endpoint, use this: `<%= host %>/api/messages`
5. Choose to *Auto create Microsoft App ID and Password*
6. Click *Create*
7. Wait for Azure to finish its magic and when done choose to go to resource
8. On the bot page choose *Channels* and choose to add Microsoft Teams as a channel
9. Next, choose the *Settings* and click on *Manage* next to Microsoft App Id
10. In the Bot app portal, generate a new app password and store it securely - you will need this later

In order to have one on one chats with the bot you also need to publish it, or you need to search for the bot or start a chat with it using its App ID.

## How to configure the bot

The App Id and App Secret, generated during the registration, for the bot are read from the `MICROSOFT_APP_ID` and `MICROSOFT_APP_PASSWORD` environment variables. These can be configured in the Azure Web App under *Application Settings > App Settings*.

## How to test the bot locally

The bot can be tested and debugged locally using the `gulp serve --debug` command and using the _Microsoft Bot Framework Channel Emulator_. You should also update the App Id and Password in the `.env` file.

Another great way to test and debug bots running locally is to use [ngrok](https://ngrok.com) along with `gulp serve`. Ngrok allows you to create a secure tunnel from localhost to the Internet. Download and install ngrok, and then type `ngrok http 3007` at a command prompt. Ngrok will start, and will create a tunnel between localhost:3007 and https://########.ngrok.io (the ######## will change every time you start ngrok). Run `gulp serve` in another command prompt. Change your messaging endpoint in the Bot Framework portal to https://########.ngrok.io/api/messages. http://localhost:4040 will contain a log of all the traffic between your bot and Teams, and you can use a debugger such as Visual Studio Code to set breakpoints and examine variables.
