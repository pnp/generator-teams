// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { GeneratorTeamsAppOptions } from "../GeneratorTeamsAppOptions";
import * as Generator from 'yeoman-generator';

export abstract class BaseCoreFilesUpdater {
    public updateCoreFiles(options: GeneratorTeamsAppOptions, fs: Generator.MemFsEditor): boolean {
        // nop
        return true;
    }
}