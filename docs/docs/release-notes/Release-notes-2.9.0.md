# Release 2.9.0

*Date released: 2019-06-14*

> 2.9.0 has been deprecated - please install [2.9.1](./Release-notes-2.9.1)

This release was focused on bringing the generator up to Microsoft Teams manifest version 1.5 and add support for the latest Microsoft Teams JavaScript SDK. 

It also contains a refactored build pipeline (Gulp tasks) in order to improve stability and performance, as well as to prepare for future versions of the generator where we plan to include an upgrade path for existing projects. Now each component (client side, server side, CSS, manifest etc) are built independently and incremental builds are only done when changed, while using `gulp serve` or `gulp ngrok-serve`.

The default landing page, as well as the privacy and terms of use page has received a standardized branding (thanks Stefan Bauer).

## Updates and changes
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

## How to install

To get the latest version of the Microsoft Teams Apps generator use the following npm command:

``` bash
npm install generator-teams --global
```

And to install this version specifically use:

``` bash
npm install generator-teams@2.9.0 --global
```
