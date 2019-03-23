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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, description, main, scripts, files, repository, bugs, homepage, keywords, author, maintainers, contributors, license, devDependencies, dependencies, default */
/***/ (function(module) {

module.exports = {"name":"generator-teams","version":"2.7.0-preview","description":"Yeoman generator for Microsoft Teams Apps","main":"generators/app/index.js","scripts":{"build":"node_modules/.bin/webpack"},"files":["generators"],"repository":{"type":"git","url":"https://github.com/OfficeDev/generator-teams.git"},"bugs":{"url":"https://github.com/OfficeDev/generator-teams/issues"},"homepage":"https://github.com/OfficeDev/generator-teams","keywords":["yeoman-generator","Microsoft Teams","microsoft-teams","Office 365","office-365","bot","bot-framework","botbuilder","chatbot"],"author":"Wictor Wilén (wictor@wictorwilen.se)","maintainers":[{"name":"Wictor Wilén","email":"wictor@wictorwilen.se","url":"http://www.wictorwilen.se"},{"name":"Bill Bliss","email":"billbl@microsoft.com","url":"https://github.com/billbliss"}],"contributors":["DiZerega, Richard <https://github.com/richdizz>","van Bergen, Elaine <https://github.com/laneyvb>","Laskewitz, Daniel <https://github.com/Laskewitz>","Schaeflein, Paul <https://github.com/pschaeflein>"],"license":"MIT","devDependencies":{"@types/guid":"^1.0.0","@types/lodash":"^4.14.118","@types/yeoman-generator":"^2.0.1","@types/yosay":"0.0.29","clean-webpack-plugin":"^0.1.18","copy-webpack-plugin":"^4.6.0","ts-loader":"^5.3.0","typescript":"^2.6.1","webpack":"^4.26.0","webpack-cli":"^3.1.2"},"dependencies":{"applicationinsights":"^1.0.7","chalk":"^2.3.2","dotenv":"^6.1.0","guid":"0.0.12","lodash":"^4.17.11","ts-simple-ast":"^19.0.0","yeoman-generator":"^3.1.1","yosay":"^2.0.1"}};

/***/ }),

/***/ "./src/app/GeneratorTeamsApp.ts":
/*!**************************************!*\
  !*** ./src/app/GeneratorTeamsApp.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = __webpack_require__(/*! yeoman-generator */ "yeoman-generator");
const lodash = __webpack_require__(/*! lodash */ "lodash");
const chalk = __webpack_require__(/*! chalk */ "chalk");
const GeneratorTeamsAppOptions_1 = __webpack_require__(/*! ./GeneratorTeamsAppOptions */ "./src/app/GeneratorTeamsAppOptions.ts");
const Yotilities_1 = __webpack_require__(/*! ./Yotilities */ "./src/app/Yotilities.ts");
const AppInsights = __webpack_require__(/*! applicationinsights */ "applicationinsights");
let yosay = __webpack_require__(/*! yosay */ "yosay");
let path = __webpack_require__(/*! path */ "path");
let pkg = __webpack_require__(/*! ../../package.json */ "./package.json");
let Guid = __webpack_require__(/*! guid */ "guid");
/**
 * The main implementation for the `teams` generator
 */
