/** Full Test 03, Part 3: written for Lingo (not from ETS). */
export const P3: object[] = [
  {
    difficulty: 'EASY',
    topic: 'Energy',
    transcript: [
      {
        speaker: 'M',
        accent: 'US',
        text: 'Good morning, Corrin Power and Gas. How can I help you?',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Hi. I got a letter saying a technician will replace my electricity meter with a smart meter next Tuesday. But I’ll be at work all day.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'That shouldn’t be a problem. Could I have your account number, please?',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Sure. It’s four-four-seven-one, two-oh-nine.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Thanks, Ms. Duval. Your meter is on the outside wall of the house, so you don’t need to be at home. The power will just go off for about twenty minutes.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Oh, good. My freezer will be fine for that long. Will my bill look different afterwards?',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Yes, from next month it’ll show how much electricity you use each day. I’ll text you a link to a short guide that explains the new layout.',
      },
      { speaker: 'W', accent: 'CA', text: 'Great. Thanks for your help.' },
    ],
    questions: [
      {
        text: 'Why is the woman calling?',
        options: [
          'To report a power outage',
          'To pay an overdue bill',
          'To ask about a scheduled visit',
          'To order a new appliance',
        ],
        answer: 2,
        explanationVi:
          '"a technician will replace my electricity meter… next Tuesday. But I’ll be at work all day" → cô hỏi về lịch kỹ thuật viên đến thay đồng hồ (C). "freezer", "bill" chỉ là bẫy lặp từ.',
        translationVi: 'Tại sao người phụ nữ gọi điện?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the man say about the woman’s meter?',
        options: [
          'It is located outside the house.',
          'It was installed incorrectly.',
          'It is no longer available.',
          'It needs a new account number.',
        ],
        answer: 0,
        explanationVi:
          '"Your meter is on the outside wall of the house, so you don’t need to be at home" → đồng hồ nằm bên ngoài nhà (A).',
        translationVi: 'Người đàn ông nói gì về đồng hồ điện của người phụ nữ?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What will the man send to the woman?',
        options: [
          'A technician’s phone number',
          'A revised appointment letter',
          'A discount code',
          'Information about a bill',
        ],
        answer: 3,
        explanationVi:
          '"I’ll text you a link to a short guide that explains the new layout" (của hóa đơn) → gửi thông tin giải thích hóa đơn (D). "letter", "technician" là bẫy lặp từ.',
        translationVi: 'Người đàn ông sẽ gửi gì cho người phụ nữ?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Training',
    transcript: [
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Tomasz, have you signed up for the data visualization workshop yet? HR said it’s open to everyone in accounting.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'I tried this morning, but the session on the fourteenth was already full.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'That’s a shame. They’re only running it once this quarter.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'I know. I really wanted to learn how to build those dashboards for our monthly reports.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Well, the trainer recorded an online version last spring. It covers the same material, and you can go through it at your own pace.',
      },
      { speaker: 'M', accent: 'AU', text: 'Really? Where can I find it?' },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'It’s in the learning portal under “Finance Tools.” You’ll need an approval code from your manager, though.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'OK. I’ll ask Ms. Ferreira for one after lunch.',
      },
    ],
    questions: [
      {
        text: 'What are the speakers mainly discussing?',
        options: [
          'A department budget',
          'A training event',
          'A job opening',
          'A monthly sales report',
        ],
        answer: 1,
        explanationVi:
          '"have you signed up for the data visualization workshop yet?" → họ bàn về một buổi đào tạo (B). "monthly reports" chỉ là bẫy lặp từ.',
        translationVi: 'Những người nói chủ yếu đang thảo luận về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the woman suggest?',
        options: [
          'Asking HR to add another session',
          'Waiting until next quarter',
          'Contacting the trainer directly',
          'Taking a course online',
        ],
        answer: 3,
        explanationVi:
          '"the trainer recorded an online version… you can go through it at your own pace" → gợi ý học bản trực tuyến (D).',
        translationVi: 'Người phụ nữ gợi ý điều gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What will the man do after lunch?',
        options: [
          'Request a code from his supervisor',
          'Update a financial dashboard',
          'Register for a session on the fourteenth',
          'Visit the HR office',
        ],
        answer: 0,
        explanationVi:
          '"You’ll need an approval code from your manager" – "I’ll ask Ms. Ferreira for one after lunch" → xin mã từ cấp trên (A, "supervisor" = "manager").',
        translationVi: 'Người đàn ông sẽ làm gì sau bữa trưa?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Construction',
    transcript: [
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Morning, both. The concrete for the third-floor slab was supposed to arrive at seven, and it’s nearly eight. Rashid, any news from the supplier?',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'I spoke to their dispatcher. One of their mixer trucks broke down on the ring road, so they’re sending the load from their other plant instead. That adds about ninety minutes.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Ninety minutes? The forecast says heavy rain from two o’clock.',
      },
      {
        speaker: 'M2',
        accent: 'US',
        text: 'We could still make it if we bring in a second pump. That would cut the pour time almost in half.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Is there a second pump anywhere nearby?',
      },
      {
        speaker: 'M2',
        accent: 'US',
        text: 'There’s one at the Elmwood project, and they finished their foundations yesterday.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'I’ll call their site office and ask them to send it over with an operator.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Please do. And Kevin, get the tarps ready, just in case.',
      },
    ],
    questions: [
      {
        text: 'What problem are the speakers discussing?',
        options: [
          'A delivery is behind schedule.',
          'A worker has been injured.',
          'A floor plan has been changed.',
          'A permit has expired.',
        ],
        answer: 0,
        explanationVi:
          '"The concrete… was supposed to arrive at seven, and it’s nearly eight" → bê tông giao trễ (A).',
        translationVi: 'Những người nói đang thảo luận vấn đề gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'Why does the woman say, "The forecast says heavy rain from two o’clock"?',
        options: [
          'To suggest canceling an order',
          'To explain why a truck broke down',
          'To express concern about finishing the work in time',
          'To ask a colleague for a weather report',
        ],
        answer: 2,
        explanationVi:
          'Bê tông trễ thêm 90 phút, mà mưa lớn từ 2 giờ → cô lo không kịp đổ xong (C). Người kia đáp "We could still make it…" xác nhận ý này.',
        translationVi:
          'Tại sao người phụ nữ nói "Dự báo có mưa lớn từ hai giờ"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What will Rashid most likely do next?',
        options: [
          'Repair a mixer truck',
          'Contact another construction site',
          'Order more concrete',
          'Operate a pump',
        ],
        answer: 1,
        explanationVi:
          'Rashid: "I’ll call their site office and ask them to send it over" → liên hệ công trường Elmwood (B). Người vận hành bơm là người khác (D sai).',
        translationVi: 'Rashid nhiều khả năng sẽ làm gì tiếp theo?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Banking',
    transcript: [
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Good afternoon, Ms. Okafor. You’re here about an account for your landscaping company, is that right?',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Yes. I registered the business last month, and I’d like to keep its money separate from my personal savings.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Very sensible. I’ve checked the documents you uploaded. Your ID and registration certificate are fine, but we also need proof of the business address.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'I’m working from home at the moment. Would a utility bill in my name be enough?',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'It would, as long as it’s dated within the last three months.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'My latest one came last week. I can forward the e-mail right now.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Perfect. Once it’s in, the account should be active by Thursday. Would you also like a card reader for client payments? There’s no rental charge for the first six months.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Yes, please. Most of my customers ask to pay by card these days.',
      },
    ],
    questions: [
      {
        text: 'Why is the woman meeting with the man?',
        options: [
          'To apply for a home loan',
          'To pay a utility bill',
          'To report a lost card',
          'To open a business account',
        ],
        answer: 3,
        explanationVi:
          '"You’re here about an account for your landscaping company" → mở tài khoản cho doanh nghiệp (D). "utility bill", "card" là bẫy lặp từ.',
        translationVi: 'Tại sao người phụ nữ gặp người đàn ông?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the man say is still needed?',
        options: [
          'A form of identification',
          'Evidence of an address',
          'A registration certificate',
          'A list of clients',
        ],
        answer: 1,
        explanationVi:
          '"Your ID and registration certificate are fine, but we also need proof of the business address" → cần bằng chứng địa chỉ (B). A và C đã đủ.',
        translationVi: 'Người đàn ông nói vẫn còn cần gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the man offer the woman?',
        options: [
          'A lower interest rate',
          'An extended deadline',
          'Free use of a device for a limited time',
          'A meeting with a financial advisor',
        ],
        answer: 2,
        explanationVi:
          '"a card reader… There’s no rental charge for the first six months" → dùng miễn phí thiết bị trong thời gian giới hạn (C).',
        translationVi: 'Người đàn ông đề nghị gì với người phụ nữ?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Agriculture',
    transcript: [
      {
        speaker: 'W',
        accent: 'US',
        text: 'Hi, Gordon. It’s Priya from Sunvale Juices. I’m calling about our apple contract for September.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Priya, I was about to call you. The late frost in April hit our orchards hard. We’re expecting roughly sixty percent of last year’s crop.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Sixty percent? We’ve already printed the labels for our Orchard Gold blend.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'I understand. The good news is that the pears came through fine. Several of our growers actually have more than they can sell.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Hmm. Our product team has been talking about an apple-pear juice for a while.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'If that’s of interest, I could send you samples of three varieties this week.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Please do. And could you set the remaining apples aside for us before you offer them to other buyers?',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Of course. I’ll hold them for you until the end of the month.',
      },
    ],
    questions: [
      {
        text: 'What is the conversation mainly about?',
        options: [
          'A labeling mistake',
          'A late payment',
          'A smaller harvest than expected',
          'The opening of a new factory',
        ],
        answer: 2,
        explanationVi:
          '"The late frost… We’re expecting roughly sixty percent of last year’s crop" → vụ thu hoạch giảm (C). "labels" là bẫy lặp từ.',
        translationVi: 'Cuộc hội thoại chủ yếu nói về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the woman imply when she says, "Our product team has been talking about an apple-pear juice for a while"?',
        options: [
          'She disagrees with a decision.',
          'She wants to end a contract.',
          'Her team has finished testing a product.',
          'She may be interested in buying pears.',
        ],
        answer: 3,
        explanationVi:
          'Ngay sau khi ông nói lê còn dư, cô nhắc đến ý tưởng nước ép táo-lê → có thể muốn mua lê (D). Ông đáp lại bằng việc gửi mẫu.',
        translationVi:
          'Người phụ nữ ngụ ý gì khi nói "Nhóm sản phẩm của chúng tôi đã bàn về nước ép táo-lê từ lâu"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What does the woman ask the man to do?',
        options: [
          'Reserve some produce',
          'Print new labels',
          'Visit her product team',
          'Lower his prices',
        ],
        answer: 0,
        explanationVi:
          '"could you set the remaining apples aside for us" → giữ lại số táo còn lại cho cô (A, "produce" = nông sản).',
        translationVi: 'Người phụ nữ yêu cầu người đàn ông làm gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Office',
    transcript: [
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Hannah, I saw the e-mail about the fourth floor switching to shared desks next month. How exactly will that work?',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Nobody will have an assigned desk anymore. You reserve one through the facilities app the day before.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'What about our paperwork? I keep a lot of client folders in my drawers.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Everyone’s getting a personal locker in the area by the kitchen. They’re a decent size.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'I doubt all my folders will fit in a locker.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Then it’s a good time to digitize them. Records has a high-speed scanner, and they’ll do the scanning for you if you drop the folders off by Friday.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'By Friday? I’d better start going through them this afternoon, then.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Good idea. And remember to mark each box with your department code.',
      },
    ],
    questions: [
      {
        text: 'What change are the speakers discussing?',
        options: [
          'The arrival of a new client',
          'A new way of assigning workspaces',
          'A move to another building',
          'The renovation of a kitchen',
        ],
        answer: 1,
        explanationVi:
          '"the fourth floor switching to shared desks… Nobody will have an assigned desk anymore" → cách bố trí chỗ ngồi mới (B).',
        translationVi: 'Những người nói đang thảo luận về thay đổi nào?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'According to the woman, where will the lockers be?',
        options: [
          'Near a kitchen',
          'In the records office',
          'On a different floor',
          'Beside the elevators',
        ],
        answer: 0,
        explanationVi:
          '"a personal locker in the area by the kitchen" → gần bếp (A). "Records" là bẫy lặp từ.',
        translationVi: 'Theo người phụ nữ, tủ khóa sẽ ở đâu?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the man say he will do this afternoon?',
        options: [
          'Reserve a desk',
          'Scan some documents',
          'Install an application',
          'Sort through some files',
        ],
        answer: 3,
        explanationVi:
          '"I’d better start going through them this afternoon" (them = các tập hồ sơ) → sắp xếp hồ sơ (D). Việc scan do phòng Records làm (B sai).',
        translationVi: 'Người đàn ông nói chiều nay anh sẽ làm gì?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Training',
    transcript: [
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Lucy, Ahmed, I’ve just heard from Voltara Training. The instructor for next week’s high-voltage safety course has broken his wrist.',
      },
      {
        speaker: 'W2',
        accent: 'CA',
        text: 'Oh no. Twelve of our line technicians need that certificate renewed before the end of the month.',
      },
      { speaker: 'M', accent: 'US', text: 'Can Voltara send somebody else?' },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'They’ve offered a replacement, but not until the following Monday.',
      },
      {
        speaker: 'W2',
        accent: 'CA',
        text: 'Well, that’s three days before the certificates expire.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Then let’s take it. We just need to make sure none of the twelve is on call that day.',
      },
      {
        speaker: 'W2',
        accent: 'CA',
        text: 'I’ll redo the rota. But Accounting has the training room booked that Monday.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'We could use the meeting room at the Northfield substation. It has a projector, and it’s closer for most of the crew anyway.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Good. I’ll e-mail Voltara now to confirm the new date.',
      },
    ],
    questions: [
      {
        text: 'What is the conversation mainly about?',
        options: [
          'Hiring line technicians',
          'Repairing equipment at a substation',
          'Renewing a contract with a supplier',
          'Rescheduling a safety course',
        ],
        answer: 3,
        explanationVi:
          'Giảng viên khóa "high-voltage safety course" bị gãy tay, Voltara đề xuất ngày khác → bàn việc dời lịch khóa an toàn (D).',
        translationVi: 'Cuộc hội thoại chủ yếu nói về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'Why does one of the women say, "that’s three days before the certificates expire"?',
        options: [
          'To object to a proposed date',
          'To request additional funding',
          'To point out that a date would still work',
          'To explain why some certificates were lost',
        ],
        answer: 2,
        explanationVi:
          'Ngày thay thế vẫn trước hạn chứng chỉ ba ngày → vẫn kịp (C). Người đàn ông đáp "Then let’s take it", xác nhận ý này.',
        translationVi:
          'Tại sao một người phụ nữ nói "ngày đó trước khi chứng chỉ hết hạn ba ngày"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What will the man do next?',
        options: [
          'Revise a work schedule',
          'Contact a training provider',
          'Book a training room',
          'Set up a projector',
        ],
        answer: 1,
        explanationVi:
          '"I’ll e-mail Voltara now to confirm the new date" → liên hệ đơn vị đào tạo (B). Việc sửa lịch trực ("rota") là của người phụ nữ (A sai).',
        translationVi: 'Người đàn ông sẽ làm gì tiếp theo?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Energy',
    transcript: [
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Mr. Hale, I’ve finished reviewing the drone survey of your warehouse roof. The south side gets enough sun to cover about forty percent of your daytime electricity.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'That’s more than we’d hoped. When could installation start?',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Well, there’s a complication. The building dates from the seventies, and our engineer isn’t sure the roof can carry the panels plus their mounting frames.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'We had the roof membrane replaced only two years ago.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'The membrane is just the waterproof layer, though. What matters is the steel structure underneath. We’d need a load assessment before we could give you a price.',
      },
      { speaker: 'M', accent: 'AU', text: 'And how long would that take?' },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'About three weeks. Alternatively, there’s a lightweight panel system that doesn’t require the assessment, but it generates around fifteen percent less power.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'I’d rather know exactly what we’re working with. The board will want the full figures anyway.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'In that case, I’ll send you the contract for the assessment this afternoon.',
      },
    ],
    questions: [
      {
        text: 'Who most likely is the woman?',
        options: [
          'A solar energy consultant',
          'A drone pilot',
          'A roofing contractor',
          'A member of a company board',
        ],
        answer: 0,
        explanationVi:
          'Cô xem khảo sát mái, tính tỉ lệ điện mặt trời, báo giá lắp tấm pin → tư vấn năng lượng mặt trời (A). "drone", "roof", "board" là bẫy lặp từ.',
        translationVi: 'Người phụ nữ nhiều khả năng là ai?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'Why does the man say, "We had the roof membrane replaced only two years ago"?',
        options: [
          'To complain about poor workmanship',
          'To suggest that the roof is in good condition',
          'To ask for a discount',
          'To explain a delay in a survey',
        ],
        answer: 1,
        explanationVi:
          'Đáp lại nỗi lo mái không chịu nổi tải, ông nhắc mái mới thay lớp chống thấm → ngụ ý mái vẫn tốt (B). Cô giải thích lớp màng không quyết định khả năng chịu lực.',
        translationVi:
          'Tại sao người đàn ông nói "Chúng tôi mới thay lớp màng mái hai năm trước"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What does the man decide to do?',
        options: [
          'Install a lightweight system',
          'Present a price quote to the board',
          'Have the roof structure evaluated',
          'Postpone the project for a year',
        ],
        answer: 2,
        explanationVi:
          '"I’d rather know exactly what we’re working with" → chọn đánh giá tải trọng kết cấu mái (C); cô sẽ gửi "the contract for the assessment". Hệ thống nhẹ là phương án bị bỏ (A sai).',
        translationVi: 'Người đàn ông quyết định làm gì?',
        skillTags: ['comprehension.inference'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Finance',
    transcript: [
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Carmen, it’s about the press line we’re buying from the German manufacturer. The second installment, one point two million euros, is due in October.',
      },
      { speaker: 'W', accent: 'US', text: 'Right. Is something wrong?' },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'The euro has risen almost four percent against the dollar since we signed. If that continues, the payment could cost us an extra hundred thousand dollars or more.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Hmm. The board set the capital budget at the old rate.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Exactly. I’d suggest fixing today’s rate with a forward contract through the bank. There’s a small fee, but we’d know the exact amount in advance.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'And if the euro falls instead, we’d miss out on the savings.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'That’s true. We could cover half the amount. That’s what our treasury policy recommends for payments over a million.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'That sounds reasonable. Put the figures in a short memo, and I’ll take it to the CFO on Wednesday.',
      },
    ],
    questions: [
      {
        text: 'What are the speakers mainly discussing?',
        options: [
          'Choosing an equipment supplier',
          'Revising a production schedule',
          'Managing an exchange-rate risk',
          'Negotiating a bank’s fees',
        ],
        answer: 2,
        explanationVi:
          '"The euro has risen almost four percent against the dollar… fixing today’s rate with a forward contract" → quản lý rủi ro tỷ giá (C).',
        translationVi: 'Những người nói chủ yếu thảo luận điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the woman imply when she says, "The board set the capital budget at the old rate"?',
        options: [
          'The board has already approved a contract.',
          'The bank recently lowered its rates.',
          'She was not told about the purchase.',
          'A higher cost would exceed the approved amount.',
        ],
        answer: 3,
        explanationVi:
          'Ngân sách tính theo tỷ giá cũ, nếu khoản thanh toán tăng thêm 100.000 USD thì sẽ vượt ngân sách đã duyệt (D). Người đàn ông đáp "Exactly".',
        translationVi:
          'Người phụ nữ ngụ ý gì khi nói "Hội đồng quản trị đặt ngân sách đầu tư theo tỷ giá cũ"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What does the woman ask the man to do?',
        options: [
          'Call the manufacturer',
          'Prepare a written summary',
          'Pay a fee to the bank',
          'Meet with the CFO',
        ],
        answer: 1,
        explanationVi:
          '"Put the figures in a short memo" → soạn bản tóm tắt bằng văn bản (B). Chính cô sẽ gặp CFO (D sai).',
        translationVi: 'Người phụ nữ yêu cầu người đàn ông làm gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Engineering',
    transcript: [
      {
        speaker: 'M',
        accent: 'US',
        text: 'Thanks for joining. You’ve both seen the drone footage from the Carver Street bridge inspection?',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'I have. The corrosion on the underside girders is worse than in last year’s report, especially near the east abutment.',
      },
      {
        speaker: 'W2',
        accent: 'GB',
        text: 'I wouldn’t call it urgent yet. By my calculations, the loss of steel is still within tolerance.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Even so, the city has asked us whether the weight limit should be lowered before winter.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Lowering it would send every delivery truck through the town center.',
      },
      {
        speaker: 'W2',
        accent: 'GB',
        text: 'Which the city council won’t like at all. I’d rather we fit strain sensors to those girders and monitor them over the winter. If the readings change, we act then.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'That’s a fair middle ground. How quickly can we get sensors?',
      },
      {
        speaker: 'W2',
        accent: 'GB',
        text: 'Our usual supplier in Leeds ships within ten days.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Then I’ll draft our recommendation to the city this afternoon. Olivia, could you get a quote from them?',
      },
    ],
    questions: [
      {
        text: 'What is the purpose of the meeting?',
        options: [
          'To plan the purchase of a drone',
          'To review the findings of an inspection',
          'To design a new bridge',
          'To prepare a speech for a city council',
        ],
        answer: 1,
        explanationVi:
          '"You’ve both seen the drone footage from the Carver Street bridge inspection?" rồi bàn về mức ăn mòn → xem xét kết quả kiểm tra (B).',
        translationVi: 'Mục đích của cuộc họp là gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does one of the women imply when she says, "Which the city council won’t like at all"?',
        options: [
          'A traffic change would be unpopular.',
          'The council has rejected her calculations.',
          'The town center is being rebuilt.',
          'Delivery companies will raise their prices.',
        ],
        answer: 0,
        explanationVi:
          'Hạ tải trọng sẽ đẩy xe tải vào trung tâm thị trấn, và hội đồng thành phố sẽ không thích → thay đổi giao thông này sẽ bị phản đối (A).',
        translationVi:
          'Một người phụ nữ ngụ ý gì khi nói "Điều mà hội đồng thành phố sẽ chẳng thích chút nào"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What is Olivia asked to do?',
        options: [
          'Draft a recommendation',
          'Install some sensors',
          'Inspect the east abutment',
          'Obtain a price estimate',
        ],
        answer: 3,
        explanationVi:
          '"Olivia, could you get a quote from them?" → lấy báo giá (D, "price estimate" = "quote"). Bản đề xuất do người đàn ông viết (A sai).',
        translationVi: 'Olivia được yêu cầu làm gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Food production',
    transcript: [
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Dmitri, we have a problem with the oat bars on line two. The new wrappers list the ingredients from the old recipe. There’s no mention of the almond flour we started using last week.',
      },
      { speaker: 'M', accent: 'CA', text: 'How many units have gone out?' },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'According to the packing records, about eighteen thousand left the plant on Monday. The rest are still in our cold storage.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Monday’s shipment went to the distributor in Halton, didn’t it? They don’t deliver to stores until Thursday.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'So we might be able to stop them before they reach the shelves.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'I’ll phone their warehouse manager right away. What about the stock that’s still here?',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Rather than rewrapping everything, we can put corrected stickers over the ingredient list. The printer says they’ll have them ready by tomorrow morning.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Good. And let’s find out how the old artwork got approved. That should have been caught at the proof stage.',
      },
    ],
    questions: [
      {
        text: 'What problem does the woman report?',
        options: [
          'A machine on a production line has broken down.',
          'A shipment was sent to the wrong distributor.',
          'An ingredient has run out.',
          'Some packaging contains inaccurate information.',
        ],
        answer: 3,
        explanationVi:
          '"The new wrappers list the ingredients from the old recipe" → bao bì ghi sai thành phần (D). "line two", "distributor" là bẫy lặp từ.',
        translationVi: 'Người phụ nữ báo cáo vấn đề gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'Why does the man say, "They don’t deliver to stores until Thursday"?',
        options: [
          'To complain about a slow distributor',
          'To request an earlier delivery date',
          'To indicate that there is still time to act',
          'To correct an error in some records',
        ],
        answer: 2,
        explanationVi:
          'Hàng chưa đến cửa hàng trước thứ Năm → vẫn còn kịp chặn lại (C). Cô đáp "So we might be able to stop them before they reach the shelves".',
        translationVi:
          'Tại sao người đàn ông nói "Họ chưa giao cho cửa hàng trước thứ Năm"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'According to the woman, what will be ready tomorrow morning?',
        options: [
          'Labels to cover some printed text',
          'New wrappers for line two',
          'Updated packing records',
          'Samples of almond flour',
        ],
        answer: 0,
        explanationVi:
          '"put corrected stickers over the ingredient list… they’ll have them ready by tomorrow morning" → nhãn dán che phần chữ in sai (A). Không in lại bao bì ("Rather than rewrapping"), nên B sai.',
        translationVi: 'Theo người phụ nữ, thứ gì sẽ sẵn sàng vào sáng mai?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Banking',
    transcript: [
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Let’s talk about the mortgage backlog. We have over three hundred applications waiting for review, and customers are waiting nearly five weeks for a decision.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Five weeks? Our competitors advertise ten days.',
      },
      {
        speaker: 'M2',
        accent: 'AU',
        text: 'Part of it is that two underwriters left in August, and we still haven’t replaced them.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Recruiting experienced underwriters takes months. I’m thinking of hiring an outside firm to handle the simpler applications in the meantime.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'That isn’t cheap, though. And customer data would have to leave our systems.',
      },
      {
        speaker: 'M2',
        accent: 'AU',
        text: 'Actually, most of the delay happens at the first document check, not in underwriting. Half the files arrive without pay slips or tax forms.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'So if applicants sent in complete files to begin with…',
      },
      {
        speaker: 'M2',
        accent: 'AU',
        text: 'Exactly. A checklist in our mobile app that won’t let people submit until every document is uploaded could clear a lot of that.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Let’s try that first. Could you ask the digital team how long it would take to build?',
      },
    ],
    questions: [
      {
        text: 'What problem are the speakers discussing?',
        options: [
          'Applications are taking too long to process.',
          'A mobile app has stopped working.',
          'Customers are switching to competitors.',
          'Some customer files have been lost.',
        ],
        answer: 0,
        explanationVi:
          '"three hundred applications waiting for review… nearly five weeks for a decision" → hồ sơ xử lý quá lâu (A). Không ai nói khách đã chuyển sang đối thủ (C).',
        translationVi: 'Những người nói đang thảo luận vấn đề gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the woman imply when she says, "Our competitors advertise ten days"?',
        options: [
          'The bank should hire staff from its competitors.',
          'The bank’s service compares poorly with others.',
          'An advertisement contains a mistake.',
          'Customers prefer to apply online.',
        ],
        answer: 1,
        explanationVi:
          'Ngân hàng mất gần năm tuần, đối thủ quảng cáo mười ngày → dịch vụ của họ kém hơn hẳn (B).',
        translationVi:
          'Người phụ nữ ngụ ý gì khi nói "Đối thủ của chúng ta quảng cáo mười ngày"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'According to the second man, what causes most of the delay?',
        options: [
          'A shortage of experienced underwriters',
          'Security checks on customer data',
          'Incomplete application documents',
          'A slow mobile application',
        ],
        answer: 2,
        explanationVi:
          '"most of the delay happens at the first document check… Half the files arrive without pay slips or tax forms" → hồ sơ thiếu giấy tờ (C). Thiếu nhân sự chỉ là "Part of it" (A là bẫy).',
        translationVi:
          'Theo người đàn ông thứ hai, điều gì gây ra phần lớn sự chậm trễ?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Education',
    transcript: [
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Graham, the regional water authority has confirmed it will fund twenty places on our apprenticeship program for treatment-plant operators.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'That’s excellent. Twenty is more than we’d planned for.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'It is, but they want the first group to start in January instead of September.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'January? We still haven’t hired anyone to teach the water chemistry module.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'I’ve thought about that. The authority’s own lab supervisor, Dr. Imani, has offered to teach it for the first term until we find someone permanent.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Well, that solves one problem. But our lab can only take twelve students at a time.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Then we split the group and run the practical sessions on two days. The college has spare lab time on Fridays.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'That could work. I’ll check with the timetabling office before we reply to the authority.',
      },
    ],
    questions: [
      {
        text: 'What news does the woman share?',
        options: [
          'A laboratory will be renovated.',
          'An instructor has resigned.',
          'Funding for a program has been confirmed.',
          'A course has been canceled.',
        ],
        answer: 2,
        explanationVi:
          '"the regional water authority has confirmed it will fund twenty places" → nguồn tài trợ đã được xác nhận (C).',
        translationVi: 'Người phụ nữ chia sẻ tin gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the woman say about Dr. Imani?',
        options: [
          'She has agreed to teach on a temporary basis.',
          'She will manage the college’s laboratory.',
          'She has applied for a permanent position.',
          'She designed the chemistry module.',
        ],
        answer: 0,
        explanationVi:
          '"Dr. Imani, has offered to teach it for the first term until we find someone permanent" → dạy tạm thời (A). "permanent", "lab" là bẫy lặp từ.',
        translationVi: 'Người phụ nữ nói gì về Tiến sĩ Imani?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Why does the woman suggest dividing the group?',
        options: [
          'To reduce training costs',
          'Because a facility has limited space',
          'Because some students will start later',
          'To meet the funder’s requirements',
        ],
        answer: 1,
        explanationVi:
          'Do "our lab can only take twelve students at a time" mà có 20 học viên → chia nhóm vì phòng lab có sức chứa giới hạn (B).',
        translationVi: 'Tại sao người phụ nữ đề xuất chia nhóm?',
        skillTags: ['comprehension.inference'],
      },
    ],
  },
]
