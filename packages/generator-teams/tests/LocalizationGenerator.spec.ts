// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as del from 'del';
import * as helpers from 'yeoman-test';
import * as assert from 'yeoman-assert';
import { describe, it } from 'mocha';

import * as testHelper from './helpers/TestHelper';

describe('teams:localization', function () {


    beforeEach(async () => {
        await del([testHelper.TEMP_GENERATOR_PATTERN]);
    });


    it('should generate a v1.8 project with a localization file', async () => {
        const projectPath = testHelper.TEMP_LOCALIZATION_GENERATOR_PATH + "/localization01-v15-withLocFile";

        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(projectPath)
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'localization-test-04',
                whichFolder: 'current',
                name: 'localizationtest04',
                developer: 'generator teams developer',
                manifestVersion: 'v1.8',
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

        if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
            const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
            assert.strictEqual(true, npmInstallResult);
      
            const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
            assert.strictEqual(true, npmRunBuildResult);
        }
    });

    it('should generate a v1.8 project with a tab, and not add any localization info', async () => {
        const projectPath = testHelper.TEMP_LOCALIZATION_GENERATOR_PATH + "/localization01-v17-withTab";

        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(projectPath)
            .withArguments(['--no-telemetry'])
            .withPrompts({
                solutionName: 'localization-test-06',
                whichFolder: 'current',
                name: 'localizationtest06',
                developer: 'generator teams developer',
                manifestVersion: 'v1.8',
                parts: 'tab',
                tabType: "configurable",
                tabScopes: ["team"]
            })
            .withGenerators(testHelper.DEPENDENCIES);

        assert.noJsonFileContent('src/manifest/manifest.json', { localizationInfo: { } });

        if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
            const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
            assert.strictEqual(true, npmInstallResult);
      
            const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
            assert.strictEqual(true, npmRunBuildResult);
        }
    });

    it('should generate a devPreview project with a localization file', async () => {
        const projectPath = testHelper.TEMP_LOCALIZATION_GENERATOR_PATH + "/localization01-dev-withLocalization";

        await helpers.run(testHelper.GENERATOR_PATH)
            .inDir(projectPath)
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

        if (process.env.TEST_TYPE == testHelper.TestTypes.INTEGRATION) {
            const npmInstallResult = await testHelper.runNpmCommand("npm install --prefer-offline", projectPath);
            assert.strictEqual(true, npmInstallResult);
      
            const npmRunBuildResult = await testHelper.runNpmCommand("npm run build", projectPath);
            assert.strictEqual(true, npmRunBuildResult);
        }
    });


});