// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

/**
 * Configuration options for the generator
 */
export class GeneratorTeamsAppOptions {
    id: string;
    title: string;
    description: string;
    solutionName: string;
    packageName: string;
    name: string;
    shouldUseSubDir: boolean;
    libraryName: string;
    'skip-install': string;
    'no-telemetry': string;
    namespace: string;
    developer: string;
    host: string;
    hostname: string;
    bot: boolean;
    tab: boolean;
    tabTitle: string;
    tabName: string;
    tabReactComponentName: string;
    reactComponents: boolean;
    websitePrefix: string;
    /* Bots */
    botid: string = '';
    staticTab: boolean;
    staticTabName: string;
    staticTabTitle: string;
    staticTabClassName: string;
    botType: string = "";
    botTitle: string;
    botName: string;
    botClassName: string;
    /* Outgoing webhook */
    customBot: boolean;
    customBotTitle: string;
    customBotName: string;
    customBotClassName: string;
    /* Connector */
    connector: boolean;
    connectorId: string;
    connectorType: string = '';
    connectorTitle: string;
    connectorName: string;
    connectorComponentName: string;
    /* Message extensions */
    messageExtension: boolean;
    messageExtensionType: string = '';
    messageExtensionTitle: string;
    messageExtensionDescription: string;
    messageExtensionName: string;
    messageExtensionId: string;
    messageExtensionClassName: string;
    /* manifest */
    existingManifest: any;
}