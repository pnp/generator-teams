import * as path from 'path';
import * as npmRun  from 'npm-run';

export const DEPENDENCIES = [
    '../../../generators/tab',
    '../../../generators/bot',
    '../../../generators/connector',
    '../../../generators/custombot',
    '../../../generators/messageExtension',
    '../../../generators/localization'
];

export const GENERATOR_PATH = path.join(__dirname, '../../generators/app');
export const TEMP_GENERATOR_PATTERN = './temp-templates/**/*.*';
export const TEMP_TAB_GENERATOR_PATH = path.join(__dirname, '../../temp-templates/tab');
export const TEMP_BOT_GENERATOR_PATH = path.join(__dirname, '../../temp-templates/bot');
export const TEMP_MESSAGEEXTSION_GENERATOR_PATH = path.join(__dirname, '../../temp-templates/messageExtension');
export const TEMP_CONNECTOR_GENERATOR_PATH = path.join(__dirname, '../../temp-templates/connector');
export const TEMP_CUSTOMBOT_GENERATOR_PATH = path.join(__dirname, '../../temp-templates/custombot');
export const TEMP_LOCALIZATION_GENERATOR_PATH = path.join(__dirname, '../../temp-templates/localization');

export const ROOT_FILES = [
    '.gitignore',
    'gulpfile.js',
    'package.json',
    'README.md',
    'tslint.json',
    'webpack.config.js',
    'Dockerfile'
];

export const TEST_FILES = [
    'test-setup.js',
    'test-shim.js'
];

export const MANIFEST_FILES = [
    'src/manifest/icon-color.png',
    'src/manifest/icon-outline.png',
    'src/manifest/manifest.json',
];

export const WEB_FILES = [
    'src/public/assets/icon.png',
    'src/public/index.html',
    'src/public/privacy.html',
    'src/public/tou.html',
    "src/public/styles/main.scss"
];

export const APP_FILES = [
    'src/server/server.ts',
    'src/server/TeamsAppsComponents.ts',
    "src/server/tsconfig.json"
];

export const SCRIPT_FILES = [
    'src/client/client.ts',
    "src/client/tsconfig.json"
];



export async function runNpmCommand(command: string, path: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        npmRun.exec(command,{cwd: path}, 
            function (err: any, stdout: any, stderr: any) {
                if(err) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
    });
}

export const CONNECTOR_THEME_URL = "https://{{HOSTNAME}}/connectortest01Connector/config.html?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}";

export const SCHEMA_18 = 'https://developer.microsoft.com/en-us/json-schemas/teams/v1.8/MicrosoftTeams.schema.json';
export const SCHEMA_DEVPREVIEW = 'https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json';

export enum TestTypes {
    UNIT = "UNIT",
    INTEGRATION = "INTEGRATION"
}