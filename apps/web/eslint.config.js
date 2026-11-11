import { config } from '@repo/eslint-config/next'

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...config,
  {
    rules: {
      // Across folders import via the `@/` alias (tsconfig paths); `./` stays for siblings
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '^\\.\\./',
              message:
                "Use the '@/' alias (e.g. '@/lib/api') instead of '../'.",
            },
          ],
        },
      ],
    },
  },
]
