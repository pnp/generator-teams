import * as React from "react";
import { Provider, Flex, Header, Dropdown, ShorthandCollection, DropdownItemProps } from "@fluentui/react-northstar";
import { useState, useEffect, useRef } from "react";
import { useTeams } from "msteams-react-base-component";
import { app, pages } from "@microsoft/teams-js";

interface IColor {
    title: string;
    code: string;
}

const availableColors: IColor[] = [
    {
        title: "Blue",
        code: "#dce6ee"
    },
    {
        title: "Orange",
        code: "#ffc300"
    }
];

/**
 * Implementation of the <%=connectorName%> Connector connect page
 */
export const <%=connectorComponentName %>Config = () => {

    const [{ theme, context }] = useTeams();
    const [color, setColor] = useState<IColor>();
    const colorRef = useRef(color);
    colorRef.current = color;

    useEffect(() => {
        if (context) {
            pages.config.registerOnSaveHandler((saveEvent: pages.config.SaveEvent) => {
                const settings: any = {
                    entityId: colorRef.current ? colorRef.current.code : availableColors[0].code,
                    contentUrl: `https://${process.env.PUBLIC_HOSTNAME}/<%=connectorName%>/config.html?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}`,
                    configName: colorRef.current ? colorRef.current.title : availableColors[0].title
                };
                pages.config.setConfig(settings).then(() => {
                    pages.getConfig().then((setting:any) => {
                        fetch("/api/connector/connect", {
                            method: "POST",
                            headers: [
                                ["Content-Type", "application/json"]
                            ],
                            body: JSON.stringify({
                                webhookUrl: setting.webhookUrl,
                                user: setting.userObjectId,
                                appType: setting.appType,
                                groupName: context.team?.groupId,
                                color: colorRef.current ? colorRef.current.code : availableColors[0].code,
                                state: "myAppsState"
                            })
                        }).then(response => {
                            if (response.status === 200 || response.status === 302) {
                                saveEvent.notifySuccess();
                            } else {
                                saveEvent.notifyFailure(response.statusText);
                            }
                        }).catch(e => {
                            saveEvent.notifyFailure(e);
                        });
                    });
                });
            });

            pages.getConfig().then(config => {
                setColor(availableColors.find(c => c.code === config.entityId));
            });
        }
    }, [context]);

    useEffect(() => {
        if (context) {
            pages.config.setValidityState(color !== undefined);
        }
    }, [color, context]);

    const colors: ShorthandCollection<DropdownItemProps> = availableColors.map(clr => {
        return {
            header: clr.title,
            selected: color && clr.code === color.code,
            onClick: () => {
                setColor(clr);
                pages.config.setValidityState(clr !== undefined);
            }
        };
    });

    return (
        <Provider theme={theme}>
            <Flex fill={true}>
                <Flex.Item>
                    <div>
                        <Header content="Configure your Connector" />
                        <Dropdown
                            items={colors}
                            placeholder="Select card color"
                            checkable
                        />
                    </div>
                </Flex.Item>
            </Flex>
        </Provider>
    );
};
