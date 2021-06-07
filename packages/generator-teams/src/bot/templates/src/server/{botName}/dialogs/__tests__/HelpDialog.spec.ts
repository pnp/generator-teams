import HelpDialog from "../HelpDialog";
import { DialogTestClient } from "botbuilder-testing";

describe("bot:HelpDialog", () => {
    const helpDialog = new HelpDialog("help");
    const testClient = new DialogTestClient("msteams", helpDialog);

    it("Should receive an answer", async () => {
        const reply = await testClient.sendActivity("");
        expect(reply.text).toEqual("I'm just a friendly but rather stupid bot, and right now I don't have any valuable help for you!");
    });

});
