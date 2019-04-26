import * as React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { <%=connectorComponentName%>Config } from "../<%=connectorComponentName%>Config";

describe("<%=tabReactComponentName%>Config Component", () => {
    // Snapshot Test Sample
    it("should match the snapshot", () => {
        window.alert = jest.fn();
        const wrapper = shallow(<<%=connectorComponentName%>Config />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    // Component Test Sample
    it("should render the tab", () => {
        const component = shallow(<<%=connectorComponentName%>Config />);
        const divResult = component.containsMatchingElement(<div>Configure your Connector</div>);

        expect(divResult).toBeTruthy();
    });
});

