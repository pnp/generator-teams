import * as React from "react";
import { Provider, Flex, Header, Checkbox, Button } from "@fluentui/react-northstar";
import * as microsoftTeams from "@microsoft/teams-js";
import { useState, useEffect } from "react";
import { useTeams } from "msteams-react-base-component";


/**
 * Implementation of the <%= messageExtensionTitle %> configuration page
 */
export const <%=messageExtensionClassName%>Config = () => {

    const [{ inTeams, theme }] = useTeams();
    const [onOrOff, setOnOrOff] = useState<boolean>();

    useEffect(() => {
        if (inTeams === true) {
            microsoftTeams.appInitialization.notifySuccess();
            setOnOrOff(true);
        }
    }, [inTeams]);

    return (
        <Provider theme={theme} styles={{ height: "100vh", width: "100vw", padding: "1em" }}>
            <Flex fill={true}>
                <Flex.Item>
                    <div>
                        <Header content="<%= messageExtensionTitle%> configuration" />
                        <Checkbox
                            label="On or off?"
                            toggle
                            checked={onOrOff}
                            onChange={() => { setOnOrOff(!onOrOff); }} />
                        <Button onClick={() =>
                            microsoftTeams.authentication.notifySuccess(JSON.stringify({
                                setting: onOrOff
                            }))} primary>OK</Button>
                    </div>
                </Flex.Item>
            </Flex>
        </Provider>
    );
};
