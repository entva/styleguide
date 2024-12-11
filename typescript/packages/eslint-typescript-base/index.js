import baseConfig from 'eslint-config-entva-base';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import stylisticTs from '@stylistic/eslint-plugin-ts';

export default [
  ...baseConfig,
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
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
        },
      },
    },

    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.d.ts'],
      },

      'import/resolver': {
        node: {
          extensions: ['.mjs', '.js', '.json', '.ts', '.d.ts'],
        },
      },

      'import/extensions': ['.mjs', '.js', '.json', '.ts', '.d.ts'],
      'import/external-module-folders': ['node_modules', 'node_modules/@types'],
      'import/core-modules': [],
      'import/ignore': ['node_modules', '\\.(coffee|scss|css|less|hbs|svg|json)$'],
    },

    rules: {
      '@stylistic/ts/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'comma',
        },

        singleline: {
          delimiter: 'comma',
        },
      }],

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

      '@stylistic/ts/brace-style': ['error', '1tbs', {
        allowSingleLine: true,
      }],

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

      '@stylistic/ts/comma-spacing': ['error', {
        before: false,
        after: true,
      }],

      '@typescript-eslint/default-param-last': ['error'],

      '@typescript-eslint/dot-notation': ['error', {
        allowKeywords: true,
        allowPattern: '',
        allowPrivateClassPropertyAccess: false,
        allowProtectedClassPropertyAccess: false,
        allowIndexSignaturePropertyAccess: false,
      }],

      '@stylistic/ts/func-call-spacing': ['error', 'never'],

      '@stylistic/ts/indent': ['error', 2, {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,

        FunctionDeclaration: {
          parameters: 1,
          body: 1,
        },

        FunctionExpression: {
          parameters: 1,
          body: 1,
        },

        CallExpression: {
          arguments: 1,
        },

        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,

        ignoredNodes: [
          'JSXElement',
          'JSXElement > *',
          'JSXAttribute',
          'JSXIdentifier',
          'JSXNamespacedName',
          'JSXMemberExpression',
          'JSXSpreadAttribute',
          'JSXExpressionContainer',
          'JSXOpeningElement',
          'JSXClosingElement',
          'JSXFragment',
          'JSXOpeningFragment',
          'JSXClosingFragment',
          'JSXText',
          'JSXEmptyExpression',
          'JSXSpreadChild',
        ],

        ignoreComments: false,
        offsetTernaryExpressions: false,
      }],

      '@stylistic/ts/keyword-spacing': ['error', {
        before: true,
        after: true,

        overrides: {
          return: {
            after: true,
          },

          throw: {
            after: true,
          },

          case: {
            after: true,
          },
        },
      }],

      '@stylistic/ts/lines-between-class-members': ['error', 'always', {
        exceptAfterSingleLine: false,
        exceptAfterOverload: true,
      }],

      '@typescript-eslint/no-array-constructor': ['error'],
      '@typescript-eslint/no-dupe-class-members': ['error'],

      '@typescript-eslint/no-empty-function': ['error', {
        allow: ['arrowFunctions', 'functions', 'methods'],
      }],

      '@typescript-eslint/no-extra-parens': ['off', 'all', {
        conditionalAssign: true,
        nestedBinaryExpressions: false,
        returnAssign: false,
        ignoreJSX: 'all',
        enforceForArrowConditionals: false,
      }],

      '@stylistic/ts/no-extra-semi': ['error'],
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
      '@typescript-eslint/no-shadow': ['error'],
      '@stylistic/ts/space-before-blocks': ['error'],

      '@typescript-eslint/no-unused-expressions': ['error', {
        allowShortCircuit: false,
        allowTernary: false,
        allowTaggedTemplates: false,
        enforceForJSX: false,
      }],

      '@typescript-eslint/no-unused-vars': ['error', {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
      }],

      '@typescript-eslint/no-use-before-define': ['error', {
        functions: true,
        classes: true,
        variables: true,
      }],

      '@typescript-eslint/no-useless-constructor': ['error'],

      '@stylistic/ts/quotes': ['error', 'single', {
        avoidEscape: true,
      }],

      '@stylistic/ts/space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      }],

      '@typescript-eslint/require-await': ['off'],
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],
      '@stylistic/ts/space-infix-ops': ['error'],
      '@stylistic/ts/object-curly-spacing': ['error', 'always'],
    },
  },
];
