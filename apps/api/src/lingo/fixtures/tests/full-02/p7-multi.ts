/** Full Test 02, Part 7 Multi: written for Lingo (not from ETS). */
export const P7_MULTI: object[] = [
  {
    difficulty: 'MEDIUM',
    topic: 'Hospitality',
    passage:
      'From: Priya Ramaswamy <p.ramaswamy@northgateinsurance.ca>\nTo: groups@kestrelpointlodge.ca\nDate: 2 September\nSubject: Training retreat, 14–17 October\n\nHello,\n\nNorthgate Insurance is planning a three-night training retreat for 18 of our claims advisers, arriving on 14 October and leaving on 17 October. Each participant will need a single room. We will also need a meeting room for about 20 people, since two trainers will join the sessions during the day, although they will be staying elsewhere. A projector would be essential.\n\nFour of our advisers follow a vegetarian diet, and one participant uses a wheelchair, so an accessible room is required. Finally, could you tell me whether the lodge offers transport from Toronto Pearson Airport? Several of our staff will be flying in from Winnipeg.\n\nKind regards,\nPriya Ramaswamy\nTraining Coordinator, Northgate Insurance\n---\nFrom: Tomás Becker <groups@kestrelpointlodge.ca>\nTo: Priya Ramaswamy <p.ramaswamy@northgateinsurance.ca>\nDate: 3 September\nSubject: RE: Training retreat, 14–17 October\n\nDear Ms. Ramaswamy,\n\nThank you for considering Kestrel Point Lodge. For groups reserving 15 or more rooms, our standard lake-view rooms are offered at C$189 per night instead of the usual C$229. Our Birch Room seats up to 24 and is fully equipped for presentations; for groups booking at least 10 rooms, use of its projector and screen is included at no extra charge.\n\nOur kitchen is happy to prepare vegetarian meals, and one of our two ground-floor accessible rooms is available for all three nights. As for transport, the lodge does not run its own airport service. However, our partner Northway Coaches departs from Toronto Pearson daily at 1:00 P.M. and costs C$65 per person; seats must be reserved at least seven days in advance.\n\nI can hold the rooms for you until 19 September. To confirm the booking, a deposit of 20 percent of the room total is required by that date.\n\nWarm regards,\nTomás Becker\nGroup Sales, Kestrel Point Lodge',
    questions: [
      {
        text: 'Why did Ms. Ramaswamy write the first e-mail?',
        options: [
          'To confirm a reservation she made by telephone',
          'To ask about arrangements for a group stay',
          'To complain about a previous visit to the lodge',
          'To request the return of a deposit',
        ],
        answer: 1,
        explanationVi:
          'Email 1: cô Ramaswamy hỏi về phòng đơn cho 18 người, phòng họp, suất chay, phòng cho xe lăn và xe đưa đón → hỏi về việc sắp xếp cho đoàn (B). Chưa có đặt phòng hay tiền cọc nào (A, D sai).',
        translationVi: 'Vì sao cô Ramaswamy viết email thứ nhất?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'How much will Northgate Insurance most likely pay per room per night?',
        options: ['C$65', 'C$229', 'C$189', 'C$209'],
        answer: 2,
        explanationVi:
          'Email 1: 18 người, mỗi người một phòng đơn → 18 phòng. Email 2: nhóm đặt từ 15 phòng trở lên được giá C$189 thay vì C$229 → (C). C$65 là giá xe buýt mỗi người.',
        translationVi:
          'Northgate Insurance có lẽ sẽ trả bao nhiêu cho mỗi phòng mỗi đêm?',
        skillTags: ['comprehension.cross-reference', 'comprehension.detail'],
      },
      {
        text: 'What is suggested about the projector in the Birch Room?',
        options: [
          'It will be available to Northgate Insurance free of charge.',
          'It must be reserved at least seven days in advance.',
          'It can be used only on 15 October.',
          'It is too small for a group of 20 people.',
        ],
        answer: 0,
        explanationVi:
          'Email 2: nhóm đặt ít nhất 10 phòng được dùng máy chiếu miễn phí. Email 1: Northgate cần 18 phòng → máy chiếu miễn phí (A). "Seven days in advance" là quy định đặt chỗ xe buýt (B sai).',
        translationVi: 'Điều gì được gợi ý về máy chiếu ở Birch Room?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'What does Mr. Becker NOT mention in his e-mail?',
        options: [
          'Meals for guests with special diets',
          'A room suitable for a wheelchair user',
          'A payment needed to secure the booking',
          'Parking for guests arriving by car',
        ],
        answer: 3,
        explanationVi:
          'Email 2 có nhắc suất chay (A), phòng tiếp cận cho xe lăn (B), tiền cọc 20% (C); không hề nói đến chỗ đỗ xe → (D).',
        translationVi: 'Ông Becker KHÔNG nhắc đến điều gì trong email?',
        skillTags: ['comprehension.not-true'],
      },
      {
        text: 'In the second e-mail, the word "hold" in paragraph 3 is closest in meaning to',
        options: ['delay', 'reserve', 'grip', 'contain'],
        answer: 1,
        explanationVi:
          '"I can hold the rooms for you until 19 September" = giữ phòng cho đến ngày 19/9 → "reserve" (B). "grip" (nắm chặt) và "contain" (chứa) là nghĩa khác của hold, không hợp ngữ cảnh.',
        translationVi:
          'Trong email thứ hai, từ "hold" ở đoạn 3 gần nghĩa nhất với',
        skillTags: ['comprehension.vocab-in-context'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Publishing',
    passage:
      'HALDEN & ROOK PUBLISHING — Proposals Wanted\n\nOur Practical Trades series offers clear, hands-on guides to traditional crafts, from beekeeping to furniture restoration. We are now accepting proposals for new titles from 1 February to 31 March.\n\nEach proposal should include a summary of no more than two pages, a full table of contents, two sample chapters and a short biography of the author. Finished manuscripts in the series run between 45,000 and 60,000 words.\n\nAuthors whose proposals are accepted receive an advance of £3,000, paid in two equal parts: the first when the signed contract is received and the second when the final manuscript is delivered. Because most titles are illustrated, authors are responsible for supplying photographs, but we will contribute up to £500 toward professional photography.\n\nPlease submit proposals through our online portal at haldenrook.co.uk/proposals. Proposals sent by post or e-mail will not be considered. Decisions are made within ten weeks of the closing date.\n---\nFrom: Fenella Marsh <f.marsh@haldenrook.co.uk>\nTo: Owain Pritchard <owain.pritchard@stonecraft.wales>\nDate: 2 June\nSubject: The Dry-Stone Wall Handbook\n\nDear Mr. Pritchard,\n\nI am delighted to tell you that our editorial board has approved your proposal for The Dry-Stone Wall Handbook. Everyone was impressed by your sample chapters, particularly the one on repairing collapsed sections.\n\nThere is one condition. Your proposal estimates a length of 72,000 words, which is more than the series allows, so we will need you to bring the manuscript within our limit. I suggest combining the two chapters on tools, which overlap considerably.\n\nYou also mentioned that a photographer you have worked with before would charge £800 for the pictures. That figure seems reasonable to us, and we will make our full contribution toward it.\n\nThe contract will reach you by courier this week. Please return a signed copy by 20 June; the first part of your advance will be paid within 30 days of our receiving it. The final manuscript will be due on 1 March next year.\n\nWith best wishes,\nFenella Marsh\nSenior Editor, Halden & Rook Publishing',
    questions: [
      {
        text: 'According to the notice, what is required of anyone submitting a proposal?',
        options: [
          'They must have published a book before.',
          'They must send a printed copy by post.',
          'They must include a complete manuscript.',
          'They must use the publisher’s Web site.',
        ],
        answer: 3,
        explanationVi:
          'Thông báo: "Please submit proposals through our online portal… Proposals sent by post or e-mail will not be considered" → phải nộp qua cổng trực tuyến (D). Chỉ cần hai chương mẫu, không cần bản thảo đầy đủ (C sai).',
        translationVi:
          'Theo thông báo, người gửi đề xuất bắt buộc phải làm gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'By at least how many words must Mr. Pritchard shorten his book?',
        options: ['12,000', '15,000', '27,000', '45,000'],
        answer: 0,
        explanationVi:
          'Email: sách dự kiến 72.000 từ, vượt giới hạn. Thông báo: bản thảo của bộ sách tối đa 60.000 từ → phải cắt ít nhất 72.000 − 60.000 = 12.000 từ (A). 27.000 là bẫy nếu lấy mức tối thiểu 45.000.',
        translationVi:
          'Ông Pritchard phải rút ngắn cuốn sách ít nhất bao nhiêu từ?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'How much will Mr. Pritchard most likely pay himself for the photographs?',
        options: ['£0', '£500', '£300', '£800'],
        answer: 2,
        explanationVi:
          'Email: nhiếp ảnh gia tính £800 và nhà xuất bản sẽ đóng góp "full contribution". Thông báo: mức đóng góp tối đa £500 → ông tự trả £800 − £500 = £300 (C).',
        translationVi:
          'Ông Pritchard có lẽ sẽ tự trả bao nhiêu cho phần ảnh chụp?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'What will Mr. Pritchard receive within 30 days of Halden & Rook getting his signed contract?',
        options: ['£500', '£1,500', '£3,000', '£3,500'],
        answer: 1,
        explanationVi:
          'Email: phần đầu của tiền ứng trước trả trong 30 ngày sau khi nhận hợp đồng ký. Thông báo: tiền ứng £3.000 chia hai phần bằng nhau → £1.500 (B).',
        translationVi:
          'Ông Pritchard sẽ nhận được gì trong vòng 30 ngày sau khi Halden & Rook nhận hợp đồng đã ký?',
        skillTags: ['comprehension.cross-reference', 'comprehension.detail'],
      },
      {
        text: 'In the e-mail, the word "figure" in paragraph 3 is closest in meaning to',
        options: ['amount', 'shape', 'person', 'diagram'],
        answer: 0,
        explanationVi:
          '"That figure seems reasonable" chỉ con số £800 vừa nêu → "amount" (A). "shape", "person", "diagram" là các nghĩa khác của figure, không hợp ngữ cảnh.',
        translationVi: 'Trong email, từ "figure" ở đoạn 3 gần nghĩa nhất với',
        skillTags: ['comprehension.vocab-in-context'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Logistics',
    passage:
      'CORELLA COURIERS — Business Rates, Adelaide (effective 1 July)\n\nZone 1 = city centre | Zone 2 = inner suburbs | Zone 3 = outer suburbs\n\nExpress (delivered within 2 hours): Zone 1 $28 | Zone 2 $36 | Zone 3 $49\nSame Day (delivered by 5:00 P.M. if booked before 12:00 noon): Zone 1 $16 | Zone 2 $21 | Zone 3 $30\nOvernight (delivered by 10:00 A.M. the next business day): Zone 1 $11 | Zone 2 $14 | Zone 3 $19\n\n• Parcels over 20 kg: add $12.\n• Saturday deliveries: Express only, add $15.\n• Account holders sending 40 or more parcels per month receive 10% off all rates.\n---\nFrom: Leanne Fitzgerald <leanne@oakridgeprint.com.au>\nTo: service@corellacouriers.com.au\nDate: 8 August\nSubject: Late delivery, booking CC-55821\n\nHello,\n\nOn 5 August at 11:40 A.M., I booked a Same Day delivery for a box of printed brochures (about 8 kg) to our client at 42 Gilbert Street, Norwood, an address your Web site lists as Zone 2. The client needed the brochures for a trade show the following morning. The box did not arrive until 9:15 A.M. on 6 August, and the client had to set up the stand without them. I would like the charge for this delivery refunded.\n\nOn a separate matter, I understand that you offer better rates to businesses that use your service regularly. Oakridge Print Studio sends roughly 50 parcels a month. Could someone contact me about this?\n\nLeanne Fitzgerald\nOffice Manager, Oakridge Print Studio\n---\nCorella Couriers — Customer Reviews\n★★★★★ Posted 20 August by L. Fitzgerald, Oakridge Print Studio\n\nI was ready to switch couriers after a same-day parcel turned up a day late earlier this month. But the customer service manager, Hamid Rahimi, phoned me the morning after I wrote, apologised, and refunded the charge in full. The whole matter was settled within two days.\n\nWhile we were talking, he also opened a business account for us, and the savings add up: our overnight parcels to clients in the city centre now cost just $9.90 each. The drivers are friendly and always call ahead. Highly recommended.',
    questions: [
      {
        text: 'Why did Ms. Fitzgerald write the e-mail?',
        options: [
          'To book a Saturday delivery',
          'To change the address of a delivery',
          'To report a delayed delivery and request a refund',
          'To thank a driver for his help',
        ],
        answer: 2,
        explanationVi:
          'Email: thùng hàng đặt Same Day ngày 5/8 nhưng 9:15 sáng 6/8 mới đến, cô muốn được hoàn phí → báo giao trễ và xin hoàn tiền (C).',
        translationVi: 'Vì sao cô Fitzgerald viết email?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'How much was Ms. Fitzgerald most likely charged for the delivery on 5 August?',
        options: ['$16', '$21', '$33', '$36'],
        answer: 1,
        explanationVi:
          'Email: dịch vụ Same Day, địa chỉ thuộc Zone 2, thùng khoảng 8 kg. Bảng giá: Same Day Zone 2 = $21; phụ phí $12 chỉ áp dụng cho hàng trên 20 kg → (B). $33 là bẫy nếu cộng phụ phí; $36 là giá Express.',
        translationVi:
          'Cô Fitzgerald có lẽ bị tính bao nhiêu cho lần giao hàng ngày 5/8?',
        skillTags: ['comprehension.cross-reference', 'comprehension.detail'],
      },
      {
        text: 'What is indicated about the parcel sent on 5 August?',
        options: [
          'It weighed more than the standard limit.',
          'It was sent to an address in the city centre.',
          'It was sent using the Express service.',
          'It was booked early enough for delivery that day.',
        ],
        answer: 3,
        explanationVi:
          'Email: đặt lúc 11:40 sáng. Bảng giá: Same Day giao trước 5 giờ chiều nếu đặt trước 12 giờ trưa → lẽ ra phải giao trong ngày (D). Địa chỉ ở Zone 2 (inner suburbs), không phải trung tâm (B sai).',
        translationVi: 'Điều gì được nêu về kiện hàng gửi ngày 5/8?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'Why does Oakridge Print Studio most likely pay $9.90 for some deliveries?',
        options: [
          'It has an account and sends more than 40 parcels a month.',
          'It received a voucher after the late delivery.',
          'Corella Couriers lowered its Zone 1 prices on 1 July.',
          'Its parcels are always booked before noon.',
        ],
        answer: 0,
        explanationVi:
          'Bài đánh giá: đã mở tài khoản doanh nghiệp, gửi hàng qua đêm vào trung tâm (Zone 1) giá $9,90. Email: khoảng 50 kiện/tháng. Bảng giá: Overnight Zone 1 = $11, tài khoản từ 40 kiện/tháng giảm 10% → $11 × 0,9 = $9,90 (A).',
        translationVi:
          'Vì sao Oakridge Print Studio có lẽ trả $9,90 cho một số lần giao hàng?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'In the review, the word "settled" in paragraph 1 is closest in meaning to',
        options: ['paid', 'moved', 'resolved', 'calmed'],
        answer: 2,
        explanationVi:
          '"The whole matter was settled within two days" = toàn bộ vấn đề được giải quyết trong hai ngày → "resolved" (C). "paid" là nghĩa của settle a bill, không hợp với "matter".',
        translationVi:
          'Trong bài đánh giá, từ "settled" ở đoạn 1 gần nghĩa nhất với',
        skillTags: ['comprehension.vocab-in-context'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Healthcare',
    passage:
      'CARROW VALLEY COURIER — 12 March\n\nPinehurst Family Health Centre will introduce an online booking and check-in system, CareDesk, on 1 April. Patients will be able to book and cancel appointments online and check in on arrival at a touch-screen kiosk instead of queuing at the front desk.\n\n“Our phone lines are busiest between 8 and 9 in the morning, and many patients simply cannot get through,” said practice manager Joanne Whitlock. “CareDesk will free our reception staff to help the people who need them most.” Ms. Whitlock added that patients aged 75 and over will continue to have a dedicated telephone line for appointments.\n\nThe system was tested last autumn at the centre’s smaller Ferndale branch, where the time patients spent waiting at the desk fell by about a third.\n---\nPinehurst Family Health Centre — Using CareDesk\n\nRegistering: You will need your patient number (printed on your registration letter) and your date of birth.\n\nWhat you can book online: routine GP consultations (15 minutes), blood tests with a nurse, and flu vaccinations.\nWhat you cannot book online: minor surgery and travel vaccinations. Travel vaccinations require a telephone consultation with a nurse first; please call reception.\n\nCancelling: Appointments may be cancelled online up to two hours before the start time. After that, please call us. Patients who miss two appointments in twelve months without notice will have online booking suspended for three months.\n\nChecking in: The kiosk accepts check-ins from ten minutes before your appointment time. Please do not arrive earlier.\n\nPatients aged 75 and over: call 01632 960 447, Monday to Friday, 8:00 A.M.–6:00 P.M.\n---\nPinehurst Family Health Centre — Patient Feedback Form\n\nName: Marisol Teague\nDate of visit: 22 April\nOverall rating (1–5): 3\n\nComments: I tried to book my injections for a trip to Kenya through CareDesk, but I could not find them anywhere on the list and finally had to phone. On the day of my blood test, I got to the centre about 25 minutes before my appointment because of light traffic, and the kiosk would not let me check in. The receptionist sorted it out quickly, but a clearer message on the screen would help.\n\nQuestion: My father is 81 and does not use a computer. Will he still be able to make appointments?',
    questions: [
      {
        text: 'What is the main purpose of the article?',
        options: [
          'To report a change in how patients arrange appointments',
          'To announce the opening of a new branch',
          'To introduce a recently hired practice manager',
          'To explain why a health centre is raising its fees',
        ],
        answer: 0,
        explanationVi:
          'Bài báo: trung tâm sẽ dùng hệ thống CareDesk để đặt lịch và check-in trực tuyến từ 1/4 → thay đổi cách bệnh nhân đặt lịch khám (A). Chi nhánh Ferndale đã có từ trước (B sai).',
        translationVi: 'Mục đích chính của bài báo là gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'According to the article, what is true about the Ferndale branch?',
        options: [
          'It will close when CareDesk is introduced.',
          'It is larger than the main health centre.',
          'It has the longest telephone waiting times.',
          'It used the new system on a trial basis.',
        ],
        answer: 3,
        explanationVi:
          'Bài báo: "The system was tested last autumn at the centre’s smaller Ferndale branch" → đã thử nghiệm hệ thống (D). Ferndale là chi nhánh nhỏ hơn (B sai).',
        translationVi: 'Theo bài báo, điều gì đúng về chi nhánh Ferndale?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Why was Ms. Teague most likely unable to book her injections online?',
        options: [
          'She did not have her patient number.',
          'That type of appointment requires a phone consultation first.',
          'Her online booking had been suspended.',
          'She tried to book less than two hours in advance.',
        ],
        answer: 1,
        explanationVi:
          'Phiếu góp ý: cô muốn tiêm cho chuyến đi Kenya → tiêm phòng du lịch. Trang web: tiêm phòng du lịch không đặt online được, phải tư vấn qua điện thoại với y tá trước (B). Không có dấu hiệu cô bị khoá đặt lịch (C sai).',
        translationVi:
          'Vì sao cô Teague có lẽ không đặt được lịch tiêm trên mạng?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'Why did the kiosk most likely not accept Ms. Teague’s check-in?',
        options: [
          'She had not registered with CareDesk.',
          'The kiosk was not working that morning.',
          'She arrived earlier than the system allows.',
          'Blood tests must be checked in at the front desk.',
        ],
        answer: 2,
        explanationVi:
          'Phiếu góp ý: cô đến sớm khoảng 25 phút. Trang web: kiosk chỉ nhận check-in từ 10 phút trước giờ hẹn → cô đến quá sớm (C).',
        translationVi: 'Vì sao máy kiosk có lẽ không cho cô Teague check-in?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'What will Ms. Teague most likely be told about her father?',
        options: [
          'He must register for CareDesk before 1 April.',
          'He should make his appointments at the Ferndale branch.',
          'He may book minor surgery online.',
          'He can continue to arrange appointments by telephone.',
        ],
        answer: 3,
        explanationVi:
          'Phiếu góp ý: bố cô 81 tuổi, không dùng máy tính. Bài báo và trang web: bệnh nhân từ 75 tuổi trở lên vẫn có đường dây điện thoại riêng (01632 960 447) → (D).',
        translationVi: 'Cô Teague có lẽ sẽ được trả lời gì về bố mình?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Retail',
    passage:
      'PEMBERTON HOMEWARES WHOLESALE\nInvoice No. PH-22914 — Date: 3 November\nCustomer: Linden & Hart Gifts, 7 Quarry Road, Ballarat\nOrder reference: LH-0617\n\nCM-118 Ceramic mug, Fern pattern — 120 × $6.50 = $780.00\nTT-204 Linen tea towels, set of 2 — 80 × $9.25 = $740.00\nBC-310 Beeswax candle, large — 60 × $12.00 = $720.00\nSB-052 Bamboo serving board — 40 × $18.50 = $740.00\n\nSubtotal: $2,980.00\nTrade discount (5% on orders over $2,500): −$149.00\nShipping (free on orders over $2,000): $0.00\nTotal due: $2,831.00\n\nPayment due within 30 days of the invoice date. Damaged or incorrect goods must be reported within seven days of delivery, with photographs.\n---\nFrom: Dalia Merrin <buying@lindenhart.com.au>\nTo: Russell Tan <accounts@pembertonwholesale.com.au>\nDate: 7 November\nSubject: Order LH-0617\n\nDear Mr. Tan,\n\nOur order arrived on 5 November, but there are two problems. First, 14 of the mugs were chipped; photographs are attached. We would prefer a credit rather than replacements, as our holiday window display goes up on 15 November and new stock is unlikely to reach us in time.\n\nSecond, we received 60 small beeswax candles instead of the large ones we ordered. We are willing to keep them if the price is adjusted to the $8.00 listed for small candles in your catalogue.\n\nWe will pay the balance as soon as we receive a revised invoice.\n\nRegards,\nDalia Merrin\nBuyer, Linden & Hart Gifts\n---\nMEMO\nTo: Warehouse team\nFrom: Russell Tan, Accounts\nDate: 10 November\nSubject: Recent packing errors\n\nA retail customer recently received small candles (BC-301) in place of large ones because the two products are stored side by side. Effective immediately, all small candles will be kept in Aisle 6. In addition, the latest mugs from our new supplier arrive with very little padding, so please double-wrap every ceramic item before it is boxed.\n\nThe customer has been credited for the damaged and incorrect items, and revised invoice PH-22914-R, showing $2,516.55 after the 5% trade discount, was sent this morning. Thank you for your care in preventing a repeat of these errors.',
    questions: [
      {
        text: 'What is suggested about Ms. Merrin’s report of the damaged mugs?',
        options: [
          'It was sent before the goods were delivered.',
          'It was made within the period stated on the invoice.',
          'It did not include any photographs.',
          'It was addressed to the warehouse team.',
        ],
        answer: 1,
        explanationVi:
          'Hoá đơn: hàng hỏng phải báo trong 7 ngày kể từ khi giao, kèm ảnh. Email: hàng đến 5/11, cô viết ngày 7/11 và có đính kèm ảnh → báo trong thời hạn (B).',
        translationVi:
          'Điều gì được gợi ý về việc cô Merrin báo cáo những chiếc cốc bị hỏng?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'Why does Ms. Merrin prefer a credit to replacement mugs?',
        options: [
          'Replacements might not arrive before a display is set up.',
          'The Fern pattern is no longer being made.',
          'She plans to order mugs from a different supplier.',
          'Her shop has too many mugs in stock.',
        ],
        answer: 0,
        explanationVi:
          'Email: "our holiday window display goes up on 15 November and new stock is unlikely to reach us in time" → hàng thay thế có thể không kịp trước khi trưng bày (A).',
        translationVi:
          'Vì sao cô Merrin muốn được ghi có thay vì nhận cốc thay thế?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What product code did Linden & Hart Gifts actually receive in place of BC-310?',
        options: ['CM-118', 'TT-204', 'BC-301', 'SB-052'],
        answer: 2,
        explanationVi:
          'Email: nhận 60 nến nhỏ thay vì nến lớn (BC-310 trên hoá đơn). Bản ghi nhớ: khách nhận "small candles (BC-301) in place of large ones" → (C).',
        translationVi:
          'Linden & Hart Gifts thực tế đã nhận mã sản phẩm nào thay cho BC-310?',
        skillTags: ['comprehension.cross-reference', 'comprehension.detail'],
      },
      {
        text: 'Why was a trade discount most likely still applied on the revised invoice?',
        options: [
          'Ms. Merrin paid within 30 days.',
          'Pemberton wanted to apologize for its errors.',
          'The order still qualified for free shipping.',
          'The adjusted subtotal remained above $2,500.',
        ],
        answer: 3,
        explanationVi:
          'Hoá đơn: chiết khấu 5% cho đơn trên $2.500. Email: trừ 14 cốc (14 × $6,50 = $91) và giảm giá nến (60 × $4 = $240) → $2.980 − $331 = $2.649, vẫn trên $2.500. Bản ghi nhớ: hoá đơn mới $2.516,55 = $2.649 − 5% → (D).',
        translationVi:
          'Vì sao hoá đơn sửa đổi có lẽ vẫn được áp dụng chiết khấu thương mại?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'What is NOT mentioned in the memo?',
        options: [
          'Moving some products to a different aisle',
          'Hiring extra workers for the holiday season',
          'Adding more protection to fragile items',
          'Sending a corrected bill to a customer',
        ],
        answer: 1,
        explanationVi:
          'Bản ghi nhớ có nói chuyển nến nhỏ sang Aisle 6 (A), bọc hai lớp đồ gốm (C), gửi hoá đơn sửa đổi (D); không hề nói đến tuyển thêm nhân viên → (B).',
        translationVi: 'Điều gì KHÔNG được nhắc đến trong bản ghi nhớ?',
        skillTags: ['comprehension.not-true'],
      },
    ],
  },
]
