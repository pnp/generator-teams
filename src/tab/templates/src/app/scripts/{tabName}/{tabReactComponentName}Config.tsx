import * as React from "react";
import { Provider, Flex, Header, Input } from "@fluentui/react-northstar";
import TeamsBaseComponent, { ITeamsBaseComponentState } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";

export interface I<%=tabReactComponentName%>ConfigState extends ITeamsBaseComponentState {
    value: string;
}

export interface I<%=tabReactComponentName%>ConfigProps {

}

/**
 * Implementation of <%= tabTitle %> configuration page
 */
export class <%=tabReactComponentName%>Config  extends TeamsBaseComponent<I<%=tabReactComponentName%>ConfigProps, I<%=tabReactComponentName%>ConfigState> {

    public async componentWillMount() {
        this.updateTheme(this.getQueryVariable("theme"));

        if (await this.inTeams()) {
            microsoftTeams.initialize();

            microsoftTeams.getContext((context: microsoftTeams.Context) => {
                this.setState({
                    value: context.entityId
                });
                this.updateTheme(context.theme);
                microsoftTeams.settings.setValidityState(true);
                microsoftTeams.appInitialization.notifySuccess();
            });

            microsoftTeams.settings.registerOnSaveHandler((saveEvent: microsoftTeams.settings.SaveEvent) => {
                // Calculate host dynamically to enable local debugging
                const host = "https://" + window.location.host;
                microsoftTeams.settings.setSettings({
                    contentUrl: host + "/<%=tabName%>/?data=",
                    websiteUrl: host + "/<%=tabName%>/?data=",
                    suggestedDisplayName: "<%=tabTitle%>",
                    removeUrl: host + "/<%=tabName%>/remove.html",
                    entityId: this.state.value
                });
                saveEvent.notifySuccess();
            });
        } else {
        }
    }

    public render() {
        return (
            <Provider theme={this.state.theme}>
                <Flex fill={true}>
                    <Flex.Item>
                        <div>
                            <Header content="Configure your tab" />
                            <Input
                                placeholder="Enter a value here"
                                fluid
                                clearable
                                value={this.state.value}
                                onChange={(e, data) => {
                                    if (data) {
                                        this.setState({
                                            value: data.value
                                        });
                                    }
                                }}
                                required />
                        </div>
                    </Flex.Item>
                </Flex>
            </Provider>
        );
    }
}
