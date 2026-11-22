/** One talk: every line by the narrator, in one accent. */
const talk = (accent: 'US' | 'GB' | 'AU' | 'CA', lines: string[]) =>
  lines.map((text) => ({ speaker: 'N', accent, text }))

/** Full Test 01, Part 4: written for Lingo (not from ETS). */
export const P4: object[] = [
  {
    difficulty: 'EASY',
    topic: 'Events',
    transcript: talk('CA', [
      'Good evening, and thank you for visiting the Pacific Home and Garden Expo here at the Delmont Convention Center.',
      'Please note that the exhibition halls will close in thirty minutes, at seven o’clock.',
      'If you bought anything from our exhibitors today, you can pick up your items at the loading area behind Hall C.',
      'Free shuttle buses to the downtown parking garages leave from the north entrance every fifteen minutes until eight.',
      'And don’t forget, the expo continues tomorrow at nine A.M., with cooking demonstrations on the main stage all day.',
      'Just show today’s ticket at the box office, and you’ll get half off tomorrow’s admission.',
    ]),
    questions: [
      {
        text: 'Where is the announcement being made?',
        options: [
          'At a sports stadium',
          'At a trade exhibition',
          'At a furniture store',
          'At a cooking school',
        ],
        answer: 1,
        explanationVi:
          '"thank you for visiting the Pacific Home and Garden Expo… exhibition halls" → đang ở một hội chợ triển lãm (B). "cooking demonstrations" chỉ là hoạt động ngày mai, không phải trường dạy nấu ăn (D); (A), (C) không được nhắc.',
        translationVi: 'Thông báo này được phát ở đâu?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'According to the speaker, where can listeners collect items they purchased?',
        options: [
          'At the box office',
          'At the north entrance',
          'On the main stage',
          'Near a loading area',
        ],
        answer: 3,
        explanationVi:
          '"you can pick up your items at the loading area behind Hall C" → khu bốc dỡ hàng (D). "north entrance" là nơi đón xe buýt, "box office" là nơi giảm giá vé, "main stage" là nơi trình diễn nấu ăn.',
        translationVi:
          'Theo người nói, người nghe có thể nhận hàng đã mua ở đâu?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'How can listeners receive a discount?',
        options: [
          'By presenting a ticket from today',
          'By arriving before nine o’clock',
          'By taking a shuttle bus',
          'By purchasing two items',
        ],
        answer: 0,
        explanationVi:
          '"show today’s ticket at the box office… half off tomorrow’s admission" → xuất trình vé hôm nay (A). "nine A.M." là giờ mở cửa, "shuttle bus" miễn phí nhưng không liên quan đến giảm giá.',
        translationVi: 'Người nghe có thể được giảm giá bằng cách nào?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Purchasing',
    transcript: talk('GB', [
      'Hello, Ms. Okafor, this is Daniel Reyes from Bancroft Packaging, returning your call about order number 5512.',
      'Unfortunately, the large recycled shipping boxes you ordered won’t be back in stock until the end of the month.',
      'We do have a box with exactly the same dimensions in plain white cardboard, and it’s actually a little cheaper.',
      'But I know your customers expect the brown, eco-friendly look.',
      'So if you’d rather wait, I can keep the order open and ship it the day the boxes arrive.',
      'Either way, please call me back on 555-0148 by Thursday, so I know whether to set the white boxes aside for you.',
    ]),
    questions: [
      {
        text: 'Why is the speaker calling?',
        options: [
          'To request an overdue payment',
          'To confirm a delivery address',
          'To explain that some items are out of stock',
          'To introduce a new product line',
        ],
        answer: 2,
        explanationVi:
          '"the large recycled shipping boxes you ordered won’t be back in stock until the end of the month" → báo hàng tạm hết (C). Không nhắc thanh toán (A) hay địa chỉ (B); hộp trắng là hàng thay thế sẵn có chứ không phải dòng sản phẩm mới (D).',
        translationVi: 'Tại sao người nói gọi điện?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'Why does the speaker say, "I know your customers expect the brown, eco-friendly look"?',
        options: [
          'To suggest that the listener may not want a substitute',
          'To praise the listener’s marketing strategy',
          'To explain why a price has increased',
          'To recommend a different supplier',
        ],
        answer: 0,
        explanationVi:
          'Ngay trước đó anh ấy đề xuất hộp trắng thay thế, rồi nói "But I know your customers expect the brown… look" và tiếp "if you’d rather wait…" → ngụ ý chị ấy có thể không muốn hàng thay thế (A). Hộp trắng còn rẻ hơn nên (C) sai; không có lời khen (B) hay gợi ý nhà cung cấp khác (D).',
        translationVi:
          'Tại sao người nói nói: "Tôi biết khách hàng của chị mong đợi kiểu dáng màu nâu, thân thiện với môi trường"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What does the speaker ask the listener to do?',
        options: [
          'Visit a warehouse',
          'Send a product sample',
          'Update an order form online',
          'Return his call by a certain day',
        ],
        answer: 3,
        explanationVi:
          '"please call me back… by Thursday" → gọi lại trước một ngày cụ thể (D). Các phương án còn lại không được nhắc.',
        translationVi: 'Người nói yêu cầu người nghe làm gì?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Services',
    transcript: talk('US', [
      'Does your office feel a little gray and lifeless?',
      'Greenleaf Interiors can help. We design, install, and look after indoor plants for businesses of every size.',
      'Our horticulturists visit your workplace every two weeks to water, trim, and replace any plant that isn’t thriving, so your staff never has to lift a finger.',
      'Research shows that greener workspaces can lower stress and improve concentration.',
      'And this month only, new clients who sign a one-year contract get their first three months of service free of charge.',
      'To book a free consultation, visit greenleafinteriors.com and enter the floor area of your office.',
    ]),
    questions: [
      {
        text: 'What service is being advertised?',
        options: [
          'Plant care for workplaces',
          'Office cleaning',
          'Furniture rental',
          'Interior painting',
        ],
        answer: 0,
        explanationVi:
          '"We design, install, and look after indoor plants for businesses" → chăm sóc cây xanh cho nơi làm việc (A). "gray and lifeless" chỉ là lời mở đầu, không phải dịch vụ sơn (D); (B), (C) không được nhắc.',
        translationVi: 'Dịch vụ nào đang được quảng cáo?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'According to the speaker, what do the company’s horticulturists do every two weeks?',
        options: [
          'Send progress reports',
          'Deliver new furniture',
          'Maintain plants at client sites',
          'Lead training sessions',
        ],
        answer: 2,
        explanationVi:
          '"visit your workplace every two weeks to water, trim, and replace any plant" = đến tận nơi chăm sóc cây (C). "maintain" diễn đạt lại "water, trim, replace". Các phương án khác không có trong bài.',
        translationVi:
          'Theo người nói, chuyên viên cây cảnh của công ty làm gì hai tuần một lần?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What is being offered to new clients this month?',
        options: [
          'A free design guide',
          'Several months of free service',
          'A discount on office furniture',
          'Free delivery of supplies',
        ],
        answer: 1,
        explanationVi:
          '"new clients who sign a one-year contract get their first three months of service free" → miễn phí vài tháng dịch vụ (B). Buổi tư vấn miễn phí là "consultation", không phải "design guide" (A).',
        translationVi: 'Tháng này khách hàng mới được ưu đãi gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Transportation',
    transcript: talk('AU', [
      'This is Megan Hall with your seven-thirty traffic update on Radio 94.2.',
      'If you’re heading into the city this morning, expect long delays on the Harlow Bridge, where one lane is closed while crews resurface the road.',
      'That work should be finished by noon, but until then, drivers may want to use the Ferris Road tunnel instead.',
      'Also, a reminder that the city’s annual charity bicycle race takes place this Sunday.',
      'Several streets around Victoria Park will be closed from six A.M. to two P.M., and no parking will be allowed there.',
      'Organizers are encouraging spectators to take the train to Central Station, which is a short walk from the finish line.',
      'I’ll be back with another update right after the business report.',
    ]),
    questions: [
      {
        text: 'What is causing delays on the Harlow Bridge?',
        options: [
          'A traffic accident',
          'Heavy rain',
          'A broken traffic signal',
          'Road repairs',
        ],
        answer: 3,
        explanationVi:
          '"one lane is closed while crews resurface the road" → sửa mặt đường (D). Bài không nhắc tai nạn, mưa hay đèn giao thông.',
        translationVi: 'Điều gì gây ra tình trạng chậm trễ trên cầu Harlow?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What event will take place on Sunday?',
        options: [
          'A music festival',
          'A cycling competition',
          'A marathon',
          'A park opening',
        ],
        answer: 1,
        explanationVi:
          '"the city’s annual charity bicycle race takes place this Sunday" → cuộc đua xe đạp (B). "marathon" (C) là bẫy vì cũng là cuộc đua nhưng là chạy bộ; Victoria Park chỉ là khu vực cấm đường (D).',
        translationVi: 'Sự kiện nào sẽ diễn ra vào Chủ nhật?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What are spectators encouraged to do?',
        options: [
          'Park near Victoria Park',
          'Arrive before six A.M.',
          'Use public transportation',
          'Buy tickets in advance',
        ],
        answer: 2,
        explanationVi:
          '"encouraging spectators to take the train to Central Station" → dùng phương tiện công cộng (C). (A) trái với "no parking will be allowed"; "six A.M." là giờ cấm đường (B).',
        translationVi: 'Khán giả được khuyến khích làm gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Tourism',
    transcript: talk('GB', [
      'Welcome to the Tropical House, the largest of the glasshouses here at Westmoor Botanical Gardens.',
      'I’m Priya, and I’ll be showing you around the collection for the next forty minutes.',
      'Now, the air in here takes a few minutes to get used to.',
      'We keep it warm and humid all year round for these rain forest plants, so you may want to leave your jackets on the rack by the door.',
      'Our first stop is the water lily pond, where some of the leaves are wide enough to hold a small child, though please don’t test that.',
      'You’re welcome to take photos anywhere, but I’ll ask you to switch off your flash in the orchid room, as strong bursts of light can damage the blooms.',
      'At the end of the tour, we’ll pass through the shop, where seeds from many of these plants are on sale.',
    ]),
    questions: [
      {
        text: 'Where most likely are the listeners?',
        options: [
          'In a flower shop',
          'At a public garden',
          'On a farm',
          'In a science laboratory',
        ],
        answer: 1,
        explanationVi:
          '"the glasshouses here at Westmoor Botanical Gardens" → vườn thực vật công cộng (B). Có nhắc "shop" ở cuối tour nhưng đó chỉ là cửa hàng lưu niệm, không phải nơi người nghe đang đứng (A); (C), (D) không có căn cứ.',
        translationVi: 'Người nghe nhiều khả năng đang ở đâu?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'Why does the speaker say, "the air in here takes a few minutes to get used to"?',
        options: [
          'To prepare listeners for the conditions inside the building',
          'To apologize for a broken air-conditioning system',
          'To explain why the tour will be shorter than usual',
          'To ask listeners to wait outside for a moment',
        ],
        answer: 0,
        explanationVi:
          'Câu ngay sau: "We keep it warm and humid all year round… leave your jackets" → cô ấy báo trước cho khách về không khí nóng ẩm bên trong (A). Độ ẩm là cố ý, không phải máy lạnh hỏng (B); tour vẫn kéo dài 40 phút (C); không ai bị yêu cầu chờ bên ngoài (D).',
        translationVi:
          'Tại sao người nói nói: "không khí trong này cần vài phút để làm quen"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What are listeners asked to do in the orchid room?',
        options: [
          'Stay behind a rope',
          'Speak quietly',
          'Avoid touching the plants',
          'Avoid using flash photography',
        ],
        answer: 3,
        explanationVi:
          '"switch off your flash in the orchid room" → không chụp ảnh dùng đèn flash (D). Chụp ảnh vẫn được phép; các yêu cầu (A), (B), (C) không được nhắc.',
        translationVi: 'Người nghe được yêu cầu làm gì trong phòng hoa lan?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Logistics',
    transcript: talk('US', [
      'Before we wrap up, I’d like to say a few words about our shipping costs.',
      'As you saw in the quarterly report, what we pay our delivery carrier went up almost eighteen percent this year, mostly because of new fuel surcharges.',
      'So management has decided to ask at least three other carriers for bids before our current contract renews on July first.',
      'Tomás has agreed to prepare the request documents.',
      'Now, carriers usually take about a month to put together a proper bid. And we have three weeks.',
      'That means I need everyone on the operations team to send Tomás your monthly shipping volumes by this Friday at the latest.',
      'If you have any questions, come and see me after the meeting.',
    ]),
    questions: [
      {
        text: 'What is the speaker mainly discussing?',
        options: [
          'A new product launch',
          'A change in staff schedules',
          'Rising delivery expenses',
          'A warehouse relocation',
        ],
        answer: 2,
        explanationVi:
          '"a few words about our shipping costs… went up almost eighteen percent" → chi phí giao hàng tăng (C). Các phương án khác không được nhắc.',
        translationVi: 'Người nói chủ yếu đang bàn về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the speaker imply when she says, "And we have three weeks"?',
        options: [
          'The team has more time than it needs.',
          'A contract has been extended.',
          'Tomás will be away for a while.',
          'The schedule is tighter than usual.',
        ],
        answer: 3,
        explanationVi:
          'Các hãng vận chuyển thường cần "about a month" để làm hồ sơ thầu, nhưng chỉ còn ba tuần → thời gian gấp hơn bình thường (D), vì vậy cô ấy yêu cầu gửi số liệu ngay trong tuần. (A) ngược nghĩa; hợp đồng sẽ gia hạn vào 1/7 chứ chưa được gia hạn (B); không nói Tomás vắng mặt (C).',
        translationVi:
          'Người nói ngụ ý điều gì khi nói: "Và chúng ta chỉ có ba tuần"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What does the speaker ask the operations team to do?',
        options: [
          'Provide some shipping data',
          'Contact several carriers',
          'Review a contract',
          'Reduce fuel use',
        ],
        answer: 0,
        explanationVi:
          '"send Tomás your monthly shipping volumes" = cung cấp số liệu vận chuyển (A). Việc liên hệ các hãng là của ban quản lý và Tomás (B là bẫy); (C), (D) không được yêu cầu.',
        translationVi: 'Người nói yêu cầu nhóm vận hành làm gì?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Events',
    transcript: talk('CA', [
      'Good morning, and welcome to day two of the Northern Retail Leaders Forum.',
      'It’s my pleasure to introduce our keynote speaker, Dr. Hannah Lindqvist.',
      'Dr. Lindqvist spent twelve years planning store layouts for major supermarket chains before founding her own consulting firm, ShelfSense.',
      'Her research on how shoppers move through a store has been featured in dozens of trade magazines, and her new book, The Second Aisle, comes out next month.',
      'This morning, she’ll share the results of a study covering more than two hundred stores across the country.',
      'After her talk, Dr. Lindqvist will be signing advance copies of the book in the lobby, so please stop by.',
    ]),
    questions: [
      {
        text: 'Who most likely are the listeners?',
        options: [
          'Retail industry professionals',
          'University students',
          'Magazine editors',
          'Building architects',
        ],
        answer: 0,
        explanationVi:
          '"welcome to day two of the Northern Retail Leaders Forum" → người làm trong ngành bán lẻ (A). "trade magazines" chỉ là nơi đăng nghiên cứu (C); "store layouts" không có nghĩa người nghe là kiến trúc sư (D).',
        translationVi: 'Người nghe nhiều khả năng là ai?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'What is Dr. Lindqvist’s area of expertise?',
        options: [
          'Online advertising',
          'Store design and shopper behavior',
          'Supply chain software',
          'Employee training',
        ],
        answer: 1,
        explanationVi:
          '"planning store layouts" + "research on how shoppers move through a store" → thiết kế cửa hàng và hành vi người mua (B). Các lĩnh vực còn lại không được nhắc.',
        translationVi: 'Lĩnh vực chuyên môn của Tiến sĩ Lindqvist là gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What will happen after the talk?',
        options: [
          'Lunch will be served.',
          'A panel discussion will begin.',
          'Copies of a book will be signed.',
          'A survey will be handed out.',
        ],
        answer: 2,
        explanationVi:
          '"After her talk, Dr. Lindqvist will be signing advance copies of the book in the lobby" → ký tặng sách (C). Không nhắc bữa trưa, thảo luận nhóm hay khảo sát.',
        translationVi: 'Điều gì sẽ diễn ra sau bài nói?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Training',
    transcript: talk('GB', [
      'Welcome back from the break, everyone. This morning, we looked at how to write a clear project proposal.',
      'This afternoon, we’re moving on to presenting that proposal to the people who control the budget.',
      'On your registration forms, many of you said this is the part you find most stressful. Well, you’re in good company.',
      'Here’s the key idea: decision-makers rarely remember detailed figures, but they almost always remember one strong example.',
      'So, rather than opening with a spreadsheet, open with a short story about a real customer or a real problem.',
      'In a moment, I’ll divide you into pairs. Each of you will have three minutes to pitch your proposal, and your partner will note down the one thing they remember most.',
    ]),
    questions: [
      {
        text: 'What will the afternoon session focus on?',
        options: [
          'Managing a department budget',
          'Writing financial reports',
          'Recruiting new team members',
          'Presenting proposals effectively',
        ],
        answer: 3,
        explanationVi:
          '"This afternoon, we’re moving on to presenting that proposal to the people who control the budget" → trình bày đề xuất (D). Viết đề xuất là nội dung buổi sáng; "budget" chỉ là người có quyền chi tiền, không phải quản lý ngân sách (A).',
        translationVi: 'Buổi chiều sẽ tập trung vào nội dung gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'Why does the speaker say, "you’re in good company"?',
        options: [
          'To welcome some new participants',
          'To praise the quality of the proposals',
          'To reassure listeners that their concern is common',
          'To introduce a guest speaker',
        ],
        answer: 2,
        explanationVi:
          'Ngay trước đó: "many of you said this is the part you find most stressful" → "you’re in good company" = nhiều người cũng thấy vậy, trấn an rằng nỗi lo này phổ biến (C). Không có người mới (A), khách mời (D) hay lời khen đề xuất (B).',
        translationVi: 'Tại sao người nói nói: "các bạn không hề đơn độc đâu"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What will the listeners most likely do next?',
        options: [
          'Fill out a registration form',
          'Practice with a partner',
          'Review a spreadsheet',
          'Take a short break',
        ],
        answer: 1,
        explanationVi:
          '"I’ll divide you into pairs. Each of you will have three minutes to pitch" → thực hành theo cặp (B). Mẫu đăng ký đã điền từ trước (A); bảng tính là điều nên tránh khi mở đầu (C); vừa nghỉ giải lao xong (D).',
        translationVi: 'Người nghe nhiều khả năng sẽ làm gì tiếp theo?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Business news',
    transcript: talk('US', [
      'In business news, Ridgeway Coffee Company announced yesterday that it has agreed to buy Hearth & Grain, the family-owned bakery chain with fourteen locations across the state.',
      'The deal, valued at around forty million dollars, is expected to be completed by early autumn.',
      'Ridgeway’s chief executive, Marcus Bell, said the company had been looking for a way to serve fresh food in its cafés without building bakeries of its own.',
      'Hearth & Grain’s founders, Lucia and Tom Ferrante, will stay on to run the new bakery division for at least two years.',
      'Customers shouldn’t notice much change at first: the bakeries will keep both their name and their menus.',
      'However, Ridgeway plans to start selling Hearth & Grain bread in its own cafés before the end of the year.',
      'Stay with us for the weather, coming up next.',
    ]),
    questions: [
      {
        text: 'What is the news report mainly about?',
        options: [
          'A company relocating its headquarters',
          'A business acquisition',
          'The opening of a new café',
          'A change in company leadership',
        ],
        answer: 1,
        explanationVi:
          '"Ridgeway Coffee Company… has agreed to buy Hearth & Grain" → thương vụ mua lại doanh nghiệp (B). Nhà sáng lập vẫn ở lại điều hành nên (D) sai; (A), (C) không được nhắc.',
        translationVi: 'Bản tin chủ yếu nói về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'According to the report, why did Ridgeway make the deal?',
        options: [
          'To add fresh baked goods to its cafés',
          'To lower the price of its coffee',
          'To expand into another country',
          'To hire experienced managers',
        ],
        answer: 0,
        explanationVi:
          '"looking for a way to serve fresh food in its cafés without building bakeries of its own" → muốn có đồ nướng tươi cho các quán cà phê (A). Việc nhà sáng lập ở lại là kết quả của thương vụ, không phải lý do (D là bẫy); (B), (C) không được nhắc.',
        translationVi:
          'Theo bản tin, tại sao Ridgeway thực hiện thương vụ này?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What will happen before the end of the year?',
        options: [
          'The bakeries will change their name.',
          'The founders will retire.',
          'One company’s products will be sold at the other’s locations.',
          'New menus will be introduced at the bakeries.',
        ],
        answer: 2,
        explanationVi:
          '"Ridgeway plans to start selling Hearth & Grain bread in its own cafés before the end of the year" → sản phẩm của công ty này được bán tại cửa hàng của công ty kia (C). Tiệm bánh giữ nguyên tên và thực đơn nên (A), (D) sai; nhà sáng lập ở lại ít nhất hai năm (B).',
        translationVi: 'Điều gì sẽ xảy ra trước cuối năm?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Health',
    transcript: talk('AU', [
      'Thank you for calling Larkspur Pharmacy on King Street.',
      'Our regular hours are eight A.M. to eight P.M., Monday through Saturday, and we are closed on Sundays.',
      'Please note that this coming Monday is a public holiday, so the pharmacy will open late, at twelve noon.',
      'To order a prescription refill, press one. To speak with a pharmacist, press two.',
      'You can also request refills at any time through our mobile app, and we’ll send you a text message when your order is ready.',
    ]),
    questions: [
      {
        text: 'What kind of business recorded the message?',
        options: [
          'A medical clinic',
          'A grocery store',
          'A pharmacy',
          'A phone company',
        ],
        answer: 2,
        explanationVi:
          '"Thank you for calling Larkspur Pharmacy" → hiệu thuốc (C). "pharmacist", "prescription" cũng xác nhận điều này; (A) là bẫy vì cùng lĩnh vực y tế.',
        translationVi: 'Doanh nghiệp nào đã ghi âm tin nhắn này?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'Why will the business open late on Monday?',
        options: [
          'Staff will attend a training session.',
          'The store is being renovated.',
          'A delivery is expected.',
          'It is a public holiday.',
        ],
        answer: 3,
        explanationVi:
          '"this coming Monday is a public holiday, so the pharmacy will open late" → vì ngày lễ (D). Các lý do khác không được nhắc.',
        translationVi: 'Tại sao thứ Hai cửa hàng sẽ mở cửa muộn?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'According to the message, what can listeners do with a mobile app?',
        options: [
          'Request prescription refills',
          'Book a doctor’s appointment',
          'Check store hours',
          'Pay their bills',
        ],
        answer: 0,
        explanationVi:
          '"You can also request refills at any time through our mobile app" → đặt lấy thêm thuốc theo đơn (A). Ứng dụng gửi tin nhắn khi thuốc sẵn sàng, không đặt lịch khám (B) hay thanh toán (D).',
        translationVi:
          'Theo tin nhắn, người nghe có thể làm gì bằng ứng dụng di động?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
]
