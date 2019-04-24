import * as path from 'path';
import * as del from 'del';
import * as fs from 'fs-extra';
import * as helpers from 'yeoman-test';
import * as assert from 'yeoman-assert';
import { describe, it} from 'mocha';

import * as testHelper from './helpers/TestHelper';

describe('teams:tab', function () {

    const MANIFEST_FILES = [
        'src/manifest/icon-color.png',
        'src/manifest/icon-outline.png',
        'src/manifest/manifest.json',
    ];

    const TAB_HTML_FILES = [
        'src/app/web/tabtest01Tab/index.html',
        'src/app/web/tabtest01Tab/config.html',
        'src/app/web/tabtest01Tab/remove.html'
    ];

    const WEB_FILES = [
        'src/app/web/assets/icon.png',
        'src/app/web/index.html',
        'src/app/web/privacy.html',
        'src/app/web/tou.html'
    ];

    const TAB_SCRIPT_FILES = [
        'src/app/scripts/tabtest01Tab/Tabtest01Tab.tsx',
        'src/app/scripts/tabtest01Tab/Tabtest01TabConfig.tsx',
        'src/app/scripts/tabtest01Tab/Tabtest01TabRemove.tsx'
    ];

    const TAB_SCRIPT_TEST_FILES = [
        'src/app/scripts/tabtest01Tab/__tests__/Tabtest01Tab.spec.tsx',
        'src/app/scripts/tabtest01Tab/__tests__/Tabtest01TabConfig.spec.tsx',
        'src/app/scripts/tabtest01Tab/__tests__/Tabtest01TabRemove.spec.tsx'
    ];

    const TAB_FILES = 'src/app/tabtest01Tab/tabtest01Tab.ts';

    const APP_FILES = [
        'src/app/server.ts',
        'src/app/TeamsAppsComponents.ts'
    ];

    const SCRIPT_FILES = 'src/app/scripts/client.ts';

    beforeEach(async () => {
        await del([testHelper.TEMP_GENERATOR_PATTERN]);
    });
    
    it('generates project with v1.3 with unit tests', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + '/tab01')
            .withPrompts({
                solutionName: 'tab-test-01',
                whichFolder: 'current',
                name: 'tabtest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.3',
                parts: 'tab',
                unitTestsEnabled: true
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(testHelper.ROOT_FILES);
        assert.file(testHelper.TEST_FILES);
        assert.file(APP_FILES);
        assert.file(SCRIPT_FILES);
        assert.file(TAB_SCRIPT_FILES);
        assert.file(TAB_SCRIPT_TEST_FILES);
        assert.file(TAB_FILES);
        assert.file(WEB_FILES);
        assert.file(TAB_HTML_FILES);
        assert.file(MANIFEST_FILES);

        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_13);
    });

    it('generates project with v1.3 without unit tests', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + '/tab02')
            .withPrompts({
                solutionName: 'tab-test-01',
                whichFolder: 'current',
                name: 'tabtest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.3',
                parts: 'tab',
                unitTestsEnabled: false
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(testHelper.ROOT_FILES);
        assert.noFile(testHelper.TEST_FILES);
        assert.file(APP_FILES);
        assert.file(SCRIPT_FILES);
        assert.file(TAB_SCRIPT_FILES);
        assert.noFile(TAB_SCRIPT_TEST_FILES);
        assert.file(TAB_FILES);
        assert.file(WEB_FILES);
        assert.file(TAB_HTML_FILES);
        assert.file(MANIFEST_FILES);

        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_13);
    });

    it('generates project with devPreview with unit tests', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + '/tab03')
            .withPrompts({
                solutionName: 'tab-test-01',
                whichFolder: 'current',
                name: 'tabtest01',
                developer: 'generator teams developer',
                manifestVersion: 'devPreview',
                parts: 'tab',
                unitTestsEnabled: true
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(testHelper.ROOT_FILES);
        assert.file(testHelper.TEST_FILES);
        assert.file(APP_FILES);
        assert.file(SCRIPT_FILES);
        assert.file(TAB_SCRIPT_FILES);
        assert.file(TAB_SCRIPT_TEST_FILES);
        assert.file(TAB_FILES);
        assert.file(WEB_FILES);
        assert.file(TAB_HTML_FILES);
        assert.file(MANIFEST_FILES);

        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_DEVPREVIEW);
    });

    it('generates project with devPReview without unit tests', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + '/tab04')
            .withPrompts({
                solutionName: 'tab-test-01',
                whichFolder: 'current',
                name: 'tabtest01',
                developer: 'generator teams developer',
                manifestVersion: 'devPreview',
                parts: 'tab',
                unitTestsEnabled: false
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(testHelper.ROOT_FILES);
        assert.noFile(testHelper.TEST_FILES);
        assert.file(APP_FILES);
        assert.file(SCRIPT_FILES);
        assert.file(TAB_SCRIPT_FILES);
        assert.noFile(TAB_SCRIPT_TEST_FILES);
        assert.file(TAB_FILES);
        assert.file(WEB_FILES);
        assert.file(TAB_HTML_FILES);
        assert.file(MANIFEST_FILES);

        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_DEVPREVIEW);
    });
});