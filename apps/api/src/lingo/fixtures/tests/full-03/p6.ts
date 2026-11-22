/** Full Test 03, Part 6: written for Lingo (not from ETS). */
export const P6: object[] = [
  {
    difficulty: 'EASY',
    topic: 'Agriculture',
    passage:
      'To: Members of Fallowfield Seed Cooperative\nFrom: Bridget Amankwah <orders@fallowfieldseed.org>\nDate: 3 February\nSubject: Spring seed collection\n\nDear Members,\n\nYour spring seed orders [1] for collection at our warehouse on Tillman Road on Saturday, 22 February, between 8:00 A.M. and 1:00 P.M. Please bring your member card, as we will release each order only to the person [2] name is on the account. If you cannot come on that day, you may ask another member to collect your order for you. Simply e-mail us that person’s name by 20 February. [3]. Please note that orders not collected by 1 March will be returned to stock.\n\nThank you for your [4] while we prepared this year’s orders. We look forward to seeing you.\n\nBridget Amankwah\nMember Services',
    questions: [
      {
        options: [
          'were available',
          'have been available',
          'will be available',
          'being available',
        ],
        answer: 2,
        explanationVi:
          'Ngày nhận hàng là thứ Bảy 22/2, sau ngày viết email (3/2) → tương lai "will be available". "were" và "have been" chỉ quá khứ; "being available" không phải động từ chính nên câu thiếu vị ngữ.',
        skillTags: ['grammar.verb-tense'],
      },
      {
        options: ['whose', 'who', 'whom', 'which'],
        answer: 0,
        explanationVi:
          'Sau chỗ trống là danh từ "name" thuộc về "the person" → đại từ quan hệ sở hữu "whose". "who/whom" không đứng trước danh từ để chỉ sở hữu; "which" dùng cho vật.',
        skillTags: ['grammar.relative-clause'],
      },
      {
        options: [
          'Seed prices are listed in our spring catalog.',
          'Our Tillman Road warehouse was built in 1998.',
          'We are now accepting applications from new members.',
          'That member will also need to show his or her own card.',
        ],
        answer: 3,
        explanationVi:
          'Câu trước nói có thể nhờ một thành viên khác nhận hộ → câu (D) bổ sung điều kiện cho chính người nhận hộ đó ("That member"), nối tiếp quy định phải mang thẻ hội viên. (A), (B), (C) không liên quan đến việc nhận hộ.',
        translationVi: 'Câu nào phù hợp nhất để điền vào chỗ [3]?',
        skillTags: ['comprehension.sentence-insertion'],
      },
      {
        options: ['patient', 'patience', 'patiently', 'patients'],
        answer: 1,
        explanationVi:
          'Sau tính từ sở hữu "your" cần danh từ → "patience" (sự kiên nhẫn). "patients" cũng là danh từ nhưng nghĩa là "bệnh nhân", không hợp ngữ cảnh; "patient" là tính từ, "patiently" là trạng từ.',
        skillTags: ['grammar.word-form'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Banking',
    passage:
      'NOTICE TO CARDHOLDERS\n\nOver the next six weeks, Wexford Valley Credit Union will be replacing all debit cards with new contactless cards. You do not need to [1] a new card; it will be sent by post to the address we have on file for you. Your current card will continue to work [2] you activate the new one. To do so, simply make a purchase or withdraw cash using your PIN. [3]. Please note that the new cards [4] by a different manufacturer, so they will look slightly different from your current ones. If you have moved recently, please update your address in our app before 15 May.',
    questions: [
      {
        options: ['remind', 'inform', 'notify', 'request'],
        answer: 3,
        explanationVi:
          '"request a new card" = yêu cầu cấp thẻ mới, hợp với ý thẻ sẽ tự động được gửi qua bưu điện. "remind / inform / notify" cần tân ngữ là người (nhắc/báo cho ai), không đi với "a new card".',
        skillTags: ['vocab.meaning'],
      },
      {
        options: ['while', 'until', 'because', 'whereas'],
        answer: 1,
        explanationVi:
          'Thẻ cũ vẫn dùng được cho đến khi kích hoạt thẻ mới → "until". "while" (trong khi), "because" (vì) và "whereas" (trái lại) không diễn tả mốc kết thúc.',
        skillTags: ['grammar.conjunction'],
      },
      {
        options: [
          'Your old card will then stop working and should be cut in half.',
          'Members can now apply for car loans online.',
          'Our branches are open until 6:00 P.M. on Thursdays.',
          'Contactless payments are accepted at most shops.',
        ],
        answer: 0,
        explanationVi:
          'Câu trước hướng dẫn kích hoạt thẻ mới; (A) nói điều xảy ra sau đó ("then"): thẻ cũ ngừng hoạt động và nên cắt đôi — khớp với ý "thẻ cũ dùng đến khi kích hoạt thẻ mới". (D) nhắc thanh toán không chạm nhưng không nối tiếp việc kích hoạt; (B), (C) lạc đề.',
        translationVi: 'Câu nào phù hợp nhất để điền vào chỗ [3]?',
        skillTags: ['comprehension.sentence-insertion'],
      },
      {
        options: [
          'produce',
          'are producing',
          'have been produced',
          'had produced',
        ],
        answer: 2,
        explanationVi:
          'Chủ ngữ "the new cards" chịu tác động và có "by a different manufacturer" → cần bị động: "have been produced". Ba đáp án còn lại đều là chủ động, thẻ không thể tự sản xuất.',
        skillTags: ['grammar.verb-form'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Energy',
    passage:
      'Halvorsen Heating Expands Training Centre\n\nDURHAM (14 October) — Halvorsen Heating, a regional installer of heat pumps, announced on Monday that it will double the size of its training centre in Spennymoor. The expansion comes as demand for heat pumps continues to rise, [1] by a government grant that covers up to half the cost of replacing a gas boiler.\n\n"Our order book is full until next summer," said managing director Ingrid Halvorsen. "What holds us back is not demand but the [2] of qualified installers."\n\nThe enlarged centre will be able to train 120 apprentices a year, up from 50. Apprentices are paid [3] their training and are guaranteed a position with the company if they complete the eighteen-month course. [4].',
    questions: [
      {
        options: ['driven', 'driving', 'drives', 'to drive'],
        answer: 0,
        explanationVi:
          'Nhu cầu "được thúc đẩy bởi" khoản trợ cấp → phân từ quá khứ mang nghĩa bị động "driven by". "driving" mang nghĩa chủ động (nhu cầu thúc đẩy trợ cấp) — sai logic; "drives" là động từ chia, không đứng sau dấu phẩy như vậy; "to drive" chỉ mục đích.',
        skillTags: ['grammar.verb-form'],
      },
      {
        options: ['surplus', 'popularity', 'shortage', 'arrival'],
        answer: 2,
        explanationVi:
          'Điều kìm hãm công ty là "sự thiếu hụt" thợ lắp đặt có tay nghề → "shortage". "surplus" (dư thừa) ngược nghĩa; "popularity" (sự phổ biến) và "arrival" (sự đến) không thể "hold back" việc kinh doanh. Câu sau (mở rộng đào tạo) cũng xác nhận đang thiếu người.',
        skillTags: ['vocab.meaning'],
      },
      {
        options: ['along', 'throughout', 'among', 'beside'],
        answer: 1,
        explanationVi:
          '"paid throughout their training" = được trả lương suốt thời gian đào tạo. "among" dùng cho một nhóm người/vật; "along" và "beside" chỉ vị trí không gian.',
        skillTags: ['grammar.preposition'],
      },
      {
        options: [
          'Gas boilers remain the most common heating system in the region.',
          'The grant was introduced to reduce household energy bills.',
          'Customers can request a free quote on the company’s Web site.',
          'The first group to train at the larger centre will begin in January.',
        ],
        answer: 3,
        explanationVi:
          'Đoạn cuối nói về học viên và khoá học 18 tháng ở trung tâm mở rộng → (D) kết thúc tự nhiên bằng mốc khoá đầu tiên ở trung tâm mới. (A), (B) quay lại chuyện nồi hơi và trợ cấp ở đoạn 1; (C) nói về khách hàng, lạc khỏi chủ đề đào tạo.',
        translationVi: 'Câu nào phù hợp nhất để điền vào chỗ [4]?',
        skillTags: ['comprehension.sentence-insertion'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Finance',
    passage:
      'MEMO\n\nTo: All staff\nFrom: Oluwaseun Adeyemi, Finance Director\nDate: 9 June\nRe: Changes to expense claims\n\nFrom 1 July, all expense claims must be submitted through Clearledger, the online system that the finance team has been testing since March. Paper forms will no longer be accepted, [1] for expenses incurred before the changeover. [2]. During the trial, claims made through Clearledger were repaid in an average of four days, compared with eleven days for paper claims.\n\nTo use the system, simply photograph each receipt with your phone; the amount, date and supplier will be read and entered for you. Claims above £500 will still need to be approved by a department head [3] payment is made.\n\nTraining sessions of about 30 minutes will be held throughout June. Staff who travel frequently are [4] encouraged to attend one.',
    questions: [
      {
        options: ['only', 'even', 'still', 'so'],
        answer: 1,
        explanationVi:
          '"even for expenses incurred before the changeover" = ngay cả với chi phí phát sinh trước ngày chuyển đổi → nhấn mạnh quy định áp dụng cho mọi trường hợp. "only for" sẽ mâu thuẫn với "no longer be accepted"; "still" và "so" không đứng trước cụm giới từ theo nghĩa này.',
        skillTags: ['vocab.meaning'],
      },
      {
        options: [
          'Please keep your paper receipts for at least seven years.',
          'Clearledger is also used by several of our clients.',
          'Department heads will receive their own training in May.',
          'The main benefit of the change is faster repayment.',
        ],
        answer: 3,
        explanationVi:
          'Câu sau đưa số liệu: hoàn tiền trung bình 4 ngày so với 11 ngày → (D) nêu lợi ích chính là hoàn tiền nhanh hơn, và câu sau là bằng chứng. (A) mâu thuẫn với việc chụp ảnh hoá đơn; (C) sai thời gian (đào tạo diễn ra trong tháng 6).',
        translationVi: 'Câu nào phù hợp nhất để điền vào chỗ [2]?',
        skillTags: ['comprehension.sentence-insertion'],
      },
      {
        options: ['so that', 'whereas', 'before', 'unless'],
        answer: 2,
        explanationVi:
          'Trưởng bộ phận phải duyệt "trước khi" thanh toán → "before". "unless" (trừ khi) và "whereas" (trong khi đó) sai logic; "so that" (để mà) biến việc duyệt thành mục đích của việc trả tiền.',
        skillTags: ['grammar.conjunction'],
      },
      {
        options: [
          'particularly',
          'particular',
          'particularity',
          'particularize',
        ],
        answer: 0,
        explanationVi:
          'Bổ nghĩa cho phân từ "encouraged" trong cụm "are … encouraged" → cần trạng từ "particularly" (đặc biệt). "particular" là tính từ, "particularity" là danh từ, "particularize" là động từ.',
        skillTags: ['grammar.word-form'],
      },
    ],
  },
]
