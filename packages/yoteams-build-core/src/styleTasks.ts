// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import GulpClient from "gulp";
import Plumber from "gulp-plumber";
import autoprefixer from "autoprefixer";
import gulpif from "gulp-if";
import sourcemaps from "gulp-sourcemaps";
import sass from "gulp-sass";
import postcss from "gulp-postcss";

export const styleTasks = (gulp: GulpClient.Gulp, config: any) => {
    const isProd = process.env.NODE_ENV === "production";
    const styles = () => {
        return gulp.src("src/public/**/*.scss")
            .pipe(Plumber())
            .pipe(gulpif(!isProd, sourcemaps.init()))
            .pipe(sass.sync({
                outputStyle: "expanded",
                precision: 10,
                includePaths: ["."]
            }).on("error", sass.logError))
            .pipe(postcss([
                autoprefixer()
            ]))
            .pipe(gulpif(!isProd, sourcemaps.write()))
            .pipe(gulp.dest("dist/web"));
    };

    gulp.task("styles", styles);

};
