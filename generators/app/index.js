module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const GeneratorTeamsTab_1 = __webpack_require__(1);
module.exports = GeneratorTeamsTab_1.GeneratorTeamsTab;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const Generator = __webpack_require__(5);
const lodash = __webpack_require__(3);
const chalk = __webpack_require__(2);
let yosay = __webpack_require__(6);
let path = __webpack_require__(4);
class GeneratorTeamsTab extends Generator {
    constructor(args, opts) {
        super(args, opts);
        opts.force = true;
        this.desc('Generate a Microsoft Teams Tab solution.');
        this.argument('solutionName', {
            description: 'Solution name, as well as folder name',
            required: false
        });
    }
    initializing() {
        this.log(yosay('Welcome to the ' + chalk.yellow('Microsoft Teams Tab generator')));
    }
    prompting() {
        return this.prompt([
            {
                type: 'input',
                name: 'solutionName',
                default: lodash.kebabCase(this.appname),
                when: () => !this.solutionName,
                message: 'What is your solution name?'
            },
            {
                type: 'list',
                name: 'whichFolder',
                default: 'current',
                when: () => !this.solutionName,
                message: 'Where do you want to place the files?',
                choices: [
                    {
                        name: 'Use the current folder',
                        value: 'current'
                    },
                    {
                        name: 'Create a subfolder with solution name',
                        value: 'subdir'
                    }
                ]
            },
            {
                type: 'input',
                name: 'name',
                message: 'Name of your Microsoft Teams Tab project',
                default: this.appname
            },
            {
                type: 'input',
                name: 'developer',
                message: 'Your (company) name',
                validate: (input) => {
                    return input.length > 0;
                }
            },
            {
                type: 'input',
                name: 'host',
                message: 'The Url where you will host this tab:',
                default: (answers) => {
                    return `https://${answers.name}.azurewebsites.net`;
                },
                validate: this.validateUrl
            },
            {
                type: 'input',
                name: 'privacy',
                message: 'Your privacy url:',
                default: (answers) => {
                    return answers.host + '/privacy.html';
                },
                validate: this.validateUrl
            },
            {
                type: 'input',
                name: 'tou',
                message: 'Your terms of use url:',
                default: (answers) => {
                    return answers.host + '/tou.html';
                },
                validate: this.validateUrl
            },
            {
                type: 'input',
                name: 'namespace',
                message: 'Enter the namespace of your Tab',
                default: (answers) => {
                    var tmp = answers.host.substring(answers.host.indexOf('://') + 3);
                    var arr = tmp.split('.');
                    return lodash.reverse(arr).join('.');
                },
                validate: (input) => {
                    if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9]{2,})+$/.test(input)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            },
            {
                type: 'confirm',
                name: 'express',
                message: 'Would you like to use Express to host your Tabs?'
            },
            {
                type: 'confirm',
                name: 'azure',
                message: 'Would you like to include settings for Azure deployment?'
            }
        ]).then((answers) => {
            this.solutionName = this.solutionName || answers.solutionName;
            this.shouldUseSubDir = answers.whichFolder === 'subdir';
            this.shouldUseAzure = (answers.azure);
            this.shouldUseExpress = (answers.express);
            this.libraryName = lodash.camelCase(this.solutionName);
            this.namespace = answers.namespace;
            this.developer = answers.developer;
            this.host = answers.host;
            this.tou = answers.tou;
            this.privacy = answers.privacy;
            if (this.shouldUseSubDir) {
                this.destinationRoot(this.destinationPath(this.solutionName));
            }
        });
    }
    configuring() {
    }
    default() {
    }
    writing() {
        let staticFiles = [
            "_gitignore",
            "tsconfig.json",
            "src/manifest/tab-44.png",
            "src/manifest/tab-88.png",
            "src/microsoft.teams.d.ts"
        ];
        let templateFiles = [
            "README.md",
            "gulpfile.js",
            "package.json",
            "src/manifest/manifest.json",
            "webpack.config.js",
            "src/app/scripts/client.ts",
            "src/app/scripts/config.ts",
            "src/app/scripts/tab.ts",
            "src/app/scripts/theme.ts",
            "src/app/web/index.html",
            "src/app/web/tab.html",
            "src/app/web/remove.html",
            "src/app/web/tou.html",
            "src/app/web/config.html",
            "src/app/web/privacy.html"
        ];
        if (this.shouldUseAzure) {
            staticFiles.push('deploy.cmd', '_deployment');
        }
        if (this.shouldUseExpress) {
            staticFiles.push('src/app/server.ts');
        }
        let substitutions = {
            title: this.appname,
            description: this.description,
            namespace: this.namespace,
            libraryName: this.libraryName,
            developer: this.developer,
            privacy: this.privacy,
            tou: this.tou,
            host: this.host,
            shouldUseExpress: this.shouldUseExpress,
            appname: this.appname
        };
        this.sourceRoot();
        templateFiles.forEach(t => {
            this.fs.copyTpl(this.templatePath(t), this.fixFileNames(t), substitutions);
        });
        staticFiles.forEach(t => {
            this.fs.copy(this.templatePath(t), this.fixFileNames(t));
        });
    }
    conflicts() {
    }
    install() {
        let packages = [
            'gulp',
            'webpack',
            'typescript',
            'ts-loader',
            'gulp-zip',
            'gulp-util',
            'gulp-inject',
            'run-sequence'
        ];
        if (this.shouldUseExpress) {
            packages.push('express', 'express-session', 'body-parser', 'morgan', '@types/express', '@types/express-session', '@types/body-parser', '@types/morgan');
        }
        this.npmInstall(packages, { 'save': true });
    }
    end() {
        this.log(chalk.yellow('Thanks for using the generator'));
        this.log(chalk.yellow('Wictor Wilén, @wictor'));
        this.log(chalk.yellow('Have fun and make great Tabs...'));
    }
    validateUrl(url) {
        return /(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url);
    }
    fixFileNames(filename) {
        if (filename !== undefined) {
            var basename = path.basename(filename);
            if (basename[0] === '_') {
                var filename = '.' + basename.substr(1);
                var dirname = path.dirname(filename);
                filename = path.join(dirname, filename);
            }
        }
        return filename;
    }
}
exports.GeneratorTeamsTab = GeneratorTeamsTab;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("yeoman-generator");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("yosay");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);