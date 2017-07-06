# generator-teams

A [Yeoman Generator](http://yeoman.io/) for [Microsoft Teams](https://teams.microsoft.com) Apps created by [Wictor Wilén](http://twitter.com/wictor).

Generates a Microsoft Teams App that can be used to add Tabs, Bots, and more to Microsoft Teams based on Node.js and TypeScript. Optionally it adds support for hosting using [Express](http://expressjs.com/).

For more information on how Tabs and Bots can be used with Teams see the [Teams Developer Documentation](https://msdn.microsoft.com/en-us/microsoft-teams/ )

[![npmjs](https://nodei.co/npm/generator-teams.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/generator-teams)

> *Note:* The generator has been renamed from `generator-teams-tab` to `generator-teams`.
> Old package will be marked as deprecated.

## How to

### Install generator

All Yeoman generators should be installed as global modules. The generator is published to the npm registry and can be installed and downloaded using this command.

``` Shell
npm install generator-teams --global
```

If you don't have Yeoman installed it has to be installed as well:

``` Shell
npm install yo --global
```

### Use the generator

To create a new project using the generator, execute the following command in the command prompt and answer the questions asked.

``` Shell
yo teams
```
> *Note:* Files are created in the directory that you run the command from hence make sure you are happy with the location before you hit enter.

### Build the generator

In order to build the generator you need to install the Webpack as a global node module:

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

## Credits

* [Bill Bliss](https://github.com/billbliss) - Teams support and awesome pull requests and commits
* [Richard DiZerega](https://blogs.msdn.microsoft.com/richard_dizeregas_blog/2017/02/07/microsoft-teams-and-custom-tab-theme/) - Themes management idea
* [Elaine van Bergen](https://github.com/laneyvb) - pull requests
* [Daniel Laskewitz](https://github.com/Laskewitz) - pull requests

## Contributing

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
