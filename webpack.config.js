var path = require('path'),
    webpack = require('webpack'),
    extractTextPlugin = require("extract-text-webpack-plugin"),
    htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    'entry': {
        'app': 'boot.ts', // Application entry point is boot.ts as per Angular2 best practises.

        'styles': [], // CSS entry point.

        'vendor': [ // Vendor entry point, this allows us to separate 3rd party dependencies from app code.
            'reflect-metadata',
            'angular2/core',
            'angular2/platform/browser'
        ]
    },

    'output': {
        'path': path.join(__dirname, 'build/webpack'),
        'filename': '[name].js'
    },

    'module': {
        'loaders': [ // Loaders for most used file types.
            {'test': /\.ts$/,   'loader': 'ts' },
            // All styles should be exported as a stand-alone CSS files, not embedded in JS.
            {'test': /\.css$/,  'loader': extractTextPlugin.extract('style', 'css')},
            {'test': /\.less$/, 'loader': extractTextPlugin.extract('style', 'css!less')},
            // Small PNG and GIF images should be embedded in CSS as data URI sprites.
            {'test': /\.png$/,  'loader': 'url', 'query': {'limit': 8192, 'mimetype': 'image/png'}},
            {'test': /\.gif$/,  'loader': 'url', 'query': {'limit': 8192, 'mimetype': 'image/png'}},
            // HTML files are used as templates and should be cached inside JS.
            {'test': /\.html$/, 'loader': 'html'},
            // All other files should be copied into static folder as is (Gulp does the copying of static assets).
            {'test': /\.jpg$/,  'loader': 'file'},
            {'test': /\.eot$/,  'loader': 'file'},
            {'test': /\.woff$/, 'loader': 'file'},
            {'test': /\.ttf$/,  'loader': 'file'},
            {'test': /\.svg$/,  'loader': 'file'}
        ]
    },

    'resolve': {
        'root': [
            path.join(__dirname, 'src/app'),     // JS code goes here.
            path.join(__dirname, 'src/less'),    // Styles go here.
            path.join(__dirname, 'src/images'),  // Images go here.
            path.join(__dirname, 'src/static'),  // Static files go here.
            path.join(__dirname, 'node_modules') // 3rd party dependencies are managed by npm.
        ],
        'extensions': ['', '.webpack.js', '.web.js', '.js', '.ts'] // Adding .ts to a list of default file extensions.
    },

    'resolveLoader': { // This configuration tells webpack where to search for tools during build process
        'root': [
            path.join(__dirname, 'node_modules')
        ]
    },

    'plugins': [ // Plugin configuration
        new webpack.optimize.CommonsChunkPlugin('vendor', '[name].js'),
        new extractTextPlugin('[name].css'),
        // If you change auto-generated file names from simple names to hashes etc, then htmlWebpackPlugin
        // will generate correct HTML with all the links for you.
        new htmlWebpackPlugin({
            'filename': 'index.html',
            'template': 'src/static/index.html',
            'inject': 'body'
        })
    ]
}
