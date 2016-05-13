# angular2-ts-boilerplate


This is an minimalist boilerplate for Angular2 development using TypeScript,LESS and Webpack.
It will split your JS application into two parts: 3rd party code and application code.
It will also generate CSS from your LESS code.

It is still a work in progress and will be converted into Yeoman generator once I'm happy with the result.
It lacks any tools for proper unit and e2e testing at the moment and doesn't offer much customization.
But it already provides most useful npm tasks.


## Project initialization

1. npm install
2. typings install


## npm tasks

1. **build** - builds production version of assets, with minification and without source maps.
2. **build:dev** - build development version of assets with debug information and source maps.
3. **server:dev** - starts a watcher process to monitor file changes and rebuild assets on demand.

## TODO

* Add testing tools and tasks (karma, jasmine, protractor).
* Add Babel support for ES6/7 code.
* Convert into Yeoman generator for customizing.
