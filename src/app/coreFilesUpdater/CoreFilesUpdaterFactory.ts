// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { BaseCoreFilesUpdater } from "./BaseCoreFilesUpdater";
import * as semver from "semver";
import { CoreFilesUpdater_2_17 } from "./coreFilesUpdaters/CoreFilesUpdater_2_17";
import { CoreFilesUpdaterNop } from "./coreFilesUpdaters/CoreFilesUpdaterNop";

export class CoreFilesUpdaterFactory {
    public static createCoreFilesUpdater(currentVersion: string): BaseCoreFilesUpdater | undefined {
        if(semver.lt(currentVersion, "2.17.0")) {
            return new CoreFilesUpdater_2_17(currentVersion);
        }
        return undefined;
    }
}