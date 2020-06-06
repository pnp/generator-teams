import * as del from 'del';
import * as helpers from 'yeoman-test';
import * as assert from 'yeoman-assert';
import { describe, it } from 'mocha';

import * as testHelper from './helpers/TestHelper';

describe('teams:messageExtension', function () {

    const MESSAGEEXTSION_HTML_FILES = [
        'src/app/web/messageExtensionTest01MessageExtension/config.html'
    ];

    const MESSAGEEXTSION_SCRIPT_FILES = [
        'src/app/scripts/messageExtensiontest01MessageExtension/MessageExtensionTest01MessageExtensionConfig.tsx'
    ];

    const MESSAGEEXTSION_SCRIPT_TEST_FILES = [
        'src/app/scripts/messageExtensiontest01MessageExtension/__tests__/MessageExtensionTest01MessageExtensionConfig.spec.tsx'
    ];

    const MESSAGEEXTSION_FILES = [
        'src/app/messageExtensiontest01MessageExtension/MessageExtensiontest01MessageExtension.ts'
    ];
    const MESSAGEEXTSION__TASKMODULE_FILES = [
        'src/app/scripts/MessageExtensiontest01MessageExtension/MessageExtensiontest01MessageExtensionAction.tsx',
        'src/app/web/MessageExtensiontest01MessageExtension/action.html'
    ];

    beforeEach(async () => {
        await del([testHelper.TEMP_GENERATOR_PATTERN]);
    });

    it('should generate message extension project with v1.3 with unit tests', async () => {
        const projectPath = testHelper.TEMP_MESSAGEEXTSION_GENERATOR_PATH + "/mesExt01-v13-withUnitT";

        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(projectPath)
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'messageExtension-test-01',
                whichFolder: 'current',
                name: 'messageExtensiontest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.3',
                parts: 'messageextension',
                unitTestsEnabled: true,
                messageExtensionHost: 'new',
                bottype: 'botframework',
                messageExtensionName: 'messageExtension-test-01',
                messageExtensionDescription: 'description'
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(testHelper.ROOT_FILES);
        assert.file(testHelper.TEST_FILES);
        assert.file(testHelper.APP_FILES);
        assert.file(testHelper.SCRIPT_FILES);
        assert.file(testHelper.WEB_FILES);
        assert.file(testHelper.MANIFEST_FILES);
        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_13);
        assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ canUpdateConfiguration: true }] })
        assert.file(MESSAGEEXTSION_SCRIPT_FILES);
        assert.file(MESSAGEEXTSION_SCRIPT_TEST_FILES);
        assert.file(MESSAGEEXTSION_FILES);
        assert.file(MESSAGEEXTSION_HTML_FILES);

        if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
            const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
            assert.equal(false, npmInstallResult);
      
            const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
            assert.equal(false, npmRunBuildResult);
      
            const npmRunTestResult = await testHelper.runNpmCommand("npm run test", projectPath);
            assert.equal(false, npmRunTestResult);
        }
    });

    it('should generate message extension project with v1.4 with unit tests', async () => {
        const projectPath = testHelper.TEMP_MESSAGEEXTSION_GENERATOR_PATH + "/mesExt01-v14-withUnitT";

        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(projectPath)
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'messageExtension-test-01',
                whichFolder: 'current',
                name: 'messageExtensiontest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.4',
                parts: 'messageextension',
                unitTestsEnabled: true,
                messageExtensionHost: 'new',
                bottype: 'botframework',
                messageExtensionName: 'messageExtension-test-01',
                messageExtensionDescription: 'description'
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(testHelper.ROOT_FILES);
        assert.file(testHelper.TEST_FILES);
        assert.file(testHelper.APP_FILES);
        assert.file(testHelper.SCRIPT_FILES);
        assert.file(testHelper.WEB_FILES);
        assert.file(testHelper.MANIFEST_FILES);
        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_14);
        assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ canUpdateConfiguration: true }] })
        assert.file(MESSAGEEXTSION_SCRIPT_FILES);
        assert.file(MESSAGEEXTSION_SCRIPT_TEST_FILES);
        assert.file(MESSAGEEXTSION_FILES);
        assert.file(MESSAGEEXTSION_HTML_FILES);

        if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
            const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
            assert.equal(false, npmInstallResult);
      
            const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
            assert.equal(false, npmRunBuildResult);
      
            const npmRunTestResult = await testHelper.runNpmCommand("npm run test", projectPath);
            assert.equal(false, npmRunTestResult);
        }
    });

    it('should generate message extension project with v1.3 with unit tests, without configuration', async () => {
        const projectPath = testHelper.TEMP_MESSAGEEXTSION_GENERATOR_PATH + "/mesExt01-v13-withUnitTwithoutConf";

        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(projectPath)
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'messageExtension-test-01',
                whichFolder: 'current',
                name: 'messageExtensiontest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.3',
                parts: 'messageextension',
                unitTestsEnabled: true,
                messageExtensionHost: 'new',
                bottype: 'botframework',
                messageExtensionName: 'messageExtension-test-01',
                messageExtensionDescription: 'description',
                messagingExtensionCanUpdateConfiguration: false
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(testHelper.ROOT_FILES);
        assert.file(testHelper.TEST_FILES);
        assert.file(testHelper.APP_FILES);
        assert.file(testHelper.SCRIPT_FILES);
        assert.file(testHelper.WEB_FILES);
        assert.file(testHelper.MANIFEST_FILES);
        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_13);
        assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ canUpdateConfiguration: false }] })
        assert.noFile(MESSAGEEXTSION_SCRIPT_FILES);
        assert.noFile(MESSAGEEXTSION_SCRIPT_TEST_FILES);
        assert.file(MESSAGEEXTSION_FILES);
        assert.noFile(MESSAGEEXTSION_HTML_FILES);

        if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
            const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
            assert.equal(false, npmInstallResult);
      
            const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
            assert.equal(false, npmRunBuildResult);
      
            const npmRunTestResult = await testHelper.runNpmCommand("npm run test", projectPath);
            assert.equal(false, npmRunTestResult);
        }
    });
    it('should generate message extension project with v1.4 with unit tests, without configuration', async () => {
        const projectPath = testHelper.TEMP_MESSAGEEXTSION_GENERATOR_PATH + "/mesExt01-v14-withUnitTwithoutConf";

        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(projectPath)
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'messageExtension-test-01',
                whichFolder: 'current',
                name: 'messageExtensiontest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.4',
                parts: 'messageextension',
                unitTestsEnabled: true,
                messageExtensionHost: 'new',
                bottype: 'botframework',
                messageExtensionName: 'messageExtension-test-01',
                messageExtensionDescription: 'description',
                messagingExtensionCanUpdateConfiguration: false
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(testHelper.ROOT_FILES);
        assert.file(testHelper.TEST_FILES);
        assert.file(testHelper.APP_FILES);
        assert.file(testHelper.SCRIPT_FILES);
        assert.file(testHelper.WEB_FILES);
        assert.file(testHelper.MANIFEST_FILES);
        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_14);
        assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ canUpdateConfiguration: false }] })
        assert.noFile(MESSAGEEXTSION_SCRIPT_FILES);
        assert.noFile(MESSAGEEXTSION_SCRIPT_TEST_FILES);
        assert.file(MESSAGEEXTSION_FILES);
        assert.noFile(MESSAGEEXTSION_HTML_FILES);

        if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
            const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
            assert.equal(false, npmInstallResult);
      
            const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
            assert.equal(false, npmRunBuildResult);
      
            const npmRunTestResult = await testHelper.runNpmCommand("npm run test", projectPath);
            assert.equal(false, npmRunTestResult);
        }
    });

    it('should generate message extension project with v1.3 without unit tests', async () => {
        const projectPath = testHelper.TEMP_MESSAGEEXTSION_GENERATOR_PATH + "/mesExt01-v13-withoutUnitT";

        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(projectPath)
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'messageExtension-test-01',
                whichFolder: 'current',
                name: 'messageExtensiontest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.3',
                parts: 'messageextension',
                unitTestsEnabled: false,
                messageExtensionHost: 'new',
                bottype: 'botframework',
                messageExtensionName: 'messageExtension-test-01',
                messageExtensionDescription: 'description'
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(testHelper.ROOT_FILES);
        assert.noFile(testHelper.TEST_FILES);
        assert.file(testHelper.APP_FILES);
        assert.file(testHelper.SCRIPT_FILES);
        assert.file(testHelper.WEB_FILES);
        assert.file(testHelper.MANIFEST_FILES);
        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_13);
        assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ canUpdateConfiguration: true }] })
        assert.file(MESSAGEEXTSION_SCRIPT_FILES);
        assert.noFile(MESSAGEEXTSION_SCRIPT_TEST_FILES);
        assert.file(MESSAGEEXTSION_FILES);
        assert.file(MESSAGEEXTSION_HTML_FILES);

        if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
            const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
            assert.equal(false, npmInstallResult);
      
            const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
            assert.equal(false, npmRunBuildResult);
        }
    });

    it('should generate message extension project with devPreview with unit tests', async () => {
        const projectPath = testHelper.TEMP_MESSAGEEXTSION_GENERATOR_PATH + "/mesExt01-dev-withUnitT";

        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(projectPath)
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'messageExtension-test-01',
                whichFolder: 'current',
                name: 'messageExtensiontest01',
                developer: 'generator teams developer',
                manifestVersion: 'devPreview',
                parts: 'messageextension',
                unitTestsEnabled: true,
                messageExtensionHost: 'new',
                bottype: 'botframework',
                messageExtensionName: 'messageExtension-test-01',
                messageExtensionDescription: 'description'
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(testHelper.ROOT_FILES);
        assert.file(testHelper.TEST_FILES);
        assert.file(testHelper.APP_FILES);
        assert.file(testHelper.SCRIPT_FILES);
        assert.file(testHelper.WEB_FILES);
        assert.file(testHelper.MANIFEST_FILES);
        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_DEVPREVIEW);
        assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ canUpdateConfiguration: true }] })
        assert.file(MESSAGEEXTSION_SCRIPT_FILES);
        assert.file(MESSAGEEXTSION_SCRIPT_TEST_FILES);
        assert.file(MESSAGEEXTSION_FILES);
        assert.file(MESSAGEEXTSION_HTML_FILES);

        if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
            const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
            assert.equal(false, npmInstallResult);
      
            const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
            assert.equal(false, npmRunBuildResult);
      
            const npmRunTestResult = await testHelper.runNpmCommand("npm run test", projectPath);
            assert.equal(false, npmRunTestResult);
        }
    });

    it('should generate message extension project with devPreview with unit tests, without configuration', async () => {
        const projectPath = testHelper.TEMP_MESSAGEEXTSION_GENERATOR_PATH + "/mesExt01-dev-withUnitTwithoutConf";

        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(projectPath)
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'messageExtension-test-01',
                whichFolder: 'current',
                name: 'messageExtensiontest01',
                developer: 'generator teams developer',
                manifestVersion: 'devPreview',
                parts: 'messageextension',
                unitTestsEnabled: true,
                messageExtensionHost: 'new',
                bottype: 'botframework',
                messageExtensionName: 'messageExtension-test-01',
                messageExtensionDescription: 'description',
                messagingExtensionCanUpdateConfiguration: false
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(testHelper.ROOT_FILES);
        assert.file(testHelper.TEST_FILES);
        assert.file(testHelper.APP_FILES);
        assert.file(testHelper.SCRIPT_FILES);
        assert.file(testHelper.WEB_FILES);
        assert.file(testHelper.MANIFEST_FILES);
        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_DEVPREVIEW);
        assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ canUpdateConfiguration: false }] })
        assert.noFile(MESSAGEEXTSION_SCRIPT_FILES);
        assert.noFile(MESSAGEEXTSION_SCRIPT_TEST_FILES);
        assert.file(MESSAGEEXTSION_FILES);
        assert.noFile(MESSAGEEXTSION_HTML_FILES);

        if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
            const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
            assert.equal(false, npmInstallResult);
      
            const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
            assert.equal(false, npmRunBuildResult);
      
            const npmRunTestResult = await testHelper.runNpmCommand("npm run test", projectPath);
            assert.equal(false, npmRunTestResult);
        }
    });

    it('should generate message extension project with devPreview without unit tests', async () => {
        const projectPath = testHelper.TEMP_MESSAGEEXTSION_GENERATOR_PATH + "/mesExt01-dev-withoutUnitT";

        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(projectPath)
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'messageExtension-test-01',
                whichFolder: 'current',
                name: 'messageExtensiontest01',
                developer: 'generator teams developer',
                manifestVersion: 'devPreview',
                parts: 'messageextension',
                unitTestsEnabled: false,
                messageExtensionHost: 'new',
                bottype: 'botframework',
                messageExtensionName: 'messageExtension-test-01',
                messageExtensionDescription: 'description'
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(testHelper.ROOT_FILES);
        assert.noFile(testHelper.TEST_FILES);
        assert.file(testHelper.APP_FILES);
        assert.file(testHelper.SCRIPT_FILES);
        assert.file(testHelper.WEB_FILES);
        assert.file(testHelper.MANIFEST_FILES);
        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_DEVPREVIEW);
        assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ canUpdateConfiguration: true }] })
        assert.file(MESSAGEEXTSION_SCRIPT_FILES);
        assert.noFile(MESSAGEEXTSION_SCRIPT_TEST_FILES);
        assert.file(MESSAGEEXTSION_FILES);
        assert.file(MESSAGEEXTSION_HTML_FILES);

        if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
            const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
            assert.equal(false, npmInstallResult);
      
            const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
            assert.equal(false, npmRunBuildResult);
        }
    });

    it('should generate a query message extension project with devPreview', async () => {
        const projectPath = testHelper.TEMP_MESSAGEEXTSION_GENERATOR_PATH + "/mesExt01-dev-queryMessage";

        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(projectPath)
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'messageExtension-test-01',
                whichFolder: 'current',
                name: 'messageExtensiontest01',
                developer: 'generator teams developer',
                manifestVersion: 'devPreview',
                parts: 'messageextension',
                unitTestsEnabled: false,
                messageExtensionHost: 'new',
                bottype: 'botframework',
                messageExtensionName: 'messageExtension-test-01',
                messageExtensionDescription: 'description',
                messagingExtensionType: "query"
            })
            .withGenerators(testHelper.DEPENDENCIES);


        assert.fileContent('src/manifest/manifest.json', `"type": "query"`);
        assert.fileContent(MESSAGEEXTSION_FILES[0], "public async onQuery(");

        if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
            const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
            assert.equal(false, npmInstallResult);
      
            const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
            assert.equal(false, npmRunBuildResult);
        }
    });

    it('should generate an action message (static with adaptiveCard response) extension project with 1.4', async () => {
        const projectPath = testHelper.TEMP_MESSAGEEXTSION_GENERATOR_PATH + "/mesExt01-v14-withAdapCard";

        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(projectPath)
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'messageExtension-test-01',
                whichFolder: 'current',
                name: 'messageExtensiontest01',
                developer: 'generator teams developer',
                manifestVersion: 'devPreview',
                parts: 'messageextension',
                unitTestsEnabled: false,
                messageExtensionHost: 'new',
                bottype: 'botframework',
                messageExtensionName: 'messageExtension-test-01',
                messageExtensionDescription: 'description',
                messagingExtensionType: "action",
                messagingExtensionActionInputType: "static",
                messagingExtensionActionResponseType: "adaptiveCard"
            })
            .withGenerators(testHelper.DEPENDENCIES);


        assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ commands: [{ type: "action" }] }] });
        assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ commands: [{ fetchTask: false }] }] });
        assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ commands: [{ parameters: {} }] }] });
        assert.noFileContent(MESSAGEEXTSION_FILES[0], "public async onFetchTask(");
        assert.fileContent(MESSAGEEXTSION_FILES[0], "public async onSubmitAction(");

        if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
            const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
            assert.equal(false, npmInstallResult);
      
            const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
            assert.equal(false, npmRunBuildResult);
        }
    });

    it('should generate an action message (static with adaptiveCard response) extension project with devPreview', async () => {
        const projectPath = testHelper.TEMP_MESSAGEEXTSION_GENERATOR_PATH + "/mesExt01-dev-withAdapCard";

        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(projectPath)
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'messageExtension-test-01',
                whichFolder: 'current',
                name: 'messageExtensiontest01',
                developer: 'generator teams developer',
                manifestVersion: 'devPreview',
                parts: 'messageextension',
                unitTestsEnabled: false,
                messageExtensionHost: 'new',
                bottype: 'botframework',
                messageExtensionName: 'messageExtension-test-01',
                messageExtensionDescription: 'description',
                messagingExtensionType: "action",
                messagingExtensionActionInputType: "static",
                messagingExtensionActionContext: ["compose", "commandBox"],
                messagingExtensionActionResponseType: "adaptiveCard"
            })
            .withGenerators(testHelper.DEPENDENCIES);


        assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ commands: [{ type: "action" }] }] });
        assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ commands: [{ fetchTask: false }] }] });
        assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ commands: [{ parameters: {} }] }] });
        assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ commands: [{ context: ["compose", "commandBox"] }] }] });
        assert.noFileContent(MESSAGEEXTSION_FILES[0], "public async onFetchTask(");
        assert.fileContent(MESSAGEEXTSION_FILES[0], "public async onSubmitAction(");

        if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
            const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
            assert.equal(false, npmInstallResult);
      
            const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
            assert.equal(false, npmRunBuildResult);
        }
    });

    it('should generate an action message (adaptiveCard with adaptiveCard response) extension project with devPreview', async () => {
        const projectPath = testHelper.TEMP_MESSAGEEXTSION_GENERATOR_PATH + "/mesExt01-dev-withAdapResp";

        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(projectPath)
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'messageExtension-test-01',
                whichFolder: 'current',
                name: 'messageExtensiontest01',
                developer: 'generator teams developer',
                manifestVersion: 'devPreview',
                parts: 'messageextension',
                unitTestsEnabled: false,
                messageExtensionHost: 'new',
                bottype: 'botframework',
                messageExtensionName: 'messageExtension-test-01',
                messageExtensionDescription: 'description',
                messagingExtensionType: "action",
                messagingExtensionActionInputType: "adaptiveCard",
                messagingExtensionActionResponseType: "adaptiveCard"
            })
            .withGenerators(testHelper.DEPENDENCIES);


        assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ commands: [{ type: "action" }] }] });
        assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ commands: [{ fetchTask: true }] }] });
        assert.noJsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ commands: [{ parameters: {} }] }] });
        assert.fileContent(MESSAGEEXTSION_FILES[0], "public async onFetchTask(");
        assert.fileContent(MESSAGEEXTSION_FILES[0], "public async onSubmitAction(");

        if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
            const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
            assert.equal(false, npmInstallResult);
      
            const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
            assert.equal(false, npmRunBuildResult);
        }
    });

    it('should generate an action message (taskModule with adaptive card response) extension project with devPreview', async () => {
        const projectPath = testHelper.TEMP_MESSAGEEXTSION_GENERATOR_PATH + "/mesExt01-v13-withTaskModule";

        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(projectPath)
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'messageExtension-test-01',
                whichFolder: 'current',
                name: 'messageExtensiontest01',
                developer: 'generator teams developer',
                manifestVersion: 'devPreview',
                parts: 'messageextension',
                unitTestsEnabled: false,
                messageExtensionHost: 'new',
                bottype: 'botframework',
                messageExtensionName: 'messageExtension-test-01',
                messageExtensionDescription: 'description',
                messagingExtensionType: "action",
                messagingExtensionActionInputType: "taskModule",
                messagingExtensionActionResponseType: "adaptiveCard"
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(MESSAGEEXTSION__TASKMODULE_FILES);
        assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ commands: [{ type: "action" }] }] });
        assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ commands: [{ fetchTask: true }] }] });
        assert.noJsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ commands: [{ parameters: {} }] }] });
        assert.fileContent(MESSAGEEXTSION_FILES[0], "public async onFetchTask(");
        assert.fileContent(MESSAGEEXTSION_FILES[0], "public async onFetchTask(");
        assert.fileContent(MESSAGEEXTSION_FILES[0], "public async onSubmitAction(");
        assert.fileContent(MESSAGEEXTSION_FILES[0], "type: \"result\"");

        if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
            const npmInstallResult = await testHelper.runNpmCommand("npm install", projectPath);
            assert.equal(false, npmInstallResult);
      
            const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
            assert.equal(false, npmRunBuildResult);
        }
    });
});