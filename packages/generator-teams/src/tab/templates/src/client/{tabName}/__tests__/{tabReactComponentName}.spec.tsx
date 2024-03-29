import * as React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { Header } from "@fluentui/react-northstar";
import { act } from "react-dom/test-utils";


import { <%=tabReactComponentName%> } from "../<%=tabReactComponentName%>";

describe("<%=tabReactComponentName%> Component", () => {
    // Snapshot Test Sample
    it("should match the snapshot", () => {
        const wrapper = shallow(<<%=tabReactComponentName%> />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    // Component Test Sample
    it("should render the tab", () => {
        const component = shallow(<<%=tabReactComponentName%> />);
        const divResult = component.containsMatchingElement(<Header content="This is your tab" />);

        expect(divResult).toBeTruthy();
    });

    // Mocking Sample
    it("should show alert on button click", async () => {
        window.alert = jest.fn();

        let component;
        await act (async () => {
            component = mount(<<%=tabReactComponentName%> />);
        });

        const button = component.find("button");

        button.simulate("click");
        
        expect(window.alert).toHaveBeenCalledWith("It worked!");

    });
});
