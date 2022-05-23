import * as del from "del";
import * as helpers from "yeoman-test";
import * as assert from "yeoman-assert";
import { describe, it } from "mocha";

import * as testHelper from "./helpers/TestHelper";

const tests = require("./tests.json");


const TAB_HTML_FILES = [
  "src/public/teamsSolutionTab/index.html",
  "src/public/teamsSolutionTab/config.html",
  "src/public/teamsSolutionTab/remove.html"
];

const TAB_SCRIPT_FILES = [
  "src/client/teamsSolutionTab/TeamsSolutionTab.tsx",
  "src/client/teamsSolutionTab/TeamsSolutionTabConfig.tsx",
  "src/client/teamsSolutionTab/TeamsSolutionTabRemove.tsx"
];

const TAB_SCRIPT_TEST_FILES = [
  "src/client/teamsSolutionTab/__tests__/TeamsSolutionTab.spec.tsx",
  "src/client/teamsSolutionTab/__tests__/TeamsSolutionTabConfig.spec.tsx",
  "src/client/teamsSolutionTab/__tests__/TeamsSolutionTabRemove.spec.tsx"
];

const TAB_HTML_FILES_STATIC = ["src/public/TeamsSolutionTab/index.html"];

const TAB_SCRIPT_FILES_STATIC = [
  "src/client/teamsSolutionTab/TeamsSolutionTab.tsx"
];

const TAB_SCRIPT_TEST_FILES_STATIC = [
  "src/client/teamsSolutionTab/__tests__/TeamsSolutionTab.spec.tsx"
];

const TAB_FILES = "src/server/teamsSolutionTab/TeamsSolutionTab.ts";





