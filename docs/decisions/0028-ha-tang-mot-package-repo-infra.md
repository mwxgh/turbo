---
title: '0028: Hạ tầng gom thành một package @repo/infra, mỗi dịch vụ một subpath'
status: draft
decision: accepted
date: 2026-11-23
---

# 0028: Hạ tầng gom thành một package @repo/infra, mỗi dịch vụ một subpath

Thay ADR 0026.

## Bối cảnh

ADR 0026 đặt `@repo/redis` và `@repo/elasticsearch` thành hai package trong thư mục `packages/infra/`. Tên package không khớp thư mục (log turbo vẫn hiện `@repo/redis#dev`), và mỗi package một task build / `tsc --watch`. Người dùng muốn gom lại build một lần, import khớp thư mục, scaffold đồng bộ – như `@repo/nest-common` với `/auth`, `/logger` (ADR 0027).

## Quyết định

- Một package `@repo/infra` (`packages/infra`), mỗi dịch vụ hạ tầng một thư mục `src/<dịch vụ>` và một subpath: `@repo/infra/redis` (+ `@repo/infra/redis/socket-io`), `@repo/infra/elasticsearch`.
- Dịch vụ mới **PHẢI** thêm bằng `pnpm gen infra` (module global, token inject, đóng client khi tắt app, probe health, unit test; tự thêm subpath vào `package.json`), không tạo package riêng.
- e2e chung một config (`packages/infra/vitest.e2e.config.ts`, Redis DB 15 + Elasticsearch local); CI chạy `--filter=@repo/infra`.

## Hệ quả

| Loại     | Nội dung                                                                                                                                 |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Được     | Một task build / dev; import `@repo/infra/<dịch vụ>` khớp thư mục; thêm dịch vụ bằng generator                                           |
| Đánh đổi | App dùng `@repo/infra` cài thư viện của mọi dịch vụ (socket có client Elasticsearch dù không dùng); lúc chạy chỉ nạp subpath được import |
| Áp dụng  | `packages/infra/package.json` (exports), `turbo/generators/config.ts` (`infra`), CI `--filter=@repo/infra`, AGENTS.md                    |

## Phương án đã cân nhắc

| Phương án                                                    | Lý do không chọn                                    |
| ------------------------------------------------------------ | --------------------------------------------------- |
| Hai package `@repo/infra-redis`, `@repo/infra-elasticsearch` | Vẫn hai task build; người dùng chọn gom một package |
| Giữ ADR 0026 (tên `@repo/redis` trong `infra/`)              | Tên không khớp thư mục                              |

## Nguồn

- Yêu cầu người dùng ngày 2026-11-23; ADR 0026, 0027.
