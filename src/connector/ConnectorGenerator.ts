import * as Generator from 'yeoman-generator';
import * as lodash from 'lodash';
import * as chalk from 'chalk';
import { GeneratorTeamsAppOptions } from './../app/GeneratorTeamsAppOptions';
import { Yotilities } from './../app/Yotilities';


let yosay = require('yosay');
let path = require('path');
let Guid = require('guid');


export class ConnectorGenerator extends Generator {
    options: GeneratorTeamsAppOptions;

    public constructor(args: any, opts: any) {
        super(args, opts);
        opts.force = true;
        this.options = opts.options;
        this.desc('Adds a Connector to a Microsoft Teams Apps project');
    }
    public prompting() {
        if (this.options.connector) {
            return this.prompt(
                [
                    {
                        type: 'list',
                        name: 'connectorType',
                        message: 'What type of Connector would you like to include?',
                        default: 'new',
                        choices: [
                            {
                                name: 'An already existing and running Connector (not hosted in this solution)',
                                value: 'existing'
                            },
                            {
                                name: 'A new Connector hosted in this solution',
                                value: 'new'
                            }
                        ]
                    },
                    {
                        type: 'input',
                        name: 'connectorId',
                        message: 'What is the Id of your Connector (found in the Connector portal)?',
                        default: (answers: any) => {
                            return this.options.botid ? this.options.botid : Guid.EMPTY;
                        },
                        validate: (input) => {
                            return Guid.isGuid(input);
                        }
                    },
                    {
                        type: 'input',
                        name: 'connectorName',
                        message: 'What is the name of your Connector?',
                        default: this.options.title,
                        validate: (input) => {
                            return input.length > 0;
                        },
                        when: (answers) => answers.connectorType != 'existing'
                    },
                ]
            ).then((answers: any) => {
                this.options.connectorId = answers.connectorId;
                this.options.connectorType = answers.connectorType;
                this.options.connectorTitle = answers.connectorName;
                this.options.connectorName = lodash.camelCase(answers.connectorName);
            });
        }
    }
    public writing() {
        if (this.options.connector) {
            if (this.options.connectorType != 'existing') {
                let templateFiles = [
                    "README-{connectorName}.md",
                    "src/app/{connectorName}Connector.ts",
                    "src/app/web/{connectorName}Connector.html"
                ];

                this.sourceRoot()

                templateFiles.forEach(t => {
                    this.fs.copyTpl(
                        this.templatePath(t),
                        Yotilities.fixFileNames(t, this.options),
                        this.options);
                });
            }
            let manifestPath = "src/manifest/manifest.json";
            var manifest: any = this.fs.readJSON(manifestPath);
            manifest.connectors.push({
                connectorId: this.options.connectorId,
                scopes: ["team"],
            });
            this.fs.writeJSON(manifestPath, manifest);

            Yotilities.addAdditionalDeps([
                ['request', '2.81.0'],
                ['@types/request', '2.0.0']
            ], this.fs);
        }
    }
}