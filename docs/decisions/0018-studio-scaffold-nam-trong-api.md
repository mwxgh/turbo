---
title: '0018: Bộ sinh project của Studio nằm trong api, web chỉ đọc danh mục lựa chọn'
status: draft
decision: accepted
date: 2026-11-21
---

# 0018: Bộ sinh project của Studio nằm trong api, web chỉ đọc danh mục lựa chọn

## Bối cảnh

- Bộ sinh project (`generate()`, luật tương thích, format bằng Prettier) nằm ở package `@repo/scaffold`, build bằng `tsc`,
  vì web gọi `generate()` ngay trong trình duyệt để xem trước cây file sau mỗi lựa chọn.
- Studio đổi cách dùng: chọn hết các bước rồi mới bấm sinh project. Không cần xem trước sau từng lựa chọn nữa.
- Package chỉ để chia code cho web làm repo thêm một bước build, thêm dependency (Prettier) cho cả hai app.

## Quyết định

- Code sinh project chuyển vào `apps/api/src/studio/scaffold/`, script kiểm chứng thành `pnpm --filter api studio:verify`.
  Xoá `packages/scaffold`.
- api có thêm `GET /api/studio/options`: danh sách lựa chọn, ngôn ngữ và luật monorepo của từng backend, bảng ORM theo
  ngôn ngữ × database (`ORMS_BY_STACK`), regex tên. Web **PHẢI** đọc luật từ đây, **KHÔNG ĐƯỢC** chép lại luật trong web.
- `POST /api/studio/preview` trả cây file đã format; `POST /api/studio/generate` trả zip. Cả hai kiểm `incompatibilities()`
  (một chỗ duy nhất), sai thì 400 kèm lý do.

## Hệ quả

| Loại     | Nội dung                                                                                                                                                   |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Được     | Bớt một package build; Prettier và bộ sinh không còn trong bundle / dependency của web.                                                                    |
| Được     | Luật tương thích vẫn một nguồn (api); web chỉ tra bảng.                                                                                                    |
| Đánh đổi | Xem cây file cần một request (format toàn bộ project, khoảng một giây); không còn xem trước sau mỗi lựa chọn.                                              |
| Đánh đổi | Trang Studio cần api để tải danh mục (prefetch lúc render server).                                                                                         |
| Áp dụng  | `apps/api/src/studio/`, `apps/web/lib/queries/studio.ts`, `test/studio.e2e-spec.ts`; trang web ở `/studio/generator` (từ ADR 0029, `/studio` là trang học) |

## Phương án đã cân nhắc

| Phương án                                       | Lý do không chọn                                                    |
| ----------------------------------------------- | ------------------------------------------------------------------- |
| Giữ `@repo/scaffold`                            | Chỉ còn api cần `generate()`; package chỉ để chia vài bảng dữ liệu. |
| Package chỉ chứa dữ liệu lựa chọn (không build) | Vẫn một package; api đã phục vụ được cùng dữ liệu đó.               |
| Web chép luật tương thích                       | Hai nơi phải sửa cùng lúc khi thêm backend / ORM.                   |

## Nguồn

Branch `refactor/studio-scaffold-into-api`.
