import { PreventIframe } from "express-msteams-host";

/**
 * Used as place holder for the decorators
 */
@PreventIframe("/<%=tabName%>/index.html")
@PreventIframe("/<%=tabName%>/config.html")
@PreventIframe("/<%=tabName%>/remove.html")
export class <%=tabReactComponentName%> {
    
}