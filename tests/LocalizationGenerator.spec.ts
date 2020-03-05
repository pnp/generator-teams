// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as del from 'del';
import * as helpers from 'yeoman-test';
import * as assert from 'yeoman-assert';
import { describe, it } from 'mocha';

import * as testHelper from './helpers/TestHelper';

describe('unit tests - teams:localization', function () {


    beforeEach(async () => {
        await del([testHelper.TEMP_GENERATOR_PATTERN]);
    });

    it('should generate a v1.4 project without localizationInfo', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_LOCALIZATION_GENERATOR_PATH + '/localization01')
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'localization-test-01',
                whichFolder: 'current',
                name: 'connectortest01',
                developer: 'generator teams developer',
                manifestVersion: 'v1.4',
                parts: 'localization',
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.noJsonFileContent('src/manifest/manifest.json', { localizationInfo: {} });

    });

    it('should generate a v1.5 project with localizationInfo, using std setting for default language tag', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_LOCALIZATION_GENERATOR_PATH + '/localization02')
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'localization-test-02',
                whichFolder: 'current',
                name: 'localizationtest02',
                developer: 'generator teams developer',
                manifestVersion: 'v1.5',
                parts: 'localization',
            })
            .withGenerators(testHelper.DEPENDENCIES);

            assert.jsonFileContent('src/manifest/manifest.json', { localizationInfo: { defaultLanguageTag: "en-us" } });

    });

    it('should generate a v1.5 project with a default language tag', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_LOCALIZATION_GENERATOR_PATH + '/localization03')
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'localization-test-03',
                whichFolder: 'current',
                name: 'localizationtest03',
                developer: 'generator teams developer',
                manifestVersion: 'v1.5',
                parts: 'localization',
                localization: true,
                defaultLanguage: "en-us"
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.jsonFileContent('src/manifest/manifest.json', { localizationInfo: { defaultLanguageTag: "en-us" } });

    });

    it('should generate a v1.5 project with a localization file', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_LOCALIZATION_GENERATOR_PATH + '/localization04')
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'localization-test-04',
                whichFolder: 'current',
                name: 'localizationtest04',
                developer: 'generator teams developer',
                manifestVersion: 'v1.5',
                parts: 'localization',
                localization: true,
                defaultLanguage: "en-us",
                additionalLanguage: "se-sv"
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.jsonFileContent('src/manifest/manifest.json', {
            localizationInfo: {
                defaultLanguageTag: "en-us",
                additionalLanguages: [
                    {
                        languageTag: "se-sv",
                        file: "se-sv.json"
                    }
                ]
            }
        });
        assert.file('src/manifest/se-sv.json');
        assert.jsonFileContent('src/manifest/se-sv.json', {
            "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.5/MicrosoftTeams.Localization.schema.json",
            "name.short": "localizationtest04",
            "name.full": "localizationtest04",
            "description.short": "TODO: add short description here",
            "description.full": "TODO: add full description here"
        });
    });

    it('should generate a devPreview project with a localization file', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_LOCALIZATION_GENERATOR_PATH + '/localization05')
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'localization-test-05',
                whichFolder: 'current',
                name: 'localizationtest05',
                developer: 'generator teams developer',
                manifestVersion: 'devPreview',
                parts: 'localization',
                localization: true,
                defaultLanguage: "en-us",
                additionalLanguage: "se-sv"
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.jsonFileContent('src/manifest/manifest.json', {
            localizationInfo: {
                defaultLanguageTag: "en-us",
                additionalLanguages: [
                    {
                        languageTag: "se-sv",
                        file: "se-sv.json"
                    }
                ]
            }
        });
        assert.file('src/manifest/se-sv.json');
    });

    it('should generate a v1.5 project with a tab, and not add any localization info', async () => {
        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(testHelper.TEMP_LOCALIZATION_GENERATOR_PATH + '/localization06')
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'localization-test-06',
                whichFolder: 'current',
                name: 'localizationtest06',
                developer: 'generator teams developer',
                manifestVersion: 'v1.5',
                parts: 'tab',
                tabType: "configurable"
            })
            .withGenerators(testHelper.DEPENDENCIES);

            assert.noJsonFileContent('src/manifest/manifest.json', { localizationInfo: { } });

    });

});