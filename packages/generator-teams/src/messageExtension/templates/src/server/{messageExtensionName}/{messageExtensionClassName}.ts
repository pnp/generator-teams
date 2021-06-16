import * as debug from "debug";
import { PreventIframe } from "express-msteams-host";
import { TurnContext, CardFactory, MessagingExtensionQuery, MessagingExtensionResult<% if (messagingExtensionType =="action") { %>, TaskModuleRequest, TaskModuleContinueResponse<% } %><% if (messagingExtensionType =="queryLink") { %>, AppBasedLinkQuery<% } %> } from "botbuilder";
import { IMessagingExtensionMiddlewareProcessor } from "botbuilder-teams-messagingextensions";

// Initialize debug logging module
const log = debug("msteams");

@PreventIframe("/<%=messageExtensionName%>/config.html")
<% if (messagingExtensionType =="action") { %>@PreventIframe("/<%=messageExtensionName%>/action.html")
<% } %>export default class <%= messageExtensionClassName%> implements IMessagingExtensionMiddlewareProcessor {
<% if (messagingExtensionType =="queryLink") { %>
    public async onQueryLink(context: TurnContext, query: AppBasedLinkQuery): Promise<MessagingExtensionResult> {
        const card = CardFactory.adaptiveCard(
            {
                type: "AdaptiveCard",
                body: [
                    {
                        type: "TextBlock",
                        size: "Large",
                        text: query.url
                    },
                    {
                        type: "TextBlock",
                        text: "Navigate to the selected web site"
                    },
                    {
                        type: "Image",
                        url: `https://${process.env.PUBLIC_HOSTNAME}/assets/icon.png`
                    }
                ],
                actions: [
                    {
                        type: "Action.OpenUrl",
                        title: "Navigate",
                        url: query.url
                    }
                ],
                $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                version: "1.4"
            });
        const preview = {
            contentType: "application/vnd.microsoft.card.thumbnail",
            content: {
                title: query.url,
                text: query.url,
                images: [
                    {
                        url: `https://${process.env.PUBLIC_HOSTNAME}/assets/icon.png`
                    }
                ]
            }
        };

        return Promise.resolve({
            type: "result",
            attachmentLayout: "list",
            attachments: [
                { ...card, preview }
            ]
        } as MessagingExtensionResult);
    }
<% } %><% if (messagingExtensionType =="query") { %>
    public async onQuery(context: TurnContext, query: MessagingExtensionQuery): Promise<MessagingExtensionResult> {
        const card = CardFactory.adaptiveCard(
            {
                type: "AdaptiveCard",
                body: [
                    {
                        type: "TextBlock",
                        size: "Large",
                        text: "Headline"
                    },
                    {
                        type: "TextBlock",
                        text: "Description"
                    },
                    {
                        type: "Image",
                        url: `https://${process.env.PUBLIC_HOSTNAME}/assets/icon.png`
                    }
                ],
                actions: [
                    {
                        type: "Action.Submit",
                        title: "More details",
                        data: {
                            action: "moreDetails",
                            id: "1234-5678"
                        }
                    }
                ],
                $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                version: "1.4"
            });
        const preview = {
            contentType: "application/vnd.microsoft.card.thumbnail",
            content: {
                title: "Headline",
                text: "Description",
                images: [
                    {
                        url: `https://${process.env.PUBLIC_HOSTNAME}/assets/icon.png`
                    }
                ]
            }
        };

        if (query.parameters && query.parameters[0] && query.parameters[0].name === "initialRun") {
            // initial run

            return Promise.resolve({
                type: "result",
                attachmentLayout: "list",
                attachments: [
                    { ...card, preview }
                ]
            } as MessagingExtensionResult);
        } else {
            // the rest
            return Promise.resolve({
                type: "result",
                attachmentLayout: "list",
                attachments: [
                    { ...card, preview }
                ]
            } as MessagingExtensionResult);
        }
    }

    public async onCardButtonClicked(context: TurnContext, value: any): Promise<void> {
        // Handle the Action.Submit action on the adaptive card
        if (value.action === "moreDetails") {
            log(`I got this ${value.id}`);
        }
        return Promise.resolve();
    }
<% } %><% if (messagingExtensionType =="action" && messagingExtensionActionInputType != "static" || (messagingExtensionActionInputType == "static" && messagingExtensionActionResponseTypeConfig)) { %>
    public async onFetchTask(context: TurnContext, value: MessagingExtensionQuery): Promise<MessagingExtensionResult | TaskModuleContinueResponse> {
<% if(messagingExtensionActionResponseTypeConfig && messagingExtensionActionInputType == "static") { %>
        return Promise.resolve<MessagingExtensionResult>({
            type: "config", // use "config" or "auth" here
            suggestedActions: {
                actions: [
                    {
                        type: "openUrl",
                        value: `https://${process.env.PUBLIC_HOSTNAME}/<%= messageExtensionName %>/config.html?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}`,
                        title: "Configuration"
                    }
                ]
            }
        });
<% } %><% if(messagingExtensionActionResponseTypeConfig && messagingExtensionActionInputType != "static") { %>
        if (!value.state) { // TODO: implement logic when config is persisted
            return Promise.resolve<MessagingExtensionResult>({
                type: "config", // use "config" or "auth" here
                suggestedActions: {
                    actions: [
                        {
                            type: "openUrl",
                            value: `https://${process.env.PUBLIC_HOSTNAME}/<%= messageExtensionName %>/config.html?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}`,
                            title: "Configuration"
                        }
                    ]
                }
            });
        }
<% } %><% if(messagingExtensionActionInputType == "taskModule" ) { %>
        return Promise.resolve<TaskModuleContinueResponse>({
            type: "continue",
            value: {
                title: "Input form",
                url: `https://${process.env.PUBLIC_HOSTNAME}/<%= messageExtensionName %>/action.html?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}`,
                height: "medium"
            }
        });
<% } %><% if(messagingExtensionActionInputType == "adaptiveCard" ) { %>
        return Promise.resolve<TaskModuleContinueResponse>({
            type: "continue",
            value: {
                title: "Input form",
                card: CardFactory.adaptiveCard({
                    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                    type: "AdaptiveCard",
                    version: "1.4",
                    body: [
                        {
                            type: "TextBlock",
                            text: "Please enter an e-mail address"
                        },
                        {
                            type: "Input.Text",
                            id: "email",
                            placeholder: "somemail@example.com",
                            style: "email"
                        }
                    ],
                    actions: [
                        {
                            type: "Action.Submit",
                            title: "OK",
                            data: { id: "unique-id" }
                        }
                    ]
                })
            }
        });<% } %>
    }
<% } %><% if (messagingExtensionType =="action" ) { %>
    // handle action response in here
    // See documentation for `MessagingExtensionResult` for details
    public async onSubmitAction(context: TurnContext, value: TaskModuleRequest): Promise<MessagingExtensionResult> {
<% if (messagingExtensionActionResponseType =="message") { %>
        return Promise.resolve({
            type: "message",
            text: "You entered " + value.data.email
        } as MessagingExtensionResult);
    }
<% } %><% if (messagingExtensionActionResponseType =="adaptiveCard") { %>
        const card = CardFactory.adaptiveCard(
            {
                type: "AdaptiveCard",
                body: [
                    {
                        type: "TextBlock",
                        size: "Large",
                        text: value.data.email
                    },
                    {
                        type: "Image",
                        url: `https://randomuser.me/api/portraits/thumb/women/${Math.round(Math.random() * 100)}.jpg`
                    }
                ],
                $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                version: "1.4"
            });
        return Promise.resolve({
            type: "result",
            attachmentLayout: "list",
            attachments: [card]
        } as MessagingExtensionResult);
    }
<% } %><% } %><% if (messagingExtensionCanUpdateConfiguration) { %>
    // this is used when canUpdateConfiguration is set to true
    public async onQuerySettingsUrl(context: TurnContext): Promise<{ title: string, value: string }> {
        return Promise.resolve({
            title: "<%=messageExtensionTitle%> Configuration",
            value: `https://${process.env.PUBLIC_HOSTNAME}/<%= messageExtensionName %>/config.html?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}`
        });
    }

    public async onSettings(context: TurnContext): Promise<void> {
        // take care of the setting returned from the dialog, with the value stored in state
        const setting = context.activity.value.state;
        log(`New setting: ${setting}`);
        return Promise.resolve();
    }
<% } %>
}
