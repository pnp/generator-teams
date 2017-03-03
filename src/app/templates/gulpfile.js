'use strict'
var gulp = require('gulp');
var webpack = require('webpack');
var gutil = require('gulp-util');
var inject = require('gulp-inject');
var runSequence = require('run-sequence');
const zip = require('gulp-zip');

var injectSources = ["./dist/scripts/**/*.js"]
var typeScriptFiles = ["./src/**/*.ts"]
var staticFiles = ["./src/app/**/*.html", "./src/**/*.json", "./src/**/*.png"]
var htmlFiles = ["./src/app/**/*.html"]
var watcherfiles = ["./src/**/*.*"]
var manifestFiles = ["./src/manifest/**/*.*"]


gulp.task('watch', function () {
    gulp.watch('./src/**/*.*', ['build']);
});

gulp.task('manifest', () => {
    gulp.src(manifestFiles)
        .pipe(zip('tab.zip'))
        .pipe(gulp.dest('package'))
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
    return gulp.src(staticFiles, { base: "./src/app" })
        .pipe(gulp.dest('./dist/'));
})

gulp.task('static:inject', ['static:copy'], function () {

    var injectSrc = gulp.src(injectSources);

    var injectOptions = {
        ignorePath: '/bin',
        relative: false,
        ignorePath: 'dist',
        addRootSlash: false
    };

    return gulp.src(htmlFiles)
        .pipe(inject(injectSrc, injectOptions)) // inserts custom sources
        .pipe(gulp.dest('./dist'));
});


gulp.task('build', function () {
    runSequence('webpack', 'static:inject')
});
