import * as React from "react";
import { Provider, Flex, Text, Button, Header } from "@fluentui/react-northstar";
import { useState, useEffect } from "react";
import { useTeams } from "msteams-react-base-component";
import { app<% if (tabSSO) { %>, authentication<% } %> } from "@microsoft/teams-js";<% if (tabSSO) { %>
import jwtDecode from "jwt-decode";<% } %>

/**
 * Implementation of the <%= tabTitle %> content page
 */
export const <%=tabReactComponentName%> = () => {

    const [{ inTeams, theme, context }] = useTeams();
    const [entityId, setEntityId] = useState<string | undefined>();<% if (tabSSO) { %>
    const [name, setName] = useState<string>();
    const [error, setError] = useState<string>();<% } %>

    useEffect(() => {
        if (inTeams === true) {<% if (tabSSO) { %>
            authentication.getAuthToken({
                resources: [process.env.TAB_APP_URI as string],
                silent: false
            } as authentication.AuthTokenRequestParameters).then(token => {
                const decoded: { [key: string]: any; } = jwtDecode(token) as { [key: string]: any; };
                setName(decoded!.name);
                app.notifySuccess();
            }).catch(message => {
                setError(message);
                app.notifyFailure({
                    reason: app.FailedReason.AuthFailed,
                    message
                });
            });<% } else { %>
            app.notifySuccess();<% } %>
        } else {
            setEntityId("Not in Microsoft Teams");
        }
    }, [inTeams]);

    useEffect(() => {
        if (context) {
            setEntityId(context.page.id);
        }
    }, [context]);

    /**
     * The render() method to create the UI of the tab
     */
    return (
        <Provider theme={theme}>
            <Flex fill={true} column styles={{
                padding: ".8rem 0 .8rem .5rem"
            }}>
                <Flex.Item>
                    <Header content="This is your tab" />
                </Flex.Item>
                <Flex.Item>
                    <div><% if (tabSSO) { %>
                        <div>
                            <Text content={`Hello ${name}`} />
                        </div>
                        {error && <div><Text content={`An SSO error occurred ${error}`} /></div>}
<% } else { %>
                        <div>
                            <Text content={entityId} />
                        </div>
<% } %>
                        <div>
                            <Button onClick={() => alert("It worked!")}>A sample button</Button>
                        </div>
                    </div>
                </Flex.Item>
                <Flex.Item styles={{
                    padding: ".8rem 0 .8rem .5rem"
                }}>
                    <Text size="smaller" content="(C) Copyright <%=developer%>" />
                </Flex.Item>
            </Flex>
        </Provider>
    );
};
