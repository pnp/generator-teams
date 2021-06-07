// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import chalk from "chalk";
import { spawn } from "child_process";
import log from "fancy-log";

export const execute = (
    args: readonly string[],
    out: (chunk: any) => void,
    err: (chunk: any) => void,
    close?: (code: number | null) => void | undefined): void => {

    const cmd = spawn("./node_modules/.bin/m365", args);
    cmd.on("error", (err: any) => {
        if (err.code === "ENOENT") {
            log(chalk.red("Unable to start m365 CLI, ensure that @pnp/cli-microsoft365 is installed!"));
        }
    });

    cmd.stdout.on("data", (data) => {
        out(data);
    });

    cmd.stderr.on("data", (data) => {
        err(data);
    });

    cmd.on("close", (code) => {
        if (close) {
            close(code);
        }
    });

};
