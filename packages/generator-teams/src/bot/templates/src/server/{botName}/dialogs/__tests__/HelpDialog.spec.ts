import { HelpDialog } from "../helpDialog";
import { DialogTestClient } from "botbuilder-testing";

describe("bot:HelpDialog", () => {
    const helpDialog = new HelpDialog();
    const testClient = new DialogTestClient("msteams", helpDialog);

    it("Should receive an answer", async () => {
        const reply = await testClient.sendActivity("");
        expect(reply.text).toEqual(`I'm terribly sorry, but my developer hasn't trained me to do anything yet 😂. Please refer to [this link](https://docs.microsoft.com/en-us/microsoftteams/platform/bots/what-are-bots) to see how to develop bots for Teams`);
    });

});
