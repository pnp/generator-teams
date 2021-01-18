// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

const package = require("./package.json");
const argv = require('yargs').argv;
const config = require('./gulp.config');
const log = require('fancy-log');
const path = require("path");

// Set environment variables
const env = argv["env"];
if (env === undefined) {
    require('dotenv').config();
} else {
    log(`Using custom .env`);
    require('dotenv').config({ path: path.resolve(process.cwd(), env) });
}
process.env.VERSION = package.version;

const core = require("yoteams-build-core");

// Initialize core build
core.setup(require('gulp'), config);

// Add your custom tasks below
