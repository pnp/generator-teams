import * as del from 'del';
import * as helpers from 'yeoman-test';
import * as assert from 'yeoman-assert';
import { describe, it } from 'mocha';

import * as testHelper from './helpers/TestHelper';

describe('teams:connector', function () {

    const CONNECTOR_HTML_FILES = [
        'src/app/web/connectortest01Connector/config.html'
    ];

    const CONNECTOR_SCRIPT_FILES = [
        'src/app/scripts/connectortest01Connector/Connectortest01ConnectorConfig.tsx'
    ];

    const CONNECTOR_SCRIPT_TEST_FILES = [
        'src/app/scripts/connectortest01Connector/__tests__/Connectortest01ConnectorConfig.spec.tsx'
    ];

    const CONNECTOR_FILES = [
        'src/app/connectortest01Connector/connectortest01Connector.ts'
    ];

    beforeEach(async () => {
        await del([testHelper.TEMP_GENERATOR_PATTERN]);
    });

    it('should generate connector project with v1.3 with unit tests', async () => {
        const projectPath = testHelper.TEMP_CONNECTOR_GENERATOR_PATH + "/connector-v13-withUnitT";

        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(projectPath)
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'connector-test-01',
                whichFolder: 'current',
                name: 'connectortest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.3',
                parts: 'connector',
                unitTestsEnabled: true
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(testHelper.ROOT_FILES);
        assert.file(testHelper.TEST_FILES);
        assert.file(testHelper.APP_FILES);
        assert.file(testHelper.SCRIPT_FILES);
        assert.file(testHelper.WEB_FILES);
        assert.file(testHelper.MANIFEST_FILES);
        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_13);

        assert.file(CONNECTOR_SCRIPT_FILES);
        assert.file(CONNECTOR_SCRIPT_TEST_FILES);
        assert.file(CONNECTOR_FILES);
        assert.file(CONNECTOR_HTML_FILES);

        if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
            const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
            assert.equal(false, npmInstallResult);

            const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
            assert.equal(false, npmRunBuildResult);

            const npmRunTestResult = await testHelper.runNpmCommand("npm run test", projectPath);
            assert.equal(false, npmRunTestResult);
        }
    });

    it('should generate connector project with v1.3 without unit tests', async () => {
        const projectPath = testHelper.TEMP_CONNECTOR_GENERATOR_PATH + "/connector-v13-withoutUnitT";

        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(projectPath)
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'connector-test-01',
                whichFolder: 'current',
                name: 'connectortest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.3',
                parts: 'connector',
                unitTestsEnabled: false
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(testHelper.ROOT_FILES);
        assert.noFile(testHelper.TEST_FILES);
        assert.file(testHelper.APP_FILES);
        assert.file(testHelper.SCRIPT_FILES);
        assert.file(testHelper.WEB_FILES);
        assert.file(testHelper.MANIFEST_FILES);
        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_13);

        assert.file(CONNECTOR_SCRIPT_FILES);
        assert.noFile(CONNECTOR_SCRIPT_TEST_FILES);
        assert.file(CONNECTOR_FILES);
        assert.file(CONNECTOR_HTML_FILES);

        if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
            const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
            assert.equal(false, npmInstallResult);

            const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
            assert.equal(false, npmRunBuildResult);
        }
    });

    it('should generate connector project with v1.6 without unit tests', async () => {
        const projectPath = testHelper.TEMP_CONNECTOR_GENERATOR_PATH + "/connector-v13-withoutUnitT";

        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(projectPath)
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'connector-test-01',
                whichFolder: 'current',
                name: 'connectortest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.6',
                parts: 'connector',
                unitTestsEnabled: false
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(testHelper.ROOT_FILES);
        assert.noFile(testHelper.TEST_FILES);
        assert.file(testHelper.APP_FILES);
        assert.file(testHelper.SCRIPT_FILES);
        assert.file(testHelper.WEB_FILES);
        assert.file(testHelper.MANIFEST_FILES);
        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_16);

        assert.jsonFileContent('src/manifest/manifest.json', {
            "connectors": [{
                "configurationUrl": testHelper.CONNECTOR_THEME_URL
            }
            ]
        });

        assert.file(CONNECTOR_SCRIPT_FILES);
        assert.noFile(CONNECTOR_SCRIPT_TEST_FILES);
        assert.file(CONNECTOR_FILES);
        assert.file(CONNECTOR_HTML_FILES);

        if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
            const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
            assert.equal(false, npmInstallResult);

            const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
            assert.equal(false, npmRunBuildResult);
        }
    });

    it('should generate connector project with devPreview with unit tests', async () => {
        const projectPath = testHelper.TEMP_CONNECTOR_GENERATOR_PATH + "/connector-dev-withUnitT";

        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(projectPath)
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'connector-test-01',
                whichFolder: 'current',
                name: 'connectortest01',
                developer: 'generator teams developer',
                manifestVersion: 'devPreview',
                parts: 'connector',
                unitTestsEnabled: true
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(testHelper.ROOT_FILES);
        assert.file(testHelper.TEST_FILES);
        assert.file(testHelper.APP_FILES);
        assert.file(testHelper.SCRIPT_FILES);
        assert.file(testHelper.WEB_FILES);
        assert.file(testHelper.MANIFEST_FILES);
        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_DEVPREVIEW);

        assert.file(CONNECTOR_SCRIPT_FILES);
        assert.file(CONNECTOR_SCRIPT_TEST_FILES);
        assert.file(CONNECTOR_FILES);
        assert.file(CONNECTOR_HTML_FILES);

        if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
            const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
            assert.equal(false, npmInstallResult);

            const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
            assert.equal(false, npmRunBuildResult);

            const npmRunTestResult = await testHelper.runNpmCommand("npm run test", projectPath);
            assert.equal(false, npmRunTestResult);
        }
    });

    it('should generate connector project with devPreview without unit tests', async () => {
        const projectPath = testHelper.TEMP_CONNECTOR_GENERATOR_PATH + "/connector-dev-withoutUnitT";

        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(projectPath)
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'connector-test-01',
                whichFolder: 'current',
                name: 'connectortest01',
                developer: 'generator teams developer',
                manifestVersion: 'devPreview',
                parts: 'connector',
                unitTestsEnabled: false
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(testHelper.ROOT_FILES);
        assert.noFile(testHelper.TEST_FILES);
        assert.file(testHelper.APP_FILES);
        assert.file(testHelper.SCRIPT_FILES);
        assert.file(testHelper.WEB_FILES);
        assert.file(testHelper.MANIFEST_FILES);
        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_DEVPREVIEW);

        assert.file(CONNECTOR_SCRIPT_FILES);
        assert.noFile(CONNECTOR_SCRIPT_TEST_FILES);
        assert.file(CONNECTOR_FILES);
        assert.file(CONNECTOR_HTML_FILES);

        if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
            const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
            assert.equal(false, npmInstallResult);

            const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
            assert.equal(false, npmRunBuildResult);
        }
    });
});