// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import GulpClient from "gulp";
import { dependencies } from ".";
import { IBuildCoreConfig } from "./ibuildCoreConfig";

/**
 * Registers the "build" Gulp task
 * @param gulp
 * @param config
 */
export const buildTasks = (gulp: GulpClient.Gulp, config: IBuildCoreConfig) => {
    gulp.task("build", dependencies(gulp, "build", "webpack", "styles", "static:copy", "static:inject"));
};
