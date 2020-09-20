module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
  ],
  "parser": "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2020,
    "parser": "@typescript-eslint/parser",
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-trailing-spaces': 'warn',
    'no-multiple-empty-lines': 'warn',
    'comma-dangle': ['warn', 'always-multiline'],
    'semi': 'warn',
    'space-before-function-paren': ['warn', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always',
    }],
    'key-spacing': 'warn',
    'space-infix-ops': 'warn',
  }
}
