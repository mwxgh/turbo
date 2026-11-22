/** Full Test 01, Part 7 Single: written for Lingo (not from ETS). */
export const P7_SINGLE: object[] = [
  {
    difficulty: 'EASY',
    topic: 'Office',
    passage:
      'Rosa Delgado [10:31 A.M.]\nHi Tomasz, the photographer for the staff headshots just called. She’s running about 30 minutes behind.\n\nTomasz Wierzbicki [10:33 A.M.]\nThat’s a problem. The fourth-floor conference room is booked for the budget review at 11:30.\n\nRosa Delgado [10:35 A.M.]\nCould we move the photo session somewhere else?\n\nTomasz Wierzbicki [10:38 A.M.]\nThe lobby lounge has good natural light, but it gets noisy around lunchtime. I could check whether the training room on the second floor is free.\n\nRosa Delgado [10:40 A.M.]\nPlease do. About 25 people have signed up, so we need at least an hour and a half.\n\nTomasz Wierzbicki [10:42 A.M.]\nIt’s open all afternoon.\n\nRosa Delgado [10:43 A.M.]\nPerfect. I’ll e-mail everyone the new location.',
    questions: [
      {
        text: 'Why did Ms. Delgado contact Mr. Wierzbicki?',
        options: [
          'To report that a photographer has been delayed',
          'To ask him to reserve a conference room',
          'To cancel a budget review',
          'To request a list of participants',
        ],
        answer: 0,
        explanationVi:
          '"the photographer… just called. She’s running about 30 minutes behind" → thợ ảnh đến muộn (A). Phòng họp đã có người đặt cho buổi họp ngân sách, không ai yêu cầu đặt hay huỷ, nên (B), (C) sai.',
        translationVi: 'Tại sao cô Delgado liên lạc với anh Wierzbicki?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'At 10:42 A.M., what does Mr. Wierzbicki most likely mean when he writes, "It’s open all afternoon"?',
        options: [
          'The lobby lounge will be quiet later in the day.',
          'The budget review has been postponed.',
          'The training room can be used for the photo session.',
          'He is available to help with the photographs.',
        ],
        answer: 2,
        explanationVi:
          'Anh vừa nói sẽ kiểm tra "whether the training room on the second floor is free", cô Delgado đáp "Please do" → "It’s open all afternoon" nghĩa là phòng đào tạo trống, dùng được cho buổi chụp ảnh (C). Sảnh thì "gets noisy around lunchtime", nên (A) sai.',
        translationVi:
          'Lúc 10:42 sáng, anh Wierzbicki nhiều khả năng có ý gì khi viết "It’s open all afternoon"?',
        skillTags: ['comprehension.speaker-intent'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Health',
    passage:
      'MAPLEWOOD COMMUNITY PHARMACY\nNotice to Customers\n\nFrom Monday, 9 March, prescriptions will be collected at the new counter beside the main entrance instead of at the back of the store. The move will shorten waiting times by separating prescription pick-up from in-store health consultations, which will continue in the private room at the rear.\n\nCustomers who prefer not to wait may now order refills through our text-message service. Send your prescription number to 0161 555 0192, and we will reply when your order is ready, usually within four hours.\n\nOur opening hours remain 8:00 A.M. to 7:00 P.M., Monday to Saturday.',
    questions: [
      {
        text: 'What is the purpose of the notice?',
        options: [
          'To introduce new opening hours',
          'To advertise free health consultations',
          'To explain why a branch is closing',
          'To announce where prescriptions will be picked up',
        ],
        answer: 3,
        explanationVi:
          '"prescriptions will be collected at the new counter beside the main entrance instead of at the back of the store" → thông báo nơi nhận thuốc mới (D). Giờ mở cửa "remain" (giữ nguyên) nên (A) sai; tư vấn sức khoẻ chỉ tiếp tục như cũ, không phải quảng cáo miễn phí (B).',
        translationVi: 'Mục đích của thông báo là gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'According to the notice, what can customers do by text message?',
        options: [
          'Book a health consultation',
          'Request a prescription refill',
          'Ask about opening hours',
          'Change their pick-up location',
        ],
        answer: 1,
        explanationVi:
          '"Customers… may now order refills through our text-message service" → đặt mua lại thuốc theo đơn qua tin nhắn (B). Thông báo không nói có thể đặt lịch tư vấn hay đổi nơi nhận bằng tin nhắn.',
        translationVi:
          'Theo thông báo, khách hàng có thể làm gì bằng tin nhắn văn bản?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Events',
    passage:
      'HOLLIS PARTY & EVENT RENTALS\n\nPlanning a company picnic, a product launch, or an outdoor ceremony? Hollis has everything you need: tents in six sizes, folding tables and chairs, portable stages, lighting, and sound systems.\n\n• Free delivery and setup for orders over $800 within Dane County\n• Same-week bookings accepted, subject to availability\n• Weather guarantee: if an outdoor event is called off because of rain, receive a full credit toward a future rental\n\nBusiness customers who open an account before June 30 will receive 10 percent off their first three orders. Visit our showroom at 47 Quarry Lane or call 608-555-0147 to speak with one of our event planners.',
    questions: [
      {
        text: 'What is indicated about Hollis Party & Event Rentals?',
        options: [
          'It sells used event equipment.',
          'It delivers free of charge to any location.',
          'It gives credit when rain cancels an outdoor event.',
          'It requires bookings at least a month in advance.',
        ],
        answer: 2,
        explanationVi:
          '"if an outdoor event is called off because of rain, receive a full credit toward a future rental" → (C). Giao hàng miễn phí chỉ cho đơn trên $800 trong Dane County nên (B) sai; công ty nhận cả "Same-week bookings" nên (D) sai.',
        translationVi: 'Điều gì được nêu về Hollis Party & Event Rentals?',
        skillTags: ['comprehension.not-true'],
      },
      {
        text: 'How can business customers receive a discount?',
        options: [
          'By placing an order worth more than $800',
          'By visiting the showroom in person',
          'By booking during the week of the event',
          'By opening an account before a deadline',
        ],
        answer: 3,
        explanationVi:
          '"Business customers who open an account before June 30 will receive 10 percent off" → mở tài khoản trước một hạn chót (D). Đơn trên $800 chỉ được giao và lắp đặt miễn phí, không phải giảm giá (A).',
        translationVi: 'Khách hàng doanh nghiệp được giảm giá bằng cách nào?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Purchasing',
    passage:
      'BRIARWOOD GROUNDS MAINTENANCE\n2210 Fenwick Road, Columbus, OH 43215\n\nINVOICE #BG-40718\nDate: May 31\nBill to: Facilities Office, Larchmont Medical Plaza\nService period: May 1–31\n\nWeekly lawn mowing and edging (4 visits) ........ $640.00\nSpring flower bed planting (materials included) ........ $1,180.00\nIrrigation repair, north parking lot ........ $215.00\nLess: loyalty discount (5% of lawn service) ........ –$32.00\n\nTOTAL DUE: $2,003.00\nPayment due: June 30\n\nNote: The irrigation repair was carried out on May 19 at the request of Mr. Okafor after a leak was reported. Because a replacement valve had to be ordered, a second visit is scheduled for June 4 and will appear on next month’s invoice. Pay online at briarwoodgrounds.com/pay or by check made out to Briarwood Grounds Maintenance.',
    questions: [
      {
        text: 'What is suggested about the irrigation repair?',
        options: [
          'It was covered by the loyalty discount.',
          'It requires further work.',
          'It was done near the main entrance.',
          'It was requested by Briarwood staff.',
        ],
        answer: 1,
        explanationVi:
          '"a replacement valve had to be ordered, a second visit is scheduled for June 4" → việc sửa chữa chưa xong, cần làm thêm (B). Giảm giá chỉ áp dụng cho "lawn service" (A sai); vị trí là "north parking lot" (C sai); người yêu cầu là Mr. Okafor của khách hàng (D sai).',
        translationVi: 'Điều gì được ngụ ý về việc sửa hệ thống tưới?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'What is NOT included on the invoice?',
        options: [
          'The cost of plants',
          'A reduction in price',
          'A charge for the June 4 visit',
          'Information about how to pay',
        ],
        answer: 2,
        explanationVi:
          'Chuyến ngày 4/6 "will appear on next month’s invoice" → chưa có trong hoá đơn này (C). Hoá đơn có "flower bed planting (materials included)" (A), "loyalty discount" (B) và cách thanh toán "Pay online… or by check" (D).',
        translationVi: 'Điều gì KHÔNG có trong hoá đơn?',
        skillTags: ['comprehension.not-true'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'HR',
    passage:
      'JOB OPENING: Regional Installation Coordinator\nSolvane Energy – Tucson office\n\nSolvane Energy designs and installs rooftop solar systems for homes and small businesses across southern Arizona. Due to rising demand, we are seeking a coordinator to schedule installation crews, order equipment, and keep customers informed from contract signing to final inspection.\n\nRequirements:\n• At least two years of experience in project coordination, preferably in construction or a related trade\n• Strong written and spoken communication skills; knowledge of Spanish is a plus\n• Familiarity with scheduling software (training on our own system will be provided)\n• A valid driver’s license; occasional visits to job sites are required\n\nThe position is full-time, with a hybrid schedule after a three-month training period. Solvane offers health insurance, a company vehicle for site visits, and an annual bonus based on customer satisfaction scores.\n\nTo apply, send a résumé and a short description of a project you have coordinated to careers@solvane-energy.com by August 15. Interviews will take place in late August.',
    questions: [
      {
        text: 'What is one responsibility of the position?',
        options: [
          'Designing rooftop solar systems',
          'Carrying out final inspections',
          'Training staff on new software',
          'Scheduling installation teams',
        ],
        answer: 3,
        explanationVi:
          '"seeking a coordinator to schedule installation crews" → lên lịch cho các đội lắp đặt (D, "crews" = "teams"). Công ty thiết kế hệ thống nhưng đó không phải việc của vị trí này (A); người điều phối chỉ báo tin cho khách "to final inspection", không tự kiểm tra (B).',
        translationVi: 'Một nhiệm vụ của vị trí này là gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What is NOT listed as a requirement for the position?',
        options: [
          'Fluency in Spanish',
          'Experience coordinating projects',
          'A valid driver’s license',
          'Good communication skills',
        ],
        answer: 0,
        explanationVi:
          'Tiếng Tây Ban Nha chỉ là điểm cộng: "knowledge of Spanish is a plus" → không phải yêu cầu bắt buộc (A). Kinh nghiệm điều phối (B), bằng lái (C), kỹ năng giao tiếp (D) đều nằm trong "Requirements".',
        translationVi: 'Điều gì KHÔNG được liệt kê là yêu cầu của vị trí?',
        skillTags: ['comprehension.not-true'],
      },
      {
        text: 'What are applicants asked to submit?',
        options: [
          'A list of references',
          'An example of their previous work',
          'A copy of their driver’s license',
          'A record of customer satisfaction scores',
        ],
        answer: 1,
        explanationVi:
          '"send a résumé and a short description of a project you have coordinated" → mô tả một dự án đã làm = ví dụ công việc trước đây (B). Bằng lái là yêu cầu nhưng không phải nộp bản sao (C); điểm hài lòng khách hàng dùng để tính thưởng (D).',
        translationVi: 'Ứng viên được yêu cầu nộp gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Manufacturing',
    passage:
      'From: Ingrid Solberg <i.solberg@nordpak.com>\nTo: Marcus Adeyemi <m.adeyemi@crestwoodfoods.com>\nDate: 3 February\nSubject: Contract pricing for Q2\n\nDear Mr. Adeyemi,\n\nThank you for renewing your order for compostable meal trays for the second quarter. Before we confirm the delivery schedule, I would like to make you aware of a change that affects your account.\n\nAs you may have read, the cost of the plant fibre we use has risen sharply since November because of a poor sugarcane harvest. Most of our customers will see a 7 percent increase on their next contract. However, since Crestwood has committed to a full year of orders, we are prepared to hold your price at the current rate through June, provided that the order is confirmed by 20 February.\n\nFrom July, we expect fibre costs to settle, and we will review pricing for all long-term clients at that point. If the market improves, any increase will be smaller than the one described above, or may not be necessary at all.\n\nI have also attached a revised delivery calendar that moves your April shipment forward by one week, as your purchasing team requested. Please let me know whether it works for you.\n\nKind regards,\nIngrid Solberg\nAccount Manager, Nordpak Packaging',
    questions: [
      {
        text: 'Why did Ms. Solberg write the e-mail?',
        options: [
          'To confirm that an order has been shipped',
          'To inform a client about a pricing matter',
          'To request payment of an overdue invoice',
          'To introduce a new line of packaging',
        ],
        answer: 1,
        explanationVi:
          'Đoạn 1: "I would like to make you aware of a change that affects your account", đoạn 2–3 nói về chi phí nguyên liệu tăng và giá hợp đồng → báo cho khách về vấn đề giá (B). Đơn hàng mới được gia hạn, lịch giao chưa xác nhận nên (A) sai.',
        translationVi: 'Tại sao cô Solberg viết e-mail này?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What is suggested about Crestwood Foods?',
        options: [
          'It recently changed its purchasing team.',
          'It orders more trays than most Nordpak customers.',
          'It can keep its current price by meeting a deadline.',
          'It plans to stop ordering trays in July.',
        ],
        answer: 2,
        explanationVi:
          '"we are prepared to hold your price at the current rate through June, provided that the order is confirmed by 20 February" → giữ giá cũ nếu xác nhận trước hạn (C). Lý do được ưu đãi là cam kết "a full year of orders", không phải đặt nhiều hơn khách khác (B); "full year" cũng cho thấy họ không dừng vào tháng 7 (D).',
        translationVi: 'Điều gì được ngụ ý về Crestwood Foods?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'The word "settle" in paragraph 3, line 1, is closest in meaning to',
        options: ['decide', 'pay', 'relocate', 'stabilize'],
        answer: 3,
        explanationVi:
          '"we expect fibre costs to settle" đối lập với "risen sharply" ở đoạn trước → chi phí ổn định lại = "stabilize" (D). "settle" còn nghĩa "thanh toán" (pay) hay "định cư" (relocate) nhưng không hợp với chủ ngữ "costs".',
        translationVi: 'Từ "settle" ở đoạn 3, dòng 1 có nghĩa gần nhất với',
        skillTags: ['comprehension.vocab-in-context'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Finance',
    passage:
      'Halvorsen Mutual Insurance\n18 Corbett Street, Hartford, CT 06103\n\nOctober 9\n\nMs. Lucia Ferreira\nFerreira Bakery\n512 Main Street\nNew Britain, CT 06051\n\nRe: Claim No. 7731-K\n\nDear Ms. Ferreira,\n\nWe have received your claim for the water damage that occurred at your bakery on October 3. We are sorry to hear about the burst pipe and the disruption it has caused to your business.\n\nA claims adjuster, Mr. Daniel Whitcombe, will visit your premises on October 14 between 9:00 A.M. and noon to inspect the damage. Please do not discard any damaged equipment or stock before his visit, as he will need to see these items in order to assess their value. If you have already removed items for health reasons, photographs taken before their removal will be accepted instead.\n\nYour policy also includes business interruption coverage. This means that, while repairs are under way, we will reimburse lost income for up to 60 days, based on your average monthly sales over the past year. To process this part of your claim, please send us copies of your sales records for the last twelve months.\n\nShould you have any questions before the inspection, contact me directly at 860-555-0133.\n\nSincerely,\nAmara Lindqvist\nClaims Representative',
    questions: [
      {
        text: 'What is the main purpose of the letter?',
        options: [
          'To explain the next steps in handling a claim',
          'To offer a business a new insurance policy',
          'To report the findings of an inspection',
          'To reject a request for compensation',
        ],
        answer: 0,
        explanationVi:
          'Thư xác nhận "We have received your claim", rồi nêu lịch thẩm định viên đến và giấy tờ cần gửi → giải thích các bước xử lý tiếp theo (A). Cuộc kiểm tra chưa diễn ra (ngày 14/10), nên chưa có kết quả (C); yêu cầu bồi thường không bị từ chối (D).',
        translationVi: 'Mục đích chính của bức thư là gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What is Ms. Ferreira asked to do before October 14?',
        options: [
          'Send photographs of all of her equipment',
          'Have the burst pipe repaired',
          'Keep damaged items available for inspection',
          'Call Mr. Whitcombe to confirm a time',
        ],
        answer: 2,
        explanationVi:
          '"Please do not discard any damaged equipment or stock before his visit" → giữ lại đồ hư hỏng để kiểm tra (C). Ảnh chỉ cần cho đồ đã bỏ đi vì lý do vệ sinh, không phải tất cả thiết bị (A); số điện thoại để gọi là của cô Lindqvist, không phải ông Whitcombe (D).',
        translationVi:
          'Cô Ferreira được yêu cầu làm gì trước ngày 14 tháng 10?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'According to the letter, how will the payment for lost income be calculated?',
        options: [
          'From the value of the damaged equipment',
          'From the bakery’s sales in the previous year',
          'From an estimate provided by a repair company',
          'From the number of days the bakery was open',
        ],
        answer: 1,
        explanationVi:
          '"based on your average monthly sales over the past year" và yêu cầu gửi "sales records for the last twelve months" → dựa trên doanh số năm trước (B). Giá trị thiết bị là phần thẩm định viên đánh giá, không dùng để tính thu nhập bị mất (A); "60 days" là giới hạn thời gian bồi thường, không phải cách tính (D).',
        translationVi:
          'Theo bức thư, khoản bồi thường thu nhập bị mất sẽ được tính như thế nào?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Marketing',
    passage:
      'Kenji Morita [10:31 A.M.]: Morning, everyone. I just heard from Velora Print — the boxes for the Aurelle wireless earbuds won’t ship until March 18. That’s a week later than we planned.\nPriya Chandran [10:33 A.M.]: That’s cutting it close. The launch event is on March 22, and the retailers expect stock on their shelves the same day.\nKenji Morita [10:34 A.M.]: Exactly. One of their presses broke down, and the replacement part is coming from overseas.\nOwen Gallagher [10:36 A.M.]: Could we split the order? Velora could print the 5,000 boxes for our retail partners first and finish the rest afterward.\nPriya Chandran [10:38 A.M.]: Online orders don’t start shipping until April anyway, so that could work.\nKenji Morita [10:40 A.M.]: I asked about that already. They said they could deliver the retail boxes by March 15 if we approve the final artwork today.\nSofia Brandt [10:41 A.M.]: Is the artwork finished? I thought the legal team still wanted to change the warranty wording on the back panel.\nOwen Gallagher [10:42 A.M.]: I’m on it.\nSofia Brandt [10:43 A.M.]: Thanks. The warehouse needs at least four days to pack and send the retail shipments, so March 15 really is our latest possible date.\nKenji Morita [10:45 A.M.]: Then I’ll tell Velora we accept the split order as soon as Owen confirms the text with legal.',
    questions: [
      {
        text: 'What problem are the writers discussing?',
        options: [
          'A supplier will deliver packaging later than expected.',
          'A launch event has been moved to a new date.',
          'Some retailers have reduced the size of their orders.',
          'A product has failed a legal review.',
        ],
        answer: 0,
        explanationVi:
          '"the boxes for the Aurelle wireless earbuds won’t ship until March 18. That’s a week later than we planned" → nhà cung cấp giao bao bì trễ (A, "boxes" = "packaging"). Ngày ra mắt vẫn là 22/3 (B sai); bộ phận pháp lý chỉ muốn sửa câu chữ bảo hành, sản phẩm không bị bác (D sai).',
        translationVi: 'Những người viết đang thảo luận vấn đề gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What is indicated about online orders of the earbuds?',
        options: [
          'They require a different box design.',
          'They will be printed before the retail boxes.',
          'They have been delayed because of a broken press.',
          'They will not be shipped until after the launch.',
        ],
        answer: 3,
        explanationVi:
          '"Online orders don’t start shipping until April anyway" → sau ngày ra mắt 22/3 (D). Theo đề xuất, hộp cho đại lý bán lẻ được in trước, nên (B) ngược lại; máy in hỏng ảnh hưởng cả đơn, không riêng đơn online (C).',
        translationVi:
          'Điều gì được nêu về các đơn đặt hàng tai nghe trực tuyến?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'At 10:42 A.M., what does Mr. Gallagher most likely mean when he writes, "I’m on it"?',
        options: [
          'He will get the warranty text approved.',
          'He will contact the warehouse about packing times.',
          'He has already finished the final artwork.',
          'He will find another printing company.',
        ],
        answer: 0,
        explanationVi:
          'Câu trả lời ngay sau lo ngại của cô Brandt: "the legal team still wanted to change the warranty wording" → anh sẽ lo cho phần chữ bảo hành được duyệt (A). Tin nhắn 10:45 xác nhận: "as soon as Owen confirms the text with legal". (C) sai vì thiết kế chưa xong.',
        translationVi:
          'Lúc 10:42 sáng, anh Gallagher nhiều khả năng có ý gì khi viết "I’m on it"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What will Mr. Morita most likely do next?',
        options: [
          'Order a replacement part for a press',
          'Change the date of the launch event',
          'Inform a supplier that a proposal is accepted',
          'Ask the warehouse to work extra hours',
        ],
        answer: 2,
        explanationVi:
          '"I’ll tell Velora we accept the split order as soon as Owen confirms the text" → báo cho nhà cung cấp (Velora) rằng đề xuất chia đơn được chấp nhận (C). Linh kiện là việc của Velora (A); không ai đề nghị dời ngày ra mắt (B).',
        translationVi: 'Anh Morita nhiều khả năng sẽ làm gì tiếp theo?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'HR',
    passage:
      'MEMO\nTo: All department managers\nFrom: Celeste Oyelaran, Head of People Development\nDate: April 2\nSubject: Peer mentoring pilot\n\nOver the past year, exit interviews have shown that many employees who left within their first six months felt they lacked support while learning our internal procedures. To address this, we will pilot a peer mentoring program in the Customer Support and Finance departments beginning May 6.\n\nUnder the program, each new hire will be paired with an experienced colleague from a different team. Mentors and new hires will meet for one hour every two weeks during the new hire’s first four months. Because these meetings take place during working hours, managers are asked to take them into account when assigning tasks to participants.\n\nWe are looking for volunteers who have been with the company for at least two years to serve as mentors. Mentors will attend a half-day orientation on April 25, and their contribution will be recognized in their annual performance reviews. Please share this information with your teams and forward the names of interested staff to me by April 18.\n\nIf the pilot is successful, we plan to extend the program to all departments in the autumn.',
    questions: [
      {
        text: 'Why was the memo sent?',
        options: [
          'To announce changes to performance reviews',
          'To introduce a trial program for new employees',
          'To report the results of a staff survey',
          'To invite managers to a training session',
        ],
        answer: 1,
        explanationVi:
          '"we will pilot a peer mentoring program" → giới thiệu chương trình thử nghiệm kèm cặp nhân viên mới (B, "pilot" = "trial"). Đánh giá hiệu suất chỉ được nhắc như phần ghi nhận cho người hướng dẫn (A); buổi định hướng dành cho mentor, không phải quản lý (D).',
        translationVi: 'Tại sao bản ghi nhớ được gửi đi?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What led to the creation of the program?',
        options: [
          'Feedback from employees who left the company',
          'Complaints from the Customer Support department',
          'A rise in the number of new hires',
          'A change in internal procedures',
        ],
        answer: 0,
        explanationVi:
          '"exit interviews have shown that many employees who left… felt they lacked support… To address this, we will pilot…" → ý kiến của nhân viên đã nghỉ việc (A, "exit interviews"). Phòng Customer Support chỉ là nơi thí điểm, không phải nơi phàn nàn (B).',
        translationVi: 'Điều gì dẫn đến việc lập ra chương trình?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What is indicated about the mentors?',
        options: [
          'They will be chosen by the Head of People Development.',
          'They will meet their mentees once a week.',
          'They will not work on the same team as their mentees.',
          'They must have worked in the Finance department.',
        ],
        answer: 2,
        explanationVi:
          '"each new hire will be paired with an experienced colleague from a different team" → mentor làm ở nhóm khác (C). Gặp "every two weeks", không phải mỗi tuần (B); điều kiện là "at least two years" ở công ty, không cần thuộc phòng Finance (D).',
        translationVi: 'Điều gì được nêu về những người hướng dẫn (mentor)?',
        skillTags: ['comprehension.not-true'],
      },
      {
        text: 'The word "paired" in paragraph 2, line 1, is closest in meaning to',
        options: ['matched', 'divided', 'compared', 'doubled'],
        answer: 0,
        explanationVi:
          '"each new hire will be paired with an experienced colleague" → được ghép đôi với một đồng nghiệp = "matched" (A). "compared" (so sánh) hay "doubled" (gấp đôi) không hợp với "with an experienced colleague".',
        translationVi: 'Từ "paired" ở đoạn 2, dòng 1 có nghĩa gần nhất với',
        skillTags: ['comprehension.vocab-in-context'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Business news',
    passage:
      'BRADFORD — Larkfield Mills, one of the last wool manufacturers still operating in West Yorkshire, announced on Tuesday that it has acquired ReThread, a Leeds-based start-up that turns used clothing into yarn. The price of the deal was not disclosed. [1]\n\nFounded in 2021 by engineers Nadia Pryce and Callum Hart, ReThread developed a sorting machine that separates garments by fibre type and colour, allowing them to be respun without new dyes. Until now, the company has operated only a small pilot plant, processing about 40 tonnes of material a year. [2]\n\nLarkfield’s managing director, Gareth Ainsworth, said the acquisition would allow the mill to offer a recycled wool range to fashion brands that have set targets for using reused materials. "Our customers have been asking for this for years," he said. "ReThread has the technology, and we have the space and the spinning expertise to produce it at scale." [3]\n\nUnder the plan, ReThread’s equipment will be moved into an unused wing of Larkfield’s Bradford site by the end of the year, and production capacity is expected to grow tenfold. Ms. Pryce and Mr. Hart will stay on to lead a new materials division. Around 25 jobs will be created, most of them in machine operation and quality control. [4]\n\nIndustry analysts say the move reflects a wider trend. Recycled fibre still accounts for less than 2 percent of the wool used in Britain, but demand from retailers has more than doubled in the past three years.',
    questions: [
      {
        text: 'What is the article mainly about?',
        options: [
          'The opening of a new clothing store',
          'A company’s purchase of a smaller business',
          'The retirement of a managing director',
          'A decline in demand for wool products',
        ],
        answer: 1,
        explanationVi:
          '"Larkfield Mills… announced… that it has acquired ReThread, a Leeds-based start-up" → một công ty mua lại doanh nghiệp nhỏ hơn (B, "acquired" = "purchase"). Nhu cầu len tái chế "more than doubled", nên (D) ngược lại.',
        translationVi: 'Bài báo chủ yếu nói về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What is NOT stated about ReThread?',
        options: [
          'It was started by two engineers.',
          'Its machine sorts clothing by colour.',
          'It currently runs a small facility.',
          'It has supplied yarn to fashion brands.',
        ],
        answer: 3,
        explanationVi:
          'Bài chỉ nói Larkfield sẽ bán dòng len tái chế cho các hãng thời trang trong tương lai; không nói ReThread đã cung cấp sợi cho họ (D). "Founded… by engineers Nadia Pryce and Callum Hart" (A), "separates garments by fibre type and colour" (B), "operated only a small pilot plant" (C) đều có trong bài.',
        translationVi: 'Điều gì KHÔNG được nêu về ReThread?',
        skillTags: ['comprehension.not-true'],
      },
      {
        text: 'What is suggested about Larkfield Mills?',
        options: [
          'It has space available at its current site.',
          'It will relocate its headquarters to Leeds.',
          'It is the largest wool producer in Britain.',
          'It has recently lost several major customers.',
        ],
        answer: 0,
        explanationVi:
          'Thiết bị sẽ được chuyển vào "an unused wing of Larkfield’s Bradford site", và ông Ainsworth nói "we have the space" → nhà máy hiện có còn chỗ trống (A). Larkfield là "one of the last" nhà sản xuất len ở West Yorkshire, không phải lớn nhất nước Anh (C); khách hàng "have been asking for this", không có chuyện mất khách (D).',
        translationVi: 'Điều gì được ngụ ý về Larkfield Mills?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"Current mill employees will be given the first opportunity to train for these roles."',
        options: ['[1]', '[2]', '[3]', '[4]'],
        answer: 3,
        explanationVi:
          '"these roles" cần một danh từ chỉ việc làm ngay trước nó: "Around 25 jobs will be created, most of them in machine operation and quality control" → đặt ở [4]. Các vị trí [1]–[3] không nhắc đến việc làm mới nào.',
        translationVi:
          'Câu sau phù hợp nhất ở vị trí nào trong [1], [2], [3], [4]? "Nhân viên hiện tại của nhà máy sẽ được ưu tiên đào tạo cho các vị trí này."',
        skillTags: ['comprehension.sentence-insertion'],
      },
    ],
  },
]
