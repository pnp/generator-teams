import * as React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { Header } from "@fluentui/react-northstar";

import { <%=staticTabClassName%>Tab } from "../<%=staticTabClassName%>Tab";

describe("<%=staticTabClassName%> Component", () => {
    // Snapshot Test Sample
    it("should match the snapshot", () => {
        const wrapper = shallow(<<%=staticTabClassName%>Tab />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    // Component Test Sample
    it("should render the tab", () => {
        const component = shallow(<<%=staticTabClassName%>Tab />);
        const divResult = component.containsMatchingElement(<Header content="Welcome to the <%= botTitle%> bot page" />);
        expect(divResult).toBeTruthy();
    });
});
