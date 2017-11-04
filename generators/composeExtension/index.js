module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("guid");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("yeoman-generator");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("yosay");

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ComposeExtensionGenerator_1 = __webpack_require__(15);
module.exports = ComposeExtensionGenerator_1.ComposeExtensionGenerator;


/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Generator = __webpack_require__(3);
const lodash = __webpack_require__(2);
let yosay = __webpack_require__(4);
let path = __webpack_require__(0);
let Guid = __webpack_require__(1);
class ComposeExtensionGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);
        opts.force = true;
        this.options = opts.options;
        this.desc('Adds a Compose Extension to a Microsoft Teams Apps project');
    }
    prompting() {
        if (this.options.composeExtension) {
            return this.prompt([
                {
                    type: 'list',
                    name: 'composeExtensionType',
                    message: 'What type of Compose Extension would you like to create ',
                    default: (answers) => {
                        if (this.options.botType == 'botframework') {
                            return 'existing';
                        }
                        else {
                            return 'new';
                        }
                    },
                    choices: answers => {
                        var choices = [];
                        choices.push({
                            name: 'For a Bot hosted somewhere else',
                            value: 'external'
                        });
                        if (this.options.botType == 'botframework') {
                            choices.push({
                                name: 'For the Bot created in this project',
                                value: 'existing'
                            });
                        }
                        else {
                            choices.push({
                                name: 'For a new Bot',
                                value: 'new'
                            });
                        }
                        return choices;
                    }
                },
                {
                    type: 'input',
                    name: 'composeExtensionId',
                    message: (answers) => {
                        var message = 'I need the Microsoft App ID for the Bot used by the Compose Extension. ';
                        return message;
                    },
                    default: (answers) => {
                        return Guid.EMPTY;
                    },
                    validate: (input) => {
                        return Guid.isGuid(input);
                    },
                    when: (answers) => {
                        return answers.composeExtensionType !== 'existing';
                    },
                },
                {
                    type: 'input',
                    name: 'composeExtensionName',
                    message: 'What is the name of your Compose Extension command?',
                    validate: (input) => {
                        return input.length > 0;
                    },
                },
                {
                    type: 'input',
                    name: 'composeExtensionDescription',
                    message: 'Describe your Compose Extension command?',
                    validate: (input) => {
                        return input.length > 0;
                    }
                }
            ]).then((answers) => {
                this.options.composeExtensionId = answers.composeExtensionId;
                this.options.composeExtensionType = answers.composeExtensionType;
                this.options.composeExtensionTitle = answers.composeExtensionName;
                this.options.composeExtensionDescription = answers.composeExtensionDescription;
                this.options.composeExtensionName = lodash.camelCase(answers.composeExtensionName);
                if (answers.composeExtensionType == 'new') {
                    // we need to add the Bot, even though the users did not choose to create one
                    this.options.bot = true;
                    this.options.botid = answers.composeExtensionId;
                    this.options.botType = 'botframework';
                    this.options.botTitle = answers.composeExtensionName + ' Bot';
                    this.options.botName = lodash.camelCase(this.options.botTitle);
                }
            });
        }
    }
    writing() {
        if (this.options.composeExtension) {
            let manifestPath = "src/manifest/manifest.json";
            var manifest = this.fs.readJSON(manifestPath);
            manifest.composeExtensions.push({
                botId: this.options.composeExtensionId,
                scopes: ["team", "personal"],
                commands: [
                    {
                        id: this.options.composeExtensionName,
                        title: this.options.composeExtensionTitle,
                        description: 'Add a clever description here',
                        initialRun: true,
                        parameters: [
                            {
                                name: 'parameter',
                                description: 'description of the parameter',
                                title: 'Parameter'
                            }
                        ]
                    }
                ]
            });
            this.fs.writeJSON(manifestPath, manifest);
        }
    }
}
exports.ComposeExtensionGenerator = ComposeExtensionGenerator;


/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ })
/******/ ]);