import * as del from "del";
import * as helpers from "yeoman-test";
import * as assert from "yeoman-assert";
import { describe, it } from "mocha";

import * as testHelper from "./helpers/TestHelper";

const tests = require("./tests.json");



describe("teams:generic", function () {
  beforeEach(async () => {
    await del([testHelper.TEMP_GENERATOR_PATTERN]);
  });

  async function genericTests(prompts: any) {

    if (prompts.useHttps && prompts.useSelfSignedSSL) {
      it("Should have .env settings for HTTPS with self-signed certificate", async () => {
        assert.fileContent(".env", `HTTPS=${prompts.useHttps}`);
        assert.fileContent(".env", /HTTPS_PFX_PATH=[\n|\r]/);
        assert.fileContent(".env", /HTTPS_PFX_PASSWORD=[\n|\r]/);
      });
    }

    if (prompts.useHttps && !prompts.useSelfSignedSSL) {
      it("Should have .env settings for HTTPS with custom PFX", async () => {
        assert.fileContent(".env", `HTTPS=${prompts.useHttps}`);
        assert.fileContent(".env", `HTTPS_PFX_PATH=${prompts.pfxFilePath}`);
        assert.fileContent(".env", `HTTPS_PFX_PASSWORD=${prompts.pfxFilePassword}`);
      });
    }

  }

  testHelper.runTests("generic", tests.generic, genericTests);

});
