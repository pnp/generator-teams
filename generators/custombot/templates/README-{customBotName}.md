# <%= customBotTitle %> - `<%= customBotName%>`

## How to add the Outgoing Webhook to a Teams team

To add the <%= customBotTitle %> to a Microsoft Teams team, choose *View Team* and then choose the *Bots* tab. In the lower right corner click on *Create a outgoing webhook*. Then fill in the name, the URL (<%= host %>/api/webhook) and a description and click ok. Once the outgoing webhook is registered you will recieve a _Security token_. Save this token in a secure place for future use, and you wil not be able to retrieve it again (NOTE: validation of this token is yet not implemented).

## Notes

You might recieve an error the first time you send a message to the bot, if you just deployed the solution. Outgoing webhooks must answer within 5 seconds.
