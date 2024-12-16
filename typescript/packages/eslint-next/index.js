import baseConf from 'eslint-config-entva-typescript';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default [
  ...compat.config({ extends: ['next/core-web-vitals', 'next/typescript'] }),
  ...baseConf,
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    rules: {
      '@next/next/no-img-element': [0],
      '@typescript-eslint/no-non-null-asserted-optional-chain': [0],
      '@typescript-eslint/no-unnecessary-type-constraint': [0],
    },
  },
];
