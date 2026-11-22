---
title: '0021: Lịch học Lingo 12 tuần định nghĩa trong code, đo theo từng tuần'
status: draft
decision: accepted
date: 2026-11-22
---

# 0021: Lịch học Lingo 12 tuần định nghĩa trong code, đo theo từng tuần

## Bối cảnh

Người dùng (trình độ khoảng 650, mục tiêu 800+) muốn một lộ trình học cụ thể như study4: mỗi tuần học gì, luyện Part nào, khi nào làm đề. Lộ trình của ADR 0020 chỉ có 4 giai đoạn với nhiệm vụ tích luỹ, không nói tuần này làm gì. Đề ETS và đề của study4 không được chép (bản quyền); nội dung là câu tự soạn trong `fixtures/`.

## Quyết định

- Lịch học **PHẢI** định nghĩa trong `apps/api/src/lingo/study-plan.ts` (`TOEIC_PLAN`): 12 tuần, mỗi tuần có chủ đề, trọng tâm, lời khuyên, số từ mới, số câu từng Part và số mini / full test.
- Lịch bắt đầu từ **ngày** (00:00 UTC) làm bài kiểm tra đầu vào đầu tiên, mỗi tuần 7 ngày. Trước bài đầu vào, lịch chưa bắt đầu.
- Tiến độ tuần **KHÔNG ĐƯỢC** lưu riêng: `GET /lingo/roadmap/:exam` trả thêm `plan`, tính từ câu trả lời (`answeredAt`), thẻ học lần đầu (`LingoCardState.createdAt`) và bài full test nộp trong khoảng ngày của tuần.
- Tỉ lệ đúng tuần tăng dần: tuần 1–4 thấp hơn mục tiêu 10 điểm %, tuần 5–8 thấp hơn 5, tuần 9–12 bằng `accuracyFor(target)` của ADR 0020.
- Tuần trôi qua chưa đủ nhiệm vụ là "Chưa đạt"; lịch không lùi lại hay kéo dài.

## Hệ quả

| Loại     | Nội dung                                                                                                                                          |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Được     | Không thêm bảng, không migration; đổi mục tiêu là ngưỡng tuần đổi theo; giai đoạn của ADR 0020 vẫn giữ nguyên.                                    |
| Đánh đổi | Ranh giới tuần theo UTC (7 giờ sáng giờ Việt Nam). Câu của bài đầu vào được tính vào tuần 1. Tuần 9–12 cần full test; hiện chưa có full test nào. |
| Đánh đổi | Không chỉnh lịch theo ngày thi; muốn làm lại từ đầu phải chờ hết 12 tuần.                                                                         |
| Áp dụng  | `apps/api/src/lingo/study-plan.ts`, `roadmap.service.ts` (`planWeeks`), `apps/web/app/(app)/lingo/roadmap/_components/roadmap-view.tsx`           |

## Phương án đã cân nhắc

| Phương án                           | Lý do không chọn                                                              |
| ----------------------------------- | ----------------------------------------------------------------------------- |
| Lưu ngày bắt đầu lịch vào DB        | Cần migration và nút "bắt đầu"; bài đầu vào đã là mốc tự nhiên.               |
| Tính lùi từ ngày thi                | Ngày thi không bắt buộc; thi sớm hơn 12 tuần sẽ phải bỏ tuần, khó giải thích. |
| Bắt đầu từ thứ Hai của tuần đầu vào | Làm bài đầu vào cuối tuần thì tuần 1 chỉ còn một, hai ngày.                   |
| Chép lộ trình / đề của study4       | Vi phạm bản quyền; lịch tự viết theo cấu trúc đề ETS công khai.               |

## Nguồn

- Yêu cầu người dùng ngày 2026-11-22: "thiết kế lộ trình phù hợp … giáo trình chuẩn, đề thi phù hợp (tương tự study4)", trình độ ~650 → 800+, tự soạn đề.
- ADR 0020 (lộ trình 4 giai đoạn, `accuracyFor`, bài đầu vào).
