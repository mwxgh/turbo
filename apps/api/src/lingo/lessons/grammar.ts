import type { LessonSpec } from './types'

export const GRAMMAR_LESSONS: LessonSpec[] = [
  {
    id: 'word-form',
    module: 'grammar',
    title: 'Từ loại và vị trí trong câu',
    summary:
      'Nhìn chỗ trống và từ đứng quanh nó để biết cần danh từ, động từ, tính từ hay trạng từ, không cần dịch cả câu',
    minutes: 15,
    parts: ['P5', 'P6'],
    sections: [
      {
        heading: 'Vì sao từ loại quan trọng',
        paragraphs: [
          'Khoảng một phần ba số câu Part 5 cho bốn lựa chọn cùng gốc từ (develop, developer, development, developmental). Những câu này không hỏi nghĩa mà hỏi vị trí: chỗ trống đang cần loại từ nào.',
          'Làm đúng dạng này nhanh (dưới 15 giây mỗi câu) sẽ để dành thời gian cho Part 7. Ở mục tiêu 800+, gần như không được mất điểm ở dạng này.',
        ],
      },
      {
        heading: 'Bốn vị trí hay gặp nhất',
        paragraphs: [
          'Xác định từ đứng ngay trước và ngay sau chỗ trống, rồi đối chiếu với các mẫu dưới đây.',
        ],
        bullets: [
          'Sau mạo từ (a, an, the), tính từ sở hữu (our, its) hoặc giới từ → danh từ: "the -------- of the plan" → development',
          'Giữa mạo từ và danh từ → tính từ: "a -------- increase" → significant',
          'Trước tính từ hoặc trạng từ khác, hoặc bổ nghĩa cho động từ → trạng từ: "-------- high demand" → unexpectedly',
          'Sau chủ ngữ, cần động từ chia thì: "The committee -------- the proposal" → approved',
        ],
        examples: [
          {
            en: 'The new policy led to a -------- improvement in customer satisfaction. (A) notice (B) noticeable (C) noticeably (D) noticing',
            vi: 'Chính sách mới giúp mức hài lòng của khách hàng cải thiện rõ rệt.',
            note: 'Giữa "a" và danh từ "improvement" cần tính từ → (B) noticeable',
          },
          {
            en: 'Ms. Tran responded -------- to every complaint. (A) prompt (B) promptly (C) prompted (D) promptness',
            vi: 'Cô Trần trả lời mọi lời phàn nàn một cách nhanh chóng.',
            note: 'Câu đã đủ chủ ngữ và động từ "responded"; chỗ trống bổ nghĩa cho động từ → trạng từ (B)',
          },
        ],
      },
      {
        heading: 'Đuôi từ giúp nhận ra loại từ',
        paragraphs: [
          'Khi không chắc nghĩa của từ, đuôi từ thường đủ để loại đáp án.',
        ],
        bullets: [
          'Danh từ: -tion, -sion, -ment, -ness, -ity, -ance/-ence, -er/-or (người), -ee (người được), -ship',
          'Tính từ: -able/-ible, -ive, -ous, -ful, -less, -al, -ic, -ent/-ant',
          'Trạng từ: phần lớn là tính từ + -ly (lưu ý: friendly, costly, timely là tính từ)',
          'Động từ: -ize, -ify, -en, -ate',
        ],
      },
      {
        heading: 'Bẫy ở mức 800+',
        paragraphs: [
          'Đề khó hơn ở chỗ có hai đáp án cùng đúng loại từ, phải xét thêm số ít / số nhiều hoặc người / vật.',
        ],
        examples: [
          {
            en: 'All -------- must register at the front desk before entering the laboratory. (A) visit (B) visitors (C) visiting (D) visitor',
            vi: 'Tất cả khách tham quan phải đăng ký ở quầy lễ tân trước khi vào phòng thí nghiệm.',
            note: '"All" + danh từ đếm được số nhiều, và chủ ngữ là người → (B) visitors, không phải (D)',
          },
          {
            en: 'The -------- of the two companies was announced on Friday. (A) merge (B) merger (C) merged (D) merging',
            vi: 'Việc sáp nhập hai công ty được công bố hôm thứ Sáu.',
            note: 'Sau "The" và trước "of" cần danh từ; "merging" cũng có thể làm danh từ nhưng "merger" là danh từ chỉ sự kiện, tự nhiên hơn trong văn bản kinh doanh',
          },
        ],
      },
    ],
    keyPoints: [
      'Nhìn từ trước và sau chỗ trống trước khi đọc cả câu',
      'Câu đã đủ chủ ngữ và động từ thì chỗ trống thường là trạng từ',
      'Hai đáp án cùng loại từ: xét số ít / số nhiều, người / vật',
    ],
    practice: { part: 'P5', skillTag: 'grammar.word-form' },
  },
  {
    id: 'verb-tense',
    module: 'grammar',
    title: 'Thì của động từ qua tín hiệu thời gian',
    summary:
      'Tìm từ chỉ thời gian trong câu để chọn thì đúng, kể cả trong mệnh đề thời gian và câu Part 6 phụ thuộc ngữ cảnh',
    minutes: 20,
    parts: ['P5', 'P6'],
    sections: [
      {
        heading: 'Đọc tín hiệu thời gian trước',
        paragraphs: [
          'Khi bốn lựa chọn là cùng một động từ ở các thì khác nhau, đừng dịch cả câu. Hãy tìm cụm chỉ thời gian: phần lớn câu Part 5 dạng này có một tín hiệu đủ để chọn ngay.',
          'Nếu đã có tín hiệu mà vẫn còn hai đáp án, xét tiếp chủ ngữ số ít hay số nhiều, rồi chủ động hay bị động.',
        ],
        bullets: [
          'Hiện tại đơn: every, usually, regularly, each year, typically (thói quen, lịch trình cố định)',
          'Hiện tại tiếp diễn: currently, at the moment, now, this week (việc đang diễn ra)',
          'Quá khứ đơn: yesterday, last + thời gian, ago, in + năm đã qua, when + mệnh đề quá khứ',
          'Hiện tại hoàn thành: since, for + khoảng thời gian, so far, already, yet, over the past / in the last + khoảng thời gian',
          'Tương lai: tomorrow, next, upcoming, soon, as of next month',
          'Tương lai hoàn thành: by + mốc tương lai, by the time + mệnh đề hiện tại',
        ],
        examples: [
          {
            en: 'Since joining the firm in 2019, Mr. Patel -------- three regional offices. (A) opens (B) opened (C) has opened (D) will open',
            vi: 'Từ khi vào công ty năm 2019, ông Patel đã mở ba văn phòng khu vực.',
            note: '"Since" + mốc quá khứ kéo đến hiện tại → hiện tại hoàn thành (C)',
          },
          {
            en: 'By the end of next quarter, the IT team -------- the software upgrade. (A) completes (B) will have completed (C) has completed (D) completed',
            vi: 'Đến cuối quý sau, nhóm IT sẽ hoàn tất việc nâng cấp phần mềm.',
            note: '"By" + mốc tương lai → tương lai hoàn thành (B)',
          },
        ],
      },
      {
        heading: 'Mệnh đề thời gian và điều kiện không dùng will',
        paragraphs: [
          'Sau when, once, as soon as, before, after, until, if, unless, động từ dùng thì hiện tại dù nghĩa là tương lai. Vế còn lại mới dùng will hoặc câu mệnh lệnh.',
          'Muốn nhấn mạnh việc đã xong trước, có thể dùng hiện tại hoàn thành trong mệnh đề này: "after we have reviewed the data".',
        ],
        examples: [
          {
            en: 'Once the shipment --------, we will notify you by e-mail. (A) arrives (B) will arrive (C) arrived (D) arriving',
            vi: 'Khi lô hàng đến, chúng tôi sẽ báo cho quý khách qua e-mail.',
            note: 'Sau "once" dùng hiện tại thay cho tương lai → (A); (B) là bẫy vì vế sau có "will"',
          },
          {
            en: 'Please do not enter the room until the cleaning crew -------- the floor. (A) will finish (B) finished (C) has finished (D) finishing',
            vi: 'Vui lòng không vào phòng cho đến khi đội vệ sinh lau xong sàn.',
            note: 'Sau "until" không dùng will; hiện tại hoàn thành (C) nhấn mạnh việc làm xong',
          },
        ],
      },
      {
        heading: 'Quá khứ hoàn thành và thứ tự sự việc',
        paragraphs: [
          'Quá khứ hoàn thành (had + V3) dùng cho việc xảy ra trước một mốc hoặc một việc khác trong quá khứ. Tín hiệu hay gặp: by the time + quá khứ đơn, before / after + quá khứ, by + mốc đã qua.',
        ],
        examples: [
          {
            en: 'By the time the CEO arrived, the board members -------- the vote. (A) have taken (B) had taken (C) take (D) will take',
            vi: 'Khi tổng giám đốc đến thì hội đồng quản trị đã biểu quyết xong.',
            note: '"By the time" + quá khứ đơn "arrived" → việc xảy ra trước dùng quá khứ hoàn thành (B)',
          },
        ],
      },
      {
        heading: 'Bẫy ở mức 800+',
        paragraphs: [
          'Câu khó thường gộp thì với bị động hoặc không có tín hiệu trong chính câu đó. Ở Part 6, thì phụ thuộc vào ngày gửi thư và những gì đoạn văn đã kể: sự kiện "last week" thì phản hồi về nó đã có rồi.',
          '"In the past five years" (khoảng thời gian kéo đến nay) đi với hiện tại hoàn thành, còn "five years ago" (mốc đã qua) đi với quá khứ đơn. Đừng nhầm hai cụm chỉ vì cùng có "five years".',
        ],
        examples: [
          {
            en: 'The east wing of the library -------- for renovations since early March. (A) closed (B) was closed (C) has been closed (D) is closing',
            vi: 'Cánh phía đông của thư viện đã đóng cửa để sửa chữa từ đầu tháng Ba.',
            note: '"Since" cần hiện tại hoàn thành; chỉ (C) đúng cả thì lẫn nghĩa bị động "bị đóng"',
          },
          {
            en: 'Thank you for attending the workshop last Tuesday. The comments you -------- have been passed on to the trainers. (A) provide (B) provided (C) will provide (D) are providing',
            vi: 'Cảm ơn anh chị đã tham dự buổi hội thảo thứ Ba vừa rồi. Các góp ý anh chị đưa ra đã được chuyển cho giảng viên.',
            note: 'Không có tín hiệu trong câu thứ hai, nhưng câu trước cho biết buổi học đã diễn ra → quá khứ (B)',
          },
        ],
      },
    ],
    keyPoints: [
      'Tìm cụm chỉ thời gian trước khi xét nghĩa',
      'Sau when, once, if, until không dùng will',
      'Since, for, over the past → hiện tại hoàn thành; by + tương lai → will have V3',
      'Part 6: thì phụ thuộc vào câu trước và ngày của văn bản',
    ],
    practice: { part: 'P5', skillTag: 'grammar.verb-tense' },
  },
  {
    id: 'verb-form',
    module: 'grammar',
    title: 'Dạng động từ: to V, V-ing, phân từ và bị động',
    summary:
      'Phân biệt chỗ cần động từ chính với chỗ cần to V, V-ing hay V3, và nhận ra câu bị động qua tân ngữ',
    minutes: 20,
    parts: ['P5', 'P6'],
    sections: [
      {
        heading: 'Câu đã có động từ chính chưa',
        paragraphs: [
          'Một mệnh đề chỉ có một động từ chia thì. Nếu câu đã có động từ chính, chỗ trống phải là dạng không chia: to V, V-ing hoặc V3. Nếu câu chưa có, loại ngay các đáp án to V và V-ing đứng một mình.',
          'Sau đó xét động từ đứng trước chỗ trống: nó đòi to V hay V-ing.',
        ],
        examples: [
          {
            en: 'The manager asked all employees -------- their timesheets by Friday. (A) submit (B) to submit (C) submitting (D) submitted',
            vi: 'Quản lý yêu cầu mọi nhân viên nộp bảng chấm công trước thứ Sáu.',
            note: 'Câu đã có động từ "asked"; mẫu ask + tân ngữ + to V → (B)',
          },
        ],
      },
      {
        heading: 'Động từ đi với to V và V-ing',
        paragraphs: [
          'Không có quy tắc tuyệt đối, nên nhóm các động từ hay ra đề lại và học theo cụm.',
        ],
        bullets: [
          '+ to V: plan, decide, agree, hope, expect, intend, aim, offer, refuse, fail, strive, seek, be able to, be eager to',
          '+ tân ngữ + to V: ask, require, encourage, allow, enable, remind, advise, invite, urge, permit',
          '+ V-ing: consider, avoid, recommend, suggest, finish, postpone, delay, mind, discontinue',
          '"to" là giới từ nên theo sau là V-ing: look forward to, be committed to, be dedicated to, contribute to, object to, be used to',
          'in order to / so as to + V nguyên mẫu (chỉ mục đích)',
        ],
        examples: [
          {
            en: 'We look forward to -------- with your team on the next project. (A) work (B) working (C) be worked (D) works',
            vi: 'Chúng tôi mong được làm việc với nhóm của anh chị trong dự án tới.',
            note: '"to" trong look forward to là giới từ → V-ing (B)',
          },
          {
            en: 'The committee is considering -------- the deadline by one week. (A) extend (B) to extend (C) extending (D) extended',
            vi: 'Ủy ban đang cân nhắc lùi hạn chót thêm một tuần.',
            note: 'consider + V-ing → (C)',
          },
        ],
      },
      {
        heading: 'Chủ động hay bị động',
        paragraphs: [
          'Với động từ cần tân ngữ (review, approve, send, inspect), nếu sau chỗ trống không có tân ngữ mà có by, giới từ hoặc trạng từ, câu thường là bị động: be + V3. Hỏi thêm: chủ ngữ tự làm hay được làm.',
        ],
        examples: [
          {
            en: 'All applications must be -------- by March 31. (A) receive (B) receiving (C) received (D) receives',
            vi: 'Mọi hồ sơ phải được nhận trước ngày 31 tháng Ba.',
            note: 'Hồ sơ không tự nhận; sau "be" và không có tân ngữ → V3 (C)',
          },
          {
            en: 'The conference room -------- every Monday morning. (A) cleans (B) is cleaning (C) is cleaned (D) has cleaned',
            vi: 'Phòng họp được dọn mỗi sáng thứ Hai.',
            note: '"every Monday" → hiện tại đơn; phòng được dọn → bị động (C)',
          },
        ],
      },
      {
        heading: 'Phân từ bổ nghĩa cho danh từ',
        paragraphs: [
          'V-ing mang nghĩa chủ động (danh từ tự làm việc đó), V3 mang nghĩa bị động (danh từ chịu tác động). Phân từ có thể đứng trước danh từ (the attached file) hoặc sau danh từ như một mệnh đề quan hệ rút gọn (employees attending the event).',
        ],
        examples: [
          {
            en: 'Please review the -------- documents before the meeting. (A) attach (B) attaching (C) attached (D) attaches',
            vi: 'Vui lòng xem các tài liệu đính kèm trước cuộc họp.',
            note: 'Tài liệu được đính kèm → V3 (C)',
          },
          {
            en: 'Employees -------- to attend the seminar should contact Ms. Ruiz. (A) wish (B) wishing (C) wished (D) wishes',
            vi: 'Nhân viên muốn dự hội thảo nên liên hệ cô Ruiz.',
            note: 'Động từ chính là "should contact"; nhân viên tự muốn → V-ing (B)',
          },
        ],
      },
      {
        heading: 'Bẫy ở mức 800+',
        paragraphs: [
          'Tính từ chỉ cảm xúc: -ing mô tả thứ gây ra cảm xúc (a surprising result), -ed mô tả người cảm thấy (surprised staff). Động từ sai khiến: have / get + vật + V3 (nhờ người khác làm), make / let + người + V nguyên mẫu, help + người + (to) V.',
          'Phân biệt be used to + V-ing (quen với) và used to + V (đã từng), stop + V-ing (ngừng làm) và stop + to V (dừng lại để làm).',
        ],
        examples: [
          {
            en: 'The results of the customer survey were -------- to the marketing team. (A) surprise (B) surprising (C) surprised (D) surprisingly',
            vi: 'Kết quả khảo sát khách hàng khiến nhóm marketing bất ngờ.',
            note: 'Kết quả là thứ gây bất ngờ → (B); "surprised" dùng khi chủ ngữ là người',
          },
          {
            en: 'Ms. Kim had the contract -------- by a lawyer before signing it. (A) review (B) reviewing (C) reviewed (D) to review',
            vi: 'Cô Kim nhờ luật sư xem lại hợp đồng trước khi ký.',
            note: 'have + vật + V3 (hợp đồng được xem) → (C); có "by a lawyer" là dấu hiệu bị động',
          },
        ],
      },
    ],
    keyPoints: [
      'Câu đã có động từ chính thì chỗ trống là to V, V-ing hoặc V3',
      'Sau "to" giới từ (look forward to, committed to) dùng V-ing',
      'Không có tân ngữ sau động từ cần tân ngữ → nghĩ đến bị động',
      'V-ing chủ động, V3 bị động khi bổ nghĩa cho danh từ',
    ],
    practice: { part: 'P5', skillTag: 'grammar.verb-form' },
  },
  {
    id: 'agreement',
    module: 'grammar',
    title: 'Hoà hợp chủ ngữ và động từ',
    summary:
      'Tìm đúng chủ ngữ thật, bỏ qua cụm chen giữa, và nắm các lượng từ quyết định động từ số ít hay số nhiều',
    minutes: 15,
    parts: ['P5', 'P6'],
    sections: [
      {
        heading: 'Tìm chủ ngữ thật',
        paragraphs: [
          'Động từ hoà hợp với danh từ chính của chủ ngữ, không phải danh từ đứng sát nó. Gạch bỏ cụm giới từ (of, in, for, with), mệnh đề quan hệ và cụm phân từ chen giữa, phần còn lại là chủ ngữ thật.',
        ],
        examples: [
          {
            en: 'The list of approved vendors -------- been sent to all department heads. (A) have (B) has (C) are (D) being',
            vi: 'Danh sách nhà cung cấp được duyệt đã được gửi tới mọi trưởng phòng.',
            note: 'Chủ ngữ thật là "The list" (số ít), "vendors" chỉ nằm trong cụm of → (B)',
          },
          {
            en: 'The engineers who designed the new bridge -------- invited to the opening ceremony. (A) was (B) is (C) were (D) has',
            vi: 'Các kỹ sư thiết kế cây cầu mới được mời dự lễ khánh thành.',
            note: 'Bỏ mệnh đề "who designed the new bridge", chủ ngữ là "engineers" → (C)',
          },
        ],
      },
      {
        heading: 'Lượng từ quyết định số ít hay số nhiều',
        paragraphs: [
          'Nhiều câu Part 5 chỉ cần nhìn lượng từ đầu câu là biết động từ chia thế nào.',
        ],
        bullets: [
          'each / every + danh từ số ít → động từ số ít; each of + danh từ số nhiều → vẫn số ít',
          'one of the + danh từ số nhiều → động từ số ít',
          'a number of + danh từ số nhiều → số nhiều; the number of → số ít',
          'all / most / some / half of + danh từ → động từ theo danh từ đó (most of the staff… / most of the information…)',
          'danh từ không đếm được (information, equipment, furniture, advice, luggage) và V-ing làm chủ ngữ → số ít',
        ],
        examples: [
          {
            en: 'A number of customers -------- requested a refund since the recall. (A) has (B) have (C) is (D) was',
            vi: 'Một số khách hàng đã yêu cầu hoàn tiền kể từ khi thu hồi sản phẩm.',
            note: '"A number of" + số nhiều → động từ số nhiều; "since" → hiện tại hoàn thành (B)',
          },
          {
            en: 'Reviewing all the supplier contracts -------- at least three days. (A) take (B) takes (C) taking (D) to take',
            vi: 'Việc xem xét toàn bộ hợp đồng nhà cung cấp mất ít nhất ba ngày.',
            note: 'Chủ ngữ là cụm V-ing → số ít (B), dù "contracts" số nhiều đứng sát',
          },
        ],
      },
      {
        heading: 'Chủ ngữ ghép',
        paragraphs: [
          'Khi chủ ngữ có hai thành phần, cách nối quyết định động từ.',
        ],
        bullets: [
          'A and B, both A and B → số nhiều',
          'either A or B, neither A nor B, not only A but also B → theo B (danh từ gần động từ)',
          'A as well as B, A along with B, A together with B → theo A',
        ],
        examples: [
          {
            en: 'Neither the manager nor the assistants -------- aware of the schedule change. (A) was (B) were (C) is (D) has been',
            vi: 'Cả quản lý lẫn các trợ lý đều không biết lịch đã thay đổi.',
            note: 'neither…nor → theo "the assistants" (số nhiều) → (B)',
          },
        ],
      },
      {
        heading: 'Bẫy ở mức 800+',
        paragraphs: [
          'Câu khó thường bắt xét ba thứ cùng lúc: số ít / số nhiều, thì và chủ động / bị động. Loại lần lượt từng tiêu chí thay vì dịch. Danh từ tập hợp chỉ cả nhóm như committee, board, management thường đi với động từ số ít trong đề TOEIC.',
          'Trong mệnh đề quan hệ, động từ hoà hợp với danh từ mà who / which / that thay thế.',
        ],
        examples: [
          {
            en: 'The equipment in both laboratories -------- inspected once a year. (A) are (B) is (C) were (D) have been',
            vi: 'Thiết bị ở cả hai phòng thí nghiệm được kiểm tra mỗi năm một lần.',
            note: '"equipment" không đếm được → số ít; "once a year" → hiện tại đơn → (B)',
          },
          {
            en: 'Only one of the proposals submitted last week -------- the budget requirements. (A) meet (B) meets (C) meeting (D) have met',
            vi: 'Chỉ một trong các đề xuất nộp tuần trước đáp ứng yêu cầu ngân sách.',
            note: 'one of the + số nhiều → động từ số ít (B); "submitted last week" là cụm phân từ chen giữa',
          },
        ],
      },
    ],
    keyPoints: [
      'Gạch bỏ cụm giới từ và mệnh đề chen giữa để thấy chủ ngữ thật',
      'each, every, one of, the number of → số ít; a number of → số nhiều',
      'either…or, neither…nor → theo danh từ gần động từ',
      'Danh từ không đếm được và cụm V-ing làm chủ ngữ → số ít',
    ],
    practice: { part: 'P5', skillTag: 'grammar.agreement' },
  },
  {
    id: 'pronoun',
    module: 'grammar',
    title: 'Đại từ nhân xưng, sở hữu và phản thân',
    summary:
      'Chọn đúng dạng đại từ theo vị trí trong câu, và nhận ra đại từ phản thân, sở hữu, bất định trong câu khó',
    minutes: 15,
    parts: ['P5', 'P6'],
    sections: [
      {
        heading: 'Năm dạng và vị trí của chúng',
        paragraphs: [
          'Câu đại từ cho bốn dạng của cùng một ngôi (they, them, their, themselves). Giống từ loại, chỉ cần nhìn vị trí.',
        ],
        bullets: [
          'Chủ ngữ (I, he, she, it, we, they): trước động từ chia thì',
          'Tân ngữ (me, him, her, it, us, them): sau động từ hoặc giới từ',
          'Tính từ sở hữu (my, his, her, its, our, their): trước danh từ',
          'Đại từ sở hữu (mine, his, hers, ours, theirs): đứng một mình, thay cho tính từ sở hữu + danh từ',
          'Phản thân (myself, himself, themselves): khi chủ ngữ và tân ngữ là một, hoặc để nhấn mạnh',
        ],
        examples: [
          {
            en: 'Ms. Lopez asked that all expense reports be sent directly to --------. (A) she (B) her (C) hers (D) herself',
            vi: 'Cô Lopez yêu cầu mọi báo cáo chi phí được gửi thẳng cho cô.',
            note: 'Sau giới từ "to" cần tân ngữ → (B)',
          },
          {
            en: 'Our proposal was less expensive than --------, so the client chose us. (A) they (B) them (C) their (D) theirs',
            vi: 'Đề xuất của chúng tôi rẻ hơn đề xuất của họ nên khách hàng chọn chúng tôi.',
            note: 'Cần thay cho "their proposal" → đại từ sở hữu (D)',
          },
        ],
      },
      {
        heading: 'Đại từ phản thân',
        paragraphs: [
          'Dùng phản thân khi tân ngữ chính là chủ ngữ (She introduced herself). Khi câu đã đủ thành phần, phản thân đứng cuối hoặc sau chủ ngữ để nhấn mạnh "tự mình làm". by + phản thân nghĩa là "một mình, không ai giúp".',
        ],
        examples: [
          {
            en: 'The new interns introduced -------- at the start of the meeting. (A) they (B) them (C) their (D) themselves',
            vi: 'Các thực tập sinh mới tự giới thiệu ở đầu buổi họp.',
            note: 'Người giới thiệu và người được giới thiệu là một → (D); "them" sẽ chỉ người khác',
          },
          {
            en: 'Mr. Chen prefers to handle client complaints --------. (A) he (B) him (C) his (D) himself',
            vi: 'Ông Chen thích tự mình xử lý khiếu nại của khách.',
            note: 'Câu đã đủ chủ ngữ, động từ, tân ngữ; chỗ trống chỉ nhấn mạnh → (D)',
          },
        ],
      },
      {
        heading: 'Đại từ bất định và chỉ định',
        paragraphs: [
          'Those who + động từ số nhiều nghĩa là "những ai". Anyone, everyone, someone đi với động từ số ít. Trong so sánh, that of / those of thay cho danh từ đã nhắc để không lặp lại.',
        ],
        bullets: [
          'another + danh từ số ít (thêm một cái nữa); other + danh từ số nhiều',
          'others = những người / vật khác (đứng một mình); the other = cái còn lại trong hai',
          'each other / one another: lẫn nhau, làm tân ngữ',
        ],
        examples: [
          {
            en: '-------- who wish to attend the training must register by Friday. (A) Anyone (B) Those (C) Whoever (D) They',
            vi: 'Những ai muốn dự buổi đào tạo phải đăng ký trước thứ Sáu.',
            note: '"wish" số nhiều → "Those who" (B); "Anyone who" cần "wishes"',
          },
          {
            en: 'Sales figures for this year are higher than -------- for last year. (A) that (B) those (C) these (D) them',
            vi: 'Doanh số năm nay cao hơn doanh số năm ngoái.',
            note: 'Thay cho "sales figures" (số nhiều) và có cụm "for last year" theo sau → (B)',
          },
        ],
      },
      {
        heading: 'Bẫy ở mức 800+',
        paragraphs: [
          'Ở Part 6, đại từ phải khớp với danh từ được nhắc ở câu trước. Tên công ty là số ít nên dùng it / its, không phải they / their. Đọc lại câu trước để biết đại từ chỉ ai.',
          "Phân biệt its (của nó) và it's (it is), their và there.",
        ],
        examples: [
          {
            en: 'Hanmore Foods announced that -------- quarterly profits rose by 8 percent. (A) it (B) its (C) their (D) theirs',
            vi: 'Hanmore Foods thông báo lợi nhuận quý của công ty tăng 8%.',
            note: 'Trước danh từ cần tính từ sở hữu; công ty là số ít → (B)',
          },
          {
            en: 'Some participants preferred the morning session, while -------- chose the afternoon one. (A) another (B) other (C) others (D) the other',
            vi: 'Một số người tham gia thích buổi sáng, trong khi những người khác chọn buổi chiều.',
            note: 'Đứng một mình, chỉ nhiều người → (C); "other" phải có danh từ theo sau',
          },
        ],
      },
    ],
    keyPoints: [
      'Trước động từ: chủ ngữ; sau động từ / giới từ: tân ngữ; trước danh từ: sở hữu',
      'Chủ ngữ và tân ngữ là một → phản thân',
      'Those who + số nhiều; anyone who + số ít',
      'Công ty, tổ chức số ít → it / its',
    ],
    practice: { part: 'P5', skillTag: 'grammar.pronoun' },
  },
  {
    id: 'preposition',
    module: 'grammar',
    title: 'Giới từ thời gian, nơi chốn và cụm cố định',
    summary:
      'Phân biệt giới từ với liên từ, chọn giới từ chỉ thời gian chính xác và nhớ các cụm giới từ hay ra',
    minutes: 20,
    parts: ['P5', 'P6'],
    sections: [
      {
        heading: 'Giới từ hay liên từ',
        paragraphs: [
          'Giới từ đi với danh từ, cụm danh từ hoặc V-ing. Liên từ đi với cả một mệnh đề (có chủ ngữ và động từ). Khi bốn đáp án có cả hai loại, nhìn phần sau chỗ trống trước khi xét nghĩa.',
        ],
        bullets: [
          'despite / in spite of (giới từ) ↔ although / even though (liên từ)',
          'because of / due to / owing to ↔ because / since',
          'during ↔ while; before, after, until, since dùng được cả hai cách',
        ],
        examples: [
          {
            en: '-------- the heavy rain, the outdoor concert went ahead as planned. (A) Although (B) Despite (C) Even if (D) However',
            vi: 'Dù mưa lớn, buổi hòa nhạc ngoài trời vẫn diễn ra như kế hoạch.',
            note: 'Sau chỗ trống là cụm danh từ "the heavy rain" → giới từ (B)',
          },
        ],
      },
      {
        heading: 'Giới từ chỉ thời gian',
        paragraphs: [
          'Nhóm này ra rất thường xuyên và hai đáp án hay gần nghĩa nhau, nên cần nắm khác biệt chính xác.',
        ],
        bullets: [
          'at + giờ; on + ngày, thứ; in + tháng, năm, buổi',
          'by = không muộn hơn (hạn chót); until = kéo dài liên tục đến lúc đó',
          'within = trong vòng (không quá); for + khoảng thời gian; since + mốc',
          'during + danh từ (trong suốt sự kiện); throughout = suốt từ đầu đến cuối',
          'prior to = before; following = after; as of = kể từ (một ngày cụ thể)',
        ],
        examples: [
          {
            en: 'Please return the signed form -------- Friday at noon. (A) until (B) by (C) since (D) during',
            vi: 'Vui lòng gửi lại mẫu đơn đã ký chậm nhất trưa thứ Sáu.',
            note: '"return" là hành động một lần, cần hạn chót → (B); "until" dùng với hành động kéo dài như "remain open until"',
          },
          {
            en: 'The warranty covers repairs -------- two years of purchase. (A) within (B) during (C) since (D) among',
            vi: 'Bảo hành áp dụng cho việc sửa chữa trong vòng hai năm kể từ khi mua.',
            note: 'within + khoảng thời gian + of → (A)',
          },
        ],
      },
      {
        heading: 'Nơi chốn và các cụm cố định',
        paragraphs: [
          'Between dùng cho hai đối tượng, among cho ba trở lên. Phần lớn điểm giới từ ở mức 800+ nằm ở cụm cố định: học cả cụm thay vì học từng giới từ.',
        ],
        bullets: [
          'responsible for, eligible for, comply with, familiar with, in accordance with, subject to',
          'in charge of, on behalf of, in addition to, regardless of, in response to, according to',
          'ahead of schedule, on time / in time, out of stock, under review, at no extra cost, in advance',
        ],
        examples: [
          {
            en: 'All visitors to the plant must comply -------- the safety regulations. (A) to (B) for (C) with (D) by',
            vi: 'Mọi khách tham quan nhà máy phải tuân thủ quy định an toàn.',
            note: 'Cụm cố định comply with → (C)',
          },
          {
            en: 'The renovation of the lobby was completed two weeks -------- schedule. (A) ahead of (B) prior (C) in front (D) before of',
            vi: 'Việc cải tạo sảnh hoàn thành sớm hai tuần so với kế hoạch.',
            note: 'Cụm cố định ahead of schedule → (A)',
          },
        ],
      },
      {
        heading: 'Bẫy ở mức 800+',
        paragraphs: [
          'Đề khó dùng giới từ nhiều chữ hoặc giới từ có hình thức giống động từ: following, given, regarding, concerning, excluding. Chúng vẫn là giới từ, đi với danh từ chứ không đi với mệnh đề.',
        ],
        examples: [
          {
            en: '-------- the success of the pilot program, the company will expand it to all branches. (A) Following (B) Because (C) Whereas (D) Unless',
            vi: 'Sau thành công của chương trình thử nghiệm, công ty sẽ mở rộng ra mọi chi nhánh.',
            note: 'Sau chỗ trống là cụm danh từ; ba đáp án còn lại là liên từ → (A)',
          },
          {
            en: 'Applicants are evaluated -------- their experience and skills. (A) on the basis of (B) in spite of (C) instead (D) owing',
            vi: 'Ứng viên được đánh giá dựa trên kinh nghiệm và kỹ năng.',
            note: 'Nghĩa "dựa trên" → (A); "instead" và "owing" thiếu "of" nên không đứng trước danh từ',
          },
        ],
      },
    ],
    keyPoints: [
      'Sau chỗ trống là danh từ → giới từ; là mệnh đề → liên từ',
      'by = hạn chót; until = kéo dài đến',
      'Học giới từ theo cụm (comply with, eligible for, subject to)',
      'following, given, regarding là giới từ',
    ],
    practice: { part: 'P5', skillTag: 'grammar.preposition' },
  },
  {
    id: 'conjunction',
    module: 'grammar',
    title: 'Liên từ, trạng từ nối và liên từ cặp',
    summary:
      'Chọn liên từ theo cấu trúc câu và theo nghĩa, phân biệt với however, therefore và nắm các cặp either…or, not only…but also',
    minutes: 20,
    parts: ['P5', 'P6'],
    sections: [
      {
        heading: 'Liên từ và trạng từ nối khác nhau thế nào',
        paragraphs: [
          'Liên từ phụ thuộc (although, because, unless, once, while) nối hai mệnh đề trong cùng một câu. Trạng từ nối (however, therefore, moreover, nevertheless, consequently, otherwise) không nối được hai mệnh đề: nó đứng đầu câu mới hoặc sau dấu chấm phẩy, và thường có dấu phẩy theo sau.',
          'Nhìn dấu câu quanh chỗ trống: "; --------," hoặc ". --------," gần như chắc chắn cần trạng từ nối.',
        ],
        examples: [
          {
            en: 'The hotel near the venue was fully booked; --------, we found rooms at a nearby inn. (A) although (B) however (C) despite (D) because',
            vi: 'Khách sạn gần địa điểm đã kín phòng; tuy nhiên, chúng tôi tìm được phòng ở một nhà trọ gần đó.',
            note: 'Sau dấu chấm phẩy và trước dấu phẩy → trạng từ nối (B)',
          },
        ],
      },
      {
        heading: 'Chọn liên từ theo nghĩa',
        paragraphs: ['Khi các đáp án đều là liên từ, xét quan hệ giữa hai vế.'],
        bullets: [
          'Nguyên nhân: because, since, as, now that',
          'Nhượng bộ, tương phản: although, even though, while, whereas',
          'Điều kiện: if, unless (= if not), provided that, as long as, in case',
          'Mục đích: so that, in order that',
          'Thời gian: once, as soon as, until, before, after',
        ],
        examples: [
          {
            en: 'Staff may work from home on Fridays -------- their tasks are completed on schedule. (A) as long as (B) unless (C) whereas (D) so that',
            vi: 'Nhân viên được làm việc tại nhà vào thứ Sáu miễn là công việc hoàn thành đúng hạn.',
            note: 'Vế sau là điều kiện để được làm ở nhà → (A)',
          },
          {
            en: '-------- the budget was approved late, the project still finished on time. (A) Because (B) Even though (C) Unless (D) In case',
            vi: 'Dù ngân sách được duyệt muộn, dự án vẫn hoàn thành đúng hạn.',
            note: '"still" cho thấy hai vế trái ngược → nhượng bộ (B)',
          },
        ],
      },
      {
        heading: 'Liên từ cặp',
        paragraphs: [
          'Thấy nửa đầu của cặp trong câu thì tìm nửa sau tương ứng. Hai vế được nối phải cùng dạng (danh từ với danh từ, tính từ với tính từ, to V với to V).',
        ],
        bullets: [
          'both A and B',
          'either A or B; neither A nor B',
          'not only A but (also) B',
          'whether A or B',
        ],
        examples: [
          {
            en: 'Payment can be made either by credit card -------- by bank transfer. (A) and (B) nor (C) or (D) but',
            vi: 'Có thể thanh toán bằng thẻ tín dụng hoặc chuyển khoản.',
            note: 'either đi với or → (C)',
          },
          {
            en: 'The new model is not only lighter -------- more energy-efficient. (A) but also (B) as well (C) and so (D) or else',
            vi: 'Mẫu mới không chỉ nhẹ hơn mà còn tiết kiệm điện hơn.',
            note: 'not only đi với but also → (A)',
          },
        ],
      },
      {
        heading: 'Bẫy ở mức 800+',
        paragraphs: [
          'Ở Part 6, trạng từ nối đầu câu phụ thuộc vào quan hệ với câu trước, nên phải đọc cả câu trước. Nevertheless (tuy vậy) nối ý trái ngược; therefore (vì vậy) nối kết quả; otherwise (nếu không thì) nêu hậu quả khi không làm theo; similarly nối ý giống nhau.',
          'Phân biệt so that (để mà, chỉ mục đích) với so (nên, chỉ kết quả), và unless với if not: không thêm not sau unless.',
        ],
        examples: [
          {
            en: 'Our main office will be closed on Monday for a public holiday. --------, customer support will remain available by phone. (A) Therefore (B) Otherwise (C) Nevertheless (D) Similarly',
            vi: 'Văn phòng chính sẽ đóng cửa thứ Hai vì ngày lễ. Tuy vậy, bộ phận hỗ trợ khách hàng vẫn làm việc qua điện thoại.',
            note: 'Đóng cửa nhưng vẫn hỗ trợ → tương phản (C)',
          },
          {
            en: 'Please confirm your attendance by Friday; --------, your seat may be given to another participant. (A) otherwise (B) moreover (C) instead (D) therefore',
            vi: 'Vui lòng xác nhận tham dự trước thứ Sáu; nếu không, chỗ của bạn có thể được nhường cho người khác.',
            note: 'Vế sau là hậu quả nếu không xác nhận → (A)',
          },
        ],
      },
    ],
    keyPoints: [
      'Dấu chấm phẩy hoặc đầu câu + dấu phẩy → trạng từ nối',
      'Hai mệnh đề trong một câu → liên từ, chọn theo quan hệ nghĩa',
      'Thấy either, neither, both, not only, whether → tìm nửa còn lại',
      'Part 6: đọc câu trước rồi mới chọn từ nối',
    ],
    practice: { part: 'P5', skillTag: 'grammar.conjunction' },
  },
  {
    id: 'relative-clause',
    module: 'grammar',
    title: 'Mệnh đề quan hệ',
    summary:
      'Chọn who, whom, which, that, whose, what theo vai trò trong mệnh đề, và nhận ra mệnh đề quan hệ rút gọn',
    minutes: 18,
    parts: ['P5', 'P6'],
    sections: [
      {
        heading: 'Chọn đại từ quan hệ',
        paragraphs: [
          'Xét hai điều: danh từ đứng trước là người hay vật, và trong mệnh đề sau chỗ trống còn thiếu chủ ngữ, tân ngữ hay đã đủ.',
        ],
        bullets: [
          'who: người, làm chủ ngữ (theo sau là động từ)',
          'whom: người, làm tân ngữ (theo sau là chủ ngữ + động từ)',
          'which: vật; that: người hoặc vật, nhưng không đứng sau dấu phẩy và không đứng sau giới từ',
          'whose + danh từ: sở hữu, dùng cho cả người và vật; mệnh đề sau đã đủ thành phần',
        ],
        examples: [
          {
            en: 'The consultant -------- we hired last month has already reduced our costs. (A) whom (B) whose (C) which (D) what',
            vi: 'Chuyên gia tư vấn chúng tôi thuê tháng trước đã giúp giảm chi phí.',
            note: 'Danh từ chỉ người, mệnh đề "we hired" thiếu tân ngữ → (A)',
          },
          {
            en: 'Candidates -------- applications are incomplete will not be considered. (A) who (B) whom (C) whose (D) which',
            vi: 'Ứng viên có hồ sơ chưa đầy đủ sẽ không được xét.',
            note: 'Sau chỗ trống là danh từ "applications" và mệnh đề đã đủ → sở hữu (C)',
          },
        ],
      },
      {
        heading: 'Giới từ + which, where, when và what',
        paragraphs: [
          'Giới từ + which / whom thay cho nơi chốn, thời điểm hoặc cụm giới từ trong mệnh đề (in which = where). What nghĩa là "điều mà", không có danh từ đứng trước.',
        ],
        examples: [
          {
            en: 'The building in -------- the seminar will be held is under renovation. (A) that (B) which (C) where (D) whom',
            vi: 'Tòa nhà nơi tổ chức hội thảo đang được sửa chữa.',
            note: 'Sau giới từ "in", chỉ vật → which (B); "that" không đứng sau giới từ',
          },
          {
            en: '-------- our clients need most is a faster delivery service. (A) That (B) Which (C) What (D) Whose',
            vi: 'Điều khách hàng cần nhất là dịch vụ giao hàng nhanh hơn.',
            note: 'Không có danh từ đứng trước, cần nghĩa "điều mà" → (C)',
          },
        ],
      },
      {
        heading: 'Mệnh đề quan hệ rút gọn',
        paragraphs: [
          'Khi đại từ quan hệ làm chủ ngữ, có thể bỏ nó cùng động từ be: V-ing nếu chủ động, V3 nếu bị động. Sau the first, the last, the only có thể rút gọn thành to V.',
        ],
        examples: [
          {
            en: 'Passengers -------- on international flights should arrive two hours early. (A) depart (B) departing (C) departed (D) who departing',
            vi: 'Hành khách bay quốc tế nên đến sớm hai tiếng.',
            note: 'Động từ chính là "should arrive"; hành khách tự khởi hành → V-ing (B); (D) sai vì "who" cần động từ chia thì',
          },
        ],
      },
      {
        heading: 'Bẫy ở mức 800+',
        paragraphs: [
          'Sau lượng từ + of (most of, some of, all of, none of) dùng whom cho người và which cho vật, không dùng them hay who. Dấu phẩy + which có thể thay cho cả mệnh đề phía trước.',
          'Động từ trong mệnh đề quan hệ chia theo danh từ mà đại từ thay thế: "the reports that were…" nhưng "the report that was…".',
        ],
        examples: [
          {
            en: 'The company hired twenty new staff members, most of -------- have experience in logistics. (A) them (B) whom (C) who (D) which',
            vi: 'Công ty tuyển hai mươi nhân viên mới, phần lớn trong số đó có kinh nghiệm hậu cần.',
            note: '"them" sẽ tạo hai mệnh đề không có liên từ; sau giới từ "of", chỉ người → (B)',
          },
          {
            en: 'The firm offers flexible working hours, -------- has helped it attract skilled workers. (A) that (B) what (C) which (D) who',
            vi: 'Công ty cho làm giờ linh hoạt, điều này giúp công ty thu hút lao động giỏi.',
            note: 'Sau dấu phẩy, thay cho cả ý phía trước → (C); "that" không đứng sau dấu phẩy',
          },
        ],
      },
    ],
    keyPoints: [
      'Sau chỗ trống là động từ → who / which; là chủ ngữ + động từ → whom / which',
      'Sau chỗ trống là danh từ và mệnh đề đã đủ → whose',
      'that không đứng sau dấu phẩy và giới từ',
      'Không có danh từ phía trước, nghĩa "điều mà" → what',
    ],
    practice: { part: 'P5', skillTag: 'grammar.relative-clause' },
  },
  {
    id: 'comparison',
    module: 'grammar',
    title: 'So sánh hơn, so sánh nhất và so sánh bằng',
    summary:
      'Nhận ra dạng so sánh qua than, the, as…as và chọn đúng từ nhấn mạnh như much, far, by far',
    minutes: 15,
    parts: ['P5', 'P6'],
    sections: [
      {
        heading: 'Tín hiệu của ba dạng so sánh',
        paragraphs: [
          'Câu so sánh thường cho bốn dạng của một tính từ (high, higher, highest, highly). Tìm từ đi kèm để biết dạng cần dùng.',
        ],
        bullets: [
          'than → so sánh hơn: higher than, more efficient than',
          'the + … + of / in / among, ever, one of the + danh từ số nhiều → so sánh nhất',
          'as + … + as → nguyên dạng',
        ],
        examples: [
          {
            en: 'Sales in the third quarter were -------- than analysts had predicted. (A) high (B) higher (C) highest (D) highly',
            vi: 'Doanh số quý ba cao hơn dự đoán của các nhà phân tích.',
            note: 'Có "than" → so sánh hơn (B)',
          },
          {
            en: 'Ms. Park is one of the -------- engineers in the department. (A) experienced (B) more experienced (C) most experienced (D) experience',
            vi: 'Cô Park là một trong những kỹ sư giàu kinh nghiệm nhất phòng.',
            note: 'one of the + số nhiều → so sánh nhất (C)',
          },
        ],
      },
      {
        heading: 'Từ nhấn mạnh và cấu trúc càng…càng',
        paragraphs: [
          'Trước so sánh hơn dùng much, far, even, still, a lot, significantly, considerably; không dùng very. Trước so sánh nhất dùng by far hoặc the very. Cấu trúc "The + so sánh hơn…, the + so sánh hơn…" nghĩa là càng… càng….',
        ],
        examples: [
          {
            en: 'The updated software runs -------- faster than the previous version. (A) very (B) much (C) so (D) more',
            vi: 'Phần mềm cập nhật chạy nhanh hơn nhiều so với bản trước.',
            note: 'Trước "faster than" cần từ nhấn mạnh so sánh hơn → (B)',
          },
          {
            en: 'The -------- you submit your application, the sooner you will receive a reply. (A) early (B) earlier (C) earliest (D) more early',
            vi: 'Nộp hồ sơ càng sớm, bạn càng nhận phản hồi sớm.',
            note: 'Cấu trúc the + so sánh hơn, the + so sánh hơn → (B)',
          },
        ],
      },
      {
        heading: 'So sánh bằng',
        paragraphs: [
          'Giữa as…as, chọn tính từ hay trạng từ theo từ mà nó bổ nghĩa: sau be dùng tính từ, bổ nghĩa cho động từ thường dùng trạng từ. Lưu ý the same as, twice as + adj + as, as many / as much as.',
        ],
        examples: [
          {
            en: 'Our support team responded as -------- as possible to the outage. (A) quick (B) quickly (C) quicker (D) quickest',
            vi: 'Đội hỗ trợ đã phản hồi sự cố nhanh nhất có thể.',
            note: 'Bổ nghĩa cho động từ "responded" → trạng từ nguyên dạng (B)',
          },
        ],
      },
      {
        heading: 'Bẫy ở mức 800+',
        paragraphs: [
          'Khi chỉ có hai đối tượng (of the two), dùng the + so sánh hơn, không dùng so sánh nhất. Superior, inferior, prior, senior, junior đi với to chứ không đi với than.',
          'Most + danh từ (không có the) nghĩa là "hầu hết", không phải so sánh nhất. Ở Part 6, so sánh hơn có thể không có than khi vật được so đã nêu ở câu trước.',
        ],
        examples: [
          {
            en: 'Of the two candidates, Mr. Silva is the -------- qualified. (A) much (B) more (C) most (D) many',
            vi: 'Trong hai ứng viên, anh Silva có trình độ phù hợp hơn.',
            note: '"Of the two" → the + so sánh hơn (B)',
          },
          {
            en: 'The new engine is superior -------- its predecessor in fuel efficiency. (A) than (B) to (C) over (D) from',
            vi: 'Động cơ mới vượt trội hơn đời trước về hiệu quả nhiên liệu.',
            note: 'superior to → (B); "than" là bẫy vì nghĩa giống so sánh hơn',
          },
        ],
      },
    ],
    keyPoints: [
      'than → so sánh hơn; the … of / in, one of the → so sánh nhất',
      'much, far, even + so sánh hơn; không dùng very',
      'Of the two → the + so sánh hơn',
      'superior, inferior, prior đi với to',
    ],
    practice: { part: 'P5', skillTag: 'grammar.comparison' },
  },
  {
    id: 'inversion-conditional',
    module: 'grammar',
    title: 'Câu điều kiện, giả định và đảo ngữ',
    summary:
      'Nắm ba loại câu điều kiện, dạng đảo Should / Were / Had, câu giả định với that và đảo ngữ sau trạng từ phủ định',
    minutes: 25,
    parts: ['P5', 'P6'],
    sections: [
      {
        heading: 'Ba loại câu điều kiện',
        paragraphs: [
          'Nhìn động từ ở vế có sẵn để suy ra vế còn lại. Đề TOEIC chủ yếu ra loại 1 (thư từ, thông báo) và loại 3 (tiếc nuối về việc đã qua).',
        ],
        bullets: [
          'Loại 1 (có thể xảy ra): If + hiện tại, will / can / may + V hoặc câu mệnh lệnh',
          'Loại 2 (trái hiện tại): If + quá khứ (be → were), would / could + V',
          'Loại 3 (trái quá khứ): If + had V3, would / could have V3',
        ],
        examples: [
          {
            en: 'If the shipment -------- late again, we will look for another supplier. (A) arrives (B) will arrive (C) arrived (D) had arrived',
            vi: 'Nếu hàng lại đến trễ, chúng tôi sẽ tìm nhà cung cấp khác.',
            note: 'Vế chính có "will" → loại 1, vế if dùng hiện tại (A)',
          },
          {
            en: 'If we had received the invoice earlier, we -------- it on time. (A) pay (B) will pay (C) would pay (D) would have paid',
            vi: 'Nếu nhận hóa đơn sớm hơn thì chúng tôi đã thanh toán đúng hạn.',
            note: 'Vế if là "had received" → loại 3 (D)',
          },
        ],
      },
      {
        heading: 'Đảo ngữ trong câu điều kiện',
        paragraphs: [
          'Có thể bỏ if và đưa trợ động từ lên đầu. Dạng này rất hay gặp ở cuối thư và thông báo, nên cần nhận ra ngay.',
        ],
        bullets: [
          'Should + S + V nguyên mẫu = If + S + hiện tại (loại 1, lịch sự): Should you need help, …',
          'Were + S + to V / Were + S + … = If + S + were … (loại 2)',
          'Had + S + V3 = If + S + had V3 (loại 3)',
        ],
        examples: [
          {
            en: 'Should you -------- further assistance, please call our help desk. (A) requiring (B) require (C) required (D) requires',
            vi: 'Nếu cần thêm hỗ trợ, vui lòng gọi bộ phận trợ giúp.',
            note: 'Should đảo lên đầu, động từ theo sau ở dạng nguyên mẫu → (B)',
          },
          {
            en: '-------- we known about the road closure, we would have left earlier. (A) If (B) Had (C) Should (D) Were',
            vi: 'Nếu biết đường bị chặn thì chúng tôi đã đi sớm hơn.',
            note: '"known" là V3 và vế sau là "would have left" → đảo loại 3 (B); "If we known" sai ngữ pháp',
          },
        ],
      },
      {
        heading: 'Câu giả định với that',
        paragraphs: [
          'Sau các tính từ essential, important, necessary, vital, imperative và các động từ recommend, suggest, request, require, insist, ask + that, động từ trong mệnh đề that dùng nguyên mẫu (không thêm s, không chia thì), kể cả với chủ ngữ số ít. Bị động là be + V3.',
        ],
        examples: [
          {
            en: 'It is essential that every participant -------- the safety guidelines. (A) follow (B) follows (C) followed (D) following',
            vi: 'Điều quan trọng là mọi người tham gia phải tuân thủ hướng dẫn an toàn.',
            note: '"It is essential that" → nguyên mẫu (A); "follows" là bẫy vì chủ ngữ số ít',
          },
          {
            en: 'The director requested that the report -------- by noon. (A) submits (B) is submitted (C) be submitted (D) was submitted',
            vi: 'Giám đốc yêu cầu báo cáo được nộp trước buổi trưa.',
            note: '"requested that" + báo cáo được nộp → giả định bị động be + V3 (C)',
          },
        ],
      },
      {
        heading: 'Đảo ngữ sau trạng từ phủ định',
        paragraphs: [
          'Khi never, rarely, seldom, hardly, not only, only after, only when, under no circumstances đứng đầu câu, trợ động từ đứng trước chủ ngữ như câu hỏi. Ngoài ra, các câu như "Attached is…", "Enclosed are…" có chủ ngữ thật đứng sau động từ, nên động từ chia theo danh từ phía sau.',
        ],
        examples: [
          {
            en: 'Rarely -------- the factory missed a delivery deadline. (A) has (B) have (C) did (D) does',
            vi: 'Nhà máy hiếm khi lỡ hạn giao hàng.',
            note: 'Đảo ngữ sau "Rarely"; "missed" là V3 nên cần "has" (chủ ngữ số ít) → (A)',
          },
          {
            en: 'Enclosed -------- the documents you requested last week. (A) is (B) are (C) has (D) be',
            vi: 'Kèm theo đây là các tài liệu anh chị yêu cầu tuần trước.',
            note: 'Chủ ngữ thật là "the documents" (số nhiều) đứng sau → (B)',
          },
        ],
      },
      {
        heading: 'Bẫy ở mức 800+',
        paragraphs: [
          'Unless đã mang nghĩa phủ định (= if not), nên vế sau unless không thêm not và vẫn dùng hiện tại cho tương lai. Without / but for + danh từ có thể thay cả vế if trong câu loại 2 và 3. Provided that, as long as, in case cũng là liên từ điều kiện, đi với mệnh đề.',
        ],
        examples: [
          {
            en: 'Unless the client -------- the contract by Friday, the order will be cancelled. (A) signs (B) does not sign (C) will sign (D) signed',
            vi: 'Nếu khách hàng không ký hợp đồng trước thứ Sáu, đơn hàng sẽ bị hủy.',
            note: 'Unless đã có nghĩa phủ định; mệnh đề điều kiện dùng hiện tại → (A)',
          },
          {
            en: '-------- the support of our sponsors, this festival would not be possible. (A) Without (B) Unless (C) Except (D) Despite',
            vi: 'Nếu không có sự hỗ trợ của nhà tài trợ, lễ hội này sẽ không thể diễn ra.',
            note: 'Theo sau là cụm danh từ và vế chính là "would not be" → Without (A); "Unless" cần mệnh đề',
          },
        ],
      },
    ],
    keyPoints: [
      'Vế chính có will → vế if hiện tại; would have V3 → had V3',
      'Should / Were / Had đứng đầu câu là if bị lược',
      'essential that, request that + V nguyên mẫu, kể cả chủ ngữ số ít',
      'Trạng từ phủ định đầu câu → trợ động từ trước chủ ngữ',
    ],
    practice: { part: 'P5' },
  },
]
