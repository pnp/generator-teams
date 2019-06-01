// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as Generator from 'yeoman-generator';
import * as lodash from 'lodash';
import * as chalk from 'chalk';
import { GeneratorTeamsAppOptions } from './GeneratorTeamsAppOptions';
import { Yotilities } from './Yotilities';
import * as AppInsights from 'applicationinsights';
import { ManifestGeneratorFactory } from './manifestGeneration/ManifestGeneratorFactory';
import inquirer = require('inquirer');
import { ManifestVersions } from './manifestGeneration/ManifestVersions';

let yosay = require('yosay');
let path = require('path');
let pkg = require('../../package.json');
let Guid = require('guid');

/**
 * The main implementation for the `teams` generator
 */
export class GeneratorTeamsApp extends Generator {
    options: GeneratorTeamsAppOptions = new GeneratorTeamsAppOptions();

    public constructor(args: any, opts: any) {
        super(args, (!(opts.force = true)) || opts);
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
            default: true,
            description: 'Pass usage telemetry, use --no-telemetry to not send telemetry. Note, no personal data is sent.'
        });
        if (this.options.telemetry) {
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

    public initializing() {
        this.log(yosay('Welcome to the ' + chalk.default.yellow(`Microsoft Teams App generator (${pkg.version})`)));
        this.composeWith('teams:tab', { 'options': this.options });
        this.composeWith('teams:bot', { 'options': this.options });
        this.composeWith('teams:custombot', { 'options': this.options });
        this.composeWith('teams:connector', { 'options': this.options });
        this.composeWith('teams:messageExtension', { 'options': this.options });

        // check schema version:
        const isSchemaVersionValid = ManifestGeneratorFactory.isSchemaVersionValid(this.options.existingManifest);
        if (!isSchemaVersionValid) {
            this.log(chalk.default.red('You are running the generator on an already existing project, but on a non supported-schema.'));
            if (this.options.telemetry) {
                AppInsights.defaultClient.trackEvent({ name: 'rerun-generator' });
                AppInsights.defaultClient.trackException({ exception: { name: 'Invalid schema', message: this.options.existingManifest["$schema"] } });
                AppInsights.defaultClient.flush();
            }
            process.exit(1);
        }
    }

    public prompting() {

        interface IAnswers {
            confirmedAdd: boolean;
            solutionName: string;
            whichFolder: string;
            name: string;
            developer: string;
            updateManifestVersion: boolean;
            manifestVersion: string;
            mpnId: string;
            parts: string[];
            host: string;
            unitTestsEnabled: boolean;
            useAzureAppInsights: boolean;
            azureAppInsightsKey: string;
        };
        // find out what manifest versions we can use
        const manifestGeneratorFactory = new ManifestGeneratorFactory();
        const versions: inquirer.objects.ChoiceOption<IAnswers>[] = ManifestGeneratorFactory.supportedManifestVersions.filter(version => {
            // filter out non supprted upgrades
            if (this.options.existingManifest) {
                const manifestGenerator = manifestGeneratorFactory.createManifestGenerator(version.manifestVersion);
                return manifestGenerator.supportsUpdateManifest(this.options.existingManifest.manifestVersion);
            } else {
                return true; // always when not upgrading
            }
        }).map(version => {
            return {
                name: version.manifestVersion,
                value: version.manifestVersion,
                extra: {
                    default: version.default
                }
            };
        })

        // return the question series
        return this.prompt<IAnswers>(
            [
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
                    validate: (input: string) => {
                        return input.length > 0 && input.length <= 32;
                    },
                    when: () => !this.options.existingManifest,
                    store: true
                },
                {
                    type: "confirm",
                    name: "updateManifestVersion",
                    message: `Do you want to change the current manifest version ${this.options.existingManifest && "(" + this.options.existingManifest.manifestVersion + ")"}?`,
                    when: (answers: IAnswers) => this.options.existingManifest && versions.length > 0 && answers.confirmedAdd != false,
                    default: false
                },
                {
                    type: 'list',
                    name: 'manifestVersion',
                    message: 'Which manifest version would you like to use?',
                    choices: versions,
                    default: versions.find((v: inquirer.objects.ChoiceOption<IAnswers>) => v.extra.default) ?
                        versions.find((v: inquirer.objects.ChoiceOption<IAnswers>) => v.extra.default)!.value :
                        (versions[0] ? versions[0].value : ""),
                    when: (answers: IAnswers) => (this.options.existingManifest && answers.updateManifestVersion && versions.length > 0) || (!this.options.existingManifest)
                },
                {
                    type: 'input',
                    name: 'mpnId',
                    message: 'Enter your Microsoft Partner Id, if you have one? (Leave blank to skip)',
                    default: undefined,
                    validate: (input: string) => {
                        return input.length <= 10;
                    },
                    when: (answers) =>{
                        return !this.options.existingManifest && answers.manifestVersion != ManifestVersions.v13 && answers.manifestVersion != ManifestVersions.v14
                    },
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
                            disabled: () => {
                                if (this.options.existingManifest &&
                                    this.options.existingManifest.composeExtensions &&
                                    this.options.existingManifest.composeExtensions[0] &&
                                    this.options.existingManifest.composeExtensions[0].commands) {
                                        // max 10 commands are allowed
                                    return this.options.existingManifest.composeExtensions[0].commands.length >= 10;
                                } else {
                                    return false;
                                }
                            },
                            value: 'messageextension',
                        }
                    ],
                    when: (answers: IAnswers) => answers.confirmedAdd != false
                },
                {
                    type: 'input',
                    name: 'host',
                    message: 'The URL where you will host this solution?',
                    default: (answers: IAnswers) => {
                        return `https://${lodash.camelCase(answers.solutionName).toLocaleLowerCase()}.azurewebsites.net`;
                    },
                    validate: Yotilities.validateUrl,
                    when: () => !this.options.existingManifest,
                },
                {
                    type: 'confirm',
                    name: 'unitTestsEnabled',
                    message: 'Would you like to include Test framework and initial tests?',
                    when: () => !this.options.existingManifest,
                },
                {
                    type: 'confirm',
                    name: 'useAzureAppInsights',
                    message: 'Would you like to use Azure Applications Insights for telemetry?',
                    when: () => !this.options.existingManifest,
                },
                {
                    type: 'input',
                    name: 'azureAppInsightsKey',
                    message: 'What is the Azure Application Insights Instrumentation Key?',
                    default: (answers: IAnswers) => {
                        return Guid.EMPTY;
                    },
                    validate: (input: string) => {
                        return Guid.isGuid(input);
                    },
                    when: (answers: IAnswers) => answers.useAzureAppInsights,
                },
            ]
        ).then((answers: IAnswers) => {
            if (answers.confirmedAdd == false) {
                process.exit(0)
            }
            if (!this.options.existingManifest) {
                // for new projecs
                answers.host = answers.host.endsWith('/') ? answers.host.substr(0, answers.host.length - 1) : answers.host;
                this.options.title = answers.name;
                this.options.description = this.description;
                this.options.solutionName = this.options.solutionName || answers.solutionName;
                this.options.shouldUseSubDir = answers.whichFolder === 'subdir';
                this.options.libraryName = lodash.camelCase(this.options.solutionName);
                this.options.packageName = this.options.libraryName.toLocaleLowerCase();
                this.options.developer = answers.developer;
                this.options.host = answers.host;
                var tmp: string = this.options.host.substring(this.options.host.indexOf('://') + 3);
                this.options.hostname = this.options.host.substring(this.options.host.indexOf('://') + 3).toLocaleLowerCase();
                this.options.manifestVersion = answers.manifestVersion;
                this.options.mpnId = answers.mpnId;
                if(this.options.mpnId && this.options.mpnId.length == 0) {
                    this.options.mpnId = undefined;
                }
                var arr: string[] = tmp.split('.');
                this.options.namespace = lodash.reverse(arr).join('.').toLocaleLowerCase();
                this.options.id = Guid.raw();
                if (this.options.host.indexOf('azurewebsites.net') >= 0) {
                    this.options.websitePrefix = this.options.host.substring(this.options.host.indexOf('://') + 3, this.options.host.indexOf('.'));
                } else {
                    this.options.websitePrefix = '[your Azure web app name]';
                }

                if (this.options.shouldUseSubDir) {
                    this.destinationRoot(this.destinationPath(this.options.solutionName));
                }
            } else {
                // when updating projects
                this.options.developer = this.options.existingManifest.developer.name;
                this.options.title = this.options.existingManifest.name.short;
                let pkg = this.fs.readJSON(`./package.json`);
                this.options.libraryName = pkg.name;
                this.options.host = this.options.existingManifest.developer.websiteUrl;
                this.options.updateManifestVersion = answers.updateManifestVersion;
                this.options.manifestVersion = answers.manifestVersion ? answers.manifestVersion : ManifestGeneratorFactory.getManifestVersionFromValue(this.options.existingManifest.manifestVersion);
            }

            this.options.unitTestsEnabled = answers.unitTestsEnabled;
            this.options.bot = (<string[]>answers.parts).indexOf('bot') != -1;
            this.options.tab = (<string[]>answers.parts).indexOf('tab') != -1;
            this.options.connector = (<string[]>answers.parts).indexOf('connector') != -1;
            this.options.customBot = (<string[]>answers.parts).indexOf('custombot') != -1;
            this.options.messageExtension = (<string[]>answers.parts).indexOf('messageextension') != -1;
            this.options.useAzureAppInsights = answers.useAzureAppInsights;
            this.options.azureAppInsightsKey = answers.azureAppInsightsKey;

            this.options.reactComponents = false; // set to false initially
        });
    }

    public configuring() {

    }

    public default() {

    }

    public writing() {
        this.sourceRoot();

        if (!this.options.existingManifest) {
            let staticFiles = [
                "_gitignore",
                "tsconfig.json",
                "tslint.json",
                "tsconfig-client.json",
                "src/manifest/icon-outline.png",
                "src/manifest/icon-color.png",
                "src/app/web/assets/icon.png",
                "src/app/web/styles/main.scss",
                'deploy.cmd',
                '_deployment',
                "src/app/TeamsAppsComponents.ts"
            ]

            let templateFiles = [
                "README.md",
                "gulpfile.js",
                "gulp.config.js",
                "package.json",
                ".env",
                'src/app/server.ts',
                "webpack.config.js",
                "src/app/scripts/client.ts",
                "src/app/web/index.html",
                "src/app/web/tou.html",
                "src/app/web/privacy.html",
            ];

            // Copy the manifest file with selected manifest version
            const manifestGeneratorFactory = new ManifestGeneratorFactory();
            const manifestGenerator = manifestGeneratorFactory.createManifestGenerator(this.options.manifestVersion);

            this.fs.writeJSON(
                Yotilities.fixFileNames("src/manifest/manifest.json", this.options),
                manifestGenerator.generateManifest(this.options)
            );

            // Add unit tests
            if (this.options.unitTestsEnabled) {
                templateFiles.push(
                    "test-preprocessor.js",
                    "test-setup.js",
                    "test-shim.js"
                );
            }

            templateFiles.forEach(t => {
                this.fs.copyTpl(
                    this.templatePath(t),
                    Yotilities.fixFileNames(t, this.options),
                    this.options);
            });

            staticFiles.forEach(t => {
                this.fs.copy(
                    this.templatePath(t),
                    Yotilities.fixFileNames(t, this.options));
            });
        } else {
            // running the generator on an already existing project
            if (this.options.updateManifestVersion) {
                const manifestGeneratorFactory = new ManifestGeneratorFactory();
                const manifestGenerator = manifestGeneratorFactory.createManifestGenerator(this.options.manifestVersion);
                this.fs.writeJSON(
                    Yotilities.fixFileNames("src/manifest/manifest.json", this.options),
                    manifestGenerator.updateManifest(this.options.existingManifest, this.log)
                );
            }
        }

        // if we have added any react based components
        if (this.options.reactComponents) {
            Yotilities.addAdditionalDeps([
                ["msteams-react-base-component", "1.1.1"]
            ], this.fs);
        }

        if (this.options.useAzureAppInsights) {
            Yotilities.addAdditionalDeps([
                ["applicationinsights", "^1.3.1"]
            ], this.fs);
        }
    }

    public conflicts() {

    }

    public install() {
        // track usage
        if (this.options.telemetry) {
            if (this.options.existingManifest) {
                AppInsights.defaultClient.trackEvent({ name: 'rerun-generator' });
            }
            AppInsights.defaultClient.trackEvent({ name: 'end-generator' });
            if (this.options.bot) {
                AppInsights.defaultClient.trackEvent({
                    name: 'bot',
                    properties: {
                        type: this.options.botType,
                        calling: this.options.botCallingEnabled ? "true" : "false",
                        files: this.options.botFilesEnabled ? "true" : "false",
                    }
                });
                if (this.options.botType == 'existing') {
                    AppInsights.defaultClient.trackEvent({ name: 'bot-existing' });
                } else {
                    AppInsights.defaultClient.trackEvent({ name: 'bot-new' });
                }
                if (this.options.botCallingEnabled) {
                    AppInsights.defaultClient.trackEvent({ name: 'botCalling' });
                }
            }
            if (this.options.messageExtension) {
                AppInsights.defaultClient.trackEvent({
                    name: 'messageExtension',
                    properties: {
                        type: this.options.messagingExtensionType,
                        context: this.options.messagingExtensionActionContext ? this.options.messagingExtensionActionContext.join(";") : "",
                        input: this.options.messagingExtensionActionInputType || "",
                        response: this.options.messagingExtensionActionResponseType || "",
                        canUpdateConfiguration: this.options.messagingExtensionCanUpdateConfiguration ? "true" : "false",
                        inputConfig: this.options.messagingExtensionActionResponseTypeConfig ? "true" : "false"
                    }
                });
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
            if (this.options.unitTestsEnabled) {
                AppInsights.defaultClient.trackEvent({ name: 'unitTests' });
            }
            if (this.options.updateManifestVersion) {
                AppInsights.defaultClient.trackEvent({
                    name: 'udpateManifest',
                    properties: {
                        from: this.options.existingManifest.manifestVersion,
                        to: this.options.manifestVersion
                    }
                });
            }
            AppInsights.defaultClient.flush();
        }

        if (this.options['skip-install']) {
            this.log(chalk.default.yellow('Skipping installation of dependencies. You should run "npm install"'));
        } else {
            this.npmInstall();
        }
    }

    public end() {
        this.log(chalk.default.yellow('Thanks for using the generator!'));
        this.log(chalk.default.yellow('Have fun and make great Microsoft Teams Apps...'));
    }
}