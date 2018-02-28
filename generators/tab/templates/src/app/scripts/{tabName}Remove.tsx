import * as React from 'react';
import {
    PrimaryButton,
    TeamsComponentContext,
    ThemeStyle,
    ITeamsComponentProps,
    ITeamsComponentState,
    ConnectedComponent,
    Panel,
    PanelBody,
    PanelHeader,
    PanelFooter,
    Input
} from 'msteams-ui-components-react';
import { render } from 'react-dom';


export interface I<%=tabName%>RemoveState extends ITeamsComponentState {
    fontSize: number;
    theme: ThemeStyle;
    value: string;

}
export interface I<%=tabName%>RemoveProps extends ITeamsComponentProps {

}


/**
 * Implementation of <%= tabTitle %> remove page
 */
export class <%=tabName%>Remove  extends React.Component<I<%=tabName%>RemoveProps, I<%=tabName%>RemoveState> {

    constructor(props: I<%=tabName%>RemoveProps, state: I<%=tabName%>RemoveState) {
        super(props, state);
    }

    public componentWillMount() {
        this.updateTheme(this.getQueryVariable('theme'));
        this.setState({
            fontSize: this.pageFontSize()
        });

        if (this.inTeams()) {
            microsoftTeams.initialize();
      

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
                        section: { ...sizes.base, marginTop: rem(1.4), marginBottom: rem(1.4) },
                        input: {},
                    }

                    return (
                        <Panel>
                            <PanelHeader>
                                <div style={styles.header}>Configure your tab</div>
                            </PanelHeader>
                            <PanelBody>
                                <div style={styles.section}>
                                You can just add stuff here if you want to clean up when removing the tab. For instance, if you have stored data in an external repository, you can delete or archive it here. If you don't need this remove page you can remove it.
                                </div>

                            </PanelBody>
                            <PanelFooter>
                            </PanelFooter>
                        </Panel>
                    );
                }}>
                </ConnectedComponent>
            </TeamsComponentContext >
        );
    }

    /**
     * Static render method to be used by the remove page
     */
    public static render(element: HTMLElement, props: I<%=tabName%>RemoveProps) {
        render(React.createElement<I<%=tabName%>RemoveProps>(<%=tabName%>Remove, props), element);
    }

    public setValidityState(val: boolean) {
        microsoftTeams.settings.setValidityState(val);
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