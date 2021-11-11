import { BotDeclaration<% if (staticTab) { %>, PreventIframe<% } %><% if (botCallingEnabled) { %>, BotCallingWebhook<% } %> } from "express-msteams-host";
import * as debug from "debug";
import { <% if (messageExtension) { %>TeamsActivityHandler, StatePropertyAccessor, ActivityTypes, <% } %>CardFactory, ConversationState, MemoryStorage, <% if (bot) { %>UserState,<% } %> TurnContext } from "botbuilder";
<% if (bot) { %>import { DialogBot } from "./dialogBot";
import { MainDialog } from "./dialogs/mainDialog";<% } %>
import WelcomeCard from "./cards/welcomeCard";
<% if (botCallingEnabled) { %>import express = require("express");
<% } %><% if (messageExtension) { %>import { DialogSet, DialogState } from "botbuilder-dialogs";<% } %>
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
<% if (bot) { %>export class <%= botClassName %> extends DialogBot {
    constructor(conversationState: ConversationState, userState: UserState) {
        super(conversationState, userState, new MainDialog());

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            if (membersAdded && membersAdded.length > 0) {
                for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                    if (membersAdded[cnt].id !== context.activity.recipient.id) {
                        await this.sendWelcomeCard( context );
                    }
                }
            }
            await next();
        });
    }

    public async sendWelcomeCard( context: TurnContext ): Promise<void> {
        const welcomeCard = CardFactory.adaptiveCard(WelcomeCard);
        await context.sendActivity({ attachments: [welcomeCard] });
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
}<% } %><% if (messageExtension && !bot) { %>export class <%= botClassName %> extends TeamsActivityHandler {
        
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
                                await context.sendActivity("Please refer to [this link](https://docs.microsoft.com/en-us/microsoftteams/platform/bots/what-are-bots) to see how to develop bots for Teams");
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
        }
    }<% } %>
