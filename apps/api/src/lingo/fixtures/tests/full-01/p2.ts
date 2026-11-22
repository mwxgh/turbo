/** Full Test 01, Part 2: written for Lingo (not from ETS). */
export const P2: object[] = [
  {
    difficulty: 'EASY',
    topic: 'Office',
    accent: 'GB',
    questions: [
      {
        text: 'What time does the cafeteria stop serving lunch?',
        options: [
          'In the second-floor lobby.',
          'At two-thirty, I think.',
          'A chicken sandwich, please.',
        ],
        answer: 1,
        explanationVi:
          'Câu hỏi "What time" hỏi giờ → (B) "Khoảng hai giờ rưỡi". (A) trả lời nơi chốn (Where). (C) liên tưởng "lunch" – món ăn nhưng không trả lời giờ.',
        translationVi: 'Mấy giờ thì căng tin ngừng phục vụ bữa trưa?',
        skillTags: ['listening.wh-question'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Travel',
    accent: 'AU',
    questions: [
      {
        text: 'Where can I pick up my boarding pass?',
        options: [
          'About an hour before departure.',
          'Yes, I passed it on the way.',
          'At the self-service kiosk over there.',
        ],
        answer: 2,
        explanationVi:
          'Câu hỏi "Where" hỏi nơi chốn → (C) "Ở máy tự phục vụ đằng kia". (A) trả lời thời gian (When). (B) trả lời Yes cho câu hỏi Wh- và bẫy âm "pass" – "passed".',
        translationVi: 'Tôi có thể lấy thẻ lên máy bay ở đâu?',
        skillTags: ['listening.wh-question'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Events',
    accent: 'CA',
    questions: [
      {
        text: 'Who’s in charge of ordering the name badges for the conference?',
        options: [
          'Kevin from the events team.',
          'In the conference hall.',
          'About fifty badges.',
        ],
        answer: 0,
        explanationVi:
          'Câu hỏi "Who" hỏi người → (A) "Kevin bên nhóm sự kiện". (B) trả lời nơi chốn và lặp từ "conference". (C) trả lời số lượng (How many) và lặp từ "badges".',
        translationVi: 'Ai phụ trách đặt thẻ tên cho hội nghị?',
        skillTags: ['listening.wh-question'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Retail',
    accent: 'US',
    questions: [
      {
        text: 'Do you sell replacement batteries for this camera?',
        options: [
          'It was on sale last week.',
          'A digital camera.',
          'Yes, they’re in aisle four.',
        ],
        answer: 2,
        explanationVi:
          'Câu hỏi Yes/No về việc có bán pin thay thế không → (C) "Có, ở dãy kệ số bốn". (A) bẫy âm "sell" – "sale". (B) lặp từ "camera" nhưng không trả lời.',
        translationVi: 'Cửa hàng có bán pin thay thế cho máy ảnh này không?',
        skillTags: ['listening.yes-no'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Travel',
    accent: 'GB',
    questions: [
      {
        text: 'Would you prefer a window seat or an aisle seat on the train?',
        options: [
          'The window was left open.',
          'Whichever is closer to the exit.',
          'Yes, I’d like a ticket.',
        ],
        answer: 1,
        explanationVi:
          'Câu hỏi lựa chọn "A or B" → (B) "Chỗ nào gần lối ra hơn cũng được" (chọn theo tiêu chí, không cần nêu A hay B). (A) lặp từ "window" sai ngữ cảnh. (C) trả lời Yes cho câu hỏi lựa chọn.',
        translationVi:
          'Anh/chị muốn ghế cạnh cửa sổ hay ghế cạnh lối đi trên tàu?',
        skillTags: ['listening.yes-no', 'listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Finance',
    accent: 'AU',
    questions: [
      {
        text: 'Why was my reimbursement smaller than I expected?',
        options: [
          'The hotel minibar isn’t covered by our policy.',
          'I expected it, too.',
          'Through direct deposit.',
        ],
        answer: 0,
        explanationVi:
          'Câu hỏi "Why" hỏi lý do khoản hoàn tiền ít hơn → (A) "Quầy minibar khách sạn không nằm trong chính sách chi trả" (giải thích lý do). (B) lặp từ "expected". (C) trả lời cách thức (How).',
        translationVi: 'Tại sao khoản hoàn tiền của tôi ít hơn tôi dự tính?',
        skillTags: ['listening.wh-question'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Manufacturing',
    accent: 'CA',
    questions: [
      {
        text: 'The new packaging machine has been tested, hasn’t it?',
        options: [
          'A packing list for the order.',
          'Only on the night shift so far.',
          'The test was easy.',
        ],
        answer: 1,
        explanationVi:
          'Câu hỏi đuôi xác nhận máy đã được chạy thử chưa → (B) "Mới thử ở ca đêm thôi" (xác nhận một phần). (A) bẫy âm "packaging" – "packing". (C) lặp gốc từ "test" nhưng nói về bài kiểm tra.',
        translationVi: 'Máy đóng gói mới đã được chạy thử rồi, phải không?',
        skillTags: ['listening.yes-no'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Technology',
    accent: 'US',
    questions: [
      {
        text: 'Could you reset my password for the scheduling system?',
        options: [
          'The system is very reliable.',
          'I reset the clock already.',
          'You’ll need to submit a ticket to the help desk.',
        ],
        answer: 2,
        explanationVi:
          'Lời nhờ vả "Could you…?" → (C) "Bạn cần gửi yêu cầu cho bộ phận hỗ trợ" (từ chối gián tiếp, chỉ cách khác). (A) lặp từ "system". (B) lặp từ "reset" nhưng nói về đồng hồ.',
        translationVi:
          'Bạn có thể đặt lại mật khẩu hệ thống xếp lịch cho tôi được không?',
        skillTags: ['listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Events',
    accent: 'GB',
    questions: [
      {
        text: 'Why don’t we hire a photographer for the awards dinner?',
        options: [
          'That’s a great idea — I know someone good.',
          'Because the dinner was delicious.',
          'The awards are made of glass.',
        ],
        answer: 0,
        explanationVi:
          '"Why don’t we…?" là lời đề nghị, không hỏi lý do → (A) "Ý hay đấy, tôi biết một người giỏi". (B) bẫy trả lời "Because" như câu hỏi Why thật. (C) lặp từ "awards".',
        translationVi:
          'Sao chúng ta không thuê một nhiếp ảnh gia cho bữa tiệc trao giải nhỉ?',
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
        text: 'How much is the monthly rent for the unit on Elm Street?',
        options: [
          'The landlord’s agent is checking the latest figure.',
          'It’s a two-bedroom unit.',
          'Near the subway station.',
        ],
        answer: 0,
        explanationVi:
          'Câu hỏi "How much" hỏi giá thuê → (A) "Người môi giới của chủ nhà đang kiểm tra con số mới nhất" (trả lời gián tiếp: chưa biết, đang xác minh). (B) lặp từ "unit", mô tả căn hộ. (C) trả lời vị trí (Where).',
        translationVi:
          'Tiền thuê hằng tháng của căn hộ trên phố Elm là bao nhiêu?',
        skillTags: ['listening.wh-question', 'listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'HR',
    accent: 'US',
    questions: [
      {
        text: 'Haven’t the interview candidates arrived yet?',
        options: [
          'They view it differently.',
          'For the sales position.',
          'Two of them are in the waiting area.',
        ],
        answer: 2,
        explanationVi:
          'Câu hỏi phủ định hỏi ứng viên đã đến chưa → (C) "Hai người đang ở khu chờ". (A) bẫy âm "interview" – "view". (B) liên tưởng vị trí tuyển dụng nhưng không trả lời.',
        translationVi: 'Các ứng viên phỏng vấn vẫn chưa đến à?',
        skillTags: ['listening.yes-no'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Logistics',
    accent: 'CA',
    questions: [
      {
        text: 'The shipment to Rotterdam is going to be two days late.',
        options: [
          'It shipped from Rotterdam.',
          'Then we should let the client know right away.',
          'About two days ago.',
        ],
        answer: 1,
        explanationVi:
          'Câu trần thuật báo tin hàng giao trễ → (B) "Vậy ta nên báo khách hàng ngay" (phản hồi hợp lý). (A) lặp "Rotterdam" và sai hướng (từ chứ không phải đến). (C) lặp "two days", trả lời thời điểm quá khứ.',
        translationVi: 'Lô hàng gửi đến Rotterdam sẽ trễ hai ngày.',
        skillTags: ['listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Marketing',
    accent: 'GB',
    questions: [
      {
        text: 'Which design did the client choose for the new logo?',
        options: [
          'A local graphic designer.',
          'Yes, they chose carefully.',
          'They haven’t decided between the last two.',
        ],
        answer: 2,
        explanationVi:
          'Câu hỏi "Which" hỏi mẫu nào → (C) "Họ chưa quyết định giữa hai mẫu cuối" (gián tiếp: chưa chọn). (A) bẫy âm "design" – "designer", trả lời người. (B) trả lời Yes cho câu hỏi Wh- và lặp "chose".',
        translationVi: 'Khách hàng đã chọn mẫu thiết kế nào cho logo mới?',
        skillTags: ['listening.wh-question', 'listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Office',
    accent: 'AU',
    questions: [
      {
        text: 'Should I print the agenda, or will everyone bring a laptop?',
        options: [
          'Let’s do both, just in case.',
          'A new printer cartridge.',
          'Yes, it’s on the agenda.',
        ],
        answer: 0,
        explanationVi:
          'Câu hỏi lựa chọn giữa hai cách → (A) "Làm cả hai cho chắc". (B) bẫy âm "print" – "printer". (C) trả lời Yes cho câu hỏi lựa chọn và lặp "agenda".',
        translationVi:
          'Tôi nên in chương trình họp ra, hay mọi người sẽ mang máy tính xách tay?',
        skillTags: ['listening.yes-no'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Travel',
    accent: 'US',
    questions: [
      {
        text: 'How did you get to the trade show from the hotel?',
        options: [
          'It showed a great view.',
          'The organizers ran a free shuttle.',
          'For three days.',
        ],
        answer: 1,
        explanationVi:
          'Câu hỏi "How" hỏi phương tiện/cách đi → (B) "Ban tổ chức có xe đưa đón miễn phí". (A) bẫy âm "show" – "showed". (C) trả lời khoảng thời gian (How long).',
        translationVi:
          'Anh/chị đi từ khách sạn đến hội chợ thương mại bằng cách nào?',
        skillTags: ['listening.wh-question'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Finance',
    accent: 'CA',
    questions: [
      {
        text: 'Has the accounting team finished the year-end audit?',
        options: [
          'A tax accountant.',
          'Ms. Kowalski would know better than I would.',
          'At the end of the year.',
        ],
        answer: 1,
        explanationVi:
          'Câu hỏi Yes/No → (B) "Cô Kowalski nắm rõ hơn tôi" (trả lời gián tiếp: không biết, chỉ người biết). (A) bẫy âm "accounting" – "accountant". (C) lặp "end of the year", trả lời thời gian.',
        translationVi: 'Nhóm kế toán đã hoàn tất đợt kiểm toán cuối năm chưa?',
        skillTags: ['listening.yes-no', 'listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Facilities',
    accent: 'GB',
    questions: [
      {
        text: 'The heating on the fourth floor isn’t working again.',
        options: [
          'Maintenance is already on their way up.',
          'Four times this week.',
          'It’s warmer than last year’s model.',
        ],
        answer: 0,
        explanationVi:
          'Câu trần thuật phàn nàn sự cố → (A) "Bộ phận bảo trì đang lên rồi" (phản hồi gián tiếp: đã xử lý). (B) bẫy âm "fourth" – "four" và liên tưởng "again". (C) liên tưởng "heating" – "warmer" nhưng lạc ý.',
        translationVi: 'Hệ thống sưởi ở tầng bốn lại không hoạt động nữa rồi.',
        skillTags: ['listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Manufacturing',
    accent: 'US',
    questions: [
      {
        text: 'When will the production line be back up and running?',
        options: [
          'It runs every morning.',
          'In the production office.',
          'The replacement part still hasn’t been delivered.',
        ],
        answer: 2,
        explanationVi:
          'Câu hỏi "When" → (C) "Linh kiện thay thế vẫn chưa được giao" (gián tiếp: chưa thể biết khi nào). (A) lặp "run" – "runs", nói về thói quen. (B) lặp "production", trả lời nơi chốn.',
        translationVi: 'Khi nào dây chuyền sản xuất sẽ hoạt động trở lại?',
        skillTags: ['listening.wh-question', 'listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Corporate',
    accent: 'AU',
    questions: [
      {
        text: 'Would you mind reviewing my presentation slides before the board meeting?',
        options: [
          'The board approved the budget.',
          'I’m booked solid until Thursday, unfortunately.',
          'Sure, I’ll present them myself.',
        ],
        answer: 1,
        explanationVi:
          'Lời nhờ "Would you mind…?" → (B) "Tiếc là tôi kín lịch đến thứ Năm" (từ chối gián tiếp). (A) lặp "board". (C) "Sure" nghe hợp lý nhưng nội dung sai: người được nhờ xem lại, không phải tự thuyết trình.',
        translationVi:
          'Phiền anh/chị xem qua các trang trình chiếu của tôi trước cuộc họp hội đồng quản trị được không?',
        skillTags: ['listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Retail',
    accent: 'CA',
    questions: [
      {
        text: 'We’re still offering free gift wrapping this month, aren’t we?',
        options: [
          'That promotion ended last Sunday.',
          'Yes, it’s a lovely gift.',
          'Wrap it carefully, please.',
        ],
        answer: 0,
        explanationVi:
          'Câu hỏi đuôi xác nhận dịch vụ gói quà miễn phí → (A) "Chương trình đó kết thúc Chủ nhật tuần trước" (= không còn, trả lời gián tiếp). (B) "Yes" kèm lặp "gift" nhưng lạc ý. (C) lặp gốc từ "wrap".',
        translationVi:
          'Tháng này chúng ta vẫn gói quà miễn phí cho khách, phải không?',
        skillTags: ['listening.yes-no', 'listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Technology',
    accent: 'US',
    questions: [
      {
        text: 'Didn’t the software update fix the login problem?',
        options: [
          'I’ll log in later.',
          'An updated version of the manual.',
          'Only for some users, apparently.',
        ],
        answer: 2,
        explanationVi:
          'Câu hỏi phủ định → (C) "Hình như chỉ khắc phục được cho một số người dùng" (trả lời một phần, bỏ "Yes/No"). (A) bẫy âm "login" – "log in". (B) bẫy âm "update" – "updated".',
        translationVi: 'Bản cập nhật phần mềm chưa sửa được lỗi đăng nhập sao?',
        skillTags: ['listening.yes-no'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Events',
    accent: 'GB',
    questions: [
      {
        text: 'Who’s going to give the opening speech at the anniversary celebration?',
        options: [
          'It opens at nine.',
          'Wasn’t that announced in yesterday’s newsletter?',
          'Our fifth anniversary.',
        ],
        answer: 1,
        explanationVi:
          'Câu hỏi "Who" → (B) "Chẳng phải bản tin hôm qua đã thông báo rồi sao?" (trả lời bằng câu hỏi ngược, chỉ nguồn thông tin). (A) bẫy âm "opening" – "opens", trả lời giờ. (C) lặp "anniversary".',
        translationVi: 'Ai sẽ phát biểu khai mạc tại lễ kỷ niệm thành lập?',
        skillTags: ['listening.wh-question', 'listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Finance',
    accent: 'AU',
    questions: [
      {
        text: 'Do you want to pay the supplier now or wait until their invoice is corrected?',
        options: [
          'Let’s hold off until the numbers match.',
          'Yes, I paid in cash.',
          'The supplier corrected me.',
        ],
        answer: 0,
        explanationVi:
          'Câu hỏi lựa chọn → (A) "Cứ chờ đến khi số liệu khớp đã" (chọn phương án 2 bằng cách diễn đạt khác: "hold off" = "wait"). (B) trả lời Yes cho câu hỏi lựa chọn, lặp "pay" – "paid". (C) lặp "supplier", "corrected".',
        translationVi:
          'Anh/chị muốn thanh toán cho nhà cung cấp ngay hay đợi họ sửa lại hóa đơn?',
        skillTags: ['listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Real estate',
    accent: 'CA',
    questions: [
      {
        text: 'I’m thinking of moving our team to the smaller office downtown.',
        options: [
          'It moved very quickly.',
          'Down the hall on your left.',
          'Have you checked whether everyone would fit?',
        ],
        answer: 2,
        explanationVi:
          'Câu trần thuật nêu dự định → (C) "Anh đã kiểm tra xem có đủ chỗ cho mọi người chưa?" (phản hồi bằng câu hỏi liên quan "smaller"). (A) lặp "moving" – "moved". (B) bẫy âm "downtown" – "Down", trả lời chỉ đường.',
        translationVi:
          'Tôi đang tính chuyển nhóm mình sang văn phòng nhỏ hơn ở trung tâm.',
        skillTags: ['listening.indirect'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Office',
    accent: 'US',
    questions: [
      {
        text: 'Why hasn’t the conference room booking system been updated?',
        options: [
          'A booking for six people.',
          'I thought Mr. Haddad took care of that.',
          'Because it’s the largest room.',
        ],
        answer: 1,
        explanationVi:
          'Câu hỏi "Why" → (B) "Tôi tưởng anh Haddad đã lo việc đó rồi" (gián tiếp: không biết, nghĩ người khác phụ trách). (A) lặp "booking". (C) có "Because" và lặp "room" nhưng lý do không liên quan việc cập nhật hệ thống.',
        translationVi: 'Tại sao hệ thống đặt phòng họp vẫn chưa được cập nhật?',
        skillTags: ['listening.wh-question', 'listening.indirect'],
      },
    ],
  },
]
