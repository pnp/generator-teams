"use strict";
// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webTasks = exports.injectSources = void 0;
const gulp_token_replace_1 = __importDefault(require("gulp-token-replace"));
const gulp_inject_1 = __importDefault(require("gulp-inject"));
const injectSources = (gulp, config) => () => {
    const htmlFiles = [
        "./src/public/**/*.html",
        "./src/public/**/*.ejs"
    ];
    const injectSourceFiles = [
        "./dist/web/scripts/**/*.js",
        "./dist/web/styles/**/*.css"
    ];
    const injectSrc = gulp.src(config.injectSources ? injectSourceFiles.concat(config.injectSources) : injectSourceFiles);
    const injectOptions = {
        relative: false,
        ignorePath: "dist/web",
        addRootSlash: true
    };
    return gulp.src(config.htmlFiles ? htmlFiles.concat(config.htmlFiles) : htmlFiles)
        .pipe(gulp_token_replace_1.default({
        tokens: Object.assign({}, process.env)
    }))
        .pipe(gulp_inject_1.default(injectSrc, injectOptions))
        .pipe(gulp.dest("./dist/web"));
};
exports.injectSources = injectSources;
const webTasks = (gulp, config) => {
    const staticFiles = [
        "./src/public/**/*.html",
        "./src/public/**/*.ejs",
        "./src/public/assets/**/*"
    ];
    gulp.task("static:inject", exports.injectSources(gulp, config));
    gulp.task("static:copy", () => {
        return gulp.src(config.staticFiles ? staticFiles.concat(config.staticFiles) : staticFiles, {
            base: "./src/public"
        })
            .pipe(gulp.dest("./dist/web"));
    });
};
exports.webTasks = webTasks;
