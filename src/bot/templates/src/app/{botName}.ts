import * as builder from 'botbuilder';
import * as teamBuilder from 'botbuilder-teams';
import { BotDeclaration, TeamsBot } from 'express-msteams-host';
import * as debug from "debug";

// Initialize debug logging module
const log = debug("msteams");

/**
 * Implementation for <%= botTitle %>
 */
@BotDeclaration(
    '/api/messages',
    process.env.MICROSOFT_APP_ID,
    process.env.MICROSOFT_APP_PASSWORD)
export class <%= botName %> extends TeamsBot {
    public readonly Connector: teamBuilder.TeamsChatConnector;
    private readonly universalBot: builder.UniversalBot;
    private inMemoryStorage: builder.IBotStorage;

    /**
     * The constructor
     * @param connector 
     */
    public constructor(connector: teamBuilder.TeamsChatConnector) {
        super(connector);
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


        // this row must follow the instantiation of the Message Extension object
        super.registerMessageExtensions();
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
        log("Conversation update")
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
