// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import replace from "gulp-token-replace";
import axios from "axios";
import PluginError from "plugin-error";
import GulpClient from "gulp";

import SCHEMAS from "./schemas.json";
const zip = require("gulp-zip");

const fs = require("fs");
const log = require("fancy-log");
const ZSchema = require("z-schema");

export const manifest = (gulp: GulpClient.Gulp, config: any) => {

    const generateManifest = (cb: any) => {
        return gulp.src("src/manifest/manifest.json")
            .pipe(replace({
                tokens: {
                    ...process.env
                }
            })).pipe(gulp.dest("./temp"));

    };

    const validateSchema = (cb: any) => {
        const filePath = "./temp/manifest.json";
        if (fs.existsSync(filePath)) {
            const manifest = fs.readFileSync(filePath, {
                encoding: "UTF-8"
            });
            let manifestJson: any;
            try {
                manifestJson = JSON.parse(manifest);
            } catch (error) {
                cb(
                    new PluginError(error.message)
                );
                return;
            }

            log("Using manifest schema " + manifestJson.manifestVersion);
            const definition = SCHEMAS.find((s: any) => {
                return s.version === manifestJson.manifestVersion;
            });
            if (definition === undefined) {
                cb(new PluginError("validate-manifest", "Unable to locate schema"));
                return;
            }

            // eslint-disable-next-line dot-notation
            if (manifestJson["$schema"] !== definition.schema) {
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
                validator.setRemoteReference(requiredUrl, response.data);
                const valid = validator.validate(manifestJson, schema);
                const errors = validator.getLastErrors();
                if (!valid) {
                    cb(new PluginError("validate-manifest", errors.map((e: any) => {
                        return e.message;
                    }).join("\n")));
                } else {
                    cb();
                }
            }).catch(err => {
                log.warn("WARNING: unable to download and validate schema: " + err);
                cb();
            });

        } else {
            // tslint:disable-next-line: no-console
            log("Manifest doesn't exist");
        }
    };

    const zipTask = (cb: any) => {
        // Get all png files (icons), json files (resources) but not the manifest.json from /src/manifest
        return gulp.src(["./src/manifest/*.png", "./src/manifest/*.json", "!**/manifest.json"])
            // get the manifest from the temp folder
            .pipe(gulp.src("./temp/manifest.json"))
            .pipe(zip(config.manifestFileName))
            .pipe(gulp.dest("package"));
    };

    gulp.task("validate-manifest", gulp.series(generateManifest, validateSchema));
    gulp.task("manifest", gulp.series("validate-manifest", zipTask));
};
