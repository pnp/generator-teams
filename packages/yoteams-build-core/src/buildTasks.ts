// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import GulpClient from "gulp";
import { dependencies } from ".";

/**
 * Registers the "build" Gulp task
 * @param gulp
 * @param config
 */
export const buildTasks = (gulp: GulpClient.Gulp, config: any) => {
    gulp.task("build", dependencies(gulp, "webpack", "styles", "static:copy", "static:inject"));
};