class GeneratorTeamsApp extends Generator {
    constructor(args, opts) {
        super(args, (!(opts.force = true)) || opts);
        this.options = new GeneratorTeamsAppOptions_1.GeneratorTeamsAppOptions();
        opts.force = true;
        this.desc('Generate a Microsoft Teams application.');
        this.argument('solutionName', {
            description: 'Solution name, as well as folder name',
            required: false
        });
        this.option('skip-install', {
            type: Boolean,
            default: false,
            description: 'Skips running npm install'
        });
        this.option('telemetry', {
            type: Boolean,
            default: false,
            description: 'Does not pass usage telemetry'
        });
        if (this.options['no-telemetry']) {
            AppInsights.setup('6d773b93-ff70-45c5-907c-8edae9bf90eb');
            delete AppInsights.defaultClient.context.tags['ai.cloud.roleInstance'];
            AppInsights.Configuration.setAutoCollectExceptions(true);
            AppInsights.Configuration.setAutoCollectPerformance(true);
            AppInsights.defaultClient.commonProperties = {
                version: pkg.version
            };
            AppInsights.defaultClient.trackEvent({ name: 'start-generator' });
        }
        this.options.existingManifest = this.fs.readJSON(`./src/manifest/manifest.json`);
    }
    initializing() {
        this.log(yosay('Welcome to the ' + chalk.default.yellow(`Microsoft Teams App generator (${pkg.version})`)));
        this.composeWith('teams:tab', { 'options': this.options });
        this.composeWith('teams:bot', { 'options': this.options });
        this.composeWith('teams:custombot', { 'options': this.options });
        this.composeWith('teams:connector', { 'options': this.options });
        this.composeWith('teams:messageExtension', { 'options': this.options });
        // check schema version:
        if (this.options.existingManifest) {
            if (this.options.existingManifest["$schema"] != 'https://statics.teams.microsoft.com/sdk/v1.2/manifest/MicrosoftTeams.schema.json') {
                this.log(chalk.default.red('You are running the generator on an already existing project, but on a non supported-schema.'));
                process.exit(1);
            }
        }
    }
    prompting() {
        return this.prompt([
            {
                type: 'confirm',
                name: 'confirmedAdd',
                default: false,
                message: `You are running the generator on an already existing project, "${this.options.existingManifest && this.options.existingManifest.name.short}", are you sure you want to continue?`,
                when: () => this.options.existingManifest,
            },
            {
                type: 'input',
                name: 'solutionName',
                default: lodash.kebabCase(this.appname),
                when: () => !(this.options.solutionName || this.options.existingManifest),
                message: 'What is your solution name?'
            },
            {
                type: 'list',
                name: 'whichFolder',
                default: 'current',
                when: () => !(this.options.solutionName || this.options.existingManifest),
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
                message: 'Title of your Microsoft Teams App project?',
                when: () => !this.options.existingManifest,
                default: this.appname
            },
            {
                type: 'input',
                name: 'developer',
                message: 'Your (company) name? (max 32 characters)',
                default: this.user.git.name,
                validate: (input) => {
                    return input.length > 0 && input.length <= 32;
                },
                when: () => !this.options.existingManifest,
                store: true
            },
            {
                type: 'checkbox',
                message: 'What do you want to add to your project?',
                name: 'parts',
                choices: [
                    {
                        name: 'A Tab',
                        value: 'tab',
                        disabled: this.options.existingManifest,
                        checked: true
                    },
                    {
                        name: 'A Bot',
                        disabled: this.options.existingManifest,
                        value: 'bot'
                    },
                    {
                        name: 'An Outgoing Webhook',
                        disabled: this.options.existingManifest,
                        value: 'custombot'
                    },
                    {
                        name: 'A Connector',
                        disabled: this.options.existingManifest,
                        value: 'connector'
                    },
                    {
                        name: 'A Message Extension',
                        value: 'messageextension',
                    }
                ],
                when: (answers) => answers.confirmedAdd != false
            },
            {
                type: 'input',
                name: 'host',
                message: 'The URL where you will host this solution?',
                default: (answers) => {
                    return `https://${lodash.camelCase(answers.solutionName)}.azurewebsites.net`;
                },
                validate: Yotilities_1.Yotilities.validateUrl,
                when: () => !this.options.existingManifest,
            },
        ]).then((answers) => {
            if (answers.confirmedAdd == false) {
                process.exit(0);
            }
            if (!this.options.existingManifest) {
                answers.host = answers.host.endsWith('/') ? answers.host.substr(0, answers.host.length - 1) : answers.host;
                this.options.title = answers.name;
                this.options.description = this.description;
                this.options.solutionName = this.options.solutionName || answers.solutionName;
                this.options.shouldUseSubDir = answers.whichFolder === 'subdir';
                this.options.libraryName = lodash.camelCase(this.options.solutionName);
                this.options.packageName = this.options.libraryName.toLocaleLowerCase();
                this.options.developer = answers.developer;
                this.options.host = answers.host;
                var tmp = this.options.host.substring(this.options.host.indexOf('://') + 3);
                this.options.hostname = this.options.host.substring(this.options.host.indexOf('://') + 3);
                var arr = tmp.split('.');
                this.options.namespace = lodash.reverse(arr).join('.');
                this.options.id = Guid.raw();
                if (this.options.host.indexOf('azurewebsites.net') >= 0) {
                    this.options.websitePrefix = this.options.host.substring(this.options.host.indexOf('://') + 3, this.options.host.indexOf('.'));
                }
                else {
                    this.options.websitePrefix = '[your Azure web app name]';
                }
                if (this.options.shouldUseSubDir) {
                    this.destinationRoot(this.destinationPath(this.options.solutionName));
                }
            }
            else {
                this.options.developer = this.options.existingManifest.developer.name;
                this.options.title = this.options.existingManifest.name.short;
                let pkg = this.fs.readJSON(`./package.json`);
                this.options.libraryName = pkg.name;
                this.options.host = this.options.existingManifest.developer.websiteUrl;
            }
            this.options.bot = answers.parts.indexOf('bot') != -1;
            this.options.tab = answers.parts.indexOf('tab') != -1;
            this.options.connector = answers.parts.indexOf('connector') != -1;
            this.options.customBot = answers.parts.indexOf('custombot') != -1;
            this.options.messageExtension = answers.parts.indexOf('messageextension') != -1;
            this.options.reactComponents = false; // set to false initially
        });
    }
    configuring() {
    }
    default() {
    }
    writing() {
        if (!this.options.existingManifest) {
            let staticFiles = [
                "_gitignore",
                "tsconfig.json",
                "tsconfig-client.json",
                "src/manifest/icon-outline.png",
                "src/manifest/icon-color.png",
                "src/app/web/assets/icon.png",
                'deploy.cmd',
                '_deployment',
                "src/app/TeamsAppsComponents.ts"
            ];
            let templateFiles = [
                "README.md",
                "gulpfile.js",
                "package.json",
                ".env",
                'src/app/server.ts',
                "src/manifest/manifest.json",
                "webpack.config.js",
                "src/app/scripts/client.ts",
                "src/app/web/index.html",
                "src/app/web/tou.html",
                "src/app/web/privacy.html",
            ];
            this.sourceRoot();
            templateFiles.forEach(t => {
                this.fs.copyTpl(this.templatePath(t), Yotilities_1.Yotilities.fixFileNames(t, this.options), this.options);
            });
            staticFiles.forEach(t => {
                this.fs.copy(this.templatePath(t), Yotilities_1.Yotilities.fixFileNames(t, this.options));
            });
            // if we have added any react based components
            if (this.options.reactComponents) {
                Yotilities_1.Yotilities.addAdditionalDeps([
                    ["msteams-react-base-component", "~1.0.0"]
                ], this.fs);
            }
        }
    }
    conflicts() {
    }
    install() {
        // track usage
        if (this.options['no-telemetry']) {
            if (this.options.existingManifest) {
                AppInsights.defaultClient.trackEvent({ name: 'rerun-generator' });
            }
            AppInsights.defaultClient.trackEvent({ name: 'end-generator' });
            if (this.options.bot) {
                AppInsights.defaultClient.trackEvent({ name: 'bot' });
                if (this.options.botType == 'existing') {
                    AppInsights.defaultClient.trackEvent({ name: 'bot-existing' });
                }
                else {
                    AppInsights.defaultClient.trackEvent({ name: 'bot-new' });
                }
            }
            if (this.options.messageExtension) {
                AppInsights.defaultClient.trackEvent({ name: 'messageExtension' });
            }
            if (this.options.connector) {
                AppInsights.defaultClient.trackEvent({ name: 'connector' });
            }
            if (this.options.customBot) {
                AppInsights.defaultClient.trackEvent({ name: 'outgoingWebhook' });
            }
            if (this.options.staticTab) {
                AppInsights.defaultClient.trackEvent({ name: 'staticTab' });
            }
            if (this.options.tab) {
                AppInsights.defaultClient.trackEvent({ name: 'tab' });
            }
            AppInsights.defaultClient.flush();
        }
        if (this.options['skip-install']) {
            this.log(chalk.default.yellow('Skipping installation of dependencies. You should run "npm install"'));
        }
        else {
            this.npmInstall();
        }
    }
    end() {
        this.log(chalk.default.yellow('Thanks for using the generator!'));
        this.log(chalk.default.yellow('Have fun and make great Microsoft Teams Apps...'));
    }
}
exports.GeneratorTeamsApp = GeneratorTeamsApp;


/***/ }),

/***/ "./src/app/GeneratorTeamsAppOptions.ts":
/*!*********************************************!*\
  !*** ./src/app/GeneratorTeamsAppOptions.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Configuration options for the generator
 */
class GeneratorTeamsAppOptions {
    constructor() {
        /* Bots */
        this.botid = '';
        this.botType = "";
        this.connectorType = '';
        this.messageExtensionType = '';
    }
}
exports.GeneratorTeamsAppOptions = GeneratorTeamsAppOptions;


/***/ }),

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

/***/ "./src/app/index.ts":
/*!**************************!*\
  !*** ./src/app/index.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorTeamsApp_1 = __webpack_require__(/*! ./GeneratorTeamsApp */ "./src/app/GeneratorTeamsApp.ts");
module.exports = GeneratorTeamsApp_1.GeneratorTeamsApp;


/***/ }),

/***/ 0:
/*!********************************!*\
  !*** multi ./src/app/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\code\github\generator-teams/src/app/index.ts */"./src/app/index.ts");


/***/ }),

/***/ "applicationinsights":
/*!**************************************!*\
  !*** external "applicationinsights" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("applicationinsights");

/***/ }),

/***/ "chalk":
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chalk");

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