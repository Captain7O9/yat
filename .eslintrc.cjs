import react from 'react';

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit',
    '@electron-toolkit/eslint-config-prettier',
  ],
  rules: {
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
  },
};
