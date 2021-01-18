// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import GulpClient from "gulp";
import { buildTasks } from "./buildTasks";
import { manifest } from "./manifest";
import { ngrokTasks } from "./ngrokTasks";
import { nukeTasks } from "./nukeTasks";
import { serveTasks } from "./serveTasks";
import { styleTasks } from "./styleTasks";
import { webpackTasks } from "./webpackTasks";
import { webTasks } from "./webTasks";

/**
 * Initializes all Gulp tasks
 * @param gulp
 * @param config
 */
export const setup = (gulp: GulpClient.Gulp, config: any): void => {
    manifest(gulp, config);
    webpackTasks(gulp, config);
    webTasks(gulp, config);
    nukeTasks(gulp, config);
    styleTasks(gulp, config);
    buildTasks(gulp, config);
    serveTasks(gulp, config);
    ngrokTasks(gulp, config);
};
