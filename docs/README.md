# Tài liệu dự án

Tài liệu dạng Markdown để **người và AI agent đọc trước khi sửa code**. Code là nguồn sự thật cho _cách làm_; thư mục này là nguồn sự thật cho _làm gì, vì sao, theo quy trình nào_.

## Đọc theo thứ tự

1. [`process/`](process/) – quy trình làm việc của team (bắt buộc tuân theo).
2. [`product/`](product/) – yêu cầu nghiệp vụ (convert từ tài liệu gốc).
3. [`architecture/`](architecture/) – thiết kế hệ thống.
4. [`decisions/`](decisions/) – quyết định kỹ thuật (ADR) và lý do.
5. [`../README.md`](../README.md) – cách chạy, cấu trúc repo, lệnh hay dùng.

## Mục lục

| Thư mục         | Nội dung                                                       | Tài liệu                                                             |
| --------------- | -------------------------------------------------------------- | -------------------------------------------------------------------- |
| `process/`      | GitFlow, môi trường, phát hành, quy ước commit                 | [GitFlow](process/gitflow.md), [Môi trường](process/environments.md) |
| `product/`      | PRD, SRS, BRD, user story… (từ `.docx`/`.pdf` của khách hàng)  | _chưa có_                                                            |
| `architecture/` | Sơ đồ hệ thống, luồng dữ liệu, tích hợp                        | _chưa có_                                                            |
| `decisions/`    | ADR: `NNNN-tieu-de.md` (bối cảnh → quyết định → hệ quả)        | _chưa có_                                                            |
| `_sources/`     | File gốc (`.docx`, `.pdf`, `.pptx`, `.xlsx`) trước khi convert | –                                                                    |

## Thêm tài liệu từ file gốc

```bash
cp ~/Downloads/SRS-v1.2.docx docs/_sources/
pnpm docs:convert docs/_sources/SRS-v1.2.docx                 # → docs/product/srs-v1-2.md
pnpm docs:convert -o docs/architecture docs/_sources/kien-truc.pdf
```

- Chạy [markitdown](https://github.com/microsoft/markitdown) trong Docker (lần đầu build image `turbo-base/markitdown`), không cần cài gì thêm.
- Ưu tiên `.docx` hơn `.pdf`: `.docx` giữ được heading/danh sách/bảng, `.pdf` thường mất cấu trúc heading.
- File sinh ra có frontmatter `source`, `converted`, `status: draft`. **Đọc lại, sửa chỗ convert sai** (bảng, ảnh, sơ đồ không chuyển được) rồi đổi `status: reviewed`.
- Cập nhật bảng mục lục ở trên khi thêm tài liệu.

## Quy ước

- Mỗi file một chủ đề, tên `kebab-case.md`, tiếng Việt có dấu.
- Đầu file có frontmatter tối thiểu `title`, `status` (`draft` | `reviewed` | `deprecated`).
- Sơ đồ dùng [Mermaid](https://mermaid.js.org) (GitHub/GitLab hiển thị được) thay vì ảnh khi có thể.
- Tài liệu lỗi thời: đổi `status: deprecated` và ghi tài liệu thay thế, không xoá ngay.
