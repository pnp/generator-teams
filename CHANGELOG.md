# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

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