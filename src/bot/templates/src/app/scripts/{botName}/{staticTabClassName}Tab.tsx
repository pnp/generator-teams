import * as React from "react";
import { Provider, Flex, Text, Button, Header } from "@fluentui/react";
import TeamsBaseComponent, { ITeamsBaseComponentProps, ITeamsBaseComponentState } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";

/**
 * State for the <%=staticTabName%>Tab React component
 */
export interface I<%=staticTabClassName%>TabState extends ITeamsBaseComponentState {

}

/**
 * Properties for the <%=staticTabName%>Tab React component
 */
export interface I<%=staticTabClassName%>TabProps extends ITeamsBaseComponentProps {

}

/**
 * Implementation of the <%= staticTabName %> content page
 */
export class <%=staticTabClassName%>Tab extends TeamsBaseComponent<I<%=staticTabClassName%>TabProps, I<%=staticTabClassName%>TabState> {

    public componentWillMount() {
        this.updateTheme(this.getQueryVariable("theme"));

        if (this.inTeams()) {
            microsoftTeams.initialize();
            microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
        }
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
                        <Header content="Welcome to the <%= botTitle%> bot page" />
                    </Flex.Item>
                    <Flex.Item>
                        <div>
                            <Text content="TODO: Add you content here" />
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
