import * as path from 'path';
import * as del from 'del';
import * as fs from 'fs-extra';
import * as helpers from 'yeoman-test';
import * as assert from 'yeoman-assert';
import { describe, it} from 'mocha';

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
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_CONNECTOR_GENERATOR_PATH + '/connector01')
            .withArguments('[no-telementry]')
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
    });

    it('should generate connector project with v1.3 without unit tests', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_CONNECTOR_GENERATOR_PATH + '/connector02')
            .withArguments('[no-telementry]')
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
    });

    it('should generate connector project with devPreview with unit tests', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_CONNECTOR_GENERATOR_PATH + '/connector03')
            .withArguments('[no-telementry]')
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
    });

    it('should generate connector project with devPreview without unit tests', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_CONNECTOR_GENERATOR_PATH + '/connector04')
            .withArguments('[no-telementry]')
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
    });
});