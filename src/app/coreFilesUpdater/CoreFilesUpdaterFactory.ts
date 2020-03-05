// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { BaseCoreFilesUpdater } from "./BaseCoreFilesUpdater";
import * as semver from "semver";
import { CoreFilesUpdater_2_11 } from "./coreFilesUpdaters/CoreFilesUpdater_2_11";

export class CoreFilesUpdaterFactory {
    public static createCoreFilesUpdater(currentVersion: string): BaseCoreFilesUpdater | undefined {
        // gulp.config.js update (2.9.* or 2.10.*)
        if (semver.lt(currentVersion, "2.11.1")) {
            return new CoreFilesUpdater_2_11();
        } else if (semver.lt(currentVersion, "2.12.0")) {
            return undefined;
        };
        return undefined;
    }
}