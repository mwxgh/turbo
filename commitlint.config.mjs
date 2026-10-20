/**
 * Conventional Commits, e.g. `feat(api): add hellos pagination`.
 * Scopes are the workspaces plus a few repo-wide areas (only a warning).
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 72],
    'scope-enum': [
      1,
      'always',
      [
        'api',
        'socket',
        'web',
        'ui',
        'db',
        'decorators',
        'utils',
        'socket-events',
        'vitest-config',
        'tailwind-config',
        'e2e',
        'eslint-config',
        'typescript-config',
        'deploy',
        'deps',
        'ci',
      ],
    ],
  },
}
