---
title: '0008: Tự deploy stg qua SSH forced command, compose server nằm ngoài repo'
status: draft
decision: accepted
date: 2026-11-11
---

# 0008: Tự deploy stg qua SSH forced command, compose server nằm ngoài repo

## Bối cảnh

- stg (`turbo-dev.site`) chạy trên một VPS dùng chung với dự án khác (1 vCPU / 2 GB). Mỗi dự án là một thư mục `/srv/<app>` trên server; Postgres / Redis / RustFS (`infra`) và Caddy (`edge`) dùng chung.
- Chủ dự án muốn: Caddy và compose của server **không** nằm trong repo dự án; một server chạy được nhiều dự án.
- Trước đây CI chỉ đẩy image lên ghcr; cập nhật server phải SSH vào chạy tay.

## Quyết định

Push `release/X.Y.Z` / `hotfix/X.Y.Z` → CI build image → job `deploy` SSH vào server với key riêng, gửi đúng một tham số là tag `<env>-sha-<7>` (vd. `stg-sha-f9b7743`).

- Key deploy **PHẢI** bị khoá bằng `command="/srv/<app>/deploy.sh",restrict` trong `authorized_keys`; script **PHẢI** kiểm tra tag theo regex trước khi dùng.
- Deploy **PHẢI** ghim tag `<env>-sha-…` (không dùng tag trôi `:stg`) để biết chính xác bản nào đang chạy và rollback được. Tag sha **PHẢI** có tên môi trường: cùng một commit có thể được build cho dev và stg.
- Compose / Caddy của server **KHÔNG ĐƯỢC** đưa vào repo; repo chỉ mô tả cách deploy ([docs/process/deploy.md](../process/deploy.md)).

## Hệ quả

| Loại     | Nội dung                                                                                                                        |
| -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Được     | Merge release là lên stg; rollback = deploy lại tag `<env>-sha-…` cũ; lộ key cũng chỉ chạy được script deploy.                  |
| Đánh đổi | Script và compose trên server không có version trong git; server mới phải dựng tay theo `deploy.md`.                            |
| Áp dụng  | Job `deploy` trong `.github/workflows/ci.yml`; Environment `stg`: `DEPLOY_HOST`, `DEPLOY_KNOWN_HOSTS`, secret `DEPLOY_SSH_KEY`. |

## Phương án đã cân nhắc

| Phương án                              | Lý do không chọn                                                       |
| -------------------------------------- | ---------------------------------------------------------------------- |
| `develop` tự lên stg                   | Lệch GitFlow hiện tại (develop → dev, release → stg, tag main → prod). |
| Server tự kéo image (Watchtower, cron) | Không biết build nào đang chạy, không gắn với kết quả CI.              |
| CI SSH bằng key root không giới hạn    | Lộ key = lộ toàn bộ server (chạy cả dự án khác).                       |

## Nguồn

- PR thêm job `deploy` (branch `ci/deploy-stg`).
- [docs/process/deploy.md](../process/deploy.md), [docs/process/environments.md](../process/environments.md).
