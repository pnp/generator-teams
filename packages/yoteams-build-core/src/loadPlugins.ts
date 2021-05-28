// Copyright (c) Wictor Wilén. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import GulpClient from "gulp";
import log from "fancy-log";
import findupSync from "findup-sync";

/**
 * Loads additional plugins for yoteams
 * @param gulp
 * @param config
 */
export const loadPlugins = (gulp: GulpClient.Gulp, config: any) => {
    if (require.main) {
        const packagePath = findupSync("package.json");
        if (packagePath) {
            const pkg = require(packagePath);
            if (pkg) {
                const modules = Object.keys(pkg.devDependencies);
                for (const module of modules) {
                    if (module.startsWith("yoteams-") && module !== "yoteams-build-core") {
                        log(`Found additional Yo Teams plugin: ${module}`);
                        const plugin = require(module);
                        plugin.setup(gulp, config);
                    }
                }
            }
        }
    }
};
