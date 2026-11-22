/** Full Test 04, Part 7 Single: written for Lingo (not from ETS). */
export const P7_SINGLE: object[] = [
  {
    difficulty: 'EASY',
    topic: 'Real estate',
    passage:
      'Marisol Quintero [9:02 A.M.]\nHi Declan, I’m at 41 Arden Lane for the 9:30 viewing, but the lockbox code you sent me isn’t working.\n\nDeclan Hartigan [9:05 A.M.]\nThe owners must have changed it over the weekend. Let me call them.\n\nMarisol Quintero [9:06 A.M.]\nPlease hurry. The buyers are already parked across the street.\n\nDeclan Hartigan [9:11 A.M.]\nThe owners aren’t answering. But Mrs. Pell at number 43 keeps a spare key for them.\n\nMarisol Quintero [9:12 A.M.]\nI’m on my way over.\n\nDeclan Hartigan [9:13 A.M.]\nTell her I sent you. I’ll text you the new code as soon as I hear back from the owners.',
    questions: [
      {
        text: 'Why did Ms. Quintero contact Mr. Hartigan?',
        options: [
          'She is going to be late for a viewing.',
          'She cannot find the address of a property.',
          'She is unable to open a lockbox.',
          'She wants to reschedule a meeting with buyers.',
        ],
        answer: 2,
        explanationVi:
          '"the lockbox code you sent me isn’t working" → cô không mở được hộp khoá (C). Cô đã có mặt ở địa chỉ trước giờ xem nhà, nên (A), (B) sai.',
        translationVi: 'Vì sao cô Quintero liên lạc với anh Hartigan?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'At 9:12 A.M., what does Ms. Quintero most likely mean when she writes, "I’m on my way over"?',
        options: [
          'She will go to get a key from a neighbor.',
          'She will meet the buyers across the street.',
          'She will drive to the owners’ new home.',
          'She will return to her office.',
        ],
        answer: 0,
        explanationVi:
          'Ngay trước đó anh Hartigan viết "Mrs. Pell at number 43 keeps a spare key" → cô sẽ sang nhà hàng xóm số 43 lấy chìa khoá dự phòng (A).',
        translationVi:
          'Lúc 9:12 sáng, cô Quintero nhiều khả năng có ý gì khi viết "I’m on my way over"?',
        skillTags: ['comprehension.speaker-intent'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Fitness',
    passage:
      'BRAMLEY LEISURE CENTRE\nPool Closure Notice\n\nThe main pool will be closed from Monday, 6 May, to Sunday, 12 May, while new lighting is installed. The learner pool and the gym will remain open as usual.\n\nDuring the closure, members with a swimming-only membership may use the learner pool during adult lane sessions (7:00–9:00 A.M. daily). Alternatively, they may have one week added to the end of their membership at no charge. To request the extra week, please speak to a member of staff at reception before 31 May.\n\nWe apologise for any inconvenience.',
    questions: [
      {
        text: 'Why will the main pool be closed?',
        options: [
          'The water is being changed.',
          'Swimming lessons are taking place.',
          'The gym is being expanded.',
          'New lights are being put in.',
        ],
        answer: 3,
        explanationVi:
          '"while new lighting is installed" → lắp đèn mới (D). Phòng gym vẫn mở như bình thường, không mở rộng (C).',
        translationVi: 'Vì sao hồ bơi chính sẽ đóng cửa?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What can swimming-only members ask for at reception?',
        options: [
          'A refund for the week',
          'A longer membership',
          'A free gym session',
          'A private swimming lesson',
        ],
        answer: 1,
        explanationVi:
          '"have one week added to the end of their membership… speak to a member of staff at reception" → gia hạn thêm một tuần (B). Thông báo không nhắc hoàn tiền (A).',
        translationVi:
          'Hội viên chỉ đăng ký bơi có thể yêu cầu điều gì ở quầy lễ tân?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Printing',
    passage:
      'INVOICE No. 5871\nPressfield Print Studio\n22 Calder Road, Leeds\n\nBill to: Jun Watanabe, Copper Kettle Café, 8 Mill Lane, Leeds\nDate: 14 March\n\nMenu cards, A4, laminated (×60) — £84.00\nTable tents, double-sided (×40) — £36.00\nDesign changes (1 hour) — £25.00\nRush delivery (48 hours) — £18.00\nSubtotal — £163.00\nLess 10% returning-customer discount — –£16.30\nTotal due — £146.70\n\nPayment is due within 21 days. Please note that the rush delivery fee was added because the final artwork reached us two days after the agreed date, and we were asked to keep the original delivery date. Questions about this invoice may be sent to accounts@pressfieldprint.co.uk.',
    questions: [
      {
        text: 'What is suggested about the Copper Kettle Café?',
        options: [
          'It has placed an order with Pressfield before.',
          'It paid for its order in advance.',
          'It designed its own table tents.',
          'It recently moved to Mill Lane.',
        ],
        answer: 0,
        explanationVi:
          'Hoá đơn có "10% returning-customer discount" (giảm giá cho khách quay lại) → quán đã từng đặt hàng ở Pressfield (A). Hoá đơn còn "Total due… within 21 days" nên chưa trả trước (B sai).',
        translationVi: 'Điều gì được gợi ý về quán Copper Kettle Café?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'Why was the rush delivery fee charged?',
        options: [
          'The café asked for extra menu cards.',
          'The order was sent to the wrong address.',
          'The artwork was submitted late.',
          'The design required more than one hour of changes.',
        ],
        answer: 2,
        explanationVi:
          '"the final artwork reached us two days after the agreed date, and we were asked to keep the original delivery date" → bản thiết kế gửi trễ (C). Chỉnh sửa thiết kế là 1 giờ, tính riêng £25 (D sai).',
        translationVi: 'Vì sao phí giao hàng gấp bị tính?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'IT',
    passage:
      'From: IT Service Desk <servicedesk@velmont-eng.com>\nTo: All staff\nDate: 27 October\nSubject: KeyVault rollout\n\nDear colleagues,\n\nStarting Monday, 3 November, Velmont will replace the shared spreadsheet that some teams use to store passwords with KeyVault, a secure password manager. Departments will move over on different days, and your manager will tell you which day applies to your team.\n\nOn your team’s day, you will receive an e-mail containing a link to set up your account. Please complete the setup within 48 hours; links that are not used within that time expire, and a new one can only be issued by the Service Desk. Once your team’s passwords have been transferred, the spreadsheet will be deleted, so please check before then that any passwords you added to it yourself are up to date.\n\nA 20-minute video guide is available on the intranet under "IT Help." Staff who prefer in-person help can attend a drop-in session in Meeting Room 4 on Wednesdays from 2:00 to 4:00 P.M. throughout November.\n\nIT Service Desk',
    questions: [
      {
        text: 'What is the purpose of the e-mail?',
        options: [
          'To ask staff to choose stronger passwords',
          'To explain a change in how passwords will be stored',
          'To report that a spreadsheet was deleted by mistake',
          'To invite staff to a training course on spreadsheets',
        ],
        answer: 1,
        explanationVi:
          '"Velmont will replace the shared spreadsheet… with KeyVault, a secure password manager" → giải thích thay đổi cách lưu mật khẩu (B). Bảng tính chỉ bị xoá sau khi chuyển xong, không phải do nhầm lẫn (C).',
        translationVi: 'Mục đích của email là gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What are staff asked to do before their team’s passwords are transferred?',
        options: [
          'Watch a video guide on the intranet',
          'Tell their manager which day suits them',
          'Attend a session in Meeting Room 4',
          'Make sure the details they entered are correct',
        ],
        answer: 3,
        explanationVi:
          '"please check before then that any passwords you added to it yourself are up to date" → kiểm tra thông tin mình đã nhập còn đúng (D). Video và buổi hỗ trợ chỉ là tuỳ chọn (A, C); quản lý sẽ thông báo ngày, nhân viên không chọn (B).',
        translationVi:
          'Nhân viên được yêu cầu làm gì trước khi mật khẩu của nhóm được chuyển đi?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What is indicated about the setup link?',
        options: [
          'It will be sent by each department manager.',
          'It can be used to set up several accounts.',
          'It will stop working if it is not used within two days.',
          'It will be available on the intranet from 3 November.',
        ],
        answer: 2,
        explanationVi:
          '"links that are not used within that time (48 hours) expire" → đường link hết hạn sau hai ngày nếu không dùng (C). Link được gửi qua email chứ không do quản lý gửi (A).',
        translationVi: 'Điều gì được nêu về đường link thiết lập tài khoản?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Business services',
    passage:
      'THE LOOM WORKS — Flexible Workspace in Riverside\n\nHot desk — £180/month\nUse any free desk, Monday–Friday, 8:00 A.M.–7:00 P.M.\n\nFixed desk — £260/month\nYour own desk with a lockable cabinet, available 24 hours a day, seven days a week.\n\nPrivate studio (2–4 people) — from £720/month\nIncludes 10 hours of meeting-room use per month.\n\nAll memberships include high-speed Wi-Fi, unlimited tea and coffee and use of our roof terrace. Meeting rooms can be booked at £15 per hour; private studio members pay nothing until their monthly hours have been used up. Mail handling is available to any member for £20 per month.\n\nSign up for three months or more before 30 April, and your first month is half price. Book a tour at theloomworks.co.uk.',
    questions: [
      {
        text: 'What is NOT included in every membership?',
        options: [
          'Internet access',
          'Hot drinks',
          'Handling of post',
          'Access to an outdoor area',
        ],
        answer: 2,
        explanationVi:
          'Mọi gói đều có Wi-Fi (A), trà và cà phê (B), sân thượng (D). Dịch vụ nhận thư phải trả thêm £20/tháng → không bao gồm (C).',
        translationVi: 'Điều gì KHÔNG có trong mọi gói thành viên?',
        skillTags: ['comprehension.not-true'],
      },
      {
        text: 'What is an advantage of a fixed desk over a hot desk?',
        options: [
          'It comes with free meeting-room hours.',
          'It costs less per month.',
          'It can be shared by up to four people.',
          'It can be used at any time of day.',
        ],
        answer: 3,
        explanationVi:
          'Hot desk chỉ dùng thứ Hai–thứ Sáu 8:00–19:00, còn fixed desk "available 24 hours a day, seven days a week" → dùng bất cứ lúc nào (D). Giờ phòng họp miễn phí là của private studio (A); fixed desk đắt hơn (B sai).',
        translationVi: 'Bàn cố định có lợi thế gì so với bàn dùng chung?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'How can new members receive a discount?',
        options: [
          'By committing to at least three months',
          'By booking a tour online',
          'By paying for a year in advance',
          'By bringing a colleague to the workspace',
        ],
        answer: 0,
        explanationVi:
          '"Sign up for three months or more before 30 April, and your first month is half price" → cam kết từ ba tháng trở lên (A). Đặt lịch tham quan không được giảm giá (B).',
        translationVi: 'Thành viên mới có thể được giảm giá bằng cách nào?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Research',
    passage:
      'MEMO\nTo: All laboratory staff, Ostrava Research Centre\nFrom: Helena Dvořák, Lab Operations Manager\nDate: 9 September\nRe: Freezer replacement\n\nThe three ultra-low-temperature freezers in Room B12 will be replaced on 23 and 24 September. The new units use about 40 percent less electricity, and because they are more compact, they will free up floor space for a second sample-preparation bench.\n\nAll samples must be moved to the temporary freezers in Room B7 by 5:00 P.M. on 22 September. Each research group should send one person to collect insulated transport boxes from the stores counter that day. Please do not move any samples earlier, as the temporary freezers are being tested until the morning of the 22nd.\n\nSamples still in B12 after the deadline will be moved by the operations team, but we cannot promise that they will be stored in their original order. Questions should be directed to Pavel Novák (ext. 214).',
    questions: [
      {
        text: 'What is one stated benefit of the new freezers?',
        options: [
          'They can be installed in a single day.',
          'They consume less power.',
          'They can reach lower temperatures.',
          'They come with insulated transport boxes.',
        ],
        answer: 1,
        explanationVi:
          '"The new units use about 40 percent less electricity" → tiêu thụ ít điện hơn (B). Việc thay mất hai ngày 23 và 24/9 (A sai); hộp cách nhiệt lấy ở quầy kho (D sai).',
        translationVi: 'Một lợi ích được nêu của tủ đông mới là gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Why should staff wait until 22 September to move samples?',
        options: [
          'The stores counter is closed until then.',
          'Room B12 will be cleaned beforehand.',
          'Mr. Novák must approve each move.',
          'The temporary freezers are still being checked.',
        ],
        answer: 3,
        explanationVi:
          '"the temporary freezers are being tested until the morning of the 22nd" → tủ tạm vẫn đang được kiểm tra (D). Anh Novák chỉ là người giải đáp thắc mắc (C).',
        translationVi: 'Vì sao nhân viên nên đợi đến ngày 22/9 mới chuyển mẫu?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What is implied about samples left in Room B12 after the deadline?',
        options: [
          'They will be thrown away.',
          'They will be returned to their research group.',
          'They may be harder for their owners to find.',
          'They will be placed in the new freezers first.',
        ],
        answer: 2,
        explanationVi:
          '"we cannot promise that they will be stored in their original order" → mẫu có thể bị xếp lộn, khó tìm hơn (C). Đội vận hành vẫn chuyển mẫu, không vứt bỏ (A).',
        translationVi:
          'Điều gì được ngụ ý về các mẫu còn để ở phòng B12 sau hạn chót?',
        skillTags: ['comprehension.inference'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Travel',
    passage:
      'Isle of Carrick Ferries — Frequently Asked Questions\n\nCan I change my booking?\nYes. Changes made more than 72 hours before departure are free of charge. After that, a fee of £12 applies to each change, and any difference in fare must also be paid. Bookings made on our Saver fares cannot be changed within 72 hours of departure, but they can be cancelled in exchange for a travel voucher worth 50 percent of the fare paid.\n\nWhat happens if my sailing is cancelled because of the weather?\nWe will transfer you to the next available sailing at no cost. If you decide not to travel, we will refund your fare in full; this applies to Saver fares as well. Please note that we are unable to pay for accommodation for passengers whose sailing is cancelled because of the weather, as this is outside our control.\n\nDo I need to arrive early?\nVehicles must check in at least 45 minutes before departure, and foot passengers at least 20 minutes before. Vehicles arriving after check-in has closed may be allowed to board only if space remains on the sailing.',
    questions: [
      {
        text: 'What is true about Saver fares?',
        options: [
          'They can be changed for £12 up to 24 hours before departure.',
          'They include accommodation if a sailing is cancelled.',
          'They are available to foot passengers only.',
          'They are fully refunded if bad weather cancels a sailing.',
        ],
        answer: 3,
        explanationVi:
          'Khi chuyến bị huỷ do thời tiết: "we will refund your fare in full; this applies to Saver fares as well" → (D). Vé Saver không được đổi trong vòng 72 giờ (A sai); hãng không chi trả chỗ ở (B sai).',
        translationVi: 'Điều gì đúng về vé Saver?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'A driver with a standard ticket wants to move to a later sailing two days before she travels. What will she have to pay?',
        options: [
          '£12 plus any increase in the fare',
          'Nothing, because she is changing in advance',
          '50 percent of her original fare',
          'The full price of a new ticket',
        ],
        answer: 0,
        explanationVi:
          'Hai ngày = 48 giờ, tức là trong vòng 72 giờ → mất phí £12 mỗi lần đổi "and any difference in fare must also be paid" (A). Chỉ đổi trước hơn 72 giờ mới miễn phí (B sai); 50% là giá trị voucher khi huỷ vé Saver (C).',
        translationVi:
          'Một tài xế có vé thường muốn đổi sang chuyến muộn hơn, hai ngày trước khi đi. Cô ấy sẽ phải trả gì?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'What is suggested about a car that arrives 30 minutes before departure?',
        options: [
          'It will be moved to the next sailing free of charge.',
          'It may not be allowed onto the ferry.',
          'Its driver will have to pay a late fee.',
          'It will be checked in with the foot passengers.',
        ],
        answer: 1,
        explanationVi:
          'Xe phải làm thủ tục trước ít nhất 45 phút; đến lúc 30 phút là trễ → "may be allowed to board only if space remains" → có thể không được lên phà (B). Không có phí trễ nào được nhắc (C).',
        translationVi:
          'Điều gì được gợi ý về một chiếc ô tô đến 30 phút trước giờ khởi hành?',
        skillTags: ['comprehension.inference'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Electronics',
    passage:
      'KORVIN ELECTRONICS — Repair Request\n\nCustomer: Ingrid Solheim\nProduct: Korvin AeroBook 14 laptop\nSerial number: KAB14-77310\nDate of purchase: 2 February (last year)\nStandard warranty: 12 months\nExtended warranty (KorvinCare, 3 years): Yes\n\nDescription of fault: The screen flickers and then goes dark whenever the laptop is opened beyond about 90 degrees. Everything works normally when it is connected to an external monitor. The laptop has not been dropped or exposed to liquid.\n\nPreferred service: Courier collection from home address\n\nFOR OFFICE USE ONLY\nReceived: 18 March\nTechnician: R. Abara\nDiagnosis: Display cable damaged at hinge.\nCovered by warranty: Yes (KorvinCare)\nReplacement cable ordered; expected 26 March.\nEstimated return to customer: 29 March.\nCustomer informed by telephone on 19 March.',
    questions: [
      {
        text: 'What is suggested about Ms. Solheim’s laptop?',
        options: [
          'Its standard warranty had already ended.',
          'It was bought from a Korvin store.',
          'It had been repaired once before.',
          'It was damaged by liquid.',
        ],
        answer: 0,
        explanationVi:
          'Mua ngày 2/2 năm ngoái, bảo hành tiêu chuẩn 12 tháng, nhận sửa ngày 18/3 năm nay → bảo hành tiêu chuẩn đã hết; máy được sửa nhờ gói KorvinCare (A). Khách khẳng định máy không dính nước (D sai).',
        translationVi: 'Điều gì được gợi ý về chiếc laptop của cô Solheim?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'According to the form, what did the technician find?',
        options: [
          'The screen needed to be replaced.',
          'A cable near the hinge was faulty.',
          'The external monitor was incompatible.',
          'The hinge had been bent in a fall.',
        ],
        answer: 1,
        explanationVi:
          '"Diagnosis: Display cable damaged at hinge" → dây cáp gần bản lề bị hỏng (B). Chỉ thay dây cáp chứ không thay màn hình (A); máy không bị rơi (D).',
        translationVi: 'Theo phiếu, kỹ thuật viên đã phát hiện điều gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What is NOT indicated on the form?',
        options: [
          'The fault does not affect an external display.',
          'Ms. Solheim will pick up the laptop from a store.',
          'A part was not in stock when the laptop arrived.',
          'Ms. Solheim was contacted by phone.',
        ],
        answer: 1,
        explanationVi:
          'Cô Solheim chọn "Courier collection from home address" → không tự đến cửa hàng lấy máy (B). (A) "works normally… external monitor", (C) cáp phải đặt hàng, dự kiến 26/3, (D) "informed by telephone" đều được nêu.',
        translationVi: 'Điều gì KHÔNG được nêu trên phiếu?',
        skillTags: ['comprehension.not-true'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Utilities',
    passage:
      'GRANTHAM FALLS — Residents of Grantham Falls will soon be able to see how much water they use each day, rather than waiting for a bill every three months. On Tuesday, the city council voted to replace all 14,000 of the city’s mechanical water meters with digital ones over the next two years. [1]\n\nThe new meters send readings to the water utility every hour. Customers who register for a free online portal will be able to check their usage and set alerts for sudden increases in consumption, a common sign of a hidden leak. "At the moment, a running toilet or a cracked pipe can go unnoticed for months," said Rosalind Achebe, the city’s director of water services. [2] "A leak that once would have cost a household hundreds of dollars can now be caught within a day or two."\n\nThe project is expected to cost $6.3 million, about two-thirds of which will be covered by a state water-conservation grant. [3] The remainder will come from the utility’s reserves, and the council has stated that water rates will not rise as a result.\n\nInstallation will begin in the Eastgate neighborhood in March, since the meters there are the oldest in the city. Residents will receive a letter two weeks before work starts on their street. [4] Most installations take less than 30 minutes, and where the meter is outdoors, residents do not need to be at home.',
    questions: [
      {
        text: 'What is the article mainly about?',
        options: [
          'A rise in water rates in Grantham Falls',
          'A new way to pay water bills online',
          'A plan to install a new type of water meter',
          'Repairs to water pipes in an older neighborhood',
        ],
        answer: 2,
        explanationVi:
          '"the city council voted to replace all 14,000… mechanical water meters with digital ones" → kế hoạch lắp loại đồng hồ nước mới (C). Hội đồng nói giá nước sẽ không tăng (A sai); cổng trực tuyến dùng để xem lượng dùng, không phải trả hoá đơn (B).',
        translationVi: 'Bài báo chủ yếu nói về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'How will most of the project be paid for?',
        options: [
          'With money from the state',
          'With savings held by the utility',
          'With an increase in water rates',
          'With fees paid by portal users',
        ],
        answer: 0,
        explanationVi:
          '"about two-thirds of which will be covered by a state water-conservation grant" → phần lớn (2/3) đến từ trợ cấp của bang (A). Quỹ dự trữ của công ty chỉ chi phần còn lại (B); cổng trực tuyến miễn phí (D).',
        translationVi: 'Phần lớn chi phí dự án sẽ được chi trả bằng cách nào?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'According to the article, why will the work start in Eastgate?',
        options: [
          'Its residents asked the council to go first.',
          'It has the highest rate of leaks in the city.',
          'Its meters are all located outdoors.',
          'It has the city’s oldest equipment.',
        ],
        answer: 3,
        explanationVi:
          '"since the meters there are the oldest in the city" → thiết bị cũ nhất (D). Bài không nói Eastgate rò rỉ nhiều nhất (B) hay đồng hồ đều ở ngoài trời (C).',
        translationVi: 'Theo bài báo, vì sao công việc sẽ bắt đầu ở Eastgate?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"By the time it shows up on a bill, the water has long since been paid for."',
        options: ['[1]', '[2]', '[3]', '[4]'],
        answer: 1,
        explanationVi:
          'Câu chèn nói rò rỉ chỉ lộ ra khi có hoá đơn, lúc đó tiền nước đã mất → nối tiếp ý "a running toilet or a cracked pipe can go unnoticed for months" ở [2], và dẫn sang câu "can now be caught within a day or two". Các vị trí khác nói về quyết định, chi phí và lịch lắp đặt.',
        translationVi:
          'Câu sau phù hợp nhất ở vị trí nào trong [1], [2], [3], [4]? "Đến khi nó hiện lên trên hoá đơn thì lượng nước đó đã bị tính tiền từ lâu."',
        skillTags: ['comprehension.sentence-insertion'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Property management',
    passage:
      'Halloran Property Group\n55 Wexley Street, Suite 900\nMelbourne VIC 3000\n\n12 August\n\nMs. Anjali Mehta\nDirector, Mehta & Lowe Architects\n55 Wexley Street, Suite 412\nMelbourne VIC 3000\n\nDear Ms. Mehta,\n\nYour firm’s lease on Suite 412 expires on 31 December. We would be pleased to renew it for a further three years, and I have enclosed a draft agreement for your review.\n\nAs you will see, the proposed rent is 6 percent higher than your current rate, in line with other recent renewals in the building. However, as your firm has been with us since the building opened, we are prepared to limit the increase to 3 percent if the renewal is signed by 30 September. In addition, the new end-of-trip facilities on the ground floor, including showers, lockers and secure bicycle storage, will be available to your staff at no extra cost from October.\n\nYou mentioned last year that your team was outgrowing its current space. Suite 418, next to yours, will become vacant in February. Should you wish to take it on as well, we could combine both suites under a single agreement, and our fit-out team would remove the dividing wall at our expense.\n\nPlease let me know by 15 September whether you intend to renew so that we can plan accordingly. I would also be happy to arrange a time for you to view Suite 418.\n\nYours sincerely,\nCallum Reyes\nLeasing Manager',
    questions: [
      {
        text: 'Why did Mr. Reyes write the letter?',
        options: [
          'To announce the opening of a new building',
          'To remind a tenant about an overdue payment',
          'To request permission to carry out building work',
          'To offer to extend a rental agreement',
        ],
        answer: 3,
        explanationVi:
          '"Your firm’s lease… expires on 31 December. We would be pleased to renew it for a further three years" → đề nghị gia hạn hợp đồng thuê (D). Việc phá tường chỉ là đề nghị phụ nếu thuê thêm phòng 418 (C).',
        translationVi: 'Vì sao ông Reyes viết lá thư?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What is suggested about Mehta & Lowe Architects?',
        options: [
          'It was among the first tenants of the building.',
          'It has already agreed to rent Suite 418.',
          'It is planning to reduce its number of staff.',
          'It currently pays more than other tenants.',
        ],
        answer: 0,
        explanationVi:
          '"your firm has been with us since the building opened" → công ty là một trong những khách thuê đầu tiên (A). Công ty đang "outgrowing its current space" (lớn lên, không giảm người – C sai) và chưa đồng ý thuê 418 (B sai).',
        translationVi: 'Điều gì được gợi ý về Mehta & Lowe Architects?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'According to the letter, how can the firm keep its rent increase to 3 percent?',
        options: [
          'By also renting Suite 418',
          'By replying before 15 September',
          'By signing the renewal by a certain date',
          'By agreeing to a lease longer than three years',
        ],
        answer: 2,
        explanationVi:
          '"limit the increase to 3 percent if the renewal is signed by 30 September" → ký gia hạn trước một ngày nhất định (C). Ngày 15/9 chỉ là hạn báo có ý định gia hạn hay không (B) – bẫy hai mốc ngày.',
        translationVi:
          'Theo lá thư, công ty có thể giữ mức tăng tiền thuê ở 3% bằng cách nào?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'In the letter, the phrase "in line with" in paragraph 2 is closest in meaning to',
        options: [
          'consistent with',
          'waiting behind',
          'connected to',
          'ahead of',
        ],
        answer: 0,
        explanationVi:
          '"6 percent higher… in line with other recent renewals" = tương đương, phù hợp với các hợp đồng gia hạn gần đây → "consistent with" (A). "waiting behind" là nghĩa đen "xếp hàng", không hợp ngữ cảnh.',
        translationVi:
          'Trong lá thư, cụm "in line with" ở đoạn 2 gần nghĩa nhất với',
        skillTags: ['comprehension.vocab-in-context'],
      },
    ],
  },
]
