import * as del from 'del';
import * as helpers from 'yeoman-test';
import * as assert from 'yeoman-assert';
import { describe, it } from 'mocha';

import * as testHelper from './helpers/TestHelper';

describe('teams:connector', function () {

    const CONNECTOR_HTML_FILES = [
        'src/public/connectortest01Connector/config.html'
    ];

    const CONNECTOR_SCRIPT_FILES = [
        'src/client/connectortest01Connector/Connectortest01ConnectorConfig.tsx'
    ];

    const CONNECTOR_SCRIPT_TEST_FILES = [
        'src/client/connectortest01Connector/__tests__/Connectortest01ConnectorConfig.spec.tsx'
    ];

    const CONNECTOR_FILES = [
        'src/server/connectortest01Connector/Connectortest01Connector.ts'
    ];

    beforeEach(async () => {
        await del([testHelper.TEMP_GENERATOR_PATTERN]);
    });


    it('should generate connector project with v1.8 without unit tests', async () => {
        const projectPath = testHelper.TEMP_CONNECTOR_GENERATOR_PATH + "/connector-v18-withoutUnitT";

        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(projectPath)
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'connector-test-01',
                whichFolder: 'current',
                name: 'connectortest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.8',
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
        assert.file(testHelper.LINT_FILES);

        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_18);

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

        assert.jsonFileContent("package.json", { dependencies: { "react": "^16.8.6", "react-dom": "^16.8.6" } });

        if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
            const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
            assert.equal(false, npmInstallResult);

            const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
            assert.equal(false, npmRunBuildResult);
        }
    });

    it('should generate connector project with v1.8 with unit tests', async () => {
        const projectPath = testHelper.TEMP_CONNECTOR_GENERATOR_PATH + "/connector-v18-withoutUnitT";

        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(projectPath)
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'connector-test-01',
                whichFolder: 'current',
                name: 'connectortest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.8',
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
        assert.file(testHelper.LINT_FILES);

        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_18);

        assert.jsonFileContent('src/manifest/manifest.json', {
            "connectors": [{
                "configurationUrl": testHelper.CONNECTOR_THEME_URL
            }
            ]
        });

        assert.file(CONNECTOR_SCRIPT_FILES);
        assert.file(CONNECTOR_SCRIPT_TEST_FILES);
        assert.file(CONNECTOR_FILES);
        assert.file(CONNECTOR_HTML_FILES);

        assert.jsonFileContent("package.json", { dependencies: { "react": "^16.8.6", "react-dom": "^16.8.6" } });

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
        assert.file(testHelper.LINT_FILES);

        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_DEVPREVIEW);

        assert.file(CONNECTOR_SCRIPT_FILES);
        assert.file(CONNECTOR_SCRIPT_TEST_FILES);
        assert.file(CONNECTOR_FILES);
        assert.file(CONNECTOR_HTML_FILES);

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
        assert.file(testHelper.LINT_FILES);

        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_DEVPREVIEW);

        assert.file(CONNECTOR_SCRIPT_FILES);
        assert.noFile(CONNECTOR_SCRIPT_TEST_FILES);
        assert.file(CONNECTOR_FILES);
        assert.file(CONNECTOR_HTML_FILES);

        assert.jsonFileContent("package.json", { dependencies: { "react": "^16.8.6", "react-dom": "^16.8.6" } });

        if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
            const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
            assert.equal(false, npmInstallResult);

            const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
            assert.equal(false, npmRunBuildResult);
        }
    });
});