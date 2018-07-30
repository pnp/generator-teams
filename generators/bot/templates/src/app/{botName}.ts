// Copyright (c) Wictor Wilén. All rights reserved.
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as builder from 'botbuilder';
import * as teamBuilder from 'botbuilder-teams';
import { BotDeclaration, IBot } from 'express-msteams-host';

/**
 * Implementation for <%= botTitle %>
 */
@BotDeclaration(
    '/api/messages',
    process.env.MICROSOFT_APP_ID,
    process.env.MICROSOFT_APP_PASSWORD)
export class <%= botName %> implements IBot {
    public readonly Connector: teamBuilder.TeamsChatConnector;
    private readonly universalBot: builder.UniversalBot;
    private inMemoryStorage: builder.IBotStorage;


    /**
     * The constructor
     * @param connector 
     */
    public constructor(connector: teamBuilder.TeamsChatConnector) {
        this.Connector = connector;
        this.inMemoryStorage = new builder.MemoryBotStorage();
        this.universalBot = new builder.UniversalBot(this.Connector).
            set('storage', this.inMemoryStorage); // Use the in-memory storage for state

        // Install sendTyping as middleware
        this.universalBot.use({
            botbuilder: (session, next) => {
                session.sendTyping();
                next();
            }
        });

        // Add dialogs here
        this.universalBot.dialog('/', this.defaultDialog);
        this.universalBot.dialog('/help', this.helpDialog);

        // Control messages
        this.universalBot.on('conversationUpdate', this.convUpdateHandler);

<% if(messageExtensionType == 'new' || messageExtensionType == 'existing') { %>
        // Message Extension
         this.Connector.onQuery('<%=messageExtensionName%>',
             (event: builder.IEvent, query: teamBuilder.ComposeExtensionQuery, callback: (err: Error, result: teamBuilder.IComposeExtensionResponse, statusCode: number) => void) => {
                if (query.parameters && query.parameters[0] && query.parameters[0].name === 'initialRun') {
                    // implement an MRU, kind of thing
                    let firstResponse = teamBuilder.ComposeExtensionResponse.result('list').attachments([
                        new builder.ThumbnailCard()
                            .title('Test')
                            .text('Test')
                            .images([new builder.CardImage().url('<%=host%>/assets/icon.png')])
                            .toAttachment()
                    ]).toResponse();
                    callback(<any>null, firstResponse, 200);
                }
                else {
                    // Return result response

                    let response = teamBuilder.ComposeExtensionResponse.result('list').attachments([
                        new builder.ThumbnailCard()
                            .title(`Test`)
                            .text('test')
                            .images([new builder.CardImage().url('<%=host%>/assets/icon.png')])
                            .toAttachment()
                    ]).toResponse();
                    callback(<any>null, response, 200);
                }
            });
        // this is used when canUpdateConfiguration is set to true 
        this.Connector.onQuerySettingsUrl(
            (event: builder.IEvent, query: teamBuilder.ComposeExtensionQuery, callback: (err: Error, result: teamBuilder.IComposeExtensionResponse, statusCode: number) => void) => {
                callback(<any>null, {
                    composeExtension: {
                        type: "config",
                        suggestedActions: {
                          actions: [
                            {
                              type: "openApp",
                              title: "<%=messageExtensionTitle%> Configuration",
                              value: '<%= host %>/<%= messageExtensionName %>Config.html'
                            }
                          ]
                        }
                      }
                }, 200);
            }
        )
        this.Connector.onSettingsUpdate(
            (event: builder.IEvent, query: teamBuilder.ComposeExtensionQuery, callback: (err: Error, result: teamBuilder.IComposeExtensionResponse, statusCode: number) => void) => {
                // take care of the setting returned from the dialog, with the value stored in state
                const setting = query.state;
                callback(<any>null, <any>null, 200);
            }
        )
<% } %>

   }

    /**
     * This is the default dialog used by the bot
     * @param session 
     */
    private defaultDialog(session: builder.Session) {
        const text = <%= botName %>.extractTextFromMessage(session.message).toLowerCase();
        if (text.startsWith('hello')) {
            session.send('Oh, hello to you as well!');
            session.endDialog();
            return;
        } else if (text.startsWith('help')) {
            session.beginDialog('/help');
            return;
        }
        session.endDialog('I\'m terribly sorry, but my master hasn\'t trained me to do anything yet...');    
    }
    
    /**
     * This is the help dialog of the bot
     * @param session 
     */
    private helpDialog(session: builder.Session) {
        session.send('I\'m just a friendly but rather stupid bot, and right now I don\'t have any valuable help for you!');
        session.endDialog();
    }

    /**
     * This is an example of a conversationUpdate event handler
     * @param activity 
     */
    private convUpdateHandler(activity: any) {
        console.log("Conversation update")
    }

    /**
     * Extracts text only from messages, removing all entity references
     * @param message builder.IMessage
     */
    private static extractTextFromMessage(message: builder.IMessage): string {
        var s = (message.text) ? message.text : '';
        if (message.entities) {
            message.entities.forEach((ent: any) => {
                s = s.replace(ent.text, '');
            })
        }
        return s.trim();
    }
}
