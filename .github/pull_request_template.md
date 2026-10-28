<!--
Branches: feature/* · fix/* · refactor/* · chore/* … → develop; release/* · hotfix/* → main (docs/process/gitflow.md).
PR title follows Conventional Commits: `type(scope): summary` or `type: summary` (e.g. `feat(api): add hellos pagination`).
-->

## Summary

<!-- What changes and why. -->

Closes #

## Type of change

- [ ] feat – new feature
- [ ] fix – bug fix
- [ ] refactor – restructure without behaviour change
- [ ] perf – performance improvement
- [ ] docs / test / build / ci / chore
- [ ] **Breaking change** (API, socket event, env, DB schema, route) – describe the upgrade path below

## Scope

**Apps**

- [ ] api
- [ ] socket
- [ ] web
- [ ] mobile
- [ ] e2e

**Packages**

- [ ] db / types (Prisma schema, generated types)
- [ ] nest-common / redis / utils
- [ ] socket-events / ui
- [ ] tooling (eslint, typescript, vitest, tailwind)
- [ ] deploy / CI / docs

## Checklist

- [ ] `pnpm turbo run build lint check-types test` passes
- [ ] Touched api / socket / redis → `pnpm turbo run test:e2e --filter=api --filter=socket --filter=@repo/redis` passes
- [ ] Changed `schema.prisma` → `pnpm db:migrate` (migration committed), `pnpm db:check` passes, `pnpm db:types` (`packages/types/src/generated` committed)
- [ ] Added / changed env vars → updated the app's `.env.example` and `deploy/.env.example`
- [ ] Changed the API → Swagger (`/api/docs`) is correct; changed a socket event → only in `packages/socket-events`
- [ ] Changed the UI → tried on web / mobile, before / after screenshots below
- [ ] New or changed behaviour has tests; README / AGENTS.md / `docs/` updated where needed

## How to test

<!-- Steps for the reviewer to verify it manually. -->

## Breaking changes / deployment notes

<!-- Upgrade path, new env vars, migrations, changed routes or probes… Leave empty if none. -->

## Screenshots / notes for reviewers

<!-- UI before / after, places that need a closer look… -->
