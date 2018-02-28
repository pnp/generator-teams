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


export interface I<%=tabName%>ConfigState extends ITeamsComponentState {
    fontSize: number;
    theme: ThemeStyle;
    value: string;

}
export interface I<%=tabName%>ConfigProps extends ITeamsComponentProps {

}


/**
 * Implementation of <%= tabTitle %> configuration page
 */
export class <%=tabName%>Config  extends React.Component<I<%=tabName%>ConfigProps, I<%=tabName%>ConfigState> {

    constructor(props: I<%=tabName%>ConfigProps, state: I<%=tabName%>ConfigState) {
        super(props, state);
    }

    public componentWillMount() {
        this.updateTheme(this.getQueryVariable('theme'));
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
                let host = "https://" + window.location.host;
                microsoftTeams.settings.setSettings({
                    contentUrl: host + "/<%=tabName%>Tab.html?data=",
                    suggestedDisplayName: '<%=tabTitle%>',
                    removeUrl: host + "/<%=tabName%>Remove.html",
                    entityId: this.state.value
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
                                    <Input
                                        autoFocus
                                        style={styles.input}
                                        placeholder="Enter a value here"
                                        label="Enter a vlue"
                                        errorLabel={!this.state.value ? "This value is required" : undefined}
                                        value={this.state.value}
                                        onChange={(e) =>{
                                            this.setState({
                                                value: e.target.value
                                            })
                                        }}
                                        required />
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
     * Static render method to be used by the configuration page
     */
    public static render(element: HTMLElement, props: I<%=tabName%>ConfigProps) {
        render(React.createElement<I<%=tabName%>ConfigProps>(<%=tabName%>Config, props), element);
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