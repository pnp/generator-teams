# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [*Unreleased*]- <*2021-06-10*>

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