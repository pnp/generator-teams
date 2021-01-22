import * as del from "del";
import * as helpers from "yeoman-test";
import * as assert from "yeoman-assert";
import { describe, it } from "mocha";

import * as testHelper from "./helpers/TestHelper";

describe("teams:bot", async () => {
  const BOT_HTML_FILES = ["src/public/bottest01Bot/aboutBottest01Bot.html"];

  const BOT_SCRIPT_FILES = [
    "src/client/bottest01Bot/AboutBottest01BotTab.tsx"
  ];

  const BOT_SCRIPT_TEST_FILES = [
    "src/client/bottest01Bot/__tests__/AboutBottest01BotTab.spec.tsx"
  ];

  const BOT_FILES = [
    "src/server/bottest01Bot/Bottest01Bot.ts",
    "src/server/bottest01Bot/dialogs/HelpDialog.ts",
    "src/server/bottest01Bot/dialogs/WelcomeDialog.ts",
    "src/server/bottest01Bot/dialogs/WelcomeCard.json"
  ];

  beforeEach(async () => {
    await del([testHelper.TEMP_GENERATOR_PATTERN]);
  });

 

  it("should generate bot project with v1.8 without unit tests, and files support", async () => {
    const projectPath = testHelper.TEMP_BOT_GENERATOR_PATH + "/bot01-v18-withoutUnitTAndFiles";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "bot-test-01",
        whichFolder: "current",
        name: "bottest01",
        developer: "generator teams developer",
        manifestVersion: "v1.8",
        parts: "bot",
        unitTestsEnabled: false,
        botFilesEnabled: true
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.file(testHelper.ROOT_FILES);
    assert.noFile(testHelper.TEST_FILES);
    assert.file(testHelper.APP_FILES);
    assert.file(testHelper.SCRIPT_FILES);
    assert.file(testHelper.WEB_FILES);
    assert.file(testHelper.MANIFEST_FILES);
    assert.file(testHelper.LINT_FILES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_18);
    assert.jsonFileContent("src/manifest/manifest.json", {
      bots: [{ supportsFiles: true }]
    });

    assert.file(BOT_SCRIPT_FILES);
    assert.noFile(BOT_SCRIPT_TEST_FILES);
    assert.file(BOT_FILES);
    assert.file(BOT_HTML_FILES);

    assert.jsonFileContent("package.json", { dependencies: { "react": "^16.8.6", "react-dom": "^16.8.6" } });

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate bot project with v1.8 with calling support", async () => {
    const projectPath = testHelper.TEMP_BOT_GENERATOR_PATH + "/bot01-v18-withoutUnitTAndFiles";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "bot-test-01",
        whichFolder: "current",
        name: "bottest01",
        developer: "generator teams developer",
        manifestVersion: "v1.8",
        parts: "bot",
        unitTestsEnabled: false,
        botCallingEnabled: true,
        botFilesEnabled: false
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.file(testHelper.ROOT_FILES);
    assert.noFile(testHelper.TEST_FILES);
    assert.file(testHelper.APP_FILES);
    assert.file(testHelper.SCRIPT_FILES);
    assert.file(testHelper.WEB_FILES);
    assert.file(testHelper.MANIFEST_FILES);
    assert.file(testHelper.LINT_FILES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_18);
    assert.jsonFileContent("src/manifest/manifest.json", {
      bots: [{ supportsCalling: true, supportsVideo: true }]
    });

    assert.file(BOT_SCRIPT_FILES);
    assert.noFile(BOT_SCRIPT_TEST_FILES);
    assert.file(BOT_FILES);
    assert.file(BOT_HTML_FILES);

    assert.jsonFileContent("package.json", { dependencies: { "react": "^16.8.6", "react-dom": "^16.8.6" } });

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate bot project with devPreview with unit tests", async () => {
    const projectPath = testHelper.TEMP_BOT_GENERATOR_PATH + "/bot01-devPrev-withUnitT";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "bot-test-01",
        whichFolder: "current",
        name: "bottest01",
        developer: "generator teams developer",
        manifestVersion: "devPreview",
        parts: "bot",
        unitTestsEnabled: true
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.file(testHelper.ROOT_FILES);
    assert.file(testHelper.TEST_FILES);
    assert.file(testHelper.APP_FILES);
    assert.file(testHelper.SCRIPT_FILES);
    assert.file(testHelper.WEB_FILES);
    assert.file(testHelper.MANIFEST_FILES);
    assert.file(testHelper.LINT_FILES);

    assert.fileContent(
      "src/manifest/manifest.json",
      testHelper.SCHEMA_DEVPREVIEW
    );

    assert.file(BOT_SCRIPT_FILES);
    assert.file(BOT_SCRIPT_TEST_FILES);
    assert.file(BOT_FILES);
    assert.file(BOT_HTML_FILES);

    assert.jsonFileContent("package.json", { dependencies: { "react": "^16.8.6", "react-dom": "^16.8.6" } });

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);

      const npmRunTestResult = await testHelper.runNpmCommand("npm run test", projectPath);
      assert.equal(false, npmRunTestResult);
    }
  });

  it("should generate bot project with devPreview without unit tests", async () => {
    const projectPath = testHelper.TEMP_BOT_GENERATOR_PATH + "/bot01-devPrev-withoutUnitT";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "bot-test-01",
        whichFolder: "current",
        name: "bottest01",
        developer: "generator teams developer",
        manifestVersion: "devPreview",
        parts: "bot",
        unitTestsEnabled: false
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.file(testHelper.ROOT_FILES);
    assert.noFile(testHelper.TEST_FILES);
    assert.file(testHelper.APP_FILES);
    assert.file(testHelper.SCRIPT_FILES);
    assert.file(testHelper.WEB_FILES);
    assert.file(testHelper.MANIFEST_FILES);
    assert.file(testHelper.LINT_FILES);
    assert.fileContent(
      "src/manifest/manifest.json",
      testHelper.SCHEMA_DEVPREVIEW
    );

    assert.file(BOT_SCRIPT_FILES);
    assert.noFile(BOT_SCRIPT_TEST_FILES);
    assert.file(BOT_FILES);
    assert.file(BOT_HTML_FILES);

    assert.jsonFileContent("package.json", { dependencies: { "react": "^16.8.6", "react-dom": "^16.8.6" } });

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });
});
