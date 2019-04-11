import * as React from "react";
import { shallow, mount } from "enzyme";
import * as renderer from "react-test-renderer";

import { <%=tabReactComponentName%> } from "../<%=tabReactComponentName%>";
import { ThemeStyle } from "msteams-ui-styles-core";

describe("<%=tabReactComponentName%> Component", () => {
    // Snapshot Test Sample
    it("should match the snapshot", () => {
        const tree = renderer.create(<<%=tabReactComponentName%> <% if (!connector) { %>theme={ ThemeStyle.Light } fontSize={14}<% } %> />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    // Component Test Sample
    it("should render the tab", () => {
        const component = shallow(<<%=tabReactComponentName%> <% if (!connector) { %>theme={ ThemeStyle.Light } fontSize={14}<% } %> />);
        const divResult = component.containsMatchingElement(<div>This is your tab</div>);

        expect(divResult).toBeTruthy();
    });

    // Mocking Sample
    it("should show alert on button click", () => {
        window.alert = jest.fn();

        const component = mount(<<%=tabReactComponentName%> <% if (!connector) { %>theme={ ThemeStyle.Light } fontSize={14}<% } %> />);
        const button = component.find("button");
        button.simulate("click");

        expect(window.alert).toHaveBeenCalledWith("It worked!");

        component.unmount();
    });
});

