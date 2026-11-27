---
title: Studio – học lập trình và tạo project
status: draft
applies-to: api, web, db
---

# Studio – học lập trình và tạo project

App trong launcher (`/studio`). Trước đây Studio chỉ sinh project (ADR 0018). Bây giờ Studio là **nơi học lập trình**, và bộ sinh project là một mục trong menu (`/studio/generator`).

## 1. Menu

| Mục            | Đường                      | Nội dung                                                       |
| -------------- | -------------------------- | -------------------------------------------------------------- |
| Tổng quan      | `/studio`                  | Khu vườn thành tích, bài học dở, các lộ trình, các nhóm chủ đề |
| Lộ trình       | `/studio/roadmaps`         | Frontend, Backend…: các bước theo thứ tự, mỗi bước một chủ đề  |
| Ngôn ngữ       | `/studio/languages`        | JavaScript, TypeScript, Python, Go…                            |
| Framework      | `/studio/frameworks`       | React, Next.js, NestJS…                                        |
| Design pattern | `/studio/patterns`         | Pattern khởi tạo, hành vi…                                     |
| Nền tảng       | `/studio/fundamentals`     | Git, HTTP…                                                     |
| Công cụ        | `/studio/tools`            | Docker…                                                        |
| Cơ sở dữ liệu  | `/studio/databases`        | SQL, PostgreSQL, Redis, MongoDB…                               |
| DevOps & Cloud | `/studio/devops`           | Linux, CI/CD, Kubernetes, cloud, giám sát…                     |
| Khoa học MT    | `/studio/computer-science` | Cấu trúc dữ liệu, giải thuật, thiết kế hệ thống                |
| Bảo mật        | `/studio/security`         | OWASP, xác thực và phân quyền…                                 |
| Hỏi AI         | `/studio/chat`             | Hỏi đáp lập trình, có thể hỏi trong ngữ cảnh một bài           |
| Tạo project    | `/studio/generator`        | Bộ sinh project (ADR 0018)                                     |
| Quản lý        | `/studio/manage`           | Chỉ admin: soạn chủ đề, bài, quiz, lộ trình                    |

Menu là sidebar bên trái (nhóm Học / Chủ đề / Công cụ): thu gọn còn icon trên máy tính, mở dạng sheet trên điện thoại.

## 2. Mô hình

```
Roadmap (Frontend)  → Step (thứ tự, mô tả) → Track? (một chủ đề)
Track (TypeScript, nhóm LANGUAGE) → Lesson (Markdown, thời lượng, cấp độ) → QuizQuestion (một đáp án đúng)
Progress (người học × bài): đã xong lúc nào, điểm quiz cao nhất
```

- Chỉ nội dung `PUBLISHED` hiện cho người học.
- Mỗi bài có cấp độ: Cơ bản (`BASIC`), Trung cấp (`INTERMEDIATE`), Nâng cao (`ADVANCED`). Một môn (ví dụ JavaScript) là **một** chủ đề chứa mọi cấp; trang chủ đề chia bài thành từng mục theo cấp, từ dễ tới khó, đánh số liên tục. Thẻ chủ đề hiện tiến độ riêng của từng cấp. Không tách môn thành nhiều chủ đề theo cấp.
- Một bài tính là xong khi người học bấm "Đã học xong" hoặc làm quiz đúng từ 70% trở lên.
- Tiến độ của chủ đề hoặc lộ trình = số bài đã xong / số bài đã xuất bản trong đó.
- Đáp án và giải thích chỉ gửi về sau khi người học nộp quiz.

## 3. Khu vườn thành tích (Tổng quan)

Trên đầu trang Tổng quan là một cây lớn dần theo những gì người học đã học xong, để có động lực học đều.

| Thành phần | Ghi nhận khi                                     |
| ---------- | ------------------------------------------------ |
| Lá         | Học xong một bài (theo cách tính "xong" ở mục 2) |
| Hoa        | Học xong mọi bài đã xuất bản của một chủ đề      |
| Quả        | Học xong mọi bài đã xuất bản của một lộ trình    |

- Mốc lớn theo số lá: Hạt giống (0), Mầm non (1), Cây non (5), Cây lớn (15), Cây trưởng thành (40), Cổ thụ (100).
- Ngày học: ngày (giờ Việt Nam) có ít nhất một bài được học xong hoặc được mở / làm quiz. Chuỗi ngày học liên tiếp tính tới hôm nay, hoặc tới hôm qua (chưa mất chuỗi cho tới hết hôm nay). Hiện thêm kỷ lục, tổng số ngày đã học và 7 ngày gần nhất.
- Bỏ học từ 2 ngày trở lên thì cây héo nhẹ: thêm 20% lá vàng mỗi ngày, tối đa 80%. Học lại thì cây xanh lại, không mất lá.
- Dữ liệu: `GET /api/studio/garden`, đếm từ `StudioProgress`, không có bảng riêng.

## 4. Lộ trình

Trang một lộ trình vẽ theo kiểu roadmap.sh: các bước nằm trên một trục giữa, bài của mỗi bước rẽ nhánh sang hai bên (trên điện thoại thì xếp dưới bước). Mỗi nút có màu theo trạng thái: đã xong, đang học (đã mở hoặc làm quiz nhưng chưa xong), chưa học.

## 5. Nội dung

- Tiếng Việt, ví dụ code thật, tự viết (không chép sách hay khoá học).
- Lộ trình (Frontend, Backend, Full Stack, DevOps, Khoa học máy tính) tham khảo cách chia bước phổ biến của [roadmap.sh](https://roadmap.sh). License của roadmap.sh không cho dùng lại nội dung, nên chỉ lấy thứ tự chủ đề, mọi chữ đều tự viết.
- Chủ đề chưa có bài được nạp ở trạng thái `DRAFT`: bước lộ trình vẫn hiện nhưng chưa có link, cho tới khi soạn bài và xuất bản.
- Nội dung chỉ nằm trong DB (ADR 0032): file JSON ngoài repo → audit → `pnpm --filter api content:import <file>` vào DB local, rồi prod. Chạy lại cập nhật theo slug.
- Sửa, thêm bài: dùng trang Quản lý ([ADR 0029](../decisions/0029-noi-dung-studio-trong-db.md)).

## 6. Phạm vi

| Đã có / đang làm                              | Sau                                          |
| --------------------------------------------- | -------------------------------------------- |
| Đọc bài, quiz, tiến độ, lộ trình, khu vườn    | AI sinh nháp bài và quiz trong trang Quản lý |
| Trang Quản lý: chủ đề, bài, quiz, lộ trình    | Bài tập code chạy trong trình duyệt          |
| Hỏi AI (dùng chung model với Lingo, ADR 0017) | Bình luận dưới bài                           |
