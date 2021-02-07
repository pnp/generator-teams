# Release 2.12.0

*Date released: 2020-03-05*

This release is a breaking update due to the migration to the updated Microsoft
Bot Framework 4.7 as well as using a new client side component framework - Microsoft Fluent UI React.

## Changes

* Moved to `@fluentui/react` for user experience, replacing `msteams-ui-components-react`. See TODO for more information and upgrade details (#84)
* Refactored `package.json` so it properly uses `dependencies` and `devDependencies`.
* Updated `.deployment` file to properly work with the new `devDependencies` (#93)
* Updated to Teams SDK `1.6.0` (#96)
* Migrated to `botbuilder@4.7.1` (#89)
* Default bot implementation are now extending `TeamsActivityHandler`
* Removed image from bot welcome card

## Added

* Added compression support for HTTP requests
* Integration tests first version, `npm run test-integration` (#103)

For full details see the [change log](https://github.com/pnp/generator-teams/blob/50f553d3a8bfd0c75af966e8060f48f145d73385/CHANGELOG.md).

## How to upgrade an existing project

Due to breaking changes in this project cannot be upgraded by using the upgrade option in the generator.

It is recommended that you create a new project with the `2.12+` generator and manually move/copy your solution over.

* **manifest.json** && **.env** - can be copied over as is
* **scripts/*** - all React pages has to be updated to use the new `@fluentui/react` component
* **bots** - bots has to changed so that they extend [`TeamsActivityHandler`](https://github.com/wictorwilen/express-msteams-host)

## How to install

To get the latest version of the Microsoft Teams Apps generator use the following npm command:

``` bash
npm install generator-teams --global
```

And to install this version specifically use:

``` bash
npm install generator-teams@2.12.0 --global
```
