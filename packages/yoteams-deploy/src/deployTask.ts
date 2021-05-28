// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import GulpClient, { TaskFunctionCallback } from "gulp";
import log from "fancy-log";
import { execute } from "./execute";
import File from "vinyl";
import through from "through2";
import jszip from "jszip";
import PluginError from "plugin-error";
import { readFileSync } from "fs-extra";
import { dependencies } from ".";

export const deployTask = (gulp: GulpClient.Gulp, config: any) => {

    // Updates an existing application
    const update = (cb: TaskFunctionCallback, id: string, filename: string): void => execute(
        ["teams", "app", "update", "--id", id, "--filePath", filename, "-o", "json"],
        chunk => log(`${chunk}`),
        chunk => cb(new Error(chunk)),
        code => {
            if (code === 0) {
                log("Application updated!");
                cb();
            } else {
                cb(new PluginError("yoteams-deploy", "Application deployment failed"));
            }
        }
    );

    // Lists and gets the current application based on the external id
    const list = (cb: TaskFunctionCallback, filename: string): void => execute(
        ["teams", "app", "list", "-o", "json"],
        chunk => {
            const result = (Buffer.from(chunk).toString("utf-8"));
            const json = JSON.parse(result);
            const app = json.find((x: any) => x.externalId === process.env.APPLICATION_ID);
            if (app) {
                update(cb, app.id, filename);
            } else {
                cb(new PluginError("yoteams-deploy", "Application not found in Teams App store"));
            }
        },
        chunk => cb(new PluginError("yoteams-deploy", chunk))
    );

    // publishes the application
    const publish = (cb: TaskFunctionCallback, filename: string): void => execute(
        ["teams", "app", "publish", "--filePath", filename, "-o", "json"],
        chunk => log(`${chunk}`),
        chunk => {
            const err = (Buffer.from(chunk).toString("utf-8"));
            if (err.indexOf("App with same id already exists in the tenant.") >= 0) {
                list(cb, filename);
            } else {
                cb(new PluginError("yoteams-deploy", err));
            }
        },
        code => {
            if (code === 0) {
                log("Application published to Teams App store!");
                cb();
            }
        }
    );

    // logs in
    const login = (cb: TaskFunctionCallback): void => execute(
        ["login"],
        chunk => log(`${chunk}`),
        chunk => log(`${chunk}`),
        code => code === 0 ? cb() : cb(new PluginError("yoteams-deploy", "Error logging in!"))
    );

    const logout = (cb: TaskFunctionCallback): void => execute(
        ["logout"],
        chunk => log(`${chunk}`),
        chunk => log(`${chunk}`),
        code => code === 0 ? cb() : cb(new PluginError("yoteams-deploy", "Error logging out!"))
    );

    const status = (cb: TaskFunctionCallback): void => execute(
        ["status"],
        chunk => {
            const result = (Buffer.from(chunk).toString("utf-8"));
            if (result.startsWith("Logged out")) {
                login(cb);
            } else {
                log("Already signed in!");
                cb();
            }
        },
        chunk => cb(new PluginError("yoteams-deploy", chunk)),
        code => {
            if (code !== 0) {
                cb(new PluginError("yoteams-deploy", "Error checking m365 status"));
            }
        }
    );
    status.displayName = "m365:login";

    function publishFn() {
        function p(file: File, enc: string, callback: TaskFunctionCallback) {
            if (!file.contents) {
                throw new Error("Invalid file");
            }
            jszip.loadAsync(readFileSync("package/" + file.basename)).then(zip => {
                const manifest = zip.file("manifest.json")?.async("string").then(data => {
                    const json = JSON.parse(data);
                    const id = json.id;
                    if (id === process.env.APPLICATION_ID) {
                        // only publish the one with the current application id
                        publish(callback, "package/" + file.basename);
                    } else {
                        callback();
                    }
                });
            });

        }
        return through.obj(p, (callback) => { callback(); });
    }

    function publishTask() {
        return gulp.src("./package/*.zip").pipe(publishFn());
    }
    publishTask.displayName = "m365:application-upload";

    gulp.task("m365:publish", dependencies(gulp, status, publishTask));

    gulp.task("m365:deploy", dependencies(gulp, "manifest", "m365:publish"));

    gulp.task("m365:logout", (cb) => {
        logout(cb);
    });

};
