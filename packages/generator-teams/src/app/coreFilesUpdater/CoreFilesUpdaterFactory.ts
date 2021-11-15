// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { BaseCoreFilesUpdater } from "./BaseCoreFilesUpdater";
import * as semver from "semver";
import { CoreFilesUpdater_3 } from "./coreFilesUpdaters/CoreFilesUpdater_3";

export class CoreFilesUpdaterFactory {
    public static createCoreFilesUpdater(currentVersion: string): BaseCoreFilesUpdater | undefined {
        // < 4.0.0 cannot be updated
        if(semver.lt(currentVersion, "4.0.0")) {
            return new CoreFilesUpdater_3(currentVersion);
        }
        return undefined;
    }
}