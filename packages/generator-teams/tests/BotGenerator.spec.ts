import * as del from "del";
import * as helpers from "yeoman-test";
import * as assert from "yeoman-assert";
import { describe, it } from "mocha";


import * as testHelper from "./helpers/TestHelper";


const tests = require("./tests.json");


describe("teams:bot", async () => {
  const BOT_HTML_FILES = ["src/public/teamsSolutionBot/aboutTeamsSolutionBot.html"];

  const BOT_SCRIPT_FILES = [
    "src/client/teamsSolutionBot/AboutTeamsSolutionBotTab.tsx"
  ];

  const BOT_SCRIPT_TEST_FILES = [
    "src/client/teamsSolutionBot/__tests__/AboutTeamsSolutionBotTab.spec.tsx"
  ];

  const BOT_SERVER_TEST_FILES = [
    "src/server/teamsSolutionBot/dialogs/__tests__/HelpDialog.spec.ts"
  ];

  const BOT_FILES = [
    "src/server/teamsSolutionBot/TeamsSolutionBot.ts",
    "src/server/teamsSolutionBot/dialogs/HelpDialog.ts",
    "src/server/teamsSolutionBot/dialogs/WelcomeDialog.ts",
    "src/server/teamsSolutionBot/dialogs/WelcomeCard.json"
  ];

  beforeEach(async () => {
    await del([testHelper.TEMP_GENERATOR_PATTERN]);
  });


  async function botTests(prompts: any) {
    if (prompts.botFilesEnabled) {
      it("Manifest has file support", async () => {
        assert.jsonFileContent("src/manifest/manifest.json", {
          bots: [{ supportsFiles: true }]
        });
      });
    } else {
      it("Manifest should not have file support", async () => {
        assert.noJsonFileContent("src/manifest/manifest.json", {
          bots: [{ supportsFiles: true }]
        });
      });
    }
    if (prompts.botCallingEnabled) {
      it("Manifest has calling support", async () => {
        assert.jsonFileContent("src/manifest/manifest.json", {
          bots: [{ supportsCalling: true, supportsVideo: true }]
        });
      });
    } else {
      it("Manifest should not have calling support", async () => {
        assert.noJsonFileContent("src/manifest/manifest.json", {
          bots: [{ supportsCalling: true, supportsVideo: true }]
        });
      });
    }

    if (prompts.unitTestsEnabled && prompts.staticTab) {
      it("Should have bot unit test files", async () => {
        assert.file(BOT_SCRIPT_TEST_FILES);
      });
    } else {
      it("Should not have bot unit test files", async () => {
        assert.noFile(BOT_SCRIPT_TEST_FILES);
      });
    }

    if (prompts.unitTestsEnabled) {
      it("Should have bot dialog unit test files", async () => {
        assert.file(BOT_SERVER_TEST_FILES);
      });
      it("Should have package botbuilder-testing", async () => {
        assert.jsonFileContent("package.json", {
          devDependencies: { "botbuilder-testing": "4.14.1" }
        });
      });
    } else {
      it("Should not have bot unit test files", async () => {
        assert.noFile(BOT_SERVER_TEST_FILES);
      });
      it("Should not have package botbuilder-testing", async () => {
        assert.noJsonFileContent("package.json", {
          devDependencies: { "botbuilder-testing": "4.14.1" }
        });
      });
    }

    it("Should have bot app files", async () => {
      assert.file(BOT_FILES);
    });

    if (prompts.staticTab) {
      it("Should have bot html files", async () => {
        assert.file(BOT_HTML_FILES);
      });
    } else {
      it("Should not have bot html files", async () => {
        assert.noFile(BOT_HTML_FILES);
      });
    }

    if (prompts.staticTab) {
      it("Should have bot script files", async () => {
        assert.file(BOT_SCRIPT_FILES);
      });
    } else {
      it("Should not have bot script files", async () => {
        assert.noFile(BOT_SCRIPT_FILES);
      });
    }
  }


  await testHelper.runTests("bot", tests.bot, botTests);

});
