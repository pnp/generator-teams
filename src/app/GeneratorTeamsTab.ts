import * as Generator from 'yeoman-generator';
import * as lodash from 'lodash';
import * as chalk from 'chalk';

let yosay = require('yosay');
let path = require('path');

export class GeneratorTeamsTab extends Generator {
    solutionName: string;
    name: string;
    shouldUseSubDir: boolean;
    libraryName: string;
    shouldUseAzure: boolean;
    shouldUseExpress: boolean;
    namespace: string;
    developer: string;
    privacy: string;
    tou: string;
    host: string;

    public constructor(args: any, opts: any) {
        super(args, opts);
        opts.force = true;
        this.desc('Generate a Microsoft Teams Tab solution.');
        this.argument('solutionName', {
            description: 'Solution name, as well as folder name',
            required: false
        });
    }

    public initializing() {
        this.log(yosay('Welcome to the ' + chalk.yellow('Microsoft Teams Tab generator')));
    }
    
    public prompting() {
        return this.prompt(
            [
                {
                    type: 'input',
                    name: 'solutionName',
                    default: lodash.kebabCase(this.appname),
                    when: () => !this.solutionName,
                    message: 'What is your solution name?'
                },
                {
                    type: 'list',
                    name: 'whichFolder',
                    default: 'current',
                    when: () => !this.solutionName,
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
                    validate: (input: string) => {
                        return input.length > 0;
                    }
                },
                {
                    type: 'input',
                    name: 'host',
                    message: 'The Url where you will host this tab:',
                    default: (answers: any) => {
                        return `https://${answers.name}.azurewebsites.net`;
                    },
                    validate: this.validateUrl
                },
                {
                    type: 'input',
                    name: 'privacy',
                    message: 'Your privacy url:',
                    default: (answers: any) => {
                        return answers.host + '/privacy.html'
                    },
                    validate: this.validateUrl
                },
                {
                    type: 'input',
                    name: 'tou',
                    message: 'Your terms of use url:',
                    default: (answers: any) => {
                        return answers.host + '/tou.html'
                    },
                    validate: this.validateUrl
                },
                {
                    type: 'input',
                    name: 'namespace',
                    message: 'Enter the namespace of your Tab',
                    default: (answers: any) => {
                        var tmp: string = answers.host.substring(answers.host.indexOf('://') + 3)
                        var arr: string[] = tmp.split('.');
                        return lodash.reverse(arr).join('.')
                    },
                    validate: (input) => {
                        if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9]{2,})+$/.test(input)) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                {
                    type: 'confirm',
                    name: 'express',
                    message: 'Would you like to use Express to host your Tabs?'
                },
                {
                    type: 'confirm',
                    name: 'azure',
                    message: 'Would you like to include settings for Azure deployment?'
                }
            ]
        ).then((answers: any) => {
            this.solutionName = this.solutionName || answers.solutionName;
            this.shouldUseSubDir = answers.whichFolder === 'subdir';
            this.shouldUseAzure = <boolean>(answers.azure);
            this.shouldUseExpress = <boolean>(answers.express);
            this.libraryName = lodash.camelCase(this.solutionName);
            this.namespace = answers.namespace;
            this.developer = answers.developer;
            this.host = answers.host;
            this.tou = answers.tou;
            this.privacy = answers.privacy;
            if (this.shouldUseSubDir) {
                this.destinationRoot(this.destinationPath(this.solutionName));
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
            "src/manifest/tab-44.png",
            "src/manifest/tab-88.png",
            "src/microsoft.teams.d.ts"
        ]
        let templateFiles = [
            "README.md",
            "gulpfile.js",
            "package.json",
            "src/manifest/manifest.json",
            "webpack.config.js",
            "src/app/scripts/client.ts",
            "src/app/scripts/config.ts",
            "src/app/scripts/tab.ts",
            "src/app/scripts/theme.ts",
            "src/app/web/index.html",
            "src/app/web/tab.html",
            "src/app/web/remove.html",
            "src/app/web/tou.html",
            "src/app/web/config.html",
            "src/app/web/privacy.html"

        ];
        if (this.shouldUseAzure) {
            staticFiles.push(
                'deploy.cmd',
                '_deployment'
            );
        }
        if (this.shouldUseExpress) {
            staticFiles.push(
                'src/app/server.ts'
            )
        }

        let substitutions = {
            title: this.appname,
            description: this.description,
            namespace: this.namespace,
            libraryName: this.libraryName,
            developer: this.developer,
            privacy: this.privacy,
            tou: this.tou,
            host: this.host,
            shouldUseExpress: this.shouldUseExpress,
            appname: this.appname
        };

        this.sourceRoot()

        templateFiles.forEach(t => {
            this.fs.copyTpl(
                this.templatePath(t),
                this.fixFileNames(t),
                substitutions);
        });
        staticFiles.forEach(t => {
            this.fs.copy(
                this.templatePath(t),
                this.fixFileNames(t));
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
            'run-sequence'
        ];

        if (this.shouldUseExpress) {
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
        }
        this.npmInstall(packages, { 'save': true });
    }

    public end() {
        this.log(chalk.yellow('Thanks for using the generator'));
        this.log(chalk.yellow('Wictor Wilén, @wictor'));
        this.log(chalk.yellow('Have fun and make great Tabs...'));
    }

    private validateUrl(url: string) {
        return /(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url);
    }

    public fixFileNames(filename: string) {
        if (filename !== undefined) {
            var basename = path.basename(filename);
            if (basename[0] === '_') {
                var filename = '.' + basename.substr(1);
                var dirname = path.dirname(filename);
                filename = path.join(dirname, filename);
            }
        }
        return filename
    }
}