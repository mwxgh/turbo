---
title: '0005: Auth – cookie httpOnly cho web, Bearer cho mobile, mặc định chặn'
status: draft
decision: accepted
date: 2026-11-11
---

# 0005: Auth – cookie httpOnly cho web, Bearer cho mobile, mặc định chặn

## Bối cảnh

- Một api phục vụ 3 loại client: trình duyệt (web), server Next (RSC, Server Action) và app native (mobile).
- socket cũng cần xác thực người dùng.
- Route mới dễ bị quên gắn guard.

## Quyết định

- `AuthGuard` là guard **global** của api và socket. Mọi route **PHẢI** có access token, trừ route gắn `@Public()`.
- Access token: JWT HS256, sống 15 phút (`ACCESS_TOKEN_TTL_SECONDS`). api và socket chỉ kiểm tra chữ ký, không truy vấn DB.
- Refresh token: `<sessionId>.<secret>`, sống 30 ngày. DB chỉ lưu sha256 của secret. Mỗi lần refresh, token được xoay.
  - Token vừa bị thay vẫn được chấp nhận 60 giây (2 tab refresh cùng lúc).
  - Token cũ hơn bị dùng lại → thu hồi cả session.
- Mật khẩu: argon2id (`node:crypto`), định dạng PHC.
- Web: cookie httpOnly, `SameSite=Lax`. Mobile: header `Authorization: Bearer`, token lưu trong `expo-secure-store`.
- **KHÔNG ĐƯỢC** trả `passwordHash`.

## Hệ quả

| Loại     | Nội dung                                                                                                                   |
| -------- | -------------------------------------------------------------------------------------------------------------------------- |
| Được     | Route mới an toàn mặc định; JS trên trình duyệt không đọc được token; api / socket không tra DB mỗi request                |
| Đánh đổi | Đăng xuất / đổi mật khẩu: access token đã phát vẫn hợp lệ tới khi hết hạn (≤ 15 phút)                                      |
| Đánh đổi | Web và api **PHẢI** cùng site (`SameSite=Lax`); khác host cần `COOKIE_DOMAIN`                                              |
| Áp dụng  | `packages/auth`, `apps/api/src/auth`, `apps/web/proxy.ts`, e2e `apps/api/test/auth.e2e-spec.ts`, Playwright `auth.spec.ts` |

## Phương án đã cân nhắc

| Phương án                                       | Lý do không chọn                                                   |
| ----------------------------------------------- | ------------------------------------------------------------------ |
| Tra session trong DB mỗi request (thu hồi ngay) | Đánh đổi để không tra DB mỗi request (`docs/architecture/auth.md`) |
| Token trong `localStorage` cho web              | UNKNOWN                                                            |
| SSO / OIDC (Keycloak)                           | Chưa làm; hướng mở rộng có trong `docs/architecture/auth.md`       |

## Nguồn

- Commit `060b48e` _feat(auth): password sign-in with rotating sessions, default-deny guard_
- [`docs/architecture/auth.md`](../architecture/auth.md)
