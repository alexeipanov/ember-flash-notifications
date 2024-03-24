const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './addon/components/**/*.hbs',
    './tests/dummy/app/templates/**/*.hbs',
    './tests/dummy/app/components/**/*.hbs',
  ],
  theme: { ...defaultTheme },
};
