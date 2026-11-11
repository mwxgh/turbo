---
title: Xác thực (auth) – api, socket, web, mobile
status: reviewed
applies-to: api, socket, web, mobile
enforced-by:
  - packages/auth (argon2id, AccessTokens, AuthGuard, @Public/@Roles/@CurrentUser, socketAuth)
  - apps/api/src/auth (register, login, refresh, logout, me, password)
  - packages/db/prisma/schema.prisma (User, Session)
  - apps/web/proxy.ts, apps/web/lib/{api,auth,api-server}.ts
  - apps/mobile/src/lib/{session,api}.ts, apps/mobile/src/app/_layout.tsx
---

# Xác thực

## Quy tắc

- **Mặc định chặn**: `AuthGuard` là guard global của api và socket → mọi route HTTP cần access token. Route mở cho khách: `@Public()` (đang có: `/health*`, `/auth/register|login|refresh|logout`).
- Phân quyền: `@Roles(Role.ADMIN)` trên controller / route (403 nếu sai role). Người đang đăng nhập: `@CurrentUser() user: AuthUser` (`{ id, sessionId, role }`).
- **Không bao giờ** trả `passwordHash` ra ngoài: query user dùng `omit: { passwordHash: true }`. Field / model đánh dấu `/// @private` trong `schema.prisma` không được sinh vào `@repo/types` (web / mobile không thấy).
- Socket: kết nối phải có access token (cookie hoặc `auth: { token }`); không có / sai → `connect_error` `unauthorized`.

## Mô hình token

| Token   | Dạng                              | Sống                                                  | Lưu ở server                            |
| ------- | --------------------------------- | ----------------------------------------------------- | --------------------------------------- |
| Access  | JWT HS256 (`sub`, `sid`, `role`)  | `ACCESS_TOKEN_TTL_SECONDS` (15 phút)                  | Không (api và socket chỉ verify chữ ký) |
| Refresh | `<sessionId>.<secret>` ngẫu nhiên | `REFRESH_TOKEN_TTL_DAYS` (30 ngày, trượt khi refresh) | Bảng `sessions`: chỉ sha256 của secret  |

- Mật khẩu: **argon2id** (`node:crypto`, không native addon), định dạng PHC `$argon2id$v=19$m=19456,t=2,p=1$…` (mức tối thiểu OWASP). Tham số lưu trong hash → nâng sau được, `needsRehash` tự hash lại khi user đăng nhập.
- **Xoay refresh token** mỗi lần refresh. Token vừa bị thay vẫn được chấp nhận **60 giây** (2 tab refresh cùng lúc). Token cũ hơn bị dùng lại = bị đánh cắp → **thu hồi cả session**.
- Đăng xuất / đổi mật khẩu: session bị thu hồi ngay; access token đã phát vẫn hợp lệ tới khi hết hạn (≤ 15 phút) – đánh đổi để không phải tra DB mỗi request.
- Đổi mật khẩu: đăng xuất mọi thiết bị khác.

## Theo client

```mermaid
sequenceDiagram
  participant B as Browser
  participant W as Next (proxy.ts, RSC)
  participant A as api
  B->>A: POST /auth/login (credentials: include)
  A-->>B: Set-Cookie access_token, refresh_token (httpOnly, SameSite=Lax)
  B->>W: GET /hellos (cookies)
  alt access_token hết hạn, còn refresh_token
    W->>A: POST /auth/refresh (forward Cookie)
    A-->>W: Set-Cookie mới
    W-->>B: Set-Cookie mới + render với token mới
  end
  W->>A: RSC / Server Action: apiFetch + Cookie của request
  B->>A: TanStack Query: apiFetch (cookies); 401 → /auth/refresh → retry, hỏng → /login
```

| Client                           | Gửi token                                                                                     | Lưu token                                 | Refresh                                                                                                  |
| -------------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Web (browser)                    | Cookie httpOnly `access_token`                                                                | Cookie (JS không đọc được)                | `proxy.ts` trước khi render; browser: `apiFetch` tự refresh 1 lần khi 401 (`lib/auth.ts`, single flight) |
| Web (server: RSC, Server Action) | Forward header `Cookie` của request (`lib/api-server.ts`, đăng ký trong `instrumentation.ts`) | –                                         | `proxy.ts` đã refresh trước                                                                              |
| Socket (web)                     | Cookie (`withCredentials`)                                                                    | –                                         | `connect_error unauthorized` → refresh → `connect()` lại 1 lần                                           |
| Mobile                           | `Authorization: Bearer`, header `x-auth-transport: token` khi gọi `/auth/*`                   | `expo-secure-store` (Keychain / Keystore) | `apiFetch` refresh 1 lần khi 401; hỏng → về màn login (`Stack.Protected`)                                |

