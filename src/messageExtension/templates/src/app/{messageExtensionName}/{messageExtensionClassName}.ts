import * as debug from "debug";
import { IMessageExtension, PreventIframe } from "express-msteams-host";
import { TurnContext, CardFactory, InvokeResponse } from "botbuilder";
import { MessagingExtensionQuery, InvokeResponseTypeOf, InvokeResponseTyped, MessagingExtensionResponse } from "botbuilder-teams";


// Initialize debug logging module
const log = debug("msteams");

@PreventIframe("/<%=messageExtensionName%>/config.html")
export default class <%= messageExtensionClassName%> implements IMessageExtension {

    public async onQuery(context: TurnContext, query: MessagingExtensionQuery): Promise<InvokeResponseTyped<MessagingExtensionResponse>> {
        type R = InvokeResponseTypeOf<"onMessagingExtensionQuery">;
        const card = CardFactory.heroCard("Test", "Test", ["<%=host%>/assets/icon.png"]);

        if (query.parameters && query.parameters[0] && query.parameters[0].name === "initialRun") {
            // initial run

            return Promise.resolve({
                status: 200,
                body: {
                    composeExtension: {
                        type: "result",
                        attachmentLayout: "list",
                        attachments: [
                            card
                        ]
                    }
                }
            } as R);
        } else {
            // the rest
            return Promise.resolve({
                status: 200,
                body: {
                    composeExtension: {
                        type: "result",
                        attachmentLayout: "list",
                        attachments: [
                            card
                        ]
                    }
                }
            } as R);
        }
    }

    // this is used when canUpdateConfiguration is set to true
    public async onQuerySettingsUrl(context: TurnContext): Promise<InvokeResponseTyped<{ composeExtension: { type: string, suggestedActions: { actions: Array<{ type: string, title: string, value: string }> } } }>> {
        return Promise.resolve({
            status: 200,
            body: {
                composeExtension: {
                    type: "config",
                    suggestedActions: {
                        actions: [
                            {
                                type: "openApp",
                                title: "<%=messageExtensionTitle%> Configuration",
                                value: "<%= host %>/<%= messageExtensionName %>/config.html"
                            }
                        ]
                    }
                }
            }
        });
    }

    public async onSettingsUpdate(context: TurnContext): Promise<InvokeResponse> {
        // take care of the setting returned from the dialog, with the value stored in state
        const setting = context.activity.value.state;
        log(`New setting: ${setting}`);
        return Promise.resolve({ status: 200 });
    }

}
