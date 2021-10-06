// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import GulpClient from "gulp";
import log from "fancy-log";
import nodemon from "nodemon";
import path from "path";
import fs from "fs";
import { ChildProcess, fork } from "child_process";
import { injectSources } from "./webTasks";
import { dependencies } from ".";
const argv = require("yargs").argv;

export const serveTasks = (gulp: GulpClient.Gulp, config: any) => {
    const watches = [
        "./src/server/**/*.*"
    ];
    const clientWatches = [
        "./src/client/**/*.*",
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

    // Task that reloads the environment variables
    const reloadEnv = () => {
        log("Reloading environment");
        const env = argv.env;
        const dotenv = require("dotenv");
        const envConfig = dotenv.parse(fs.readFileSync(env ? path.resolve(process.cwd(), env) : ".env"));
        for (const k in envConfig) {
            if (k !== "PUBLIC_HOSTNAME") { // overwrite all but PUBLIC_HOSTNAME as that can be set by ngrok/codespaces
                process.env[k] = envConfig[k];
            }
        }
        return Promise.resolve();
    };

    // restart nodemon task
    const nodemonRestart = () => { nodemon.restart(); return Promise.resolve(); };

    // Webpack dev server for client side rebuilds
    let webpackDevServerProcess: ChildProcess;
    const restartDevServer = () => {
        if (webpackDevServerProcess) {
            const killed = webpackDevServerProcess.kill("SIGINT");

            if (!killed) {
                throw new Error("Unable to stop webpack dev server. Please restart the last command.");
            }
        }

        startWebpackDevServer();

        return Promise.resolve();
    };

    const startWebpackDevServer = () => {
        webpackDevServerProcess = fork(path.resolve(__dirname, "./webpackServe"), process.argv.slice(2), {
            stdio: "inherit"
        });
    };

    /**
     * Register watches
     */
    const registerWatches = () => {

        // all other watches
        gulp.watch(
            config.watches ? watches.concat(config.watches) : watches,
            gulp.series("webpack:server")
        );

        // webpack dev server - incrementally rebuilds client bundle on source change
        startWebpackDevServer();

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

        // watch for .env files
        const envFile = argv.env ?? ".env";
        log(`Watching ${envFile}`);
        gulp.watch(envFile, gulp.series(reloadEnv, gulp.parallel("manifest", restartDevServer), nodemonRestart));
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
                log("PUBLIC_HOSTNAME: " + process.env.PUBLIC_HOSTNAME || process.env.HOSTNAME); // keep HOSTNAME for backwards compatibility
            }
        });

    });

    gulp.task("serve", dependencies(gulp, "nuke", "build", "nodemon", "watch"));
};
