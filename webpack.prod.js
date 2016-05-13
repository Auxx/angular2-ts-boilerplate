const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function(config) {
    config.debug = false;

    config.output.filename      = '[name]-[chunkhash].js';
    config.output.chunkFilename = '[name]-[chunkhash].js';

    config.module.loaders.push({'test': /\.css$/,  'loader': ExtractTextPlugin.extract('style', 'css')});
    config.module.loaders.push({'test': /\.less$/, 'loader': ExtractTextPlugin.extract('style', 'css!less?root=true')});

    config.plugins.push(new webpack.optimize.DedupePlugin());
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        'minimize': true
    }));
};
