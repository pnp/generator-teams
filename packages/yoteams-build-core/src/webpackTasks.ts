// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import webpack from "webpack";
import path from "path";
import PluginError from "plugin-error";
import log from "fancy-log";
import GulpClient from "gulp";
import { dependenciesP } from ".";
import chalk from "chalk";

/**
 * Defines the two webpack tasks
 */
export const webpackTasks = (gulp: GulpClient.Gulp, config: any) => {

    const webpackTask = (idx: number, callback: Function) => {
        const webpackConfig = require(
            path.join(process.cwd(), "webpack.config")
        );

        webpack(webpackConfig[idx], (err, stats) => {

            if (err) {
                return callback(new PluginError("webpack", err));
            }
            if (stats) {
                const jsonStats = stats.toJson();
                if (jsonStats) {
                    if (jsonStats.warnings && jsonStats.warnings.length > 0) {
                        chalk.yellow("[Webpack warnings]:" + chalk.reset());
                        // eslint-disable-next-line array-callback-return
                        jsonStats.warnings.map((e) => {
                            log(e.message);
                        });
                    }
                    if (jsonStats.errors && jsonStats.errors.length > 0) {
                        log(chalk.red("[Webpack errors]:") + chalk.reset());
                        // eslint-disable-next-line array-callback-return
                        jsonStats.errors.map((e) => {
                            log(e.message);
                        });
                        return callback(new PluginError("webpack", `${jsonStats.errorsCount} webpack error(s) found.`));
                    }
                }
            }
            callback();
        });
    };

    gulp.task("webpack:client", callback => {
        webpackTask(1, callback);
    });

    gulp.task("webpack:server", callback => {
        webpackTask(0, callback);
    });

    gulp.task("webpack", dependenciesP(gulp, "webpack:client", "webpack:server"));

};
