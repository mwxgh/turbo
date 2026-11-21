---
title: '0016: AI tutor chat của Lingo gọi BytePlus ModelArk từ api, trả lời stream bằng text'
status: draft
decision: accepted
date: 2026-11-21
---

# 0016: AI tutor chat của Lingo gọi BytePlus ModelArk từ api, trả lời stream bằng text

## Bối cảnh

- Người học cần hỏi đáp ngữ pháp, từ vựng, sửa câu ngoài bài luyện. Lịch sử hội thoại cần xem lại được.
- Chủ dự án đã có tài khoản BytePlus. ModelArk có API chat completions tương thích OpenAI
  (`https://ark.ap-southeast.bytepluses.com/api/v3`, xem tài liệu BytePlus "Base URL and authentication").
- Mỗi câu hỏi tốn token, nên key **không** được ra trình duyệt, và cần giới hạn tần suất.

## Quyết định

- api gọi `POST {ARK_BASE_URL}/chat/completions` (`stream: true`) qua `TutorModel` (`apps/api/src/lingo/tutor-model.ts`),
  bằng `fetch`, không thêm SDK. Tính năng bật khi có cả `ARK_API_KEY` và `ARK_MODEL`; thiếu thì route trả 503.
- `POST /api/lingo/chats/:id/messages` trả lời dạng `text/plain` stream (chunked). Trình duyệt đọc qua `apiFetch.raw`,
  không qua Server Action. Header gửi khi có mẩu đầu tiên, nên model lỗi trước khi trả lời vẫn là 502.
- Hội thoại lưu ở `LingoChat` / `LingoChatMessage`. Gửi kèm tối đa 20 tin gần nhất. Câu trả lời bị cắt giữa chừng vẫn lưu phần đã nhận.
- `ARK_API_KEY` **PHẢI** chỉ nằm trong `.env` server (không commit). Route hỏi **PHẢI** có `@Throttle` riêng (20/phút).

## Hệ quả

| Loại     | Nội dung                                                                                                                        |
| -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Được     | Không cần key để chạy dev / test (e2e thay `TutorModel` bằng bản giả). Đổi model chỉ cần đổi `ARK_MODEL`.                       |
| Được     | API tương thích OpenAI: đổi nhà cung cấp chỉ cần đổi `ARK_BASE_URL` + key, nếu bên kia cùng giao thức.                          |
| Đánh đổi | Stream text thô: không có sự kiện lỗi giữa chừng, lỗi sau mẩu đầu tiên chỉ làm câu trả lời dừng.                                |
| Đánh đổi | Giới hạn tần suất theo IP, không theo user; chưa có hạn mức token / ngày.                                                       |
| Áp dụng  | `apps/api/src/lingo/{tutor-model,chat.service,chat.controller}.ts`, `apps/web/lib/lingo-chat.ts`, `test/lingo-chat.e2e-spec.ts` |

## Phương án đã cân nhắc

| Phương án                      | Lý do không chọn                                                           |
| ------------------------------ | -------------------------------------------------------------------------- |
| Gọi model thẳng từ trình duyệt | Lộ key.                                                                    |
| Qua socket (`apps/socket`)     | Thêm sự kiện và trạng thái ở gateway; HTTP stream đủ cho một người một AI. |
| SSE (`text/event-stream`)      | Cần parse ở client; text thô đủ khi chỉ có một luồng nội dung.             |
| Dùng SDK `openai`              | Thêm dependency cho một request; `fetch` + parse SSE ngắn.                 |
| Trả lời một lần, không stream  | Phải chờ cả câu trả lời (vài giây đến vài chục giây).                      |

## Nguồn

Branch `feature/lingo-ai-chat`. Tài liệu BytePlus ModelArk: <https://docs.byteplus.com/en/docs/modelark/base-url-and-authentication>.
