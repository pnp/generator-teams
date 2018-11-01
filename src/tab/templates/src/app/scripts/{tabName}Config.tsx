import * as React from "react";
import {
    PrimaryButton,
    TeamsComponentContext,
    ConnectedComponent,
    Panel,
    PanelBody,
    PanelHeader,
    PanelFooter,
    Input,
    Surface
} from "msteams-ui-components-react";
import { render } from "react-dom";
import TeamsBaseComponent, { ITeamsBaseComponentProps, ITeamsBaseComponentState } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";

export interface I<%=tabReactComponentName%>ConfigState extends ITeamsBaseComponentState {
    value: string;
}

export interface I<%=tabReactComponentName%>ConfigProps extends ITeamsBaseComponentProps {

}

/**
 * Implementation of <%= tabTitle %> configuration page
 */
export class <%=tabReactComponentName%>Config  extends TeamsBaseComponent<I<%=tabReactComponentName%>ConfigProps, I<%=tabReactComponentName%>ConfigState> {

    public componentWillMount() {
        this.updateTheme(this.getQueryVariable("theme"));
        this.setState({
            fontSize: this.pageFontSize()
        });

        if (this.inTeams()) {
            microsoftTeams.initialize();

            microsoftTeams.getContext((context: microsoftTeams.Context) => {
                this.setState({
                    value: context.entityId
                });
                this.setValidityState(true);
            });

            microsoftTeams.settings.registerOnSaveHandler((saveEvent: microsoftTeams.settings.SaveEvent) => {
                // Calculate host dynamically to enable local debugging
                const host = "https://" + window.location.host;
                microsoftTeams.settings.setSettings({
                    contentUrl: host + "/<%=tabName%>.html?data=",
                    entityId: this.state.value,
                    removeUrl: host + "/<%=tabName%>Remove.html",
                    suggestedDisplayName: "<%=tabTitle%>"
                });
                saveEvent.notifySuccess();
            });
        } else {
        }
    }

    public render() {
        return (
            <TeamsComponentContext
                fontSize={this.state.fontSize}
                theme={this.state.theme}
            >

                <ConnectedComponent render={(props) => {
                    const { context } = props;
                    const { rem, font } = context;
                    const { sizes, weights } = font;
                    const styles = {
                        header: { ...sizes.title, ...weights.semibold },
                        input: {},
                        section: { ...sizes.base, marginTop: rem(1.4), marginBottom: rem(1.4) }
                    };

                    return (
                        <Surface>
                            <Panel>
                                <PanelHeader>
                                    <div style={styles.header}>Configure your tab</div>
                                </PanelHeader>
                                <PanelBody>
                                    <div style={styles.section}>
                                        <Input
                                            autoFocus
                                            style={styles.input}
                                            placeholder="Enter a value here"
                                            label="Enter a value"
                                            errorLabel={!this.state.value ? "This value is required" : undefined}
                                            value={this.state.value}
                                            onChange={(e) => {
                                                this.setState({
                                                    value: e.target.value
                                                });
                                            }}
                                            required />
                                    </div>

                                </PanelBody>
                                <PanelFooter>
                                </PanelFooter>
                            </Panel>
                        </Surface>
                    );
                }}>
                </ConnectedComponent>
            </TeamsComponentContext >
        );
    }
}
