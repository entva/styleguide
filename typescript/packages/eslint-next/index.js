import baseConf from 'eslint-config-entva-typescript';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import typescriptEslintOriginal from '@typescript-eslint/eslint-plugin';
import reactOriginal from 'eslint-plugin-react';
import tsParser from '@typescript-eslint/parser';

// Wrap plugins with fixupPluginRules for ESLint 10 compatibility
const typescriptEslint = fixupPluginRules(typescriptEslintOriginal);
const react = fixupPluginRules(reactOriginal);

const [ignoreRule, ...restRules] = baseConf;

// eslint-config-next v16+ provides native flat configs
// Apply fixupConfigRules to patch deprecated API usage
const nextConfigs = fixupConfigRules([...nextCoreWebVitals]);

// Plugins that are defined in both Next.js config and our base rules
// We need to keep our versions to avoid "Cannot redefine plugin" errors
const sharedPlugins = new Set(['react', 'react-hooks', 'import', 'jsx-a11y', '@typescript-eslint']);

// Remove conflicting plugin definitions from Next.js configs
const filteredNextConfigs = nextConfigs.map((config) => {
  if (!config.plugins) return config;

  const filteredPlugins = Object.fromEntries(
    Object.entries(config.plugins).filter(([name]) => !sharedPlugins.has(name)),
  );

  // If all plugins were filtered out, remove the plugins property entirely
  if (Object.keys(filteredPlugins).length === 0) {
    const { plugins, ...rest } = config;
    return rest;
  }

  return { ...config, plugins: filteredPlugins };
});

// Next.js configs first, then our base rules on top
// Our rules supersede anything Next.js provides (later configs override earlier)
const combinedRules = [
  ignoreRule,
  ...filteredNextConfigs,
  ...restRules,
  // Override specific Next.js rules
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    rules: {
      '@next/next/no-img-element': [0],
      '@typescript-eslint/no-non-null-asserted-optional-chain': [0],
      '@typescript-eslint/no-unnecessary-type-constraint': [0],
    },
  },
].map((mutable) => {
  // Forces the same plugins and parser to be used, otherwise ESLint throws
  if (mutable.plugins?.['@typescript-eslint']) mutable.plugins['@typescript-eslint'] = typescriptEslint;
  if (mutable.plugins?.react) mutable.plugins.react = react;
  if (mutable.languageOptions?.parser) mutable.languageOptions.parser = tsParser;

  return mutable;
});

export default combinedRules;
