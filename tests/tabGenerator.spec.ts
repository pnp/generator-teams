import * as path from 'path';
import * as del from 'del';
import * as fs from 'fs-extra';
import * as helpers from 'yeoman-test';
import * as assert from 'yeoman-assert';
import { describe, it } from 'mocha';

import * as testHelper from './helpers/TestHelper';

describe('teams:tab', function () {

    const TAB_HTML_FILES = [
        'src/app/web/tabtest01Tab/index.html',
        'src/app/web/tabtest01Tab/config.html',
        'src/app/web/tabtest01Tab/remove.html'
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

    beforeEach(async () => {
        await del([testHelper.TEMP_GENERATOR_PATTERN]);
    });

    it('should generate tab project with v1.3 with unit tests', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + '/tab01')
            .withArguments(['--no-telemetry'])
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
        assert.file(testHelper.APP_FILES);
        assert.file(testHelper.SCRIPT_FILES);
        assert.file(testHelper.WEB_FILES);
        assert.file(testHelper.MANIFEST_FILES);

        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_13);

        assert.file(TAB_HTML_FILES);
        assert.file(TAB_FILES);
        assert.file(TAB_SCRIPT_FILES);
        assert.file(TAB_SCRIPT_TEST_FILES);
    });

    it('should generate tab project with v1.3 without unit tests', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + '/tab02')
            .withArguments(['--no-telemetry'])
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
        assert.file(testHelper.APP_FILES);
        assert.file(testHelper.SCRIPT_FILES);
        assert.file(testHelper.WEB_FILES);
        assert.file(testHelper.MANIFEST_FILES);

        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_13);

        assert.file(TAB_HTML_FILES);
        assert.file(TAB_FILES);
        assert.file(TAB_SCRIPT_FILES);
        assert.noFile(TAB_SCRIPT_TEST_FILES);
    });

    it('should generate tab project with v1.4 with unit tests', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + '/tab01-14')
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'tab-test-01',
                whichFolder: 'current',
                name: 'tabtest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.4',
                parts: 'tab',
                unitTestsEnabled: true
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(testHelper.ROOT_FILES);
        assert.file(testHelper.TEST_FILES);
        assert.file(testHelper.APP_FILES);
        assert.file(testHelper.SCRIPT_FILES);
        assert.file(testHelper.WEB_FILES);
        assert.file(testHelper.MANIFEST_FILES);

        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_14);

        assert.file(TAB_HTML_FILES);
        assert.file(TAB_FILES);
        assert.file(TAB_SCRIPT_FILES);
        assert.file(TAB_SCRIPT_TEST_FILES);
    });

    it('should generate tab project with v1.4 without unit tests', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + '/tab02-14')
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'tab-test-01',
                whichFolder: 'current',
                name: 'tabtest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.4',
                parts: 'tab',
                unitTestsEnabled: false
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(testHelper.ROOT_FILES);
        assert.noFile(testHelper.TEST_FILES);
        assert.file(testHelper.APP_FILES);
        assert.file(testHelper.SCRIPT_FILES);
        assert.file(testHelper.WEB_FILES);
        assert.file(testHelper.MANIFEST_FILES);

        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_14);

        assert.file(TAB_HTML_FILES);
        assert.file(TAB_FILES);
        assert.file(TAB_SCRIPT_FILES);
        assert.noFile(TAB_SCRIPT_TEST_FILES);
    });

    it('should generate tab project with v1.4 with SharePoint config', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + '/tab02-14')
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'tab-test-01',
                whichFolder: 'current',
                name: 'tabtest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.4',
                parts: 'tab',
                unitTestsEnabled: false,
                tabSharePoint: true,
                tabSharePointHosts: ["sharePointFullPage", "sharePointWebPart"]
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(testHelper.ROOT_FILES);
        assert.noFile(testHelper.TEST_FILES);
        assert.file(testHelper.APP_FILES);
        assert.file(testHelper.SCRIPT_FILES);
        assert.file(testHelper.WEB_FILES);
        assert.file(testHelper.MANIFEST_FILES);

        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_14);
        assert.jsonFileContent('src/manifest/manifest.json', {
            configurableTabs: [{
                sharePointPreviewImage: "https://{{HOSTNAME}}/assets/tabtest01Tab-preview.png",
                supportedSharePointHosts: [
                    "sharePointFullPage",
                    "sharePointWebPart"
                ]
            }]
        });

        assert.file(TAB_HTML_FILES);
        assert.file(TAB_FILES);
        assert.file(TAB_SCRIPT_FILES);
        assert.noFile(TAB_SCRIPT_TEST_FILES);
    });

    it('should generate tab project with v1.5 without unit tests', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + '/tab02-15')
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'tab-test-01',
                whichFolder: 'current',
                name: 'tabtest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.5',
                parts: 'tab',
                unitTestsEnabled: false
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(testHelper.ROOT_FILES);
        assert.noFile(testHelper.TEST_FILES);
        assert.file(testHelper.APP_FILES);
        assert.file(testHelper.SCRIPT_FILES);
        assert.file(testHelper.WEB_FILES);
        assert.file(testHelper.MANIFEST_FILES);

        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_15);

        assert.file(TAB_HTML_FILES);
        assert.file(TAB_FILES);
        assert.file(TAB_SCRIPT_FILES);
        assert.noFile(TAB_SCRIPT_TEST_FILES);
    });

    it('should generate tab project with v1.5 with SharePoint config', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + '/tab02-15')
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'tab-test-01',
                whichFolder: 'current',
                name: 'tabtest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.5',
                parts: 'tab',
                unitTestsEnabled: false,
                tabSharePoint: true,
                tabSharePointHosts: ["sharePointFullPage", "sharePointWebPart"]
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(testHelper.ROOT_FILES);
        assert.noFile(testHelper.TEST_FILES);
        assert.file(testHelper.APP_FILES);
        assert.file(testHelper.SCRIPT_FILES);
        assert.file(testHelper.WEB_FILES);
        assert.file(testHelper.MANIFEST_FILES);

        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_15);
        assert.jsonFileContent('src/manifest/manifest.json', {
            configurableTabs: [{
                sharePointPreviewImage: "https://{{HOSTNAME}}/assets/tabtest01Tab-preview.png",
                supportedSharePointHosts: [
                    "sharePointFullPage",
                    "sharePointWebPart"
                ]
            }]
        });

        assert.file(TAB_HTML_FILES);
        assert.file(TAB_FILES);
        assert.file(TAB_SCRIPT_FILES);
        assert.noFile(TAB_SCRIPT_TEST_FILES);
    });

    it('should generate tab project with v1.5 with MPM Id', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + '/tab02-15-mpn')
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'tab-test-01',
                whichFolder: 'current',
                name: 'tabtest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.5',
                parts: 'tab',
                unitTestsEnabled: false,
                mpnId: "1234567890"
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.file(testHelper.ROOT_FILES);
        assert.noFile(testHelper.TEST_FILES);
        assert.file(testHelper.APP_FILES);
        assert.file(testHelper.SCRIPT_FILES);
        assert.file(testHelper.WEB_FILES);
        assert.file(testHelper.MANIFEST_FILES);

        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_15);
        assert.jsonFileContent('src/manifest/manifest.json', {
            developer: {
                mpnId: "1234567890"
            }
        });
        assert.file(TAB_HTML_FILES);
        assert.file(TAB_FILES);
        assert.file(TAB_SCRIPT_FILES);
        assert.noFile(TAB_SCRIPT_TEST_FILES);
    });


    it('should generate tab project with devPreview with unit tests', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + '/tab03')
            .withArguments(['--no-telemetry'])
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
        assert.file(testHelper.APP_FILES);
        assert.file(testHelper.SCRIPT_FILES);
        assert.file(testHelper.WEB_FILES);
        assert.file(testHelper.MANIFEST_FILES);

        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_DEVPREVIEW);

        assert.file(TAB_HTML_FILES);
        assert.file(TAB_FILES);
        assert.file(TAB_SCRIPT_FILES);
        assert.file(TAB_SCRIPT_TEST_FILES);
    });

    it('should generate tab project with devPreview without unit tests', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + '/tab04')
            .withArguments(['--no-telemetry'])
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
        assert.file(testHelper.APP_FILES);
        assert.file(testHelper.SCRIPT_FILES);
        assert.file(testHelper.WEB_FILES);
        assert.file(testHelper.MANIFEST_FILES);

        assert.fileContent('src/manifest/manifest.json', testHelper.SCHEMA_DEVPREVIEW);

        assert.file(TAB_HTML_FILES);
        assert.file(TAB_FILES);
        assert.file(TAB_SCRIPT_FILES);
        assert.noFile(TAB_SCRIPT_TEST_FILES);
    });

    it('should generate tab project applicatiaon insights', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + '/tab05')
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'tab-test-01',
                whichFolder: 'current',
                name: 'tabtest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.3',
                parts: 'tab',
                unitTestsEnabled: false,
                useAzureAppInsights: true,
                azureAppInsightsKey: "12341234-1234-1234-1234-123412341234"
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.fileContent(".env", "APPINSIGHTS_INSTRUMENTATIONKEY=12341234-1234-1234-1234-123412341234");
        assert.fileContent("package.json", `"applicationinsights": "^1.3.1"`);
        assert.fileContent("src/app/web/index.html", `var appInsights = window.appInsights`);
    });

    it('should generate tab project with no applicatiaon insights', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + '/tab06')
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'tab-test-01',
                whichFolder: 'current',
                name: 'tabtest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.3',
                parts: 'tab',
                unitTestsEnabled: false,
                useAzureAppInsights: false
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.fileContent(".env", "APPINSIGHTS_INSTRUMENTATIONKEY=");
        assert.noFileContent("package.json", `"applicationinsights": "^1.3.1"`);
        assert.noFileContent("src/app/web/index.html", `var appInsights = window.appInsights`);
    });

    it('should generate tab project scoped to groupchat only', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + '/tab06')
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'tab-test-01',
                whichFolder: 'current',
                name: 'tabtest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.5',
                parts: 'tab',
                tabScopes: ["groupchat"]
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.jsonFileContent('src/manifest/manifest.json', {
            configurableTabs: [
                {
                    scopes: ["groupchat"]
                }
            ]
        });
    });

    it('should generate tab project scoped to team only', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + '/tab06')
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'tab-test-01',
                whichFolder: 'current',
                name: 'tabtest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.5',
                parts: 'tab',
                tabScopes: ["team"]
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.jsonFileContent('src/manifest/manifest.json', {
            configurableTabs: [
                {
                    scopes: ["team"]
                }
            ]
        });
    });
    it('should generate tab project scoped to groupchat and team', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_TAB_GENERATOR_PATH + '/tab06')
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'tab-test-01',
                whichFolder: 'current',
                name: 'tabtest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.5',
                parts: 'tab',
                tabScopes: ["team", "groupchat"]
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.jsonFileContent('src/manifest/manifest.json', {
            configurableTabs: [
                {
                    scopes: ["team", "groupchat"]
                }
            ]
        });
    });
});