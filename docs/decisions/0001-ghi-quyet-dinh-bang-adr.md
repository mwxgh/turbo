---
title: '0001: Ghi quyết định kỹ thuật bằng ADR'
status: draft
decision: accepted
date: 2026-11-11
---

# 0001: Ghi quyết định kỹ thuật bằng ADR

## Bối cảnh

- README và `AGENTS.md` ghi **cách làm** (lệnh, quy ước). Hai file này ít ghi **vì sao** chọn cách đó.
- Lý do hiện nằm rải rác trong commit message và `docs/architecture/*.md`.
- `docs/README.md` đã dành thư mục `decisions/` cho ADR (Architecture Decision Record), nhưng thư mục này trống.

## Quyết định

- Mỗi quyết định kỹ thuật có ảnh hưởng lâu dài **PHẢI** có một ADR trong `docs/decisions/NNNN-tieu-de.md`.
- ADR mới **PHẢI** bắt đầu từ [`0000-template.md`](0000-template.md).
- Đổi quyết định: viết ADR mới, đổi `decision` của ADR cũ thành `superseded by NNNN`. **KHÔNG ĐƯỢC** sửa nội dung ADR cũ để đảo quyết định.
- Lý do không có bằng chứng **PHẢI** ghi `UNKNOWN`.

Cần ADR khi thay đổi một trong các mục: framework / thư viện nền, cấu trúc repo, auth / bảo mật, lưu trữ dữ liệu, quy trình build / deploy, quy ước bắt buộc trong `AGENTS.md`.

## Hệ quả

| Loại     | Nội dung                                                          |
| -------- | ----------------------------------------------------------------- |
| Được     | Người mới và AI agent đọc được lý do trước khi đổi code           |
| Đánh đổi | Thêm một file cần viết và review cho mỗi quyết định lớn           |
| Áp dụng  | Review PR; mục lục trong [`README.md`](README.md) của thư mục này |

## Phương án đã cân nhắc

UNKNOWN.

## Nguồn

- `docs/README.md` (mục `decisions/`)
- 0002–0007: viết lại các quyết định đã có trong code, ngày 2026-11-11.
