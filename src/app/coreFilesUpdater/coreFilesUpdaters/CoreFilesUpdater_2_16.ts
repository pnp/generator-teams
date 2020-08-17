// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { GeneratorTeamsAppOptions } from "../../GeneratorTeamsAppOptions";
import { BaseCoreFilesUpdater } from "../BaseCoreFilesUpdater";
import { Editor } from 'mem-fs-editor';
import * as Generator from 'yeoman-generator';
import * as semver from "semver";
import { Project, PropertyAssignment, SyntaxKind } from 'ts-morph';

export class CoreFilesUpdater_2_16 extends BaseCoreFilesUpdater {
    public constructor(private currentVersion: string) {
        super();
    };

    public updateCoreFiles(options: GeneratorTeamsAppOptions, fs: Editor): boolean {
        // Update gulp.config.js, with new schema
        const project = new Project();
        project.createSourceFile("temp.ts", fs.read("gulp.config.js"));
        const src = project.getSourceFileOrThrow("temp.ts");
        const config = src.getVariableDeclarationOrThrow("config");

        const arr = config.getFirstChildByKind(SyntaxKind.ObjectLiteralExpression);
        if (arr) {
            const manifests = arr.getProperties().find(p => {
                if (p.getKind() == SyntaxKind.PropertyAssignment) {
                    const pa: PropertyAssignment = <any>p;
                    return pa.getName() == "SCHEMAS";
                } else {
                    return false;
                }
            });
            if (manifests) {
                const manifestDecl = manifests.getFirstChildByKind(SyntaxKind.ArrayLiteralExpression);
                if (manifestDecl) {
                    if (semver.lt(this.currentVersion, "2.14.0")) {
                        manifestDecl.addElement(`{
                            version: "1.6",
                            schema: "https://developer.microsoft.com/en-us/json-schemas/teams/v1.6/MicrosoftTeams.schema.json"
                        } `);
                    }
                    manifestDecl.addElement(`{
                        version: "1.7",
                        schema: "https://developer.microsoft.com/en-us/json-schemas/teams/v1.7/MicrosoftTeams.schema.json"
                    } `);
                    fs.write("gulp.config.js", src.getFullText());
                    return true;
                }
            }
        }
        return false;
    }
}