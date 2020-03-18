import * as path from "path";
import * as del from "del";
import * as fs from "fs-extra";
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

const TAB_FILES = "src/app/tabtest01Tab/tabtest01Tab.ts";



describe("integration tests - teams:tab", function () {

  beforeEach(async () => {
    await del([testHelper.TEMP_GENERATOR_PATTERN]);
  });

  it("should generate tab project with v1.5 with unit tests", async () => {
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01")
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

    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01";

    const npmInstallResult = await testHelper.runNpmCommand('npm install', projectPath);
    assert.equal(false, npmInstallResult)

    const npmRunBuildResult = await testHelper.runNpmCommand('npm run build', projectPath);
    assert.equal(false, npmRunBuildResult)
  });



});

describe("unit tests - teams:tab", function () {

  beforeEach(async () => {
    await del([testHelper.TEMP_GENERATOR_PATTERN]);
  });

  it("should generate tab project with v1.3 with unit tests", async () => {
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01")
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
  });

  it("should generate a static tab project with v1.3 with unit tests", async () => {
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01")
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
  });

  it("should generate tab project with v1.3 without unit tests", async () => {
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
  });

  it("should generate a static tab project with v1.3 without unit tests", async () => {
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
  });

  it("should generate tab project with v1.4 with unit tests", async () => {
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + "/tab01-14")
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
  });

  it("should generate tab project with v1.4 without unit tests", async () => {
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + "/tab02-14")
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
  });

  it("should generate a static tab project with v1.4 without unit tests", async () => {
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + "/tab02-14")
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
  });

  it("should generate tab project with v1.4 with SharePoint config", async () => {
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + "/tab02-14")
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
  });

  it("should generate tab project with v1.5 without unit tests", async () => {
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + "/tab02-15")
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
  });

  it("should generate tab project with v1.5 with SharePoint config", async () => {
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + "/tab02-15")
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
  });

  it("should generate tab project with v1.5 with MPN Id", async () => {
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + "/tab02-15-mpn")
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
  });

  it("should generate tab project with devPreview with unit tests", async () => {
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + "/tab03")
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
  });

  it("should generate tab project with devPreview without unit tests", async () => {
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + "/tab04")
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
  });

  it("should generate tab project application insights", async () => {
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + "/tab05")
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
  });

  it("should generate tab project with no application insights", async () => {
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + "/tab06")
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
  });

  it("should generate tab project scoped to groupchat only", async () => {
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + "/tab06")
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
  });

  it("should generate tab project scoped to team only", async () => {
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + "/tab06")
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
  });

  it("should generate tab project scoped to groupchat and team", async () => {
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + "/tab06")
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
  });

  it("should generate tab project with SSO support (schema 1.5)", async () => {
    const TABSSOAPPID = "00000000-0000-0000-0000-000000000123";
    const TABSSOAPPURI = "api://tabtest01.azurewebsites.net/00000000-0000-0000-0000-000000000123";
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + "/tab07")
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
  });

  it("should generate tab project with SSO support (schema devPreview)", async () => {
    const TABSSOAPPID = "00000000-0000-0000-0000-000000000123";
    const TABSSOAPPURI = "api://tabtest01.azurewebsites.net/00000000-0000-0000-0000-000000000123";
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + "/tab07")
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
  });

});
