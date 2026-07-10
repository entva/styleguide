import { mainRule as baseMainRule } from 'eslint-config-entva-base';
import storybook from 'eslint-plugin-storybook';
import importPlugin from 'eslint-plugin-import';

const baseDevDeps = baseMainRule.rules['import/no-extraneous-dependencies'][1].devDependencies;

export const storybookRules = [
  ...storybook.configs['flat/recommended'],
  {
    files: ['**/*.stories.*'],
    rules: {
      'react-hooks/rules-of-hooks': 'off',
    },
  },
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            ...baseDevDeps,
            '**/eslint.*',
            '**/vitest.*',
            '**/*.stories.*',
            '**/.storybook/**',
          ],
          optionalDependencies: false,
        },
      ],
    },
  },
];

export default storybookRules;
