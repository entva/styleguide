import baseConf from 'eslint-config-entva-typescript';
import { FlatCompat } from '@eslint/eslintrc';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const [ignoreRule, ...restRules] = baseConf;

const combinedRules = [
  ignoreRule,
  ...compat.config({ extends: ['next/core-web-vitals', 'next/typescript'] }),
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
  // Forces the same parser to be used, otherwise ESLint throws
  if (mutable.plugins?.['@typescript-eslint']) mutable.plugins['@typescript-eslint'] = typescriptEslint;
  if (mutable.languageOptions?.parser) mutable.languageOptions.parser = tsParser;

  return mutable;
});

export default combinedRules;
