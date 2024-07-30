export default {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'next',
    'next/core-web-vitals',
  ],
  rules: {
    // Enforce consistent indentation (2 spaces for modern JS/TS projects)
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    // Enforce consistent linebreak style
    'linebreak-style': ['error', 'unix'],
    // Enforce the use of single quotes
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    // Enforce semi-colons
    'semi': ['error', 'always'],
    // Disallow unused variables
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    // Enforce explicit return types on functions and class methods
    '@typescript-eslint/explicit-function-return-type': ['off'],
    // Disallow the use of console
    'no-console': 'warn',
    // Enforce consistent spacing inside braces
    'object-curly-spacing': ['error', 'always'],
    // Enforce consistent spacing before function definition opening parenthesis
    'space-before-function-paren': ['error', 'never'],
    // Additional Prettier rules
    'prettier/prettier': ['error', {
      singleQuote: true,
      semi: true,
      trailingComma: 'all',
      printWidth: 80,
      tabWidth: 2,
    }],
  },
};
