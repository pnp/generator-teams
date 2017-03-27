import * as Generator from 'yeoman-generator';
import * as lodash from 'lodash';
import * as chalk from 'chalk';
import { GeneratorTeamTabOptions } from './../app/GeneratorTeamTabOptions';
import { Yotilities } from './../app/Yotilities';


let yosay = require('yosay');
let path = require('path');
let Guid = require('guid');


export class TabGenerator extends Generator {
    options: GeneratorTeamTabOptions;

    public constructor(args: any, opts: any) {
        super(args, opts);
        opts.force = true;
        this.options = opts.options;
        this.desc('Adds a tab to a Teams project.');
    }
    public prompting() {
        if (this.options.tab) {
            return this.prompt(
                [
                    {
                        type: 'input',
                        name: 'tabTitle',
                        message: 'Name of your Tab?',
                        default: this.options.title
                    },
                ]
            ).then((answers: any) => {
                this.options.tabTitle = answers.tabTitle;
                this.options.tabName = lodash.camelCase(this.options.tabTitle);
            });
        }
    }
    public writing() {
        if (this.options.tab) {
            let templateFiles = [
                "src/app/scripts/{tabName}Config.ts",
                "src/app/scripts/{tabName}Tab.ts",
                "src/app/web/{tabName}Tab.html",
                "src/app/web/{tabName}Remove.html",
                "src/app/web/{tabName}Config.html",
            ];

            this.sourceRoot()

            templateFiles.forEach(t => {
                this.fs.copyTpl(
                    this.templatePath(t),
                    Yotilities.fixFileNames(t, this.options),
                    this.options);
            });

            // Update manifest
            let manifestPath = "src/manifest/manifest.json";
            var manifest: any = this.fs.readJSON(manifestPath);
            (<any[]>manifest.tabs).push({
                //id: `${this.options.namespace}.${this.options.tabName}`,
                id: Guid.raw(),
                name: this.options.tabTitle,
                description: {
                    short: `Add a short description for ${this.options.tabTitle} here`,
                    full: `Add a longer description for ${this.options.tabTitle} here`
                },
                icons: {
                    "44": `${this.options.host}/assets/tab-44.png`,
                    "88": `${this.options.host}/assets/tab-88.png`
                },
                accentColor: `#223344`,
                configUrl: `${this.options.host}/${this.options.tabName}Config.html`,
                canUpdateConfig: true
            });
            var tmp: string = this.options.host.substring(this.options.host.indexOf('://') + 3)
            var arr: string[] = tmp.split('.');
            ;
            (<string[]>manifest.validDomains).push(`https://*.${arr.slice(1).join('.')}`)
            this.fs.writeJSON(manifestPath, manifest);

            // update client.ts
            let clientTsPath = "src/app/scripts/client.ts";
            let clientTs = this.fs.read(clientTsPath);
            clientTs += `\n// Added by generator-teams`;
            clientTs += `\nexport * from './${this.options.tabName}Config';`;
            clientTs += `\nexport * from './${this.options.tabName}Tab';`;
            clientTs += `\n`;
            this.fs.write(clientTsPath, clientTs);
            

        }
    }
}