import type { TestFixture } from '../types'

/** Lingo Mini Test 02: Parts 2–7, harder mix (written for Lingo, not taken from ETS tests). */
export const MINI_02: TestFixture = {
  title: 'Lingo Mini Test 02',
  description:
    'Bài thi TOEIC rút gọn Part 2–7 với độ khó cao hơn, do Lingo biên soạn cho người học hướng tới mục tiêu 650+.',
  items: {
    P2: [
      {
        difficulty: 'EASY',
        topic: 'Retail',
        accent: 'US',
        questions: [
          {
            text: 'When does the new Riverside branch open to the public?',
            options: [
              'Next to the post office.',
              'On the first of March.',
              'Yes, it’s open late.',
            ],
            answer: 1,
            explanationVi:
              'Câu hỏi "When" hỏi thời gian → (B) "vào ngày 1 tháng Ba". (A) trả lời nơi chốn (Where). (C) trả lời Yes cho câu hỏi Wh- và lặp từ "open" để bẫy.',
            translationVi: 'Khi nào chi nhánh Riverside mới mở cửa đón khách?',
            skillTags: ['listening.wh-question'],
          },
        ],
      },
      {
        difficulty: 'EASY',
        topic: 'Office',
        accent: 'GB',
        questions: [
          {
            text: 'Would you like the report printed, or should I send it by email?',
            options: [
              'Email is fine, thanks.',
              'Yes, I would.',
              'It was reported yesterday.',
            ],
            answer: 0,
            explanationVi:
              'Câu hỏi lựa chọn (A hay B) → chọn một phương án: (A) "Gửi email là được". (B) trả lời Yes không hợp với câu hỏi lựa chọn. (C) bẫy lặp âm "report" – "reported".',
            translationVi: 'Anh muốn tôi in báo cáo ra, hay tôi gửi qua email?',
            skillTags: ['listening.yes-no'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Purchasing',
        accent: 'AU',
        questions: [
          {
            text: 'Why was the meeting with the supplier moved to Thursday?',
            options: [
              'At the supplier’s headquarters.',
              'Their sales director is travelling until Wednesday.',
              'I moved to a new apartment.',
            ],
            answer: 1,
            explanationVi:
              'Câu hỏi "Why" hỏi lý do → (B) "giám đốc kinh doanh của họ đi công tác đến thứ Tư" giải thích vì sao phải dời sang thứ Năm. (A) trả lời nơi chốn. (C) bẫy lặp từ "moved" với nghĩa khác (chuyển nhà).',
            translationVi:
              'Vì sao cuộc họp với nhà cung cấp bị dời sang thứ Năm?',
            skillTags: ['listening.wh-question'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Events',
        accent: 'CA',
        questions: [
          {
            text: 'You’ve reviewed the catering quotes, haven’t you?',
            options: [
              'The quote was from a famous author.',
              'Twenty guests, I think.',
              'Only the first two so far.',
            ],
            answer: 2,
            explanationVi:
              'Câu hỏi đuôi xác nhận việc đã xem các báo giá → (C) "Mới xem hai báo giá đầu thôi" là câu trả lời tự nhiên. (A) bẫy từ "quote" với nghĩa "trích dẫn". (B) nói số khách, liên quan chủ đề tiệc nhưng không trả lời câu hỏi.',
            translationVi: 'Anh đã xem các báo giá tiệc rồi, phải không?',
            skillTags: ['listening.yes-no'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Marketing',
        accent: 'US',
        questions: [
          {
            text: 'Could you help me set up our booth at the trade fair tomorrow?',
            options: [
              'I’ll be at a client’s office all morning.',
              'It was a fair price.',
              'She set it up last week.',
            ],
            answer: 0,
            explanationVi:
              'Lời đề nghị giúp đỡ; (A) từ chối gián tiếp: "Sáng mai tôi ở văn phòng khách hàng cả buổi" → không giúp được. (B) bẫy từ "fair" (hội chợ / hợp lý). (C) lặp "set up" nhưng sai chủ ngữ và thì.',
            translationVi:
              'Anh có thể giúp tôi dựng gian hàng ở hội chợ thương mại ngày mai không?',
            skillTags: ['listening.indirect'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Logistics',
        accent: 'GB',
        questions: [
          {
            text: 'Which courier did we use for the Osaka shipment?',
            options: [
              'About three days.',
              'Check the tracking sheet on the shared drive.',
              'Yes, it was shipped on time.',
            ],
            answer: 1,
            explanationVi:
              'Câu hỏi "Which courier" – (B) trả lời gián tiếp: chỉ chỗ có thông tin (bảng theo dõi trên ổ chung). (A) trả lời thời gian (How long). (C) trả lời Yes cho câu hỏi Wh- và lặp "ship".',
            translationVi:
              'Chúng ta đã dùng hãng chuyển phát nào cho lô hàng đi Osaka?',
            skillTags: ['listening.wh-question', 'listening.indirect'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Finance',
        accent: 'AU',
        questions: [
          {
            text: 'The quarterly figures should be ready by noon.',
            options: [
              'I’m not ready to order yet.',
              'Great, I’ll go over them after lunch.',
              'A quarter past twelve.',
            ],
            answer: 1,
            explanationVi:
              'Câu trần thuật báo tin số liệu sẽ có trước trưa → (B) "Tốt, tôi sẽ xem sau bữa trưa" là phản hồi tự nhiên. (A) lặp từ "ready" sai ngữ cảnh (gọi món). (C) bẫy âm "quarterly" – "quarter" và "noon" – "twelve".',
            translationVi: 'Số liệu quý sẽ có trước buổi trưa.',
            skillTags: ['listening.indirect'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Logistics',
        accent: 'CA',
        questions: [
          {
            text: 'Isn’t the warehouse closed on public holidays?',
            options: [
              'It is, but the loading dock stays open.',
              'Close to the main road.',
              'He’s on holiday this week.',
            ],
            answer: 0,
            explanationVi:
              'Câu hỏi phủ định để xác nhận → (A) "Đúng vậy, nhưng khu bốc dỡ hàng vẫn mở" vừa xác nhận vừa bổ sung thông tin. (B) bẫy âm "closed" – "close" (gần). (C) lặp "holiday" nhưng nói về một người.',
            translationVi: 'Không phải nhà kho đóng cửa vào ngày lễ sao?',
            skillTags: ['listening.yes-no'],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'HR',
        accent: 'US',
        questions: [
          {
            text: 'Who’s going to replace Ms. Ortega as project lead?',
            options: [
              'She placed the order this morning.',
              'Yes, he’s the lead singer.',
              'The position has been posted internally.',
            ],
            answer: 2,
            explanationVi:
              'Câu hỏi "Who" nhưng đáp án là trả lời gián tiếp: (C) "Vị trí đã được đăng tuyển nội bộ" – tức là chưa có người thay. (A) bẫy âm "replace" – "placed". (B) trả lời Yes cho câu hỏi Wh- và lặp từ "lead".',
            translationVi: 'Ai sẽ thay cô Ortega làm trưởng dự án?',
            skillTags: ['listening.wh-question', 'listening.indirect'],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Technology',
        accent: 'GB',
        questions: [
          {
            text: 'Should we renew the software licence now or wait for the new pricing?',
            options: [
              'It’s a very new design.',
              'The current one runs until June anyway.',
              'Yes, I renewed my passport.',
            ],
            answer: 1,
            explanationVi:
              'Câu hỏi lựa chọn; (B) trả lời gián tiếp: "Giấy phép hiện tại dù sao cũng còn hạn đến tháng Sáu" → ngụ ý nên chờ giá mới. (A) lặp từ "new". (C) trả lời Yes cho câu hỏi lựa chọn và lặp "renew".',
            translationVi:
              'Chúng ta nên gia hạn giấy phép phần mềm ngay hay chờ bảng giá mới?',
            skillTags: ['listening.indirect'],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Legal',
        accent: 'AU',
        questions: [
          {
            text: 'I can’t find the signed contract from Halvorsen Logistics.',
            options: [
              'Sign at the bottom, please.',
              'The logistics conference was very useful.',
              'Legal still has it for review.',
            ],
            answer: 2,
            explanationVi:
              'Câu trần thuật nêu vấn đề (không tìm thấy hợp đồng) → (C) "Bộ phận pháp chế vẫn đang giữ để xem xét" giải thích hợp đồng ở đâu. (A) bẫy "signed" – "sign". (B) lặp từ "logistics".',
            translationVi:
              'Tôi không tìm thấy bản hợp đồng đã ký của Halvorsen Logistics.',
            skillTags: ['listening.indirect'],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Events',
        accent: 'CA',
        questions: [
          {
            text: 'How much did the venue charge us for the extra hour?',
            options: [
              'About an hour away.',
              'They waived the fee, actually.',
              'Ms. Kim is in charge of the venue.',
            ],
            answer: 1,
            explanationVi:
              'Câu hỏi "How much" hỏi chi phí → (B) "Thật ra họ đã miễn phí khoản đó" – trả lời gián tiếp (không mất tiền). (A) lặp "hour", trả lời khoảng cách. (C) bẫy âm "charge" – "in charge of".',
            translationVi:
              'Địa điểm tính chúng ta bao nhiêu tiền cho giờ thuê thêm?',
            skillTags: ['listening.wh-question', 'listening.indirect'],
          },
        ],
      },
    ],
    P3: [
      {
        difficulty: 'EASY',
        topic: 'Dining',
        transcript: [
          {
            speaker: 'W',
            accent: 'US',
            text: 'Hello, this is Karen Liu from Mosaic Design. I booked a table for twelve at your restaurant this Friday, and I’d like to add three more people.',
          },
          {
            speaker: 'M',
            accent: 'CA',
            text: 'Let me check… Friday at seven, under Liu. A table for fifteen won’t fit in the main room, but our private dining room upstairs is available.',
          },
          {
            speaker: 'W',
            accent: 'US',
            text: 'Oh, that might be even better. Is there an extra charge for it?',
          },
          {
            speaker: 'M',
            accent: 'CA',
            text: 'Not for groups over twelve. I’ll just need your final menu choices by Wednesday so the kitchen can prepare.',
          },
          {
            speaker: 'W',
            accent: 'US',
            text: 'No problem. I’ll collect everyone’s orders and email them to you tomorrow.',
          },
        ],
        questions: [
          {
            text: 'Why is the woman calling?',
            options: [
              'To cancel a booking',
              'To change the size of a reservation',
              'To complain about a meal',
              'To ask about opening hours',
            ],
            answer: 1,
            explanationVi:
              '"I booked a table for twelve… I’d like to add three more people" → thay đổi số người của đặt bàn (B). Cô không huỷ, không phàn nàn, không hỏi giờ mở cửa.',
            translationVi: 'Vì sao người phụ nữ gọi điện?',
            skillTags: ['comprehension.main-idea'],
          },
          {
            text: 'What does the man say about the private dining room?',
            options: [
              'It is on the ground floor.',
              'It is being renovated.',
              'It is free of charge for her group.',
              'It must be booked a week ahead.',
            ],
            answer: 2,
            explanationVi:
              'Cô hỏi có tính thêm phí không, anh đáp "Not for groups over twelve" → nhóm 15 người không mất phí (C). (A) sai vì phòng ở tầng trên (upstairs).',
            translationVi: 'Người đàn ông nói gì về phòng ăn riêng?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'What will the woman do tomorrow?',
            options: [
              'Visit the restaurant',
              'Pay a deposit',
              'Call the chef',
              'Send the group’s menu choices',
            ],
            answer: 3,
            explanationVi:
              '"I’ll collect everyone’s orders and email them to you tomorrow" → gửi lựa chọn món của cả nhóm (D), diễn đạt lại "orders" thành "menu choices".',
            translationVi: 'Ngày mai người phụ nữ sẽ làm gì?',
            skillTags: ['comprehension.next-action'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Technology',
        transcript: [
          {
            speaker: 'W',
            accent: 'GB',
            text: 'So the new version of our bike-rental app goes live on Monday. My concern is the customer support team — they haven’t seen the new payment screens yet.',
          },
          {
            speaker: 'M',
            accent: 'US',
            text: 'Good point. Arjun, you organise the support training, don’t you?',
          },
          {
            speaker: 'M2',
            accent: 'AU',
            text: 'I do. The trouble is that half the team works the weekend shift, so a weekday session won’t reach everyone.',
          },
          {
            speaker: 'W',
            accent: 'GB',
            text: 'Could we record a short video walkthrough instead? People could watch it at the start of their shift.',
          },
          {
            speaker: 'M2',
            accent: 'AU',
            text: 'That would work. If someone from development can show me the screens, I can record it on Thursday afternoon.',
          },
          {
            speaker: 'M',
            accent: 'US',
            text: 'I’ll sit with you on Thursday, then. I built most of the payment flow myself.',
          },
        ],
        questions: [
          {
            text: 'What are the speakers mainly discussing?',
            options: [
              'Preparing staff for a software update',
              'Hiring weekend employees',
              'Fixing a payment error',
              'Opening a new rental location',
            ],
            answer: 0,
            explanationVi:
              'Ứng dụng mới ra mắt thứ Hai, đội hỗ trợ chưa xem màn hình thanh toán mới → bàn cách chuẩn bị cho nhân viên trước bản cập nhật (A). (C) bẫy từ "payment" nhưng không có lỗi nào được nhắc tới.',
            translationVi: 'Những người nói chủ yếu đang bàn về điều gì?',
            skillTags: ['comprehension.main-idea'],
          },
          {
            text: 'What problem does Arjun mention?',
            options: [
              'The training room is unavailable.',
              'Some team members do not work on weekdays.',
              'The app launch has been delayed.',
              'The video equipment is broken.',
            ],
            answer: 1,
            explanationVi:
              'Arjun (M2): "half the team works the weekend shift, so a weekday session won’t reach everyone" → một số người không làm ngày thường (B). Các vấn đề khác không được nhắc.',
            translationVi: 'Arjun nêu ra vấn đề gì?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'What will the man who built the payment flow do on Thursday?',
            options: [
              'Test the payment system',
              'Lead a training session',
              'Show a colleague the new screens',
              'Contact the customer support team',
            ],
            answer: 2,
            explanationVi:
              'Arjun cần "someone from development" cho xem màn hình; người đàn ông thứ nhất nói "I’ll sit with you on Thursday… I built most of the payment flow" → anh sẽ cho đồng nghiệp xem màn hình mới (C). (B) là việc của Arjun – bẫy sai người nói.',
            translationVi:
              'Người đàn ông đã xây dựng quy trình thanh toán sẽ làm gì vào thứ Năm?',
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
            accent: 'CA',
            text: 'Tom, the hotel group just sent back the brochure draft. They love the photos, but they want every price changed to include tax, and they need the final files by Friday.',
          },
          {
            speaker: 'M',
            accent: 'GB',
            text: 'Every price? There must be sixty of them across twelve pages.',
          },
          {
            speaker: 'W',
            accent: 'CA',
            text: 'I know. And Leila’s out until next week, so it’s just the two of us on the layout.',
          },
          {
            speaker: 'M',
            accent: 'GB',
            text: 'Well, I’ve cleared my afternoon.',
          },
          {
            speaker: 'W',
            accent: 'CA',
            text: 'Thank you! If you take pages one to six, I’ll do the rest and check the tax rates with their finance office.',
          },
          {
            speaker: 'M',
            accent: 'GB',
            text: 'Fine. Could you send me the updated price list before lunch, though? I don’t want to type in the old figures again.',
          },
        ],
        questions: [
          {
            text: 'What does the client want changed?',
            options: [
              'The photographs',
              'The number of pages',
              'The way prices are presented',
              'The delivery address',
            ],
            answer: 2,
            explanationVi:
              '"they want every price changed to include tax" → thay đổi cách thể hiện giá (C). (A) sai vì khách "love the photos". (B) bẫy con số "twelve pages".',
            translationVi: 'Khách hàng muốn thay đổi điều gì?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'What does the man mean when he says, "I’ve cleared my afternoon"?',
            options: [
              'He has finished his own project.',
              'He can work on the brochure today.',
              'He would like to leave the office early.',
              'He has canceled a meeting with the client.',
            ],
            answer: 1,
            explanationVi:
              'Ngay sau khi chị nói chỉ còn hai người làm, anh nói "tôi đã dành trống buổi chiều" → ngụ ý anh sẵn sàng làm tờ quảng cáo (B); chị cảm ơn và chia việc. (D) bẫy nghĩa đen của "cleared" – không có cuộc họp với khách nào bị huỷ. (C) ngược ý.',
            translationVi:
              'Người đàn ông có ý gì khi nói "Tôi đã dành trống buổi chiều"?',
            skillTags: ['comprehension.speaker-intent'],
          },
          {
            text: 'What does the man ask the woman to do?',
            options: [
              'Contact Leila',
              'Ask for a later deadline',
              'Check the photographs',
              'Send him the revised figures',
            ],
            answer: 3,
            explanationVi:
              '"Could you send me the updated price list before lunch?" → gửi bảng giá đã cập nhật (D). Kiểm tra thuế suất là việc chị tự nhận, không phải yêu cầu của anh.',
            translationVi: 'Người đàn ông yêu cầu người phụ nữ làm gì?',
            skillTags: ['comprehension.detail'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Hotel',
        transcript: [
          {
            speaker: 'M',
            accent: 'GB',
            text: 'Good morning. I’m in room 418 and due to check out at eleven, but my last conference session doesn’t finish until two. Is a late checkout possible?',
          },
          {
            speaker: 'W',
            accent: 'US',
            text: 'I’m afraid we’re fully booked tonight, so the latest I can offer is twelve.',
          },
          {
            speaker: 'M',
            accent: 'GB',
            text: 'Twelve won’t really help. I’d have to leave the session halfway through.',
          },
          {
            speaker: 'W',
            accent: 'US',
            text: 'In that case, you could check out now and leave your suitcase with us. We keep luggage behind the front desk free of charge, and you can use the guest lounge to freshen up before you go to the airport.',
          },
          {
            speaker: 'M',
            accent: 'GB',
            text: 'That sounds ideal. I’ll bring my bag down after breakfast.',
          },
        ],
        questions: [
          {
            text: 'Where does the conversation most likely take place?',
            options: [
              'At a hotel front desk',
              'At an airport check-in counter',
              'At a conference registration table',
              'At a train station',
            ],
            answer: 0,
            explanationVi:
              '"room 418", "check out", "front desk" → quầy lễ tân khách sạn (A). "conference" và "airport" chỉ là thông tin phụ, là bẫy.',
            translationVi: 'Cuộc hội thoại có lẽ diễn ra ở đâu?',
            skillTags: ['comprehension.inference'],
          },
          {
            text: 'Why does the man want a late checkout?',
            options: [
              'His flight was delayed.',
              'He is attending a session that ends at two.',
              'He has not finished packing.',
              'His room key does not work.',
            ],
            answer: 1,
            explanationVi:
              '"my last conference session doesn’t finish until two" → anh còn dự phiên hội nghị kết thúc lúc 2 giờ (B). Không có thông tin chuyến bay bị hoãn.',
            translationVi: 'Vì sao người đàn ông muốn trả phòng muộn?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'What does the woman suggest?',
            options: [
              'Moving to another room',
              'Paying an extra fee',
              'Taking a later flight',
              'Leaving his bag at the front desk',
            ],
            answer: 3,
            explanationVi:
              '"check out now and leave your suitcase with us… behind the front desk" → gửi hành lý ở quầy lễ tân (D). Dịch vụ miễn phí nên (B) sai.',
            translationVi: 'Người phụ nữ đề xuất điều gì?',
            skillTags: ['comprehension.detail'],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Events',
        transcript: [
          {
            speaker: 'W',
            accent: 'AU',
            text: 'Thanks for joining. As you’ve probably heard, Pinecrest Lodge has raised its group rate by thirty percent, so our staff retreat in October would go well over budget.',
          },
          {
            speaker: 'M',
            accent: 'US',
            text: 'Is the lodge our only option? Last year people mostly said they enjoyed the hiking, not the lodge itself.',
          },
          {
            speaker: 'W2',
            accent: 'GB',
            text: 'Actually, Harlow Conference Centre in the city has a package that includes guided walks in the hills nearby. It’s cheaper, and there’s a direct train, so we wouldn’t need to hire coaches.',
          },
          {
            speaker: 'W',
            accent: 'AU',
            text: 'That could solve two problems at once. But I don’t want to decide without knowing whether people would accept a city venue.',
          },
          {
            speaker: 'W2',
            accent: 'GB',
            text: 'I can put a two-question survey on the intranet today and have the results by Monday.',
          },
          {
            speaker: 'M',
            accent: 'US',
            text: 'And I’ll ask Harlow to hold the October dates for us until then, just in case.',
          },
        ],
        questions: [
          {
            text: 'What problem does the first woman mention?',
            options: [
              'A venue is fully booked.',
              'A venue has increased its prices.',
              'Staff did not enjoy last year’s retreat.',
              'The retreat date has been changed.',
            ],
            answer: 1,
            explanationVi:
              '"Pinecrest Lodge has raised its group rate by thirty percent" → địa điểm tăng giá (B). (C) ngược ý: năm ngoái nhân viên thích đi bộ đường dài.',
            translationVi: 'Người phụ nữ thứ nhất nêu ra vấn đề gì?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'What advantage of Harlow Conference Centre is mentioned?',
            options: [
              'It offers free accommodation.',
              'It is next to the company office.',
              'It can be reached without hiring transportation.',
              'It has the largest meeting hall in the city.',
            ],
            answer: 2,
            explanationVi:
              '"there’s a direct train, so we wouldn’t need to hire coaches" → đến được mà không cần thuê xe (C), diễn đạt lại khá xa nên dễ bỏ sót. Các ý khác không được nhắc.',
            translationVi:
              'Ưu điểm nào của Trung tâm Hội nghị Harlow được nhắc đến?',
            skillTags: ['comprehension.detail', 'comprehension.inference'],
          },
          {
            text: 'What will the man most likely do?',
            options: [
              'Create an online survey',
              'Book train tickets for staff',
              'Cancel the booking at Pinecrest Lodge',
              'Request a temporary reservation of dates',
            ],
            answer: 3,
            explanationVi:
              '"I’ll ask Harlow to hold the October dates for us until then" → đề nghị giữ chỗ tạm các ngày (D). (A) là việc của người phụ nữ thứ hai – bẫy sai người nói. Chưa quyết định nên không huỷ Pinecrest (C).',
            translationVi: 'Người đàn ông có lẽ sẽ làm gì?',
            skillTags: ['comprehension.next-action'],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Supply chain',
        transcript: [
          {
            speaker: 'M',
            accent: 'AU',
            text: 'Ms. Brennan, thanks for taking my call. I understand Freshway Markets is looking for a new supplier of salad greens for your northern stores.',
          },
          {
            speaker: 'W',
            accent: 'CA',
            text: 'We are. Our current grower is reliable on quality, but three times this month the delivery arrived after our stores had opened, so staff were restocking shelves while customers were shopping.',
          },
          {
            speaker: 'M',
            accent: 'AU',
            text: 'Our cooperative is forty minutes from your Dunmore distribution centre, and we finished building a cold-storage unit in June, so we can harvest the afternoon before and still deliver by five a.m.',
          },
          {
            speaker: 'W',
            accent: 'CA',
            text: 'Five would be fine. Volume is my other question — we’d need around two tonnes a week from March.',
          },
          {
            speaker: 'M',
            accent: 'AU',
            text: 'That’s about what we supply to our largest customer now, and we’re planting an extra eight hectares this season.',
          },
          {
            speaker: 'W',
            accent: 'CA',
            text: 'All right. Send me your price sheet and a couple of references, and I’ll take it to our buying committee next month.',
          },
        ],
        questions: [
          {
            text: 'What does the woman imply about the current supplier?',
            options: [
              'Its products are of poor quality.',
              'It cannot supply enough volume.',
              'Its deliveries are sometimes late.',
              'It has raised its prices.',
            ],
            answer: 2,
            explanationVi:
              '"three times this month the delivery arrived after our stores had opened" → giao hàng đôi khi trễ (C). (A) ngược ý: "reliable on quality". (B) sản lượng là câu hỏi dành cho nhà cung cấp mới.',
            translationVi:
              'Người phụ nữ ngụ ý điều gì về nhà cung cấp hiện tại?',
            skillTags: ['comprehension.inference'],
          },
          {
            text: 'Why does the man mention a cold-storage unit?',
            options: [
              'To show that his cooperative can deliver before stores open',
              'To explain a recent price increase',
              'To describe a problem with a delivery',
              'To suggest that Freshway build its own',
            ],
            answer: 0,
            explanationVi:
              'Nhờ kho lạnh, hợp tác xã thu hoạch chiều hôm trước mà vẫn giao trước 5 giờ sáng → giải quyết đúng vấn đề giao trễ của Freshway (A). Đây là câu hỏi mục đích của người nói, cần nối với lời phàn nàn trước đó.',
            translationVi: 'Vì sao người đàn ông nhắc đến kho lạnh?',
            skillTags: ['comprehension.speaker-intent'],
          },
          {
            text: 'What does the woman ask the man to send?',
            options: [
              'A product sample',
              'Prices and customer references',
              'A delivery schedule',
              'A map of the farm',
            ],
            answer: 1,
            explanationVi:
              '"Send me your price sheet and a couple of references" → bảng giá và thông tin khách hàng tham chiếu (B).',
            translationVi: 'Người phụ nữ yêu cầu người đàn ông gửi gì?',
            skillTags: ['comprehension.detail'],
          },
        ],
      },
    ],
    P4: [
      {
        difficulty: 'EASY',
        topic: 'Health',
        transcript: [
          {
            speaker: 'N',
            accent: 'US',
            text: 'Hi, this message is for Mr. Joseph Varga. This is Elena from Brookside Dental Clinic.',
          },
          {
            speaker: 'N',
            accent: 'US',
            text: 'I’m calling about your check-up on Thursday morning.',
          },
          {
            speaker: 'N',
            accent: 'US',
            text: 'Unfortunately, Dr. Hammond has to attend a training course that day, so we need to move your appointment.',
          },
          {
            speaker: 'N',
            accent: 'US',
            text: 'We have an opening on Friday at three-thirty in the afternoon, or on Monday at nine a.m.',
          },
          {
            speaker: 'N',
            accent: 'US',
            text: 'Please call us back at 555-0148 to let us know which time suits you.',
          },
          {
            speaker: 'N',
            accent: 'US',
            text: 'And remember to bring your new insurance card, since our records show your old one has expired.',
          },
        ],
        questions: [
          {
            text: 'Who most likely is the speaker?',
            options: [
              'A dentist',
              'A clinic receptionist',
              'An insurance agent',
              'A training instructor',
            ],
            answer: 1,
            explanationVi:
              'Elena gọi từ phòng khám để dời lịch hẹn của bác sĩ Hammond → nhân viên lễ tân (B). Bác sĩ là Dr. Hammond nên (A) sai.',
            translationVi: 'Người nói có lẽ là ai?',
            skillTags: ['comprehension.inference'],
          },
          {
            text: 'Why must the appointment be changed?',
            options: [
              'The clinic is closing for repairs.',
              'The listener requested a new time.',
              'The dentist will be at a training course.',
              'An insurance form is missing.',
            ],
            answer: 2,
            explanationVi:
              '"Dr. Hammond has to attend a training course that day" → nha sĩ đi học khoá đào tạo (C).',
            translationVi: 'Vì sao phải đổi lịch hẹn?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'What is the listener asked to bring?',
            options: [
              'An updated insurance card',
              'A payment receipt',
              'A list of medications',
              'An appointment letter',
            ],
            answer: 0,
            explanationVi:
              '"remember to bring your new insurance card" → thẻ bảo hiểm mới (A), diễn đạt lại "new" thành "updated".',
            translationVi: 'Người nghe được yêu cầu mang theo gì?',
            skillTags: ['comprehension.detail'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Travel',
        transcript: [
          {
            speaker: 'N',
            accent: 'GB',
            text: 'Good afternoon, passengers, this is your purser speaking.',
          },
          {
            speaker: 'N',
            accent: 'GB',
            text: 'Due to strong winds in the harbour, we’ll be waiting at the pier for approximately forty minutes before departing for Lundy Point.',
          },
          {
            speaker: 'N',
            accent: 'GB',
            text: 'The captain will make another announcement as soon as conditions improve.',
          },
          {
            speaker: 'N',
            accent: 'GB',
            text: 'While we wait, the café on the upper deck is offering complimentary tea and coffee to all passengers.',
          },
          {
            speaker: 'N',
            accent: 'GB',
            text: 'Passengers travelling with vehicles are asked to remain on the passenger decks; the car deck will stay closed until we arrive.',
          },
          {
            speaker: 'N',
            accent: 'GB',
            text: 'We apologise for the delay and thank you for your patience.',
          },
        ],
        questions: [
          {
            text: 'Where is the announcement being made?',
            options: [
              'On a ferry',
              'At a train platform',
              'At an airport gate',
              'On a tour bus',
            ],
            answer: 0,
            explanationVi:
              '"harbour", "pier", "upper deck", "car deck", "captain" → trên phà (A).',
            translationVi: 'Thông báo được phát ở đâu?',
            skillTags: ['comprehension.inference'],
          },
          {
            text: 'What is causing the delay?',
            options: [
              'A mechanical problem',
              'Heavy traffic',
              'Strong winds',
              'A late crew member',
            ],
            answer: 2,
            explanationVi:
              '"Due to strong winds in the harbour" → gió mạnh (C).',
            translationVi: 'Điều gì gây ra sự chậm trễ?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'What are passengers with vehicles asked to do?',
            options: [
              'Return to their cars',
              'Move their cars to the upper deck',
              'Show their tickets at the café',
              'Stay away from the car deck',
            ],
            answer: 3,
            explanationVi:
              '"remain on the passenger decks; the car deck will stay closed" → không xuống boong xe (D). (A) ngược ý; (B) lặp "upper deck" để bẫy.',
            translationVi: 'Hành khách đi kèm xe được yêu cầu làm gì?',
            skillTags: ['comprehension.detail'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Advertising',
        transcript: [
          {
            speaker: 'N',
            accent: 'AU',
            text: 'Tired of working from your kitchen table? Come and see Northgate Commons, the city’s newest shared workspace, just two minutes from Central Station.',
          },
          {
            speaker: 'N',
            accent: 'AU',
            text: 'Choose a hot desk for the day, a dedicated desk for the month, or a private office for your whole team.',
          },
          {
            speaker: 'N',
            accent: 'AU',
            text: 'Every membership includes high-speed internet, printing, and secure bicycle storage.',
          },
          {
            speaker: 'N',
            accent: 'AU',
            text: 'And if you sign up before the end of September, your first month is half price.',
          },
          {
            speaker: 'N',
            accent: 'AU',
            text: 'Want a look around first? Book a free tour on our website, northgatecommons.com, and we’ll have a coffee waiting for you.',
          },
        ],
        questions: [
          {
            text: 'What is being advertised?',
            options: [
              'A shared office space',
              'A coffee shop',
              'A furniture store',
              'A bicycle shop',
            ],
            answer: 0,
            explanationVi:
              '"the city’s newest shared workspace", "hot desk", "private office" → không gian làm việc chung (A). "coffee", "kitchen table", "bicycle" chỉ là chi tiết bẫy.',
            translationVi: 'Điều gì đang được quảng cáo?',
            skillTags: ['comprehension.main-idea'],
          },
          {
            text: 'What special offer is mentioned?',
            options: [
              'Free printing for a year',
              'A reduced price for the first month',
              'A free bicycle',
              'Free parking at the station',
            ],
            answer: 1,
            explanationVi:
              '"your first month is half price" → giảm giá tháng đầu (B). In ấn có sẵn trong gói chứ không phải "miễn phí một năm".',
            translationVi: 'Ưu đãi đặc biệt nào được nhắc đến?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'How can listeners arrange a visit?',
            options: [
              'By calling the office',
              'By going to Central Station',
              'By sending an e-mail',
              'By booking on a website',
            ],
            answer: 3,
            explanationVi:
              '"Book a free tour on our website" → đặt lịch trên trang web (D). Central Station chỉ là vị trí gần đó.',
            translationVi:
              'Người nghe có thể sắp xếp đến tham quan bằng cách nào?',
            skillTags: ['comprehension.detail'],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Tourism',
        transcript: [
          {
            speaker: 'N',
            accent: 'CA',
            text: 'Welcome to the Ashby Mill Museum. My name is Grant, and I’ll be your guide for the next hour.',
          },
          {
            speaker: 'N',
            accent: 'CA',
            text: 'This building was a working wool mill until 1974, and the looms you’ll see on the ground floor are the originals.',
          },
          {
            speaker: 'N',
            accent: 'CA',
            text: 'We run one of them twice a day, so you’ll get to hear just how noisy this place used to be.',
          },
          {
            speaker: 'N',
            accent: 'CA',
            text: 'Photos are welcome, but please don’t use a flash near the looms, as it can distract the operators.',
          },
          {
            speaker: 'N',
            accent: 'CA',
            text: 'Upstairs, there’s an exhibit on the families who worked here, including letters donated by their descendants.',
          },
          {
            speaker: 'N',
            accent: 'CA',
            text: 'Just so you know, the gift shop closes at three today instead of five, and our tour finishes at around a quarter past.',
          },
        ],
        questions: [
          {
            text: 'What is indicated about the looms?',
            options: [
              'They were recently purchased.',
              'They are all operated every hour.',
              'They are the mill’s original machines.',
              'They are displayed upstairs.',
            ],
            answer: 2,
            explanationVi:
              '"the looms… are the originals" → máy dệt nguyên bản của xưởng (C). (B) sai vì chỉ chạy một máy, hai lần mỗi ngày. (D) sai vì máy ở tầng trệt.',
            translationVi: 'Điều gì được nói về các máy dệt?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'What are listeners asked not to do?',
            options: [
              'Touch the looms',
              'Use a flash near the machines',
              'Take pictures of the letters',
              'Speak to the operators',
            ],
            answer: 1,
            explanationVi:
              '"please don’t use a flash near the looms" → không dùng đèn flash gần máy (B). Chụp ảnh vẫn được phép; "operators" được nhắc nhưng không cấm nói chuyện với họ.',
            translationVi: 'Người nghe được yêu cầu không làm gì?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'Why does the speaker say, "our tour finishes at around a quarter past"?',
            options: [
              'To apologize for a long tour',
              'To suggest that listeners visit the shop beforehand',
              'To explain why the shop is closing early',
              'To ask listeners to return at three',
            ],
            answer: 1,
            explanationVi:
              'Cửa hàng đóng lúc 3 giờ mà tour kết thúc khoảng 3 giờ 15 → nếu muốn mua quà phải ghé trước khi tour kết thúc (B). Lý do đóng sớm không được nói (C); (A), (D) không có cơ sở.',
            translationVi:
              'Vì sao người nói nói "tour của chúng ta kết thúc vào khoảng 3 giờ 15"?',
            skillTags: [
              'comprehension.speaker-intent',
              'comprehension.inference',
            ],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Finance',
        transcript: [
          {
            speaker: 'N',
            accent: 'US',
            text: 'Before we finish, a quick word about expenses.',
          },
          {
            speaker: 'N',
            accent: 'US',
            text: 'Starting next month, we’re replacing paper expense forms with an app called ClearClaim.',
          },
          {
            speaker: 'N',
            accent: 'US',
            text: 'You simply photograph each receipt with your phone, and the app fills in the amount and date for you.',
          },
          {
            speaker: 'N',
            accent: 'US',
            text: 'The main benefit is speed: claims will be paid within five working days instead of the current three weeks.',
          },
          {
            speaker: 'N',
            accent: 'US',
            text: 'I know, I know — another password to remember. But it uses the same login as your email, so there’s nothing new to memorize.',
          },
          {
            speaker: 'N',
            accent: 'US',
            text: 'Please complete the twenty-minute online tutorial by Friday so that you’re ready when the paper forms disappear.',
          },
        ],
        questions: [
          {
            text: 'What is the speaker mainly discussing?',
            options: [
              'A new expense reporting tool',
              'A change in travel policy',
              'A new email system',
              'A budget reduction',
            ],
            answer: 0,
            explanationVi:
              'Thay mẫu chi phí giấy bằng ứng dụng ClearClaim → công cụ báo cáo chi phí mới (A). Email chỉ được nhắc khi nói về đăng nhập (C sai).',
            translationVi: 'Người nói chủ yếu đang bàn về điều gì?',
            skillTags: ['comprehension.main-idea'],
          },
          {
            text: 'Why does the speaker say, "I know, I know — another password to remember"?',
            options: [
              'To remind listeners to change their passwords',
              'To acknowledge a concern listeners may have',
              'To explain why a launch was delayed',
              'To complain about the IT department',
            ],
            answer: 1,
            explanationVi:
              'Người nói đoán trước lời phàn nàn của người nghe ("lại thêm mật khẩu") rồi trấn an rằng dùng chung đăng nhập email → thừa nhận một mối lo của người nghe (B). Không có yêu cầu đổi mật khẩu (A).',
            translationVi:
              'Vì sao người nói nói "Tôi biết, tôi biết – lại thêm một mật khẩu phải nhớ"?',
            skillTags: ['comprehension.speaker-intent'],
          },
          {
            text: 'What are listeners asked to do by Friday?',
            options: [
              'Submit their paper forms',
              'Upload photos of their receipts',
              'Finish an online training',
              'Reset their email login',
            ],
            answer: 2,
            explanationVi:
              '"complete the twenty-minute online tutorial by Friday" → hoàn thành khoá hướng dẫn trực tuyến (C). (A), (B) là bẫy từ các chi tiết khác trong bài.',
            translationVi: 'Người nghe được yêu cầu làm gì trước thứ Sáu?',
            skillTags: ['comprehension.detail'],
          },
        ],
      },
    ],
    P5: [
      {
        difficulty: 'EASY',
        topic: 'Customer service',
        questions: [
          {
            text: 'Our customer service representatives ------- available by phone from 8 A.M. to 6 P.M. on weekdays.',
            options: ['is', 'are', 'be', 'being'],
            answer: 1,
            explanationVi:
              'Chủ ngữ số nhiều "representatives" → động từ "are". "is" dùng cho số ít; "be", "being" không làm động từ chính.',
            translationVi:
              'Nhân viên chăm sóc khách hàng của chúng tôi trực điện thoại từ 8 giờ sáng đến 6 giờ chiều các ngày trong tuần.',
            skillTags: ['grammar.agreement'],
          },
        ],
      },
      {
        difficulty: 'EASY',
        topic: 'Office',
        questions: [
          {
            text: 'Please store all cleaning supplies ------- the cabinet next to the staff kitchen.',
            options: ['at', 'to', 'in', 'by'],
            answer: 2,
            explanationVi:
              '"in the cabinet" = bên trong tủ. "at" chỉ điểm, "to" chỉ hướng, "by" là "bên cạnh" – không hợp với việc cất đồ vào tủ.',
            translationVi:
              'Vui lòng cất mọi dụng cụ vệ sinh trong tủ cạnh bếp nhân viên.',
            skillTags: ['grammar.preposition'],
          },
        ],
      },
      {
        difficulty: 'EASY',
        topic: 'Office',
        questions: [
          {
            text: 'The new staff cafeteria is much ------- than the one on the first floor.',
            options: ['largely', 'large', 'largest', 'larger'],
            answer: 3,
            explanationVi:
              'Có "than" và "much" (nhấn mạnh so sánh hơn) → "larger". "largest" là so sánh nhất; "largely" là trạng từ.',
            translationVi:
              'Căng tin nhân viên mới rộng hơn nhiều so với căng tin ở tầng một.',
            skillTags: ['grammar.comparison'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'HR',
        questions: [
          {
            text: 'Applicants ------- résumés are shortlisted will be contacted by phone within two weeks.',
            options: ['who', 'which', 'whom', 'whose'],
            answer: 3,
            explanationVi:
              'Sau chỗ trống là danh từ "résumés" (hồ sơ của các ứng viên) → đại từ quan hệ sở hữu "whose". "who", "whom", "which" không đứng trước danh từ để chỉ sở hữu.',
            translationVi:
              'Những ứng viên có hồ sơ lọt vào danh sách rút gọn sẽ được liên hệ qua điện thoại trong vòng hai tuần.',
            skillTags: ['grammar.relative-clause'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Marketing',
        questions: [
          {
            text: 'The marketing team worked ------- to finish the campaign before the product launch.',
            options: ['tirelessly', 'tireless', 'tire', 'tiredness'],
            answer: 0,
            explanationVi:
              'Bổ nghĩa cho động từ "worked" cần trạng từ → "tirelessly" (không mệt mỏi). "tireless" là tính từ, "tire" là động từ, "tiredness" là danh từ.',
            translationVi:
              'Nhóm marketing đã làm việc không ngừng nghỉ để hoàn thành chiến dịch trước khi ra mắt sản phẩm.',
            skillTags: ['grammar.word-form'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Finance',
        questions: [
          {
            text: 'By the time the auditors arrive next Monday, the finance department ------- all the receipts.',
            options: [
              'organizes',
              'has organized',
              'will have organized',
              'organized',
            ],
            answer: 2,
            explanationVi:
              '"By the time + hiện tại đơn" chỉ một mốc tương lai (next Monday); hành động hoàn tất trước mốc đó → tương lai hoàn thành "will have organized".',
            translationVi:
              'Trước khi kiểm toán viên đến vào thứ Hai tới, phòng tài chính sẽ sắp xếp xong toàn bộ hoá đơn.',
            skillTags: ['grammar.verb-tense'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Retail',
        questions: [
          {
            text: 'Customers may return unused items within 30 days ------- they keep the original receipt.',
            options: ['in spite of', 'as long as', 'so that', 'even'],
            answer: 1,
            explanationVi:
              'Cần liên từ chỉ điều kiện: "as long as" = miễn là. "in spite of" là giới từ, không đi với mệnh đề; "so that" chỉ mục đích; "even" không phải liên từ.',
            translationVi:
              'Khách hàng có thể trả lại sản phẩm chưa sử dụng trong vòng 30 ngày, miễn là họ giữ hoá đơn gốc.',
            skillTags: ['grammar.conjunction'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Facilities',
        questions: [
          {
            text: 'The renovation of the lobby was completed two weeks ------- of schedule.',
            options: ['before', 'prior', 'early', 'ahead'],
            answer: 3,
            explanationVi:
              '"ahead of schedule" = sớm hơn kế hoạch, cụm cố định. "before", "early" không đi với "of"; "prior" đi với "to".',
            translationVi:
              'Việc cải tạo sảnh đã hoàn thành sớm hơn kế hoạch hai tuần.',
            skillTags: ['vocab.collocation'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Technology',
        questions: [
          {
            text: 'The new scheduling software has ------- reduced the time staff spend on manual data entry.',
            options: [
              'considerably',
              'considerate',
              'consideration',
              'considering',
            ],
            answer: 0,
            explanationVi:
              'Đứng giữa "has" và quá khứ phân từ "reduced", bổ nghĩa cho động từ → trạng từ "considerably" (đáng kể). "considerate" là tính từ (chu đáo), "consideration" là danh từ.',
            translationVi:
              'Phần mềm xếp lịch mới đã giảm đáng kể thời gian nhân viên nhập liệu thủ công.',
            skillTags: ['grammar.word-form'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Management',
        questions: [
          {
            text: 'The board will vote on the proposal ------- the committee has reviewed the cost estimates.',
            options: ['during', 'despite', 'once', 'whether'],
            answer: 2,
            explanationVi:
              'Nối hai mệnh đề, nghĩa "ngay khi / sau khi" → "once". "during", "despite" là giới từ, không đi với mệnh đề; "whether" (liệu) sai nghĩa.',
            translationVi:
              'Hội đồng sẽ bỏ phiếu về đề xuất khi uỷ ban đã xem xét các dự toán chi phí.',
            skillTags: ['grammar.conjunction'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Hotel',
        questions: [
          {
            text: 'The hotel’s largest conference room can ------- up to 200 guests for seated events.',
            options: ['participate', 'accommodate', 'reside', 'occupy'],
            answer: 1,
            explanationVi:
              '"accommodate" = có sức chứa. "participate" (tham gia) và "reside" (cư trú) là nội động từ, không có tân ngữ; phòng không thể "occupy" (chiếm) khách.',
            translationVi:
              'Phòng hội nghị lớn nhất của khách sạn có thể chứa tới 200 khách cho các sự kiện ngồi.',
            skillTags: ['vocab.meaning'],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Manufacturing',
        questions: [
          {
            text: '------- the shipment been inspected earlier, the defective parts would have been identified before delivery.',
            options: ['If', 'Were', 'Should', 'Had'],
            answer: 3,
            explanationVi:
              'Câu điều kiện loại 3 đảo ngữ: "Had + S + V3" = "If the shipment had been inspected". "If" cần "had" sau chủ ngữ; "Were", "Should" dùng cho đảo ngữ loại 2 và loại 1.',
            translationVi:
              'Nếu lô hàng được kiểm tra sớm hơn, các bộ phận lỗi đã được phát hiện trước khi giao.',
            skillTags: ['grammar.conjunction', 'grammar.verb-tense'],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Manufacturing',
        questions: [
          {
            text: 'Only after the safety inspection was completed ------- the workers allowed to re-enter the plant.',
            options: ['was', 'were', 'did', 'had'],
            answer: 1,
            explanationVi:
              '"Only after…" đứng đầu câu → đảo ngữ ở mệnh đề chính. Chủ ngữ "the workers" số nhiều, câu bị động quá khứ → "were… allowed". "was" sai số; "did", "had" không đi với "allowed" trong cấu trúc bị động này.',
            translationVi:
              'Chỉ sau khi đợt kiểm tra an toàn hoàn tất, công nhân mới được phép quay lại nhà máy.',
            skillTags: ['grammar.agreement', 'grammar.verb-form'],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Legal',
        questions: [
          {
            text: 'The service agreement will remain in ------- until either party gives 60 days’ written notice.',
            options: ['effect', 'affect', 'effective', 'effectively'],
            answer: 0,
            explanationVi:
              '"remain in effect" = vẫn còn hiệu lực, cụm cố định; sau giới từ "in" cần danh từ "effect". "affect" là động từ (bẫy âm gần giống); "effective", "effectively" là tính từ / trạng từ.',
            translationVi:
              'Hợp đồng dịch vụ vẫn có hiệu lực cho đến khi một trong hai bên thông báo bằng văn bản trước 60 ngày.',
            skillTags: ['vocab.collocation', 'grammar.word-form'],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Security',
        questions: [
          {
            text: 'Mr. Tanaka has asked that every visitor ------- his or her badge to the reception desk before leaving the building.',
            options: ['returns', 'will return', 'returned', 'return'],
            answer: 3,
            explanationVi:
              'Sau "ask that" (yêu cầu) dùng thể giả định: động từ nguyên mẫu không chia → "return", dù chủ ngữ "every visitor" số ít. "returns" là bẫy hoà hợp chủ – vị.',
            translationVi:
              'Ông Tanaka yêu cầu mọi khách đến thăm trả lại thẻ ở quầy lễ tân trước khi rời toà nhà.',
            skillTags: ['grammar.verb-form'],
          },
        ],
      },
    ],
    P6: [
      {
        difficulty: 'MEDIUM',
        topic: 'Office',
        passage:
          'To: All members\nFrom: Priya Nair, Community Manager\nSubject: New room-booking app\n\nStarting Monday, October 6, meeting rooms at Harborview Workspace can only be reserved [1] our new mobile app. The paper sign-up sheets at the front desk will be removed. [2]. Members who book a room but do not check in within fifteen minutes will have their reservation [3] released so that others can use the space. If you have any trouble [4] the app, our front-desk staff will be happy to help.\n\nPriya Nair',
        questions: [
          {
            options: ['through', 'among', 'along', 'toward'],
            answer: 0,
            explanationVi:
              '"reserved through our app" = đặt qua ứng dụng; "through" chỉ phương tiện. "among" (giữa nhiều thứ), "along" (dọc theo), "toward" (về phía) sai nghĩa.',
            skillTags: ['grammar.preposition'],
          },
          {
            options: [
              'Thank you for filling out the sheets so carefully.',
              'The app can be downloaded free of charge from our website.',
              'Meeting rooms are available on the second floor only.',
              'Please return the sheets to the front desk by Friday.',
            ],
            answer: 1,
            explanationVi:
              'Sau khi báo bỏ tờ đăng ký giấy, câu hợp lý là hướng dẫn tải ứng dụng (B). (A) và (D) mâu thuẫn vì tờ giấy sẽ bị bỏ; (C) không liên quan đến việc đổi cách đặt phòng.',
            skillTags: ['comprehension.sentence-insertion'],
          },
          {
            options: ['automatic', 'automatically', 'automate', 'automation'],
            answer: 1,
            explanationVi:
              'Bổ nghĩa cho phân từ "released" cần trạng từ → "automatically" (tự động). Tính từ "automatic" không bổ nghĩa cho động từ.',
            skillTags: ['grammar.word-form'],
          },
          {
            options: ['use', 'to use', 'using', 'used'],
            answer: 2,
            explanationVi:
              '"have trouble + V-ing" = gặp khó khăn khi làm gì → "using".',
            skillTags: ['grammar.verb-form', 'vocab.collocation'],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Publishing',
        passage:
          'MEMO\nTo: Editorial and Production Staff\nFrom: Tomás Reyes, Operations Director\nDate: 14 March\n\nAs many of you know, our contract with Brightline Press expires at the end of April. After [1] proposals from five printing firms, we have chosen Calloway Print Group as our new partner. Calloway’s facility is closer to our distribution center, which should shorten delivery times considerably. [2], its digital proofing system will allow editors to approve pages online rather than waiting for printed proofs. [3]. Production coordinators will receive training on the new system during the week of April 7. Until the transition is complete, all orders already placed with Brightline will be [4] as scheduled.',
        questions: [
          {
            options: ['evaluated', 'evaluation', 'evaluate', 'evaluating'],
            answer: 3,
            explanationVi:
              'Sau giới từ "After" và có tân ngữ "proposals" → danh động từ "evaluating". "evaluation" là danh từ, không đi trực tiếp với tân ngữ (phải là "evaluation of").',
            skillTags: ['grammar.verb-form'],
          },
          {
            options: ['Instead', 'Nevertheless', 'In addition', 'Otherwise'],
            answer: 2,
            explanationVi:
              'Câu trước nêu một lợi ích (giao hàng nhanh hơn), câu này nêu thêm lợi ích khác (duyệt bản in trực tuyến) → "In addition" (ngoài ra). "Nevertheless" chỉ tương phản; "Instead", "Otherwise" sai logic.',
            skillTags: ['grammar.conjunction'],
          },
          {
            options: [
              'Brightline has agreed to lower its prices for the coming year.',
              'This change is expected to cut our production schedule by several days.',
              'Printed proofs will therefore remain the standard method.',
              'The distribution center will close permanently in April.',
            ],
            answer: 1,
            explanationVi:
              'Câu chèn tổng kết tác động của việc duyệt bản in trực tuyến → rút ngắn lịch sản xuất (B). (A) mâu thuẫn vì đã chọn nhà in mới; (C) ngược với câu trước; (D) mâu thuẫn vì trung tâm phân phối vẫn được dùng.',
            skillTags: ['comprehension.sentence-insertion'],
          },
          {
            options: ['canceled', 'postponed', 'questioned', 'processed'],
            answer: 3,
            explanationVi:
              '"as scheduled" (theo đúng lịch) → các đơn đã đặt vẫn được "processed" (xử lý) bình thường. "postponed" (hoãn) và "canceled" (huỷ) mâu thuẫn với "as scheduled".',
            skillTags: ['vocab.meaning'],
          },
        ],
      },
    ],
    P7: [
      {
        difficulty: 'MEDIUM',
        topic: 'Events',
        passage:
          'Leon Fischer (9:12 A.M.)\nHi Ana, are you still at the print shop? The banner for the Lakeside job fair has the wrong booth number on it — it says 14, but we’re at 41.\n\nAna Moreira (9:14 A.M.)\nI just left. Do you want me to turn around?\n\nLeon Fischer (9:15 A.M.)\nThe doors open at 11.\n\nAna Moreira (9:16 A.M.)\nGot it. I’ll ask them to rush a new one and bring it straight to the venue.\n\nLeon Fischer (9:17 A.M.)\nThanks. I’ll tape a sign to our table in the meantime.',
        questions: [
          {
            text: 'What problem does Mr. Fischer mention?',
            options: [
              'A booth has been given to another company.',
              'A print shop has closed early.',
              'A banner shows an incorrect number.',
              'A job fair has been moved to a new venue.',
            ],
            answer: 2,
            explanationVi:
              '"the wrong booth number… it says 14, but we’re at 41" → băng rôn ghi sai số (C). Gian hàng vẫn là của họ (số 41) nên (A) sai.',
            translationVi: 'Ông Fischer nêu ra vấn đề gì?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'At 9:15 A.M., what does Mr. Fischer most likely mean when he writes, "The doors open at 11"?',
            options: [
              'He is asking her to confirm the opening time.',
              'He believes a corrected banner can still be ready in time.',
              'He thinks the job fair will start late.',
              'He wants her to come to the venue right away.',
            ],
            answer: 1,
            explanationVi:
              'Cô hỏi có cần quay lại không; ông trả lời "11 giờ mới mở cửa" → ý là vẫn còn thời gian in lại băng rôn, nên hãy quay lại (B). Cô hiểu đúng ý: "I’ll ask them to rush a new one". (D) ngược ý.',
            translationVi:
              'Lúc 9:15, ông Fischer có ý gì khi viết "11 giờ mới mở cửa"?',
            skillTags: ['comprehension.speaker-intent'],
          },
        ],
      },
      {
        difficulty: 'EASY',
        topic: 'Facilities',
        passage:
          'NOTICE TO TENANTS – CALDER TOWER\n\nBeginning Monday, 2 June, recycling will be collected on Tuesdays and Fridays instead of every weekday. Please flatten all cardboard boxes before placing them in the blue bins on each floor. Glass bottles should be taken to the collection point in the basement car park, next to the bicycle racks. Bins that contain food waste will not be emptied. For large items such as furniture, contact the management office at least three days in advance to arrange a pickup.\n\nCalder Tower Management Office',
        questions: [
          {
            text: 'What is the main purpose of the notice?',
            options: [
              'To announce a new collection schedule',
              'To advertise a furniture sale',
              'To introduce new bicycle racks',
              'To report a problem in the car park',
            ],
            answer: 0,
            explanationVi:
              'Câu đầu: rác tái chế sẽ được thu vào thứ Ba và thứ Sáu thay vì mỗi ngày → thông báo lịch thu gom mới (A).',
            translationVi: 'Mục đích chính của thông báo là gì?',
            skillTags: ['comprehension.main-idea'],
          },
          {
            text: 'Where should tenants take glass bottles?',
            options: [
              'To the blue bins on each floor',
              'To the management office',
              'To an area in the basement',
              'To a recycling center nearby',
            ],
            answer: 2,
            explanationVi:
              '"Glass bottles should be taken to the collection point in the basement car park" → khu vực dưới tầng hầm (C). Thùng xanh dành cho bìa các-tông (A).',
            translationVi: 'Người thuê nên mang chai thuỷ tinh đến đâu?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'What should tenants do to dispose of furniture?',
            options: [
              'Leave it next to the bicycle racks',
              'Place it outside on a Tuesday',
              'Take it apart first',
              'Contact the office several days ahead',
            ],
            answer: 3,
            explanationVi:
              '"contact the management office at least three days in advance" → liên hệ văn phòng trước vài ngày (D).',
            translationVi: 'Người thuê nên làm gì để bỏ đồ nội thất?',
            skillTags: ['comprehension.detail'],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Business news',
        passage:
          'KESWICK — Thornbury Teas, the family-run blender based in Keswick for more than forty years, will open a second production site in Penrith this autumn. The company, which currently employs 38 people, expects to add about 25 positions over the next two years, most of them in packaging and quality control.\n\nManaging director Helen Thornbury said the move was driven by demand from overseas. “Exports accounted for less than a tenth of our sales five years ago,” she said. “Today they represent almost a third, and our current building simply cannot keep up.”\n\nThe Penrith facility, a former furniture warehouse, is being refitted with equipment that will allow the company to produce individually wrapped tea bags for hotels and airlines — a market Thornbury has so far been unable to serve. The original Keswick site will continue to handle blending and will remain home to the company’s visitor shop, which draws an estimated 20,000 visitors a year.\n\nMs. Thornbury declined to disclose the cost of the project but noted that part of it is being funded by a regional development grant.',
        questions: [
          {
            text: 'What is the article mainly about?',
            options: [
              'A company’s plan to open an additional site',
              'A family business being sold to new owners',
              'A new tea shop opening for tourists',
              'A regional grant program for exporters',
            ],
            answer: 0,
            explanationVi:
              'Bài báo nói Thornbury Teas mở cơ sở sản xuất thứ hai ở Penrith → kế hoạch mở thêm cơ sở (A). Cửa hàng du khách đã có sẵn ở Keswick (C sai); khoản trợ cấp chỉ là chi tiết phụ (D).',
            translationVi: 'Bài báo chủ yếu nói về điều gì?',
            skillTags: ['comprehension.main-idea'],
          },
          {
            text: 'What is indicated about Thornbury Teas’ exports?',
            options: [
              'They are mostly sent to hotels and airlines.',
              'They have grown significantly in recent years.',
              'They make up more than half of its sales.',
              'They will be handled entirely from Keswick.',
            ],
            answer: 1,
            explanationVi:
              'Xuất khẩu từ dưới 1/10 doanh số lên gần 1/3 trong năm năm → tăng mạnh (B). (C) sai vì chỉ gần một phần ba; (A) là thị trường mới của cơ sở Penrith, không phải xuất khẩu.',
            translationVi:
              'Điều gì được nói về hàng xuất khẩu của Thornbury Teas?',
            skillTags: ['comprehension.detail', 'comprehension.inference'],
          },
          {
            text: 'The word "serve" in paragraph 3 is closest in meaning to',
            options: ['perform', 'present', 'work for', 'supply'],
            answer: 3,
            explanationVi:
              '"a market Thornbury has so far been unable to serve" = thị trường công ty chưa thể cung cấp hàng → "supply" (D). "work for" (làm thuê cho) và "present" (trình bày) sai nghĩa trong ngữ cảnh.',
            translationVi: 'Từ "serve" ở đoạn 3 gần nghĩa nhất với',
            skillTags: ['comprehension.vocab-in-context'],
          },
          {
            text: 'What is NOT stated about the Penrith facility?',
            options: [
              'It was previously used for another purpose.',
              'It will make individually wrapped tea bags.',
              'It will house the company’s visitor shop.',
              'It will create jobs in packaging.',
            ],
            answer: 2,
            explanationVi:
              'Cửa hàng du khách vẫn ở Keswick ("will remain home to the company’s visitor shop") → (C) KHÔNG đúng. (A) đúng: từng là kho nội thất; (B) đúng; (D) đúng: việc làm mới chủ yếu ở khâu đóng gói.',
            translationVi: 'Điều gì KHÔNG được nói về cơ sở ở Penrith?',
            skillTags: ['comprehension.not-true'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Manufacturing',
        passage:
          'Grace Oduya [2:03 P.M.]: Quick update — the Seoul delegation now lands on Thursday at 7 A.M., not Friday. Their schedule changed.\nMarco Bellini [2:04 P.M.]: That’s a day earlier than we planned. The factory tour was set for Friday morning.\nGrace Oduya [2:05 P.M.]: Can we move it to Thursday afternoon? They’ll want to rest in the morning.\nYuki Sato [2:06 P.M.]: The assembly line shuts down at 3 on Thursdays for maintenance. They’d see an empty floor.\nMarco Bellini [2:07 P.M.]: What about starting at 1? That gives them two hours on the floor.\nYuki Sato [2:08 P.M.]: That works. I’ll let the line supervisors know.\nGrace Oduya [2:09 P.M.]: Great. I’ll move our dinner booking at Lantern House to Thursday as well and send everyone the revised itinerary by the end of the day.',
        questions: [
          {
            text: 'Why did Ms. Oduya start the online chat discussion?',
            options: [
              'To propose a new factory location',
              'To report a change in visitors’ arrival date',
              'To ask for help with maintenance work',
              'To cancel a dinner reservation',
            ],
            answer: 1,
            explanationVi:
              '"the Seoul delegation now lands on Thursday… not Friday" → báo đoàn khách đến sớm hơn (B). Bữa tối được dời chứ không huỷ (D).',
            translationVi: 'Vì sao cô Oduya bắt đầu cuộc trò chuyện?',
            skillTags: ['comprehension.main-idea'],
          },
          {
            text: 'At 2:06 P.M., what does Ms. Sato imply when she writes, "They’d see an empty floor"?',
            options: [
              'The factory does not have enough workers.',
              'A late-afternoon tour would not show production in progress.',
              'The visitors are not interested in the assembly line.',
              'The factory floor is being cleaned on Thursday morning.',
            ],
            answer: 1,
            explanationVi:
              'Dây chuyền dừng lúc 3 giờ chiều thứ Năm để bảo trì → nếu tham quan muộn thì khách chỉ thấy xưởng trống, không thấy sản xuất (B). (D) bẫy từ "maintenance" nhưng sai thời điểm.',
            translationVi:
              'Lúc 2:06, cô Sato ngụ ý gì khi viết "Họ sẽ chỉ thấy một xưởng trống"?',
            skillTags: ['comprehension.speaker-intent'],
          },
          {
            text: 'What time will the factory tour most likely begin?',
            options: [
              'At 7 A.M. on Thursday',
              'At 3 P.M. on Thursday',
              'On Friday morning',
              'At 1 P.M. on Thursday',
            ],
            answer: 3,
            explanationVi:
              'Ông Bellini đề xuất bắt đầu lúc 1 giờ, cô Sato đồng ý "That works" → 1 giờ chiều thứ Năm (D). 7 giờ sáng là giờ hạ cánh; 3 giờ là giờ dây chuyền dừng.',
            translationVi: 'Buổi tham quan nhà máy có lẽ bắt đầu lúc mấy giờ?',
            skillTags: ['comprehension.inference'],
          },
          {
            text: 'What will Ms. Oduya most likely do next?',
            options: [
              'Meet the delegation at the airport',
              'Contact the line supervisors',
              'Change a restaurant booking',
              'Postpone the factory tour',
            ],
            answer: 2,
            explanationVi:
              '"I’ll move our dinner booking at Lantern House to Thursday" → đổi đặt chỗ nhà hàng (C). (B) là việc của cô Sato – bẫy sai người.',
            translationVi: 'Cô Oduya có lẽ sẽ làm gì tiếp theo?',
            skillTags: ['comprehension.next-action'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Training',
        passage:
          'REGISTRATION CONFIRMATION\nNorthbridge Business Skills Series\n\nParticipant: Daniel Achebe\nCompany: Veltro Packaging Ltd.\nWorkshop: Negotiating with Suppliers (Level 2)\nDate: Wednesday, 9 April, 9:30 A.M. – 4:00 P.M.\nLocation: Room 3B, Northbridge Chamber of Commerce\nFee: £180 (to be invoiced to your company)\n\nPlease note: Participants must have completed Level 1 or have at least two years of purchasing experience. Lunch is provided; please inform us of any dietary requirements by 2 April. Cancellations made after 2 April are not eligible for a refund, but a colleague may attend in your place.',
        questions: [
          {
            text: 'What is suggested about Mr. Achebe?',
            options: [
              'He will pay the workshop fee himself.',
              'He has taken Level 1 or has relevant work experience.',
              'He works for the Chamber of Commerce.',
              'He has special dietary requirements.',
            ],
            answer: 1,
            explanationVi:
              'Người dự khoá phải đã học Level 1 hoặc có ít nhất hai năm kinh nghiệm mua hàng; ông đã được xác nhận đăng ký → ông đáp ứng một trong hai điều kiện (B). Phí được gửi hoá đơn cho công ty (A sai).',
            translationVi: 'Có thể suy ra điều gì về ông Achebe?',
            skillTags: ['comprehension.inference'],
          },
          {
            text: 'According to the confirmation, what can Mr. Achebe do if he cannot attend and it is after 2 April?',
            options: [
              'Receive a full refund',
              'Move to a later date',
              'Send a coworker instead',
              'Attend online',
            ],
            answer: 2,
            explanationVi:
              'Huỷ sau 2/4 không được hoàn tiền "but a colleague may attend in your place" → cử đồng nghiệp đi thay (C).',
            translationVi:
              'Theo giấy xác nhận, nếu không thể tham dự và đã sau ngày 2/4, ông Achebe có thể làm gì?',
            skillTags: ['comprehension.detail'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Delivery',
        passage:
          'SWIFTSPOKE COURIERS — Same-day bicycle delivery across Bristol\n\nStandard (within 4 hours): £9\nExpress (within 90 minutes): £16\nScheduled (choose a 1-hour window; book by 6 P.M. the day before): £12\nItems over 8 kg: add £5\n\nBusiness accounts receive a 10% discount on all services and a single monthly invoice. Deliveries outside the city-centre zone may take longer.\n---\nTo: accounts@swiftspoke.co.uk\nFrom: Olivia Brandt <o.brandt@marrowandvine.co.uk>\nDate: 18 May\nSubject: Invoice query\n\nHello,\n\nI manage the office at Marrow & Vine, an architecture practice, and we opened a business account with you in March. Our April invoice lists a delivery on 22 April at the full price of £16, without our usual discount. The parcel — a set of rolled drawings weighing about 3 kg — arrived within the hour, as requested, so we have no complaint about the service itself.\n\nCould you correct the charge and send a revised invoice? We would also like to arrange regular deliveries to a client in Clifton every Monday morning between 9 and 10.\n\nKind regards,\nOlivia Brandt',
        questions: [
          {
            text: 'Why did Ms. Brandt write the e-mail?',
            options: [
              'To complain about a late delivery',
              'To open a business account',
              'To ask for a billing error to be fixed',
              'To report a damaged parcel',
            ],
            answer: 2,
            explanationVi:
              '"Could you correct the charge and send a revised invoice?" → yêu cầu sửa lỗi hoá đơn (C). Cô nói rõ không phàn nàn về dịch vụ (A, D sai); tài khoản đã mở từ tháng Ba (B sai).',
            translationVi: 'Vì sao cô Brandt viết email?',
            skillTags: ['comprehension.main-idea'],
          },
          {
            text: 'Which service did Marrow & Vine use on 22 April?',
            options: ['Standard', 'Express', 'Scheduled', 'Out-of-zone'],
            answer: 1,
            explanationVi:
              'Giá £16 và giao "within the hour" khớp với Express (£16, trong 90 phút) ở đoạn 1 → (B). Câu cần nối hai văn bản.',
            translationVi: 'Marrow & Vine đã dùng dịch vụ nào ngày 22/4?',
            skillTags: ['comprehension.cross-reference'],
          },
          {
            text: 'How much should Marrow & Vine have been charged for the delivery?',
            options: ['£9.00', '£14.40', '£16.00', '£21.00'],
            answer: 1,
            explanationVi:
              'Tài khoản doanh nghiệp giảm 10% mọi dịch vụ: £16 – 10% = £14,40 (B). Gói hàng nặng khoảng 3 kg, dưới mức 8 kg nên không cộng £5 → (D) £21 là bẫy.',
            translationVi:
              'Lẽ ra Marrow & Vine phải trả bao nhiêu cho lần giao hàng đó?',
            skillTags: [
              'comprehension.cross-reference',
              'comprehension.inference',
            ],
          },
          {
            text: 'What is indicated about the parcel sent on 22 April?',
            options: [
              'It was damaged during delivery.',
              'It contained architectural drawings.',
              'It was sent to a client in Clifton.',
              'It was delivered outside the city centre.',
            ],
            answer: 1,
            explanationVi:
              '"a set of rolled drawings" của một văn phòng kiến trúc → bản vẽ kiến trúc (B). Clifton là nơi nhận các chuyến giao định kỳ sắp tới, không phải gói hàng này (C).',
            translationVi: 'Điều gì được nói về gói hàng gửi ngày 22/4?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'Which service will Ms. Brandt most likely use for the Monday deliveries?',
            options: ['Standard', 'Express', 'Scheduled', 'Out-of-zone'],
            answer: 2,
            explanationVi:
              'Cô muốn giao mỗi sáng thứ Hai trong khung 9–10 giờ, tức khung một tiếng cố định → dịch vụ Scheduled ("choose a 1-hour window") (C).',
            translationVi:
              'Cô Brandt có lẽ sẽ dùng dịch vụ nào cho các chuyến giao hàng sáng thứ Hai?',
            skillTags: [
              'comprehension.cross-reference',
              'comprehension.inference',
            ],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Hospitality',
        passage:
          'COASTAL HOSPITALITY FORUM — Day 2 Programme (Friday, 12 September)\n\n9:00–10:00 Keynote: "Guests Who Return" — Dr. Ines Carvalho, Harbourline Hotels\n10:15–11:15 Workshop A: Pricing Rooms in a Seasonal Market — Kwame Mensah\n10:15–11:15 Workshop B: Training Front-Desk Staff to Handle Complaints — Sofia Lindgren\n11:30–12:30 Panel: Sustainable Kitchens — moderated by Peter Hale\n12:30–13:30 Lunch (Terrace Restaurant)\n\nWorkshops are limited to 40 participants. Please sign up at the registration desk on Day 1.\n---\nFrom: Kwame Mensah\nTo: Forum Organising Committee\nDate: 3 September\nSubject: Day 2 timing\n\nDear Committee,\n\nMy flight from Accra has been rescheduled, and I will not reach the venue until about 11:00 on Friday. Would it be possible to exchange my slot with the panel? I would be happy to present at 11:30 instead. Peter Hale has already told me that he has no objection.\n\nBest regards,\nKwame Mensah\n---\nPARTICIPANT FEEDBACK — Coastal Hospitality Forum\nName: Rosa Delgado, Front Office Manager, Bayview Inn\n\nDay 2 sessions attended: keynote; workshop at 11:30; lunch\n\nComments: The workshop I signed up for on Day 1 was by far the most useful part of the forum. The examples of adjusting rates for the off-season were exactly what a small hotel like ours needs. However, because the session ended later than lunch was due to start, we reached the terrace late and the vegetarian dish had already run out. Next year, please announce timing changes by email rather than only on the board in the lobby.',
        questions: [
          {
            text: 'What is the purpose of Mr. Mensah’s e-mail?',
            options: [
              'To cancel his presentation',
              'To request a change to a schedule',
              'To recommend a panel moderator',
              'To ask for a larger workshop room',
            ],
            answer: 1,
            explanationVi:
              '"Would it be possible to exchange my slot with the panel?" → đề nghị đổi lịch (B). Ông vẫn trình bày, chỉ đổi giờ (A sai).',
            translationVi: 'Mục đích email của ông Mensah là gì?',
            skillTags: ['comprehension.main-idea'],
          },
          {
            text: 'What is suggested about Peter Hale?',
            options: [
              'He was unable to attend the forum.',
              'He works for Harbourline Hotels.',
              'His session took place earlier than originally planned.',
              'He traveled from Accra with Mr. Mensah.',
            ],
            answer: 2,
            explanationVi:
              'Mensah đổi chỗ với buổi tọa đàm do Peter Hale điều phối (11:30) và Hale đồng ý; phản hồi của bà Delgado cho thấy hội thảo diễn ra lúc 11:30 → buổi tọa đàm chuyển lên 10:15, sớm hơn dự kiến (C). Cần nối cả ba văn bản.',
            translationVi: 'Có thể suy ra điều gì về Peter Hale?',
            skillTags: [
              'comprehension.cross-reference',
              'comprehension.inference',
            ],
          },
          {
            text: 'Which workshop did Ms. Delgado most likely attend?',
            options: [
              'Guests Who Return',
              'Training Front-Desk Staff to Handle Complaints',
              'Sustainable Kitchens',
              'Pricing Rooms in a Seasonal Market',
            ],
            answer: 3,
            explanationVi:
              'Bà dự hội thảo lúc 11:30 và khen phần "điều chỉnh giá phòng mùa thấp điểm" → hội thảo của Mensah về định giá phòng theo mùa, đã dời sang 11:30 (D). (B) là bẫy vì bà là quản lý lễ tân; (A) là bài phát biểu chính, (C) là tọa đàm.',
            translationVi: 'Bà Delgado có lẽ đã tham dự hội thảo nào?',
            skillTags: ['comprehension.cross-reference'],
          },
          {
            text: 'What problem does Ms. Delgado mention?',
            options: [
              'A meal option was no longer available.',
              'A workshop was fully booked.',
              'The lobby board was difficult to read.',
              'The keynote speaker arrived late.',
            ],
            answer: 0,
            explanationVi:
              '"the vegetarian dish had already run out" → món chay đã hết (A). Bảng ở sảnh được nhắc nhưng không nói khó đọc (C).',
            translationVi: 'Bà Delgado nêu ra vấn đề gì?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'What does Ms. Delgado recommend for next year’s forum?',
            options: [
              'Holding workshops after lunch',
              'Offering more vegetarian dishes',
              'Sending schedule updates by email',
              'Allowing sign-ups on the second day',
            ],
            answer: 2,
            explanationVi:
              '"please announce timing changes by email rather than only on the board" → gửi thông báo thay đổi lịch qua email (C). (B) liên quan đến vấn đề bà gặp nhưng không phải đề xuất của bà.',
            translationVi: 'Bà Delgado đề xuất gì cho diễn đàn năm sau?',
            skillTags: ['comprehension.detail'],
          },
        ],
      },
    ],
  },
}
