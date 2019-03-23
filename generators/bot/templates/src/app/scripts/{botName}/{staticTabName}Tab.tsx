import * as React from 'react';
import {
    Panel,
    PanelBody,
    PanelHeader,
    PanelFooter,
    Surface,
    TeamsThemeContext,
    getContext
} from 'msteams-ui-components-react';
import TeamsBaseComponent, { ITeamsBaseComponentProps, ITeamsBaseComponentState } from 'msteams-react-base-component'
import * as microsoftTeams from '@microsoft/teams-js';

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
        this.updateTheme(this.getQueryVariable('theme'));
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
                            <div style={styles.header}>Welcome to the <%= botTitle%> bot page</div>
                        </PanelHeader>
                        <PanelBody>
                            <div style={styles.section}>
                                TODO: 
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