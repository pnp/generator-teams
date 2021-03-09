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
    telemetry: boolean;
    namespace: string;
    developer: string;
    host: string;
    hostname: string;
    bot: boolean;
    mpnId?: string = undefined;
    updateBuildSystem: boolean = false;
    showLoadingIndicator: boolean = false;
    isFullScreen: boolean = false;
    quickScaffolding: boolean = true;
    useHttps: boolean = false;

    reactComponents: boolean;
    websitePrefix: string;
    unitTestsEnabled: boolean;
    manifestVersion: string;
    updateManifestVersion: boolean = false; // Set to true when asked to update manifest
    useAzureAppInsights: boolean = false;
    azureAppInsightsKey?: string = undefined;

    /* Tabs */
    tab: boolean;
    tabTitle: string;
    tabName: string;
    tabUpperName: string;
    tabReactComponentName: string;
    tabSharePoint: boolean;
    tabSharePointHosts: string[] = [];
    tabScopes: string[];
    tabType: "configurable" | "static";
    tabSSO: boolean;
    tabSSOAppId: string;
    tabSSOAppUri: string;

    /* Bots */
    botid: string = '';
    botidEnv: string = "MICROSOFT_APP_ID";
    botidEnvSecret: string = "MICROSOFT_APP_PASSWORD";
    staticTab: boolean = false;
    staticTabName: string;
    staticTabTitle: string;
    staticTabClassName: string;
    botType: string = "";
    botTitle: string;
    botName: string;
    botClassName: string;
    botCallingEnabled: boolean = false;
    botFilesEnabled: boolean = false;
    /* Outgoing webhook */
    customBot: boolean;
    customBotTitle: string;
    customBotName: string;
    customBotClassName: string;
    /* Connector */
    connector: boolean;
    connectorId?: string = undefined;
    connectorType: string = '';
    connectorTitle: string;
    connectorName: string;
    connectorComponentName: string;
    /* Message extensions */
    messageExtension: boolean;
    messageExtensionHost: string = '';
    messageExtensionTitle: string;
    messageExtensionDescription: string;
    messageExtensionName: string;
    messageExtensionId: string;
    messageExtensionClassName: string;
    messagingExtensionBot: boolean; // indicates that we need to add a bot to host the messaging extension
    messagingExtensionType: string = "query";
    messagingExtensionActionContext?: string[] = undefined;
    messagingExtensionActionInputType: string | undefined = undefined;
    messagingExtensionActionResponseType?: string;
    messagingExtensionCanUpdateConfiguration: boolean = false;
    messagingExtensionActionResponseTypeConfig: boolean = false;
    /* manifest */
    existingManifest: any;
    /* Localization */
    localization: boolean;
    defaultLanguage: string | undefined;
    additionalLanguage: string | undefined;
}