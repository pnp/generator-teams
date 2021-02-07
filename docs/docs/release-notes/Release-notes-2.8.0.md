# Release 2.8.0

*Date released: 2019-05-20*

## Updates and changes
The 2.8.0 release introduces these new features

* Added support for manifest version 1.4, new default
* Added the option to choose between a search based or action based messaging extension (only available for `1.4`+ manfiests)
* Added support for action based Message Extensions, can now choose from multiple input types, multiple outputs as well as locations for the actions (only available for `devPreview` manfiests).
* Added an option to not include configuration for messaging extensions. Note, only action messaging extension can have the config option.
* Added support for publishing a Tab as a SharePoint Web Part or Full Page Application (requires `v1.4`+)

For full details see the [change log](https://github.com/pnp/generator-teams/blob/7c45f921ef44af81a909295724a4dd387f4bc1e1/CHANGELOG.md).

## How to install

To get the latest version of the Microsoft Teams Apps generator use the following npm command:

``` bash
npm install generator-teams --global
```

And to install this version specifically use:

``` bash
npm install generator-teams@2.8.0 --global
```
