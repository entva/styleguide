import baseConfig from 'eslint-config-entva-base';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import stylisticTs from '@stylistic/eslint-plugin-ts';

const baseRules = baseConfig.reduce((acc, config) => ({ ...acc, ...config.rules }), {});

// Many TS rules mirror JS rules, we need to disable JS rule and apply config for the TS replacement
const getOverrides = (rules, overridePrefix) => rules.reduce((acc, rule) => {
  acc[rule] = ['off'];
  acc[`${overridePrefix}/${rule}`] = baseRules[rule];
  return acc;
}, {});

export default [
  ...baseConfig,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
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
      ...getOverrides(
        [
          'no-array-constructor',
          'no-useless-constructor',
          'no-empty-function',
          'no-dupe-class-members',
          'default-param-last',
          'dot-notation',
          'naming-convention',
          'no-shadow',
        ],
        '@typescript-eslint',
      ),
      ...getOverrides(
        [
          'space-before-function-paren',
          'lines-between-class-members',
          'space-before-blocks',
          'brace-style',
          'indent',
          'keyword-spacing',
          'space-infix-ops',
          'comma-spacing',
          'comma-dangle',
          'object-curly-spacing',
          'quotes',
        ],
        '@stylistic/ts',
      ),

      // Glitchy because of the test rules
      'import/first': ['error'],
      'no-unused-vars': ['off'],
      '@typescript-eslint/no-unused-vars': ['error', {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        caughtErrors: 'none',
      }],

      '@typescript-eslint/no-implied-eval': ['error'],
      '@typescript-eslint/no-loss-of-precision': ['error'],
      '@typescript-eslint/no-loop-func': ['error'],
      '@typescript-eslint/no-magic-numbers': ['off', {
        ignore: [],
        ignoreArrayIndexes: true,
        enforceConst: true,
        detectObjects: false,
      }],

      '@typescript-eslint/no-redeclare': ['error'],
      '@typescript-eslint/no-unused-expressions': ['error', {
        allowShortCircuit: false,
        allowTernary: false,
        allowTaggedTemplates: false,
        enforceForJSX: false,
      }],

      '@typescript-eslint/no-use-before-define': ['error', {
        functions: true,
        classes: true,
        variables: true,
      }],

      '@typescript-eslint/require-await': ['off'],
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],

      '@typescript-eslint/no-explicit-any': ['error', {
        ignoreRestArgs: true,
      }],

      '@typescript-eslint/naming-convention': ['error', {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allowSingleOrDouble',
      }, {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allowSingleOrDouble',
      }, {
        selector: 'typeLike',
        format: ['PascalCase'],
        leadingUnderscore: 'allowSingleOrDouble',
      }],

      '@typescript-eslint/no-extra-parens': ['off', 'all', {
        conditionalAssign: true,
        nestedBinaryExpressions: false,
        returnAssign: false,
        ignoreJSX: 'all',
        enforceForArrowConditionals: false,
      }],

      '@stylistic/ts/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'comma',
        },

        singleline: {
          delimiter: 'comma',
        },
      }],
      '@stylistic/ts/func-call-spacing': ['error', 'never'],
      '@stylistic/ts/no-extra-semi': ['error'],
      '@stylistic/ts/comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
        enums: 'always-multiline',
        generics: 'always-multiline',
        tuples: 'always-multiline',
      }],
    },
  },
  {
    files: [
      '**/*.test.js',
      '**/*.test.cjs',
      '**/*.test.mjs',
      '**/*.test.jsx',
      '**/*.spec.js',
      '**/*.spec.cjs',
      '**/*.spec.mjs',
      '**/*.spec.jsx',
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/__tests__/**',
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'import/first': ['off'],
      'no-unused-vars': ['off'],
      '@typescript-eslint/no-unused-vars': ['off'],
    },
  },
];
