import * as del from "del";
import * as helpers from "yeoman-test";
import * as assert from "yeoman-assert";
import { describe, it } from "mocha";

import * as testHelper from "./helpers/TestHelper";

describe("teams:bot", async () => {
  const BOT_HTML_FILES = ["src/app/web/bottest01Bot/aboutBottest01Bot.html"];

  const BOT_SCRIPT_FILES = [
    "src/app/scripts/bottest01Bot/AboutBottest01BotTab.tsx"
  ];

  const BOT_SCRIPT_TEST_FILES = [
    "src/app/scripts/bottest01Bot/__tests__/AboutBottest01BotTab.spec.tsx"
  ];

  const BOT_FILES = [
    "src/app/bottest01Bot/Bottest01Bot.ts",
    "src/app/bottest01Bot/dialogs/HelpDialog.ts",
    "src/app/bottest01Bot/dialogs/WelcomeDialog.ts",
    "src/app/bottest01Bot/dialogs/WelcomeCard.json"
  ];

  beforeEach(async () => {
    await del([testHelper.TEMP_GENERATOR_PATTERN]);
  });

  it("should generate bot project with v1.3 with unit tests", async () => {
    const projectPath = testHelper.TEMP_BOT_GENERATOR_PATH + "/bot01-v13-withUnitT";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "bot-test-01",
        whichFolder: "current",
        name: "bottest01",
        developer: "generator teams developer",
        manifestVersion: "v1.3",
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
    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_13);

    assert.file(BOT_SCRIPT_FILES);
    assert.file(BOT_SCRIPT_TEST_FILES);
    assert.file(BOT_FILES);
    assert.file(BOT_HTML_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);

      const npmRunTestResult = await testHelper.runNpmCommand("npm run test", projectPath);
      assert.equal(false, npmRunTestResult);
    }
  });

  it("should generate bot project with v1.3 without unit tests", async () => {
    const projectPath = testHelper.TEMP_BOT_GENERATOR_PATH + "/bot01-v13-withoutUnitT";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "bot-test-01",
        whichFolder: "current",
        name: "bottest01",
        developer: "generator teams developer",
        manifestVersion: "v1.3",
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
    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_13);

    assert.file(BOT_SCRIPT_FILES);
    assert.noFile(BOT_SCRIPT_TEST_FILES);
    assert.file(BOT_FILES);
    assert.file(BOT_HTML_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate bot project with v1.4 with unit tests", async () => {
    const projectPath = testHelper.TEMP_BOT_GENERATOR_PATH + "/bot01-v14-withUnitT";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "bot-test-01",
        whichFolder: "current",
        name: "bottest01",
        developer: "generator teams developer",
        manifestVersion: "v1.4",
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
    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_14);

    assert.file(BOT_SCRIPT_FILES);
    assert.file(BOT_SCRIPT_TEST_FILES);
    assert.file(BOT_FILES);
    assert.file(BOT_HTML_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);

      const npmRunTestResult = await testHelper.runNpmCommand("npm run test", projectPath);
      assert.equal(false, npmRunTestResult);
    }
  });

  it("should generate bot project with v1.4 without unit tests", async () => {
    const projectPath = testHelper.TEMP_BOT_GENERATOR_PATH + "/bot01-v14-withoutUnitT";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "bot-test-01",
        whichFolder: "current",
        name: "bottest01",
        developer: "generator teams developer",
        manifestVersion: "v1.4",
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
    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_14);
    assert.noJsonFileContent("src/manifest/manifest.json", {
      bots: [{ supportsFiles: true }]
    });

    assert.file(BOT_SCRIPT_FILES);
    assert.noFile(BOT_SCRIPT_TEST_FILES);
    assert.file(BOT_FILES);
    assert.file(BOT_HTML_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate bot project with v1.4 without unit tests, and files support", async () => {
    const projectPath = testHelper.TEMP_BOT_GENERATOR_PATH + "/bot01-v14-withoutUnitTAndFiles";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "bot-test-01",
        whichFolder: "current",
        name: "bottest01",
        developer: "generator teams developer",
        manifestVersion: "v1.4",
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
    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_14);
    assert.jsonFileContent("src/manifest/manifest.json", {
      bots: [{ supportsFiles: true }]
    });

    assert.file(BOT_SCRIPT_FILES);
    assert.noFile(BOT_SCRIPT_TEST_FILES);
    assert.file(BOT_FILES);
    assert.file(BOT_HTML_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate bot project with v1.5 with unit tests", async () => {
    const projectPath = testHelper.TEMP_BOT_GENERATOR_PATH + "/bot01-v15-withUnitT";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "bot-test-01",
        whichFolder: "current",
        name: "bottest01",
        developer: "generator teams developer",
        manifestVersion: "v1.5",
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
    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_15);

    assert.file(BOT_SCRIPT_FILES);
    assert.file(BOT_SCRIPT_TEST_FILES);
    assert.file(BOT_FILES);
    assert.file(BOT_HTML_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);

      const npmRunTestResult = await testHelper.runNpmCommand("npm run test", projectPath);
      assert.equal(false, npmRunTestResult);
    }
  });

  it("should generate bot project with v1.5 without unit tests", async () => {
    const projectPath = testHelper.TEMP_BOT_GENERATOR_PATH + "/bot01-v15-withoutUnitT";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "bot-test-01",
        whichFolder: "current",
        name: "bottest01",
        developer: "generator teams developer",
        manifestVersion: "v1.5",
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
    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_15);
    assert.noJsonFileContent("src/manifest/manifest.json", {
      bots: [{ supportsFiles: true }]
    });

    assert.file(BOT_SCRIPT_FILES);
    assert.noFile(BOT_SCRIPT_TEST_FILES);
    assert.file(BOT_FILES);
    assert.file(BOT_HTML_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate bot project with v1.5 without unit tests, and files support", async () => {
    const projectPath = testHelper.TEMP_BOT_GENERATOR_PATH + "/bot01-v15-withoutUnitTAndFiles";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "bot-test-01",
        whichFolder: "current",
        name: "bottest01",
        developer: "generator teams developer",
        manifestVersion: "v1.5",
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
    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_15);
    assert.jsonFileContent("src/manifest/manifest.json", {
      bots: [{ supportsFiles: true }]
    });

    assert.file(BOT_SCRIPT_FILES);
    assert.noFile(BOT_SCRIPT_TEST_FILES);
    assert.file(BOT_FILES);
    assert.file(BOT_HTML_FILES);

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
    assert.fileContent(
      "src/manifest/manifest.json",
      testHelper.SCHEMA_DEVPREVIEW
    );

    assert.file(BOT_SCRIPT_FILES);
    assert.file(BOT_SCRIPT_TEST_FILES);
    assert.file(BOT_FILES);
    assert.file(BOT_HTML_FILES);

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
    assert.fileContent(
      "src/manifest/manifest.json",
      testHelper.SCHEMA_DEVPREVIEW
    );

    assert.file(BOT_SCRIPT_FILES);
    assert.noFile(BOT_SCRIPT_TEST_FILES);
    assert.file(BOT_FILES);
    assert.file(BOT_HTML_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });
});
