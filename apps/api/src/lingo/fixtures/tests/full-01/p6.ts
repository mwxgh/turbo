/** Full Test 01, Part 6: written for Lingo (not from ETS). */
export const P6: object[] = [
  {
    difficulty: 'EASY',
    topic: 'Dining',
    passage:
      'To: Grace Whitfield <g.whitfield@calderaarchitects.com>\nFrom: Omar Haddad <events@saffronandsage.com>\nDate: April 8\nSubject: Menu tasting\n\nDear Ms. Whitfield,\n\nThank you for choosing Saffron & Sage to cater your firm’s twentieth-anniversary dinner on May 16. As we [1] on the phone yesterday, your menu tasting is scheduled for Friday, April 18, at 2:00 P.M. at our kitchen on Dalton Avenue. You will sample three starters, two main courses, and a dessert, and you are welcome to bring up to two [2] with you. [3]. That way, our chef can prepare suitable alternatives in advance. Please reply to this e-mail [4] you need to change the appointment.\n\nBest regards,\n\nOmar Haddad\nEvent Coordinator',
    questions: [
      {
        options: ['discuss', 'are discussing', 'discussed', 'will discuss'],
        answer: 2,
        explanationVi:
          '"on the phone yesterday" → việc đã xảy ra trong quá khứ → quá khứ đơn "discussed". "discuss", "are discussing" là hiện tại; "will discuss" là tương lai, mâu thuẫn với "yesterday".',
        skillTags: ['grammar.verb-tense'],
      },
      {
        options: ['colleagues', 'colleague', 'collegial', 'collegially'],
        answer: 0,
        explanationVi:
          'Sau số đếm "two" cần danh từ số nhiều → "colleagues". "colleague" là số ít; "collegial" (tính từ) và "collegially" (trạng từ) không đứng sau số đếm.',
        skillTags: ['grammar.word-form'],
      },
      {
        options: [
          'Our restaurant has recently been renovated.',
          'The final invoice will be sent after the event.',
          'Dinner will be served at 7:00 P.M. sharp.',
          'Please let us know by April 15 if any guests have food allergies.',
        ],
        answer: 3,
        explanationVi:
          'Câu sau: "That way, our chef can prepare suitable alternatives in advance" → câu trước phải nêu thông tin giúp đầu bếp chuẩn bị món thay thế → báo trước dị ứng thực phẩm (D). (A), (B), (C) không giải thích được "alternatives".',
        translationVi: 'Câu nào phù hợp nhất để điền vào chỗ [3]?',
        skillTags: ['comprehension.sentence-insertion'],
      },
      {
        options: ['unless', 'if', 'whereas', 'so that'],
        answer: 1,
        explanationVi:
          '"Hãy trả lời email này nếu chị cần đổi lịch" → điều kiện "if". "unless" (trừ khi) ngược nghĩa; "whereas" chỉ sự đối lập; "so that" chỉ mục đích.',
        skillTags: ['grammar.conjunction'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Finance',
    passage:
      'NOTICE TO CUSTOMERS\n\nOn Monday, June 9, the Fairmont Street branch of Unity Coast Bank will move to 210 Harbor Road. The new branch is [1] larger than our current one and includes a private room for meetings with our financial advisers. [2]. Your account numbers, cards, and online banking details will stay the same, so no action is required on your part. [3], the ATM on Fairmont Street will be removed on June 6, three days before the move. During that period, please use the ATM at our Linwood Plaza branch. For directions to Harbor Road, [4] our Web site or ask any member of our staff.',
    questions: [
      {
        options: ['consider', 'considerably', 'considerable', 'consideration'],
        answer: 1,
        explanationVi:
          'Bổ nghĩa cho tính từ so sánh "larger" cần trạng từ → "considerably larger" (lớn hơn đáng kể). "considerable" là tính từ, "consideration" là danh từ, "consider" là động từ.',
        skillTags: ['grammar.word-form'],
      },
      {
        options: [
          'Our interest rates are the lowest in the region.',
          'The Linwood Plaza branch will close permanently.',
          'Please bring two forms of identification to open an account.',
          'Its opening hours will also be extended until 6:00 P.M. on weekdays.',
        ],
        answer: 3,
        explanationVi:
          'Câu trước kể ưu điểm của chi nhánh mới (rộng hơn, có phòng riêng) → (D) "giờ mở cửa cũng được kéo dài" nối tiếp bằng "also" và "Its" = the new branch; câu sau chuyển sang việc khách không cần làm gì. (B) mâu thuẫn vì sau đó khách được hướng dẫn dùng ATM ở Linwood Plaza; (A), (C) lạc đề.',
        translationVi: 'Câu nào phù hợp nhất để điền vào chỗ [2]?',
        skillTags: ['comprehension.sentence-insertion'],
      },
      {
        options: ['However', 'Therefore', 'For instance', 'Likewise'],
        answer: 0,
        explanationVi:
          'Câu trước: "no action is required"; câu sau: ATM bị gỡ ba ngày trước khi chuyển → có điều bất tiện ngược với ý trước → "However". "Therefore" (vì vậy), "For instance" (ví dụ), "Likewise" (tương tự) không thể hiện sự tương phản.',
        skillTags: ['grammar.conjunction'],
      },
      {
        options: ['attend', 'arrive', 'visit', 'look'],
        answer: 2,
        explanationVi:
          '"visit our Web site" là cụm cố định (truy cập trang web). "attend" dùng cho sự kiện; "arrive" cần "at"; "look" cần "at" và sai nghĩa.',
        skillTags: ['vocab.collocation'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'HR',
    passage:
      'MEMO\n\nTo: All department managers\nFrom: Rachel Osei, Human Resources\nDate: February 3\nRe: Mentoring program\n\nStarting in March, every new employee at Tallis Engineering will be paired with an experienced colleague from another department. The goal is to help new staff become [1] with the way the company works and to build connections outside their own teams. Over the past year, several new hires [2] that they felt isolated during their first months here. Mentors will meet their partners once a month for six months, and these meetings may take place during regular working hours. We are now looking for experienced employees to act as mentors. Participation is [3]; however, it will be recognized in annual performance reviews. [4]. Please forward this memo to anyone on your team who might be interested.',
    questions: [
      {
        options: ['familiarize', 'familiarity', 'familiarly', 'familiar'],
        answer: 3,
        explanationVi:
          'Sau động từ nối "become" cần tính từ, và cụm cố định là "familiar with" (quen thuộc với) → "familiar". "familiarize" là động từ, "familiarity" là danh từ, "familiarly" là trạng từ.',
        skillTags: ['grammar.word-form'],
      },
      {
        options: ['will report', 'have reported', 'are reporting', 'reporting'],
        answer: 1,
        explanationVi:
          '"Over the past year" (trong năm qua, tính đến nay) → hiện tại hoàn thành "have reported". "will report" là tương lai; "are reporting" không hợp với khoảng thời gian đã qua; "reporting" thiếu trợ động từ nên câu không có động từ chính.',
        skillTags: ['grammar.verb-tense'],
      },
      {
        options: ['mandatory', 'temporary', 'voluntary', 'permanent'],
        answer: 2,
        explanationVi:
          '"Participation is ___; however, it will be recognized…" → "however" cho thấy hai vế tương phản: tham gia là tự nguyện nhưng vẫn được ghi nhận → "voluntary". "mandatory" (bắt buộc) mâu thuẫn với "We are now looking for…" và "might be interested"; "temporary", "permanent" không hợp nghĩa.',
        skillTags: ['vocab.meaning'],
      },
      {
        options: [
          'Employees who would like to take part should sign up on the HR portal by February 20.',
          'New employees must complete their safety training in their first week.',
          'The program was discontinued last year because of low interest.',
          'Department budgets will be reviewed at the end of the quarter.',
        ],
        answer: 0,
        explanationVi:
          'Câu trước mời tham gia làm mentor, câu sau "forward this memo to anyone… who might be interested" → cần câu hướng dẫn cách đăng ký (A). (C) mâu thuẫn vì chương trình bắt đầu từ tháng 3; (B), (D) lạc đề.',
        translationVi: 'Câu nào phù hợp nhất để điền vào chỗ [4]?',
        skillTags: ['comprehension.sentence-insertion'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Retail',
    passage:
      'FOR IMMEDIATE RELEASE\nContact: Inès Moreau, Communications Manager\n\nPORTLAND (September 12) — Trailcrest Outfitters, a retailer of outdoor clothing and camping gear, announced today that it will launch a repair-and-resale program at all 22 of its stores. [1]. Under the program, customers can bring in worn jackets, tents, and backpacks bearing the Trailcrest label. In exchange, they will receive store credit worth up to 30 percent of the original price. Items that can be fixed will be repaired by in-store technicians and resold at reduced prices, [2] those beyond repair will be recycled. "Our customers have been asking us to cut waste for years," said CEO Daniel Kwan. Trailcrest [3] to collect more than 50,000 items in the program’s first year. The program will begin on October 1, [4] with the company’s twenty-fifth anniversary.',
    questions: [
      {
        options: [
          'The initiative is intended to extend the life of the products the company sells.',
          'Trailcrest also sells its products online through its Web site.',
          'Store hours will be shortened during the winter season.',
          'Repair services will no longer be offered at any location.',
        ],
        answer: 0,
        explanationVi:
          'Câu trước công bố chương trình sửa chữa và bán lại; câu sau "Under the program…" giải thích cách hoạt động → (A) nêu mục đích của "the initiative" (= chương trình vừa công bố) là cầu nối hợp lý. (D) mâu thuẫn với việc sửa chữa tại cửa hàng; (B), (C) lạc đề và làm đứt mạch "Under the program".',
        translationVi: 'Câu nào phù hợp nhất để điền vào chỗ [1]?',
        skillTags: ['comprehension.sentence-insertion'],
      },
      {
        options: ['because', 'so that', 'while', 'unless'],
        answer: 2,
        explanationVi:
          'Hai vế đối lập: món sửa được thì bán lại, còn món không sửa được thì tái chế → "while" (trong khi đó). "because" (vì), "so that" (để), "unless" (trừ khi) sai quan hệ nghĩa.',
        skillTags: ['grammar.conjunction'],
      },
      {
        options: [
          'had expected',
          'expects',
          'was expected',
          'has been expected',
        ],
        answer: 1,
        explanationVi:
          'Thông cáo báo chí nói về kỳ vọng hiện tại cho một chương trình chưa bắt đầu ("will launch", "will begin") → hiện tại đơn chủ động "expects". "had expected", "was expected" là quá khứ, ngụ ý kỳ vọng đã qua; "has been expected" là bị động, không hợp với chủ ngữ Trailcrest tự đặt mục tiêu thu gom.',
        skillTags: ['grammar.verb-tense'],
      },
      {
        options: ['celebrated', 'occurring', 'combining', 'coinciding'],
        answer: 3,
        explanationVi:
          '"coincide with" = trùng thời điểm với → chương trình bắt đầu đúng dịp kỷ niệm 25 năm. "celebrated", "occurring" không đi với "with" theo nghĩa này; "combining with" (kết hợp với) sai nghĩa.',
        skillTags: ['vocab.collocation'],
      },
    ],
  },
]
