import * as path from 'path';
import * as npmRun from 'npm-run';
import * as assert from "yeoman-assert";
import * as lodash from 'lodash';
import * as helpers from "yeoman-test";


export const DEPENDENCIES = [
  '../../../generators/tab',
  '../../../generators/bot',
  '../../../generators/connector',
  '../../../generators/custombot',
  '../../../generators/messageExtension',
  '../../../generators/localization'
];

export const GENERATOR_PATH = path.join(__dirname, '../../generators/app');
export const TEMP_GENERATOR_PATTERN = './temp-templates/**/*.*';
export const TEMP_TEST_PATH = path.join(__dirname, '../../temp-templates');
export const TEMP_TAB_GENERATOR_PATH = path.join(__dirname, '../../temp-templates/tab');
export const TEMP_BOT_GENERATOR_PATH = path.join(__dirname, '../../temp-templates/bot');
export const TEMP_MESSAGEEXTSION_GENERATOR_PATH = path.join(__dirname, '../../temp-templates/messageExtension');
export const TEMP_CONNECTOR_GENERATOR_PATH = path.join(__dirname, '../../temp-templates/connector');
export const TEMP_CUSTOMBOT_GENERATOR_PATH = path.join(__dirname, '../../temp-templates/custombot');
export const TEMP_LOCALIZATION_GENERATOR_PATH = path.join(__dirname, '../../temp-templates/localization');

export const ROOT_FILES = [
  '.gitignore',
  'gulpfile.js',
  'package.json',
  'README.md',
  'webpack.config.js',
  'Dockerfile'
];

export const LINT_FILES = [
  ".eslintrc.json",
  ".eslintignore",
  "src/server/.eslintrc.json",
  "src/client/.eslintrc.json"
]

export const TEST_FILES = [
  'src/test/test-setup.js',
  'src/test/test-shim.js',
  'src/client/jest.config.js',
  'src/server/jest.config.js'
];

export const MANIFEST_FILES = [
  'src/manifest/icon-color.png',
  'src/manifest/icon-outline.png',
  'src/manifest/manifest.json',
];

export const WEB_FILES = [
  'src/public/assets/icon.png',
  'src/public/index.html',
  'src/public/privacy.html',
  'src/public/tou.html',
  "src/public/styles/main.scss"
];

export const APP_FILES = [
  'src/server/server.ts',
  'src/server/TeamsAppsComponents.ts',
  "src/server/tsconfig.json"
];

export const SCRIPT_FILES = [
  'src/client/client.ts',
  "src/client/tsconfig.json"
];

export const basePrompts = {
  "solutionName": "teams-solution",
  "whichFolder": "current",
  "name": "teamsSolution",
  "developer": "generator teams developer",
};

export async function runNpmCommand(command: string, path: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    npmRun.exec(command, { cwd: path },
      function (err: any, stdout: any, stderr: any) {
        if (err) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
  });
}

export const SCHEMA_18 = 'https://developer.microsoft.com/en-us/json-schemas/teams/v1.8/MicrosoftTeams.schema.json';
export const SCHEMA_19 = 'https://developer.microsoft.com/en-us/json-schemas/teams/v1.9/MicrosoftTeams.schema.json';
export const SCHEMA_DEVPREVIEW = 'https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json';

export const SCHEMAS: { [key: string]: string } = {
  "v1.8": SCHEMA_18,
  "v1.9": SCHEMA_19,
  "devPreview": SCHEMA_DEVPREVIEW
}
const UPGRADE_PATHS: { [key: string]: string[] } = {
  "v1.8": ["v1.9", "devPreview"],
  "v1.9": ["devPreview"]
}

