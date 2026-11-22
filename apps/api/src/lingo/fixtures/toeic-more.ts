/**
 * Sample TOEIC items for Parts 2, 3, 4, 6 and 7 (written for Lingo, not taken from ETS tests),
 * loaded with the Part 5 samples by POST /lingo/admin/samples. Part 1 needs a real photo, so it
 * has no sample. Same shape as a JSON import file of each part.
 */
export const TOEIC_MORE_SAMPLES: Record<string, object[]> = {
  P2: [
    {
      difficulty: 'EASY',
      topic: 'Office',
      accent: 'US',
      questions: [
        {
          text: 'Where is the meeting with the clients being held?',
          options: [
            'In the conference room on the third floor.',
            'Yes, they will be here soon.',
            'At two o’clock this afternoon.',
          ],
          answer: 0,
          explanationVi:
            'Câu hỏi "Where" hỏi nơi chốn → (A) "phòng họp tầng ba". (B) trả lời Yes/No cho câu hỏi Wh- là sai. (C) trả lời thời gian (When), không phải nơi chốn.',
          translationVi: 'Cuộc họp với khách hàng được tổ chức ở đâu?',
          skillTags: ['listening.wh-question'],
        },
      ],
    },
    {
      difficulty: 'MEDIUM',
      topic: 'Finance',
      accent: 'GB',
      questions: [
        {
          text: 'Haven’t you submitted the expense report yet?',
          options: [
            'The report was very detailed.',
            'I’m finishing it right now.',
            'It was more expensive than expected.',
          ],
          answer: 1,
          explanationVi:
            'Câu hỏi phủ định "Chưa nộp báo cáo à?" → (B) "Tôi đang làm xong ngay đây" là câu trả lời tự nhiên. (A) lặp từ "report" để bẫy. (C) bẫy âm "expense" – "expensive".',
          translationVi: 'Bạn vẫn chưa nộp báo cáo chi phí à?',
          skillTags: ['listening.yes-no'],
        },
      ],
    },
    {
      difficulty: 'HARD',
      topic: 'HR',
      accent: 'AU',
      questions: [
        {
          text: 'Who will be training the new interns?',
          options: [
            'They start on Monday.',
            'Ms. Patel hasn’t decided yet.',
            'Yes, by train.',
          ],
          answer: 1,
          explanationVi:
            'Câu hỏi "Who" nhưng đáp án đúng là trả lời gián tiếp: (B) "Cô Patel chưa quyết định" – tức là chưa biết ai. (A) nói thời gian. (C) bẫy âm "training" – "train" và trả lời Yes cho câu hỏi Wh-.',
          translationVi: 'Ai sẽ đào tạo các thực tập sinh mới?',
          skillTags: ['listening.wh-question', 'listening.indirect'],
        },
      ],
    },
  ],
  P3: [
    {
      difficulty: 'MEDIUM',
      topic: 'Office',
      transcript: [
        {
          speaker: 'W',
          accent: 'US',
          text: 'Hi Daniel, the printer on our floor has stopped working again. Do you know if anyone called the repair service?',
        },
        {
          speaker: 'M',
          accent: 'GB',
          text: 'I called them this morning. They said a technician can’t come until Thursday.',
        },
        {
          speaker: 'W',
          accent: 'US',
          text: 'Thursday? I need to print forty copies of the sales proposal for tomorrow’s meeting.',
        },
        {
          speaker: 'M',
          accent: 'GB',
          text: 'The printer in the marketing department works fine. I’ll ask Laura if you can use it this afternoon.',
        },
      ],
      questions: [
        {
          text: 'What problem are the speakers discussing?',
          options: [
            'A meeting was cancelled.',
            'A machine is broken.',
            'A delivery is late.',
            'A proposal was rejected.',
          ],
          answer: 1,
          explanationVi:
            '"the printer ... has stopped working" → máy in hỏng = "A machine is broken" (diễn đạt lại). Các đáp án khác không được nhắc tới.',
          translationVi: 'Hai người đang bàn về vấn đề gì?',
          skillTags: ['comprehension.main-idea'],
        },
        {
          text: 'Why is the woman concerned?',
          options: [
            'She has to print documents soon.',
            'She missed a phone call.',
            'She does not know the technician.',
            'She lost a sales report.',
          ],
          answer: 0,
          explanationVi:
            'Cô ấy cần in 40 bản đề xuất cho cuộc họp ngày mai → phải in tài liệu sớm (A).',
          translationVi: 'Vì sao người phụ nữ lo lắng?',
          skillTags: ['comprehension.detail'],
        },
        {
          text: 'What will the man most likely do next?',
          options: [
            'Call the repair service again.',
            'Reschedule a meeting.',
            'Speak with a colleague.',
            'Buy a new printer.',
          ],
          answer: 2,
          explanationVi:
            '"I’ll ask Laura..." → anh ấy sẽ nói chuyện với một đồng nghiệp (C). Anh đã gọi dịch vụ sửa chữa rồi nên (A) sai.',
          translationVi: 'Người đàn ông có lẽ sẽ làm gì tiếp theo?',
          skillTags: ['comprehension.next-action'],
        },
      ],
    },
  ],
  P4: [
    {
      difficulty: 'MEDIUM',
      topic: 'Travel',
      transcript: [
        {
          speaker: 'N',
          accent: 'CA',
          text: 'Attention, passengers on Flight 482 to Vancouver.',
        },
        {
          speaker: 'N',
          accent: 'CA',
          text: 'Because of heavy snow in Vancouver, this flight has been delayed by about two hours.',
        },
        {
          speaker: 'N',
          accent: 'CA',
          text: 'The new departure time is 6:15 p.m., and boarding will now take place at Gate 22 instead of Gate 14.',
        },
        {
          speaker: 'N',
          accent: 'CA',
          text: 'Passengers can collect a meal voucher at the service desk next to Gate 22.',
        },
      ],
      questions: [
        {
          text: 'What is the reason for the delay?',
          options: [
            'A mechanical problem',
            'Bad weather',
            'A missing crew member',
            'A busy runway',
          ],
          answer: 1,
          explanationVi:
            '"Because of heavy snow" → thời tiết xấu (B), diễn đạt lại "heavy snow" thành "bad weather".',
          translationVi: 'Lý do chuyến bay bị hoãn là gì?',
          skillTags: ['comprehension.detail'],
        },
        {
          text: 'What has changed besides the departure time?',
          options: [
            'The destination',
            'The airline',
            'The boarding gate',
            'The ticket price',
          ],
          answer: 2,
          explanationVi: 'Cửa lên máy bay đổi từ Gate 14 sang Gate 22 (C).',
          translationVi: 'Ngoài giờ khởi hành, điều gì đã thay đổi?',
          skillTags: ['comprehension.detail'],
        },
        {
          text: 'What are passengers offered?',
          options: [
            'A hotel room',
            'A refund',
            'A seat upgrade',
            'A meal voucher',
          ],
          answer: 3,
          explanationVi: '"collect a meal voucher" → phiếu ăn (D).',
          translationVi: 'Hành khách được nhận gì?',
          skillTags: ['comprehension.detail'],
        },
      ],
    },
  ],
  P6: [
    {
      difficulty: 'MEDIUM',
      topic: 'Office',
      passage:
        'To: All staff\nSubject: Parking garage\n\nThe parking garage on Elm Street will be closed [1] repairs from May 3 to May 10. During this time, employees may park at the City Center lot, which is a five-minute walk from our building. [2]. Please display your company parking permit on your dashboard so that the lot attendants can [3] you. We apologize for any [4] this may cause.\n\nFacilities Management',
      questions: [
        {
          options: ['for', 'by', 'with', 'since'],
          answer: 0,
          explanationVi:
            '"closed for repairs" = đóng cửa để sửa chữa; "for" chỉ mục đích. Các giới từ khác không đi với nghĩa này.',
          skillTags: ['grammar.preposition'],
        },
        {
          options: [
            'Parking there will be free for our employees.',
            'The repairs were completed ahead of schedule.',
            'Our new office opened last year.',
            'Please submit your timesheet by Friday.',
          ],
          answer: 0,
          explanationVi:
            'Câu chèn phải nối tiếp ý "đỗ xe ở bãi City Center": (A) nói đỗ ở đó miễn phí – hợp mạch. (B) mâu thuẫn vì việc sửa chưa diễn ra. (C), (D) lạc đề.',
          skillTags: ['comprehension.sentence-insertion'],
        },
        {
          options: ['identify', 'identity', 'identifiable', 'identification'],
          answer: 0,
          explanationVi:
            'Sau "can" cần động từ nguyên mẫu → "identify". Các lựa chọn khác là danh từ / tính từ.',
          skillTags: ['grammar.word-form'],
        },
        {
          options: [
            'inconvenience',
            'convenient',
            'inconvenient',
            'conveniently',
          ],
          answer: 0,
          explanationVi:
            'Sau "any" cần danh từ: "apologize for any inconvenience" là cụm cố định.',
          skillTags: ['grammar.word-form', 'vocab.collocation'],
        },
      ],
    },
  ],
  P7: [
    {
      difficulty: 'MEDIUM',
      topic: 'Marketing',
      passage:
        'GREENLEAF CAFÉ – GRAND OPENING\n\nJoin us on Saturday, June 8, at our new location at 210 Harbor Road! The first 50 customers will receive a free reusable cup. All drinks are 20% off during opening week, and our bakery will offer free samples of its new whole-grain bread.\n\nOpen daily 7 a.m. – 8 p.m. · Free Wi-Fi · Outdoor seating\n---\nFrom: Mina Choi\nTo: Greenleaf Café\nDate: June 9\n\nI visited your new café on opening day and enjoyed the iced tea. I arrived at 10 a.m., but the reusable cups had already been given out. Will you be offering them again? Also, could you tell me whether the café accepts reservations for groups of ten?',
      questions: [
        {
          text: 'What is the purpose of the advertisement?',
          options: [
            'To announce a new café location',
            'To hire bakery staff',
            'To introduce a delivery service',
            'To change the opening hours',
          ],
          answer: 0,
          explanationVi:
            'Tiêu đề "GRAND OPENING" và "our new location" → quảng cáo khai trương địa điểm mới (A).',
          translationVi: 'Mục đích của quảng cáo là gì?',
          skillTags: ['comprehension.main-idea'],
        },
        {
          text: 'What is NOT mentioned as part of the opening offer?',
          options: [
            'Discounted drinks',
            'Free bread samples',
            'Free reusable cups',
            'Free parking',
          ],
          answer: 3,
          explanationVi:
            'Quảng cáo có giảm giá đồ uống, bánh mì mẫu, cốc miễn phí – không nhắc tới bãi đỗ xe (D).',
          translationVi:
            'Điều gì KHÔNG được nhắc đến trong ưu đãi khai trương?',
          skillTags: ['comprehension.not-true'],
        },
        {
          text: 'What can be inferred about Ms. Choi?',
          options: [
            'She works at Greenleaf Café.',
            'She was not among the first 50 customers.',
            'She bought whole-grain bread.',
            'She visited the café on June 9.',
          ],
          answer: 1,
          explanationVi:
            'Cô đến lúc 10 giờ và cốc đã phát hết; cốc chỉ dành cho 50 khách đầu (đoạn 1) → cô không nằm trong 50 khách đầu (B). Câu cần nối hai đoạn.',
          translationVi: 'Có thể suy ra điều gì về cô Choi?',
          skillTags: [
            'comprehension.inference',
            'comprehension.cross-reference',
          ],
        },
      ],
    },
  ],
}
