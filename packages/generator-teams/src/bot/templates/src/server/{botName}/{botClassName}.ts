import { BotDeclaration<% if (staticTab) { %>, PreventIframe<% } %><% if (botCallingEnabled) { %>, BotCallingWebhook<% } %> } from "express-msteams-host";
import * as debug from "debug";
import { DialogSet, DialogState } from "botbuilder-dialogs";
import { StatePropertyAccessor, CardFactory, TurnContext, MemoryStorage, ConversationState, ActivityTypes, TeamsActivityHandler } from "botbuilder";
<% if (bot) { %>import HelpDialog from "./dialogs/HelpDialog";<% } %>
<% if (bot) { %>import WelcomeCard from "./dialogs/WelcomeDialog";<% } %>
<% if (botCallingEnabled) { %>import express = require("express");<% } %>
// Initialize debug logging module
const log = debug("msteams");

/**
 * Implementation for <%= botTitle %>
 */
@BotDeclaration(
    "/api/messages",
    new MemoryStorage(),
    // eslint-disable-next-line no-undef
    process.env.<%= botidEnv %>,
    // eslint-disable-next-line no-undef
    process.env.<%= botidEnvSecret %>)
<% if (staticTab) { %>@PreventIframe("/<%=botName%>/<%=staticTabName%>.html")<% } %>
export class <%= botClassName %> extends TeamsActivityHandler {
    private readonly conversationState: ConversationState;
    private readonly dialogs: DialogSet;
    private dialogState: StatePropertyAccessor<DialogState>;

    /**
     * The constructor
     * @param conversationState
     */
    public constructor(conversationState: ConversationState) {
        super();

        this.conversationState = conversationState;
        this.dialogState = conversationState.createProperty("dialogState");
        this.dialogs = new DialogSet(this.dialogState);
        <% if (bot) { %>this.dialogs.add(new HelpDialog("help"));<% } %><% if (bot) { %>
        // Set up the Activity processing
        this.onMessage(async (context: TurnContext): Promise<void> => {
            // TODO: add your own bot logic in here
            switch (context.activity.type) {
                case ActivityTypes.Message:
                    {
                        let text = TurnContext.removeRecipientMention(context.activity);
                        text = text.toLowerCase();
                        if (text.startsWith("hello")) {
                            await context.sendActivity("Oh, hello to you as well!");
                            return;
                        } else if (text.startsWith("help")) {
                            const dc = await this.dialogs.createContext(context);
                            await dc.beginDialog("help");
                        } else {
                            await context.sendActivity("I'm terribly sorry, but my developer hasn't trained me to do anything yet...");
                        }
                    }
                    break;
                default:
                    break;
            }
            // Save state changes
            return this.conversationState.saveChanges(context);
        });

        this.onConversationUpdate(async (context: TurnContext): Promise<void> => {
            if (context.activity.membersAdded && context.activity.membersAdded.length !== 0) {
                for (const idx in context.activity.membersAdded) {
                    if (context.activity.membersAdded[idx].id === context.activity.recipient.id) {
                        const welcomeCard = CardFactory.adaptiveCard(WelcomeCard);
                        await context.sendActivity({ attachments: [welcomeCard] });
                    }
                }
            }
        });

        this.onMessageReaction(async (context: TurnContext): Promise<void> => {
            const added = context.activity.reactionsAdded;
            if (added && added[0]) {
                await context.sendActivity({
                    textFormat: "xml",
                    text: `That was an interesting reaction (<b>${added[0].type}</b>)`
                });
            }
        });<% } %>
   }
<% if (botCallingEnabled) { %>
    /**
     * Webhook for incoming calls
     */
    @BotCallingWebhook("/api/calling")
    public async onIncomingCall(req: express.Request, res: express.Response) {
        log("Incoming call");
        // TODO: Implement authorization header validation

        // TODO: Add your management of calls (answer, reject etc.)

        // default, send an access denied
        res.sendStatus(401);
    }<% } %>
}
