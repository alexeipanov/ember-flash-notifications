'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    postcssOptions: {
      compile: {
        cacheInclude: [/.*.(css|hbs)$/, /.tailwind.config.js$/],
        plugins: [
          {
            // eslint-disable-next-line n/no-missing-require
            module: require('postcss-import'),
            options: {
              path: ['node_modules'],
            },
          },
          require('tailwindcss')('./tailwind.config.js'),
        ],
      },
    },

    babel: {
      plugins: [
        [
          'prismjs',
          {
            languages: ['javascript', 'css', 'markup', 'bash'],
            plugins: ['command-line', 'file-highlight'],
            css: true,
          },
        ],
      ],
    },
  });

  app.import('node_modules/prismjs/themes/prism.css');
  return app.toTree();
};
