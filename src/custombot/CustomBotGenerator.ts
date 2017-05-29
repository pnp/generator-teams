import * as Generator from 'yeoman-generator';
import * as lodash from 'lodash';
import * as chalk from 'chalk';
import { GeneratorTeamsAppOptions } from './../app/GeneratorTeamsAppOptions';
import { Yotilities } from './../app/Yotilities';


let yosay = require('yosay');
let path = require('path');
let Guid = require('guid');


export class CustomBotGenerator extends Generator {
    options: GeneratorTeamsAppOptions;

    public constructor(args: any, opts: any) {
        super(args, opts);
        opts.force = true;
        this.options = opts.options;
        this.desc('Adds a custom bot to a Teams project.');
    }
    public prompting() {
        if (this.options.customBot) {
            return this.prompt(
                [
                    {
                        type: 'input',
                        name: 'title',
                        message: 'Name of your custom bot?',
                        default: this.options.title + ' Custom Bot'
                    },
                ]
            ).then((answers: any) => {
                this.options.customBotTitle = answers.title;
                this.options.customBotName = lodash.camelCase(answers.title);
            });
        }
    }
    public writing() {
        if (this.options.customBot) {
            let templateFiles = [
                "README-{customBotName}.md",
                "src/app/{customBotName}.ts"
            ];

            this.sourceRoot()

            templateFiles.forEach(t => {
                this.fs.copyTpl(
                    this.templatePath(t),
                    Yotilities.fixFileNames(t, this.options),
                    this.options);
            });
        }
    }
}