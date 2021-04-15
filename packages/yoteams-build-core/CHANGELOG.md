# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

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