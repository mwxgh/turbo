/** One talk: every line by the narrator, in one accent. */
const talk = (accent: 'US' | 'GB' | 'AU' | 'CA', lines: string[]) =>
  lines.map((text) => ({ speaker: 'N', accent, text }))

/** Full Test 04, Part 4: written for Lingo (not from ETS). */
export const P4: object[] = [
  {
    difficulty: 'EASY',
    topic: 'Tourism',
    transcript: talk('US', [
      'Good afternoon, and welcome to the Bayshore Aquarium.',
      'We’d like to let you know that the shark tunnel is closed for the rest of the day because a water pump needs to be replaced.',
      'We’re sorry for the disappointment. To make up for it, every visitor will receive a free return ticket, valid for the next three months.',
      'You can pick yours up from the ticket booth at the main gate on your way out.',
      'Also, the penguin feeding, usually held at three o’clock, will start at two thirty today, so please head to the Polar Zone a little earlier.',
      'Thank you for your understanding, and enjoy the rest of your visit.',
    ]),
    questions: [
      {
        text: 'Why is part of the aquarium closed?',
        options: [
          'A new exhibit is being built.',
          'Some equipment must be replaced.',
          'The animals are being fed.',
          'A private event is taking place.',
        ],
        answer: 1,
        explanationVi:
          '"the shark tunnel is closed… because a water pump needs to be replaced" → phải thay thiết bị (B). Cho chim cánh cụt ăn là hoạt động khác, không phải lý do đóng cửa (C); không nhắc khu trưng bày mới (A) hay sự kiện riêng (D).',
        translationVi: 'Tại sao một phần của thuỷ cung bị đóng cửa?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What can visitors get at the ticket booth?',
        options: [
          'A map of the aquarium',
          'A discount on food',
          'A ticket for a future visit',
          'A refund for parking',
        ],
        answer: 2,
        explanationVi:
          '"every visitor will receive a free return ticket… pick yours up from the ticket booth" → vé để quay lại lần sau (C). Không nhắc bản đồ (A), giảm giá đồ ăn (B) hay hoàn phí đỗ xe (D).',
        translationVi: 'Khách tham quan có thể nhận gì ở quầy vé?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What has changed about the penguin feeding?',
        options: [
          'It will begin earlier than usual.',
          'It has been canceled.',
          'It will be held in a different area.',
          'It is now available only to members.',
        ],
        answer: 0,
        explanationVi:
          '"usually held at three o’clock, will start at two thirty today" → bắt đầu sớm hơn thường lệ (A). Vẫn diễn ra ở Polar Zone, chỉ cần đến sớm hơn (C sai); không bị huỷ (B).',
        translationVi: 'Buổi cho chim cánh cụt ăn có gì thay đổi?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Facilities',
    transcript: talk('GB', [
      'Hello, this is a message for Priya Raman at Halvorsen Consulting. It’s Gareth Lyle from the building management office at Twelve Quay Street.',
      'I’m ringing about the lift work we mentioned in last month’s newsletter.',
      'The contractor has had to bring the start date forward to this Thursday, so the east lift will be out of service from then until the following Wednesday.',
      'I know your firm has a client workshop on the fourth floor on Friday.',
      'If any of your visitors need step-free access, the west lift will still be running, but it’s only reachable through the car park entrance.',
      'I can have a member of security meet your guests there and show them the way. Just let me know how many people to expect by Wednesday afternoon.',
    ]),
    questions: [
      {
        text: 'What is the purpose of the message?',
        options: [
          'To request payment for some repairs',
          'To confirm the booking of a workshop room',
          'To announce a new parking policy',
          'To report that some work will begin earlier than planned',
        ],
        answer: 3,
        explanationVi:
          '"The contractor has had to bring the start date forward to this Thursday" → "bring forward" = dời sớm hơn → công việc bảo trì bắt đầu sớm hơn dự kiến (D). Buổi workshop là của công ty người nghe, không phải đặt phòng (B); bãi đỗ xe chỉ là lối vào thang máy, không phải chính sách mới (C).',
        translationVi: 'Mục đích của tin nhắn là gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'Why does the speaker mention the car park entrance?',
        options: [
          'It is the only way to reach a working lift.',
          'It will be closed during the workshop.',
          'Visitors can park there free of charge.',
          'Security staff are based there permanently.',
        ],
        answer: 0,
        explanationVi:
          '"the west lift will still be running, but it’s only reachable through the car park entrance" → muốn dùng thang máy còn hoạt động thì phải đi lối bãi đỗ xe (A). Lối này không đóng (B); không nói đỗ xe miễn phí (C); bảo vệ chỉ được cử ra đón khách, không phải trực cố định ở đó (D).',
        translationVi: 'Tại sao người nói nhắc đến lối vào bãi đỗ xe?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What does the speaker ask the listener to provide?',
        options: [
          'A list of attendees’ names',
          'The expected number of visitors',
          'A new date for the workshop',
          'Photographs for security badges',
        ],
        answer: 1,
        explanationVi:
          '"Just let me know how many people to expect" → số lượng khách dự kiến (B). Anh ấy hỏi "bao nhiêu người", không phải danh sách tên (A); không đề nghị đổi ngày (C) hay xin ảnh làm thẻ (D).',
        translationVi: 'Người nói yêu cầu người nghe cung cấp điều gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Business services',
    transcript: talk('AU', [
      'Is your storeroom filling up with old files you’re not sure how to get rid of?',
      'SecureBin Document Services collects confidential paperwork from offices across Brisbane and destroys it safely at our own facility.',
      'Unlike many shredding companies, we never hand your documents to a subcontractor. The same uniformed team handles them from your door to the shredder.',
      'After every collection, you’ll receive a signed certificate confirming that the material was destroyed, which is exactly what auditors ask to see.',
      'Regular customers can choose weekly or monthly pickups, and one-off clear-outs are welcome too.',
      'And for new business customers who book before the thirtieth of September, the first collection costs nothing.',
      'Call us or book online at securebin.com.au.',
    ]),
    questions: [
      {
        text: 'What is being advertised?',
        options: [
          'A storage facility',
          'An office-cleaning company',
          'A document disposal service',
          'An auditing firm',
        ],
        answer: 2,
        explanationVi:
          '"collects confidential paperwork… and destroys it safely" → dịch vụ tiêu huỷ tài liệu (C). "storeroom" chỉ là câu mở đầu (A); "auditors" chỉ là người muốn xem giấy chứng nhận, công ty không phải hãng kiểm toán (D).',
        translationVi: 'Điều gì đang được quảng cáo?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'According to the speaker, how is the business different from its competitors?',
        options: [
          'It does not use outside workers to handle documents.',
          'It offers collections seven days a week.',
          'It recycles all of the paper it collects.',
          'It charges lower prices for large orders.',
        ],
        answer: 0,
        explanationVi:
          '"Unlike many shredding companies, we never hand your documents to a subcontractor" → không giao tài liệu cho nhà thầu phụ, tức không dùng người ngoài (A). Lịch thu gom là hằng tuần hoặc hằng tháng, không phải bảy ngày (B); không nhắc tái chế (C) hay giảm giá đơn lớn (D).',
        translationVi:
          'Theo người nói, doanh nghiệp này khác các đối thủ ở điểm nào?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What is offered to some new customers?',
        options: [
          'A signed certificate',
          'A set of locked bins',
          'A free consultation with an auditor',
          'A collection at no charge',
        ],
        answer: 3,
        explanationVi:
          '"for new business customers who book before the thirtieth of September, the first collection costs nothing" → lần thu gom đầu miễn phí (D). Giấy chứng nhận có sau mỗi lần thu gom cho mọi khách, không phải ưu đãi khách mới (A).',
        translationVi: 'Điều gì được dành cho một số khách hàng mới?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Tourism',
    transcript: talk('CA', [
      'Welcome to Maple Ridge Chocolate Works, everyone. My name is Simone, and I’ll be taking you through our production floor for the next forty-five minutes.',
      'Before we go in, a couple of things.',
      'For food safety reasons, you’ll each need to put on a hairnet. You’ll find them in the box beside the door.',
      'Photos are welcome in the tasting room, but not on the production floor, since some of our recipes are still kept secret.',
      'We’ll finish the tour in that tasting room, where you can sample six of our bars.',
      'Oh, and our gift shop is offering fifteen percent off today for tour guests. Just show your ticket at the register.',
    ]),
    questions: [
      {
        text: 'Who most likely is the speaker?',
        options: [
          'A factory owner',
          'A tour guide',
          'A food safety inspector',
          'A gift shop cashier',
        ],
        answer: 1,
        explanationVi:
          '"I’ll be taking you through our production floor for the next forty-five minutes" → người dẫn tham quan (B). Cô ấy nhắc an toàn thực phẩm nhưng không phải thanh tra (C); cửa hàng quà tặng chỉ được giới thiệu (D).',
        translationVi: 'Người nói nhiều khả năng là ai?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'Why are photographs not allowed on the production floor?',
        options: [
          'The machinery could be damaged by flash.',
          'Workers prefer not to be filmed.',
          'The lighting there is too dim.',
          'Some production methods are confidential.',
        ],
        answer: 3,
        explanationVi:
          '"since some of our recipes are still kept secret" → một số công thức được giữ bí mật (D). Các lý do về đèn flash, công nhân hay ánh sáng (A, B, C) không được nhắc.',
        translationVi: 'Tại sao không được chụp ảnh trong khu sản xuất?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'How can listeners receive a discount?',
        options: [
          'By completing a survey',
          'By buying six bars',
          'By presenting their ticket',
          'By joining a mailing list',
        ],
        answer: 2,
        explanationVi:
          '"Just show your ticket at the register" → xuất trình vé (C). Con số sáu là số thanh sô-cô-la được nếm thử, không phải điều kiện giảm giá (B).',
        translationVi: 'Người nghe có thể được giảm giá bằng cách nào?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Local news',
    transcript: talk('US', [
      'This is Andre Coleman with the Harlow County evening news.',
      'Last night, the Harlow city council voted to turn two traffic lanes on Grant Avenue into protected bicycle lanes.',
      'Construction is expected to begin in early June and to last about ten weeks.',
      'Several downtown shop owners had argued that losing the lanes would keep customers away, so the council also agreed to add forty short-term parking spaces on nearby side streets.',
      'Residents who’d like to see the final design can attend a public presentation at City Hall next Tuesday evening.',
      'We’ll have more on this story after a short break.',
    ]),
    questions: [
      {
        text: 'What did the city council approve?',
        options: [
          'A plan to create bicycle lanes',
          'A new City Hall building',
          'Lower parking fees downtown',
          'Longer opening hours for shops',
        ],
        answer: 0,
        explanationVi:
          '"voted to turn two traffic lanes… into protected bicycle lanes" → kế hoạch làn xe đạp (A). Chỗ đỗ xe được thêm chứ không giảm phí (C); City Hall chỉ là nơi thuyết trình (B).',
        translationVi: 'Hội đồng thành phố đã phê duyệt điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What concern did some business owners raise?',
        options: [
          'Construction noise would disturb their staff.',
          'Their rent would increase.',
          'The project would take too long to finish.',
          'Fewer customers might visit their stores.',
        ],
        answer: 3,
        explanationVi:
          '"losing the lanes would keep customers away" → lo khách hàng ít đến (D). Thời gian thi công mười tuần được nêu nhưng không phải là lo ngại của chủ cửa hàng (C); không nhắc tiếng ồn (A) hay tiền thuê (B).',
        translationVi: 'Một số chủ doanh nghiệp đã nêu lo ngại gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What will happen next Tuesday?',
        options: [
          'Construction work will start.',
          'A design will be shown to the public.',
          'The council will hold another vote.',
          'New parking spaces will open.',
        ],
        answer: 1,
        explanationVi:
          '"Residents who’d like to see the final design can attend a public presentation at City Hall next Tuesday" → bản thiết kế được trình bày cho người dân (B). Thi công bắt đầu đầu tháng Sáu (A); không có cuộc bỏ phiếu khác (C).',
        translationVi: 'Điều gì sẽ diễn ra vào thứ Ba tới?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Business',
    transcript: talk('GB', [
      'Right, the last item on the agenda is renewals.',
      'As you’ll see from the figures I circulated, our renewal rate among small-business customers fell to seventy-eight percent this quarter, down from eighty-five.',
      'Now, when we rang the customers who left, very few mentioned price.',
      'What came up again and again was that they’d never really got to grips with the reporting tools, so they didn’t feel they were getting value from them.',
      'So, from next month, every new small-business account will get two live training sessions in its first thirty days, rather than just a welcome e-mail. Lena’s team has offered to run them.',
      'I appreciate that’s extra work for customer success, so I’ll be asking finance for the budget to bring in a temporary hire. I’ll report back at our next meeting.',
    ]),
    questions: [
      {
        text: 'What problem does the speaker discuss?',
        options: [
          'A reporting tool contains errors.',
          'Sales staff have missed their targets.',
          'Fewer clients are extending their subscriptions.',
          'Training sessions have been poorly attended.',
        ],
        answer: 2,
        explanationVi:
          '"our renewal rate… fell to seventy-eight percent" → ít khách hàng gia hạn hơn (C). Công cụ báo cáo khó dùng chứ không có lỗi (A); buổi đào tạo là giải pháp mới, chưa diễn ra (D).',
        translationVi: 'Người nói thảo luận về vấn đề gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the speaker imply when she says, "very few mentioned price"?',
        options: [
          'The company’s prices are lower than its competitors’.',
          'Offering a discount would probably not solve the problem.',
          'Customers were reluctant to answer questions.',
          'A price increase has been well received.',
        ],
        answer: 1,
        explanationVi:
          'Khách rời đi hầu như không nhắc đến giá, mà phàn nàn về việc không biết dùng công cụ báo cáo → hàm ý giảm giá không giải quyết được vấn đề (B). Không có so sánh giá với đối thủ (A) hay việc tăng giá (D); khách vẫn trả lời và nêu lý do (C).',
        translationVi:
          'Người nói hàm ý gì khi nói: "rất ít người nhắc đến giá cả"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What will the speaker request from the finance department?',
        options: [
          'Approval to lower subscription fees',
          'Updated renewal figures',
          'Permission to cancel welcome e-mails',
          'Funding for an additional short-term employee',
        ],
        answer: 3,
        explanationVi:
          '"I’ll be asking finance for the budget to bring in a temporary hire" → xin ngân sách thuê thêm một nhân viên tạm thời (D). Số liệu gia hạn do chính người nói gửi đi (B); e-mail chào mừng chỉ được bổ sung thêm buổi đào tạo, không cần xin hủy (C).',
        translationVi: 'Người nói sẽ đề nghị phòng tài chính điều gì?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Events',
    transcript: talk('AU', [
      'Good afternoon, and thanks for coming back after lunch. I know the dessert table made that difficult.',
      'Our next speaker hardly needs an introduction, but I’ll give her one anyway.',
      'Dr. Imogen Faulkner spent twelve years designing packaging for one of the country’s largest supermarket chains before leaving to found Kelpware, which makes food containers from farmed seaweed.',
      'Last year, Kelpware containers replaced plastic ones in more than four hundred cafés along the east coast.',
      'Dr. Faulkner’s talk was originally scheduled for tomorrow morning, but she’s kindly agreed to swap with Professor Tan, whose flight was delayed.',
      'So if you were planning to hear Professor Tan this afternoon, you’ll find him in this room at nine tomorrow. Please welcome Dr. Faulkner.',
    ]),
    questions: [
      {
        text: 'Where did Dr. Faulkner work previously?',
        options: [
          'At a grocery retailer',
          'At a café chain',
          'At a university',
          'At an airline',
        ],
        answer: 0,
        explanationVi:
          '"designing packaging for one of the country’s largest supermarket chains" → chuỗi siêu thị = nhà bán lẻ thực phẩm (A). Các quán cà phê là khách hàng của Kelpware (B); "Professor" là ông Tan, không phải bà (C); chuyến bay chỉ liên quan đến ông Tan (D).',
        translationVi: 'Trước đây Tiến sĩ Faulkner làm việc ở đâu?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What is mentioned about Kelpware’s products?',
        options: [
          'They are sold in supermarkets nationwide.',
          'They cost less than plastic containers.',
          'They are made from a marine plant.',
          'They were designed by Professor Tan.',
        ],
        answer: 2,
        explanationVi:
          '"food containers from farmed seaweed" → rong biển = thực vật biển (C). Siêu thị là nơi bà từng làm, không phải nơi bán sản phẩm (A); không so sánh giá (B).',
        translationVi: 'Điều gì được nhắc đến về sản phẩm của Kelpware?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Why does the speaker say, "you’ll find him in this room at nine tomorrow"?',
        options: [
          'To ask listeners to arrive early tomorrow',
          'To explain when a postponed talk will take place',
          'To announce a change of venue',
          'To introduce the organizer of the event',
        ],
        answer: 1,
        explanationVi:
          'Bài nói của Giáo sư Tan bị đổi sang sáng mai do chuyến bay trễ → câu nói cho biết bài nói bị dời sẽ diễn ra lúc nào (B). Vẫn là "this room" nên không đổi địa điểm (C); không yêu cầu đến sớm (A).',
        translationVi:
          'Tại sao người nói nói: "quý vị sẽ gặp ông ấy tại phòng này lúc chín giờ sáng mai"?',
        skillTags: ['comprehension.speaker-intent'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'HR',
    transcript: talk('CA', [
      'Okay, before you head back to your desks, one more thing about the new payroll system.',
      'Starting with the pay period that begins on the first, you’ll record your hours in the Clockwise app instead of on paper timesheets.',
      'Now, I know some of you were worried after the pilot in the Moncton office, where a few people were paid late.',
      'That was traced to a setting that has since been corrected, and the Moncton team has been paid on time for the last three cycles.',
      'Still, for the first month, we’ll run both systems side by side, so please keep filling in your paper sheet as well.',
      'Training is optional, but honestly, it’s twenty minutes, and the sign-up sheet is right here by the door.',
    ]),
    questions: [
      {
        text: 'What will employees start doing?',
        options: [
          'Working shorter shifts',
          'Receiving their pay more often',
          'Logging their working hours on a mobile application',
          'Submitting expense reports online',
        ],
        answer: 2,
        explanationVi:
          '"you’ll record your hours in the Clockwise app instead of on paper timesheets" → ghi giờ làm qua ứng dụng (C). Kỳ trả lương không thay đổi tần suất (B); không nhắc ca ngắn hơn (A) hay báo cáo chi phí (D).',
        translationVi: 'Nhân viên sẽ bắt đầu làm gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Why does the speaker mention the Moncton office?',
        options: [
          'To reassure staff that an earlier problem has been resolved',
          'To announce that the office will close',
          'To praise the team for testing the system',
          'To explain why training is required',
        ],
        answer: 0,
        explanationVi:
          'Bà thừa nhận mọi người lo vì đợt thử ở Moncton bị trả lương trễ, rồi nói lỗi đã được sửa và ba kỳ gần đây đều đúng hạn → trấn an rằng sự cố đã được khắc phục (A). Đào tạo là tuỳ chọn, không bắt buộc (D); không có lời khen (C) hay việc đóng văn phòng (B).',
        translationVi: 'Tại sao người nói nhắc đến văn phòng Moncton?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What does the speaker mean when she says, "it’s twenty minutes"?',
        options: [
          'A meeting is running late.',
          'The app records time in twenty-minute blocks.',
          'Employees have little time to sign up.',
          'Listeners should attend because the training is short.',
        ],
        answer: 3,
        explanationVi:
          '"Training is optional, but honestly, it’s twenty minutes" → dù không bắt buộc, buổi đào tạo chỉ mất hai mươi phút nên mọi người nên tham gia (D). Con số không nói về thời hạn đăng ký (C) hay cách ứng dụng tính giờ (B).',
        translationVi:
          'Người nói có ý gì khi nói: "chỉ mất hai mươi phút thôi"?',
        skillTags: ['comprehension.speaker-intent'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Business news',
    transcript: talk('US', [
      'In business news, electronics maker Corvane announced today that it will move assembly of its home speakers from its plant in Dayton to a new facility in Monterrey, Mexico, by the end of next year.',
      'The Dayton site won’t close, however. Instead, it’ll be converted into a research and repair center, and Corvane expects to keep about two-thirds of the current workforce there.',
      'Analysts note that the move follows a year in which shipping delays left retailers without stock during the holiday season.',
      'Corvane’s chief executive said that building closer to its component suppliers should shorten delivery times considerably.',
      'Shares in the company rose four percent on the news.',
    ]),
    questions: [
      {
        text: 'What is the report mainly about?',
        options: [
          'The launch of a new speaker model',
          'A company relocating part of its production',
          'A merger between two electronics firms',
          'The closure of a research center',
        ],
        answer: 1,
        explanationVi:
          '"will move assembly of its home speakers from its plant in Dayton to a new facility in Monterrey" → chuyển một phần sản xuất (B). Nhà máy Dayton không đóng cửa mà trở thành trung tâm nghiên cứu (D); không có sản phẩm mới (A) hay sáp nhập (C).',
        translationVi: 'Bản tin chủ yếu nói về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What will happen to the Dayton facility?',
        options: [
          'It will be sold to a supplier.',
          'It will hire additional workers.',
          'It will be used for a different purpose.',
          'It will be expanded next year.',
        ],
        answer: 2,
        explanationVi:
          '"it’ll be converted into a research and repair center" → được chuyển sang mục đích khác (C). Công ty giữ khoảng hai phần ba nhân viên, tức là giảm chứ không tuyển thêm (B); không bán (A) hay mở rộng (D).',
        translationVi: 'Điều gì sẽ xảy ra với cơ sở ở Dayton?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'According to the report, what problem did Corvane have last year?',
        options: [
          'Its products did not reach stores in time.',
          'Its share price fell sharply.',
          'Its suppliers raised their prices.',
          'Its factory workers went on strike.',
        ],
        answer: 0,
        explanationVi:
          '"shipping delays left retailers without stock during the holiday season" → hàng không đến cửa hàng kịp (A). Giá cổ phiếu tăng bốn phần trăm (B); không nhắc nhà cung cấp tăng giá (C) hay đình công (D).',
        translationVi: 'Theo bản tin, Corvane đã gặp vấn đề gì vào năm ngoái?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Finance',
    transcript: talk('GB', [
      'Thanks for joining today’s webinar. I’m Fiona Abbott, and I’ve kept the books for small firms for over twenty years.',
      'The question I’m asked most often is how to get clients to pay on time.',
      'My first piece of advice may surprise you: stop sending invoices at the end of the month.',
      'Most of your clients pay suppliers in batches, so a bill that arrives on the thirtieth often waits a full extra cycle. Send it the day the work is finished instead.',
      'Second, put a named person and a direct phone number on every invoice. An e-mail address that goes to a general inbox is simply ignored.',
      'In the second half, we’ll look at whether late fees actually work. But first, let’s take a few of the questions you’ve been typing into the chat.',
    ]),
    questions: [
      {
        text: 'Who most likely is the speaker?',
        options: [
          'A bank manager',
          'A software developer',
          'A debt collector',
          'An accountant',
        ],
        answer: 3,
        explanationVi:
          '"I’ve kept the books for small firms for over twenty years" → "keep the books" = làm sổ sách kế toán → kế toán viên (D). Bà khuyên cách gửi hoá đơn, không đi đòi nợ (C); không nhắc ngân hàng (A) hay phần mềm (B).',
        translationVi: 'Người nói nhiều khả năng là ai?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'Why does the speaker advise against sending invoices at the end of the month?',
        options: [
          'Clients are often on holiday then.',
          'Payment may be delayed until the client’s next payment run.',
          'Banks charge higher fees at that time.',
          'Accountants are busiest during that period.',
        ],
        answer: 1,
        explanationVi:
          '"clients pay suppliers in batches, so a bill that arrives on the thirtieth often waits a full extra cycle" → hoá đơn có thể phải chờ tới đợt thanh toán sau (B). Các lý do kỳ nghỉ, phí ngân hàng, kế toán bận (A, C, D) không được nhắc.',
        translationVi:
          'Tại sao người nói khuyên không nên gửi hoá đơn vào cuối tháng?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What will the speaker most likely do next?',
        options: [
          'Discuss the use of late fees',
          'Show a sample invoice',
          'Respond to questions from the audience',
          'Introduce another presenter',
        ],
        answer: 2,
        explanationVi:
          '"But first, let’s take a few of the questions you’ve been typing into the chat" → trả lời câu hỏi của người nghe (C). Phí trả chậm để dành cho phần hai, sau phần hỏi đáp (A).',
        translationVi: 'Người nói nhiều khả năng sẽ làm gì tiếp theo?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
]
