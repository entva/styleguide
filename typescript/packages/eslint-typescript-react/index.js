import { ignoreRule, mainRule as baseMainRule, testRule as baseTestRule } from 'eslint-config-entva-base';
import { mainRule as reactMainRule } from 'eslint-config-entva';
import { mainRule as tsMainRule, testRule as tsTestRule } from 'eslint-config-entva-typescript-base';
import { fixupPluginRules } from '@eslint/compat';
import typescriptEslintOriginal from '@typescript-eslint/eslint-plugin';
import reactOriginal from 'eslint-plugin-react';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';

// Wrap plugins with fixupPluginRules for ESLint 10 compatibility
export const typescriptEslint = fixupPluginRules(typescriptEslintOriginal);
export const react = fixupPluginRules(reactOriginal);

export const mainRule = {
  files: ['**/*.{ts,tsx}'],
  plugins: {
    react,
    'jsx-a11y': jsxA11Y,
    'react-hooks': reactHooks,
    import: importPlugin,
    '@typescript-eslint': typescriptEslint,
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
    ...reactMainRule.rules,
    'react/jsx-filename-extension': ['error', {
      extensions: ['.jsx', '.tsx'],
    }],
  },
};

// Ensure all configs use the same wrapped plugins to avoid "Cannot redefine plugin" errors
const configs = [
  ignoreRule,
  baseMainRule,
  tsMainRule,
  reactMainRule,
  mainRule,
  baseTestRule,
  tsTestRule,
].map((config) => {
  if (!config.plugins) return config;

  const newPlugins = { ...config.plugins };
  if (newPlugins['@typescript-eslint']) newPlugins['@typescript-eslint'] = typescriptEslint;
  if (newPlugins.react) newPlugins.react = react;

  return { ...config, plugins: newPlugins };
});

export default configs;
