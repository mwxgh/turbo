---
title: Quyết định kỹ thuật (ADR)
status: draft
---

# Quyết định kỹ thuật (ADR)

Mỗi file ghi một quyết định: bối cảnh → quyết định → hệ quả → phương án đã cân nhắc → nguồn. Quy tắc viết: [0001](0001-ghi-quyet-dinh-bang-adr.md). ADR mới: copy [`0000-template.md`](0000-template.md), lấy số tiếp theo.

| 0001 | [Ghi quyết định kỹ thuật bằng ADR](0001-ghi-quyet-dinh-bang-adr.md) | accepted | 2026-11-11 |
| 0002 | [Version dùng chung qua pnpm catalog](0002-version-dung-chung-qua-pnpm-catalog.md) | accepted | 2026-10-21 |
| 0003 | [Type model sinh từ Prisma (`@repo/types`)](0003-type-model-sinh-tu-prisma.md) | accepted | 2026-10-24 |
| 0004 | [Nest build bằng SWC, type-check tách riêng](0004-nest-build-bang-swc-type-check-rieng.md) | accepted | 2026-10-24 |
| 0005 | [Auth – cookie httpOnly cho web, Bearer cho mobile, mặc định chặn](0005-auth-cookie-web-bearer-mobile-mac-dinh-chan.md) | accepted | 2026-11-11 |
| 0006 | [Rate limit opt-in theo controller](0006-rate-limit-opt-in-theo-controller.md) | accepted | 2026-11-10 |
| 0007 | [Upload file bằng presigned POST, không đi qua api](0007-upload-file-bang-presigned-post.md) | accepted | 2026-10-23 |
| 0008 | [Tự deploy stg qua SSH forced command, compose server ngoài repo](0008-tu-deploy-stg-qua-ssh-forced-command.md) | accepted | 2026-11-11 |
| 0009 | [Playwright chỉ chạy local, CI không chạy e2e trình duyệt](0009-playwright-chi-chay-local.md) | accepted | 2026-11-11 |
| 0010 | [Thu hồi session ngay lập tức qua danh sách trong Redis](0010-thu-hoi-session-ngay-qua-redis.md) | accepted | 2026-11-12 |
| 0011 | [Đăng nhập bằng Google / Facebook / GitHub do api xử lý](0011-dang-nhap-bang-provider-qua-api.md) | accepted | 2026-11-12 |
| 0012 | [Cấu trúc kỳ thi Lingo khai báo bằng code trong api](0012-cau-truc-ky-thi-khai-bao-trong-api.md) | accepted | 2026-11-18 |
| 0013 | [Nội dung Lingo qua một đường nhập chung, admin duyệt](0013-noi-dung-lingo-qua-mot-duong-nhap-co-duyet.md) | accepted | 2026-11-18 |
| 0016 | [AI tutor chat của Lingo qua BytePlus ModelArk, trả lời stream](0016-ai-tutor-chat-qua-byteplus-modelark.md) | accepted | 2026-11-21 |
| 0017 | [Sinh nội dung Lingo bằng BytePlus chạy nền, phần Nghe tạm đọc bằng trình duyệt](0017-sinh-noi-dung-lingo-bang-byteplus-nghe-tam-bang-trinh-duyet.md) | accepted | 2026-11-21 |
| 0018 | [Bộ sinh project của Studio nằm trong api, web chỉ đọc danh mục lựa chọn](0018-studio-scaffold-nam-trong-api.md) | accepted | 2026-11-21 |
| 0019 | [Lingo tách khu ra đề và phòng thi trong cùng app web](0019-lingo-tach-khu-ra-de-va-phong-thi.md) | accepted | 2026-11-21 |
| 0020 | [Lộ trình Lingo định nghĩa trong code, tiến độ tính từ hoạt động](0020-lo-trinh-lingo-tinh-tu-hoat-dong.md) | accepted | 2026-11-21 |
| 0021 | [Lịch học Lingo 12 tuần định nghĩa trong code, đo theo từng tuần](0021-lich-hoc-12-tuan-tinh-theo-tuan.md) | accepted | 2026-11-22 |
| 0022 | [Giáo trình Lingo định nghĩa trong code, tiến độ theo dạng câu](0022-giao-trinh-lingo-trong-code.md) | accepted | 2026-11-22 |
| 0023 | [Từ vựng Lingo gộp theo chủ đề, học tuần tự; dùng nội bộ được chép tài liệu có bản quyền](0023-tu-vung-lingo-gop-theo-chu-de-hoc-tuan-tu.md) | accepted | 2026-11-23 |
| 0024 | [Chỉ tự deploy prod, dev và kiểm tra ở máy local](0024-chi-tu-deploy-prod-dev-o-local.md) | accepted | 2026-11-23 |
| 0025 | [Tìm kiếm full-text bằng Elasticsearch qua @repo/elasticsearch](0025-tim-kiem-full-text-bang-elasticsearch.md) | accepted | 2026-11-23 |
| 0026 | [Package hạ tầng nằm trong packages/infra/](0026-package-ha-tang-trong-packages-infra.md) | superseded by 0028 | 2026-11-23 |
| 0027 | [Auth gộp vào @repo/nest-common](0027-auth-gop-vao-nest-common.md) | accepted | 2026-11-23 |
| 0028 | [Hạ tầng gom thành một package @repo/infra, mỗi dịch vụ một subpath](0028-ha-tang-mot-package-repo-infra.md) | accepted | 2026-11-23 |
| 0029 | [Nội dung học của Studio lưu trong DB, soạn ở trang admin](0029-noi-dung-studio-trong-db.md) | accepted | 2026-11-25 |

`Ngày` của 0002–0007 = ngày commit đưa quyết định vào code (ADR viết lại sau, ngày 2026-11-11). `UNKNOWN` trong ADR = không có tài liệu về lý do; ai biết thì bổ sung.
