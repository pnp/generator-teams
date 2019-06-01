const config = {
    injectSources: [
        "./dist/web/scripts/**/*.js",
        "./dist/web/styles/**/*.css"
    ],
    staticFiles: [
        "./src/app/**/*.html",
        "./src/app/**/*.ejs",
        "./src/app/web/assets/**/*"
    ],
    htmlFiles: [
        "./src/app/**/*.html", "./src/app/**/*.ejs"
    ],
    watches: [
        "./src/**/*.*",
        "!./src/**/*.scss"
    ],
    manifests: [
        "./src/manifest/**/*.*",
        '!**/*.json'
    ],
    temp: [
        "./temp"
    ],
    // Supported Schemas
    SCHEMAS: [{
            version: "1.3",
            schema: "https://developer.microsoft.com/en-us/json-schemas/teams/v1.3/MicrosoftTeams.schema.json"
        },
        {
            version: "1.4",
            schema: "https://developer.microsoft.com/en-us/json-schemas/teams/v1.4/MicrosoftTeams.schema.json"
        },
        {
            version: "devPreview",
            schema: "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json"
        }
    ]
};

module.exports = config;