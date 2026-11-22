/** Full Test 04, Part 3: written for Lingo (not from ETS). */
export const P3: object[] = [
  {
    difficulty: 'EASY',
    topic: 'Travel',
    transcript: [
      {
        speaker: 'M',
        accent: 'US',
        text: 'Welcome to Pathway Car Rental. Do you have a reservation with us?',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Yes, it’s under Okafor. I booked a compact car for three days.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'I see it here. Unfortunately, all our compact cars are out right now because several customers returned them late. I can give you a midsize sedan for the same price.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'That’s fine, as long as it doesn’t cost more. Is there a charge for returning it at the airport branch?',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'No, drop-off at the airport is free. Just leave the keys at the express counter in Terminal B.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Great. Oh, and could I add a child seat?',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Of course. I’ll get one from the storage room while you sign the rental agreement.',
      },
    ],
    questions: [
      {
        text: 'Where most likely is the conversation taking place?',
        options: [
          'At a hotel front desk',
          'At an airport security check',
          'At a car rental office',
          'At a parking garage',
        ],
        answer: 2,
        explanationVi:
          '"Welcome to Pathway Car Rental… I booked a compact car" → hội thoại ở quầy cho thuê xe (C). "airport", "Terminal B" chỉ là bẫy lặp từ.',
        translationVi: 'Cuộc hội thoại có khả năng diễn ra ở đâu nhất?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the man offer the woman?',
        options: [
          'A larger vehicle at no extra cost',
          'A full tank of fuel for free',
          'A discount on a future rental',
          'An earlier pickup time',
        ],
        answer: 0,
        explanationVi:
          '"I can give you a midsize sedan for the same price" → xe lớn hơn (midsize > compact) mà không tốn thêm tiền (A).',
        translationVi: 'Người đàn ông đề nghị gì với người phụ nữ?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What will the man most likely do next?',
        options: [
          'Print a receipt',
          'Call the airport branch',
          'Check the woman’s driver’s license',
          'Retrieve an item from storage',
        ],
        answer: 3,
        explanationVi:
          '"I’ll get one from the storage room" (ghế trẻ em) → anh sẽ đi lấy một món đồ trong kho (D).',
        translationVi: 'Người đàn ông có khả năng sẽ làm gì tiếp theo?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Catering',
    transcript: [
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Hello, this is Imogen from Saffron Lane Catering, calling about Friday’s lunch for your sales conference.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Hi, Imogen. Is everything still on track?',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Mostly. Our seafood supplier has just told us they can’t deliver salmon this week, so we’d like to substitute grilled chicken with the same lemon-herb sauce.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Hmm, a few of our guests don’t eat meat, though. We chose the fish specifically with them in mind.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Understood. In that case, we could serve a roasted vegetable tart to those guests and the chicken to everyone else.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'That sounds good. How many tarts would you need to prepare?',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'That’s what I need from you. If you could e-mail me a headcount by tomorrow at noon, we’ll plan accordingly.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'I’ll go through the registration list and send it to you this afternoon.',
      },
    ],
    questions: [
      {
        text: 'Why is the woman calling?',
        options: [
          'To confirm a payment',
          'To report that an ingredient is unavailable',
          'To change a delivery time',
          'To ask for a venue’s address',
        ],
        answer: 1,
        explanationVi:
          '"Our seafood supplier… can’t deliver salmon this week" → cô gọi để báo một nguyên liệu không có (B, "ingredient is unavailable").',
        translationVi: 'Tại sao người phụ nữ gọi điện?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What concern does the man raise?',
        options: [
          'The cost of a meal',
          'The size of the portions',
          'The timing of a delivery',
          'The dietary needs of some guests',
        ],
        answer: 3,
        explanationVi:
          '"a few of our guests don’t eat meat" → anh lo về chế độ ăn của một số khách (D).',
        translationVi: 'Người đàn ông nêu ra mối lo ngại gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What will the man do this afternoon?',
        options: [
          'Send the woman a number of guests',
          'Revise a conference agenda',
          'Visit a catering kitchen',
          'Contact a seafood supplier',
        ],
        answer: 0,
        explanationVi:
          'Cô cần "a headcount" – anh nói "I’ll go through the registration list and send it to you this afternoon" → gửi số lượng khách (A). "headcount" = "number of guests".',
        translationVi: 'Người đàn ông sẽ làm gì vào chiều nay?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Telecommunications',
    transcript: [
      {
        speaker: 'W',
        accent: 'US',
        text: 'Brightwire Business Support, this is Keiko speaking.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'Hi, I’m calling from Halvorsen Architects. Our office Internet has been dropping out every half hour since we moved to the new floor on Monday.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'I’m sorry to hear that. Are all your devices affected, or just some of them?',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'Only the computers in the back meeting room and the two desks next to it.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'That sounds like a weak signal rather than a problem with the line. A signal booster usually solves that. I can have one couriered to you by Thursday.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'Thursday… We’re presenting to a client in that room tomorrow morning.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'I see. Then I could send a technician this afternoon to install a temporary access point. There’d be a sixty-dollar call-out fee, though.',
      },
      { speaker: 'M', accent: 'AU', text: 'That’s fine. Let’s do that.' },
    ],
    questions: [
      {
        text: 'What problem does the man report?',
        options: [
          'An Internet connection is unreliable.',
          'A bill contains an error.',
          'A computer screen is broken.',
          'A password no longer works.',
        ],
        answer: 0,
        explanationVi:
          '"Our office Internet has been dropping out every half hour" → kết nối Internet chập chờn (A, "unreliable").',
        translationVi: 'Người đàn ông báo vấn đề gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the man mean when he says, "We’re presenting to a client in that room tomorrow morning"?',
        options: [
          'He would like to reschedule a meeting.',
          'He needs to borrow some equipment.',
          'A proposed solution would come too late.',
          'The room will not be available for a technician.',
        ],
        answer: 2,
        explanationVi:
          'Cô đề nghị gửi bộ khuếch đại "by Thursday", anh đáp sáng mai đã thuyết trình trong phòng đó → giải pháp đến quá muộn (C). Ngay sau đó cô đưa phương án gửi kỹ thuật viên chiều nay.',
        translationVi:
          'Người đàn ông muốn nói gì khi nói "Sáng mai chúng tôi thuyết trình cho khách hàng trong phòng đó"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What does the woman mention about the technician’s visit?',
        options: [
          'It must be booked online.',
          'It involves an additional charge.',
          'It will take most of the day.',
          'It is covered by a warranty.',
        ],
        answer: 1,
        explanationVi:
          '"There’d be a sixty-dollar call-out fee, though" → có tính thêm phí (B, "additional charge" = "call-out fee").',
        translationVi:
          'Người phụ nữ đề cập gì về chuyến đến của kỹ thuật viên?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'HR',
    transcript: [
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Thanks for joining, both of you. We’ve narrowed the warehouse supervisor position down to two candidates, and we need to make a choice by Friday.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'I’d go with Mr. Abernathy. He’s run a team of forty at a distribution center for six years.',
      },
      {
        speaker: 'W2',
        accent: 'AU',
        text: 'His experience is impressive, but Ms. Lindqvist has already worked with the inventory software we’re switching to next month. That would save us weeks of training.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Good point. Could we ask each of them to do a short practical exercise — say, planning a week of shift schedules?',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'That would help. I can put together a sample staffing scenario tonight.',
      },
      {
        speaker: 'W2',
        accent: 'AU',
        text: 'And I’ll contact both candidates to arrange times on Wednesday.',
      },
    ],
    questions: [
      {
        text: 'What are the speakers mainly discussing?',
        options: [
          'A training budget',
          'A software upgrade',
          'A shift schedule',
          'A hiring decision',
        ],
        answer: 3,
        explanationVi:
          '"narrowed the warehouse supervisor position down to two candidates… make a choice by Friday" → bàn về quyết định tuyển dụng (D). "software", "shift schedules" là bẫy lặp từ.',
        translationVi: 'Những người nói chủ yếu đang thảo luận về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What advantage of Ms. Lindqvist does the second woman mention?',
        options: [
          'She can start work immediately.',
          'She is familiar with a system the company will use.',
          'She has managed a large team.',
          'She lives close to the warehouse.',
        ],
        answer: 1,
        explanationVi:
          '"Ms. Lindqvist has already worked with the inventory software we’re switching to" → cô đã quen với hệ thống công ty sắp dùng (B). Quản lý nhóm lớn (C) là ưu điểm của Mr. Abernathy.',
        translationVi:
          'Người phụ nữ thứ hai nhắc đến ưu điểm nào của cô Lindqvist?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the man offer to do?',
        options: [
          'Call the candidates',
          'Interview current staff',
          'Prepare a task for the candidates',
          'Rewrite a job advertisement',
        ],
        answer: 2,
        explanationVi:
          '"I can put together a sample staffing scenario tonight" → soạn bài tập thực hành cho ứng viên (C). Gọi ứng viên (A) là việc của người phụ nữ thứ hai.',
        translationVi: 'Người đàn ông đề nghị làm gì?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Arts',
    transcript: [
      {
        speaker: 'M',
        accent: 'US',
        text: 'Sunniva, the lighting for the textile exhibition looks wonderful, but the conservation team measured the light levels this morning, and they’re too high for the oldest tapestries.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Really? We used exactly the same fixtures as in the ceramics show.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Right, but ceramics don’t fade. Fabric does. The limit for those pieces is fifty lux, and we’re at nearly double that.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'I could turn those spotlights down, but then visitors will struggle to see the detail in the weaving.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'What if we installed motion sensors in that gallery? The lights would stay dim until someone walks up to a tapestry.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'That could work. I’ll ask our electrician whether the current fixtures can take sensors before I order anything.',
      },
    ],
    questions: [
      {
        text: 'What problem does the man mention?',
        options: [
          'Some displays have been damaged.',
          'The lighting is too strong for certain items.',
          'An exhibition opened later than planned.',
          'A gallery is too crowded.',
        ],
        answer: 1,
        explanationVi:
          '"light levels… too high for the oldest tapestries" → ánh sáng quá mạnh với một số hiện vật (B).',
        translationVi: 'Người đàn ông đề cập vấn đề gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'Why does the woman mention the ceramics show?',
        options: [
          'To explain a choice of equipment',
          'To suggest a new location',
          'To compare visitor numbers',
          'To complain about a budget',
        ],
        answer: 0,
        explanationVi:
          '"We used exactly the same fixtures as in the ceramics show" → cô giải thích vì sao chọn bộ đèn đó (A).',
        translationVi: 'Tại sao người phụ nữ nhắc đến buổi triển lãm gốm?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'What will the woman do before placing an order?',
        options: [
          'Move the tapestries to another gallery',
          'Measure the light levels again',
          'Rewrite some exhibit labels',
          'Check whether some devices are compatible',
        ],
        answer: 3,
        explanationVi:
          '"I’ll ask our electrician whether the current fixtures can take sensors before I order anything" → kiểm tra xem thiết bị có tương thích không (D).',
        translationVi: 'Người phụ nữ sẽ làm gì trước khi đặt hàng?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Marketing',
    transcript: [
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Darnell, the figures from the café loyalty app campaign are in. Downloads were up thirty percent in the first month.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'That’s great news. Are people actually using it, though?',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'That’s the odd part. Only about a fifth of the people who downloaded it have ordered anything through it.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Maybe most of them signed up just for the free coffee you get when you register.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'That’s what I suspect. I was thinking we could send a notification with a weekday offer — a free pastry with any drink before ten.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Mornings are our quietest period at the Riverside branch, so that might help. But I’d want to try it at one location first.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Fair enough. I’ll draft the message and run it by the Riverside manager tomorrow.',
      },
    ],
    questions: [
      {
        text: 'What are the speakers discussing?',
        options: [
          'The opening of a new branch',
          'Changes to staff schedules',
          'The results of a promotion',
          'The redesign of a menu',
        ],
        answer: 2,
        explanationVi:
          '"the figures from the café loyalty app campaign are in" → họ bàn kết quả một chiến dịch khuyến mãi (C).',
        translationVi: 'Những người nói đang thảo luận về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'According to the man, why might few customers be using the app?',
        options: [
          'It is difficult to navigate.',
          'Its prices are higher than in the café.',
          'Employees have not promoted it.',
          'People joined only for a welcome gift.',
        ],
        answer: 3,
        explanationVi:
          '"Maybe most of them signed up just for the free coffee you get when you register" → khách chỉ tải về để lấy quà khi đăng ký (D, "welcome gift").',
        translationVi:
          'Theo người đàn ông, tại sao có thể ít khách hàng dùng ứng dụng?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the man recommend?',
        options: [
          'Testing an offer at a single location',
          'Extending a branch’s opening hours',
          'Hiring additional morning staff',
          'Removing the app from sale',
        ],
        answer: 0,
        explanationVi:
          '"I’d want to try it at one location first" → thử ưu đãi ở một chi nhánh trước (A).',
        translationVi: 'Người đàn ông đề xuất điều gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Legal',
    transcript: [
      {
        speaker: 'W',
        accent: 'US',
        text: 'Mr. Pemberton, before we sign the renewal, our legal team flagged clause nine. It lets you raise prices with only thirty days’ notice.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'That clause has been in every version of our contract since 2019.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'I understand, but our budget is fixed at the start of the fiscal year. A mid-year increase would leave us scrambling.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Our raw material costs move with the market, so I can’t remove it altogether. What I could do is cap any increase at four percent and give you ninety days’ notice.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Ninety days would certainly help. Would that cap apply to the packaging fees as well?',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Packaging is billed by a separate division, so that’s not my call. Leave it with me — you’ll have an answer before your board meets on Thursday.',
      },
    ],
    questions: [
      {
        text: 'What is the woman concerned about?',
        options: [
          'Costs rising unexpectedly',
          'A shipment arriving late',
          'A decline in product quality',
          'Frequent changes in staff',
        ],
        answer: 0,
        explanationVi:
          'Điều khoản cho phép "raise prices with only thirty days’ notice" và "A mid-year increase would leave us scrambling" → cô lo chi phí tăng bất ngờ (A).',
        translationVi: 'Người phụ nữ lo ngại về điều gì?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'What does the man mean when he says, "That clause has been in every version of our contract since 2019"?',
        options: [
          'He thinks the clause was poorly written.',
          'He is reluctant to change the clause.',
          'He needs to look up some older records.',
          'He is surprised the woman did not read it earlier.',
        ],
        answer: 1,
        explanationVi:
          'Điều khoản đã có từ 2019 trong mọi bản hợp đồng → anh ngầm cho rằng nó là chuẩn, không muốn sửa (B). Sau đó anh nói rõ "I can’t remove it altogether".',
        translationVi:
          'Người đàn ông muốn nói gì khi nói "Điều khoản đó đã có trong mọi phiên bản hợp đồng của chúng tôi từ năm 2019"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What will the man most likely do before Thursday?',
        options: [
          'Revise a payment schedule',
          'Attend a board meeting',
          'Consult another part of his company',
          'Send some product samples',
        ],
        answer: 2,
        explanationVi:
          '"Packaging is billed by a separate division, so that’s not my call. Leave it with me" → anh sẽ hỏi bộ phận khác trong công ty (C). Cuộc họp hội đồng (B) là của công ty người phụ nữ.',
        translationVi: 'Người đàn ông có khả năng sẽ làm gì trước thứ Năm?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Software',
    transcript: [
      {
        speaker: 'M',
        accent: 'CA',
        text: 'The app update is scheduled to go out on Monday. Rafael, anything from support I should know about?',
      },
      {
        speaker: 'M2',
        accent: 'US',
        text: 'Just one thing. Since last week’s beta, about a dozen users have reported that the new photo upload fails on older Android phones.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'We traced that yesterday. It’s a memory issue on devices with less than three gigabytes of RAM. The fix is written, but it hasn’t been through full testing.',
      },
      { speaker: 'M', accent: 'CA', text: 'How long would testing take?' },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Realistically, four days. Our test phones for that range are booked for the payments project until Wednesday.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Then let’s not hold everything back. We’ll release on Monday but switch the photo feature off for those phones until the fix passes.',
      },
      {
        speaker: 'M2',
        accent: 'US',
        text: 'In that case, I’ll get a help-center article ready so my team has something to point affected users to.',
      },
    ],
    questions: [
      {
        text: 'What are the speakers mainly discussing?',
        options: [
          'A plan to hire testers',
          'The budget for a payments project',
          'The results of a customer survey',
          'An upcoming software release',
        ],
        answer: 3,
        explanationVi:
          '"The app update is scheduled to go out on Monday" và cả cuộc hội thoại xoay quanh việc có phát hành đúng hạn không → bản phát hành sắp tới (D). "payments project" là bẫy lặp từ.',
        translationVi: 'Những người nói chủ yếu đang thảo luận về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'Why can the fix not be tested right away?',
        options: [
          'A developer is on vacation.',
          'The code has not been written yet.',
          'Some necessary equipment is being used.',
          'Users have not replied to a request.',
        ],
        answer: 2,
        explanationVi:
          '"Our test phones for that range are booked for the payments project until Wednesday" → thiết bị cần thiết đang được dùng cho dự án khác (C). Bản sửa đã viết xong nên (B) sai.',
        translationVi: 'Tại sao bản sửa lỗi không thể kiểm thử ngay?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What will Rafael most likely do next?',
        options: [
          'Contact each affected user personally',
          'Prepare online instructions for customers',
          'Ask for the release to be postponed',
          'Test the fix on his own phone',
        ],
        answer: 1,
        explanationVi:
          'Rafael (người đàn ông thứ hai, bộ phận hỗ trợ): "I’ll get a help-center article ready" → soạn hướng dẫn trực tuyến cho khách hàng (B). Anh dùng bài viết để hướng dẫn chung, không liên hệ từng người (A).',
        translationVi: 'Rafael có khả năng sẽ làm gì tiếp theo?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Aviation',
    transcript: [
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Lorcan, Flight 418 to Halifax is fully boarded, but the cargo team says three pallets of medical supplies still haven’t been loaded.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'I know. The forklift on stand six broke down. They’re bringing another one over from the cargo terminal now.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'How long will that take? The crew reaches their maximum duty hours at nine forty. If we’re not off the gate by then, we’ll need a new crew, and there isn’t one on standby tonight.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'The forklift should be here in fifteen minutes. Loading takes another ten.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'That leaves us almost no margin. What if we leave the pallets for the morning flight?',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'The hospital is expecting them first thing tomorrow, though. Let me ask the cargo team whether they can load them by hand. The boxes are fairly light.',
      },
    ],
    questions: [
      {
        text: 'What has caused a delay?',
        options: [
          'Some crew members arrived late.',
          'A vehicle stopped working.',
          'The weather has worsened.',
          'A passenger is missing.',
        ],
        answer: 1,
        explanationVi:
          '"The forklift on stand six broke down" → một phương tiện (xe nâng) bị hỏng (B). Phi hành đoàn không đến muộn mà sắp hết giờ làm (A sai).',
        translationVi: 'Điều gì đã gây ra sự chậm trễ?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Why does the woman mention nine forty?',
        options: [
          'To point out a limit on how long staff can work',
          'To announce a new departure time',
          'To say when the morning flight leaves',
          'To report when a delivery is expected',
        ],
        answer: 0,
        explanationVi:
          '"The crew reaches their maximum duty hours at nine forty" → giới hạn thời gian làm việc của phi hành đoàn (A).',
        translationVi: 'Tại sao người phụ nữ nhắc đến 9 giờ 40?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'What will the man most likely do next?',
        options: [
          'Postpone the flight until morning',
          'Request a replacement crew',
          'Call the hospital to explain a delay',
          'Find out whether items can be moved without machinery',
        ],
        answer: 3,
        explanationVi:
          '"Let me ask the cargo team whether they can load them by hand" → hỏi xem có thể bốc hàng bằng tay, không cần máy (D). Bệnh viện chỉ được nhắc tới, anh không gọi (C).',
        translationVi: 'Người đàn ông có khả năng sẽ làm gì tiếp theo?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Fashion',
    transcript: [
      {
        speaker: 'W',
        accent: 'US',
        text: 'Teodor, I’ve just seen the samples for the autumn coats. The wool blend is gorgeous, but at this fabric cost, the retail price would be over four hundred dollars.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Our customers have paid that for outerwear before.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'For one or two statement pieces, yes. But this is meant to be our core line, and the sales data show most coat buyers stop at about two-fifty.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'I’d rather not swap the fabric. It’s what makes the whole design work.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Then what about keeping the wool blend but dropping the leather trim and the lined pockets? That alone brings the cost down by nearly a third.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'I can live with plain pockets. The trim is another story. Let me mock up a version with fabric trim and send you photos before Friday’s line review.',
      },
    ],
    questions: [
      {
        text: 'What is the woman concerned about?',
        options: [
          'A shipment of fabric is late.',
          'Some samples are the wrong size.',
          'A product will be priced too high for most shoppers.',
          'The quality of a material is poor.',
        ],
        answer: 2,
        explanationVi:
          '"the retail price would be over four hundred dollars" và "most coat buyers stop at about two-fifty" → giá quá cao với đa số khách (C). Cô khen chất liệu đẹp nên (D) sai.',
        translationVi: 'Người phụ nữ lo ngại về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the man mean when he says, "Our customers have paid that for outerwear before"?',
        options: [
          'He wants to raise prices across the store.',
          'He is checking some past sales records.',
          'He has received complaints from customers.',
          'He thinks the price may still be acceptable.',
        ],
        answer: 3,
        explanationVi:
          'Đáp lại lo ngại giá trên 400 đô, anh nói khách từng trả mức đó cho áo khoác → anh cho rằng giá này vẫn chấp nhận được (D). Cô phản bác ngay: chỉ với vài món nổi bật.',
        translationVi:
          'Người đàn ông muốn nói gì khi nói "Khách hàng của chúng ta từng trả mức đó cho áo khoác rồi"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What will the man most likely do before Friday?',
        options: [
          'Create an alternative version of a product',
          'Contact a fabric supplier',
          'Cancel a product review meeting',
          'Remove the trim from all the samples',
        ],
        answer: 0,
        explanationVi:
          '"Let me mock up a version with fabric trim and send you photos before Friday’s line review" → làm một phiên bản thay thế của sản phẩm (A). Anh không bỏ viền mà đổi viền da sang viền vải (D sai).',
        translationVi: 'Người đàn ông có khả năng sẽ làm gì trước thứ Sáu?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Research',
    transcript: [
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Before we start, the freezer in Lab C set off its alarm overnight. Esperanza, you were on call — what happened?',
      },
      {
        speaker: 'W2',
        accent: 'CA',
        text: 'The temperature rose to minus sixty for about two hours. Facilities found a failed compressor, and everything’s been moved to the backup unit.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Minus sixty… The enzyme samples for the Calder study are rated for minus eighty. We may have to rerun the stability tests before we report anything.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Rerunning them would push the report past the sponsor’s deadline at the end of the month.',
      },
      {
        speaker: 'W2',
        accent: 'CA',
        text: 'Not necessarily. The data logger shows the samples were only above minus seventy for forty minutes, and the sponsor’s protocol allows short excursions as long as they’re documented.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Then I’ll go back through that section of the protocol this morning to make sure we qualify.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Good. And Esperanza, please write up the incident while the details are fresh.',
      },
    ],
    questions: [
      {
        text: 'What happened overnight?',
        options: [
          'A storage unit malfunctioned.',
          'Some samples were delivered late.',
          'A stability test failed.',
          'An alarm system was switched off.',
        ],
        answer: 0,
        explanationVi:
          '"the freezer in Lab C set off its alarm… a failed compressor" → thiết bị bảo quản bị hỏng (A, "storage unit" = "freezer").',
        translationVi: 'Điều gì đã xảy ra trong đêm?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'Why is the man worried?',
        options: [
          'The backup unit is already full.',
          'A sponsor has moved a deadline.',
          'Some results might no longer be reliable.',
          'A colleague did not respond to an alarm.',
        ],
        answer: 2,
        explanationVi:
          'Mẫu chuẩn "minus eighty" nhưng đã lên "minus sixty" → "We may have to rerun the stability tests" → anh lo kết quả không còn đáng tin (C). Hạn chót không bị dời (B sai).',
        translationVi: 'Tại sao người đàn ông lo lắng?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'What does the man say he will do?',
        options: [
          'Contact the study’s sponsor',
          'Review part of a set of rules',
          'Repeat some laboratory tests',
          'Write an incident report',
        ],
        answer: 1,
        explanationVi:
          '"I’ll go back through that section of the protocol" → xem lại một phần của bộ quy định (B, "protocol" = "set of rules"). Viết báo cáo sự cố (D) là việc của Esperanza.',
        translationVi: 'Người đàn ông nói anh sẽ làm gì?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Shipping',
    transcript: [
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Mr. Delacroix, it’s Annika from Portside Brokerage. I’m afraid customs is holding your shipment of espresso machines at the port.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Holding it? We’ve imported the same model from that factory three times this year.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'The model’s the same, but this time the invoice lists them as “kitchen appliances” rather than “commercial coffee equipment.” That changes the tariff code, so the duty you paid doesn’t match.',
      },
      { speaker: 'M', accent: 'CA', text: 'So we’ve underpaid?' },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Actually, you’ve overpaid. But customs won’t release anything until the paperwork is consistent. If the factory sends a corrected invoice today, I can resubmit everything tonight.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'It’s already evening in Milan, but someone’s usually in their export office late. I’ll call them directly.',
      },
    ],
    questions: [
      {
        text: 'Why is the woman calling?',
        options: [
          'To request payment for storage fees',
          'To arrange a delivery time',
          'To report that some goods were damaged',
          'To explain why a shipment has not been released',
        ],
        answer: 3,
        explanationVi:
          '"customs is holding your shipment… at the port" và cô giải thích nguyên nhân → báo vì sao lô hàng chưa được thông quan (D).',
        translationVi: 'Tại sao người phụ nữ gọi điện?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What has caused the problem?',
        options: [
          'The importer paid too little duty.',
          'Products were described differently in a document.',
          'The shipment came from a new factory.',
          'A form is missing a signature.',
        ],
        answer: 1,
        explanationVi:
          'Hóa đơn ghi "kitchen appliances" thay vì "commercial coffee equipment" → hàng được mô tả khác trong chứng từ (B). Bẫy (A): người đàn ông đoán "underpaid" nhưng thực ra là "overpaid".',
        translationVi: 'Điều gì đã gây ra vấn đề?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'What will the man most likely do next?',
        options: [
          'Pay an additional fee',
          'Resubmit some forms himself',
          'Telephone a supplier',
          'Cancel an order',
        ],
        answer: 2,
        explanationVi:
          'Cần nhà máy gửi hóa đơn sửa → "I’ll call them directly" (văn phòng xuất khẩu của nhà máy ở Milan) → gọi cho nhà cung cấp (C). Nộp lại hồ sơ (B) là việc của người phụ nữ.',
        translationVi: 'Người đàn ông có khả năng sẽ làm gì tiếp theo?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Real estate',
    transcript: [
      {
        speaker: 'M',
        accent: 'AU',
        text: 'Marisol, the landlord’s agent called. The tenant upstairs is leaving, and they’ve offered us the entire fourth floor at our current rate per square meter.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Interesting. We’ll need about twenty more desks by spring if the Lisbon team relocates here.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'That’s what I thought. The catch is that we’d have to sign a seven-year lease instead of renewing for three.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Seven years is a long time. Who knows how many of us will be working from home by then?',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'True. But the agent hinted they’d add an option to leave after year four if we commit by the end of the month.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Then let’s get that in writing first. Once we have the terms, I’ll take them to the finance committee. They’ll want to compare the cost with renting coworking space instead.',
      },
    ],
    questions: [
      {
        text: 'What has the landlord’s agent offered?',
        options: [
          'A reduction in rent',
          'Additional office space',
          'Free parking for staff',
          'A renovation of the building',
        ],
        answer: 1,
        explanationVi:
          '"they’ve offered us the entire fourth floor at our current rate" → thêm không gian văn phòng (B). Giá giữ nguyên chứ không giảm (A sai).',
        translationVi: 'Người đại diện của chủ nhà đã đề nghị điều gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the woman imply when she says, "Who knows how many of us will be working from home by then"?',
        options: [
          'The company may need less space in the future.',
          'She would prefer to work from home herself.',
          'The fourth floor is too small for the Lisbon team.',
          'Employees like the current building.',
        ],
        answer: 0,
        explanationVi:
          'Phản ứng với hợp đồng 7 năm: không biết khi đó bao nhiêu người làm ở nhà → nhu cầu diện tích có thể giảm, cam kết dài hạn là rủi ro (A).',
        translationVi:
          'Người phụ nữ ngụ ý gì khi nói "Ai biết được đến lúc đó bao nhiêu người trong chúng ta sẽ làm việc tại nhà"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What will the woman do after receiving the terms?',
        options: [
          'Sign a three-year renewal',
          'Visit a coworking space',
          'Meet with the landlord’s agent',
          'Present the offer to a group for review',
        ],
        answer: 3,
        explanationVi:
          '"Once we have the terms, I’ll take them to the finance committee" → trình đề nghị cho một nhóm xem xét (D). "coworking space" chỉ là phương án ủy ban sẽ so sánh (B là bẫy).',
        translationVi:
          'Người phụ nữ sẽ làm gì sau khi nhận được các điều khoản?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
]
