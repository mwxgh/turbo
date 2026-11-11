---
title: '0007: Upload file bằng presigned POST, không đi qua api'
status: draft
decision: accepted
date: 2026-10-23
---

# 0007: Upload file bằng presigned POST, không đi qua api

## Bối cảnh

- Người dùng upload file tới 50 MB lên S3 / MinIO.
- Cấu hình storage theo định dạng btp (`STORAGE_CORE_S3_SERVERS`, `STORAGE_BUCKET`).

## Quyết định

1. Client gọi `POST /api/files/uploads` `{ fileName, contentType, size }`.
2. api ký presigned POST và trả `{ url, fields, key }`.
   - Chữ ký hết hạn sau 5 phút.
   - Chữ ký chứa `content-length-range` ≤ 50 MB và `Content-Type`.
   - Key: `uploads/<yyyy>/<mm>/<uuid>/<tên>`.
3. Trình duyệt POST file thẳng lên storage.

- **KHÔNG ĐƯỢC** stream file qua api.
- Credential S3 **PHẢI** nằm trong `.env` không commit.
- UI **PHẢI** dùng `FileUploadDialog` / `FileUpload` của `@repo/ui` với `uploadToStorage`.

## Hệ quả

| Loại     | Nội dung                                                                                                      |
| -------- | ------------------------------------------------------------------------------------------------------------- |
| Được     | Dung lượng file không đi qua api; giới hạn kích thước và loại file do storage kiểm tra theo chữ ký            |
| Đánh đổi | Bucket **PHẢI** cho phép CORS `POST` từ origin của web                                                        |
| Đánh đổi | File đã tải nhưng người dùng bỏ dở: UI gọi `onRemove`; file mồ côi do lý do khác chưa có cơ chế dọn (UNKNOWN) |
| Áp dụng  | `apps/api/src/files`, `apps/web/lib/storage.ts`, `AGENTS.md` (File uploads)                                   |

## Phương án đã cân nhắc

| Phương án                | Lý do không chọn |
| ------------------------ | ---------------- |
| Upload multipart qua api | UNKNOWN          |
| Presigned PUT            | UNKNOWN          |

## Nguồn

- Commit `5dd08e9` _feat: add list table, redis, s3 upload and shared tooling_, `28e5540`
- README mục _Upload file (S3)_
