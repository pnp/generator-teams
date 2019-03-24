import * as React from "react";
import {
    PrimaryButton,
    Panel,
    PanelBody,
    PanelHeader,
    PanelFooter,
    Surface,
    Checkbox,
    TeamsThemeContext,
    getContext
} from "msteams-ui-components-react";
import TeamsBaseComponent, { ITeamsBaseComponentProps, ITeamsBaseComponentState } from "msteams-react-base-component";
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
export interface I<%=messageExtensionClassName%>ConfigProps extends ITeamsBaseComponentProps {

}

/**
 * Implementation of the <%= messageExtensionTitle %> configuration page
 */
export class <%=messageExtensionClassName%>Config extends TeamsBaseComponent<I<%=messageExtensionClassName%>ConfigProps, I<%=messageExtensionClassName%>ConfigState> {

    public componentWillMount() {
        this.updateTheme(this.getQueryVariable("theme"));
        this.setState({
            fontSize: this.pageFontSize()
        });

        microsoftTeams.initialize();
        microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
    }

    /**
     * The render() method to create the UI of the tab
     */
    public render() {
        const context = getContext({
            baseFontSize: this.state.fontSize,
            style: this.state.theme
        });
        const { rem, font } = context;
        const { sizes, weights } = font;
        const styles = {
            header: { ...sizes.title, ...weights.semibold },
            section: { ...sizes.base, marginTop: rem(1.4), marginBottom: rem(1.4) },
            footer: { ...sizes.xsmall }
        };
        return (
            <TeamsThemeContext.Provider value={context}>
                <Surface>
                    <Panel>
                        <PanelHeader>
                            <div style={styles.header}><%= messageExtensionTitle%> configuration</div>
                        </PanelHeader>
                        <PanelBody>
                            <div style={styles.section}>
                                <Checkbox
                                    label="On or off?"
                                    checked={this.state.onOrOff}
                                    onChecked={(checked: boolean, value: any) => {
                                        this.setState({
                                            onOrOff: checked
                                        });
                                    }}>
                                </Checkbox>
                            </div>
                            <div style={styles.section}>
                                <PrimaryButton onClick={() => {
                                    microsoftTeams.authentication.notifySuccess(JSON.stringify({
                                        setting: this.state.onOrOff
                                    }));
                                }}>OK</PrimaryButton>
                            </div>
                        </PanelBody>
                        <PanelFooter>
                            <div style={styles.footer}>
                                (C) Copyright <%=developer%>
                            </div>
                        </PanelFooter>
                    </Panel>
                </Surface>
             </TeamsThemeContext.Provider>
        );
    }
}
