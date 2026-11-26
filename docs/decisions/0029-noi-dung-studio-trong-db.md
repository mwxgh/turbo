---
title: '0029: Nội dung học của Studio lưu trong DB, soạn ở trang admin'
status: draft
decision: accepted
date: 2026-11-25
---

# 0029: Nội dung học của Studio lưu trong DB, soạn ở trang admin

## Bối cảnh

- Studio đổi từ "chỉ sinh project" (ADR 0018) thành nơi học lập trình: lộ trình, ngôn ngữ, framework, design pattern, nền tảng, công cụ ([PRD](../product/studio.md)).
- Lingo để giáo trình trong code (ADR 0022) vì chưa cần sửa bài trên giao diện. Studio thì người dùng chọn **lưu trong DB và có trang admin** để thêm, sửa bài mà không cần deploy.
- Số chủ đề có thể tăng nhanh (mỗi ngôn ngữ, framework, pattern là một chủ đề) và bài cần có quiz.

## Quyết định

- Nội dung **PHẢI** nằm trong các bảng `studio_tracks`, `studio_lessons`, `studio_quiz_questions`, `studio_roadmaps`, `studio_roadmap_steps`. Bài viết bằng Markdown (GFM).
- Người học chỉ thấy bản `PUBLISHED`. Đáp án và giải thích của quiz **KHÔNG ĐƯỢC** gửi trước khi người học nộp bài.
- Tiến độ lưu theo bài (`studio_progress`). Tiến độ của chủ đề và lộ trình **KHÔNG ĐƯỢC** lưu riêng: tính từ số bài đã xong. Một bài tính là xong khi người học bấm "Đã học xong" hoặc làm quiz đúng từ 70%.
- Nội dung khởi đầu nằm trong `packages/db/prisma/studio-content.ts`. Seed chỉ thêm chủ đề hoặc lộ trình có slug chưa tồn tại, nên không ghi đè bài admin đã sửa.
- API: `/api/studio/*` cho người học, `/api/studio/admin/*` (`@Roles('ADMIN')`) để soạn nội dung.

## Hệ quả

| Loại     | Nội dung                                                                                                                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------ |
| Được     | Thêm, sửa bài trên giao diện, không cần MR hay deploy; nội dung tách khỏi code.                                          |
| Đánh đổi | Nội dung không được review qua MR; muốn có bản nháp thì để `DRAFT`. Thêm 6 bảng và một migration.                        |
| Đánh đổi | Sửa `studio-content.ts` không cập nhật DB đã seed (seed bỏ qua slug đã có): sửa bài cũ phải làm ở trang admin.           |
| Áp dụng  | `packages/db/prisma/schema.prisma`, `apps/api/src/studio/` (`learn.*`, `admin-learn.*`), `test/studio-learn.e2e-spec.ts` |

## Phương án đã cân nhắc

| Phương án                          | Lý do không chọn                                                        |
| ---------------------------------- | ----------------------------------------------------------------------- |
| Giáo trình trong code như ADR 0022 | Người dùng muốn sửa nội dung trên giao diện, không qua deploy.          |
| DB + AI sinh bài                   | Tốn công nhất; để sau, có thể thêm vào trang admin mà không đổi schema. |

## Nguồn

Yêu cầu của người dùng ngày 2026-11-25: chuyển Studio thành nơi học lập trình, lưu nội dung trong DB và có trang admin.
