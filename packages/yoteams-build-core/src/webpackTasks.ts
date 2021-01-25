// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import webpack from "webpack";
import path from "path";
import PluginError from "plugin-error";
import log from "fancy-log";
import GulpClient from "gulp";
import { dependenciesP } from ".";

export const webpackTasks = (gulp: GulpClient.Gulp, config: any) => {

    const webpackTask = (idx: number, callback: Function) => {
        const webpackConfig = require(
            path.join(process.cwd(), "webpack.config")
        );

        webpack(webpackConfig[idx], (err, stats) => {

            if (err) throw new PluginError("webpack", err);
            if (stats) {
                const jsonStats = stats.toJson();

                if (jsonStats.errors.length > 0) {

                    // eslint-disable-next-line array-callback-return
                    jsonStats.errors.map((e: { message: string; }) => {
                        log("[Webpack error] " + e.message);
                    });
                }
                if (jsonStats.warnings.length > 0) {
                    // eslint-disable-next-line array-callback-return
                    jsonStats.warnings.map(function (e: { message: string; }) {
                        log("[Webpack warning] " + e.message);
                    });
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
