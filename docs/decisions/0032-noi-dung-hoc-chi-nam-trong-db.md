---
title: '0032: Nội dung học chỉ nằm trong DB, nạp bằng content:import sau khi audit'
status: draft
decision: accepted
date: 2026-11-27
---

# 0032: Nội dung học chỉ nằm trong DB, nạp bằng content:import sau khi audit

## Bối cảnh

- Nội dung Studio nằm trong `packages/db/prisma/studio-content.ts`, nạp bằng `pnpm db:seed` (ADR 0029). Nội dung Lingo (câu hỏi, đề, bộ từ vựng) nằm trong `apps/api/src/lingo/fixtures` (~25.000 dòng), nạp bằng nút "Nạp dữ liệu mẫu" hoặc `lingo:seed`.
- Deploy không chạy seed, nên stg/prod không tự có nội dung. Mỗi lần sửa nội dung phải sửa code, MR và deploy.
- Người dùng muốn bỏ toàn bộ nội dung khỏi file TS và seed. Nội dung do Claude soạn, được audit, rồi đưa thẳng vào DB local và prod (2026-11-27).

## Quyết định

Thay phần "nội dung khởi đầu trong `studio-content.ts`, seed" của ADR 0029 và phần "dữ liệu mẫu" của ADR 0013.

- Nội dung học (Studio: track, bài, quiz, lộ trình; Lingo: câu hỏi, đề, bộ từ vựng, giáo trình) **CHỈ** nằm trong DB. **KHÔNG ĐƯỢC** để trong file TS / JSON của repo, trong `seed.ts` hay trong migration mới.
- Seed chỉ tạo admin đầu tiên và dữ liệu mẫu kỹ thuật (`hellos`).
- Nội dung đi vào DB bằng một đường: file JSON **ngoài repo** → `pnpm --filter api content:import <file> --dry-run` (kiểm tra schema) → audit nội dung → nạp DB local → kiểm tra trên app → nạp prod qua SSH tunnel (`DATABASE_URL=… content:import <file> --remote`).
- Script chạy lại an toàn: Studio theo slug (bài theo track + slug, quiz và bước lộ trình được thay), Lingo theo hash nội dung / tên đề / từ của bộ.
- Prod chỉ nạp được sau khi migration cùng schema đã lên prod (ví dụ enum category mới).
- e2e dùng dữ liệu test giả trong `apps/e2e/fixtures/` và `apps/api/test/lingo-content.ts`, nạp bằng cùng đường import. Đây không phải nội dung học.

## Hệ quả

| Loại     | Nội dung                                                                                                                                                                                |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Được     | Repo không còn ~27.000 dòng nội dung. Sửa nội dung không cần MR / deploy. Mọi môi trường nạp cùng một file.                                                                             |
| Đánh đổi | Nội dung không review qua MR: phải audit file trước khi nạp. Các môi trường có thể lệch nhau nếu quên nạp. File nguồn nằm ngoài repo, DB là bản gốc (backup bằng `pg_dump`).            |
| Đánh đổi | Người ghi prod cần SSH vào server.                                                                                                                                                      |
| Áp dụng  | `apps/api/scripts/content-import.ts`, `AdminLearnService.importContent`, `AdminService.importContent` + `lingo/content-file.ts`, `packages/db/prisma/seed.ts`, `apps/e2e/prepare-db.ts` |

## Phương án đã cân nhắc

| Phương án                              | Lý do không chọn                                                              |
| -------------------------------------- | ----------------------------------------------------------------------------- |
| Giữ seed từ file TS (ADR 0029)         | Người dùng không muốn nội dung trong code; deploy không chạy seed.            |
| Data migration cho mỗi đợt nội dung    | Migration là cho schema; nội dung lớn làm phình lịch sử migration.            |
| Nạp qua trang admin (upload file JSON) | Cần thêm UI; script đủ cho một người nạp. Có thể thêm sau, dùng cùng service. |

## Nguồn

- Yêu cầu người dùng ngày 2026-11-27: "clear hết trong các file ts hoặc seed … kéo về từ claude … đưa hết về DB … không phải qua seed … đưa thẳng vào db local và prod sau khi đã audit".
- ADR 0013, ADR 0029, ADR 0031.
