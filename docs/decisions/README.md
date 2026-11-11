---
title: Quyết định kỹ thuật (ADR)
status: draft
---

# Quyết định kỹ thuật (ADR)

Mỗi file ghi một quyết định: bối cảnh → quyết định → hệ quả → phương án đã cân nhắc → nguồn. Quy tắc viết: [0001](0001-ghi-quyet-dinh-bang-adr.md). ADR mới: copy [`0000-template.md`](0000-template.md), lấy số tiếp theo.

| #    | Quyết định                                                                                                              | Trạng thái | Ngày       |
| ---- | ----------------------------------------------------------------------------------------------------------------------- | ---------- | ---------- |
| 0001 | [Ghi quyết định kỹ thuật bằng ADR](0001-ghi-quyet-dinh-bang-adr.md)                                                     | accepted   | 2026-11-11 |
| 0002 | [Version dùng chung qua pnpm catalog](0002-version-dung-chung-qua-pnpm-catalog.md)                                      | accepted   | 2026-10-21 |
| 0003 | [Type model sinh từ Prisma (`@repo/types`)](0003-type-model-sinh-tu-prisma.md)                                          | accepted   | 2026-10-24 |
| 0004 | [Nest build bằng SWC, type-check tách riêng](0004-nest-build-bang-swc-type-check-rieng.md)                              | accepted   | 2026-10-24 |
| 0005 | [Auth – cookie httpOnly cho web, Bearer cho mobile, mặc định chặn](0005-auth-cookie-web-bearer-mobile-mac-dinh-chan.md) | accepted   | 2026-11-11 |
| 0006 | [Rate limit opt-in theo controller](0006-rate-limit-opt-in-theo-controller.md)                                          | accepted   | 2026-11-10 |
| 0007 | [Upload file bằng presigned POST, không đi qua api](0007-upload-file-bang-presigned-post.md)                            | accepted   | 2026-10-23 |

`Ngày` của 0002–0007 = ngày commit đưa quyết định vào code (ADR viết lại sau, ngày 2026-11-11). `UNKNOWN` trong ADR = không có tài liệu về lý do; ai biết thì bổ sung.
