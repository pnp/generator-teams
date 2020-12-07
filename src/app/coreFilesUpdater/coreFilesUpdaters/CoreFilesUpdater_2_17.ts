// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { GeneratorTeamsAppOptions } from "../../GeneratorTeamsAppOptions";
import { BaseCoreFilesUpdater } from "../BaseCoreFilesUpdater";
import { Editor } from 'mem-fs-editor';
import * as Generator from 'yeoman-generator';
import * as semver from "semver";
import { Project, PropertyAssignment, SyntaxKind } from 'ts-morph';
import { Logger } from "yeoman-environment";
import chalk = require("chalk");

export class CoreFilesUpdater_2_17 extends BaseCoreFilesUpdater {
    public constructor(private currentVersion: string) {
        super();
    };

    public updateCoreFiles(options: GeneratorTeamsAppOptions, fs: Editor, log?: Logger): boolean {

        // overwrite webpack.config.js and gulpfile.js (requires updates due to Webpack 5)
        if (log) {
            log(chalk.red("Projects generated with earlier versions than 2.17 cannot be updated, see https://github.com/pnp/generator-teams/wiki/react-hooks-update-info"));
        }

        return false;
    }
}