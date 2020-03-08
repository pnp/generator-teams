import * as del from "del";
import * as helpers from "yeoman-test";
import * as assert from "yeoman-assert";
import { describe, it } from "mocha";

import * as testHelper from "./helpers/TestHelper";

describe("teams:tab", function() {
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

  const TAB_FILES = "src/app/tabtest01Tab/tabtest01Tab.ts";

  beforeEach(async () => {
    await del([testHelper.TEMP_GENERATOR_PATTERN]);
  });

  it("should generate tab project with v1.3 with unit tests", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01-v13-withUnitT";

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
      const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
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
      const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
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
      .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + "/tab02")
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
      const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
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
      const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
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
      const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
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
      const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
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
      const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
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
      const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
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
      const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
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
      const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
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

    assert.file(TAB_HTML_FILES);
    assert.file(TAB_FILES);
    assert.file(TAB_SCRIPT_FILES);
    assert.noFile(TAB_SCRIPT_TEST_FILES);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
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
      const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
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
      const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
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
      const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
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
      const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
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
      const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
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
      const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
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
      const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
      assert.equal(false, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.equal(false, npmRunBuildResult);
    }
  });
});
