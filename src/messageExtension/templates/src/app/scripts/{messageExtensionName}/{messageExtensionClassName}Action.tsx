import * as React from "react";
import { Provider, Flex, Header, Input, Button, Text } from "@fluentui/react-northstar";
import TeamsBaseComponent, { ITeamsBaseComponentState } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";

/**
 * State for the <%=messageExtensionClassName%>Action React component
 */
export interface I<%=messageExtensionClassName%>ActionState extends ITeamsBaseComponentState {
    email: string;
}

/**
 * Properties for the <%=messageExtensionClassName%>Action React component
 */
export interface I<%=messageExtensionClassName%>ActionProps {

}

/**
 * Implementation of the <%= messageExtensionTitle %> Task Module page
 */
export class <%=messageExtensionClassName%>Action extends TeamsBaseComponent<I<%=messageExtensionClassName%>ActionProps, I<%=messageExtensionClassName%>ActionState> {

    public componentWillMount() {
        this.updateTheme(this.getQueryVariable("theme"));

        microsoftTeams.initialize();
        microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
        microsoftTeams.appInitialization.notifyAppLoaded();
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
                        <div>
                            <Header content="<%= messageExtensionTitle%> configuration" />
                            <Text content="Enter an e-mail address" />
                            <Input
                                placeholder="email@email.com"
                                fluid
                                clearable
                                value={this.state.email}
                                onChange={(e, data) => {
                                    if (data) {
                                        this.setState({
                                            email: data.value
                                        });
                                    }
                                }}
                                required />
                            <Button onClick={() => microsoftTeams.tasks.submitTask({
                                    email: this.state.email
                                })} primary>OK</Button>
                        </div>
                    </Flex.Item>
                </Flex>
            </Provider>
        );
    }
}
