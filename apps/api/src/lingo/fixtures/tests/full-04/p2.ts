/** Full Test 04, Part 2: written for Lingo (not from ETS). */
export const P2: object[] = [
  {
    difficulty: 'EASY',
    topic: 'Aviation',
    accent: 'US',
    questions: [
      {
        text: 'Which gate does the flight to Lisbon leave from?',
        options: [
          'Gate fourteen, in Terminal B.',
          'Yes, I’ve been to Lisbon twice.',
          'About two and a half hours.',
        ],
        answer: 0,
        explanationVi:
          'Câu hỏi "Which gate" hỏi cổng khởi hành → (A) "Cổng 14, nhà ga B". (B) trả lời Yes cho câu hỏi Wh- và lặp "Lisbon". (C) trả lời thời lượng (How long).',
        translationVi: 'Chuyến bay đi Lisbon khởi hành từ cổng nào?',
        skillTags: ['listening.wh-question'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Legal',
    accent: 'GB',
    questions: [
      {
        text: 'Who drafted the lease agreement for the new tenants?',
        options: [
          'The tenants moved in on Monday.',
          'A lawyer at Hollis & Grant did.',
          'I agree with you completely.',
        ],
        answer: 1,
        explanationVi:
          'Câu hỏi "Who" hỏi người soạn hợp đồng → (B) "Một luật sư ở Hollis & Grant". (A) lặp "tenants" và trả lời thời gian. (C) bẫy âm "agreement" – "agree".',
        translationVi: 'Ai đã soạn hợp đồng thuê cho những người thuê mới?',
        skillTags: ['listening.wh-question'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Insurance',
    accent: 'AU',
    questions: [
      {
        text: 'How often do you renew your car insurance policy?',
        options: [
          'At the branch on King Street.',
          'The new policy is very clear.',
          'Once a year, every March.',
        ],
        answer: 2,
        explanationVi:
          'Câu hỏi "How often" hỏi tần suất → (C) "Mỗi năm một lần, vào tháng Ba". (A) trả lời nơi chốn (Where). (B) lặp "policy" sai ngữ cảnh.',
        translationVi: 'Bạn gia hạn hợp đồng bảo hiểm xe bao lâu một lần?',
        skillTags: ['listening.wh-question'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Telecommunications',
    accent: 'CA',
    questions: [
      {
        text: 'Has the technician installed the new phone lines yet?',
        options: [
          'He finished this morning.',
          'Install the app first.',
          'There was a long line at the counter.',
        ],
        answer: 0,
        explanationVi:
          'Câu hỏi Yes/No về việc lắp đặt → (A) "Anh ấy đã làm xong sáng nay" (ngầm hiểu Yes). (B) lặp gốc "installed" – "Install". (C) lặp "line" với nghĩa hàng người xếp.',
        translationVi:
          'Kỹ thuật viên đã lắp các đường dây điện thoại mới chưa?',
        skillTags: ['listening.yes-no'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Media',
    accent: 'US',
    questions: [
      {
        text: 'Why was the evening broadcast delayed?',
        options: [
          'At six thirty, as usual.',
          'There was a problem with the satellite feed.',
          'It’s a weekly news program.',
        ],
        answer: 1,
        explanationVi:
          'Câu hỏi "Why" hỏi lý do → (B) "Có sự cố với đường truyền vệ tinh". (A) trả lời thời gian (When). (C) liên tưởng "broadcast" – "news program" nhưng không nêu lý do.',
        translationVi: 'Tại sao chương trình phát sóng buổi tối bị trễ?',
        skillTags: ['listening.wh-question'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Pharmaceuticals',
    accent: 'GB',
    questions: [
      {
        text: 'Where are the clinical trial results being presented?',
        options: [
          'Very promising so far.',
          'Next Tuesday afternoon.',
          'At a medical conference in Geneva.',
        ],
        answer: 2,
        explanationVi:
          'Câu hỏi "Where" hỏi nơi trình bày → (C) "Tại một hội nghị y khoa ở Geneva". (A) nhận xét kết quả (How). (B) trả lời thời gian (When).',
        translationVi: 'Kết quả thử nghiệm lâm sàng sẽ được trình bày ở đâu?',
        skillTags: ['listening.wh-question'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Real estate',
    accent: 'AU',
    questions: [
      {
        text: 'Would you rather see the apartment this afternoon or tomorrow morning?',
        options: [
          'Tomorrow works better for me.',
          'Yes, it has two bedrooms.',
          'I saw the ad in the morning paper.',
        ],
        answer: 0,
        explanationVi:
          'Câu hỏi lựa chọn → (A) "Ngày mai thì tiện hơn cho tôi" (chọn phương án thứ hai). (B) trả lời Yes cho câu hỏi lựa chọn. (C) lặp "see" – "saw" và "morning".',
        translationVi: 'Bạn muốn xem căn hộ chiều nay hay sáng mai?',
        skillTags: ['listening.wh-question'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Technology',
    accent: 'CA',
    questions: [
      {
        text: 'Could you show me how to connect to the guest Wi-Fi?',
        options: [
          'It’s a very strong connection.',
          'Sure, the password is on the card by the door.',
          'I’ll show up around nine.',
        ],
        answer: 1,
        explanationVi:
          'Lời nhờ "Could you…?" → (B) "Được chứ, mật khẩu ở trên tấm thẻ cạnh cửa". (A) lặp gốc "connect" – "connection". (C) lặp "show" trong "show up" (có mặt) nghĩa khác.',
        translationVi:
          'Bạn có thể chỉ tôi cách kết nối Wi-Fi dành cho khách không?',
        skillTags: ['listening.yes-no'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Advertising',
    accent: 'US',
    questions: [
      {
        text: 'What did the focus group think of the new slogan?',
        options: [
          'A group of twelve volunteers.',
          'Let’s focus on the budget first.',
          'Most of them found it memorable.',
        ],
        answer: 2,
        explanationVi:
          'Câu hỏi "What… think" hỏi ý kiến → (C) "Phần lớn thấy nó dễ nhớ". (A) lặp "group" và mô tả thành phần nhóm. (B) lặp "focus" nghĩa khác.',
        translationVi: 'Nhóm khảo sát nghĩ gì về khẩu hiệu mới?',
        skillTags: ['listening.wh-question'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Hospitality',
    accent: 'GB',
    questions: [
      {
        text: 'Isn’t breakfast included in the room rate?',
        options: [
          'Only for guests on the executive floor.',
          'The exchange rate went up in May.',
          'I’ll include it in my report.',
        ],
        answer: 0,
        explanationVi:
          'Câu hỏi phủ định xác nhận thông tin → (A) "Chỉ dành cho khách ở tầng hạng sang". (B) lặp "rate" với nghĩa tỷ giá. (C) lặp gốc "included" – "include".',
        translationVi: 'Chẳng phải bữa sáng đã bao gồm trong giá phòng sao?',
        skillTags: ['listening.yes-no'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Transportation',
    accent: 'AU',
    questions: [
      {
        text: 'How long does the shuttle take to reach the airport?',
        options: [
          'Every twenty minutes.',
          'Around forty minutes without traffic.',
          'A long-term parking pass.',
        ],
        answer: 1,
        explanationVi:
          'Câu hỏi "How long" hỏi thời lượng → (B) "Khoảng bốn mươi phút nếu không kẹt xe". (A) trả lời tần suất (How often) – bẫy cùng chủ đề. (C) lặp "long" trong "long-term".',
        translationVi: 'Xe đưa đón mất bao lâu để đến sân bay?',
        skillTags: ['listening.wh-question'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Insurance',
    accent: 'CA',
    questions: [
      {
        text: 'Who should I contact about filing a claim for the storm damage?',
        options: [
          'I filed those alphabetically.',
          'He claimed it was a mistake.',
          'Our claims department handles that.',
        ],
        answer: 2,
        explanationVi:
          'Câu hỏi "Who" hỏi người cần liên hệ → (C) "Phòng bồi thường của chúng tôi phụ trách việc đó". (A) lặp "filing" – "filed" (sắp xếp hồ sơ). (B) lặp "claim" – "claimed" (cho rằng).',
        translationVi:
          'Tôi nên liên hệ ai để nộp yêu cầu bồi thường thiệt hại do bão?',
        skillTags: ['listening.wh-question'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Events',
    accent: 'US',
    questions: [
      {
        text: 'Why don’t we print the gala program on recycled paper?',
        options: [
          'That’s a great idea.',
          'It was printed last week.',
          'Because I recycled it.',
        ],
        answer: 0,
        explanationVi:
          'Lời đề nghị "Why don’t we…?" → (A) "Ý hay đấy" (đồng ý). (B) lặp "print" – "printed". (C) trả lời "Because" như câu hỏi lý do và lặp "recycled".',
        translationVi:
          'Sao chúng ta không in chương trình buổi dạ tiệc trên giấy tái chế?',
        skillTags: ['listening.wh-question'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Legal',
    accent: 'GB',
    questions: [
      {
        text: 'When will the court announce its decision on the patent case?',
        options: [
          'The patent was filed in 2021.',
          'I haven’t heard anything from our lawyers.',
          'At the courthouse downtown.',
        ],
        answer: 1,
        explanationVi:
          'Câu hỏi "When" → (B) "Tôi chưa nghe gì từ các luật sư của chúng ta" (gián tiếp: chưa biết). (A) lặp "patent" và nói về quá khứ. (C) trả lời nơi chốn (Where), liên tưởng "court" – "courthouse".',
        translationVi:
          'Khi nào tòa sẽ công bố phán quyết về vụ kiện bằng sáng chế?',
        skillTags: ['listening.wh-question', 'listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Aviation',
    accent: 'AU',
    questions: [
      {
        text: 'The flight to Osaka has been overbooked again.',
        options: [
          'I booked mine online.',
          'A window seat, please.',
          'Shall we offer vouchers to volunteers?',
        ],
        answer: 2,
        explanationVi:
          'Câu trần thuật nêu vấn đề → (C) "Hay ta đề nghị tặng phiếu ưu đãi cho người tự nguyện đổi chuyến?" (đề xuất giải pháp). (A) lặp gốc "overbooked" – "booked". (B) liên tưởng chuyến bay – chỗ ngồi.',
        translationVi: 'Chuyến bay đi Osaka lại bị đặt quá số chỗ.',
        skillTags: ['listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Pharmaceuticals',
    accent: 'CA',
    questions: [
      {
        text: 'You’ve submitted the safety data to the regulators, haven’t you?',
        options: [
          'Dr. Patel is handling that part.',
          'It’s perfectly safe.',
          'Yes, she’s a regular customer.',
        ],
        answer: 0,
        explanationVi:
          'Câu hỏi đuôi → (A) "Bác sĩ Patel phụ trách phần đó" (gián tiếp: không phải tôi). (B) lặp gốc "safety" – "safe". (C) bẫy âm "regulators" – "regular" và trả lời Yes sai nội dung.',
        translationVi:
          'Anh/chị đã nộp dữ liệu an toàn cho cơ quan quản lý rồi, phải không?',
        skillTags: ['listening.yes-no', 'listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Real estate',
    accent: 'US',
    questions: [
      {
        text: 'Why hasn’t the building owner repaired the elevator yet?',
        options: [
          'On the tenth floor.',
          'Didn’t you see the notice in the lobby?',
          'He owns three buildings downtown.',
        ],
        answer: 1,
        explanationVi:
          'Câu hỏi "Why" → (B) "Anh/chị không thấy thông báo ở sảnh sao?" (hỏi ngược: lý do đã được thông báo). (A) trả lời nơi chốn. (C) lặp gốc "owner" – "owns" và "building".',
        translationVi: 'Sao chủ tòa nhà vẫn chưa sửa thang máy?',
        skillTags: ['listening.wh-question', 'listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Media',
    accent: 'GB',
    questions: [
      {
        text: 'Should we run the interview in Saturday’s edition or Sunday’s?',
        options: [
          'She ran the marathon last year.',
          'It was edited by Ms. Lowe.',
          'The weekend supplement is already full.',
        ],
        answer: 2,
        explanationVi:
          'Câu hỏi lựa chọn → (C) "Phụ trương cuối tuần đã kín chỗ rồi" (gián tiếp: không đăng được số nào). (A) lặp gốc "run" – "ran" nghĩa khác. (B) lặp gốc "edition" – "edited".',
        translationVi:
          'Chúng ta nên đăng bài phỏng vấn trên số thứ Bảy hay số Chủ nhật?',
        skillTags: ['listening.wh-question', 'listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Technology',
    accent: 'AU',
    questions: [
      {
        text: 'Isn’t the server maintenance scheduled for tonight?',
        options: [
          'It was moved to Friday.',
          'The waiter served us quickly.',
          'The schedule is posted on the wall.',
        ],
        answer: 0,
        explanationVi:
          'Câu hỏi phủ định → (A) "Nó đã được dời sang thứ Sáu" (gián tiếp: không phải tối nay). (B) bẫy âm "server" – "served". (C) lặp gốc "scheduled" – "schedule".',
        translationVi:
          'Chẳng phải việc bảo trì máy chủ được lên lịch tối nay sao?',
        skillTags: ['listening.yes-no', 'listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Telecommunications',
    accent: 'CA',
    questions: [
      {
        text: 'How many customers have switched to the new data plan?',
        options: [
          'Plan for about a hundred guests.',
          'We won’t have figures until the end of the month.',
          'Switch it off before you leave.',
        ],
        answer: 1,
        explanationVi:
          'Câu hỏi "How many" → (B) "Đến cuối tháng mới có số liệu" (gián tiếp: chưa biết). (A) lặp "plan" (động từ: lên kế hoạch). (C) lặp gốc "switched" – "Switch" nghĩa khác.',
        translationVi:
          'Đã có bao nhiêu khách hàng chuyển sang gói dữ liệu mới?',
        skillTags: ['listening.wh-question', 'listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Finance',
    accent: 'US',
    questions: [
      {
        text: 'I think we should get a second quote for the roof repair.',
        options: [
          'A quotation from the chairman.',
          'She finished in second place.',
          'The first one was already well under budget.',
        ],
        answer: 2,
        explanationVi:
          'Câu trần thuật đề xuất → (C) "Báo giá đầu tiên đã thấp hơn ngân sách nhiều rồi" (gián tiếp: không cần báo giá thứ hai). (A) bẫy âm "quote" – "quotation" (câu trích dẫn). (B) lặp "second".',
        translationVi:
          'Tôi nghĩ chúng ta nên lấy thêm một báo giá thứ hai cho việc sửa mái nhà.',
        skillTags: ['listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Tourism',
    accent: 'GB',
    questions: [
      {
        text: 'Who’s taking the conference guests on the city tour?',
        options: [
          'The bus company provides its own guide.',
          'Around the old harbor district.',
          'About twenty-five guests.',
        ],
        answer: 0,
        explanationVi:
          'Câu hỏi "Who" → (A) "Công ty xe buýt có hướng dẫn viên riêng" (gián tiếp: không ai bên mình cần đi). (B) trả lời lộ trình (Where). (C) lặp "guests" và trả lời số lượng.',
        translationVi: 'Ai sẽ dẫn khách dự hội nghị đi tham quan thành phố?',
        skillTags: ['listening.wh-question', 'listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Advertising',
    accent: 'AU',
    questions: [
      {
        text: 'Wouldn’t it be better to launch the campaign after the holidays?',
        options: [
          'It was a wonderful holiday.',
          'The client has already paid for December airtime.',
          'Lunch is served at noon.',
        ],
        answer: 1,
        explanationVi:
          'Câu hỏi phủ định mang tính gợi ý → (B) "Khách hàng đã trả tiền thời lượng phát sóng tháng Mười Hai rồi" (gián tiếp: không thể dời). (A) lặp gốc "holidays" – "holiday". (C) bẫy âm "launch" – "Lunch".',
        translationVi:
          'Chẳng phải sẽ tốt hơn nếu ra mắt chiến dịch sau kỳ nghỉ lễ sao?',
        skillTags: ['listening.yes-no', 'listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Manufacturing',
    accent: 'CA',
    questions: [
      {
        text: 'Where should we store the extra packaging materials?',
        options: [
          'Early in the morning, if possible.',
          'They come in extra large.',
          'Is the old supply closet still empty?',
        ],
        answer: 2,
        explanationVi:
          'Câu hỏi "Where" → (C) "Tủ đồ cũ vẫn còn trống chứ?" (hỏi ngược, gợi ý nơi cất). (A) trả lời thời gian (When). (B) lặp "extra" nghĩa khác (cỡ quá lớn).',
        translationVi: 'Chúng ta nên cất số vật liệu đóng gói dư ở đâu?',
        skillTags: ['listening.wh-question', 'listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Healthcare',
    accent: 'US',
    questions: [
      {
        text: 'Do you know if Dr. Arslan is accepting new patients?',
        options: [
          'Patience is important in this job.',
          'Her receptionist would be the one to ask.',
          'Yes, I accept the terms.',
        ],
        answer: 1,
        explanationVi:
          'Câu hỏi gián tiếp "Do you know if…?" → (B) "Lễ tân của bác sĩ mới là người nên hỏi" (gián tiếp: tôi không biết). (A) bẫy âm "patients" – "Patience". (C) lặp gốc "accepting" – "accept" và trả lời Yes sai nội dung.',
        translationVi: 'Bạn có biết bác sĩ Arslan có nhận bệnh nhân mới không?',
        skillTags: ['listening.yes-no', 'listening.indirect'],
      },
    ],
  },
]
