module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  env: {
    node: true
  },
  rules: {
    semi: ['warn', 'never'],
    quotes: [1, 'single'],
    strict: [2, 'never'],
    'no-confusing-arrow': 'error',
    'arrow-spacing': 'warn',
    'no-unused-vars': 'warn',
    'no-delete-var': 'error',
    'no-whitespace-before-property': 'warn',
    'no-console': 'warn',
    'arrow-parens': [1, 'as-needed'],
    'prettier/prettier': 1
  },
}
