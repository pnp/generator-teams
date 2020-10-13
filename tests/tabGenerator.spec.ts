import * as del from "del";
import * as helpers from "yeoman-test";
import * as assert from "yeoman-assert";
import { describe, it } from "mocha";

import * as testHelper from "./helpers/TestHelper";


const TAB_HTML_FILES = [
  "src/app/web/tabtest01Tab/index.html",
  "src/app/web/tabtest01Tab/config.html",
  "src/app/web/tabtest01Tab/remove.html"
];

const TAB_SCRIPT_FILES = [
  "src/app/scripts/tabtest01Tab/Tabtest01Tab.tsx",
  "src/app/scripts/tabtest01Tab/Tabtest01TabConfig.tsx",
  "src/app/scripts/tabtest01Tab/Tabtest01TabRemove.tsx"
];

const TAB_SCRIPT_TEST_FILES = [
  "src/app/scripts/tabtest01Tab/__tests__/Tabtest01Tab.spec.tsx",
  "src/app/scripts/tabtest01Tab/__tests__/Tabtest01TabConfig.spec.tsx",
  "src/app/scripts/tabtest01Tab/__tests__/Tabtest01TabRemove.spec.tsx"
];

const TAB_HTML_FILES_STATIC = ["src/app/web/tabtest01Tab/index.html"];

const TAB_SCRIPT_FILES_STATIC = [
  "src/app/scripts/tabtest01Tab/Tabtest01Tab.tsx"
];

const TAB_SCRIPT_TEST_FILES_STATIC = [
  "src/app/scripts/tabtest01Tab/__tests__/Tabtest01Tab.spec.tsx"
];

