import * as React from "react";
import { Provider, Flex, Text, Button, Header } from "@fluentui/react-northstar";
import TeamsBaseComponent, { ITeamsBaseComponentState } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";<% if (tabSSO) { %>
import * as jwt from "jsonwebtoken";<% } %>
/**
 * State for the <%=tabName%>Tab React component
 */
export interface I<%=tabReactComponentName%>State extends ITeamsBaseComponentState {
    entityId?: string;<% if (tabSSO) { %>
    name?: string;
    error?: string;<% } %>
}

/**
 * Properties for the <%=tabName%>Tab React component
 */
export interface I<%=tabReactComponentName%>Props {

}

/**
 * Implementation of the <%= tabTitle %> content page
 */
export class <%=tabReactComponentName%> extends TeamsBaseComponent<I<%=tabReactComponentName%>Props, I<%=tabReactComponentName%>State> {

    public async componentWillMount() {
        this.updateTheme(this.getQueryVariable("theme"));

<% if (tabSSO) { %>
        microsoftTeams.initialize(() => {
            microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
            microsoftTeams.getContext((context) => {
                // Tell Teams to hide the loading indicator
                microsoftTeams.appInitialization.notifyAppLoaded();

                this.setState({
                    entityId: context.entityId
                });
                this.updateTheme(context.theme);

                microsoftTeams.authentication.getAuthToken({
                    successCallback: (token: string) => {
                        const decoded: { [key: string]: any; } = jwt.decode(token) as { [key: string]: any; };
                        this.setState({ name: decoded!.name });
                    },
                    failureCallback: (reason: string) => {
                        this.setState({ error: reason });
                    },
                    resources: [process.env.<%=tabUpperName%>_APP_URI as string]
                });
            });
        });<% } else { %>
        if (await this.inTeams()) {
            microsoftTeams.initialize();
            microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
            microsoftTeams.getContext((context) => {
                // Tell Teams to hide the loading indicator
                microsoftTeams.appInitialization.notifyAppLoaded();

                this.setState({
                    entityId: context.entityId
                });
                this.updateTheme(context.theme);
            });
        } else {
            this.setState({
                entityId: "This is not hosted in Microsoft Teams"
            });
        }<% } %>
    }

    /**
     * The render() method to create the UI of the tab
     */
    public render() {
        return (
            <Provider theme={this.state.theme}>
                <Flex fill={true} column styles={{
                    padding: ".8rem 0 .8rem .5rem"
                }}>
                    <Flex.Item>
                        <Header content="This is your tab" />
                    </Flex.Item>
                    <Flex.Item>
                        <div>
<% if (tabSSO) { %>
                            <div>
                                <Text content={`Hello ${this.state.name}`} />
                            </div>
                            {this.state.error && <div><Text content={`An SSO error occurred ${this.state.error}`} /></div>}
<% } else { %>
                            <div>
                                <Text content={this.state.entityId} />
                            </div>
<% } %>
                            <div>
                                <Button onClick={() => alert("It worked!")}>A sample button</Button>
                            </div>
                        </div>
                    </Flex.Item>
                    <Flex.Item styles={{
                        padding: ".8rem 0 .8rem .5rem"
                    }}>
                        <Text size="smaller" content="(C) Copyright <%=developer%>" />
                    </Flex.Item>
                </Flex>
            </Provider>
        );
    }
}
