// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { BaseCoreFilesUpdater } from "./BaseCoreFilesUpdater";
import * as semver from "semver";
import { CoreFilesUpdater_3_0 } from "./coreFilesUpdaters/CoreFilesUpdater_3_0";
import { CoreFilesUpdaterNop } from "./coreFilesUpdaters/CoreFilesUpdaterNop";

export class CoreFilesUpdaterFactory {
    public static createCoreFilesUpdater(currentVersion: string): BaseCoreFilesUpdater | undefined {
        if(semver.lt(currentVersion, "3.0.0")) {
            return new CoreFilesUpdater_3_0(currentVersion);
        }
        return undefined;
    }
}