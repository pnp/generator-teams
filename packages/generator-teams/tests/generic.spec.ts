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

  }

  testHelper.runTests("generic", tests.generic, genericTests);

});
