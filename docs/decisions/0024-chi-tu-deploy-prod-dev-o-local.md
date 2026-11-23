---
title: '0024: Chỉ tự deploy prod, dev và kiểm tra ở máy local'
status: draft
decision: accepted
date: 2026-11-23
---

# 0024: Chỉ tự deploy prod, dev và kiểm tra ở máy local

## Bối cảnh

CI build 4 image và deploy mỗi lần push `develop` (dev) và `release/*`, `hotfix/*` (stg), rồi build lại lần nữa khi tag (prod). Một bản phát hành tốn 3 lần build image, 3 lần deploy. Dev và stg chạy chung server nên deploy cùng lúc từng lỗi kéo layer trùng (containerd, v0.6.0 và v0.9.0). Người dùng muốn giữ GitFlow nhưng bớt tài nguyên: dev ở local rồi lên thẳng prod.

## Quyết định

- GitFlow giữ nguyên (nhánh, MR, tag trên `main`; ADR và `docs/process/gitflow.md`).
- CI **chỉ** tự build image và deploy khi có tag `vX.Y.Z` trên `main` (prod). Push nhánh không chạy gì; PR vẫn chạy `gitflow` + `check`.
- Kiểm tra trước khi tag **PHẢI** làm ở máy local: `pnpm turbo run build lint check-types test`, e2e api/socket/redis trên `pnpm infra:up`, Playwright khi đụng web.
- Dev / stg vẫn deploy được khi cần bằng _Run workflow_ (GitHub) hoặc job tay (GitLab) trên `develop` / `release/*` / `hotfix/*`.

## Hệ quả

| Loại     | Nội dung                                                                                                     |
| -------- | ------------------------------------------------------------------------------------------------------------ |
| Được     | Một lần build image + deploy cho mỗi bản phát hành; không còn deploy dev và stg chồng nhau                   |
| Đánh đổi | Không có môi trường chung để thử trước prod; migration chỉ được thử trên DB local trước khi lên prod         |
| Áp dụng  | `.github/workflows/ci.yml` (`on.push.tags`, `workflow_dispatch`), `.gitlab-ci.yml` (`images:dev/stg` manual) |

## Phương án đã cân nhắc

| Phương án                        | Lý do không chọn                     |
| -------------------------------- | ------------------------------------ |
| Giữ tự deploy dev và stg         | Tốn tài nguyên, người dùng không cần |
| Bỏ GitFlow, merge thẳng vào main | Người dùng muốn giữ GitFlow          |

## Nguồn

- Yêu cầu người dùng ngày 2026-11-23; lỗi deploy stg khi phát hành v0.9.0 (containerd).
