/**
 * Conventional Commits, e.g. `feat(api): add hellos pagination`.
 * Types (feat, fix, docs, …) come from @commitlint/config-conventional.
 * Scopes are the workspaces plus a few repo-wide areas (only a warning);
 * packages/tooling/* (eslint, typescript, vitest, tailwind configs) share `tooling`.
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
        'mobile',
        'ui',
        'db',
        'types',
        'redis',
        'nest-common',
        'utils',
        'socket-events',
        'e2e',
        'tooling',
        'deploy',
        'deps',
        'ci',
      ],
    ],
  },
}
