// Copyright (c) Wictor Wilén. All rights reserved.
// Copyright (c) Paul Schaeflein. All rights reserved.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import inject from "gulp-inject";

export interface IBuildCoreConfig {
  watches: string | string[];
  clientWatches: string | string[];
  staticFiles: string | string[];
  injectSources: string | string[];
  injectOptions: inject.IOptions;
  htmlFiles: string | string[];
}
