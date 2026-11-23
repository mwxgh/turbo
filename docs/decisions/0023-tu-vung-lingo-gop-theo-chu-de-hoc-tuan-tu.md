---
title: '0023: Từ vựng Lingo gộp theo chủ đề, học tuần tự; dùng nội bộ được chép tài liệu có bản quyền'
status: draft
decision: accepted
date: 2026-11-23
---

# 0023: Từ vựng Lingo gộp theo chủ đề, học tuần tự; dùng nội bộ được chép tài liệu có bản quyền

## Bối cảnh

Thẻ mẫu đến từ ba nguồn, mỗi nguồn là các bộ riêng: 20 bộ soạn cho Lingo (v0.6.0, đã nạp trên các môi trường), 5 bộ chép từ tài liệu "600 từ vựng TOEIC Part 5 & 6" (v0.7.0) và 14 bộ chép từ sách "Full bộ từ vựng ôn thi TOEIC từ 0–990" (v0.8.0). Gộp lại có 1657 thẻ nhưng chỉ 1426 từ khác nhau: học viên ôn một từ nhiều lần ở nhiều bộ. Người dùng muốn bỏ tên bộ theo nguồn, chia theo chủ đề và cho học viên học tuần tự.

`docs/product/lingo.md` mục 5.1 cấm chép nguyên bộ từ của sách có bản quyền, nhưng hai nguồn sau đã chép. Người dùng xác nhận app chỉ dùng cá nhân / nội bộ, không công khai.

## Quyết định

- Nguồn thẻ (`apps/api/src/lingo/fixtures/decks/*`, `toeic-decks.ts`, `toeic-part5.ts`) chỉ là nguyên liệu. Thẻ hệ thống **PHẢI** dựng bằng `fixtures/vocab.ts`: mỗi từ đúng một thẻ, gộp nội dung mọi nguồn (nghĩa, IPA, ví dụ, từ mở rộng), xếp vào một chủ đề, chia bài tối đa 40 thẻ tên `Bài NN · <chủ đề>`.
- Thứ tự bài là thứ tự học: queue lấy thẻ mới theo bộ tạo trước (uuid7). Trong một chủ đề, từ cơ bản (starter, bộ Lingo) đứng trước từ trong sách.
- "Nạp dữ liệu mẫu" đồng bộ: thẻ cùng từ ở bộ hệ thống cũ (`LEGACY_DECK_TITLES`) được **chuyển** sang bài mới (giữ id, giữ tiến độ học); bộ cũ rỗng thì xoá. Bộ admin tự tạo không bị đụng.
- Lingo dùng nội bộ, không công khai, nên **được** chép tài liệu có bản quyền mà người dùng cung cấp. Lingo **KHÔNG ĐƯỢC** mở cho người ngoài khi còn nội dung này; muốn công khai phải gỡ hoặc tự soạn lại.

## Hệ quả

| Loại     | Nội dung                                                                                                    |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| Được     | 1426 thẻ không trùng trong 48 bài; thẻ nhiều nguồn có đủ nghĩa, IPA, ví dụ, từ mở rộng                      |
| Đánh đổi | Thêm nguồn mới phải khai báo chủ đề trong `vocab.ts`; khi một từ có hai nghĩa ở hai chủ đề, chỉ còn một thẻ |
| Áp dụng  | `fixtures/vocab.ts`, `AdminService.syncDecks`, test `fixtures.spec.ts` (một thẻ một từ, bài ≤ 40)           |

## Phương án đã cân nhắc

| Phương án                           | Lý do không chọn                                         |
| ----------------------------------- | -------------------------------------------------------- |
| Giữ các bộ theo nguồn               | Trùng 231 thẻ; học viên phải tự chọn bộ                  |
| Bỏ từ trùng khỏi bộ sách, giữ bộ cũ | Mất IPA, ví dụ, từ mở rộng của sách; vẫn chia theo nguồn |
| Xoá bộ cũ rồi nạp lại               | Mất tiến độ học (FSRS) của các thẻ đã nạp từ v0.6.0      |

## Nguồn

- PR #49 (Part 5–6), #50 (sách 0–990); yêu cầu người dùng ngày 2026-11-23.
