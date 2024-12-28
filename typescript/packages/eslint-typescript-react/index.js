import baseConfig from 'eslint-config-entva';
import tsConfig from 'eslint-config-entva-typescript-base';
import react from 'eslint-plugin-react';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import stylisticTs from '@stylistic/eslint-plugin-ts';

// ESLint 9 is shit at merging config rules so we have to do it by hand.
// Thanks ESLint <3
const baseRules = [...baseConfig, ...tsConfig].reduce((acc, config) => ({
  ...acc, ...config.rules,
}), {});

export default [
  ...baseConfig,
  ...tsConfig,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react,
      'jsx-a11y': jsxA11Y,
      'react-hooks': reactHooks,
      import: importPlugin,
      '@typescript-eslint': typescriptEslint,
      '@stylistic/ts': stylisticTs,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: './tsconfig.json',

        ecmaFeatures: {
          generators: false,
          objectLiteralDuplicateProperties: false,
          jsx: true,
        },
      },
    },

    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
      },

      'import/resolver': {
        node: {
          extensions: ['.js', '.mjs', '.cjs', '.jsx', '.ts', '.tsx', '.d.ts', '.json'],
        },
      },

      'import/extensions': ['.js', '.mjs', '.cjs', '.jsx', '.ts', '.tsx', '.d.ts', '.json'],
      'import/external-module-folders': ['node_modules', 'node_modules/@types'],
      'import/core-modules': [],
      'import/ignore': ['node_modules', '\\.(coffee|scss|css|less|hbs|svg|json)$'],

      react: {
        pragma: 'React',
        version: 'detect',
      },

      propWrapperFunctions: ['forbidExtraProps', 'exact', 'Object.freeze'],
    },

    rules: {
      ...baseRules,
      'import/first': ['error'],
      'no-unused-vars': ['off'],
      '@typescript-eslint/no-unused-vars': ['error', {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        caughtErrors: 'none',
      }],
      'react/jsx-filename-extension': ['error', {
        extensions: ['.jsx', '.tsx'],
      }],
    },
  },
];
