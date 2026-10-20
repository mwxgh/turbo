# Turborepo base

Monorepo base (pnpm + Turborepo) để copy làm khung cho các dự án mới.

| Path                         | Package                   | Mô tả                                                                      | Port |
| ---------------------------- | ------------------------- | -------------------------------------------------------------------------- | ---- |
| `apps/api`                   | `api`                     | NestJS 12 REST API (prefix `/api`)                                         | 4000 |
| `apps/socket`                | `socket`                  | NestJS 12 + Socket.IO gateway (namespace `/events`)                        | 4001 |
| `apps/web`                   | `web`                     | Next.js 16 (App Router)                                                    | 3000 |
| `packages/db`                | `@repo/db`                | Prisma 7 + PostgreSQL (schema, migrations, seed, client)                   | –    |
| `packages/utils`             | `@repo/utils`             | Hàm bổ trợ dùng chung server + browser: datetime (múi giờ VN), chuỗi, số   | –    |
| `packages/socket-events`     | `@repo/socket-events`     | Contract Socket.IO dùng chung gateway + web (type event, namespace)        | –    |
| `packages/decorators`        | `@repo/decorators`        | Field decorators (class-validator + Swagger), `validateDto`, `validateEnv` | –    |
| `packages/ui`                | `@repo/ui`                | Component shadcn/ui (base-nova, Base UI) + `DataTable` (TanStack Table v9) | –    |
| `packages/tailwind-config`   | `@repo/tailwind-config`   | Tailwind CSS v4 + theme shadcn (token sáng/tối) + PostCSS dùng chung       | –    |
| `packages/eslint-config`     | `@repo/eslint-config`     | ESLint flat config: `base`, `nest`, `next-js`, `react-internal`            | –    |
| `packages/typescript-config` | `@repo/typescript-config` | tsconfig: `base`, `nestjs`, `nextjs`, `node-library`, `react-library`      | –    |

## Yêu cầu

- Node.js >= 24
- pnpm 11 (`corepack enable`)
- Docker (PostgreSQL chạy bằng `deploy/docker-compose.yml`)

## Bắt đầu

```bash
pnpm install
cp deploy/.env.example deploy/.env
cp packages/db/.env.example packages/db/.env
cp apps/api/.env.example apps/api/.env
cp apps/socket/.env.example apps/socket/.env
cp apps/web/.env.example apps/web/.env.local

pnpm infra:up       # start PostgreSQL (đợi healthy)
pnpm db:deploy      # apply migrations (pnpm build sẽ tự generate Prisma client)
pnpm db:seed        # dữ liệu mẫu

pnpm dev            # chạy tất cả (build các package trước)
pnpm dev:api        # chỉ api
pnpm dev:socket
pnpm dev:web
```

Scripts khác: `pnpm build`, `pnpm lint`, `pnpm check-types`, `pnpm test`, `pnpm format` / `format:check`, `pnpm start:api|start:socket|start:web`.

| Script                                                     | Mô tả                                                                 |
| ---------------------------------------------------------- | --------------------------------------------------------------------- |
| `pnpm infra:up` / `infra:down` / `infra:ps` / `infra:logs` | Quản lý container (project `turbo-base`)                              |
| `pnpm stack:up` / `stack:down`                             | Chạy / gỡ migrate + api + socket + web bằng Docker (giữ Postgres)     |
| `pnpm db:migrate`                                          | Tạo + apply migration mới khi đổi `schema.prisma`                     |
| `pnpm db:deploy`                                           | Apply migrations có sẵn (CI/prod)                                     |
| `pnpm db:check`                                            | Lỗi nếu DB (đã migrate) lệch với `schema.prisma` – quên tạo migration |
| `pnpm db:push`                                             | Đồng bộ schema không tạo migration (prototype)                        |
| `pnpm db:generate`                                         | Generate Prisma client                                                |
| `pnpm db:seed` / `db:studio`                               | Seed dữ liệu / mở Prisma Studio                                       |

## Tài liệu

