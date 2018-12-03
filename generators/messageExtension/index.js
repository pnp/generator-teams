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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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

/***/ "./src/messageExtension/MessageExtensionGenerator.ts":
/*!***********************************************************!*\
  !*** ./src/messageExtension/MessageExtensionGenerator.ts ***!
  \***********************************************************/
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
const Yotilities_1 = __webpack_require__(/*! ./../app/Yotilities */ "./src/app/Yotilities.ts");
const ts_simple_ast_1 = __webpack_require__(/*! ts-simple-ast */ "ts-simple-ast");
const path = __webpack_require__(/*! path */ "path");
const Guid = __webpack_require__(/*! guid */ "guid");
let yosay = __webpack_require__(/*! yosay */ "yosay");
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
                        if (this.options.botType == 'botframework' || this.options.existingManifest && this.options.existingManifest.bots && this.options.existingManifest.bots.length > 0) {
                            choices.push({
                                name: 'For a Bot already created in this project',
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
                    // this is when we are running on an already existin project
                    type: 'list',
                    name: 'botId',
                    message: 'Choose which bot',
                    choices: answers => {
                        let choices = [];
                        if (this.options.existingManifest.bots) {
                            // TODO: use AST to find the Bot classes as well
                            choices = this.options.existingManifest.bots.map((b) => {
                                return b.botId;
                            });
                        }
                        if (this.options.bot) {
                            choices.push(this.options.botid);
                        }
                        return choices;
                    },
                    when: (answers) => {
                        return answers.messageExtensionType == 'existing' && this.options.existingManifest !== undefined;
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
                    validate: (input, answers) => {
                        if (answers && answers.messageExtensionType !== 'external') {
                            let name = lodash.camelCase(input);
                            if (!name.endsWith(`MessageExtension`)) {
                                name += `MessageExtension`;
                            }
                            if (this.fs.exists(`src/app/${name}.ts`)) {
                                return `There's already a file with the name of ${name}.ts`;
                            }
                        }
                        return input.length > 0;
                    },
                },
                {
                    type: 'input',
                    name: 'messageExtensionDescription',
                    message: 'Describe your Message Extension command?',
                    default: (answers) => {
                        return `Description of ${answers.messageExtensionName}`;
                    },
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
                if (!this.options.messageExtensionName.endsWith(`MessageExtension`)) {
                    this.options.messageExtensionName += `MessageExtension`;
                }
                if (answers.messageExtensionType == 'new') {
                    // we need to add the Bot, even though the users did not choose to create one
                    this.options.bot = true;
                    this.options.botid = answers.messageExtensionId;
                    this.options.botType = 'botframework';
                    this.options.botTitle = answers.messageExtensionName + ' Bot';
                    this.options.botName = lodash.camelCase(this.options.botTitle); // TODO: check valid file name here
                }
                else if (answers.messageExtensionType == 'existing') {
                    // reuse the bot id
                    if (this.options.existingManifest) {
                        this.options.messageExtensionId = answers.botId;
                        // if we already have a project, let's find the bot implementation class
                        const project = new ts_simple_ast_1.default();
                        project.addExistingSourceFiles(`${this.destinationRoot()}/src/app/*.ts`);
                        const botClasses = project.getSourceFiles().map(s => {
                            return s.getClasses().map(c => {
                                const dec = c.getDecorator('BotDeclaration');
                                if (dec) {
                                    // arg 2 is the id
                                    const idarg = dec.getArguments()[1];
                                    const idargval = idarg.getText();
                                    if (Guid.isGuid(idargval)) {
                                        return { c: c, id: idargval };
                                    }
                                    else {
                                        // load local environment variable
                                        __webpack_require__(/*! dotenv */ "dotenv").config({
                                            path: `${this.destinationRoot()}${path.sep}.env`
                                        });
                                        const calcval = eval(idargval);
                                        if (!Guid.isGuid(calcval)) {
                                            this.log(chalk.default.red('Unable to continue, as I cannot correlate the Bot Id and the TypeScript class'));
                                            this.log(chalk.default.red('Please verify that you have a valid Guid or a valid environment variable in your BotDeclaration.'));
                                            process.exit(1);
                                        }
                                        return { c: c, id: calcval };
                                    }
                                }
                            }).filter(x => {
                                return x !== undefined;
                            });
                        });
                        const botClass = lodash.flatten(botClasses).find(c => {
                            return c !== undefined && c.id == answers.botId;
                        });
                        if (botClass) {
                            this.options.botName = botClass.c.getName();
                        }
                        else {
                            this.log(chalk.default.red('Unable to continue, as I could not locate the Bot implementation'));
                            this.log(chalk.default.red('Please verify that you have a valid Guid or a valid environment variable in your BotDeclaration.'));
                            process.exit(1);
                        }
                    }
                    else {
                        // we're adding a bot AND an extension
                        this.options.messageExtensionId = this.options.botid;
                    }
                }
                this.options.reactComponents = true;
            });
        }
    }
    writing() {
        if (this.options.messageExtension) {
            let manifestPath = "src/manifest/manifest.json";
            var manifest = this.fs.readJSON(manifestPath);
            if (!manifest.composeExtensions) {
                manifest.composeExtensions = [];
            }
            manifest.composeExtensions.push({
                botId: this.options.messageExtensionId,
                canUpdateConfiguration: true,
                commands: [
                    {
                        id: this.options.messageExtensionName,
                        title: this.options.messageExtensionTitle,
                        description: 'Add a clever description here',
                        initialRun: true,
                        parameters: [
                            {
                                name: 'parameter',
                                description: 'Description of the parameter',
                                title: 'Parameter'
                            }
                        ]
                    }
                ]
            });
            this.fs.writeJSON(manifestPath, manifest);
            // Externally hosted bots does not have an implementation
            if (this.options.messageExtensionType !== "external") {
                let templateFiles = [];
                templateFiles.push("src/app/{messageExtensionName}.ts", "src/app/scripts/{messageExtensionName}Config.tsx", "src/app/web/{messageExtensionName}Config.html");
                templateFiles.forEach(t => {
                    this.fs.copyTpl(this.templatePath(t), Yotilities_1.Yotilities.fixFileNames(t, this.options), this.options);
                });
                Yotilities_1.Yotilities.addAdditionalDeps([
                    ["msteams-ui-components-react", "^0.7.3"],
                    ["react", "^16.1.0"],
                    ["@types/react", "16.4.7"],
                    ["react-dom", "^16.2.0"],
                    ["file-loader", "1.1.11"],
                    ["typestyle", "1.5.1"]
                ], this.fs);
                Yotilities_1.Yotilities.insertTsExportDeclaration("src/app/scripts/client.ts", `./${this.options.messageExtensionName}Config`, `Automatically added for the ${this.options.messageExtensionName} message extension`, this.fs);
                // Yotilities.insertImportDeclaration(
                //     `src/app/${ this.options.botName }.ts`,
                //     this.options.messageExtensionName,
                //     `./${ this.options.messageExtensionName }`,
                //     `Automatically added for the ${ this.options.messageExtensionName } message extension`,
                //     this.fs
                // );
                // Dynamically insert the reference and hook it up to the Bot
                const project = new ts_simple_ast_1.default();
                const file = project.createSourceFile(`src/app/${this.options.botName}.ts`, this.fs.read(`src/app/${this.options.botName}.ts`), {
                    overwrite: true
                });
                const classes = file.getClasses();
                const cl = classes.find(x => {
                    return x.getDecorator('BotDeclaration') != undefined;
                });
                // insert the import statement
                const imports = file.getImportDeclarations();
                const lastImport = imports.length > 0 ? imports[imports.length - 1] : undefined;
                const pos = lastImport !== undefined ? lastImport.getChildIndex() : 0;
                const importDecl = file.insertImportDeclaration(pos, {
                    defaultImport: this.options.messageExtensionName,
                    moduleSpecifier: `./${this.options.messageExtensionName}`,
                });
                let hostimports = imports.filter(i => {
                    return i.getModuleSpecifier().getLiteralText() == 'express-msteams-host';
                });
                if (hostimports.length >= 1) {
                    let alreadyImported = hostimports.filter(i => {
                        return i.getNamedImports().map(n => { return n.getText(); }).indexOf('MessageExtensionDeclaration') != -1;
                    });
                    if (alreadyImported.length == 0) {
                        hostimports[0].addNamedImport(`MessageExtensionDeclaration`);
                    }
                }
                else {
                    const importDecl = file.insertImportDeclaration(pos, {
                        namedImports: [`MessageExtensionDeclaration`],
                        moduleSpecifier: `express-msteams-host`,
                    });
                }
                if (cl) {
                    // add the property
                    const prop = cl.insertProperty(0, {
                        scope: ts_simple_ast_1.Scope.Private,
                        name: `_${this.options.messageExtensionName}`,
                        type: this.options.messageExtensionName,
                        docs: [`Local property for ${this.options.messageExtensionName}`],
                    });
                    // add the decorator
                    prop.addDecorator({
                        name: 'MessageExtensionDeclaration',
                        arguments: [`"${this.options.messageExtensionName}"`]
                    });
                    // hook up the logic in the constructor
                    const constructors = cl.getConstructors();
                    if (constructors.length > 0) {
                        const c = constructors[0];
                        let statements = c.getStatements().filter(s => {
                            return s.getText() == 'super.registerMessageExtensions();';
                        });
                        if (statements.length == 1) {
                            // insert the variable
                            c.insertStatements(statements[0].getChildIndex(), `// Message extension ${this.options.messageExtensionName}
                            this._${this.options.messageExtensionName} = new ${this.options.messageExtensionName}(this.universalBot);`);
                        }
                        else {
                            // insert variable and registrations
                            c.addStatements(`// Message extension ${this.options.messageExtensionName}
                            this._${this.options.messageExtensionName} = new ${this.options.messageExtensionName}(this.universalBot);
                            // Register all messge extensions
                            super.registerMessageExtensions();`);
                        }
                    }
                    else {
                        // TODO: log
                    }
                }
                else {
                    // TODO: log
                }
                file.formatText();
                this.fs.write(`src/app/${this.options.botName}.ts`, file.getFullText());
            }
        }
    }
}
exports.MessageExtensionGenerator = MessageExtensionGenerator;


/***/ }),

/***/ "./src/messageExtension/index.ts":
/*!***************************************!*\
  !*** ./src/messageExtension/index.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
const MessageExtensionGenerator_1 = __webpack_require__(/*! ./MessageExtensionGenerator */ "./src/messageExtension/MessageExtensionGenerator.ts");
module.exports = MessageExtensionGenerator_1.MessageExtensionGenerator;


/***/ }),

/***/ 5:
/*!*********************************************!*\
  !*** multi ./src/messageExtension/index.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\code\github\generator-teams/src/messageExtension/index.ts */"./src/messageExtension/index.ts");


/***/ }),

/***/ "chalk":
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

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

/***/ "ts-simple-ast":
/*!********************************!*\
  !*** external "ts-simple-ast" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ts-simple-ast");

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