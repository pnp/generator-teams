"use strict";
// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = void 0;
const gulp_token_replace_1 = __importDefault(require("gulp-token-replace"));
const axios_1 = __importDefault(require("axios"));
const plugin_error_1 = __importDefault(require("plugin-error"));
const schemas_json_1 = __importDefault(require("./schemas.json"));
const zip = require("gulp-zip");
const fs = require("fs");
const log = require("fancy-log");
const ZSchema = require("z-schema");
const manifest = (gulp, config) => {
    const generateManifest = (cb) => {
        return gulp.src("src/manifest/manifest.json")
            .pipe(gulp_token_replace_1.default({
            tokens: Object.assign({}, process.env)
        })).pipe(gulp.dest("./temp"));
    };
    const validateSchema = (cb) => {
        const filePath = "./temp/manifest.json";
        if (fs.existsSync(filePath)) {
            const manifest = fs.readFileSync(filePath, {
                encoding: "UTF-8"
            });
            let manifestJson;
            try {
                manifestJson = JSON.parse(manifest);
            }
            catch (error) {
                cb(new plugin_error_1.default(error.message));
                return;
            }
            log("Using manifest schema " + manifestJson.manifestVersion);
            const definition = schemas_json_1.default.find((s) => {
                return s.version === manifestJson.manifestVersion;
            });
            if (definition === undefined) {
                cb(new plugin_error_1.default("validate-manifest", "Unable to locate schema"));
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
            axios_1.default.get(requiredUrl, {
                headers: {
                    "Accept-Encoding": "none"
                },
                responseType: "json"
            }).then(response => {
                validator.setRemoteReference(requiredUrl, response.data);
                const valid = validator.validate(manifestJson, schema);
                const errors = validator.getLastErrors();
                if (!valid) {
                    cb(new plugin_error_1.default("validate-manifest", errors.map((e) => {
                        return e.message;
                    }).join("\n")));
                }
                else {
                    cb();
                }
            }).catch(err => {
                log.warn("WARNING: unable to download and validate schema: " + err);
                cb();
            });
        }
        else {
            // tslint:disable-next-line: no-console
            log("Manifest doesn't exist");
        }
    };
    const zipTask = (cb) => {
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
exports.manifest = manifest;
