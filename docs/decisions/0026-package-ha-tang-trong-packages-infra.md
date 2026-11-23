---
title: '0026: Package hạ tầng nằm trong packages/infra/'
status: draft
decision: accepted
date: 2026-11-23
---

# 0026: Package hạ tầng nằm trong packages/infra/

## Bối cảnh

`packages/` để phẳng các thư viện app import (`db`, `types`, `ui`, `utils`, `socket-events`…), cấu hình và công cụ đã gom vào `packages/tooling/`. Hai package `@repo/redis` và `@repo/elasticsearch` cùng một mục tiêu: client của một dịch vụ hạ tầng cho app Nest (module global, token inject, prefix theo môi trường, probe health). Người dùng muốn gom chúng lại để sau này thêm hạ tầng khác (queue, mail…) cho gọn.

## Quyết định

- Package là client tới một dịch vụ hạ tầng cho app backend **PHẢI** nằm trong `packages/infra/<tên>` (`@repo/redis`, `@repo/elasticsearch`). `pnpm gen package` có lựa chọn thư mục `packages/infra/`.
- Tên package giữ `@repo/<tên>`, không phụ thuộc thư mục: import không đổi.
- Không thuộc `infra/`: `socket-events` (hợp đồng event giữa socket, web, mobile – cùng loại `types`), `db` (schema, migration và model Prisma là nguồn của `@repo/types`), `nest-common`, `auth`.

## Hệ quả

| Loại     | Nội dung                                                                                           |
| -------- | -------------------------------------------------------------------------------------------------- |
| Được     | `packages/` có ba nhóm rõ: thư viện, `infra/`, `tooling/`; chỗ đặt sẵn cho hạ tầng mới             |
| Đánh đổi | Đường dẫn cũ (`packages/redis`) trong tài liệu / lịch sử không còn đúng                            |
| Áp dụng  | `pnpm-workspace.yaml` (`packages/infra/*`), `turbo/generators/config.ts` (prompt `folder`), README |

## Phương án đã cân nhắc

| Phương án                           | Lý do không chọn                                                                 |
| ----------------------------------- | -------------------------------------------------------------------------------- |
| Gom cả `socket-events` vào `infra/` | Không phải client hạ tầng; web và mobile cũng dùng                               |
| Gom cả `db`                         | Vừa là model dữ liệu vừa là client; nhiều nơi tham chiếu đường dẫn `packages/db` |

## Nguồn

- Yêu cầu người dùng ngày 2026-11-23.
