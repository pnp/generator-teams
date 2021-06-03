import <%=messageExtensionClassName%> from "../<%=messageExtensionClassName%>";

describe("<%=messageExtensionClassName%>", () => {
    it("Should create the middleware", () => {
        const middleware = new <%=messageExtensionClassName%>();
        expect(middleware).toBeDefined();
    });
});