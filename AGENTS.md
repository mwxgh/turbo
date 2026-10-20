# Project guide for AI agents

Read before changing code, in this order:

1. `docs/README.md` – index of project docs (process, product requirements, architecture, decisions).
2. `docs/process/gitflow.md` – branch/merge/commit rules; CI rejects MRs that break them.
3. `docs/process/environments.md` – environments `dev` / `stg` / `prod`: branch → env, `APP_ENV`, per-env config.
4. `README.md` – how to run, repo layout, conventions.

Rules:

- Work on a branch from `develop` (`feature/…`, `fix/…`); never commit or push to `main`/`master`/`develop` directly, never force-push `release/*`/`hotfix/*`, never use `--no-verify` or `ALLOW_PROTECTED_PUSH`.
- Conventional Commits: `type(scope): subject` (scopes in `commitlint.config.mjs`).
- Before finishing: `pnpm turbo run build lint check-types test`; touched api/socket → also `pnpm turbo run test:e2e --filter=api --filter=socket` (needs `pnpm infra:up`); schema change → `pnpm db:migrate` + `pnpm db:check`.
- Tests: Vitest `*.spec.ts` next to the code (Nest: `Test.createTestingModule` + mocks), e2e in `apps/<app>/test/*.e2e-spec.ts`, browser flows in `apps/e2e` (Playwright). Add/adjust tests with every behaviour change.
- Dependency versions: shared ones live in `catalogs` of `pnpm-workspace.yaml` (`catalog:tooling`, `catalog:nestjs`). Do not run `pnpm audit --fix` (it rewrites `catalog:` entries).
- Environment-specific behaviour: branch on `APP_ENV` (`AppEnv` from `@repo/utils`), never on `NODE_ENV`.
- UI: shadcn components live in `packages/ui` (add with `pnpm dlx shadcn@4.22.0 add <name> --cwd packages/ui`, don't hand-copy); style with Tailwind classes + theme tokens from `@repo/tailwind-config` (no CSS modules); tables via `DataTable`, forms via TanStack Form; client data via TanStack Query (`lib/queries/*`, prefetch in the page + `HydrationBoundary`), writes via Server Actions + `invalidateQueries`.
- List endpoints: `ListQueryDto` + a `defineListSpec` per resource + `toPrismaListArgs` + `paginated()`; never hand-parse filter/sort query params. Use `sortBy`/`sortDir` (never `orderBy`/`orderDir`) in APIs and clients.
- Socket events: change only `packages/socket-events`; API validation: DTOs with `@repo/decorators`.
- If a requirement in `docs/product/` conflicts with the code, ask instead of guessing.

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": true` in the root `turbo.json` or `turbo.jsonc` to opt in; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->
