import baseConfig from 'eslint-config-entva-base';
import react from 'eslint-plugin-react';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default [
  ...baseConfig,
  {
    files: ['**/*.jsx'],
    plugins: {
      react,
      'jsx-a11y': jsxA11Y,
      'react-hooks': reactHooks,
      import: importPlugin,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          generators: false,
          objectLiteralDuplicateProperties: false,
          jsx: true,
        },
      },
    },

    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.mjs', '.cjs', '.jsx', '.json'],
        },
      },

      'import/extensions': ['.js', '.mjs', '.cjs', '.jsx', '.json'],
      'import/core-modules': [],
      'import/ignore': ['node_modules', '\\.(coffee|scss|css|less|hbs|svg|json)$'],

      react: {
        pragma: 'React',
        version: 'detect',
      },

      propWrapperFunctions: ['forbidExtraProps', 'exact', 'Object.freeze'],
    },

    rules: {
      'react/jsx-props-no-spreading': ['off', {
        html: 'enforce',
        custom: 'enforce',
        explicitSpread: 'ignore',
        exceptions: [],
      }],

      'react/forbid-prop-types': ['off', {
        forbid: ['any', 'array', 'object'],
        checkContextTypes: true,
        checkChildContextTypes: true,
      }],

      'react/require-default-props': ['off', {
        forbidDefaultForRequired: true,
      }],

      'react/no-array-index-key': ['off'],

      'react/jsx-no-bind': ['off', {
        ignoreRefs: true,
        allowArrowFunctions: true,
        allowFunctions: false,
        allowBind: false,
        ignoreDOMComponents: true,
      }],

      'react/prop-types': ['off', {
        ignore: [],
        customValidators: [],
        skipUndeclared: false,
      }],

      'react/react-in-jsx-scope': ['off'],

      'react/function-component-definition': [2, {
        namedComponents: 'arrow-function',
      }],

      'react/jsx-max-props-per-line': ['error', {
        maximum: 1,
        when: 'multiline',
      }],

      'react/jsx-uses-react': ['off'],

      'react/no-unstable-nested-components': ['error', {
        allowAsProps: true,
      }],

      'react/no-unused-class-component-methods': ['off'],
      'react-hooks/exhaustive-deps': 'off',

      'react/display-name': 'off',

      'react/jsx-one-expression-per-line': ['off', {
        allow: 'single-child',
      }],

      'jsx-a11y/anchor-is-valid': ['off', {
        components: ['Link'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      }],

      'jsx-a11y/anchor-has-content': ['off', {
        components: [],
      }],

      'jsx-a11y/no-static-element-interactions': ['off', {
        handlers: [
          'onClick',
          'onMouseDown',
          'onMouseUp',
          'onKeyPress',
          'onKeyDown',
          'onKeyUp',
        ],
      }],

      'jsx-a11y/click-events-have-key-events': ['off'],

      'jsx-a11y/media-has-caption': ['off', {
        audio: [],
        video: [],
        track: [],
      }],

      'jsx-a11y/no-noninteractive-element-interactions': ['off', {
        handlers: [
          'onClick',
          'onMouseDown',
          'onMouseUp',
          'onKeyPress',
          'onKeyDown',
          'onKeyUp',
        ],
      }],

      'jsx-a11y/label-has-for': ['off', {
        components: [],

        required: {
          every: ['nesting', 'id'],
        },

        allowChildren: false,
      }],

      'jsx-a11y/label-has-associated-control': ['off', {
        labelComponents: [],
        labelAttributes: [],
        controlComponents: [],
        assert: 'both',
        depth: 25,
      }],

      'jsx-a11y/control-has-associated-label': ['off', {
        labelAttributes: ['label'],
        controlComponents: [],
        ignoreElements: ['audio', 'canvas', 'embed', 'input', 'textarea', 'tr', 'video'],

        ignoreRoles: [
          'grid',
          'listbox',
          'menu',
          'menubar',
          'radiogroup',
          'row',
          'tablist',
          'toolbar',
          'tree',
          'treegrid',
        ],

        depth: 5,
      }],

      'react-hooks/rules-of-hooks': ['error'],
      'jsx-a11y/accessible-emoji': ['off'],

      'jsx-a11y/alt-text': 'off',

      'jsx-a11y/aria-activedescendant-has-tabindex': ['error'],
      'jsx-a11y/aria-props': ['error'],
      'jsx-a11y/aria-proptypes': ['error'],

      'jsx-a11y/aria-role': ['error', {
        ignoreNonDOM: false,
      }],

      'jsx-a11y/aria-unsupported-elements': ['error'],

      'jsx-a11y/autocomplete-valid': ['off', {
        inputComponents: [],
      }],

      'jsx-a11y/heading-has-content': ['error', {
        components: [''],
      }],

      'jsx-a11y/html-has-lang': ['error'],
      'jsx-a11y/iframe-has-title': ['error'],
      'jsx-a11y/img-redundant-alt': ['error'],
      'jsx-a11y/interactive-supports-focus': ['error'],
      'jsx-a11y/lang': ['error'],
      'jsx-a11y/mouse-events-have-key-events': ['error'],
      'jsx-a11y/no-access-key': ['error'],

      'jsx-a11y/no-autofocus': ['error', {
        ignoreNonDOM: true,
      }],

      'jsx-a11y/no-distracting-elements': ['error', {
        elements: ['marquee', 'blink'],
      }],

      'jsx-a11y/no-interactive-element-to-noninteractive-role': ['error', {
        tr: ['none', 'presentation'],
      }],

      'jsx-a11y/no-noninteractive-element-to-interactive-role': ['error', {
        ul: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
        ol: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
        li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
        table: ['grid'],
        td: ['gridcell'],
      }],

      'jsx-a11y/no-noninteractive-tabindex': ['error', {
        tags: [],
        roles: ['tabpanel'],
      }],

      'jsx-a11y/no-onchange': ['off'],
      'jsx-a11y/no-redundant-roles': ['error'],
      'jsx-a11y/role-has-required-aria-props': ['error'],
      'jsx-a11y/role-supports-aria-props': ['error'],
      'jsx-a11y/scope': ['error'],
      'jsx-a11y/tabindex-no-positive': ['error'],

      'react/forbid-dom-props': ['off', {
        forbid: [],
      }],

      'react/jsx-boolean-value': ['error', 'never', {
        always: [],
      }],

      'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
      'react/jsx-closing-tag-location': ['error'],

      'react/jsx-curly-spacing': ['error', 'never', {
        allowMultiline: true,
      }],

      'react/jsx-handler-names': ['off', {
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
      }],

      'react/jsx-indent-props': ['error', 2],
      'react/jsx-key': ['off'],

      'react/jsx-no-duplicate-props': ['error', {
        ignoreCase: true,
      }],

      'react/jsx-no-literals': ['off', {
        noStrings: true,
      }],

      'react/jsx-no-undef': ['error'],

      'react/jsx-pascal-case': ['error', {
        allowAllCaps: true,
        ignore: [],
      }],

      'react/sort-prop-types': ['off', {
        ignoreCase: true,
        callbacksLast: false,
        requiredFirst: false,
        sortShapeProp: true,
      }],

      'react/jsx-sort-prop-types': ['off'],

      'react/jsx-sort-props': ['off', {
        ignoreCase: true,
        callbacksLast: false,
        shorthandFirst: false,
        shorthandLast: false,
        noSortAlphabetically: false,
        reservedFirst: true,
      }],

      'react/jsx-sort-default-props': ['off', {
        ignoreCase: true,
      }],

      'react/jsx-uses-vars': ['error'],
      'react/no-danger': ['warn'],
      'react/no-deprecated': ['error'],
      'react/no-did-mount-set-state': ['off'],
      'react/no-did-update-set-state': ['error'],
      'react/no-will-update-set-state': ['error'],
      'react/no-direct-mutation-state': ['off'],
      'react/no-is-mounted': ['error'],
      'react/no-multi-comp': ['off'],
      'react/no-set-state': ['off'],
      'react/no-string-refs': ['error'],
      'react/no-unknown-property': ['error'],
      'react/prefer-es6-class': ['error', 'always'],

      'react/prefer-stateless-function': ['error', {
        ignorePureComponents: true,
      }],

      'react/require-render-return': ['error'],
      'react/self-closing-comp': ['error'],

      'react/sort-comp': ['error', {
        order: [
          'static-variables',
          'static-methods',
          'instance-variables',
          'lifecycle',
          '/^handle.+$/',
          '/^on.+$/',
          'getters',
          'setters',
          '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
          'instance-methods',
          'everything-else',
          'rendering',
        ],

        groups: {
          lifecycle: [
            'displayName',
            'propTypes',
            'contextTypes',
            'childContextTypes',
            'mixins',
            'statics',
            'defaultProps',
            'constructor',
            'getDefaultProps',
            'getInitialState',
            'state',
            'getChildContext',
            'getDerivedStateFromProps',
            'componentWillMount',
            'UNSAFE_componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'UNSAFE_componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'UNSAFE_componentWillUpdate',
            'getSnapshotBeforeUpdate',
            'componentDidUpdate',
            'componentDidCatch',
            'componentWillUnmount',
          ],

          rendering: ['/^render.+$/', 'render'],
        },
      }],

      'react/jsx-wrap-multilines': ['error', {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
      }],

      'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
      'react/jsx-equals-spacing': ['error', 'never'],
      'react/jsx-indent': ['error', 2],

      'react/jsx-no-target-blank': ['error', {
        enforceDynamicLinks: 'always',
        links: true,
        forms: false,
      }],

      'react/jsx-filename-extension': ['error', {
        extensions: ['.jsx'],
      }],

      'react/jsx-no-comment-textnodes': ['error'],
      'react/no-render-return-value': ['error'],

      'react/require-optimization': ['off', {
        allowDecorators: [],
      }],

      'react/no-find-dom-node': ['error'],

      'react/forbid-component-props': ['off', {
        forbid: [],
      }],

      'react/forbid-elements': ['off', {
        forbid: [],
      }],

      'react/no-danger-with-children': ['error'],

      'react/no-unused-prop-types': ['error', {
        customValidators: [],
        skipShapeProps: true,
      }],

      'react/style-prop-object': ['error'],
      'react/no-unescaped-entities': ['error'],
      'react/no-children-prop': ['error'],

      'react/jsx-tag-spacing': ['error', {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      }],

      'react/jsx-space-before-closing': ['off', 'always'],

      'react/forbid-foreign-prop-types': ['warn', {
        allowInPropTypes: true,
      }],

      'react/void-dom-elements-no-children': ['error'],

      'react/default-props-match-prop-types': ['error', {
        allowRequiredDefaults: false,
      }],

      'react/no-redundant-should-component-update': ['error'],
      'react/no-unused-state': ['error'],

      'react/boolean-prop-naming': ['off', {
        propTypeNames: ['bool', 'mutuallyExclusiveTrueProps'],
        rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
        message: '',
      }],

      'react/no-typos': ['error'],

      'react/jsx-curly-brace-presence': ['error', {
        props: 'never',
        children: 'never',
      }],

      'react/destructuring-assignment': ['error', 'always'],
      'react/no-access-state-in-setstate': ['error'],

      'react/button-has-type': ['error', {
        button: true,
        submit: true,
        reset: false,
      }],

      'react/jsx-child-element-spacing': ['off'],
      'react/no-this-in-sfc': ['error'],
      'react/jsx-max-depth': ['off'],
      'react/jsx-props-no-multi-spaces': ['error'],
      'react/no-unsafe': ['off'],
      'react/jsx-fragments': ['error', 'syntax'],

      'react/jsx-curly-newline': ['error', {
        multiline: 'consistent',
        singleline: 'consistent',
      }],

      'react/state-in-constructor': ['error', 'always'],
      'react/static-property-placement': ['error', 'property assignment'],
      'react/prefer-read-only-props': ['off'],

      'react/jsx-no-script-url': ['error', [{
        name: 'Link',
        props: ['to'],
      }]],

      'react/jsx-no-useless-fragment': ['error'],
      'react/no-adjacent-inline-elements': ['off'],
      'react/jsx-newline': ['off'],
      'react/jsx-no-constructed-context-values': ['error'],
      'react/no-namespace': ['error'],
      'react/prefer-exact-props': ['error'],
      'react/no-arrow-function-lifecycle': ['error'],
      'react/no-invalid-html-attribute': ['error'],
    },
  },
];
