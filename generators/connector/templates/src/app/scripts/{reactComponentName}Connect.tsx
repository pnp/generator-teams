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
    IDropdownItemProps,
    Surface
} from 'msteams-ui-components-react';
import { render } from 'react-dom';
import TeamsBaseComponent, { ITeamsBaseComponentProps, ITeamsBaseComponentState } from 'msteams-react-base-component'
import * as microsoftTeams from '@microsoft/teams-js';

export interface I<%=reactComponentName%>ConnectState extends ITeamsBaseComponentState {
    color: IColor | undefined;
    submit: boolean;
}

export interface I<%=reactComponentName%>ConnectProps extends ITeamsBaseComponentProps {
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
 * Implementation of the <%=reactComponentName%> Connector connect page
 */
export class <%=reactComponentName%>Connect extends TeamsBaseComponent<I<%=reactComponentName%>ConnectProps, I<%=reactComponentName%>ConnectState> {

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
                            onClick: () => { this.setState({ color: color }); }
                        };
                    });

                    return (
                        <Surface>
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
                                            <input type='hidden' name='color' value={this.state.color && this.state.color.code} />
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
                        </Surface>
                    );
                }}>
                </ConnectedComponent>
            </TeamsComponentContext >
        );
    }
}
