<!-- release/X.Y.Z → main. Sau khi merge: tag vX.Y.Z trên main, merge ngược về develop. -->

## Release vX.Y.Z

## Nội dung

<!-- Tóm tắt các MR/feature trong bản này (hoặc link changelog). -->

-

## Breaking changes / lưu ý nâng cấp

<!-- Env mới, migration nặng, thay đổi API/socket… Ghi "Không có" nếu không có. -->

## Checklist trước khi merge

- [ ] Tên nhánh đúng `release/X.Y.Z`, version khớp tiêu đề
- [ ] Đã test trên **stg** (image `:stg` từ nhánh này)
- [ ] Migration đã chạy thử trên stg (`migrate` image), có kế hoạch rollback nếu cần
- [ ] Env mới đã khai báo cho môi trường **prod**
- [ ] `PUBLIC_API_URL` / `PUBLIC_SOCKET_URL` của prod đúng (bake vào web image)

## Sau khi merge

- [ ] Tag `vX.Y.Z` trên `main` → chạy job/approval **prod**
- [ ] Merge `release/X.Y.Z` (hoặc `main`) ngược về `develop`
- [ ] Xoá nhánh `release/X.Y.Z`
