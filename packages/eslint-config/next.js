import pluginNext from '@next/eslint-plugin-next'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'

import { config as baseConfig } from './base.js'

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  ...baseConfig,
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },
    },
  },
  {
    // Config files (next.config.js, vitest.config.ts, …) run in Node
    files: ['*.config.{js,mjs,cjs,ts,mts}'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
  pluginReactHooks.configs.flat.recommended,
]
