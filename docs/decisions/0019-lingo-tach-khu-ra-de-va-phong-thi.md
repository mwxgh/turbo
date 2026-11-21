---
title: '0019: Lingo tách khu ra đề và phòng thi trong cùng app web'
status: draft
decision: accepted
date: 2026-11-21
---

# 0019: Lingo tách khu ra đề và phòng thi trong cùng app web

## Bối cảnh

Lingo có hai nhóm người dùng với việc khác nhau:

- Thầy cô (admin) nhập, sinh bằng AI, duyệt và xuất bản đề. Trước đây mọi công cụ nằm trên một trang `/lingo/admin`.
- Học viên chọn đề, làm bài có giờ, xem kết quả, theo dõi tiến độ (kiểu study4). Màn làm bài nằm dưới header app, thanh Lingo và bong bóng AI tutor.

Người dùng muốn hai "site" riêng. Quyền ra đề giữ là `ADMIN` (không thêm role).

## Quyết định

Chúng ta tách bằng route và layout trong `apps/web`, không thêm app hay domain:

- Khu ra đề `/teach` (`app/(app)/teach`): layout riêng có sidebar (Tổng quan, Bộ đề, Ngân hàng câu hỏi, Sinh bằng AI, Nhập dữ liệu). Layout **PHẢI** chặn người không phải `ADMIN` (`notFound`); api vẫn kiểm `@Roles('ADMIN')`. `/lingo/admin` chuyển hẳn (308) sang `/teach`.
- Site học viên `/lingo`: Đề thi, Luyện tập, Lịch sử, Ôn từ vựng, Sổ câu sai, Hỏi AI.
- Phòng thi `/lingo/attempts/[id]/take` nằm trong route group `app/(room)`, ngoài `(app)`: **KHÔNG ĐƯỢC** có header app, thanh Lingo hay AI tutor khi đang làm bài. Bài đã nộp chuyển sang `/lingo/attempts/[id]` (kết quả); bài chưa nộp mở trang kết quả thì chuyển về phòng thi.

## Hệ quả

| Loại     | Nội dung                                                                                                                                                                               |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Được     | Không thêm build, image, deploy, DNS hay cookie domain. Chung đăng nhập, `apiFetch`, `@repo/ui`.                                                                                       |
| Được     | Phòng thi tập trung: câu theo nhóm (ảnh, audio hay đoạn văn một lần), bảng số câu theo Part, đồng hồ, toàn màn hình.                                                                   |
| Đánh đổi | Hai site chung một bản deploy: sửa khu ra đề cũng deploy lại site học viên. Không giới hạn được truy cập theo domain.                                                                  |
| Đánh đổi | Phòng thi ngoài `(app)` nên tự dựng header; component dùng chung (`question-media`) import qua `@/app/(app)/lingo/_components`.                                                        |
| Áp dụng  | `apps/web/app/(app)/teach`, `apps/web/app/(room)/lingo/attempts/[id]/take`, `apps/web/app/(app)/lingo/history`, `lib/lingo.ts` (`takeHref`, `resultHref`), `lib/apps.ts` (`adminOnly`) |

## Phương án đã cân nhắc

| Phương án                                    | Lý do không chọn                                                                                 |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Một app, hai subdomain (rewrite trong proxy) | Thêm DNS, cert, cookie domain cho mỗi môi trường. Không cần cho nhu cầu hiện tại.                |
| Hai app Next riêng                           | Thêm Dockerfile, image, job CI, deploy và domain cho mỗi app. Nặng nhất.                         |
| Role `TEACHER` mới                           | Người dùng chọn giữ `ADMIN`. Thêm role sau cần migration và đổi `@Roles` ở các controller admin. |

## Nguồn

- Yêu cầu người dùng ngày 2026-11-21: một site admin để thầy cô ra đề, một site thi kiểu study4.
- ADR 0013 (nội dung qua đường nhập có duyệt), 0017 (đề thi và sinh nội dung bằng AI).
