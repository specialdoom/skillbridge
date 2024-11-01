// module.exports = {
//   root: true,
//   extends: [
//     'eslint:recommended',
//     'plugin:@typescript-eslint/recommended',
//     'plugin:svelte/recommended',
//     'prettier',
//     'turbo'
//   ],
//   parser: '@typescript-eslint/parser',
//   plugins: ['@typescript-eslint'],
//   parserOptions: {
//     sourceType: 'module',
//     ecmaVersion: 2020,
//     extraFileExtensions: ['.svelte']
//   },
//   env: {
//     browser: true,
//     es2017: true,
//     node: true
//   },
//   overrides: [
//     {
//       files: ['*.svelte'],
//       parser: 'svelte-eslint-parser',
//       parserOptions: {
//         parser: '@typescript-eslint/parser'
//       }
//     }
//   ]
// };

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import globals from 'globals';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginSvelte.configs['flat/recommended'],
  eslintConfigPrettier,
  ...eslintPluginSvelte.configs['flat/prettier'],
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.node, ...globals.browser }
    }
  }
);
