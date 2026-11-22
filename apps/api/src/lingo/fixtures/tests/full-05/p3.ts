/** Full Test 05, Part 3: written for Lingo (not from ETS). */
export const P3: object[] = [
  {
    difficulty: 'EASY',
    topic: 'Leisure',
    transcript: [
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Hi, I reserved two bicycles online for today. The booking is under Okafor.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Let me check. Yes, two city bikes for the full day. Before I bring them out, I’ll need to see a photo ID for each rider.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Here’s mine. My sister is parking the car, so she’ll be here in a minute with hers.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'No problem. Are you planning to ride along the river path? Part of it is closed near the old bridge for repairs.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'We were, actually. Is there another way around?',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'There is. I’ll give you a map with the detour marked in red. It only adds about ten minutes.',
      },
    ],
    questions: [
      {
        text: 'Where most likely does the man work?',
        options: [
          'At a car rental agency',
          'At a bicycle rental shop',
          'At a tourist information center',
          'At a construction company',
        ],
        answer: 1,
        explanationVi:
          'Cô đã đặt "two bicycles online", anh mang xe ra cho khách → cửa hàng cho thuê xe đạp (B). "parking the car" và "repairs" chỉ là bẫy lặp từ.',
        translationVi: 'Người đàn ông nhiều khả năng làm việc ở đâu?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'What does the man ask to see?',
        options: [
          'A credit card',
          'A booking confirmation',
          'A parking permit',
          'Identification documents',
        ],
        answer: 3,
        explanationVi:
          '"I’ll need to see a photo ID for each rider" → giấy tờ tùy thân có ảnh (D). Anh tự tra đặt chỗ theo tên nên không cần xác nhận đặt chỗ (B).',
        translationVi: 'Người đàn ông yêu cầu xem gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What will the man give the woman?',
        options: [
          'A map showing a different route',
          'A discount on a future rental',
          'Some safety equipment',
          'A schedule of bridge repairs',
        ],
        answer: 0,
        explanationVi:
          '"I’ll give you a map with the detour marked in red" → bản đồ có đường vòng (A). Việc sửa cầu được nhắc đến nhưng anh không đưa lịch sửa chữa (D).',
        translationVi: 'Người đàn ông sẽ đưa cho người phụ nữ cái gì?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Library',
    transcript: [
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Good morning. I’d like to book one of the group study rooms for Thursday afternoon. There will be five of us.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'The small rooms only seat four, but Room 3B holds eight people. It’s available from one to four on Thursday.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Perfect. Does it have a screen? We’re practicing a presentation.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Yes, there’s a wall screen, but you’ll need to borrow the connecting cable from this desk when you arrive.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Got it. Should I give you my library card number now?',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Please. And note that rooms are released to other users if you’re more than fifteen minutes late.',
      },
    ],
    questions: [
      {
        text: 'Why does the woman suggest Room 3B?',
        options: [
          'It is the quietest room.',
          'It has a computer.',
          'It is large enough for the group.',
          'It is close to the front desk.',
        ],
        answer: 2,
        explanationVi:
          'Nhóm có 5 người, phòng nhỏ chỉ chứa 4, còn "Room 3B holds eight people" → phòng đủ rộng cho cả nhóm (C).',
        translationVi: 'Tại sao người phụ nữ gợi ý Phòng 3B?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the man say his group will do?',
        options: [
          'Rehearse a presentation',
          'Interview a candidate',
          'Watch a training video',
          'Review some library books',
        ],
        answer: 0,
        explanationVi:
          '"We’re practicing a presentation" → tập dượt bài thuyết trình (A). "rehearse" là cách diễn đạt lại của "practice".',
        translationVi: 'Người đàn ông nói nhóm của anh ấy sẽ làm gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the woman warn the man about?',
        options: [
          'A fee for using the screen',
          'A limit on the number of bookings',
          'A change in opening hours',
          'A policy about arriving late',
        ],
        answer: 3,
        explanationVi:
          '"rooms are released to other users if you’re more than fifteen minutes late" → quy định về việc đến muộn (D).',
        translationVi: 'Người phụ nữ cảnh báo người đàn ông về điều gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Hospitality',
    transcript: [
      {
        speaker: 'W',
        accent: 'US',
        text: 'Hello, this is Rosalind at the Brightwater Inn. We sent forty staff uniforms to you on Monday for cleaning, and they were supposed to be back today.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'Let me look that up. Ah, I see. One of our pressing machines broke down yesterday, so we’re running a day behind.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'That’s a problem. Our front desk team needs those jackets for the evening shift.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'I understand. The jackets are already finished; it’s only the trousers that are waiting. I could send the jackets over this afternoon.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'That would help a lot. Can your driver come before four?',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'Yes, I’ll ask him to leave right after lunch, and we’ll deliver the rest tomorrow morning.',
      },
    ],
    questions: [
      {
        text: 'Why is the woman calling?',
        options: [
          'To order new uniforms',
          'To complain about poor cleaning',
          'To change a delivery address',
          'To ask about a late order',
        ],
        answer: 3,
        explanationVi:
          'Đồng phục "were supposed to be back today" nhưng chưa về → cô gọi hỏi về đơn hàng bị trễ (D). Cô không chê chất lượng giặt (B).',
        translationVi: 'Tại sao người phụ nữ gọi điện?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What caused the problem?',
        options: [
          'A driver was sick.',
          'A machine stopped working.',
          'An order form was lost.',
          'Some items were damaged.',
        ],
        answer: 1,
        explanationVi:
          '"One of our pressing machines broke down yesterday" → một máy ngừng hoạt động (B).',
        translationVi: 'Điều gì gây ra vấn đề?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the man offer to do?',
        options: [
          'Refund the cleaning charge',
          'Lend the hotel some spare uniforms',
          'Deliver part of the order early',
          'Send a driver tomorrow morning',
        ],
        answer: 2,
        explanationVi:
          'Áo khoác đã xong, "I could send the jackets over this afternoon" → giao trước một phần đơn hàng (C). Sáng mai mới giao phần còn lại, không phải lời đề nghị chính (D).',
        translationVi: 'Người đàn ông đề nghị làm gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Health',
    transcript: [
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Westfield Animal Clinic, how can I help you?',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Hi, my dog Biscuit has an appointment for his vaccinations on Friday at nine, but I’ve just been asked to attend a work meeting then.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Let’s find another time. Dr. Haddad has an opening on Saturday at eleven, or there’s Monday at five thirty.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Saturday is better. Monday evenings are always busy for me.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Done. And since it’s been a year, please bring a small sample for his annual health check. I’ll e-mail you the instructions.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Thanks, I’ll look out for it.',
      },
    ],
    questions: [
      {
        text: 'Why does the woman need to change her appointment?',
        options: [
          'She has a work commitment.',
          'Her dog is feeling better.',
          'She will be traveling.',
          'The clinic will be closed.',
        ],
        answer: 0,
        explanationVi:
          '"I’ve just been asked to attend a work meeting then" → cô có việc ở công ty (A).',
        translationVi: 'Tại sao người phụ nữ cần đổi lịch hẹn?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'When will the woman most likely visit the clinic?',
        options: [
          'On Friday morning',
          'On Monday evening',
          'On Saturday morning',
          'On Monday morning',
        ],
        answer: 2,
        explanationVi:
          'Lựa chọn là thứ Bảy 11 giờ hoặc thứ Hai 5 giờ 30; cô nói "Saturday is better" → sáng thứ Bảy (C).',
        translationVi: 'Người phụ nữ nhiều khả năng sẽ đến phòng khám khi nào?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'What will the man send the woman?',
        options: [
          'A bill for a vaccination',
          'Instructions for a sample',
          'A reminder about a payment',
          'A list of available doctors',
        ],
        answer: 1,
        explanationVi:
          '"please bring a small sample… I’ll e-mail you the instructions" → hướng dẫn lấy mẫu (B).',
        translationVi: 'Người đàn ông sẽ gửi cho người phụ nữ cái gì?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Museums',
    transcript: [
      {
        speaker: 'W',
        accent: 'US',
        text: 'Tobias, Fenella, the Kessler Gallery has agreed to lend us their collection of antique maps for our spring exhibition. But they’ve sent a long list of conditions.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Let me guess: humidity and lighting. Old paper is very sensitive.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Exactly. The maps can’t be shown under more than fifty lux, and the room has to stay between forty-five and fifty-five percent humidity.',
      },
      {
        speaker: 'W2',
        accent: 'AU',
        text: 'Our east wing has the right climate controls, but the ceiling lights there are far too bright. We’d need dimmable fixtures.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'The facilities team replaced the lights in the archive last year. I’ll ask whether they have spare dimmable units we could move.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Good idea. Fenella, can you draft the insurance paperwork? The gallery wants a signed copy within two weeks.',
      },
      {
        speaker: 'W2',
        accent: 'AU',
        text: 'I’ll start on it today.',
      },
    ],
    questions: [
      {
        text: 'What are the speakers mainly discussing?',
        options: [
          'Selling a collection of maps',
          'Borrowing items for an exhibition',
          'Renovating an archive room',
          'Hiring a new exhibition designer',
        ],
        answer: 1,
        explanationVi:
          '"the Kessler Gallery has agreed to lend us their collection of antique maps for our spring exhibition" → mượn hiện vật cho triển lãm (B).',
        translationVi: 'Những người nói chủ yếu đang thảo luận điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What problem with the east wing is mentioned?',
        options: [
          'It is too humid.',
          'It is too small.',
          'It is closed for repairs.',
          'Its lighting is too strong.',
        ],
        answer: 3,
        explanationVi:
          '"the ceiling lights there are far too bright" → ánh sáng quá mạnh (D). Hệ thống kiểm soát khí hậu lại phù hợp, nên (A) sai.',
        translationVi: 'Vấn đề nào của khu phía đông được nhắc đến?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What will Fenella most likely do next?',
        options: [
          'Prepare some insurance documents',
          'Contact the facilities team',
          'Visit the Kessler Gallery',
          'Measure the humidity in a room',
        ],
        answer: 0,
        explanationVi:
          'Người phụ nữ nhờ Fenella "draft the insurance paperwork", Fenella đáp "I’ll start on it today" → soạn giấy tờ bảo hiểm (A). Liên hệ đội cơ sở vật chất là việc của người đàn ông (B).',
        translationVi: 'Fenella nhiều khả năng sẽ làm gì tiếp theo?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Transportation',
    transcript: [
      {
        speaker: 'M',
        accent: 'AU',
        text: 'Island Link Ferries, passenger services. How can I help?',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Hi, I’m booked on the 7:40 sailing to Marrow Island tomorrow with my van. I just got a text saying the schedule has changed.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'Yes, one of our vessels is in dry dock for an inspection this week, so the 7:40 has been cancelled. The next sailing with vehicle space is at 10:15.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'That’s too late. I’m delivering flowers for a wedding there, and the ceremony starts at eleven.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'In that case, there’s a 6:50 sailing that’s foot passengers only. You could leave the van here and carry the flowers on board. We’ll waive the parking fee because of the change.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Hmm, that could work if I can get a taxi on the other side. I’ll call the venue and see if someone can meet me at the dock, then call you back.',
      },
    ],
    questions: [
      {
        text: 'Why was the woman’s sailing cancelled?',
        options: [
          'The weather is expected to be bad.',
          'There are not enough passengers.',
          'A ship is being inspected.',
          'A dock is being rebuilt.',
        ],
        answer: 2,
        explanationVi:
          '"one of our vessels is in dry dock for an inspection this week" → một con tàu đang được kiểm tra (C). "dock" trong (D) là bẫy âm thanh.',
        translationVi: 'Tại sao chuyến phà của người phụ nữ bị hủy?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the man offer the woman?',
        options: [
          'Free parking for her vehicle',
          'A full refund of her ticket',
          'A seat on a later sailing',
          'A taxi on Marrow Island',
        ],
        answer: 0,
        explanationVi:
          '"We’ll waive the parking fee" → miễn phí gửi xe (A). Taxi là việc cô tự lo (D); chuyến muộn hơn cô đã từ chối (C).',
        translationVi: 'Người đàn ông đề nghị gì với người phụ nữ?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What will the woman do next?',
        options: [
          'Book a seat on the 10:15 sailing',
          'Drive her van to a different port',
          'Ask the wedding couple to start later',
          'Contact the place where an event is held',
        ],
        answer: 3,
        explanationVi:
          '"I’ll call the venue and see if someone can meet me at the dock" → liên hệ địa điểm tổ chức sự kiện (D). "venue" được diễn đạt lại thành "the place where an event is held".',
        translationVi: 'Người phụ nữ sẽ làm gì tiếp theo?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Food production',
    transcript: [
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Desmond, have you tasted the new beans from the Colombian cooperative? I roasted a test batch this morning.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'I did. They’re excellent, much fruitier than our current supplier’s. But their price per kilo is almost twenty percent higher.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'True, but they ship in smaller lots, so we wouldn’t have to store so much stock. Last year we threw away nearly a hundred kilos that went stale.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'That’s a fair point. What if we used them only for the single-origin line and kept the house blend as it is?',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'I like that. We could charge a little more for those bags, and our café customers keep asking for something new anyway.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Then let’s order a trial shipment. I’ll ask them for a sample contract so our accountant can review the payment terms.',
      },
    ],
    questions: [
      {
        text: 'What concern does the man raise about the new beans?',
        options: [
          'Their flavor is too strong.',
          'They take a long time to arrive.',
          'They cost more than the current beans.',
          'They are difficult to roast.',
        ],
        answer: 2,
        explanationVi:
          '"their price per kilo is almost twenty percent higher" → đắt hơn loại hiện tại (C). Anh khen hương vị nên (A) sai.',
        translationVi: 'Người đàn ông nêu lo ngại gì về loại hạt mới?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'According to the woman, what happened last year?',
        options: [
          'A supplier went out of business.',
          'Some stock had to be discarded.',
          'A new café location opened.',
          'Customers complained about a blend.',
        ],
        answer: 1,
        explanationVi:
          '"we threw away nearly a hundred kilos that went stale" → một phần hàng tồn phải bỏ đi (B). "discarded" = "threw away".',
        translationVi: 'Theo người phụ nữ, điều gì đã xảy ra năm ngoái?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the man say he will do?',
        options: [
          'Raise the price of the house blend',
          'Visit the cooperative in Colombia',
          'Roast another test batch',
          'Request a draft agreement',
        ],
        answer: 3,
        explanationVi:
          '"I’ll ask them for a sample contract" → yêu cầu bản hợp đồng mẫu (D). Họ giữ nguyên house blend nên (A) sai.',
        translationVi: 'Người đàn ông nói anh ấy sẽ làm gì?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Translation',
    transcript: [
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Ingrid, the client at Norrland Medical just e-mailed. They want the Swedish version of their user manual by Wednesday instead of Friday.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Wednesday? The manual is a hundred and twenty pages, and Lars is the only translator on it.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'I know. Apparently their product launch in Stockholm was moved up. Could we split the work?',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'We could give the troubleshooting chapters to Annika. She did their last brochure, so she knows their terminology.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'And the final review? Normally that takes a full day.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Well, our new glossary software checks terms automatically.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Right, that should save some time. I’ll tell the client we can do it, but there’ll be a rush fee.',
      },
    ],
    questions: [
      {
        text: 'Why does the client want an earlier deadline?',
        options: [
          'A product launch has been rescheduled.',
          'A regulator requested the documents.',
          'A trade show is starting soon.',
          'A manual contained several errors.',
        ],
        answer: 0,
        explanationVi:
          '"their product launch in Stockholm was moved up" → buổi ra mắt sản phẩm bị dời sớm hơn (A).',
        translationVi: 'Tại sao khách hàng muốn hạn chót sớm hơn?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Why does the woman suggest Annika?',
        options: [
          'She works faster than Lars.',
          'She is familiar with the client’s vocabulary.',
          'She lives in Stockholm.',
          'She has more free time this week.',
        ],
        answer: 1,
        explanationVi:
          '"She did their last brochure, so she knows their terminology" → cô ấy quen thuật ngữ của khách hàng (B).',
        translationVi: 'Tại sao người phụ nữ gợi ý Annika?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the woman imply when she says, "our new glossary software checks terms automatically"?',
        options: [
          'The software needs to be updated.',
          'The client should buy the software.',
          'The review may take less time than usual.',
          'Annika has not learned the software yet.',
        ],
        answer: 2,
        explanationVi:
          'Người đàn ông lo khâu duyệt cuối "takes a full day"; cô đáp phần mềm tự kiểm tra thuật ngữ → ngụ ý khâu duyệt sẽ nhanh hơn (C). Anh xác nhận "that should save some time".',
        translationVi:
          'Người phụ nữ ngụ ý gì khi nói "phần mềm bảng thuật ngữ mới của chúng ta kiểm tra thuật ngữ tự động"?',
        skillTags: ['comprehension.speaker-intent'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Community',
    transcript: [
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Thanks for coming in, Mr. Abernathy. You mentioned on your application that you’d like to volunteer at the botanical garden on weekends.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'That’s right. I retired from teaching last spring, and I’ve always loved gardening.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Wonderful. We actually need help most with our school visits. Since you were a teacher, would you consider leading tours for children?',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'I’d enjoy that, though I don’t know the names of many tropical plants.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'That’s not a problem. All new guides shadow an experienced volunteer for their first three tours. And there’s a printed guidebook you can study at home.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'That sounds manageable. When could I start?',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'There’s an orientation session on the first Saturday of next month. I’ll add your name to the list now.',
      },
    ],
    questions: [
      {
        text: 'Why does the woman ask the man to lead school tours?',
        options: [
          'He has volunteered at other gardens.',
          'He lives near the garden.',
          'He has a background in education.',
          'He studied tropical plants.',
        ],
        answer: 2,
        explanationVi:
          '"Since you were a teacher, would you consider leading tours for children?" → anh có kinh nghiệm giáo dục (C). Anh nói mình không rành cây nhiệt đới nên (D) sai.',
        translationVi:
          'Tại sao người phụ nữ đề nghị người đàn ông dẫn các đoàn tham quan của trường học?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'How will new guides be trained?',
        options: [
          'By attending evening classes',
          'By watching online videos',
          'By taking a written test',
          'By accompanying experienced volunteers',
        ],
        answer: 3,
        explanationVi:
          '"All new guides shadow an experienced volunteer for their first three tours" → đi theo tình nguyện viên có kinh nghiệm (D). "shadow" = "accompany".',
        translationVi: 'Hướng dẫn viên mới sẽ được đào tạo như thế nào?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What will the woman most likely do next?',
        options: [
          'Register the man for an orientation',
          'Give the man a tour of the garden',
          'Call a local school',
          'Print a new guidebook',
        ],
        answer: 0,
        explanationVi:
          '"There’s an orientation session… I’ll add your name to the list now" → đăng ký cho anh tham gia buổi định hướng (A).',
        translationVi: 'Người phụ nữ nhiều khả năng sẽ làm gì tiếp theo?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Music',
    transcript: [
      {
        speaker: 'M',
        accent: 'US',
        text: 'Hi Noor, it’s Callum from Harbor Lane Studios. I’m calling about your band’s recording session on the fourteenth.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Hi Callum. Is everything still on?',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Mostly. You booked Studio A because of the grand piano, but the piano tuner can’t come until the afternoon. So the morning would have to be guitars and drums only.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Our drummer arrives on the noon train.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Ah, I see. Then how about starting at one instead of nine and staying until nine in the evening? Same number of hours, same rate.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'That works. Could you send me an updated confirmation? Our producer needs it to book her flight.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Of course. You’ll have it within the hour.',
      },
    ],
    questions: [
      {
        text: 'Why did the woman book Studio A?',
        options: [
          'It has a particular instrument.',
          'It is the largest room.',
          'It was the only room available.',
          'It is the least expensive room.',
        ],
        answer: 0,
        explanationVi:
          '"You booked Studio A because of the grand piano" → phòng có nhạc cụ đặc biệt (A).',
        translationVi: 'Tại sao người phụ nữ đặt Studio A?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Why does the woman say, "Our drummer arrives on the noon train"?',
        options: [
          'To ask for directions to the station',
          'To explain why the band will be late',
          'To request transportation for a musician',
          'To indicate that a suggested plan will not work',
        ],
        answer: 3,
        explanationVi:
          'Anh đề nghị buổi sáng chỉ thu guitar và trống; cô nói tay trống trưa mới đến → ngụ ý kế hoạch đó không khả thi (D). Anh hiểu ý ("Ah, I see") và đổi sang bắt đầu lúc một giờ.',
        translationVi:
          'Tại sao người phụ nữ nói "Tay trống của chúng tôi đến bằng chuyến tàu buổi trưa"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What does the woman ask the man to send?',
        options: [
          'A revised invoice',
          'An updated booking confirmation',
          'A flight itinerary',
          'A list of studio equipment',
        ],
        answer: 1,
        explanationVi:
          '"Could you send me an updated confirmation?" → xác nhận đặt phòng cập nhật (B). Vé máy bay là việc nhà sản xuất tự đặt (C).',
        translationVi: 'Người phụ nữ yêu cầu người đàn ông gửi gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Seafood',
    transcript: [
      {
        speaker: 'M',
        accent: 'AU',
        text: 'Thanks for joining the call, both of you. As you know, our Tokyo buyer rejected last week’s scallop shipment. Their inspector found the temperature log had a six-hour gap.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'I checked the data. The scallops never actually warmed up; the logger in container four simply lost power during the transfer at Singapore.',
      },
      {
        speaker: 'M2',
        accent: 'GB',
        text: 'Unfortunately that doesn’t matter to the buyer. Without a continuous record, they can’t certify the product, so the contract lets them refuse it.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'So how do we stop it happening again?',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'I’d put two loggers in every container from now on, each with its own battery. They’re about forty dollars apiece, which is nothing compared with a lost shipment.',
      },
      {
        speaker: 'M2',
        accent: 'GB',
        text: 'Agreed. And I’ll negotiate with the buyer about the rejected load. If we can show the backup readings from the ship’s own refrigeration system, they might accept it at a reduced price.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'Good. Gemma, please order the extra loggers today so they’re fitted before Friday’s sailing.',
      },
    ],
    questions: [
      {
        text: 'Why was a shipment rejected?',
        options: [
          'It arrived later than scheduled.',
          'It contained the wrong product.',
          'Its packaging was damaged.',
          'Its temperature record was incomplete.',
        ],
        answer: 3,
        explanationVi:
          '"the temperature log had a six-hour gap" → nhật ký nhiệt độ bị thiếu (D). Hàng thực tế không bị ấm lên; lý do là dữ liệu không liên tục.',
        translationVi: 'Tại sao một lô hàng bị từ chối?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the woman recommend?',
        options: [
          'Changing the shipping route',
          'Hiring an independent inspector',
          'Installing additional monitoring devices',
          'Renting larger containers',
        ],
        answer: 2,
        explanationVi:
          '"I’d put two loggers in every container from now on" → lắp thêm thiết bị ghi nhiệt (C). Tuyến qua Singapore không được đề xuất thay đổi (A).',
        translationVi: 'Người phụ nữ đề xuất điều gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the British man hope the buyer will do?',
        options: [
          'Cancel the contract',
          'Accept the shipment at a lower price',
          'Pay for new equipment',
          'Send a different inspector',
        ],
        answer: 1,
        explanationVi:
          'Người đàn ông thứ hai (giọng Anh) nói nếu có số liệu dự phòng của tàu, "they might accept it at a reduced price" → chấp nhận lô hàng với giá thấp hơn (B).',
        translationVi: 'Người đàn ông giọng Anh hy vọng người mua sẽ làm gì?',
        skillTags: ['comprehension.inference'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Tourism',
    transcript: [
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Mateo, I’ve been looking at the snowmaking costs. Electricity prices went up again this month, and we’re running the snow guns every night.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'We have to, though. Natural snowfall is about forty percent below average so far, and the holiday bookings start in two weeks.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'I’m not saying we stop. But do we really need to cover all eleven runs? Most beginners never leave the three slopes near the lodge.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'The advanced skiers are the ones buying season passes.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Fair enough. Then what if we keep the beginner slopes and two of the expert runs open, and close the rest until it snows? That would cut our power use nearly in half.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'That could work, as long as we tell pass holders exactly which runs are open. Otherwise we’ll get a lot of complaints.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'I’ll have the marketing team put a live run map on the website and send an e-mail update to everyone with a pass.',
      },
    ],
    questions: [
      {
        text: 'What problem does the woman mention?',
        options: [
          'Rising energy costs',
          'A shortage of staff',
          'A decline in bookings',
          'Damaged equipment',
        ],
        answer: 0,
        explanationVi:
          '"Electricity prices went up again this month" → chi phí năng lượng tăng (A). Lượng đặt chỗ không giảm; tuyết tự nhiên mới giảm (C sai).',
        translationVi: 'Người phụ nữ đề cập đến vấn đề gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the man mean when he says, "The advanced skiers are the ones buying season passes"?',
        options: [
          'Season passes should cost more.',
          'Beginners prefer to buy daily tickets.',
          'A marketing campaign has been successful.',
          'Closing all the difficult runs would be unwise.',
        ],
        answer: 3,
        explanationVi:
          'Cô gợi ý chỉ làm tuyết cho dốc dành cho người mới; anh đáp người trượt giỏi mới là người mua vé mùa → ngụ ý đóng hết đường trượt khó là không khôn ngoan (D). Cô đáp "Fair enough" và giữ lại hai đường trượt khó.',
        translationVi:
          'Người đàn ông muốn nói gì khi nói "Những người trượt tuyết giỏi mới là người mua vé cả mùa"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What does the woman say the marketing team will do?',
        options: [
          'Offer discounts to pass holders',
          'Design a new lodge brochure',
          'Provide current information about open runs',
          'Survey customers about their preferences',
        ],
        answer: 2,
        explanationVi:
          '"put a live run map on the website and send an e-mail update" → cung cấp thông tin cập nhật về các đường trượt đang mở (C).',
        translationVi: 'Người phụ nữ nói nhóm marketing sẽ làm gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Arts',
    transcript: [
      {
        speaker: 'M',
        accent: 'US',
        text: 'Beatrix, I’ve got the quote for shipping the orchestra’s instruments to the festival in Lisbon. It’s considerably more than we budgeted.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Is that because of the cellos? Last time the airline insisted on buying a seat for each one.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Partly. But the real cost is the timpani and the harp. They have to go by air freight in climate-controlled crates, and the crates alone cost nine thousand euros to rent.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'What about asking the festival whether a local orchestra could lend us its timpani and harp? Our players would only need a short rehearsal to get used to them.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'That’s worth trying. The festival director, Ms. Varela, used to play in the Lisbon Philharmonic, so she’d know whom to ask.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Then I’ll write to her this afternoon. If she says yes, we should add an extra rehearsal hour to the schedule on the day before the concert.',
      },
    ],
    questions: [
      {
        text: 'According to the man, what accounts for most of the extra cost?',
        options: [
          'Airline seats for the cellos',
          'Festival registration fees',
          'Special containers for some instruments',
          'Hotel rooms for the musicians',
        ],
        answer: 2,
        explanationVi:
          '"the real cost is the timpani and the harp… the crates alone cost nine thousand euros" → thùng chứa đặc biệt cho một số nhạc cụ (C). Ghế máy bay cho cello chỉ là một phần ("Partly") nên (A) là bẫy.',
        translationVi:
          'Theo người đàn ông, điều gì chiếm phần lớn chi phí phát sinh?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Why does the man mention Ms. Varela’s background?',
        options: [
          'To suggest she could help find instruments',
          'To explain why she was chosen as director',
          'To recommend her as a guest performer',
          'To show that the festival is well known',
        ],
        answer: 0,
        explanationVi:
          'Bà từng chơi trong dàn nhạc Lisbon "so she’d know whom to ask" → bà có thể giúp tìm nhạc cụ để mượn (A).',
        translationVi: 'Tại sao người đàn ông nhắc đến lý lịch của bà Varela?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'What change to the schedule does the woman propose?',
        options: [
          'Moving the concert to a later date',
          'Adding rehearsal time before the performance',
          'Sending the instruments a week earlier',
          'Shortening the festival program',
        ],
        answer: 1,
        explanationVi:
          '"we should add an extra rehearsal hour to the schedule on the day before the concert" → thêm thời gian tập trước buổi diễn (B).',
        translationVi: 'Người phụ nữ đề xuất thay đổi gì về lịch trình?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
]
