import baseConf, { mainRule as baseMainRule } from 'eslint-config-entva-typescript';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const [ignoreRule, ...restRules] = baseConf;
const { plugins: basePlugins, languageOptions: { parser: tsParser } } = baseMainRule;

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
  // Forces the same plugin/parser instances from baseConf across all configs,
  // otherwise ESLint throws on redefinition
  if (mutable.plugins) {
    Object.keys(mutable.plugins).forEach((name) => {
      if (basePlugins[name]) mutable.plugins[name] = basePlugins[name];
    });
  }
  if (mutable.languageOptions?.parser) mutable.languageOptions.parser = tsParser;

  return mutable;
});

export default combinedRules;
