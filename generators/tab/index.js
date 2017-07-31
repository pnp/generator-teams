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
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
let path = __webpack_require__(0);
const packagePath = "package.json";
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
    static addAdditionalDeps(dependencies, fs) {
        var pkg = fs.readJSON(packagePath);
        dependencies.forEach(dep => {
            pkg.dependencies[dep[0]] = dep[1];
        });
        fs.writeJSON(packagePath, pkg);
    }
}
exports.Yotilities = Yotilities;


/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TabGenerator_1 = __webpack_require__(18);
module.exports = TabGenerator_1.TabGenerator;


/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Generator = __webpack_require__(3);
const lodash = __webpack_require__(2);
const Yotilities_1 = __webpack_require__(5);
let yosay = __webpack_require__(4);
let path = __webpack_require__(0);
let Guid = __webpack_require__(1);
class TabGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);
        opts.force = true;
        this.options = opts.options;
        this.desc('Adds a tab to a Teams project.');
    }
    prompting() {
        if (this.options.tab) {
            return this.prompt([
                {
                    type: 'input',
                    name: 'tabTitle',
                    message: 'Default Tab name? (max 16 characters)',
                    default: this.options.title + ' Tab',
                    validate: (input) => {
                        return input.length > 0 && input.length <= 16;
                    }
                },
            ]).then((answers) => {
                this.options.tabTitle = answers.tabTitle;
                this.options.tabName = lodash.camelCase(this.options.tabTitle);
            });
        }
    }
    writing() {
        if (this.options.tab) {
            let templateFiles = [
                "src/app/scripts/{tabName}Config.ts",
                "src/app/scripts/{tabName}Tab.ts",
                "src/app/web/{tabName}Tab.html",
                "src/app/web/{tabName}Remove.html",
                "src/app/web/{tabName}Config.html",
            ];
            this.sourceRoot();
            templateFiles.forEach(t => {
                this.fs.copyTpl(this.templatePath(t), Yotilities_1.Yotilities.fixFileNames(t, this.options), this.options);
            });
            // Update manifest
            let manifestPath = "src/manifest/manifest.json";
            var manifest = this.fs.readJSON(manifestPath);
            manifest.configurableTabs.push({
                configurationUrl: `${this.options.host}/${this.options.tabName}Config.html`,
                canUpdateConfig: true,
                scopes: ["team"]
            });
            var tmp = this.options.host.substring(this.options.host.indexOf('://') + 3);
            var arr = tmp.split('.');
            ;
            manifest.validDomains.push(this.options.host.split("https://")[1]);
            this.fs.writeJSON(manifestPath, manifest);
            // update client.ts
            let clientTsPath = "src/app/scripts/client.ts";
            let clientTs = this.fs.read(clientTsPath);
            clientTs += `\n// Added by generator-teams`;
            clientTs += `\nexport * from './${this.options.tabName}Config';`;
            clientTs += `\nexport * from './${this.options.tabName}Tab';`;
            clientTs += `\n`;
            this.fs.write(clientTsPath, clientTs);
        }
    }
}
exports.TabGenerator = TabGenerator;


/***/ }),
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ })
/******/ ]);