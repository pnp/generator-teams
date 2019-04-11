import * as React from "react";
import { shallow, mount } from "enzyme";

import { <%=tabReactComponentName%>Remove } from "../<%=tabReactComponentName%>Remove";
import { ThemeStyle } from "msteams-ui-styles-core";

describe("<%=tabReactComponentName%>Remove Component", () => {
    // Component Test Sample
    it("should render the tab", () => {
        const component = shallow(<<%=tabReactComponentName%>Remove <% if (!connector) { %>theme={ ThemeStyle.Light } fontSize={14}<% } %> />);
        const divResult = component.containsMatchingElement(<div>You"re about to remove your tab...</div>);

        expect(divResult).toBeTruthy();
    });
});
