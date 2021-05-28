// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import GulpClient from "gulp";
import Undertaker from "undertaker";
import { deployTask } from "./deployTask";

/**
 * Run the dependencies in series
 * @param gulp the gulp client
 * @param tasks the tasks
 */
export const dependencies = (gulp: GulpClient.Gulp, ...tasks: Undertaker.Task[]) => {
    return (done: any) => gulp.series(...tasks)(done);
};

/**
 * Run the dependencies in parallel
 * @param gulp the gulp client
 * @param tasks the tasks
 */
export const dependenciesP = (gulp: GulpClient.Gulp, ...tasks: Undertaker.Task[]) => {
    return (done: any) => gulp.parallel(...tasks)(done);
};

export const setup = (gulp: GulpClient.Gulp, config: any): void => {
    deployTask(gulp, config);

};
