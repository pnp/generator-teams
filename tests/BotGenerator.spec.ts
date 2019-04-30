import * as path from 'path';
import * as del from 'del';
import * as fs from 'fs-extra';
import * as helpers from 'yeoman-test';
import * as assert from 'yeoman-assert';
import { describe, it} from 'mocha';

import * as testHelper from './helpers/TestHelper';

describe('teams:bot', function () {

    const BOT_HTML_FILES = [
        'src/app/web/bottest01Bot/aboutBottest01Bot.html'
    ];

    const BOT_SCRIPT_FILES = [
        'src/app/scripts/bottest01Bot/AboutBottest01BotTab.tsx'
    ];

    const BOT_SCRIPT_TEST_FILES = [
        'src/app/scripts/bottest01Bot/__tests__/AboutBottest01BotTab.spec.tsx'
    ];

    const BOT_FILES = [
        'src/app/bottest01Bot/Bottest01Bot.ts',
        'src/app/bottest01Bot/dialogs/HelpDialog.ts',
        'src/app/bottest01Bot/dialogs/WelcomeDialog.ts',
        'src/app/bottest01Bot/dialogs/WelcomeCard.json'
    ];

    beforeEach(async () => {
        await del([testHelper.TEMP_GENERATOR_PATTERN]);
    });
    
    it('should generate bot project with v1.3 with unit tests', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_BOT_GENERATOR_PATH + '/bot01')
            .withPrompts({
                solutionName: 'bot-test-01',
                whichFolder: 'current',
                name: 'bottest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.3',
                parts: 'bot',
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
        
        assert.file(BOT_SCRIPT_FILES);
        assert.file(BOT_SCRIPT_TEST_FILES);
        assert.file(BOT_FILES);
        assert.file(BOT_HTML_FILES);
    });

    it('should generate bot project with v1.3 without unit tests', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_BOT_GENERATOR_PATH + '/bot02')
            .withPrompts({
                solutionName: 'bot-test-01',
                whichFolder: 'current',
                name: 'bottest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.3',
                parts: 'bot',
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
        
        assert.file(BOT_SCRIPT_FILES);
        assert.noFile(BOT_SCRIPT_TEST_FILES);
        assert.file(BOT_FILES);
        assert.file(BOT_HTML_FILES);
    });

    it('should generate bot project with devPreview with unit tests', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_BOT_GENERATOR_PATH + '/bot03')
            .withPrompts({
                solutionName: 'bot-test-01',
                whichFolder: 'current',
                name: 'bottest01',
                developer: 'generator teams developer',
                manifestVersion: 'devPreview',
                parts: 'bot',
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
        
        assert.file(BOT_SCRIPT_FILES);
        assert.file(BOT_SCRIPT_TEST_FILES);
        assert.file(BOT_FILES);
        assert.file(BOT_HTML_FILES);
    });

    it('should generate bot project with devPreview without unit tests', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_BOT_GENERATOR_PATH + '/bot04')
            .withPrompts({
                solutionName: 'bot-test-01',
                whichFolder: 'current',
                name: 'bottest01',
                developer: 'generator teams developer',
                manifestVersion: 'devPreview',
                parts: 'bot',
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
        
        assert.file(BOT_SCRIPT_FILES);
        assert.noFile(BOT_SCRIPT_TEST_FILES);
        assert.file(BOT_FILES);
        assert.file(BOT_HTML_FILES);
    });
});