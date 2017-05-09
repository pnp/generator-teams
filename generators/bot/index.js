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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
let path = __webpack_require__(0);
/**
 * Utility class for the Generator
 */
class Yotilities {
    /**
     * Validates a URL
     * @param url Url to validate
     */
    static validateUrl(url) {
        return /(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url);
    }
    /**
     * Renames a file based on passed options
     * @param filename path and name to file
     * @param options object with replacement properties
     */
    static fixFileNames(filename, options) {
        if (filename !== undefined) {
            var basename = path.basename(filename);
            if (basename[0] === '_') {
                var filename = '.' + basename.substr(1);
                var dirname = path.dirname(filename);
                filename = path.join(dirname, filename);
            }
            for (var prop in options) {
                if (options.hasOwnProperty(prop) && typeof options[prop] === 'string') {
                    filename = filename.replace(new RegExp("{" + prop + "}", 'g'), options[prop]);
                }
            }
        }
        return filename;
    }
}
exports.Yotilities = Yotilities;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("guid");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("yeoman-generator");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("yosay");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Configuration options for the generator
 */
class GeneratorTeamTabOptions {
    constructor() {
        this.botType = "";
    }
}
exports.GeneratorTeamTabOptions = GeneratorTeamTabOptions;


/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BotGenerator_1 = __webpack_require__(12);
module.exports = BotGenerator_1.BotGenerator;


/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Generator = __webpack_require__(4);
const lodash = __webpack_require__(3);
const GeneratorTeamTabOptions_1 = __webpack_require__(6);
const Yotilities_1 = __webpack_require__(1);
let yosay = __webpack_require__(5);
let path = __webpack_require__(0);
let Guid = __webpack_require__(2);
class BotGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);
        opts.force = true;
        this.options = opts.options === undefined ? new GeneratorTeamTabOptions_1.GeneratorTeamTabOptions() : opts.options;
        this.desc('Adds a Bot to a Teams project.');
    }
    prompting() {
        if (this.options.bot) {
            return this.prompt([
                {
                    type: 'list',
                    name: 'bottype',
                    message: 'Would type of bot would you like to use?',
                    default: 'existing',
                    choices: [
                        {
                            name: 'An already existing and running bot (not hosted in this solution)',
                            value: 'existing'
                        },
                        {
                            name: 'A new Bot Framework bot',
                            value: 'botframework'
                        }
                    ]
                },
                {
                    type: 'input',
                    name: 'botname',
                    message: 'What is the name of your bot?',
                    default: this.options.title + ' Bot',
                    validate: (input) => {
                        return input.length > 0;
                    },
                    when: (answers) => answers.bottype != 'existing'
                },
                {
                    type: 'input',
                    name: 'botid',
                    message: (answers) => {
                        var message = 'I need the Microsoft App ID for the bot. ';
                        if (answers.botTye == 'botframework') {
                            message += 'If you don\'t specify a value now, you will need to manually edit it later. ';
                        }
                        message += 'It\'s found in the Bot Framework portal (https://dev.botframework.com).';
                        return message;
                    },
                    default: (answers) => {
                        if (answers.bottype == 'botframework') {
                            return Guid.EMPTY;
                        }
                        return '';
                    },
                    validate: (input) => {
                        return Guid.isGuid(input);
                    }
                },
                {
                    type: 'confirm',
                    name: 'pinnedTab',
                    message: 'Do you want to add a pinned tab to your bot?',
                },
                {
                    type: 'input',
                    name: 'pinnedTabName',
                    message: 'What is the title of your pinned tab for the bot? (max 16 characters)',
                    validate: (input) => {
                        return input.length > 0 && input.length <= 16;
                    },
                    when: (answers) => {
                        return answers.pinnedTab;
                    },
                    default: (answers) => {
                        return answers.botname + ' Tab';
                    }
                }
            ]).then((answers) => {
                this.options.botid = answers.botid;
                this.options.pinnedTab = answers.pinnedTab;
                this.options.pinnedTabTitle = answers.pinnedTabName;
                this.options.pinnedTabName = lodash.camelCase(answers.pinnedTabName);
                this.options.botType = answers.bottype;
                this.options.botTitle = answers.botname;
                this.options.botName = lodash.camelCase(answers.botname);
            });
        }
    }
    writing() {
        if (this.options.bot) {
            let manifestPath = "src/manifest/manifest.json";
            var manifest = this.fs.readJSON(manifestPath);
            var newbot = {
                mri: this.options.botid,
                pinnedTabs: []
            };
            this.sourceRoot();
            let templateFiles = [];
            if (this.options.pinnedTab) {
                templateFiles.push("src/app/scripts/{pinnedTabName}Tab.ts", "src/app/web/{pinnedTabName}Tab.html");
                newbot.pinnedTabs.push({
                    id: Guid.raw(),
                    definitionId: Guid.raw(),
                    displayName: this.options.pinnedTabTitle,
                    url: `${this.options.host}/${this.options.pinnedTabName}Tab.html`,
                    website: `${this.options.host}/${this.options.pinnedTabName}Tab.html`,
                });
            }
            manifest.bots.push(newbot);
            this.fs.writeJSON(manifestPath, manifest);
            if (this.options.botType != 'existing') {
                templateFiles.push('src/app/{botName}.ts');
                templateFiles.push('README-{botName}.md');
            }
            templateFiles.forEach(t => {
                this.fs.copyTpl(this.templatePath(t), Yotilities_1.Yotilities.fixFileNames(t, this.options), this.options);
            });
            // update client.ts
            if (this.options.pinnedTab) {
                let clientTsPath = "src/app/scripts/client.ts";
                let clientTs = this.fs.read(clientTsPath);
                clientTs += `\n// Added by generator-teams`;
                clientTs += `\nexport * from './${this.options.pinnedTabName}Tab';`;
                clientTs += `\n`;
                this.fs.write(clientTsPath, clientTs);
            }
        }
    }
}
exports.BotGenerator = BotGenerator;


/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ })
/******/ ]);