import * as Generator from 'yeoman-generator';

let path = require('path');

const packagePath = "package.json";

/**
 * Utility class for the Generator
 */
export class Yotilities {
    /**
     * Validates a URL
     * @param url Url to validate
     */
    public static validateUrl(url: string) {
        return /(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url);
    }

    /**
     * Renames a file based on passed options
     * @param filename path and name to file
     * @param options object with replacement properties
     */
    public static fixFileNames(filename: string, options: any) {
        if (filename !== undefined) {
            var basename = path.basename(filename);
            if (basename[0] === '_') {
                var filename = '.' + basename.substr(1);
                var dirname = path.dirname(filename);
                filename = path.join(dirname, filename);
            }
            for (var prop in options) {
                if (options.hasOwnProperty(prop) && typeof options[prop] === 'string') {
                    filename = filename.replace(new RegExp("{" + prop + "}", 'g'), options[prop]);
                }
            }
        }

        return filename;
    }

    public static addAdditionalDeps(dependencies: [string, string][], fs: Generator.MemFsEditor) {
        var pkg: any = fs.readJSON(packagePath);
        dependencies.forEach(dep => {
            (<any>pkg.dependencies)[dep[0]] = dep[1];
        });
        fs.writeJSON(packagePath, pkg);
    }
}