---
title: '0020: Lộ trình Lingo định nghĩa trong code, tiến độ tính từ hoạt động'
status: draft
decision: accepted
date: 2026-11-21
---

# 0020: Lộ trình Lingo định nghĩa trong code, tiến độ tính từ hoạt động

## Bối cảnh

Người dùng muốn có lộ trình học TOEIC cho học viên và có bộ đề sẵn. Tài liệu tham khảo (một cẩm nang khoá TOEIC trên Google Forms) chia lộ trình thành: xây nền (từ vựng 10–15 từ/ngày, ngữ pháp, Part 5, chưa làm Part 6–7) → luyện đề; Listening học dạng câu Part 1–4 trước rồi mới luyện đề; quy đổi gần đúng điểm ≈ số câu đúng × 5 − 10. Đề và tài liệu của khoá học đó không được chép.

## Quyết định

- Lộ trình TOEIC **PHẢI** định nghĩa trong `apps/api/src/lingo/roadmap.ts`: 4 giai đoạn (Xây nền → Luyện từng Part → Luyện đề → Về đích), mỗi giai đoạn có nhiệm vụ (bài đầu vào, số từ đã thuộc, tỉ lệ đúng từng Part trên 100 câu gần nhất, số đề đã làm, điểm full test). Ngưỡng tỉ lệ đúng theo mục tiêu: `(target + 10) / 1000`.
- Tiến độ **KHÔNG ĐƯỢC** lưu riêng: `GET /lingo/roadmap/:exam` tính lại từ câu trả lời, thẻ, bài làm mỗi lần gọi.
- Bài kiểm tra đầu vào là `LingoAttemptMode.PLACEMENT`: vài câu mỗi Part (`PLACEMENT_COUNTS`, ~30 câu) từ câu đã xuất bản, có giờ, có điểm quy đổi ước tính. Giai đoạn có `passScore` thấp hơn điểm ước tính được đánh dấu "đã vượt qua".
- Đề: câu mẫu tự soạn trong `fixtures/` (không lấy từ ETS hay khoá học); "Dữ liệu mẫu" tạo thêm một đề mẫu đã xuất bản. Đề theo trình độ dùng công thức (`LEVEL_PRESETS`: loại đề + độ khó) cho AI sinh ở `/teach/tests`.

## Hệ quả

| Loại     | Nội dung                                                                                                                            |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Được     | Không thêm bảng; tiến độ luôn khớp dữ liệu thật; đổi mục tiêu là lộ trình đổi theo ngay.                                            |
| Đánh đổi | Thầy cô chưa sửa được lộ trình trên giao diện; đổi giai đoạn / ngưỡng phải sửa code. Mỗi lần mở trang chạy ~10 truy vấn.            |
| Đánh đổi | Điểm đầu vào từ ~30 câu và thang điểm tuyến tính chỉ là ước tính, không phải bảng quy đổi ETS.                                      |
| Áp dụng  | `apps/api/src/lingo/roadmap.ts`, `roadmap.service.ts`, `practice.service.ts` (`startPlacement`), `apps/web/app/(app)/lingo/roadmap` |

## Phương án đã cân nhắc

| Phương án                      | Lý do không chọn                                                   |
| ------------------------------ | ------------------------------------------------------------------ |
| Thầy cô soạn lộ trình trong DB | Cần bảng, migration và màn soạn; chưa có nhu cầu nhiều lộ trình.   |
| AI cá nhân hoá lộ trình        | Cần ARK key và tốn token mỗi lần; để sau khi lộ trình mẫu ổn định. |
| Học viên tự khai trình độ      | Dễ sai; bài đầu vào ngắn cho điểm ước tính khách quan hơn.         |

## Nguồn

- Yêu cầu người dùng ngày 2026-11-21 kèm link cẩm nang khoá TOEIC (trang Google Forms công khai: lộ trình cho người mất gốc, lộ trình Listening, cách tính điểm).
- ADR 0017 (đề thi, sinh nội dung bằng AI), 0019 (khu ra đề và phòng thi).
