import * as Generator from 'yeoman-generator';
import * as lodash from 'lodash';
import * as chalk from 'chalk';
import { GeneratorTeamsAppOptions } from './GeneratorTeamsAppOptions';
import { Yotilities } from './Yotilities';
import * as AppInsights from 'applicationinsights';

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
        super(args, opts);
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
        AppInsights.setup('6d773b93-ff70-45c5-907c-8edae9bf90eb');
        AppInsights.client.commonProperties = {
            version: pkg.version
        };
        AppInsights.client.trackEvent('start-generator');
    }

    public initializing() {
        this.log(yosay('Welcome to the ' + chalk.yellow(`Microsoft Teams App generator (${pkg.version})`)));
        this.composeWith('teams:tab', { 'options': this.options });
        this.composeWith('teams:bot', { 'options': this.options });
        this.composeWith('teams:custombot', { 'options': this.options });
        this.composeWith('teams:connector', { 'options': this.options });
        this.composeWith('teams:messageExtension', { 'options': this.options });
    }

    public prompting() {
        return this.prompt(
            [
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
                    validate: (input: string) => {
                        return input.length > 0 && input.length <= 32;
                    }
                },
                {
                    type: 'checkbox',
                    message: 'What do you want to add to your project?',
                    name: 'parts',
                    choices: [
                        {
                            name: 'A Tab',
                            value: 'tab',
                            checked: true
                        },
                        {
                            name: 'A Bot',
                            value: 'bot'
                        },
                        {
                            name: 'An Outgoing Webhook',
                            value: 'custombot'
                        },
                        {
                            name: 'A Connector',
                            value: 'connector'
                        },
                        {
                            name: 'A Message Extension',
                            value: 'messageextension',
                        }
                    ]
                },
                {
                    type: 'input',
                    name: 'host',
                    message: 'The URL where you will host this solution?',
                    default: (answers: any) => {
                        return `https://${lodash.camelCase(answers.solutionName)}.azurewebsites.net`;
                    },
                    validate: Yotilities.validateUrl
                },
            ]
        ).then((answers: any) => {
            answers.host= answers.host.endsWith('/') ? answers.host.substr(0, answers.host.length - 1) : answers.host;
            this.options.title = answers.name;
            this.options.description = this.description;
            this.options.solutionName = this.options.solutionName || answers.solutionName;
            this.options.shouldUseSubDir = answers.whichFolder === 'subdir';
            this.options.libraryName = lodash.camelCase(this.options.solutionName);
            this.options.packageName = this.options.libraryName.toLocaleLowerCase();            
            this.options.developer = answers.developer;
            this.options.host = answers.host;
            var tmp: string = this.options.host.substring(this.options.host.indexOf('://') + 3)
            var arr: string[] = tmp.split('.');
            this.options.namespace = lodash.reverse(arr).join('.');
            this.options.tou = answers.host + '/tou.html';
            this.options.privacy = answers.host + '/privacy.html';
            this.options.bot = (<string[]>answers.parts).indexOf('bot') != -1;
            this.options.tab = (<string[]>answers.parts).indexOf('tab') != -1;
            this.options.connector = (<string[]>answers.parts).indexOf('connector') != -1;
            this.options.customBot = (<string[]>answers.parts).indexOf('custombot') != -1;
            this.options.messageExtension = (<string[]>answers.parts).indexOf('messageextension') != -1;
            this.options.id = Guid.raw();

            if (this.options.shouldUseSubDir) {
                this.destinationRoot(this.destinationPath(this.options.solutionName));
            }
        });
    }

    public configuring() {

    }

    public default() {

    }

    public writing() {

        let staticFiles = [
            "_gitignore",
            "tsconfig.json",
            "tsconfig-client.json",
            "src/manifest/icon-20x20.png",
            "src/manifest/icon-96x96.png",
            "src/app/web/assets/css/msteams-app.css",
            "src/app/web/assets/icon.png",
            "src/app/scripts/theme.ts",
            "src/MicrosoftTeams.d.ts",
            'deploy.cmd',
            '_deployment'
        ]

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

        this.sourceRoot()

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
    }

    public conflicts() {

    }

    public install() {
        if (this.options['skip-install']) {
            this.log(chalk.yellow('Skipping installation of dependencies. You should run "npm install"'));
        } else {
            this.npmInstall();
        }
    }

    public end() {
        this.log(chalk.yellow('Thanks for using the generator!'));
        this.log(chalk.yellow('Have fun and make great Microsoft Teams Apps...'));

        // track usage
        AppInsights.client.trackEvent('end-generator');
        if (this.options.bot) {
            AppInsights.client.trackEvent('bot');
            if (this.options.botType == 'existing') {
                AppInsights.client.trackEvent('bot-existing');
            } else {
                AppInsights.client.trackEvent('bot-new');
            }
        }
        if (this.options.messageExtension) {
            AppInsights.client.trackEvent('messageExtension');
        }
        if (this.options.connector) {
            AppInsights.client.trackEvent('connector');
        }
        if (this.options.customBot) {
            AppInsights.client.trackEvent('customBot');
        }
        if (this.options.staticTab) {
            AppInsights.client.trackEvent('staticTab');
        }
        if (this.options.tab) {
            AppInsights.client.trackEvent('tab');
        }
    }
}