import {TeamsTheme} from './theme';

/**
 * Implementation of <%= tabTitle %> configuration page
 */
export class <%=tabName%>Configure {
    constructor() {
        microsoftTeams.initialize();

        microsoftTeams.getContext((context:microsoftTeams.Context) => {
            TeamsTheme.fix(context);
            let val = <HTMLInputElement>document.getElementById("data");
            if (context.entityId) {
                val.value = context.entityId;
            }
            this.setValidityState(true);
        });
		
        microsoftTeams.settings.registerOnSaveHandler((saveEvent: microsoftTeams.settings.SaveEvent) => {

            let val = <HTMLInputElement>document.getElementById("data");
			// Calculate host dynamically to enable local debugging
			let host = "https://" + window.location.host;
            microsoftTeams.settings.setSettings({
                contentUrl: host + "/<%=tabName%>Tab.html?data=",
                suggestedDisplayName: '<%=tabTitle%>',
                removeUrl: host + "/<%=tabName%>Remove.html",
				entityId: val.value
            });

            saveEvent.notifySuccess();
        });
    }
    public setValidityState(val: boolean) {
        microsoftTeams.settings.setValidityState(val);
    }
}