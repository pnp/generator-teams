// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import GulpClient from "gulp";
import log from "fancy-log";
import ngrok from "ngrok";
import { dependencies } from ".";

export const ngrokTasks = (gulp: GulpClient.Gulp, config: any) => {

    gulp.task("start-ngrok", (cb) => {
        log("[NGROK] starting ngrok...");
        const conf = {
            subdomain: process.env.NGROK_SUBDOMAIN as string,
            region: process.env.NGROK_REGION as "us" | "eu" | "au" | "ap" | "sa" | "jp" | "in",
            addr: process.env.PORT as string,
            authtoken: process.env.NGROK_AUTH as string
        };

        ngrok.connect(conf).then((url) => {
            log("[NGROK] Url: " + url);
            if (!conf.authtoken) {
                log("[NGROK] You have been assigned a random ngrok URL that will only be available for this session. You wil need to re-upload the Teams manifest next time you run this command.");
            }
            let hostName = url.replace("http://", "");
            hostName = hostName.replace("https://", "");

            log("[NGROK] Public url: " + hostName);
            process.env.PUBLIC_HOSTNAME = hostName;

            cb();

        }).catch((err) => {
            log.error(`[NGROK] Error: ${JSON.stringify(err)}`);
            cb(err.msg);
        });
    });
    gulp.task("ngrok-serve", dependencies(gulp, "start-ngrok", "manifest", "serve"));

};
