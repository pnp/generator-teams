# <%= botTitle %> - `<%= botName%>`

## How to register the bot in the Bot Framework portal

In order to use a custom bot you need to register it in the [Bot Framework portal](https://dev.botframework.com/). 

1. Choose to *Register a new bot*
2. Give the bot a name (`<%= botTitle %>`), a handle (`<%= botName %>`) and a description
3. For the messaging endpoint, use this: `<%= host %>/api/messages`
4. Click on the *Create Microsoft App ID and Password*, login to the App Dev portal and then click on the button to generate the App password. Save the generated password and the App ID to a secure location. Once done, click on the button to go back to the Bot Framework portal.
5. Click *Register*
6. On the next page, choose to add the Microsoft Teams channel

In order to have one on one chats with the bot you also need to publish it, or you need to search for the bot or start a chat with it using its App ID.

## How to configure the bot

The App Id and App Secret, generated during the registration, for the bot are read from the `MICROSOFT_APP_ID` and `MICROSOFT_APP_PASSWORD` environment variables. These can be configured in the Azure Web App under *Application Settings > App Settings*.

## How to test the bot locally

The bot can be tested and debugged locally using the `gulp serve --debug` command and using the _Microsoft Bot Framework Channel Emulator_. You should also update the App Id and Password in the `.env` file.

Another great way to test and debug bots running locally is to use [ngrok](https://ngrok.com) along with `gulp serve`. Ngrok allows you to create a secure tunnel from localhost to the Internet. Download and install ngrok, and then type `ngrok http 3007` at a command prompt. Ngrok will start, and will create a tunnel between localhost:3007 and https://########.ngrok.io (the ######## will change every time you start ngrok). Run `gulp serve` in another command prompt. Change your messaging endpoint in the Bot Framework portal to https://########.ngrok.io/api/messages. http://localhost:4040 will contain a log of all the traffic between your bot and Teams, and you can use a debugger such as Visual Studio Code to set breakpoints and examine variables.
