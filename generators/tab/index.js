<<<<<<< HEAD
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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
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
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TabGenerator_1 = __webpack_require__(14);
module.exports = TabGenerator_1.TabGenerator;


/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Generator = __webpack_require__(4);
const lodash = __webpack_require__(3);
const Yotilities_1 = __webpack_require__(1);
let yosay = __webpack_require__(5);
let path = __webpack_require__(0);
let Guid = __webpack_require__(2);
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
                    message: 'Name of your Tab? (max 16 characters)',
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
            manifest.tabs.push({
                //id: `${this.options.namespace}.${this.options.tabName}`,
                id: Guid.raw(),
                name: this.options.tabTitle,
                description: {
                    short: `Add a short description for ${this.options.tabTitle} here`,
                    full: `Add a longer description for ${this.options.tabTitle} here`
                },
                icons: {
                    "44": `${this.options.host}/assets/tab-44.png`,
                    "88": `${this.options.host}/assets/tab-88.png`
                },
                accentColor: `#223344`,
                configUrl: `${this.options.host}/${this.options.tabName}Config.html`,
                canUpdateConfig: true
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
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ })
/******/ ]);
=======
module.exports=function(t){var e={};function s(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,s),o.l=!0,o.exports}return s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},s.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s.w={},s(s.s=18)}([function(t,e){t.exports=require("path")},function(t,e){t.exports=require("guid")},function(t,e){t.exports=require("yosay")},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});let i=s(0);const o="package.json";e.Yotilities=class{static validateUrl(t){return/(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(t)}static fixFileNames(t,e){if(void 0!==t){var s=i.basename(t);if("_"===s[0]){t="."+s.substr(1);var o=i.dirname(t);t=i.join(o,t)}for(var r in e)e.hasOwnProperty(r)&&"string"==typeof e[r]&&(t=t.replace(new RegExp("{"+r+"}","g"),e[r]))}return t}static addAdditionalDeps(t,e){var s=e.readJSON(o);t.forEach(t=>{s.dependencies[t[0]]=t[1]}),e.writeJSON(o,s)}}},function(t,e){t.exports=require("lodash")},function(t,e){t.exports=require("yeoman-generator")},,,,,,,,,,,function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(5),o=s(4),r=s(3);s(2),s(0),s(1);e.TabGenerator=class extends i{constructor(t,e){super(t,e),e.force=!0,this.options=e.options,this.desc("Adds a tab to a Teams project.")}prompting(){if(this.options.tab)return this.prompt([{type:"input",name:"tabTitle",message:"Default Tab name? (max 16 characters)",default:this.options.title+" Tab",validate:t=>t.length>0&&t.length<=16}]).then(t=>{this.options.tabTitle=t.tabTitle,this.options.tabName=o.camelCase(this.options.tabTitle)})}writing(){if(this.options.tab){let e=["src/app/scripts/{tabName}Config.tsx","src/app/scripts/{tabName}Tab.tsx","src/app/scripts/{tabName}Remove.tsx","src/app/web/{tabName}Tab.html","src/app/web/{tabName}Remove.html","src/app/web/{tabName}Config.html"];this.sourceRoot(),e.forEach(t=>{this.fs.copyTpl(this.templatePath(t),r.Yotilities.fixFileNames(t,this.options),this.options)});let s="src/manifest/manifest.json";var t=this.fs.readJSON(s);t.configurableTabs.push({configurationUrl:`${this.options.host}/${this.options.tabName}Config.html`,canUpdateConfiguration:!0,scopes:["team"]}),this.options.host.substring(this.options.host.indexOf("://")+3).split("."),t.validDomains.push(this.options.host.split("https://")[1]),this.fs.writeJSON(s,t),r.Yotilities.addAdditionalDeps([["msteams-ui-components-react","^0.5.0"],["react","^16.1.0"],["@types/react","16.0.38"],["react-dom","^16.2.0"],["file-loader","1.1.6"],["typestyle","1.5.1"]],this.fs);let i="src/app/scripts/client.ts",o=this.fs.read(i);o+="\n// Added by generator-teams",o+=`\nexport * from './${this.options.tabName}Config';`,o+=`\nexport * from './${this.options.tabName}Tab';`,o+=`\nexport * from './${this.options.tabName}Remove';`,o+="\n",this.fs.write(i,o)}}}},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=s(16);t.exports=i.TabGenerator},function(t,e,s){t.exports=s(17)}]);
>>>>>>> preview
