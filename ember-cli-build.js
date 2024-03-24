'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    postcssOptions: {
      compile: {
        cacheInclude: [/.*.(css|hbs)$/, /.tailwind.config.js$/],
        plugins: [
          {
            module: require('postcss-import'),
            options: {
              path: ['node_modules'],
            },
          },
          require('tailwindcss')('./tailwind.config.js'),
        ],
      },
    },
  });

  return app.toTree();
};
