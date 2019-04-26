import * as React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { <%=messageExtensionClassName%>Config } from "../<%=messageExtensionClassName%>Config";

describe("<%=messageExtensionClassName%>Config Component", () => {
    // Snapshot Test Sample
    it("should match the snapshot", () => {
        const wrapper = shallow(<<%=messageExtensionClassName%>Config />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    // Component Test Sample
    it("should render the tab", () => {
        const component = shallow(<<%=messageExtensionClassName%>Config />);
        const divResult = component.containsMatchingElement(<div><%= messageExtensionTitle%> configuration</div>);

        expect(divResult).toBeTruthy();
    });
});


