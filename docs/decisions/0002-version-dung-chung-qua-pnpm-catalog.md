---
title: '0002: Version dùng chung qua pnpm catalog'
status: draft
decision: accepted
date: 2026-10-21
---

# 0002: Version dùng chung qua pnpm catalog

## Bối cảnh

- Monorepo có 18 workspace (apps, packages, tooling).
- Một số thư viện **PHẢI** cùng một instance giữa app và package: React (web, mobile, `@repo/ui`), NestJS và `class-validator` (api, socket, `@repo/nest-common`).
- Expo SDK quyết định version React cho mobile, nên web và `@repo/ui` phải theo cùng version.

## Quyết định

- Dependency dùng ở **2 workspace trở lên** **PHẢI** khai một lần trong `catalog:` của `pnpm-workspace.yaml` và được tham chiếu bằng `"catalog:"`.
- Dependency chỉ dùng ở 1 workspace ghi version trực tiếp.
- Package cần dùng chung instance với app khai `peerDependencies` bằng `catalog:`. Package đó **KHÔNG ĐƯỢC** khai lại dependency ở `devDependencies`.
- **KHÔNG ĐƯỢC** chạy `pnpm audit --fix`: lệnh này ghi đè `catalog:` của dep là `peerDependencies` thành range `^…` (pnpm 11.25.0).

## Hệ quả

| Loại     | Nội dung                                                                                                |
| -------- | ------------------------------------------------------------------------------------------------------- |
| Được     | Nâng version một chỗ; Renovate gom PR theo nhóm; không có 2 bản React / Nest trong cùng app             |
| Đánh đổi | Nâng một gói trong catalog ảnh hưởng mọi workspace dùng gói đó cùng lúc                                 |
| Áp dụng  | `pnpm lint:workspace` (`scripts/check-workspace.ts`) trong CI và pre-commit; `AGENTS.md` mục Dependency |

## Phương án đã cân nhắc

| Phương án                        | Lý do không chọn                                                                                     |
| -------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Ghi version riêng ở từng package | UNKNOWN                                                                                              |
| Named catalogs (`catalogs:`)     | UNKNOWN                                                                                              |
| Công cụ `sherif` để kiểm tra     | Chưa thêm: không tải được từ npm trong phiên làm việc ngày 2026-11-11; `check-workspace.ts` thay thế |

## Nguồn

- README mục _Versions dùng chung (pnpm catalog)_
- Commit `de4e477` (catalog có từ khi khởi tạo repo), `a4afeff` (chuyển version Prisma, dotenv vào catalog); PR #10 (`lint:workspace`)
