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
        console.log("webpack compiling");
    });

    const server = new WebpackDevServer(clientConfig.devServer, compiler);

    try {
        await server.start();
    } catch (error) {
        log.error(error);
        throw error;
    }
})();
