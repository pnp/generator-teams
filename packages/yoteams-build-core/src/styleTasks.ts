// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import GulpClient from "gulp";
import Plumber from "gulp-plumber";
import autoprefixer from "autoprefixer";
import gulpif from "gulp-if";
import sourcemaps from "gulp-sourcemaps";
import sass from "gulp-dart-sass";
import postcss from "gulp-postcss";
import { trackEvent } from ".";

const argv = require("yargs").argv;

export const styleTasks = (gulp: GulpClient.Gulp, config: any) => {
    const debug = argv.debug !== undefined;
    const styles = () => {
        trackEvent("styles");
        return gulp.src("src/public/**/*.scss")
            .pipe(Plumber())
            .pipe(gulpif(debug, sourcemaps.init()))
            .pipe(sass.sync({
                outputStyle: debug ? "expanded" : "compressed",
                includePaths: ["."]
            }).on("error", sass.logError))
            .pipe(postcss([
                autoprefixer()
            ]))
            .pipe(gulpif(debug, sourcemaps.write()))
            .pipe(gulp.dest("dist/web"));
    };

    gulp.task("styles", styles);

};
