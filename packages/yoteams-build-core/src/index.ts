// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import GulpClient from "gulp";
import Undertaker from "undertaker";
import { buildTasks } from "./buildTasks";
import { codespacesTasks } from "./codespacesTasks";
import { manifest } from "./manifest";
import { ngrokTasks } from "./ngrokTasks";
import { nukeTasks } from "./nukeTasks";
import { serveTasks } from "./serveTasks";
import { styleTasks } from "./styleTasks";
import { webpackTasks } from "./webpackTasks";
import { webTasks } from "./webTasks";

/**
 * Run the dependencies in series
 * @param gulp the gulp client
 * @param tasks the tasks
 */
export const dependencies = (gulp: GulpClient.Gulp, ...tasks: Undertaker.Task[]) => {
    return (done:any) => gulp.series(...tasks)(done);
};

/**
 * Run the dependencies in parallel
 * @param gulp the gulp client
 * @param tasks the tasks
 */
export const dependenciesP = (gulp: GulpClient.Gulp, ...tasks: Undertaker.Task[]) => {
    return (done:any) => gulp.parallel(...tasks)(done);
};

/**
 * Initializes all Gulp tasks
 * @param gulp the gulp client
 * @param config optional config
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
    codespacesTasks(gulp, config);
};
