// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import WebpackDevServer from "webpack-dev-server";
import Webpack from "webpack";
import log from "fancy-log";
import path from "path";

(async () => {
    const webpackConfig = require(path.join(process.cwd(), "webpack.config"));
    const compiler = Webpack(webpackConfig[1]);
    const server = new WebpackDevServer({
        hot: false,
        host: "localhost",
        port: 9000,
        allowedHosts: "all",
        devMiddleware: {
            writeToDisk: true,
            stats: {
                all: false,
                colors: true,
                errors: true,
                warnings: true,
                timings: true,
                entrypoints: true
            }
        }
    }, compiler);

    try {
        await server.start();
    } catch (error) {
        log.error(error);
        throw error;
    }
})();
