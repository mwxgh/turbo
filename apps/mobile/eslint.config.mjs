import globals from 'globals'

import { config } from '@repo/eslint-config/react'

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...config,
  { ignores: ['.expo/**', 'dist/**', 'android/**', 'ios/**'] },
  {
    // Babel and Metro load their configs with require(): CommonJS only
    files: ['*.config.js'],
    languageOptions: { sourceType: 'commonjs', globals: globals.node },
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
]
