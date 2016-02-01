var path = require('path'),
    webpack = require('webpack'),
    htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(config) {
    var webpackConfig = require('./webpack.config.js'),
        i, plugins = [];

    for(i = 0; i < webpackConfig.plugins.length; i++) {
        if(webpackConfig.plugins[i] instanceof htmlWebpackPlugin) {
            plugins.push(webpackConfig.plugins[i]);
        }
    }

    webpackConfig.debug = true;
    webpackConfig.entry = {};
    webpackConfig.output.path = path.join(__dirname, 'build/tests');
    webpackConfig.devtool = 'source-map';
    webpackConfig.plugins = plugins;
    //webpackConfig.module.loaders = [
    //    {'test': /\.css$/,  'loader' : 'style!css'},
    //    {'test': /\.less$/, 'loader' : 'style!css!less'},
    //    {'test': /\.jpg$/,  'loader' : 'file'},
    //    {'test': /\.gif$/,  'loader' : 'file'},
    //    {'test': /\.png$/,  'loader' : 'file'},
    //    {'test': /\.html$/,  'loaders': ['ngtemplate?relativeTo=/javascript/', 'html']}
    //];

    config.set({
        'basePath': '.',
        'frameworks': ['jasmine'],
        'browsers' : ['PhantomJS'],

        'files': [
            // all files in unit these directories
            'src/app/boot.ts',
            'tests/unit/javascript/**/*.ts',
            'tests/unit/javascript/**/*.js'
        ],

        'preprocessors': {
            // add webpack as preprocessor
            'src/app/boot.ts': ['webpack', 'sourcemap'],
            'tests/unit/javascript/**/*.ts': ['webpack', 'sourcemap'],
            'tests/unit/javascript/**/*.js': ['webpack', 'sourcemap']
        },

        'webpack': webpackConfig,

        'webpackMiddleware': {
            'noInfo': true
        },

        'phantomjsLauncher': {
            'exitOnResourceError': true
        },

        'plugins': [
            require('karma-webpack'),
            require('karma-jasmine'),
            require('karma-phantomjs-launcher'),
            require('karma-sourcemap-loader')
        ]
    });
};
