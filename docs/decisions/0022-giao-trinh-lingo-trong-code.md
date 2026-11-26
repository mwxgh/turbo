---
title: '0022: Giáo trình Lingo định nghĩa trong code, tiến độ theo dạng câu'
status: draft
decision: superseded by 0031
date: 2026-11-22
---

# 0022: Giáo trình Lingo định nghĩa trong code, tiến độ theo dạng câu

## Bối cảnh

Người dùng muốn Lingo "đầy đủ như study4": ngoài đề và thẻ từ vựng còn cần bài học lý thuyết (ngữ pháp Part 5–6, dạng câu Part 1–4, kỹ năng đọc Part 6–7, chiến thuật làm đề) gắn với lịch 12 tuần (ADR 0021). Nội dung phải tự viết, không chép sách hay khoá học. Chưa có nhu cầu cho thầy cô sửa bài trên giao diện.

## Quyết định

- Bài học **PHẢI** định nghĩa trong `apps/api/src/lingo/lessons/` (một file mỗi chương); danh sách id và thứ tự nằm ở `lessons/plan.ts`, test kiểm tra khớp. Id đã công bố **KHÔNG ĐƯỢC** đổi (lịch 12 tuần và link trỏ tới).
- Mỗi bài có các phần (lý thuyết, gạch đầu dòng, ví dụ Anh – Việt kèm ghi chú), điểm cần nhớ, và phần luyện `{ part, skillTag }` lấy câu đã xuất bản có `skillTag` đó (`POST /lingo/attempts` nhận thêm `skillTag`).
- Tiến độ bài **KHÔNG ĐƯỢC** lưu riêng: tính từ 30 câu trả lời gần nhất của dạng câu; "Đã vững" khi có từ 10 câu và tỉ lệ đúng từ `max(60%, accuracyFor(target) − 5%)`.
- API: `GET /lingo/lessons/:exam` (chương, bài, tiến độ) và `GET /lingo/lessons/:exam/:id` (nội dung, bài trước / sau). Hiện chỉ có giáo trình TOEIC_LR.

## Hệ quả

| Loại     | Nội dung                                                                                                                     |
| -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Được     | Không thêm bảng hay migration; nội dung được review qua MR như code; tiến độ luôn khớp với bài làm thật.                     |
| Đánh đổi | Sửa bài phải sửa code và deploy. Bài không có `skillTag` (Part 1, đảo ngữ, chiến thuật) không có tiến độ, chỉ để đọc.        |
| Đánh đổi | Bài Part 1 chưa có phần luyện vì Lingo chưa có ảnh Part 1.                                                                   |
| Áp dụng  | `apps/api/src/lingo/lessons/`, `lessons.service.ts`, `practice.service.ts` (`skillTag`), `apps/web/app/(app)/lingo/lessons/` |

## Phương án đã cân nhắc

| Phương án                      | Lý do không chọn                                                             |
| ------------------------------ | ---------------------------------------------------------------------------- |
| Bảng `LingoLesson` + màn soạn  | Cần migration, màn soạn và duyệt; chưa có người soạn bài ngoài repo.         |
| Lưu "đã đọc" cho từng bài      | Đọc xong chưa chắc làm được; tiến độ theo câu trả lời phản ánh kỹ năng thật. |
| Markdown tự do trong một chuỗi | Khó kiểm tra cấu trúc, khó hiển thị ví dụ và ghi chú thống nhất.             |
| Chép giáo trình sách / study4  | Vi phạm bản quyền.                                                           |

## Nguồn

- Yêu cầu người dùng ngày 2026-11-22: giáo trình "như study4 đầy đủ", mục tiêu 650 → 800+, tự soạn.
- ADR 0020 (lộ trình, `accuracyFor`), ADR 0021 (lịch 12 tuần).
