---
title: '0030: Icon động bằng pulsoicon-react thay lucide-react'
status: accepted
decision: accepted
date: 2026-11-26
---

# 0030: Icon động bằng pulsoicon-react thay lucide-react

## Bối cảnh

Web và `packages/ui` dùng `lucide-react` (icon tĩnh). Cần icon có animation khi hover/focus.
`pulsoicon-react` 6.2.0 (ISC) giữ tên component và props của `lucide-react`, chạy animation bằng
Motion (peer dependency `motion >= 12`). Package không có directive `'use client'`: server component
import trực tiếp làm `next build` lỗi (`Attempted to call createMotionComponent() from the server`).

## Quyết định

Chúng ta dùng `pulsoicon-react` cho mọi icon React web/ui.

- **KHÔNG ĐƯỢC** import `lucide-react` (ESLint `no-restricted-imports` trong `@repo/eslint-config/react`).
- Server component **PHẢI** import icon từ `apps/web/components/icons.ts` (`'use client'` + re-export theo tên). Client component import thẳng `pulsoicon-react`.
- Kiểu prop icon là `PulsoIcon` (thay `LucideIcon`).

## Hệ quả

| Loại     | Nội dung                                                                                                                                                              |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Được     | Icon tự chạy animation khi hover/focus vào `button`, `a`, `[role=button]`…; tôn trọng `prefers-reduced-motion`                                                        |
| Đánh đổi | Thêm `motion` vào bundle client; icon dùng trong server component phải khai báo thêm ở `components/icons.ts`; shadcn CLI vẫn sinh import `lucide-react`, phải sửa tay |
| Áp dụng  | catalog `pulsoicon-react` + `motion` trong `pnpm-workspace.yaml`; lint rule; `jsdom-setup.js` (stub `matchMedia`) trong `@repo/vitest-config/react`                   |

## Phương án đã cân nhắc

| Phương án                      | Lý do không chọn   |
| ------------------------------ | ------------------ |
| Giữ `lucide-react`             | Không có animation |
| Phương án khác (thư viện khác) | UNKNOWN            |

## Nguồn

- https://pulsoicon.com/docs/react
- npm `pulsoicon-react@6.2.0`
