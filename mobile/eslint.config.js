const tseslint = require('@typescript-eslint/eslint-plugin');
const noBracedStringProp = require('./eslintPluginCustomRules/noBracedStringProp.js');

module.exports = [
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.jsx'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: 'module',
        globals: {
          console: 'readonly',
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'custom-rules': {
        rules: {
          'no-braced-string-prop': noBracedStringProp,
        },
      },
    },
    rules: {
      'custom-rules/no-braced-string-prop': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-undef': 'off',
    },
  },
];
