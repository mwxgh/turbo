/** Full Test 03, Part 7 Single: written for Lingo (not from ETS). */
export const P7_SINGLE: object[] = [
  {
    difficulty: 'EASY',
    topic: 'Construction',
    passage:
      'Dana Whitlock [10:31 A.M.]\nHi Marco, the concrete supplier just called. Their mixer truck broke down on the way to the Kessler Avenue site, so the 11:00 pour won’t happen this morning.\n\nMarco Ruiz [10:34 A.M.]\nThat’s bad timing. The inspector approved the forms yesterday, and the crew is standing by.\n\nDana Whitlock [10:36 A.M.]\nThey offered to send another truck at 2:00 P.M. Is that too late to finish before dark?\n\nMarco Ruiz [10:39 A.M.]\nThe slab is only about 40 cubic meters. If the truck arrives on time, we’ll be done by 5:00.\n\nDana Whitlock [10:41 A.M.]\nWhat should the crew do in the meantime?\n\nMarco Ruiz [10:42 A.M.]\nThe fence panels along the north side still need to go up.\n\nDana Whitlock [10:43 A.M.]\nGood idea. I’ll confirm the 2:00 delivery with the supplier.',
    questions: [
      {
        text: 'Why did Ms. Whitlock contact Mr. Ruiz?',
        options: [
          'To ask him to inspect some forms',
          'To request extra workers for the site',
          'To report that a delivery has been delayed',
          'To schedule a meeting with a supplier',
        ],
        answer: 2,
        explanationVi:
          '"Their mixer truck broke down… so the 11:00 pour won’t happen this morning" → xe bê tông bị hỏng, việc giao hàng bị trễ (C). Các khuôn đã được duyệt từ hôm qua nên (A) sai; không ai xin thêm người (B).',
        translationVi: 'Tại sao cô Whitlock liên lạc với anh Ruiz?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'At 10:42 A.M., what does Mr. Ruiz most likely mean when he writes, "The fence panels along the north side still need to go up"?',
        options: [
          'The site needs extra security tonight.',
          'The crew can do other work until the truck arrives.',
          'The concrete should be poured on the north side.',
          'The inspector found a problem with the fence.',
        ],
        answer: 1,
        explanationVi:
          'Cô Whitlock hỏi "What should the crew do in the meantime?" → anh Ruiz gợi ý đội dựng hàng rào trong lúc chờ xe bê tông (B). Cô đáp "Good idea", xác nhận đây là việc làm tạm thời.',
        translationVi:
          'Lúc 10:42 sáng, anh Ruiz nhiều khả năng có ý gì khi viết "Các tấm hàng rào phía bắc vẫn cần được dựng lên"?',
        skillTags: ['comprehension.speaker-intent'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Energy',
    passage:
      'BRACKEN VALLEY ELECTRIC COOPERATIVE\nPlanned Service Interruption\n\nTo improve reliability in the Millbrook area, our crews will replace an aging transformer at the Orchard Road substation on Wednesday, 14 October. Electricity to homes and businesses on Orchard Road, Fenner Lane, and Clay Street will be switched off from 9:00 A.M. to approximately 1:00 P.M.\n\nCustomers who rely on electrically powered medical equipment should call our support line at 555-0186 before 12 October so that a technician can arrange a portable generator for them.\n\nIf the work is postponed because of high winds, a new date will be posted at brackenvalleyelectric.coop/outages. We apologize for any inconvenience.',
    questions: [
      {
        text: 'What is the purpose of the notice?',
        options: [
          'To announce higher electricity rates',
          'To introduce a new customer support line',
          'To advertise the sale of portable generators',
          'To inform customers of a temporary power shutoff',
        ],
        answer: 3,
        explanationVi:
          '"Electricity… will be switched off from 9:00 A.M. to approximately 1:00 P.M." → thông báo cắt điện tạm thời (D). Máy phát điện được bố trí cho một số khách, không phải để bán (C); số điện thoại không phải đường dây mới (B).',
        translationVi: 'Mục đích của thông báo là gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What are some customers asked to do before October 12?',
        options: [
          'Contact the cooperative by phone',
          'Unplug their medical equipment',
          'Check a Web site for a new date',
          'Visit the Orchard Road substation',
        ],
        answer: 0,
        explanationVi:
          '"Customers who rely on electrically powered medical equipment should call our support line… before 12 October" → gọi điện cho hợp tác xã (A). Trang web chỉ cần xem nếu công việc bị hoãn (C).',
        translationVi:
          'Một số khách hàng được yêu cầu làm gì trước ngày 12/10?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Finance',
    passage:
      'HARLOW FARMERS CREDIT UNION\nEquipment Loans for Growers\n\nNeed a new tractor, grain dryer, or irrigation pump? Harlow’s equipment loans are designed around the farming year.\n\n• Repayment schedules matched to your harvest: pay monthly, quarterly, or once a year after your crop is sold\n• Loans from $10,000 to $400,000 for new or used machinery\n• A decision within five business days of receiving a complete application\n\nMembers who attend one of our free financial planning workshops for farm owners can borrow at a rate 0.25 percent below our standard rate. Workshops are held on the first Tuesday of every month at our Linden Street branch.\n\nNot yet a member? Anyone who lives or farms in Harlow, Ashby, or Cole County may join.',
    questions: [
      {
        text: 'What is indicated about the equipment loans?',
        options: [
          'They can be used only for new machinery.',
          'They allow payments to be made once a year.',
          'They are approved on the day of application.',
          'They are offered only to residents of Harlow.',
        ],
        answer: 1,
        explanationVi:
          '"pay monthly, quarterly, or once a year after your crop is sold" → có thể trả mỗi năm một lần (B). Vay được cho máy "new or used" (A sai); quyết định trong "five business days" (C sai); người ở Ashby, Cole County cũng tham gia được (D sai).',
        translationVi: 'Điều gì được nêu về các khoản vay mua thiết bị?',
        skillTags: ['comprehension.not-true'],
      },
      {
        text: 'How can members receive a lower interest rate?',
        options: [
          'By applying at the Linden Street branch',
          'By repaying the loan every month',
          'By attending a free workshop',
          'By borrowing for used machinery',
        ],
        answer: 2,
        explanationVi:
          '"Members who attend one of our free financial planning workshops… can borrow at a rate 0.25 percent below our standard rate" → tham dự hội thảo miễn phí (C). Chi nhánh Linden Street chỉ là nơi tổ chức hội thảo (A là bẫy).',
        translationVi:
          'Thành viên có thể được lãi suất thấp hơn bằng cách nào?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Education',
    passage:
      'KESTON TECHNICAL INSTITUTE\nCourse Registration Receipt\n\nRegistration No.: KTI-3318\nParticipant: Hyun-woo Park\nEmployer: Arvale Water Services (invoice sent to employer)\n\nCourse: Introduction to Pump Station Maintenance (PM-102)\nDates: Saturdays, 7 March – 25 April (8 sessions), 9:00 A.M. – 1:00 P.M.\nLocation: Workshop B, North Campus\n\nTuition ........ $680.00\nSafety equipment rental ........ $45.00\nEarly registration discount ........ –$68.00\nAmount due ........ $657.00\n\nNotes: Participants must complete the online safety module before the first session. Those who already own steel-toed boots and safety glasses may return the rented equipment on the first day for a full refund of the rental fee. A certificate is issued to participants who attend at least seven of the eight sessions.',
    questions: [
      {
        text: 'What is suggested about Mr. Park?',
        options: [
          'He signed up for the course before a deadline.',
          'He will pay the course fees himself.',
          'He has already completed the online safety module.',
          'He teaches at Keston Technical Institute.',
        ],
        answer: 0,
        explanationVi:
          'Biên lai có dòng "Early registration discount –$68.00" → anh Park đăng ký sớm, trước hạn (A). Hoá đơn gửi cho công ty "invoice sent to employer" nên (B) sai; module an toàn phải hoàn thành "before the first session", không nói đã làm xong (C).',
        translationVi: 'Điều gì được ngụ ý về anh Park?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'According to the receipt, what must participants do to receive a certificate?',
        options: [
          'Pass a final practical test',
          'Return the rented safety equipment',
          'Pay the full amount by 7 March',
          'Attend at least seven sessions',
        ],
        answer: 3,
        explanationVi:
          '"A certificate is issued to participants who attend at least seven of the eight sessions" → (D). Việc trả lại thiết bị chỉ để được hoàn phí thuê (B), không liên quan đến chứng chỉ.',
        translationVi: 'Theo biên lai, học viên phải làm gì để nhận chứng chỉ?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Food production',
    passage:
      'POSITION AVAILABLE: Quality Assurance Technician\nGlenmoor Creamery – Ridgeford plant\n\nGlenmoor Creamery, which makes yogurt and cheese from milk supplied by more than 60 family farms, is seeking a Quality Assurance Technician for its Ridgeford plant. The plant runs two shifts; the successful candidate will work the evening shift (2:00 P.M. to 10:30 P.M.), Monday through Friday.\n\nResponsibilities include collecting samples from production lines, carrying out routine laboratory tests for fat content and bacteria, recording results in our tracking system, and alerting the shift supervisor when a batch does not meet standards. The technician will also help prepare for visits by government food-safety inspectors.\n\nRequirements: a two-year degree in food science, biology, or a related field; at least one year of laboratory experience, preferably in a food or beverage setting; and careful attention to detail. Experience with dairy products is helpful but not necessary, as full training will be provided.\n\nTo apply, send a résumé and the names of two references to careers@glenmoorcreamery.com by 30 June. Shortlisted candidates will be invited to tour the plant before their interview.',
    questions: [
      {
        text: 'What is one responsibility of the position?',
        options: [
          'Training new evening-shift employees',
          'Purchasing milk from local farms',
          'Informing a supervisor about problem batches',
          'Inspecting suppliers’ farms',
        ],
        answer: 2,
        explanationVi:
          '"alerting the shift supervisor when a batch does not meet standards" → báo cho trưởng ca về lô hàng không đạt (C). Sữa do các trang trại cung cấp nhưng nhân viên không mua sữa (B); thanh tra là của nhà nước, không phải kiểm tra trang trại (D).',
        translationVi: 'Một trách nhiệm của vị trí này là gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What is NOT a requirement for the position?',
        options: [
          'Experience working with dairy products',
          'A degree in a relevant subject',
          'Previous work in a laboratory',
          'Close attention to detail',
        ],
        answer: 0,
        explanationVi:
          '"Experience with dairy products is helpful but not necessary" → kinh nghiệm với sản phẩm sữa không bắt buộc (A). Bằng cấp (B), "at least one year of laboratory experience" (C) và "careful attention to detail" (D) đều là yêu cầu.',
        translationVi: 'Điều gì KHÔNG phải là yêu cầu của vị trí này?',
        skillTags: ['comprehension.not-true'],
      },
      {
        text: 'What is suggested about Glenmoor Creamery?',
        options: [
          'It plans to open a second plant.',
          'It recently changed its milk suppliers.',
          'Its Ridgeford plant operates 24 hours a day.',
          'It is visited by government officials.',
        ],
        answer: 3,
        explanationVi:
          'Nhân viên sẽ "help prepare for visits by government food-safety inspectors" → nhà máy được cơ quan nhà nước đến kiểm tra (D). Nhà máy chạy hai ca, ca tối kết thúc lúc 10:30 P.M., nên không hoạt động 24 giờ (C).',
        translationVi: 'Điều gì được ngụ ý về Glenmoor Creamery?',
        skillTags: ['comprehension.inference'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Banking',
    passage:
      'From: Business Services <business@tidemarkbank.com>\nTo: Priyanka Desai <p.desai@desaijoinery.com>\nDate: 3 February\nSubject: Changes to your Business Essentials account\n\nDear Ms. Desai,\n\nWe are writing to let you know about changes to the Business Essentials account held by Desai Joinery Ltd. From 1 April, the monthly maintenance fee will rise from $12 to $15. However, the fee will continue to be waived in any month in which your average balance is $5,000 or more.\n\nAt the same time, we are making cash easier to handle. Cash deposits made at our branch counters are currently free up to $3,000 per month; this allowance will increase to $5,000. Cash deposited through our ATMs will remain free of charge with no limit.\n\nBased on your account activity over the past twelve months, we expect these changes to have little effect on your total charges, since your average balance fell below $5,000 in only two of those months. If your business needs have changed, however, one of our Business Advisers can review whether another account would suit you better. To arrange an appointment, reply to this e-mail or call 555-0144.\n\nYou do not need to take any action to keep your current account.\n\nSincerely,\nTobias Grant\nBusiness Services Manager, Tidemark Bank',
    questions: [
      {
        text: 'Why did Mr. Grant send the e-mail?',
        options: [
          'To recommend that Ms. Desai open a new account',
          'To inform a customer of revised account terms',
          'To confirm that a fee has been refunded',
          'To request updated information about a business',
        ],
        answer: 1,
        explanationVi:
          '"We are writing to let you know about changes to the Business Essentials account" → thông báo điều khoản tài khoản thay đổi (B). Gặp cố vấn chỉ là gợi ý "If your business needs have changed", và khách "do not need to take any action", nên (A) sai.',
        translationVi: 'Tại sao ông Grant gửi e-mail?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What is suggested about Desai Joinery Ltd.?',
        options: [
          'It deposits more than $5,000 in cash at the counter each month.',
          'It opened its account less than a year ago.',
          'It will be charged $15 every month from April.',
          'It usually keeps a balance of at least $5,000.',
        ],
        answer: 3,
        explanationVi:
          '"your average balance fell below $5,000 in only two of those months" → 10/12 tháng số dư từ $5,000 trở lên, tức thường giữ ít nhất $5,000 (D). Vì vậy phí thường được miễn, không phải trả $15 mỗi tháng (C); ngân hàng có dữ liệu "the past twelve months" nên (B) không có cơ sở.',
        translationVi: 'Điều gì được ngụ ý về Desai Joinery Ltd.?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'The word "suit" in paragraph 3 is closest in meaning to',
        options: ['dress', 'accompany', 'be appropriate for', 'follow'],
        answer: 2,
        explanationVi:
          '"whether another account would suit you better" = tài khoản khác có phù hợp với khách hơn không → "be appropriate for" (C). "dress" là nghĩa của "suit" khi nói về quần áo, là bẫy.',
        translationVi: 'Từ "suit" ở đoạn 3 có nghĩa gần nhất với',
        skillTags: ['comprehension.vocab-in-context'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Engineering',
    passage:
      'MEMO\nTo: All engineering and drafting staff\nFrom: Helena Marsh, Technical Director\nDate: 11 September\nRe: Drawing revisions\n\nLast month, a contractor on the Westgate pedestrian bridge project built part of a handrail support from a drawing that had already been replaced. The error was caught by our site engineer before any concrete was placed, but correcting it cost three days and an unplanned payment to the contractor.\n\nTo keep this from happening again, the following procedure takes effect on 22 September. Every drawing issued outside the company must be uploaded to the shared project portal rather than sent as an e-mail attachment. When a drawing is revised, the person making the change must mark the earlier version "Superseded" in the portal on the same day. Contractors will receive automatic notifications of new versions, so there will be no need to contact them separately.\n\nPavel Novak from our IT team will give two 30-minute demonstrations of the portal on 18 September, at 10:00 A.M. and 3:00 P.M., in Meeting Room 2. Attendance is optional for staff who already use the portal on the Harbour Road project, but everyone else should attend one session. Please let Mr. Novak know which time you prefer by 16 September.',
    questions: [
      {
        text: 'Why was the memo written?',
        options: [
          'To introduce a procedure for managing documents',
          'To announce the completion of a bridge project',
          'To ask staff to evaluate a contractor',
          'To explain a delay in installing new software',
        ],
        answer: 0,
        explanationVi:
          '"the following procedure takes effect on 22 September" → mọi bản vẽ phải tải lên cổng dự án và đánh dấu bản cũ → giới thiệu quy trình quản lý tài liệu (A). Sự cố cây cầu chỉ là lý do, dự án chưa hoàn thành (B).',
        translationVi: 'Tại sao bản ghi nhớ được viết?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What is suggested about the Harbour Road project?',
        options: [
          'It was delayed by a drawing error.',
          'It will begin on 22 September.',
          'Its team members are already familiar with the portal.',
          'Its contractor received an extra payment.',
        ],
        answer: 2,
        explanationVi:
          '"Attendance is optional for staff who already use the portal on the Harbour Road project" → nhóm này đã quen dùng cổng (C). Lỗi bản vẽ và khoản chi thêm thuộc dự án cầu Westgate, không phải Harbour Road (A, D là bẫy).',
        translationVi: 'Điều gì được ngụ ý về dự án Harbour Road?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'The word "caught" in paragraph 1 is closest in meaning to',
        options: ['trapped', 'noticed', 'held', 'reached'],
        answer: 1,
        explanationVi:
          '"The error was caught by our site engineer before any concrete was placed" = lỗi được kỹ sư phát hiện trước khi đổ bê tông → "noticed" (B). "trapped" (bẫy, bắt giữ) là nghĩa đen của "catch", không hợp với "error".',
        translationVi: 'Từ "caught" ở đoạn 1 có nghĩa gần nhất với',
        skillTags: ['comprehension.vocab-in-context'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Energy',
    passage:
      'Farah Qureshi [10:31 A.M.]: Morning, team. The monitoring system shows that turbine 7 at the Ridgeback wind farm shut itself down at 6:15 this morning. The error code points to the gearbox temperature sensor.\n\nLiam O’Connor [10:34 A.M.]: The same sensor gave a false reading on turbine 3 in August. It turned out to be a loose cable.\n\nFarah Qureshi [10:36 A.M.]: Hopefully that’s all it is. Strong winds are forecast all week, so every hour it’s offline costs us. Who can get out there today?\n\nSunita Reddy [10:38 A.M.]: My crew is replacing blades at the Cold Harbour site until Thursday.\n\nLiam O’Connor [10:40 A.M.]: I’m finishing a safety inspection at the substation, but I should be free by early afternoon. The trouble is, I don’t have a spare sensor in my van.\n\nFarah Qureshi [10:42 A.M.]: The Ridgeback storeroom was restocked on Monday.\n\nLiam O’Connor [10:43 A.M.]: Great. I’ll stop there on the way and pick one up just in case.\n\nFarah Qureshi [10:45 A.M.]: Thanks, Liam. Call me once you’ve had a look, and I’ll update the operations log.',
    questions: [
      {
        text: 'What problem are the writers discussing?',
        options: [
          'A storeroom has run out of parts.',
          'A crew member has been injured.',
          'A weather forecast was inaccurate.',
          'A turbine has stopped operating.',
        ],
        answer: 3,
        explanationVi:
          '"turbine 7 at the Ridgeback wind farm shut itself down at 6:15 this morning" → một tua-bin đã ngừng chạy (D). Kho vừa được bổ sung hàng thứ Hai nên (A) ngược lại.',
        translationVi: 'Những người viết đang thảo luận về vấn đề gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What is indicated about Ms. Reddy?',
        options: [
          'She repaired turbine 3 in August.',
          'She is working at another location this week.',
          'She will deliver a sensor to Mr. O’Connor.',
          'She restocked the Ridgeback storeroom.',
        ],
        answer: 1,
        explanationVi:
          '"My crew is replacing blades at the Cold Harbour site until Thursday" → cô đang làm ở địa điểm khác trong tuần (B), nên không thể đến Ridgeback. Chuyện tua-bin 3 do anh O’Connor kể (A).',
        translationVi: 'Điều gì được nêu về cô Reddy?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'At 10:42 A.M., what does Ms. Qureshi most likely mean when she writes, "The Ridgeback storeroom was restocked on Monday"?',
        options: [
          'Mr. O’Connor can get a spare sensor at the wind farm.',
          'The storeroom will be closed until next Monday.',
          'Ms. Reddy’s crew should collect the sensor.',
          'Mr. O’Connor needs to order a new sensor.',
        ],
        answer: 0,
        explanationVi:
          'Anh O’Connor vừa nói "I don’t have a spare sensor in my van" → cô Qureshi ý là kho ở Ridgeback có sẵn cảm biến để lấy (A); anh đáp "I’ll stop there on the way and pick one up". Vì vậy không cần đặt mua (D).',
        translationVi:
          'Lúc 10:42 sáng, cô Qureshi nhiều khả năng có ý gì khi viết "Kho ở Ridgeback đã được bổ sung hàng hôm thứ Hai"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What will Ms. Qureshi most likely do after Mr. O’Connor calls her?',
        options: [
          'Visit the substation',
          'Order replacement blades',
          'Record information in a log',
          'Check the weather forecast',
        ],
        answer: 2,
        explanationVi:
          '"Call me once you’ve had a look, and I’ll update the operations log" → cô sẽ cập nhật nhật ký vận hành (C). Trạm biến áp là nơi anh O’Connor đang kiểm tra (A là bẫy).',
        translationVi:
          'Cô Qureshi nhiều khả năng sẽ làm gì sau khi anh O’Connor gọi cho cô?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Education',
    passage:
      'Westbrook College of Building Trades\n42 Mercer Road, Dunmore, PA 18512\n\nMay 6\n\nMr. Samuel Ochieng\nOperations Manager\nFerrell & Hart Electrical Contractors\n910 Canal Street, Scranton, PA 18503\n\nDear Mr. Ochieng,\n\nThank you for meeting with me last week to discuss your company’s interest in our Electrical Apprenticeship Program. As promised, I am writing to outline how the partnership would work.\n\nApprentices spend four days a week working under the supervision of a licensed electrician at the partner company and one day a week in classes at our college. The program lasts three years, and apprentices who complete it are eligible to sit the state journeyman licensing exam. Partner companies pay the apprentices’ wages, while tuition is covered by a grant from the state workforce board. Some partners have also chosen to pay for apprentices’ tools, although this is not required.\n\nYou mentioned that Ferrell & Hart would like to take on four apprentices starting in September. Because applications for the fall intake close on June 15, I recommend posting the positions on our job board as soon as possible. Our staff will screen the applicants and send you a shortlist, but the final hiring decision always rests with the employer.\n\nFinally, each partner company must name a mentor who will meet with our program coordinator once per term to review the apprentices’ progress. I have enclosed a partnership agreement along with a brochure describing our training facilities. Once the agreement has been signed and returned, we will activate your account on the job board.\n\nSincerely,\nAdaeze Nwosu\nDirector of Apprenticeships',
    questions: [
      {
        text: 'What is the main purpose of the letter?',
        options: [
          'To invite Mr. Ochieng to a meeting',
          'To announce changes to a licensing exam',
          'To explain the details of a training arrangement',
          'To recommend specific job applicants',
        ],
        answer: 2,
        explanationVi:
          '"I am writing to outline how the partnership would work" → giải thích chi tiết chương trình học nghề hợp tác (C). Cuộc gặp đã diễn ra "last week" (A sai); chưa có ứng viên nào được giới thiệu (D).',
        translationVi: 'Mục đích chính của bức thư là gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What is NOT mentioned as a responsibility of partner companies?',
        options: [
          'Paying the apprentices’ tuition',
          'Paying the apprentices’ wages',
          'Deciding which applicants to hire',
          'Appointing a mentor',
        ],
        answer: 0,
        explanationVi:
          '"tuition is covered by a grant from the state workforce board" → học phí do quỹ nhà nước trả, không phải công ty (A). Trả lương (B), "the final hiring decision always rests with the employer" (C), "must name a mentor" (D) đều là trách nhiệm của công ty.',
        translationVi:
          'Điều gì KHÔNG được nhắc đến như một trách nhiệm của công ty đối tác?',
        skillTags: ['comprehension.not-true'],
      },
      {
        text: 'What is suggested about Ferrell & Hart Electrical Contractors?',
        options: [
          'It already provides tools to its apprentices.',
          'It currently employs four licensed electricians.',
          'It wants its apprentices to begin in June.',
          'It has not yet signed a partnership agreement.',
        ],
        answer: 3,
        explanationVi:
          'Bà Nwosu gửi kèm "a partnership agreement" và viết "Once the agreement has been signed and returned…" → công ty chưa ký thỏa thuận (D). Bốn là số học viên muốn nhận, không phải số thợ điện (B); học viên bắt đầu tháng 9, 15/6 chỉ là hạn nộp đơn (C).',
        translationVi:
          'Điều gì được ngụ ý về Ferrell & Hart Electrical Contractors?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'The word "rests" in paragraph 3 is closest in meaning to',
        options: ['relaxes', 'belongs', 'pauses', 'leans'],
        answer: 1,
        explanationVi:
          '"the final hiring decision always rests with the employer" = quyết định cuối cùng thuộc về nhà tuyển dụng → "belongs" (B). "relaxes" và "pauses" là nghĩa "nghỉ ngơi" của "rest", không hợp ngữ cảnh.',
        translationVi: 'Từ "rests" ở đoạn 3 có nghĩa gần nhất với',
        skillTags: ['comprehension.vocab-in-context'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Agriculture',
    passage:
      'WENDOVER — Fruit growers in the Tamsin Valley will no longer have to truck their apples more than 150 kilometres to be stored after harvest. On Monday, the Tamsin Valley Growers’ Cooperative opened a cold-storage facility just outside Wendover, with room for roughly 9,000 tonnes of fruit. [1]\n\nUntil now, most of the valley’s 70 orchards have relied on warehouses near the port of Calloway, where storage fees have risen steeply in recent years. "Every load we sent down the highway cost us fuel and time, and some of the fruit was bruised on the way," said cooperative chair Ruth Abernathy, whose family has grown apples in the valley for three generations. [2]\n\nThe $14 million facility was paid for through a combination of members’ contributions, a low-interest loan from Ashgrove Agricultural Bank, and a regional development grant. It uses a controlled-atmosphere system that lowers oxygen levels in sealed rooms, slowing ripening so that apples picked in September can be sold in good condition as late as the following June. [3]\n\nMembers will pay storage fees based on volume, and the cooperative expects those fees to be about 30 percent lower than what growers now pay in Calloway. Nonmembers may rent any space that members do not need, though at a higher rate. [4]\n\nMs. Abernathy said that being able to sell fruit later in the year could also help growers negotiate better prices. "When everyone has to sell in October, buyers know it," she said. "Now we can wait for the market to improve."\n\nThe cooperative plans to add a packing line next year, which would allow fruit to be graded and boxed on site.',
    questions: [
      {
        text: 'What is the article mainly about?',
        options: [
          'A change in the timing of the apple harvest',
          'The opening of a shared storage facility',
          'The expansion of a port warehouse',
          'A bank’s new lending policy for farmers',
        ],
        answer: 1,
        explanationVi:
          '"the Tamsin Valley Growers’ Cooperative opened a cold-storage facility" → khai trương kho lạnh dùng chung của hợp tác xã (B). Khoản vay ngân hàng chỉ là một nguồn vốn (D là chi tiết phụ).',
        translationVi: 'Bài báo chủ yếu nói về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What is NOT mentioned as a source of money for the facility?',
        options: [
          'Contributions from cooperative members',
          'A loan from a financial institution',
          'A grant for regional development',
          'Rental fees paid by nonmembers',
        ],
        answer: 3,
        explanationVi:
          'Nguồn vốn: "members’ contributions, a low-interest loan from Ashgrove Agricultural Bank, and a regional development grant" (A, B, C). Người ngoài hợp tác xã chỉ được thuê chỗ trống sau khi kho mở, không góp vốn xây dựng (D).',
        translationVi:
          'Điều gì KHÔNG được nhắc đến như một nguồn tiền xây dựng kho?',
        skillTags: ['comprehension.not-true'],
      },
      {
        text: 'What is suggested about growers in the Tamsin Valley?',
        options: [
          'They have often had to sell their fruit soon after harvest.',
          'They will stop using trucks altogether.',
          'They have recently planted new orchards.',
          'They will be required to join the cooperative.',
        ],
        answer: 0,
        explanationVi:
          '"When everyone has to sell in October, buyers know it… Now we can wait" → trước đây nông dân thường phải bán ngay sau thu hoạch (A). Người không phải thành viên vẫn thuê được chỗ, nên không bắt buộc tham gia (D).',
        translationVi:
          'Điều gì được ngụ ý về những người trồng táo ở thung lũng Tamsin?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"The same technology has been used by large commercial warehouses for decades, but it is new to the valley."',
        options: ['[1]', '[2]', '[3]', '[4]'],
        answer: 2,
        explanationVi:
          '"The same technology" cần một công nghệ được nhắc ngay trước: "It uses a controlled-atmosphere system that lowers oxygen levels…" → đặt ở [3]. Các vị trí [1], [2], [4] không nói đến công nghệ nào.',
        translationVi:
          'Câu sau phù hợp nhất ở vị trí nào trong [1], [2], [3], [4]? "Công nghệ này đã được các kho thương mại lớn sử dụng hàng chục năm, nhưng còn mới với thung lũng."',
        skillTags: ['comprehension.sentence-insertion'],
      },
    ],
  },
]
