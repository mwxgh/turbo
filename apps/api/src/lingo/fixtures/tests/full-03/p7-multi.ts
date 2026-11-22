/** Full Test 03, Part 7 Multi: written for Lingo (not from ETS). */
export const P7_MULTI: object[] = [
  {
    difficulty: 'EASY',
    topic: 'Education',
    passage:
      'MARLOW ADULT LEARNING CENTRE — Spring Evening Courses\n\nLearn something new this spring! All courses take place at our centre on Bexley Lane and begin the week of 7 April.\n\nPractical Spreadsheets — Tuesdays, 6:30–8:30 P.M., 8 weeks, £160\nBuild budgets, charts and reports with confidence.\n\nBusiness Writing — Wednesdays, 7:00–9:00 P.M., 6 weeks, £120\nWrite clear reports, proposals and e-mails.\n\nConversational Spanish — Thursdays, 6:00–7:30 P.M., 10 weeks, £140\nFor complete beginners.\n\nDigital Photography — Saturdays, 10:00 A.M.–12:00 P.M., 6 weeks, £150\nPlease bring your own camera.\n\nRegister online by 31 March and save 10 percent. Marlow residents aged 65 and over pay half price.\n---\nFrom: Ines Kovacic <ikovacic@fastmail.net>\nTo: courses@marlowlearning.org\nDate: 2 April\nSubject: Evening course\n\nHello,\n\nI would like to enrol in one of your spring evening courses. I had hoped to take the spreadsheet course, but I work late on Tuesdays, so I have chosen the course that meets on Wednesday evenings instead. Your flyer says it covers reports, proposals and e-mails, which is exactly what I need for my new job.\n\nI will be driving to the centre straight from work. Is there anywhere nearby where I can park?\n\nI have filled in the online registration form and will pay the full fee today.\n\nThank you,\nInes Kovacic',
    questions: [
      {
        text: 'What is the purpose of the flyer?',
        options: [
          'To advertise a series of classes',
          'To recruit new instructors',
          'To announce a change of location',
          'To report on students’ results',
        ],
        answer: 0,
        explanationVi:
          'Tờ rơi liệt kê bốn khoá học buổi tối, lịch học, học phí và ưu đãi đăng ký → quảng cáo các lớp học (A). Không có tuyển giảng viên (B) hay đổi địa điểm (C).',
        translationVi: 'Mục đích của tờ rơi là gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'Which course does Ms. Kovacic want to take?',
        options: [
          'Practical Spreadsheets',
          'Conversational Spanish',
          'Business Writing',
          'Digital Photography',
        ],
        answer: 2,
        explanationVi:
          'Email: cô chọn khoá học vào tối thứ Tư, nội dung về báo cáo, đề xuất, email. Tờ rơi: Business Writing học thứ Tư → (C). Cô muốn học Spreadsheets nhưng tối thứ Ba bận (A là bẫy).',
        translationVi: 'Cô Kovacic muốn học khoá nào?',
        skillTags: ['comprehension.cross-reference'],
      },
      {
        text: 'What does Ms. Kovacic ask about?',
        options: [
          'The name of an instructor',
          'The refund policy',
          'Classes held on weekends',
          'Parking near the centre',
        ],
        answer: 3,
        explanationVi:
          '"Is there anywhere nearby where I can park?" → hỏi về chỗ đỗ xe (D). Cô không hỏi về giảng viên, hoàn tiền hay lớp cuối tuần.',
        translationVi: 'Cô Kovacic hỏi về điều gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'How much will Ms. Kovacic most likely pay?',
        options: ['£108', '£120', '£60', '£160'],
        answer: 1,
        explanationVi:
          'Business Writing giá £120. Cô đăng ký ngày 2/4, sau hạn 31/3 nên không được giảm 10% (£108 sai); cô đang đi làm, không có dấu hiệu là cư dân trên 65 tuổi (£60 sai) → £120 (B).',
        translationVi: 'Cô Kovacic nhiều khả năng sẽ trả bao nhiêu?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'In the e-mail, the word "covers" in paragraph 1 is closest in meaning to',
        options: ['protects', 'pays for', 'deals with', 'hides'],
        answer: 2,
        explanationVi:
          '"it covers reports, proposals and e-mails" = khoá học bao gồm/đề cập đến các nội dung đó → "deals with" (C). "protects" (che chắn), "pays for" (chi trả), "hides" (che giấu) là nghĩa khác của cover.',
        translationVi: 'Trong email, từ "covers" ở đoạn 1 gần nghĩa nhất với',
        skillTags: ['comprehension.vocab-in-context'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Agriculture',
    passage:
      'RIDGELINE EQUIPMENT SHARE — Member Information\n\nRidgeline Equipment Share allows member farms in Dunmore County to rent machinery that they need only a few weeks each year. Annual membership costs $250.\n\nBooking: Equipment may be booked up to 30 days in advance through our online calendar. During the harvest season (August–October), each member may book a machine for no more than five consecutive days.\n\nDaily rates: hay baler $180; seed drill $140; manure spreader $95; post-hole digger $40\n\nCollection and return: Machines are collected from and returned to our yard at 210 Fennimore Road. For an additional $60 each way, we will deliver to your farm.\n\nFaults and damage: Members must report any fault within 24 hours. Repairs needed because of normal wear are paid for by Ridgeline. Damage caused by misuse is charged to the member.\n---\nFrom: Callum Doherty <callum@dohertyhillfarm.com>\nTo: bookings@ridgelineshare.org\nDate: 19 August\nSubject: Booking no. 4471\n\nHello,\n\nI collected the hay baler from your yard on Monday morning for my five-day booking. On Tuesday afternoon, the pickup reel stopped turning, and I phoned your office right away. Your mechanic, Dmitri, came out the same evening and found that a drive chain had worn through. He said it was simply old, and he replaced it on the spot.\n\nBecause of the breakdown, I lost most of Tuesday, and I still have about forty acres to bale. Would it be possible to keep the machine one extra day, until Saturday? I understand the rules for this time of year, but since the problem was not my fault, I hope an exception can be made.\n\nI will bring the baler back myself, so there is no need to arrange transport.\n\nCallum Doherty',
    questions: [
      {
        text: 'What is indicated about Ridgeline Equipment Share?',
        options: [
          'It sells used farm machinery.',
          'Its members do not pay an annual fee.',
          'It delivers equipment free of charge.',
          'It serves farms in a single county.',
        ],
        answer: 3,
        explanationVi:
          '"allows member farms in Dunmore County to rent machinery" → chỉ phục vụ nông trại trong một hạt (D). Hội viên trả $250/năm (B sai); giao máy tốn thêm $60 mỗi chiều (C sai); họ cho thuê chứ không bán (A sai).',
        translationVi: 'Điều gì được nêu về Ridgeline Equipment Share?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Who will most likely pay for the repair to the baler?',
        options: [
          'Mr. Doherty',
          'Ridgeline Equipment Share',
          'The baler’s manufacturer',
          'The mechanic',
        ],
        answer: 1,
        explanationVi:
          'Email: thợ máy nói xích truyền động mòn vì cũ ("simply old") → hao mòn thông thường. Trang thông tin: sửa chữa do hao mòn thông thường do Ridgeline chi trả → (B). Chỉ hư hỏng do dùng sai mới tính cho hội viên (A sai).',
        translationVi: 'Ai nhiều khả năng sẽ trả tiền sửa máy đóng kiện?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'Why does Mr. Doherty mention "the rules for this time of year"?',
        options: [
          'He knows that his request goes beyond a booking limit.',
          'He wants to book a different machine.',
          'He reported a fault later than allowed.',
          'He plans to have the baler delivered.',
        ],
        answer: 0,
        explanationVi:
          'Tháng 8 là mùa thu hoạch, mỗi hội viên chỉ được thuê tối đa 5 ngày liên tiếp; ông đã thuê 5 ngày và xin thêm 1 ngày → vượt giới hạn (A). Ông báo lỗi ngay lập tức, trong 24 giờ (C sai); ông tự mang máy trả (D sai).',
        translationVi:
          'Vì sao ông Doherty nhắc đến "các quy định vào thời điểm này trong năm"?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'When did Mr. Doherty report the problem?',
        options: [
          'On Monday morning',
          'On Monday evening',
          'On Tuesday afternoon',
          'On Saturday',
        ],
        answer: 2,
        explanationVi:
          '"On Tuesday afternoon, the pickup reel stopped turning, and I phoned your office right away" → chiều thứ Ba (C). Sáng thứ Hai là lúc ông nhận máy (A là bẫy); thứ Bảy là ngày ông muốn trả máy (D).',
        translationVi: 'Ông Doherty báo sự cố khi nào?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What is suggested about Mr. Doherty?',
        options: [
          'He has rented the seed drill before.',
          'He has finished baling his hay.',
          'He works as a mechanic.',
          'He will not pay a delivery charge.',
        ],
        answer: 3,
        explanationVi:
          'Ông tự nhận máy ở bãi và "I will bring the baler back myself" → không dùng dịch vụ giao máy $60 mỗi chiều (D). Ông còn khoảng 40 mẫu chưa đóng kiện (B sai); thợ máy là Dmitri (C sai).',
        translationVi: 'Điều gì được gợi ý về ông Doherty?',
        skillTags: ['comprehension.inference'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Construction',
    passage:
      'CALLOWAY TOWER — Elevator Modernization\n\nBeginning 3 March, Lift Systems Inc. will replace the controls in all four passenger elevators. Only one elevator will be taken out of service at a time, so three will remain in use throughout the project. The freight elevator will not be affected; however, tenants may use it only when accompanied by a member of the building staff.\n\nSchedule\nElevator A: 3–14 March\nElevator B: 17–28 March\nElevator C: 31 March–11 April\nElevator D: 14–25 April\n\nElevator D is the only elevator that serves the rooftop terrace. While it is out of service, the terrace will be closed.\n\nPlease direct any questions to the building office at extension 200.\n---\nFrom: Nadia Petrov <n.petrov@brightwaterarch.com>\nTo: buildingoffice@callowaytower.com\nDate: 6 March\nSubject: Rooftop terrace booking\n\nHello,\n\nIn January, we reserved the rooftop terrace for a client reception on the evening of 17 April. According to the notice in the lobby, the terrace will be closed on that day. We have already sent invitations to about 60 guests, so changing the date would be difficult.\n\nWould it be possible for the contractor to work on Elevator D at a different time? If not, could our guests take the stairs from the 22nd floor? I realize that would not be ideal for everyone.\n\nSeparately, we are expecting a delivery of drafting tables on 20 March. What do we need to do to arrange this?\n\nBest regards,\nNadia Petrov\nOffice Manager, Brightwater Architects\n---\nFrom: Owen Gallagher <buildingoffice@callowaytower.com>\nTo: Nadia Petrov <n.petrov@brightwaterarch.com>\nDate: 7 March\nSubject: RE: Rooftop terrace booking\n\nDear Ms. Petrov,\n\nThank you for letting us know about your event. I have spoken with Lift Systems, and they have agreed to swap the last two stages of the project. The elevator that was to be done last will now be done immediately after Elevator B, so the terrace will be open for your reception. Unfortunately, the roof stairs are for emergency use only and cannot be used by guests.\n\nAs for your delivery, a member of our staff will meet the driver at the loading dock. Please let me know the expected arrival time at least one day in advance.\n\nKind regards,\nOwen Gallagher\nBuilding Operations',
    questions: [
      {
        text: 'According to the notice, what will be true during the project?',
        options: [
          'The building will be closed on weekends.',
          'Most of the passenger elevators will remain in use.',
          'The freight elevator will be replaced.',
          'Tenants will need to use the stairs.',
        ],
        answer: 1,
        explanationVi:
          '"Only one elevator will be taken out of service at a time, so three will remain in use" → phần lớn thang máy chở khách vẫn hoạt động (B). Thang chở hàng "will not be affected" (C sai).',
        translationVi:
          'Theo thông báo, điều gì sẽ đúng trong thời gian thi công?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Why did Ms. Petrov write to the building office?',
        options: [
          'To ask about a conflict with a planned event',
          'To reserve the rooftop terrace',
          'To complain about noise from the work',
          'To invite Mr. Gallagher to a reception',
        ],
        answer: 0,
        explanationVi:
          'Tiệc đã đặt ngày 17/4 nhưng sân thượng sẽ đóng vì thang D bảo trì → cô viết để hỏi cách giải quyết xung đột lịch (A). Sân thượng đã được đặt từ tháng 1 (B là bẫy).',
        translationVi: 'Vì sao cô Petrov viết thư cho văn phòng toà nhà?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'When will Elevator D most likely be out of service?',
        options: [
          '3–14 March',
          '17–28 March',
          '31 March–11 April',
          '14–25 April',
        ],
        answer: 2,
        explanationVi:
          'Thông báo: D bảo trì 14–25/4, ngay sau C (31/3–11/4). Email trả lời: đổi chỗ hai giai đoạn cuối, thang làm sau cùng (D) sẽ làm ngay sau B → D nhận lịch cũ của C: 31/3–11/4 (C). (D) là lịch ban đầu, đã bị thay đổi.',
        translationVi: 'Thang máy D nhiều khả năng sẽ ngừng hoạt động khi nào?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'Which of Ms. Petrov’s requests does Mr. Gallagher turn down?',
        options: [
          'Rescheduling work on an elevator',
          'Sending a staff member to meet a driver',
          'Keeping the terrace open on 17 April',
          'Allowing guests to use the stairs',
        ],
        answer: 3,
        explanationVi:
          '"the roof stairs are for emergency use only and cannot be used by guests" → từ chối cho khách đi cầu thang (D). Việc đổi lịch thang máy và giữ sân thượng mở đều được đồng ý (A, C sai).',
        translationVi: 'Ông Gallagher từ chối yêu cầu nào của cô Petrov?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What is suggested about the delivery on 20 March?',
        options: [
          'It will be brought up in the freight elevator with a staff member present.',
          'It will need to be rescheduled because of the work.',
          'It will be taken to the rooftop terrace.',
          'It will be handled by Lift Systems Inc.',
        ],
        answer: 0,
        explanationVi:
          'Thông báo: người thuê chỉ được dùng thang chở hàng khi có nhân viên toà nhà đi cùng. Email trả lời: nhân viên sẽ đón tài xế ở khu bốc dỡ → hàng sẽ lên bằng thang chở hàng có nhân viên đi kèm (A). Không có gì phải dời lịch (B).',
        translationVi: 'Điều gì được gợi ý về lô hàng ngày 20/3?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Banking',
    passage:
      'HARROWGATE COMMERCIAL BANK — Equipment Upgrade Loans\n\nOur Equipment Upgrade Loan helps small businesses replace older machinery with more energy-efficient models. Businesses with fewer than 50 employees that have held a Harrowgate business account for at least one year may apply.\n\n• Loans from £5,000 to £60,000\n• Fixed interest rate of 4.9% for terms of up to five years; 5.6% for terms of six or seven years\n• No arrangement fee for applications received by 30 September\n• Repayments can begin up to three months after the loan is paid out\n\nTo apply, complete the online form and upload quotes from two different suppliers for the equipment you intend to buy, together with your most recent annual accounts. Applicants that have been trading for less than two years must also provide a business plan.\n\nA decision is usually made within ten working days.\n---\nFrom: Maeve Lindqvist <maeve@copperpotlaundry.co.uk>\nTo: business.loans@harrowgatebank.co.uk\nDate: 22 September\nSubject: Loan application, Copperpot Laundry\n\nDear Sir or Madam,\n\nThis morning I submitted an online application for an Equipment Upgrade Loan of £38,000 to replace the twelve washing machines at my launderette, which opened eighteen months ago. Our current machines were bought second-hand, and our electricity bills have risen by almost a third this year.\n\nI uploaded our accounts and both quotes, but the form would not accept my business plan, which is a large file. Could you tell me another way to send it?\n\nI would prefer to repay the loan over seven years to keep the monthly payments low. I would also like to put off the first repayment for as long as possible, as the new machines will take several weeks to install.\n\nKind regards,\nMaeve Lindqvist\nOwner, Copperpot Laundry\n---\nHarrowgate Commercial Bank\n\n8 October\n\nMs. Maeve Lindqvist\nCopperpot Laundry\n14 Wren Street\nHarrowgate HG1 4PT\n\nDear Ms. Lindqvist,\n\nI am pleased to confirm that your application for an Equipment Upgrade Loan has been approved for the full amount requested. Thank you for e-mailing your business plan to me directly; our credit team found it very thorough.\n\nThe terms you asked for have been applied. The funds will be paid into your business account on 15 October, and your first monthly repayment will therefore be due on 15 January. As your application reached us before the deadline, no arrangement fee will be charged.\n\nPlease sign and return the enclosed agreement within 14 days.\n\nYours sincerely,\nRajesh Pillai\nBusiness Lending Officer',
    questions: [
      {
        text: 'According to the Web page, what is NOT required of every applicant?',
        options: [
          'Quotes from two suppliers',
          'Recent annual accounts',
          'A business plan',
          'An account with Harrowgate Commercial Bank',
        ],
        answer: 2,
        explanationVi:
          'Kế hoạch kinh doanh chỉ bắt buộc với doanh nghiệp hoạt động dưới hai năm ("must also provide") → không áp dụng cho mọi người (C). Báo giá (A), báo cáo tài chính (B) và tài khoản tại ngân hàng từ một năm trở lên (D) đều bắt buộc.',
        translationVi:
          'Theo trang web, điều gì KHÔNG bắt buộc đối với mọi người nộp đơn?',
        skillTags: ['comprehension.not-true'],
      },
      {
        text: 'Why did Ms. Lindqvist have to provide a business plan?',
        options: [
          'Her loan request was larger than £30,000.',
          'She applied after the deadline.',
          'She asked for a seven-year term.',
          'Her business has been operating for less than two years.',
        ],
        answer: 3,
        explanationVi:
          'Email: tiệm giặt "opened eighteen months ago" (18 tháng). Trang web: hoạt động dưới hai năm phải nộp kế hoạch kinh doanh → (D). Cô nộp ngày 22/9, trước hạn 30/9 (B sai); không có quy định nào gắn kế hoạch với số tiền vay hay kỳ hạn (A, C).',
        translationVi: 'Vì sao cô Lindqvist phải nộp kế hoạch kinh doanh?',
        skillTags: ['comprehension.cross-reference'],
      },
      {
        text: 'What interest rate will Ms. Lindqvist most likely pay?',
        options: ['4.9%', '5.6%', '3.9%', '6.3%'],
        answer: 1,
        explanationVi:
          'Email: cô muốn trả trong bảy năm. Thư duyệt: "The terms you asked for have been applied". Trang web: kỳ hạn 6–7 năm lãi suất 5.6% → (B). 4.9% chỉ áp dụng cho kỳ hạn tối đa năm năm (A là bẫy).',
        translationVi: 'Cô Lindqvist nhiều khả năng sẽ trả lãi suất bao nhiêu?',
        skillTags: ['comprehension.cross-reference'],
      },
      {
        text: 'What is suggested about Ms. Lindqvist’s loan?',
        options: [
          'Its first repayment has been delayed by the longest period allowed.',
          'It was approved for less than she had requested.',
          'It will be used to open a second launderette.',
          'It is subject to an arrangement fee.',
        ],
        answer: 0,
        explanationVi:
          'Tiền giải ngân 15/10, kỳ trả đầu tiên 15/1 = đúng ba tháng, cũng là mức tối đa trên trang web ("up to three months") — khớp với mong muốn hoãn lâu nhất có thể trong email (A). Khoản vay được duyệt đủ số tiền (B sai); không thu phí thu xếp (D sai).',
        translationVi: 'Điều gì được gợi ý về khoản vay của cô Lindqvist?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'In the letter, the word "thorough" in paragraph 1 is closest in meaning to',
        options: ['lengthy', 'detailed', 'finished', 'strict'],
        answer: 1,
        explanationVi:
          '"our credit team found it very thorough" = kế hoạch rất kỹ lưỡng, chi tiết → "detailed" (B). "lengthy" (dài dòng) là bẫy vì email nói tệp lớn, nhưng thorough nói về độ kỹ, không phải độ dài.',
        translationVi: 'Trong thư, từ "thorough" ở đoạn 1 gần nghĩa nhất với',
        skillTags: ['comprehension.vocab-in-context'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Food production',
    passage:
      'From: Leonie Barraclough <l.barraclough@bramblecrossfoods.com>\nTo: Packaging Team\nDate: 28 March\nSubject: New bag supplier\n\nHi all,\n\nPolyvane, which has supplied our granola bags for six years, has told us that its price will rise by 12 percent on 1 June, from $88 to about $98.50 per 1,000 bags. I have asked three other suppliers to send samples, and I would like Haruto Sato in Quality to test them.\n\nAny new supplier must meet all of the following requirements:\n1. The bags must be recyclable through household collections.\n2. Every seal must stay intact when filled bags are dropped from a height of one metre.\n3. The price must be under $95 per 1,000 bags.\n\nHaruto, please send me your results by 15 April.\n\nLeonie\n---\nPackaging Trial Results — prepared by Haruto Sato, 12 April\n\nSupplier | Recyclable at home | Seals intact after drop test (out of 50) | Price per 1,000 bags | Minimum order\nFernway Packaging | Yes | 50 | $91 | 20,000 bags\nOakridge Films | No | 50 | $78 | 10,000 bags\nTelford & Price | Yes | 46 | $84 | 5,000 bags\n\nNote: Telford & Price believes its seal failures were caused by a setting on the machine used to make the samples. It has offered to send a second set of samples at no charge.\n---\nFrom: Leonie Barraclough <l.barraclough@bramblecrossfoods.com>\nTo: Packaging Team\nDate: 20 April\nSubject: RE: New bag supplier\n\nHi all,\n\nThank you, Haruto, for the thorough testing. We will switch to the only supplier that met every requirement in the first round. Because its minimum order is high, we will place a single order large enough to last until the end of August rather than several smaller ones.\n\nI have also accepted the other offer of free samples. If those bags pass all of our tests, we will compare the two suppliers again in September.\n\nFinally, Polyvane has since offered to limit its increase to 6 percent. I have thanked them, but even at that price we would be paying more than we will with our new supplier.\n\nLeonie',
    questions: [
      {
        text: 'Why is Bramblecross Foods looking for a new supplier?',
        options: [
          'Its current bags cannot be recycled.',
          'It is launching a new product.',
          'Its current supplier is closing.',
          'Its current supplier is raising its prices.',
        ],
        answer: 3,
        explanationVi:
          'Email 1: Polyvane sẽ tăng giá 12% từ 1/6 → tìm nhà cung cấp mới (D). Việc tái chế là tiêu chí cho nhà cung cấp mới, không nói bao bì hiện tại không tái chế được (A là bẫy).',
        translationVi: 'Vì sao Bramblecross Foods tìm nhà cung cấp mới?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'Why was Oakridge Films most likely not chosen?',
        options: [
          'Its bags cannot be recycled through household collections.',
          'Its price was too high.',
          'Its seals failed the drop test.',
          'Its minimum order was too large.',
        ],
        answer: 0,
        explanationVi:
          'Bảng kết quả: Oakridge "Recyclable at home: No". Email 1: bao bì phải tái chế được qua thu gom hộ gia đình → (A). Oakridge rẻ nhất ($78) và đạt 50/50 khi thả rơi (B, C sai).',
        translationVi: 'Vì sao Oakridge Films nhiều khả năng không được chọn?',
        skillTags: ['comprehension.cross-reference'],
      },
      {
        text: 'Which supplier has Bramblecross Foods chosen?',
        options: [
          'Polyvane',
          'Oakridge Films',
          'Fernway Packaging',
          'Telford & Price',
        ],
        answer: 2,
        explanationVi:
          'Chỉ Fernway đạt cả ba tiêu chí: tái chế được, 50/50 túi kín, giá $91 < $95. Email 3 cũng nhắc đơn tối thiểu cao (20.000 túi) → Fernway (C). Telford & Price giá rẻ hơn nhưng chỉ 46/50 túi còn kín (D sai).',
        translationVi: 'Bramblecross Foods đã chọn nhà cung cấp nào?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'What will most likely happen before September?',
        options: [
          'Polyvane will lower its price by 12 percent.',
          'Telford & Price will provide more samples for testing.',
          'Mr. Sato will visit Oakridge Films.',
          'Bramblecross Foods will place several small orders.',
        ],
        answer: 1,
        explanationVi:
          'Bảng: Telford & Price đề nghị gửi bộ mẫu thứ hai miễn phí. Email 3: "I have also accepted the other offer of free samples… compare… in September" → Telford & Price gửi mẫu mới để thử (B). Công ty đặt một đơn lớn thay vì nhiều đơn nhỏ (D ngược nghĩa).',
        translationVi: 'Điều gì nhiều khả năng sẽ xảy ra trước tháng 9?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'What is indicated about Polyvane’s revised offer?',
        options: [
          'It was sent directly to Mr. Sato.',
          'It included free delivery.',
          'It was accepted for the rest of the year.',
          'It would still cost more than the chosen supplier’s bags.',
        ],
        answer: 3,
        explanationVi:
          '"even at that price we would be paying more than we will with our new supplier": $88 tăng 6% ≈ $93,3, vẫn cao hơn $91 của Fernway → (D). Bà Barraclough chỉ cảm ơn, không nhận lời (C sai); không có thông tin Polyvane gửi đề nghị cho ông Sato (A) hay miễn phí giao hàng (B).',
        translationVi: 'Điều gì được nêu về đề nghị mới của Polyvane?',
        skillTags: ['comprehension.detail', 'comprehension.cross-reference'],
      },
    ],
  },
]
