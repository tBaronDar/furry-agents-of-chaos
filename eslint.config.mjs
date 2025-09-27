import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

// TODO: Complete reading through the migration guide:
// https://eslint.org/docs/latest/use/configure/migration-guide#linter-options

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/dist',
      '**/.eslintrc.json',
      '**/node_modules',
      '**/node_modules/',
      '**/webpack/',
      '**/target/',
      '**/build/',
      '**/node/',
      '**/jest.conf.js',
      '**/eslint.config.*',
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:import/recommended',
      'plugin:jsx-a11y/recommended',
      // Unfortunately eslint-config-airbnb is not compatible with the latest major version of eslint (9).
      // 'airbnb',
      // 'airbnb/hooks',
      'prettier',
      'eslint-config-prettier'
    )
  ),
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      react: fixupPluginRules(react),
      prettier,
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      'react-refresh': reactRefresh,
      'react-hooks': fixupPluginRules(reactHooks),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        google: 'readonly',
      },

      parser: tsParser,
      ecmaVersion: 6,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.node.json'],
      },
    },

    settings: {
      react: {
        version: 'detect',
      },

      'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],

      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },

      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.node.json'],
        },
      },
    },

    rules: {
      semi: ['error', 'always'],

      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
        },
      ],

      'global-require': ['warn'],
      'guard-for-in': ['error'],
      radix: ['error'],
      eqeqeq: ['error', 'always'],
      'prefer-const': ['error'],

      'object-shorthand': [
        'error',
        'always',
        {
          avoidExplicitReturnArrows: true,
        },
      ],

      'default-case': ['error'],
      complexity: ['warn', 40],
      'dot-notation': ['off'],

      'no-use-before-define': [
        'error',
        {
          variables: false,
        },
      ],

      'no-nested-ternary': ['off'],
      'no-console': ['off'],

      // TypeScript rules - relaxed for development
      '@typescript-eslint/no-explicit-any': ['warn'],
      '@typescript-eslint/no-unsafe-assignment': ['warn'],
      '@typescript-eslint/no-unsafe-member-access': ['warn'],

      'no-param-reassign': [
        'warn',
        {
          ignorePropertyModificationsFor: ['draft'],
        },
      ],

      'no-return-assign': ['error', 'except-parens'],
      'no-plusplus': ['off'],
      'no-unused-vars': ['off'],

      'no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],

      'no-shadow': ['off'],
      'no-labels': ['error'],
      'no-caller': ['error'],
      'no-bitwise': ['error'],
      'no-new-wrappers': ['error'],
      'no-eval': ['error'],
      'no-new': ['error'],
      'no-var': ['error'],
      'no-invalid-this': ['warn'],

      'react/jsx-filename-extension': [
        'warn',
        {
          extensions: ['.js', '.jsx', '.tsx'],
        },
      ],

      'react/react-in-jsx-scope': ['off'],
      'react/prop-types': ['off'],
      'react/require-default-props': ['off'],
      'react/jsx-boolean-value': ['off'],
      'react/jsx-props-no-spreading': ['warn'],
      'react/jsx-key': ['error'],
      'react/jsx-props-no-spreading': ['off'],
      'react/function-component-definition': ['off'],
      'react/no-array-index-key': ['warn'],
      'react/no-unescaped-entities': ['warn'],
      'react-hooks/rules-of-hooks': ['error'],
      'react-hooks/exhaustive-deps': ['error'],
      'react-refresh/only-export-components': ['warn'],
      'import/no-named-as-default-member': ['warn'],
      'import/prefer-default-export': ['off'],
      'import/no-import-module-exports': ['warn'],

      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],

      'import/named': ['off'],

      'import/no-extraneous-dependencies': [
        'warn',
        {
          devDependencies: [
            'test/**',
            '__tests__/**',
            '__mocks__/**',
            '**/*.spec.*',
            '**/*.test.*',
            '**/*.stories.*',
            '**/.storybook/**/*.*',
            'vite.config.ts',
          ],

          peerDependencies: true,
        },
      ],

      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: ['static-field', 'instance-field', 'constructor', 'static-method', 'instance-method'],
        },
      ],

      '@typescript-eslint/parameter-properties': [
        'warn',
        {
          allow: ['public', 'private', 'protected'],
        },
      ],

      '@typescript-eslint/explicit-member-accessibility': ['off'],
      '@typescript-eslint/explicit-function-return-type': ['off'],
      '@typescript-eslint/no-empty-function': ['off'],
      '@typescript-eslint/no-explicit-any': ['warn'],
      '@typescript-eslint/no-unsafe-argument': ['warn'],
      '@typescript-eslint/no-unsafe-return': ['warn'],
      '@typescript-eslint/no-unsafe-member-access': ['warn'],
      '@typescript-eslint/no-unsafe-call': ['warn'],
      '@typescript-eslint/no-unsafe-assignment': ['warn'],

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_|ref',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      '@typescript-eslint/no-shadow': ['warn'],
      '@typescript-eslint/explicit-module-boundary-types': ['off'],
      '@typescript-eslint/restrict-template-expressions': ['warn'],
      '@typescript-eslint/restrict-plus-operands': ['warn'],

      // Unfortunately, I cannot get this to work, even thought I have
      // tripled-checked the configuration.
      '@typescript-eslint/no-floating-promises': [
        'warn',
        {
          allowForKnownSafePromises: [
            {
              from: 'package',
              name: 'SafePromise',
              package: '@reduxjs/toolkit',
            },
          ],
        },
      ],

      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],

      '@typescript-eslint/unbound-method': ['warn'],

      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'generic',
          readonly: 'generic',
        },
      ],

      '@typescript-eslint/dot-notation': [
        'error',
        {
          allowIndexSignaturePropertyAccess: true,
        },
      ],
    },
  },
];
