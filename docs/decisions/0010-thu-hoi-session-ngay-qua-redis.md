---
title: '0010: Thu hồi session ngay lập tức qua danh sách trong Redis'
status: draft
decision: accepted
date: 2026-11-12
---

# 0010: Thu hồi session ngay lập tức qua danh sách trong Redis

Thay một phần của [0005](0005-auth-cookie-web-bearer-mobile-mac-dinh-chan.md): ý "api và socket chỉ kiểm tra chữ ký".

## Bối cảnh

- Theo 0005, access token là JWT, api và socket chỉ kiểm tra chữ ký.
- Vì vậy sau khi đăng xuất, đổi mật khẩu hoặc bị thu hồi do refresh token bị dùng lại, access token đã phát vẫn hợp lệ tới khi hết hạn (≤ `ACCESS_TOKEN_TTL_SECONDS`, mặc định 15 phút).
- Token bị đánh cắp vẫn dùng được trong khoảng thời gian đó.
- api và socket đã kết nối Redis (`@repo/redis`), cùng `env.redisKeyPrefix`.

## Quyết định

- Khi session kết thúc, api ghi `auth:revoked-session:<sid>` vào Redis, TTL bằng `ACCESS_TOKEN_TTL_SECONDS`. Các trường hợp: đăng xuất, đổi mật khẩu (các session khác), phát hiện refresh token bị dùng lại.
- `AuthGuard` (HTTP) và `socketAuth` (handshake) **PHẢI** kiểm tra key này sau khi verify chữ ký. Session đã thu hồi được xử lý như không có token.
- Redis không truy cập được → request lỗi (fail closed). **KHÔNG ĐƯỢC** cho qua khi không kiểm tra được.
- Đăng xuất chỉ thu hồi khi refresh token đúng. Biết `sessionId` thôi thì không đủ để thu hồi.
- `AuthModule.forRoot` **PHẢI** nhận `revocationStore` (hiện là `REDIS`). api và socket **PHẢI** dùng cùng Redis và cùng `redisKeyPrefix`.

## Hệ quả

| Loại     | Nội dung                                                                                                                                                                                                                      |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Được     | Access token của session đã kết thúc bị từ chối ngay ở api và khi kết nối socket                                                                                                                                              |
| Được     | Danh sách tự dọn: mỗi key chỉ sống bằng 1 vòng đời access token                                                                                                                                                               |
| Đánh đổi | Mỗi request có token thêm 1 lệnh `EXISTS` tới Redis                                                                                                                                                                           |
| Đánh đổi | api và socket phụ thuộc Redis cho mọi route cần đăng nhập (trước chỉ throttler và adapter Socket.IO)                                                                                                                          |
| Đánh đổi | Kết nối socket đang mở không bị đóng khi session kết thúc; chỉ kết nối mới bị chặn                                                                                                                                            |
| Đánh đổi | DB thu hồi xong nhưng ghi Redis lỗi → request trả 500, access token còn sống tới khi hết hạn                                                                                                                                  |
| Áp dụng  | `packages/auth/src/revoked-sessions.ts`, `AuthGuard`, `socketAuth`, `AuthModule.forRoot({ revocationStore })`, `apps/api/src/auth/auth.service.ts`, e2e `apps/api/test/auth.e2e-spec.ts`, `apps/socket/test/chat.e2e-spec.ts` |

## Phương án đã cân nhắc

| Phương án                                  | Lý do không chọn                                                                |
| ------------------------------------------ | ------------------------------------------------------------------------------- |
| Tra bảng `sessions` trong DB mỗi request   | Thêm 1 query Postgres mỗi request; socket không kết nối DB                      |
| Rút ngắn TTL access token                  | Chỉ thu hẹp khoảng hở, không đóng được; refresh nhiều hơn                       |
| Fail open khi Redis lỗi                    | Mất bảo đảm thu hồi đúng lúc sự cố                                              |
| Lưu danh sách session còn sống (allowlist) | Phải ghi Redis ở mỗi lần đăng nhập/refresh và giữ key 30 ngày; denylist nhỏ hơn |

## Nguồn

- [`docs/architecture/auth.md`](../architecture/auth.md)
- ADR [0005](0005-auth-cookie-web-bearer-mobile-mac-dinh-chan.md)
