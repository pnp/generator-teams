---
topic: sample
products:
- Office 365
- Microsoft Teams
languages:
- TypeScript
- Node.js
- React
- HTML
extensions:
  contentType: tools
  technologies:
  - Tabs
  - Microsoft Bot Framework
  - Messaging Extensions
  - Connectors
  - Outgoing Webhooks
  createdDate: 3/3/2017 2:24:18 AM
---
# generator-teams

[![npm version](https://badge.fury.io/js/generator-teams.svg)](https://www.npmjs.com/package/generator-teams)
[![npm](https://img.shields.io/npm/dt/generator-teams.svg)]((https://www.npmjs.com/package/generator-teams))
[![MIT](https://img.shields.io/npm/l/generator-teams.svg)](https://github.com/OfficeDev/generator-teams/blob/master/LICENSE.md)
[![GitHub issues](https://img.shields.io/github/issues/officedev/generator-teams.svg)](https://github.com/OfficeDev/generator-teams/issues)
[![GitHub closed issues](https://img.shields.io/github/issues-closed/officedev/generator-teams.svg)](https://github.com/OfficeDev/generator-teams/issues?q=is%3Aissue+is%3Aclosed) 
[![GitHub stars](https://img.shields.io/github/stars/officedev/generator-teams.svg)](https://github.com/OfficeDev/generator-teams/stargazers)
[![Gitter](https://badges.gitter.im/OfficeDev/generator-teams.svg)](https://gitter.im/OfficeDev/generator-teams?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

A [Yeoman Generator](http://yeoman.io/) for [Microsoft Teams](https://teams.microsoft.com) Apps.

 | @master | @preview |
 :--------:|:---------:
 [![npm (latest)](https://img.shields.io/npm/v/generator-teams/latest.svg)](https://www.npmjs.com/package/generator-teams)|[![npm (preview)](https://img.shields.io/npm/v/generator-teams/preview.svg)](https://www.npmjs.com/package/generator-teams)
 [![Travis (.org) branch](https://img.shields.io/travis/OfficeDev/generator-teams/master.svg)](https://travis-ci.org/OfficeDev/generator-teams)|[![Travis (.org) branch](https://img.shields.io/travis/OfficeDev/generator-teams/preview.svg)](https://travis-ci.org/OfficeDev/generator-teams)

This generator Generates a Microsoft Teams App that can be used to add Tabs, Bots, Connectors, Compose Extensions and more to Microsoft Teams based on Node.js and TypeScript.

> **Note:** The generator has been renamed from `generator-teams-tab` to `generator-teams`.
> Old package will be marked as deprecated.

## yo teams Demo

![Demo](docs/assets/demo.gif)

## Install

> **Important:** If this is the first time you're using Yeoman or installing a Yeoman generator, first install [Node.js](https://nodejs.org). For developers on Mac, we recommend using [Node Version Manager](https://github.com/creationix/nvm) to install Node.js with the right permissions. When the installation completes, restart your console (or if you are using Windows, restart your machine) to ensure you use the updated system environment variables.

### Prerequisites

Install `yo` (Yeoman), `gulp-cli` (Gulp global command line interface) and `typescript` (Typescript compiler) globally using NPM.

``` Shell
npm install yo gulp-cli typescript --global
```


### Released and stable version

Install `generator-teams` globally using NPM.

```Shell
npm install generator-teams --global
```

### Preview versions

Preview versions of the generator will be published with the **preview** tag and can be installed using the following command:

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
* `--no-telemetry` - opt out of sending telemetry data (NOTE: no personal data or names of artefacts are being sent, only information of successful executions and what options are being used).

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
* [Cagdas Davulcu](https://github.com/cagdasdavulcu)

## Contributing

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
