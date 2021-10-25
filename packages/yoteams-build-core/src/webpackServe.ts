// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import WebpackDevServer from "webpack-dev-server";
import Webpack from "webpack";
import log from "fancy-log";
import path from "path";

(async () => {
    const webpackConfig = require(path.join(process.cwd(), "webpack.config"));
    const clientConfig = webpackConfig[1];
    const compiler = Webpack(clientConfig);

    compiler.hooks.beforeCompile.tap("webpackServe", () => {
        log.info("webpack compiling");
    });

    const defaultDevServerConfig = {
        hot: false,
        host: "localhost",
        port: 9000,
        allowedHosts: "all",
        client: {
            overlay: {
                warnings: false,
                errors: true
            }
        },
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
    };
    const server = new WebpackDevServer(clientConfig.devServer || defaultDevServerConfig, compiler);

    try {
        await server.start();
    } catch (error) {
        log.error(error);
        throw error;
    }
})();
