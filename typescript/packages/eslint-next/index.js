import baseConf from 'eslint-config-entva-typescript';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';

const [ignoreRule, ...restRules] = baseConf;

const combinedRules = [
  ignoreRule,
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    rules: {
      '@next/next/no-img-element': [0],
      '@typescript-eslint/no-non-null-asserted-optional-chain': [0],
      '@typescript-eslint/no-unnecessary-type-constraint': [0],
    },
  },
  ...restRules,
].map((mutable) => {
  // Forces the same plugin/parser instances across all configs, otherwise ESLint throws on redefinition
  if (mutable.plugins?.['@typescript-eslint']) mutable.plugins['@typescript-eslint'] = typescriptEslint;
  if (mutable.plugins?.react) mutable.plugins.react = react;
  if (mutable.plugins?.['jsx-a11y']) mutable.plugins['jsx-a11y'] = jsxA11Y;
  if (mutable.plugins?.['react-hooks']) mutable.plugins['react-hooks'] = reactHooks;
  if (mutable.plugins?.import) mutable.plugins.import = importPlugin;
  if (mutable.languageOptions?.parser) mutable.languageOptions.parser = tsParser;

  return mutable;
});

export default combinedRules;
