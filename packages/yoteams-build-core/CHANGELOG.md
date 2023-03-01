# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).


## [*1.8.1*]- <*2023-01-19*>

### Added

* Updated packages

## [*1.8.0*]- <*2023-01-19*>

### Added

* Added support for Schema 1.14 & 1.15. This schema version supports extending Teams apps to other parts of the Microsoft 365 ecosystem. More info at https://aka.ms/extendteamsapps.

### Changes

* Requires Node 16 or later
* Dependency package updates

## [*1.7.0*]- <*2022-06-23*>

### Added

* Added support for Schema 1.13. This schema version supports extending Teams apps to other parts of the Microsoft 365 ecosystem. More info at https://aka.ms/extendteamsapps.

### Changes

* Requires Node 14 or later
* Dependency package updates

### Fixes

* Fixed issue with telemetry timeout at the end of scaffolding

## [*1.6.0*]- <*2022-02-17*>

### Added

* Added Gulp-inject options to build config (#278 by pschaeflein)
* Added support for Teams manifest `1.12` and `m365DevPreview`
* Moved to `gulp-sass`, with native Dart support, from `gulp-dart-sass`

### Changes

* Static typing for build config options

## [*1.5.0*]- <*2021-11-18*>

### Added

* Added telemetry, see https://github.com/pnp/generator-teams/blob/master/docs/docs/about/telemetry.md
* Added logging of ngrok inspection url (#267 by pschaeflein)

## [*1.4.0*]- <*2021-10-28*>

### Changes

* Webpack dev server now runs only in `--debug` mode, added webpack dev server "compilation starting" notification message (PR #251 by s-KaiNet)

## [*1.3.0*]- <*2021-09-30*>

### Added

* Support for Teams manifest schema 1.11 (#234)

### Changes

* `serve` commands will now use Webpack dev server to improve client side build and also allows for live-reloading (PR #233 by s-KaiNet)

## [*1.2.1*]- <*2021-09-14*>

### Added

* Added flag `--no-schema-validation` to skip validation of Manifest schema (not listed as a supported schema)

### Fixes

* Fixed an issue where `ngrok-start` task threw an exception in the exception handler (#225)

## [*1.2.0*]- <*2021-06-07*>

### Added

* Added `codespaces-serve` task, only available inside a Github Codespaces container, for automatic host name generation when using Github Codespaces
* Watches for changes in `.env` files and rebuilds and restarts the solution, as well as scaffolds an updated manifest package
* Support for plugins

### Changes

* [BREAKING] Changed the environment variable `HOSTNAME` to `PUBLIC_HOSTNAME` to not reuse the system set HOSTNAME.
* Updated referenced packages
* Switched to `gulp-dart-sass` due to deprecated `node-sass`
* Node 10.x no longer supported

### Fixes

* Fixed typo (#222)

## [*1.1.0*] - <*2021-04-15*>

### Added

* Support for multiple manifest files, see https://github.com/pnp/generator-teams/tree/master/docs/docs/using-multiple-manifests.md

## [*1.0.1*] - <*2021-03-02*>

### Added

* In non-debug mode the `styles` task makes the output compressed

### Changes

* `styles` task now respects the `--debug` argument
* `webpack` tasks now correctly reports errors and breaks builds if found, and rebuilds while in `serve` mode

### Fixed

* Explicitly added webpack as a dev dependency
* Fixed build issue related to npm 7
* Added missing typings
* Ensured package versions is aligned with yo teams v3

## [*1.0.0*] - <*2021-02-07*>

### Added

* Initial release

# Template
## [*MAJOR.MINOR.PATCH*] - <*DATE*>
### Added
### Changed
### Fixed
### Removed
