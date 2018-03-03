import * as React from 'react';
import {
    PrimaryButton,
    TeamsComponentContext,
    ConnectedComponent,
    Panel,
    PanelBody,
    PanelHeader,
    PanelFooter,
    Dropdown,
    IDropdownItemProps
} from 'msteams-ui-components-react';
import { render } from 'react-dom';
import { TeamsBaseComponent, ITeamsBaseComponentProps, ITeamsBaseComponentState } from './TeamsBaseComponent'

export interface I<%=connectorName%>ConnectorConnectState extends ITeamsBaseComponentState {
    color: IColor | undefined;
    submit: boolean;
}
export interface I<%=connectorName%>ConnectorConnectProps extends ITeamsBaseComponentProps {
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
 * Implementation of the <%=connectorName%> Connector connect page
 */
export class <%=connectorName%>ConnectorConnect extends TeamsBaseComponent<I<%=connectorName%>ConnectorConnectProps, I<%=connectorName%>ConnectorConnectState> {

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
                                            disabled={this.state.color === undefined}>
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
}
