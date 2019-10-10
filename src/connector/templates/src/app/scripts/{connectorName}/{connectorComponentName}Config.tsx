import * as React from "react";
import { Provider, Flex, Header, Dropdown } from "@stardust-ui/react";
import TeamsBaseComponent, { ITeamsBaseComponentProps, ITeamsBaseComponentState } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";

export interface I<%=connectorComponentName%>ConfigState extends ITeamsBaseComponentState {
    color: IColor | undefined;
    submit: boolean;
    webhookUrl: string;
    user: string;
    appType: string;
    groupName: string;
}

export interface I<%=connectorComponentName%>ConfigProps extends ITeamsBaseComponentProps {
}

interface IColor {
    title: string;
    code: string;
}

const availableColors: IColor[] = [
    {
        title: "Blue",
        code: "#dce6ee"
    },
    {
        title: "Orange",
        code: "#ffc300"
    }
];

/**
 * Implementation of the <%=connectorName%> Connector connect page
 */
export class <%=connectorComponentName%>Config extends TeamsBaseComponent<I<%=connectorComponentName%>ConfigProps, I<%=connectorComponentName%>ConfigState> {

    public componentWillMount() {
        this.updateTheme(this.getQueryVariable("theme"));
        this.setState({
            fontSize: this.pageFontSize()
        });

        if (this.inTeams()) {
            microsoftTeams.initialize();

            microsoftTeams.getContext((context: microsoftTeams.Context) => {
                this.setState({
                    color: availableColors.find(c => c.code === context.entityId),
                });
                this.setValidityState(this.state.color !== undefined);
            });

            microsoftTeams.settings.registerOnSaveHandler((saveEvent: microsoftTeams.settings.SaveEvent) => {
                    // INFO: Should really be of type microsoftTeams.settings.Settings, but configName does not exist in the Teams JS SDK
                const settings: any = {
                    entityId: this.state.color ? this.state.color.code : availableColors[0].code,
                    contentUrl: `https://${process.env.HOSTNAME}/<%=connectorName%>/config.html`,
                    configName: this.state.color ? this.state.color.title : availableColors[0].title
                };
                microsoftTeams.settings.setSettings(settings);

                microsoftTeams.settings.getSettings((s: any) => {
                    this.setState({
                        webhookUrl: s.webhookUrl,
                        user: s.userObjectId,
                        appType: s.appType,
                    });

                    fetch("/api/connector/connect", {
                        method: "POST",
                        headers: [
                            ["Content-Type", "application/json"]
                        ],
                        body: JSON.stringify({
                            webhookUrl: this.state.webhookUrl,
                            user: this.state.user,
                            appType: this.state.appType,
                            groupName: this.state.groupName,
                            color: this.state.color ? this.state.color.code : availableColors[0].code,
                            state: "myAppsState"
                        })
                    }).then(x => {
                        if (x.status === 200 || x.status === 302) {
                            saveEvent.notifySuccess();
                        } else {
                            saveEvent.notifyFailure(x.statusText);
                        }
                    }).catch(e => {
                        saveEvent.notifyFailure(e);
                    });
                });
            });
        } else {
            // Not in Microsoft Teams
            alert("Operation not supported outside of Microsoft Teams");
        }
    }

    public render() {
        const colors = availableColors.map(color => {
            return {
                header: color.title,
                onClick: () => {
                    this.setState({ color });
                    this.setValidityState(color !== undefined);
                }
            };
        });
        return (
            <Provider theme={this.state.theme}>
                <Flex fill={true}>
                    <Flex.Item>
                        <div>
                            <Header content="Configure your Connector" />
                            <Dropdown
                                items={colors}
                                placeholder="Select card color"
                                checkable
                            />
                        </div>
                    </Flex.Item>
                </Flex>
            </Provider>
        );
    }
}
