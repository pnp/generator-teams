import { BotDeclaration<% if (staticTab) { %>, PreventIframe<% } %><% if (botCallingEnabled) { %>, BotCallingWebhook<% } %> } from "express-msteams-host";
import * as debug from "debug";
// import { DialogSet, DialogState } from "botbuilder-dialogs";
import { ActionTypes, BotFrameworkAdapter, CardFactory, ChannelAccount, MessageFactory, TeamInfo, TeamsActivityHandler, TeamsInfo, TurnContext, MemoryStorage, TeamsChannelAccount } from "botbuilder";<% if (bot) { %>
// import HelpDialog from "./dialogs/HelpDialog";<% } %><% if (bot) { %>
import WelcomeCard from "./dialogs/WelcomeDialog";<% } %><% if (botCallingEnabled) { %>
import express = require("express");<% } %>
const TextEncoder = require( "util" ).TextEncoder;
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
    constructor() {
        super();
        this.onMessage( async ( context: TurnContext, next ): Promise<void> => {
            TurnContext.removeRecipientMention( context.activity );
            const text = context.activity.text.trim().toLocaleLowerCase();
            if ( text.includes( "mention" ) ) {
                await this.mentionActivityAsync( context );
            } else if ( text.includes( "message" ) ) {
                await this.messageAllMembersAsync( context );
            } else if ( text.includes( "who" ) ) {
                await this.getSingleMember( context );
            } else if ( text.includes( "help" ) ) {
                await this.getHelp( context );
            } else {
                await this.sendWelcomeCard( context );
            }
            await next();
        } );

        this.onTeamsMembersAddedEvent( async ( membersAdded: ChannelAccount[], teamInfo: TeamInfo, context: TurnContext, next: () => Promise<void> ): Promise<void> => {
            let newMembers: string = "";
            membersAdded.forEach( ( account ) => {
                newMembers += !account.name ? "bot" : account.name + ", ";
            } );
            const name = !teamInfo ? "the chat" : teamInfo.name;
            const card = CardFactory.heroCard( "Account(s) added", `${newMembers} joined ${name}.` );
            const message = MessageFactory.attachment( card );
            await context.sendActivity( message );
            await this.sendWelcomeCard( context );
            await next();
        } );
    }

    public async sendWelcomeCard( context: TurnContext ): Promise<void> {
        const welcomeCard = CardFactory.adaptiveCard(WelcomeCard);
        await context.sendActivity({ attachments: [welcomeCard] });
    }

    public async getSingleMember( context: TurnContext ): Promise<void> {
        let member;
        try {
            member = await TeamsInfo.getMember( context, context.activity.from.id );
        } catch ( e ) {
            if ( e.code === "MemberNotFoundInConversation" ) {
                context.sendActivity( MessageFactory.text( "Member not found." ) );
                return;
            } else {
                console.log( e );
                throw e;
            }
        }
        const message = MessageFactory.text( `You are: ${member.name}` );
        await context.sendActivity( message );
    }

    public async mentionActivityAsync( context: TurnContext ): Promise<void> {
        const mention = {
            mentioned: context.activity.from,
            text: `<at>${new TextEncoder().encode( context.activity.from.name )}</at>`,
            type: "mention"
        };

        const replyActivity = MessageFactory.text( `Hi ${mention.text}` );
        replyActivity.entities = [mention];
        await context.sendActivity( replyActivity );
    }

    public async messageAllMembersAsync( context: TurnContext ): Promise<void> {
        const members = await this.getPagedMembers( context );

        members.forEach( async ( teamMember ) => {
            console.log( "a ", teamMember );
            const message = MessageFactory.text( `Hello ${teamMember.givenName} ${teamMember.surname}. I'm a Teams conversation bot.` );
            const ref = TurnContext.getConversationReference( context.activity );
            ref.user = teamMember;
            let botAdapter: BotFrameworkAdapter;
            botAdapter = context.adapter as BotFrameworkAdapter;
            await botAdapter.createConversation (ref,
                async ( t1 ) => {
                    const ref2 = TurnContext.getConversationReference( t1.activity );
                    await t1.adapter.continueConversation( ref2, async ( t2 ) => {
                        await t2.sendActivity( message );
                    } );
                } );
        } );

        await context.sendActivity( MessageFactory.text( "All messages have been sent." ) );
    }

    public async getPagedMembers( context: TurnContext ): Promise<any> {
        let continuationToken;
        const members:TeamsChannelAccount[] = [];
        do {
            const pagedMembers = await TeamsInfo.getPagedMembers( context, 100, continuationToken );
            continuationToken = pagedMembers.continuationToken;
            members.push( ...pagedMembers.members );
        } while ( continuationToken !== undefined );
        return members;
    }

    public async getHelp( context: TurnContext ): Promise<void> {
        const message = MessageFactory.text( `I'm terribly sorry, but my developer hasn't trained me to do anything yet 😂. Please refer to [this link](https://docs.microsoft.com/en-us/microsoftteams/platform/bots/what-are-bots) to see how to develop bots for Teams` );
        await context.sendActivity( message );
    }
}