export enum TestTypes {
  UNIT = "UNIT",
  INTEGRATION = "INTEGRATION"
}
export function coreTests(manifestVersion: string, prompts: any) {
  it("Should have root files", async () => {
    assert.file(ROOT_FILES);
  });
  it("Should have app files", async () => {
    assert.file(APP_FILES);
  });
  it("Should have script files", async () => {
    assert.file(SCRIPT_FILES);
  });
  it("Should have web files", async () => {
    assert.file(WEB_FILES);
  });
  it("Should have manifest files", async () => {
    assert.file(MANIFEST_FILES);
  });
  it("Should have correct schema", async () => {
    assert.fileContent("src/manifest/manifest.json", SCHEMAS[manifestVersion]);
  });
  it("Should have correct React version", async () => {
    assert.jsonFileContent("package.json", { dependencies: { "react": "^16.8.6", "react-dom": "^16.8.6" } });
  });
  it("Should have correct React typings version", async () => {
    assert.jsonFileContent("package.json", { devDependencies: { "@types/react": "16.8.10", "@types/react-dom": "16.8.3" } });
  });
  it("Should have a reference to Fluentui", async () => {
    assert.jsonFileContent("package.json", { dependencies: { "@fluentui/react-northstar": {} } });
  });
  it("Should have linting files", async () => {
    assert.file(LINT_FILES);
  });
  if (prompts.unitTestsEnabled) {
    it("Should have unit test files", async () => {
      assert.file(TEST_FILES);
    });
  } else {
    it("Should not have unit test files", async () => {
      assert.noFile(TEST_FILES);
    });
  }

  if (prompts.isFullScreen) {
    it("Should be full screen", async () => {
      assert.jsonFileContent("src/manifest/manifest.json", {
        isFullScreen: true
      });
    });
  } else {
    it("Should not be full screen", async () => {
      assert.noJsonFileContent("src/manifest/manifest.json", {
        isFullScreen: true
      });
    });
  }

  if (prompts.showLoadingIndicator) {
    it("Should show loading indicator", async () => {
      assert.jsonFileContent("src/manifest/manifest.json", {
        showLoadingIndicator: true
      });
    });
  } else {
    it("Should not show loading indicator", async () => {
      assert.jsonFileContent("src/manifest/manifest.json", {
        showLoadingIndicator: false
      });
    });
  }

  if (prompts.useAzureAppInsights) {
    it("Should define an environmental app insights key in .env", async () => {
      assert.fileContent(
        ".env",
        "APPINSIGHTS_INSTRUMENTATIONKEY=12341234-1234-1234-1234-123412341234"
      );
    })
    it("Should include applicationinsights package", async () => {
      assert.fileContent("package.json", `"applicationinsights": "^1.3.1"`);
    })
    it("Should reference app insights in html files", async () => {
      assert.fileContent(
        "src/public/index.html",
        `var appInsights = window.appInsights`
      );
    })
  } else {
    it("Should define an environmental app insights key in .env", async () => {
      assert.fileContent(
        ".env",
        "APPINSIGHTS_INSTRUMENTATIONKEY="
      );
    })
    it("Should not include applicationinsights package", async () => {
      assert.noFileContent("package.json", `"applicationinsights": "^1.3.1"`);
    })
    it("Should not reference app insights in html files", async () => {
      assert.noFileContent(
        "src/public/index.html",
        `var appInsights = window.appInsights`
      );
    })
  }

  if (prompts.mpnId) {
    it("Should have MPN information", () => {
      assert.jsonFileContent("src/manifest/manifest.json", {
        developer: {
          mpnId: "1234567890"
        }
      });
    })
  } else {
    it("Should not have MPN information", () => {
      assert.noJsonFileContent("src/manifest/manifest.json", {
        developer: {
          mpnId: "1234567890"
        }
      });
    })
  }
}


export async function runTests(prefix: string, tests: any[], additionalTests: Function) {
  for (const test of tests) {
    describe(test.description, async () => {
      for (const manifestVersion of test.manifestVersions as string[]) {
        // run without unit tests
        runTest(manifestVersion, test, false);
        // run with tests
        runTest(manifestVersion, test, true);
        // upgrade if possible
        if (UPGRADE_PATHS[manifestVersion]) {
          for (const upgradeTo of UPGRADE_PATHS[manifestVersion])
            runUpgradeTest(manifestVersion, upgradeTo, test, false);
        }
      }
    });
  }

  async function runTest(manifestVersion: string, test: any, unitTesting: boolean) {
    describe(`Schema ${manifestVersion}${unitTesting ? ", with Unit tests" : ""}`, async () => {
      let projectPath = TEMP_TEST_PATH + `/${prefix}/${manifestVersion}-${lodash.snakeCase(test.description)}`;

      let prompts = { manifestVersion, ...basePrompts, ...test.prompts };
      if (unitTesting) {
        prompts = {
          mpnId: "",
          ...prompts, "quickScaffolding": false, "unitTestsEnabled": true
        };
        projectPath += "-withUnitTests"
      }

      before(async () => {
        await helpers
          .run(GENERATOR_PATH)
          .inDir(projectPath)
          .withArguments(["--no-telemetry"])
          .withPrompts(prompts)
          .withGenerators(DEPENDENCIES);
      });

      coreTests(manifestVersion, prompts);


      if (additionalTests) {
        await additionalTests(prompts);
      }



      if (process.env.TEST_TYPE == TestTypes.INTEGRATION) {
        const npmInstallResult = await runNpmCommand("npm install --prefer-offline", projectPath);
        assert.equal(false, npmInstallResult);

        const npmRunBuildResult = await runNpmCommand("npm run build", projectPath);
        assert.equal(false, npmRunBuildResult);
      }
    });
  }

  async function runUpgradeTest(from: string, to: string, test: any, unitTesting: boolean) {
    describe(`Schema ${from} upgrading to ${to}${unitTesting ? ", with Unit tests" : ""}`, async () => {
      let projectPath = TEMP_TEST_PATH + `/${prefix}/${from}-${to}-${lodash.snakeCase(test.description)}`;

      let prompts = { manifestVersion: from, ...basePrompts, ...test.prompts };
      if (unitTesting) {
        prompts = {
          mpnId: "",
          ...prompts, "quickScaffolding": false, "unitTestsEnabled": true
        };
        projectPath += "-withUnitTests"
      }

      before(async () => {
        await helpers
          .run(GENERATOR_PATH)
          .inDir(projectPath)
          .withArguments(["--no-telemetry"])
          .withPrompts(prompts)
          .withGenerators(DEPENDENCIES);

        prompts = {
          manifestVersion: to,
          confirmedAdd: true,
          updateBuildSystem: true,
          updateManifestVersion: true,
          parts: ""
        };

        await helpers
          .run(GENERATOR_PATH)
          .cd(projectPath)
          .withArguments(["--no-telemetry"])
          .withPrompts(prompts)
          .withGenerators(DEPENDENCIES);
      });


      coreTests(to, prompts);

      if (process.env.TEST_TYPE == TestTypes.INTEGRATION) {
        const npmInstallResult = await runNpmCommand("npm install --prefer-offline", projectPath);
        assert.equal(false, npmInstallResult);

        const npmRunBuildResult = await runNpmCommand("npm run build", projectPath);
        assert.equal(false, npmRunBuildResult);
      }
    });
  }
}