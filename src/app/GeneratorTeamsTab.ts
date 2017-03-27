import * as Generator from 'yeoman-generator';
import * as lodash from 'lodash';
import * as chalk from 'chalk';
import { GeneratorTeamTabOptions } from './GeneratorTeamTabOptions';
import { Yotilities } from './Yotilities';

let yosay = require('yosay');
let path = require('path');
let pkg = require('../../package.json');
let Guid = require('guid');

/**
 * The main implementation for the `teams` generator
 */
export class GeneratorTeamsTab extends Generator {
    options: GeneratorTeamTabOptions = new GeneratorTeamTabOptions();

    public constructor(args: any, opts: any) {
        super(args, opts);
        opts.force = true;
        this.desc('Generate a Microsoft Teams extensibility solution.');
        this.argument('solutionName', {
            description: 'Solution name, as well as folder name',
            required: false
        });
    }

    public initializing() {
        this.log(yosay('Welcome to the ' + chalk.yellow(`Microsoft Teams extensibility generator (${pkg.version})`)));
        this.composeWith('teams:tab', { 'options': this.options });
        this.composeWith('teams:bot', { 'options': this.options });
        this.composeWith('teams:custombot', { 'options': this.options });
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
                    message: 'Name of your Microsoft Teams Tab project',
                    default: this.appname
                },
                {
                    type: 'input',
                    name: 'developer',
                    message: 'Your (company) name',
                    default: this.user.git.name,
                    validate: (input: string) => {
                        return input.length > 0 && input.length <= 32;
                    }
                },
                {
                    type: 'input',
                    name: 'host',
                    message: 'The Url where you will host this tab:',
                    default: (answers: any) => {
                        return `https://${lodash.camelCase(answers.solutionName)}.azurewebsites.net`;
                    },
                    validate: Yotilities.validateUrl
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
                            name: 'A Bot framework bot',
                            value: 'bot'
                        },
                        {
                            name: 'A Teams custom bot',
                            value: 'custombot'
                        }
                    ]
                }
            ]
        ).then((answers: any) => {
            this.options.title = answers.name;
            this.options.description = this.description;
            this.options.solutionName = this.options.solutionName || answers.solutionName;
            this.options.shouldUseSubDir = answers.whichFolder === 'subdir';
            this.options.libraryName = lodash.camelCase(this.options.solutionName);
            this.options.developer = answers.developer;
            this.options.host = answers.host;
            var tmp: string = this.options.host.substring(this.options.host.indexOf('://') + 3)
            var arr: string[] = tmp.split('.');
            this.options.namespace = lodash.reverse(arr).join('.');
            this.options.tou = answers.host + '/tou.html';
            this.options.privacy = answers.host + '/privacy.html';
            this.options.bot = (<string[]>answers.parts).indexOf('bot') != -1;
            this.options.tab = (<string[]>answers.parts).indexOf('tab') != -1;
            this.options.customBot = (<string[]>answers.parts).indexOf('custombot') != -1;
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
            "src/app/web/assets/tab-44.png",
            "src/app/web/assets/tab-88.png",
            "src/app/scripts/theme.ts",
            "src/microsoft.teams.d.ts",
            'deploy.cmd',
            '_deployment'
        ]

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
        packages.push(
            'express',
            'express-session',
            'body-parser',
            'morgan',
            '@types/express',
            '@types/express-session',
            '@types/body-parser',
            '@types/morgan'
        );

        if (this.options.botType == 'botframework' || this.options.customBot) {
            packages.push('botbuilder');
        }
        this.npmInstall(packages, { 'save': true });
    }

    public end() {
        this.log(chalk.yellow('Thanks for using the generator'));
        this.log(chalk.yellow('Wictor Wilén, @wictor'));
        this.log(chalk.yellow('Have fun and make great Tabs...'));
    }


}