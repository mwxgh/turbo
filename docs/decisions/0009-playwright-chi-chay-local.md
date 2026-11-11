---
title: '0009: Playwright chỉ chạy local, CI không chạy e2e trình duyệt'
status: draft
decision: accepted
date: 2026-11-11
---

# 0009: Playwright chỉ chạy local, CI không chạy e2e trình duyệt

## Bối cảnh

- Job `e2e` (Playwright) trên CI cài Chromium bằng `playwright install --with-deps`, tức là chạy `apt` trên runner.
- Ngày 2026-11-11, job này lỗi nhiều lần liên tiếp (PR #19, #20, #21) vì runner không phân giải được DNS tới mirror Ubuntu (`Temporary failure resolving 'archive.ubuntu.com'`). Mỗi lần mất khoảng 11 phút rồi lỗi, test chưa chạy tới bước nào.
- Job `check` đã chạy build, lint, type-check, unit test, migration và e2e backend (api / socket / redis) trên Postgres + Redis thật.
- Chủ dự án muốn CI nhanh hơn và chỉ chạy Playwright ở máy local, trong app `apps/e2e`.

## Quyết định

CI (GitHub Actions và GitLab CI) **KHÔNG** chạy Playwright. Job `check` vẫn chạy e2e backend.

- Thay đổi đụng tới web, auth hoặc luồng trên trình duyệt **PHẢI** chạy `pnpm turbo run test:e2e --filter=e2e` ở local trước khi mở PR.
- Playwright local **PHẢI** dùng service local (`pnpm infra:up`); **KHÔNG ĐƯỢC** chạy khi api/web đang trỏ DB của server dùng chung.

## Hệ quả

| Loại     | Nội dung                                                                                                                     |
| -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Được     | PR chỉ chờ `gitflow` + `check`; không còn phụ thuộc `apt` trên runner; image build ngay khi `check` pass.                    |
| Đánh đổi | Lỗi giao diện không bị CI chặn; phụ thuộc vào việc người làm chạy Playwright local. stg là nơi kiểm tra cuối.                |
| Áp dụng  | `.github/workflows/ci.yml`, `.gitlab-ci.yml` (không còn job `e2e`), `.github/rulesets/protected-branches.json`, `AGENTS.md`. |

## Phương án đã cân nhắc

| Phương án                                                 | Lý do không chọn                                        |
| --------------------------------------------------------- | ------------------------------------------------------- |
| Chạy job `e2e` trong image `mcr.microsoft.com/playwright` | Hết lỗi `apt` nhưng CI vẫn chậm; chủ dự án chọn bỏ hẳn. |
| Chỉ chạy Playwright cho PR vào `main` / push `release/*`  | Như trên.                                               |

## Nguồn

- Log job `e2e` lỗi DNS: run 43032806476, 43044760900, 43044189490 (2026-11-11).
- PR bỏ job `e2e` (branch `ci/drop-playwright-ci`).
