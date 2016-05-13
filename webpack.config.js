const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LessPluginGlob = require('less-plugin-glob');

const allowedEnvironments = [
    'dev', 'prod', 'test'
];

var argv = require('yargs').argv,
    ENV = argv.hasOwnProperty('ENV') ? argv.ENV : allowedEnvironments[0],
    envConfig;

if(allowedEnvironments.indexOf(ENV) < 0) {
    ENV = allowedEnvironments[0];
}

envConfig = require('./webpack.' + ENV + '.js');

var config = {
    'entry': {
        'app': [
            'boot.ts'
        ],

        'styles': [ // CSS entry point.
            'main.less'
        ],

        'vendor': [
            'es6-shim',
            'rxjs',
            'zone.js',
            'reflect-metadata'
        ]
    },

    'output': {
        'path'      : path.join(__dirname, 'build', ENV),
        'filename'  : '[name].js'
    },

    'resolve': {
        'extensions': ['', '.webpack.js', '.web.js', '.js', '.ts'],
        'root': [
            path.join(__dirname, 'src/app'),
            path.join(__dirname, 'src/styles'),
        ],
        'modulesDirectories': [
            path.join(__dirname, 'node_modules')
        ]
    },

    'module': {
        'preLoaders': [
            {
                'test'   : /\.ts$/,
                'loader' : 'tslint-loader',
                'exclude': [
                    path.join(__dirname, 'node_modules')
                ]
            }
        ],

        'loaders': [
            {'test': /\.ts$/,   'loader': 'awesome-typescript-loader', 'exclude': [/\.(spec|e2e)\.ts$/]},
            {'test': /\.json$/, 'loader': 'json-loader'},
            {'test': /\.png$/,  'loader': 'url', 'query': {'limit': 8192, 'mimetype': 'image/png'}},
            {'test': /\.jpg$/,  'loader': 'file'},
            {'test': /\.gif$/,  'loader': 'file'},
            {'test': /\.eot$/,  'loader': 'file'},
            {'test': /\.woff$/, 'loader': 'file'},
            {'test': /\.woff2$/,'loader': 'file'},
            {'test': /\.ttf$/,  'loader': 'file'},
            {'test': /\.svg$/,  'loader': 'file'},
            {'test': /\.html$/, 'loader': 'raw'}
        ]
    },

    'plugins': [
        new webpack.optimize.CommonsChunkPlugin('vendor', '[name].js'),

        new ExtractTextPlugin('[name].css'),

        new ForkCheckerPlugin(),

        new CopyWebpackPlugin.default([{
            'from': 'src/assets',
            'to'  : 'assets'
        }]),

        new HtmlWebpackPlugin({
            'filename': 'index.html',
            'template': 'src/app/index.html',
            'inject': 'body'
        })
    ],

    'lessLoader': {
        'lessPlugins': [
            LessPluginGlob
        ]
    }
};

envConfig(config);

module.exports = config;
