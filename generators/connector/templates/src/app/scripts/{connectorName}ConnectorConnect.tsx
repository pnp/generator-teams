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
    Dropdown,
    IDropdownItemProps
} from 'msteams-ui-components-react';
import { render } from 'react-dom';


export interface I<%=connectorName%>ConnectorConnectState extends ITeamsComponentState {
    fontSize: number;
    theme: ThemeStyle;
    color: IColor | undefined;
    submit: boolean;

}
export interface I<%=connectorName%>ConnectorConnectProps extends ITeamsComponentProps {
    webhookUrl: string;
    user: string;
    appType: string;
    groupName: string;
    state: string;
}
interface IColor {
    title: string;
    code: string;
}

const availableColors: IColor[] = [
    {
        title: 'Blue',
        code: '#dce6ee'
    },
    {
        title: 'Orange',
        code: '#ffc300'
    }
];

/**
 * Implementation of the yttest Tab content page
 */
export class <%=connectorName%>ConnectorConnect extends React.Component<I<%=connectorName%>ConnectorConnectProps, I<%=connectorName%>ConnectorConnectState> {

    constructor(props: I<%=connectorName%>ConnectorConnectProps, state: I<%=connectorName%>ConnectorConnectState) {
        super(props, state);
    }

    public componentWillMount() {
        this.updateTheme(this.getQueryVariable('theme'));
        this.setState({
            fontSize: this.pageFontSize(),
            color: undefined
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
                    const colors: IDropdownItemProps[] = availableColors.map(color => {
                        return {
                            text: color.title,
                            onClick: () => { this.setState({ color: color }) }
                        }
                    });


                    return (
                        <Panel>
                            <PanelHeader>
                                <div style={styles.header}>Configure your Connector</div>
                            </PanelHeader>
                            <PanelBody>

                                <form action="/api/connector/connect" method="POST" onSubmit={(e) => {
                                    if (!this.state.submit) {
                                        e.preventDefault();
                                    }
                                }}>

                                    <div style={styles.section}>
                                        <input type='hidden' name='webhookUrl' value={this.props.webhookUrl} />
                                        <input type='hidden' name='user' value={this.props.user} />
                                        <input type='hidden' name='appType' value={this.props.appType} />
                                        <input type='hidden' name='groupName' value={this.props.groupName} />
                                        <input type='hidden' name='state' value={this.props.state} />
                                        <Dropdown
                                            label='Card color'
                                            items={colors}
                                            mainButtonText={this.state.color ? this.state.color.title : 'Choose a color'}
                                            style={styles.input}
                                        >
                                        </Dropdown>
                                    </div>
                                    <div style={styles.section}>

                                        <PrimaryButton
                                            style={styles.input}
                                            onClick={() => { this.setState({ submit: true }); }}
                                            disabled={this.state.color !== undefined}>
                                            Connect
                                        </PrimaryButton>
                                    </div>

                                </form>

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
    public static render(element: HTMLElement, props: I<%=connectorName%>ConnectorConnectProps) {
        render(React.createElement<I<%=connectorName%>ConnectorConnectProps>(<%=connectorName%>ConnectorConnect, props), element);
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
