// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import GulpClient from "gulp";
import del from "del";
import { trackEvent } from ".";

export const nukeTasks = (gulp: GulpClient.Gulp, config: any) => {

    gulp.task("nuke", () => {
        trackEvent("nuke");
        return del(["temp", "dist"]);
    });

};
