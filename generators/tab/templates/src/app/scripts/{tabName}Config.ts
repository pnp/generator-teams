import {TeamsTheme} from './theme';

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
                removeUrl: "<%=host%>/remove.html",
            });

            saveEvent.notifySuccess();
        });
    }
    public setValidityState(val: boolean) {
        microsoftTeams.settings.setValidityState(val);
    }
}