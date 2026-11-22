/**
 * More sample TOEIC items (written for Lingo, not taken from ETS or course material): with the other
 * samples they are enough for the placement test and the sample mini test. Same shape as a JSON
 * import file of each part.
 */
export const TOEIC_EXTRA_SAMPLES: Record<string, object[]> = {
  P2: [
    {
      difficulty: 'EASY',
      topic: 'Office',
      accent: 'CA',
      questions: [
        {
          text: 'When does the new copier arrive?',
          options: [
            'Next Tuesday, I think.',
            'On the second floor.',
            'Yes, it makes copies.',
          ],
          answer: 0,
          explanationVi:
            'Câu hỏi "When" hỏi thời gian → (A) "Thứ Ba tới". (B) trả lời nơi chốn (Where). (C) trả lời Yes cho câu hỏi Wh- và lặp âm "copier" – "copies".',
          translationVi: 'Khi nào máy photocopy mới được giao tới?',
          skillTags: ['listening.wh-question'],
        },
      ],
    },
    {
      difficulty: 'EASY',
      topic: 'Dining',
      accent: 'US',
      questions: [
        {
          text: 'Would you like coffee or tea with your dessert?',
          options: [
            'Tea, please.',
            'The dessert was delicious.',
            'Yes, I would.',
          ],
          answer: 0,
          explanationVi:
            'Câu hỏi lựa chọn "A or B" → chọn một trong hai: (A) "Trà". (B) lặp từ "dessert". (C) trả lời Yes/No cho câu hỏi lựa chọn là sai.',
          translationVi: 'Bạn muốn uống cà phê hay trà cùng món tráng miệng?',
          skillTags: ['listening.yes-no'],
        },
      ],
    },
    {
      difficulty: 'MEDIUM',
      topic: 'Office',
      accent: 'GB',
      questions: [
        {
          text: 'Could you send me the updated schedule by noon?',
          options: [
            'Sure, I’ll email it shortly.',
            'It was updated last year.',
            'At the train station.',
          ],
          answer: 0,
          explanationVi:
            'Câu yêu cầu "Could you...?" → đồng ý "Sure, tôi sẽ gửi email ngay" (A). (B) lặp từ "updated". (C) trả lời nơi chốn, không liên quan.',
          translationVi: 'Bạn gửi tôi lịch đã cập nhật trước trưa được không?',
          skillTags: ['listening.yes-no'],
        },
      ],
    },
    {
      difficulty: 'HARD',
      topic: 'Business',
      accent: 'AU',
      questions: [
        {
          text: 'The budget proposal is due on Friday, isn’t it?',
          options: [
            'The deadline was moved to Monday.',
            'A budget hotel near the airport.',
            'I proposed it to them.',
          ],
          answer: 0,
          explanationVi:
            'Câu hỏi đuôi xác nhận hạn nộp → (A) trả lời gián tiếp: hạn đã dời sang thứ Hai. (B) bẫy nghĩa khác của "budget" (giá rẻ). (C) bẫy âm "proposal" – "proposed".',
          translationVi: 'Đề xuất ngân sách hạn nộp là thứ Sáu, đúng không?',
          skillTags: ['listening.yes-no', 'listening.indirect'],
        },
      ],
    },
  ],
  P3: [
    {
      difficulty: 'EASY',
      topic: 'Travel',
      transcript: [
        {
          speaker: 'M',
          accent: 'US',
          text: 'Good morning. I have a reservation under the name Kim. I’m supposed to check in today.',
        },
        {
          speaker: 'W',
          accent: 'CA',
          text: 'Welcome, Mr. Kim. Your room isn’t ready yet, I’m afraid. Check-in begins at two o’clock.',
        },
        {
          speaker: 'M',
          accent: 'US',
          text: 'That’s fine. Could I leave my suitcase here while I go to my meeting?',
        },
        {
          speaker: 'W',
          accent: 'CA',
          text: 'Of course. I’ll give you a ticket, and you can pick it up at the front desk later.',
        },
      ],
      questions: [
        {
          text: 'Where most likely are the speakers?',
          options: [
            'At an airport',
            'At a hotel',
            'At a restaurant',
            'At a train station',
          ],
          answer: 1,
          explanationVi:
            '"reservation", "check in", "room", "front desk" → đang ở khách sạn (B).',
          translationVi: 'Hai người nhiều khả năng đang ở đâu?',
          skillTags: ['comprehension.inference'],
        },
        {
          text: 'What does the woman say about the room?',
          options: [
            'It is not available yet.',
            'It has been upgraded.',
            'It is on the top floor.',
            'It was booked twice.',
          ],
          answer: 0,
          explanationVi:
            '"Your room isn’t ready yet" → phòng chưa sẵn sàng (A).',
          translationVi: 'Người phụ nữ nói gì về căn phòng?',
          skillTags: ['comprehension.detail'],
        },
        {
          text: 'What does the man ask to do?',
          options: [
            'Change his reservation',
            'Store his luggage',
            'Get a map of the city',
            'Pay by credit card',
          ],
          answer: 1,
          explanationVi:
            '"Could I leave my suitcase here" → gửi hành lý (B, "store his luggage" là cách nói khác).',
          translationVi: 'Người đàn ông xin làm gì?',
          skillTags: ['comprehension.detail'],
        },
      ],
    },
  ],
  P4: [
    {
      difficulty: 'MEDIUM',
      topic: 'Business',
      transcript: [
        {
          speaker: 'N',
          accent: 'GB',
          text: 'Good afternoon, everyone, and thank you for coming to this month’s staff meeting.',
        },
        {
          speaker: 'N',
          accent: 'GB',
          text: 'First, some good news: our online sales grew by fifteen percent last quarter, mostly thanks to the new mobile app.',
        },
        {
          speaker: 'N',
          accent: 'GB',
          text: 'Because of that growth, we’ll be hiring three more customer service representatives in May.',
        },
        {
          speaker: 'N',
          accent: 'GB',
          text: 'If you know someone who might be a good fit, please send their résumé to Human Resources by the end of next week.',
        },
      ],
      questions: [
        {
          text: 'What is the speaker mainly talking about?',
          options: [
            'A change in office hours',
            'Results and plans for the company',
            'A new training program',
            'Problems with a mobile app',
          ],
          answer: 1,
          explanationVi:
            'Người nói báo doanh số tăng và kế hoạch tuyển thêm người → kết quả và kế hoạch của công ty (B).',
          translationVi: 'Người nói chủ yếu nói về điều gì?',
          skillTags: ['comprehension.main-idea'],
        },
        {
          text: 'According to the speaker, what caused the increase in sales?',
          options: [
            'Lower prices',
            'A television advertisement',
            'A new mobile application',
            'A larger sales team',
          ],
          answer: 2,
          explanationVi:
            '"mostly thanks to the new mobile app" → nhờ ứng dụng di động mới (C).',
          translationVi: 'Theo người nói, điều gì khiến doanh số tăng?',
          skillTags: ['comprehension.detail'],
        },
        {
          text: 'What are listeners asked to do?',
          options: [
            'Recommend job candidates',
            'Download an application',
            'Attend an interview',
            'Contact customers',
          ],
          answer: 0,
          explanationVi:
            '"If you know someone who might be a good fit, please send their résumé" → giới thiệu ứng viên (A).',
          translationVi: 'Người nghe được đề nghị làm gì?',
          skillTags: ['comprehension.speaker-intent'],
        },
      ],
    },
  ],
  P7: [
    {
      difficulty: 'EASY',
      topic: 'Office',
      passage:
        'NOTICE TO ALL EMPLOYEES\n\nThe parking garage on Elm Street will be closed for repairs from Monday, June 3, to Friday, June 7. During this time, employees may park in the visitor lot behind Building B at no charge. Please display your staff badge on your dashboard. Questions may be directed to Facilities at extension 214.',
      questions: [
        {
          text: 'What is the purpose of the notice?',
          options: [
            'To announce a temporary closure',
            'To introduce a new parking fee',
            'To welcome new employees',
            'To describe a building renovation plan',
          ],
          answer: 0,
          explanationVi:
            'Thông báo bãi đỗ xe đóng cửa từ 3 đến 7/6 để sửa chữa → đóng cửa tạm thời (A). Đỗ xe ở bãi khách là miễn phí nên (B) sai.',
          translationVi: 'Mục đích của thông báo là gì?',
          skillTags: ['comprehension.main-idea'],
        },
        {
          text: 'What are employees asked to do?',
          options: [
            'Pay at the visitor lot',
            'Call Facilities every morning',
            'Show their staff badge in their car',
            'Use public transportation',
          ],
          answer: 2,
          explanationVi:
            '"Please display your staff badge on your dashboard" → để thẻ nhân viên trong xe (C).',
          translationVi: 'Nhân viên được yêu cầu làm gì?',
          skillTags: ['comprehension.detail'],
        },
      ],
    },
  ],
}
