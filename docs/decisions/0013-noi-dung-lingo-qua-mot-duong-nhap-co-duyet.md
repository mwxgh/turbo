---
title: '0013: Nội dung Lingo vào qua một đường nhập chung, admin duyệt trước khi xuất bản'
status: draft
decision: accepted
date: 2026-11-18
---

# 0013: Nội dung Lingo vào qua một đường nhập chung, admin duyệt trước khi xuất bản

## Bối cảnh

- Lingo không được sao chép đề có bản quyền (ETS…). Câu hỏi do admin soạn, sau này có thể do AI sinh.
- Bản đầu không dùng AI: chưa có API key và ngân sách (xem [docs/product/lingo.md](../product/lingo.md)).
- Câu sai đáp án làm người học học sai, nên mọi câu cần người kiểm tra trước khi xuất hiện.

## Quyết định

- Mọi nội dung đi qua `AdminService.importItems`: kiểm tra schema của Part → `DRAFT` → admin duyệt → `PUBLISHED`.
  Người học chỉ thấy `PUBLISHED`. Mỗi lần nhập ghi một `LingoBatch` (nguồn, file, số dòng thành công / lỗi).
- Nguồn bản đầu: form / file JSON (câu hỏi), file CSV (từ vựng), ~~dữ liệu mẫu (`POST /api/lingo/admin/samples`)~~ (bỏ theo ADR 0032: file nội dung qua `content:import`).
  AI sinh đề sau này là một nguồn thêm (`LingoBatchSource.AI`), **PHẢI** đi qua cùng đường và cùng bước duyệt.
- Câu trùng nội dung (`contentHash`) bị bỏ qua. Đáp án và giải thích **KHÔNG ĐƯỢC** trả cho người học trước khi nộp bài.

## Hệ quả

| Loại     | Nội dung                                                                                 |
| -------- | ---------------------------------------------------------------------------------------- |
| Được     | Không cần key AI để chạy. Thêm AI không đổi phần học / chấm.                             |
| Đánh đổi | Soạn đề tay tốn công; kho câu lớn chậm hơn so với sinh bằng AI.                          |
| Đánh đổi | Body request tối đa 100 KB (`BODY_LIMIT`): file lớn phải chia nhỏ.                       |
| Áp dụng  | `apps/api/src/lingo/admin.service.ts`, `practice.service.ts` (`questionView`), e2e Lingo |

## Phương án đã cân nhắc

| Phương án                               | Lý do không chọn                                                   |
| --------------------------------------- | ------------------------------------------------------------------ |
| AI sinh đề ngay từ bản đầu (Claude API) | Chưa có API key cá nhân và ngân sách; gói công ty không dùng được. |
| Model AI chạy local trên server         | Server 4 CPU, 7.7 GB RAM, không GPU.                               |
| Xuất bản thẳng, không duyệt             | Câu sai đáp án đến tay người học.                                  |

## Nguồn

Thiết kế: [docs/product/lingo.md](../product/lingo.md) (PR #39). Cài đặt: branch `feature/lingo-phase-1`.
