// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import GulpClient from "gulp";
import Undertaker from "undertaker";
import { buildTasks } from "./buildTasks";
import { codespacesTasks } from "./codespacesTasks";
import { loadPlugins } from "./loadPlugins";
import { manifest } from "./manifest";
import { ngrokTasks } from "./ngrokTasks";
import { nukeTasks } from "./nukeTasks";
import { serveTasks } from "./serveTasks";
import { styleTasks } from "./styleTasks";
import { webpackTasks } from "./webpackTasks";
import { webTasks } from "./webTasks";
import * as appInsights from "applicationinsights";
const argv = require("yargs").argv;
const debug = argv.debug !== undefined;

/**
 * Run the dependencies in series
 * @param gulp the gulp client
 * @param eventName name of event to track
 * @param tasks the tasks
 */
export const dependencies = (gulp: GulpClient.Gulp, eventName: string, ...tasks: Undertaker.Task[]) => {
    return (done: any) => {
        trackEvent(eventName);
        gulp.series(...tasks)(done);
    };
};

/**
 * Run the dependencies in parallel
 * @param gulp the gulp client
 * @param eventName name of event to track
 * @param tasks the tasks
 */
export const dependenciesP = (gulp: GulpClient.Gulp, eventName: string, ...tasks: Undertaker.Task[]) => {
    return (done: any) => {
        trackEvent(eventName);
        gulp.parallel(...tasks)(done);
    };
};

export const trackEvent = (eventName: string) => {
    appInsights.defaultClient.trackEvent({ name: "yoteams-build-core:" + eventName });
    appInsights.defaultClient.flush();
};

/**
 * Initializes all Gulp tasks
 * @param gulp the gulp client
 * @param config optional config
 */
export const setup = (gulp: GulpClient.Gulp, config: any): void => {

    const pkg: any = require("../package.json");

    // Set up telemetry
    if (!(process.env.YOTEAMS_TELEMETRY_OPTOUT === "1" ||
        process.env.YOTEAMS_TELEMETRY_OPTOUT === "true")) {

        // optimize App Insights performance
        process.env.APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL = "none";
        process.env.APPLICATION_INSIGHTS_NO_STATSBEAT = "true";

        // Set up the App Insights client
        appInsights.setup("6d773b93-ff70-45c5-907c-8edae9bf90eb").setInternalLogging(false, false);

        // Delete unnecessary telemetry data
        delete appInsights.defaultClient.context.tags["ai.cloud.roleInstance"];
        delete appInsights.defaultClient.context.tags["ai.cloud.role"];

        // Set common properties for all logging
        appInsights.defaultClient.commonProperties = {
            version: pkg.version,
            node: process.version,
            debug: debug.toString()
        };
    }

    manifest(gulp, config);
    webpackTasks(gulp, config);
    webTasks(gulp, config);
    nukeTasks(gulp, config);
    styleTasks(gulp, config);
    buildTasks(gulp, config);
    serveTasks(gulp, config);
    ngrokTasks(gulp, config);
    codespacesTasks(gulp, config);

    // load additional tasks
    loadPlugins(gulp, config);
};
