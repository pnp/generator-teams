# Release 2.10.0

*Date released: 2019-07-18*

This summer release adds capabilities to add additional Tabs to an existing project as well as adding a static (personal) tab, as well as the configurable (teams/channel) ones. Also some of the core packages of the generated solution was updated due to npm security warnings.

## Updates and changes

The 2.10.0 release introduces these new features and changes

* Added the option to choose between a *configurable* and *static* tab
* Added the option of adding additional tabs when running the generator over an existing solution
* Renamed argument for nodemon to use `--inspect` instead of `--debug` due to node.js deprecation warning **DEP0062**
* Moved from `guid` (deprecated) npm package to `uuid`, `uuid-validate` and a custom empty guid
* Updated `gulp-inject` version

### Fixes

* Fixed invalid payload error in the bot welcome card

For full details see the [change log](https://github.com/pnp/generator-teams/blob/a373629f98b398553c51d68ad135d7fd5447a540/CHANGELOG.md).

## How to install

To get the latest version of the Microsoft Teams Apps generator use the following npm command:

``` bash
npm install generator-teams --global
```

And to install this version specifically use:

``` bash
npm install generator-teams@2.10.0 --global
```
