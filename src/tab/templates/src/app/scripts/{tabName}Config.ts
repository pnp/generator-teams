import {TeamsTheme} from './theme';

/**
 * Implementation of <%= tabTitle %> configuration page
 */
export class <%=tabName%>Configure {
    constructor() {
        microsoftTeams.initialize();
        TeamsTheme.fix();
        microsoftTeams.settings.registerOnSaveHandler(function (saveEvent: any) {

            var val:any = document.getElementById("data");
            microsoftTeams.settings.setSettings({
                contentUrl: "<%=host%>/<%=tabName%>Tab.html?data=" + val.value,
                customSettings: val.value,
                suggestedDisplayName: `<%=title%>`,
                removeUrl: "<%=host%>/<%=tabName%>Remove.html",
            });

            saveEvent.notifySuccess();
        });
    }
    public setValidityState(val: boolean) {
        microsoftTeams.settings.setValidityState(val);
    }
}