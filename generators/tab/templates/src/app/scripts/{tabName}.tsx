import * as React from "react";
import {
    PrimaryButton,
    TeamsComponentContext,
    ConnectedComponent,
    Panel,
    PanelBody,
    PanelHeader,
    PanelFooter,
    Surface
} from "msteams-ui-components-react";
import { render } from "react-dom";
import TeamsBaseComponent, { ITeamsBaseComponentProps, ITeamsBaseComponentState } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";

/**
 * State for the <%=tabReactComponentName%>Tab React component
 */
export interface I<%=tabReactComponentName%>State extends ITeamsBaseComponentState {
    entityId?: string;
}

/**
 * Properties for the <%=tabReactComponentName%>Tab React component
 */
export interface I<%=tabReactComponentName%>Props extends ITeamsBaseComponentProps {

}

/**
 * Implementation of the <%= tabReactComponentName %> content page
 */
export class <%=tabReactComponentName%> extends TeamsBaseComponent<I<%=tabReactComponentName%>Props, I<%=tabReactComponentName%>State> {

    public componentWillMount() {
        this.updateTheme(this.getQueryVariable("theme"));
        this.setState({
            fontSize: this.pageFontSize()
        });

        if (this.inTeams()) {
            microsoftTeams.initialize();
            microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
            microsoftTeams.getContext((context) => {
                this.setState({
                    entityId: context.entityId
                });
            });
        } else {
            this.setState({
                entityId: "This is not hosted in Microsoft Teams"
            });
        }
    }

    /**
     * The render() method to create the UI of the tab
     */
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
                        footer: { ...sizes.xsmall },
                        header: { ...sizes.title, ...weights.semibold },
                        section: { ...sizes.base, marginTop: rem(1.4), marginBottom: rem(1.4) }
                    };

                    return (
                        <Surface>
                            <Panel>
                                <PanelHeader>
                                    <div style={styles.header}>This is your tab</div>
                                </PanelHeader>
                                <PanelBody>
                                    <div style={styles.section}>
                                        {this.state.entityId}
                                    </div>
                                    <div style={styles.section}>
                                        <PrimaryButton onClick={() => alert("It worked!")}>A sample button</PrimaryButton>
                                    </div>
                                </PanelBody>
                                <PanelFooter>
                                    <div style={styles.footer}>
                                        (C) Copyright <%=developer%>
                                    </div>
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
