const webpack = require('webpack');

module.exports = function(config) {
    config.debug     = true;
    config.devtool   = 'source-map';
    
    config.devServer = {
        'outputPath': config.output.path,
        'hot'       : true
    };
    
    config.module.loaders.push({'test': /\.css$/,  'loader': 'style!css'});
    config.module.loaders.push({'test': /\.less$/,  'loader': 'style!css!less?root=true'});
};
