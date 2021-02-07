# Release 2.7.1

*Date released: 2019-05-07*

## Updates and changes
The 2.7.1 release introduces these new features

* [Schema upgrades](./Manifest-Versions) - allows you to re-run the generator to upgrade from one manifest version to a newer
* Native [ngrok](https://ngrok.com/) support that allows you to use random or reserved public URLs when building and testing your applications. Use the new `gulp ngrok-serve` to build the manifest and launch the application using ngrok.
* Added support for Application Insights
* When using `devPreview` manifest version you will now have the option of adding Calling support to your bot

For full details see the [change log](https://github.com/pnp/generator-teams/blob/7c45f921ef44af81a909295724a4dd387f4bc1e1/CHANGELOG.md).

## How to install

To get the latest version of the Microsoft Teams Apps generator use the following npm command:

``` bash
npm install generator-teams --global
```

And to install this version specifically use:

``` bash
npm install generator-teams@2.7.1 --global
```
