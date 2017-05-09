/**
 * Configuration options for the generator
 */
export class GeneratorTeamTabOptions {
    id: string;
    title: string;
    description: string;
    solutionName: string;
    name: string;
    shouldUseSubDir: boolean;
    libraryName: string;
    namespace: string;
    developer: string;
    privacy: string;
    tou: string;
    host: string;
    bot: boolean;
    tab: boolean;
    tabTitle: string;
    tabName: string;
    botid?: string;
    pinnedTab: boolean;
    pinnedTabName: string;
    pinnedTabTitle: string;
    botType: string = "";
    botTitle: string;
    botName: string;
    /* Custom Bot */
    customBot: boolean;
    customBotTitle: string;
    customBotName: string;
}