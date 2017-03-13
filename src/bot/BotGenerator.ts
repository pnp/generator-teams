import * as Generator from 'yeoman-generator';
import * as lodash from 'lodash';
import * as chalk from 'chalk';
import { GeneratorTeamTabOptions } from './../app/GeneratorTeamTabOptions';
import { Yotilities } from './../app/Yotilities';


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
                    {
                        type: 'confirm',
                        name: 'pinnedTab',
                        message: 'Do you want to add a pinned tab to your bot?',
                    },
                    {
                        type: 'input',
                        name: 'pinnedTabName',
                        message: 'What is the title of your pinned tab for the bot?',
                        when: (answers: any) => {
                            return answers.pinnedTab;
                        }
                    }
                ]
            ).then((answers: any) => {
                this.options.botid = answers.botid;
                this.options.pinnedTab = answers.pinnedTab;
                this.options.pinnedTabTitle = answers.pinnedTabName;
                this.options.pinnedTabName = lodash.camelCase(answers.pinnedTabName);
            });
        }
    }

    public writing() {
        if (this.options.bot) {

            let templateFiles = [
                "src/app/scripts/{pinnedTabName}Tab.ts",
                "src/app/web/{pinnedTabName}Tab.html",
            ];

            this.sourceRoot()

            templateFiles.forEach(t => {
                this.fs.copyTpl(
                    this.templatePath(t),
                    Yotilities.fixFileNames(t, this.options),
                    this.options);
            });

            let manifestPath = "src/manifest/manifest.json";
            var manifest: any = this.fs.readJSON(manifestPath);
            var newbot = {
                mri: this.options.botid,
                pinnedTabs: (<any>[])
            };
            if (this.options.pinnedTab) {
                newbot.pinnedTabs.push({
                    name: this.options.pinnedTabName
                });
            }
            (<any[]>manifest.bots).push(newbot);
            this.fs.writeJSON(manifestPath, manifest);

            // update client.ts
            let clientTsPath = "src/app/scripts/client.ts";
            let clientTs = this.fs.read(clientTsPath);
            clientTs += `\n// Added by generator-teams-tab`;
            clientTs += `\nexport * from './${this.options.pinnedTabName}Tab';`;
            clientTs += `\n`;
            this.fs.write(clientTsPath, clientTs);
        }
    }
}