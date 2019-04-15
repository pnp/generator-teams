import * as debug from "debug";
import { PreventIframe } from "express-msteams-host";
import { TurnContext, CardFactory } from "botbuilder";
import { MessagingExtensionQuery, MessagingExtensionResult } from "botbuilder-teams";
import { IMessagingExtensionMiddlewareProcessor } from "botbuilder-teams-messagingextensions";


// Initialize debug logging module
const log = debug("msteams");

@PreventIframe("/<%=messageExtensionName%>/config.html")
export default class <%= messageExtensionClassName%> implements IMessagingExtensionMiddlewareProcessor {

    public async onQuery(context: TurnContext, query: MessagingExtensionQuery): Promise<MessagingExtensionResult> {
        const card = CardFactory.heroCard("Test", "Test", [`https://${process.env.HOSTNAME}/assets/icon.png`]);

        if (query.parameters && query.parameters[0] && query.parameters[0].name === "initialRun") {
            // initial run

            return Promise.resolve({
                type: "result",
                attachmentLayout: "grid",
                attachments: [
                    card
                ]
            } as MessagingExtensionResult);
        } else {
            // the rest
            return Promise.resolve({
                type: "result",
                attachmentLayout: "list",
                attachments: [
                    card
                ]
            } as MessagingExtensionResult);
        }
    }

    // this is used when canUpdateConfiguration is set to true
    public async onQuerySettingsUrl(context: TurnContext): Promise<{ title: string, value: string }> {
        return Promise.resolve({
            title: "<%=messageExtensionTitle%> Configuration",
            value: `https://${process.env.HOSTNAME}/<%= messageExtensionName %>/config.html`
        });
    }

    public async onSettings(context: TurnContext): Promise<void> {
        // take care of the setting returned from the dialog, with the value stored in state
        const setting = context.activity.value.state;
        log(`New setting: ${setting}`);
        return Promise.resolve();
    }

}
