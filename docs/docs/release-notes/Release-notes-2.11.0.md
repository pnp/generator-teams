# Release 2.11.0

*Date released: 2019-08-06*

> 2.11.0 has been deprecated - please install [2.11.1](./Release-notes-2.11.1)


This release introduces one major feature - the option of including localization to your Microsoft Teams App, which requires manifest version 1.5 and higher. Initial support for [upgrading projects](./Upgrading-projects) created by earlier versions of the generator has also been introduced. Note that upgrading projects will only work for projects created generator 2.9 and later. 

## Updates and changes

The 2.11.0 release introduces these new features and changes

* Added the support for localization of apps (manifest version 1.5+)
* Added generator version in `.yo-rc.json` - to be used when upgrading core files
* Added support for upgrading of core build files

For full details see the [change log](https://github.com/pnp/generator-teams/blob/2a938465d6a0a2cad92eec065ca9d4f8be84455b/CHANGELOG.md).

## How to install

To get the latest version of the Microsoft Teams Apps generator use the following npm command:

``` bash
npm install generator-teams --global
```

And to install this version specifically use:

``` bash
npm install generator-teams@2.11.0 --global
```
