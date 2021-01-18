"use strict";
// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.styleTasks = void 0;
const gulp_plumber_1 = __importDefault(require("gulp-plumber"));
const autoprefixer_1 = __importDefault(require("autoprefixer"));
const gulp_if_1 = __importDefault(require("gulp-if"));
const gulp_sourcemaps_1 = __importDefault(require("gulp-sourcemaps"));
const gulp_sass_1 = __importDefault(require("gulp-sass"));
const gulp_postcss_1 = __importDefault(require("gulp-postcss"));
const styleTasks = (gulp, config) => {
    const isProd = process.env.NODE_ENV === "production";
    const styles = () => {
        return gulp.src("src/public/**/*.scss")
            .pipe(gulp_plumber_1.default())
            .pipe(gulp_if_1.default(!isProd, gulp_sourcemaps_1.default.init()))
            .pipe(gulp_sass_1.default.sync({
            outputStyle: "expanded",
            precision: 10,
            includePaths: ["."]
        }).on("error", gulp_sass_1.default.logError))
            .pipe(gulp_postcss_1.default([
            autoprefixer_1.default()
        ]))
            .pipe(gulp_if_1.default(!isProd, gulp_sourcemaps_1.default.write()))
            .pipe(gulp.dest("dist/web"));
    };
    gulp.task("styles", styles);
};
exports.styleTasks = styleTasks;
