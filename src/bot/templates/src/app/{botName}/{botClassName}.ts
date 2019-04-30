import { BotDeclaration, MessageExtensionDeclaration, IBot, PreventIframe<% if (botCallingEnabled) { %>, BotCallingWebhook<% } %> } from "express-msteams-host";
import * as debug from "debug";
import { DialogSet, DialogState } from "botbuilder-dialogs";
import { StatePropertyAccessor, CardFactory, TurnContext, MemoryStorage, ConversationState, ActivityTypes } from "botbuilder";
<% if (bot) { %>import HelpDialog from "./dialogs/HelpDialog";<% } %>
<% if (bot) { %>import WelcomeCard from "./dialogs/WelcomeDialog";<% } %>
import { TeamsContext, TeamsActivityProcessor } from "botbuilder-teams";
<% if (botCallingEnabled) { %>import express = require("express");<% } %>
// Initialize debug logging module
const log = debug("msteams");

/**
 * Implementation for <%= botTitle %>
 */
@BotDeclaration(
    "/api/messages",
    new MemoryStorage(),
    process.env.<%= botidEnv %>,
    process.env.<%= botidEnvSecret %>)
<% if (staticTab) { %>@PreventIframe("/<%=botName%>/<%=staticTabName%>.html")<% } %>
export class <%= botClassName %> implements IBot {
    private readonly conversationState: ConversationState;
    private readonly dialogs: DialogSet;
    private dialogState: StatePropertyAccessor<DialogState>;
    private readonly activityProc = new TeamsActivityProcessor();

    /**
     * The constructor
     * @param conversationState
     */
    public constructor(conversationState: ConversationState) {
        this.conversationState = conversationState;
        this.dialogState = conversationState.createProperty("dialogState");
        this.dialogs = new DialogSet(this.dialogState);
        <% if (bot) { %>this.dialogs.add(new HelpDialog("help"));<% } %>
<% if (bot) { %>
        // Set up the Activity processing
        
        this.activityProc.messageActivityHandler = {
            // Incoming messages
            onMessage: async (context: TurnContext): Promise<void> => {
                // get the Microsoft Teams context, will be undefined if not in Microsoft Teams
                const teamsContext: TeamsContext = TeamsContext.from(context);

                // TODO: add your own bot logic in here
                switch (context.activity.type) {
                    case ActivityTypes.Message:
                        const text = teamsContext ?
                            teamsContext.getActivityTextWithoutMentions().toLowerCase() :
                            context.activity.text;

                        if (text.startsWith("hello")) {
                            await context.sendActivity("Oh, hello to you as well!");
                            return;
                        }  else if (text.startsWith("help")) {
                            const dc = await this.dialogs.createContext(context);
                            await dc.beginDialog("help");
                        } else {
                            await context.sendActivity(`I\'m terribly sorry, but my master hasn\'t trained me to do anything yet...`);
                        }
                        break;
                    case ActivityTypes.ConversationUpdate:
                        log("Conversation update");
                        // Display a welcome card when the bot is added to a conversation
                        if (context.activity.membersAdded && context.activity.membersAdded.length !== 0) {
                            for (const idx in context.activity.membersAdded) {
                                if (context.activity.membersAdded[idx].id !== context.activity.recipient.id) {
                                    const welcomeCard = CardFactory.adaptiveCard(WelcomeCard);
                                    await context.sendActivity({ attachments: [welcomeCard] });
                                }
                            }
                        }
                        break;
                    default:
                        break;
                }

                // Save state changes
                return this.conversationState.saveChanges(context);
            }
        };

        // Message reactions in Microsoft Teams
        this.activityProc.messageReactionActivityHandler = {
            onMessageReaction: async (context: TurnContext): Promise<void> => {
                const added = context.activity.reactionsAdded;
                if (added && added[0]) {
                    await context.sendActivity({
                        textFormat: "xml",
                        text: `That was an interesting reaction (<b>${added[0].type}</b>)`
                    });
                }
            }
        };<% } %>
   }

   /**
    * The Bot Framework `onTurn` handlder.
    * The Microsoft Teams middleware for Bot Framework uses a custom activity processor (`TeamsActivityProcessor`)
    * which is configured in the constructor of this sample
    */
   public async onTurn(context: TurnContext): Promise<any> {
        // transfer the activity to the TeamsActivityProcessor
        await this.activityProc.processIncomingActivity(context);
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
