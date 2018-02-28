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
    namespace: string;
    developer: string;
    privacy: string;
    tou: string;
    host: string;
    bot: boolean;
    tab: boolean;
    tabTitle: string;
    tabName: string;
    /* Bots */
    botid: string = '';
    staticTab: boolean;
    staticTabName: string;
    staticTabTitle: string;
    botType: string = "";
    botTitle: string;
    botName: string;
    /* Outgoing webhook */
    customBot: boolean;
    customBotTitle: string;
    customBotName: string;
    /* Connector */
    connector: boolean;
    connectorId: string;
    connectorType: string = '';
    connectorTitle: string;
    connectorName: string;
    /* Message extensions */
    messageExtension: boolean;
    messageExtensionType: string = '';
    messageExtensionTitle: string;
    messageExtensionDescription: string;
    messageExtensionName: string;
    messageExtensionId: string;
}