const TAB_FILES = "src/app/tabtest01Tab/Tabtest01Tab.ts";
describe("teams:tab", function () {
  beforeEach(async () => {
    await del([testHelper.TEMP_GENERATOR_PATTERN]);
  });

  it("should generate tab project with v1.5 with unit tests", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01-15";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.5",
        parts: "tab",
        unitTestsEnabled: true,
        tabType: "configurable"
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.file(testHelper.ROOT_FILES);
    assert.file(testHelper.TEST_FILES);
    assert.file(testHelper.APP_FILES);
    assert.file(testHelper.SCRIPT_FILES);
    assert.file(testHelper.WEB_FILES);
    assert.file(testHelper.MANIFEST_FILES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_15);

    assert.jsonFileContent("src/manifest/manifest.json", {
      configurableTabs: [
        {
          canUpdateConfiguration: true
        }
      ]
    });

    assert.file(TAB_HTML_FILES);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES);
    assert.file(TAB_SCRIPT_TEST_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand('npm install', projectPath);
      assert.equal(false, npmInstallResult)

      const npmRunBuildResult = await testHelper.runNpmCommand('npm run build', projectPath);
      assert.equal(false, npmRunBuildResult)
    }
  });

  it("should generate tab project with v1.6 with unit tests", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01-16";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.6",
        parts: "tab",
        unitTestsEnabled: true,
        tabType: "configurable",
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.file(testHelper.ROOT_FILES);
    assert.file(testHelper.TEST_FILES);
    assert.file(testHelper.APP_FILES);
    assert.file(testHelper.SCRIPT_FILES);
    assert.file(testHelper.WEB_FILES);
    assert.file(testHelper.MANIFEST_FILES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_16);

    assert.jsonFileContent("src/manifest/manifest.json", {
      showLoadingIndicator: false
    });

    assert.file(TAB_HTML_FILES);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES);
    assert.file(TAB_SCRIPT_TEST_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand('npm install', projectPath);
      assert.equal(false, npmInstallResult)

      const npmRunBuildResult = await testHelper.runNpmCommand('npm run build', projectPath);
      assert.equal(false, npmRunBuildResult)
    }
  });

  it("should generate tab project with devPreview with unit tests", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01-devPreview";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "devPreview",
        parts: "tab",
        unitTestsEnabled: true,
        tabType: "configurable"
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.file(testHelper.ROOT_FILES);
    assert.file(testHelper.TEST_FILES);
    assert.file(testHelper.APP_FILES);
    assert.file(testHelper.SCRIPT_FILES);
    assert.file(testHelper.WEB_FILES);
    assert.file(testHelper.MANIFEST_FILES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_DEVPREVIEW);

    assert.jsonFileContent("src/manifest/manifest.json", {
      configurableTabs: [
        {
          canUpdateConfiguration: true
        }
      ]
    });

    assert.file(TAB_HTML_FILES);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES);
    assert.file(TAB_SCRIPT_TEST_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand('npm install', projectPath);
      assert.equal(false, npmInstallResult)

      const npmRunBuildResult = await testHelper.runNpmCommand('npm run build', projectPath);
      assert.equal(false, npmRunBuildResult)
    }
  });




  it("should generate tab project with v1.3 with unit tests", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01-v13-withUnit";
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.3",
        parts: "tab",
        unitTestsEnabled: true,
        tabType: "configurable"
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.file(testHelper.ROOT_FILES);
    assert.file(testHelper.TEST_FILES);
    assert.file(testHelper.APP_FILES);
    assert.file(testHelper.SCRIPT_FILES);
    assert.file(testHelper.WEB_FILES);
    assert.file(testHelper.MANIFEST_FILES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_13);
    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);

      const npmRunTestResult = await testHelper.runNpmCommand("npm run test", projectPath);
      assert.equal(false, npmRunTestResult);
    }
  });

  it("should generate a static tab project with v1.3 with unit tests", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01-v13-withUnitTAndStatic";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.3",
        parts: "tab",
        unitTestsEnabled: true,
        tabType: "static"
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.file(testHelper.ROOT_FILES);
    assert.file(testHelper.TEST_FILES);
    assert.file(testHelper.APP_FILES);
    assert.file(testHelper.SCRIPT_FILES);
    assert.file(testHelper.WEB_FILES);
    assert.file(testHelper.MANIFEST_FILES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_13);

    assert.jsonFileContent("src/manifest/manifest.json", {
      staticTabs: [
        {
          scopes: ["personal"]
        }
      ]
    });

    assert.file(TAB_HTML_FILES_STATIC);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES_STATIC);
    assert.file(TAB_SCRIPT_TEST_FILES_STATIC);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);

      const npmRunTestResult = await testHelper.runNpmCommand("npm run test", projectPath);
      assert.equal(false, npmRunTestResult);
    }
  });

  it("should generate tab project with v1.3 without unit tests", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01-v13-withoutUnitT";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.3",
        parts: "tab",
        unitTestsEnabled: false,
        tabType: "configurable"
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.file(testHelper.ROOT_FILES);
    assert.noFile(testHelper.TEST_FILES);
    assert.file(testHelper.APP_FILES);
    assert.file(testHelper.SCRIPT_FILES);
    assert.file(testHelper.WEB_FILES);
    assert.file(testHelper.MANIFEST_FILES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_13);

    assert.jsonFileContent("src/manifest/manifest.json", {
      configurableTabs: [
        {
          canUpdateConfiguration: true
        }
      ]
    });

    assert.file(TAB_HTML_FILES);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES);
    assert.noFile(TAB_SCRIPT_TEST_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate a static tab project with v1.3 without unit tests", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01-v13-withStaticwithoutUnitT";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.3",
        parts: "tab",
        unitTestsEnabled: false,
        tabType: "static"
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.file(testHelper.ROOT_FILES);
    assert.noFile(testHelper.TEST_FILES);
    assert.file(testHelper.APP_FILES);
    assert.file(testHelper.SCRIPT_FILES);
    assert.file(testHelper.WEB_FILES);
    assert.file(testHelper.MANIFEST_FILES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_13);

    assert.jsonFileContent("src/manifest/manifest.json", {
      staticTabs: [
        {
          scopes: ["personal"]
        }
      ]
    });

    assert.file(TAB_HTML_FILES_STATIC);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES_STATIC);
    assert.noFile(TAB_SCRIPT_TEST_FILES_STATIC);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate tab project with v1.3 applicatiaon insights", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01-v13-withAI";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.3",
        parts: "tab",
        unitTestsEnabled: false,
        useAzureAppInsights: true,
        azureAppInsightsKey: "12341234-1234-1234-1234-123412341234",
        tabType: "configurable"
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.fileContent(
      ".env",
      "APPINSIGHTS_INSTRUMENTATIONKEY=12341234-1234-1234-1234-123412341234"
    );
    assert.fileContent("package.json", `"applicationinsights": "^1.3.1"`);
    assert.fileContent(
      "src/app/web/index.html",
      `var appInsights = window.appInsights`
    );

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate tab project with v1.3 with noapplicatiaon insights", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01-v13-withoutAI";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.3",
        parts: "tab",
        unitTestsEnabled: false,
        useAzureAppInsights: false,
        tabType: "configurable"
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.fileContent(".env", "APPINSIGHTS_INSTRUMENTATIONKEY=");
    assert.noFileContent("package.json", `"applicationinsights": "^1.3.1"`);
    assert.noFileContent(
      "src/app/web/index.html",
      `var appInsights = window.appInsights`
    );

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate tab project with v1.4 with unit tests", async () => {
    const projectPath =
      testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01-v14-withUnitT";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.4",
        parts: "tab",
        unitTestsEnabled: true,
        tabType: "configurable"
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.file(testHelper.ROOT_FILES);
    assert.file(testHelper.TEST_FILES);
    assert.file(testHelper.APP_FILES);
    assert.file(testHelper.SCRIPT_FILES);
    assert.file(testHelper.WEB_FILES);
    assert.file(testHelper.MANIFEST_FILES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_14);

    assert.jsonFileContent("src/manifest/manifest.json", {
      configurableTabs: [
        {
          canUpdateConfiguration: true
        }
      ]
    });

    assert.file(TAB_HTML_FILES);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES);
    assert.file(TAB_SCRIPT_TEST_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);

      const npmRunTestResult = await testHelper.runNpmCommand("npm run test", projectPath);
      assert.equal(false, npmRunTestResult);
    }
  });

  it("should generate tab project with v1.4 without unit tests", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01-v14-withoutUnitT";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.4",
        parts: "tab",
        unitTestsEnabled: false,
        tabType: "configurable"
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
      configurableTabs: [
        {
          canUpdateConfiguration: true
        }
      ]
    });

    assert.file(TAB_HTML_FILES);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES);
    assert.noFile(TAB_SCRIPT_TEST_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate a static tab project with v1.4 without unit tests", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01-v14-withoutUnitTwithStatic";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.4",
        parts: "tab",
        unitTestsEnabled: false,
        tabType: "static"
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
      staticTabs: [
        {
          scopes: ["personal"]
        }
      ]
    });

    assert.file(TAB_HTML_FILES_STATIC);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES_STATIC);
    assert.noFile(TAB_SCRIPT_TEST_FILES_STATIC);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate tab project with v1.4 with SharePoint config", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01-v14-withSP";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.4",
        parts: "tab",
        unitTestsEnabled: false,
        tabSharePoint: true,
        tabSharePointHosts: ["sharePointFullPage", "sharePointWebPart"],
        tabType: "configurable"
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
      configurableTabs: [
        {
          sharePointPreviewImage:
            "https://{{HOSTNAME}}/assets/tabtest01Tab-preview.png",
          supportedSharePointHosts: ["sharePointFullPage", "sharePointWebPart"]
        }
      ]
    });

    assert.file(TAB_HTML_FILES);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES);
    assert.noFile(TAB_SCRIPT_TEST_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate tab project with v1.5 without unit tests", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01-v15-withoutUnitT";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.5",
        parts: "tab",
        unitTestsEnabled: false,
        tabType: "configurable"
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
      configurableTabs: [
        {
          canUpdateConfiguration: true
        }
      ]
    });
    assert.noJsonFileContent("src/manifest/manifest.json", {
      webApplicationInfo: {}
    });

    assert.file(TAB_HTML_FILES);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES);
    assert.noFile(TAB_SCRIPT_TEST_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate tab project with v1.5 with SharePoint config", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01-v15-withSP";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.5",
        parts: "tab",
        unitTestsEnabled: false,
        tabSharePoint: true,
        tabSharePointHosts: ["sharePointFullPage", "sharePointWebPart"],
        tabType: "configurable"
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
      configurableTabs: [
        {
          sharePointPreviewImage:
            "https://{{HOSTNAME}}/assets/tabtest01Tab-preview.png",
          supportedSharePointHosts: ["sharePointFullPage", "sharePointWebPart"]
        }
      ]
    });

    assert.file(TAB_HTML_FILES);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES);
    assert.noFile(TAB_SCRIPT_TEST_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate tab project with v1.5 with MPM Id", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01-v15-withMPM";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.5",
        parts: "tab",
        unitTestsEnabled: false,
        mpnId: "1234567890",
        tabType: "configurable"
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
      developer: {
        mpnId: "1234567890"
      }
    });
    assert.jsonFileContent("src/manifest/manifest.json", {
      configurableTabs: [
        {
          canUpdateConfiguration: true
        }
      ]
    });
    assert.file(TAB_HTML_FILES);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES);
    assert.noFile(TAB_SCRIPT_TEST_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate tab project with v1.5 scoped to groupchat only", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01-v15-GroupChat";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.5",
        parts: "tab",
        tabScopes: ["groupchat"],
        tabType: "configurable"
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.jsonFileContent("src/manifest/manifest.json", {
      configurableTabs: [
        {
          scopes: ["groupchat"]
        }
      ]
    });

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate tab project with v1.5 scoped to team only", async () => {
    const projectPath =
      testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01-v15-TeamChat";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.5",
        parts: "tab",
        tabScopes: ["team"],
        tabType: "configurable"
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.jsonFileContent("src/manifest/manifest.json", {
      configurableTabs: [
        {
          scopes: ["team"]
        }
      ]
    });

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate tab project with v1.5 scoped to groupchat and team", async () => {
    const projectPath =
      testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01-v15-GroupAndTeamChat";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.5",
        parts: "tab",
        tabScopes: ["team", "groupchat"],
        tabType: "configurable"
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.jsonFileContent("src/manifest/manifest.json", {
      configurableTabs: [
        {
          scopes: ["team", "groupchat"]
        }
      ]
    });

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate tab project with devPreview with unit tests", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01-dev-withUnitT";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "devPreview",
        parts: "tab",
        unitTestsEnabled: true,
        tabType: "configurable"
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

    assert.jsonFileContent("src/manifest/manifest.json", {
      configurableTabs: [
        {
          canUpdateConfiguration: true
        }
      ]
    });

    assert.file(TAB_HTML_FILES);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES);
    assert.file(TAB_SCRIPT_TEST_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);

      const npmRunTestResult = await testHelper.runNpmCommand("npm run test", projectPath);
      assert.equal(false, npmRunTestResult);
    }
  });

  it("should generate tab project with devPreview without unit tests", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01-dev-withoutUnitT";

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "devPreview",
        parts: "tab",
        unitTestsEnabled: false,
        tabType: "configurable"
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

    assert.jsonFileContent("src/manifest/manifest.json", {
      configurableTabs: [
        {
          canUpdateConfiguration: true
        }
      ]
    });

    assert.file(TAB_HTML_FILES);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES);
    assert.noFile(TAB_SCRIPT_TEST_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate tab project with SSO support (schema 1.5)", async () => {
    const TABSSOAPPID = "00000000-0000-0000-0000-000000000123";
    const TABSSOAPPURI = "api://tabtest01.azurewebsites.net/00000000-0000-0000-0000-000000000123";
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab-15-SSO";
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01-sso",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.5",
        parts: "tab",
        unitTestsEnabled: false,
        tabSharePoint: false,
        tabSSO: true,
        tabSSOAppId: TABSSOAPPID,
        tabSSOAppUri: TABSSOAPPURI,
        tabType: "configurable"
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
      webApplicationInfo:
      {
        id: "{{TABTEST01TAB_APP_ID}}",
        resource: "{{TABTEST01TAB_APP_URI}}"
      }

    });
    assert.fileContent(".env", `TABTEST01TAB_APP_ID=${TABSSOAPPID}`);
    assert.fileContent(".env", `TABTEST01TAB_APP_URI=${TABSSOAPPURI}`);

    assert.file(TAB_HTML_FILES);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES);
    assert.noFile(TAB_SCRIPT_TEST_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate tab project with SSO support (schema 1.6)", async () => {
    const TABSSOAPPID = "00000000-0000-0000-0000-000000000123";
    const TABSSOAPPURI = "api://tabtest01.azurewebsites.net/00000000-0000-0000-0000-000000000123";
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab-16-SSO"
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01-sso",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.6",
        parts: "tab",
        unitTestsEnabled: false,
        tabSharePoint: false,
        tabSSO: true,
        tabSSOAppId: TABSSOAPPID,
        tabSSOAppUri: TABSSOAPPURI,
        tabType: "configurable"
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.file(testHelper.ROOT_FILES);
    assert.noFile(testHelper.TEST_FILES);
    assert.file(testHelper.APP_FILES);
    assert.file(testHelper.SCRIPT_FILES);
    assert.file(testHelper.WEB_FILES);
    assert.file(testHelper.MANIFEST_FILES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_16);
    assert.jsonFileContent("src/manifest/manifest.json", {
      webApplicationInfo:
      {
        id: "{{TABTEST01TAB_APP_ID}}",
        resource: "{{TABTEST01TAB_APP_URI}}"
      }

    });
    assert.fileContent(".env", `TABTEST01TAB_APP_ID=${TABSSOAPPID}`);
    assert.fileContent(".env", `TABTEST01TAB_APP_URI=${TABSSOAPPURI}`);

    assert.file(TAB_HTML_FILES);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES);
    assert.noFile(TAB_SCRIPT_TEST_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  describe("Tab project with SSO support (schema 1.7)", () => {
    const TABSSOAPPID = "00000000-0000-0000-0000-000000000123";
    const TABSSOAPPURI = "api://tabtest01.azurewebsites.net/00000000-0000-0000-0000-000000000123";
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab-17-SSO";

    before(async () => {
      await helpers
        .run(testHelper.GENERATOR_PATH)
        .inDir(projectPath)
        .withArguments(["--no-telemetry"])
        .withPrompts({
          solutionName: "tab-test-01-sso",
          whichFolder: "current",
          name: "tabtest01",
          developer: "generator teams developer",
          manifestVersion: "v1.7",
          parts: "tab",
          unitTestsEnabled: false,
          tabSharePoint: false,
          tabSSO: true,
          tabSSOAppId: TABSSOAPPID,
          tabSSOAppUri: TABSSOAPPURI,
          tabType: "configurable"
        })
        .withGenerators(testHelper.DEPENDENCIES);
    })

    it("Should have root files", async () => {
      assert.file(testHelper.ROOT_FILES);
    });
    it("Should not have test files", async () => {
      assert.noFile(testHelper.TEST_FILES);
    });
    it("Should have app files", async () => {
      assert.file(testHelper.APP_FILES);
    });
    it("Should have script files", async () => {
      assert.file(testHelper.SCRIPT_FILES);
    });
    it("Should have web files", async () => {
      assert.file(testHelper.WEB_FILES);
    });
    it("Should have manifest files", async () => {
      assert.file(testHelper.MANIFEST_FILES);
    });
    it("Should have tab html files", async () => {
      assert.file(TAB_HTML_FILES);
    });
    it("Should have manifest files", async () => {
      assert.file(testHelper.MANIFEST_FILES);
    });
    it("Should have tab files", async () => {
      assert.file(TAB_FILES);
    });
    it("Should have tab script files", async () => {
      assert.file(TAB_SCRIPT_FILES);
    });
    it("Should not have tab script test files", async () => {
      assert.noFile(TAB_SCRIPT_TEST_FILES);
    });
    it("Should have schema 1.7", async () => {
      assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_17);
    });
    it("Should have web application info", async () => {
      assert.jsonFileContent("src/manifest/manifest.json", {
        webApplicationInfo:
        {
          id: "{{TABTEST01TAB_APP_ID}}",
          resource: "{{TABTEST01TAB_APP_URI}}"
        }
      });
    });
    it("Should not be full screen", async () => {
      assert.jsonFileContent("src/manifest/manifest.json", {
        isFullScreen: false
      });
    });

    it("Should have .env settings for SSO", async () => {
      assert.fileContent(".env", `TABTEST01TAB_APP_ID=${TABSSOAPPID}`);
      assert.fileContent(".env", `TABTEST01TAB_APP_URI=${TABSSOAPPURI}`);
    });
    it("Should have a reference to jwt-token", async () => {
      assert.jsonFileContent("package.json", { dependencies: { "jwt-decode": "^3.0.0-beta.2" } });
    });
    it("Should have a reference to React", async () => {
      assert.jsonFileContent("package.json", { dependencies: { "react": "^16.8.6", "react-dom": "^16.8.6" } });
    });
    it("Should have a reference to Fluentui", async () => {
      assert.jsonFileContent("package.json", { dependencies: { "@fluentui/react-northstar": {} } });
    });

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      it("should install node packages", async () => {
        const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
        assert.equal(false, npmInstallResult);
      });

      it("should build without errors", async () => {
        const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
        assert.equal(false, npmRunBuildResult);
      });
    }


  });

  describe("Tab project with SSO support (schema 1.8)", () => {
    const TABSSOAPPID = "00000000-0000-0000-0000-000000000123";
    const TABSSOAPPURI = "api://tabtest01.azurewebsites.net/00000000-0000-0000-0000-000000000123";
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab-18-SSO";

    before(async () => {
      await helpers
        .run(testHelper.GENERATOR_PATH)
        .inDir(projectPath)
        .withArguments(["--no-telemetry"])
        .withPrompts({
          solutionName: "tab-test-01-sso",
          whichFolder: "current",
          name: "tabtest01",
          developer: "generator teams developer",
          manifestVersion: "v1.8",
          parts: "tab",
          unitTestsEnabled: false,
          tabSharePoint: false,
          tabSSO: true,
          tabSSOAppId: TABSSOAPPID,
          tabSSOAppUri: TABSSOAPPURI,
          tabType: "configurable"
        })
        .withGenerators(testHelper.DEPENDENCIES);
    })

    it("Should have root files", async () => {
      assert.file(testHelper.ROOT_FILES);
    });
    it("Should not have test files", async () => {
      assert.noFile(testHelper.TEST_FILES);
    });
    it("Should have app files", async () => {
      assert.file(testHelper.APP_FILES);
    });
    it("Should have script files", async () => {
      assert.file(testHelper.SCRIPT_FILES);
    });
    it("Should have web files", async () => {
      assert.file(testHelper.WEB_FILES);
    });
    it("Should have manifest files", async () => {
      assert.file(testHelper.MANIFEST_FILES);
    });
    it("Should have tab html files", async () => {
      assert.file(TAB_HTML_FILES);
    });
    it("Should have manifest files", async () => {
      assert.file(testHelper.MANIFEST_FILES);
    });
    it("Should have tab files", async () => {
      assert.file(TAB_FILES);
    });
    it("Should have tab script files", async () => {
      assert.file(TAB_SCRIPT_FILES);
    });
    it("Should not have tab script test files", async () => {
      assert.noFile(TAB_SCRIPT_TEST_FILES);
    });
    it("Should have schema 1.7", async () => {
      assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_18);
    });
    it("Should have web application info", async () => {
      assert.jsonFileContent("src/manifest/manifest.json", {
        webApplicationInfo:
        {
          id: "{{TABTEST01TAB_APP_ID}}",
          resource: "{{TABTEST01TAB_APP_URI}}"
        }
      });
    });
    it("Should not be full screen", async () => {
      assert.jsonFileContent("src/manifest/manifest.json", {
        isFullScreen: false
      });
    });

    it("Should have .env settings for SSO", async () => {
      assert.fileContent(".env", `TABTEST01TAB_APP_ID=${TABSSOAPPID}`);
      assert.fileContent(".env", `TABTEST01TAB_APP_URI=${TABSSOAPPURI}`);
    });
    it("Should have a reference to jwt-token", async () => {
      assert.jsonFileContent("package.json", { dependencies: { "jwt-decode": "^3.0.0-beta.2" } });
    });
    it("Should have a reference to React", async () => {
      assert.jsonFileContent("package.json", { dependencies: { "react": "^16.8.6", "react-dom": "^16.8.6" } });
    });
    it("Should have a reference to Fluentui", async () => {
      assert.jsonFileContent("package.json", { dependencies: { "@fluentui/react-northstar": {} } });
    });

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      it("should install node packages", async () => {
        const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
        assert.equal(false, npmInstallResult);
      });

      it("should build without errors", async () => {
        const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
        assert.equal(false, npmRunBuildResult);
      });
    }


  });


  it("should generate tab project with SSO support (schema devPreview)", async () => {
    const TABSSOAPPID = "00000000-0000-0000-0000-000000000123";
    const TABSSOAPPURI = "api://tabtest01.azurewebsites.net/00000000-0000-0000-0000-000000000123";
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab-devPreview-SSO";
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01-sso",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "devPreview",
        parts: "tab",
        unitTestsEnabled: false,
        tabSharePoint: false,
        tabSSO: true,
        tabSSOAppId: TABSSOAPPID,
        tabSSOAppUri: TABSSOAPPURI,
        tabType: "configurable"
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.file(testHelper.ROOT_FILES);
    assert.noFile(testHelper.TEST_FILES);
    assert.file(testHelper.APP_FILES);
    assert.file(testHelper.SCRIPT_FILES);
    assert.file(testHelper.WEB_FILES);
    assert.file(testHelper.MANIFEST_FILES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_DEVPREVIEW);
    assert.jsonFileContent("src/manifest/manifest.json", {
      webApplicationInfo:
      {
        id: "{{TABTEST01TAB_APP_ID}}",
        resource: "{{TABTEST01TAB_APP_URI}}"
      }

    });
    assert.fileContent(".env", `TABTEST01TAB_APP_ID=${TABSSOAPPID}`);
    assert.fileContent(".env", `TABTEST01TAB_APP_URI=${TABSSOAPPURI}`);

    assert.file(TAB_HTML_FILES);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES);
    assert.noFile(TAB_SCRIPT_TEST_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate tab project with loading indicator set to false (default) (schema 1.6)", async () => {
    const TABSSOAPPID = "00000000-0000-0000-0000-000000000123";
    const TABSSOAPPURI = "api://tabtest01.azurewebsites.net/00000000-0000-0000-0000-000000000123";
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab-16-loading-false";
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01-sso",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.6",
        parts: "tab",
        unitTestsEnabled: false,
        tabSharePoint: false,
        tabSSO: true,
        tabSSOAppId: TABSSOAPPID,
        tabSSOAppUri: TABSSOAPPURI,
        tabType: "configurable"
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.file(testHelper.ROOT_FILES);
    assert.noFile(testHelper.TEST_FILES);
    assert.file(testHelper.APP_FILES);
    assert.file(testHelper.SCRIPT_FILES);
    assert.file(testHelper.WEB_FILES);
    assert.file(testHelper.MANIFEST_FILES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_16);
    assert.jsonFileContent("src/manifest/manifest.json", {
      showLoadingIndicator: false
    });
    assert.fileContent(".env", `APPLICATION_ID=`);
    assert.fileContent(".env", `PACKAGE_NAME=`);

    assert.file(TAB_HTML_FILES);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES);
    assert.noFile(TAB_SCRIPT_TEST_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);

    }
  });

  it("should generate tab project with loading indicator set to true (schema 1.6)", async () => {
    const TABSSOAPPID = "00000000-0000-0000-0000-000000000123";
    const TABSSOAPPURI = "api://tabtest01.azurewebsites.net/00000000-0000-0000-0000-000000000123";
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab-16-loading-indicator"
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01-sso",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.6",
        parts: "tab",
        unitTestsEnabled: false,
        tabSharePoint: false,
        tabSSO: true,
        tabSSOAppId: TABSSOAPPID,
        tabSSOAppUri: TABSSOAPPURI,
        tabType: "configurable",
        showLoadingIndicator: true
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.file(testHelper.ROOT_FILES);
    assert.noFile(testHelper.TEST_FILES);
    assert.file(testHelper.APP_FILES);
    assert.file(testHelper.SCRIPT_FILES);
    assert.file(testHelper.WEB_FILES);
    assert.file(testHelper.MANIFEST_FILES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_16);
    assert.jsonFileContent("src/manifest/manifest.json", {
      showLoadingIndicator: true
    });
    assert.fileContent(".env", `APPLICATION_ID=`);
    assert.fileContent(".env", `PACKAGE_NAME=`);

    assert.file(TAB_HTML_FILES);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES);
    assert.noFile(TAB_SCRIPT_TEST_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);

    }
  });

  it("should generate tab project with full screen set to true (schema 1.7)", async () => {
    const TABSSOAPPID = "00000000-0000-0000-0000-000000000123";
    const TABSSOAPPURI = "api://tabtest01.azurewebsites.net/00000000-0000-0000-0000-000000000123";
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab-17-full-screen"
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01-sso",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.7",
        parts: "tab",
        unitTestsEnabled: false,
        tabSharePoint: false,
        tabSSO: true,
        tabSSOAppId: TABSSOAPPID,
        tabSSOAppUri: TABSSOAPPURI,
        tabType: "configurable",
        isFullScreen: true
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.file(testHelper.ROOT_FILES);
    assert.noFile(testHelper.TEST_FILES);
    assert.file(testHelper.APP_FILES);
    assert.file(testHelper.SCRIPT_FILES);
    assert.file(testHelper.WEB_FILES);
    assert.file(testHelper.MANIFEST_FILES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_17);
    assert.jsonFileContent("src/manifest/manifest.json", {
      isFullScreen: true
    });
    assert.fileContent(".env", `APPLICATION_ID=`);
    assert.fileContent(".env", `PACKAGE_NAME=`);

    assert.file(TAB_HTML_FILES);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES);
    assert.noFile(TAB_SCRIPT_TEST_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);

    }
  });

  it("should generate tab project with full screen set to true (schema 1.8)", async () => {
    const TABSSOAPPID = "00000000-0000-0000-0000-000000000123";
    const TABSSOAPPURI = "api://tabtest01.azurewebsites.net/00000000-0000-0000-0000-000000000123";
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab-18-full-screen"
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01-sso",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.8",
        parts: "tab",
        unitTestsEnabled: false,
        tabSharePoint: false,
        tabSSO: true,
        tabSSOAppId: TABSSOAPPID,
        tabSSOAppUri: TABSSOAPPURI,
        tabType: "configurable",
        isFullScreen: true
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.file(testHelper.ROOT_FILES);
    assert.noFile(testHelper.TEST_FILES);
    assert.file(testHelper.APP_FILES);
    assert.file(testHelper.SCRIPT_FILES);
    assert.file(testHelper.WEB_FILES);
    assert.file(testHelper.MANIFEST_FILES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_18);
    assert.jsonFileContent("src/manifest/manifest.json", {
      isFullScreen: true
    });
    assert.fileContent(".env", `APPLICATION_ID=`);
    assert.fileContent(".env", `PACKAGE_NAME=`);

    assert.file(TAB_HTML_FILES);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES);
    assert.noFile(TAB_SCRIPT_TEST_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);

    }
  });


  it("should generate tab project with full screen set to false (schema 1.7)", async () => {
    const TABSSOAPPID = "00000000-0000-0000-0000-000000000123";
    const TABSSOAPPURI = "api://tabtest01.azurewebsites.net/00000000-0000-0000-0000-000000000123";
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab-17-no-full-screen"
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01-sso",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.7",
        parts: "tab",
        unitTestsEnabled: false,
        tabSharePoint: false,
        tabSSO: true,
        tabSSOAppId: TABSSOAPPID,
        tabSSOAppUri: TABSSOAPPURI,
        tabType: "configurable",
        isFullScreen: false
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.file(testHelper.ROOT_FILES);
    assert.noFile(testHelper.TEST_FILES);
    assert.file(testHelper.APP_FILES);
    assert.file(testHelper.SCRIPT_FILES);
    assert.file(testHelper.WEB_FILES);
    assert.file(testHelper.MANIFEST_FILES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_17);
    assert.jsonFileContent("src/manifest/manifest.json", {
      isFullScreen: false
    });
    assert.fileContent(".env", `APPLICATION_ID=`);
    assert.fileContent(".env", `PACKAGE_NAME=`);

    assert.file(TAB_HTML_FILES);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES);
    assert.noFile(TAB_SCRIPT_TEST_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);

    }
  });

  it("should generate tab project with schema 1.5 and upgrade to schema 1.6", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab-15-to-16-upgrade";
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01-sso",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.5",
        parts: "tab",
        unitTestsEnabled: false,
        tabSharePoint: false,
        tabType: "configurable"
      })
      .withGenerators(testHelper.DEPENDENCIES);
    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_15);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .cd(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        manifestVersion: "v1.6",
        confirmedAdd: true,
        updateBuildSystem: false,
        updateManifestVersion: true,
        parts: ""
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_16);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }

  });

  it("should generate tab project with schema 1.6 and upgrade to schema 1.7", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab-16-to-17-upgrade";
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01-sso",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.6",
        parts: "tab",
        unitTestsEnabled: false,
        tabSharePoint: false,
        tabType: "configurable"
      })
      .withGenerators(testHelper.DEPENDENCIES);
    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_16);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .cd(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        manifestVersion: "v1.7",
        confirmedAdd: true,
        updateBuildSystem: false,
        updateManifestVersion: true,
        parts: ""
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_17);

    assert.jsonFileContent("src/manifest/manifest.json", {
      isFullScreen: undefined
    });

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate tab project with schema 1.6 and upgrade to schema 1.8", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab-16-to-18-upgrade";
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01-sso",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.6",
        parts: "tab",
        unitTestsEnabled: false,
        tabSharePoint: false,
        tabType: "configurable"
      })
      .withGenerators(testHelper.DEPENDENCIES);
    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_16);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .cd(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        manifestVersion: "v1.8",
        confirmedAdd: true,
        updateBuildSystem: false,
        updateManifestVersion: true,
        parts: ""
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_18);

    assert.jsonFileContent("src/manifest/manifest.json", {
      isFullScreen: undefined
    });

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });

  it("should generate tab project with schema 1.7 and upgrade to schema 1.8", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab-17-to-18-upgrade";
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01-sso",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.7",
        parts: "tab",
        unitTestsEnabled: false,
        tabSharePoint: false,
        tabType: "configurable"
      })
      .withGenerators(testHelper.DEPENDENCIES);
    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_17);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .cd(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        manifestVersion: "v1.8",
        confirmedAdd: true,
        updateBuildSystem: false,
        updateManifestVersion: true,
        parts: ""
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_18);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });



  it("should generate tab project with schema 1.6 containing two static tabs", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab-16-additional-static-tab";
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.6",
        parts: "tab",
        unitTestsEnabled: false,
        tabType: "static",
        tabTitle: "tab 1"
      })
      .withGenerators(testHelper.DEPENDENCIES);
    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_16);
    assert.jsonFileContent("src/manifest/manifest.json", {
      staticTabs: [
        {
          name: "tab 1"
        }
      ]
    });

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .cd(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        manifestVersion: "v1.6",
        confirmedAdd: true,
        parts: "tab",
        tabType: "static",
        tabTitle: "tab 2"
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_16);
    assert.jsonFileContent("src/manifest/manifest.json", {
      staticTabs: [
        {
          name: "tab 1"
        },
        {
          name: "tab 2"
        }
      ]
    });

    const manifest = require(projectPath + "/src/manifest/manifest.json");
    assert.notEqual(manifest.staticTabs[0].entityId, manifest.staticTabs[1].entityId, "Static tab entities must be unique");

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }

  });
});
