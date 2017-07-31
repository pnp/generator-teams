/**
 * Configuration options for the generator
 */
export class GeneratorTeamsAppOptions {
    id: string;
    title: string;
    description: string;
    solutionName: string;
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
    botid?: string;
    staticTab: boolean;
    staticTabName: string;
    staticTabTitle: string;
    botType: string = "";
    botTitle: string;
    botName: string;
    /* Custom Bot */
    customBot: boolean;
    customBotTitle: string;
    customBotName: string;
    /* Connector */
    connector: boolean;
    connectorId: string;
    connectorType: string = '';
    connectorTitle: string;
    connectorName: string;
    /* Compose extensions */
    composeExtension: boolean;
    composeExtensionType: string = '';
    composeExtensionTitle: string;
    composeExtensionDescription: string;
    composeExtensionName: string;
    composeExtensionId: string;
}