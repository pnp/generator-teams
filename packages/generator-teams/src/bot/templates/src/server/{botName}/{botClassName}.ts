import { BotDeclaration<% if (staticTab) { %>, PreventIframe<% } %><% if (botCallingEnabled) { %>, BotCallingWebhook<% } %> } from "express-msteams-host";
import * as debug from "debug";
import {
  CardFactory,
  ConversationState,
  UserState,
  TurnContext
} from "botbuilder";
import { DialogBot } from "./dialogBot";
import { MainDialog } from "./dialogs/mainDialog";
import WelcomeCard from "./cards/welcomeCard";

// Initialize debug logging module
const log = debug("msteams");
<% if (staticTab) { %>@PreventIframe("/<%=botName%>/<%=staticTabName%>.html")<% } %>
export class <%= botClassName %> extends DialogBot {
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
}
