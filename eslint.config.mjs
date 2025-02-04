import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import _import from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

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
            '**/node_modules',
            '**/dist',
            '**/build',
            '**/coverage',
            '**/prisma',
        ],
    },
    ...fixupConfigRules(
        compat.extends(
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:import/recommended',
            'plugin:import/typescript',
            'plugin:prettier/recommended'
        )
    ),
    {
        plugins: {
            '@typescript-eslint': fixupPluginRules(typescriptEslint),
            import: fixupPluginRules(_import),
            prettier: fixupPluginRules(prettier),
        },

        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },

            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',

            parserOptions: {
                project: ['./tsconfig.json'],
            },
        },

        rules: {
            'prettier/prettier': 'warn',
            'no-console': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'no-debugger': 'warn',
            eqeqeq: ['error', 'always'],
            'no-dupe-else-if': 'error',
            'no-eval': 'error',
            'no-multi-spaces': 'error',
            indent: 'off',
            semi: ['error', 'always'],

            'no-multiple-empty-lines': [
                'error',
                {
                    max: 1,
                },
            ],

            'no-shadow': 'error',
            'prefer-const': 'error',
            'no-case-declarations': 'off',
            'no-fallthrough': 'off',
        },
    },
];
