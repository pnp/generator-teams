// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import GulpClient from "gulp";
import log from "fancy-log";
import { dependencies } from ".";
import fs from "fs-extra";
import chalk from "chalk";

const argv = require("yargs").argv;

/**
 * Registers tasks for Github Codespaces
 * @param gulp Gulp object
 * @param config configuration - not used
 */
export const codespacesTasks = (gulp: GulpClient.Gulp, config: any) => {
    if (process.env.CODESPACES) {
        try {
            // only register code spaces tasks when in Github Codespaces

            const codespaceEnvConfig = "/workspaces/.codespaces/shared/environment-variables.json";
            const codespaceEnv = fs.readJSONSync(codespaceEnvConfig);
            const codespaceName = codespaceEnv.CODESPACE_NAME;

            process.env.PUBLIC_HOSTNAME = `${codespaceName}-${process.env.PORT}${process.env.RAILS_DEVELOPMENT_HOSTS}`;
            log("[Codespace] Public url: " + process.env.PUBLIC_HOSTNAME);
            gulp.task("codespaces-serve", dependencies(gulp, "manifest", "serve"));
        } catch (ex) {
            log(chalk.red(`Unable to set up Codespaces tasks: ${ex}`));
        }
    }
};
