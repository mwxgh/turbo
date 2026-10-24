# Project guide for AI agents

Read before changing code, in this order:

1. `docs/README.md` – index of project docs (process, product requirements, architecture, decisions).
2. `docs/process/gitflow.md` – branch/merge/commit rules; CI rejects MRs that break them.
3. `docs/process/environments.md` – environments `dev` / `stg` / `prod`: branch → env, `APP_ENV`, per-env config.
4. `README.md` – how to run, repo layout, conventions.

Rules:

- Work on a branch from `develop` (`feature/…`, `fix/…`); never commit or push to `main`/`master`/`develop` directly, never force-push `release/*`/`hotfix/*`, never use `--no-verify` or `ALLOW_PROTECTED_PUSH`.
- Conventional Commits: `type(scope): subject` (scopes in `commitlint.config.mjs`).
- Before finishing: `pnpm turbo run build lint check-types test`; touched api/socket/redis → also `pnpm turbo run test:e2e --filter=api --filter=socket --filter=@repo/redis` (needs `pnpm infra:up`: Postgres + Redis); schema change → `pnpm db:migrate` + `pnpm db:check`.
- Lint is type-aware (`recommendedTypeChecked`): fix findings instead of disabling; a justified exception is `// eslint-disable-next-line <rule> -- reason`. New config/script files must be in a `tsconfig.json` `include`.
- Tests: Vitest `*.spec.ts` next to the code (Nest: `Test.createTestingModule` + mocks), e2e in `apps/<app>/test/*.e2e-spec.ts`, browser flows in `apps/e2e` (Playwright). Add/adjust tests with every behaviour change.
- Dependency versions: shared ones live in `catalogs` of `pnpm-workspace.yaml` (`catalog:tooling`, `catalog:nestjs`). Do not run `pnpm audit --fix` (it rewrites `catalog:` entries).
- Environment-specific behaviour: branch on `APP_ENV` (`AppEnv` from `@repo/utils`), never on `NODE_ENV`.
- UI: shadcn components live in `packages/ui` (add with `pnpm dlx shadcn@4.22.0 add <name> --cwd packages/ui`, don't hand-copy); style with Tailwind classes + theme tokens from `@repo/tailwind-config` (no CSS modules); list tables via `useListTable` + `<DataTable list>` (column id = API field; opt in with `enableSorting` / `meta.filterVariant`, state in the URL via nuqs), forms via TanStack Form; client data via TanStack Query (`lib/queries/*`, prefetch in the page + `HydrationBoundary`), writes via Server Actions + `invalidateQueries`, every write toasts its outcome (`withToast` / `toast` from `@repo/ui/components/sonner`).
- Prisma-generated types are the single source for model shapes: web/mobile import models directly from `@repo/types` (JSON-shaped interfaces + enums generated locally by `pnpm db:types`, committed – after a schema change run it and commit `packages/types/src/generated`; never edit or redeclare model fields), list specs use `defineListSpecFor<Model>()`. Request DTOs are plain classes with `@repo/decorators` – no `implements` boilerplate; reuse what is repeated, don't add ceremony.
- List endpoints: `ListQueryDto` + a `defineListSpecFor<Model>()` per resource + `toPrismaListArgs` + `paginated()`; never hand-parse filter/sort query params. Use `sortBy`/`sortDir` (never `orderBy`/`orderDir`) in APIs and clients.
- File uploads: `FileUploadDialog` / `FileUpload` from `@repo/ui/components/file-upload` with `uploadToStorage` (presigned POST via `POST /api/files/uploads`); never stream files through the API; S3 credentials only in untracked `.env`.
- Redis: only through `@repo/redis` (`@InjectRedis()` / `RedisCache`); never `new Redis()` in apps except `redis.duplicate()` for subscribers/queues. Keys and channels are per-env via `env.redisKeyPrefix`.
- Socket events: change only `packages/socket-events`; API validation: DTOs with `@repo/decorators`.
- If a requirement in `docs/product/` conflicts with the code, ask instead of guessing.

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": true` in the root `turbo.json` or `turbo.jsonc` to opt in; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->
