# Setup and prepare your machine

You need to install the following on your machine before starting to use the Teams Generator.

## Install Node

You need to have NodeJS installed on your machine. You should use the latest [LTS version](https://nodejs.org/en/download/).

## Install a code editor

You also need a code editor, feel free to use whatever text editor you prefer. However most of this documentation and screenshots refer to using [Visual Studio Code](https://code.visualstudio.com).

## Install Yeoman and Gulp CLI

To be able to scaffold projects using the Teams generator you need to install the Yeoman tool as well as the Gulp CLI task manager.

Open up a command prompt and type the following:

``` bash
npm install yo gulp-cli --global
```

## Install the Microsoft Teams Apps generator - Yo Teams

The Yeoman generator for Microsoft Teams apps are installed with the following command:

``` bash
npm install generator-teams --global
```

### Install preview versions

If you want to install preview versions of the Teams generator with this command:

``` bash
npm install generator-teams@preview --global
```
## Possible issues
If you get this error:
> This generator (teams:app) requires yeoman-environment at least 3.0.0, current version is 2.10.3, try reinstalling latest version of 'yo' or use '--ignore-version-check' option

and you run `npm -g outdated` you will notice that you are not running the latest version of the yeoman generator. You need to update your global package of yo using `npm install yo@latest -g`. To update to the latest version of the gulp CLI use `npm install gulp-cli@latest -g`