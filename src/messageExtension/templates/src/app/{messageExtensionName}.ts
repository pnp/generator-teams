import * as builder from 'botbuilder';
import * as teamBuilder from 'botbuilder-teams';
import * as debug from "debug";
import { IMessageExtension } from 'express-msteams-host';

// Initialize debug logging module
const log = debug("msteams");


export default class <%= messageExtensionName%> implements IMessageExtension {
    constructor(private bot: builder.UniversalBot) {

    }

    public onQuery(event: builder.IEvent, query: teamBuilder.ComposeExtensionQuery, callback: (err: Error, result: teamBuilder.IComposeExtensionResponse, statusCode: number) => void): void {

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
    }

    // this is used when canUpdateConfiguration is set to true 
    public onQuerySettingsUrl(event: builder.IEvent, query: teamBuilder.ComposeExtensionQuery, callback: (err: Error, result: teamBuilder.IComposeExtensionResponse, statusCode: number) => void): void {
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

    public onSettingsUpdate(event: builder.IEvent, query: teamBuilder.ComposeExtensionQuery, callback: (err: Error, result: teamBuilder.IComposeExtensionResponse, statusCode: number) => void): void {
        // take care of the setting returned from the dialog, with the value stored in state
        const setting = query.state;
        log(`New setting: ${setting}`)
        callback(<any>null, <any>null, 200);
    }

}