import * as builder from 'botbuilder';

/**
 * Implementation for <%= botTitle %>
 */
export class <%= botName %> {
    public readonly Connector: builder.ChatConnector;
    private readonly universalBot: builder.UniversalBot;

    /**
     * The constructor
     * @param connector 
     */
    constructor(connector: builder.ChatConnector) {
        this.Connector = connector;
        this.universalBot = new builder.UniversalBot(this.Connector);

        // Install sendTyping as middleware
        this.universalBot.use({
            botbuilder: function(session, next) {
                session.sendTyping();
                next();
            }
        });
		
        // Add dialogs here
        this.universalBot.dialog('/', this.defaultDialog);
        this.universalBot.dialog('/help', this.helpDialog);
 
        // Control messages
        this.universalBot.on('conversationUpdate', this.convUpdateHandler);
   }

    /**
     * This is the default dialog used by the bot
     * @param session 
     */
    defaultDialog(session: builder.Session) {
        let text = <%= botName %>.extractTextFromMessage(session.message);
        if (text.startsWith('hello')) {
            session.send('Oh, hello to you as well!');
            session.endDialog();
            return;
        } else if (text.startsWith('help')) {
            session.beginDialog('/help');
            return
        }
        session.endDialog('I\'m terribly sorry, but my master hasn\'t trained me to do anything yet...');    
    }
    
    /**
     * This is the help dialog of the bot
     * @param session 
     */
    helpDialog(session: builder.Session) {
        session.send('I\'m just a friendly but rather stupid bot, and right now I don\'t have any valuable help for you!');
        session.endDialog();
    }
	
    /**
     * This is an example of a conversationUpdate event handler
     * @param activity 
     */
    convUpdateHandler(activity: any) {
        console.log("Conversation update")
    }

    /**
     * Extracts text only from messages, removing all entity references
     * @param message builder.IMessage
     */
    private static extractTextFromMessage(message: builder.IMessage): string {
        var s = message.text;
        message.entities.forEach((ent: any) => {
            s = s.replace(ent.text, '');
        });
        return s.trim();
    }
}