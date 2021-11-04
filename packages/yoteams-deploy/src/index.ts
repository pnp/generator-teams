// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import GulpClient from "gulp";
import Undertaker from "undertaker";
import { deployTask } from "./deployTask";
import * as appInsights from "applicationinsights";

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
    appInsights.defaultClient.trackEvent({ name: "yoteams-deploy:" + eventName });
    appInsights.defaultClient.flush();
};


export const setup = (gulp: GulpClient.Gulp, config: any): void => {
    deployTask(gulp, config);

};
