import * as del from 'del';
import * as helpers from 'yeoman-test';
import * as assert from 'yeoman-assert';
import { describe, it } from 'mocha';

import * as testHelper from './helpers/TestHelper';

const tests = require("./tests.json");

describe('teams:messageExtension', function () {

    const MESSAGEEXTSION_HTML_FILES = [
        'src/public/teamsSolutionMessageExtension/config.html'
    ];

    const MESSAGEEXTSION_SCRIPT_FILES = [
        'src/client/teamsSolutionMessageExtension/TeamsSolutionMessageExtensionConfig.tsx'
    ];

    const MESSAGEEXTSION_SCRIPT_TEST_FILES = [
        'src/client/teamsSolutionMessageExtension/__tests__/TeamsSolutionMessageExtensionConfig.spec.tsx'
    ];

    const MESSAGEEXTSION_FILES = [
        'src/server/teamsSolutionMessageExtension/TeamsSolutionMessageExtension.ts'
    ];
    const MESSAGEEXTSION__TASKMODULE_FILES = [
        'src/client/mteamsSolutionMessageExtension/TeamsSolutionMessageExtensionAction.tsx',
        'src/public/teamsSolutionMessageExtension/action.html'
    ];

    beforeEach(async () => {
        await del([testHelper.TEMP_GENERATOR_PATTERN]);
    });

    async function messageExtensionTests(prompts: any) {
        if (prompts.messagingExtensionCanUpdateConfiguration == false) {
            it("Should have a Compose Extension with update", async () => {
                assert.jsonFileContent('src/manifest/manifest.json', {
                    composeExtensions: [{ canUpdateConfiguration: false }]
                })
            });
            it("Should have messaging extension html files", async () => {
                assert.noFile(MESSAGEEXTSION_HTML_FILES);
            });
            it("Should have messaging extension client files", async () => {
                assert.noFile(MESSAGEEXTSION_SCRIPT_FILES);
            });
        } else {
            it("Should have a Compose Extension with update", async () => {
                assert.jsonFileContent('src/manifest/manifest.json', {
                    composeExtensions: [{ canUpdateConfiguration: true }]
                })
            });
            it("Should have messaging extension html files", async () => {
                assert.file(MESSAGEEXTSION_HTML_FILES);
            });
            it("Should have messaging extension client files", async () => {
                assert.file(MESSAGEEXTSION_SCRIPT_FILES);
            });
        }

        it("Should have messaging extension app files", async () => {
            assert.file(MESSAGEEXTSION_FILES);
        });

        if (prompts.unitTestsEnabled && prompts.messagingExtensionCanUpdateConfiguration != false) {
            it("Should have messaging extension unit test files", async () => {
                assert.file(MESSAGEEXTSION_SCRIPT_TEST_FILES);
            });
        } else {
            it("Should not have messaging extension unit test files", async () => {
                assert.noFile(MESSAGEEXTSION_SCRIPT_TEST_FILES);
            });
        }

        if (prompts.messagingExtensionType == "action") {
            it("Manifest should declare an action messaging extension", async () => {
                assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ commands: [{ type: "action" }] }] });
            });
            it("Middleware should define onSubmitAction", async () => {
                assert.fileContent(MESSAGEEXTSION_FILES[0], "public async onSubmitAction(");
            });
            it("Manifest should not declare a query messaging extension", async () => {
                assert.noJsonFileContent('src/manifest/manifest.json',{ composeExtensions: [{ commands: [{ type: "query" }] }] });
            });
            it("Bot middleware should not have the onQuery method", async () => {
                assert.noFileContent(MESSAGEEXTSION_FILES[0], "public async onQuery(");
            });
        } else if (prompts.messagingExtensionType == "query") {
            it("Manifest should declare a query messaging extension", async () => {
                assert.jsonFileContent('src/manifest/manifest.json',{ composeExtensions: [{ commands: [{ type: "query" }] }] });
            });
            it("Bot middleware should have the onQuery method", async () => {
                assert.fileContent(MESSAGEEXTSION_FILES[0], "public async onQuery(");
            });
            it("Manifest should declare an action messaging extension", async () => {
                assert.noJsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ commands: [{ type: "action" }] }] });
            });
            it("Middleware should define onSubmitAction", async () => {
                assert.noFileContent(MESSAGEEXTSION_FILES[0], "public async onSubmitAction(");
            });
        } else {
            it("Manifest should have empty commands", async () => {
                assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ commands: [] }] });
            });
            it("Manifest should have messageHandlers section with type link", async () => {
                assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ messageHandlers: [{ type: "link" }] }] });
            });
            it("Bot middleware should have the onQueryLink method", async () => {
                assert.fileContent(MESSAGEEXTSION_FILES[0], "public async onQueryLink(");
            });
        }
        if (prompts.messagingExtensionType == "action" && prompts.messagingExtensionActionInputType == "static") {
            it("Manifest should set fetchTask to false", async () => {
                assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ commands: [{ fetchTask: false }] }] });
            });
            it("Middleware should not define onFetchTask", async () => {
                assert.noFileContent(MESSAGEEXTSION_FILES[0], "public async onFetchTask(");
            });
        }
        if (prompts.messagingExtensionType == "action" && prompts.messagingExtensionActionInputType == "adaptiveCard") {
            it("Manifest should set fetchTask to false", async () => {
                assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ commands: [{ fetchTask: true }] }] });
            });
            it("Middleware should not define onFetchTask", async () => {
                assert.fileContent(MESSAGEEXTSION_FILES[0], "public async onFetchTask(");
            });
        }
        if (prompts.messagingExtensionType != "queryLink") {
            if (prompts.messagingExtensionActionInputType == "static") {
                it("Manifest should define parameters", async () => {
                    assert.jsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ commands: [{ parameters: {} }] }] });
                });
            } else {
                it("Manifest should not define parameters", async () => {
                    assert.noJsonFileContent('src/manifest/manifest.json', { composeExtensions: [{ commands: [{ parameters: {} }] }] });
                });
            }
        }
    }

    testHelper.runTests("messageExtensions", tests.messagingExtension, messageExtensionTests);

});