Tài liệu dự án (quy trình, yêu cầu, kiến trúc, ADR) ở [`docs/`](docs/README.md) – đọc trước khi code. AI agent: `AGENTS.md` / `CLAUDE.md` trỏ tới đây. Convert `.docx`/`.pdf` sang Markdown: `pnpm docs:convert <file>`.

## Kiến trúc & quy ước

### NestJS apps (`api`, `socket`)

- **ESM** (`"type": "module"`): import tương đối phải có đuôi `.js` (`./app.module.js`).
- **Build bằng Nest CLI** (`nest build`, builder `tsc`, cấu hình `nest-cli.json` + `tsconfig.build.json`) → `dist/`.
- **Dev**: `nest start --watch --env-file .env`; debug: `pnpm --filter api start:debug`.
- **Type-check**: `tsc --noEmit` với `@repo/typescript-config/nestjs.json`.
- **Env**: Node tự load `.env` (`--env-file-if-exists`); class `Env` tại `src/config/env.ts` dùng field decorators + `validateEnv()` (initializer = default). Env sai → app dừng ngay khi khởi động.
- **Validation**: DTO class dùng decorator từ `@repo/decorators` + `ValidationPipe` global (`whitelist`, `forbidNonWhitelisted`, `transform`, `stopAtFirstError`).
- **Môi trường**: `APP_ENV` = `dev` | `stg` | `prod` (`AppEnv` trong `@repo/utils`), độc lập với `NODE_ENV`; `/health` trả `env`. Xem [docs/process/environments.md](docs/process/environments.md).
- **Swagger**: `/api/docs` (UI), `/api/docs-json` (OpenAPI) – bật ở `dev`/`stg`, tắt ở `prod`. Field decorators tự sinh `ApiProperty`.
- **Database**: `PrismaModule` (global) cung cấp `PrismaService`. `PrismaExceptionFilter` map lỗi Prisma → HTTP (`P2025` → 404, `P2002` → 409, `P2003` → 400).
- Health check: `GET /api/health` (api, ping DB với timeout 2s → `503` khi DB lỗi), `GET /health` (socket). Docker Compose dùng các endpoint này làm `healthcheck`.

Thêm feature trong api:

```text
apps/api/src/<feature>/
  dto/create-<feature>.dto.ts   # input + validation (decorator từ @repo/decorators)
  dto/update-<feature>.dto.ts   # PartialType(Create...Dto) từ @nestjs/swagger
  dto/<feature>.dto.ts          # response class (chỉ @ApiProperty, cho Swagger)
  <feature>.module.ts
  <feature>.controller.ts
  <feature>.service.ts
```

rồi import module vào `app.module.ts`. DTO là nguồn duy nhất cho input; Swagger (`/api/docs-json`) mô tả cả input lẫn output.

Mẫu tham khảo: `apps/api/src/hellos` – CRUD đầy đủ trên bảng `hellos`:

| Method   | Path                             | Mô tả                       |
| -------- | -------------------------------- | --------------------------- |
| `GET`    | `/api/hellos?page=1&pageSize=20` | Danh sách (phân trang)      |
| `GET`    | `/api/hellos/:id`                | Chi tiết (404 nếu không có) |
| `POST`   | `/api/hellos`                    | Tạo `{ "message": "..." }`  |
| `PATCH`  | `/api/hellos/:id`                | Cập nhật                    |
| `DELETE` | `/api/hellos/:id`                | Xoá (204)                   |

### Danh sách: tìm kiếm, lọc, sắp xếp, phân trang

Mọi endpoint danh sách nhận cùng một query (cách gọi giống btp-backoffice-web; dùng **một thuật ngữ `sort`**):

```text
GET /api/hellos?page=1&pageSize=20&keyword=xin&sortBy=createdAt&sortDir=desc
               &filter={"message":{"contains":"chào"},"createdAt":{"from":"2026-10-01","to":"2026-10-31"}}
GET /api/hellos?filter[message][startsWith]=X&filter[id][]=<uuid>&filter[id][]=<uuid>
```

