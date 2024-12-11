import baseConfig from 'eslint-config-entva';
import tsConfig from 'eslint-config-entva-typescript-base';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default [
  ...baseConfig,
  ...tsConfig,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    plugins: {
      import: importPlugin,
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
      'import/resolver': {
        node: {
          extensions: ['.mjs', '.js', '.json', '.jsx', '.ts', '.tsx', '.d.ts'],
        },
      },

      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
      },

      'import/extensions': ['.mjs', '.js', '.json', '.jsx', '.ts', '.tsx', '.d.ts'],
      'import/external-module-folders': ['node_modules', 'node_modules/@types'],
      'import/core-modules': [],
      'import/ignore': ['node_modules', '\\.(coffee|scss|css|less|hbs|svg|json)$'],

      react: {
        pragma: 'React',
        version: 'detect',
      },

      propWrapperFunctions: ['forbidExtraProps', 'exact', 'Object.freeze'],
    },

    rules: {},
  },
];
