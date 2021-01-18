import * as React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Header } from "@fluentui/react-northstar";

import { <%=connectorComponentName%>Config } from "../<%=connectorComponentName%>Config";

describe("<%=connectorComponentName%>Config Component", () => {
    // Snapshot Test Sample
    it("should match the snapshot", () => {
        window.alert = jest.fn();
        const wrapper = shallow(<<%=connectorComponentName%>Config />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    // Component Test Sample
    it("should render the tab", () => {
        const component = shallow(<<%=connectorComponentName%>Config />);
        const divResult = component.containsMatchingElement( <Header content="Configure your Connector" />);

        expect(divResult).toBeTruthy();
    });
});

