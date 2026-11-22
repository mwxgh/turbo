/** Full Test 01, Part 7 Multi: written for Lingo (not from ETS). */
export const P7_MULTI: object[] = [
  {
    difficulty: 'MEDIUM',
    topic: 'Facilities',
    passage:
      'VERDANT WORKS — Indoor Plants for Offices\n\nBring life to your workplace without the work. Verdant Works supplies, installs and maintains plants for offices of every size across the Leeds area.\n\nCare plans (prices per month):\n• Basic — up to 15 plants, one visit per month: £85\n• Standard — up to 40 plants, two visits per month: £150\n• Premium — up to 80 plants, weekly visits, seasonal flower displays: £260\n\nEvery plan includes free replacement of any plant that does not stay healthy. New clients who sign a 12-month agreement receive their first month free. Call 0113 496 0721 or visit verdantworks.co.uk to book a free consultation.\n---\nFrom: Harriet Okafor <h.okafor@lumenaudit.co.uk>\nTo: enquiries@verdantworks.co.uk\nDate: 6 February\nSubject: Consultation follow-up\n\nDear Mr. Pryce,\n\nThank you for visiting our offices on Tuesday. As you suggested, we have decided to place plants on both floors rather than only in the reception area, which brings the total to 32. I have attached the floor plans with the locations we discussed marked in green.\n\nOur directors have approved a one-year agreement, and we would like the plants installed before 3 March, when we will be welcoming a group of clients from our Rotterdam office. Please note that our building is closed to visitors on Fridays, so any regular visits would need to take place earlier in the week.\n\nOne more question: several of the plants in our meeting rooms will be near windows that face south. Would that cause any difficulty for the species you recommended?\n\nBest regards,\nHarriet Okafor\nOffice Manager, Lumen Audit Partners',
    questions: [
      {
        text: 'What is suggested about Mr. Pryce?',
        options: [
          'He visited the Rotterdam office of Lumen Audit Partners.',
          'He advised placing plants in more areas than first planned.',
          'He prepared the floor plans for Ms. Okafor’s building.',
          'He will be unavailable until after 3 March.',
        ],
        answer: 1,
        explanationVi:
          'Email: "As you suggested, we have decided to place plants on both floors rather than only in the reception area" → ông Pryce khuyên đặt cây ở nhiều khu vực hơn dự định ban đầu (B). Rotterdam là nơi khách đến (A sai); bản vẽ mặt bằng do cô Okafor gửi (C sai).',
        translationVi: 'Điều gì được gợi ý về ông Pryce?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'How much will Lumen Audit Partners most likely pay for its first month of service?',
        options: ['£0', '£85', '£150', '£260'],
        answer: 0,
        explanationVi:
          'Quảng cáo: khách mới ký hợp đồng 12 tháng được miễn phí tháng đầu. Email: "Our directors have approved a one-year agreement" → tháng đầu £0 (A). £150 là giá gói Standard mỗi tháng — bẫy nếu bỏ qua ưu đãi.',
        translationVi:
          'Lumen Audit Partners có lẽ sẽ trả bao nhiêu cho tháng dịch vụ đầu tiên?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'What is true about the service offered by Verdant Works?',
        options: [
          'Plants are delivered only on Fridays.',
          'Every plan includes seasonal flower displays.',
          'Clients’ staff must water the plants between visits.',
          'Unhealthy plants are replaced at no extra cost.',
        ],
        answer: 3,
        explanationVi:
          'Quảng cáo: "Every plan includes free replacement of any plant that does not stay healthy" → (D). Hoa theo mùa chỉ có ở gói Premium (B sai); thứ Sáu là ngày toà nhà của cô Okafor đóng cửa, không liên quan lịch giao (A sai); (C) không được nhắc.',
        translationVi: 'Điều gì đúng về dịch vụ của Verdant Works?',
        skillTags: ['comprehension.not-true', 'comprehension.detail'],
      },
      {
        text: 'In the e-mail, the word "place" in paragraph 1 is closest in meaning to',
        options: ['put', 'rank', 'order', 'finish'],
        answer: 0,
        explanationVi:
          '"place plants on both floors" = đặt cây ở cả hai tầng → "put" (A). "order" là bẫy từ cụm "place an order"; "rank"/"finish" là nghĩa "xếp hạng / về đích" không hợp ngữ cảnh.',
        translationVi: 'Trong email, từ "place" ở đoạn 1 gần nghĩa nhất với',
        skillTags: ['comprehension.vocab-in-context'],
      },
      {
        text: 'What will Verdant Works staff most likely do for Lumen Audit Partners?',
        options: [
          'Visit the office every week',
          'Set up seasonal flower displays',
          'Come to the office twice a month, from Monday to Thursday',
          'Move all of the plants to the reception area',
        ],
        answer: 2,
        explanationVi:
          'Email: tổng cộng 32 cây → quảng cáo: gói Standard (tối đa 40 cây) có 2 lần ghé mỗi tháng. Email thêm: toà nhà đóng cửa thứ Sáu, nên phải đến sớm hơn trong tuần → (C). Ghé hằng tuần và hoa theo mùa là của gói Premium (A, B sai).',
        translationVi:
          'Nhân viên Verdant Works có lẽ sẽ làm gì cho Lumen Audit Partners?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Events',
    passage:
      'From: Ingrid Solberg <events@fjordhallen.no>\nTo: Marcus Webb <m.webb@trelliscloud.com>\nDate: 14 August\nSubject: Room options for 21–22 October\n\nDear Mr. Webb,\n\nThank you for your interest in holding Trellis Cloud’s annual partner summit at Fjordhallen. On the dates you requested, the following rooms remain available:\n\nAurora Hall — up to 220 guests (theatre style), built-in stage and two projection screens — NOK 48,000 per day\nNordlys Room — up to 120 guests, can be divided into two equal rooms — NOK 27,000 per day\nSkog Suite — up to 60 guests, private terrace overlooking the harbour — NOK 16,000 per day\n\nAll prices include standard audiovisual equipment and wireless Internet. Catering is arranged separately through our in-house kitchen; menus are attached. Because October is our busiest month, I can hold a room for you without a deposit only until 28 August.\n\nKind regards,\nIngrid Solberg\nEvents Coordinator\n---\nFrom: Marcus Webb <m.webb@trelliscloud.com>\nTo: Ingrid Solberg <events@fjordhallen.no>\nDate: 26 August\nSubject: RE: Room options for 21–22 October\n\nDear Ms. Solberg,\n\nThank you for the detailed information. We have now confirmed 140 registrations for the summit, and our sales team expects a few more before the end of September, so the main sessions will need the largest room you offered. On the afternoon of the second day, however, participants will split into two groups of roughly 55 for product workshops, and I would like to know whether a room that can be divided would suit us for those sessions.\n\nI also noticed that the menus you sent do not include any vegan dishes. About a fifth of our guests have asked for them. Could your kitchen accommodate this request?\n\nFinally, please hold the rooms for us. Our finance department will send the deposit by 3 September at the latest.\n\nBest regards,\nMarcus Webb\nPartner Programs, Trellis Cloud',
    questions: [
      {
        text: 'Why did Ms. Solberg write the first e-mail?',
        options: [
          'To confirm that a deposit has been received',
          'To announce a change in room prices',
          'To recommend an outside catering company',
          'To describe spaces that could host an event',
        ],
        answer: 3,
        explanationVi:
          'Email 1 liệt kê các phòng còn trống cho hội nghị ngày 21–22/10 → mô tả địa điểm có thể tổ chức sự kiện (D). Tiền cọc chưa được gửi (A sai); suất ăn do bếp nội bộ phục vụ (C sai).',
        translationVi: 'Vì sao cô Solberg viết email thứ nhất?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'Which room will most likely be used for the main sessions?',
        options: [
          'Aurora Hall',
          'Nordlys Room',
          'Skog Suite',
          'A room at another venue',
        ],
        answer: 0,
        explanationVi:
          'Email 2: đã có 140 người đăng ký và cần "the largest room you offered". Email 1: phòng lớn nhất là Aurora Hall (220 khách); Nordlys chỉ 120 < 140 → (A).',
        translationVi: 'Phòng nào có lẽ sẽ dùng cho các phiên chính?',
        skillTags: ['comprehension.cross-reference'],
      },
      {
        text: 'Which room is Mr. Webb most likely asking about for the workshops?',
        options: [
          'Aurora Hall',
          'Nordlys Room',
          'Skog Suite',
          'A room at another venue',
        ],
        answer: 1,
        explanationVi:
          'Email 2 hỏi về "a room that can be divided" cho hai nhóm khoảng 55 người. Email 1: chỉ Nordlys Room "can be divided into two equal rooms" (120 → hai phòng 60 chỗ) → (B). Skog Suite có 60 chỗ nhưng chỉ chứa được một nhóm.',
        translationVi:
          'Ông Webb có lẽ đang hỏi về phòng nào cho các buổi workshop?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'What is suggested about Mr. Webb’s request to hold the rooms?',
        options: [
          'It was made after the rooms had been booked by another client.',
          'It includes a request to use the harbour terrace.',
          'The payment may arrive later than the date Ms. Solberg gave.',
          'It was approved by the finance department in August.',
        ],
        answer: 2,
        explanationVi:
          'Email 1: chỉ giữ phòng không cần cọc đến 28/8. Email 2: phòng tài chính gửi cọc "by 3 September at the latest" → có thể trễ hạn cô Solberg nêu (C). Email 2 gửi ngày 26/8, trước hạn, và không có dấu hiệu phòng đã bị đặt (A sai).',
        translationVi: 'Điều gì được gợi ý về yêu cầu giữ phòng của ông Webb?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'In the second e-mail, the word "accommodate" in paragraph 2 is closest in meaning to',
        options: ['lodge', 'enlarge', 'reserve', 'satisfy'],
        answer: 3,
        explanationVi:
          '"Could your kitchen accommodate this request?" = bếp có thể đáp ứng yêu cầu món chay không → "satisfy" (D). "lodge" là nghĩa "cho ở trọ" của accommodate, không hợp ngữ cảnh.',
        translationVi:
          'Trong email thứ hai, từ "accommodate" ở đoạn 2 gần nghĩa nhất với',
        skillTags: ['comprehension.vocab-in-context'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Purchasing',
    passage:
      'STITCHLINE WORKWEAR\nInvoice No. SW-40817 — Date: 9 May\nCustomer: Copperpot Restaurant Group, 18 Mill Lane, Galway\nAccount manager: Declan Furey\n\nChef jacket, white, logo embroidered (CJ-12) — Qty 30 × €38.00 = €1,140.00\nServer apron, charcoal (AP-05) — Qty 45 × €14.00 = €630.00\nKitchen cap, black (KC-02) — Qty 30 × €9.00 = €270.00\nLogo set-up fee (one-time) — €60.00\n\nSubtotal: €2,100.00\nVolume discount: —\nDelivery: €25.00\nTotal due: €2,125.00\n\nPayment due within 30 days. Orders of 100 garments or more receive a 5% volume discount on garments.\n---\nFrom: Aoife Brennan <a.brennan@copperpotgroup.ie>\nTo: Declan Furey <d.furey@stitchline.ie>\nDate: 13 May\nSubject: Invoice SW-40817\n\nHi Declan,\n\nThe uniforms arrived yesterday, and the staff at our new Salthill location are delighted with them. The embroidery looks sharp.\n\nI do have two questions about the invoice, though. First, our order is above the minimum for your volume discount, but none has been applied. Second, we were charged the one-time logo fee even though Stitchline already has our logo on file from the order for our Eyre Square restaurant last autumn.\n\nAlso, three of the chef jackets are a size too small. Could you exchange them for size L? I can drop them off at your shop on Thursday if that is convenient.\n\nThanks,\nAoife Brennan\nOperations Coordinator\n---\nMEMO\nTo: Billing Team\nFrom: Declan Furey\nDate: 14 May\nRe: Copperpot Restaurant Group\n\nPlease issue a corrected invoice for SW-40817. The customer is right on both points: apply the volume discount, and remove the set-up charge, since the design was digitised for them in October. Delivery stays as charged.\n\nMs. Brennan will also be returning three jackets for exchange. No charge applies, as size swaps within 14 days of delivery are free. I will be at the trade fair in Cork from Wednesday to Friday this week, so please ask Niamh at the shop counter to handle the swap when the jackets come in.\n\nDeclan',
    questions: [
      {
        text: 'What is indicated about Copperpot Restaurant Group?',
        options: [
          'It has recently opened a new restaurant.',
          'It placed its first order with Stitchline in May.',
          'It asked for black chef jackets.',
          'Its head office is located in Cork.',
        ],
        answer: 0,
        explanationVi:
          'Email: "the staff at our new Salthill location" → vừa mở nhà hàng mới (A). Họ đã đặt hàng từ mùa thu năm trước cho nhà hàng Eyre Square (B sai); áo đầu bếp màu trắng (C sai); Cork là nơi có hội chợ ông Furey tham dự (D sai).',
        translationVi: 'Điều gì được nêu về Copperpot Restaurant Group?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What will be the total on the corrected invoice?',
        options: ['€1,938.00', '€1,963.00', '€2,023.00', '€2,065.00'],
        answer: 1,
        explanationVi:
          'Hoá đơn: 105 sản phẩm (30 + 45 + 30) ≥ 100 → giảm 5% tiền hàng: €2,040 – €102 = €1,938. Bản ghi nhớ: bỏ phí logo €60, giữ phí giao €25 → €1,938 + €25 = €1,963 (B). (A) quên phí giao; (C) quên bỏ phí logo; (D) chỉ bỏ phí logo, không giảm giá.',
        translationVi: 'Tổng tiền trên hoá đơn đã sửa sẽ là bao nhiêu?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'When did Stitchline most likely fill an order for the Eyre Square restaurant?',
        options: ['In October', 'In December', 'In March', 'In May'],
        answer: 0,
        explanationVi:
          'Email: logo đã có trong hồ sơ "from the order for our Eyre Square restaurant last autumn". Bản ghi nhớ: "the design was digitised for them in October" → đơn hàng đó vào tháng Mười (A). Tháng Năm là đơn hiện tại (D).',
        translationVi:
          'Stitchline có lẽ đã thực hiện đơn hàng cho nhà hàng Eyre Square khi nào?',
        skillTags: ['comprehension.cross-reference'],
      },
      {
        text: 'Who will most likely receive the jackets that Ms. Brennan returns?',
        options: [
          'Mr. Furey',
          'A member of the billing team',
          'An employee named Niamh',
          'A delivery driver',
        ],
        answer: 2,
        explanationVi:
          'Email: cô Brennan mang áo đến cửa hàng vào thứ Năm. Bản ghi nhớ: ông Furey đi hội chợ ở Cork từ thứ Tư đến thứ Sáu nên nhờ Niamh ở quầy xử lý → (C). (A) là bẫy vì cô viết email cho ông Furey.',
        translationVi: 'Ai có lẽ sẽ nhận những chiếc áo cô Brennan mang trả?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'What is NOT mentioned about the uniforms?',
        options: [
          'Some of them are the wrong size.',
          'Their embroidery is of good quality.',
          'They were delivered on 12 May.',
          'They arrived later than promised.',
        ],
        answer: 3,
        explanationVi:
          'Có nhắc: ba áo bị chật (A), thêu đẹp "looks sharp" (B), email ngày 13/5 nói hàng đến "yesterday" → 12/5 (C). Không văn bản nào nói hàng giao trễ (D).',
        translationVi: 'Điều gì KHÔNG được nhắc đến về đồng phục?',
        skillTags: ['comprehension.not-true'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Business',
    passage:
      'PORT ELLIS — Small retailers in Ellis County who want to sell online can now apply for up to $4,000 to help them do so. The Digital Shopfront Grant, funded by the Ellis County Economic Development Office, will cover part of the cost of building a website, photographing products, and training staff to manage online orders.\n\n"Many of our shops have lost customers to large online sellers over the past few years," said program director Renata Calloway. "This grant is meant to help them compete, not to replace the personal service that keeps people coming back."\n\nThe office expects to fund about 60 businesses in the first round. Information sessions will be held at the Port Ellis Chamber of Commerce on 4 and 11 March.\n---\nDigital Shopfront Grant — Eligibility and Funding\n\nWho can apply: independent retail businesses located in Ellis County with no more than 25 employees and at least one year of trading history.\n\nHow much: the grant pays 50% of eligible costs, up to a maximum of $4,000. Businesses that have been trading for more than ten years may receive 60% of eligible costs, up to the same maximum.\n\nEligible costs: website design, product photography, online payment setup, staff training. Not covered: computer hardware, advertising.\n\nDeadline: applications for the first round close on 31 March. Decisions will be sent by 30 April.\n---\nDIGITAL SHOPFRONT GRANT — APPLICATION (Round 1)\n\nBusiness name: Hollis & Daughter Hardware\nOwner: Martin Hollis\nAddress: 52 Quay Street, Port Ellis\nYear established: 2009\nNumber of employees: 7\n\nPlanned project and estimated costs:\nWebsite design and online catalog — $3,200\nProduct photography (approx. 900 items) — $1,400\nTwo new laptops for order processing — $1,600\nStaff training — $400\n\nDate submitted: 18 March',
    questions: [
      {
        text: 'According to the article, what is the purpose of the grant?',
        options: [
          'To train people who want to start new companies',
          'To attract large online sellers to Ellis County',
          'To help local shops sell their goods online',
          'To pay for a new Chamber of Commerce building',
        ],
        answer: 2,
        explanationVi:
          'Bài báo: tiền hỗ trợ dành cho "small retailers… who want to sell online" để cạnh tranh với các nhà bán hàng trực tuyến lớn → (C). (B) ngược ý; Phòng Thương mại chỉ là nơi tổ chức buổi giới thiệu (D sai).',
        translationVi: 'Theo bài báo, mục đích của khoản hỗ trợ là gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What is suggested about Ms. Calloway?',
        options: [
          'She owns a retail business in Port Ellis.',
          'She will review all applications herself.',
          'She expects more than 60 businesses to apply.',
          'She believes personal service still matters to shoppers.',
        ],
        answer: 3,
        explanationVi:
          'Bà nói khoản hỗ trợ "not to replace the personal service that keeps people coming back" → bà cho rằng sự phục vụ tận tình vẫn quan trọng (D). Bà là giám đốc chương trình, không phải chủ cửa hàng (A); (B), (C) không được nhắc.',
        translationVi: 'Điều gì được gợi ý về bà Calloway?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'Which cost on Mr. Hollis’s application will NOT be covered by the grant?',
        options: [
          'Website design',
          'Product photography',
          'The laptops',
          'Staff training',
        ],
        answer: 2,
        explanationVi:
          'Trang web: "Not covered: computer hardware" → hai máy tính xách tay trong đơn ($1,600) là phần cứng nên không được tài trợ (C). Ba khoản còn lại đều nằm trong "Eligible costs".',
        translationVi:
          'Khoản chi nào trong đơn của ông Hollis sẽ KHÔNG được tài trợ?',
        skillTags: ['comprehension.cross-reference'],
      },
      {
        text: 'If the application is approved, how much will Hollis & Daughter Hardware most likely receive?',
        options: ['$2,500', '$3,000', '$3,960', '$4,000'],
        answer: 1,
        explanationVi:
          'Đơn: thành lập năm 2009 → hoạt động hơn 10 năm → được 60% (trang web). Chi phí hợp lệ = $3,200 + $1,400 + $400 = $5,000 (bỏ máy tính) → 60% = $3,000 (B). (A) dùng mức 50%; (C) tính cả máy tính ($6,600 × 60%); (D) là mức tối đa.',
        translationVi:
          'Nếu đơn được duyệt, Hollis & Daughter Hardware có lẽ sẽ nhận bao nhiêu?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'In the article, the word "round" in paragraph 3 is closest in meaning to',
        options: ['stage', 'circle', 'path', 'payment'],
        answer: 0,
        explanationVi:
          '"fund about 60 businesses in the first round" = đợt xét duyệt đầu tiên → "stage" (A). "circle" là nghĩa hình tròn, không hợp ngữ cảnh.',
        translationVi: 'Trong bài báo, từ "round" ở đoạn 3 gần nghĩa nhất với',
        skillTags: ['comprehension.vocab-in-context'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Travel',
    passage:
      'MERCAT & MORE FOOD WALKS — Valencia\nSpring schedule (1 April – 15 June)\n\nOld Town Tapas Walk — Tue, Thu, Sat, 6:30 P.M. — 3 hours — €65\nCentral Market Morning — Wed, Fri, Sat, 9:30 A.M. — 2.5 hours — €48\nPaella Workshop & Garden Lunch — Sun only, 11:00 A.M. — 4 hours — €89 (transport from Plaça de la Reina included)\nRuzafa Coffee & Pastry Trail — Mon–Fri, 8:00 A.M. — 2 hours — €35\n\nGroups of 8 or more receive 15% off. Private tours can be arranged on request for a 25% surcharge. All walks run in English and Spanish; the Paella Workshop is also offered in French.\n---\nFrom: Lucía Ferrer <bookings@mercatandmore.es>\nTo: Tobias Lindqvist <t.lindqvist@nordbanken-consult.se>\nDate: 2 May\nSubject: Your team outing on 16 May\n\nDear Mr. Lindqvist,\n\nThank you for choosing Mercat & More for your team’s visit. As requested, I have reserved places for 10 people on our walk on the morning of Friday, 16 May, with the group discount applied. Your guide will be Álvaro, who has led tours of the market for over eight years.\n\nYou mentioned that two of your colleagues will arrive in Valencia on the evening of the 16th and would still like to join an activity before your group flies home on Sunday evening. I would suggest our weekend workshop, which ends well before most evening flights. I have provisionally held two places, which I will release on 9 May unless I hear from you.\n\nPlease note that the meeting point for the market walk is the clock outside the main entrance, not the ticket office as stated in older versions of our website.\n\nBest wishes,\nLucía Ferrer\n---\n★★★★★ Reviewed 19 May by Henrik S.\n\nI joined this walk with nine colleagues during a company trip. Our guide knew the stallholders so well that it felt like walking through the market with a friend, and he even arranged for us to taste horchata at a stand that does not open to the public until later in the day. My only small complaint is that two of us went to the ticket office at first, as the old instructions on the website said, and we nearly missed the start. Highly recommended! Two of my colleagues also joined the Sunday workshop and called it the highlight of the trip.',
    questions: [
      {
        text: 'Who most likely led the walk that Henrik S. reviewed?',
        options: [
          'Lucía Ferrer',
          'Álvaro',
          'Tobias Lindqvist',
          'A stallholder at the market',
        ],
        answer: 1,
        explanationVi:
          'Bài đánh giá: Henrik đi cùng 9 đồng nghiệp (tổng 10 người) trong chuyến công tác, ở chợ, nhắc đến điểm hẹn cũ là quầy vé. Email: nhóm 10 người của ông Lindqvist đi tour chợ do Álvaro dẫn → (B). Cô Ferrer chỉ lo đặt chỗ (A); ông Lindqvist là người đặt tour (C).',
        translationVi: 'Ai có lẽ đã dẫn chuyến đi bộ mà Henrik S. đánh giá?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'How much did Mr. Lindqvist’s group most likely pay per person for the walk on 16 May?',
        options: ['€36.00', '€38.40', '€40.80', '€48.00'],
        answer: 2,
        explanationVi:
          'Email: tour buổi sáng thứ Sáu ở chợ, 10 người, đã áp dụng giảm giá nhóm. Lịch: Central Market Morning (thứ Sáu, 9:30) giá €48; nhóm từ 8 người giảm 15% → €48 × 0,85 = €40,80 (C). (D) chưa trừ giảm giá; (A) giảm nhầm 25% (đó là phụ phí tour riêng).',
        translationVi:
          'Nhóm của ông Lindqvist có lẽ đã trả bao nhiêu mỗi người cho chuyến đi ngày 16/5?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'Which activity did Ms. Ferrer suggest for the two colleagues arriving late?',
        options: [
          'Old Town Tapas Walk',
          'Central Market Morning',
          'Paella Workshop & Garden Lunch',
          'Ruzafa Coffee & Pastry Trail',
        ],
        answer: 2,
        explanationVi:
          'Email: gợi ý "our weekend workshop" trước khi nhóm bay về tối Chủ nhật. Lịch: chỉ Paella Workshop có tên workshop và diễn ra Chủ nhật (11:00, 4 tiếng) → (C). Bài đánh giá cũng xác nhận hai đồng nghiệp đã tham gia "the Sunday workshop".',
        translationVi:
          'Cô Ferrer đã gợi ý hoạt động nào cho hai đồng nghiệp đến muộn?',
        skillTags: ['comprehension.cross-reference'],
      },
      {
        text: 'What is implied about the problem mentioned in the review?',
        options: [
          'It was caused by a guide who arrived late.',
          'It happened during the Sunday workshop.',
          'It led to a partial refund for the group.',
          'It could have been avoided with information in Ms. Ferrer’s e-mail.',
        ],
        answer: 3,
        explanationVi:
          'Bài đánh giá: hai người đến quầy vé theo hướng dẫn cũ nên suýt lỡ giờ. Email: cô Ferrer đã báo điểm hẹn là chiếc đồng hồ ngoài cổng chính, "not the ticket office" → nếu đọc email thì tránh được (D). Không có chi tiết hướng dẫn viên đến trễ hay hoàn tiền (A, C sai).',
        translationVi:
          'Điều gì được ngụ ý về vấn đề được nêu trong bài đánh giá?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'In the e-mail, the word "release" in paragraph 2 is closest in meaning to',
        options: ['publish', 'make available', 'reduce', 'confirm'],
        answer: 1,
        explanationVi:
          '"I have provisionally held two places, which I will release on 9 May" = sẽ nhả chỗ đang giữ cho người khác đặt → "make available" (B). "publish" là nghĩa "phát hành" (release a film/book), không hợp; "confirm" ngược ý.',
        translationVi: 'Trong email, từ "release" ở đoạn 2 gần nghĩa nhất với',
        skillTags: ['comprehension.vocab-in-context'],
      },
    ],
  },
]
