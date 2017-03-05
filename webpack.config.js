
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

var config = [
    {
        entry: {
            app: [
                './src/app/index.ts'
            ]
        },
        output: {
            path: './generators',
            filename: '[name]/index.js',
            libraryTarget: 'commonjs-module'
        },
        externals: nodeModules,
        devtool: 'hidden-source-map',
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            alias: {
            }
        },
        target: 'node',
        node: {
            __dirname: false,
            __filename: false,
        },
        module: {
            loaders: [
                {
                    test: /\.tsx?$/,
                    exclude: [/lib/, /dist/, /templates/],
                    loader: "ts-loader"
                }
            ]
        },
        plugins: [
            new CopyWebpackPlugin([{
                from: 'src/app/templates',
                to: 'app/templates'
            }
            ])
        ]
    }
];


module.exports = config;