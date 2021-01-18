// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import GulpClient from "gulp";

/**
 * Registers the "build" Gulp task
 * @param gulp
 * @param config
 */
export const buildTasks = (gulp: GulpClient.Gulp, config: any) => {
    gulp.task("build", gulp.series("webpack", "styles", "static:copy", "static:inject"));
};
