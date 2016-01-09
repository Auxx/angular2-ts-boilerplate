var WEBPACK_PORT_NUMBER = 8000,

    gulp = require('gulp'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackConfig = require('./webpack.config.js'),
    del = require('del'),

    webpackServerInstance = null;

// Build task for prod
gulp.task('default', ['build']);
gulp.task('build', ['copy-static'], function(callback) {
    var config = Object.create(webpackConfig);

    config.plugins = config.plugins.concat(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            'minimize': true
        })
    );

    webpack(config, function(err, stats) {
        if(err) {
            throw new gutil.PluginError('webpack:build', err);
        }

        gutil.log('[build]', stats.toString({'colors': true}));
        callback();
    });
});

// Build task for dev
gulp.task('build-dev', ['copy-static'], function(callback) {
    var config = Object.create(webpackConfig);

    config.debug   = true;
    config.devtool = 'source-map';

    webpack(config, function(err, stats) {
        if(err) {
            throw new gutil.PluginError('webpack:build-dev', err);
        }

        gutil.log('[build-dev]', stats.toString({'colors': true}));
        callback();
    });
});

// Watch task for dev
gulp.task('watch-dev', ['build-dev'], function() {
    gulp.watch(['src/assets/**/*'], ['build-dev']);
});

// Run dev server
gulp.task('run', ['copy-static'], function(callback) {
    var config = Object.create(webpackConfig);

    config.debug   = true;
    config.devtool = 'eval';

    webpackServerInstance = new WebpackDevServer(webpack(config), {
            'publicPath' : '/',
            'contentBase': config.output.path,
            'stats': {
                'colors': true
            }
        }
    );

    // Start a webpack-dev-server
    webpackServerInstance.listen(WEBPACK_PORT_NUMBER, "localhost", function(err) {
            if(err) {
                throw new gutil.PluginError('webpack:dev-server', err);
            }

            gutil.log('[run]', 'Dynamic reload: http://localhost:' + WEBPACK_PORT_NUMBER + '/webpack-dev-server/index.html');
            gutil.log('[run]', 'Static version: http://localhost:' + WEBPACK_PORT_NUMBER + '/index.html');
            callback();
        }
    );
});

// Copy static data like images
gulp.task('copy-static', function() {
    gulp.src(['src/assets/images/**/*']).pipe(gulp.dest('build/webpack/images'));
});

// Clean task
gulp.task('clean', function(done) {
    del(['build'], done);
});
