-- CreateTable
CREATE TABLE "lingo_lesson_modules" (
    "id" UUID NOT NULL,
    "exam" VARCHAR(32) NOT NULL,
    "slug" VARCHAR(80) NOT NULL,
    "title" VARCHAR(120) NOT NULL,
    "description" VARCHAR(500) NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "lingo_lesson_modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lingo_lessons" (
    "id" UUID NOT NULL,
    "module_id" UUID NOT NULL,
    "slug" VARCHAR(80) NOT NULL,
    "title" VARCHAR(160) NOT NULL,
    "summary" VARCHAR(500) NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',
    "key_points" TEXT[],
    "parts" TEXT[],
    "minutes" INTEGER NOT NULL DEFAULT 10,
    "practice_part" VARCHAR(16),
    "practice_skill_tag" VARCHAR(64),
    "order" INTEGER NOT NULL DEFAULT 0,
    "status" "LingoContentStatus" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "lingo_lessons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "lingo_lesson_modules_exam_order_idx" ON "lingo_lesson_modules"("exam", "order");

-- CreateIndex
CREATE UNIQUE INDEX "lingo_lesson_modules_exam_slug_key" ON "lingo_lesson_modules"("exam", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "lingo_lessons_slug_key" ON "lingo_lessons"("slug");

-- CreateIndex
CREATE INDEX "lingo_lessons_module_id_order_idx" ON "lingo_lessons"("module_id", "order");

-- AddForeignKey
ALTER TABLE "lingo_lessons" ADD CONSTRAINT "lingo_lessons_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "lingo_lesson_modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Data: the course written in code until now (apps/api/src/lingo/lessons, ADR 0022), published.
INSERT INTO "lingo_lesson_modules" ("id", "exam", "slug", "title", "description", "order", "updated_at") VALUES (gen_random_uuid(), 'TOEIC_LR', 'grammar', 'Ngữ pháp Part 5–6', 'Mười chủ điểm ngữ pháp ra nhiều nhất ở Part 5 và Part 6', 0, now());
INSERT INTO "lingo_lesson_modules" ("id", "exam", "slug", "title", "description", "order", "updated_at") VALUES (gen_random_uuid(), 'TOEIC_LR', 'vocab', 'Từ vựng', 'Chọn từ đúng nghĩa và cụm từ cố định, phần khó nhất của Part 5 ở mức 800+', 1, now());
INSERT INTO "lingo_lesson_modules" ("id", "exam", "slug", "title", "description", "order", "updated_at") VALUES (gen_random_uuid(), 'TOEIC_LR', 'listening', 'Nghe Part 1–4', 'Dạng câu hỏi, bẫy thường gặp và cách nghe có chủ đích', 2, now());
INSERT INTO "lingo_lesson_modules" ("id", "exam", "slug", "title", "description", "order", "updated_at") VALUES (gen_random_uuid(), 'TOEIC_LR', 'reading', 'Đọc Part 6–7', 'Chèn câu, câu NOT, suy luận, từ trong ngữ cảnh và bài đọc nhiều đoạn', 3, now());
INSERT INTO "lingo_lesson_modules" ("id", "exam", "slug", "title", "description", "order", "updated_at") VALUES (gen_random_uuid(), 'TOEIC_LR', 'strategy', 'Chiến thuật làm đề', 'Phân bổ thời gian và cách chữa đề để điểm tăng đều', 4, now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'grammar'), 'word-form', 'Từ loại và vị trí trong câu', 'Nhìn chỗ trống và từ đứng quanh nó để biết cần danh từ, động từ, tính từ hay trạng từ, không cần dịch cả câu', '## Vì sao từ loại quan trọng

Khoảng một phần ba số câu Part 5 cho bốn lựa chọn cùng gốc từ (develop, developer, development, developmental). Những câu này không hỏi nghĩa mà hỏi vị trí: chỗ trống đang cần loại từ nào.

Làm đúng dạng này nhanh (dưới 15 giây mỗi câu) sẽ để dành thời gian cho Part 7. Ở mục tiêu 800+, gần như không được mất điểm ở dạng này.

## Bốn vị trí hay gặp nhất

Xác định từ đứng ngay trước và ngay sau chỗ trống, rồi đối chiếu với các mẫu dưới đây.

- Sau mạo từ (a, an, the), tính từ sở hữu (our, its) hoặc giới từ → danh từ: "the -------- of the plan" → development
- Giữa mạo từ và danh từ → tính từ: "a -------- increase" → significant
- Trước tính từ hoặc trạng từ khác, hoặc bổ nghĩa cho động từ → trạng từ: "-------- high demand" → unexpectedly
- Sau chủ ngữ, cần động từ chia thì: "The committee -------- the proposal" → approved

> **The new policy led to a -------- improvement in customer satisfaction. (A) notice (B) noticeable (C) noticeably (D) noticing**  
> Chính sách mới giúp mức hài lòng của khách hàng cải thiện rõ rệt.  
> _Vì sao:_ Giữa "a" và danh từ "improvement" cần tính từ → (B) noticeable

> **Ms. Tran responded -------- to every complaint. (A) prompt (B) promptly (C) prompted (D) promptness**  
> Cô Trần trả lời mọi lời phàn nàn một cách nhanh chóng.  
> _Vì sao:_ Câu đã đủ chủ ngữ và động từ "responded"; chỗ trống bổ nghĩa cho động từ → trạng từ (B)

## Đuôi từ giúp nhận ra loại từ

Khi không chắc nghĩa của từ, đuôi từ thường đủ để loại đáp án.

- Danh từ: -tion, -sion, -ment, -ness, -ity, -ance/-ence, -er/-or (người), -ee (người được), -ship
- Tính từ: -able/-ible, -ive, -ous, -ful, -less, -al, -ic, -ent/-ant
- Trạng từ: phần lớn là tính từ + -ly (lưu ý: friendly, costly, timely là tính từ)
- Động từ: -ize, -ify, -en, -ate

## Bẫy ở mức 800+

Đề khó hơn ở chỗ có hai đáp án cùng đúng loại từ, phải xét thêm số ít / số nhiều hoặc người / vật.

> **All -------- must register at the front desk before entering the laboratory. (A) visit (B) visitors (C) visiting (D) visitor**  
> Tất cả khách tham quan phải đăng ký ở quầy lễ tân trước khi vào phòng thí nghiệm.  
> _Vì sao:_ "All" + danh từ đếm được số nhiều, và chủ ngữ là người → (B) visitors, không phải (D)

> **The -------- of the two companies was announced on Friday. (A) merge (B) merger (C) merged (D) merging**  
> Việc sáp nhập hai công ty được công bố hôm thứ Sáu.  
> _Vì sao:_ Sau "The" và trước "of" cần danh từ; "merging" cũng có thể làm danh từ nhưng "merger" là danh từ chỉ sự kiện, tự nhiên hơn trong văn bản kinh doanh
', ARRAY['Nhìn từ trước và sau chỗ trống trước khi đọc cả câu', 'Câu đã đủ chủ ngữ và động từ thì chỗ trống thường là trạng từ', 'Hai đáp án cùng loại từ: xét số ít / số nhiều, người / vật']::text[], ARRAY['P5', 'P6']::text[], 15, 'P5', 'grammar.word-form', 0, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'grammar'), 'verb-tense', 'Thì của động từ qua tín hiệu thời gian', 'Tìm từ chỉ thời gian trong câu để chọn thì đúng, kể cả trong mệnh đề thời gian và câu Part 6 phụ thuộc ngữ cảnh', '## Đọc tín hiệu thời gian trước

Khi bốn lựa chọn là cùng một động từ ở các thì khác nhau, đừng dịch cả câu. Hãy tìm cụm chỉ thời gian: phần lớn câu Part 5 dạng này có một tín hiệu đủ để chọn ngay.

Nếu đã có tín hiệu mà vẫn còn hai đáp án, xét tiếp chủ ngữ số ít hay số nhiều, rồi chủ động hay bị động.

- Hiện tại đơn: every, usually, regularly, each year, typically (thói quen, lịch trình cố định)
- Hiện tại tiếp diễn: currently, at the moment, now, this week (việc đang diễn ra)
- Quá khứ đơn: yesterday, last + thời gian, ago, in + năm đã qua, when + mệnh đề quá khứ
- Hiện tại hoàn thành: since, for + khoảng thời gian, so far, already, yet, over the past / in the last + khoảng thời gian
- Tương lai: tomorrow, next, upcoming, soon, as of next month
- Tương lai hoàn thành: by + mốc tương lai, by the time + mệnh đề hiện tại

> **Since joining the firm in 2019, Mr. Patel -------- three regional offices. (A) opens (B) opened (C) has opened (D) will open**  
> Từ khi vào công ty năm 2019, ông Patel đã mở ba văn phòng khu vực.  
> _Vì sao:_ "Since" + mốc quá khứ kéo đến hiện tại → hiện tại hoàn thành (C)

> **By the end of next quarter, the IT team -------- the software upgrade. (A) completes (B) will have completed (C) has completed (D) completed**  
> Đến cuối quý sau, nhóm IT sẽ hoàn tất việc nâng cấp phần mềm.  
> _Vì sao:_ "By" + mốc tương lai → tương lai hoàn thành (B)

## Mệnh đề thời gian và điều kiện không dùng will

Sau when, once, as soon as, before, after, until, if, unless, động từ dùng thì hiện tại dù nghĩa là tương lai. Vế còn lại mới dùng will hoặc câu mệnh lệnh.

Muốn nhấn mạnh việc đã xong trước, có thể dùng hiện tại hoàn thành trong mệnh đề này: "after we have reviewed the data".

> **Once the shipment --------, we will notify you by e-mail. (A) arrives (B) will arrive (C) arrived (D) arriving**  
> Khi lô hàng đến, chúng tôi sẽ báo cho quý khách qua e-mail.  
> _Vì sao:_ Sau "once" dùng hiện tại thay cho tương lai → (A); (B) là bẫy vì vế sau có "will"

> **Please do not enter the room until the cleaning crew -------- the floor. (A) will finish (B) finished (C) has finished (D) finishing**  
> Vui lòng không vào phòng cho đến khi đội vệ sinh lau xong sàn.  
> _Vì sao:_ Sau "until" không dùng will; hiện tại hoàn thành (C) nhấn mạnh việc làm xong

## Quá khứ hoàn thành và thứ tự sự việc

Quá khứ hoàn thành (had + V3) dùng cho việc xảy ra trước một mốc hoặc một việc khác trong quá khứ. Tín hiệu hay gặp: by the time + quá khứ đơn, before / after + quá khứ, by + mốc đã qua.

> **By the time the CEO arrived, the board members -------- the vote. (A) have taken (B) had taken (C) take (D) will take**  
> Khi tổng giám đốc đến thì hội đồng quản trị đã biểu quyết xong.  
> _Vì sao:_ "By the time" + quá khứ đơn "arrived" → việc xảy ra trước dùng quá khứ hoàn thành (B)

## Bẫy ở mức 800+

Câu khó thường gộp thì với bị động hoặc không có tín hiệu trong chính câu đó. Ở Part 6, thì phụ thuộc vào ngày gửi thư và những gì đoạn văn đã kể: sự kiện "last week" thì phản hồi về nó đã có rồi.

"In the past five years" (khoảng thời gian kéo đến nay) đi với hiện tại hoàn thành, còn "five years ago" (mốc đã qua) đi với quá khứ đơn. Đừng nhầm hai cụm chỉ vì cùng có "five years".

> **The east wing of the library -------- for renovations since early March. (A) closed (B) was closed (C) has been closed (D) is closing**  
> Cánh phía đông của thư viện đã đóng cửa để sửa chữa từ đầu tháng Ba.  
> _Vì sao:_ "Since" cần hiện tại hoàn thành; chỉ (C) đúng cả thì lẫn nghĩa bị động "bị đóng"

> **Thank you for attending the workshop last Tuesday. The comments you -------- have been passed on to the trainers. (A) provide (B) provided (C) will provide (D) are providing**  
> Cảm ơn anh chị đã tham dự buổi hội thảo thứ Ba vừa rồi. Các góp ý anh chị đưa ra đã được chuyển cho giảng viên.  
> _Vì sao:_ Không có tín hiệu trong câu thứ hai, nhưng câu trước cho biết buổi học đã diễn ra → quá khứ (B)
', ARRAY['Tìm cụm chỉ thời gian trước khi xét nghĩa', 'Sau when, once, if, until không dùng will', 'Since, for, over the past → hiện tại hoàn thành; by + tương lai → will have V3', 'Part 6: thì phụ thuộc vào câu trước và ngày của văn bản']::text[], ARRAY['P5', 'P6']::text[], 20, 'P5', 'grammar.verb-tense', 1, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'grammar'), 'verb-form', 'Dạng động từ: to V, V-ing, phân từ và bị động', 'Phân biệt chỗ cần động từ chính với chỗ cần to V, V-ing hay V3, và nhận ra câu bị động qua tân ngữ', '## Câu đã có động từ chính chưa

Một mệnh đề chỉ có một động từ chia thì. Nếu câu đã có động từ chính, chỗ trống phải là dạng không chia: to V, V-ing hoặc V3. Nếu câu chưa có, loại ngay các đáp án to V và V-ing đứng một mình.

Sau đó xét động từ đứng trước chỗ trống: nó đòi to V hay V-ing.

> **The manager asked all employees -------- their timesheets by Friday. (A) submit (B) to submit (C) submitting (D) submitted**  
> Quản lý yêu cầu mọi nhân viên nộp bảng chấm công trước thứ Sáu.  
> _Vì sao:_ Câu đã có động từ "asked"; mẫu ask + tân ngữ + to V → (B)

## Động từ đi với to V và V-ing

Không có quy tắc tuyệt đối, nên nhóm các động từ hay ra đề lại và học theo cụm.

- \+ to V: plan, decide, agree, hope, expect, intend, aim, offer, refuse, fail, strive, seek, be able to, be eager to
- \+ tân ngữ + to V: ask, require, encourage, allow, enable, remind, advise, invite, urge, permit
- \+ V-ing: consider, avoid, recommend, suggest, finish, postpone, delay, mind, discontinue
- "to" là giới từ nên theo sau là V-ing: look forward to, be committed to, be dedicated to, contribute to, object to, be used to
- in order to / so as to + V nguyên mẫu (chỉ mục đích)

> **We look forward to -------- with your team on the next project. (A) work (B) working (C) be worked (D) works**  
> Chúng tôi mong được làm việc với nhóm của anh chị trong dự án tới.  
> _Vì sao:_ "to" trong look forward to là giới từ → V-ing (B)

> **The committee is considering -------- the deadline by one week. (A) extend (B) to extend (C) extending (D) extended**  
> Ủy ban đang cân nhắc lùi hạn chót thêm một tuần.  
> _Vì sao:_ consider + V-ing → (C)

## Chủ động hay bị động

Với động từ cần tân ngữ (review, approve, send, inspect), nếu sau chỗ trống không có tân ngữ mà có by, giới từ hoặc trạng từ, câu thường là bị động: be + V3. Hỏi thêm: chủ ngữ tự làm hay được làm.

> **All applications must be -------- by March 31. (A) receive (B) receiving (C) received (D) receives**  
> Mọi hồ sơ phải được nhận trước ngày 31 tháng Ba.  
> _Vì sao:_ Hồ sơ không tự nhận; sau "be" và không có tân ngữ → V3 (C)

> **The conference room -------- every Monday morning. (A) cleans (B) is cleaning (C) is cleaned (D) has cleaned**  
> Phòng họp được dọn mỗi sáng thứ Hai.  
> _Vì sao:_ "every Monday" → hiện tại đơn; phòng được dọn → bị động (C)

## Phân từ bổ nghĩa cho danh từ

V-ing mang nghĩa chủ động (danh từ tự làm việc đó), V3 mang nghĩa bị động (danh từ chịu tác động). Phân từ có thể đứng trước danh từ (the attached file) hoặc sau danh từ như một mệnh đề quan hệ rút gọn (employees attending the event).

> **Please review the -------- documents before the meeting. (A) attach (B) attaching (C) attached (D) attaches**  
> Vui lòng xem các tài liệu đính kèm trước cuộc họp.  
> _Vì sao:_ Tài liệu được đính kèm → V3 (C)

> **Employees -------- to attend the seminar should contact Ms. Ruiz. (A) wish (B) wishing (C) wished (D) wishes**  
> Nhân viên muốn dự hội thảo nên liên hệ cô Ruiz.  
> _Vì sao:_ Động từ chính là "should contact"; nhân viên tự muốn → V-ing (B)

## Bẫy ở mức 800+

Tính từ chỉ cảm xúc: -ing mô tả thứ gây ra cảm xúc (a surprising result), -ed mô tả người cảm thấy (surprised staff). Động từ sai khiến: have / get + vật + V3 (nhờ người khác làm), make / let + người + V nguyên mẫu, help + người + (to) V.

Phân biệt be used to + V-ing (quen với) và used to + V (đã từng), stop + V-ing (ngừng làm) và stop + to V (dừng lại để làm).

> **The results of the customer survey were -------- to the marketing team. (A) surprise (B) surprising (C) surprised (D) surprisingly**  
> Kết quả khảo sát khách hàng khiến nhóm marketing bất ngờ.  
> _Vì sao:_ Kết quả là thứ gây bất ngờ → (B); "surprised" dùng khi chủ ngữ là người

> **Ms. Kim had the contract -------- by a lawyer before signing it. (A) review (B) reviewing (C) reviewed (D) to review**  
> Cô Kim nhờ luật sư xem lại hợp đồng trước khi ký.  
> _Vì sao:_ have + vật + V3 (hợp đồng được xem) → (C); có "by a lawyer" là dấu hiệu bị động
', ARRAY['Câu đã có động từ chính thì chỗ trống là to V, V-ing hoặc V3', 'Sau "to" giới từ (look forward to, committed to) dùng V-ing', 'Không có tân ngữ sau động từ cần tân ngữ → nghĩ đến bị động', 'V-ing chủ động, V3 bị động khi bổ nghĩa cho danh từ']::text[], ARRAY['P5', 'P6']::text[], 20, 'P5', 'grammar.verb-form', 2, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'grammar'), 'agreement', 'Hoà hợp chủ ngữ và động từ', 'Tìm đúng chủ ngữ thật, bỏ qua cụm chen giữa, và nắm các lượng từ quyết định động từ số ít hay số nhiều', '## Tìm chủ ngữ thật

Động từ hoà hợp với danh từ chính của chủ ngữ, không phải danh từ đứng sát nó. Gạch bỏ cụm giới từ (of, in, for, with), mệnh đề quan hệ và cụm phân từ chen giữa, phần còn lại là chủ ngữ thật.

> **The list of approved vendors -------- been sent to all department heads. (A) have (B) has (C) are (D) being**  
> Danh sách nhà cung cấp được duyệt đã được gửi tới mọi trưởng phòng.  
> _Vì sao:_ Chủ ngữ thật là "The list" (số ít), "vendors" chỉ nằm trong cụm of → (B)

> **The engineers who designed the new bridge -------- invited to the opening ceremony. (A) was (B) is (C) were (D) has**  
> Các kỹ sư thiết kế cây cầu mới được mời dự lễ khánh thành.  
> _Vì sao:_ Bỏ mệnh đề "who designed the new bridge", chủ ngữ là "engineers" → (C)

## Lượng từ quyết định số ít hay số nhiều

Nhiều câu Part 5 chỉ cần nhìn lượng từ đầu câu là biết động từ chia thế nào.

- each / every + danh từ số ít → động từ số ít; each of + danh từ số nhiều → vẫn số ít
- one of the + danh từ số nhiều → động từ số ít
- a number of + danh từ số nhiều → số nhiều; the number of → số ít
- all / most / some / half of + danh từ → động từ theo danh từ đó (most of the staff… / most of the information…)
- danh từ không đếm được (information, equipment, furniture, advice, luggage) và V-ing làm chủ ngữ → số ít

> **A number of customers -------- requested a refund since the recall. (A) has (B) have (C) is (D) was**  
> Một số khách hàng đã yêu cầu hoàn tiền kể từ khi thu hồi sản phẩm.  
> _Vì sao:_ "A number of" + số nhiều → động từ số nhiều; "since" → hiện tại hoàn thành (B)

> **Reviewing all the supplier contracts -------- at least three days. (A) take (B) takes (C) taking (D) to take**  
> Việc xem xét toàn bộ hợp đồng nhà cung cấp mất ít nhất ba ngày.  
> _Vì sao:_ Chủ ngữ là cụm V-ing → số ít (B), dù "contracts" số nhiều đứng sát

## Chủ ngữ ghép

Khi chủ ngữ có hai thành phần, cách nối quyết định động từ.

- A and B, both A and B → số nhiều
- either A or B, neither A nor B, not only A but also B → theo B (danh từ gần động từ)
- A as well as B, A along with B, A together with B → theo A

> **Neither the manager nor the assistants -------- aware of the schedule change. (A) was (B) were (C) is (D) has been**  
> Cả quản lý lẫn các trợ lý đều không biết lịch đã thay đổi.  
> _Vì sao:_ neither…nor → theo "the assistants" (số nhiều) → (B)

## Bẫy ở mức 800+

Câu khó thường bắt xét ba thứ cùng lúc: số ít / số nhiều, thì và chủ động / bị động. Loại lần lượt từng tiêu chí thay vì dịch. Danh từ tập hợp chỉ cả nhóm như committee, board, management thường đi với động từ số ít trong đề TOEIC.

Trong mệnh đề quan hệ, động từ hoà hợp với danh từ mà who / which / that thay thế.

> **The equipment in both laboratories -------- inspected once a year. (A) are (B) is (C) were (D) have been**  
> Thiết bị ở cả hai phòng thí nghiệm được kiểm tra mỗi năm một lần.  
> _Vì sao:_ "equipment" không đếm được → số ít; "once a year" → hiện tại đơn → (B)

> **Only one of the proposals submitted last week -------- the budget requirements. (A) meet (B) meets (C) meeting (D) have met**  
> Chỉ một trong các đề xuất nộp tuần trước đáp ứng yêu cầu ngân sách.  
> _Vì sao:_ one of the + số nhiều → động từ số ít (B); "submitted last week" là cụm phân từ chen giữa
', ARRAY['Gạch bỏ cụm giới từ và mệnh đề chen giữa để thấy chủ ngữ thật', 'each, every, one of, the number of → số ít; a number of → số nhiều', 'either…or, neither…nor → theo danh từ gần động từ', 'Danh từ không đếm được và cụm V-ing làm chủ ngữ → số ít']::text[], ARRAY['P5', 'P6']::text[], 15, 'P5', 'grammar.agreement', 3, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'grammar'), 'pronoun', 'Đại từ nhân xưng, sở hữu và phản thân', 'Chọn đúng dạng đại từ theo vị trí trong câu, và nhận ra đại từ phản thân, sở hữu, bất định trong câu khó', '## Năm dạng và vị trí của chúng

Câu đại từ cho bốn dạng của cùng một ngôi (they, them, their, themselves). Giống từ loại, chỉ cần nhìn vị trí.

- Chủ ngữ (I, he, she, it, we, they): trước động từ chia thì
- Tân ngữ (me, him, her, it, us, them): sau động từ hoặc giới từ
- Tính từ sở hữu (my, his, her, its, our, their): trước danh từ
- Đại từ sở hữu (mine, his, hers, ours, theirs): đứng một mình, thay cho tính từ sở hữu + danh từ
- Phản thân (myself, himself, themselves): khi chủ ngữ và tân ngữ là một, hoặc để nhấn mạnh

> **Ms. Lopez asked that all expense reports be sent directly to --------. (A) she (B) her (C) hers (D) herself**  
> Cô Lopez yêu cầu mọi báo cáo chi phí được gửi thẳng cho cô.  
> _Vì sao:_ Sau giới từ "to" cần tân ngữ → (B)

> **Our proposal was less expensive than --------, so the client chose us. (A) they (B) them (C) their (D) theirs**  
> Đề xuất của chúng tôi rẻ hơn đề xuất của họ nên khách hàng chọn chúng tôi.  
> _Vì sao:_ Cần thay cho "their proposal" → đại từ sở hữu (D)

## Đại từ phản thân

Dùng phản thân khi tân ngữ chính là chủ ngữ (She introduced herself). Khi câu đã đủ thành phần, phản thân đứng cuối hoặc sau chủ ngữ để nhấn mạnh "tự mình làm". by + phản thân nghĩa là "một mình, không ai giúp".

> **The new interns introduced -------- at the start of the meeting. (A) they (B) them (C) their (D) themselves**  
> Các thực tập sinh mới tự giới thiệu ở đầu buổi họp.  
> _Vì sao:_ Người giới thiệu và người được giới thiệu là một → (D); "them" sẽ chỉ người khác

> **Mr. Chen prefers to handle client complaints --------. (A) he (B) him (C) his (D) himself**  
> Ông Chen thích tự mình xử lý khiếu nại của khách.  
> _Vì sao:_ Câu đã đủ chủ ngữ, động từ, tân ngữ; chỗ trống chỉ nhấn mạnh → (D)

## Đại từ bất định và chỉ định

Those who + động từ số nhiều nghĩa là "những ai". Anyone, everyone, someone đi với động từ số ít. Trong so sánh, that of / those of thay cho danh từ đã nhắc để không lặp lại.

- another + danh từ số ít (thêm một cái nữa); other + danh từ số nhiều
- others = những người / vật khác (đứng một mình); the other = cái còn lại trong hai
- each other / one another: lẫn nhau, làm tân ngữ

> **\-------- who wish to attend the training must register by Friday. (A) Anyone (B) Those (C) Whoever (D) They**  
> Những ai muốn dự buổi đào tạo phải đăng ký trước thứ Sáu.  
> _Vì sao:_ "wish" số nhiều → "Those who" (B); "Anyone who" cần "wishes"

> **Sales figures for this year are higher than -------- for last year. (A) that (B) those (C) these (D) them**  
> Doanh số năm nay cao hơn doanh số năm ngoái.  
> _Vì sao:_ Thay cho "sales figures" (số nhiều) và có cụm "for last year" theo sau → (B)

## Bẫy ở mức 800+

Ở Part 6, đại từ phải khớp với danh từ được nhắc ở câu trước. Tên công ty là số ít nên dùng it / its, không phải they / their. Đọc lại câu trước để biết đại từ chỉ ai.

Phân biệt its (của nó) và it''s (it is), their và there.

> **Hanmore Foods announced that -------- quarterly profits rose by 8 percent. (A) it (B) its (C) their (D) theirs**  
> Hanmore Foods thông báo lợi nhuận quý của công ty tăng 8%.  
> _Vì sao:_ Trước danh từ cần tính từ sở hữu; công ty là số ít → (B)

> **Some participants preferred the morning session, while -------- chose the afternoon one. (A) another (B) other (C) others (D) the other**  
> Một số người tham gia thích buổi sáng, trong khi những người khác chọn buổi chiều.  
> _Vì sao:_ Đứng một mình, chỉ nhiều người → (C); "other" phải có danh từ theo sau
', ARRAY['Trước động từ: chủ ngữ; sau động từ / giới từ: tân ngữ; trước danh từ: sở hữu', 'Chủ ngữ và tân ngữ là một → phản thân', 'Those who + số nhiều; anyone who + số ít', 'Công ty, tổ chức số ít → it / its']::text[], ARRAY['P5', 'P6']::text[], 15, 'P5', 'grammar.pronoun', 4, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'grammar'), 'preposition', 'Giới từ thời gian, nơi chốn và cụm cố định', 'Phân biệt giới từ với liên từ, chọn giới từ chỉ thời gian chính xác và nhớ các cụm giới từ hay ra', '## Giới từ hay liên từ

Giới từ đi với danh từ, cụm danh từ hoặc V-ing. Liên từ đi với cả một mệnh đề (có chủ ngữ và động từ). Khi bốn đáp án có cả hai loại, nhìn phần sau chỗ trống trước khi xét nghĩa.

- despite / in spite of (giới từ) ↔ although / even though (liên từ)
- because of / due to / owing to ↔ because / since
- during ↔ while; before, after, until, since dùng được cả hai cách

> **\-------- the heavy rain, the outdoor concert went ahead as planned. (A) Although (B) Despite (C) Even if (D) However**  
> Dù mưa lớn, buổi hòa nhạc ngoài trời vẫn diễn ra như kế hoạch.  
> _Vì sao:_ Sau chỗ trống là cụm danh từ "the heavy rain" → giới từ (B)

## Giới từ chỉ thời gian

Nhóm này ra rất thường xuyên và hai đáp án hay gần nghĩa nhau, nên cần nắm khác biệt chính xác.

- at + giờ; on + ngày, thứ; in + tháng, năm, buổi
- by = không muộn hơn (hạn chót); until = kéo dài liên tục đến lúc đó
- within = trong vòng (không quá); for + khoảng thời gian; since + mốc
- during + danh từ (trong suốt sự kiện); throughout = suốt từ đầu đến cuối
- prior to = before; following = after; as of = kể từ (một ngày cụ thể)

> **Please return the signed form -------- Friday at noon. (A) until (B) by (C) since (D) during**  
> Vui lòng gửi lại mẫu đơn đã ký chậm nhất trưa thứ Sáu.  
> _Vì sao:_ "return" là hành động một lần, cần hạn chót → (B); "until" dùng với hành động kéo dài như "remain open until"

> **The warranty covers repairs -------- two years of purchase. (A) within (B) during (C) since (D) among**  
> Bảo hành áp dụng cho việc sửa chữa trong vòng hai năm kể từ khi mua.  
> _Vì sao:_ within + khoảng thời gian + of → (A)

## Nơi chốn và các cụm cố định

Between dùng cho hai đối tượng, among cho ba trở lên. Phần lớn điểm giới từ ở mức 800+ nằm ở cụm cố định: học cả cụm thay vì học từng giới từ.

- responsible for, eligible for, comply with, familiar with, in accordance with, subject to
- in charge of, on behalf of, in addition to, regardless of, in response to, according to
- ahead of schedule, on time / in time, out of stock, under review, at no extra cost, in advance

> **All visitors to the plant must comply -------- the safety regulations. (A) to (B) for (C) with (D) by**  
> Mọi khách tham quan nhà máy phải tuân thủ quy định an toàn.  
> _Vì sao:_ Cụm cố định comply with → (C)

> **The renovation of the lobby was completed two weeks -------- schedule. (A) ahead of (B) prior (C) in front (D) before of**  
> Việc cải tạo sảnh hoàn thành sớm hai tuần so với kế hoạch.  
> _Vì sao:_ Cụm cố định ahead of schedule → (A)

## Bẫy ở mức 800+

Đề khó dùng giới từ nhiều chữ hoặc giới từ có hình thức giống động từ: following, given, regarding, concerning, excluding. Chúng vẫn là giới từ, đi với danh từ chứ không đi với mệnh đề.

> **\-------- the success of the pilot program, the company will expand it to all branches. (A) Following (B) Because (C) Whereas (D) Unless**  
> Sau thành công của chương trình thử nghiệm, công ty sẽ mở rộng ra mọi chi nhánh.  
> _Vì sao:_ Sau chỗ trống là cụm danh từ; ba đáp án còn lại là liên từ → (A)

> **Applicants are evaluated -------- their experience and skills. (A) on the basis of (B) in spite of (C) instead (D) owing**  
> Ứng viên được đánh giá dựa trên kinh nghiệm và kỹ năng.  
> _Vì sao:_ Nghĩa "dựa trên" → (A); "instead" và "owing" thiếu "of" nên không đứng trước danh từ
', ARRAY['Sau chỗ trống là danh từ → giới từ; là mệnh đề → liên từ', 'by = hạn chót; until = kéo dài đến', 'Học giới từ theo cụm (comply with, eligible for, subject to)', 'following, given, regarding là giới từ']::text[], ARRAY['P5', 'P6']::text[], 20, 'P5', 'grammar.preposition', 5, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'grammar'), 'conjunction', 'Liên từ, trạng từ nối và liên từ cặp', 'Chọn liên từ theo cấu trúc câu và theo nghĩa, phân biệt với however, therefore và nắm các cặp either…or, not only…but also', '## Liên từ và trạng từ nối khác nhau thế nào

Liên từ phụ thuộc (although, because, unless, once, while) nối hai mệnh đề trong cùng một câu. Trạng từ nối (however, therefore, moreover, nevertheless, consequently, otherwise) không nối được hai mệnh đề: nó đứng đầu câu mới hoặc sau dấu chấm phẩy, và thường có dấu phẩy theo sau.

Nhìn dấu câu quanh chỗ trống: "; --------," hoặc ". --------," gần như chắc chắn cần trạng từ nối.

> **The hotel near the venue was fully booked; --------, we found rooms at a nearby inn. (A) although (B) however (C) despite (D) because**  
> Khách sạn gần địa điểm đã kín phòng; tuy nhiên, chúng tôi tìm được phòng ở một nhà trọ gần đó.  
> _Vì sao:_ Sau dấu chấm phẩy và trước dấu phẩy → trạng từ nối (B)

## Chọn liên từ theo nghĩa

Khi các đáp án đều là liên từ, xét quan hệ giữa hai vế.

- Nguyên nhân: because, since, as, now that
- Nhượng bộ, tương phản: although, even though, while, whereas
- Điều kiện: if, unless (= if not), provided that, as long as, in case
- Mục đích: so that, in order that
- Thời gian: once, as soon as, until, before, after

> **Staff may work from home on Fridays -------- their tasks are completed on schedule. (A) as long as (B) unless (C) whereas (D) so that**  
> Nhân viên được làm việc tại nhà vào thứ Sáu miễn là công việc hoàn thành đúng hạn.  
> _Vì sao:_ Vế sau là điều kiện để được làm ở nhà → (A)

> **\-------- the budget was approved late, the project still finished on time. (A) Because (B) Even though (C) Unless (D) In case**  
> Dù ngân sách được duyệt muộn, dự án vẫn hoàn thành đúng hạn.  
> _Vì sao:_ "still" cho thấy hai vế trái ngược → nhượng bộ (B)

## Liên từ cặp

Thấy nửa đầu của cặp trong câu thì tìm nửa sau tương ứng. Hai vế được nối phải cùng dạng (danh từ với danh từ, tính từ với tính từ, to V với to V).

- both A and B
- either A or B; neither A nor B
- not only A but (also) B
- whether A or B

> **Payment can be made either by credit card -------- by bank transfer. (A) and (B) nor (C) or (D) but**  
> Có thể thanh toán bằng thẻ tín dụng hoặc chuyển khoản.  
> _Vì sao:_ either đi với or → (C)

> **The new model is not only lighter -------- more energy-efficient. (A) but also (B) as well (C) and so (D) or else**  
> Mẫu mới không chỉ nhẹ hơn mà còn tiết kiệm điện hơn.  
> _Vì sao:_ not only đi với but also → (A)

## Bẫy ở mức 800+

Ở Part 6, trạng từ nối đầu câu phụ thuộc vào quan hệ với câu trước, nên phải đọc cả câu trước. Nevertheless (tuy vậy) nối ý trái ngược; therefore (vì vậy) nối kết quả; otherwise (nếu không thì) nêu hậu quả khi không làm theo; similarly nối ý giống nhau.

Phân biệt so that (để mà, chỉ mục đích) với so (nên, chỉ kết quả), và unless với if not: không thêm not sau unless.

> **Our main office will be closed on Monday for a public holiday. --------, customer support will remain available by phone. (A) Therefore (B) Otherwise (C) Nevertheless (D) Similarly**  
> Văn phòng chính sẽ đóng cửa thứ Hai vì ngày lễ. Tuy vậy, bộ phận hỗ trợ khách hàng vẫn làm việc qua điện thoại.  
> _Vì sao:_ Đóng cửa nhưng vẫn hỗ trợ → tương phản (C)

> **Please confirm your attendance by Friday; --------, your seat may be given to another participant. (A) otherwise (B) moreover (C) instead (D) therefore**  
> Vui lòng xác nhận tham dự trước thứ Sáu; nếu không, chỗ của bạn có thể được nhường cho người khác.  
> _Vì sao:_ Vế sau là hậu quả nếu không xác nhận → (A)
', ARRAY['Dấu chấm phẩy hoặc đầu câu + dấu phẩy → trạng từ nối', 'Hai mệnh đề trong một câu → liên từ, chọn theo quan hệ nghĩa', 'Thấy either, neither, both, not only, whether → tìm nửa còn lại', 'Part 6: đọc câu trước rồi mới chọn từ nối']::text[], ARRAY['P5', 'P6']::text[], 20, 'P5', 'grammar.conjunction', 6, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'grammar'), 'relative-clause', 'Mệnh đề quan hệ', 'Chọn who, whom, which, that, whose, what theo vai trò trong mệnh đề, và nhận ra mệnh đề quan hệ rút gọn', '## Chọn đại từ quan hệ

Xét hai điều: danh từ đứng trước là người hay vật, và trong mệnh đề sau chỗ trống còn thiếu chủ ngữ, tân ngữ hay đã đủ.

- who: người, làm chủ ngữ (theo sau là động từ)
- whom: người, làm tân ngữ (theo sau là chủ ngữ + động từ)
- which: vật; that: người hoặc vật, nhưng không đứng sau dấu phẩy và không đứng sau giới từ
- whose + danh từ: sở hữu, dùng cho cả người và vật; mệnh đề sau đã đủ thành phần

> **The consultant -------- we hired last month has already reduced our costs. (A) whom (B) whose (C) which (D) what**  
> Chuyên gia tư vấn chúng tôi thuê tháng trước đã giúp giảm chi phí.  
> _Vì sao:_ Danh từ chỉ người, mệnh đề "we hired" thiếu tân ngữ → (A)

> **Candidates -------- applications are incomplete will not be considered. (A) who (B) whom (C) whose (D) which**  
> Ứng viên có hồ sơ chưa đầy đủ sẽ không được xét.  
> _Vì sao:_ Sau chỗ trống là danh từ "applications" và mệnh đề đã đủ → sở hữu (C)

## Giới từ + which, where, when và what

Giới từ + which / whom thay cho nơi chốn, thời điểm hoặc cụm giới từ trong mệnh đề (in which = where). What nghĩa là "điều mà", không có danh từ đứng trước.

> **The building in -------- the seminar will be held is under renovation. (A) that (B) which (C) where (D) whom**  
> Tòa nhà nơi tổ chức hội thảo đang được sửa chữa.  
> _Vì sao:_ Sau giới từ "in", chỉ vật → which (B); "that" không đứng sau giới từ

> **\-------- our clients need most is a faster delivery service. (A) That (B) Which (C) What (D) Whose**  
> Điều khách hàng cần nhất là dịch vụ giao hàng nhanh hơn.  
> _Vì sao:_ Không có danh từ đứng trước, cần nghĩa "điều mà" → (C)

## Mệnh đề quan hệ rút gọn

Khi đại từ quan hệ làm chủ ngữ, có thể bỏ nó cùng động từ be: V-ing nếu chủ động, V3 nếu bị động. Sau the first, the last, the only có thể rút gọn thành to V.

> **Passengers -------- on international flights should arrive two hours early. (A) depart (B) departing (C) departed (D) who departing**  
> Hành khách bay quốc tế nên đến sớm hai tiếng.  
> _Vì sao:_ Động từ chính là "should arrive"; hành khách tự khởi hành → V-ing (B); (D) sai vì "who" cần động từ chia thì

## Bẫy ở mức 800+

Sau lượng từ + of (most of, some of, all of, none of) dùng whom cho người và which cho vật, không dùng them hay who. Dấu phẩy + which có thể thay cho cả mệnh đề phía trước.

Động từ trong mệnh đề quan hệ chia theo danh từ mà đại từ thay thế: "the reports that were…" nhưng "the report that was…".

> **The company hired twenty new staff members, most of -------- have experience in logistics. (A) them (B) whom (C) who (D) which**  
> Công ty tuyển hai mươi nhân viên mới, phần lớn trong số đó có kinh nghiệm hậu cần.  
> _Vì sao:_ "them" sẽ tạo hai mệnh đề không có liên từ; sau giới từ "of", chỉ người → (B)

> **The firm offers flexible working hours, -------- has helped it attract skilled workers. (A) that (B) what (C) which (D) who**  
> Công ty cho làm giờ linh hoạt, điều này giúp công ty thu hút lao động giỏi.  
> _Vì sao:_ Sau dấu phẩy, thay cho cả ý phía trước → (C); "that" không đứng sau dấu phẩy
', ARRAY['Sau chỗ trống là động từ → who / which; là chủ ngữ + động từ → whom / which', 'Sau chỗ trống là danh từ và mệnh đề đã đủ → whose', 'that không đứng sau dấu phẩy và giới từ', 'Không có danh từ phía trước, nghĩa "điều mà" → what']::text[], ARRAY['P5', 'P6']::text[], 18, 'P5', 'grammar.relative-clause', 7, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'grammar'), 'comparison', 'So sánh hơn, so sánh nhất và so sánh bằng', 'Nhận ra dạng so sánh qua than, the, as…as và chọn đúng từ nhấn mạnh như much, far, by far', '## Tín hiệu của ba dạng so sánh

Câu so sánh thường cho bốn dạng của một tính từ (high, higher, highest, highly). Tìm từ đi kèm để biết dạng cần dùng.

- than → so sánh hơn: higher than, more efficient than
- the + … + of / in / among, ever, one of the + danh từ số nhiều → so sánh nhất
- as + … + as → nguyên dạng

> **Sales in the third quarter were -------- than analysts had predicted. (A) high (B) higher (C) highest (D) highly**  
> Doanh số quý ba cao hơn dự đoán của các nhà phân tích.  
> _Vì sao:_ Có "than" → so sánh hơn (B)

> **Ms. Park is one of the -------- engineers in the department. (A) experienced (B) more experienced (C) most experienced (D) experience**  
> Cô Park là một trong những kỹ sư giàu kinh nghiệm nhất phòng.  
> _Vì sao:_ one of the + số nhiều → so sánh nhất (C)

## Từ nhấn mạnh và cấu trúc càng…càng

Trước so sánh hơn dùng much, far, even, still, a lot, significantly, considerably; không dùng very. Trước so sánh nhất dùng by far hoặc the very. Cấu trúc "The + so sánh hơn…, the + so sánh hơn…" nghĩa là càng… càng….

> **The updated software runs -------- faster than the previous version. (A) very (B) much (C) so (D) more**  
> Phần mềm cập nhật chạy nhanh hơn nhiều so với bản trước.  
> _Vì sao:_ Trước "faster than" cần từ nhấn mạnh so sánh hơn → (B)

> **The -------- you submit your application, the sooner you will receive a reply. (A) early (B) earlier (C) earliest (D) more early**  
> Nộp hồ sơ càng sớm, bạn càng nhận phản hồi sớm.  
> _Vì sao:_ Cấu trúc the + so sánh hơn, the + so sánh hơn → (B)

## So sánh bằng

Giữa as…as, chọn tính từ hay trạng từ theo từ mà nó bổ nghĩa: sau be dùng tính từ, bổ nghĩa cho động từ thường dùng trạng từ. Lưu ý the same as, twice as + adj + as, as many / as much as.

> **Our support team responded as -------- as possible to the outage. (A) quick (B) quickly (C) quicker (D) quickest**  
> Đội hỗ trợ đã phản hồi sự cố nhanh nhất có thể.  
> _Vì sao:_ Bổ nghĩa cho động từ "responded" → trạng từ nguyên dạng (B)

## Bẫy ở mức 800+

Khi chỉ có hai đối tượng (of the two), dùng the + so sánh hơn, không dùng so sánh nhất. Superior, inferior, prior, senior, junior đi với to chứ không đi với than.

Most + danh từ (không có the) nghĩa là "hầu hết", không phải so sánh nhất. Ở Part 6, so sánh hơn có thể không có than khi vật được so đã nêu ở câu trước.

> **Of the two candidates, Mr. Silva is the -------- qualified. (A) much (B) more (C) most (D) many**  
> Trong hai ứng viên, anh Silva có trình độ phù hợp hơn.  
> _Vì sao:_ "Of the two" → the + so sánh hơn (B)

> **The new engine is superior -------- its predecessor in fuel efficiency. (A) than (B) to (C) over (D) from**  
> Động cơ mới vượt trội hơn đời trước về hiệu quả nhiên liệu.  
> _Vì sao:_ superior to → (B); "than" là bẫy vì nghĩa giống so sánh hơn
', ARRAY['than → so sánh hơn; the … of / in, one of the → so sánh nhất', 'much, far, even + so sánh hơn; không dùng very', 'Of the two → the + so sánh hơn', 'superior, inferior, prior đi với to']::text[], ARRAY['P5', 'P6']::text[], 15, 'P5', 'grammar.comparison', 8, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'grammar'), 'inversion-conditional', 'Câu điều kiện, giả định và đảo ngữ', 'Nắm ba loại câu điều kiện, dạng đảo Should / Were / Had, câu giả định với that và đảo ngữ sau trạng từ phủ định', '## Ba loại câu điều kiện

Nhìn động từ ở vế có sẵn để suy ra vế còn lại. Đề TOEIC chủ yếu ra loại 1 (thư từ, thông báo) và loại 3 (tiếc nuối về việc đã qua).

- Loại 1 (có thể xảy ra): If + hiện tại, will / can / may + V hoặc câu mệnh lệnh
- Loại 2 (trái hiện tại): If + quá khứ (be → were), would / could + V
- Loại 3 (trái quá khứ): If + had V3, would / could have V3

> **If the shipment -------- late again, we will look for another supplier. (A) arrives (B) will arrive (C) arrived (D) had arrived**  
> Nếu hàng lại đến trễ, chúng tôi sẽ tìm nhà cung cấp khác.  
> _Vì sao:_ Vế chính có "will" → loại 1, vế if dùng hiện tại (A)

> **If we had received the invoice earlier, we -------- it on time. (A) pay (B) will pay (C) would pay (D) would have paid**  
> Nếu nhận hóa đơn sớm hơn thì chúng tôi đã thanh toán đúng hạn.  
> _Vì sao:_ Vế if là "had received" → loại 3 (D)

## Đảo ngữ trong câu điều kiện

Có thể bỏ if và đưa trợ động từ lên đầu. Dạng này rất hay gặp ở cuối thư và thông báo, nên cần nhận ra ngay.

- Should + S + V nguyên mẫu = If + S + hiện tại (loại 1, lịch sự): Should you need help, …
- Were + S + to V / Were + S + … = If + S + were … (loại 2)
- Had + S + V3 = If + S + had V3 (loại 3)

> **Should you -------- further assistance, please call our help desk. (A) requiring (B) require (C) required (D) requires**  
> Nếu cần thêm hỗ trợ, vui lòng gọi bộ phận trợ giúp.  
> _Vì sao:_ Should đảo lên đầu, động từ theo sau ở dạng nguyên mẫu → (B)

> **\-------- we known about the road closure, we would have left earlier. (A) If (B) Had (C) Should (D) Were**  
> Nếu biết đường bị chặn thì chúng tôi đã đi sớm hơn.  
> _Vì sao:_ "known" là V3 và vế sau là "would have left" → đảo loại 3 (B); "If we known" sai ngữ pháp

## Câu giả định với that

Sau các tính từ essential, important, necessary, vital, imperative và các động từ recommend, suggest, request, require, insist, ask + that, động từ trong mệnh đề that dùng nguyên mẫu (không thêm s, không chia thì), kể cả với chủ ngữ số ít. Bị động là be + V3.

> **It is essential that every participant -------- the safety guidelines. (A) follow (B) follows (C) followed (D) following**  
> Điều quan trọng là mọi người tham gia phải tuân thủ hướng dẫn an toàn.  
> _Vì sao:_ "It is essential that" → nguyên mẫu (A); "follows" là bẫy vì chủ ngữ số ít

> **The director requested that the report -------- by noon. (A) submits (B) is submitted (C) be submitted (D) was submitted**  
> Giám đốc yêu cầu báo cáo được nộp trước buổi trưa.  
> _Vì sao:_ "requested that" + báo cáo được nộp → giả định bị động be + V3 (C)

## Đảo ngữ sau trạng từ phủ định

Khi never, rarely, seldom, hardly, not only, only after, only when, under no circumstances đứng đầu câu, trợ động từ đứng trước chủ ngữ như câu hỏi. Ngoài ra, các câu như "Attached is…", "Enclosed are…" có chủ ngữ thật đứng sau động từ, nên động từ chia theo danh từ phía sau.

> **Rarely -------- the factory missed a delivery deadline. (A) has (B) have (C) did (D) does**  
> Nhà máy hiếm khi lỡ hạn giao hàng.  
> _Vì sao:_ Đảo ngữ sau "Rarely"; "missed" là V3 nên cần "has" (chủ ngữ số ít) → (A)

> **Enclosed -------- the documents you requested last week. (A) is (B) are (C) has (D) be**  
> Kèm theo đây là các tài liệu anh chị yêu cầu tuần trước.  
> _Vì sao:_ Chủ ngữ thật là "the documents" (số nhiều) đứng sau → (B)

## Bẫy ở mức 800+

Unless đã mang nghĩa phủ định (= if not), nên vế sau unless không thêm not và vẫn dùng hiện tại cho tương lai. Without / but for + danh từ có thể thay cả vế if trong câu loại 2 và 3. Provided that, as long as, in case cũng là liên từ điều kiện, đi với mệnh đề.

> **Unless the client -------- the contract by Friday, the order will be cancelled. (A) signs (B) does not sign (C) will sign (D) signed**  
> Nếu khách hàng không ký hợp đồng trước thứ Sáu, đơn hàng sẽ bị hủy.  
> _Vì sao:_ Unless đã có nghĩa phủ định; mệnh đề điều kiện dùng hiện tại → (A)

> **\-------- the support of our sponsors, this festival would not be possible. (A) Without (B) Unless (C) Except (D) Despite**  
> Nếu không có sự hỗ trợ của nhà tài trợ, lễ hội này sẽ không thể diễn ra.  
> _Vì sao:_ Theo sau là cụm danh từ và vế chính là "would not be" → Without (A); "Unless" cần mệnh đề
', ARRAY['Vế chính có will → vế if hiện tại; would have V3 → had V3', 'Should / Were / Had đứng đầu câu là if bị lược', 'essential that, request that + V nguyên mẫu, kể cả chủ ngữ số ít', 'Trạng từ phủ định đầu câu → trợ động từ trước chủ ngữ']::text[], ARRAY['P5', 'P6']::text[], 25, 'P5', NULL, 9, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'vocab'), 'word-meaning', 'Chọn từ đúng nghĩa và đúng cách dùng', 'Phân biệt các từ gần nghĩa bằng cách dùng của chúng và đọc cả câu để tìm manh mối về nghĩa', '## Câu từ vựng khác câu từ loại ở đâu

Ở câu từ vựng, bốn đáp án thường cùng loại từ (cùng là động từ, hoặc cùng là danh từ), nên nhìn vị trí chỗ trống không đủ để chọn. Phải hiểu câu đang nói gì và từ nào đi được với các từ xung quanh.

Ở mức 650, người học thường chọn theo cảm giác "nghĩa tiếng Việt nghe hợp". Để lên 800+, cần hỏi thêm hai câu: từ này có cần tân ngữ không, và sau nó là giới từ nào. Nhiều cặp từ dịch ra tiếng Việt giống nhau nhưng chỉ một từ đúng cấu trúc của câu.

## Những cặp từ hay bị nhầm

Các cặp dưới đây gần nghĩa hoặc gần cách viết, khác nhau ở cách dùng. Học cả cặp cùng lúc, kèm một cụm ví dụ ngắn.

- raise (ngoại động từ, cần tân ngữ: raise prices, raise funds) / rise (nội động từ, không có tân ngữ: costs rose by 5%)
- affect (động từ: the delay affected sales) / effect (thường là danh từ: have an effect on sales)
- borrow (mượn, borrow something from someone) / lend (cho mượn, lend someone something, lend something to someone)
- accept (động từ, chấp nhận: accept an offer) / except (giới từ, ngoại trừ: open every day except Sunday)
- adjacent (nằm sát bên, adjacent to the station) / adjoining (thông sang nhau, có chung tường: adjoining rooms)
- arrive (cần at / in: arrive at the airport) / reach (không cần giới từ: reach the airport)

> **The price of raw materials has -------- steadily over the past six months. (A) raised (B) risen (C) lifted (D) boosted**  
> Giá nguyên liệu thô đã tăng đều trong sáu tháng qua.  
> _Vì sao:_ Sau chỗ trống không có tân ngữ. Raised, lifted, boosted đều là ngoại động từ, cần tân ngữ (raise the price) → (B) risen

> **The board meeting will be held in the conference room -------- to the main lobby. (A) adjacent (B) adjoining (C) beside (D) nearby**  
> Cuộc họp hội đồng quản trị sẽ diễn ra ở phòng hội nghị nằm sát sảnh chính.  
> _Vì sao:_ Sau chỗ trống là "to": chỉ adjacent đi với to → (A). Beside và nearby không đi với to

## Manh mối nằm ở cấu trúc quanh chỗ trống

Khi bốn đáp án đều có nghĩa gần đúng, hãy nhìn từ đứng sau chỗ trống: tân ngữ là người hay vật, có "to + động từ" không, có giới từ nào không. Cấu trúc thường loại được hai hoặc ba đáp án.

> **The new software will -------- staff to process refunds in half the time. (A) enable (B) let (C) assist (D) make**  
> Phần mềm mới sẽ giúp nhân viên xử lý hoàn tiền nhanh gấp đôi.  
> _Vì sao:_ Mẫu "động từ + người + to V": enable sb to do → (A). Let và make đi với động từ nguyên mẫu không "to"; assist đi với "with" hoặc "in"

> **Mr. Okafor will -------- the interns about the safety rules on their first morning. (A) explain (B) brief (C) say (D) talk**  
> Ông Okafor sẽ phổ biến quy định an toàn cho thực tập sinh vào sáng ngày đầu tiên.  
> _Vì sao:_ Tân ngữ là người, sau đó là "about": brief sb about sth → (B). Explain cần "sth to sb", say không lấy người làm tân ngữ, talk cần "to sb"

## Đọc cả câu khi cấu trúc không đủ

Có câu mà cả bốn đáp án đều đúng ngữ pháp. Khi đó manh mối là một cụm ở đầu hoặc cuối câu: chỉ thời gian, nguyên nhân, kết quả. Đọc cả câu một lần rồi mới thử từng đáp án.

> **Because of the heavy rain forecast, the outdoor concert has been -------- until next Saturday. (A) postponed (B) canceled (C) prevented (D) avoided**  
> Do dự báo mưa lớn, buổi hòa nhạc ngoài trời được dời sang thứ Bảy tuần sau.  
> _Vì sao:_ "until next Saturday" cho biết sự kiện vẫn diễn ra nhưng muộn hơn → (A). Canceled là bẫy vì hợp với "heavy rain" nhưng mâu thuẫn với "until"

> **Applicants must have at least three years of -------- experience in hotel management. (A) relevant (B) relative (C) related (D) reliable**  
> Ứng viên phải có ít nhất ba năm kinh nghiệm liên quan trong quản lý khách sạn.  
> _Vì sao:_ Relevant experience là cụm chuẩn trong tin tuyển dụng. Relative nghĩa là tương đối, reliable nghĩa là đáng tin cậy. Related cũng có nghĩa liên quan nhưng thường đi sau danh từ hoặc với "to" (experience related to sales)
', ARRAY['Bốn đáp án cùng loại từ thì đây là câu nghĩa: đọc cả câu', 'Nhìn tân ngữ và giới từ sau chỗ trống để loại đáp án sai cấu trúc', 'Học từ gần nghĩa theo cặp, kèm một cụm ví dụ', 'Đáp án hợp với một nửa câu nhưng mâu thuẫn với nửa còn lại là bẫy']::text[], ARRAY['P5', 'P6']::text[], 20, 'P5', 'vocab.meaning', 0, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'vocab'), 'collocation', 'Cụm từ cố định trong tiếng Anh kinh doanh', 'Nhận ra các cặp từ luôn đi cùng nhau: động từ với danh từ, tính từ với danh từ, tính từ với giới từ và các cụm cố định', '## Collocation là gì và vì sao khó

Collocation là những từ người bản ngữ quen dùng với nhau. Tiếng Việt nói "đặt chỗ", tiếng Anh nói make a reservation chứ không nói do a reservation, dù cả hai động từ đều có nghĩa "làm".

Ở dạng câu này, bốn đáp án thường cùng nghĩa khi dịch, nên dịch không giúp được. Cách duy nhất là đã gặp cụm đó đủ nhiều. Vì vậy hãy học và ghi thẻ theo cả cụm (meet a deadline), không học từ đơn lẻ (meet).

## Động từ + danh từ

Nhóm hay ra nhất. Khi thấy chỗ trống là động từ và tân ngữ là một danh từ quen thuộc trong công việc, hãy nghĩ ngay đến động từ hay đi cùng danh từ đó.

- make: a decision, a reservation, a payment, an effort, an appointment, changes
- take: place, action, measures, responsibility for, advantage of
- meet: a deadline, a requirement, demand, expectations
- conduct: a survey, an inspection, an interview, research
- place an order, submit a proposal, reach an agreement, raise concerns, address an issue

> **To -------- the growing demand for its products, the factory has added a night shift. (A) meet (B) reach (C) fill (D) catch**  
> Để đáp ứng nhu cầu ngày càng tăng, nhà máy đã thêm ca đêm.  
> _Vì sao:_ meet demand là cụm cố định → (A). Reach đi với agreement, goal, target

> **The city will -------- an inspection of all restaurant kitchens next month. (A) conduct (B) perform (C) hold (D) act**  
> Thành phố sẽ tiến hành kiểm tra tất cả bếp nhà hàng vào tháng tới.  
> _Vì sao:_ conduct an inspection → (A). Hold đi với meeting, event; act là nội động từ

## Tính từ + danh từ và tính từ + giới từ

Với tính từ đứng trước danh từ, hãy xem danh từ là gì rồi chọn tính từ quen đi cùng. Với tính từ đứng sau động từ to be, giới từ ngay sau chỗ trống thường quyết định đáp án.

- Tính từ + danh từ: sharp increase, steady growth, substantial discount, extensive experience, heavy traffic, strong candidate, prompt response
- Tính từ + giới từ: responsible for, eligible for, aware of, capable of, familiar with, compatible with, comparable to, subject to, exempt from, dependent on

> **Employees with more than one year of service are -------- for the annual bonus. (A) eligible (B) capable (C) entitled (D) aware**  
> Nhân viên làm việc trên một năm đủ điều kiện nhận thưởng cuối năm.  
> _Vì sao:_ Sau chỗ trống là "for": eligible for → (A). Capable of, entitled to, aware of đều sai giới từ

> **All prices in this catalog are -------- to change without notice. (A) subject (B) depending (C) according (D) relevant**  
> Mọi mức giá trong danh mục có thể thay đổi mà không báo trước.  
> _Vì sao:_ subject to change là cụm cố định trên báo giá, hợp đồng → (A)

## Cụm cố định trong thư và thông báo

Thư, email và thông báo trong Part 5 và Part 6 dùng lại một nhóm cụm khá cố định. Chỉ cần nhận ra vài từ đầu là điền được chỗ trống.

- in advance, prior to, as of (+ ngày), until further notice, on short notice
- on behalf of, in charge of, in accordance with, in light of
- free of charge, out of stock, at your earliest convenience

> **The east entrance will remain closed until further --------. (A) notice (B) announcement (C) information (D) note**  
> Lối vào phía đông sẽ đóng cho đến khi có thông báo mới.  
> _Vì sao:_ until further notice là cụm cố định → (A)

> **Please return the signed contract at your earliest --------. (A) convenience (B) comfort (C) opportunity (D) availability**  
> Vui lòng gửi lại hợp đồng đã ký sớm nhất khi có thể.  
> _Vì sao:_ at your earliest convenience → (A). Opportunity đi với "at the first opportunity", không đi với "your earliest"
', ARRAY['Bốn đáp án dịch ra giống nhau thì đây là câu collocation', 'Nhìn danh từ hoặc giới từ ngay sau chỗ trống trước tiên', 'Ghi thẻ theo cả cụm, không theo từ đơn']::text[], ARRAY['P5', 'P6']::text[], 20, 'P5', 'vocab.collocation', 1, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'listening'), 'p1-photos', 'Mô tả tranh: người, vật và dạng động từ', 'Nhìn tranh trước khi nghe, nhận ra tranh tả người hay tả vật, rồi dựa vào dạng động từ để loại câu sai', '## Hai nhóm tranh và cách chuẩn bị

Part 1 có 6 tranh, mỗi tranh bốn câu mô tả chỉ được đọc lên, không in ra. Tranh chia thành hai nhóm: tranh có người (một người hoặc nhiều người) và tranh chỉ có vật hoặc cảnh.

Trong vài giây trước khi nghe, hãy tự gọi tên bằng tiếng Anh những gì thấy: ai, đang làm gì, cầm hoặc dùng vật gì, vật đặt ở đâu. Khi nghe, câu nào khớp với danh sách đó thì giữ lại.

- Tranh một người: tập trung vào hành động và thứ người đó đang cầm, nhìn, mặc
- Tranh nhiều người: chú ý điểm chung (They are sitting around a table) và hành động riêng của từng người
- Tranh vật hoặc cảnh: tập trung vào vị trí (next to, on top of, along, against) và trạng thái (stacked, lined up, hanging, empty)

## Ba dạng động từ cần phân biệt

Phần lớn câu Part 1 dùng một trong ba dạng dưới đây. Mỗi dạng chỉ đúng với một loại tranh, nên nghe được dạng động từ là đã loại được nhiều câu.

- is / are + V-ing (chủ động): người trong tranh đang làm việc đó ngay lúc chụp
- is / are being + V3 (bị động tiếp diễn): vật đang được ai đó tác động, nên trong tranh phải có người đang làm
- has / have been + V3 hoặc is / are + V3: trạng thái, kết quả đã xong, không cần có người trong tranh
- Ngoại lệ hay gặp: "is being displayed" (đang được trưng bày) tả trạng thái, có thể đúng với tranh không có người

> **Some boxes are being loaded onto a truck.**  
> Một số thùng hàng đang được chất lên xe tải.  
> _Vì sao:_ Chỉ đúng khi trong tranh có người đang chất hàng; nếu tranh chỉ có thùng nằm trên xe thì sai

> **Some chairs have been stacked against the wall.**  
> Một số ghế đã được xếp chồng sát tường.  
> _Vì sao:_ Dạng has been + V3 tả kết quả, đúng với tranh phòng trống không có người

> **A woman is putting on a jacket. / A woman is wearing a jacket.**  
> Một người phụ nữ đang mặc áo khoác vào. / Một người phụ nữ đang mặc áo khoác.  
> _Vì sao:_ putting on là hành động mặc vào, wearing là trạng thái đang mặc. Tranh người đã mặc sẵn áo thì chỉ câu thứ hai đúng

## Bẫy ở mức 800+

Ở mức 650, người học thường mất điểm vì không nghe kịp từ. Ở mức 800+, lỗi chủ yếu là chọn câu nghe "có vẻ đúng" vì nhắc đúng vật trong tranh nhưng sai hành động hoặc sai vị trí.

- Đúng vật, sai hành động: tranh người đàn ông đang đọc tài liệu cạnh kệ, câu nghe được là "reaching for a file on a shelf"
- Âm gần giống: walk / work, copy / coffee, file / pile, sheet / seat, lamp / ramp
- Nhắc vật không có trong tranh: câu nghe hợp lý nhưng có một danh từ không xuất hiện
- Suy đoán quá mức: "They are waiting for a bus" khi tranh chỉ cho thấy người đứng ở lề đường, không thấy biển xe buýt
- Đáp án đúng hay dùng từ chung thay cho từ cụ thể: vehicles (xe), equipment (máy móc), merchandise (hàng hóa), furniture (đồ đạc), documents (giấy tờ)

> **Some vehicles are parked along the street.**  
> Một số xe đang đỗ dọc con phố.  
> _Vì sao:_ Tranh có ô tô và xe máy; câu dùng từ chung "vehicles" nên vẫn đúng, đừng loại chỉ vì không nghe thấy "cars"

> **A man is working at a counter. / A man is walking to a counter.**  
> Một người đàn ông đang làm việc ở quầy. / Một người đàn ông đang đi về phía quầy.  
> _Vì sao:_ working và walking nghe gần giống; nhìn tranh xem người đó đứng yên hay đang di chuyển
', ARRAY['Nhìn tranh trước khi nghe và tự gọi tên người, hành động, vật, vị trí', 'is being + V3 cần có người đang làm việc đó trong tranh', 'Đúng vật mà sai hành động hoặc sai vị trí vẫn là câu sai', 'Đáp án đúng hay dùng từ chung như vehicles, equipment, merchandise']::text[], ARRAY['P1']::text[], 15, NULL, NULL, 0, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'listening'), 'p2-wh-questions', 'Câu hỏi Wh-: nghe chắc từ đầu tiên', 'Từ để hỏi ở đầu câu quyết định kiểu câu trả lời; nghe chắc từ đó là loại được ngay các đáp án lạc đề', '## Từ đầu tiên quyết định đáp án

Part 2 có 25 câu, mỗi câu một câu hỏi và ba câu trả lời, tất cả chỉ được đọc lên. Câu hỏi Wh- là nhóm gặp nhiều trong phần này, và cũng là nhóm dễ lấy điểm nhất nếu nghe được từ để hỏi.

Hãy giữ trong đầu hai thứ: từ để hỏi và ý chính đi sau nó, ví dụ "When ... report" hoặc "Who ... order supplies". Nếu bỏ lỡ từ đầu tiên, rất khó đoán lại từ ba câu trả lời.

## Mỗi từ để hỏi cần một kiểu trả lời

Khi nghe ba câu trả lời, hỏi lại chính mình: câu này có trả lời đúng loại thông tin mà từ để hỏi yêu cầu không.

- Who → người, chức danh, phòng ban: "Ms. Park from accounting", "The design team"
- When → mốc thời gian: "By Friday", "Not until next month", "Right after lunch"
- Where → địa điểm, hoặc người / nguồn có thứ đó: "In the top drawer", "Ask the receptionist"
- Why → lý do, có thể không có "because": "The client asked for changes"
- How → cách thức; How long / How often / How many / How much → thời lượng, tần suất, số lượng, giá
- What / Which → nghe tiếp danh từ đi sau: What time = When, Which room = Where, What kind = loại
- Câu trả lời bắt đầu bằng Yes hoặc No gần như luôn sai với câu hỏi Wh-

> **When is the new printer being delivered? (A) To the third floor. (B) Sometime tomorrow morning. (C) Yes, it prints in color.**  
> Khi nào máy in mới được giao? (A) Lên tầng ba. (B) Khoảng sáng mai. (C) Vâng, nó in màu.  
> _Vì sao:_ (A) trả lời Where, (C) bắt đầu bằng Yes và lặp từ "print" → (B)

> **Why was the meeting moved to Thursday? (A) The director is out of town until then. (B) Let''s move these boxes first. (C) At two o''clock.**  
> Vì sao cuộc họp dời sang thứ Năm? (A) Giám đốc đi công tác đến hôm đó. (B) Mình chuyển mấy thùng này trước đã. (C) Lúc hai giờ.  
> _Vì sao:_ Đáp án đúng nêu lý do mà không có "because"; (B) lặp âm "move", (C) trả lời When → (A)

## Bẫy âm giống và từ lặp lại

Câu trả lời lặp lại một từ trong câu hỏi, hoặc có từ nghe gần giống, thường là câu sai. Người ra đề dùng nó để giữ chân người chỉ nghe được vài từ quen.

Bẫy liên tưởng cũng hay gặp: câu hỏi nói về chuyến bay, câu trả lời nhắc "airport" hoặc "ticket" nhưng không trả lời điều được hỏi.

- Âm gần giống: contract / contact, lunch / launch, review / view, apartment / department, retire / tired, fare / fair
- Một từ hai nghĩa: charge (phí / phụ trách), book (sách / đặt chỗ), check (kiểm tra / tấm séc), present (món quà / trình bày)

> **Who''s in charge of the training session? (A) Ms. Okafor from human resources. (B) There''s a charge of twenty dollars. (C) In the main conference room.**  
> Ai phụ trách buổi đào tạo? (A) Chị Okafor bên nhân sự. (B) Có khoản phí hai mươi đô. (C) Ở phòng họp chính.  
> _Vì sao:_ (B) lặp "charge" với nghĩa khác, (C) trả lời Where → (A)

## Bẫy ở mức 800+

Ở đề khó, câu đúng thường không chứa thông tin được hỏi mà trả lời gián tiếp (bài sau nói kỹ). Ngoài ra, một số câu mở đầu bằng từ Wh- nhưng thực chất là lời gợi ý.

- "Why don''t we / you ...?" và "How about ...?" là gợi ý; câu trả lời đúng là đồng ý hoặc từ chối, không phải lý do
- "When''s" và "Where''s" nói nhanh rất dễ nhầm; nghe kỹ âm cuối và nhìn lại ý chính của câu
- Câu hỏi Where có thể được trả lời bằng một người: "Jason has the key" vẫn là câu trả lời hợp lý

> **Why don''t we order lunch for the team? (A) Because it was too expensive. (B) That''s a good idea. (C) He ordered it last week.**  
> Hay mình gọi đồ ăn trưa cho cả nhóm nhé? (A) Vì nó quá đắt. (B) Ý hay đấy. (C) Anh ấy đã đặt tuần trước.  
> _Vì sao:_ Đây là lời gợi ý, không hỏi lý do; (A) bị bẫy bởi chữ Why, (C) lặp "order" → (B)

> **Where can I find the latest budget report? (A) Daniel was the last one using it. (B) About ten pages long. (C) Yes, I found it useful.**  
> Tôi có thể tìm bản báo cáo ngân sách mới nhất ở đâu? (A) Daniel là người dùng nó gần nhất. (B) Khoảng mười trang. (C) Vâng, tôi thấy nó hữu ích.  
> _Vì sao:_ Không nêu địa điểm nhưng chỉ ra người đang giữ báo cáo → (A)
', ARRAY['Giữ trong đầu từ để hỏi và ý chính đi sau nó', 'Câu trả lời bắt đầu bằng Yes / No gần như luôn sai với câu hỏi Wh-', 'Câu lặp từ hoặc có âm giống câu hỏi thường là bẫy', 'Why don''t we / How about là lời gợi ý, không hỏi lý do hay cách thức']::text[], ARRAY['P2']::text[], 18, 'P2', 'listening.wh-question', 1, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'listening'), 'p2-yes-no', 'Câu hỏi Yes/No, câu hỏi đuôi và câu hỏi lựa chọn', 'Nhận ra loại câu hỏi không có từ Wh-, biết câu trả lời tự nhiên trông thế nào và vì sao Yes / No thường không phải mấu chốt', '## Câu hỏi Yes/No: nghe động từ và ý chính

Câu hỏi bắt đầu bằng Do, Is, Have, Can, Will, Did... Câu trả lời có thể bắt đầu bằng Yes / No, nhưng cũng có thể bỏ hẳn Yes / No và đi thẳng vào thông tin.

Khi có Yes / No, kiểm tra phần sau có khớp không: Yes đi với thông tin khẳng định, No đi với thông tin phủ định. Câu "Yes, I haven''t started" tự mâu thuẫn nên sai.

> **Have you finished the sales report? (A) No, I''m still waiting for the figures. (B) Yes, I haven''t started it. (C) A report on sales trends.**  
> Bạn làm xong báo cáo doanh số chưa? (A) Chưa, tôi vẫn đang chờ số liệu. (B) Rồi, tôi chưa bắt đầu. (C) Một báo cáo về xu hướng doanh số.  
> _Vì sao:_ (B) mâu thuẫn giữa Yes và nội dung, (C) lặp từ "report", "sales" → (A)

## Câu hỏi phủ định và câu hỏi đuôi

Cách đơn giản nhất: bỏ phần phủ định hoặc phần đuôi đi, coi như câu hỏi thường. "Isn''t the office closed on Monday?" và "The office is closed on Monday, isn''t it?" đều hỏi cùng một việc: văn phòng có đóng cửa thứ Hai không.

Trả lời theo sự thật: đóng cửa thì "Yes, it is", không đóng thì "No, it''s open". Đừng cố dịch "Yes" thành "không phải" như cách trả lời câu phủ định trong tiếng Việt.

> **Isn''t Ms. Lopez joining us for dinner? (A) No, she has a client meeting tonight. (B) The dinner menu looks good. (C) At the Italian place on Fifth Street.**  
> Chị Lopez không đi ăn tối với mình à? (A) Không, tối nay chị ấy gặp khách hàng. (B) Thực đơn bữa tối trông ngon đấy. (C) Ở quán Ý trên phố Fifth.  
> _Vì sao:_ Coi như "Is Ms. Lopez joining us?"; (B) lặp "dinner", (C) trả lời Where → (A)

> **You''ve met the new regional manager, haven''t you? (A) Yes, at the conference in March. (B) The meeting room is ready. (C) He manages it well.**  
> Bạn đã gặp quản lý khu vực mới rồi phải không? (A) Rồi, ở hội nghị hồi tháng Ba. (B) Phòng họp đã sẵn sàng. (C) Anh ấy quản lý tốt.  
> _Vì sao:_ (B) âm gần giống met / meeting, (C) lặp gốc từ manage → (A)

## Câu hỏi lựa chọn A or B

Câu hỏi có "or" gần như không bao giờ được trả lời bằng Yes / No. Câu trả lời đúng có thể chọn một bên, chọn cả hai, không chọn bên nào, hoặc đưa ra lựa chọn thứ ba.

- Chọn một: "The train would be faster" (không nhất thiết lặp nguyên từ train)
- Cả hai hoặc không bên nào: "Either is fine", "Both, if possible", "Neither, actually"
- Lựa chọn khác hoặc né: "Could we do it next week instead?", "It doesn''t matter to me"

> **Should we take the train or drive to the trade show? (A) Yes, that''s right. (B) Parking there is hard to find. (C) A three-day show.**  
> Mình đi tàu hay lái xe đến hội chợ? (A) Vâng, đúng vậy. (B) Ở đó khó tìm chỗ đỗ xe lắm. (C) Hội chợ kéo dài ba ngày.  
> _Vì sao:_ (B) không nói "train" nhưng ngụ ý nên đi tàu; (A) trả lời Yes cho câu lựa chọn → (B)

## Lời nhờ, lời mời và câu trần thuật

Can / Could you ...?, Would you mind ...?, Would you like ...?, Let''s ... là lời nhờ, mời hoặc rủ. Câu trả lời tự nhiên là đồng ý (Sure, Of course, I''d be glad to) hoặc từ chối kèm lý do (Sorry, I''m on my way out).

Part 2 còn có câu trần thuật, không phải câu hỏi: "The printer is out of paper again." Câu trả lời đúng là phản hồi hợp lý, thường là đề nghị giúp hoặc nêu cách xử lý.

- "Would you mind ...?" hỏi "bạn có phiền không", nên "Not at all" hoặc "No problem" nghĩa là đồng ý
- Câu trần thuật: "I''ll get some from the supply room" là phản hồi tự nhiên cho câu báo máy in hết giấy

> **Would you mind reviewing my slides before the meeting? (A) Not at all, send them over. (B) It has a nice view. (C) Yes, the meeting went well.**  
> Bạn có phiền xem giúp tôi slide trước buổi họp không? (A) Không sao, gửi qua đi. (B) Ở đó cảnh đẹp. (C) Vâng, cuộc họp diễn ra tốt.  
> _Vì sao:_ "Not at all" là đồng ý; (B) âm giống review / view, (C) lặp "meeting" và sai thì → (A)

## Bẫy ở mức 800+

Ở đề khó, Yes / No không còn là manh mối: câu đúng thường bỏ Yes / No, còn câu có Yes / No lại sai ở phần thông tin phía sau.

- Yes / No đúng hướng nhưng nội dung sau lạc đề hoặc sai thì
- Câu trả lời đúng ngữ pháp nhưng lệch chủ ngữ: hỏi về "you", trả lời về "he" không rõ là ai
- Câu hỏi lựa chọn có đáp án lặp lại cả hai lựa chọn nhưng nói về việc khác
', ARRAY['Câu hỏi phủ định và câu hỏi đuôi: bỏ phần phủ định, trả lời theo sự thật', 'Câu hỏi lựa chọn hầu như không trả lời bằng Yes / No', 'Would you mind ...? → Not at all nghĩa là đồng ý', 'Có Yes / No thì kiểm tra phần sau có khớp và đúng thì không']::text[], ARRAY['P2']::text[], 18, 'P2', 'listening.yes-no', 2, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'listening'), 'p2-indirect', 'Câu trả lời gián tiếp trong Part 2', 'Nhận ra câu trả lời không chứa thông tin được hỏi nhưng vẫn hợp lý, dạng quyết định điểm Part 2 ở mức 800+', '## Vì sao đáp án gián tiếp hay đúng

Trong hội thoại thật, người ta ít khi trả lời đúng khuôn câu hỏi: họ nói chưa biết, chỉ sang người khác, hỏi lại hoặc đưa thông tin làm câu hỏi không còn cần thiết. Part 2 ở mức khó dùng chính kiểu trả lời này.

Ở những câu đó, hai đáp án còn lại thường "nghe đúng dạng" (có mốc thời gian cho câu When, có địa điểm cho câu Where) nhưng lặp từ hoặc lạc ý. Người học 650 hay chọn chúng; người học 800+ biết loại chúng và chọn câu gián tiếp.

## Các kiểu trả lời gián tiếp hay gặp

Học thuộc các mẫu dưới đây để nhận ra chúng ngay khi nghe, kể cả khi không nghe rõ hết câu hỏi.

- Chưa biết hoặc chỉ sang người khác: "I''m not sure", "You''d better ask Tom", "Check with the front desk"
- Sẽ kiểm tra: "Let me check my schedule", "I''ll have to look it up"
- Hỏi lại để làm rõ: "Which one do you mean?", "Do you need it today?"
- Thông tin mới làm câu hỏi không còn ý nghĩa: "It''s been postponed", "That position has already been filled"
- Nêu tình huống để người hỏi tự hiểu: hỏi khi nào hàng đến, trả lời "The supplier hasn''t called back yet"

> **What time does the workshop start on Friday? (A) It''s been moved to next week. (B) A five-hour workshop. (C) Yes, it started well.**  
> Buổi hội thảo thứ Sáu bắt đầu lúc mấy giờ? (A) Nó đã dời sang tuần sau. (B) Một buổi hội thảo năm tiếng. (C) Vâng, nó bắt đầu suôn sẻ.  
> _Vì sao:_ Không có giờ nào được nêu, nhưng thông tin dời lịch trả lời hợp lý; (B) lặp "workshop", (C) có Yes → (A)

> **Who''s going to lead the client presentation? (A) Hasn''t that been decided yet? (B) The present was wrapped nicely. (C) To the clients in Osaka.**  
> Ai sẽ dẫn buổi thuyết trình cho khách hàng? (A) Việc đó vẫn chưa được quyết à? (B) Món quà được gói đẹp. (C) Đến khách hàng ở Osaka.  
> _Vì sao:_ Trả lời bằng một câu hỏi lại; (B) âm giống presentation / present, (C) lặp "clients" → (A)

> **Can you send me the updated price list? (A) For retail or wholesale customers? (B) The prices went up. (C) I sent it by express mail.**  
> Bạn gửi tôi bảng giá mới được không? (A) Cho khách lẻ hay khách sỉ? (B) Giá đã tăng. (C) Tôi đã gửi chuyển phát nhanh.  
> _Vì sao:_ Hỏi lại để làm rõ trước khi gửi → (A); (C) sai thì và lặp "send"

## Cách xử lý khi nghe

Vì đáp án gián tiếp khó nhận ra ngay, hãy làm theo cách loại trừ: nghe từng câu, đánh dấu trong đầu "sai rõ", "có thể", rồi chọn câu còn lại.

- Loại ngay câu lặp từ, âm giống, sai từ để hỏi, có Yes / No với câu Wh-
- Câu còn lại dù không trả lời thẳng, nếu nối được với câu hỏi một cách tự nhiên thì chọn
- Luôn nghe hết cả ba câu; đừng chọn câu đầu tiên chỉ vì nó đúng dạng

## Bẫy ở mức 800+

Không phải câu gián tiếp nào cũng đúng. Đề khó có thể đưa một câu kiểu "I''ll check" nhưng không nối được với tình huống. Câu gián tiếp đúng vẫn phải hợp lý về thời gian và người nói.

> **Did you enjoy the concert last night? (A) I''ll have to check the calendar. (B) I ended up staying late at the office. (C) In the main concert hall.**  
> Tối qua bạn có thích buổi hòa nhạc không? (A) Tôi phải xem lịch đã. (B) Rốt cuộc tôi phải ở lại văn phòng muộn. (C) Ở phòng hòa nhạc chính.  
> _Vì sao:_ Buổi hòa nhạc đã diễn ra nên "xem lịch" vô nghĩa; (B) ngụ ý không đi được → (B)
', ARRAY['Câu trả lời không nêu thông tin được hỏi vẫn có thể đúng', 'Thuộc các mẫu: chưa biết, sẽ kiểm tra, hỏi lại, đã dời / đã hủy', 'Loại trừ câu lặp từ và sai từ để hỏi trước, rồi chọn câu còn lại', 'Câu gián tiếp đúng vẫn phải khớp với thời gian và tình huống']::text[], ARRAY['P2']::text[], 15, 'P2', 'listening.indirect', 3, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'listening'), 'p3-preview', 'Part 3: đọc trước câu hỏi và nghe theo thứ tự', 'Đọc ba câu hỏi trước khi nghe, đoán bối cảnh, rồi bắt thông tin theo đúng thứ tự và nhận ra cách diễn đạt lại', '## Đọc trước ba câu hỏi

Part 3 có 13 đoạn hội thoại, mỗi đoạn ba câu hỏi in sẵn. Nghe mà không biết cần tìm gì thì rất khó nhớ đủ chi tiết; đọc trước câu hỏi biến việc nghe thành việc tìm thông tin cụ thể.

Cách làm: chọn đáp án ngay trong lúc nghe, không đợi câu hỏi được đọc lên. Thời gian còn lại dùng để đọc ba câu hỏi của đoạn tiếp theo. Nếu một câu chưa chắc, đoán nhanh và đi tiếp, đừng để mất phần đọc trước của đoạn sau.

- Gạch chân từ để hỏi: what problem, where, why, what will ... do next
- Gạch chân người được hỏi: the man, the woman, the men, hay một tên riêng
- Đọc lướt bốn đáp án nếu kịp: chúng cho biết nội dung có thể xuất hiện

## Đoán bối cảnh trước khi nghe

Ba câu hỏi thường đủ để đoán nơi chốn và quan hệ giữa hai người nói. Đoán đúng bối cảnh giúp nghe hiểu nhanh hơn vì đã biết trước những từ có thể gặp.

> **Where most likely are the speakers? / What problem does the woman mention? / What will the man probably do next?**  
> Người nói có lẽ đang ở đâu? / Người phụ nữ nhắc đến vấn đề gì? / Người đàn ông có lẽ sẽ làm gì tiếp theo?  
> _Vì sao:_ Câu 1 nằm ở đầu hội thoại, câu 2 do người phụ nữ nói ở giữa, câu 3 thường nằm ở lượt cuối của người đàn ông

> **Options: (A) At a hotel (B) At a car rental agency (C) At a bank (D) At an airport**  
> Lựa chọn: (A) Khách sạn (B) Công ty cho thuê xe (C) Ngân hàng (D) Sân bay  
> _Vì sao:_ Đáp án chỉ ra hội thoại có thể liên quan đến đi lại; nghe các từ như reservation, pick up, return, counter

## Thông tin xuất hiện theo thứ tự và được diễn đạt lại

Câu trả lời cho ba câu hỏi gần như luôn xuất hiện theo thứ tự câu hỏi. Câu chủ đề / nơi chốn / mục đích nằm ở một hai lượt đầu, câu chi tiết ở giữa, câu việc sắp làm hoặc lời đề nghị ở cuối.

Đáp án đúng hiếm khi lặp nguyên từ trong bài nghe. Nó diễn đạt lại bằng từ chung hơn hoặc từ đồng nghĩa.

> **Script: "The copier on our floor keeps jamming." → Option: A machine is not working properly.**  
> Bài nghe: "Máy photo ở tầng mình cứ bị kẹt giấy." → Đáp án: Một chiếc máy hoạt động không bình thường.  
> _Vì sao:_ copier → machine, keeps jamming → not working properly

> **Script: "We''re short two people on the weekend shift." → Option: There are not enough staff.**  
> Bài nghe: "Ca cuối tuần mình thiếu hai người." → Đáp án: Không đủ nhân viên.  
> _Vì sao:_ short two people → not enough staff

> **Script: "I''ll give the supplier a call this afternoon." → Option: Contact a vendor.**  
> Bài nghe: "Chiều nay tôi sẽ gọi cho nhà cung cấp." → Đáp án: Liên hệ nhà cung cấp.  
> _Vì sao:_ give ... a call → contact, supplier → vendor

## Hội thoại ba người

Một số đoạn có ba người nói, thường là hai người cùng giới và một người khác giới. Câu dẫn sẽ báo trước "conversation with three speakers".

Với dạng này, câu hỏi hay dùng tên riêng hoặc "the men", "the women". Chú ý những lúc người nói gọi tên nhau ("Thanks, Priya") để biết ai nói câu nào.

## Bẫy ở mức 800+

Đề khó đặt bẫy bằng chính những từ bạn nghe được rõ nhất.

- Đáp án lặp nguyên từ trong bài nhưng gắn với ý khác hoặc người khác
- Nhầm người nói: câu hỏi về người phụ nữ, đáp án là điều người đàn ông nói
- Câu hỏi việc sắp làm: chọn việc đã làm xong hoặc việc người kia đề nghị nhưng bị từ chối
- Thông tin bị sửa giữa chừng: "Actually, let''s make it Thursday instead" thì đáp án là thứ Năm, không phải ngày nói trước đó
', ARRAY['Đọc trước ba câu hỏi, gạch chân từ để hỏi và người được hỏi', 'Chọn đáp án trong lúc nghe rồi chuyển ngay sang đọc đoạn sau', 'Đáp án theo thứ tự câu hỏi và thường được diễn đạt lại', 'Nghe kỹ các từ sửa thông tin như actually, instead, unfortunately']::text[], ARRAY['P3']::text[], 20, 'P3', 'comprehension.detail', 4, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'listening'), 'p34-speaker-intent', 'Câu hỏi ý định người nói', 'Hiểu vì sao người nói dùng một câu trong ngữ cảnh đó, thay vì chọn nghĩa đen của câu', '## Dạng câu hỏi này trông thế nào

Câu hỏi trích nguyên một câu trong bài nghe và hỏi ý định: "What does the man mean when he says, ...?", "Why does the woman say, ...?" hoặc "What does the speaker imply when she says, ...?". Dạng này có ở cả Part 3 và Part 4.

Câu trích được in sẵn, nên nó là mốc để nghe: khi sắp tới câu đó, tập trung vào một hai câu ngay trước và ngay sau nó. Nghĩa của câu trích nằm ở đó, không nằm trong chính câu trích.

## Ngữ cảnh quyết định nghĩa

Cùng một câu có thể mang những ý định khác nhau. Đáp án đúng mô tả chức năng của câu trong tình huống: từ chối, phàn nàn, đề nghị, trấn an, ngạc nhiên, nhắc nhở.

> **W: Could you look over this contract with me? M: I''ve got a client call at two. → (A) He is unable to help right now. (B) He wants to change a meeting time.**  
> Nữ: Anh xem hợp đồng này với tôi được không? Nam: Hai giờ tôi có cuộc gọi với khách. → (A) Anh ấy chưa thể giúp lúc này. (B) Anh ấy muốn đổi giờ họp.  
> _Vì sao:_ Câu nói nêu một sự thật nhưng chức năng là từ chối khéo → (A)

> **M: The shipment arrived damaged again. W: That''s the third time this month. → (A) She is reporting a schedule. (B) She thinks the problem is serious.**  
> Nam: Lô hàng lại bị hỏng khi tới. Nữ: Đây là lần thứ ba trong tháng rồi. → (A) Cô ấy báo lịch. (B) Cô ấy cho rằng vấn đề nghiêm trọng.  
> _Vì sao:_ Câu đếm số lần dùng để phàn nàn, nhấn mạnh vấn đề lặp lại → (B)

> **W: Should I print the handouts for tomorrow''s session? M: The projector''s working again. → (A) He repaired the projector. (B) Printed copies may not be needed.**  
> Nữ: Tôi có nên in tài liệu cho buổi ngày mai không? Nam: Máy chiếu chạy lại rồi. → (A) Anh ấy đã sửa máy chiếu. (B) Có lẽ không cần bản in.  
> _Vì sao:_ Máy chiếu chạy được thì có thể chiếu tài liệu, nên ngụ ý không cần in; câu không nói ai sửa → (B)

## Cách làm từng bước

Dạng này mất thời gian nếu chỉ nghe rồi mới nghĩ. Chuẩn bị trước giúp quyết định nhanh ngay khi câu trích vừa qua.

- Đọc câu trích và bốn đáp án khi đọc trước câu hỏi
- Đoán các chức năng có thể có của câu trích: đồng ý, từ chối, lo ngại, gợi ý
- Nghe câu ngay trước câu trích để biết nó đang đáp lại điều gì
- Chọn đáp án mô tả chức năng, loại đáp án chỉ diễn lại nghĩa đen

## Bẫy ở mức 800+

Người ra đề thường đặt một đáp án lặp lại từ trong câu trích, hoặc mô tả đúng nghĩa đen. Những đáp án đó đọc thấy quen nên dễ chọn, nhưng hiếm khi là ý định thật.

- Đáp án nghĩa đen: câu "I''ve got a meeting at two" → đáp án "He has a meeting scheduled" đúng sự thật nhưng không phải ý định
- Đáp án đúng với bài nghe nhưng không phải điều câu trích muốn nói
- Đáp án suy diễn quá xa: thêm thông tin không có trong hội thoại
', ARRAY['Ý định nằm ở câu trước và sau câu trích, không nằm trong câu trích', 'Chọn chức năng của câu: từ chối, phàn nàn, gợi ý, trấn an', 'Cẩn thận với đáp án lặp từ hoặc chỉ diễn lại nghĩa đen']::text[], ARRAY['P3', 'P4']::text[], 15, 'P3', 'comprehension.speaker-intent', 5, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'listening'), 'p4-talks', 'Part 4: nhận dạng loại bài nói', 'Biết loại bài nói từ câu dẫn để đoán mục đích, chi tiết và việc tiếp theo nằm ở đâu trong bài', '## Câu dẫn cho biết loại bài

Part 4 có 10 bài nói của một người, mỗi bài ba câu hỏi. Không có lượt đối đáp nên thông tin dày hơn Part 3, nhưng mỗi loại bài có cấu trúc khá cố định.

Câu dẫn "Questions ... refer to the following ..." nói rõ loại bài: telephone message, announcement, advertisement, broadcast, tour, talk, introduction hoặc excerpt from a meeting. Đọc nó cùng ba câu hỏi là đã đoán được nội dung chính sẽ nằm ở đâu.

## Các loại bài hay gặp và cấu trúc

Mỗi loại bài sắp xếp mục đích, chi tiết và yêu cầu theo một trật tự quen thuộc.

- Thông báo (announcement): đầu bài là ai đang nghe và ở đâu (Attention, shoppers), giữa là thay đổi hoặc lý do, cuối là hướng dẫn người nghe làm gì
- Tin nhắn thoại (telephone message): đầu bài là người gọi và mục đích (I''m calling about ...), giữa là vấn đề, cuối là yêu cầu gọi lại hoặc việc cần làm
- Quảng cáo (advertisement): đầu bài nêu nhu cầu, giữa là điểm mạnh của sản phẩm, cuối là ưu đãi, hạn chót và cách nhận ưu đãi
- Bản tin (broadcast): đầu bài là chủ đề, giữa là chi tiết và ý kiến, cuối là nội dung sắp phát tiếp
- Tham quan (tour): lời chào, lịch trình, quy định (không chụp ảnh, giữ nhóm), điểm đến tiếp theo
- Giới thiệu (introduction): người được giới thiệu là ai, thành tích, lý do có mặt, rồi mời lên nói
- Trích đoạn họp (excerpt from a meeting): vấn đề, số liệu, đề xuất và việc giao cho người nghe

## Ba câu hỏi theo vị trí trong bài

Câu hỏi mục đích, người nói là ai, người nghe là ai thường được trả lời trong hai câu đầu. Câu chi tiết nằm ở giữa. Câu hỏi người nghe được yêu cầu làm gì hoặc việc gì sắp diễn ra nằm ở cuối bài.

> **Hi, this is Marco from Brightway Rentals. I''m calling about the van you reserved for Saturday. → Purpose: To discuss a vehicle reservation.**  
> Chào anh, tôi là Marco bên Brightway Rentals. Tôi gọi về chiếc xe tải nhỏ anh đặt cho thứ Bảy. → Mục đích: Trao đổi về việc đặt xe.  
> _Vì sao:_ Mục đích nằm ngay câu thứ hai; van → vehicle, reserved → reservation

> **Before we go in, please note that photography isn''t permitted inside the gallery. → What are listeners asked not to do? Take pictures.**  
> Trước khi vào, xin lưu ý không được chụp ảnh trong phòng trưng bày. → Người nghe được yêu cầu không làm gì? Chụp ảnh.  
> _Vì sao:_ Quy định trong bài tham quan; photography → take pictures

> **If you''d like to join, just leave your name with Ms. Ortiz at the front desk by Thursday. → What should interested listeners do? Register with a staff member.**  
> Ai muốn tham gia thì để lại tên cho chị Ortiz ở quầy lễ tân trước thứ Năm. → Người quan tâm nên làm gì? Đăng ký với một nhân viên.  
> _Vì sao:_ Yêu cầu ở cuối bài; leave your name → register, Ms. Ortiz → a staff member

## Bẫy ở mức 800+

Part 4 khó vì một người nói liên tục và có nhiều chi tiết giống nhau: nhiều con số, nhiều ngày, nhiều tên. Đề dùng chính những chi tiết đó làm đáp án sai.

- Nhầm người nói với người nghe: "Who is the speaker?" khác "Who are the listeners?"
- Nhiều con số hoặc ngày trong bài: chọn con số gắn với đúng điều được hỏi, không phải con số nghe rõ nhất
- Từ đánh dấu thay đổi (however, unfortunately, actually, instead) thường đi ngay trước đáp án
- Câu hỏi có bảng hoặc sơ đồ (Look at the graphic): bài nghe nói một cột, đáp án nằm ở cột còn lại, nên đọc bảng trước khi nghe
', ARRAY['Đọc câu dẫn để biết loại bài trước khi nghe', 'Mục đích ở đầu, chi tiết ở giữa, yêu cầu và việc tiếp theo ở cuối', 'Nghe kỹ sau however, unfortunately, actually', 'Nhiều con số trong bài: gắn mỗi con số với điều nó mô tả']::text[], ARRAY['P4']::text[], 20, 'P4', 'comprehension.main-idea', 6, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'reading'), 'p6-insertion', 'Chèn câu và đọc theo ngữ cảnh ở Part 6', 'Dùng từ nối, đại từ và "this / these" để biết câu nào khớp với câu trước và câu sau chỗ trống', '## Part 6 khác Part 5 ở đâu

Part 6 có 4 đoạn văn, mỗi đoạn 4 câu hỏi. Ba câu là điền từ như Part 5, nhưng đáp án phụ thuộc vào cả đoạn chứ không chỉ một câu. Câu còn lại của mỗi đoạn là chèn cả một câu vào chỗ trống.

Ở câu chèn câu, cả bốn đáp án đều đúng ngữ pháp. Câu đúng là câu nối được với câu ngay trước và câu ngay sau chỗ trống. Vì vậy phải đọc ít nhất hai câu này, không chọn chỉ vì đáp án có từ khóa giống đoạn văn.

## Tín hiệu nối câu

Câu đúng thường có một từ "chỉ ngược" về câu trước, hoặc câu sau có một từ chỉ ngược về câu cần chèn. Tìm những từ này trước khi hiểu hết nghĩa.

- Đại từ: it, they, them, this, these, such, one → phải có danh từ phù hợp ngay trước đó (số ít / số nhiều, người / vật)
- "the + danh từ" (the change, the event) → danh từ đó đã được nhắc ở câu trước
- Từ nối bổ sung: In addition, Also, Furthermore → câu trước cùng ý, cùng hướng
- Từ nối đối lập: However, Nevertheless, Instead → câu trước có ý ngược lại
- Từ nối kết quả: As a result, Therefore, Consequently → câu trước là nguyên nhân

> **Starting next month, all visitors must sign in at the security desk. --------. Visitors are asked to wear it at all times while in the building. (A) The lobby was renovated last spring. (B) After signing in, each visitor will receive a temporary badge. (C) However, the parking garage will remain open. (D) Our staff have praised the new cafeteria.**  
> Từ tháng sau, mọi khách phải đăng ký ở bàn bảo vệ. Sau khi đăng ký, mỗi khách sẽ nhận một thẻ tạm. Khách cần đeo thẻ suốt thời gian ở trong tòa nhà.  
> _Vì sao:_ "it" ở câu sau cần một danh từ số ít có thể đeo được: a temporary badge → (B). (C) có However nhưng không có ý đối lập nào với câu trước

## Thì và từ nối phụ thuộc cả đoạn

Ba câu điền từ còn lại của Part 6 cũng cần ngữ cảnh. Thì của động từ phụ thuộc vào ngày viết thư so với sự việc. Từ nối phụ thuộc vào quan hệ với câu trước, nên không thể chọn khi chỉ đọc câu có chỗ trống.

> **(E-mail dated May 3) The training session, which -------- on May 10, will cover the new billing system. (A) took place (B) will take place (C) has taken place (D) was taking place**  
> Buổi đào tạo diễn ra vào ngày 10 tháng 5 sẽ giới thiệu hệ thống tính phí mới.  
> _Vì sao:_ Email viết ngày 3/5, buổi đào tạo ngày 10/5 là tương lai, khớp với "will cover" → (B)

> **The renovation of the north wing was completed last week. --------, the staff lounge will reopen on Monday. (A) As a result (B) However (C) Instead (D) Otherwise**  
> Việc sửa chữa cánh phía bắc đã xong vào tuần trước. Vì vậy, phòng nghỉ nhân viên sẽ mở lại vào thứ Hai.  
> _Vì sao:_ Sửa xong là nguyên nhân, mở lại là kết quả → (A)

## Quy trình làm câu chèn câu

Nếu đọc đến chỗ trống mà chưa chắc, hãy đọc tiếp đến hết đoạn rồi quay lại. Đôi khi câu sau mới cho manh mối rõ nhất.

- Đọc câu ngay trước và ngay sau chỗ trống
- Gạch các từ chỉ ngược trong từng đáp án (this, they, the + danh từ, từ nối)
- Loại đáp án mở ra chủ đề mới không được nhắc lại, lặp ý đã nói, hoặc mâu thuẫn với đoạn văn
- Cẩn thận với đáp án lặp lại từ khóa của đoạn văn nhưng không nối được về logic
', ARRAY['Đọc câu trước và câu sau chỗ trống, không chỉ câu có chỗ trống', 'Đại từ và "the + danh từ" phải chỉ được về một thứ đã nhắc', 'Từ nối phải đúng quan hệ: bổ sung, đối lập hay kết quả', 'Thì của động từ xét theo ngày viết của văn bản']::text[], ARRAY['P6']::text[], 20, 'P6', 'comprehension.sentence-insertion', 0, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'reading'), 'p7-not-true', 'Câu hỏi NOT ở Part 7', 'Loại trừ ba đáp án có trong bài để tìm đáp án không được nhắc hoặc sai với bài', '## Nhận ra câu hỏi NOT

Câu hỏi có chữ NOT viết hoa: "What is NOT mentioned about...", "What is NOT indicated...", "What is NOT true about...". Ba đáp án có trong bài, một đáp án không có hoặc trái với bài.

Dạng này tốn thời gian vì phải kiểm tra ba đáp án thay vì tìm một. Nếu bộ câu hỏi có câu NOT, hãy làm nó sau các câu khác trong cùng bộ: lúc đó bạn đã đọc nhiều hơn và nhớ thông tin nằm ở đâu.

## Cách loại trừ

Đọc từng đáp án, tìm câu trong bài nói cùng ý, rồi đánh dấu đáp án đó là đã có. Đáp án cuối cùng không tìm được bằng chứng là câu trả lời.

- Thông tin của ba đáp án đúng thường nằm rải ở nhiều chỗ, có khi ở cả tiêu đề, bảng hay chú thích cuối bài
- Đáp án gần như luôn diễn đạt lại (paraphrase): daily = every day, additional fee = extra cost, complimentary = free
- Với "NOT mentioned", đáp án là thứ bài không nói tới. Với "NOT true", đáp án có thể là thứ bài nói ngược lại

> **Greenfield Fitness Center is open daily from 6 A.M. to 10 P.M. Members enjoy free access to our indoor pool and group classes. Personal training is available for an additional fee. New members who join before June 30 will receive a free water bottle. — What is NOT mentioned about Greenfield Fitness Center? (A) It is open every day. (B) It charges extra for some services. (C) It has recently moved to a new location. (D) It gives a gift to some new members.**  
> Trung tâm thể hình Greenfield mở cửa hằng ngày từ 6 giờ sáng đến 10 giờ tối. Hội viên dùng miễn phí hồ bơi và các lớp tập nhóm. Huấn luyện cá nhân tính thêm phí. Hội viên mới đăng ký trước 30/6 được tặng bình nước.  
> _Vì sao:_ (A) = daily, (B) = additional fee, (D) = free water bottle. Bài không nói gì về việc chuyển địa điểm → (C)

## Bẫy ở mức 800+

Đề khó thường để một đáp án dùng đúng từ trong bài nhưng đổi một chi tiết nhỏ: đổi người, đổi số, đổi "một số" thành "tất cả".

> **(Same text) What is NOT true about Greenfield Fitness Center? (A) Members can use the pool at no charge. (B) Personal training is included in the membership fee. (C) It closes at 10 P.M. (D) It offers group classes.**  
> Điều nào KHÔNG đúng về trung tâm thể hình Greenfield?  
> _Vì sao:_ Bài nói huấn luyện cá nhân tính thêm phí, (B) nói đã bao gồm trong phí hội viên → sai với bài → (B). Từ "personal training" xuất hiện trong bài nên dễ bị đánh dấu là "có nhắc"
', ARRAY['Làm câu NOT sau các câu khác cùng bộ', 'Tìm bằng chứng cho từng đáp án, đáp án không có bằng chứng là câu trả lời', 'Đáp án dùng đúng từ trong bài vẫn có thể bị đổi chi tiết']::text[], ARRAY['P7']::text[], 15, 'P7', 'comprehension.not-true', 1, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'reading'), 'p7-inference', 'Suy luận và ý định người viết ở Part 7', 'Trả lời câu "most likely", "suggested", "implied" bằng bằng chứng trong bài, và hiểu ý một câu trong đoạn chat', '## Suy luận nhưng vẫn phải có bằng chứng

Câu suy luận có các từ most likely, probably, suggested, implied, inferred. Đáp án không được viết thẳng trong bài, nhưng phải được một hoặc hai câu trong bài ủng hộ.

Không dùng hiểu biết bên ngoài hay suy đoán xa. Nếu không chỉ ra được câu nào trong bài dẫn tới đáp án, đó chưa phải là đáp án.

- Who most likely is...? → nhìn nghề nghiệp qua việc người đó làm, chức danh, tên công ty
- Where would the notice most likely be found? → nhìn người đọc mà thông báo hướng tới
- What is suggested about...? → thường cần ghép hai chi tiết trong bài

## Từ chi tiết đến kết luận

Đọc câu hỏi, tìm đoạn nói về đối tượng được hỏi, rồi hỏi: chi tiết này cho thấy điều gì chắc chắn đúng.

> **I have attached the revised floor plan. As you requested during our visit to the site last Tuesday, the reception desk has been moved closer to the main entrance. — Who most likely is the writer? (A) A real estate agent (B) An interior designer (C) A receptionist (D) A security guard**  
> Tôi gửi kèm bản vẽ mặt bằng đã sửa. Như anh chị yêu cầu khi chúng ta đến xem công trình thứ Ba tuần trước, quầy lễ tân đã được dời gần cửa chính hơn.  
> _Vì sao:_ Người viết sửa bản vẽ mặt bằng theo yêu cầu khách → (B). (C) là bẫy vì có từ "reception"

> **(Same text) What is suggested about the recipient? (A) He has visited the site. (B) He works at the reception desk. (C) He drew the original plan. (D) He will move to a new office.**  
> Điều gì được gợi ý về người nhận?  
> _Vì sao:_ "our visit to the site" → người nhận đã đến công trình → (A). (C) không có bằng chứng

## Ý định người viết trong đoạn chat

Câu dạng "At 9:16 A.M., what does Mr. Haddad mean when he writes, ''...''?" hỏi ý của một câu ngắn trong ngữ cảnh. Câu được trích thường có nghĩa đen khác nghĩa thật, nên phải đọc tin nhắn ngay trước và ngay sau.

> **Lena Ruiz (9:15 A.M.): The printer on our floor is jammed again. Could we use yours for the client handouts? / Omar Haddad (9:16 A.M.): Mine''s out of toner, unfortunately. / Lena Ruiz (9:17 A.M.): OK, I''ll ask Jae-won then. — At 9:16 A.M., what does Mr. Haddad mean? (A) He cannot help with the printing. (B) He will order more toner. (C) He wants to see the handouts. (D) He will fix the printer.**  
> Lena: Máy in tầng mình lại kẹt giấy. Mình dùng máy của anh để in tài liệu cho khách được không? Omar: Tiếc là máy tôi hết mực. Lena: Vậy tôi hỏi Jae-won.  
> _Vì sao:_ Hết mực nghĩa là không in giúp được, và Lena chuyển sang hỏi người khác → (A). (B) có thể xảy ra nhưng bài không nói

## Bẫy thường gặp

Đáp án sai ở câu suy luận thường "nghe hợp lý" nhưng vượt quá những gì bài nói.

- Đáp án dùng từ tuyệt đối (all, always, never, only) trong khi bài chỉ nói về một trường hợp
- Đáp án lặp từ khóa trong bài nhưng nói về người hoặc vật khác
- Đáp án đúng với bài nhưng không trả lời đúng câu hỏi
', ARRAY['Mỗi đáp án suy luận phải chỉ ra được câu làm bằng chứng', 'Không dùng hiểu biết ngoài bài', 'Câu trích trong đoạn chat: đọc tin nhắn ngay trước và ngay sau', 'Cẩn thận với từ tuyệt đối và đáp án đi quá xa']::text[], ARRAY['P7']::text[], 20, 'P7', 'comprehension.inference', 2, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'reading'), 'p7-vocab-in-context', 'Từ đồng nghĩa trong ngữ cảnh ở Part 7', 'Chọn nghĩa của một từ nhiều nghĩa theo đúng câu chứa nó, không theo nghĩa quen thuộc nhất', '## Dạng câu hỏi

Câu hỏi có dạng: "In the e-mail, the word ''X'' in paragraph 2, line 3, is closest in meaning to". Từ được hỏi thường là từ quen nhưng nhiều nghĩa: cover, address, run, carry, figure, term, meet, assume, feature, reflect.

Bốn đáp án thường đều là nghĩa có thật của từ đó trong những ngữ cảnh khác. Vì vậy câu hỏi không kiểm tra bạn có biết từ không, mà kiểm tra bạn có đọc câu chứa từ không.

## Cách làm trong 30 giây

Dạng này nhanh nếu làm đúng cách. Đừng chọn ngay nghĩa bạn quen nhất.

- Đọc trọn câu chứa từ, cả chủ ngữ và tân ngữ của nó
- Thay từng đáp án vào chỗ của từ, đọc lại câu
- Chọn đáp án giữ nguyên nghĩa câu và đúng cách dùng (cùng loại từ, cùng cấu trúc)

## Ví dụ

Trong các câu dưới đây, nghĩa quen nhất của từ được hỏi đều là đáp án sai.

> **The annual report covers the period from January to December. — "covers" is closest in meaning to (A) hides (B) includes (C) pays for (D) protects**  
> Báo cáo năm bao gồm giai đoạn từ tháng 1 đến tháng 12.  
> _Vì sao:_ Báo cáo "bao quát" một khoảng thời gian → (B). Hides, protects là nghĩa "che phủ"; pays for là nghĩa trong "cover the cost"

> **Ms. Patel will assume the role of department head in March. — "assume" is closest in meaning to (A) suppose (B) take on (C) pretend (D) expect**  
> Cô Patel sẽ đảm nhận vị trí trưởng phòng vào tháng 3.  
> _Vì sao:_ assume + vai trò, trách nhiệm nghĩa là đảm nhận → (B). Suppose là nghĩa "cho rằng", không đi với "the role"

> **Please address any questions about your invoice to our billing department. — "address" is closest in meaning to (A) direct (B) solve (C) speak (D) locate**  
> Vui lòng gửi mọi câu hỏi về hóa đơn đến bộ phận thanh toán.  
> _Vì sao:_ address sth to sb nghĩa là gửi đến → (A). Solve là nghĩa trong "address an issue" (giải quyết vấn đề), không hợp với "to our billing department"
', ARRAY['Đọc cả câu chứa từ trước khi xem đáp án', 'Thay từng đáp án vào câu, giữ nghĩa và cấu trúc', 'Nghĩa quen nhất thường là bẫy']::text[], ARRAY['P7']::text[], 15, 'P7', 'comprehension.vocab-in-context', 3, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'reading'), 'p7-multi-passage', 'Bài đọc kép và bài đọc ba ở Part 7', 'Biết câu hỏi nào cần văn bản nào và nối ngày, giá, mã số giữa các văn bản', '## Cấu trúc phần đọc nhiều văn bản

Part 7 có 54 câu: 29 câu ở các bài đọc đơn, 10 câu ở hai bộ bài đọc kép (hai văn bản) và 15 câu ở ba bộ bài đọc ba (ba văn bản). Mỗi bộ có 5 câu hỏi.

Trong mỗi bộ thường có một hoặc hai câu chỉ trả lời được khi ghép thông tin từ hai văn bản. Những câu này phân biệt người đạt 700 với người đạt 800+.

## Câu hỏi nào cần văn bản nào

Trước khi đọc kỹ, lướt tiêu đề và phần đầu từng văn bản: loại văn bản gì (email, bảng giá, đơn hàng, đánh giá), ai viết cho ai, ngày nào. Sau đó đọc câu hỏi để biết cần tìm ở đâu.

- Câu hỏi nêu tên văn bản ("According to the e-mail", "in the invoice") → chỉ tìm trong văn bản đó
- Câu hỏi đầu tiên của bộ thường về văn bản đầu tiên, các câu sau đi dần theo thứ tự văn bản
- Câu hỏi nhắc một người, sản phẩm hay ngày có mặt ở hai văn bản → khả năng cao là câu cần ghép
- Câu hỏi có "most likely" hoặc "suggested" trong bộ nhiều văn bản thường cần ghép thông tin

## Nối thông tin giữa các văn bản

Thông tin hay được nối là ngày, giá, mã sản phẩm, tên người và địa điểm. Một văn bản đưa điều kiện (bảng giá, chính sách, lịch), văn bản kia đưa trường hợp cụ thể (email đặt hàng, phàn nàn).

> **Text 1 (Rate card): Standard room $120 per night. Deluxe room (garden view) $165 per night. Guests staying three nights or more receive 10% off. / Text 2 (E-mail): I would like to book a room with a garden view for four nights, from October 8 to 12. — What is suggested about the guest? (A) She will stay in a standard room. (B) She will receive a discount. (C) She has stayed at the hotel before. (D) She will arrive on October 7.**  
> Bảng giá: phòng thường 120 đô một đêm, phòng deluxe (nhìn ra vườn) 165 đô một đêm, ở từ ba đêm được giảm 10%. Email: tôi muốn đặt phòng nhìn ra vườn bốn đêm, từ 8 đến 12 tháng 10.  
> _Vì sao:_ Bốn đêm (email) thỏa điều kiện ba đêm trở lên (bảng giá) → (B). Chỉ đọc một văn bản thì không trả lời được

> **Text 1 (Order form): Item BX-204, desk lamp, quantity 3. / Text 2 (E-mail): One of the lamps arrived with a cracked base. / Text 3 (Reply): We will ship a replacement for item BX-204 at no cost. — How many lamps did the customer receive in good condition? (A) One (B) Two (C) Three (D) Four**  
> Đơn hàng: mã BX-204, đèn bàn, số lượng 3. Email: một chiếc đèn bị nứt đế. Thư trả lời: chúng tôi sẽ gửi đèn thay thế miễn phí.  
> _Vì sao:_ Ghép số lượng ở đơn hàng (3) với số đèn hỏng ở email (1) → (B). (C) là bẫy nếu chỉ đọc đơn hàng

## Thời gian cho mỗi bộ

Một bộ 5 câu nên làm trong khoảng 5 đến 6 phút. Nếu một câu ghép thông tin mất quá 1,5 phút, hãy chọn tạm, đánh dấu và sang câu tiếp theo; các câu còn lại của bộ thường dễ hơn.
', ARRAY['Lướt loại văn bản, người gửi, người nhận và ngày trước khi đọc kỹ', 'Câu hỏi nêu tên văn bản thì chỉ tìm trong văn bản đó', 'Một văn bản cho điều kiện, văn bản kia cho trường hợp cụ thể', 'Mỗi bộ 5 câu khoảng 5 đến 6 phút']::text[], ARRAY['P7']::text[], 25, 'P7', 'comprehension.cross-reference', 4, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'strategy'), 'time-management', 'Phân bổ thời gian trong 120 phút', 'Kế hoạch thời gian cho từng phần, cách đoán khi bí và cách dùng phòng thi của Lingo', '## Toàn cảnh 120 phút

Bài thi có 200 câu trong khoảng 120 phút. Phần nghe khoảng 45 phút cho 100 câu và chạy theo băng, bạn không điều chỉnh được. Phần đọc 75 phút cho 100 câu, và đây là nơi quyết định bạn có làm hết đề hay không.

Người ở mức 650 thường hết giờ khi còn 10 đến 20 câu Part 7. Lên 800+ chủ yếu nhờ làm Part 5 và Part 6 nhanh hơn để có đủ thời gian cho Part 7.

- Part 5 (30 câu): 10 đến 12 phút, khoảng 20 giây mỗi câu
- Part 6 (16 câu): khoảng 8 phút, 2 phút mỗi đoạn
- Part 7 (54 câu): khoảng 55 phút, trung bình 1 phút mỗi câu

## Phần nghe: đi theo nhịp băng

Ở Part 3 và Part 4, dùng khoảng lặng giữa các bộ câu hỏi để đọc trước ba câu hỏi của bộ tiếp theo. Khi phần hướng dẫn đầu Part 3 và Part 4 đang phát, đọc trước câu hỏi của bộ đầu tiên.

Nếu lỡ một câu, chọn ngay một đáp án rồi chuyển sự chú ý sang câu tiếp theo. Tiếc nuối câu vừa qua là cách nhanh nhất để mất thêm hai câu nữa.

## Phần đọc: mốc giờ cần nhớ

Ghi nhớ vài mốc để biết mình đang nhanh hay chậm, thay vì nhìn đồng hồ sau mỗi câu.

- Còn khoảng 63 phút: xong Part 5
- Còn khoảng 55 phút: xong Part 6, bắt đầu Part 7
- Còn khoảng 27 phút: bắt đầu bộ bài đọc kép đầu tiên
- Chậm hơn mốc quá 3 phút thì đẩy nhanh: chọn tạm những câu khó và đi tiếp

## Khi bị kẹt và cách đoán

TOEIC không trừ điểm câu sai, nên không bao giờ để trống. Câu bỏ trống chắc chắn mất điểm, câu đoán còn có khoảng một phần tư cơ hội đúng, nhiều hơn nếu loại được một hai đáp án.

- Part 5: quá 30 giây chưa ra thì loại được bao nhiêu loại bấy nhiêu, chọn tạm, đánh dấu
- Part 7: một câu quá 1,5 phút thì chọn tạm, đánh dấu và đi tiếp; câu sau trong cùng bộ có thể dễ hơn
- Câu đánh dấu chỉ quay lại khi đã làm hết đề
- Còn 2 phút mà chưa xong: tô hết các câu còn lại bằng cùng một chữ cái

## Luyện trong phòng thi Lingo

Khi làm đề đầy đủ trong Lingo, bật Toàn màn hình để tránh bị phân tâm. Mỗi bài nghe chỉ phát một lần như thi thật, có đồng hồ đếm ngược, và bài tự nộp khi hết giờ.

Dùng phím để làm nhanh: A đến D để chọn, mũi tên trái phải để chuyển câu, F để đánh dấu câu cần xem lại. Mỗi lựa chọn được lưu ngay, nên lỡ đóng tab thì mở lại sẽ tiếp tục từ chỗ dừng.
', ARRAY['Part 5 khoảng 10 đến 12 phút, Part 6 khoảng 8 phút, Part 7 khoảng 55 phút', 'Không để trống câu nào, vì câu sai không bị trừ điểm', 'Câu khó: chọn tạm, đánh dấu, đi tiếp', 'Luyện đề đầy đủ với đồng hồ và Toàn màn hình']::text[], ARRAY['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7']::text[], 15, NULL, NULL, 0, 'PUBLISHED', now());
INSERT INTO "lingo_lessons" ("id", "module_id", "slug", "title", "summary", "content", "key_points", "parts", "minutes", "practice_part", "practice_skill_tag", "order", "status", "updated_at") VALUES (gen_random_uuid(), (SELECT "id" FROM "lingo_lesson_modules" WHERE "exam" = 'TOEIC_LR' AND "slug" = 'strategy'), 'review-mistakes', 'Chữa đề để điểm tăng đều', 'Phân loại từng câu sai, ôn đúng chỗ yếu và làm lại câu sai sau vài ngày', '## Chữa đề quan trọng hơn làm thêm đề

Làm liên tục nhiều đề mà không chữa thường khiến điểm đứng yên, vì những lỗi cũ lặp lại ở đề mới. Một đề làm xong nên dành thời gian chữa ít nhất bằng thời gian làm.

Chữa cả những câu đúng nhờ đoán. Với câu đó bạn chưa thật sự biết, và lần sau có thể không may như vậy.

## Phân loại từng câu sai

Với mỗi câu sai, ghi lại một trong năm nguyên nhân dưới đây. Mỗi nguyên nhân có một cách sửa khác nhau, nên phân loại đúng thì mới ôn đúng.

- Từ vựng: không biết nghĩa hoặc cách dùng của từ → ghi cả cụm vào sổ từ hoặc thẻ của bạn
- Ngữ pháp: không nhận ra điểm ngữ pháp → học lại bài tương ứng trong module Ngữ pháp và làm phần luyện tập
- Không nghe ra: biết từ khi đọc nhưng không nhận ra khi nghe → nghe lại câu đó, chép chính tả rồi so với lời thoại
- Hết giờ hoặc vội: biết cách làm nhưng không kịp → xem lại bài phân bổ thời gian
- Mắc bẫy: hiểu bài nhưng chọn đáp án gần đúng → ghi lại dạng bẫy để lần sau nhận ra

> **The firm has -------- a new policy on remote work. (chose: adapted; correct: adopted)**  
> Công ty đã áp dụng chính sách mới về làm việc từ xa.  
> _Vì sao:_ Lỗi từ vựng: adapt (điều chỉnh) và adopt (áp dụng) gần cách viết. Ghi cả cặp và cụm "adopt a policy" vào sổ từ

> **Part 2: "Who is leading the workshop?" — chose "At the workshop", correct "Ms. Lee is, I think."**  
> Ai dẫn buổi hội thảo? Chọn "Ở buổi hội thảo", đáp án đúng "Tôi nghĩ là cô Lee."  
> _Vì sao:_ Mắc bẫy lặp từ: đáp án sai lặp lại "workshop" nhưng không trả lời câu hỏi Who

> **Part 7: the last 8 questions answered by guessing**  
> 8 câu cuối Part 7 phải đoán vì hết giờ.  
> _Vì sao:_ Lỗi thời gian: đo lại thời gian làm Part 5 và Part 6 ở đề sau, mục tiêu xong cả hai trong khoảng 20 phút

## Dùng Sổ câu sai và bộ thẻ trong Lingo

Sổ câu sai giữ những câu bạn làm sai ở lần gần nhất. Nút Làm lại theo từng Part tạo một bài chỉ gồm các câu đó; câu nào làm đúng lại sẽ tự rời sổ.

Từ mới gặp trong đề, ghi cả cụm kèm câu ví dụ vào sổ từ hoặc thẻ của riêng bạn. Phần lớn từ hay gặp đã có trong các bộ thẻ ở mục Ôn từ vựng; ôn đều mỗi ngày, lịch ôn sẽ tự giãn ra khi bạn nhớ tốt.

## Làm lại sau vài ngày và theo dõi kỹ năng yếu

Đừng làm lại câu sai ngay sau khi xem đáp án, vì lúc đó bạn chỉ nhớ đáp án. Làm lại sau hai đến ba ngày, rồi thêm một lần sau khoảng một tuần. Câu vẫn sai ở lần thứ hai là điểm cần học lại từ đầu.

Mục Điểm yếu ở trang Luyện tập xếp các kỹ năng theo tỉ lệ đúng (cần từ 3 câu mỗi kỹ năng mới hiện). Mỗi tuần chọn một hoặc hai kỹ năng yếu nhất, học bài tương ứng và làm phần luyện tập của bài đó.
', ARRAY['Chữa cả câu sai và câu đúng nhờ đoán', 'Ghi nguyên nhân cho từng câu sai: từ vựng, ngữ pháp, không nghe ra, hết giờ hay mắc bẫy', 'Làm lại câu sai sau vài ngày, không làm lại ngay', 'Mỗi tuần tập trung một hoặc hai kỹ năng yếu nhất']::text[], ARRAY['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7']::text[], 15, NULL, NULL, 1, 'PUBLISHED', now());
