---
title: '0017: Lingo sinh nội dung bằng BytePlus chạy nền, phần Nghe tạm đọc bằng trình duyệt'
status: draft
decision: accepted
date: 2026-11-21
---

# 0017: Lingo sinh nội dung bằng BytePlus chạy nền, phần Nghe tạm đọc bằng trình duyệt

## Bối cảnh

- ADR 0013 để AI là nguồn nội dung "sau MVP" vì chưa có key. Nay đã có tài khoản BytePlus ModelArk (ADR 0016).
- Bộ đề (đề full 200 câu, mini ~96 câu) cần lưu trong DB. Soạn tay đủ 7 Part rất lâu.
- Sinh một đề cần hàng chục lượt gọi model (vài phút), vượt thời gian chờ hợp lý của một request HTTP.
- Phần Nghe (Part 1–4) cần audio. Google TTS (thiết kế mục 5.3) chưa có credential.

## Quyết định

- Nội dung AI đi qua **cùng đường** với nhập tay (ADR 0013): `AdminService.storeItems` kiểm schema Part → `DRAFT`,
  hoặc `NEEDS_REVIEW` khi lượt tự kiểm (model làm lại câu, không kèm đáp án) lệch đáp án. **KHÔNG ĐƯỢC** tự xuất bản.
- Sinh câu theo Part và sinh trọn đề chạy **nền trong tiến trình api** (`GeneratorService`), tiến độ ghi vào
  `LingoBatch` (`status` RUNNING / DONE / FAILED, `succeeded`, `failed`, `errors`). Web hỏi lại `GET /lingo/admin/batches`
  mỗi 3 giây khi có batch đang chạy. Batch RUNNING quá 2 giờ lúc api khởi động → FAILED.
- Bộ đề là `LingoTest` + `LingoTestItem` (item theo thứ tự đề). Đề chỉ xuất bản được khi **mọi** item đã PUBLISHED;
  item Part 1 phải có ảnh tải lên trước khi duyệt.
- Phần Nghe tạm thời: API gửi transcript (và câu hỏi / lựa chọn Part 1–2) xuống trình duyệt, web đọc bằng
  `speechSynthesis`, ẩn chữ đến khi nộp bài. Có `audioKey` (TTS thật, ADR 0014 dự kiến) thì sẽ gửi audio thay transcript.

## Hệ quả

| Loại     | Nội dung                                                                                                                                      |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Được     | Có đủ 7 Part và đề thi thử ngay, không cần credential TTS. Thêm nguồn AI không đổi phần học / chấm.                                           |
| Được     | e2e chạy không cần key: thay `ArkModel` bằng bản giả.                                                                                         |
| Đánh đổi | Transcript Part 1–4 tới trình duyệt trước khi nộp: người học mở devtools là đọc được. Chấp nhận được cho app luyện thi.                       |
| Đánh đổi | Giọng đọc phụ thuộc trình duyệt / hệ điều hành; Firefox Linux có thể không có giọng.                                                          |
| Đánh đổi | Job nền chạy trong một tiến trình: restart giữa chừng làm mất job (batch thành FAILED). Nhiều instance thì job ở instance gọi.                |
| Áp dụng  | `apps/api/src/lingo/{generator.service,generate-prompts,tests.service,assemble}.ts`, `apps/web/lib/speech.ts`, `test/lingo-tests.e2e-spec.ts` |

## Phương án đã cân nhắc

| Phương án                               | Lý do không chọn                                                  |
| --------------------------------------- | ----------------------------------------------------------------- |
| Hàng đợi (BullMQ trên Redis) cho job AI | Thêm worker và dependency; một admin chạy vài job mỗi ngày là đủ. |
| Gọi model đồng bộ trong request         | Một đề mất vài phút: request timeout, admin phải giữ tab mở.      |
| Chờ Google TTS rồi mới làm phần Nghe    | Chưa có credential; chặn cả Part 1–4 và full test.                |
| Sinh audio bằng TTS của BytePlus        | Chưa kiểm tra API / giá; cần ADR riêng thay 0014.                 |

## Nguồn

Branch `feature/lingo-toeic-tests`. Thay phần "AI sau MVP" của ADR 0013; ADR 0014 (TTS) giữ nguyên, chưa làm.
