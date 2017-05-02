import { TeamsTheme } from './theme';

/**
 * Implementation of the <%= tabTitle %> content page
 */
export class <%=tabName%>Tab {
    /**
     * Constructor for <%= tabName %> that initializes the Microsoft Teams script and themes management
     */
    constructor() {
        microsoftTeams.initialize();
        TeamsTheme.fix();
    }
    /**
     * Method to invoke on page to start processing
     * Add your custom implementation here
     */
    public doStuff() {
        microsoftTeams.getContext((context: microsoftTeams.Context) => {
            var a = document.getElementById('app');
            if (a) {
                a.innerHTML = `The value is: ${context.entityId}`;
            }
        });
    }
    /**
     * Method for retrieving query string parameters
     */
    private getParameterByName(name: string, url?: string): string {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return '';
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

}