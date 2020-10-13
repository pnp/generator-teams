// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

const config = [{
    entry: {
        app: [
            __dirname + '/src/app/index.ts'
        ],
        bot: [
            __dirname + '/src/bot/index.ts'
        ],
        tab: [
            __dirname + '/src/tab/index.ts'
        ],
        custombot: [
            __dirname + '/src/custombot/index.ts'
        ],
        connector: [
            __dirname + '/src/connector/index.ts'
        ],
        messageExtension: [
            __dirname + '/src/messageExtension/index.ts'
        ],
        localization: [
            __dirname + '/src/localization/index.ts'
        ]

    },
    output: {
        path: __dirname + '/generators/',
        filename: '[name]/index.js',
        libraryTarget: 'commonjs-module'
    },
    externals: nodeModules,
    devtool: 'source-map',
    mode: 'production',
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {}
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: [/lib/, /dist/, /templates/, /temp-templates/],
            use: [{
                loader: "ts-loader"
            }]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/app/templates',
                    to: 'app/templates'
                },
                {
                    from: 'src/tab/templates',
                    to: 'tab/templates'
                },
                {
                    from: 'src/bot/templates',
                    to: 'bot/templates'
                },
                {
                    from: 'src/custombot/templates',
                    to: 'custombot/templates'
                },
                {
                    from: 'src/connector/templates',
                    to: 'connector/templates'
                },
                {
                    from: 'src/messageExtension/templates',
                    to: 'messageExtension/templates'
                }
            ]
        })
    ]
}];


module.exports = config;