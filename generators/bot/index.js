module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
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

let path = __webpack_require__(0);
class Yotilities {
    static validateUrl(url) {
        return /(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url);
    }
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

class GeneratorTeamTabOptions {
}
exports.GeneratorTeamTabOptions = GeneratorTeamTabOptions;


/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const BotGenerator_1 = __webpack_require__(10);
module.exports = BotGenerator_1.BotGenerator;


/***/ }),
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const Generator = __webpack_require__(3);
const lodash = __webpack_require__(2);
const GeneratorTeamTabOptions_1 = __webpack_require__(5);
const Yotilities_1 = __webpack_require__(1);
let yosay = __webpack_require__(4);
let path = __webpack_require__(0);
let Guid = __webpack_require__(14);
class BotGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);
        opts.force = true;
        this.options = opts.options === undefined ? new GeneratorTeamTabOptions_1.GeneratorTeamTabOptions() : opts.options;
        this.desc('Adds a Bot to a Teams Tab project.');
    }
    prompting() {
        if (this.options.bot) {
            return this.prompt([
                {
                    type: 'input',
                    name: 'botid',
                    message: 'I need an ID for the bot, which is found in the Bot Framework portal?',
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
                    message: 'What is the title of your pinned tab for the bot?',
                    when: (answers) => {
                        return answers.pinnedTab;
                    }
                }
            ]).then((answers) => {
                this.options.botid = answers.botid;
                this.options.pinnedTab = answers.pinnedTab;
                this.options.pinnedTabTitle = answers.pinnedTabName;
                this.options.pinnedTabName = lodash.camelCase(answers.pinnedTabName);
            });
        }
    }
    writing() {
        if (this.options.bot) {
            let templateFiles = [
                "src/app/scripts/{pinnedTabName}Tab.ts",
                "src/app/web/{pinnedTabName}Tab.html",
            ];
            this.sourceRoot();
            templateFiles.forEach(t => {
                this.fs.copyTpl(this.templatePath(t), Yotilities_1.Yotilities.fixFileNames(t, this.options), this.options);
            });
            let manifestPath = "src/manifest/manifest.json";
            var manifest = this.fs.readJSON(manifestPath);
            var newbot = {
                mri: this.options.botid,
                pinnedTabs: []
            };
            if (this.options.pinnedTab) {
                newbot.pinnedTabs.push({
                    name: this.options.pinnedTabName
                });
            }
            manifest.bots.push(newbot);
            this.fs.writeJSON(manifestPath, manifest);
            // update client.ts
            let clientTsPath = "src/app/scripts/client.ts";
            let clientTs = this.fs.read(clientTsPath);
            clientTs += `\n// Added by generator-teams-tab`;
            clientTs += `\nexport * from './${this.options.pinnedTabName}Tab';`;
            clientTs += `\n`;
            this.fs.write(clientTsPath, clientTs);
        }
    }
}
exports.BotGenerator = BotGenerator;


/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports) {

module.exports = require("guid");

/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ })
/******/ ]);