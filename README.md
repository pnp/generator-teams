# generator-teams-tab

A [Yeoman Generator](http://yeoman.io/) for [Microsoft Teams](https://teams.microsoft.com) created by [Wictor Wilén](http://twitter.com/wictor).

Generates a Microsoft Teams tab project based on Node.js and TypeScript. Optionally add support for hosting using [Express](http://expressjs.com/).

[![npmjs](https://nodei.co/npm/generator-teams-tab.png?downloads=true&downloadRank=true&stars=true)]((https://www.npmjs.com/package/generator-teams-tab))

## How to

### Install generator

All Yeoman generators should be installed as global modules. The generator is published to the npm registry and can be installed and downloaded using this command.

``` Shell
npm install generator-teams-tab --global
```

If you don't have Yeoman installed it has to be installed as well:

``` Shell
npm install yeoman --global
```

### Use the generator

To create a new project using the generator, execute the following command in the command prompt and answer the questions asked.

``` Shell
yo teams-tab
```

### Build the generator

On order to build the generator you need to install the Webpack as a global node module:

``` Shell
npm install webpack --global
```

You need to clone the repository or download a local copy and in the source folder install the node modules:

``` Shell
npm install
```

The generator is built and packaged using Webpack.

``` Shell
webpack
```

The bundled generator and the template files will en up in the `./generators/` folder.

### Use it in dev mode

In the `generator-teams-tab` directory use the following command, this will link the local copy of the folder as a global node module.

``` Shell
npm link
```

To revert the link operation:

``` Shell
npm unlink
```

## Credits

* [Richard DiZerega](https://blogs.msdn.microsoft.com/richard_dizeregas_blog/2017/02/07/microsoft-teams-and-custom-tab-theme/) - Themes management idea 