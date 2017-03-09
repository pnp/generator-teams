import * as Generator from 'yeoman-generator';
import * as lodash from 'lodash';
import * as chalk from 'chalk';
import { GeneratorTeamTabOptions } from './../app/GeneratorTeamTabOptions';

let yosay = require('yosay');
let path = require('path');
let Guid = require('guid');

export class BotGenerator extends Generator {
    options: GeneratorTeamTabOptions;

    public constructor(args: any, opts: any) {
        super(args, opts);
        opts.force = true;
        this.options = opts.options === undefined ? new GeneratorTeamTabOptions() : opts.options;

        this.desc('Adds a Bot to a Teams Tab project.');
    }

    public prompting() {
        if (this.options.bot) {
            return this.prompt(
                [
                    {
                        type: 'input',
                        name: 'botid',
                        message: 'I need an ID for the bot, which is found in the Bot Framework portal?',
                        validate: (input) => {
                            return Guid.isGuid(input);
                        }
                    },
                ]
            ).then((answers: any) => {
                this.options.botid = answers.botid;
            });
        }
    }

    public writing() {
        if (this.options.bot) {
            let manifestPath = "src/manifest/manifest.json";
            var manifest: any = this.fs.readJSON(manifestPath);
            (<any[]>manifest.bots).push({
                mri: this.options.botid
            });
            this.fs.writeJSON(manifestPath, manifest);
        }
    }
}