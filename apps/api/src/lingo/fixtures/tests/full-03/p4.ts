/** One talk: every line by the narrator, in one accent. */
const talk = (accent: 'US' | 'GB' | 'AU' | 'CA', lines: string[]) =>
  lines.map((text) => ({ speaker: 'N', accent, text }))

/** Full Test 03, Part 4: written for Lingo (not from ETS). */
export const P4: object[] = [
  {
    difficulty: 'EASY',
    topic: 'Agriculture',
    transcript: talk('US', [
      'Good afternoon, and welcome to the Harlow County Agricultural Fair. We have a quick change to today’s schedule.',
      'The dairy cattle judging, which was planned for two o’clock in the main show ring, will now take place at three-thirty in Barn C.',
      'The show ring is needed for the tractor-pulling contest, which has been moved up because heavy rain is expected later this evening.',
      'Also, a reminder that entries for the pie-baking contest must be dropped off at the Exhibition Hall by one P.M.',
      'Winners will be announced at five, and every entrant will receive two free tickets to tomorrow night’s concert.',
    ]),
    questions: [
      {
        text: 'What is the purpose of the announcement?',
        options: [
          'To introduce a new event at the fair',
          'To explain a rule for exhibitors',
          'To report a change to the schedule',
          'To thank volunteers for their help',
        ],
        answer: 2,
        explanationVi:
          '"We have a quick change to today’s schedule" + phần chấm bò sữa dời giờ và địa điểm → thông báo thay đổi lịch (C). Thi kéo máy kéo không phải sự kiện mới, chỉ được dời sớm hơn (A sai).',
        translationVi: 'Mục đích của thông báo là gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'Why was the tractor-pulling contest moved?',
        options: [
          'Bad weather is expected.',
          'The show ring is being repaired.',
          'More participants have signed up.',
          'A judge arrived late.',
        ],
        answer: 0,
        explanationVi:
          '"moved up because heavy rain is expected later this evening" → vì dự báo thời tiết xấu (A). "The show ring" được nhắc lại nhưng không hề nói đang sửa (B là bẫy lặp từ).',
        translationVi: 'Vì sao cuộc thi kéo máy kéo được dời lịch?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What will every pie-baking contest entrant receive?',
        options: [
          'A cookbook',
          'A discount on food at the fair',
          'A ribbon',
          'Tickets to a concert',
        ],
        answer: 3,
        explanationVi:
          '"every entrant will receive two free tickets to tomorrow night’s concert" → vé xem hoà nhạc (D). Không nhắc sách nấu ăn (A), giảm giá đồ ăn (B) hay ruy băng giải thưởng (C).',
        translationVi:
          'Mọi người tham gia cuộc thi làm bánh nướng sẽ nhận được gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Banking',
    transcript: talk('GB', [
      'You have reached the Elmstead branch of Corbridge Building Society.',
      'Please note that our branch on Hatfield Road is closed until the twenty-eighth of April for refurbishment.',
      'During this time, a temporary counter is operating inside Elmstead Public Library, two doors down, from nine A.M. to three P.M., Monday to Friday.',
      'At the temporary counter, you can pay in cheques and withdraw cash. However, mortgage appointments are being held at our Kingsley branch instead.',
      'You can also manage most of your accounts through our mobile app, which now lets you pay in a cheque simply by taking a photo of it.',
      'To speak to an adviser, please stay on the line.',
    ]),
    questions: [
      {
        text: 'Why is the branch closed?',
        options: [
          'It is moving into a library.',
          'It is being renovated.',
          'It is a public holiday.',
          'It is merging with another branch.',
        ],
        answer: 1,
        explanationVi:
          '"closed until the twenty-eighth of April for refurbishment" → đang được sửa sang (B). Thư viện chỉ là nơi đặt quầy tạm thời, chi nhánh không chuyển hẳn vào đó (A là bẫy).',
        translationVi: 'Vì sao chi nhánh đóng cửa?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Where should customers go for a mortgage appointment?',
        options: [
          'To the public library',
          'To the Hatfield Road branch',
          'To the head office',
          'To the Kingsley branch',
        ],
        answer: 3,
        explanationVi:
          '"mortgage appointments are being held at our Kingsley branch instead" → chi nhánh Kingsley (D). Quầy ở thư viện chỉ nhận séc và rút tiền (A sai); chi nhánh Hatfield Road đang đóng (B sai).',
        translationVi:
          'Khách hàng nên đến đâu cho buổi hẹn về khoản vay thế chấp?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What new feature of the mobile app does the speaker mention?',
        options: [
          'Depositing a cheque with a photograph',
          'Booking appointments with an adviser',
          'Chatting with branch staff',
          'Opening a savings account',
        ],
        answer: 0,
        explanationVi:
          '"now lets you pay in a cheque simply by taking a photo of it" → nộp séc bằng cách chụp ảnh (A). Muốn gặp tư vấn viên thì giữ máy, không phải qua ứng dụng (B sai).',
        translationVi:
          'Người nói nhắc đến tính năng mới nào của ứng dụng di động?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Construction',
    transcript: talk('AU', [
      'Morning, everyone. Before you head up, a few things for today on the Kestrel Wharf site.',
      'The tower crane failed its weekly inspection yesterday afternoon. A hydraulic line needs replacing, and the part won’t arrive until Thursday.',
      'That means the concrete pour for level six is off for now. Anything that has to be lifted, we’ll do with the mobile crane, and that’s booked for mornings only.',
      'So, Jarrah, your crew will move over to the fit-out on level two. The plasterboard was delivered on Friday, and it’s sitting there waiting.',
      'One more thing. The neighbours on Quarry Street have complained about trucks idling outside their houses before seven.',
      'From tomorrow, no deliveries before seven-thirty. Please pass that on to your suppliers.',
    ]),
    questions: [
      {
        text: 'What problem does the speaker mention?',
        options: [
          'A piece of equipment needs to be repaired.',
          'A delivery of materials is missing.',
          'Some workers have not arrived.',
          'A building permit has expired.',
        ],
        answer: 0,
        explanationVi:
          'Cần cẩu tháp không qua kiểm định, phải thay ống thuỷ lực → thiết bị cần sửa (A). Tấm thạch cao đã được giao từ thứ Sáu, không hề thiếu (B sai).',
        translationVi: 'Người nói đề cập đến vấn đề gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Why does the speaker say, "The plasterboard was delivered on Friday, and it’s sitting there waiting"?',
        options: [
          'To complain about a supplier',
          'To ask for help moving some materials',
          'To indicate that a crew can start work right away',
          'To explain why a storage area is full',
        ],
        answer: 2,
        explanationVi:
          'Ngay trước đó người nói chuyển đội của Jarrah sang làm hoàn thiện tầng 2; câu này cho biết vật liệu đã sẵn sàng → đội có thể bắt tay vào việc ngay (C). Không có ý phàn nàn nhà cung cấp (A) hay kho bị đầy (D).',
        translationVi:
          'Vì sao người nói nói "Tấm thạch cao đã được giao hôm thứ Sáu và đang nằm chờ ở đó"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What are the listeners asked to tell their suppliers?',
        options: [
          'Trucks should park on Quarry Street.',
          'Deliveries must not arrive before a certain time.',
          'The mobile crane is available in the afternoon.',
          'Orders for level six have been cancelled.',
        ],
        answer: 1,
        explanationVi:
          '"no deliveries before seven-thirty. Please pass that on to your suppliers" → không giao hàng trước 7 giờ 30 (B). Quarry Street là nơi hàng xóm phàn nàn, không phải chỗ đỗ xe (A sai); cần cẩu di động chỉ dùng buổi sáng (C sai).',
        translationVi:
          'Người nghe được yêu cầu báo gì cho nhà cung cấp của họ?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Energy',
    transcript: talk('CA', [
      'In regional news, Pinecrest Township council voted last night to approve a forty-megawatt solar farm on a former gravel pit east of Highway 9.',
      'The project, led by Northlight Renewables, was rejected two years ago after residents raised concerns about the loss of farmland.',
      'This time, the company moved the project to land that can’t be farmed, and the vote passed six to one.',
      'Northlight says construction will create about a hundred and twenty temporary jobs and that the farm will power roughly eight thousand homes.',
      'The township will also receive an annual payment, which council members say will go toward repairing rural roads.',
      'Construction is expected to begin next spring. We’ll have more on this story after the weather.',
    ]),
    questions: [
      {
        text: 'What is the news report mainly about?',
        options: [
          'The opening of a new highway',
          'A protest by local farmers',
          'The results of a council election',
          'The approval of an energy project',
        ],
        answer: 3,
        explanationVi:
          'Hội đồng thị trấn bỏ phiếu thông qua trang trại điện mặt trời 40 MW → phê duyệt một dự án năng lượng (D). Highway 9 chỉ dùng để chỉ vị trí (A sai); cuộc bỏ phiếu là về dự án, không phải bầu cử (C sai).',
        translationVi: 'Bản tin chủ yếu nói về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'According to the speaker, why was the earlier proposal rejected?',
        options: [
          'It would have cost the township too much.',
          'Residents worried about losing farmland.',
          'The company lacked experience.',
          'The site was too far from a highway.',
        ],
        answer: 1,
        explanationVi:
          '"rejected two years ago after residents raised concerns about the loss of farmland" → người dân lo mất đất nông nghiệp (B). Không nhắc chi phí (A) hay kinh nghiệm của công ty (C).',
        translationVi: 'Theo người nói, vì sao đề xuất trước đây bị bác?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What will the township use its annual payment for?',
        options: [
          'Hiring temporary workers',
          'Lowering electricity bills',
          'Repairing roads',
          'Buying farmland',
        ],
        answer: 2,
        explanationVi:
          '"an annual payment, which … will go toward repairing rural roads" → sửa đường (C). 120 việc làm tạm thời là do công ty xây dựng tạo ra, không phải khoản tiền của thị trấn (A là bẫy).',
        translationVi: 'Thị trấn sẽ dùng khoản tiền hằng năm vào việc gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Education',
    transcript: talk('US', [
      'Hi, Professor Okafor, this is Lindsey Varga from the continuing education office at Brantley Community College.',
      'I’m calling about your evening course, Introduction to Bookkeeping, which starts on the twelfth.',
      'Registration closed yesterday with thirty-four students, and the room we assigned, Room 118, only seats twenty-five.',
      'We could split the class into two sections, but that would mean adding a Thursday session, and I know you teach at another school that night.',
      'The other option is the lecture hall in the Fulton Building. It’s bigger, but it doesn’t have computers, so students would need to bring their own laptops.',
      'Could you let me know which you’d prefer by Friday? I’ll e-mail the students as soon as I hear from you.',
    ]),
    questions: [
      {
        text: 'What problem does the speaker mention?',
        options: [
          'A course has too few students.',
          'An instructor is unavailable on the twelfth.',
          'A classroom is too small for a class.',
          'Registration closed earlier than planned.',
        ],
        answer: 2,
        explanationVi:
          '34 học viên nhưng phòng 118 chỉ có 25 chỗ → phòng quá nhỏ (C). (A) ngược nghĩa: thừa chứ không thiếu học viên; khoá học vẫn bắt đầu ngày 12 (B sai).',
        translationVi: 'Người nói đề cập đến vấn đề gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Why does the speaker say, "I know you teach at another school that night"?',
        options: [
          'To ask the listener to change jobs',
          'To apologize for a scheduling error',
          'To confirm the listener’s availability',
          'To suggest that one option may not be practical',
        ],
        answer: 3,
        explanationVi:
          'Chia lớp thì phải thêm buổi thứ Năm, mà tối đó giáo sư dạy ở trường khác → phương án chia lớp khó thực hiện (D). Người nói biết rõ giáo sư bận, không cần xác nhận (C sai).',
        translationVi:
          'Vì sao người nói nói "Tôi biết tối đó thầy dạy ở một trường khác"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What will the speaker do after hearing from the listener?',
        options: [
          'Contact the students',
          'Reserve some computers',
          'Reopen registration',
          'Hire another instructor',
        ],
        answer: 0,
        explanationVi:
          '"I’ll e-mail the students as soon as I hear from you" → liên hệ học viên (A). Hội trường Fulton không có máy tính, học viên tự mang laptop, không ai đặt máy (B sai).',
        translationVi:
          'Người nói sẽ làm gì sau khi nhận được phản hồi của người nghe?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Food production',
    transcript: talk('GB', [
      'Welcome to Hollin Mill, everyone. I’m Rhiannon, and I’ll be taking you round our oatcake bakery this morning.',
      'Hollin Mill has been making oatcakes here since 1962, but this production line is only two years old. It can bake about forty thousand oatcakes an hour.',
      'In a moment we’ll walk through the mixing room, where the oats are combined with water and a little salt. That’s all there is to it.',
      'Now, for food safety reasons, you’ll need to put on a hairnet and a pair of blue shoe covers before we go in. You’ll find them in the box by the door.',
      'Please don’t take any photographs inside, as some of our machinery was designed specially for us.',
      'At the end of the tour, we’ll stop at the shop, where you can try our new cheese-flavoured range before it goes on sale next month.',
    ]),
    questions: [
      {
        text: 'Who most likely is the speaker?',
        options: [
          'A machine designer',
          'A tour guide',
          'A food safety inspector',
          'A shop assistant',
        ],
        answer: 1,
        explanationVi:
          '"I’ll be taking you round our oatcake bakery" và hướng dẫn đường đi, quy định khi tham quan → hướng dẫn viên (B). Nhắc đến an toàn thực phẩm và cửa hàng chỉ là chi tiết trong chuyến tham quan (C, D là bẫy).',
        translationVi: 'Người nói nhiều khả năng là ai?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'Why does the speaker say, "That’s all there is to it"?',
        options: [
          'To emphasize that a recipe is simple',
          'To indicate that the tour will be short',
          'To explain why the production line is new',
          'To apologize for a lack of information',
        ],
        answer: 0,
        explanationVi:
          'Câu ngay trước liệt kê nguyên liệu: yến mạch, nước và chút muối; "That’s all there is to it" = chỉ có vậy thôi → nhấn mạnh công thức đơn giản (A). Không liên quan đến độ dài chuyến tham quan (B).',
        translationVi: 'Vì sao người nói nói "Chỉ có vậy thôi"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'According to the speaker, what can the listeners do at the shop?',
        options: [
          'Buy a souvenir photograph',
          'Order products online',
          'Meet the bakery’s founder',
          'Sample a product that is not yet on sale',
        ],
        answer: 3,
        explanationVi:
          '"try our new cheese-flavoured range before it goes on sale next month" → nếm thử sản phẩm chưa bán ra (D). Khách không được chụp ảnh bên trong; không có ảnh lưu niệm (A sai).',
        translationVi: 'Theo người nói, người nghe có thể làm gì ở cửa hàng?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Finance',
    transcript: talk('AU', [
      'Right, let’s move on to the travel budget. As most of you know, we spent nearly forty per cent more on travel in the first half than we’d planned.',
      'Some of that was unavoidable. The Perth client moved their audit dates twice, and we had to rebook flights at short notice.',
      'But a lot of it came from people booking directly with airlines instead of through Wayfare, our corporate travel portal.',
      'When you book outside the portal, we lose our negotiated fares, and finance can’t see the spending until the receipts come in weeks later.',
      'Now, I’m not going to stop anyone travelling when a client needs us on site. That’s the job.',
      'What I am going to do is send back expense claims for flights booked outside Wayfare, unless there’s a written reason attached. That starts on the first of next month.',
    ]),
    questions: [
      {
        text: 'Who most likely are the listeners?',
        options: [
          'Airline sales agents',
          'Software developers',
          'Hotel managers',
          'Employees of an accounting firm',
        ],
        answer: 3,
        explanationVi:
          'Khách hàng ở Perth đổi lịch kiểm toán ("audit dates") khiến nhân viên phải bay đến làm việc tại chỗ → người nghe là nhân viên công ty kế toán/kiểm toán (D). Họ đặt vé với hãng bay chứ không làm cho hãng bay (A sai).',
        translationVi: 'Người nghe nhiều khả năng là ai?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'According to the speaker, what is one cause of the higher spending?',
        options: [
          'A client cancelled a contract.',
          'Airlines raised their prices.',
          'Flights were booked without using the company’s system.',
          'Too many employees attended a conference.',
        ],
        answer: 2,
        explanationVi:
          '"a lot of it came from people booking directly with airlines instead of through Wayfare" → đặt vé không qua hệ thống công ty (C). Khách hàng chỉ đổi ngày kiểm toán, không huỷ hợp đồng (A sai); không nói hãng bay tăng giá (B).',
        translationVi:
          'Theo người nói, một nguyên nhân khiến chi phí tăng là gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Why does the speaker say, "That’s the job"?',
        options: [
          'To criticize employees who travel too often',
          'To reassure the listeners that necessary trips will continue',
          'To announce a change in job duties',
          'To encourage the listeners to apply for a new position',
        ],
        answer: 1,
        explanationVi:
          'Câu trước: "I’m not going to stop anyone travelling when a client needs us on site" → đi công tác vì khách hàng là bản chất công việc, nên vẫn được tiếp tục (B). Người nói không chỉ trích việc đi lại nhiều (A), chỉ siết cách đặt vé.',
        translationVi: 'Vì sao người nói nói "Đó là công việc mà"?',
        skillTags: ['comprehension.speaker-intent'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Engineering',
    transcript: talk('CA', [
      'Good afternoon. Our next speaker hardly needs an introduction to anyone who has driven across the Tamarack River in the past decade.',
      'Dr. Simone Lachance led the structural team that replaced the old Tamarack crossing, and she did it without closing the river to shipping for a single day.',
      'Since then, she has moved from bridges to something smaller but, as she puts it, far less forgiving: the sensors that warn engineers when a structure is starting to fail.',
      'Her company, Strata Sense, now monitors more than two hundred bridges and dams across three provinces.',
      'Dr. Lachance will speak for about forty minutes, and she has kindly agreed to stay afterward for questions.',
      'If you’d like to ask one, please write it on the cards on your tables, and our volunteers will collect them during the talk.',
    ]),
    questions: [
      {
        text: 'What is the purpose of the talk?',
        options: [
          'To introduce a speaker',
          'To present an award',
          'To describe a new bridge design',
          'To explain a change to a program',
        ],
        answer: 0,
        explanationVi:
          '"Our next speaker hardly needs an introduction…" và giới thiệu sự nghiệp của Dr. Lachance → giới thiệu diễn giả (A). Cây cầu chỉ là thành tích cũ của bà, không phải thiết kế mới (C sai).',
        translationVi: 'Mục đích của bài nói là gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What is mentioned about the Tamarack River project?',
        options: [
          'It was completed ahead of schedule.',
          'River traffic was not interrupted.',
          'It used sensors made by Strata Sense.',
          'It required a highway to be closed.',
        ],
        answer: 1,
        explanationVi:
          '"without closing the river to shipping for a single day" → giao thông đường thuỷ không bị gián đoạn (B). Bà chuyển sang làm cảm biến "since then" = sau dự án, nên (C) là bẫy; không nhắc tiến độ (A).',
        translationVi: 'Điều gì được nhắc đến về dự án sông Tamarack?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'How should the listeners submit questions?',
        options: [
          'By lining up at a microphone',
          'By sending them through an app',
          'By writing them on cards',
          'By giving them to Dr. Lachance after the talk',
        ],
        answer: 2,
        explanationVi:
          '"please write it on the cards on your tables, and our volunteers will collect them" → viết lên thẻ (C). Bà ở lại sau buổi nói để trả lời, nhưng câu hỏi do tình nguyện viên thu trong lúc nói (D là bẫy).',
        translationVi: 'Người nghe nên gửi câu hỏi bằng cách nào?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Training',
    transcript: talk('US', [
      'Okay, let’s start the second half of the workshop. Before the break, we looked at why new supervisors often avoid giving negative feedback.',
      'Most of you said it’s because you don’t want to damage the relationship. Fair enough.',
      'But think about what happens when an employee hears about a problem for the first time in their annual review. Is that relationship better or worse?',
      'So the approach I recommend is to describe what happened, explain its effect on the team, and then ask the employee what they think. In that order.',
      'Notice what’s missing: your opinion of the person. You comment on the work, not on the worker.',
      'Now, I’ve put a short scenario on each table. With your group, take ten minutes to plan how you’d handle that conversation, and then we’ll act a couple of them out.',
    ]),
    questions: [
      {
        text: 'Who most likely are the listeners?',
        options: [
          'Job applicants',
          'Human resources consultants',
          'Recently promoted supervisors',
          'Customer service trainees',
        ],
        answer: 2,
        explanationVi:
          'Hội thảo bàn về lý do "new supervisors" ngại góp ý, và "Most of you said…" → người nghe chính là các giám sát mới lên chức (C). Đánh giá hằng năm do họ thực hiện, nên họ không phải ứng viên (A).',
        translationVi: 'Người nghe nhiều khả năng là ai?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'Why does the speaker say, "Is that relationship better or worse?"',
        options: [
          'To show that avoiding feedback can backfire',
          'To ask the listeners to complete a survey',
          'To compare two different companies',
          'To disagree with an earlier speaker',
        ],
        answer: 0,
        explanationVi:
          'Câu hỏi tu từ: nếu nhân viên chỉ biết vấn đề lần đầu trong buổi đánh giá năm, quan hệ còn tệ hơn → né góp ý lại phản tác dụng (A). Đây không phải câu hỏi khảo sát thật (B).',
        translationVi:
          'Vì sao người nói nói "Mối quan hệ đó tốt hơn hay tệ hơn?"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What will the listeners most likely do next?',
        options: [
          'Take a short break',
          'Write performance reviews',
          'Watch a recorded conversation',
          'Discuss a situation in groups',
        ],
        answer: 3,
        explanationVi:
          '"With your group, take ten minutes to plan how you’d handle that conversation" → thảo luận một tình huống theo nhóm (D). Giờ nghỉ đã qua ("Before the break") nên (A) là bẫy.',
        translationVi: 'Người nghe nhiều khả năng sẽ làm gì tiếp theo?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Utilities',
    transcript: talk('GB', [
      'Good morning, everyone. I want to update the customer contact team on the smart meter programme.',
      'Engineers will start fitting the new meters in the Ashby and Coleford districts on Monday, about two months later than we told customers in the spring.',
      'You may already have had calls about that. Some customers took a day off work for an appointment that we then cancelled, and they’re understandably frustrated.',
      'From Monday, if a customer can show they lost a day’s pay, you can offer a thirty-pound credit on their account. You don’t need a supervisor’s approval for that.',
      'Anything larger, please pass to Marcus Fenwick’s team.',
      'Oh, and the script you’ve been using still says installation is free for everyone. That’s now true only for households, not businesses, so I’ll circulate a corrected version by lunchtime.',
    ]),
    questions: [
      {
        text: 'What does the speaker say about the meter installations?',
        options: [
          'They have been cancelled in Ashby.',
          'They are starting later than originally announced.',
          'They will be carried out by a new contractor.',
          'They will take place only at weekends.',
        ],
        answer: 1,
        explanationVi:
          '"start … on Monday, about two months later than we told customers in the spring" → bắt đầu muộn hơn đã thông báo (B). Chỉ một số cuộc hẹn bị huỷ, chương trình ở Ashby vẫn bắt đầu thứ Hai (A sai).',
        translationVi: 'Người nói cho biết gì về việc lắp đặt đồng hồ?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What are the listeners now allowed to do?',
        options: [
          'Reschedule appointments online',
          'Transfer every complaint to a supervisor',
          'Offer free installation to businesses',
          'Give some customers a credit without approval',
        ],
        answer: 3,
        explanationVi:
          '"you can offer a thirty-pound credit… You don’t need a supervisor’s approval" → được tự cộng tiền vào tài khoản khách mà không cần duyệt (D). Lắp miễn phí nay chỉ dành cho hộ gia đình, không cho doanh nghiệp (C ngược nghĩa).',
        translationVi: 'Người nghe giờ được phép làm gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the speaker say she will do by lunchtime?',
        options: [
          'Distribute an updated document',
          'Meet with Marcus Fenwick',
          'Call some frustrated customers',
          'Visit the Coleford district',
        ],
        answer: 0,
        explanationVi:
          'Kịch bản trả lời khách còn ghi sai → "I’ll circulate a corrected version by lunchtime" → gửi tài liệu đã sửa (A). Nhóm của Marcus Fenwick chỉ nhận các khoản bồi thường lớn hơn (B sai).',
        translationVi: 'Người nói cho biết cô ấy sẽ làm gì trước giờ trưa?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
]
