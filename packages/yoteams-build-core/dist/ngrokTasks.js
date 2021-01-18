"use strict";
// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngrokTasks = void 0;
const fancy_log_1 = __importDefault(require("fancy-log"));
const ngrok_1 = __importDefault(require("ngrok"));
const ngrokTasks = (gulp, config) => {
    gulp.task("start-ngrok", (cb) => {
        fancy_log_1.default("[NGROK] starting ngrok...");
        const conf = {
            subdomain: process.env.NGROK_SUBDOMAIN,
            region: process.env.NGROK_REGION,
            addr: process.env.PORT,
            authtoken: process.env.NGROK_AUTH
        };
        ngrok_1.default.connect(conf).then((url) => {
            fancy_log_1.default("[NGROK] Url: " + url);
            if (!conf.authtoken) {
                fancy_log_1.default("[NGROK] You have been assigned a random ngrok URL that will only be available for this session. You wil need to re-upload the Teams manifest next time you run this command.");
            }
            let hostName = url.replace("http://", "");
            hostName = hostName.replace("https://", "");
            fancy_log_1.default("[NGROK] HOSTNAME: " + hostName);
            process.env.HOSTNAME = hostName;
            cb();
        }).catch((err) => {
            fancy_log_1.default.error(`[NGROK] Error: ${JSON.stringify(err)}`);
            cb(err.msg);
        });
    });
    gulp.task("ngrok-serve", gulp.series("start-ngrok", "manifest", "serve"));
};
exports.ngrokTasks = ngrokTasks;
