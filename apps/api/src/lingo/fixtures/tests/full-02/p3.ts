/** Full Test 02, Part 3: written for Lingo (not from ETS). */
export const P3: object[] = [
  {
    difficulty: 'EASY',
    topic: 'Retail',
    transcript: [
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Excuse me, I’d like a gallon of paint mixed to match this color chip. It’s from a kitchen cabinet I’m repainting.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'I’m sorry, our color-matching machine is being serviced today. The technician said it should be working again by tomorrow morning.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Oh, that’s a shame. I was hoping to finish the cabinets this weekend.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Well, if you leave the chip with me, I can scan it first thing tomorrow and have the paint ready for you by ten.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'That would work. I pass by here on my way to the office anyway.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Great. Just write your name and phone number on this form, and I’ll send you a text message when it’s ready.',
      },
    ],
    questions: [
      {
        text: 'Where most likely are the speakers?',
        options: [
          'At a furniture showroom',
          'At an office building',
          'At a hardware store',
          'At a phone repair shop',
        ],
        answer: 2,
        explanationVi:
          'Khách muốn pha sơn theo mẫu màu ("a gallon of paint mixed to match this color chip"), cửa hàng có máy pha màu → cửa hàng vật liệu, sơn (C). "cabinet", "office", "phone" chỉ là bẫy lặp từ.',
        translationVi: 'Những người nói nhiều khả năng đang ở đâu?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'What problem does the woman mention?',
        options: [
          'A machine is unavailable.',
          'A color has been discontinued.',
          'A technician is late.',
          'Some cabinets are damaged.',
        ],
        answer: 0,
        explanationVi:
          '"our color-matching machine is being serviced today" → máy đang được bảo trì, không dùng được (A). Kỹ thuật viên không đến muộn (C).',
        translationVi: 'Người phụ nữ đề cập đến vấn đề gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the woman ask the man to do?',
        options: [
          'Come back this weekend',
          'Bring a larger color sample',
          'Pay for the paint in advance',
          'Provide his contact details',
        ],
        answer: 3,
        explanationVi:
          '"write your name and phone number on this form" → cung cấp thông tin liên lạc (D). "this weekend" là lúc anh định sơn tủ, không phải yêu cầu của cô (A).',
        translationVi: 'Người phụ nữ yêu cầu người đàn ông làm gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Hospitality',
    transcript: [
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Andre, Priya, I’ve just seen the forecast. Heavy rain is expected on Saturday evening, so we can’t hold the Halvorsen Pharmaceuticals dinner on the rooftop terrace.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'That’s a pity. The whole grill menu was built around the terrace. And where would we put eighty guests?',
      },
      {
        speaker: 'W2',
        accent: 'AU',
        text: 'The Juniper Ballroom is free that night, since a wedding cancelled last week. But it doesn’t have a built-in sound system, and their CEO is giving a speech.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'I’ll rent a portable speaker and a microphone from the AV company we used in the spring.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'As for the food, I can’t grill indoors because of the ventilation, so I’ll switch the main courses to oven-roasted dishes. The client should approve that, though.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Agreed. Priya, could you call their event coordinator this afternoon and explain the changes? She’d rather hear it from you, since you took the booking.',
      },
      {
        speaker: 'W2',
        accent: 'AU',
        text: 'Sure. I’ll also offer them a complimentary welcome drink to make up for the inconvenience.',
      },
    ],
    questions: [
      {
        text: 'What problem does the first woman mention?',
        options: [
          'A ballroom has been double-booked.',
          'Bad weather is expected.',
          'A client has reduced the number of guests.',
          'Some kitchen equipment is broken.',
        ],
        answer: 1,
        explanationVi:
          '"Heavy rain is expected on Saturday evening" → dự báo thời tiết xấu (B). Phòng tiệc đang trống chứ không bị đặt trùng (A).',
        translationVi: 'Người phụ nữ thứ nhất đề cập đến vấn đề gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the man say he will do?',
        options: [
          'Rent some sound equipment',
          'Install a ventilation system',
          'Prepare food on a grill',
          'Change some menu items',
        ],
        answer: 3,
        explanationVi:
          'Đầu bếp nói "I’ll switch the main courses to oven-roasted dishes" → đổi một số món (D). Thuê loa (A) là việc của người phụ nữ thứ nhất; "grill", "ventilation" là bẫy lặp từ.',
        translationVi: 'Người đàn ông nói anh ấy sẽ làm gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What is Priya asked to do?',
        options: [
          'Contact a client',
          'Cancel a wedding',
          'Book an AV company',
          'Write a speech',
        ],
        answer: 0,
        explanationVi:
          '"Priya, could you call their event coordinator… and explain the changes?" → liên hệ khách hàng (A). Đám cưới đã tự hủy từ trước (B).',
        translationVi: 'Priya được yêu cầu làm gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Logistics',
    transcript: [
      {
        speaker: 'M',
        accent: 'AU',
        text: 'Hi, Dolores, it’s Kevin. I’m at Westfield Hospital Supply with the pallets of gloves, but their receiving dock is closed for resurfacing. Nobody told us.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Oh no. Their purchasing manager didn’t mention anything when she confirmed the delivery. Is there anyone there who can sign for it?',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'Just a security guard. He says they’re taking deliveries at their other building on Larch Road, about twenty minutes away.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Larch Road… Their receiving gate there closes at three thirty.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'It’s ten past three now, and traffic on the ring road is heavy.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Then let’s not risk it. Bring the load back to our depot, and I’ll book a morning slot with them for tomorrow.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'OK. Should I keep the pallets on the truck overnight?',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'No, unload them into bay six. That truck’s needed for an early run.',
      },
    ],
    questions: [
      {
        text: 'Why is the man calling?',
        options: [
          'To report a delivery problem',
          'To confirm a pickup time',
          'To ask for a schedule change',
          'To order more supplies',
        ],
        answer: 0,
        explanationVi:
          '"their receiving dock is closed… Nobody told us" → anh gọi để báo sự cố giao hàng (A). Việc đổi lịch là do người phụ nữ đề xuất sau đó (C).',
        translationVi: 'Tại sao người đàn ông gọi điện?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the woman mean when she says, "Their receiving gate there closes at three thirty"?',
        options: [
          'The man should call the gate staff.',
          'The other building is easy to find.',
          'The man may not arrive in time.',
          'The delivery was scheduled incorrectly.',
        ],
        answer: 2,
        explanationVi:
          'Đường đi mất 20 phút, lúc đó đã 3 giờ 10 và tắc đường → cô ngụ ý anh có thể không kịp đến (C). Sau đó cô quyết định "let’s not risk it".',
        translationVi:
          'Người phụ nữ muốn nói gì khi nói "Cổng nhận hàng ở đó đóng lúc ba giờ rưỡi"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What does the woman tell the man to do with the pallets?',
        options: [
          'Leave them with a security guard',
          'Unload them at their own company’s site',
          'Keep them on the truck overnight',
          'Take them to Larch Road',
        ],
        answer: 1,
        explanationVi:
          '"Bring the load back to our depot… unload them into bay six" → dỡ hàng tại kho của công ty mình (B). Cô bảo không để trên xe qua đêm (C sai).',
        translationVi:
          'Người phụ nữ bảo người đàn ông làm gì với các pallet hàng?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Healthcare',
    transcript: [
      {
        speaker: 'M',
        accent: 'US',
        text: 'Fiona, the insurance reimbursements for October are way down. Do you know what’s going on?',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'I do. Since the first of the month, two of the larger insurers have required the new diagnosis codes on every claim. Our scheduling software still sends the old ones, so roughly a fifth of our claims have bounced back.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'A fifth? Can’t we just resubmit them?',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'We can, but each one has to be corrected by hand. Hassan and I have done about forty, and there are over three hundred to go.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'The software vendor promised an update in their newsletter, didn’t they?',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'They did, in the spring.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'I see. Well, we can’t wait for them. What if we brought in a temporary billing specialist for a few weeks?',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'That would help a lot. And in the meantime, I’d like to set up a short checklist so the front desk catches the old codes before claims go out.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Good idea. Put it together, and I’ll go over it with the reception staff at Monday’s meeting.',
      },
    ],
    questions: [
      {
        text: 'What problem are the speakers discussing?',
        options: [
          'Patients are missing appointments.',
          'A newsletter contained errors.',
          'Staff were trained on the wrong software.',
          'Many payment requests have been rejected.',
        ],
        answer: 3,
        explanationVi:
          '"roughly a fifth of our claims have bounced back" → nhiều yêu cầu thanh toán bảo hiểm bị trả lại (D, "claims" → "payment requests"). "newsletter", "software" là bẫy lặp từ.',
        translationVi: 'Những người nói đang thảo luận về vấn đề gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the woman mean when she says, "They did, in the spring"?',
        options: [
          'The update was installed some time ago.',
          'The vendor has not kept its promise.',
          'She has not read the newsletter.',
          'The problem started earlier than expected.',
        ],
        answer: 1,
        explanationVi:
          'Nhà cung cấp hứa cập nhật từ mùa xuân mà đến tháng 10 vẫn chưa có → cô ngụ ý họ không giữ lời (B). Người đàn ông hiểu ý nên nói "we can’t wait for them".',
        translationVi:
          'Người phụ nữ muốn nói gì khi nói "Họ có hứa, từ hồi mùa xuân"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What will the man do on Monday?',
        options: [
          'Hire a billing specialist',
          'Call the software vendor',
          'Review a procedure with employees',
          'Resubmit some claims',
        ],
        answer: 2,
        explanationVi:
          '"I’ll go over it with the reception staff at Monday’s meeting" ("it" = checklist) → xem lại quy trình với nhân viên (C). Thuê chuyên viên (A) chỉ là đề xuất, không gắn với thứ Hai.',
        translationVi: 'Người đàn ông sẽ làm gì vào thứ Hai?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Office',
    transcript: [
      {
        speaker: 'W',
        accent: 'US',
        text: 'Hi, Tom. I sent a document to the printer on the third floor ten minutes ago, but nothing has come out.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Did you tap your ID card at the machine? Since last week, print jobs are held until you tap your badge on the reader. It’s to stop confidential pages from being left lying around.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Oh, I must have missed that announcement. I was on leave last week.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'It was in an e-mail from Facilities. Here, just hold your card against the panel on the right.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'There it goes. Thanks! How long do jobs stay in the queue?',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Twenty-four hours, then they’re deleted automatically. I’ll forward you that e-mail so you have all the details.',
      },
    ],
    questions: [
      {
        text: 'What is the woman’s problem?',
        options: [
          'Her ID card is damaged.',
          'Her document has not printed.',
          'She cannot find a meeting room.',
          'She deleted a file by mistake.',
        ],
        answer: 1,
        explanationVi:
          '"I sent a document to the printer… but nothing has come out" → tài liệu chưa được in ra (B).',
        translationVi: 'Vấn đề của người phụ nữ là gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'According to the man, why was a change made?',
        options: [
          'To protect private information',
          'To save paper',
          'To reduce printer repairs',
          'To track employee attendance',
        ],
        answer: 0,
        explanationVi:
          '"to stop confidential pages from being left lying around" → để bảo vệ thông tin mật (A, "confidential" → "private").',
        translationVi: 'Theo người đàn ông, tại sao có sự thay đổi?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the man say he will do?',
        options: [
          'Contact the Facilities department',
          'Replace a badge reader',
          'Print the document for her',
          'Send her a message he received',
        ],
        answer: 3,
        explanationVi:
          '"I’ll forward you that e-mail" → chuyển tiếp cho cô email anh đã nhận (D). "Facilities" chỉ là nơi gửi email (A là bẫy).',
        translationVi: 'Người đàn ông nói anh ấy sẽ làm gì?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Publishing',
    transcript: [
      {
        speaker: 'M',
        accent: 'US',
        text: 'Thanks for meeting on short notice. The author of "The Salt Road" has seen the cover proof, and she isn’t happy. She thinks the desert photograph makes the book look like a travel guide, not a novel.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'That’s fair, actually. I had the same worry. I could try an illustrated cover instead, maybe a caravan in silhouette.',
      },
      {
        speaker: 'M2',
        accent: 'CA',
        text: 'How long would that take, though? The fall catalog goes out to bookstores on the twentieth, and the cover has to be in it.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'If I put the poster project aside for a few days, I could have two sketches ready by Thursday.',
      },
      {
        speaker: 'M2',
        accent: 'CA',
        text: 'Then we’d still have time. The poster can wait until next month.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Good. I’ll let the author know we’re working on alternatives. Maybe she’d like to see the sketches before we pick one?',
      },
      {
        speaker: 'M2',
        accent: 'CA',
        text: 'I’d keep that to one round of feedback, or we’ll miss the catalog.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Fair enough. One round, then.',
      },
    ],
    questions: [
      {
        text: 'What are the speakers mainly discussing?',
        options: [
          'Planning a promotional trip',
          'Choosing photographs for a guide',
          'Revising the design of a book',
          'Printing a fall catalog',
        ],
        answer: 2,
        explanationVi:
          'Tác giả không hài lòng với "the cover proof", cả nhóm bàn làm bìa minh họa thay thế → sửa thiết kế bìa sách (C). "travel guide", "catalog" là bẫy lặp từ.',
        translationVi: 'Những người nói chủ yếu đang thảo luận về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What will happen on the twentieth?',
        options: [
          'An author will visit the office.',
          'A poster will be displayed.',
          'Some sketches will be reviewed.',
          'A publication will be sent to stores.',
        ],
        answer: 3,
        explanationVi:
          '"The fall catalog goes out to bookstores on the twentieth" → một ấn phẩm được gửi đến các nhà sách (D). Bản phác thảo xong vào thứ Năm (C sai).',
        translationVi: 'Điều gì sẽ diễn ra vào ngày 20?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the second man suggest?',
        options: [
          'Limiting the number of reviews',
          'Delaying a novel’s release',
          'Hiring an outside illustrator',
          'Using a different photograph',
        ],
        answer: 0,
        explanationVi:
          '"I’d keep that to one round of feedback, or we’ll miss the catalog" → chỉ cho góp ý một vòng (A). Anh lo trễ catalog chứ không đề xuất hoãn phát hành (B).',
        translationVi: 'Người đàn ông thứ hai đề xuất điều gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Retail',
    transcript: [
      {
        speaker: 'M',
        accent: 'US',
        text: 'Megan, I’ve read your report on the self-checkout trial. Six weeks in, and the lines at the front of the store are shorter. That’s encouraging.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Shorter at most times, yes. But I’d point you to the second page. Losses from unscanned items have nearly doubled over the same period.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Doubled? The vendor told us the weight sensors would catch most of that.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'They catch heavy items. It’s the small, expensive things, like batteries and razor blades, that are slipping through.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Hmm. Head office was planning to roll the machines out to twelve more stores in January.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'I wouldn’t sign anything just yet. Some stores have had luck putting an attendant beside the machines during busy hours. I’d like to try that here for a month before anyone decides.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'All right. I’ll ask head office to hold off on the order, and you send me the figures every week.',
      },
    ],
    questions: [
      {
        text: 'What is the woman’s report about?',
        options: [
          'A test of new equipment',
          'A staff training plan',
          'Customer satisfaction scores',
          'The opening of new stores',
        ],
        answer: 0,
        explanationVi:
          '"your report on the self-checkout trial" → báo cáo về đợt thử nghiệm máy tự thanh toán (A, "trial" → "test"). "twelve more stores" là bẫy cho (D).',
        translationVi: 'Báo cáo của người phụ nữ nói về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the woman mean when she says, "I’d point you to the second page"?',
        options: [
          'The report has a printing error.',
          'Some results are less positive.',
          'A vendor’s figures are missing.',
          'The man has read the wrong document.',
        ],
        answer: 1,
        explanationVi:
          'Anh khen hàng chờ ngắn hơn; cô lưu ý trang 2 rồi nói tổn thất "nearly doubled" → cô ngụ ý có kết quả không mấy tích cực (B).',
        translationVi:
          'Người phụ nữ muốn nói gì khi nói "Tôi muốn anh xem trang thứ hai"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What does the man agree to do?',
        options: [
          'Hire more attendants',
          'Visit twelve stores',
          'Postpone a purchase',
          'Contact a vendor',
        ],
        answer: 2,
        explanationVi:
          '"I’ll ask head office to hold off on the order" → hoãn việc đặt mua máy (C). Đặt nhân viên đứng cạnh máy (A) là đề xuất thử nghiệm của người phụ nữ.',
        translationVi: 'Người đàn ông đồng ý làm gì?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Healthcare',
    transcript: [
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Lakeview Physiotherapy, this is Corinne speaking.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Hi, it’s Owen Barker. I have a session with Dr. Sandoval on Thursday at nine, but I’ve been asked to attend a training course that morning. Could I move it?',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Let me see… Dr. Sandoval has an opening on Friday at four thirty. However, I notice the referral from your family doctor covered eight sessions, and Thursday’s would be your eighth.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Oh. Does that mean I can’t come on Friday?',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'You can, but without a new referral, your insurance won’t cover the visit. You’d have to pay the full fee yourself.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'I see. I’ll ask my doctor’s office to send a new one today.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Good. If they fax it to us by Friday morning, you’ll be all set. I’ll put you down for four thirty.',
      },
    ],
    questions: [
      {
        text: 'Why is the man calling?',
        options: [
          'To ask about a training course',
          'To request a refund',
          'To book a first consultation',
          'To change an appointment',
        ],
        answer: 3,
        explanationVi:
          '"I have a session… on Thursday… Could I move it?" → gọi để đổi lịch hẹn (D). Khóa đào tạo chỉ là lý do (A là bẫy).',
        translationVi: 'Tại sao người đàn ông gọi điện?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the woman point out?',
        options: [
          'A doctor is on leave.',
          'A fee has recently increased.',
          'A referral is nearly used up.',
          'An insurance company has closed.',
        ],
        answer: 2,
        explanationVi:
          '"your referral… covered eight sessions, and Thursday’s would be your eighth" → giấy giới thiệu sắp hết số buổi (C).',
        translationVi: 'Người phụ nữ lưu ý điều gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the man say he will do?',
        options: [
          'Pay a fee in advance',
          'Request a new document from his doctor',
          'Fax a form to the clinic',
          'Attend a session on Thursday',
        ],
        answer: 1,
        explanationVi:
          '"I’ll ask my doctor’s office to send a new one today" → xin giấy giới thiệu mới từ bác sĩ (B). Văn phòng bác sĩ mới là bên fax (C sai).',
        translationVi: 'Người đàn ông nói anh ấy sẽ làm gì?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Logistics',
    transcript: [
      {
        speaker: 'W',
        accent: 'US',
        text: 'Thanks for joining, both of you. Our shipment of spring jackets is still sitting at the port, and stores expect them on the shelves in two weeks. What’s the holdup?',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Customs flagged the container for inspection. Apparently the fabric description on the commercial invoice doesn’t match the packing list. One says polyester blend, the other says nylon.',
      },
      {
        speaker: 'M2',
        accent: 'AU',
        text: 'That’s a fairly common issue. If your supplier sends a corrected invoice, I can file an amendment the same day. Inspections usually take three to five working days after that.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Three to five days, plus trucking. That’s cutting it close. Graham, is there any way to get part of the order out sooner?',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'The forty cartons of your best-selling style are packed separately. If customs agrees, we could release those first and fly them straight to your distribution center.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'That would cost more, but missing the launch would cost more still. Let’s try it.',
      },
      {
        speaker: 'M2',
        accent: 'AU',
        text: 'I’ll need the corrected invoice before I can request a partial release, though.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'I’ll call the supplier as soon as we hang up. It’s already morning in their time zone.',
      },
    ],
    questions: [
      {
        text: 'Why has the shipment been delayed?',
        options: [
          'A container was damaged at the port.',
          'Some documents contain conflicting information.',
          'A supplier sent the wrong fabric.',
          'A truck was not available.',
        ],
        answer: 1,
        explanationVi:
          '"the fabric description on the commercial invoice doesn’t match the packing list" → hai chứng từ ghi thông tin mâu thuẫn (B). Không ai nói vải bị gửi sai (C là bẫy dùng "fabric").',
        translationVi: 'Tại sao lô hàng bị chậm trễ?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does Graham suggest?',
        options: [
          'Shipping some items separately by plane',
          'Postponing a product launch',
          'Hiring a different customs broker',
          'Repacking some cartons',
        ],
        answer: 0,
        explanationVi:
          'Graham (người được hỏi) đề xuất "release those first and fly them straight to your distribution center" → gửi trước một phần hàng bằng máy bay (A). Các thùng đã được đóng riêng sẵn (D sai).',
        translationVi: 'Graham đề xuất điều gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What will the woman most likely do next?',
        options: [
          'File a customs amendment',
          'Book an air shipment',
          'Visit a distribution center',
          'Contact a supplier',
        ],
        answer: 3,
        explanationVi:
          '"I’ll call the supplier as soon as we hang up" → liên hệ nhà cung cấp (D). Nộp bản sửa đổi hải quan (A) là việc của người đàn ông thứ hai.',
        translationVi: 'Người phụ nữ nhiều khả năng sẽ làm gì tiếp theo?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Hospitality',
    transcript: [
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Good morning. I’m here for the dental equipment trade show at the convention center. Does the hotel still run a shuttle there?',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'We do, but the schedule changed this week. It now leaves the side entrance every half hour, starting at seven thirty.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Good. My first meeting is at eight thirty. How long is the ride?',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'About fifteen minutes, so the eight o’clock shuttle should be fine. Just show your room key to the driver.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Perfect. And is there anywhere to get a quick breakfast before then? The restaurant looks crowded.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'There’s a coffee cart in the lobby. They sell muffins and fruit cups as well. Here, take this voucher. It’s good for a free coffee.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'That’s very kind. Thank you.',
      },
    ],
    questions: [
      {
        text: 'Where most likely does the man work?',
        options: [
          'At a convention center',
          'At a dental clinic',
          'At a hotel',
          'At a train station',
        ],
        answer: 2,
        explanationVi:
          'Khách hỏi "Does the hotel still run a shuttle there?", anh nhắc chìa khóa phòng → anh làm ở khách sạn (C). "convention center", "dental" là bẫy lặp từ.',
        translationVi: 'Người đàn ông nhiều khả năng làm việc ở đâu?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'What should the woman show the driver?',
        options: [
          'A trade show badge',
          'A meeting schedule',
          'A coffee voucher',
          'Her room key',
        ],
        answer: 3,
        explanationVi:
          '"Just show your room key to the driver" → đưa chìa khóa phòng (D).',
        translationVi: 'Người phụ nữ nên đưa cho tài xế xem gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the man give the woman?',
        options: [
          'A coupon for a drink',
          'A breakfast menu',
          'A shuttle timetable',
          'A bag of fruit',
        ],
        answer: 0,
        explanationVi:
          '"take this voucher. It’s good for a free coffee" → phiếu đổi một ly đồ uống (A, "voucher" → "coupon").',
        translationVi: 'Người đàn ông đưa cho người phụ nữ cái gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Publishing',
    transcript: [
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Hi, Luis. It’s Harriet from Coastal Living Quarterly. I’m afraid the harbor authority has only approved our photo shoot at the lighthouse for two hours on the twelfth, from six to eight in the morning.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Two hours is fine. I’ve worked with tighter windows. And the early light will actually be better.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Glad to hear it. The other thing is that the art director wants a few vertical shots for the cover this time, not just horizontal ones for the feature pages.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'No problem. Will someone from the magazine be there? I’ll need a second pair of hands to hold the reflectors.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Our editorial assistant, Bea, can come. She’ll also bring the parking permit, since the lighthouse lot is restricted.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Great. Could you send me her mobile number so we can arrange where to meet?',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Of course. I’ll text it to you this afternoon.',
      },
    ],
    questions: [
      {
        text: 'What is the conversation mainly about?',
        options: [
          'Arrangements for a photo shoot',
          'Renewing a magazine subscription',
          'Repairs to a lighthouse',
          'Hiring an art director',
        ],
        answer: 0,
        explanationVi:
          'Hai người bàn giờ chụp, kiểu ảnh, người hỗ trợ, giấy đỗ xe cho buổi "photo shoot at the lighthouse" → sắp xếp buổi chụp ảnh (A).',
        translationVi: 'Cuộc hội thoại chủ yếu nói về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the man mean when he says, "I’ve worked with tighter windows"?',
        options: [
          'He would like a larger workspace.',
          'He is not worried about the time limit.',
          'He prefers to work indoors.',
          'He needs an earlier start time.',
        ],
        answer: 1,
        explanationVi:
          'Được báo chỉ có hai tiếng, anh nói "Two hours is fine" rồi câu này → anh từng làm với khung giờ còn ngắn hơn, không lo về giới hạn thời gian (B). "windows" ở đây là khung thời gian, không phải cửa sổ.',
        translationVi:
          'Người đàn ông muốn nói gì khi nói "Tôi từng làm với khung giờ còn eo hẹp hơn"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What does the man ask for?',
        options: [
          'A parking permit',
          'Additional reflectors',
          'A staff member’s phone number',
          'A copy of the cover',
        ],
        answer: 2,
        explanationVi:
          '"Could you send me her mobile number…?" → xin số điện thoại của trợ lý Bea (C). Giấy đỗ xe Bea sẽ tự mang (A là bẫy).',
        translationVi: 'Người đàn ông yêu cầu điều gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Office',
    transcript: [
      {
        speaker: 'W',
        accent: 'AU',
        text: 'So it’s been a month since we switched to the desk-booking app. I’d like some honest feedback before I report to the directors.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Booking is easy enough, but on Tuesdays and Wednesdays every desk is taken by nine. People who come in later end up working in the cafeteria.',
      },
      {
        speaker: 'W2',
        accent: 'US',
        text: 'That’s partly because people reserve desks and then don’t show up. Yesterday I counted eleven empty desks that were marked as booked.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Eleven? Then the problem isn’t really space.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Right. Could the app release a desk automatically if nobody checks in by, say, ten?',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'I believe there’s a setting for that. I’ll ask IT to switch it on. Joanna, would you mind keeping a count for another two weeks, so we can see whether it helps?',
      },
      {
        speaker: 'W2',
        accent: 'US',
        text: 'Happy to. I’ll put the numbers in a shared spreadsheet.',
      },
    ],
    questions: [
      {
        text: 'What are the speakers mainly discussing?',
        options: [
          'A cafeteria renovation',
          'An upcoming directors’ meeting',
          'The results of a staff survey',
          'A new reservation system',
        ],
        answer: 3,
        explanationVi:
          '"a month since we switched to the desk-booking app" và cả nhóm góp ý về nó → hệ thống đặt chỗ mới (D). "cafeteria", "directors" là bẫy lặp từ.',
        translationVi: 'Những người nói chủ yếu đang thảo luận về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the first woman mean when she says, "Then the problem isn’t really space"?',
        options: [
          'The office should be expanded.',
          'The cafeteria is too small.',
          'More desks are not needed.',
          'The app is difficult to use.',
        ],
        answer: 2,
        explanationVi:
          'Có 11 bàn đã đặt mà bỏ trống → thiếu chỗ là do người đặt không đến, không phải do thiếu bàn (C). Ngược lại với (A).',
        translationVi:
          'Người phụ nữ thứ nhất muốn nói gì khi nói "Vậy thì vấn đề thực ra không nằm ở chỗ ngồi"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What is Joanna asked to do?',
        options: [
          'Continue tracking desk use',
          'Contact the IT department',
          'Change an app setting',
          'Arrive earlier on Tuesdays',
        ],
        answer: 0,
        explanationVi:
          '"Joanna, would you mind keeping a count for another two weeks" → tiếp tục theo dõi số bàn bị bỏ trống (A). Liên hệ IT (B) là việc người phụ nữ thứ nhất tự làm.',
        translationVi: 'Joanna được yêu cầu làm gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Retail',
    transcript: [
      {
        speaker: 'W',
        accent: 'US',
        text: 'Hi, I run a small online tea shop, and our customers keep asking us to stop using plastic mailers. Do you carry paper-based ones?',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'We do. Our recycled kraft mailers are padded with paper honeycomb instead of bubble wrap, and they’re fully compostable.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'That sounds ideal. What’s the price for, say, five hundred?',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'The minimum order for that line is two thousand, I’m afraid. It works out to about thirty cents each.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Two thousand would take us most of a year to use up, and we only have a small stockroom.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Well, we could split it. You pay for two thousand, and we ship five hundred every quarter at no extra charge.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Now that’s something I can work with. Could you send me a few samples first, though? I want to make sure our tea tins won’t get dented.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Certainly. I’ll post a sample pack today.',
      },
    ],
    questions: [
      {
        text: 'What does the woman want to do?',
        options: [
          'Open a second shop',
          'Switch to eco-friendly packaging',
          'Sell a new kind of tea',
          'Rent more storage space',
        ],
        answer: 1,
        explanationVi:
          'Khách muốn bỏ "plastic mailers", hỏi loại "paper-based" → chuyển sang bao bì thân thiện môi trường (B). "stockroom" là bẫy cho (D).',
        translationVi: 'Người phụ nữ muốn làm gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the woman mean when she says, "Now that’s something I can work with"?',
        options: [
          'She would like to hire more staff.',
          'She needs a larger stockroom.',
          'She wants to negotiate the price.',
          'She finds the offer acceptable.',
        ],
        answer: 3,
        explanationVi:
          'Sau khi được đề nghị giao 500 cái mỗi quý, giải quyết nỗi lo kho nhỏ → cô thấy đề nghị chấp nhận được (D). "work with" không liên quan đến thuê người (A).',
        translationVi:
          'Người phụ nữ muốn nói gì khi nói "Như vậy thì tôi có thể xoay xở được"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What does the woman ask the man to do?',
        options: [
          'Send a quarterly invoice',
          'Test some tea tins',
          'Mail some items for her to try',
          'Lower the price per unit',
        ],
        answer: 2,
        explanationVi:
          '"Could you send me a few samples first?" → gửi hàng mẫu để cô dùng thử (C). Cô tự kiểm tra hộp trà, không nhờ anh (B sai).',
        translationVi: 'Người phụ nữ yêu cầu người đàn ông làm gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
]
