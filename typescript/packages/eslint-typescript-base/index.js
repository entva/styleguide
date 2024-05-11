module.exports = {
  extends: ['entva-base', 'airbnb-typescript/base'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: { delimiter: 'comma' },
        singleline: { delimiter: 'comma' },
      },
    ],
    '@typescript-eslint/no-explicit-any': [
      'error',
      { ignoreRestArgs: true },
    ],
  },
};
