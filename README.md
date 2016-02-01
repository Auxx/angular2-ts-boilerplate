# angular2-ts-boilerplate


This is an advanced boilerplate for Angular2 development using TypeScript, Webpack, LESS and Gulp.
It will split your JS application into two parts: 3rd party code and application code.
It will also generate CSS from your LESS code.

It is still a work in progress and will be converted into Yeoman generator once I'm happy with the result.
It lacks any tools for proper unit and e2e testing at the moment and doesn't offer much customization.
But it already provides most useful Gulp tasks.

## Warning MS Windows users!

[loader-utils](https://github.com/webpack/loader-utils/) (used by webpack and its plugins) has a
[bug](https://github.com/webpack/loader-utils/issues/19) which makes it impossible to use pathname
pattern expansion to automatically load all of the styles defined for your application. You should either
patch the library yourself in *node_modules* folder using a patch in the linked issue or add all of the
stylesheets manually in *src/styles/styles.less*.


## Gulp tasks

1. **build** - builds production version of assets, with minification and without source maps.
2. **build-dev** - build development version of assets with debug information and source maps.
3. **watch-dev** - starts a watcher process to monitor file changes and rebuild assets on demand.
4. **run** - starts a webpack dev server.
5. **clean** - deletes build folder.

## TODO

* Add testing tools and tasks (karma, jasmine, protractor).
* Add Babel support for ES6/7 code.
* Convert into Yeoman generator for customizing.
