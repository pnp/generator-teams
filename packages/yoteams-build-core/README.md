# yoteams-build-core

[![npm version](https://badge.fury.io/js/yoteams-build-core.svg)](https://www.npmjs.com/package/yoteams-build-core)
[![npm](https://img.shields.io/npm/dt/yoteams-build-core.svg)](https://www.npmjs.com/package/yoteams-build-core)
[![MIT](https://img.shields.io/npm/l/generator-teams.svg)](https://github.com/PnP/generator-teams/blob/master/LICENSE.md)

Library with Gulp task for the Microsoft Teams Apps generator [**yo teams**](https://aka.ms/yoteams)

## Documentation

The `yoteams-build-core` package is set of Gulp tasks that is used by projects scaffolded using the  [**yo teams**](https://aka.ms/yoteams) Microsoft Teams Apps generator.

### Using the package

To use the Gulp tasks, add the following to your `gulpfile.js` file:

``` JavaScript
const gulp = require("gulp");
const core = require("yoteams-build-core");
const config = {};
// Initialize core build
core.setup(gulp, config);
```

#### Configuration

The configuration object can be used to include additional/optional configuration to the Gulp tasks

| Configuration | Description |
|-|-|
| `watches`| An array of additional file paths to monitor for server side webpack configuration |
| `clientWatches`| An array of additional file paths to monitor for client side webpack configuration |
| `staticFiles`| An array of additional file paths to monitor static file copy |
| `injectSources`| An array of additional file paths to monitor for static file injections of JavaScript and CSS |
| `htmlFiles`| An array of additional file paths to monitor for static file injections of environment variables |

### Default Gulp tasks

The following Gulp tasks are defined by the package:

* **`build`** - build the solution. Runs the following tasks in series: `webpack`, `styles`, `static:copy` and  `static:inject`
* **`manifest`** - packages the manifests. The `validate-manifest` task is run as a part of this task
* **`serve`** - builds and runs the solution on the local machine, background re-compilation when files are changed
* **`ngrok-serve`** - builds and runs the solution on the local machine with ngrok support, see below
* **`codespaces-serve`** - builds, packages and runs the solution when using inside Github Codespaces
* **`webpack`** - runs webpack on the solution by running `webpack:client` and `webpack:server` in parallel
* **`nuke`** - clears all build and temp files
* **`static:copy`** - copies all static files to the dist folder
* **`static:inject`** - injects generated JavaScript and CSS files into the static files
* **`styles`** - compiles SASS to CSS

#### Internally used tasks

* **`watch`** - internal watcher task
* **`nodemon`** - internal task for running nodemon
* **`start-ngrok`** - internal task to start ngrok

#### Using ngrok

The `ngrok-serve` command starts the ngrok client and by default assigns a random URL. By using `process.env` properties the ngrok client can be configured:

* `NGROK_SUBDOMAIN` use a predefined ngrok subdomain
* `NGROK_REGION` use a specific ngrok region
* `NGROK_AUTH` user ngrok authentication token
* `PORT` use a specific port for the local server (default 3007)

#### Using Github Codespaces

No additional configuration is required for Github Codespaces.

### Custom tasks

Custom tasks can be added to the `gulpfile.js` to support any additional build or deploy steps you need.

### Overriding tasks

Existing tasks can be overwritten in `gulpfile.js` by adding a new Gulp task with the name of the task you want to overwrite, by adding the task override at the end of the file:

``` JavaScript
// Add your custom tasks below

gulp.task("webpack", () => {
    console.log("My custom webpack task");
    return Promise.resolve();
});
```

Or adding an additional task for the `serve`command:

``` JavaScript
// Add your custom tasks below

gulp.task("serve", gulp.series("nuke", "build", "nodemon", () => {
    console.log("Hello world!");
    return Promise.resolve();
}, "watch"));
```

## Plugins

This package supports plugins. Plugins has to be added as `devDependencies` to the Teams application project and their name must start with `yoteams-`. When a plugin is found it is expected to export a `setup` function that takes two arguments - the Gulp object and the configuration object.

### Available plugins

* [`yoteams-deploy`](https://github.com/pnp/generator-teams/packages/yoteams-deploy) - contains additional tasks for automatic deployment to a Microsoft Teams environment 


## Contributing

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
