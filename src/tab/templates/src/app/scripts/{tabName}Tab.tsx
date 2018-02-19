import * as React from 'react';
import {
    PrimaryButton,
    TeamsComponentContext,
    ThemeStyle,
    TeamsComponentProps,
    TeamsComponentState,
    ConnectedComponent,
    Panel,
    PanelBody,
    PanelHeader,
    PanelFooter
} from 'msteams-ui-components-react';
import { render } from 'react-dom';

/**
 * State for the <%=tabName%>Tab React component
 */
export interface I<%=tabName%>TabState extends TeamsComponentState {
    fontSize: number;
    theme: ThemeStyle;
    entityId?: string;

}

/**
 * Properties for the <%=tabName%>Tab React component
 */
export interface I<%=tabName%>TabProps extends TeamsComponentProps {

}

/**
 * Implementation of the <%= tabTitle %> content page
 */
export class <%=tabName%>Tab extends React.Component<I<%=tabName%>TabProps, I<%=tabName%>TabState> {
    /**
     * Constructor for <%= tabName %>
     */
    constructor(props: I<%=tabName%>TabProps, state: I<%=tabName%>TabState) {
        super(props, state);
    }

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

    /**
     * Static render method to be used by the tab page
     */
    public static render(element: HTMLElement, props: I<%=tabName%>TabProps) {
        render(React.createElement<I<%=tabName%>TabProps>(<%=tabName%>Tab, props), element);
    }
   
    private pageFontSize = () => {
        let sizeStr = window.getComputedStyle(document.getElementsByTagName('html')[0]).getPropertyValue('font-size');
        sizeStr = sizeStr.replace('px', '');
        let fontSize = parseInt(sizeStr, 10);
        if (!fontSize) {
            fontSize = 16;
        }
        return fontSize;
    }
    private inTeams = () => {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    private updateTheme = (themeStr) => {
        let theme;
        switch (themeStr) {
            case 'dark':
                theme = ThemeStyle.Dark;
                break;
            case 'contrast':
                theme = ThemeStyle.HighContrast;
                break;
            case 'default':
            default:
                theme = ThemeStyle.Light;
        }
        this.setState({ theme });
    }

    private getQueryVariable = (variable) => {
        const query = window.location.search.substring(1);
        const vars = query.split('&');
        for (const varPairs of vars) {
            const pair = varPairs.split('=');
            if (decodeURIComponent(pair[0]) === variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        return null;
    }
}