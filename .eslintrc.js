module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    'no-console': 'off',
    'indent': ['error', 2],
    'linebreak-style': ['error', 'windows'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-unused-vars': ['error', { 
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_'
    }]
  }
};