// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import GulpClient from "gulp";
import log from "fancy-log";
import nodemon from "nodemon";
import path from "path";
import fs from "fs";
import { injectSources } from "./webTasks";
import { dependencies } from ".";
const argv = require("yargs").argv;

export const serveTasks = (gulp: GulpClient.Gulp, config: any) => {
    const watches = [
        "./src/public/**/*.*",
        "!./src/public/**/*.scss"
    ];
    const clientWatches = [
        "./src/scripts/**/*.*",
        "!./src/**/*.scss"
    ];
    const staticFilesWatches = [
        "./src/public/**/*.html",
        "./src/public/**/*.ejs",
        "./src/public/assets/**/*"
    ];

    const injectSourceFiles = [
        "./dist/public/scripts/**/*.js",
        "./dist/public/styles/**/*.css"
    ];

    /**
     * Register watches
     */
    const registerWatches = () => {

        // all other watches
        gulp.watch(
            config.watches ? watches.concat(config.watches) : watches,
            gulp.series("webpack:server")
        );

        gulp.watch(
            config.clientWatches ? clientWatches.concat(config.clientWatches) : clientWatches,
            gulp.series("webpack:client")
        );

        // watch for style changes
        gulp.watch("src/public/**/*.scss", gulp.series("styles", "static:copy", "static:inject"))
            .on("unlink", (a, b) => {

                const cssFilename = path.basename(a, ".scss") + ".css";
                const cssDirectory = path.dirname(a).replace("src/public", "./dist");
                const cssPath = path.join(cssDirectory, cssFilename);

                console.log(cssPath, fs.existsSync(cssPath));

                if (fs.existsSync(cssPath)) {

                    fs.unlinkSync(cssPath);
                    injectSources(gulp, config);

                }

            });

        // watch on new and deleted files
        gulp.watch(config.injectSources ? injectSourceFiles.concat(config.injectSources) : injectSourceFiles)
            .on("unlink", injectSources(gulp, config))
            .on("add", injectSources(gulp, config));

        // watch for static files
        gulp.watch(config.staticFiles ? staticFilesWatches.concat(config.staticFiles) : staticFilesWatches,
            gulp.series("static:copy", "static:inject"));
    };

    gulp.task("watch", registerWatches);
    gulp.task("nodemon", (done) => {
        let started = false;
        const debug = argv.debug !== undefined;

        nodemon({
            script: "dist/server.js",
            watch: ["dist/server.js"],
            nodeArgs: debug ? ["--inspect"] : []
        }).on("start", function () {
            if (!started) {
                done();
                started = true;
                log("HOSTNAME: " + process.env.HOSTNAME);
            }
        });
    });

    gulp.task("serve", dependencies(gulp, "nuke", "build", "nodemon", "watch"));
};
