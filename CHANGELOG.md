# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## [*Unreleased*]

### Fixes

* Fixed invalid payload error in the bot welcome card

### Added

* Added the option to choose between a *configurable* and *static* tab
* Added the option of adding additional tabs when running the generator over an existing solution

### Changes

* Renamed argument for nodemon to use `--inspect` instead of `--debug` due to node.js deprecation warning **DEP0062**
* Moved from `guid` (deprecated) npm package to `uuid`, `uuid-validate` and a custom empty guid
* Updated `gulp-inject` version

## [*2.9.1*] - <*2019-06-15*>

### Fixes

* Removed `postinstall` npm command

## [*2.9.0*] - <*2019-06-14*>

### Added

* Added support for manifest version 1.5, new default
* Added suppot for optionally adding Microsoft Partner Id. More info at https://aka.ms/partner 
* Added files support option for bots (schema version 1.4+)
* Now persists settings for using unit testing, application insights and the library name
* Added default logging of "msteams" in the `.env` file
* Added support for SCSS in the build pipeline
* Added a default styling to the start page
* Added an option for Tabs to specify scope; *groupchat* or *team*
* Added a build option called `linting` to be able to opt-out of Typescript linting. Use `gulp serve --no-linting` for faster builds.

### Changed

* Updated the `@microsoft/teams-js` package to version `1.4.2`
* Added strict handling of inquirer answers in the main generator
* Refactored the gulp build system into `gulpfile.js` and `gulpfile.config.js`
* Refactored gulp tasks and added new gulp tasks to support independent builds of client side and server side code
* The `watch` gulp tasks now only rebuilds the parts that has changed (server side code, client side code, styles or static files) which improves incremental build times
* Updated `gulpfile.js` to use the `$schema` defined in the manifest file for validation and the `SCHEMAS` object only as backup
* Clarified some questions that the users is adding Message Extension commands, rather than new message extensions

### Fixes
* Fixed an issue when you add a messaging extension to an existing project and has renamed the bot file or folder name
* Fixed an issue when you add additional pages/scripts to a project and the library name is camel cased. Now correctly cased library name is retrieved from existing `webpack.config.js` file, and then the persisted config if exists, before defaulting to the library name
* Fixed an issue where Microsoft Partner Id is incorrectly persisted in the Yeoman configuration file
* Fixed an issue where the bot welcome card was not shown when adding the app to a team

## [*2.8.1*] - <*2019-05-20*>

### Fixes
* Fixed an issue where projects could not be scaffolded due to a logging error

## [*2.8.0*] - <*2019-05-20*>

### Added
* Added support for manifest version 1.4, new default
* Added the option to choose between a search based or action based messaging extension (only available for `1.4`+ manfiests)
* Added support for action based Message Extensions, can now choose from multiple input types, multiple outputs as well as locations for the actions (only available for `devPreview` manfiests).
* Added an option to not include configuration for messaging extensions. Note, only action messaging extension can have the config option.
* Added support for publishing a Tab as a SharePoint Web Part or Full Page Application (requires `v1.4`+)

### Changes

* Dependency for `botbuilder-teams-messagingextensions` has been bumped (1.3.0+) - with an interface breaking change
* Changed the wording for messaging extensions from 'what type...` to 'where is your host...'
* Messaging extensions does not automatically get configuration options, see *Added* above

### Fixes

