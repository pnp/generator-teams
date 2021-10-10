// Licensed under the MIT license.
// SPDX-License-Identifier: MIT

import WebpackDevServer from "webpack-dev-server";
import Webpack from "webpack";
import log from "fancy-log";
import path from "path";
import merge from "lodash.merge";

(async () => {
    const webpackConfig = require(path.join(process.cwd(), "webpack.config"));
    const feWebpackConfig: Webpack.Configuration = webpackConfig[1];
    let defaultDevServerConfig: WebpackDevServer.Configuration = {
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

    if (feWebpackConfig.devServer) {
        defaultDevServerConfig = merge(defaultDevServerConfig, feWebpackConfig.devServer);
    }

    const compiler = Webpack(feWebpackConfig);
    const server = new WebpackDevServer(defaultDevServerConfig, compiler);

    try {
        await server.start();
    } catch (error) {
        log.error(error);
        throw error;
    }
})();
