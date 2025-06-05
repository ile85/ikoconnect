// eslint.config.js
const js = require('@eslint/js');
const globals = require('globals');
const next = require('eslint-plugin-next');
const prettier = require('eslint-config-prettier');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      next,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/jsx-key': 'warn',
    },
  },
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];
