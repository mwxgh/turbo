import swc from 'unplugin-swc'
import { defineConfig, mergeConfig } from 'vitest/config'

import { baseConfig } from './base.js'

/**
 * NestJS: Vite's default transform (Oxc) drops decorator metadata, so
 * constructor injection would get `undefined`. SWC emits it, like `nest build`.
 */
export const nestConfig = mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [
      swc.vite({
        module: { type: 'es6' },
        jsc: {
          parser: { syntax: 'typescript', decorators: true },
          transform: { legacyDecorator: true, decoratorMetadata: true },
          target: 'es2023',
          keepClassNames: true,
        },
      }),
    ],
    // SWC transforms TS instead of Vite's built-in Oxc transform
    oxc: false,
    test: {
      // main.ts imports it first; tests of standalone decorators need it too
      setupFiles: ['reflect-metadata'],
    },
  }),
)

/**
 * End-to-end tests in `test/*.e2e-spec.ts`: full app against real services,
 * run one file at a time (shared database / ports).
 */
export const nestE2eConfig = mergeConfig(
  nestConfig,
  defineConfig({
    test: {
      fileParallelism: false,
      testTimeout: 30_000,
      hookTimeout: 60_000,
    },
  }),
)
// mergeConfig concatenates arrays; e2e must replace the unit-test globs
nestE2eConfig.test.include = ['test/**/*.e2e-spec.ts']
