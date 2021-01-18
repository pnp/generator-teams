"use strict";
// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nukeTasks = void 0;
const del_1 = __importDefault(require("del"));
const nukeTasks = (gulp, config) => {
    gulp.task("nuke", () => {
        return del_1.default(["temp", "dist"]);
    });
};
exports.nukeTasks = nukeTasks;
