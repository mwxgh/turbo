---
title: '0027: Auth gộp vào @repo/nest-common'
status: draft
decision: accepted
date: 2026-11-23
---

# 0027: Auth gộp vào @repo/nest-common

## Bối cảnh

`@repo/auth` (JWT `jose`, argon2id, cookie, thu hồi session; subpath `/nest`: guard, decorator, socket middleware) và `@repo/nest-common` (field decorator, env, phân trang, logger) đều chỉ phục vụ app backend `api` và `socket`. Ngoài hai app, chỉ seed của `@repo/db` dùng `hashPassword` (devDependency, không vào image `migrate`). Người dùng muốn bớt package, gom theo mục tiêu.

## Quyết định

- Mã auth chuyển vào `packages/nest-common/src/auth`: `@repo/nest-common/auth` (lõi, không phụ thuộc Nest) và `@repo/nest-common/auth/nest` (guard, `@Public()`, `@Roles()`, `@CurrentUser()`, `socketAuth`). Package `@repo/auth` bỏ.
- Lõi auth **KHÔNG ĐƯỢC** import Nest, decorator hay pino: script ngoài Nest (seed) dùng nó mà không nạp Nest.
- Quy tắc bảo mật của ADR 0005 giữ nguyên; chỉ đổi nơi đặt code (cột "Áp dụng" của ADR 0005: `packages/auth` → `packages/nest-common/src/auth`).

## Hệ quả

| Loại     | Nội dung                                                                                                                                                                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Được     | Bớt một package; mọi thứ dùng chung cho app Nest ở một chỗ                                                                                                               |
| Đánh đổi | `@repo/db` (devDependencies) khai thêm peer của nest-common (`@nestjs/swagger`, `class-validator`, `class-transformer`); thay đổi bảo mật nằm chung package với tiện ích |
| Áp dụng  | `packages/nest-common/package.json` (exports `./auth`, `./auth/nest`), import trong `apps/api`, `apps/socket`, `packages/db/prisma/seed.ts`                              |

## Phương án đã cân nhắc

| Phương án                              | Lý do không chọn                         |
| -------------------------------------- | ---------------------------------------- |
| Giữ `@repo/auth` riêng                 | Người dùng muốn gom package backend      |
| Gom thư mục `packages/nest/` (giữ tên) | Vẫn hai package; người dùng chọn gộp hẳn |

## Nguồn

- Yêu cầu người dùng ngày 2026-11-23; ADR 0005.
