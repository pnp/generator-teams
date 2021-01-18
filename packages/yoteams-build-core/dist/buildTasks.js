"use strict";
// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTasks = void 0;
/**
 * Registers the "build" Gulp task
 * @param gulp
 * @param config
 */
const buildTasks = (gulp, config) => {
    gulp.task("build", gulp.series("webpack", "styles", "static:copy", "static:inject"));
};
exports.buildTasks = buildTasks;
