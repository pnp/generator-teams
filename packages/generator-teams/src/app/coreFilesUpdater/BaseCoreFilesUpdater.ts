// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { GeneratorTeamsAppOptions } from "../GeneratorTeamsAppOptions";
import { Editor } from 'mem-fs-editor';
import * as Generator from 'yeoman-generator';
import { Logger } from "yeoman-environment";

export abstract class BaseCoreFilesUpdater {
    public updateCoreFiles(options: GeneratorTeamsAppOptions, fs: Editor, log?: Logger): boolean {
        // nop
        return true;
    }
}