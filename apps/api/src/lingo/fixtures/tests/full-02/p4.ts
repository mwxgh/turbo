/** One talk: every line by the narrator, in one accent. */
const talk = (accent: 'US' | 'GB' | 'AU' | 'CA', lines: string[]) =>
  lines.map((text) => ({ speaker: 'N', accent, text }))

/** Full Test 02, Part 4: written for Lingo (not from ETS). */
export const P4: object[] = [
  {
    difficulty: 'EASY',
    topic: 'Hospitality',
    transcript: talk('AU', [
      'Good morning, guests of the Seacliff Grand Hotel. This is an announcement from the front desk.',
      'Our rooftop swimming pool will be closed today from ten A.M. to four P.M. while the heating system is serviced.',
      'During that time, you’re welcome to use the indoor pool at our partner fitness club, Pulse Studio, just across the street.',
      'Simply show your room key at their reception desk, and there’s no charge.',
      'Also, breakfast this morning is being served in the Garden Room on the ground floor, because the main restaurant is hosting a private event.',
      'If you have any questions, please dial zero from your room phone.',
    ]),
    questions: [
      {
        text: 'What is the announcement mainly about?',
        options: [
          'A new fitness program for guests',
          'Temporary changes to hotel facilities',
          'A special offer on room rates',
          'The opening of a rooftop restaurant',
        ],
        answer: 1,
        explanationVi:
          'Hồ bơi trên sân thượng đóng cửa hôm nay, bữa sáng chuyển sang Garden Room → thay đổi tạm thời về tiện ích khách sạn (B). Pulse Studio là phòng tập đối tác, không phải chương trình mới (A); không nhắc giá phòng (C) hay nhà hàng trên sân thượng (D).',
        translationVi: 'Thông báo này chủ yếu nói về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What should guests show at the fitness club?',
        options: [
          'A membership card',
          'A breakfast voucher',
          'A photo ID',
          'Their room key',
        ],
        answer: 3,
        explanationVi:
          '"Simply show your room key at their reception desk" → chìa khoá phòng (D). Không nhắc thẻ hội viên (A), phiếu ăn sáng (B) hay giấy tờ tuỳ thân (C).',
        translationVi: 'Khách cần xuất trình gì ở câu lạc bộ thể hình?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Why is breakfast being served in a different room?',
        options: [
          'A private event is taking place.',
          'The kitchen is being repaired.',
          'More guests than usual are expected.',
          'The heating system is not working.',
        ],
        answer: 0,
        explanationVi:
          '"because the main restaurant is hosting a private event" → có sự kiện riêng (A). Hệ thống sưởi đang được bảo trì là lý do đóng hồ bơi, không phải lý do đổi phòng ăn (D).',
        translationVi: 'Tại sao bữa sáng được phục vụ ở một phòng khác?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Health',
    transcript: talk('US', [
      'Hi, this message is for Ms. Yolanda Brooks. This is Kevin from the billing office at Cedar Grove Medical Group.',
      'I’m calling about the statement you received last week for your visit on March third.',
      'It showed a balance of one hundred and twenty dollars, but that was our mistake. Your insurance company has approved the claim in full.',
      'So please ignore that statement. A corrected one will be mailed to you within ten days.',
      'Now, I noticed you already submitted a payment online yesterday.',
      'That amount will go back to your card automatically, although it can take up to five business days to appear.',
      'If you have any other questions, you can reach me directly at 555-0193, extension four.',
    ]),
    questions: [
      {
        text: 'Where does the speaker most likely work?',
        options: [
          'At a pharmacy',
          'At an insurance company',
          'At a healthcare provider',
          'At a bank',
        ],
        answer: 2,
        explanationVi:
          '"the billing office at Cedar Grove Medical Group" và nhắc đến "your visit" → anh ấy làm ở phòng thu ngân của một cơ sở y tế (C). Công ty bảo hiểm chỉ là bên đã duyệt hồ sơ (B); "card" không có nghĩa là ngân hàng (D).',
        translationVi: 'Người nói nhiều khả năng làm việc ở đâu?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'Why does the speaker say, "I noticed you already submitted a payment online yesterday"?',
        options: [
          'To explain why the listener will get money back',
          'To thank the listener for paying on time',
          'To point out that a payment was too small',
          'To ask the listener to confirm a card number',
        ],
        answer: 0,
        explanationVi:
          'Hoá đơn bị tính nhầm, bảo hiểm đã trả toàn bộ, nên khoản chị ấy đã thanh toán sẽ "go back to your card" → anh ấy nhắc khoản thanh toán để giải thích vì sao chị sẽ được hoàn tiền (A). Không phải lời cảm ơn (B), không nói thiếu tiền (C) hay hỏi số thẻ (D).',
        translationVi:
          'Tại sao người nói nói: "Tôi thấy chị đã thanh toán trực tuyến hôm qua"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'According to the speaker, what will the listener receive by mail?',
        options: [
          'A new insurance card',
          'An appointment reminder',
          'A payment receipt',
          'A revised statement',
        ],
        answer: 3,
        explanationVi:
          '"A corrected one will be mailed to you within ten days" → "one" = statement → bản sao kê đã chỉnh sửa (D). Không nhắc thẻ bảo hiểm (A), lịch hẹn (B) hay biên lai (C).',
        translationVi:
          'Theo người nói, người nghe sẽ nhận được gì qua bưu điện?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Retail',
    transcript: talk('GB', [
      'Is your bicycle ready for the spring? At Fernhill Cycle Works, our mechanics can have it running like new in just one day.',
      'Our standard tune-up includes brake and gear adjustment, a full safety check, and a thorough clean, all for forty-five pounds.',
      'Drop your bike off before ten in the morning, and you can collect it the same afternoon.',
      'And this month only, everyone who books a tune-up will receive a voucher for fifteen percent off any helmet or bike light in our shop.',
      'We’re also pleased to say that we’re now open on Sundays, from eleven until four.',
      'To reserve a time, use the booking page on our website, or simply pop into our shop on Mill Lane.',
    ]),
    questions: [
      {
        text: 'What service is being advertised?',
        options: [
          'Bicycle rental',
          'Bicycle maintenance',
          'Cycling lessons',
          'Home delivery of sports goods',
        ],
        answer: 1,
        explanationVi:
          '"our mechanics can have it running like new… standard tune-up includes brake and gear adjustment" → bảo dưỡng xe đạp (B). Không nhắc cho thuê (A), dạy đạp xe (C) hay giao hàng (D).',
        translationVi: 'Dịch vụ nào đang được quảng cáo?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What will customers receive this month?',
        options: [
          'A free safety check',
          'A same-day refund',
          'A discount on safety equipment',
          'A membership card',
        ],
        answer: 2,
        explanationVi:
          '"a voucher for fifteen percent off any helmet or bike light" → giảm giá mũ bảo hiểm, đèn xe = đồ bảo hộ (C). Kiểm tra an toàn đã có trong gói bảo dưỡng, không phải quà riêng tháng này (A).',
        translationVi: 'Khách hàng sẽ nhận được gì trong tháng này?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What has recently changed at the business?',
        options: [
          'It opens on an additional day.',
          'It has moved to Mill Lane.',
          'It has lowered its prices.',
          'It has hired more mechanics.',
        ],
        answer: 0,
        explanationVi:
          '"we’re now open on Sundays" → mở cửa thêm một ngày (A). "Mill Lane" là địa chỉ hiện tại, không nói đã chuyển đến (B); không nhắc giảm giá dịch vụ (C) hay tuyển thêm thợ (D).',
        translationVi: 'Điều gì mới thay đổi ở cửa hàng này?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Weather',
    transcript: talk('CA', [
      'This is Rachel Dunn with your W-K-L-M weather update.',
      'After a week of sunshine, a band of heavy rain will move into the region this evening and stay with us for most of tomorrow.',
      'Winds will also be strong along the coast, so if you’re planning to take the ferry to Pine Island, check the schedule before you leave home.',
      'Because of the forecast, organizers of tomorrow’s farmers’ market in Lakeview Park have moved it indoors, to the community center on Birch Avenue.',
      'The good news is that the weekend looks dry, with temperatures climbing back to around twenty degrees by Sunday.',
      'Stay tuned for local sports, right after this.',
    ]),
    questions: [
      {
        text: 'What does the speaker say will happen this evening?',
        options: [
          'Temperatures will rise.',
          'A ferry service will stop.',
          'A park will close.',
          'Rain will arrive.',
        ],
        answer: 3,
        explanationVi:
          '"a band of heavy rain will move into the region this evening" → mưa bắt đầu (D). Nhiệt độ tăng là vào cuối tuần (A); phà chỉ cần kiểm tra lịch, không nói ngừng chạy (B).',
        translationVi: 'Người nói cho biết điều gì sẽ xảy ra tối nay?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Why should some listeners check a schedule?',
        options: [
          'A road will be closed for repairs.',
          'Strong winds are expected.',
          'A holiday timetable is in effect.',
          'A ferry terminal has moved.',
        ],
        answer: 1,
        explanationVi:
          '"Winds will also be strong along the coast, so if you’re planning to take the ferry… check the schedule" → vì gió mạnh (B). (A), (C), (D) không được nhắc.',
        translationVi: 'Tại sao một số người nghe nên kiểm tra lịch trình?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Where will the farmers’ market be held tomorrow?',
        options: [
          'In Lakeview Park',
          'On Pine Island',
          'At a community center',
          'At a radio station',
        ],
        answer: 2,
        explanationVi:
          '"moved it indoors, to the community center on Birch Avenue" → trung tâm cộng đồng (C). Lakeview Park là địa điểm cũ (A).',
        translationVi: 'Phiên chợ nông sản ngày mai sẽ được tổ chức ở đâu?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Logistics',
    transcript: talk('AU', [
      'Okay, let’s move on to the picking-error figures for the Dandenong warehouse.',
      'Since we introduced the hand-held scanners in August, wrong-item shipments have fallen by about forty percent, which is a great result.',
      'But the overnight shift is still sending out more incorrect orders than both day shifts combined.',
      'Now, the overnight team works with the same scanners and the same stock as everyone else.',
      'What they don’t have is a supervisor on the floor after midnight, so any questions simply wait until morning.',
      'So starting next month, Priya Anand will move from days to nights for a three-month trial.',
      'Before then, I’d like each of you to send me details of any overnight orders that went wrong in the past two weeks, so we have a baseline to measure against.',
    ]),
    questions: [
      {
        text: 'According to the speaker, what has happened since August?',
        options: [
          'Fewer orders have contained the wrong items.',
          'Deliveries have been arriving earlier.',
          'A new warehouse has opened.',
          'The day shifts have been extended.',
        ],
        answer: 0,
        explanationVi:
          '"wrong-item shipments have fallen by about forty percent" → ít đơn hàng bị giao sai sản phẩm hơn (A). Không nói giao hàng sớm hơn (B), kho mới (C) hay kéo dài ca ngày (D).',
        translationVi: 'Theo người nói, điều gì đã xảy ra kể từ tháng Tám?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Why does the speaker say, "the overnight team works with the same scanners and the same stock as everyone else"?',
        options: [
          'To praise the overnight team’s efficiency',
          'To suggest that more scanners should be ordered',
          'To explain why stock levels are low at night',
          'To rule out equipment as the cause of a problem',
        ],
        answer: 3,
        explanationVi:
          'Ca đêm sai nhiều hơn, nhưng dùng cùng máy quét và cùng hàng → nguyên nhân không nằm ở thiết bị; câu sau chỉ ra nguyên nhân thật là thiếu giám sát (D). Đây không phải lời khen (A), không đề nghị mua thêm (B) hay nói hàng tồn thấp (C).',
        translationVi:
          'Tại sao người nói nói: "nhóm ca đêm dùng cùng máy quét và cùng hàng hoá như mọi người khác"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What does the speaker ask the listeners to do?',
        options: [
          'Train new scanner users',
          'Provide records of recent errors',
          'Volunteer for the night shift',
          'Count the stock in the warehouse',
        ],
        answer: 1,
        explanationVi:
          '"send me details of any overnight orders that went wrong in the past two weeks" → gửi thông tin các lỗi gần đây (B). Người chuyển sang ca đêm đã được chọn là Priya (C); không nhắc đào tạo (A) hay kiểm kê (D).',
        translationVi: 'Người nói yêu cầu người nghe làm gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Publishing',
    transcript: talk('US', [
      'Good evening, everyone, and welcome to the annual dinner of the Northern Independent Publishers Association.',
      'It’s my pleasure to introduce tonight’s guest speaker, Harriet Lindqvist.',
      'Harriet started her career as an assistant editor at a small travel magazine, and fifteen years later she founded Bluefin Press, which now publishes more than forty titles a year.',
      'Last spring, Bluefin made headlines when it began releasing every new title as an audiobook on the same day as the print edition.',
      'Many in our industry said that couldn’t be done on a small budget. Tonight, Harriet will tell us exactly how her team managed it.',
      'After her talk, she’ll take questions, so please write yours on the cards on your tables, and our staff will collect them.',
    ]),
    questions: [
      {
        text: 'Who most likely are the listeners?',
        options: [
          'Publishing professionals',
          'Travel writers',
          'Audio engineers',
          'Restaurant staff',
        ],
        answer: 0,
        explanationVi:
          '"the annual dinner of the Northern Independent Publishers Association" → người làm trong ngành xuất bản (A). "travel magazine" chỉ là nơi Harriet từng làm (B); "dinner" không có nghĩa người nghe là nhân viên nhà hàng (D).',
        translationVi: 'Người nghe nhiều khả năng là ai?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'What did Bluefin Press do last spring?',
        options: [
          'It opened a travel magazine.',
          'It reduced its number of titles.',
          'It released audio versions together with printed books.',
          'It merged with a larger publisher.',
        ],
        answer: 2,
        explanationVi:
          '"began releasing every new title as an audiobook on the same day as the print edition" → phát hành sách nói cùng lúc với sách in (C). Các lựa chọn khác không được nhắc.',
        translationVi: 'Mùa xuân năm ngoái Bluefin Press đã làm gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What are the listeners asked to do?',
        options: [
          'Purchase a book',
          'Find their assigned tables',
          'Fill out a survey',
          'Write down their questions',
        ],
        answer: 3,
        explanationVi:
          '"please write yours on the cards on your tables" → "yours" = câu hỏi → viết câu hỏi ra thẻ (D). "tables" chỉ là nơi để thẻ (B); không nhắc mua sách (A) hay khảo sát (C).',
        translationVi: 'Người nghe được yêu cầu làm gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Health',
    transcript: talk('GB', [
      'Right, everyone, let’s get started with the second part of today’s workshop for front-desk staff.',
      'This morning we covered the new online booking system. Now I’d like to focus on something software can’t do for you: dealing with patients who’ve been kept waiting.',
      'Our surveys show that patients don’t mind a delay nearly as much as they mind not being told about it.',
      'So the rule is simple. If a doctor is running more than fifteen minutes late, tell everyone in the waiting room, and give them a realistic time.',
      'Now, some of you are probably thinking, "But that just invites complaints." Well, at the two surgeries that piloted this approach, complaints fell by half.',
      'In a moment, I’ll hand out some short scenarios. Work in groups of three: one receptionist, one patient, and one observer taking notes.',
    ]),
    questions: [
      {
        text: 'What is the main topic of this part of the workshop?',
        options: [
          'Using an online booking system',
          'Reducing doctors’ workloads',
          'Communicating about delays',
          'Designing patient surveys',
        ],
        answer: 2,
        explanationVi:
          '"focus on… dealing with patients who’ve been kept waiting… tell everyone… give them a realistic time" → thông báo cho bệnh nhân về việc chậm trễ (C). Hệ thống đặt lịch là nội dung buổi sáng (A); khảo sát chỉ là nguồn số liệu (D).',
        translationVi: 'Chủ đề chính của phần hội thảo này là gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'Why does the speaker say, "But that just invites complaints"?',
        options: [
          'To report a patient’s feedback',
          'To respond to a doubt listeners may have',
          'To criticize a colleague’s suggestion',
          'To explain why a pilot was stopped',
        ],
        answer: 1,
        explanationVi:
          'Bà ấy nói "some of you are probably thinking…" rồi đưa ra số liệu khiếu nại giảm một nửa → nêu trước sự hoài nghi của người nghe để bác bỏ nó (B). Không phải phản hồi của bệnh nhân (A), không chê đồng nghiệp (C); chương trình thí điểm thành công chứ không bị dừng (D).',
        translationVi:
          'Tại sao người nói nói: "Nhưng làm vậy chỉ chuốc thêm phàn nàn"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What will the listeners most likely do next?',
        options: [
          'Take part in role-plays',
          'Watch a software demonstration',
          'Visit a waiting room',
          'Complete a written test',
        ],
        answer: 0,
        explanationVi:
          '"I’ll hand out some short scenarios… one receptionist, one patient, and one observer" → đóng vai theo tình huống (A). Phần mềm đã học buổi sáng (B); "waiting room" chỉ xuất hiện trong nội dung bài (C).',
        translationVi: 'Người nghe nhiều khả năng sẽ làm gì tiếp theo?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Hospitality',
    transcript: talk('CA', [
      'Welcome to your first day at the Linden Park Resort. I’m Marcus, and I manage guest services here.',
      'Over the next hour, I’ll walk you through the parts of the property that guests ask about most often.',
      'We’re starting here in the conference wing, which hosts up to six corporate events a week.',
      'From here, we’ll head down to the spa and then out to the lakeside cabins. They’re a good ten-minute walk away, so I hope you wore comfortable shoes.',
      'Please hold on to the map in your welcome pack. Guests will often stop you to ask for directions, and you’ll want to point them the right way.',
      'We’ll finish at the staff cafeteria, where lunch is provided for everyone on their first day.',
    ]),
    questions: [
      {
        text: 'Who most likely are the listeners?',
        options: [
          'Conference organizers',
          'Hotel guests',
          'Spa therapists',
          'Newly hired employees',
        ],
        answer: 3,
        explanationVi:
          '"Welcome to your first day at the Linden Park Resort", "staff cafeteria… lunch is provided for everyone on their first day" → nhân viên mới (D). Khách là người sẽ hỏi đường họ (B); hội nghị, spa chỉ là địa điểm tham quan (A), (C).',
        translationVi: 'Người nghe nhiều khả năng là ai?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'What does the speaker suggest about the lakeside cabins?',
        options: [
          'They are some distance from the main buildings.',
          'They are currently being renovated.',
          'They are popular with corporate groups.',
          'They can be reached only by shuttle.',
        ],
        answer: 0,
        explanationVi:
          '"They’re a good ten-minute walk away, so I hope you wore comfortable shoes" → các cabin nằm khá xa (A). Đi bộ được nên (D) sai; (B), (C) không được nhắc.',
        translationVi: 'Người nói ngụ ý điều gì về các cabin ven hồ?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'Why should the listeners keep the map?',
        options: [
          'To find the staff cafeteria',
          'To mark their work stations',
          'To help guests find their way',
          'To plan an emergency exit route',
        ],
        answer: 2,
        explanationVi:
          '"Guests will often stop you to ask for directions, and you’ll want to point them the right way" → để chỉ đường cho khách (C). Căn tin là điểm cuối của chuyến tham quan, không phải lý do giữ bản đồ (A).',
        translationVi: 'Tại sao người nghe nên giữ bản đồ?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Business news',
    transcript: talk('US', [
      'In business news, Meridian Media announced on Tuesday that its monthly magazine, Harbor and Home, will publish its final print issue in June.',
      'The fifty-year-old title will continue online, with new articles posted daily instead of once a month.',
      'Meridian says printing and postage costs have risen by nearly a third over the past two years, while advertisers have steadily moved their budgets to digital.',
      'Subscribers who have paid for print issues beyond June will be offered either a refund or a free two-year digital membership.',
      'Meridian isn’t the first publisher in the region to make this move. Last year, two of its competitors did the same.',
      'Both, however, have since brought back a printed edition, released four times a year.',
      'Meridian’s chief executive says the company has no such plans, at least for now.',
    ]),
    questions: [
      {
        text: 'What is the news report mainly about?',
        options: [
          'A merger between two media companies',
          'A publication ending its paper edition',
          'A magazine celebrating its anniversary',
          'A rise in advertising prices',
        ],
        answer: 1,
        explanationVi:
          '"will publish its final print issue in June… will continue online" → tạp chí ngừng bản in (B). "fifty-year-old" chỉ là tuổi của tạp chí, không phải lễ kỷ niệm (C); chi phí in tăng chứ không phải giá quảng cáo (D).',
        translationVi: 'Bản tin chủ yếu nói về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What will some subscribers be offered?',
        options: [
          'A choice of free printed books',
          'Tickets to a company event',
          'A refund or extended online access',
          'A discount on quarterly issues',
        ],
        answer: 2,
        explanationVi:
          '"either a refund or a free two-year digital membership" → hoàn tiền hoặc truy cập trực tuyến hai năm (C). "four times a year" là ấn bản in của đối thủ, không phải ưu đãi (D).',
        translationVi: 'Một số người đăng ký sẽ được đề nghị điều gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Why does the speaker say, "Both, however, have since brought back a printed edition"?',
        options: [
          'To praise Meridian’s competitors',
          'To explain why printing costs have risen',
          'To announce a new quarterly magazine',
          'To suggest that Meridian’s decision may not be final',
        ],
        answer: 3,
        explanationVi:
          'Hai đối thủ từng bỏ bản in rồi lại in lại; câu cuối "no such plans, at least for now" → người nói ngụ ý quyết định của Meridian có thể chưa phải là cuối cùng (D). Không phải lời khen (A), không giải thích chi phí (B); ấn bản quý là của đối thủ (C).',
        translationVi:
          'Tại sao người nói nói: "Tuy nhiên, cả hai đều đã cho ra lại ấn bản in"?',
        skillTags: ['comprehension.speaker-intent'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Retail',
    transcript: talk('AU', [
      'Morning, team. Before the doors open, a few quick things about today’s clearance sale.',
      'Head office wants us to clear all of last season’s winter coats, so every coat on the back wall is now sixty percent off.',
      'Expect a crowd. The last time we ran a discount this big, the queue went past the bakery next door.',
      'So I’ve asked Tom to open the second register at nine-thirty instead of waiting until lunchtime.',
      'One more thing: the price tags on the coats haven’t been changed, so make sure every customer knows the discount is taken off at the register.',
      'Any questions? No? Great. Let’s have a good day.',
    ]),
    questions: [
      {
        text: 'What is the purpose of the talk?',
        options: [
          'To introduce a new employee',
          'To announce a change in store hours',
          'To prepare staff for a sale',
          'To review last season’s results',
        ],
        answer: 2,
        explanationVi:
          '"a few quick things about today’s clearance sale" → chuẩn bị cho đợt giảm giá (C). Tom là đồng nghiệp đã có, không phải nhân viên mới (A); không đổi giờ mở cửa (B).',
        translationVi: 'Mục đích của bài nói là gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'Why does the speaker say, "the queue went past the bakery next door"?',
        options: [
          'To justify opening an extra register early',
          'To complain about a neighboring business',
          'To suggest moving the coats to the front',
          'To ask staff to take an earlier lunch',
        ],
        answer: 0,
        explanationVi:
          'Hàng người dài đến tận tiệm bánh bên cạnh → hôm nay cũng sẽ đông, nên "I’ve asked Tom to open the second register at nine-thirty" → lý do mở quầy thứ hai sớm (A). Không phàn nàn tiệm bánh (B); "lunchtime" là thời điểm thường mở quầy, không phải đề nghị ăn trưa sớm (D).',
        translationVi:
          'Tại sao người nói nói: "hàng người xếp dài qua cả tiệm bánh bên cạnh"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What should employees tell customers?',
        options: [
          'Coats cannot be returned.',
          'The reduction is applied at payment.',
          'More stock will arrive at lunchtime.',
          'Price tags have been updated.',
        ],
        answer: 1,
        explanationVi:
          '"make sure every customer knows the discount is taken off at the register" → giảm giá được trừ khi thanh toán (B). Nhãn giá chưa đổi nên (D) ngược nghĩa; (A), (C) không được nhắc.',
        translationVi: 'Nhân viên nên nói gì với khách hàng?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
]
