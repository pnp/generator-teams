// idea borrowed from the Dizz: https://github.com/richdizz/Microsoft-Teams-Tab-Themes/blob/master/app/config.html
export class TeamsTheme {
    static themedStyleSheets = [
        "https://statics.teams.microsoft.com/hashedcss/stylesheets.min-e05e0092.css",
        "https://statics.teams.microsoft.com/hashedcss/stylesheets.theme-contrast.min-669e1eed.css",
        "https://statics.teams.microsoft.com/hashedcss/stylesheets.theme-dark.min-fe14eeb8.css"
    ];

    public static fix() {
        microsoftTeams.initialize();
        microsoftTeams.registerOnThemeChangeHandler(TeamsTheme.themeChanged);
        microsoftTeams.getContext(function (context: any) {
            TeamsTheme.themeChanged(context.theme);
        });
    }
    public static themeChanged(theme: string) {
        if (theme === "default") {
            var css = document.getElementById("themeCSS");
            if (css) {
                css.setAttribute("href", TeamsTheme.themedStyleSheets[0]);
            }
            var body = document.getElementsByTagName("body");
            if (body.length === 1) {
                body[0].style.background = "#fff"; //special case for default
            }
        }
        else if (theme === "contrast") {
            var css = document.getElementById("themeCSS");
            if (css) {
                css.setAttribute("href", TeamsTheme.themedStyleSheets[1]);
            }
            var body = document.getElementsByTagName("body");
             if (body.length === 1) {
                body[0].style.background = "inherit";
            }
        }
        else if (theme === "dark") {
            var css = document.getElementById("themeCSS");
            if (css) {
                css.setAttribute("href", TeamsTheme.themedStyleSheets[2]);
            }
            var body = document.getElementsByTagName("body");
            if (body.length === 1) {
                body[0].style.background = "inherit";
            }
        }
    }
}