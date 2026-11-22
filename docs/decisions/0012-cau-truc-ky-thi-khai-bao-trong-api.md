---
title: '0012: Cấu trúc kỳ thi Lingo khai báo bằng code trong api, nội dung nằm trong DB'
status: draft
decision: accepted
date: 2026-11-18
---

# 0012: Cấu trúc kỳ thi Lingo khai báo bằng code trong api, nội dung nằm trong DB

## Bối cảnh

- Lingo ([docs/product/lingo.md](../product/lingo.md)) làm TOEIC trước, sau đó thêm IELTS và HSK. Mỗi kỳ thi có
  cấu trúc riêng: phần thi, Part, số đáp án, thời gian, cách quy đổi điểm.
- Quy đổi điểm và kiểm tra đáp án là logic, không phải dữ liệu thuần.
- Người dùng không muốn tách cấu trúc này thành một package build riêng.

## Quyết định

- Cấu trúc kỳ thi khai báo bằng TypeScript trong `apps/api/src/lingo/specs` (mỗi kỳ thi một file, đăng ký ở `EXAMS`).
  Web lấy cấu trúc qua `GET /api/lingo/exams/:exam`, **KHÔNG ĐƯỢC** khai báo lại ở web.
- Mã kỳ thi, phần thi, Part lưu trong DB dạng chuỗi (`exam`, `section`, `part`), **KHÔNG ĐƯỢC** dùng enum Prisma.
  Api kiểm tra mã hợp lệ bằng spec.
- Nội dung (câu hỏi, đáp án) theo từng dạng câu, lưu JSON (`prompt`, `answer`, `response`), kiểm tra bằng schema zod
  trong `specs/schemas.ts`.

## Hệ quả

| Loại     | Nội dung                                                                                     |
| -------- | -------------------------------------------------------------------------------------------- |
| Được     | Thêm kỳ thi = thêm một file spec, không cần migration. Một nơi duy nhất định nghĩa cấu trúc. |
| Đánh đổi | Web không kiểm tra được file nhập trước khi gửi: lỗi do api trả về theo từng dòng.           |
| Đánh đổi | DB không chặn mã sai (không có enum / FK tới bảng kỳ thi): chỉ api kiểm tra.                 |
| Áp dụng  | `apps/api/src/lingo/specs`, `specs.spec.ts`, `test/lingo.e2e-spec.ts`                        |

## Phương án đã cân nhắc

| Phương án                                     | Lý do không chọn                                                      |
| --------------------------------------------- | --------------------------------------------------------------------- |
| Package `@repo/exam-specs` dùng chung api/web | Người dùng không muốn thêm lib build riêng cho một app.               |
| Bảng `exams` / `parts` trong DB               | Quy đổi điểm và dạng câu là logic; vẫn phải viết code cho mỗi kỳ thi. |
| Enum Prisma cho mã kỳ thi / Part              | Mỗi kỳ thi mới cần migration.                                         |

## Nguồn

Thiết kế: [docs/product/lingo.md](../product/lingo.md) (PR #39). Cài đặt: branch `feature/lingo-phase-1`.
