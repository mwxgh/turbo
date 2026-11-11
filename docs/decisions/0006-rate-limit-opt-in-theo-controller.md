---
title: '0006: Rate limit opt-in theo controller'
status: draft
decision: accepted
date: 2026-11-10
---

# 0006: Rate limit opt-in theo controller

## Bối cảnh

- api cần giới hạn số request từ client bên ngoài. Bộ đếm lưu trong Redis (`RedisThrottlerStorage`), dùng chung giữa các instance.
- Một số route **không** được giới hạn: health probe, metrics, webhook đã xác thực chữ ký.
- Commit `7b87d65` dùng guard global. Commit `7d89464` đổi sang opt-in.

## Quyết định

- Không có `ThrottlerGuard` global.
- Controller nhận request từ bên ngoài **PHẢI** gắn `@UseGuards(ThrottlerGuard)`.
- Health / metrics **KHÔNG ĐƯỢC** gắn guard.
- Đổi mức cho một route: `@Throttle()`; bỏ: `@SkipThrottle()`.

## Hệ quả

| Loại     | Nội dung                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------ |
| Được     | Bật / tắt theo controller, không cần danh sách loại trừ                                          |
| Đánh đổi | Endpoint mới **không** tự được bảo vệ; dựa vào quy tắc + review                                  |
| Áp dụng  | `AGENTS.md` (Rate limit); template `pnpm gen resource` gắn sẵn guard; e2e `security.e2e-spec.ts` |

## Phương án đã cân nhắc

| Phương án                        | Lý do không chọn                                                     |
| -------------------------------- | -------------------------------------------------------------------- |
| Guard global + `@SkipThrottle()` | Cần danh sách loại trừ (health, webhook, metrics…) (`rate-limit.md`) |

## Nguồn

- Commit `7b87d65`, `7d89464`, `3823dd4`
- [`docs/architecture/rate-limit.md`](../architecture/rate-limit.md) mục _Vì sao opt-in_