- Trang không cần đăng nhập của web: `PUBLIC_PATHS` trong `apps/web/proxy.ts` (đang có `/login`). `?next=` chỉ nhận path cùng site (`safeNext`, chống open redirect).
- CSRF: cookie `SameSite=Lax` → browser không gửi cookie kèm request POST/PATCH/DELETE xuất phát từ site khác; CORS chỉ cho `CORS_ORIGINS` đọc response. Web và api phải **cùng site** (vd. `app.example.com` + `api.example.com`).

## Cấu hình

| Biến                                              | App                | Mặc định                 | Ghi chú                                                                                         |
| ------------------------------------------------- | ------------------ | ------------------------ | ----------------------------------------------------------------------------------------------- |
| `JWT_SECRET`                                      | api, socket        | – (bắt buộc, ≥ 32 ký tự) | **Cùng giá trị** ở api và socket: `openssl rand -base64 48`                                     |
| `ACCESS_TOKEN_TTL_SECONDS`                        | api                | `900`                    |                                                                                                 |
| `REFRESH_TOKEN_TTL_DAYS`                          | api                | `30`                     |                                                                                                 |
| `AUTH_REGISTRATION`                               | api                | `closed`                 | `open`: ai cũng `POST /auth/register` được                                                      |
| `AUTH_RATE_LIMIT`                                 | api                | `10`                     | Số lần login / register / đổi mật khẩu mỗi IP mỗi phút                                          |
| `COOKIE_DOMAIN`                                   | api                | rỗng                     | **Bắt buộc** khi web và api khác host: domain cha (`example.com`) để cookie gửi được cho cả hai |
| `ADMIN_EMAIL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD` | `packages/db/.env` | –                        | `pnpm db:seed` tạo admin đầu tiên nếu chưa có                                                   |

Cookie có `Secure` ở mọi `APP_ENV` trừ `dev` (`env.cookieSecure`).

Tên cookie theo `APP_ENV` (`authCookieNames` trong `@repo/utils`, api/socket: `env.authCookies`, web: `authCookies` trong `lib/env.ts`): prod giữ `access_token` / `refresh_token`, môi trường khác có tiền tố (`stg_access_token`, `dev_access_token`). Lý do: prod đặt cookie trên domain cha (`COOKIE_DOMAIN=example.com`) nên trình duyệt gửi cả sang `*.stg.example.com`; trùng tên sẽ lẫn phiên và đưa token prod cho stg. **KHÔNG ĐƯỢC** viết cứng tên cookie trong code.

## Thêm cách đăng nhập (SSO / Keycloak / OIDC)

`AuthService.issue(user, meta)` không phụ thuộc cách đăng nhập. Một provider mới chỉ cần:

1. Xác minh người dùng với provider (vd. đổi `code` OIDC lấy `id_token`, verify chữ ký bằng JWKS của Keycloak).
2. Tìm hoặc tạo `User` – thêm bảng `UserIdentity { provider, subject, userId }` (unique `provider + subject`) trong migration của provider đó; `passwordHash` để `null` cho tài khoản chỉ dùng SSO.
3. Gọi `auth.issue(user, meta)` rồi trả như `login` (cookie cho web, body cho mobile).

## Test

- `@repo/auth`: unit test (argon2id kể cả vector chuẩn, JWT, guard, socket middleware).
- api: `test/auth.e2e-spec.ts` (cookie / token mode, xoay token, phát hiện dùng lại, đăng xuất, đổi mật khẩu). Route khác trong e2e dùng `bearer(app)` từ `test/create-app.ts`.
- Controller có guard trong unit test: `overrideGuard(...)` nếu cần.
- Playwright: project `setup` (`tests/auth.setup.ts`) đăng ký + đăng nhập qua UI một lần, lưu cookie vào `.auth/user.json`; test khác dùng lại. `tests/auth.spec.ts`: chuyển hướng login, sai mật khẩu, refresh trước khi render, đăng xuất.

## Lưu ý khi dev

- `nest start --watch` chỉ theo dõi `src/` của app: sửa `packages/auth` (hay package khác) → **restart** `pnpm dev` để api / socket nạp `dist/` mới.
