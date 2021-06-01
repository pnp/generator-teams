# yoteams-deploy

[![npm version](https://badge.fury.io/js/yoteams-deploy.svg)](https://www.npmjs.com/package/yoteams-deploy)
[![npm](https://img.shields.io/npm/dt/yoteams-deploy.svg)](https://www.npmjs.com/package/yoteams-deploy)
[![MIT](https://img.shields.io/npm/l/generator-teams.svg)](https://github.com/PnP/generator-teams/blob/master/LICENSE.md)

Library with deployment Gulp task for the Microsoft Teams Apps generator [**yo teams**](https://aka.ms/yoteams)

## Documentation

The `yoteams-deploy` package is set of Gulp tasks that is used for deployment operations, by projects scaffolded using the  [**yo teams**](https://aka.ms/yoteams) Microsoft Teams Apps generator, based on the [Microsoft 365 CLI](https://pnp.github.io/cli-microsoft365/).

### Using the package

The package is installed when scaffolding a project using the Microsoft Teams Apps generator. It will update the existing `serve` `codespaces-server`and `ngrok-serve` tasks with an additional flag `--publish`. When this flag is specified the Gulp tasks will automatically publish the application to the Teams App store.

The first time the `--publish` flag is used the user will be asked to sign in to the tenant using the Azure AD device code flow. Follow the instructions in the terminal window. After the first sign-in, the credentials will be locally cached and reused the next time the Gulp task is performed.

To force a sign-out, for instance if switching to a new tenant, use the `app-store:logout` Gulp task.

The package can safely be removed from any Yo Teams application - with only the loss of the new and modified tasks, which will be restored to its default.

### Default Gulp tasks

* **`serve`** - Modified default `serve` task to accept the `--publish` flag
* **`ngrok-serve`** - Modified default `ngrok-serve` task to accept the `--publish` flag
* **`codespaces-serve`** - Modified default `codespaces-serve` task to accept the `--publish` flag
* **`app-store:deploy`** - Builds the manifest and publishes the app to the Teams app store
* **`app-store:publish`** - Publishes the app to the Teams apps tore
* **`app-store:logout`** - Removes the current cached credentials



## Contributing

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
