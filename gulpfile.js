'use strict'
var gulp = require('gulp');
var webpack = require('webpack');
var gutil = require('gulp-util');
var inject = require('gulp-inject');
var runSequence = require('run-sequence');


var injectSources = ["./dist/app/*.css", "./dist/app.js"]
var typeScriptFiles = ["./src/**/*.ts"]
var staticFiles = ["./src/**/*.html", "./src/**/*.json", "./src/**/*.png"]
var htmlFiles = ["./src/**/*.html"]
var watcherfiles = ["./src/**/*.*"]


gulp.task('watch', function () {
    gulp.watch('./src/**/*.*', ['build']);
});

gulp.task('webpack', function (callback) {
    var webpackConfig = require(process.cwd() + '/webpack.config')
    webpack(webpackConfig
        , function (err, stats) {
            if (err) throw new gutil.PluginError("webpack", err);

            var jsonStats = stats.toJson();
            if (jsonStats.errors.length > 0) {
                var errs =
                    jsonStats.errors.map(function (e) {
                        gutil.log('[Webpack error] ' + e)
                    });
                throw new gutil.PluginError("webpack", "Webpack errors, see log");
            }
            if (jsonStats.warnings.length > 0) {
                var errs =
                    jsonStats.warnings.map(function (e) {
                        gutil.log('[Webpack warning] ' + e)
                    });

            }
            gutil.log("[Webpack]\n", stats.toString('minimal'));
            callback();
        });
});

gulp.task('static:copy', function () {
    return gulp.src(staticFiles, { base: "./src" })
        .pipe(gulp.dest('./dist/'));
})

gulp.task('static:inject', ['static:copy'], function () {

    var injectSrc = gulp.src(injectSources);

    var injectOptions = {
        ignorePath: '/bin',
        relative: true
    };

    return gulp.src(htmlFiles, { base: "./src" })
        .pipe(inject(injectSrc, injectOptions)) // inserts custom sources
        .pipe(gulp.dest('./dist'));
});


gulp.task('build', function () {
    runSequence('webpack', 'static:inject')
});