* Fixed an issue where existing bots could not be found if only messaging extensions was used in a project
* Fixed an issue (#70) where names of classes cannot start with a number. Only a-z and A-Z are allowed
* Fixed an issue where telemetry was sent for tests
* Fixed an issue when non `process.env` variables was used for Bot Id's
* Fixed an issue where the .env parameter for bots is not added when adding a message extension only during upgrades
* Fixed an issue where more than 10 commands could be added to a message extension

## [*2.7.1*] - <*2019-05-08*>

### Added

* Support for selecting Microsoft Teams schema *1.3* or *devPreview* when scaffolding project
* New Gulp command; `ngrok-serve`. This command will build start **ngrok**, using configuration in the `.env` file, build the manifest using the ngrok hostname and then start the web server
* Added more tests for React components
* Added support for upgrading manifest versions. Currently supported only from *1.3* to *devPreview*
* Added support for adding Calling support to a bot, when using *devPreview* manifest version
* Yeoman testing (feature request #61)
* Added an action on the default generated messaging extension
* Added support for Application Insights

### Changed

* Refactored manifest generation to support multiple schemas
* Changed to an adaptive card on the default generated messaging extension including preview mode
* Node v6 is no longer considered supported

### Fixes

* Support for building manifest (`gulp manifest`) without network connection (#67)
* Fixed issues in tests (#68)

## [*2.7.0*] - <*2019-04-17*>

### Changed

* Using Bot Framework version 4+
* Messaging Extensions are now refactored into it's own file, using the `botbuilder-teams-messagingextensions` middleware
* Disable non-tested and non-supported extensions when running the generator over an existing projects
* Changed the way the manifest/package, now using a *temp* folder for replaceable strings
* Updated Microsoft Teams schema to 1.3
* Updated and clarified README files
* Updated the Connector configuration with new simplified configuration page, which removed a dependency on EJS
* Reorganized the file structure and file namings
* Improved auto generated class names formatting
* Updated all npm references
* Updated instructions for Git deployment to Azure (in README file)
* Consistency in file names and class names
* Minimized the code scaffolded for Messaging Extension projects without a Bot

### Added

* Added an option called `--no-telemetry` to opt-out of sending telemetry data when generating solutions
* Support for adding additional Message Extensions to an already existing project
* Support for dynamics properties/variables in the manifest.json file
* Added TSLinting to the build pipeline
* Added support for testing using Jest and Enzyme. Use `npm run test` and `npm run coverage`
* Support for validating multiple schemas based on the manifest version (1.3 and devPreview supported)
* Added support for Connector IDs to use the `.env` file

### Fixes

* Fixed the issue where the description of message extensions was miscalculated
* Fixed an issue where message extension code was added when externally hosted
* Fixed an issue where Connectors could not properly be configured due to missing typings in Teams JS
* Bug fixes: #55, #54, #53, #52
* Fixed an issue where Connectors could not be configured due to case sensitive URLs

## [*2.5.0*] - <*2018-08-17*>

### Changed

* Added TypeScript decorators and interfaces for Connectors, Bots and Outgoing webhooks so that they dynamically can be loaded - defined in the [express-ms-teams-host](https://www.npmjs.com/package/express-msteams-host) package.
* All server side TypeScript components are now exported via the `TeamsAppsComponents.ts` file
* Added the `@microsoft/teams-js` package
* Changed to AST for TypeScript generation
* References for Bot Framework and Bot Framework Microsoft Teams extensions are always referenced
* Ensured consistent file name ending (`Bot`, `Connector`, `Tab`, `OutgoingWebhook`)
* You MUST install `npm i -g gulp-cli`
* Updated to Webpack 4 - updated all Webconfig configurations
* Updated to Gulp 4 - refactored all Gulp tasks
* Updated multiple packages (botbuilder, botbuilder-teams). Issue #39
* Moved the React SPA control to separate package ([msteams-react-base-component](https://www.npmjs.com/package/msteams-react-base-component)) so that the control can be updated independently of the generator
* Fixed the headers bug (#40)
* Fixed the schema issue (#38)
* Upgraded npm packages

### Fixes

* Fixed an issue with connector template and express-msteams-host incompatibility
* Removed .ts extensions from AST generated imports
* Fixed an issue where environment was loaded after components loaded
* Fixed an issue where the bot state was deprecated to use an in-memory state storage

### Added

* Added the debug module, instead of using console logging in the generated solution

### Removed

* Removed the `MicrosoftTeams.d.ts` file
* Removed the `msteams-app.css` file

## [*2.4.6*] - <*2018-03-07*>

### Added

* Added HMAC validation for the outgoing webhooks

### Fixes

* Fixed missing npm packages when building an outgoing webhook only project

### Deleted

* Removed obsolete `theme.ts` and `msteams-app.css` files

## [*2.4.5*] - <*2018-03-06*>

### Added

* Added schema validation in build pipline (`validate-manifest` gulp task)

## [*2.4.4*] - <*2018-03-06*>

### Changed

* Moved out of preview

## [*2.4.2-preview*] - <*2018-03-04*>

* Fixed parameter not defined in static tab for bot

## [*2.4.1-preview*] - <*2018-03-03*>

### Changed

* Correct handling of messaging extensions settings

### Fixed

* Fixed an issue with missing dependencies when creating only a Messaging extension or Bot

## [*2.4.0-preview*] - <*2018-03-03*>

### Added

* Improved the Tab remove page with a "real" implementation and not just a dummy.
* Added support for messaging extension configuration

### Changed

* Renamed Compose Extensions to Message Extensions
* Moved to `msteams-ui-components` React library for UI
* Changed default bot til new bot
* Improved Connector flow with instructions to the user to close the tab
* Updated to schema v 1.2
* Updated npm packages
* Updated README files for GA'd Bot Service in Azure
* Renamed Custom Bot to Outgoing Webhooks

### Fixed

* Fixed a bug in Message Extensions
* Added default values for the Message extension name and description
* Fixed issue with Express 4.16.* and body parsing

## [*2.3.2-preview*] - <*2017-11-16*>

### Fixed

* PR #30, #31, #32

## [*2.3.1-preview*] - <*2017-11-05*>

### Added

* Added a sample Connector Configuration page.
* Improved Connector documentation
* Improved the Connector default sample (using O365 Connector card SDK and persistent connector storage)

### Changed

* Package file is now using name without spaces

### Fixed

* Fixed issues where space was used in solution name
* Added missing png for compose extension

### Removed

* Removed not used icon files

## [*2.3.0-preview*] - <*2017-11-04*>

## Added

* Added `--debug` flag to the `serve` gulp command
* Added support for `.env` file for local storage of environment properties
* Updated documentation files

### Changed

* Updated node packages
* Fixed issue #19

## [*2.2.1-preview*] - <*2017-08-06*>

### Changed

* Updated README.md

### Fixed

* Fixed schema issues
* Fixed issue [16]

## [*2.2.0-preview*] - <*2017-07-31*>

### Added

* Added `--skip-install` as a parameter to skip npm installation, and thus requires the user to run `npm install` manually.
* Added Travis CI

## [*2.1.0-preview*] - <*2017-07-25*>

### Added

* Added AppInsights logging to track usage of features. All data is anonymously collected.

## [*2.0.0-preview*] - <*2017-05-30*>

### Changed 

* Adaptation to the new developer preview

## [*1.2.0] - <*2017-07-25*>

### Added

* Added telemetry (anonymous data) to improve the generator

### Fixes

* Updated the package.json file to reflect the move to the OfficeDev Github organization

## [*1.1.1*] - <*2017-05-08*>

### Changed

* Adapt to changes to BotBuilder's IMessage interface in BotBuilder 3.8

### Fixed

* Bug fixes in msteams-app.css

## [*1.1.0*] - <*2017-05-02*>

### Added

* Separate tsconfig (tsconfig-client.json) file for client side scripts to support older browsers
### Changed

* Text and documentation updates (App nomenclature)
* Fixed and udpated theme/CSS management, CSS now hosted in solution
* Fixed dialog nesting in default bot
* New Teams .d.ts file (0.4 schema)
* Updates to npm packages
* Use of `entityId` instead of query string parameter for tab value
* \+ lots of more smaller fixes

## [*1.0.2*] - <*2017-03-28*>

### Added

* Validation of lenght of input to match the schema

## [*1.0.0*] - <*2017-03-27*>

### Added

* IMPORTANT: Renamed generator from *teams-tab* to *teams*, old npm packages are being deprecated
* Support for Bot Framework bots and [Teams custom bots](https://aka.ms/microsoftteamscustombots/), using `botbuilder`
* Added the `serve` Gulp task for local testing
* JSDOc comments

### Removed

* Option to opt-out of express hosting
* Option to opt-out of Azure deployment files - we all want Azure anyways!

## [*0.4.13*] - <*2017-03-24*>

### Changed

* Updated generated webpack.config.js to sort issue with paths (PR #9 by @laneyvb) + change in the generator webpack.config.js
* Updated generator to validate some properties to conform to the schema settings, such as max lenghts

### Removed

* Deleted gulpfile.js and gulp npm module - not needed, I have no why I ever committed this!

## [*0.4.11*] - <*2017-03-13*>

### Added

* Support for _Pinned tabs_ 

### Changed

* Updated manifest according to [the manifest schema (0.4)](https://github.com/OfficeDev/Microsoft-teams-docs/blob/master/teams/schema.md)

## [*0.4.11*] - <*2017-03-10*>

### Fixed

* Missing npm module for `guid`

## [*0.4.10*] - <*2017-03-09*>

### Added

* Support for bots

### Changed

* Refactoring into multiple sub generators (bot|tab)
* Simplified questions
* Tab file names, scripts and html, are now template based

## Removed

* Source maps in output

## [*0.4.7*] - <*2017-03-05*>

### Added

* Added a [CHANGELOG.md](CHANGELOG.md)

### Fixed

* Updated [README.md](README.md)
* General code clean-up

# Template
## [*MAJOR.MINOR.PATCH*] - <*DATE*>
### Added
### Changed
### Fixed
### Removed