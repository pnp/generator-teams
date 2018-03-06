# generator-teams

A [Yeoman Generator](http://yeoman.io/) for [Microsoft Teams](https://teams.microsoft.com) Apps.

This generator Generates a Microsoft Teams App that can be used to add Tabs, Bots, Connectors, Compose Extensions and more to Microsoft Teams based on Node.js and TypeScript.

[![npmjs](https://nodei.co/npm/generator-teams.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/generator-teams)

> **Note:** The generator has been renamed from `generator-teams-tab` to `generator-teams`.
> Old package will be marked as deprecated.

## yo teams Demo
![Demo](docs/assets/demo.gif)

## Install

> **Important:** If this is the first time you're using Yeoman or installing a Yeoman generator, first install [Git](https://git-scm.com/download) and [Node.js](https://nodejs.org). For developers on Mac, we recommend using [Node Version Manager](https://github.com/creationix/nvm) to install Node.js with the right permissions. When the installation completes, restart your console (or if you are using Windows, restart your machine) to ensure you use the updated system environment variables.

Install `yo` (Yeoman) and `generator-teams` globally using NPM.

``` Shell
npm install yo generator-teams --global
```

### Preview versions

Preview versions of the generator will be published with the **preview** tag and can be installed using the following command:

``` Shell
npm install yo --global
```

#### Install the preview generator

To install the preview version of the Teams generator, use the `preview` tag:

``` Shell
npm install generator-teams@preview --global
```

## Usage

``` Shell
yo teams [arguments]
```

> *Note:* Files are created in the directory that you run the command from hence make sure you are happy with the location before you hit enter.

### Arguments

 The following arguments can be used:

* `--skip-install` - when used no packages will be installed at the end of the generator and you have to run `npm install` or similar manually.

## The generated project

When the generator is done you can start working with your project. Make sure to read the generated README.md file for more instructions. Depending on how you generate your project additional readme files might be created with further instructions.

## Build the generator

If you are interested in contributing or modifying the generator itself, you clone this repository and then install all modules before building the solution.

``` Shell
npm install
npm run build
```

The bundled generator and the template files will end up in the `./generators/` folder.

### Use it in dev mode

In the `generator-teams` directory use the following command, this will link the local copy of the folder as a global node module.

``` Shell
npm link
```

To revert the link operation:

``` Shell
npm unlink
```

## More information

For more information on how Tabs and Bots can be used with Teams see the [Teams Developer Documentation](https://msdn.microsoft.com/en-us/microsoft-teams/ )

## Contributors

* [Wictor Wilén](https://github.com/wictorwilen) - Original author and coordinator
* [Bill Bliss](https://github.com/billbliss)
* [Richard DiZerega](https://github.com/richdizz)
* [Elaine van Bergen](https://github.com/laneyvb)
* [Daniel Laskewitz](https://github.com/Laskewitz)
* [Paul Schaeflein](https://github.com/pschaeflein)

## Contributing

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