describe("teams:tab", function () {
  beforeEach(async () => {
    await del([testHelper.TEMP_GENERATOR_PATTERN]);
  });

  async function tabTests(prompts: any) {


    it("Should have tab app files", async () => {
      assert.file(TAB_FILES);
    });




    if (prompts.tabType == "static") {
      it("Should have a personal scoped static tab", async () => {
        assert.jsonFileContent("src/manifest/manifest.json", {
          staticTabs: [
            {
              scopes: ["personal"]
            }
          ]
        });
      });
      if (prompts.unitTestsEnabled) {
        it("Should have tab unit test files", async () => {
          assert.file(TAB_SCRIPT_TEST_FILES_STATIC);
        });
      } else {
        it("Should not have tab unit test files", async () => {
          assert.noFile(TAB_SCRIPT_TEST_FILES_STATIC);
        });
      }
      it("Should not have configurable tab scopes defined", async () => {
        assert.noJsonFileContent("src/manifest/manifest.json", {
          configurableTabs: []
        });
      })
    } else {
      it("Should have configurable tab html files", async () => {
        assert.file(TAB_HTML_FILES);
      });
      it("Should have configurable tab script files", async () => {
        assert.file(TAB_SCRIPT_FILES);
      });
      if (prompts.unitTestsEnabled) {
        it("Should have tab unit test files", async () => {
          assert.file(TAB_SCRIPT_TEST_FILES);
        });
      } else {
        it("Should not have tab unit test files", async () => {
          assert.noFile(TAB_SCRIPT_TEST_FILES);
        });
      }
      if (prompts.tabScopes) {
        it("Should have configurable tab scopes defined", async () => {
          assert.jsonFileContent("src/manifest/manifest.json", {
            configurableTabs: [
              {
                scopes: prompts.tabScopes
              }
            ]
          });
        })
      } else {
        it("Should not have configurable tab scopes defined", async () => {
          assert.noJsonFileContent("src/manifest/manifest.json", {
            configurableTabs: [
              {
                scopes: []
              }
            ]
          });
        })
      }
      it("Should not have static tab scopes defined", async () => {
        assert.noJsonFileContent("src/manifest/manifest.json", {
          staticTabs: []
        });
      })
    }

    if (prompts.tabSharePoint === true) {
      it("Should contain SharePoint config", () => {
        assert.jsonFileContent("src/manifest/manifest.json", {
          configurableTabs: [
            {
              sharePointPreviewImage:
                "https://{{PUBLIC_HOSTNAME}}/assets/teamsSolutionTab-preview.png",
              supportedSharePointHosts: prompts.tabSharePointHosts
            }
          ]
        });
      });
    } else {
      it("Should not contain SharePoint config", () => {
        assert.noFileContent("src/manifest/manifest.json", "sharePointPreviewImage");
      });
    }


    if (prompts.tabSSO == true) {
      const TABSSOAPPID = "00000000-0000-0000-0000-000000000123";
      const TABSSOAPPURI = "api://tabtest01.azurewebsites.net/00000000-0000-0000-0000-000000000123";
      it("Should have web application info", async () => {
        assert.jsonFileContent("src/manifest/manifest.json", {
          webApplicationInfo:
          {
            id: "{{TAB_APP_ID}}",
            resource: "{{TAB_APP_URI}}"
          }
        });
      });
      it("Should have .env settings for SSO", async () => {
        assert.fileContent(".env", `TAB_APP_ID=${TABSSOAPPID}`);
        assert.fileContent(".env", `TAB_APP_URI=${TABSSOAPPURI}`);
      });
      it("Should have a reference to jwt-token", async () => {
        assert.jsonFileContent("package.json", { dependencies: { "jwt-decode": "^3.1.2" } });
      });
    }
  }


  testHelper.runTests("tab", tests.tab, tabTests);



  it("should generate tab project with schema 1.12 and upgrade to schema 1.13", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab-18-to-devPreview-upgrade";
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01-sso",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.12",
        parts: "tab",
        unitTestsEnabled: false,
        tabSharePoint: false,
        tabType: "configurable",
        tabScopes: ["team"]
      })
      .withGenerators(testHelper.DEPENDENCIES);
    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_112);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.strictEqual(true, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.strictEqual(true, npmRunBuildResult);
    }

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .cd(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        manifestVersion: "v1.13",
        confirmedAdd: true,
        updateBuildSystem: false,
        updateManifestVersion: true,
        parts: ""
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_113);

    assert.jsonFileContent("package.json", { dependencies: { "react": "^16.8.6", "react-dom": "^16.8.6" } });

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.strictEqual(true, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.strictEqual(true, npmRunBuildResult);
    }
  });


  it("should generate tab project with schema 1.12 and upgrade to schema devPreview", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab-18-to-devPreview-upgrade";
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01-sso",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.12",
        parts: "tab",
        unitTestsEnabled: false,
        tabSharePoint: false,
        tabType: "configurable",
        tabScopes: ["team"]
      })
      .withGenerators(testHelper.DEPENDENCIES);
    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_112);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.strictEqual(true, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.strictEqual(true, npmRunBuildResult);
    }

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .cd(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        manifestVersion: "devPreview",
        confirmedAdd: true,
        updateBuildSystem: false,
        updateManifestVersion: true,
        parts: ""
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_DEVPREVIEW);

    assert.jsonFileContent("package.json", { dependencies: { "react": "^16.8.6", "react-dom": "^16.8.6" } });

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.strictEqual(true, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.strictEqual(true, npmRunBuildResult);
    }
  });

  it("should generate tab project with schema 1.13 and upgrade to schema devPreview", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab-18-to-devPreview-upgrade";
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01-sso",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.13",
        parts: "tab",
        unitTestsEnabled: false,
        tabSharePoint: false,
        tabType: "configurable",
        tabScopes: ["team"]
      })
      .withGenerators(testHelper.DEPENDENCIES);
    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_113);

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.strictEqual(true, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.strictEqual(true, npmRunBuildResult);
    }

    await helpers
      .run(testHelper.GENERATOR_PATH)
      .cd(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        manifestVersion: "devPreview",
        confirmedAdd: true,
        updateBuildSystem: false,
        updateManifestVersion: true,
        parts: ""
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_DEVPREVIEW);

    assert.jsonFileContent("package.json", { dependencies: { "react": "^16.8.6", "react-dom": "^16.8.6" } });

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.strictEqual(true, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.strictEqual(true, npmRunBuildResult);
    }
  });

  it("should generate tab project with schema 1.11 containing two static tabs", async () => {
    const projectPath = testHelper.TEMP_TAB_GENERATOR_PATH + "/tab-18-additional-static-tab";
    await helpers
      .run(testHelper.GENERATOR_PATH)
      .inDir(projectPath)
      .withArguments(["--no-telemetry"])
      .withPrompts({
        solutionName: "tab-test-01",
        whichFolder: "current",
        name: "tabtest01",
        developer: "generator teams developer",
        manifestVersion: "v1.11",
        parts: "tab",
        unitTestsEnabled: false,
        tabType: "static",
        tabTitle: "tab 1"
      })
      .withGenerators(testHelper.DEPENDENCIES);
    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_111);
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
        manifestVersion: "v1.11",
        confirmedAdd: true,
        parts: "tab",
        tabType: "static",
        tabTitle: "tab 2"
      })
      .withGenerators(testHelper.DEPENDENCIES);

    assert.fileContent("src/manifest/manifest.json", testHelper.SCHEMA_111);
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

    assert.jsonFileContent("package.json", { dependencies: { "react": "^16.8.6", "react-dom": "^16.8.6" } });

    if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
      const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
      assert.strictEqual(true, npmInstallResult);

      const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
      assert.strictEqual(true, npmRunBuildResult);
    }

  });
});