| Dạng giá trị `filter`    | Ý nghĩa                                                                                                                    |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `"x"` / `5` / `true`     | bằng (`eq`)                                                                                                                |
| `["a","b"]`              | thuộc danh sách (`in`)                                                                                                     |
| `null` / `{"not": null}` | rỗng / khác rỗng (field `nullable`)                                                                                        |
| `{"op": value}`          | `eq`, `not`, `in`, `notIn`, `contains`, `startsWith`, `endsWith`, `gt`, `gte`, `lt`, `lte`, `from`, `to` (theo kiểu field) |

- Field `date`: `eq` / `from` / `to` là **cả ngày theo giờ Việt Nam** (không phụ thuộc múi giờ server). `datetime`: so sánh đúng thời điểm.
- Chuỗi so sánh không phân biệt hoa/thường; `%` `_` trong từ khoá được hiểu là ký tự thường. Sắp xếp chuỗi theo collation của DB.
- Field / toán tử / giá trị không hợp lệ → **400** với thông báo rõ ràng (vd. `Unknown filter "password". Allowed: id, message, …`).

Thêm cho một resource:

```ts
// apps/api/src/<feature>/<feature>.list-spec.ts – khai báo được phép lọc/sắp xếp gì
export const productListSpec = defineListSpec({
  keywordFields: ['name', 'category.name'],          // dấu chấm = qua quan hệ
  sortable: ['name', 'price', 'createdAt'],
  defaultSort: { field: 'createdAt', dir: 'desc' },
  filters: {
    status: { type: 'enum', values: ['DRAFT', 'PUBLISHED'] },
    price: { type: 'float' },
    deletedAt: { type: 'datetime', nullable: true },
    category: { type: 'string', path: 'category.name' },
    createdAt: { type: 'date' },
  },
})

// controller
@Get() @ApiListQuery(productListSpec) @ApiPaginatedResponse(ProductDto)
findAll(@Query() query: ListQueryDto) { return this.service.findAll(query) }

// service
const { where, ...args } = toPrismaListArgs<Prisma.ProductWhereInput, Prisma.ProductOrderByWithRelationInput>(productListSpec, query)
const [items, total] = await prisma.$transaction([prisma.product.findMany({ where, ...args }), prisma.product.count({ where })])
return paginated(items, total, query)

// web
apiFetch<Paginated<Product>>(`/products?${listQueryToSearchParams({ keyword, sortBy: 'price', filter: { status: ['PUBLISHED'] } })}`)
```

