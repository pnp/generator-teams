import * as React from "react";
import { Provider, Flex, Header, Checkbox, Button } from "@fluentui/react-northstar";
import TeamsBaseComponent, { ITeamsBaseComponentState } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";

/**
 * State for the <%=messageExtensionClassName%>Config React component
 */
export interface I<%=messageExtensionClassName%>ConfigState extends ITeamsBaseComponentState {
    onOrOff: boolean;
}

/**
 * Properties for the <%=messageExtensionClassName%>Config React component
 */
export interface I<%=messageExtensionClassName%>ConfigProps {

}

/**
 * Implementation of the <%= messageExtensionTitle %> configuration page
 */
export class <%=messageExtensionClassName%>Config extends TeamsBaseComponent<I<%=messageExtensionClassName%>ConfigProps, I<%=messageExtensionClassName%>ConfigState> {

    public acomponentWillMount() {
        this.updateTheme(this.getQueryVariable("theme"));
        this.setState({
            onOrOff: true
        });

        microsoftTeams.initialize();
        microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
        microsoftTeams.appInitialization.notifySuccess();
    }

    /**
     * The render() method to create the UI of the tab
     */
    public render() {
        return (
            <Provider theme={this.state.theme}>
                <Flex fill={true}>
                    <Flex.Item>
                        <div>
                            <Header content="<%= messageExtensionTitle%> configuration" />
                            <Checkbox
                                label="On or off?"
                                toggle
                                checked={this.state.onOrOff}
                                onChange={() => { this.setState({ onOrOff: !this.state.onOrOff }); }} />
                            <Button onClick={() =>
                                microsoftTeams.authentication.notifySuccess(JSON.stringify({
                                    setting: this.state.onOrOff
                                }))} primary>OK</Button>
                        </div>
                    </Flex.Item>
                </Flex>
            </Provider>
        );
    }
}
