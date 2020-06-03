module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'jest'],
  extends: [
    "react-app"
  ],
  env: {
      'browser': true,
      'amd': true,
      'node': true
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.js'],
    },
    'import/resolver': {
      typescript: {},
    },
    "react": {
      "version": "detect"
    }
  },
  rules: {
    'no-useless-escape': 0,
    "react/prop-types": [2, { ignore: ['children'] }],
    'object-curly-spacing': ["error", "always"],
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    "react/jsx-max-props-per-line": [2, {maximum: 1}],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/camelcase': 0,
    'react/display-name': 0,
    "@typescript-eslint/no-unused-vars": ["error"],
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/semi': 1,
    '@typescript-eslint/indent': [2, 2],
  },
};
