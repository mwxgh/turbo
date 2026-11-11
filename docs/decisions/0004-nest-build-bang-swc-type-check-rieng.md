---
title: '0004: Nest build bằng SWC, type-check tách riêng'
status: draft
decision: accepted
date: 2026-10-24
---

# 0004: Nest build bằng SWC, type-check tách riêng

## Bối cảnh

- api và socket là ESM (`"type": "module"`). ESM trên Node cần import tương đối có đuôi `.js`.
- Trước commit `7ecd8b7`, CI type-check hai lần: một lần trong build, một lần trong `check-types`.

## Quyết định

- `nest build` dùng builder `swc` (`nest-cli.json`, cấu hình `@repo/typescript-config/nest.swcrc`).
- Code app viết import tương đối **không đuôi**. SWC thêm `.js` khi build. Type-check dùng `moduleResolution: Bundler`.
- Build **không** type-check. Task `check-types` (`tsc --noEmit`) là cổng type duy nhất trong turbo và CI.
- Dev: `nest start --watch --type-check` chạy `tsc` song song để in lỗi type.
- Package build bằng `tsc` vẫn giữ đuôi `.js` trong import tương đối.

## Hệ quả

| Loại     | Nội dung                                                                                                 |
| -------- | -------------------------------------------------------------------------------------------------------- |
| Được     | Không type-check hai lần trong CI; import không đuôi trong app                                           |
| Đánh đổi | `nest build` thành công vẫn có thể có lỗi type → **PHẢI** chạy `check-types` trước khi merge             |
| Đánh đổi | Hai quy ước import: app không đuôi, package `tsc` có `.js`                                               |
| Áp dụng  | `turbo.json` (`check-types`), CI `pnpm turbo run build lint check-types test`, `AGENTS.md` mục Nest apps |

## Phương án đã cân nhắc

| Phương án                      | Lý do không chọn                                                                                                       |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `nest build` mặc định (`tsc`)  | Type-check hai lần trong CI (commit `7ecd8b7`)                                                                         |
| TypeScript 7 (compiler native) | Chưa có compiler API; Nest CLI, typescript-eslint, `@nestjs/swagger` cần API này (comment trong `pnpm-workspace.yaml`) |

## Nguồn

- Commit `7ecd8b7` _refactor: build nest apps with swc and drop .js from relative imports_, `9f610fb`
- README mục _NestJS apps_
