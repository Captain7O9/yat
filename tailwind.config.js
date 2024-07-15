const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/renderer/**/**/*.{html,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {},
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
