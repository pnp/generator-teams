import * as Generator from 'yeoman-generator';
import * as lodash from 'lodash';
import * as chalk from 'chalk';
import { GeneratorTeamsAppOptions } from './../app/GeneratorTeamsAppOptions';
import { Yotilities } from './../app/Yotilities';


let yosay = require('yosay');
let path = require('path');
let Guid = require('guid');


export class TabGenerator extends Generator {
    options: GeneratorTeamsAppOptions;

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
                        message: 'Default Tab name? (max 16 characters)',
                        default: this.options.title + ' Tab',
                        validate: (input) => {
                            return input.length > 0 && input.length <= 16;
                        }
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
                "src/app/scripts/{tabName}Config.tsx",
                "src/app/scripts/{tabName}Tab.tsx",
                "src/app/scripts/{tabName}Remove.tsx",
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
            (<any[]>manifest.configurableTabs).push({
                configurationUrl: `${this.options.host}/${this.options.tabName}Config.html`,
                canUpdateConfiguration: true,
                scopes: ["team"]
            });
            var tmp: string = this.options.host.substring(this.options.host.indexOf('://') + 3)
            var arr: string[] = tmp.split('.');
            ;
            (<string[]>manifest.validDomains).push(this.options.host.split("https://")[1]);
            this.fs.writeJSON(manifestPath, manifest);

            Yotilities.addAdditionalDeps([
                ["msteams-ui-components-react", "^0.5.0"],
                ["react", "^16.1.0"],
                ["@types/react", "16.0.38"],
                ["react-dom", "^16.2.0"],
                ["file-loader", "1.1.6"],
                ["typestyle","1.5.1"]
            ], this.fs);

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