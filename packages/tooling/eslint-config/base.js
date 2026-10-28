import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import onlyWarn from 'eslint-plugin-only-warn'
import turboPlugin from 'eslint-plugin-turbo'
import tseslint from 'typescript-eslint'

/**
 * Type-aware rules (floating promises, unsafe `any`, …) need the TypeScript
 * program of each package: about 2× slower. On by default (same as CI);
 * `ESLINT_TYPE_CHECK=0 pnpm lint` for a quick syntax-level lint.
 */
const typeCheck = process.env.ESLINT_TYPE_CHECK !== '0'

/** @type {import("eslint").Linter.Config[]} */
const typeScriptConfigs = typeCheck
  ? [
      ...tseslint.configs.recommendedTypeChecked,
      {
        // Each file is checked with the nearest tsconfig.json
        languageOptions: { parserOptions: { projectService: true } },
      },
      {
        // Plain JS config files (eslint/next/postcss config) are in no tsconfig
        files: ['**/*.{js,mjs,cjs}'],
        ...tseslint.configs.disableTypeChecked,
      },
      {
        // Tests read untyped bodies (supertest, socket payloads, fixtures)
        files: ['**/*.{spec,test}.{ts,tsx}', '**/*.e2e-spec.ts', '**/test/**'],
        rules: {
          '@typescript-eslint/no-unsafe-argument': 'off',
          '@typescript-eslint/no-unsafe-assignment': 'off',
          '@typescript-eslint/no-unsafe-call': 'off',
          '@typescript-eslint/no-unsafe-member-access': 'off',
        },
      },
    ]
  : tseslint.configs.recommended

/**
 * A shared ESLint configuration for the repository.
 *
 * TypeScript files are parsed by typescript-eslint, which resolves the
 * TypeScript 6 compiler installed in this package (TS 7 has no JS API yet).
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  ...typeScriptConfigs,
  eslintConfigPrettier,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ['dist/**'],
  },
]
