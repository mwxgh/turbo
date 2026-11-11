---
title: '0003: Type model sinh từ Prisma (@repo/types)'
status: draft
decision: accepted
date: 2026-10-24
---

# 0003: Type model sinh từ Prisma (`@repo/types`)

## Bối cảnh

- api trả model dạng JSON: `DateTime`, `Decimal`, `BigInt` thành `string`.
- web và mobile cần type của các model này. web và mobile **không** chạy Prisma.
- Khai báo type bằng tay ở client dễ lệch với `schema.prisma`.

## Quyết định

- Generator `packages/db/prisma/generators/types.ts` (`pnpm db:types`) sinh `packages/types/src/generated/{models,enums}.ts`.
  - Interface theo dạng JSON mà API trả về.
  - Quan hệ là field optional, giới hạn độ sâu bằng `LimitDepth`.
  - Enum dạng `const` + type.
- File sinh ra **PHẢI** commit vào git. `pnpm db:types` chỉ chạy ở máy local; build trên CI chỉ sinh Prisma client.
- web và mobile **PHẢI** import model từ `@repo/types`. **KHÔNG ĐƯỢC** sửa file sinh ra hoặc khai báo lại field của model.
- Field / model bí mật đánh dấu `/// @private` trong `schema.prisma`. Generator không sinh các field / model này.

## Hệ quả

| Loại     | Nội dung                                                                                                   |
| -------- | ---------------------------------------------------------------------------------------------------------- |
| Được     | Một nguồn type từ DB tới UI; đổi schema → lỗi type hiện ở mọi tầng; client không phụ thuộc Prisma          |
| Đánh đổi | Phải nhớ chạy `pnpm db:types` và commit sau mỗi lần đổi schema                                             |
| Áp dụng  | `AGENTS.md` (Prisma-generated types); `pnpm gen resource` tự chạy `db:types`; `defineListSpecFor<Model>()` |

## Phương án đã cân nhắc

| Phương án                          | Lý do không chọn                                                               |
| ---------------------------------- | ------------------------------------------------------------------------------ |
| Import type từ `@repo/db` ở client | Commit `4ecba81` bỏ `@repo/db/browser` khỏi web. Lý do chi tiết: UNKNOWN       |
| `type-fest` `Jsonify<Model>` ở web | Commit `4ecba81` bỏ `type-fest` và `Jsonify` khỏi web. Lý do chi tiết: UNKNOWN |

## Nguồn

- Commit `4ecba81` _feat: add @repo/types generated from prisma schema_
- README mục _Database (`@repo/db`)_, `docs/architecture/auth.md` (`/// @private`)
