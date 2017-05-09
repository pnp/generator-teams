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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorTeamsTab_1 = __webpack_require__(11);
module.exports = GeneratorTeamsTab_1.GeneratorTeamsTab;


/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Generator = __webpack_require__(4);
const lodash = __webpack_require__(3);
const chalk = __webpack_require__(16);
const GeneratorTeamTabOptions_1 = __webpack_require__(6);
const Yotilities_1 = __webpack_require__(1);
let yosay = __webpack_require__(5);
let path = __webpack_require__(0);
let pkg = __webpack_require__(15);
let Guid = __webpack_require__(2);
/**
 * The main implementation for the `teams` generator
 */
class GeneratorTeamsTab extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.options = new GeneratorTeamTabOptions_1.GeneratorTeamTabOptions();
        opts.force = true;
        this.desc('Generate a Microsoft Teams application.');
        this.argument('solutionName', {
            description: 'Solution name, as well as folder name',
            required: false
        });
    }
    initializing() {
        this.log(yosay('Welcome to the ' + chalk.yellow(`Microsoft Teams App generator (${pkg.version})`)));
        this.composeWith('teams:tab', { 'options': this.options });
        this.composeWith('teams:bot', { 'options': this.options });
        this.composeWith('teams:custombot', { 'options': this.options });
    }
    prompting() {
        return this.prompt([
            {
                type: 'input',
                name: 'solutionName',
                default: lodash.kebabCase(this.appname),
                when: () => !this.options.solutionName,
                message: 'What is your solution name?'
            },
            {
                type: 'list',
                name: 'whichFolder',
                default: 'current',
                when: () => !this.options.solutionName,
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
                message: 'Name of your Microsoft Teams App project?',
                default: this.appname
            },
            {
                type: 'input',
                name: 'developer',
                message: 'Your (company) name? (max 32 characters)',
                default: this.user.git.name,
                validate: (input) => {
                    return input.length > 0 && input.length <= 32;
                }
            },
            {
                type: 'input',
                name: 'host',
                message: 'The URL where you will host this tab?',
                default: (answers) => {
                    return `https://${lodash.camelCase(answers.solutionName)}.azurewebsites.net`;
                },
                validate: Yotilities_1.Yotilities.validateUrl
            },
            {
                type: 'checkbox',
                message: 'What do you want to add to your project?',
                name: 'parts',
                choices: [
                    {
                        name: 'A tab',
                        value: 'tab',
                        checked: true
                    },
                    {
                        name: 'A Bot Framework bot',
                        value: 'bot'
                    },
                    {
                        name: 'A Teams custom bot',
                        value: 'custombot'
                    }
                ]
            }
        ]).then((answers) => {
            this.options.title = answers.name;
            this.options.description = this.description;
            this.options.solutionName = this.options.solutionName || answers.solutionName;
            this.options.shouldUseSubDir = answers.whichFolder === 'subdir';
            this.options.libraryName = lodash.camelCase(this.options.solutionName);
            this.options.developer = answers.developer;
            this.options.host = answers.host;
            var tmp = this.options.host.substring(this.options.host.indexOf('://') + 3);
            var arr = tmp.split('.');
            this.options.namespace = lodash.reverse(arr).join('.');
            this.options.tou = answers.host + '/tou.html';
            this.options.privacy = answers.host + '/privacy.html';
            this.options.bot = answers.parts.indexOf('bot') != -1;
            this.options.tab = answers.parts.indexOf('tab') != -1;
            this.options.customBot = answers.parts.indexOf('custombot') != -1;
            this.options.id = Guid.raw();
            if (this.options.shouldUseSubDir) {
                this.destinationRoot(this.destinationPath(this.options.solutionName));
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
            "tsconfig-client.json",
            "src/app/web/assets/tab-44.png",
            "src/app/web/assets/tab-88.png",
            "src/app/web/assets/css/msteams-app.css",
            "src/app/scripts/theme.ts",
            "src/msteams-0.4.0.d.ts",
            'deploy.cmd',
            '_deployment'
        ];
        let templateFiles = [
            "README.md",
            "gulpfile.js",
            "package.json",
            'src/app/server.ts',
            "src/manifest/manifest.json",
            "webpack.config.js",
            "src/app/scripts/client.ts",
            "src/app/web/index.html",
            "src/app/web/tou.html",
            "src/app/web/privacy.html"
        ];
        this.sourceRoot();
        templateFiles.forEach(t => {
            this.fs.copyTpl(this.templatePath(t), Yotilities_1.Yotilities.fixFileNames(t, this.options), this.options);
        });
        staticFiles.forEach(t => {
            this.fs.copy(this.templatePath(t), Yotilities_1.Yotilities.fixFileNames(t, this.options));
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
            'run-sequence',
            'nodemon'
        ];
        // used for hosting in express
        packages.push('express', 'express-session', 'body-parser', 'morgan', '@types/express', '@types/express-session', '@types/body-parser', '@types/morgan');
        if (this.options.botType == 'botframework' || this.options.customBot) {
            packages.push('botbuilder');
        }
        this.npmInstall(packages, { 'save': true });
    }
    end() {
        this.log(chalk.yellow('Thanks for using the generator!'));
        this.log(chalk.yellow('Wictor Wilén, @wictor'));
        this.log(chalk.yellow('Have fun and make great Microsoft Teams Apps...'));
    }
}
exports.GeneratorTeamsTab = GeneratorTeamsTab;


/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports) {

module.exports = {
	"name": "generator-teams",
	"version": "1.1.0",
	"description": "Yeoman generator for Microsoft Teams apps",
	"main": "generators/app/index.js",
	"scripts": {},
	"files": [
		"generators"
	],
	"repository": {
		"type": "git",
		"url": "https://github.com/wictorwilen/generator-teams.git"
	},
	"bugs": {
		"url": "https://github.com/wictorwilen/generator-teams/issues"
	},
	"homepage": "https://github.com/wictorwilen/generator-teams",
	"keywords": [
		"yeoman-generator",
		"Microsoft Teams",
		"microsoft-teams",
		"Office 365",
		"office-365",
		"bot",
		"bot-framework",
		"botbuilder",
		"chatbot"
	],
	"author": "Wictor Wilén (wictor@wictorwilen.se)",
	"maintainers": [
		{
			"name": "Wictor Wilén",
			"email": "wictor@wictorwilen.se",
			"url": "http://www.wictorwilen.se"
		}
	],
	"license": "CC-BY-4.0",
	"devDependencies": {
		"@types/chalk": "^0.4.31",
		"@types/lodash": "^4.14.58",
		"@types/yeoman-generator": "^1.0.1",
		"@types/yosay": "0.0.28",
		"ts-loader": "^2.0.0",
		"typescript": "^2.3.2",
		"webpack": "^2.4.1"
	},
	"dependencies": {
		"chalk": "^1.1.3",
		"copy-webpack-plugin": "^4.0.1",
		"guid": "0.0.12",
		"lodash": "^4.17.4",
		"yeoman-generator": "^1.0.0",
		"yosay": "^2.0.0"
	}
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ })
/******/ ]);