module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ]
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'react/prop-types': 0,
    '@typescript-eslint/no-unused-vars': [
      1,
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }
    ],
    'prettier/prettier': 1,
    'no-debugger': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/prefer-nullish-coalescing': 1,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unsafe-argument': 0,
    'react-hooks/exhaustive-deps': 0
  }
};
