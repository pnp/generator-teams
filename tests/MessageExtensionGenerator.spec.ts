import * as del from 'del';
import * as helpers from 'yeoman-test';
import * as assert from 'yeoman-assert';
import { describe, it} from 'mocha';

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

    beforeEach(async () => {
        await del([testHelper.TEMP_GENERATOR_PATTERN]);
    });
    
    it('should generate message extension project with v1.3 with unit tests', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_MESSAGEEXTSION_GENERATOR_PATH + '/messageExtension01')
            .withPrompts({
                solutionName: 'messageExtension-test-01',
                whichFolder: 'current',
                name: 'messageExtensiontest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.3',
                parts: 'messageextension',
                unitTestsEnabled: true,
                messageExtensionType: 'new',
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
        
        assert.file(MESSAGEEXTSION_SCRIPT_FILES);
        assert.file(MESSAGEEXTSION_SCRIPT_TEST_FILES);
        assert.file(MESSAGEEXTSION_FILES);
        assert.file(MESSAGEEXTSION_HTML_FILES);
    });

    it('should generate message extension project with v1.3 without unit tests', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_MESSAGEEXTSION_GENERATOR_PATH + '/messageExtension02')
            .withPrompts({
                solutionName: 'messageExtension-test-01',
                whichFolder: 'current',
                name: 'messageExtensiontest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.3',
                parts: 'messageextension',
                unitTestsEnabled: false,
                messageExtensionType: 'new',
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
        
        assert.file(MESSAGEEXTSION_SCRIPT_FILES);
        assert.noFile(MESSAGEEXTSION_SCRIPT_TEST_FILES);
        assert.file(MESSAGEEXTSION_FILES);
        assert.file(MESSAGEEXTSION_HTML_FILES);
    });

    it('should generate message extension project with devPreview with unit tests', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_MESSAGEEXTSION_GENERATOR_PATH + '/messageExtension03')
            .withPrompts({
                solutionName: 'messageExtension-test-01',
                whichFolder: 'current',
                name: 'messageExtensiontest01',
                developer: 'generator teams developer',
                manifestVersion: 'devPreview',
                parts: 'messageextension',
                unitTestsEnabled: true,
                messageExtensionType: 'new',
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
        
        assert.file(MESSAGEEXTSION_SCRIPT_FILES);
        assert.file(MESSAGEEXTSION_SCRIPT_TEST_FILES);
        assert.file(MESSAGEEXTSION_FILES);
        assert.file(MESSAGEEXTSION_HTML_FILES);
    });

    it('should generate message extension project with devPreview without unit tests', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_MESSAGEEXTSION_GENERATOR_PATH + '/messageExtension04')
            .withPrompts({
                solutionName: 'messageExtension-test-01',
                whichFolder: 'current',
                name: 'messageExtensiontest01',
                developer: 'generator teams developer',
                manifestVersion: 'devPreview',
                parts: 'messageextension',
                unitTestsEnabled: false,
                messageExtensionType: 'new',
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
        
        assert.file(MESSAGEEXTSION_SCRIPT_FILES);
        assert.noFile(MESSAGEEXTSION_SCRIPT_TEST_FILES);
        assert.file(MESSAGEEXTSION_FILES);
        assert.file(MESSAGEEXTSION_HTML_FILES);
    });
});