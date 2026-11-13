# @repo/scaffold – project generator behind Studio

> **Work in progress** on branch `feature/studio-scaffold` (the app launcher it was built on is in `develop`, PR #32). See [Progress](#progress) and [Next steps](#next-steps).

Studio (the "Studio" card of the web launcher) generates a new project. You pick the options, and you get **a project that runs**: a plain Turborepo or Nx monorepo, or two separate folders. It is deliberately simpler than this repo (no lint, hooks or custom tooling). This package is the pure-TypeScript engine:

- **Input:** `ScaffoldOptions` (`name`, `repo`, `backend`, `database`, `orm`, `frontend`). The database is picked before the ORM.
- **Output:** a `FileTree` (path → content).

The API zips the tree and the web UI previews it.

## Generated project

Monorepo (`repo: 'turbo' | 'nx'`):

```
<name>/
  package.json  pnpm-workspace.yaml  turbo.json | nx.json  docker-compose.yml  README.md …
  packages/types        @app/types: Todo, CreateTodo, UpdateTodo (shared by api and web)
  apps/api              NestJS 12 (SWC build) or Express 5 (tsc), ESM (port 3001, prefix /api)
    src/todos/          routes (Nest controller + DTOs, or Express router + validation)
    src/database/       database.ts: connectDatabase() → { todos, close }, plain TypeScript
  apps/web              Next.js 16 or React 19 + Vite 8 (port 3000): the todo screen
```

Separate folders (`repo: 'single'`): no workspace and nothing shared.

```
<name>/
  docker-compose.yml  README.md …
  api/                  its own package.json, pnpm-workspace.yaml (install settings), src/types.ts
  web/                  its own package.json, pnpm-workspace.yaml, types.ts
```

Each app keeps a copy of the types and imports them as `@app/types` through tsconfig `paths`. Every such import is `import type`, so no build step resolves it at runtime.

Each generated project ships:

- **API:** `GET /api/health`, plus `GET`, `POST`, `PATCH` and `DELETE` on `/api/todos`.
- **Database:** a local database through `docker compose` (`pnpm db:up`).
- **README:** the run steps for the chosen stack.

## How it is built

| File                                                          | Role                                                                                                                                                                                                                                    |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/options.ts`                                              | Option lists (with `planned` entries for the roadmap), `DEFAULT_OPTIONS`, **`ORMS_BY_DATABASE`** / `ormsFor()` (the ORMs each database offers), **`incompatibilities()`**: every reason a combination cannot be generated, in one place |
| `src/versions.ts`                                             | Exact versions written into generated projects. They match this repo's catalog, or else the newest release that is at least 14 days old                                                                                                 |
| `src/tree.ts`                                                 | `FileTree`, `json()`, `text` (dedenting template tag), `sortedPaths()` (folders first)                                                                                                                                                  |
| `src/layers/base.ts`                                          | Root files: Turborepo or Nx shell (pnpm workspace, `packages/types`), or none for separate folders; README, docker-compose                                                                                                              |
| `src/layers/database.ts`                                      | Per database: image, port, local URL, compose service                                                                                                                                                                                   |
| `src/layers/app.ts`                                           | Where an app sits (`apps/<app>` or `<app>/`) and how it gets the types; the shared `TodosRepository` / `Database` file                                                                                                                  |
| `src/layers/backend-{nest,express}.ts`                        | NestJS or Express app on top of an `OrmLayer`. Nest wires `connectDatabase()` in a `DatabaseModule`; Express calls it in `main.ts`                                                                                                      |
| `src/layers/orm-{prisma,drizzle,typeorm,mongoose,mongodb}.ts` | Framework-free data layer: `connectDatabase()`, `TodosRepository` implementation, schema, DB scripts. Relative imports end in `.js` (valid for both builds)                                                                             |
| `src/layers/frontend.ts`                                      | Next.js or Vite. Both share the same `TodoApp` component; only the API URL env var differs                                                                                                                                              |
| `src/generate.ts`                                             | `generate(options)` (validates, then merges the layers), `supportedCombinations()`                                                                                                                                                      |
| `scripts/verify.ts`                                           | **End-to-end proof**, described below                                                                                                                                                                                                   |

Decisions taken so far:

- **Same build as this repo:** generated NestJS uses ESM with the Nest CLI SWC builder. `apps/api/.swcrc` sets `jsc.baseUrl`, because without it the CLI's SWC config does not add the `.js` extensions that Node's ESM loader needs. TypeScript 6 dropped `baseUrl` from tsconfig, which is why it lives in `.swcrc`.
- **Bad ids are a 404, never a 500:** repositories reject ids the column cannot hold (a Postgres uuid, a MySQL 36-character id, a Mongo ObjectId) before querying.
- **Database first, then the ORMs that fit it** (`ORMS_BY_DATABASE`):

  | Database          | ORMs offered (first = default)      |
  | ----------------- | ----------------------------------- |
  | PostgreSQL, MySQL | Prisma, Drizzle, TypeORM            |
  | Oracle            | TypeORM (`oracledb`, thin mode)     |
  | MongoDB           | Mongoose, No ORM (`mongodb` driver) |

  SQL ORMs map tables, so they are not offered for MongoDB; Mongoose only speaks MongoDB; Prisma and Drizzle have no Oracle support. Any other pair is refused by `incompatibilities()` with the ORMs to pick instead.

- **Per-ORM database steps:**
  - Prisma: `db:migrate` runs `prisma migrate dev`.
  - Drizzle: `db:generate` and then `db:migrate`, both through drizzle-kit.
  - TypeORM: `synchronize` when `DB_SYNCHRONIZE=true`, for development only. Migrations are still to do.
  - Mongoose / No ORM: no migration step; the api creates the collection and its `createdAt` index on start.

## Verify

```bash
pnpm --filter @repo/scaffold verify                     # every supported combination, 3 at a time
pnpm --filter @repo/scaffold verify nest-mysql-drizzle  # names (app-<repo>-<backend>-<database>-<orm>-<frontend>) containing a filter
pnpm --filter @repo/scaffold verify --jobs=1            # one at a time (less RAM)
```

For each combination the script:

1. Writes the project, formatted with `formatTree`, to `~/.cache/turbo-studio-verify/<name>` (Docker Desktop does not share `$TMPDIR` by default, and the MySQL init file is bind-mounted).
2. Runs `pnpm install` (at the root of a monorepo; in `api/` and `web/` for separate folders).
3. Starts the database in Docker on a free port.
4. Runs the README's database step.
5. Runs `pnpm build` and `pnpm check-types`; for a monorepo also `pnpm format:check` and `pnpm lint`.
6. Starts the api, then walks the CRUD: create, list, toggle, a 400 on an empty title, a 404 on a bad id, delete, list.
7. Removes the database container and its volume.

Combinations run in parallel (`--jobs`, default 3 for 8 GB of RAM), Oracle ones one at a time (about 2 GB alone). It needs Docker and network access. One combination takes about 20–60 seconds alone.

## Progress

As of 2026-11-14 (end of day):

| Done | Item                                                                                                                                                                                                                                                                                                               |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ✅   | Engine: options, compatibility rules, versions, layers, `generate()`; unit tests (`src/generate.spec.ts`), lint, type-check and build green                                                                                                                                                                        |
| ✅   | Choices in this order: database → backend → ORM → frontend → repository. ORMs come from the backend's language and the database (`ORMS_BY_STACK`); a monorepo needs a TypeScript backend (`monorepoUnavailable()`)                                                                                                 |
| ✅   | Repository: Turborepo, Nx (package-based) or separate folders (`api/`, `web/`, nothing shared). Backends: NestJS and Express on one framework-free data layer (`connectDatabase()` → `{ todos, ping, close }`)                                                                                                     |
| ✅   | Monorepo setup from this repo's decisions (`layers/modern.ts`, `layers/modern-apps.ts`): pnpm catalog, `packages/tooling` (typescript / eslint config), Prettier + husky + lint-staged + commitlint, validated env, pino, helmet, Swagger, rate limit, health with a database ping, Dockerfiles, GitHub Actions CI |
| ✅   | No unit tests in generated projects (decision 2026-11-14): end-to-end tests (Playwright) will come as a separate package                                                                                                                                                                                           |
| ✅   | `@repo/scaffold/format` (Node only): formats a generated tree with its own `.prettierrc`, so a download passes `format:check`                                                                                                                                                                                      |
| ✅   | `verify` runs combinations in parallel (`--jobs`, default 3; Oracle one at a time) and checks `format:check` and `lint` for monorepos                                                                                                                                                                              |
| ✅   | Web `/studio` (ui-ux-pro-max): one step at a time (picked step collapses, Change reopens it), choices in the URL, file tree + viewer; Studio is `ready` in `apps/web/lib/apps.ts`                                                                                                                                  |
| ⏳   | **Full `verify` of the monorepo setup not finished.** Last run: 25 ok, 36 failed at `database ready` because Docker's disk was full, then stopped. Before that, 6 representative monorepo combinations and 2 more passed                                                                                           |

Supported combinations (from `supportedCombinations()`):

- **Repository:** Turborepo, Nx (TypeScript backends only), or separate folders.
- **Backend:** NestJS, Express (Fastify, Spring Boot, Go, FastAPI planned, with their ORMs in `ORMS_BY_STACK`).
- **Database × ORM (TypeScript):** postgres, mysql × prisma, drizzle, typeorm; oracle × typeorm; mongodb × mongoose, none.
- **Frontend:** each of those with next or react.
- **Total:** 108.

### Where to pick up

1. **Free Docker's disk, then re-run `verify`.** Every earlier run left anonymous volumes (`docker rm -f` without `-v`; fixed in `scripts/verify.ts`): about 240 volumes, 28 GB. Check `docker system df`, then `docker volume prune -f` (anonymous, unused volumes only), then `pnpm --filter @repo/scaffold verify` (about 25–30 min with `--jobs=3` on 8 GB of RAM).
2. **Fix what that run finds**, then record "108/108" here.
3. **Other languages**, in order: Java (Spring Boot: Spring Data JPA, MyBatis, Spring Data MongoDB), Go (GORM, Ent, mongo driver; no Oracle), Python (FastAPI: SQLAlchemy, SQLModel, Beanie). Separate folders only (no monorepo for them). Build and test them inside Docker (`eclipse-temurin:21`, `golang`, `python:3.12`): no JDK, Go or recent Python on this machine.
4. **Known follow-ups:**
   - The api image with Prisma is about 800 MB: `@prisma/client` pulls the `prisma` CLI and Studio in as peers into `pnpm deploy --prod`.
   - The Studio preview shows unformatted code; the download (API, below) should use `formatTree`.
   - Docker images of the monorepo setup were built for one combination only (Turborepo · NestJS · Prisma · Next.js).

## Next steps

1. **API (`apps/api/src/studio`):**
   - `GET /api/studio/options`: the lists, defaults and planned entries;
   - `POST /api/studio/preview`: returns `{ paths, files }` for the preview;
   - `POST /api/studio/generate`: a zip of `formatTree(generate(options))`, using `jszip@3.10.2`, which must be added to the catalog.
   - Signed-in users only, with the throttler.
   - Then enable the Download .zip button of `/studio`.
2. **Tests:**
   - API e2e: options, 400 on an invalid combination, the zip contains the tree;
   - Playwright: pick options and download.
3. **CI:** a scheduled or manual job runs `verify`, because it is too slow for every PR.
4. **ADR:** "Studio generates projects from composable layers, proven by verify".
5. **Later:** Fastify (reusing the data layer), TypeORM migrations, Playwright e2e package for generated projects, optional extras (auth, Redis, mobile).
