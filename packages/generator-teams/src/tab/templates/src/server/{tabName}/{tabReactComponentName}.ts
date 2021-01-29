import { PreventIframe } from "express-msteams-host";

/**
 * Used as place holder for the decorators
 */
@PreventIframe("/<%=tabName%>/index.html")<% if(tabType == "configurable" ) { %>
@PreventIframe("/<%=tabName%>/config.html")<% } %><% if(tabType == "configurable" ) { %>
@PreventIframe("/<%=tabName%>/remove.html")<% } %>
export class <%=tabReactComponentName%> {
}
