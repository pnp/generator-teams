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
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = require("guid");

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const MessageExtensionGenerator_1 = __webpack_require__(17);
module.exports = MessageExtensionGenerator_1.MessageExtensionGenerator;


/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Generator = __webpack_require__(3);
const lodash = __webpack_require__(2);
let yosay = __webpack_require__(4);
let path = __webpack_require__(0);
let Guid = __webpack_require__(1);
class MessageExtensionGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);
        opts.force = true;
        this.options = opts.options;
        this.desc('Adds a Message Extension to a Microsoft Teams Apps project');
    }
    prompting() {
        if (this.options.messageExtension) {
            return this.prompt([
                {
                    type: 'list',
                    name: 'messageExtensionType',
                    message: 'What type of Message Extension would you like to create ',
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
                    name: 'messageExtensionId',
                    message: (answers) => {
                        var message = 'I need the Microsoft App ID for the Bot used by the Message Extension. ';
                        return message;
                    },
                    default: (answers) => {
                        return Guid.EMPTY;
                    },
                    validate: (input) => {
                        return Guid.isGuid(input);
                    },
                    when: (answers) => {
                        return answers.messageExtensionType !== 'existing';
                    },
                },
                {
                    type: 'input',
                    name: 'messageExtensionName',
                    message: 'What is the name of your Message Extension command?',
                    default: this.options.title + ' Message Extension',
                    validate: (input) => {
                        return input.length > 0;
                    },
                },
                {
                    type: 'input',
                    name: 'messageExtensionDescription',
                    message: 'Describe your Message Extension command?',
                    default: `Description of ${this.options.title} message extension`,
                    validate: (input) => {
                        return input.length > 0;
                    }
                }
            ]).then((answers) => {
                this.options.messageExtensionId = answers.messageExtensionId;
                this.options.messageExtensionType = answers.messageExtensionType;
                this.options.messageExtensionTitle = answers.messageExtensionName;
                this.options.messageExtensionDescription = answers.messageExtensionDescription;
                this.options.messageExtensionName = lodash.camelCase(answers.messageExtensionName);
                if (answers.messageExtensionType == 'new') {
                    // we need to add the Bot, even though the users did not choose to create one
                    this.options.bot = true;
                    this.options.botid = answers.messageExtensionId;
                    this.options.botType = 'botframework';
                    this.options.botTitle = answers.messageExtensionName + ' Bot';
                    this.options.botName = lodash.camelCase(this.options.botTitle);
                }
            });
        }
    }
    writing() {
        if (this.options.messageExtension) {
            let manifestPath = "src/manifest/manifest.json";
            var manifest = this.fs.readJSON(manifestPath);
            if (!manifest.messageExtensions) {
                manifest.messageExtensions = [];
            }
            manifest.messageExtensions.push({
                botId: this.options.messageExtensionId,
                scopes: ["team", "personal"],
                commands: [
                    {
                        id: this.options.messageExtensionName,
                        title: this.options.messageExtensionTitle,
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
exports.MessageExtensionGenerator = MessageExtensionGenerator;


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("yeoman-generator");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("yosay");

/***/ })

/******/ });