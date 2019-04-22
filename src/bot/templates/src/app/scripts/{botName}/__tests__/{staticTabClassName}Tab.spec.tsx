import * as React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

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
        const divResult = component.containsMatchingElement(<div>Welcome to the <%= botTitle%> bot page</div>);

        expect(divResult).toBeTruthy();
    });
});
