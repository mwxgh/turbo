<!-- feature/* · fix/* · chore/* … → develop. Tiêu đề PR theo commit: feat(api): …, fix(web): … -->

## Mô tả

<!-- Thay đổi gì, vì sao. Link issue/task nếu có. -->

Closes #

## Loại thay đổi

- [ ] feat – tính năng mới
- [ ] fix – sửa lỗi
- [ ] refactor / chore / docs / test / ci
- [ ] Breaking change (API, socket event, env, DB) – mô tả cách nâng cấp bên dưới

## Phạm vi

- [ ] api
- [ ] socket
- [ ] web
- [ ] packages (`db`, `nest-common`, `utils`, `socket-events`, `ui`, `tooling`)
- [ ] deploy / CI

## Kiểm tra

- [ ] `pnpm turbo run build lint check-types test` pass
- [ ] Đổi `schema.prisma` → đã tạo migration (`pnpm db:migrate`), `pnpm db:check` pass
- [ ] Thêm/đổi env → đã cập nhật `.env.example` (và `deploy/.env.example` nếu cần)
- [ ] Đổi API → Swagger (`/api/docs`) hiển thị đúng

## Cách test thủ công

<!-- Các bước để reviewer tự kiểm tra. -->

## Ảnh chụp / ghi chú cho reviewer

<!-- UI trước/sau, chỗ cần xem kỹ… -->
