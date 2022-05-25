// Copyright (c) Wictor Wilén. All rights reserved.
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as Generator from 'yeoman-generator';
import * as lodash from 'lodash';
import * as chalk from 'chalk';
import { GeneratorTeamsAppOptions } from './../app/GeneratorTeamsAppOptions';
import { Yotilities } from './../app/Yotilities';
import { Project, Scope, Decorator, ClassDeclaration } from "ts-morph";
import * as ts from 'typescript';
import * as path from 'path';
import * as EmptyGuid from '../app/EmptyGuid';
import * as validate from 'uuid-validate';
import { ManifestGeneratorFactory } from '../app/manifestGeneration/ManifestGeneratorFactory';

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
            const generatorPrefix = "[extension]";

            return this.prompt(
                [
                    {
                        type: 'list',
                        name: 'messageExtensionHost',
                        message: 'Where is your message extension hosted?',
                        prefix: generatorPrefix,
                        default: (answers: any) => {
                            if (this.options.botType == 'botframework') {
                                return 'existing';
                            } else {
                                return 'new';
                            }
                        },
                        choices: (answers: any) => {
                            var choices: any[] = [];
                            if (this.options.botType == 'botframework' ||
                                this.options.existingManifest && this.options.existingManifest.bots && this.options.existingManifest.bots.length > 0 ||
                                this.options.existingManifest && this.options.existingManifest.composeExtensions && this.options.existingManifest.composeExtensions.length > 0) {
                                choices.push({
                                    name: 'In a bot or Messaging Extension already defined in this project',
                                    value: 'existing',
                                });
                            } else {
                                choices.push({
                                    name: 'In a new bot',
                                    value: 'new'
                                });
                            }
                            choices.push({
                                name: 'In a bot hosted somewhere else',
                                value: 'external'
                            });
                            return choices;
                        }
                    },
                    {
                        // this is when we are running on an already existin project
                        type: 'list',
                        name: 'botId',
                        message: 'Choose which bot',
                        prefix: generatorPrefix,
                        choices: (answers: any) => {
                            let choices: any[] = [];
                            if (this.options.existingManifest.bots) {
                                // TODO: use AST to find the bot classes as well
                                // Check existing bots
                                choices = this.options.existingManifest.bots.map((b: any) => {
                                    return b.botId;
                                });
                                // check existing compose extensions
                                choices = choices.concat(this.options.existingManifest.composeExtensions.map((b: any) => {
                                    return b.botId;
                                }));
                            }
                            if (this.options.bot) {
                                choices.push(this.options.botid);
                            }
                            return choices.filter((value, index, self) => self.indexOf(value) === index); // only return unique
                        },
                        when: (answers: any) => {
                            return answers.messageExtensionHost == 'existing' && this.options.existingManifest !== undefined
                        }
                    },
                    {
                        type: 'input',
                        name: 'messageExtensionId',
                        prefix: generatorPrefix,
                        message: (answers: any) => {
                            var message = 'What is the Microsoft App ID for the bot used by the Message Extension? ';
                            return message;
                        },
                        default: (answers: any) => {
                            return EmptyGuid.empty;
                        },
                        validate: (input: string) => {
                            return validate(input) || input == EmptyGuid.empty;
                        },
                        when: (answers: any) => {
                            return answers.messageExtensionHost !== 'existing';
                        },
                    },
                    {
                        type: 'list',
                        name: 'messagingExtensionType',
                        message: 'What type of messaging extension command?',
                        prefix: generatorPrefix,
                        choices: [
                            {
                                name: "Search based messaging extension",
                                value: "query"
                            },
                            {
                                name: "Action based messaging extension",
                                value: "action"
                            },
                            {
                                name: "Link unfurling messaging extension",
                                value: "queryLink"
                            }
                        ]
                    },
                    {
                        type: 'checkbox',
                        name: 'messagingExtensionActionContext',
                        message: "What context do you want your action to work from?",
                        prefix: generatorPrefix,
                        choices: [
                            {
                                name: "The compose box",
                                value: "compose",
                                checked: true
                            },
                            {
                                name: "The command box",
                                value: "commandBox",
                                checked: true
                            },
                            {
                                name: "Conversation messages",
                                value: "message"
                            }
                        ],
                        when: (answers: any) => {
                            return answers.messagingExtensionType == "action"
                        }
                    },
                    {
                        type: 'list',
                        name: 'messagingExtensionActionInputType',
                        message: "How would you like to collect information from the user for your action?",
                        prefix: generatorPrefix,
                        choices: [
                            {
                                name: "Using an Adaptive Card",
                                value: "adaptiveCard",
                            },
                            {
                                name: "Using static properties",
                                value: "static",
                            },
                            {
                                name: "Using a Task Module",
                                value: "taskModule"
                            }
                        ],
                        when: (answers: any) => {
                            return answers.messagingExtensionType == "action";
                        }
                    },
                    {
                        type: 'confirm',
                        name: 'messagingExtensionActionResponseTypeConfig',
                        message: "Do you need configuration or authorization when collecting information?",
                        prefix: generatorPrefix,
                        when: (answers: any) => {
                            return answers.messagingExtensionType == "action" && answers.messagingExtensionActionInputType != "static";
                        },
                        default: false
                    },
                    {
                        type: 'confirm',
                        name: 'messagingExtensionCanUpdateConfiguration',
                        message: 'Would you like a Settings option for the messaging extension?',
                        prefix: generatorPrefix,
                        default: (answers: any) => {
                            if (this.options.existingManifest && answers.messageExtensionHost == 'existing') {
                                return false; // if you haven't added it already, we assume you don't want it this time either
                            }
                            return true; // always return true if it's a new project
                        },
                        when: (answers) => {
                            if (this.options.existingManifest && answers.messageExtensionHost == 'existing') {
                                if (this.options.existingManifest.composeExtensions) {
                                    const composeExtension = this.options.existingManifest.composeExtensions.find((c: { botId: any; }) => c.botId == answers.botId);
                                    if (composeExtension && composeExtension.canUpdateConfiguration == false) {
                                        return true; // if we already have not added a config, then it's ok now
                                    }
                                }
                                return false; // there's already some ME with config in the project
                            }
                            return true; // always return true if it's a new project or a new bot
                        }
                    },
                    {
                        type: 'input',
                        name: 'messageExtensionName',
                        message: 'What is the name of your Message Extension command?',
                        prefix: generatorPrefix,
                        default: this.options.title + ' Message Extension',
                        validate: (input: string, answers: any) => {
                            if (!(/^[a-zA-Z].*/.test(input))) {
                                return "Must start with an alphabetical character";
                            }
                            if (answers && answers.messageExtensionHost !== 'external') {
                                let name = lodash.camelCase(input);
                                if (!name.endsWith(`MessageExtension`)) {
                                    name += `MessageExtension`;
                                }
                                let className = name.charAt(0).toUpperCase() + name.slice(1);
                                if (this.fs.exists(`src/server/${name}/${className}.ts`)) {
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
                        prefix: generatorPrefix,
                        default: (answers: any) => {
                            return `Description of ${answers.messageExtensionName}`
                        },
                        validate: (input: string) => {
                            return input.length > 0;
                        }
                    },
                    {
                        type: 'input',
                        name: 'messageExtensionLinkDomains',
                        message: 'Provide a comma separated list of domains for your Message Extension Link Unfurling:',
                        prefix: generatorPrefix,
                        default: '*.contoso.com',
                        validate: (input: string, answers: any) => {
                            if (!(/[\*]?.[\w]*[.[\w]*]*[,]?/gm.test(input))) {
                                return "Must contain a comma separated list of domains";
                            }
                            return input.length > 0;
                        },
                        when: (answers: any) => {
                            return answers.messagingExtensionType == "queryLink"
                        }
                    },
                ]
            ).then((answers: any) => {
                this.options.messageExtensionHost = answers.messageExtensionHost;
                this.options.messageExtensionTitle = answers.messageExtensionName;
                this.options.messageExtensionDescription = answers.messageExtensionDescription;
                this.options.messagingExtensionCanUpdateConfiguration = answers.messagingExtensionCanUpdateConfiguration;
                this.options.messagingExtensionActionResponseTypeConfig = answers.messagingExtensionActionResponseTypeConfig;
                this.options.messageExtensionName = lodash.camelCase(answers.messageExtensionName);
                if (answers.messagingExtensionType) {
                    this.options.messagingExtensionType = answers.messagingExtensionType;
                }
                if (this.options.messagingExtensionType === "action") {
                    this.options.messagingExtensionActionContext = answers.messagingExtensionActionContext;
                    this.options.messagingExtensionActionInputType = answers.messagingExtensionActionInputType;
                    this.options.messagingExtensionActionResponseType = "adaptiveCard";
                }
                if (!this.options.messageExtensionName.endsWith(`MessageExtension`)) {
                    this.options.messageExtensionName += `MessageExtension`;
                }
                if (answers.messageExtensionLinkDomains) {
                    this.options.messageExtensionLinkDomains = answers.messageExtensionLinkDomains.split(",");
                }

                this.options.messageExtensionClassName = this.options.messageExtensionName.charAt(0).toUpperCase() + this.options.messageExtensionName.slice(1);

                if (answers.messageExtensionHost == 'new') {
                    // we need to add the bot, even though the users did not choose to create one
                    this.options.messagingExtensionBot = true;
                    this.options.botid = answers.messageExtensionId;
                    this.options.messageExtensionId = `{{${this.options.botidEnv}}}`;
                    this.options.botType = 'botframework';
                    this.options.botTitle = answers.messageExtensionName + ' Bot';

                    this.options.botName = lodash.camelCase(this.options.botTitle); // TODO: check valid file name here
                    this.options.botClassName = this.options.botName.charAt(0).toUpperCase() + this.options.botName.slice(1);
                } else if (answers.messageExtensionHost == 'existing') {
                    // reuse the bot id

                    if (this.options.existingManifest) {
                        // load local environment variable
                        require('dotenv').config({
                            path: `${this.destinationRoot()}${path.sep}.env`
                        });

                        this.options.messageExtensionId = answers.botId;
                        // if we already have a project, let's find the bot implementation class
                        const project = new Project();
                        project.addSourceFilesAtPaths(`${this.destinationRoot()}/src/server/**/*.ts`);
                        // get all classes that has bots
                        const botClasses = project.getSourceFiles().map(s => {
                            return s.getClasses().map<{ c: ClassDeclaration, id: string } | undefined>(c => {
                                const dec: Decorator | undefined = c.getDecorator('BotDeclaration');
                                if (dec) {
                                    // arg 2 is the id
                                    const idarg = dec.getArguments()[2];
                                    let idargval = idarg.getText();

                                    // check if the idargval has "-characters
                                    if (idargval.startsWith("\"") && idargval.endsWith("\"")) {
                                        idargval = idargval.substr(1, idargval.length - 2);
                                    }
                                    if (validate(idargval) || idargval == EmptyGuid.empty) {
                                        return { c: c, id: idargval };
                                    } else {
                                        if (idargval.startsWith("process.env.")) {
                                            return { c: c, id: `{{${idargval.substring(12)}}}` };
                                        }
                                        if (idargval.startsWith("{") && idargval.endsWith("}")) {
                                            this.log(chalk.red("Please update your bot ID references to use a Guids that are not encapsulated in { and }."));
                                        }
                                        this.log(chalk.red('Unable to continue, as I cannot correlate the bot ID and the TypeScript class'));
                                        this.log(chalk.red('Please verify that you have a valid Guid or a valid environment variable in your BotDeclaration.'));
                                        process.exit(1);
                                    }
                                }
                            }).filter(x => {
                                return x !== undefined;
                            });
                        });
                        let botId: string = answers.botId;
                        const botClass = lodash.flatten(botClasses).find(c => {
                            return c !== undefined && c.id == botId;
                        });
                        if (botClass) {
                            // we need the file name here, because that is what we use and not the actual class name (normally they should be the same though)
                            this.options.botClassName = botClass.c.getSourceFile().getBaseNameWithoutExtension() as string;
                            // we need the directory here and not the actual bot name
                            this.options.botName = botClass.c.getSourceFile().getDirectory().getBaseName() as string;
                        } else {
                            this.log(chalk.red('Unable to continue, as I could not locate the bot implementation'));
                            this.log(chalk.red('Please verify that you have a valid Guid or a valid environment variable in your BotDeclaration.'));
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

            manifestGenerator.updateMessageExtensionManifest(manifest, this.options);

            this.fs.writeJSON(manifestPath, manifest);

            // Externally hosted bots does not have an implementation
            if (this.options.messageExtensionHost !== "external") {
                let templateFiles = [];

                templateFiles.push(
                    "src/server/{messageExtensionName}/{messageExtensionClassName}.ts",
                );
                if (this.options.messagingExtensionCanUpdateConfiguration || this.options.messagingExtensionActionResponseTypeConfig) {
                    templateFiles.push(
                        "src/client/{messageExtensionName}/{messageExtensionClassName}Config.tsx",
                        "src/public/{messageExtensionName}/config.html",
                    );
                }
                // add the task module
                if (this.options.messagingExtensionType == "action" && this.options.messagingExtensionActionInputType === "taskModule") {
                    templateFiles.push(
                        "src/client/{messageExtensionName}/{messageExtensionClassName}Action.tsx",
                        "src/public/{messageExtensionName}/action.html",
                    );
                }

                if (this.options.unitTestsEnabled &&
                    (this.options.messagingExtensionCanUpdateConfiguration || this.options.messagingExtensionActionResponseTypeConfig)) {
                    templateFiles.push(
                        "src/client/{messageExtensionName}/__tests__/{messageExtensionClassName}Config.spec.tsx"
                    );
                }
                if (this.options.unitTestsEnabled) {
                    templateFiles.push(
                        "src/server/{messageExtensionName}/__tests__/{messageExtensionClassName}.spec.ts"
                    );
                }

                templateFiles.forEach(t => {
                    this.fs.copyTpl(
                        this.templatePath(t),
                        Yotilities.fixFileNames(t, this.options),
                        this.options);
                });

                Yotilities.addAdditionalDeps([
                    ["botbuilder-teams-messagingextensions", "1.8.1-preview.1"]
                ], this.fs);

                if (this.options.messagingExtensionCanUpdateConfiguration || this.options.messagingExtensionActionResponseTypeConfig) {
                    Yotilities.insertTsExportDeclaration(
                        "src/client/client.ts",
                        `./${this.options.messageExtensionName}/${this.options.messageExtensionClassName}Config`,
                        `Automatically added for the ${this.options.messageExtensionName} message extension`,
                        this.fs
                    );
                }
                if (this.options.messagingExtensionType == "action" && this.options.messagingExtensionActionInputType == "taskModule") {
                    Yotilities.insertTsExportDeclaration(
                        "src/client/client.ts",
                        `./${this.options.messageExtensionName}/${this.options.messageExtensionClassName}Action`,
                        `Automatically added for the ${this.options.messageExtensionName} message extension action`,
                        this.fs
                    );
                }

                // Dynamically insert the reference and hook it up to the bot
                const project = new Project();
                const file = project.createSourceFile(
                    `src/server/${this.options.botName}/${this.options.botClassName}.ts`,
                    this.fs.read(`src/server/${this.options.botName}/${this.options.botClassName}.ts`), {
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
                        trailingTrivia: writer => { writer.newLine(); writer.newLine(); }, // add a new line after the property to avoid eslint issue
                        //leadingTrivia: writer => writer.newLine(), // add a new line before the property to avoid eslint issue
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
                            cl.insertText(declaration.getPos(), "// eslint:disable-next-line: variable-name\n");
                        }
                    }


                    // hook up the logic in the constructor
                    const constructors = cl.getConstructors();
                    if (constructors.length > 0) {
                        const c = constructors[0];
                        // use index 1, as we need to insert it after the super();
                        c.insertStatements(1, `// Message extension ${this.options.messageExtensionClassName}
                        this._${this.options.messageExtensionName} = new ${this.options.messageExtensionClassName}();`);

                    } else {
                        // TODO: log
                    }
                } else {
                    // TODO: log
                }

                file.formatText();
                this.fs.write(`src/server/${this.options.botName}/${this.options.botClassName}.ts`, file.getFullText());
            }
        }
    }
}
