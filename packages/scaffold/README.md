# @repo/scaffold – project generator behind Studio

> **Work in progress.** Branch `feature/studio-scaffold` is stacked on `feature/app-launcher`. Neither branch has a PR yet. See [Progress](#progress) and [Next steps](#next-steps).

Studio (the "Studio" card of the web launcher) generates a new project. You pick the options, and you get a **Turborepo monorepo that runs**, built the same way as this repo. This package is the pure-TypeScript engine:

- **Input:** `ScaffoldOptions` (`name`, `backend`, `orm`, `database`, `frontend`).
- **Output:** a `FileTree` (path → content).

The API zips the tree and the web UI previews it.

## Generated project

```
<name>/
  package.json  pnpm-workspace.yaml  turbo.json  docker-compose.yml  README.md  .gitignore …
  packages/types        @app/types: Todo, CreateTodo, UpdateTodo (shared by api and web)
  apps/api              NestJS 12, ESM, SWC build (port 3001, prefix /api)
    src/todos/          controller + DTOs; talks only to the abstract TodosRepository
    src/database/       the ORM's DatabaseModule + TodosRepository implementation
  apps/web              Next.js 16 or React 19 + Vite 8 (port 3000): the todo screen
```

Each generated project ships:

- **API:** `GET /api/health`, plus `GET`, `POST`, `PATCH` and `DELETE` on `/api/todos`.
- **Database:** a local database through `docker compose` (`pnpm db:up`).
- **README:** the run steps for the chosen stack.

## How it is built

| File                                         | Role                                                                                                                                                              |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/options.ts`                             | Option lists (with `planned` entries for the roadmap), `DEFAULT_OPTIONS`, **`incompatibilities()`**: every reason a combination cannot be generated, in one place |
| `src/versions.ts`                            | Exact versions written into generated projects. They match this repo's catalog, or else the newest release that is at least 14 days old                           |
| `src/tree.ts`                                | `FileTree`, `json()`, `text` (dedenting template tag), `sortedPaths()` (folders first)                                                                            |
| `src/layers/base.ts`                         | Monorepo shell, `packages/types`, README, docker-compose                                                                                                          |
| `src/layers/database.ts`                     | Per database: image, port, local URL, compose service                                                                                                             |
| `src/layers/backend-nest.ts`                 | NestJS app. It takes an `OrmLayer` (files, deps, scripts, env)                                                                                                    |
| `src/layers/orm-{prisma,drizzle,typeorm}.ts` | `TodosRepository` implementation, schema, DB scripts                                                                                                              |
| `src/layers/frontend.ts`                     | Next.js or Vite. Both share the same `TodoApp` component; only the API URL env var differs                                                                        |
| `src/generate.ts`                            | `generate(options)` (validates, then merges the layers), `supportedCombinations()`                                                                                |
| `scripts/verify.ts`                          | **End-to-end proof**, described below                                                                                                                             |

Decisions taken so far:

- **Same build as this repo:** generated NestJS uses ESM with the Nest CLI SWC builder. `apps/api/.swcrc` sets `jsc.baseUrl`, because without it the CLI's SWC config does not add the `.js` extensions that Node's ESM loader needs. TypeScript 6 dropped `baseUrl` from tsconfig, which is why it lives in `.swcrc`.
- **Bad ids are a 404, never a 500:** repositories reject ids the column cannot hold (a Postgres uuid, a MySQL 36-character id, a Mongo ObjectId) before querying.
- **Per-ORM database steps:**
  - Prisma: `db:migrate` runs `prisma migrate dev` (`db push` on MongoDB, which has no migrations).
  - Drizzle: `db:generate` and then `db:migrate`, both through drizzle-kit.
  - TypeORM: `synchronize` when `DB_SYNCHRONIZE=true`, for development only. Migrations are still to do.
- **Drizzle × MongoDB is refused:** Drizzle supports SQL databases only.

## Verify

```bash
pnpm --filter @repo/scaffold verify                  # every supported combination
pnpm --filter @repo/scaffold verify drizzle-mysql    # names containing one of the filters
```

For each combination the script:

1. Writes the project to `$TMPDIR/turbo-studio-verify/<name>`.
2. Runs `pnpm install`.
3. Starts the database in Docker on a free port.
4. Runs the README's database step.
5. Runs `pnpm build` and `pnpm check-types` (turbo).
6. Starts the api, then walks the CRUD: create, list, toggle, a 400 on an empty title, a 404 on a bad id, delete, list.

It needs Docker and network access. One combination takes about 20–80 seconds.

## Progress

As of 2026-11-12:

| Done | Item                                                                                                                                                                                  |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅   | Engine: options, compatibility rules, versions, layers, `generate()`                                                                                                                  |
| ✅   | Unit tests (`src/generate.spec.ts`), lint, type-check and build all green                                                                                                             |
| ✅   | `verify` script                                                                                                                                                                       |
| ✅   | **nest · prisma · postgres · next** passes `verify` end to end                                                                                                                        |
| ⏳   | The other combinations. A full `verify` run was started but not finished when this was committed                                                                                      |
| ⬜   | Unknown: does **Prisma 7 support MongoDB**? Does **TypeORM 1.x work with MongoDB 7** here? `verify` answers both. Add a rule to `RULES` in `options.ts` for any pair that cannot work |

Supported combinations (from `supportedCombinations()`), NestJS only:

- **ORM × database:** prisma, typeorm × postgres, mysql, mongodb; and drizzle × postgres, mysql.
- **Frontend:** each of those with next or react.
- **Total:** 16.

## Next steps

1. **Finish `verify`.** Run it for every combination, fix the failures, and add a `RULES` entry for any pair that cannot work.
2. **API (`apps/api/src/studio`):**
   - `GET /api/studio/options`: the lists, defaults and planned entries;
   - `POST /api/studio/preview`: returns `{ paths, files }` for the preview;
   - `POST /api/studio/generate`: returns a zip, using `jszip@3.10.2`, which must be added to the catalog.
   - Signed-in users only, with the throttler.
3. **Web `/studio` page** (uses the ui-ux-pro-max skill):
   - project name, plus option cards per axis; disabled choices show the reason from `incompatibilities()`;
   - file tree with a file viewer;
   - a Download .zip button.
   - Then set Studio to `status: 'ready'` in `apps/web/lib/apps.ts`.
4. **Tests:**
   - API e2e: options, 400 on an invalid combination, the zip contains the tree;
   - Playwright: pick options and download.
5. **CI:** a scheduled or manual job runs `verify`, because it is too slow for every PR.
6. **ADR:** "Studio generates projects from composable layers, proven by verify".
7. **Later phases:**
   - Express / Fastify, reusing the ORM layers;
   - Spring Boot (JPA);
   - Go (GORM) and FastAPI (SQLAlchemy);
   - TypeORM migrations;
   - optional extras: auth, Redis, mobile.

Before any of this is merged, `feature/app-launcher` needs its Playwright run (it was blocked by a running `pnpm dev`) and a PR into `develop`.
