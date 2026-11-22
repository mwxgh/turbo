/** One talk: every line by the narrator, in one accent. */
const talk = (accent: 'US' | 'GB' | 'AU' | 'CA', lines: string[]) =>
  lines.map((text) => ({ speaker: 'N', accent, text }))

/** Full Test 05, Part 4: written for Lingo (not from ETS). */
export const P4: object[] = [
  {
    difficulty: 'EASY',
    topic: 'Transportation',
    transcript: talk('AU', [
      'Attention, passengers waiting for the eleven-fifteen ferry to Kestrel Island.',
      'Because of thick fog in the harbour, our departure has been delayed by about forty minutes.',
      'We expect to leave at around eleven fifty-five, but we’ll make another announcement as soon as the captain confirms the time.',
      'While you wait, the café on the upper deck is open, and all hot drinks are half price until we depart.',
      'Passengers travelling with a car should stay in the waiting lounge until they’re called to the vehicle deck.',
      'We’re sorry for the inconvenience, and thank you for your patience.',
    ]),
    questions: [
      {
        text: 'Why has the departure been delayed?',
        options: [
          'A mechanical problem',
          'Poor weather conditions',
          'A late crew member',
          'Heavy traffic on the island',
        ],
        answer: 1,
        explanationVi:
          '"Because of thick fog in the harbour" → sương mù dày, tức là thời tiết xấu (B). Không nhắc hỏng máy (A), thuyền viên đến muộn (C) hay tắc đường (D).',
        translationVi: 'Tại sao chuyến khởi hành bị hoãn?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What is being offered to passengers?',
        options: [
          'Free meals',
          'A full refund',
          'Discounted drinks',
          'Priority boarding',
        ],
        answer: 2,
        explanationVi:
          '"all hot drinks are half price" → đồ uống nóng giảm nửa giá (C). Không có bữa ăn miễn phí (A), hoàn tiền (B) hay ưu tiên lên tàu (D).',
        translationVi: 'Hành khách được mời dùng ưu đãi gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What are passengers with cars asked to do?',
        options: [
          'Move their cars to a parking lot',
          'Show their tickets at the café',
          'Drive onto the vehicle deck now',
          'Remain in the waiting area',
        ],
        answer: 3,
        explanationVi:
          '"should stay in the waiting lounge until they’re called" → ở lại khu chờ (D). Họ chỉ xuống boong xe khi được gọi, không phải ngay bây giờ (C).',
        translationVi: 'Hành khách đi ô tô được yêu cầu làm gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Community',
    transcript: talk('CA', [
      'Good afternoon, visitors to the Ashford Public Library.',
      'The library will be closing in thirty minutes, at six o’clock.',
      'Please bring any items you’d like to borrow to the checkout desk on the first floor, as the self-service machines will be switched off at five forty-five.',
      'Also, a reminder that our children’s story time is moving from Saturday mornings to Sunday afternoons, starting next week.',
      'You can pick up a printed schedule of this month’s events at the information desk near the main entrance.',
      'Thank you, and we hope to see you again soon.',
    ]),
    questions: [
      {
        text: 'Where is the announcement being made?',
        options: [
          'At a library',
          'At a bookstore',
          'At a school',
          'At a community theater',
        ],
        answer: 0,
        explanationVi:
          '"visitors to the Ashford Public Library", "items you’d like to borrow" → thư viện (A). Hiệu sách (B) bán chứ không cho mượn; không nhắc trường học (C) hay nhà hát (D).',
        translationVi: 'Thông báo này được phát ở đâu?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What will happen at 5:45?',
        options: [
          'The checkout desk will close.',
          'A children’s event will begin.',
          'Some machines will be turned off.',
          'The main entrance will be locked.',
        ],
        answer: 2,
        explanationVi:
          '"the self-service machines will be switched off at five forty-five" → máy tự phục vụ bị tắt (C). Thư viện đóng cửa lúc 6 giờ, quầy mượn sách vẫn mở (A); giờ kể chuyện cho trẻ em chuyển sang chiều Chủ nhật (B).',
        translationVi: 'Điều gì sẽ xảy ra lúc 5 giờ 45?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What can listeners get at the information desk?',
        options: [
          'A library card',
          'An event schedule',
          'A membership form',
          'A parking pass',
        ],
        answer: 1,
        explanationVi:
          '"pick up a printed schedule of this month’s events at the information desk" → lịch sự kiện (B). Không nhắc thẻ thư viện (A), đơn đăng ký (C) hay vé gửi xe (D).',
        translationVi: 'Người nghe có thể nhận gì ở quầy thông tin?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Services',
    transcript: talk('GB', [
      'Hello, this is Priya from Hartwell Motors, calling for Mr. Callum Reid.',
      'Your car has had its annual service, and I’m happy to say it passed the safety inspection.',
      'However, our mechanic noticed that the front tyres are quite worn. They’re still legal, but we’d recommend replacing them within the next couple of months.',
      'We can do that for you on another day if you prefer.',
      'Your car is ready now, and you can collect it any time before seven this evening.',
      'Please remember to bring the ticket you were given when you dropped it off, as you’ll need it to leave our car park.',
    ]),
    questions: [
      {
        text: 'Who most likely is the speaker?',
        options: [
          'A car rental agent',
          'A driving instructor',
          'An employee at a repair garage',
          'An insurance adviser',
        ],
        answer: 2,
        explanationVi:
          'Cô ấy gọi từ Hartwell Motors, báo xe đã được bảo dưỡng định kỳ và thợ máy kiểm tra lốp → nhân viên gara sửa xe (C). Không nhắc thuê xe (A), dạy lái (B) hay bảo hiểm (D).',
        translationVi: 'Người nói nhiều khả năng là ai?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'What does the speaker recommend?',
        options: [
          'Buying a new car',
          'Replacing some tyres',
          'Booking another inspection',
          'Cleaning the car',
        ],
        answer: 1,
        explanationVi:
          '"we’d recommend replacing them within the next couple of months" → "them" = lốp trước → thay lốp (B). Xe đã qua kiểm tra an toàn nên không cần đặt kiểm tra khác (C).',
        translationVi: 'Người nói khuyên điều gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the speaker remind the listener to bring?',
        options: [
          'A payment card',
          'His driving licence',
          'A spare key',
          'A ticket',
        ],
        answer: 3,
        explanationVi:
          '"remember to bring the ticket you were given when you dropped it off" → tấm vé nhận khi gửi xe (D). Không nhắc thẻ thanh toán (A), bằng lái (B) hay chìa khoá dự phòng (C).',
        translationVi: 'Người nói nhắc người nghe mang theo gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Tourism',
    transcript: talk('US', [
      'Welcome to Brightwater Glassworks. I’m Tessa, and I’ll be guiding you through our studio for the next hour.',
      'Everything sold in our gift shop is shaped by hand right here, using techniques that haven’t changed much in two hundred years.',
      'In a moment, we’ll stop by the main furnace, where the temperature reaches over a thousand degrees, so please stay behind the yellow line on the floor at all times.',
      'After that, you’ll watch one of our artists make a vase from start to finish.',
      'Photos are welcome, but we ask that you turn off your flash, since it can distract the artists while they work.',
      'At the end of the tour, each of you will get a chance to decorate a small glass ornament to take home.',
    ]),
    questions: [
      {
        text: 'Where most likely are the listeners?',
        options: [
          'At a glass-making studio',
          'At an art museum',
          'At a hardware store',
          'At a science center',
        ],
        answer: 0,
        explanationVi:
          '"Brightwater Glassworks… our studio", lò nung và nghệ nhân thổi bình → xưởng làm thủy tinh (A). Có cửa hàng quà tặng nhưng không phải bảo tàng nghệ thuật (B); không phải cửa hàng vật liệu (C) hay trung tâm khoa học (D).',
        translationVi: 'Người nghe nhiều khả năng đang ở đâu?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'Why are listeners asked not to use a flash?',
        options: [
          'It may damage the products.',
          'It is not allowed in the gift shop.',
          'It affects the furnace temperature.',
          'It could distract the workers.',
        ],
        answer: 3,
        explanationVi:
          '"since it can distract the artists while they work" → làm phân tâm người làm việc (D). "artists" được diễn đạt lại thành "workers". Không nói đèn flash làm hỏng sản phẩm (A) hay ảnh hưởng lò nung (C).',
        translationVi: 'Tại sao người nghe được yêu cầu không dùng đèn flash?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What will listeners do at the end of the tour?',
        options: [
          'Buy a vase at a discount',
          'Decorate an item',
          'Meet the studio’s owner',
          'Watch a short film',
        ],
        answer: 1,
        explanationVi:
          '"each of you will get a chance to decorate a small glass ornament" → trang trí một món đồ (B). Bình hoa là thứ họ xem nghệ nhân làm, không phải mua giảm giá (A).',
        translationVi: 'Người nghe sẽ làm gì vào cuối chuyến tham quan?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Automotive',
    transcript: talk('AU', [
      'When was the last time you had time to wash your car? With SparkRun Mobile Car Care, you don’t need to find the time. We come to you.',
      'Our vans visit office car parks across the city, and we clean your car while you’re at your desk.',
      'We use a waterless method, so there’s no mess and no hose, and building managers are happy to have us.',
      'A basic exterior wash is twenty-five dollars. Interior vacuuming can be added for a small extra fee.',
      'Just leave your key with your building’s reception, and we’ll return it with a text message when the job is done.',
      'And if five or more people from the same workplace book on the same day, everyone gets ten dollars off.',
    ]),
    questions: [
      {
        text: 'Where does the business provide its service?',
        options: [
          'At a petrol station',
          'At customers’ workplaces',
          'At customers’ homes',
          'At a shopping centre',
        ],
        answer: 1,
        explanationVi:
          '"Our vans visit office car parks… we clean your car while you’re at your desk" → tại nơi làm việc của khách (B). "We come to you" nhưng chỉ nói đến bãi đỗ xe văn phòng, không phải nhà riêng (C).',
        translationVi: 'Doanh nghiệp cung cấp dịch vụ ở đâu?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What costs extra?',
        options: [
          'An exterior wash',
          'A text message alert',
          'Cleaning the inside of a car',
          'Parking in a car park',
        ],
        answer: 2,
        explanationVi:
          '"Interior vacuuming can be added for a small extra fee" → hút bụi bên trong xe phải trả thêm (C). Rửa ngoài là gói cơ bản 25 đô (A); tin nhắn báo xong là dịch vụ kèm theo (B).',
        translationVi: 'Điều gì phải trả thêm tiền?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'How can customers receive a discount?',
        options: [
          'By booking online',
          'By leaving a key at reception',
          'By signing up for a monthly plan',
          'By booking as a group of coworkers',
        ],
        answer: 3,
        explanationVi:
          '"if five or more people from the same workplace book on the same day, everyone gets ten dollars off" → đặt theo nhóm đồng nghiệp (D). Để chìa khoá ở lễ tân là cách làm thông thường, không được giảm giá (B); không nhắc đặt online (A) hay gói tháng (C).',
        translationVi: 'Khách hàng có thể được giảm giá bằng cách nào?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Technology',
    transcript: talk('GB', [
      'Before we finish, a quick update from the IT department.',
      'Over the weekend, we’re moving all staff e-mail accounts to a new system.',
      'The move begins at eight on Friday evening, so please make sure you’ve logged out of your e-mail by then.',
      'When you log in on Monday, you’ll be asked to create a new password, and it has to be at least twelve characters long.',
      'I know some of you are worried about losing your old messages, but there’s no need. Everything will be copied across automatically.',
      'Rashid from our team will be on the second floor all Monday morning to help anyone who has trouble.',
    ]),
    questions: [
      {
        text: 'What is the speaker mainly talking about?',
        options: [
          'A move to a new e-mail system',
          'The purchase of new laptops',
          'A change in working hours',
          'A training course on security',
        ],
        answer: 0,
        explanationVi:
          '"we’re moving all staff e-mail accounts to a new system" → chuyển sang hệ thống e-mail mới (A). Mật khẩu mới chỉ là một bước của việc chuyển đổi, không phải khoá học bảo mật (D).',
        translationVi: 'Người nói chủ yếu nói về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What will listeners be asked to do on Monday?',
        options: [
          'Create a new password',
          'Copy their old messages',
          'Attend a meeting on the second floor',
          'Restart their computers',
        ],
        answer: 0,
        explanationVi:
          '"When you log in on Monday, you’ll be asked to create a new password" → tạo mật khẩu mới (A). Thư cũ được sao chép tự động, họ không phải tự làm (B); Rashid ở tầng hai để hỗ trợ, không có cuộc họp (C).',
        translationVi: 'Người nghe sẽ được yêu cầu làm gì vào thứ Hai?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Why does the speaker say, "there’s no need"?',
        options: [
          'To say that passwords will stay the same',
          'To announce that a meeting is optional',
          'To reassure listeners that old messages will not be lost',
          'To explain that no volunteers are required on Monday',
        ],
        answer: 2,
        explanationVi:
          'Câu trước: "some of you are worried about losing your old messages"; câu sau: "Everything will be copied across automatically" → người nói trấn an rằng thư cũ không bị mất (C). Mật khẩu phải đổi nên (A) sai; không nhắc cuộc họp (B) hay tình nguyện viên (D).',
        translationVi: 'Tại sao người nói nói: "không cần phải vậy"?',
        skillTags: ['comprehension.speaker-intent'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Local news',
    transcript: talk('CA', [
      'In local news, the city of Brantford Falls will launch its first bike-share program next month.',
      'Two hundred bicycles will be available at thirty stations across the downtown area, including outside the central train station and city hall.',
      'Riders will unlock a bike with a mobile app and can pay either per ride or with a monthly pass.',
      'City councillor Dana Whitlock said the program is aimed mainly at commuters who live too far from the train station to walk there.',
      'The city is paying for the first year with a provincial transportation grant, and after that a private sponsor is expected to cover the costs.',
      'Officials will be at the station on Elm Avenue this Saturday to show residents how the app works.',
    ]),
    questions: [
      {
        text: 'What is the news report mainly about?',
        options: [
          'A new train line',
          'A bicycle rental program',
          'A road repair project',
          'A cycling competition',
        ],
        answer: 1,
        explanationVi:
          '"will launch its first bike-share program" → chương trình thuê xe đạp công cộng (B). Ga tàu chỉ là vị trí đặt trạm xe (A); không nhắc sửa đường (C) hay cuộc thi (D).',
        translationVi: 'Bản tin chủ yếu nói về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'According to Ms. Whitlock, who is the program mainly intended for?',
        options: [
          'Tourists visiting downtown',
          'University students',
          'City employees',
          'People who travel to work',
        ],
        answer: 3,
        explanationVi:
          '"aimed mainly at commuters" → commuters = người đi làm hằng ngày (D). Trạm đặt ở toà thị chính không có nghĩa là dành cho nhân viên thành phố (C).',
        translationVi: 'Theo bà Whitlock, chương trình chủ yếu dành cho ai?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What will happen on Saturday?',
        options: [
          'An app will be demonstrated.',
          'A sponsor will be announced.',
          'New stations will open.',
          'A council vote will take place.',
        ],
        answer: 0,
        explanationVi:
          '"Officials will be at the station… to show residents how the app works" → hướng dẫn cách dùng ứng dụng (A). Nhà tài trợ chỉ "is expected" sau năm đầu (B); chương trình ra mắt tháng sau, không phải thứ Bảy (C).',
        translationVi: 'Điều gì sẽ diễn ra vào thứ Bảy?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Events',
    transcript: talk('US', [
      'Good evening, everyone. It’s my pleasure to present this year’s Founders’ Award for innovation.',
      'When our water treatment plant in Riverside kept missing its energy targets, most of us assumed we’d simply have to replace the pumps, a project budgeted at nearly two million dollars.',
      'Our winner, Dr. Leila Haddad, didn’t accept that. She spent three months studying the plant’s data and found that the pumps were running at full power even at night, when demand is lowest.',
      'By reprogramming the control system, her team cut energy use by a third, and the original pumps are still in service today.',
      'Frankly, I’m not sure the rest of us would have thought to look.',
      'Leila has asked that the prize money go toward training for the plant’s technicians, which says a lot about her.',
      'Please join me in welcoming her to the stage.',
    ]),
    questions: [
      {
        text: 'What problem did the Riverside plant have?',
        options: [
          'Its pumps had stopped working.',
          'It could not meet demand at night.',
          'It was not meeting its energy goals.',
          'It had too few technicians.',
        ],
        answer: 2,
        explanationVi:
          '"kept missing its energy targets" → không đạt mục tiêu năng lượng (C). Máy bơm vẫn hoạt động, thậm chí chạy hết công suất (A sai); ban đêm nhu cầu thấp nhất chứ không thiếu (B); kỹ thuật viên được nhắc đến ở việc đào tạo, không phải thiếu người (D).',
        translationVi: 'Nhà máy ở Riverside đã gặp vấn đề gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the speaker imply when she says, "I’m not sure the rest of us would have thought to look"?',
        options: [
          'The plant’s data was kept confidential.',
          'Dr. Haddad noticed something others had missed.',
          'The pump replacement had been badly planned.',
          'Other employees were too busy to help.',
        ],
        answer: 1,
        explanationVi:
          'Mọi người đều nghĩ phải thay máy bơm, chỉ Dr. Haddad chịu phân tích dữ liệu và tìm ra nguyên nhân → người nói ngụ ý bà đã thấy điều người khác bỏ qua (B). Không nói dữ liệu bị giữ kín (A), kế hoạch tồi (C) hay nhân viên quá bận (D).',
        translationVi:
          'Người nói ngụ ý gì khi nói: "Tôi không chắc những người còn lại trong chúng ta đã nghĩ đến việc tìm hiểu"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What has Dr. Haddad asked to be done with the prize money?',
        options: [
          'Donate it to a local charity',
          'Use it to buy new pumps',
          'Fund her team’s research',
          'Pay for technicians’ training',
        ],
        answer: 3,
        explanationVi:
          '"asked that the prize money go toward training for the plant’s technicians" → đào tạo kỹ thuật viên (D). Máy bơm cũ vẫn dùng được nên không mua mới (B); không nhắc từ thiện (A) hay nghiên cứu (C).',
        translationVi: 'Dr. Haddad đề nghị dùng tiền thưởng vào việc gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Marketing',
    transcript: talk('GB', [
      'Let’s turn to the results of the customer survey we ran in October for the Greenbasket meal-kit app.',
      'Overall satisfaction was up slightly, which is encouraging, but the comment I saw most often wasn’t about the food at all. It was about the delivery window.',
      'At the moment, customers have to choose a four-hour slot, and a lot of them say they simply can’t stay at home that long.',
      'Now, the logistics team has told me that a shorter window would cost us more. That’s true. But we lost almost eight hundred subscribers last quarter, and many of them gave this as their reason.',
      'So what I’d like to do is test two-hour slots in Leeds only, starting in January, and compare cancellation rates with the rest of the country.',
      'Hannah, could you draft a cost estimate for that by next Friday?',
    ]),
    questions: [
      {
        text: 'What were customers most often unhappy about?',
        options: [
          'How long they must wait at home for deliveries',
          'The quality of the ingredients',
          'The price of a subscription',
          'The design of the app',
        ],
        answer: 0,
        explanationVi:
          '"the comment I saw most often… was about the delivery window… they simply can’t stay at home that long" → phải ở nhà chờ giao hàng quá lâu (A). Người nói nhấn mạnh phàn nàn "wasn’t about the food" nên (B) sai; không nhắc giá (C) hay giao diện (D).',
        translationVi: 'Khách hàng thường không hài lòng nhất về điều gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Why does the speaker say, "That’s true"?',
        options: [
          'To reject a proposal from the logistics team',
          'To confirm that subscriber numbers have risen',
          'To accept an objection before arguing against it',
          'To agree that the survey results are unreliable',
        ],
        answer: 2,
        explanationVi:
          'Người nói thừa nhận ý kiến của bộ phận hậu cần (khung giờ ngắn hơn sẽ tốn kém hơn), rồi dùng "But…" để phản bác bằng số người huỷ đăng ký → chấp nhận một phản đối trước khi lập luận ngược lại (C). Số thuê bao giảm chứ không tăng (B); không nói kết quả khảo sát không đáng tin (D).',
        translationVi: 'Tại sao người nói nói: "Điều đó đúng"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What is Hannah asked to do?',
        options: [
          'Contact customers in Leeds',
          'Prepare a cost estimate',
          'Compare cancellation rates',
          'Organize another survey',
        ],
        answer: 1,
        explanationVi:
          '"Hannah, could you draft a cost estimate for that by next Friday?" → soạn bản ước tính chi phí (B). So sánh tỷ lệ huỷ (C) là việc làm sau khi thử nghiệm từ tháng Một, không phải nhiệm vụ của Hannah.',
        translationVi: 'Hannah được yêu cầu làm gì?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Construction',
    transcript: talk('AU', [
      'Hi, Graham, it’s Nadia Kowalski from Kowalski and Tran Architects, about the extension to your café on Beach Road.',
      'I heard back from the council this morning. They’re happy with the design overall, but they won’t approve the rear deck as drawn, because it comes too close to the property line.',
      'There are two ways forward. We can shorten the deck by about a metre, which I can do in a day, or we can apply for an exception, but that usually adds six to eight weeks.',
      'Given that you wanted the new seating area open before summer, I know which one I’d choose.',
      'Either way, I’ll need your decision by Thursday, because the builders are holding a start date for us.',
      'Give me a call when you can.',
    ]),
    questions: [
      {
        text: 'What is the message mainly about?',
        options: [
          'A shortage of building materials',
          'A complaint from a neighbor',
          'A change to the café’s menu',
          'A local authority’s response to a design',
        ],
        answer: 3,
        explanationVi:
          '"I heard back from the council… they won’t approve the rear deck as drawn" → phản hồi của chính quyền địa phương về bản thiết kế (D). "property line" (ranh giới đất) không có nghĩa là hàng xóm phàn nàn (B); không nhắc vật liệu (A) hay thực đơn (C).',
        translationVi: 'Lời nhắn chủ yếu nói về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the speaker imply when she says, "I know which one I’d choose"?',
        options: [
          'She recommends making the deck smaller.',
          'She prefers to apply for an exception.',
          'She thinks the summer deadline is unrealistic.',
          'She would like to discuss the options in person.',
        ],
        answer: 0,
        explanationVi:
          'Xin ngoại lệ mất thêm 6–8 tuần, còn thu nhỏ sàn gỗ chỉ mất một ngày; vì khách muốn mở khu chỗ ngồi trước mùa hè → cô ấy ngụ ý nên thu nhỏ sàn (A), trái với (B). Cô không cho rằng hạn mùa hè là phi thực tế (C).',
        translationVi:
          'Người nói ngụ ý gì khi nói: "Tôi biết mình sẽ chọn phương án nào"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'Why must the listener respond by Thursday?',
        options: [
          'The council meets on Friday.',
          'The café will open soon.',
          'A construction start date is being held.',
          'A design fee is due then.',
        ],
        answer: 2,
        explanationVi:
          '"because the builders are holding a start date for us" → bên xây dựng đang giữ ngày khởi công (C). Không nhắc cuộc họp hội đồng (A) hay phí thiết kế (D); khu chỗ ngồi mới chưa mở (B).',
        translationVi: 'Tại sao người nghe phải trả lời trước thứ Năm?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
]
