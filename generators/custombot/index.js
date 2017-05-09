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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
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
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CustomBotGenerator_1 = __webpack_require__(13);
module.exports = CustomBotGenerator_1.CustomBotGenerator;


/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Generator = __webpack_require__(4);
const lodash = __webpack_require__(3);
const Yotilities_1 = __webpack_require__(1);
let yosay = __webpack_require__(5);
let path = __webpack_require__(0);
let Guid = __webpack_require__(2);
class CustomBotGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);
        opts.force = true;
        this.options = opts.options;
        this.desc('Adds a custom bot to a Teams project.');
    }
    prompting() {
        if (this.options.customBot) {
            return this.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Name of your custom bot?',
                    default: this.options.title + ' Custom Bot'
                },
            ]).then((answers) => {
                this.options.customBotTitle = answers.title;
                this.options.customBotName = lodash.camelCase(answers.title);
            });
        }
    }
    writing() {
        if (this.options.customBot) {
            let templateFiles = [
                "README-{customBotName}.md",
                "src/app/{customBotName}.ts"
            ];
            this.sourceRoot();
            templateFiles.forEach(t => {
                this.fs.copyTpl(this.templatePath(t), Yotilities_1.Yotilities.fixFileNames(t, this.options), this.options);
            });
        }
    }
}
exports.CustomBotGenerator = CustomBotGenerator;


/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ })
/******/ ]);