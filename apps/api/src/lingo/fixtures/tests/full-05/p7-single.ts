/** Full Test 05, Part 7 Single: written for Lingo (not from ETS). */
export const P7_SINGLE: object[] = [
  {
    difficulty: 'EASY',
    topic: 'Media',
    passage:
      'Yusuf Adebayo [8:02 A.M.]\nMorning, Keiko. The crew is at the riverside location, but the park office says our filming permit starts tomorrow, not today.\n\nKeiko Tanabe [8:05 A.M.]\nThat can’t be right. I submitted the form for the 14th.\n\nYusuf Adebayo [8:06 A.M.]\nThey have it down as the 15th. We can’t set up the cameras without it.\n\nKeiko Tanabe [8:09 A.M.]\nLet me call the permits desk. Could the crew start on the interior scenes at the studio instead?\n\nYusuf Adebayo [8:11 A.M.]\nThe van is already loaded with the outdoor lighting.\n\nKeiko Tanabe [8:12 A.M.]\nOK, then have everyone get breakfast nearby. I’ll message you as soon as I hear back.',
    questions: [
      {
        text: 'What problem does Mr. Adebayo report?',
        options: [
          'The weather is unsuitable for filming outdoors.',
          'Some lighting equipment has been damaged.',
          'A permit shows a different date than expected.',
          'The studio is not available today.',
        ],
        answer: 2,
        explanationVi:
          '"the park office says our filming permit starts tomorrow, not today" và "They have it down as the 15th" trong khi cô Tanabe đăng ký ngày 14 → giấy phép ghi sai ngày (C). Không ai nhắc đến thời tiết (A) hay thiết bị hỏng (B).',
        translationVi: 'Anh Adebayo báo cáo vấn đề gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'At 8:11 A.M., what does Mr. Adebayo most likely mean when he writes, "The van is already loaded with the outdoor lighting"?',
        options: [
          'The crew is ready to leave for the studio.',
          'Moving to the studio would be inconvenient.',
          'The equipment was delivered to the wrong place.',
          'More lighting needs to be rented.',
        ],
        answer: 1,
        explanationVi:
          'Cô Tanabe đề nghị chuyển sang quay cảnh trong studio; anh trả lời xe đã chất sẵn đèn cho cảnh ngoài trời → chuyển sang studio sẽ bất tiện (B). Cô Tanabe hiểu ý nên bảo cả đoàn đi ăn sáng gần đó thay vì đi studio.',
        translationVi:
          'Lúc 8:11 sáng, anh Adebayo nhiều khả năng có ý gì khi viết "The van is already loaded with the outdoor lighting"?',
        skillTags: ['comprehension.speaker-intent'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Transport',
    passage:
      'GREYSTONE HARBOUR FERRIES\nWinter Timetable Notice\n\nFrom 4 November to 28 February, the Greystone–Allardice crossing will run every 90 minutes instead of every hour. The first sailing will leave Greystone at 6:30 A.M., and the last will return from Allardice at 8:00 P.M.\n\nVehicle bookings are now required for all sailings and can be made online up to two hours before departure. Foot passengers do not need to book and may buy tickets on board.\n\nMonthly pass holders will receive a 10 percent refund for November to reflect the reduced service. No action is needed; the amount will be credited automatically.',
    questions: [
      {
        text: 'What is the notice mainly about?',
        options: [
          'A new route to Allardice',
          'Changes to a ferry schedule',
          'Higher ticket prices for drivers',
          'The opening of a ticket office',
        ],
        answer: 1,
        explanationVi:
          'Tiêu đề "Winter Timetable Notice" và câu "will run every 90 minutes instead of every hour" → thay đổi lịch chạy phà (B). Tuyến Greystone–Allardice đã có sẵn, không phải tuyến mới (A).',
        translationVi: 'Thông báo chủ yếu nói về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What is stated about monthly pass holders?',
        options: [
          'They must apply online for a refund.',
          'They can no longer travel with a vehicle.',
          'They may board without a reservation.',
          'They will automatically receive some money back.',
        ],
        answer: 3,
        explanationVi:
          '"will receive a 10 percent refund… No action is needed; the amount will be credited automatically" → tự động được hoàn một phần tiền (D). Không cần nộp đơn trực tuyến (A); quy định không cần đặt chỗ là dành cho khách đi bộ, không phải người có vé tháng (C).',
        translationVi: 'Điều gì được nêu về những người có vé tháng?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Technology',
    passage:
      'FIXPOINT DEVICE REPAIR — Now Serving Businesses\n\nIs a broken laptop slowing your team down? FixPoint’s new business plan covers up to 25 devices for a flat fee of $240 a month. Members get:\n• Same-day screen and keyboard repairs at our Halsey Street workshop\n• Free pickup and return for offices within the city limits\n• A loan laptop whenever a repair takes longer than one working day\n\nSign up before 31 May and your first month is free. Call 555-0187 or visit fixpoint.biz/business to arrange a free consultation.',
    questions: [
      {
        text: 'What is offered to businesses that sign up before 31 May?',
        options: [
          'A discount on new laptops',
          'Free repairs for 25 additional devices',
          'A free carrying case',
          'A month of service at no charge',
        ],
        answer: 3,
        explanationVi:
          '"Sign up before 31 May and your first month is free" → được miễn phí tháng đầu (D). Con số 25 là số thiết bị tối đa của gói, không phải 25 thiết bị thêm (B).',
        translationVi: 'Doanh nghiệp đăng ký trước ngày 31/5 được ưu đãi gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'According to the advertisement, when will members receive a loan laptop?',
        options: [
          'When a repair takes more than a day',
          'When they bring a device to the workshop',
          'When their office is outside the city',
          'When they have more than 25 devices',
        ],
        answer: 0,
        explanationVi:
          '"A loan laptop whenever a repair takes longer than one working day" → khi sửa chữa mất hơn một ngày làm việc (A).',
        translationVi:
          'Theo quảng cáo, khi nào hội viên được mượn máy tính xách tay?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Property',
    passage:
      'From: Building Management <management@larchmonttower.com>\nTo: All tenants\nDate: 3 April\nSubject: East lift replacement\n\nDear Tenants,\n\nWork to replace the east lift in Larchmont Tower will begin on Monday, 14 April, and will take about six weeks. During this time, only the west lift and the stairways will be available, so please expect longer waits at the start and end of the working day.\n\nDeliveries of furniture or large equipment should be scheduled for weekends while the work is under way. To book the loading dock, please contact the front desk at least 48 hours in advance.\n\nWe apologise for the inconvenience and thank you for your patience.\n\nRuth Okafor\nBuilding Manager',
    questions: [
      {
        text: 'Why was the e-mail sent?',
        options: [
          'To announce a change in building opening hours',
          'To ask tenants to move to another floor',
          'To inform tenants about upcoming work',
          'To introduce a new front desk service',
        ],
        answer: 2,
        explanationVi:
          '"Work to replace the east lift… will begin on Monday, 14 April" → báo cho người thuê về công việc sắp diễn ra (C). Giờ mở cửa toà nhà không thay đổi (A).',
        translationVi: 'Vì sao email này được gửi?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What are tenants asked to do?',
        options: [
          'Arrange large deliveries for weekends',
          'Use the stairs at all times',
          'Report problems with the west lift',
          'Pay a fee to use the loading dock',
        ],
        answer: 0,
        explanationVi:
          '"Deliveries of furniture or large equipment should be scheduled for weekends" → sắp xếp giao hàng cồng kềnh vào cuối tuần (A). Thang máy phía tây vẫn dùng được nên không bắt buộc đi cầu thang (B); không nhắc đến phí (D).',
        translationVi: 'Người thuê được yêu cầu làm gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Automotive',
    passage:
      'BRAMLEY AUTO CARE\n61 Kettering Road, Northampton NN1 4AP\n\nSERVICE INVOICE #BA-7731\nDate: 18 September\nCustomer: Dellow Florists Ltd. (fleet account no. 2290)\nVehicle: Delivery van, registration KV19 RTE\nMileage: 48,215\n\nAnnual service (oil, filters, safety check) ........ £185.00\nFront brake pads, replaced ........ £96.00\nWiper blades, pair ........ £18.00\nLabour, brakes (1.5 hours) ........ £87.00\n\nSubtotal: £386.00\nFleet account discount (10%): –£38.60\nTOTAL DUE: £347.40\n\nTechnician’s note: The rear tyres are legal but worn and should be replaced within the next 3,000 miles. We have not done this work, as it was not approved. Payment is due within 30 days. The vehicle’s next annual service is due by September next year or at 60,000 miles, whichever comes first.',
    questions: [
      {
        text: 'Why did Dellow Florists receive a reduced price?',
        options: [
          'It holds a fleet account with the garage.',
          'It paid the invoice early.',
          'The wiper blades were free.',
          'The brake work took less time than expected.',
        ],
        answer: 0,
        explanationVi:
          'Dòng "Fleet account discount (10%)" và khách hàng có "fleet account no. 2290" → được giảm giá vì có tài khoản đội xe (A). Hoá đơn còn hạn thanh toán 30 ngày, chưa trả sớm (B); cần gạt mưa vẫn tính £18 (C).',
        translationVi: 'Vì sao Dellow Florists được giảm giá?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the technician recommend?',
        options: [
          'Replacing the rear tyres soon',
          'Booking another oil change in 3,000 miles',
          'Changing the rear brake pads',
          'Using the van less often',
        ],
        answer: 0,
        explanationVi:
          '"The rear tyres… should be replaced within the next 3,000 miles" → nên thay lốp sau sớm (A). 3,000 dặm là mốc thay lốp, không phải thay dầu (B); má phanh được thay là má phanh trước (C).',
        translationVi: 'Kỹ thuật viên khuyên điều gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What is NOT included in the charges on the invoice?',
        options: [
          'Work on the brakes',
          'New wiper blades',
          'An annual service',
          'New tyres',
        ],
        answer: 3,
        explanationVi:
          'Lốp mới chưa được thay vì "We have not done this work, as it was not approved" → không có trong hoá đơn (D). Phanh, cần gạt mưa và bảo dưỡng định kỳ đều được tính tiền.',
        translationVi: 'Khoản nào KHÔNG có trong các khoản phí trên hoá đơn?',
        skillTags: ['comprehension.not-true'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Arts',
    passage:
      'Corran Gallery of Modern Art — Corporate Partners\n\nHome | Exhibitions | Visit | Corporate Partners\n\nOur Corporate Partner programme lets businesses support the gallery while offering something special to staff and clients. Partners choose one of two levels:\n\nSilver (£2,500 per year): free entry to all paid exhibitions for up to 40 employees, plus 10 percent off in the gallery café and shop.\n\nGold (£6,000 per year): all Silver benefits for up to 100 employees, plus one evening hire of the Atrium for a private reception of up to 150 guests. Catering is arranged separately through our in-house team.\n\nAll partners are thanked by name on the donor wall in the entrance hall and in our annual report. Partnerships run for twelve months from the date of the first payment. To discuss which level suits your organisation, contact Aileen Strachan, Partnerships Manager, at partners@corrangallery.org.uk.',
    questions: [
      {
        text: 'For whom is the web page most likely intended?',
        options: [
          'Artists who wish to exhibit their work',
          'Couples planning a private wedding',
          'People applying to work in the café',
          'Companies interested in supporting the gallery',
        ],
        answer: 3,
        explanationVi:
          'Trang "Corporate Partners" mời "businesses support the gallery" → dành cho các công ty muốn tài trợ bảo tàng (D).',
        translationVi: 'Trang web này nhiều khả năng dành cho ai?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'What is included only at the Gold level?',
        options: [
          'Discounts in the gallery shop',
          'Use of a space for an evening event',
          'Free catering for guests',
          'A listing on the donor wall',
        ],
        answer: 1,
        explanationVi:
          'Chỉ hạng Gold có "one evening hire of the Atrium for a private reception" → được dùng không gian cho sự kiện buổi tối (B). Đồ ăn phải đặt riêng, không miễn phí (C); giảm giá (A) và tên trên tường (D) áp dụng cho cả hai hạng.',
        translationVi: 'Quyền lợi nào chỉ có ở hạng Gold?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What is indicated about the partnerships?',
        options: [
          'They last for one year.',
          'They are limited to 40 companies.',
          'They begin on 1 January.',
          'They must be renewed through Ms. Strachan.',
        ],
        answer: 0,
        explanationVi:
          '"Partnerships run for twelve months from the date of the first payment" → kéo dài một năm (A), tính từ ngày thanh toán đầu tiên chứ không phải 1/1 (C). Con số 40 là số nhân viên của hạng Silver (B).',
        translationVi: 'Điều gì được nêu về các gói đối tác?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'IT',
    passage:
      'MEMO\nTo: All staff, Ferrand & Lowe Architects\nFrom: Daniel Mbeki, IT Manager\nDate: 9 January\nRe: New password manager\n\nStarting Monday, 20 January, every employee will be required to store work passwords in Keyvault, the password manager we have been testing in the Bristol office since October. Keyvault creates strong passwords automatically and fills them in for you, so you will no longer need to remember them or write them down.\n\nYou will receive an invitation e-mail on 16 January. Please accept it and set up your account before the 20th; the setup takes about ten minutes. If you work mainly on a tablet, you will also need the Keyvault app, which IT will add to company tablets remotely.\n\nShort training sessions will be held in the main conference room on 17 and 22 January at 12:30 P.M. Lunch will be provided, so please register on the intranet so that we can order enough food. Anyone who cannot attend in person can watch a recording afterward.',
    questions: [
      {
        text: 'What is the purpose of the memo?',
        options: [
          'To announce a required change in how passwords are kept',
          'To report the results of a security review',
          'To introduce a new IT manager',
          'To ask staff to test new software',
        ],
        answer: 0,
        explanationVi:
          '"every employee will be required to store work passwords in Keyvault" → thông báo thay đổi bắt buộc về cách lưu mật khẩu (A). Giai đoạn thử nghiệm đã diễn ra ở Bristol, nay không còn yêu cầu thử nữa (D).',
        translationVi: 'Mục đích của bản ghi nhớ là gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What is suggested about the Bristol office?',
        options: [
          'It will host the training sessions.',
          'Its employees have already used Keyvault.',
          'It will close on 20 January.',
          'Its tablets need to be replaced.',
        ],
        answer: 1,
        explanationVi:
          '"the password manager we have been testing in the Bristol office since October" → nhân viên ở Bristol đã dùng Keyvault (B). Buổi đào tạo diễn ra ở "main conference room", không nói là ở Bristol (A).',
        translationVi: 'Điều gì được gợi ý về văn phòng Bristol?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'Why should employees register for a training session?',
        options: [
          'To receive an invitation e-mail',
          'To get a copy of the recording',
          'So that the right amount of food can be ordered',
          'So that IT can install the app on their tablets',
        ],
        answer: 2,
        explanationVi:
          '"Lunch will be provided, so please register… so that we can order enough food" → để đặt đủ đồ ăn (C). Email mời được gửi cho mọi người vào 16/1 (A); ứng dụng được IT cài từ xa (D).',
        translationVi: 'Vì sao nhân viên nên đăng ký buổi đào tạo?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Aviation',
    passage:
      'KILBRIDE — Skyline Regional Airways will open a new maintenance hangar at Kilbride Airport in March, bringing work that the airline currently sends to a contractor in Rotterdam back to Scotland. — [1] —\n\nThe hangar, large enough for two of the airline’s 70-seat turboprop aircraft at once, will handle routine inspections as well as heavier repairs. Until now, each aircraft has had to be flown empty to the Netherlands for these checks, a trip that took it out of service for up to three days. — [2] —\n\nSkyline expects to hire 45 engineers and technicians over the next two years. Many of them will be trained through a new partnership with Kilbride College, whose aircraft engineering course will move into a classroom on the hangar site in September. — [3] —\n\n“Having our own facility gives us far more control over our schedule,” said chief operating officer Isla Monteith. She added that the hangar could eventually take in aircraft from other operators. — [4] — The airline has not yet said how much the project cost.',
    questions: [
      {
        text: 'What is the article mainly about?',
        options: [
          'An airline’s plan to buy new aircraft',
          'A new flight route between Scotland and the Netherlands',
          'A facility that will let an airline do its own maintenance',
          'The closure of a college course',
        ],
        answer: 2,
        explanationVi:
          'Bài báo nói Skyline mở "a new maintenance hangar", đưa việc bảo dưỡng về tự làm thay vì thuê nhà thầu ở Rotterdam (C). Chuyến bay sang Hà Lan chỉ là chuyến bay rỗng đi bảo dưỡng, không phải tuyến mới (B).',
        translationVi: 'Bài báo chủ yếu nói về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What is indicated about the inspections done until now?',
        options: [
          'They were carried out in another country.',
          'They were done by Kilbride College students.',
          'They took about a week each.',
          'They were required only for larger aircraft.',
        ],
        answer: 0,
        explanationVi:
          '"each aircraft has had to be flown empty to the Netherlands for these checks" → được thực hiện ở nước khác (A). Thời gian là "up to three days", không phải một tuần (C).',
        translationVi:
          'Điều gì được nêu về các đợt kiểm tra được thực hiện cho đến nay?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'According to the article, what will happen in September?',
        options: [
          'The hangar will open to other airlines.',
          'Skyline will hire its first engineers.',
          'The cost of the project will be announced.',
          'A training course will move to the hangar site.',
        ],
        answer: 3,
        explanationVi:
          '"whose aircraft engineering course will move into a classroom on the hangar site in September" → khoá học chuyển đến khu nhà chứa máy bay (D). Việc nhận máy bay hãng khác chỉ là khả năng "eventually" (A); chi phí chưa được công bố (C).',
        translationVi: 'Theo bài báo, điều gì sẽ xảy ra vào tháng 9?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"Those flights alone cost the airline an estimated £400,000 a year in fuel and crew time."',
        options: ['[1]', '[2]', '[3]', '[4]'],
        answer: 1,
        explanationVi:
          '"Those flights" phải chỉ các chuyến bay đã nhắc ngay trước: câu trước [2] nói máy bay "has had to be flown empty to the Netherlands" → chi phí nhiên liệu và tổ bay cho các chuyến đó (B). Các vị trí khác nói về tuyển dụng và kế hoạch tương lai.',
        translationVi:
          'Câu sau phù hợp nhất ở vị trí nào trong [1], [2], [3], [4]? "Chỉ riêng những chuyến bay đó đã tiêu tốn của hãng ước tính 400.000 bảng mỗi năm tiền nhiên liệu và chi phí tổ bay."',
        skillTags: ['comprehension.sentence-insertion'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Legal',
    passage:
      'Pryce Okonkwo LLP\n27 Whitlock Square, Leeds LS1 2EH\n\n11 March\n\nMs. Harriet Vance\nManaging Director, Crumb & Kettle Bakeries\n4 Mill Lane, Harrogate HG1 5QT\n\nDear Ms. Vance,\n\nThank you for meeting with me last Thursday to discuss registering the Crumb & Kettle name and logo as trademarks. As promised, I have now completed a search of the national register.\n\nThe good news is that no one else has registered the name for bakery products or cafés. However, a catering company in Cardiff registered "Kettle & Co." in 2019 for event services. In my view, the two names are different enough that our application should succeed, but that company has the right to object during the two-month period after the application is published. If it does, the process could take up to a year rather than the usual four to five months.\n\nAs we discussed, I recommend that we apply for both the name and the logo now, covering baked goods, café services and online sales. The official fees come to £270, and our fixed charge for preparing and filing the application is £650. Should you later decide to sell packaged products abroad, we would need to file separate applications in each market.\n\nIf you are happy to proceed, please sign the enclosed engagement letter and return it to me. I would also ask you to send a high-quality copy of the logo, as the version on your website is not suitable for filing.\n\nYours sincerely,\n\nGideon Pryce\nPartner',
    questions: [
      {
        text: 'What is the main purpose of the letter?',
        options: [
          'To report the results of a search and recommend next steps',
          'To object to another company’s trademark',
          'To confirm that a trademark has been registered',
          'To arrange a meeting to discuss fees',
        ],
        answer: 0,
        explanationVi:
          'Ông Pryce báo kết quả tra cứu sổ đăng ký ("I have now completed a search") rồi đề xuất "apply for both the name and the logo now" → báo kết quả và đề xuất bước tiếp theo (A). Nhãn hiệu chưa được đăng ký (C); cuộc họp đã diễn ra "last Thursday" (D).',
        translationVi: 'Mục đích chính của lá thư là gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does Mr. Pryce suggest about the company that registered "Kettle & Co."?',
        options: [
          'It plans to open bakeries in Leeds.',
          'It has already objected to Crumb & Kettle’s application.',
          'It could slow down the registration process.',
          'It owns the rights to the Crumb & Kettle logo.',
        ],
        answer: 2,
        explanationVi:
          'Công ty này "has the right to object"; nếu phản đối, thủ tục "could take up to a year rather than the usual four to five months" → có thể làm chậm việc đăng ký (C). Đơn còn chưa nộp nên chưa thể bị phản đối (B).',
        translationVi:
          'Ông Pryce gợi ý điều gì về công ty đã đăng ký "Kettle & Co."?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'What is NOT mentioned as being covered by the recommended application?',
        options: [
          'Online sales',
          'Café services',
          'Baked goods',
          'Sales in other countries',
        ],
        answer: 3,
        explanationVi:
          'Đơn đề xuất gồm "baked goods, café services and online sales"; bán hàng ở nước ngoài cần "separate applications in each market" → không nằm trong đơn này (D).',
        translationVi:
          'Điều gì KHÔNG được nhắc đến là thuộc phạm vi đơn đăng ký được đề xuất?',
        skillTags: ['comprehension.not-true'],
      },
      {
        text: 'What is Ms. Vance asked to send?',
        options: [
          'A payment of £920',
          'A better version of an image',
          'A list of her overseas customers',
          'A copy of her company’s website',
        ],
        answer: 1,
        explanationVi:
          '"send a high-quality copy of the logo, as the version on your website is not suitable" → gửi bản logo chất lượng tốt hơn (B). Lá thư chỉ nêu các khoản phí (£270 + £650), không yêu cầu thanh toán ngay (A).',
        translationVi: 'Bà Vance được yêu cầu gửi gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Environment',
    passage:
      'TEXTILES GET A SECOND LIFE IN MARLOWE\nBy Priscilla Adjei\n\nMARLOWE — For most of the last decade, the clothing that residents of Marlowe dropped into charity bins had an uncertain future. Items that shops could not sell were usually shipped overseas or sent to landfill. Since January, however, much of it has been ending up at Refibre Works, a plant on the edge of the Corbin industrial estate that turns worn-out garments into new yarn.\n\nThe process is simpler than it sounds. Garments are sorted by colour, which means the finished yarn does not need to be dyed, saving both water and chemicals. Buttons and zips are removed, and the fabric is shredded into fibre, spun and wound onto spools. Refibre then sells the yarn to knitwear makers and, increasingly, to manufacturers of office furniture, which use it to cover chairs and acoustic panels.\n\nFounder Tobias Lindqvist admits the business has had to overcome scepticism. "Buyers assumed recycled yarn would be weaker," he said. "We now send every customer test results showing that ours meets the same standards as new wool blends." The approach seems to be working: the plant, which handled 300 tonnes of textiles last year, is on course to process twice that amount this year, and a second shift was added in June.\n\nThe main obstacle now is supply. Mixed-fibre garments, such as cotton blended with polyester, cannot yet be processed, and they make up more than half of what is collected. Lindqvist says Refibre is working with a university laboratory on a method to separate the fibres, though he declined to say when it might be ready.',
    questions: [
      {
        text: 'Why does the yarn produced at Refibre Works not need to be dyed?',
        options: [
          'It is sold only to furniture makers.',
          'Customers prefer undyed materials.',
          'Garments are grouped by colour before processing.',
          'Chemicals are added during shredding.',
        ],
        answer: 2,
        explanationVi:
          '"Garments are sorted by colour, which means the finished yarn does not need to be dyed" → quần áo được phân loại theo màu trước (C). Sợi được bán cho cả hãng dệt kim, không chỉ hãng nội thất (A).',
        translationVi: 'Vì sao sợi do Refibre Works sản xuất không cần nhuộm?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'The word "scepticism" in paragraph 3 is closest in meaning to',
        options: ['competition', 'expense', 'doubt', 'regulation'],
        answer: 2,
        explanationVi:
          'Câu sau giải thích: người mua cho rằng sợi tái chế "would be weaker" → sự nghi ngờ, hoài nghi = "doubt" (C).',
        translationVi: 'Từ "scepticism" ở đoạn 3 gần nghĩa nhất với',
        skillTags: ['comprehension.vocab-in-context'],
      },
      {
        text: 'What is suggested about Refibre Works?',
        options: [
          'It plans to open a second plant.',
          'It buys garments directly from residents.',
          'It was founded by a university.',
          'Its output is growing quickly.',
        ],
        answer: 3,
        explanationVi:
          'Năm ngoái xử lý 300 tấn, năm nay "on course to process twice that amount" và đã thêm ca thứ hai → sản lượng tăng nhanh (D). Họ thêm ca làm việc chứ không mở nhà máy thứ hai (A); quần áo đến từ thùng từ thiện, không mua trực tiếp (B).',
        translationVi: 'Điều gì được gợi ý về Refibre Works?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'According to the article, what problem does Refibre Works currently face?',
        options: [
          'It cannot yet recycle much of the clothing it receives.',
          'It cannot find enough buyers for its yarn.',
          'Its yarn has failed quality tests.',
          'Its workers are unwilling to work a second shift.',
        ],
        answer: 0,
        explanationVi:
          '"The main obstacle now is supply": vải pha sợi "cannot yet be processed" và chiếm hơn một nửa lượng thu gom → chưa tái chế được phần lớn quần áo nhận về (A). Sợi đạt chuẩn như len mới nên (C) sai.',
        translationVi: 'Theo bài báo, Refibre Works hiện đang gặp vấn đề gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
]
