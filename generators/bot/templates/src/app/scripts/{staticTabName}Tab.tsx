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
 * State for the <%=staticTabClassName%>Tab React component
 */
export interface I<%=staticTabClassName%>TabState extends ITeamsBaseComponentState {

}

/**
 * Properties for the <%=staticTabClassName%>Tab React component
 */
export interface I<%=staticTabClassName%>TabProps extends ITeamsBaseComponentProps {

}

/**
 * Implementation of the <%= staticTabClassName %> content page
 */
export class <%=staticTabClassName%>Tab extends TeamsBaseComponent<I<%=staticTabClassName%>TabProps, I<%=staticTabClassName%>TabState> {

    public componentWillMount() {
        this.updateTheme(this.getQueryVariable("theme"));
        this.setState({
            fontSize: this.pageFontSize()
        });

        if (this.inTeams()) {
            microsoftTeams.initialize();
            microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
        } else {

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
                                    <div style={styles.header}>Welcome to the <%= botTitle%> bot page</div>
                                </PanelHeader>
                                <PanelBody>
                                    <div style={styles.section}>
                                        // TODO:
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
