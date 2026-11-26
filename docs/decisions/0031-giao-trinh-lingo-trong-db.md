---
title: '0031: Giáo trình Lingo lưu trong DB, soạn ở khu ra đề'
status: draft
decision: accepted
date: 2026-11-26
---

# 0031: Giáo trình Lingo lưu trong DB, soạn ở khu ra đề

## Bối cảnh

- ADR 0022 để 26 bài học Lingo trong `apps/api/src/lingo/lessons/*.ts`: muốn sửa bài phải sửa code và deploy.
- Người dùng muốn sửa bài trên giao diện, không cố định trong file TS (2026-11-26). Studio đã chuyển nội dung vào DB theo cách này (ADR 0029).
- Deploy tự chạy migration (image `migrate`) nhưng không chạy seed. Bài học đang có trên mọi môi trường, nên chuyển bằng seed thì stg/prod sẽ mất bài cho tới khi có người seed tay.

## Quyết định

Thay phần "bài học định nghĩa trong code" của ADR 0022. Phần tiến độ theo dạng câu của ADR 0022 giữ nguyên.

- Giáo trình **PHẢI** nằm trong bảng `lingo_lesson_modules` (module theo đề thi, `exam` + `slug`) và `lingo_lessons`. Nội dung bài là Markdown (GFM). Danh sách điểm cần nhớ (`key_points`), Part và phần luyện (`practice_part`, `practice_skill_tag`) là cột riêng.
- 26 bài cũ được chuyển bằng **data migration** `20261126070601_lingo_lessons`: section, gạch đầu dòng, ví dụ Anh – Việt đổi sang Markdown (ví dụ thành blockquote). File TS của bài học bị xoá.
- Học viên chỉ thấy bài `PUBLISHED`. Admin soạn ở `/teach/lessons` qua `/api/lingo/admin/courses/:exam`, `/lesson-modules`, `/lessons` (`@Roles('ADMIN')`). API kiểm tra Part và skill tag theo đề thi.
- Id của bài trong API học viên là `slug`. Lịch 12 tuần (`study-plan.ts`) vẫn link bài theo slug: đổi slug hoặc gỡ bài thì lịch bỏ link đó.

## Hệ quả

| Loại     | Nội dung                                                                                                                                                                      |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Được     | Thêm, sửa, gỡ bài và module trên giao diện, không cần MR hay deploy.                                                                                                          |
| Đánh đổi | Nội dung không được review qua MR (dùng `DRAFT` làm bản nháp). Ví dụ không còn hiển thị dạng thẻ riêng, chỉ là blockquote Markdown.                                           |
| Đánh đổi | Test không còn kiểm tra slug trong lịch 12 tuần khớp với bài: đổi slug của bài trong lịch phải sửa `TOEIC_PLAN`.                                                              |
| Áp dụng  | `packages/db/prisma/schema.prisma`, migration `20261126070601_lingo_lessons`, `apps/api/src/lingo/lessons.service.ts`, `admin-lessons.*`, `apps/web/app/(app)/teach/lessons/` |

## Phương án đã cân nhắc

| Phương án                     | Lý do không chọn                                                          |
| ----------------------------- | ------------------------------------------------------------------------- |
| Giữ trong code (ADR 0022)     | Người dùng muốn sửa trên giao diện.                                       |
| Seed từ file TS như Studio    | Deploy không chạy seed; vẫn còn file TS cố định nội dung.                 |
| Lưu section / ví dụ dạng JSON | Màn soạn phức tạp hơn nhiều; Markdown giống Studio, dễ soạn và xem trước. |

## Nguồn

- Yêu cầu người dùng ngày 2026-11-26: "chuyển bài học lingo vào DB giống studio … sau này có thể sửa được".
- ADR 0022, ADR 0029.
