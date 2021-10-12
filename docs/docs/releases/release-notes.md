# Release notes

## yoteams-build-core [v1.3.0](https://github.com/pnp/generator-teams/releases/tag/yoteams-build-core%401.3.0-preview2)

#### Added

- Support for Teams manifest schema 1.11 [#234](https://github.com/pnp/generator-teams/issues/234)

#### Changes

- serve commands will now use Webpack dev server to improve client side build and also allows for live-reloading (PR [#233](https://github.com/pnp/generator-teams/pull/233) by s-KaiNet)

## generator-teams [v3.3.0](https://github.com/stephanbisser/generator-teams/releases/tag/generator-teams%403.3.0-preview2)

## yoteams-deploy [v1.0.1](https://github.com/stephanbisser/generator-teams/releases/tag/yoteams-deploy%401.0.1)

## Release 3.0.0

*Date released: 2021-02-07*

This is a new major version of Yo Teams that contains a multitude of fixes and updates but most significantly it has a new structure of the scaffolded projects and all the default Gulp tasks are moved into a separate package `yoteams-build-core`.

##### Changes

* Repository reorganized. `generator-teams` is moved into `packages/generator-teams`
* New projects can only be scaffolded using manifest version 1.8 or later
* Projects scaffolded with previous versions can not be updated
* Migrated from TSLint to ESLint
* Upgraded to use `axios@0.21.1` due to security issue
* Upgraded to use `botbuilder@4.11.1` or later due to security issue in `axios`
* `generator-teams` tests rebuilt
* Changed default answers of some questions to opt-out (false) of features (SharePoint Web Part, Application Insights support, Unit Testing and more) to make default solution simpler
* Upgraded to Teams JavaScript SDK v1.9
* Refactored unit testing with Jest
* Cleaned up `webpack.config.js` to not enforce specific patterns

##### Added

* Added new dedicated build package for Gulp tasks (`packages/yoteams-build-core`)
* Added a "Quick scaffolding" option
* Added support for Teams schema v1.9 (1.8 still default, as 1.9 not yet supported by clients)

#### Fixed

* Allowed the usage of the Office Guid (`00000003-0000-0ff1-ce00-000000000000`) in Guid validation of SSO Tabs (#171)
* Fixed an issue where the React npm packages was not correctly added to `package.json` (#168)
* Fixed issue where React state was not available in Teams JS SDK callbacks
* Fixed an issue in the sample Connector implementation

### How to upgrade an existing project

Upgrading projects from earlier versions is not supported in this version

### How to install

To get the latest version of the Microsoft Teams Apps generator use the following npm command:

``` bash
npm install generator-teams --global
```

And to install this version specifically use:

``` bash
npm install generator-teams@3.0.0 --global
```

## Release 2.12.0

*Date released: 2020-03-05*

This release is a breaking update due to the migration to the updated Microsoft
Bot Framework 4.7 as well as using a new client side component framework - Microsoft Fluent UI React.

#### Changes

* Moved to `@fluentui/react` for user experience, replacing `msteams-ui-components-react`. See TODO for more information and upgrade details (#84)
* Refactored `package.json` so it properly uses `dependencies` and `devDependencies`.
* Updated `.deployment` file to properly work with the new `devDependencies` (#93)
* Updated to Teams SDK `1.6.0` (#96)
* Migrated to `botbuilder@4.7.1` (#89)
* Default bot implementation are now extending `TeamsActivityHandler`
* Removed image from bot welcome card

#### Added

* Added compression support for HTTP requests
* Integration tests first version, `npm run test-integration` (#103)

For full details see the [change log](https://github.com/pnp/generator-teams/blob/50f553d3a8bfd0c75af966e8060f48f145d73385/CHANGELOG.md).

### How to upgrade an existing project

Due to breaking changes in this project cannot be upgraded by using the upgrade option in the generator.

It is recommended that you create a new project with the `2.12+` generator and manually move/copy your solution over.

* **manifest.json** && **.env** - can be copied over as is
* **scripts/*** - all React pages has to be updated to use the new `@fluentui/react` component
* **bots** - bots has to changed so that they extend [`TeamsActivityHandler`](https://github.com/wictorwilen/express-msteams-host)

### How to install

To get the latest version of the Microsoft Teams Apps generator use the following npm command:

``` bash
npm install generator-teams --global
```

And to install this version specifically use:

``` bash
npm install generator-teams@2.12.0 --global
```

## Release 2.11.1

*Date released: 2019-08-14*

This release is a bug fix for 2.11.0

#### Fixes

The 2.11.1 includes the following fixes:

* Fixed an issue where invalid localization info was written to the manifest ([#81](https://github.com/pnp/generator-teams/issues/81))
* Fixed some issues with typings for the `inquirer` package

For full details see the [change log](https://github.com/pnp/generator-teams/blob/50f553d3a8bfd0c75af966e8060f48f145d73385/CHANGELOG.md).

### How to install

To get the latest version of the Microsoft Teams Apps generator use the following npm command:

``` bash
npm install generator-teams --global
```

And to install this version specifically use:

``` bash
npm install generator-teams@2.11.1 --global
```

## Release 2.11.0

*Date released: 2019-08-06*

> 2.11.0 has been deprecated - please install 2.11.1


This release introduces one major feature - the option of including localization to your Microsoft Teams App, which requires manifest version 1.5 and higher. Initial support for [upgrading projects](./Upgrading-projects) created by earlier versions of the generator has also been introduced. Note that upgrading projects will only work for projects created generator 2.9 and later. 

#### Updates and changes

The 2.11.0 release introduces these new features and changes

* Added the support for localization of apps (manifest version 1.5+)
* Added generator version in `.yo-rc.json` - to be used when upgrading core files
* Added support for upgrading of core build files

For full details see the [change log](https://github.com/pnp/generator-teams/blob/2a938465d6a0a2cad92eec065ca9d4f8be84455b/CHANGELOG.md).

### How to install

To get the latest version of the Microsoft Teams Apps generator use the following npm command:

``` bash
npm install generator-teams --global
```

And to install this version specifically use:

``` bash
npm install generator-teams@2.11.0 --global
```

## Release 2.10.0

*Date released: 2019-07-18*

This summer release adds capabilities to add additional Tabs to an existing project as well as adding a static (personal) tab, as well as the configurable (teams/channel) ones. Also some of the core packages of the generated solution was updated due to npm security warnings.

#### Updates and changes

The 2.10.0 release introduces these new features and changes

* Added the option to choose between a *configurable* and *static* tab
* Added the option of adding additional tabs when running the generator over an existing solution
* Renamed argument for nodemon to use `--inspect` instead of `--debug` due to node.js deprecation warning **DEP0062**
* Moved from `guid` (deprecated) npm package to `uuid`, `uuid-validate` and a custom empty guid
* Updated `gulp-inject` version

### Fixes

* Fixed invalid payload error in the bot welcome card

For full details see the [change log](https://github.com/pnp/generator-teams/blob/a373629f98b398553c51d68ad135d7fd5447a540/CHANGELOG.md).

### How to install

To get the latest version of the Microsoft Teams Apps generator use the following npm command:

``` bash
npm install generator-teams --global
```

And to install this version specifically use:

``` bash
npm install generator-teams@2.10.0 --global
```

# Release 2.9.1

*Date released: 2019-06-15*

Hot fix for version 2.9.0. See 2.9.0 release notes for all details

#### Updates and changes
The 2.9.1 is a hotfix for 2.9.0, due to a postinstall command causing issues.

### Fixes

* Removed `postinstall` npm command

For full details see the [change log](https://github.com/pnp/generator-teams/blob/64d9d44e3da10055d660efb8993b9966ae41e214/CHANGELOG.md).

### How to install

To get the latest version of the Microsoft Teams Apps generator use the following npm command:

``` bash
npm install generator-teams --global
```

And to install this version specifically use:

``` bash
npm install generator-teams@2.9.1 --global
```

# Release 2.9.0

*Date released: 2019-06-14*

> 2.9.0 has been deprecated - please install 2.9.1

This release was focused on bringing the generator up to Microsoft Teams manifest version 1.5 and add support for the latest Microsoft Teams JavaScript SDK. 

It also contains a refactored build pipeline (Gulp tasks) in order to improve stability and performance, as well as to prepare for future versions of the generator where we plan to include an upgrade path for existing projects. Now each component (client side, server side, CSS, manifest etc) are built independently and incremental builds are only done when changed, while using `gulp serve` or `gulp ngrok-serve`.

The default landing page, as well as the privacy and terms of use page has received a standardized branding (thanks Stefan Bauer).

#### Updates and changes
The 2.9.0 release introduces these new features

* Added support for manifest version 1.5, new default
* Added suppot for optionally adding Microsoft Partner Id. More info at https://aka.ms/partner 
* Added files support option for bots (schema version 1.4+)
* Now persists settings for using unit testing, application insights and the library name
* Added default logging of "msteams" in the `.env` file
* Added support for SCSS in the build pipeline
* Added a default styling to the start page
* Added an option for Tabs to specify scope; *groupcaht* or *team*
* Added a build option called `linting` to be able to opt-out of Typescript linting. Use `gulp serve --no-linting` for faster builds.
* Updated the `@microsoft/teams-js` package to version `1.4.2`
* Added strict handling of inquirer answers in the main generator
* Refactored the gulp build system into `gulpfile.js` and `gulpfile.config.js`
* Refactored gulp tasks and added new gulp tasks to support independent builds of client side and server side code
* The `watch` gulp tasks now only rebuilds the parts that has changed (server side code, client side code, styles or static files) which improves incremental build times
* Updated `gulpfile.js` to use the `$schema` defined in the manifest file for validation and the `SCHEMAS` object only as backup
* Clarified some questions that the users is adding Message Extension commands, rather than new message extensions

For full details see the [change log](https://github.com/pnp/generator-teams/blob/52907a4e2cae0fc8e9c1bf873f6891f878a20e6d/CHANGELOG.md).

### How to install

To get the latest version of the Microsoft Teams Apps generator use the following npm command:

``` bash
npm install generator-teams --global
```

And to install this version specifically use:

``` bash
npm install generator-teams@2.9.0 --global
```

## Release 2.8.0

*Date released: 2019-05-20*

#### Updates and changes
The 2.8.0 release introduces these new features

* Added support for manifest version 1.4, new default
* Added the option to choose between a search based or action based messaging extension (only available for `1.4`+ manfiests)
* Added support for action based Message Extensions, can now choose from multiple input types, multiple outputs as well as locations for the actions (only available for `devPreview` manfiests).
* Added an option to not include configuration for messaging extensions. Note, only action messaging extension can have the config option.
* Added support for publishing a Tab as a SharePoint Web Part or Full Page Application (requires `v1.4`+)

For full details see the [change log](https://github.com/pnp/generator-teams/blob/7c45f921ef44af81a909295724a4dd387f4bc1e1/CHANGELOG.md).

### How to install

To get the latest version of the Microsoft Teams Apps generator use the following npm command:

``` bash
npm install generator-teams --global
```

And to install this version specifically use:

``` bash
npm install generator-teams@2.8.0 --global
```

## Release 2.7.1(#anchors-in-markdown)

*Date released: 2019-05-07*

#### Updates and changes
The 2.7.1 release introduces these new features

* [Schema upgrades](./Manifest-Versions) - allows you to re-run the generator to upgrade from one manifest version to a newer
* Native [ngrok](https://ngrok.com/) support that allows you to use random or reserved public URLs when building and testing your applications. Use the new `gulp ngrok-serve` to build the manifest and launch the application using ngrok.
* Added support for Application Insights
* When using `devPreview` manifest version you will now have the option of adding Calling support to your bot

For full details see the [change log](https://github.com/pnp/generator-teams/blob/7c45f921ef44af81a909295724a4dd387f4bc1e1/CHANGELOG.md).

### How to install

To get the latest version of the Microsoft Teams Apps generator use the following npm command:

``` bash
npm install generator-teams --global
```

And to install this version specifically use:

``` bash
npm install generator-teams@2.7.1 --global
```
