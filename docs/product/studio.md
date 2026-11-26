---
title: Studio – học lập trình và tạo project
status: draft
applies-to: api, web, db
---

# Studio – học lập trình và tạo project

App trong launcher (`/studio`). Trước đây Studio chỉ sinh project (ADR 0018). Bây giờ Studio là **nơi học lập trình**, và bộ sinh project là một mục trong menu (`/studio/generator`).

## 1. Menu

| Mục            | Đường                  | Nội dung                                                      |
| -------------- | ---------------------- | ------------------------------------------------------------- |
| Tổng quan      | `/studio`              | Bài học dở, các lộ trình, các nhóm chủ đề                     |
| Lộ trình       | `/studio/roadmaps`     | Frontend, Backend…: các bước theo thứ tự, mỗi bước một chủ đề |
| Ngôn ngữ       | `/studio/languages`    | JavaScript, TypeScript, Python, Go…                           |
| Framework      | `/studio/frameworks`   | React, Next.js, NestJS…                                       |
| Design pattern | `/studio/patterns`     | Pattern khởi tạo, hành vi…                                    |
| Nền tảng       | `/studio/fundamentals` | Git, HTTP…                                                    |
| Công cụ        | `/studio/tools`        | Docker…                                                       |
| Hỏi AI         | `/studio/chat`         | Hỏi đáp lập trình, có thể hỏi trong ngữ cảnh một bài          |
| Tạo project    | `/studio/generator`    | Bộ sinh project (ADR 0018)                                    |
| Quản lý        | `/studio/manage`       | Chỉ admin: soạn chủ đề, bài, quiz, lộ trình                   |

## 2. Mô hình

```
Roadmap (Frontend)  → Step (thứ tự, mô tả) → Track? (một chủ đề)
Track (TypeScript, nhóm LANGUAGE) → Lesson (Markdown, thời lượng) → QuizQuestion (một đáp án đúng)
Progress (người học × bài): đã xong lúc nào, điểm quiz cao nhất
```

- Chỉ nội dung `PUBLISHED` hiện cho người học.
- Một bài tính là xong khi người học bấm "Đã học xong" hoặc làm quiz đúng từ 70% trở lên.
- Tiến độ của chủ đề hoặc lộ trình = số bài đã xong / số bài đã xuất bản trong đó.
- Đáp án và giải thích chỉ gửi về sau khi người học nộp quiz.

## 3. Nội dung

- Tiếng Việt, ví dụ code thật, tự viết (không chép sách hay khoá học).
- Nội dung khởi đầu: `packages/db/prisma/studio-content.ts`, nạp bằng `pnpm db:seed`. Seed chỉ thêm slug chưa có.
- Sửa, thêm bài: dùng trang Quản lý ([ADR 0029](../decisions/0029-noi-dung-studio-trong-db.md)).

## 4. Phạm vi

| Đã có / đang làm                              | Sau                                          |
| --------------------------------------------- | -------------------------------------------- |
| Đọc bài, quiz, tiến độ, lộ trình              | AI sinh nháp bài và quiz trong trang Quản lý |
| Trang Quản lý: chủ đề, bài, quiz, lộ trình    | Bài tập code chạy trong trình duyệt          |
| Hỏi AI (dùng chung model với Lingo, ADR 0017) | Bình luận dưới bài                           |
