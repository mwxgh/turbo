---
title: Môi trường (dev, stg, prod)
status: reviewed
applies-to: api, socket, web, CI/CD
enforced-by:
  - packages/utils/src/app-env.ts (AppEnv)
  - packages/decorators/src/env.ts (BaseEnv: NODE_ENV, APP_ENV, HOST, CORS_ORIGINS, REDIS_URL)
  - apps/{api,socket}/src/config/env.ts (Env extends BaseEnv)
  - apps/web/lib/env.ts (NEXT_PUBLIC_APP_ENV)
  - .gitlab-ci.yml, .github/workflows/ci.yml
---

# Môi trường

Dự án có **3 môi trường**, tên viết tắt dùng thống nhất trong code, CI, tag image và tài liệu: `dev`, `stg`, `prod`.

|                         | `dev`                       | `stg`                                    | `prod`                                 |
| ----------------------- | --------------------------- | ---------------------------------------- | -------------------------------------- |
| Mục đích                | Tích hợp hằng ngày, máy dev | QA / UAT trước khi phát hành             | Người dùng thật                        |
| Nguồn code              | `develop` (và máy local)    | `release/X.Y.Z`, `hotfix/X.Y.Z`          | tag `vX.Y.Z` trên `main`               |
| Build image             | tự động khi push `develop`  | tự động khi push `release/*`, `hotfix/*` | **duyệt tay** khi tạo tag              |
| Tag image               | `:dev`, `:<sha>`            | `:stg`, `:<sha>`                         | `:prod`, `:X.Y.Z`, `:latest`, `:<sha>` |
| CI environment          | `dev`                       | `stg`                                    | `prod` (GitHub: _Required reviewers_)  |
| Swagger `/api/docs`     | bật                         | bật                                      | **tắt**                                |
| Nhãn môi trường trên UI | `DEV` (xanh)                | `STG` (cam)                              | không hiển thị                         |
| Dữ liệu                 | giả / seed, reset thoải mái | gần giống prod, đã ẩn danh               | thật – chỉ thay đổi qua migration      |

Luồng: `feature/*` → `develop` (**dev**) → `release/X.Y.Z` (**stg**) → `main` + tag `vX.Y.Z` (**prod**). Xem [GitFlow](gitflow.md).

## Trong code

`APP_ENV` (dev | stg | prod) cho biết app **chạy ở đâu**; `NODE_ENV` chỉ cho biết **chạy thế nào** (stg và prod đều là build `production`). Không dùng `NODE_ENV` để rẽ nhánh theo môi trường.

| App             | Biến                  | Đọc lúc          | Định nghĩa                                                                                   |
| --------------- | --------------------- | ---------------- | -------------------------------------------------------------------------------------------- |
| `api`, `socket` | `APP_ENV`             | runtime          | `BaseEnv` (`@EnumField(AppEnv)`, mặc định `dev`, sai giá trị → app không khởi động)          |
| `web`           | `NEXT_PUBLIC_APP_ENV` | **build** (bake) | `lib/env.ts` (`parseAppEnv`, sai giá trị → `next build` fail) → mỗi môi trường một image web |

```ts
import { AppEnv } from '@repo/utils'
import { env } from './config/env.js'

if (env.APP_ENV !== AppEnv.Prod) {
  // chỉ dev/stg: Swagger, log chi tiết, tính năng thử nghiệm…
}
```

- `GET /api/health` và `GET /health` (socket) trả `env` → kiểm tra nhanh đang gọi đúng môi trường.
- Thêm hành vi khác nhau theo môi trường: so sánh `env.APP_ENV` / `publicEnv.appEnv` với `AppEnv.*`, viết test cho cả hai nhánh.

## Cấu hình theo môi trường

Khai báo ở CI/CD variables (GitLab: _environment scope_; GitHub: _Environments_) hoặc nơi deploy, **không** commit giá trị thật vào repo.

| Biến                                           | Dùng bởi          | Khi        | Ví dụ `dev` / `stg` / `prod`                                                                 |
| ---------------------------------------------- | ----------------- | ---------- | -------------------------------------------------------------------------------------------- |
| `APP_ENV`                                      | api, socket       | runtime    | `dev` / `stg` / `prod`                                                                       |
| `DATABASE_URL`                                 | api, migrate      | runtime    | DB riêng cho từng môi trường                                                                 |
| `REDIS_URL`                                    | api, socket       | runtime    | Redis có thể dùng chung giữa môi trường: key/kênh tự có prefix `APP_ENV:`                    |
| `STORAGE_CORE_S3_SERVERS`, `STORAGE_BUCKET`    | api               | runtime    | Bắt buộc. Định dạng btp (JSON danh sách server S3 / MinIO); bucket riêng cho từng môi trường |
| `CORS_ORIGINS`                                 | api, socket       | runtime    | `https://dev.example.com` / `https://stg.example.com` / `https://example.com`                |
| `PUBLIC_API_URL` → `NEXT_PUBLIC_API_URL`       | web               | build (CI) | `https://api.dev.example.com/api` / …                                                        |
| `PUBLIC_SOCKET_URL` → `NEXT_PUBLIC_SOCKET_URL` | web               | build (CI) | `https://socket.dev.example.com` / …                                                         |
| `NEXT_PUBLIC_APP_ENV`                          | web               | build (CI) | CI tự đặt theo môi trường build (`BUILD_STAGE` / `STAGE`)                                    |
| `API_URL`                                      | web (server-side) | runtime    | URL nội bộ của api trong cụm                                                                 |

Local: `.env` / `.env.local` của từng app (copy từ `.env.example`, mặc định `dev`). Docker Compose: `APP_ENV` trong `deploy/.env` (dùng cho api, socket và build web).

## Quy tắc

- Không deploy image `:dev` hay `:stg` lên prod: web image chứa URL và nhãn môi trường đã bake lúc build.
- Migration chạy lần lượt dev → stg → prod (image `migrate` cùng commit với app).
- Hotfix: `hotfix/X.Y.Z` → kiểm tra trên **stg** → tag → **prod**.
