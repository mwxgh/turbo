import globals from 'globals'

import { config as baseConfig } from './base.js'

/**
 * A custom ESLint configuration for NestJS applications.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const nestConfig = [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // Nest modules are often empty classes decorated with @Module().
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
]
