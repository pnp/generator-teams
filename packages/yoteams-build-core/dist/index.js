"use strict";
// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
const buildTasks_1 = require("./buildTasks");
const manifest_1 = require("./manifest");
const ngrokTasks_1 = require("./ngrokTasks");
const nukeTasks_1 = require("./nukeTasks");
const serveTasks_1 = require("./serveTasks");
const styleTasks_1 = require("./styleTasks");
const webpackTasks_1 = require("./webpackTasks");
const webTasks_1 = require("./webTasks");
/**
 * Initializes all Gulp tasks
 * @param gulp
 * @param config
 */
const setup = (gulp, config) => {
    manifest_1.manifest(gulp, config);
    webpackTasks_1.webpackTasks(gulp, config);
    webTasks_1.webTasks(gulp, config);
    nukeTasks_1.nukeTasks(gulp, config);
    styleTasks_1.styleTasks(gulp, config);
    buildTasks_1.buildTasks(gulp, config);
    serveTasks_1.serveTasks(gulp, config);
    ngrokTasks_1.ngrokTasks(gulp, config);
};
exports.setup = setup;
