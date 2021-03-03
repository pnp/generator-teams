// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import replace from "gulp-token-replace";
import axios from "axios";
import PluginError from "plugin-error";
import GulpClient from "gulp";
import filter from "gulp-filter";
import File from "vinyl";
import through from "through2";
import ZSchema from "z-schema";
import rename from "gulp-rename";
import SCHEMAS from "./schemas.json";
import fs from "fs";

import { dependencies } from ".";

const flatmap = require("gulp-flatmap");
const zip = require("gulp-zip");
const log = require("fancy-log");

export const manifest = (gulp: GulpClient.Gulp, config: any) => {

    /**
     * Reads a file and returns JSON
     * @param file the file
     */
    const fileToJson = (file: File): any => {
        if (!file.contents) {
            throw new Error("Invalid file");
        }
        const data = file.contents.toString("utf-8");
        const json = JSON.parse(data);
        return json;
    };

    /**
     * Returns only Teams manifests with a supported version
     */
    const manifestFilter = () => {
        return filter(file => {
            try {
                const json = fileToJson(file);
                const definition = SCHEMAS.find((s: any) => {
                    return s.version === json.manifestVersion;
                });
                if (definition === undefined) {
                    return false;
                }
                return true;
            } catch (err) {
                return false;
            }
        }, { restore: true });
    };

    /**
     * Returns all manifests in the src/manifest folder
     */
    const getManifests = (path: string) => {
        return gulp.src(path)
            .pipe(manifestFilter());
    };

    /**
     * The manifest generation task - replaces parameters
     */
    const generateManifests = () => {
        return getManifests("src/manifest/*.json")
            .pipe(replace({
                tokens: {
                    ...process.env
                }
            })).pipe(gulp.dest("./temp"));
    };

    /**
     * validates teams manifest schemas
     */
    function schema() {
        function validate(file: File, enc: string, callback: Function) {
            if (!file.contents) {
                throw new Error("Invalid file");
            }
            const data = file.contents.toString("utf-8");
            const json = JSON.parse(data);

            log(`${file.basename} is using manifest schema ${json.manifestVersion}`);
            const definition = SCHEMAS.find((s: any) => {
                return s.version === json.manifestVersion;
            });
            if (definition === undefined) {
                callback(new PluginError("validate-manifest", "Unable to locate schema"));
                return;
            }

            // eslint-disable-next-line dot-notation
            if (json["$schema"] !== definition.schema) {
                log("Note: the defined schema in your manifest does not correspond to the manifestVersion");
            }

            const requiredUrl = definition.schema;
            const validator = new ZSchema({});

            const schema = {
                $ref: requiredUrl
            };

            axios.get(requiredUrl, {
                headers: {
                    "Accept-Encoding": "none"
                },
                responseType: "json"
            }).then(response => {
                (validator as any).setRemoteReference(requiredUrl, response.data);
                const valid = validator.validate(json, schema);
                const errors = validator.getLastErrors();
                if (!valid) {
                    callback(new PluginError("validateSchemas", errors.map((e) => {
                        return `${file.basename}: ${e.message}`;
                    }).join("\n")));
                } else {
                    callback(null, file);
                }
            }).catch(err => {
                log.warn("WARNING: unable to download and validate schema: " + err);
                callback(null, file);
            });
        }
        return through.obj(validate, (callback) => { callback(); });
    };

    /**
     * The validate schema task
     */
    const validateSchemas = () => {
        return getManifests("temp/*.json")
            .pipe(schema());
    };

    /**
     * Creates an array of all files to include in the packaged manifest
     * @param file the file
     */
    const getPackageFiles = (file: File): string[] => {
        const arr: string[] = [];
        if (!file.contents) {
            throw new Error("Invalid file");
        }
        arr.push(file.path);

        const data = file.contents.toString("utf-8");
        const json = JSON.parse(data);

        // get the icons
        if (json.icons.outline) {
            if (!fs.existsSync("src/manifest/" + json.icons.outline)) {
                throw new PluginError("validate-manifest", `Cannot locate file: ${"src/manifest/" + json.icons.outline}`);
            }
            arr.push("src/manifest/" + json.icons.outline);
            // TODO: check if file exists
        }
        if (json.icons.color) {
            if (!fs.existsSync("src/manifest/" + json.icons.color)) {
                throw new PluginError("validate-manifest", `Cannot locate file: ${"src/manifest/" + json.icons.color}`);
            }
            arr.push("src/manifest/" + json.icons.color);
            // TODO: check if file exists
        }
        if (json.localizationInfo && json.localizationInfo.additionalLanguages) {
            for (const additionalLanguage of json.localizationInfo.additionalLanguages) {
                if (!fs.existsSync("src/manifest/" + additionalLanguage.file)) {
                    throw new PluginError("validate-manifest", `Cannot locate file: ${"src/manifest/" + additionalLanguage.file}`);
                }
                arr.push("src/manifest/" + additionalLanguage.file);
                // TODO: check if file exists
            }
        }
        return arr;

    };

    /**
     * zip together the files and create the package
     */
    const zipTask = (cb: any) => {
        return getManifests("temp/*.json")
            .pipe(flatmap((stream: any, file: File) => {
                if (!file.contents) {
                    throw new Error("Invalid file");
                }

                const data = file.contents.toString("utf-8");
                const json = JSON.parse(data);

                const zipName = json.packageName + ".zip";

                log(`Creating package ${zipName}`);

                return gulp.src(getPackageFiles(file))
                    .pipe(rename((path) => {
                        // for some reason rename uses a different definition fo basename
                        if (path.basename + path.extname === file.basename) {
                            return {
                                ...path,
                                basename: "manifest"
                            };
                        }
                        return path;
                    }))
                    .pipe(zip(zipName));
            }))
            .pipe(gulp.dest("package"));
    };

    // export the tasks
    gulp.task("validate-manifest", dependencies(gulp, generateManifests, validateSchemas));
    gulp.task("manifest", dependencies(gulp, "validate-manifest", zipTask));
};
