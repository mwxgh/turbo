---
title: '0011: Đăng nhập bằng Google / Facebook / GitHub do api xử lý (OAuth code + PKCE)'
status: draft
decision: accepted
date: 2026-11-12
---

# 0011: Đăng nhập bằng Google / Facebook / GitHub do api xử lý (OAuth code + PKCE)

## Bối cảnh

- Người dùng muốn đăng nhập bằng Google, Facebook hoặc GitHub, trên web và mobile.
- Phiên đăng nhập của hệ thống đã do api quản lý ([0005](0005-auth-cookie-web-bearer-mobile-mac-dinh-chan.md), [0010](0010-thu-hoi-session-ngay-qua-redis.md)): `AuthService.issue()` không phụ thuộc cách đăng nhập.
- `User.passwordHash` đã cho phép `null`.

## Quyết định

- api chạy luồng OAuth 2.0 authorization code + PKCE cho cả 3 provider (`apps/api/src/oauth`), không dùng thư viện OAuth. Client secret **KHÔNG ĐƯỢC** ra khỏi api.
- Kết quả là session của hệ thống (cookie cho web; mã 1 lần + PKCE giữa app và api cho mobile). Token của provider không được lưu.
- Tài khoản provider lưu ở bảng `user_identities` (unique `provider + subject`). **KHÔNG ĐƯỢC** nhận diện theo email.
- Liên kết với user có sẵn **chỉ** khi provider xác nhận email. Email Facebook coi như chưa xác nhận.
- `state` dùng 1 lần, lưu trong Redis, và **PHẢI** khớp cookie `oauth_state` của trình duyệt.
- Provider bật khi có đủ `OAUTH_<NAME>_CLIENT_ID` và `_SECRET`. Client hỏi `GET /auth/methods` để biết nút nào được hiện.

## Hệ quả

| Loại     | Nội dung                                                                                                                                                 |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Được     | Web và mobile dùng chung một luồng phía server; session, thu hồi, xoay token giữ nguyên như đăng nhập mật khẩu                                           |
| Được     | Không thêm dependency; mỗi provider là một mục cấu hình (`PROVIDERS`)                                                                                    |
| Đánh đổi | Phải tự theo dõi thay đổi API của provider (URL, field profile); test chỉ dùng provider giả                                                              |
| Đánh đổi | Người dùng Facebook trùng email với tài khoản có sẵn không tự liên kết được; chưa có màn liên kết provider khi đã đăng nhập                              |
| Đánh đổi | Bản Expo web không có nút provider                                                                                                                       |
| Áp dụng  | `apps/api/src/oauth`, `UserIdentity` trong `schema.prisma`, `apps/web/app/(auth)`, `apps/mobile/src/lib/oauth.ts`, e2e `apps/api/test/oauth.e2e-spec.ts` |

## Phương án đã cân nhắc

| Phương án                                          | Lý do không chọn                                                                 |
| -------------------------------------------------- | -------------------------------------------------------------------------------- |
| Auth.js / NextAuth ở web (như btp-backoffice-web)  | Session sẽ nằm ở Next, tách khỏi api; mobile phải làm luồng riêng                |
| passport-\* strategies trong Nest                  | Mỗi provider một package, thêm phụ thuộc; vẫn phải tự làm phần mobile + liên kết |
| Thư viện client OAuth (arctic, openid-client)      | Có thể chọn sau; luồng hiện tại ngắn và cùng một dạng cho 3 provider             |
| Native SDK (Google Sign-In, Facebook SDK) ở mobile | Mỗi provider một SDK native, cấu hình riêng iOS/Android; GitHub không có SDK     |
| Tự liên kết theo mọi email                         | Ai nhập email của người khác ở provider (không xác minh) sẽ chiếm được tài khoản |

## Nguồn

- [`docs/architecture/auth.md`](../architecture/auth.md) – mục "Đăng nhập bằng Google / Facebook / GitHub"
- RFC 7636 (PKCE), RFC 9700 (OAuth 2.0 Security BCP)
