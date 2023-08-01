module.exports = {
  extends: 'stylelint-config-standard-scss',
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'at-rule-empty-line-before': ['always', {
      except: [
        'blockless-after-same-name-blockless',
        'first-nested',
      ],
      ignore: ['after-comment'],
      ignoreAtRules: ['if', 'else'],
    }],

    'at-rule-no-unknown': null,
    'at-rule-disallowed-list': ['extend'],

    'block-opening-brace-newline-after': ['always'],
    'block-closing-brace-newline-before': ['always'],
    'block-closing-brace-newline-after': ['always', {
      ignoreAtRules: ['if', 'else'],
    }],

    'color-named': 'never',

    'declaration-empty-line-before': null,

    'function-name-case': 'lower',

    'max-nesting-depth': [3, { ignoreAtRules: ['media'] }],
    'number-leading-zero': 'never',
    'no-descending-specificity': null,

    'selector-max-id': 0,
    'selector-class-pattern': '^[a-zA-Z]+(-[\\w-]+)?$',

    'scss/at-rule-no-unknown': true,
    'scss/at-function-parentheses-space-before': 'never',
    'scss/at-else-if-parentheses-space-before': 'never',
    'scss/at-function-pattern': '^[a-z0-9_\\-]+$',
    'scss/at-mixin-argumentless-call-parentheses': 'never',
    'scss/at-mixin-pattern': '^[a-z0-9_\\-]+$',
    'scss/comment-no-loud': true,
    'scss/declaration-nested-properties': 'never',
    'scss/dollar-variable-pattern': '^[a-z0-9_\\-]+$',
    'scss/percent-placeholder-pattern': '^we-are-not-using-placeholders-at-this-time$',
    'scss/at-import-partial-extension': null, // needed for node-sass-glob-importer to work
    'scss/comment-no-empty': null,

    'order/order': [
      'dollar-variables',
      'custom-properties',
      {
        type: 'at-rule',
        name: 'include',
      },
      'declarations',
      'rules',
      {
        type: 'at-rule',
        name: 'keyframes',
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          'export',
          'import',
          'global',
          'local',
          'external',
        ],
      },
    ],
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['from'],
      },
    ],
    'property-no-unknown': [
      true,
      {
        ignoreSelectors: [':export', /^:import/],
      },
    ],
  },
};
