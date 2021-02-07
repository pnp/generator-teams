# Release 3.0.0

*Date released: 2021-02-07*

This is a new major version of Yo Teams that contains a multitude of fixes and updates but most significantly it has a new structure of the scaffolded projects and all the default Gulp tasks are moved into a separate package `yoteams-build-core`.

### Changes

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

### Added

* Added new dedicated build package for Gulp tasks (`packages/yoteams-build-core`)
* Added a "Quick scaffolding" option
* Added support for Teams schema v1.9 (1.8 still default, as 1.9 not yet supported by clients)

### Fixed

* Allowed the usage of the Office Guid (`00000003-0000-0ff1-ce00-000000000000`) in Guid validation of SSO Tabs (#171)
* Fixed an issue where the React npm packages was not correctly added to `package.json` (#168)
* Fixed issue where React state was not available in Teams JS SDK callbacks
* Fixed an issue in the sample Connector implementation

## How to upgrade an existing project

Upgrading projects from earlier versions is not supported in this version

## How to install

To get the latest version of the Microsoft Teams Apps generator use the following npm command:

``` bash
npm install generator-teams --global
```

And to install this version specifically use:

``` bash
npm install generator-teams@3.0.0 --global
```
