---
title: Tìm kiếm full-text (Elasticsearch)
status: draft
---

# Tìm kiếm full-text (Elasticsearch)

Lý do chọn: [ADR 0025](../decisions/0025-tim-kiem-full-text-bang-elasticsearch.md).

## Thành phần

| Phần                        | Ở đâu                                                         | Việc                                                                        |
| --------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `@repo/infra/elasticsearch` | `packages/infra/src/elasticsearch`                            | Client dùng chung cho app Nest, `SearchIndex` (tiền tố index), probe health |
| Tìm thẻ Lingo               | `apps/api/src/lingo/card-search.service.ts`                   | Index `lingo-cards-v1`, `GET /api/lingo/cards/search?q=&exam=`              |
| Ô tìm từ                    | `apps/web/app/(app)/lingo/review/_components/card-search.tsx` | Gõ → chờ 250 ms → gọi api, hiện từ, nghĩa, ví dụ, bài                       |
| Elasticsearch local         | `deploy/docker-compose.yml` (`pnpm infra:up`)                 | 1 node, tắt security, chỉ bind `127.0.0.1:9200`, heap 512 MB                |

## Dùng trong app Nest

```ts
// app.module.ts – tuỳ chọn: không đặt ELASTICSEARCH_URL thì không import
ElasticsearchModule.forRoot({ node: env.ELASTICSEARCH_URL, indexPrefix: env.elasticsearchIndexPrefix })

// service
constructor(@Optional() private readonly index?: SearchIndex) {}
await index.ensure('lingo-cards-v1', CARD_INDEX)          // tạo nếu chưa có
await index.upsert('lingo-cards-v1', docs, true)          // bulk, refresh
await index.search<CardHit>('lingo-cards-v1', { query })  // hit có id + score
```

- Mọi index qua `SearchIndex`, tên gốc không có tiền tố; tiền tố mặc định `<APP_ENV>-` (`dev-`, `prod-`), e2e dùng `e2e-`, Playwright `pw-`. Không `new Client()` trong app.
- Đổi mapping (`CARD_INDEX`) → **tăng phiên bản** tên index (`lingo-cards-v2`): index mới được dựng khi api khởi động; xoá index cũ bằng tay khi không cần.

## Index thẻ Lingo

- Trường tìm: `term` (cả `term.prefix` edge n-gram 2–20 và `term.exact` nguyên từ), `meaningVi`, từ mở rộng (gộp thành text), `example`. Analyzer `folded` = `lowercase` + `asciifolding`: "hop dong" khớp "hợp đồng", "đ" khớp "d".
- Truy vấn: `multi_match` (`term^4`, `term.prefix^2`, `meaningVi^2`, từ mở rộng, `example^0.5`), `fuzziness: AUTO` (gõ sai 1–2 ký tự vẫn ra), cộng điểm lớn khi khớp nguyên từ. Lọc: bộ hệ thống (`ownerId` trống) + bộ của chính người tìm, theo `exam` nếu có. Tối đa 20 kết quả.
- Đồng bộ: dựng lại toàn bộ khi api khởi động (chạy nền) và sau "Nạp dữ liệu mẫu"; cập nhật theo bộ khi nhập CSV / AI sinh thẻ / học từ mở rộng. Index là dữ liệu dẫn xuất: lỗi Elasticsearch chỉ ghi log, không làm hỏng thao tác ghi; lần khởi động sau tự khớp lại.
- Không có `ELASTICSEARCH_URL`: tìm bằng Postgres (`contains`, không bỏ dấu, không chịu lỗi gõ). Kết quả trả `engine: "elasticsearch" | "database"`.

## Môi trường

| Môi trường | Elasticsearch                                                                                 |
| ---------- | --------------------------------------------------------------------------------------------- |
| local      | `pnpm infra:up`, `ELASTICSEARCH_URL=http://127.0.0.1:9200` trong `apps/api/.env`              |
| CI         | service `elasticsearch:9.5.3` (GitHub Actions, GitLab), e2e `@repo/infra/elasticsearch` + api |
| server     | container trong stack `infra` dùng chung, mỗi môi trường một tiền tố index                    |
