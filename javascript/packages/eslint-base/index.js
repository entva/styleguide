import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default [
  {
    // Base configuration
    files: ['**/*.js', '**/*.mjs', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es6,
      },
      parserOptions: {
        ecmaFeatures: {
          generators: false,
          objectLiteralDuplicateProperties: false,
        },
      },
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.mjs', '.js', '.json'],
        },
      },
      'import/extensions': ['.js', '.mjs', '.jsx'],
      'import/core-modules': [],
      'import/ignore': [
        'node_modules',
        '\\.(coffee|scss|css|less|hbs|svg|json)$',
      ],
    },
  },

  // Base rules from eslint:recommended
  js.configs.recommended,

  // Import plugin configuration
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      // Import plugin rules
      'import/no-named-as-default': 'off',
      'import/no-dynamic-require': 'off',
      'import/prefer-default-export': 'off',
      'import/extensions': ['off', 'ignorePackages', {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
      }],
      'import/no-unresolved': ['off', {
        commonjs: true,
        caseSensitive: true,
        caseSensitiveStrict: false,
      }],
      'import/named': 'error',
      'import/default': 'off',
      'import/namespace': 'off',
      'import/export': 'error',
      'import/no-named-as-default-member': 'error',
      'import/no-deprecated': 'off',
      'import/no-extraneous-dependencies': ['error', {
        devDependencies: [
          'test/**', 'tests/**', 'spec/**',
          '**/__tests__/**', '**/__mocks__/**',
          'test.{js,jsx}', 'test-*.{js,jsx}',
          '**/*{.,_}{test,spec}.{js,jsx}',
          '**/jest.config.js', '**/jest.setup.js',
          '**/vue.config.js',
          '**/webpack.config.js', '**/webpack.config.*.js',
          '**/rollup.config.js', '**/rollup.config.*.js',
          '**/gulpfile.js', '**/gulpfile.*.js',
          '**/Gruntfile{,.js}',
          '**/protractor.conf.js', '**/protractor.conf.*.js',
          '**/karma.conf.js',
          '**/.eslintrc.js',
        ],
        optionalDependencies: false,
      }],
      'import/no-mutable-exports': 'error',
      'import/no-commonjs': 'off',
      'import/no-amd': 'error',
      'import/no-nodejs-modules': 'off',
      'import/first': 'error',
      'import/imports-first': 'off',
      'import/no-duplicates': 'error',
      'import/no-namespace': 'off',
      'import/order': ['error', {
        groups: [['builtin', 'external', 'internal']],
        distinctGroup: true,
        warnOnUnassignedImports: false,
      }],
      'import/newline-after-import': 'error',
      'import/no-restricted-paths': 'off',
      'import/max-dependencies': ['off', { max: 10 }],
      'import/no-absolute-path': 'error',
      'import/no-internal-modules': ['off', { allow: [] }],
      'import/unambiguous': 'off',
      'import/no-webpack-loader-syntax': 'error',
      'import/no-unassigned-import': 'off',
      'import/no-named-default': 'error',
      'import/no-anonymous-default-export': ['off', {
        allowArray: false,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowLiteral: false,
        allowObject: false,
      }],
      'import/exports-last': 'off',
      'import/group-exports': 'off',
      'import/no-default-export': 'off',
      'import/no-named-export': 'off',
      'import/no-self-import': 'error',
      'import/no-cycle': ['error', {
        maxDepth: Infinity,
        ignoreExternal: false,
        allowUnsafeDynamicCyclicDependency: false,
      }],
      'import/no-useless-path-segments': ['error', { commonjs: true }],
      'import/dynamic-import-chunkname': ['off', {
        importFunctions: [],
        webpackChunknameFormat: '[0-9a-zA-Z-_/.]+'
      }],
      'import/no-relative-parent-imports': 'off',
      'import/no-unused-modules': ['off', {
        ignoreExports: [],
        missingExports: true,
        unusedExports: true,
      }],
      'import/no-import-module-exports': ['error', { exceptions: [] }],
      'import/no-relative-packages': 'error',
    },
  },

  // Stylistic rules
  {
    rules: {
      // Possible Problems
      'array-callback-return': ['error', {
        allowImplicit: true,
        checkForEach: false,
        allowVoid: false,
      }],
      'no-unused-vars': ['error', {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
      }],
      'no-use-before-define': ['error', {
        functions: true,
        classes: true,
        variables: true,
      }],

      // Suggestions
      'camelcase': ['error', {
        properties: 'never',
        ignoreDestructuring: false,
        ignoreImports: false,
        ignoreGlobals: false,
      }],
      'consistent-return': 'off',
      'no-console': 'off',
      'prefer-const': ['error', {
        destructuring: 'any',
        ignoreReadBeforeAssign: true,
      }],

      // Layout & Formatting
      'indent': ['error', 2, {
        SwitchCase: 1,
        VariableDeclarator: 1,
        flatTernaryExpressions: false,
      }],
      'max-len': ['error', 100, {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      }],
      'no-multiple-empty-lines': ['error', {
        max: 2,
        maxBOF: 0,
        maxEOF: 0,
      }],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'always'],

      // Specific rule adjustments
      'arrow-body-style': ['error', 'as-needed', {
        requireReturnForObjectLiteral: false,
      }],
      'no-restricted-syntax': ['error',
        'LabeledStatement',
        'WithStatement',
        'YieldExpression',
      ],
    },
  },
];
