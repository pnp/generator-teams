import { GeneratorTeamsAppOptions } from "../GeneratorTeamsAppOptions";

// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export interface IManifestUpdater {
    updateManifest(manifest: any, options?: GeneratorTeamsAppOptions): void;
}