// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as Generator from 'yeoman-generator';
import * as lodash from 'lodash';
import * as chalk from 'chalk';
import { GeneratorTeamsAppOptions } from './../app/GeneratorTeamsAppOptions';
import { Yotilities } from './../app/Yotilities';
import Project, { Scope, Decorator, Node, ClassDeclaration } from "ts-morph";
import * as ts from 'typescript';
import * as path from 'path';
import * as Guid from 'guid';
import { ManifestGeneratorFactory } from '../app/manifestGeneration/ManifestGeneratorFactory';


let yosay = require('yosay');


export class MessageExtensionGenerator extends Generator {
    options: GeneratorTeamsAppOptions;

    public constructor(args: any, opts: any) {
        super(args, opts);
        opts.force = true;
        this.options = opts.options;
        this.desc('Adds a Message Extension to a Microsoft Teams Apps project');
    }
    public prompting() {
        if (this.options.messageExtension) {
            return this.prompt(
                [
                    {
                        type: 'list',
                        name: 'messageExtensionType',
                        message: 'What type of Message Extension would you like to create ',
                        default: (answers: any) => {
                            if (this.options.botType == 'botframework') {
                                return 'existing';
                            } else {
                                return 'new';
                            }
                        },
                        choices: answers => {
                            var choices: any[] = [];
                            choices.push({
                                name: 'For a Bot hosted somewhere else',
                                value: 'external'
                            });
                            if (this.options.botType == 'botframework' || this.options.existingManifest && this.options.existingManifest.bots && this.options.existingManifest.bots.length > 0) {
                                choices.push({
                                    name: 'For a Bot already created in this project',
                                    value: 'existing'
                                });
                            } else {
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
                            let choices: any[] = [];
                            if (this.options.existingManifest.bots) {
                                // TODO: use AST to find the Bot classes as well
                                choices = this.options.existingManifest.bots.map((b: any) => {
                                    return b.botId;
                                })
                            }
                            if (this.options.bot) {
                                choices.push(this.options.botid);
                            }
                            return choices;
                        },
                        when: (answers: any) => {
                            return answers.messageExtensionType == 'existing' && this.options.existingManifest !== undefined
                        }
                    },
                    {
                        type: 'input',
                        name: 'messageExtensionId',
                        message: (answers) => {
                            var message = 'I need the Microsoft App ID for the Bot used by the Message Extension. ';
                            return message;
                        },
                        default: (answers: any) => {
                            return Guid.EMPTY;
                        },
                        validate: (input) => {
                            return Guid.isGuid(input);
                        },
                        when: (answers: any) => {
                            return answers.messageExtensionType !== 'existing';
                        },
                    },
                    {
                        type: 'input',
                        name: 'messageExtensionName',
                        message: 'What is the name of your Message Extension command?',
                        default: this.options.title + ' Message Extension',
                        validate: (input: string, answers) => {
                            if (answers && answers.messageExtensionType !== 'external') {
                                let name = lodash.camelCase(input);
                                if (!name.endsWith(`MessageExtension`)) {
                                    name += `MessageExtension`;
                                }
                                let className = name.charAt(0).toUpperCase() + name.slice(1);
                                if (this.fs.exists(`src/app/${name}/${className}.ts`)) {
                                    return `There's already a file with the name of ${name}/${className}.ts`;
                                }
                            }
                            return input.length > 0 && input.length <= 32;
                        },
                    },
                    {
                        type: 'input',
                        name: 'messageExtensionDescription',
                        message: 'Describe your Message Extension command?',
                        default: (answers: any) => {
                            return `Description of ${answers.messageExtensionName}`
                        },
                        validate: (input: string) => {
                            return input.length > 0;
                        }
                    }
                ]
            ).then((answers: any) => {
                this.options.messageExtensionType = answers.messageExtensionType;
                this.options.messageExtensionTitle = answers.messageExtensionName;
                this.options.messageExtensionDescription = answers.messageExtensionDescription;
                this.options.messageExtensionName = lodash.camelCase(answers.messageExtensionName);

                if (!this.options.messageExtensionName.endsWith(`MessageExtension`)) {
                    this.options.messageExtensionName += `MessageExtension`;
                }

                this.options.messageExtensionClassName = this.options.messageExtensionName.charAt(0).toUpperCase() + this.options.messageExtensionName.slice(1);

                if (answers.messageExtensionType == 'new') {
                    // we need to add the Bot, even though the users did not choose to create one
                    this.options.messagingExtensionBot = true;
                    this.options.botid = answers.messageExtensionId;
                    this.options.messageExtensionId = `{{${this.options.botidEnv}}}`;
                    this.options.botType = 'botframework';
                    this.options.botTitle = answers.messageExtensionName + ' Bot';

                    this.options.botName = lodash.camelCase(this.options.botTitle); // TODO: check valid file name here
                    this.options.botClassName = this.options.botName.charAt(0).toUpperCase() + this.options.botName.slice(1);
                } else if (answers.messageExtensionType == 'existing') {
                    // reuse the bot id

                    if (this.options.existingManifest) {
                        // load local environment variable
                        require('dotenv').config({
                            path: `${this.destinationRoot()}${path.sep}.env`
                        });

                        this.options.messageExtensionId = answers.botId;
                        // if we already have a project, let's find the bot implementation class
                        const project = new Project();
                        project.addExistingSourceFiles(`${this.destinationRoot()}/src/app/**/*.ts`);
                        const botClasses = project.getSourceFiles().map(s => {
                            return s.getClasses().map<{ c: ClassDeclaration, id: string } | undefined>(c => {
                                const dec: Decorator | undefined = c.getDecorator('BotDeclaration');
                                if (dec) {
                                    // arg 2 is the id
                                    const idarg = dec.getArguments()[2];
                                    const idargval = idarg.getText();
                                    if (Guid.isGuid(idargval)) {
                                        return { c: c, id: idargval };
                                    } else {
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
                        })
                        let botId: string = answers.botId;
                        if (!Guid.isGuid(botId)) {
                            try {
                                botId = eval(`process.env.${botId.replace("{{","").replace("}}","")}`);
                            } catch {
                                this.log(chalk.default.yellow(`Unable to find the bot id from: "${botId}"`));
                            }
                        }
                        const botClass = lodash.flatten(botClasses).find(c => {
                            return c !== undefined && c.id == botId;
                        });
                        if (botClass) {
                            this.options.botClassName = botClass.c.getName() as string;
                            this.options.botName = botClass.c.getSourceFile().getBaseNameWithoutExtension() as string;
                        } else {
                            this.log(chalk.default.red('Unable to continue, as I could not locate the Bot implementation'));
                            this.log(chalk.default.red('Please verify that you have a valid Guid or a valid environment variable in your BotDeclaration.'));
                            process.exit(1);

                        }
                    } else {
                        // we're adding a bot AND an extension
                        this.options.messageExtensionId = `{{${this.options.botidEnv}}}`;
                    }
                }
                this.options.reactComponents = true;
            });
        }
    }


    public writing() {
        if (this.options.messageExtension) {
            const manifestGeneratorFactory = new ManifestGeneratorFactory();
            const manifestGenerator = manifestGeneratorFactory.createManifestGenerator(this.options.manifestVersion);
            let manifestPath = "src/manifest/manifest.json";
            var manifest: any = this.fs.readJSON(manifestPath);

            var updateParameters = new Map<string, any>();
            updateParameters.set("messageExtensionName", this.options.messageExtensionName);    
            updateParameters.set("messageExtensionTitle", this.options.messageExtensionTitle);    
            updateParameters.set("messageExtensionId", this.options.messageExtensionId);    
            updateParameters.set("existingManifest", this.options.existingManifest);    
            manifestGenerator.updateMessageExtensionManifest(manifest, updateParameters);

            this.fs.writeJSON(manifestPath, manifest);


            // Externally hosted bots does not have an implementation
            if (this.options.messageExtensionType !== "external") {
                let templateFiles = [];

                templateFiles.push(
                    "src/app/{messageExtensionName}/{messageExtensionClassName}.ts",
                    "src/app/scripts/{messageExtensionName}/{messageExtensionClassName}Config.tsx",
                    "src/app/web/{messageExtensionName}/config.html",
                );

                if(this.options.unitTestsEnabled) {
                    templateFiles.push(
                        "src/app/scripts/{messageExtensionName}/__tests__/{messageExtensionClassName}Config.spec.tsx"
                    );
                }

                templateFiles.forEach(t => {
                    this.fs.copyTpl(
                        this.templatePath(t),
                        Yotilities.fixFileNames(t, this.options),
                        this.options);
                });

                Yotilities.addAdditionalDeps([
                    ["msteams-ui-components-react", "^0.8.1"],
                    ["react", "^16.8.4"],
                    ["@types/react", "16.8.8"],
                    ["react-dom", "^16.8.4"],
                    ["file-loader", "1.1.11"],
                    ["typestyle", "2.0.1"],
                    ["botbuilder-teams-messagingextensions", "1.0.0"]
                ], this.fs);

                Yotilities.insertTsExportDeclaration(
                    "src/app/scripts/client.ts",
                    `./${this.options.messageExtensionName}/${this.options.messageExtensionClassName}Config`,
                    `Automatically added for the ${this.options.messageExtensionName} message extension`,
                    this.fs
                );
 
                // Dynamically insert the reference and hook it up to the Bot
                const project = new Project();
                const file = project.createSourceFile(
                    `src/app/${this.options.botName}/${this.options.botClassName}.ts`, 
                    this.fs.read(`src/app/${this.options.botName}/${this.options.botClassName}.ts`), {
                    overwrite: true
                });

                const classes = file.getClasses()
                const cl = classes.find(x => {
                    return x.getDecorator('BotDeclaration') != undefined;
                });
                // insert the import statement
                const imports = file.getImportDeclarations();
                const lastImport = imports.length > 0 ? imports[imports.length - 1] : undefined;
                const pos = lastImport !== undefined ? lastImport.getChildIndex() : 0;
                const importDecl = file.insertImportDeclaration(pos, {
                    defaultImport: this.options.messageExtensionClassName,
                    moduleSpecifier: `../${this.options.messageExtensionName}/${this.options.messageExtensionClassName}`,
                });
                let hostimports = imports.filter(i => {
                    return i.getModuleSpecifier().getLiteralText() == 'express-msteams-host'
                });
                if (hostimports.length >= 1) {
                    let alreadyImported = hostimports.filter(i => {
                        return i.getNamedImports().map(n => { return n.getText(); }).indexOf('MessageExtensionDeclaration') != -1;
                    });
                    if (alreadyImported.length == 0) {
                        hostimports[0].addNamedImport(`MessageExtensionDeclaration`);
                    }
                } else {
                    const importDecl = file.insertImportDeclaration(pos, {
                        namedImports: [`MessageExtensionDeclaration`],
                        moduleSpecifier: `express-msteams-host`,
                    });
                }

                if (cl) {
                    // add the property
                    const prop = cl.insertProperty(1, {
                        scope: Scope.Private,
                        name: `_${this.options.messageExtensionName}`,
                        type: this.options.messageExtensionClassName,
                        docs: [`Local property for ${this.options.messageExtensionClassName}`],
                    });

                    // add the decorator
                    prop.addDecorator({
                        name: 'MessageExtensionDeclaration',
                        arguments: [`"${this.options.messageExtensionName}"`]
                    });
                    const children = prop.getChildren();
                    if (children && children.length > 0) {
                        const declaration = children.find(c => { return c.getKind() == ts.SyntaxKind.PropertyDeclaration; });
                        if (declaration) {
                            cl.insertText(declaration.getPos(), "// tslint:disable-next-line: variable-name\n");
                        }
                    }


                    // hook up the logic in the constructor
                    const constructors = cl.getConstructors();
                    if (constructors.length > 0) {
                        const c = constructors[0];
                        c.insertStatements(0, `// Message extension ${this.options.messageExtensionClassName}
                        this._${this.options.messageExtensionName} = new ${this.options.messageExtensionClassName}();
                        `);

                    } else {
                        // TODO: log
                    }
                } else {
                    // TODO: log
                }

                file.formatText();
                this.fs.write(`src/app/${this.options.botName}/${this.options.botClassName}.ts`, file.getFullText());
            }
        }
    }
}