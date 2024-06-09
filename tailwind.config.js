// eslint-disable-next-line no-undef
const defaultTheme = require('tailwindcss/defaultTheme');

// eslint-disable-next-line no-undef
module.exports = {
  content: [
    './addon/components/**/*.hbs',
    './tests/dummy/app/templates/**/*.hbs',
    './tests/dummy/app/components/**/*.hbs',
  ],
  theme: {
    ...defaultTheme,
    extend: {
      fontFamily: {
        header: ['Gilroy', ...defaultTheme.fontFamily.sans],
        base: ['Inter', ...defaultTheme.fontFamily.serif],
        mono: ['NotoSansMono', ...defaultTheme.fontFamily.mono],
      },
    },
  },
};
