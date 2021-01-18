"use strict";
// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveTasks = void 0;
const fancy_log_1 = __importDefault(require("fancy-log"));
const nodemon_1 = __importDefault(require("nodemon"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const webTasks_1 = require("./webTasks");
const argv = require("yargs").argv;
const serveTasks = (gulp, config) => {
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
        gulp.watch(config.watches ? watches.concat(config.watches) : watches, gulp.series("webpack:server"));
        gulp.watch(config.clientWatches ? clientWatches.concat(config.clientWatches) : clientWatches, gulp.series("webpack:client"));
        // watch for style changes
        gulp.watch("src/public/**/*.scss", gulp.series("styles", "static:copy", "static:inject"))
            .on("unlink", (a, b) => {
            const cssFilename = path_1.default.basename(a, ".scss") + ".css";
            const cssDirectory = path_1.default.dirname(a).replace("src/public", "./dist");
            const cssPath = path_1.default.join(cssDirectory, cssFilename);
            console.log(cssPath, fs_1.default.existsSync(cssPath));
            if (fs_1.default.existsSync(cssPath)) {
                fs_1.default.unlinkSync(cssPath);
                webTasks_1.injectSources(gulp, config);
            }
        });
        // watch on new and deleted files
        gulp.watch(config.injectSources ? injectSourceFiles.concat(config.injectSources) : injectSourceFiles)
            .on("unlink", webTasks_1.injectSources(gulp, config))
            .on("add", webTasks_1.injectSources(gulp, config));
        // watch for static files
        gulp.watch(config.staticFiles ? staticFilesWatches.concat(config.staticFiles) : staticFilesWatches, gulp.series("static:copy", "static:inject"));
    };
    gulp.task("watch", registerWatches);
    gulp.task("nodemon", (done) => {
        let started = false;
        const debug = argv.debug !== undefined;
        nodemon_1.default({
            script: "dist/server.js",
            watch: ["dist/server.js"],
            nodeArgs: debug ? ["--inspect"] : []
        }).on("start", function () {
            if (!started) {
                done();
                started = true;
                fancy_log_1.default("HOSTNAME: " + process.env.HOSTNAME);
            }
        });
    });
    gulp.task("serve", gulp.series("nuke", "build", "nodemon", "watch"));
};
exports.serveTasks = serveTasks;
