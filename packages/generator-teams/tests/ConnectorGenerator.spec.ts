import * as del from 'del';
import * as helpers from 'yeoman-test';
import * as assert from 'yeoman-assert';
import { describe, it } from 'mocha';
const tests = require("./tests.json");

import * as testHelper from './helpers/TestHelper';

describe('teams:connector', function () {

    const CONNECTOR_HTML_FILES = [
        'src/public/teamsSolutionConnector/config.html'
    ];

    const CONNECTOR_SCRIPT_FILES = [
        'src/client/teamsSolutionConnector/TeamsSolutionConnectorConfig.tsx'
    ];

    const CONNECTOR_SCRIPT_TEST_FILES = [
        'src/client/teamsSolutionConnector/__tests__/TeamsSolutionConnectorConfig.spec.tsx'
    ];

    const CONNECTOR_FILES = [
        'src/server/teamsSolutionConnector/TeamsSolutionConnector.ts'
    ];


    const CONNECTOR_THEME_URL = "https://{{PUBLIC_HOSTNAME}}/teamsSolutionConnector/config.html?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}";


    beforeEach(async () => {
        await del([testHelper.TEMP_GENERATOR_PATTERN]);
    });


    async function connectorTests(prompts: any) {
        it("Should have a configuration URL", async () => {
            assert.jsonFileContent('src/manifest/manifest.json', {
                "connectors": [{
                    "configurationUrl": CONNECTOR_THEME_URL
                }
                ]
            });
        });
        it("Should have connector client files", async () => {
            assert.file(CONNECTOR_SCRIPT_FILES);
        });

        it("Should have connector app files", async () => {
            assert.file(CONNECTOR_FILES);
        });

        it("Should have connector html files", async () => {
            assert.file(CONNECTOR_HTML_FILES);
        });

        assert.noFile(CONNECTOR_SCRIPT_TEST_FILES);

        assert.file(CONNECTOR_HTML_FILES);



        if (prompts.unitTestsEnabled) {
            it("Should have connector unit test files", async () => {
                assert.file(CONNECTOR_SCRIPT_TEST_FILES);
            });
        } else {
            it("Should not have connector unit test files", async () => {
                assert.noFile(CONNECTOR_SCRIPT_TEST_FILES);
            });
        }


    }


    testHelper.runTests("connector", tests.connector, connectorTests);

});