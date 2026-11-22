/** Full Test 02, Part 6: written for Lingo (not from ETS). */
export const P6: object[] = [
  {
    difficulty: 'EASY',
    topic: 'Hospitality',
    passage:
      'To: Lucia Fernandes <l.fernandes@brightwellpharma.com>\nFrom: Tomasz Nowak <groups@willowcourthotel.com>\nDate: 21 August\nSubject: Your group reservation\n\nDear Ms. Fernandes,\n\nThank you for booking fifteen rooms at the Willow Court Hotel for your sales team from 9 to 11 October. I am pleased to confirm that we [1] all fifteen rooms on the third floor, so your colleagues will be close to one another. As you requested, a private meeting room will also be [2] each morning from 8:00 to 10:00 A.M. [3]. Please send it to me by 25 September so that we can prepare key cards in advance. [4], let me know if any guests will arrive after midnight, as our front desk has fewer staff at night.\n\nKind regards,\n\nTomasz Nowak\nGroup Reservations Manager',
    questions: [
      {
        options: ['reserve', 'have reserved', 'were reserving', 'had reserved'],
        answer: 1,
        explanationVi:
          'Việc giữ phòng đã hoàn tất và kết quả còn đến hiện tại (đang xác nhận) → hiện tại hoàn thành "have reserved". "reserve" chỉ thói quen; "were reserving" (quá khứ tiếp diễn) và "had reserved" (quá khứ hoàn thành) không hợp với "I am pleased to confirm".',
        skillTags: ['grammar.verb-tense'],
      },
      {
        options: ['avail', 'availability', 'available', 'availably'],
        answer: 2,
        explanationVi:
          'Sau "will also be" cần tính từ làm vị ngữ → "available" (sẵn sàng để dùng). "availability" là danh từ, "avail" là động từ; "availably" không dùng sau "be".',
        skillTags: ['grammar.word-form'],
      },
      {
        options: [
          'Breakfast is included in the room rate.',
          'The hotel is a short walk from the station.',
          'Our rooftop bar opens at 5:00 P.M. daily.',
          'We will also need a list of your guests’ names.',
        ],
        answer: 3,
        explanationVi:
          'Câu sau: "Please send it to me… so that we can prepare key cards" → "it" phải là một thứ chị ấy gửi được và cần cho việc làm thẻ phòng → danh sách tên khách (D). (A), (B), (C) không có gì để "send".',
        translationVi: 'Câu nào phù hợp nhất để điền vào chỗ [3]?',
        skillTags: ['comprehension.sentence-insertion'],
      },
      {
        options: ['In addition', 'Instead', 'Otherwise', 'Nevertheless'],
        answer: 0,
        explanationVi:
          'Thêm một yêu cầu nữa sau yêu cầu gửi danh sách → "In addition" (ngoài ra). "Instead" (thay vào đó) và "Nevertheless" (tuy nhiên) mang nghĩa thay thế/đối lập; "Otherwise" (nếu không thì) không hợp logic.',
        skillTags: ['grammar.conjunction'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Logistics',
    passage:
      'NOTICE TO CUSTOMERS\n\nFrom 1 March, Tollgate Parcels will no longer hold undelivered packages at its Kingsway depot. [1], they will be taken to the nearest ParcelPoint locker, where they can be collected at any hour of the day. When a package is placed in a locker, you will receive a text message with a six-digit code. Simply enter the code on the locker’s screen, and the door will open [2]. Packages that are not collected within five days will be returned to the sender. [3]. A full list of locker locations, including those inside supermarkets and train stations, is [4] on our Web site.',
    questions: [
      {
        options: ['Besides', 'Similarly', 'Instead', 'Even so'],
        answer: 2,
        explanationVi:
          'Câu trước: không giữ hàng ở kho nữa; câu sau: hàng sẽ được đưa tới tủ khoá → thay thế → "Instead". "Besides" (ngoài ra), "Similarly" (tương tự), "Even so" (dù vậy) không diễn tả sự thay thế.',
        skillTags: ['grammar.conjunction'],
      },
      {
        options: ['automatically', 'automatic', 'automate', 'automation'],
        answer: 0,
        explanationVi:
          'Bổ nghĩa cho động từ "will open" cần trạng từ → "automatically" (tự động). "automatic" là tính từ, "automate" là động từ, "automation" là danh từ.',
        skillTags: ['grammar.word-form'],
      },
      {
        options: [
          'Please sign the delivery form when the driver arrives.',
          'If you need more time, you can extend this period once through our app.',
          'We apologize for the delay in delivering your order.',
          'Prices for international shipping will rise in April.',
        ],
        answer: 1,
        explanationVi:
          'Câu trước nói hàng không lấy trong năm ngày sẽ bị trả lại → (B) "nếu cần thêm thời gian, có thể gia hạn khoảng thời gian này" nối trực tiếp bằng "this period". (A) mâu thuẫn với việc lấy hàng ở tủ khoá; (C), (D) lạc đề.',
        translationVi: 'Câu nào phù hợp nhất để điền vào chỗ [3]?',
        skillTags: ['comprehension.sentence-insertion'],
      },
      {
        options: ['sent', 'shipped', 'filed', 'posted'],
        answer: 3,
        explanationVi:
          'Danh sách "được đăng trên trang web" → "posted on our Web site". "sent", "shipped" dùng cho hàng hoá/thư gửi đi; "filed" (lưu hồ sơ) không đi với "on our Web site".',
        skillTags: ['comprehension.vocab-in-context'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Health',
    passage:
      'MEMO\n\nTo: Front-desk and nursing staff\nFrom: Dr. Adaeze Okonkwo, Practice Manager\nDate: 3 November\nRe: Digital check-in\n\nNext Monday, Hollins Family Practice will replace its paper registration forms with tablets in the waiting area. Patients will enter their own details, which will go directly into their electronic records. This should reduce the number of errors that [1] whenever staff copy information by hand. [2], some patients, particularly older ones, may need help with the tablets at first. [3]. Each of you will be on the rota at least once during the first two weeks. If a patient prefers not to use a tablet, a member of staff may complete the form on his or her behalf, [4] the patient checks each entry before it is saved.',
    questions: [
      {
        options: ['had occurred', 'will have occurred', 'occurred', 'occur'],
        answer: 3,
        explanationVi:
          '"whenever staff copy information by hand" (hiện tại đơn, việc lặp lại thường xuyên) → lỗi hiện vẫn đang xảy ra → hiện tại đơn "occur". "occurred", "had occurred" chỉ quá khứ; "will have occurred" là tương lai hoàn thành, không hợp với mệnh đề "whenever" ở hiện tại.',
        skillTags: ['grammar.verb-tense'],
      },
      {
        options: ['Therefore', 'However', 'Furthermore', 'As a result'],
        answer: 1,
        explanationVi:
          'Câu trước nêu lợi ích (giảm lỗi); câu sau nêu khó khăn (bệnh nhân lớn tuổi cần giúp đỡ) → đối lập → "However". "Therefore", "As a result" chỉ kết quả; "Furthermore" bổ sung cùng chiều.',
        skillTags: ['grammar.conjunction'],
      },
      {
        options: [
          'We will therefore assign one staff member to the waiting area each morning.',
          'The tablets were paid for with a grant from the regional health authority.',
          'Patients can now also book appointments through our Web site.',
          'Paper forms will remain in use for new patients only.',
        ],
        answer: 0,
        explanationVi:
          'Câu trước: bệnh nhân có thể cần giúp; câu sau: "Each of you will be on the rota" → phải có câu nói về việc phân công người trực hỗ trợ → (A), "therefore" nối với câu trước, "rota" khớp với "assign one staff member". (D) mâu thuẫn với việc thay toàn bộ mẫu giấy; (B), (C) không dẫn tới "rota".',
        translationVi: 'Câu nào phù hợp nhất để điền vào chỗ [3]?',
        skillTags: ['comprehension.sentence-insertion'],
      },
      {
        options: ['even though', 'so as', 'provided that', 'in case'],
        answer: 2,
        explanationVi:
          'Nhân viên được điền thay "với điều kiện là" bệnh nhân kiểm tra từng mục → "provided that". "even though" (mặc dù) sai nghĩa; "in case" (phòng khi) không diễn tả điều kiện bắt buộc; "so as" phải đi với "to V".',
        skillTags: ['grammar.conjunction'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Publishing',
    passage:
      'FOR IMMEDIATE RELEASE\nContact: Owen Marsh, Publicity Director\n\nEDINBURGH (14 May) — Larchwood Press, an independent publisher of literary fiction, has announced that it will launch a new imprint devoted to books in translation. The imprint, called Crossings, [1] its first four titles next spring, including novels originally written in Korean, Portuguese, and Polish. [2]. Since then, sales of translated fiction have grown steadily at independent bookshops across the country. "Readers are increasingly curious about voices from beyond the English-speaking world," said publisher Fiona Gault. Crossings will also offer an annual grant to help early-career translators [3] their first book-length projects. Proposals and sample translations will be [4] from September through the Crossings Web site.',
    questions: [
      {
        options: ['released', 'has released', 'will release', 'was releasing'],
        answer: 2,
        explanationVi:
          '"next spring" → hành động trong tương lai → "will release". "released", "has released", "was releasing" đều chỉ quá khứ hoặc việc đã xong, mâu thuẫn với "next spring" và với việc nhà xuất bản mới công bố ra mắt.',
        skillTags: ['grammar.verb-tense'],
      },
      {
        options: [
          'Larchwood’s offices will move to Glasgow later this year.',
          'Each title will be available in hardcover only.',
          'The company is currently looking for a new chief executive.',
          'Larchwood first tested the idea in 2021 with a single translated novel.',
        ],
        answer: 3,
        explanationVi:
          'Câu sau bắt đầu bằng "Since then, sales of translated fiction have grown" → câu trước phải nêu một mốc thời gian liên quan đến sách dịch → (D) thử nghiệm năm 2021 với một tiểu thuyết dịch. (A), (B), (C) không tạo mốc cho "Since then" và không liên quan tới sách dịch.',
        translationVi: 'Câu nào phù hợp nhất để điền vào chỗ [2]?',
        skillTags: ['comprehension.sentence-insertion'],
      },
      {
        options: ['complete', 'completion', 'completed', 'completely'],
        answer: 0,
        explanationVi:
          'Cấu trúc "help + tân ngữ + V nguyên thể (hoặc to V)" → "help translators complete". "completion" là danh từ, "completely" là trạng từ; "completed" (V-ed) không dùng sau "help sb".',
        skillTags: ['grammar.verb-form'],
      },
      {
        options: ['allowed', 'accepted', 'agreed', 'approved'],
        answer: 1,
        explanationVi:
          'Bản đề xuất "sẽ được nhận" từ tháng Chín qua trang web → "accepted". "approved" (được duyệt) sai nghĩa vì chưa xét duyệt; "allowed", "agreed" không dùng với chủ ngữ là hồ sơ nộp vào theo nghĩa này.',
        skillTags: ['vocab.meaning'],
      },
    ],
  },
]