| Package            | Cung cấp                                                                                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@repo/utils`      | `ListQuery`, `Paginated<T>`, `defineListSpec`, `parseListFilter`, `parseListSort`, `paginated`, `paginationArgs`, `listQueryToSearchParams`, `ListQueryError` |
| `@repo/decorators` | `ListQueryDto`, `PaginationQueryDto`, `@ApiListQuery(spec)`, `@ApiPaginatedResponse(Dto)`, `ListQueryExceptionFilter`                                         |
| `@repo/db`         | `toPrismaListArgs`, `escapeLike`                                                                                                                              |

### Database (`@repo/db`)

- Schema: `packages/db/prisma/schema.prisma`; migrations trong `prisma/migrations` (commit vào git).
- Prisma 7 dùng driver adapter `@prisma/adapter-pg`; client được generate vào `src/generated` (gitignored) khi `build`.
- `@repo/db` export `PrismaClient`, model types, `createAdapter()`, `createPrismaClient()`. `@repo/db/browser` chỉ export types/enums (an toàn cho client component).
- Thêm bảng: sửa `schema.prisma` → `pnpm db:migrate` (đặt tên migration) → `pnpm --filter @repo/db build`.

### Decorators (`@repo/decorators`)

Decorator gộp sẵn presence + transform + validate + Swagger cho một field:

```ts
export class CreateUserDto implements CreateUserRequest {
  @StringField({ maxLength: 100, example: 'Ann' }) name: string
  @EmailField() email: string
  @PasswordField({ strong: true }) password: string
  @IntField({ optional: true, min: 0 }) age?: number
  @EnumField(Role, { enumName: 'Role' }) role: Role
  @UuidField({ each: true, optional: true }) groupIds?: string[]
  @ClassField(() => AddressDto, { optional: true }) address?: AddressDto
}
```

| Decorator                                                            | Ghi chú                                                                                                                                                 |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `StringField`                                                        | trim, từ chối `''` khi required (`allowEmpty` để cho phép), `minLength/maxLength/length/pattern`, `toLowerCase/toUpperCase`                             |
| `EmailField`, `UrlField`, `UuidField`, `PhoneField`, `PasswordField` | biến thể của `StringField`                                                                                                                              |
| `NumberField`, `IntField`                                            | nhận chuỗi số từ query/form; `min/max/positive/multipleOf`                                                                                              |
| `BooleanField`                                                       | nhận `'true'/'false'/'1'/'0'`                                                                                                                           |
| `EnumField`                                                          | chỉ nhận giá trị thật của enum; `caseInsensitive: true` → trim + bỏ qua hoa/thường (`'DESC'` → `'desc'`, `'draft'` → `'DRAFT'`), `enumName` cho Swagger |
| `DateField`, `DateStringField`, `ClassField`, `JsonField`            |                                                                                                                                                         |

Option chung: `optional`, `nullable`, `each` (+ `minItems/maxItems/uniqueItems`), `message`, `description`, `example`, `swagger: false`.

`each: true` tự gói giá trị đơn thành mảng (`?tag=a` → `['a']`), transform/validate áp dụng cho từng phần tử, `uniqueItems` kiểm tra sau khi chuẩn hoá. Mọi chuẩn hoá đã nằm sẵn trong decorator, DTO không cần thêm `@Transform`.

Ngoài HTTP (socket, env, script) dùng `validateDto(Dto, payload)` → `{ ok: true, data } | { ok: false, errors }`.

### Utils (`@repo/utils`)

Hàm bổ trợ thuần (không phụ thuộc Node/Nest/React) – dùng được ở api, socket và web (cả client component).

| Module                             | Hàm                                                                                                      |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `date` (date-fns + `@date-fns/tz`) | `formatDate`, `formatDateTime`, `toDateKey`, `parseDate`, `dayRange`, `fromNow`, `toDate`, `isValidDate` |
| `string`                           | `removeDiacritics`, `slugify`, `truncate`                                                                |
| `number`                           | `formatNumber`, `formatCurrency`                                                                         |

Mặc định múi giờ `Asia/Ho_Chi_Minh` (`DEFAULT_TIME_ZONE`) và locale `vi`, nên SSR và browser cho cùng kết quả (không lệch hydration). Ví dụ: `dayRange(new Date())` → `{ start, end }` của ngày hôm nay theo giờ VN, dùng cho `where: { createdAt: { gte: start, lte: end } }`.

Thêm helper: tạo `src/<module>.ts`, export trong `src/index.ts`, viết test trong `src/*.test.ts`.

### Socket events (`@repo/socket-events`)

Tên event, payload và ack khai báo **một nơi** trong `packages/socket-events/src/index.ts` (`ServerToClientEvents`, `ClientToServerEvents`, `Ack<T>`, `ChatMessage`, `SOCKET_NAMESPACE`). Gateway (`Server<...>`) và web (`Socket<...>`) cùng import → đổi event mà một bên chưa theo thì `check-types` báo lỗi ngay.

- Handler `@SubscribeMessage` trả về `Ack<T>` → client nhận qua `emitWithAck`.
- Payload được validate bằng DTO class + `validateDto()` trong gateway (không dùng `ValidationPipe`, vì lỗi từ pipe không tới được ack của client).

Thêm event: khai báo type trong `packages/socket-events` → thêm handler trong gateway → dùng ở client.

### Web (`apps/web`)

- `lib/env.ts`: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SOCKET_URL` (browser), `API_URL` (server-only).
- `lib/api.ts`: `apiFetch<T>()` cho Server Components.
- `lib/types.ts`: type response của API (khai báo cục bộ).
- `lib/socket.ts`: singleton socket.io client, type event từ `@repo/socket-events`.
- `app/page.tsx` + `app/chat.tsx`: trang demo (health API + chat realtime).
- `app/hellos`: CRUD mẫu dùng Server Actions (`actions.ts`) gọi API; lỗi validation lấy từ response của API.

### UI: Tailwind, shadcn/ui, TanStack

| Phần              | Ở đâu                                                                            | Ghi chú                                                                                                                                                                                                                                                           |
| ----------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tailwind CSS v4   | `packages/tailwind-config` (`shared-styles.css`, `postcss.config.mjs`)           | App: `@import '@repo/tailwind-config'` + `@source` tới `packages/ui/src` (xem `apps/web/app/globals.css`)                                                                                                                                                         |
| Theme             | `shared-styles.css` (`:root` sáng, `.dark` tối, màu `oklch`)                     | Dark mode: `next-themes` (`apps/web/components/theme-provider.tsx`, phím tắt `d`)                                                                                                                                                                                 |
| shadcn/ui         | `packages/ui/src/components/*` (style `base-nova`, Base UI, icon `lucide-react`) | Import: `@repo/ui/components/button`, `cn` từ `@repo/ui/lib/utils`                                                                                                                                                                                                |
| TanStack Table v9 | `@repo/ui/components/data-table`                                                 | `DataTable` (sort, tìm kiếm, phân trang) + `dataTableColumns<T>()`; ví dụ `apps/web/app/hellos/hellos-table.tsx`                                                                                                                                                  |
| TanStack Form     | `apps/web/app/hellos/hello-form.tsx`                                             | Validate client (`onChange`) + lỗi API qua `validators.onSubmitAsync` (Server Action)                                                                                                                                                                             |
| TanStack Virtual  | `apps/web/app/chat.tsx`                                                          | Chỉ render dòng đang thấy, tự cuộn tới tin mới                                                                                                                                                                                                                    |
| TanStack Query v5 | `apps/web/lib/query-client.ts`, `lib/queries/*`, `app/providers.tsx`             | Server Component `prefetchQuery` → `HydrationBoundary` → `useQuery` ở client. Ví dụ: `app/health-card.tsx` (poll 10s), `app/hellos/hellos-view.tsx` + `use-hello-mutations.ts` (invalidate sau khi ghi, xoá optimistic + rollback). Devtools chỉ có ở development |

Thêm component shadcn (CLI tự cài dependency, có thể thêm biến màu vào theme):

```bash
pnpm dlx shadcn@4.22.0 add dialog select --cwd packages/ui   # component dùng chung
pnpm dlx shadcn@4.22.0 add <block> --cwd apps/web            # block/trang chỉ cho web
```

Dữ liệu: **đọc** qua TanStack Query (server prefetch, sau đó trình duyệt gọi thẳng API Nest bằng `NEXT_PUBLIC_API_URL` – cần `CORS_ORIGINS`), **ghi** qua Server Actions (server → api) rồi `invalidateQueries`. Thêm dữ liệu mới: query options + key trong `lib/queries/<tên>.ts`, prefetch trong `page.tsx`, đọc bằng `useQuery` trong component client.

### Internal packages

`@repo/utils`, `@repo/decorators`, `@repo/socket-events`, `@repo/db` là compiled package (tsc → `dist/`). Task `dev`/`build`/`test` trong `turbo.json` đều `dependsOn: ["^build"]` nên package luôn được build trước app.

### Lint

ESLint dùng `typescript-eslint` (parser, không type-aware).

### Versions dùng chung (pnpm catalog)

Version dùng chung được khai báo **một lần** trong `catalogs` của `pnpm-workspace.yaml`, `package.json` tham chiếu bằng `"catalog:<tên>"`:

| Catalog   | Gồm                                                                                     | Dùng ở                              |
| --------- | --------------------------------------------------------------------------------------- | ----------------------------------- |
| `tooling` | `typescript`, `eslint`, `@types/node`, `tsx`                                            | mọi package (dev tooling)           |
| `nestjs`  | toàn bộ `@nestjs/*`, `class-validator`, `class-transformer`, `reflect-metadata`, `rxjs` | `api`, `socket`, `@repo/decorators` |

- Nâng version (vd. Nest 13): sửa trong catalog → `pnpm install`.
- App Nest mới / thêm package `@nestjs/*`: thêm vào catalog `nestjs` → `pnpm add <pkg>@catalog:nestjs --filter <app>`.
- Dependency khác ghi version trực tiếp; `peerDependencies` giữ range.

Nâng version thủ công (pnpm sửa **thẳng trong catalog**, giữ nguyên `catalog:` ở các package):

```bash
pnpm deps:outdated                              # pnpm outdated -r: liệt kê, gồm cả dep trong catalog
pnpm deps:update                                # pnpm update -r -i --latest: chọn từng gói
pnpm update -r --latest eslint @types/node      # nâng gói cụ thể
pnpm update -r --latest '@nestjs/*' rxjs        # nâng cả nhóm
pnpm turbo run build lint check-types test      # kiểm tra lại
```

Không dùng `pnpm audit --fix`: (pnpm 11.25.0) nó ghi đè `catalog:` của dep vừa là `peerDependencies` (vd. `@repo/decorators`) thành range `^…`. Lỗ hổng ở thư viện con → để Renovate (lock file maintenance) hoặc `pnpm update -r <gói>`.

TypeScript ghim **6.0.3** (bản 6.x mới nhất): TS 7.0 chỉ có binary `tsc`, chưa có compiler API mà Nest CLI, `typescript-eslint` và `@nestjs/swagger` cần.

`.vscode/settings.json` trỏ `typescript.tsdk` vào `node_modules/typescript/lib` để editor dùng đúng version của repo (VS Code: _TypeScript: Select TypeScript Version → Use Workspace Version_).

## Test

| Lớp              | Lệnh                                                   | Ở đâu                                   | Cần gì                     |
| ---------------- | ------------------------------------------------------ | --------------------------------------- | -------------------------- |
| Unit / component | `pnpm test` (`test:watch`, `test:cov`)                 | `*.spec.ts(x)` / `*.test.ts` cạnh code  | –                          |
| Backend e2e      | `pnpm turbo run test:e2e --filter=api --filter=socket` | `apps/{api,socket}/test/*.e2e-spec.ts`  | Postgres (`pnpm infra:up`) |
| Browser e2e      | `pnpm turbo run test:e2e --filter=e2e`                 | `apps/e2e/tests/*.spec.ts` (Playwright) | Postgres + browser         |

- Runner: **Vitest** cho mọi package, preset dùng chung trong `@repo/vitest-config` (`base`, `nest` – SWC để giữ decorator metadata cho DI, `react` – jsdom). Playwright cho trình duyệt.
- Nest unit test dùng `Test.createTestingModule` + mock provider; e2e khởi động app thật bằng `configureApp()` (`src/app.setup.ts`) – cùng cấu hình với `main.ts`.
- API e2e chạy trên **database riêng** `<tên-db>_test` (hoặc `TEST_DATABASE_URL`), tự tạo + migrate trước khi chạy; DB dev không bị đụng.
- Playwright tự start `api`, `socket`, `web` (bản build) nếu chưa chạy. Browser: `pnpm --filter e2e install-browsers`, hoặc dùng Chrome có sẵn: `PLAYWRIGHT_CHANNEL=chrome pnpm turbo run test:e2e --filter=e2e`. Môi trường đã deploy: `E2E_WEB_URL=https://…`.
- CI: unit + backend e2e trong job `check`, Playwright trong job `e2e`; build image chỉ chạy khi cả hai pass.
- `test` được turbo cache; `test:e2e` không cache (phụ thuộc DB/app đang chạy).

## Git & quy ước commit

- Commit theo [Conventional Commits](https://www.conventionalcommits.org): `feat(api): add hellos pagination`. Scope gợi ý: tên workspace (`api`, `socket`, `web`, `db`, `decorators`, `utils`, …) hoặc `deploy`, `deps`, `ci`.
- Husky hooks:
  - `pre-commit`: `lint-staged` → Prettier cho file được commit.
  - `commit-msg`: `commitlint`.
  - `post-checkout`: báo ngay khi tạo nhánh sai tên GitFlow, kèm lệnh đổi tên.
  - `pre-push`: chặn push thẳng / force push / xoá `main`, `master`, `develop`, force push `release/*`, `hotfix/*`, nhánh sai tên; rồi `turbo run lint check-types test` (giống CI, có cache).
- Hook local bỏ qua được (`--no-verify`) → **bảo vệ thật nằm trên server**: `scripts/gitlab-protect.sh` (GitLab) hoặc import `.github/rulesets/*.json` (GitHub). Chi tiết: [docs/process/gitflow.md](docs/process/gitflow.md#bảo-vệ-nhánh).
- Prettier (`.prettierrc`) tự sắp xếp import: `node:` → react → next → `@nestjs` → thư viện ngoài → `@repo/*` → relative.
- Class Tailwind: `prettier-plugin-tailwindcss` sắp xếp class (cả trong `cn()`/`cva()`), `prettier-plugin-classnames` ngắt chuỗi class dài theo `printWidth` 80 (Prettier mặc định không bao giờ ngắt string), `prettier-plugin-merge` cho các plugin chạy cùng nhau. Comment và một class đơn lẻ quá dài vẫn có thể vượt 80.
- JSON: `prettier-plugin-sort-json` sắp xếp key cấp đầu của file `*.json` (tsconfig, `turbo.json`, `components.json`…). `package.json` không bị đụng (Prettier dùng parser riêng cho file này).

## GitFlow

Chi tiết (sơ đồ, luồng release/hotfix, SemVer, commit, CI theo nhánh): **[docs/process/gitflow.md](docs/process/gitflow.md)**.

Tóm tắt: `feature/*` → `develop` → `release/X.Y.Z` → `main` (tag `vX.Y.Z`); `hotfix/X.Y.Z` từ `main`. Luật nguồn → đích kiểm tra ở mọi MR/PR bằng `scripts/gitflow-check.sh`.

### Mẫu MR / PR

| Mẫu     | Dùng cho                            | GitLab (`.gitlab/merge_request_templates/`) | GitHub (`.github/`)                     |
| ------- | ----------------------------------- | ------------------------------------------- | --------------------------------------- |
| Default | `feature/*`, `fix/*`, … → `develop` | `Default.md`                                | `pull_request_template.md` (tự áp dụng) |
| Release | `release/X.Y.Z` → `main`            | `Release.md`                                | `PULL_REQUEST_TEMPLATE/release.md`      |
| Hotfix  | `hotfix/X.Y.Z` → `main`             | `Hotfix.md`                                 | `PULL_REQUEST_TEMPLATE/hotfix.md`       |

- GitLab: chọn trong ô _Description template_ khi tạo MR.
- GitHub: mẫu khác mặc định mở bằng URL, vd. `…/compare/main...release/1.3.0?quick_pull=1&template=release.md`.
- Renovate tự sinh nội dung PR riêng (không dùng mẫu).

## CI/CD

GitHub Actions (`.github/workflows/ci.yml`) và GitLab CI (`.gitlab-ci.yml`) làm cùng một việc:

| Trigger                              | Chạy                             | Image                                  | Môi trường |
| ------------------------------------ | -------------------------------- | -------------------------------------- | ---------- |
| MR / PR                              | `gitflow` + `check`              | –                                      | –          |
| push `feature/*`…                    | `check` (GitLab; GitHub qua PR)  | –                                      | –          |
| push `develop`                       | `check` → images                 | `:dev`, `:<sha>`                       | `dev`      |
| push `release/X.Y.Z`, `hotfix/X.Y.Z` | `check` → images                 | `:stg`, `:<sha>`                       | `stg`      |
| push `main`                          | `check`                          | –                                      | –          |
| tag `vX.Y.Z` (phải nằm trên `main`)  | `check` → images (**duyệt tay**) | `:prod`, `:X.Y.Z`, `:latest`, `:<sha>` | `prod`     |

- `check`: `format:check` → `turbo run build lint check-types test` → `db:deploy` + `db:check` trên Postgres.
- Images: `api`, `migrate`, `socket`, `web`. GitHub → `ghcr.io/<owner>/<repo>-<app>`; GitLab → `$CI_REGISTRY_IMAGE/<app>` (đổi registry, vd. OpenShift như btp: `REGISTRY_IMAGE`, `REGISTRY_HOST`, `REGISTRY_USER`, `REGISTRY_PASSWORD`).
- 3 môi trường `dev` / `stg` / `prod` – chi tiết (nguồn code, tag image, biến, Swagger, nhãn UI): **[docs/process/environments.md](docs/process/environments.md)**. Variables theo environment: `PUBLIC_API_URL`, `PUBLIC_SOCKET_URL` (bake vào web image), `NEXT_PUBLIC_APP_ENV` do CI tự đặt.
- Duyệt tay prod: GitLab – job `images:prod` là `when: manual`; GitHub – thêm _Required reviewers_ cho environment `prod`.
- GitLab build image cần runner Docker-in-Docker (`docker:29-dind`, privileged). MR template: `.gitlab/merge_request_templates/Default.md`.
- Nên protect `main`, `develop`, `release/*`, `hotfix/*` và tag `v*`.

## Cập nhật dependency (Renovate)

`renovate.json5` – Renovate quét npm/pnpm catalog, Dockerfile, docker-compose, GitHub Actions, GitLab CI và mở PR/MR nâng version:

- Nhánh `deps/<nhóm>` → **`develop`** (hợp lệ với GitFlow check), commit `chore(deps): …`.
- Gom nhóm: `tooling`, `nestjs` (theo catalog), `prisma`, `react / next`, `eslint plugins`, `git hooks & formatting`, `pnpm / turbo` (cả `packageManager`, Dockerfile, `PNPM_VERSION` GitLab), `ci`, `docker images`.
- Lịch: sáng thứ Hai (giờ VN); lock file maintenance đầu tháng. Bản mới phải ra ≥ 3 ngày.
- Lỗ hổng bảo mật (OSV + cảnh báo của platform): PR ngay, label `security`, bỏ qua lịch.
- Major: cần duyệt trong issue _Dependency Dashboard_. Chặn: `typescript` ≥ 7, Postgres major.
- Chạy: GitHub – cài Mend Renovate app; GitLab – job `renovate` trong pipeline schedule (cần `RENOVATE_TOKEN`, xem comment trong `.gitlab-ci.yml`).
- Kiểm tra config: `pnpm renovate:check`.

## Docker (`deploy/`)

| File                                              | Image                                                                         |
| ------------------------------------------------- | ----------------------------------------------------------------------------- |
| `nest.Dockerfile` (`--build-arg APP=api\|socket`) | Nest app: `turbo prune` → build → `pnpm deploy --prod`, chạy bằng user `node` |
| `nest.Dockerfile` `--target migrate` (`APP=api`)  | Job one-shot `prisma migrate deploy` (cần `DATABASE_URL`)                     |
| `web.Dockerfile`                                  | Next.js `output: "standalone"`; `NEXT_PUBLIC_*` truyền bằng build arg         |

`pnpm stack:up` chạy cả stack từ `deploy/docker-compose.yml` (profile `app`): `migrate` chạy xong → `api` healthy → `web`. Cấu hình port/URL trong `deploy/.env`. Môi trường của stack: `APP_ENV` trong `deploy/.env` (mặc định `dev`).

Package nội bộ khai báo `"files": ["dist", …]` để `pnpm deploy` đóng gói code đã build.

## Dùng làm base cho dự án mới

1. Copy repo (bỏ `node_modules`, `.turbo`, `dist`, `.next`, `.env*` không phải `.env.example`).
2. Đổi `name` trong `package.json` root; đổi scope `@repo/*` nếu cần.
3. Xoá phần demo: `apps/api/src/hellos`, `apps/socket/src/chat`, event chat trong `packages/socket-events`, `apps/web/app/{chat.tsx,hellos}`, `apps/web/lib/types.ts` (`Hello`), model `Hello` + migrations trong `packages/db/prisma`.
4. Đổi `COMPOSE_PROJECT_NAME` trong `deploy/.env.example`.
5. Cập nhật `.env.example` của từng app.

## Chưa có (gợi ý mở rộng)

- Auth (JWT) dùng chung giữa api và socket (`handshake.auth.token`).
- `@socket.io/redis-adapter` khi chạy socket nhiều instance.
- Image `api` ~800MB vì `@prisma/client` kéo theo Prisma CLI/TypeScript (optional peer) vào production deps – có thể tối ưu sau.
