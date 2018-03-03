import * as React from 'react';
import {
    PrimaryButton,
    TeamsComponentContext,
    ConnectedComponent,
    Panel,
    PanelBody,
    PanelHeader,
    PanelFooter
} from 'msteams-ui-components-react';
import { render } from 'react-dom';
import { TeamsBaseComponent, ITeamsBaseComponentProps, ITeamsBaseComponentState } from './TeamsBaseComponent'

/**
 * State for the <%=tabName%>Tab React component
 */
export interface I<%=tabName%>TabState extends ITeamsBaseComponentState {
    entityId?: string;
}

/**
 * Properties for the <%=tabName%>Tab React component
 */
export interface I<%=tabName%>TabProps extends ITeamsBaseComponentProps {

}

/**
 * Implementation of the <%= tabTitle %> content page
 */
export class <%=tabName%>Tab extends TeamsBaseComponent<I<%=tabName%>TabProps, I<%=tabName%>TabState> {
 
    public componentWillMount() {
        this.updateTheme(this.getQueryVariable('theme'));
        this.setState({
            fontSize: this.pageFontSize()
        });

        if (this.inTeams()) {
            microsoftTeams.initialize();
            microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
            microsoftTeams.getContext(context => {
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
                        header: { ...sizes.title, ...weights.semibold },
                        section: { ...sizes.base, marginTop: rem(1.4), marginBottom: rem(1.4) },
                        footer: { ...sizes.xsmall }
                    }

                    return (
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
                    );
                }}>
                </ConnectedComponent>
            </TeamsComponentContext >
        );
    }
}