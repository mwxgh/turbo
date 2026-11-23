---
title: '0025: Tìm kiếm full-text bằng Elasticsearch qua @repo/elasticsearch'
status: draft
decision: accepted
date: 2026-11-23
---

# 0025: Tìm kiếm full-text bằng Elasticsearch qua @repo/elasticsearch

## Bối cảnh

Lingo chưa có ô tìm từ. Kho có 1426 thẻ hệ thống cộng thẻ học viên tự thêm; người học gõ tiếng Anh hoặc nghĩa tiếng Việt, thường không dấu và hay gõ sai. Postgres `contains` không bỏ dấu, không chịu lỗi gõ, không xếp hạng. Người dùng chọn Elasticsearch, code dùng chung đặt trong một package `@repo/elasticsearch` (như `@repo/redis`). Server prod 7.7 GB RAM, đang dùng khoảng 1.8 GB.

## Quyết định

- Tìm kiếm full-text dùng Elasticsearch 9 (client `@elastic/elasticsearch` 9.5.x). App Nest **PHẢI** dùng qua `@repo/elasticsearch` (`ElasticsearchModule.forRoot`, `SearchIndex`, `@InjectElasticsearch()`); **KHÔNG ĐƯỢC** `new Client()` trong app.
- Index có tiền tố theo môi trường (`<APP_ENV>-`), tên gốc có phiên bản (`lingo-cards-v1`); đổi mapping thì tăng phiên bản.
- Postgres vẫn là nguồn sự thật; index là dữ liệu dẫn xuất, dựng lại được bất kỳ lúc nào (khi api khởi động). Lỗi index chỉ ghi log.
- `ELASTICSEARCH_URL` tuỳ chọn: không đặt thì api tìm bằng Postgres, để app chạy được khi chưa có cluster.
- Một node Elasticsearch, tắt security, chỉ nghe trong mạng nội bộ (local: `127.0.0.1`; server: mạng Docker của `infra`), heap 512 MB.

## Hệ quả

| Loại     | Nội dung                                                                                                          |
| -------- | ----------------------------------------------------------------------------------------------------------------- |
| Được     | Tìm không dấu, chịu lỗi gõ, theo tiền tố, xếp hạng; package dùng lại được cho tìm kiếm khác                       |
| Đánh đổi | Thêm ~1 GB RAM (JVM + cache) trên server và một service phải vận hành; CI chạy thêm một service; thêm job đồng bộ |
| Áp dụng  | `packages/elasticsearch`, `apps/api/src/lingo/card-search.service.ts`, `deploy/docker-compose.yml`, CI services   |

## Phương án đã cân nhắc

| Phương án                       | Lý do không chọn                                                  |
| ------------------------------- | ----------------------------------------------------------------- |
| Postgres `pg_trgm` + `unaccent` | Đề xuất trước (không tốn thêm RAM); người dùng chọn Elasticsearch |
| Meilisearch / Typesense         | UNKNOWN (không được bàn)                                          |

## Nguồn

- Yêu cầu người dùng ngày 2026-11-23.
