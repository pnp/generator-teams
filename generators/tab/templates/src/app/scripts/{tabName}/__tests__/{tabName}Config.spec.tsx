import * as React from "react";
import { shallow, mount } from "enzyme";

import { <%=tabReactComponentName%>Config } from "../<%=tabReactComponentName%>Config";
import { ThemeStyle } from "msteams-ui-styles-core";

describe("<%=tabReactComponentName%>Config Component", () => {
    // Component Test Sample
    it("should render the tab", () => {
        const component = shallow(<<%=tabReactComponentName%>Config theme={ ThemeStyle.Light } fontSize={14} />);
        const divResult = component.containsMatchingElement(<div>Configure your tab</div>);

        expect(divResult).toBeTruthy();
    });
});
