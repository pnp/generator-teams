"use strict";
// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpackTasks = void 0;
const webpack_1 = __importDefault(require("webpack"));
const path_1 = __importDefault(require("path"));
const plugin_error_1 = __importDefault(require("plugin-error"));
const fancy_log_1 = __importDefault(require("fancy-log"));
const webpackTasks = (gulp, config) => {
    const webpackTask = (idx, callback) => {
        const webpackConfig = require(path_1.default.join(process.cwd(), "webpack.config"));
        webpack_1.default(webpackConfig[idx], (err, stats) => {
            if (err)
                throw new plugin_error_1.default("webpack", err);
            if (stats) {
                const jsonStats = stats.toJson();
                if (jsonStats.errors.length > 0) {
                    // eslint-disable-next-line array-callback-return
                    jsonStats.errors.map((e) => {
                        fancy_log_1.default("[Webpack error] " + e.message);
                    });
                }
                if (jsonStats.warnings.length > 0) {
                    // eslint-disable-next-line array-callback-return
                    jsonStats.warnings.map(function (e) {
                        fancy_log_1.default("[Webpack warning] " + e.message);
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
    gulp.task("webpack", gulp.parallel("webpack:client", "webpack:server"));
};
exports.webpackTasks = webpackTasks;
