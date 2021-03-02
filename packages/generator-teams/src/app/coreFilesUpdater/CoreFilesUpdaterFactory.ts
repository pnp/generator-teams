// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { BaseCoreFilesUpdater } from "./BaseCoreFilesUpdater";
import * as semver from "semver";
import { CoreFilesUpdater_3_0 } from "./coreFilesUpdaters/CoreFilesUpdater_3_0";
import { CoreFilesUpdaterNop } from "./coreFilesUpdaters/CoreFilesUpdaterNop";
import { CoreFilesUpdater_2 } from "./coreFilesUpdaters/CoreFilesUpdater_2";

export class CoreFilesUpdaterFactory {
    public static createCoreFilesUpdater(currentVersion: string): BaseCoreFilesUpdater | undefined {
        // < 3.0.0 then throw a warning
        if(semver.lt(currentVersion, "3.0.0")) {
            return new CoreFilesUpdater_2(currentVersion);
        }
        if(semver.major(currentVersion) === 3) {
            return new CoreFilesUpdater_3_0(currentVersion);
        }
        return undefined;
    }
}