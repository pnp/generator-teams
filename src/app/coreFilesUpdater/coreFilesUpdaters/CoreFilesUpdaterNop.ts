// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { GeneratorTeamsAppOptions } from "../../GeneratorTeamsAppOptions";
import { BaseCoreFilesUpdater } from "../BaseCoreFilesUpdater";
import * as Generator from 'yeoman-generator';
import { Project, PropertyAssignment } from 'ts-morph';
import * as ts from 'typescript';

export class CoreFilesUpdaterNop extends BaseCoreFilesUpdater {
    public updateCoreFiles(options: GeneratorTeamsAppOptions, fs: Generator.MemFsEditor): boolean {
        return true;
    }
}