<!-- hotfix/X.Y.Z → main (và develop). Chỉ sửa lỗi khẩn cấp trên production. -->

## Hotfix vX.Y.Z

## Lỗi

<!-- Hiện tượng trên production, mức ảnh hưởng, link incident/issue. -->

## Nguyên nhân & cách sửa

## Checklist

- [ ] Tên nhánh đúng `hotfix/X.Y.Z` (tăng PATCH so với bản prod hiện tại)
- [ ] Thay đổi tối thiểu, không kèm feature mới
- [ ] Có test tái hiện lỗi (nếu khả thi)
- [ ] Đã kiểm tra trên **stg** (image `:stg` từ nhánh này)

## Sau khi merge

- [ ] Tag `vX.Y.Z` trên `main` → chạy job/approval **prod**
- [ ] Merge `hotfix/X.Y.Z` vào `develop` (và `release/*` đang mở nếu có)
- [ ] Xoá nhánh `hotfix/X.Y.Z`
