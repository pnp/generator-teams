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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/Yotilities.ts":
/*!*******************************!*\
  !*** ./src/app/Yotilities.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
const ts = __webpack_require__(/*! typescript */ "typescript");
let path = __webpack_require__(/*! path */ "path");
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
    static insertTsExportDeclaration(fileName, literal, comment, fs) {
        let clientTs = fs.read(fileName);
        const src = ts.createSourceFile(fileName, clientTs, ts.ScriptTarget.ES5, true, ts.ScriptKind.TS);
        const exp = ts.createExportDeclaration(undefined, undefined, undefined, ts.createLiteral(literal));
        if (comment !== undefined) {
            const cmt = ts.addSyntheticLeadingComment(exp, ts.SyntaxKind.SingleLineCommentTrivia, ` ${comment}`);
        }
        const update = ts.updateSourceFileNode(src, [
            ...src.statements,
            exp
        ]);
        const printer = ts.createPrinter({
            newLine: ts.NewLineKind.LineFeed,
            removeComments: false,
        });
        fs.write(fileName, printer.printFile(update));
    }
    static insertImportDeclaration(fileName, identifier, literal, comment, fs) {
        let clientTs = fs.read(fileName);
        const src = ts.createSourceFile(fileName, clientTs, ts.ScriptTarget.ES5, true, ts.ScriptKind.TS);
        const imp = ts.createImportDeclaration(undefined, undefined, ts.createImportClause(ts.createIdentifier(identifier), undefined), ts.createLiteral(literal));
        if (comment !== undefined) {
            const cmt = ts.addSyntheticLeadingComment(imp, ts.SyntaxKind.SingleLineCommentTrivia, ` ${comment}`);
        }
        const update = ts.updateSourceFileNode(src, [
            imp,
            ...src.statements
        ]);
        const printer = ts.createPrinter({
            newLine: ts.NewLineKind.LineFeed,
            removeComments: false,
        });
        fs.write(fileName, printer.printFile(update));
    }
}
exports.Yotilities = Yotilities;


/***/ }),

/***/ "./src/tab/TabGenerator.ts":
/*!*********************************!*\
  !*** ./src/tab/TabGenerator.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = __webpack_require__(/*! yeoman-generator */ "yeoman-generator");
const lodash = __webpack_require__(/*! lodash */ "lodash");
const Yotilities_1 = __webpack_require__(/*! ./../app/Yotilities */ "./src/app/Yotilities.ts");
let yosay = __webpack_require__(/*! yosay */ "yosay");
let path = __webpack_require__(/*! path */ "path");
let Guid = __webpack_require__(/*! guid */ "guid");
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
                if (!this.options.tabName.endsWith('Tab')) {
                    this.options.tabName = this.options.tabName + 'Tab';
                }
                this.options.tabReactComponentName = this.options.tabName.charAt(0).toUpperCase() + this.options.tabName.slice(1);
                this.options.reactComponents = true;
            });
        }
    }
    writing() {
        if (this.options.tab) {
            let templateFiles = [
                "src/app/scripts/{tabName}/{tabName}Config.tsx",
                "src/app/scripts/{tabName}/{tabName}.tsx",
                "src/app/scripts/{tabName}/{tabName}Remove.tsx",
                "src/app/{tabName}/{tabReactComponentName}.ts",
                "src/app/web/{tabName}/index.html",
                "src/app/web/{tabName}/remove.html",
                "src/app/web/{tabName}/config.html",
            ];
            this.sourceRoot();
            templateFiles.forEach(t => {
                this.fs.copyTpl(this.templatePath(t), Yotilities_1.Yotilities.fixFileNames(t, this.options), this.options);
            });
            // Update manifest
            let manifestPath = "src/manifest/manifest.json";
            var manifest = this.fs.readJSON(manifestPath);
            manifest.configurableTabs.push({
                configurationUrl: `https://{{HOSTNAME}}/${this.options.tabName}/config.html`,
                canUpdateConfiguration: true,
                scopes: ["team"]
            });
            this.fs.writeJSON(manifestPath, manifest);
            Yotilities_1.Yotilities.addAdditionalDeps([
                ["msteams-ui-components-react", "^0.8.1"],
                ["react", "^16.8.4"],
                ["@types/react", "16.8.8"],
                ["react-dom", "^16.8.4"],
                ["file-loader", "1.1.11"],
                ["typestyle", "2.0.1"]
            ], this.fs);
            // update client.ts
            Yotilities_1.Yotilities.insertTsExportDeclaration("src/app/scripts/client.ts", `./${this.options.tabName}/${this.options.tabReactComponentName}`, `Automatically added for the ${this.options.tabName} tab`, this.fs);
            Yotilities_1.Yotilities.insertTsExportDeclaration("src/app/scripts/client.ts", `./${this.options.tabName}/${this.options.tabReactComponentName}Config`, undefined, this.fs);
            Yotilities_1.Yotilities.insertTsExportDeclaration("src/app/scripts/client.ts", `./${this.options.tabName}/${this.options.tabReactComponentName}Remove`, undefined, this.fs);
            Yotilities_1.Yotilities.insertTsExportDeclaration("src/app/TeamsAppsComponents.ts", `./${this.options.tabName}/${this.options.tabReactComponentName}`, `Automatically added for the ${this.options.tabName} tab`, this.fs);
        }
    }
}
exports.TabGenerator = TabGenerator;


/***/ }),

/***/ "./src/tab/index.ts":
/*!**************************!*\
  !*** ./src/tab/index.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
const TabGenerator_1 = __webpack_require__(/*! ./TabGenerator */ "./src/tab/TabGenerator.ts");
module.exports = TabGenerator_1.TabGenerator;


/***/ }),

/***/ 2:
/*!********************************!*\
  !*** multi ./src/tab/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\code\github\generator-teams/src/tab/index.ts */"./src/tab/index.ts");


/***/ }),

/***/ "guid":
/*!***********************!*\
  !*** external "guid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("guid");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "typescript":
/*!*****************************!*\
  !*** external "typescript" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("typescript");

/***/ }),

/***/ "yeoman-generator":
/*!***********************************!*\
  !*** external "yeoman-generator" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("yeoman-generator");

/***/ }),

/***/ "yosay":
/*!************************!*\
  !*** external "yosay" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("yosay");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map