import type { TestFixture } from '../types'

export const MINI_01: TestFixture = {
  title: 'Lingo Mini Test 01',
  description:
    'Bài thi rút gọn TOEIC Listening & Reading gồm Part 2–7, phần lớn ở mức độ vừa, được biên soạn riêng cho Lingo.',
  items: {
    P2: [
      {
        difficulty: 'EASY',
        topic: 'Office',
        accent: 'US',
        questions: [
          {
            text: 'Where should I put these boxes of printer paper?',
            options: [
              'About twenty boxes.',
              'In the supply closet, please.',
              'Yes, I printed them.',
            ],
            answer: 1,
            explanationVi:
              'Câu hỏi "Where" hỏi nơi chốn → (B) "Trong tủ đồ dùng văn phòng". (A) trả lời số lượng (How many). (C) trả lời Yes cho câu hỏi Wh- và lặp âm "printer" – "printed".',
            translationVi: 'Tôi nên để mấy thùng giấy in này ở đâu?',
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
            text: 'Who’s leading the training session this afternoon?',
            options: [
              'It starts at three.',
              'On the train, probably.',
              'Ms. Alvarez from Human Resources.',
            ],
            answer: 2,
            explanationVi:
              'Câu hỏi "Who" hỏi người → (C) "Cô Alvarez bên Nhân sự". (A) trả lời thời gian (When). (B) bẫy âm "training" – "train".',
            translationVi: 'Ai sẽ phụ trách buổi đào tạo chiều nay?',
            skillTags: ['listening.wh-question'],
          },
        ],
      },
      {
        difficulty: 'EASY',
        topic: 'Travel',
        accent: 'AU',
        questions: [
          {
            text: 'How long does the bus ride to the airport take?',
            options: [
              'About forty minutes.',
              'A round-trip ticket.',
              'It’s a long story.',
            ],
            answer: 0,
            explanationVi:
              '"How long" hỏi khoảng thời gian → (A) "Khoảng bốn mươi phút". (B) nói về loại vé, không trả lời câu hỏi. (C) lặp từ "long" nhưng sai nghĩa.',
            translationVi: 'Đi xe buýt ra sân bay mất bao lâu?',
            skillTags: ['listening.wh-question'],
          },
        ],
      },
      {
        difficulty: 'EASY',
        topic: 'Office',
        accent: 'CA',
        questions: [
          {
            text: 'Why is the front entrance locked?',
            options: [
              'At the front desk.',
              'Because the floors are being cleaned.',
              'I locked my car.',
            ],
            answer: 1,
            explanationVi:
              'Câu hỏi "Why" hỏi lý do → (B) "Vì sàn đang được lau". (A) trả lời nơi chốn và lặp từ "front". (C) lặp âm "locked" nhưng không liên quan.',
            translationVi: 'Tại sao cửa chính lại bị khóa?',
            skillTags: ['listening.wh-question'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Business',
        accent: 'US',
        questions: [
          {
            text: 'Should we hold the client dinner on Thursday or Friday?',
            options: [
              'Yes, we should.',
              'A table for six.',
              'Friday works better for most people.',
            ],
            answer: 2,
            explanationVi:
              'Câu hỏi lựa chọn "Thursday or Friday" → chọn một: (C) "Thứ Sáu tiện hơn cho đa số mọi người". (A) trả lời Yes/No cho câu hỏi lựa chọn là sai. (B) liên tưởng tới "dinner" (bàn ăn) nhưng không trả lời.',
            translationVi:
              'Chúng ta nên tổ chức bữa tối với khách hàng vào thứ Năm hay thứ Sáu?',
            skillTags: ['listening.yes-no'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Business',
        accent: 'GB',
        questions: [
          {
            text: 'You’ve already reviewed the sales contract, haven’t you?',
            options: [
              'I’m still on the last page.',
              'The sale ends tomorrow.',
              'A two-year contract.',
            ],
            answer: 0,
            explanationVi:
              'Câu hỏi đuôi xác nhận việc đã xem hợp đồng chưa → (A) trả lời gián tiếp: "Tôi vẫn đang đọc trang cuối" (tức là chưa xong). (B) bẫy âm "sales" – "sale". (C) lặp từ "contract" nhưng nói về thời hạn hợp đồng.',
            translationVi: 'Bạn đã xem qua hợp đồng bán hàng rồi, phải không?',
            skillTags: ['listening.yes-no', 'listening.indirect'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Retail',
        accent: 'AU',
        questions: [
          {
            text: 'Would you mind covering my shift on Saturday morning?',
            options: [
              'The store opens at nine.',
              'Not at all, I’m free then.',
              'He covered the table.',
            ],
            answer: 1,
            explanationVi:
              '"Would you mind...?" là lời nhờ; đồng ý thì nói "Not at all" (không phiền gì) → (B). (A) nói giờ mở cửa, không trả lời lời nhờ. (C) lặp từ "cover" với nghĩa khác (phủ lên).',
            translationVi:
              'Bạn có phiền làm thay ca sáng thứ Bảy cho tôi không?',
            skillTags: ['listening.yes-no'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Office',
        accent: 'CA',
        questions: [
          {
            text: 'The quarterly report needs a few more charts.',
            options: [
              'Every three months.',
              'A quarter past ten.',
              'I’ll add them this afternoon.',
            ],
            answer: 2,
            explanationVi:
              'Câu trần thuật nêu một việc cần làm → phản hồi tự nhiên là nhận làm: (C) "Chiều nay tôi sẽ thêm vào". (A) giải thích nghĩa "quarterly" nhưng không phải lời đáp. (B) bẫy âm "quarterly" – "quarter".',
            translationVi: 'Báo cáo quý cần thêm vài biểu đồ nữa.',
            skillTags: ['listening.indirect'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Office',
        accent: 'US',
        questions: [
          {
            text: 'Which supplier did we choose for the office furniture?',
            options: [
              'We haven’t made a decision yet.',
              'A desk and two chairs.',
              'Yes, it was delivered.',
            ],
            answer: 0,
            explanationVi:
              'Câu hỏi "Which supplier" → (A) trả lời gián tiếp: "Chúng ta chưa quyết định". (B) liên tưởng tới "furniture" nhưng không nói nhà cung cấp nào. (C) trả lời Yes cho câu hỏi Wh-.',
            translationVi:
              'Chúng ta đã chọn nhà cung cấp nào cho đồ nội thất văn phòng?',
            skillTags: ['listening.wh-question', 'listening.indirect'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Office',
        accent: 'GB',
        questions: [
          {
            text: 'Why don’t we take a short break before the next presentation?',
            options: [
              'Good idea, I need some coffee.',
              'Because it was broken.',
              'The presenter is from Tokyo.',
            ],
            answer: 0,
            explanationVi:
              '"Why don’t we...?" là lời đề nghị, không hỏi lý do → (A) đồng ý "Ý hay đấy". (B) bẫy trả lời "Because" và âm "break" – "broken". (C) bẫy âm "presentation" – "presenter".',
            translationVi:
              'Sao chúng ta không nghỉ giải lao một chút trước bài thuyết trình tiếp theo?',
            skillTags: ['listening.wh-question'],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Technology',
        accent: 'AU',
        questions: [
          {
            text: 'Isn’t the new software supposed to be installed on our computers today?',
            options: [
              'Several new computers.',
              'The technician called in sick this morning.',
              'A software engineer.',
            ],
            answer: 1,
            explanationVi:
              'Câu hỏi phủ định để xác nhận lịch cài phần mềm → (B) trả lời gián tiếp: kỹ thuật viên báo ốm sáng nay, nên việc cài đặt có thể bị hoãn. (A) lặp "new computers". (C) lặp "software" nhưng không trả lời.',
            translationVi:
              'Chẳng phải phần mềm mới được cài vào máy tính của chúng ta hôm nay sao?',
            skillTags: ['listening.yes-no', 'listening.indirect'],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Finance',
        accent: 'CA',
        questions: [
          {
            text: 'I can’t find the receipt for last week’s taxi.',
            options: [
              'Take a taxi to the station.',
              'It was received yesterday.',
              'Did you check the expense folder?',
            ],
            answer: 2,
            explanationVi:
              'Câu trần thuật nêu vấn đề → đáp lại bằng một câu hỏi gợi ý: (C) "Bạn đã xem trong thư mục chi phí chưa?". (A) lặp từ "taxi". (B) bẫy âm "receipt" – "received".',
            translationVi: 'Tôi không tìm thấy hóa đơn taxi tuần trước.',
            skillTags: ['listening.indirect'],
          },
        ],
      },
    ],
    P3: [
      {
        difficulty: 'EASY',
        topic: 'Office',
        transcript: [
          {
            speaker: 'W',
            accent: 'US',
            text: 'Hi, Daniel. I’d like to reserve the large conference room for Wednesday afternoon. We’re interviewing candidates for the marketing position.',
          },
          {
            speaker: 'M',
            accent: 'GB',
            text: 'Let me check. I’m sorry, it’s already booked from one to five. The small room on the third floor is free, though.',
          },
          {
            speaker: 'W',
            accent: 'US',
            text: 'How many people does it hold? There will be four of us on the panel.',
          },
          {
            speaker: 'M',
            accent: 'GB',
            text: 'It seats six, so that should be fine. It also has a video screen in case any candidates join remotely.',
          },
          {
            speaker: 'W',
            accent: 'US',
            text: 'Perfect. Please book it for me from two to five.',
          },
          {
            speaker: 'M',
            accent: 'GB',
            text: 'Done. I’ll send you a confirmation email in a few minutes.',
          },
        ],
        questions: [
          {
            text: 'Why does the woman want to reserve a room?',
            options: [
              'To hold job interviews',
              'To train new staff',
              'To meet a client',
              'To celebrate a retirement',
            ],
            answer: 0,
            explanationVi:
              '"We’re interviewing candidates for the marketing position" → phỏng vấn ứng viên (A). Các lựa chọn khác không được nhắc tới.',
            translationVi: 'Tại sao người phụ nữ muốn đặt phòng?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'What does the man say about the large conference room?',
            options: [
              'It is being repainted.',
              'It is unavailable.',
              'It is too small.',
              'It has no video screen.',
            ],
            answer: 1,
            explanationVi:
              '"it’s already booked from one to five" → phòng lớn đã được đặt, không dùng được (B). Màn hình video được nhắc đến cho phòng nhỏ, nên (D) là bẫy.',
            translationVi: 'Người đàn ông nói gì về phòng họp lớn?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'What will the man most likely do next?',
            options: [
              'Call the candidates',
              'Move some chairs',
              'Set up a video screen',
              'Send a confirmation message',
            ],
            answer: 3,
            explanationVi:
              '"I’ll send you a confirmation email in a few minutes" → gửi thư xác nhận (D, "message" là cách nói khác của "email").',
            translationVi: 'Người đàn ông nhiều khả năng sẽ làm gì tiếp theo?',
            skillTags: ['comprehension.next-action'],
          },
        ],
      },
      {
        difficulty: 'EASY',
        topic: 'Shopping',
        transcript: [
          {
            speaker: 'M',
            accent: 'AU',
            text: 'Hi, I bought this jacket here last week, but the zipper broke the second time I wore it.',
          },
          {
            speaker: 'W',
            accent: 'CA',
            text: 'I’m sorry about that. Do you have your receipt?',
          },
          {
            speaker: 'M',
            accent: 'AU',
            text: 'Yes, here it is. I’d like to exchange it for the same jacket, if you have one in a medium.',
          },
          {
            speaker: 'W',
            accent: 'CA',
            text: 'Let me look. We’re out of medium in black, but we have it in dark green.',
          },
          {
            speaker: 'M',
            accent: 'AU',
            text: 'Hmm, I’d prefer black. Could you order one for me?',
          },
          {
            speaker: 'W',
            accent: 'CA',
            text: 'Sure. It should arrive by Friday, and I’ll call you when it’s here.',
          },
        ],
        questions: [
          {
            text: 'What problem does the man mention?',
            options: [
              'The price was incorrect.',
              'The size is too large.',
              'A button is missing.',
              'A zipper does not work.',
            ],
            answer: 3,
            explanationVi:
              '"the zipper broke" → khóa kéo bị hỏng (D). Anh ấy muốn đổi đúng cỡ M, không phàn nàn về cỡ, nên (B) sai.',
            translationVi: 'Người đàn ông nêu vấn đề gì?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'What does the woman ask for?',
            options: [
              'A credit card',
              'A receipt',
              'An email address',
              'A membership card',
            ],
            answer: 1,
            explanationVi:
              '"Do you have your receipt?" → cô ấy hỏi hóa đơn (B).',
            translationVi: 'Người phụ nữ yêu cầu xem gì?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'What does the woman say she will do?',
            options: [
              'Give the man a refund',
              'Repair the jacket today',
              'Call the man when an item arrives',
              'Offer a different color for free',
            ],
            answer: 2,
            explanationVi:
              '"I’ll call you when it’s here" → gọi cho khách khi hàng về (C). Cô ấy có nhắc màu xanh lá nhưng không tặng miễn phí, nên (D) sai.',
            translationVi: 'Người phụ nữ nói cô ấy sẽ làm gì?',
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
            accent: 'GB',
            text: 'Kenji, Paul, have either of you heard from the printing company? The brochures for the trade fair were supposed to arrive this morning.',
          },
          {
            speaker: 'M',
            accent: 'US',
            text: 'I called them an hour ago. They said their delivery van broke down, so the boxes won’t get here until tomorrow afternoon.',
          },
          {
            speaker: 'M2',
            accent: 'CA',
            text: 'That’s cutting it close. The fair opens on Thursday morning, and we still have to pack everything.',
          },
          {
            speaker: 'W',
            accent: 'GB',
            text: 'Could we pick the brochures up ourselves today?',
          },
          {
            speaker: 'M',
            accent: 'US',
            text: 'That’s what I suggested. They said it’s fine as long as we come before six.',
          },
          {
            speaker: 'M2',
            accent: 'CA',
            text: 'I’ll drive over after lunch. I have the company van this afternoon anyway.',
          },
        ],
        questions: [
          {
            text: 'What are the speakers preparing for?',
            options: [
              'An office move',
              'A training workshop',
              'A trade fair',
              'A product launch',
            ],
            answer: 2,
            explanationVi:
              '"The brochures for the trade fair", "The fair opens on Thursday" → họ đang chuẩn bị cho hội chợ thương mại (C).',
            translationVi: 'Những người nói đang chuẩn bị cho sự kiện gì?',
            skillTags: ['comprehension.main-idea'],
          },
          {
            text: 'Why has the delivery been delayed?',
            options: [
              'An order was incorrect.',
              'A vehicle broke down.',
              'A printer ran out of paper.',
              'An address was missing.',
            ],
            answer: 1,
            explanationVi:
              '"their delivery van broke down" → xe giao hàng bị hỏng (B, "vehicle" thay cho "van"). (C) bẫy liên tưởng tới công ty in.',
            translationVi: 'Tại sao việc giao hàng bị chậm?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'What does one of the men offer to do?',
            options: [
              'Pick up some materials',
              'Call the printing company again',
              'Pack the boxes tonight',
              'Revise a brochure',
            ],
            answer: 0,
            explanationVi:
              '"I’ll drive over after lunch" (lái xe sang lấy tài liệu) → tự đi lấy tờ rơi (A). Cuộc gọi đã diễn ra trước đó nên (B) sai.',
            translationVi: 'Một trong hai người đàn ông đề nghị làm gì?',
            skillTags: ['comprehension.next-action'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Dining',
        transcript: [
          {
            speaker: 'M',
            accent: 'GB',
            text: 'Hi, this is Raj from Hillside Dairy. I’m calling about your order for next week.',
          },
          {
            speaker: 'W',
            accent: 'CA',
            text: 'Oh, hi, Raj. Is there a problem?',
          },
          {
            speaker: 'M',
            accent: 'GB',
            text: 'The oat milk brand you usually buy has stopped production for a month. We can send a different brand instead, at the same price.',
          },
          {
            speaker: 'W',
            accent: 'CA',
            text: 'Hmm, several of our regular customers are very particular about their oat milk. Can you send me a sample first?',
          },
          {
            speaker: 'M',
            accent: 'GB',
            text: 'Of course. I’ll drop off a carton on my delivery route tomorrow morning.',
          },
          {
            speaker: 'W',
            accent: 'CA',
            text: 'Great. If our baristas like it, I’ll confirm the order by Thursday.',
          },
        ],
        questions: [
          {
            text: 'Who most likely is the man?',
            options: [
              'A café owner',
              'A dairy supplier',
              'A restaurant critic',
              'A barista trainer',
            ],
            answer: 1,
            explanationVi:
              '"Raj from Hillside Dairy", gọi về đơn hàng tuần sau → nhân viên nhà cung cấp sữa (B). Người phụ nữ mới là người điều hành quán cà phê.',
            translationVi: 'Người đàn ông nhiều khả năng là ai?',
            skillTags: ['comprehension.inference'],
          },
          {
            text: 'What does the woman imply when she says, "several of our regular customers are very particular about their oat milk"?',
            options: [
              'She plans to raise prices.',
              'She wants to stop selling oat milk.',
              'She is concerned about a substitute product.',
              'She needs a larger order.',
            ],
            answer: 2,
            explanationVi:
              'Khách quen rất kén loại sữa yến mạch, nên cô lo nhãn hiệu thay thế không làm khách hài lòng và xin mẫu thử trước → (C). Không có ý tăng giá hay ngừng bán.',
            translationVi:
              'Người phụ nữ ngụ ý gì khi nói "một số khách quen của chúng tôi rất kén chọn sữa yến mạch"?',
            skillTags: ['comprehension.speaker-intent'],
          },
          {
            text: 'What will the man do tomorrow?',
            options: [
              'Send a revised invoice',
              'Visit the café’s other branch',
              'Cancel next week’s order',
              'Bring a product sample',
            ],
            answer: 3,
            explanationVi:
              '"I’ll drop off a carton on my delivery route tomorrow morning" → mang mẫu sản phẩm đến (D).',
            translationVi: 'Ngày mai người đàn ông sẽ làm gì?',
            skillTags: ['comprehension.next-action'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Business',
        transcript: [
          {
            speaker: 'W',
            accent: 'US',
            text: 'Marco, have you registered for the Retail Technology Conference in Denver yet?',
          },
          {
            speaker: 'M',
            accent: 'AU',
            text: 'Not yet. I wasn’t sure the department would pay for it this year.',
          },
          {
            speaker: 'W',
            accent: 'US',
            text: 'Our manager approved it yesterday. But the early registration discount ends on Friday, so we should sign up soon.',
          },
          {
            speaker: 'M',
            accent: 'AU',
            text: 'How much do we save?',
          },
          {
            speaker: 'W',
            accent: 'US',
            text: 'About two hundred dollars each. And if we book through the conference website, we get a lower hotel rate too.',
          },
          {
            speaker: 'M',
            accent: 'AU',
            text: 'OK, I’ll register this afternoon. Should I book the hotel for both of us?',
          },
          {
            speaker: 'W',
            accent: 'US',
            text: 'Yes, please. Just forward me the confirmation.',
          },
        ],
        questions: [
          {
            text: 'What are the speakers discussing?',
            options: [
              'Attending a conference',
              'Hiring a manager',
              'Opening a store in Denver',
              'Changing a hotel booking',
            ],
            answer: 0,
            explanationVi:
              'Cả cuộc hội thoại xoay quanh việc đăng ký dự hội nghị công nghệ bán lẻ ở Denver → (A). Khách sạn chưa được đặt nên (D) sai.',
            translationVi: 'Những người nói đang bàn về việc gì?',
            skillTags: ['comprehension.main-idea'],
          },
          {
            text: 'What does the woman say will happen on Friday?',
            options: [
              'The conference will begin.',
              'A discounted price will expire.',
              'A manager will return from vacation.',
              'A hotel will open.',
            ],
            answer: 1,
            explanationVi:
              '"the early registration discount ends on Friday" → mức giá ưu đãi hết hạn (B, "expire" = "end").',
            translationVi: 'Người phụ nữ nói điều gì sẽ xảy ra vào thứ Sáu?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'What does the woman ask the man to do?',
            options: [
              'Contact their manager',
              'Book flights to Denver',
              'Prepare a presentation',
              'Forward her a document',
            ],
            answer: 3,
            explanationVi:
              '"Just forward me the confirmation" → chuyển cho cô ấy giấy xác nhận (D). Người quản lý đã duyệt rồi nên (A) sai; không nhắc tới vé máy bay.',
            translationVi: 'Người phụ nữ nhờ người đàn ông làm gì?',
            skillTags: ['comprehension.detail'],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Office',
        transcript: [
          {
            speaker: 'M',
            accent: 'CA',
            text: 'So, the movers will start packing our floor on Friday evening. Has everyone labeled their equipment?',
          },
          {
            speaker: 'W',
            accent: 'GB',
            text: 'Most people have, but the design team asked whether they could keep working through the weekend. They have a deadline on Monday.',
          },
          {
            speaker: 'W2',
            accent: 'AU',
            text: 'I spoke with them this morning. They’re taking their laptops home for the weekend, so the rest of their equipment can go with the first truck.',
          },
          {
            speaker: 'M',
            accent: 'CA',
            text: 'Good. What about the new desks? I heard the furniture company was behind schedule.',
          },
          {
            speaker: 'W2',
            accent: 'AU',
            text: 'They were, but they’ve promised delivery by Sunday noon. I’ll be at the new building to sign for them.',
          },
          {
            speaker: 'W',
            accent: 'GB',
            text: 'Then I’ll update the seating plan tonight and send it to everyone, so people know where they’ll sit on Monday.',
          },
        ],
        questions: [
          {
            text: 'What is the conversation mainly about?',
            options: [
              'A furniture sale',
              'A design competition',
              'A move to new offices',
              'A weekend training course',
            ],
            answer: 2,
            explanationVi:
              '"movers", "labeled their equipment", "the new building", "where they’ll sit on Monday" → công ty chuyển sang văn phòng mới (C). "furniture" và "design" chỉ là chi tiết, là bẫy cho (A), (B).',
            translationVi: 'Cuộc hội thoại chủ yếu nói về điều gì?',
            skillTags: ['comprehension.main-idea'],
          },
          {
            text: 'What is mentioned about the design team?',
            options: [
              'They will work remotely over the weekend.',
              'They have finished their project early.',
              'They have not labeled their equipment.',
              'They will help the movers on Friday.',
            ],
            answer: 0,
            explanationVi:
              'Nhóm thiết kế mang laptop về nhà làm cuối tuần vì có hạn chót vào thứ Hai → làm việc từ xa (A). Họ còn hạn chót nên (B) sai; câu "Most people have" không nói nhóm này chưa dán nhãn nên (C) không có căn cứ.',
            translationVi: 'Điều gì được nhắc đến về nhóm thiết kế?',
            skillTags: ['comprehension.detail', 'comprehension.inference'],
          },
          {
            text: 'What will happen on Sunday?',
            options: [
              'The movers will begin packing.',
              'A seating plan will be sent out.',
              'The design team will present its work.',
              'New furniture will arrive.',
            ],
            answer: 3,
            explanationVi:
              '"they’ve promised delivery by Sunday noon" (bàn mới) → đồ nội thất mới được giao vào Chủ nhật (D). Đóng gói bắt đầu tối thứ Sáu (A); sơ đồ chỗ ngồi được gửi "tonight" (B).',
            translationVi: 'Điều gì sẽ diễn ra vào Chủ nhật?',
            skillTags: ['comprehension.detail'],
          },
        ],
      },
    ],
    P4: [
      {
        difficulty: 'EASY',
        topic: 'Shopping',
        transcript: [
          {
            speaker: 'N',
            accent: 'US',
            text: 'Attention, shoppers. Thank you for choosing Brightway Home Goods.',
          },
          {
            speaker: 'N',
            accent: 'US',
            text: 'Today only, all kitchen appliances are thirty percent off, including blenders, toasters, and coffee makers.',
          },
          {
            speaker: 'N',
            accent: 'US',
            text: 'You’ll find them in aisle twelve, next to the garden center.',
          },
          {
            speaker: 'N',
            accent: 'US',
            text: 'Also, members of our rewards program receive free delivery on any purchase over one hundred dollars.',
          },
          {
            speaker: 'N',
            accent: 'US',
            text: 'If you’re not a member yet, you can sign up at the customer service desk near the main entrance.',
          },
        ],
        questions: [
          {
            text: 'Where is the announcement being made?',
            options: [
              'In a factory',
              'In a home goods store',
              'In a garden center',
              'In a coffee shop',
            ],
            answer: 1,
            explanationVi:
              '"Attention, shoppers… Brightway Home Goods" → cửa hàng đồ gia dụng (B). "garden center" chỉ là một khu trong cửa hàng, "coffee makers" là món hàng – đều là bẫy.',
            translationVi: 'Thông báo này được phát ở đâu?',
            skillTags: ['comprehension.inference'],
          },
          {
            text: 'What is on sale today?',
            options: [
              'Kitchen appliances',
              'Garden furniture',
              'Bed linens',
              'Light fixtures',
            ],
            answer: 0,
            explanationVi:
              '"Today only, all kitchen appliances are thirty percent off" → đồ dùng nhà bếp giảm giá (A).',
            translationVi: 'Hôm nay mặt hàng nào được giảm giá?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'According to the speaker, how can listeners get free delivery?',
            options: [
              'By shopping before noon',
              'By paying in cash',
              'By spending a certain amount as a member',
              'By ordering online',
            ],
            answer: 2,
            explanationVi:
              '"members of our rewards program receive free delivery on any purchase over one hundred dollars" → là thành viên và mua trên 100 đô (C).',
            translationVi:
              'Theo người nói, người nghe làm thế nào để được giao hàng miễn phí?',
            skillTags: ['comprehension.detail'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Services',
        transcript: [
          {
            speaker: 'N',
            accent: 'GB',
            text: 'Hello, this is Fiona from Kingsley Auto Repair, calling for Mr. Patel.',
          },
          {
            speaker: 'N',
            accent: 'GB',
            text: 'We’ve finished checking your car, and the brake pads need to be replaced, as you suspected.',
          },
          {
            speaker: 'N',
            accent: 'GB',
            text: 'The good news is that the tyres are in excellent condition, so you won’t need new ones after all.',
          },
          {
            speaker: 'N',
            accent: 'GB',
            text: 'The repair will cost about two hundred and forty pounds, and we can have the car ready by four o’clock today.',
          },
          {
            speaker: 'N',
            accent: 'GB',
            text: 'However, we need your approval before we start the work, so please call us back as soon as you can.',
          },
        ],
        questions: [
          {
            text: 'Who most likely is the speaker?',
            options: [
              'A car salesperson',
              'An employee at a repair shop',
              'A tire manufacturer',
              'An insurance agent',
            ],
            answer: 1,
            explanationVi:
              '"Fiona from Kingsley Auto Repair", đã kiểm tra xe của khách → nhân viên tiệm sửa xe (B).',
            translationVi: 'Người nói nhiều khả năng là ai?',
            skillTags: ['comprehension.inference'],
          },
          {
            text: 'What does the speaker say about the tires?',
            options: [
              'They are covered by a warranty.',
              'They must be ordered.',
              'They need to be replaced.',
              'They do not need to be changed.',
            ],
            answer: 3,
            explanationVi:
              '"the tyres are in excellent condition, so you won’t need new ones" → không cần thay lốp (D). Thứ cần thay là má phanh, nên (C) là bẫy.',
            translationVi: 'Người nói cho biết gì về lốp xe?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'Why does the speaker ask the listener to call back?',
            options: [
              'To approve a repair',
              'To pay a deposit',
              'To schedule a pickup time',
              'To book a rental car',
            ],
            answer: 0,
            explanationVi:
              '"we need your approval before we start the work" → cần khách đồng ý cho sửa (A).',
            translationVi: 'Tại sao người nói đề nghị người nghe gọi lại?',
            skillTags: ['comprehension.speaker-intent'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Travel',
        transcript: [
          {
            speaker: 'N',
            accent: 'AU',
            text: 'Welcome to the Riverside Chocolate Factory, everyone. My name is Liam, and I’ll be your guide this morning.',
          },
          {
            speaker: 'N',
            accent: 'AU',
            text: 'Our tour lasts about an hour, and we’ll start in the room where the cocoa beans are roasted.',
          },
          {
            speaker: 'N',
            accent: 'AU',
            text: 'For safety reasons, please stay behind the yellow lines and don’t touch any of the machines.',
          },
          {
            speaker: 'N',
            accent: 'AU',
            text: 'Photography is allowed everywhere except in the packaging area, because the new products there haven’t been released yet.',
          },
          {
            speaker: 'N',
            accent: 'AU',
            text: 'At the end of the tour, you’ll each receive a free box of our dark chocolate truffles.',
          },
        ],
        questions: [
          {
            text: 'Who is the speaker?',
            options: [
              'A safety inspector',
              'A factory tour guide',
              'A pastry chef',
              'A photographer',
            ],
            answer: 1,
            explanationVi:
              '"My name is Liam, and I’ll be your guide" → hướng dẫn viên tham quan nhà máy (B).',
            translationVi: 'Người nói là ai?',
            skillTags: ['comprehension.inference'],
          },
          {
            text: 'Why are listeners not allowed to take photographs in the packaging area?',
            options: [
              'The machines are dangerous.',
              'The room is too dark.',
              'Workers do not want to be photographed.',
              'Products there have not been made public.',
            ],
            answer: 3,
            explanationVi:
              '"the new products there haven’t been released yet" → sản phẩm chưa ra mắt (D, "not made public"). Máy móc nguy hiểm là lý do phải đứng sau vạch vàng, không phải lý do cấm chụp ảnh – bẫy (A).',
            translationVi:
              'Tại sao người nghe không được chụp ảnh ở khu đóng gói?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'What will listeners receive at the end of the tour?',
            options: [
              'A box of sweets',
              'A discount coupon',
              'A recipe book',
              'A souvenir photo',
            ],
            answer: 0,
            explanationVi:
              '"a free box of our dark chocolate truffles" → một hộp kẹo sô-cô-la (A, "sweets").',
            translationVi: 'Cuối buổi tham quan người nghe sẽ nhận được gì?',
            skillTags: ['comprehension.detail'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'News',
        transcript: [
          {
            speaker: 'N',
            accent: 'CA',
            text: 'In local news, the city council has approved a plan to widen Maple Avenue between Fifth Street and the harbor bridge.',
          },
          {
            speaker: 'N',
            accent: 'CA',
            text: 'Construction will begin on March first and is expected to last about six months.',
          },
          {
            speaker: 'N',
            accent: 'CA',
            text: 'During that time, only one lane will be open in each direction, so drivers should expect delays during rush hour.',
          },
          {
            speaker: 'N',
            accent: 'CA',
            text: 'City officials recommend that commuters use the Harbor Line train, which will add extra morning trains starting next week.',
          },
          {
            speaker: 'N',
            accent: 'CA',
            text: 'Mayor Lucia Gómez says the project will reduce traffic congestion once it’s complete.',
          },
          {
            speaker: 'N',
            accent: 'CA',
            text: 'Stay tuned for the weather forecast after this short break.',
          },
        ],
        questions: [
          {
            text: 'What is the report mainly about?',
            options: [
              'A mayoral election',
              'A road improvement project',
              'The opening of a train line',
              'The closure of a bridge',
            ],
            answer: 1,
            explanationVi:
              'Bản tin nói về kế hoạch mở rộng đại lộ Maple → dự án cải tạo đường (B). Tuyến tàu Harbor Line đã có sẵn, chỉ tăng chuyến, nên (C) sai.',
            translationVi: 'Bản tin chủ yếu nói về điều gì?',
            skillTags: ['comprehension.main-idea'],
          },
          {
            text: 'What are commuters advised to do?',
            options: [
              'Leave home earlier',
              'Work from home',
              'Use a rail service',
              'Take a different bridge',
            ],
            answer: 2,
            explanationVi:
              '"recommend that commuters use the Harbor Line train" → đi tàu (C, "rail service").',
            translationVi: 'Người đi làm được khuyên nên làm gì?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'What will listeners most likely hear next?',
            options: [
              'An interview with the mayor',
              'A traffic update',
              'A sports report',
              'A weather forecast',
            ],
            answer: 3,
            explanationVi:
              '"Stay tuned for the weather forecast after this short break" → tiếp theo là dự báo thời tiết (D).',
            translationVi: 'Người nghe nhiều khả năng sẽ nghe gì tiếp theo?',
            skillTags: ['comprehension.next-action'],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Business',
        transcript: [
          {
            speaker: 'N',
            accent: 'US',
            text: 'Before we finish, I want to talk about the customer survey results we received on Monday.',
          },
          {
            speaker: 'N',
            accent: 'US',
            text: 'Overall, customers are happy with our delivery times, but many said our online checkout process is confusing.',
          },
          {
            speaker: 'N',
            accent: 'US',
            text: 'In fact, about a third of the people who add items to their cart leave the site before paying.',
          },
          {
            speaker: 'N',
            accent: 'US',
            text: 'Our web team has designed a simpler, two-step checkout page, and we’d like to test it with a small group of customers next month.',
          },
          {
            speaker: 'N',
            accent: 'US',
            text: 'Now, I know everyone’s schedule is already full.',
          },
          {
            speaker: 'N',
            accent: 'US',
            text: 'But we need five volunteers from this department to review the new page before the test, so please let me know by Wednesday if you can help.',
          },
        ],
        questions: [
          {
            text: 'What problem does the speaker mention?',
            options: [
              'Deliveries are often late.',
              'Prices are higher than competitors’.',
              'Customers find paying online difficult.',
              'Products are frequently out of stock.',
            ],
            answer: 2,
            explanationVi:
              '"many said our online checkout process is confusing" → khách thấy khâu thanh toán trực tuyến khó dùng (C). Khách hài lòng về thời gian giao hàng, nên (A) ngược nghĩa.',
            translationVi: 'Người nói đề cập đến vấn đề gì?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'What is planned for next month?',
            options: [
              'A trial of a redesigned web page',
              'The hiring of web developers',
              'A second customer survey',
              'A training session on sales',
            ],
            answer: 0,
            explanationVi:
              '"we’d like to test it with a small group of customers next month" → thử nghiệm trang thanh toán mới (A, "trial" = "test").',
            translationVi: 'Điều gì được lên kế hoạch cho tháng sau?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'Why does the speaker say, "I know everyone’s schedule is already full"?',
            options: [
              'To cancel a planned meeting',
              'To explain why a deadline was missed',
              'To acknowledge that a request adds to workloads',
              'To suggest hiring temporary staff',
            ],
            answer: 2,
            explanationVi:
              'Ngay sau câu này người nói xin năm tình nguyện viên ("But we need five volunteers") → cô ấy thừa nhận lời nhờ sẽ làm mọi người bận thêm (C). Không có cuộc họp bị hủy hay hạn chót bị lỡ.',
            translationVi:
              'Tại sao người nói nói "Tôi biết lịch của mọi người đều đã kín"?',
            skillTags: ['comprehension.speaker-intent'],
          },
        ],
      },
    ],
    P5: [
      {
        difficulty: 'EASY',
        topic: 'Office',
        questions: [
          {
            text: 'Ms. Novak will ------- the new interns to the staff at Monday’s meeting.',
            options: ['introduction', 'introducing', 'introduce', 'introduced'],
            answer: 2,
            explanationVi:
              'Sau động từ khuyết thiếu "will" cần động từ nguyên mẫu → "introduce". "introduction" là danh từ; "introducing", "introduced" không đứng ngay sau "will" được.',
            translationVi:
              'Cô Novak sẽ giới thiệu các thực tập sinh mới với nhân viên trong cuộc họp thứ Hai.',
            skillTags: ['grammar.verb-form'],
          },
        ],
      },
      {
        difficulty: 'EASY',
        topic: 'Office',
        questions: [
          {
            text: 'The new printer is much ------- than the old one.',
            options: ['fast', 'faster', 'fastest', 'more fast'],
            answer: 1,
            explanationVi:
              'Có "than" → so sánh hơn; "fast" là tính từ ngắn nên thêm -er: "faster". "much" đứng trước để nhấn mạnh. "more fast" sai dạng; "fastest" là so sánh nhất.',
            translationVi: 'Máy in mới nhanh hơn máy cũ nhiều.',
            skillTags: ['grammar.comparison'],
          },
        ],
      },
      {
        difficulty: 'EASY',
        topic: 'Finance',
        questions: [
          {
            text: 'Please submit your expense reports ------- Friday at 5 P.M.',
            options: ['by', 'until', 'since', 'during'],
            answer: 0,
            explanationVi:
              '"by + thời điểm" = chậm nhất là, dùng cho hạn chót → "by". "until" dùng cho hành động kéo dài đến một thời điểm; "since" đi với thì hoàn thành; "during" đi với một khoảng thời gian.',
            translationVi:
              'Vui lòng nộp báo cáo chi phí chậm nhất vào 5 giờ chiều thứ Sáu.',
            skillTags: ['grammar.preposition'],
          },
        ],
      },
      {
        difficulty: 'EASY',
        topic: 'Office',
        questions: [
          {
            text: 'All visitors must sign in at the reception desk ------- entering the laboratory.',
            options: ['although', 'unless', 'despite', 'before'],
            answer: 3,
            explanationVi:
              '"before + V-ing" = trước khi → đăng ký ở lễ tân trước khi vào phòng thí nghiệm, hợp nghĩa. "although" (mặc dù), "unless" (trừ khi), "despite" (bất chấp) đều không hợp logic câu.',
            translationVi:
              'Tất cả khách đến thăm phải ký tên ở quầy lễ tân trước khi vào phòng thí nghiệm.',
            skillTags: ['grammar.conjunction'],
          },
        ],
      },
      {
        difficulty: 'EASY',
        topic: 'Travel',
        questions: [
          {
            text: 'Mr. Okafor asked his assistant to book ------- a flight to Singapore.',
            options: ['he', 'his', 'himself', 'him'],
            answer: 3,
            explanationVi:
              'Sau động từ "book" cần đại từ tân ngữ (book somebody something) → "him". "he" là chủ ngữ; "his" là tính từ sở hữu, phải có danh từ ngay sau; "himself" chỉ dùng khi chủ ngữ và tân ngữ là một người (ở đây chủ ngữ của "book" là trợ lý).',
            translationVi:
              'Ông Okafor nhờ trợ lý đặt cho ông một chuyến bay đến Singapore.',
            skillTags: ['grammar.pronoun'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Business',
        questions: [
          {
            text: 'The board of directors ------- the proposal to expand into South America at its last meeting.',
            options: [
              'approves',
              'will approve',
              'has been approving',
              'approved',
            ],
            answer: 3,
            explanationVi:
              '"at its last meeting" là mốc thời gian đã kết thúc trong quá khứ → thì quá khứ đơn "approved". Hiện tại đơn, tương lai và hiện tại hoàn thành tiếp diễn đều không hợp với mốc này.',
            translationVi:
              'Hội đồng quản trị đã thông qua đề xuất mở rộng sang Nam Mỹ trong cuộc họp gần nhất.',
            skillTags: ['grammar.verb-tense'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'HR',
        questions: [
          {
            text: 'Applicants who ------- more than five years of experience may skip the written test.',
            options: ['having', 'has', 'have', 'to have'],
            answer: 2,
            explanationVi:
              'Mệnh đề quan hệ "who ..." thay cho "Applicants" (số nhiều) → động từ chia số nhiều "have". "has" chia số ít; "having", "to have" không làm động từ chính của mệnh đề được.',
            translationVi:
              'Ứng viên có trên năm năm kinh nghiệm có thể bỏ qua bài thi viết.',
            skillTags: ['grammar.agreement', 'grammar.relative-clause'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Office',
        questions: [
          {
            text: 'The conference room is equipped with a projector, ------- makes it ideal for presentations.',
            options: ['what', 'who', 'which', 'where'],
            answer: 2,
            explanationVi:
              'Sau dấu phẩy, đại từ quan hệ "which" thay cho cả mệnh đề phía trước (việc phòng có máy chiếu) và làm chủ ngữ của "makes". "what" không dùng sau dấu phẩy như vậy; "who" chỉ người; "where" không làm chủ ngữ được.',
            translationVi:
              'Phòng hội nghị được trang bị máy chiếu, điều này khiến nó lý tưởng cho các buổi thuyết trình.',
            skillTags: ['grammar.relative-clause'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Dining',
        questions: [
          {
            text: 'Due to ------- demand, the bakery has extended its weekend hours.',
            options: ['increasingly', 'increases', 'increase', 'increasing'],
            answer: 3,
            explanationVi:
              'Trước danh từ "demand" cần một tính từ → "increasing" (đang tăng). "increasingly" là trạng từ; "increase", "increases" là danh từ / động từ, không bổ nghĩa cho "demand" được.',
            translationVi:
              'Do nhu cầu ngày càng tăng, tiệm bánh đã kéo dài giờ mở cửa cuối tuần.',
            skillTags: ['grammar.word-form'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Community',
        questions: [
          {
            text: 'Ms. Ruiz was ------- for her outstanding contribution to the charity fundraiser.',
            options: ['recognized', 'realized', 'reminded', 'reserved'],
            answer: 0,
            explanationVi:
              '"be recognized for" = được ghi nhận, vinh danh vì → hợp với "outstanding contribution". "realized" (nhận ra), "reminded" (được nhắc), "reserved" (được đặt trước) đều sai nghĩa.',
            translationVi:
              'Cô Ruiz được ghi nhận vì những đóng góp nổi bật cho buổi gây quỹ từ thiện.',
            skillTags: ['vocab.meaning'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Travel',
        questions: [
          {
            text: 'The hotel offers a shuttle service ------- of charge to all guests.',
            options: ['freely', 'free', 'freedom', 'freeing'],
            answer: 1,
            explanationVi:
              '"free of charge" là cụm cố định = miễn phí. "freely" (một cách tự do), "freedom" (sự tự do), "freeing" (giải phóng) không tạo thành cụm này.',
            translationVi:
              'Khách sạn cung cấp dịch vụ xe đưa đón miễn phí cho mọi khách lưu trú.',
            skillTags: ['vocab.collocation', 'grammar.word-form'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Office',
        questions: [
          {
            text: 'The new safety regulations will take ------- on July 1.',
            options: ['affect', 'effective', 'effectively', 'effect'],
            answer: 3,
            explanationVi:
              '"take effect" là cụm cố định = có hiệu lực. "affect" là động từ (ảnh hưởng), dễ nhầm vì phát âm gần giống; "effective", "effectively" là tính từ / trạng từ.',
            translationVi:
              'Các quy định an toàn mới sẽ có hiệu lực từ ngày 1/7.',
            skillTags: ['vocab.collocation'],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Retail',
        questions: [
          {
            text: '------- the shipment not been delayed, the store would have opened on schedule.',
            options: ['Had', 'Should', 'If', 'Were'],
            answer: 0,
            explanationVi:
              'Câu điều kiện loại 3 đảo ngữ: "Had + S + V3" = "If + S + had + V3". Mệnh đề chính "would have opened" xác nhận loại 3 → "Had". "If the shipment not been" thiếu "had"; "Should", "Were" dùng cho đảo ngữ loại 1 và 2, không đi với "been delayed" như thế này.',
            translationVi:
              'Nếu lô hàng không bị chậm, cửa hàng đã khai trương đúng lịch.',
            skillTags: ['grammar.conjunction', 'grammar.verb-form'],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Business',
        questions: [
          {
            text: 'The proposal was rejected not because it was too costly but because it was not ------- with the company’s long-term strategy.',
            options: ['constant', 'consistent', 'considerate', 'consecutive'],
            answer: 1,
            explanationVi:
              '"be consistent with" = phù hợp, nhất quán với → đề xuất không phù hợp với chiến lược dài hạn. "constant" (liên tục), "considerate" (chu đáo), "consecutive" (liên tiếp) có hình thức giống nhưng sai nghĩa.',
            translationVi:
              'Đề xuất bị bác bỏ không phải vì quá tốn kém mà vì nó không phù hợp với chiến lược dài hạn của công ty.',
            skillTags: ['vocab.meaning', 'vocab.collocation'],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Office',
        questions: [
          {
            text: 'Neither the manager nor the assistants ------- aware of the scheduling conflict until yesterday.',
            options: ['were', 'was', 'is being', 'has been'],
            answer: 0,
            explanationVi:
              'Với "neither A nor B", động từ chia theo chủ ngữ gần nhất là "the assistants" (số nhiều); "until yesterday" chỉ quá khứ → "were". "was", "has been" chia số ít; "is being" sai thì.',
            translationVi:
              'Cả quản lý lẫn các trợ lý đều không biết về việc trùng lịch cho đến hôm qua.',
            skillTags: ['grammar.agreement'],
          },
        ],
      },
    ],
    P6: [
      {
        difficulty: 'MEDIUM',
        topic: 'Finance',
        passage:
          'To: All employees\nFrom: Finance Department\nDate: October 2\nSubject: New expense system\n\nStarting November 1, all travel and meal expenses must be submitted through ExpensePro, our new online system. The old paper forms will no longer be [1]. ExpensePro allows you to photograph receipts with your phone and upload them [2]. [3]. Training sessions will be held in Room 410 on October 15 and 22, and each session lasts about 45 minutes. Please register for one of them through the company intranet [4] October 10.\n\nThank you for your cooperation.',
        questions: [
          {
            options: ['acceptance', 'accepted', 'accepting', 'accepts'],
            answer: 1,
            explanationVi:
              '"The old paper forms" không tự chấp nhận mà được chấp nhận → bị động "be + V3": "will no longer be accepted". "acceptance" là danh từ; "accepting" là chủ động (mẫu đơn không thể "đang chấp nhận"); "accepts" không đứng sau "be".',
            skillTags: ['grammar.verb-form'],
          },
          {
            options: ['instantly', 'previously', 'rarely', 'formerly'],
            answer: 0,
            explanationVi:
              'Chụp hóa đơn bằng điện thoại rồi tải lên "ngay lập tức" (instantly) là ưu điểm của hệ thống mới. "previously", "formerly" (trước đây) sai thì; "rarely" (hiếm khi) trái ý.',
            skillTags: ['vocab.meaning'],
          },
          {
            options: [
              'The finance office will be closed for the holidays.',
              'Paper receipts must be mailed to the head office.',
              'As a result, reimbursements will be processed much faster.',
              'Please book your flights through our travel agency.',
            ],
            answer: 2,
            explanationVi:
              'Câu trước nói về lợi ích của việc tải hóa đơn lên ngay → (C) "Nhờ vậy, việc hoàn tiền sẽ được xử lý nhanh hơn nhiều" nối tiếp hợp lý. (B) mâu thuẫn với việc bỏ giấy tờ. (A), (D) lạc đề.',
            translationVi: 'Câu nào phù hợp nhất để điền vào chỗ [3]?',
            skillTags: ['comprehension.sentence-insertion'],
          },
          {
            options: ['since', 'within', 'until', 'by'],
            answer: 3,
            explanationVi:
              'Đăng ký là hành động xảy ra một lần trước hạn chót → "by October 10" (chậm nhất ngày 10/10). "until" dùng cho hành động kéo dài; "since" đi với thì hoàn thành; "within" đi với một khoảng thời gian (within two weeks).',
            skillTags: ['grammar.preposition'],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Business',
        passage:
          'HARBOR CITY — Local furniture maker Oakline Designs has announced plans to open a second factory in Westbrook next spring. The company, [1] began as a two-person workshop in 2011, now sells its handmade tables and chairs in more than 40 stores across the region. "Demand has grown [2] over the past three years, and our current factory simply can’t keep up," said founder Teresa Lowe.\n\nThe new factory is expected to create about 120 jobs. [3]. Lowe added that Oakline will continue to use wood only from certified sustainable forests, a commitment that has helped the brand stand out in a [4] market.',
        questions: [
          {
            options: ['it', 'what', 'which', 'where'],
            answer: 2,
            explanationVi:
              'Mệnh đề quan hệ không xác định giữa hai dấu phẩy, bổ nghĩa cho "The company" và làm chủ ngữ của "began" → "which". "it" tạo thành hai mệnh đề không có liên từ; "what" không dùng sau danh từ; "where" chỉ nơi chốn và không làm chủ ngữ.',
            skillTags: ['grammar.relative-clause'],
          },
          {
            options: ['steadily', 'steady', 'steadiness', 'steadied'],
            answer: 0,
            explanationVi:
              'Bổ nghĩa cho động từ "has grown" cần trạng từ → "steadily" (đều đặn). "steady" là tính từ, "steadiness" là danh từ, "steadied" là động từ quá khứ.',
            skillTags: ['grammar.word-form'],
          },
          {
            options: [
              'Westbrook is known for its annual music festival.',
              'Hiring will begin in January, with priority given to local residents.',
              'The company’s first factory closed last year.',
              'Customers can now order fabric samples online.',
            ],
            answer: 1,
            explanationVi:
              'Câu trước nói nhà máy mới tạo khoảng 120 việc làm → (B) "Việc tuyển dụng sẽ bắt đầu vào tháng Một, ưu tiên người dân địa phương" nối tiếp tự nhiên. (C) mâu thuẫn vì bài nói nhà máy hiện tại vẫn hoạt động ("our current factory"). (A), (D) lạc đề.',
            translationVi: 'Câu nào phù hợp nhất để điền vào chỗ [3]?',
            skillTags: ['comprehension.sentence-insertion'],
          },
          {
            options: ['competition', 'compete', 'competitively', 'competitive'],
            answer: 3,
            explanationVi:
              'Giữa mạo từ "a" và danh từ "market" cần tính từ → "competitive market" (thị trường cạnh tranh). "competition" là danh từ, "compete" là động từ, "competitively" là trạng từ.',
            skillTags: ['grammar.word-form', 'vocab.collocation'],
          },
        ],
      },
    ],
    P7: [
      {
        difficulty: 'EASY',
        topic: 'Office',
        passage:
          'Ana Lima [9:12 A.M.]\nHi Joe, I’m stuck on the highway. There was an accident near exit 14, and nothing is moving.\n\nJoe Park [9:13 A.M.]\nNo problem. The client from Vertex Foods isn’t arriving until 10:00.\n\nAna Lima [9:15 A.M.]\nGood. Could you set up the projector in Room B? My slides are on the shared drive.\n\nJoe Park [9:16 A.M.]\nSure thing. I’ll also order some coffee and pastries for the meeting.\n\nAna Lima [9:17 A.M.]\nThat would be great. I should be there by 9:45.',
        questions: [
          {
            text: 'Why is Ms. Lima late?',
            options: [
              'Her car broke down.',
              'She missed her train.',
              'Traffic is not moving.',
              'She had another meeting.',
            ],
            answer: 2,
            explanationVi:
              '"I’m stuck on the highway… nothing is moving" → kẹt xe (C). Tai nạn là của người khác, không phải xe cô ấy bị hỏng, nên (A) sai.',
            translationVi: 'Tại sao cô Lima đến muộn?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'At 9:16 A.M., what does Mr. Park most likely mean when he writes, "Sure thing"?',
            options: [
              'He will prepare some equipment for the meeting.',
              'He knows when the client will arrive.',
              'He has finished the slides.',
              'He will call the client.',
            ],
            answer: 0,
            explanationVi:
              '"Sure thing" đáp lại lời nhờ "Could you set up the projector in Room B?" → anh đồng ý chuẩn bị máy chiếu (A). Các slide là của cô Lima, nên (C) sai.',
            translationVi:
              'Lúc 9:16 sáng, anh Park nhiều khả năng có ý gì khi viết "Sure thing"?',
            skillTags: ['comprehension.speaker-intent'],
          },
        ],
      },
      {
        difficulty: 'EASY',
        topic: 'Community',
        passage:
          'GREENFIELD PUBLIC LIBRARY\nNew Hours Beginning September 1\n\nMonday – Thursday: 9:00 A.M. – 8:00 P.M.\nFriday – Saturday: 10:00 A.M. – 6:00 P.M.\nSunday: Closed\n\nWe are extending our weekday evening hours so that more working adults and students can use our study rooms and computers. To reserve a study room, visit the front desk or book online at greenfieldlibrary.org. Reservations are limited to two hours per day.\n\nPlease note that the library will be closed on Monday, September 2, for a staff training day.',
        questions: [
          {
            text: 'Why is the library changing its hours?',
            options: [
              'To reduce its electricity costs',
              'To make it easier to visit after work or school',
              'To prepare for a renovation',
              'To give staff more training time',
            ],
            answer: 1,
            explanationVi:
              '"extending our weekday evening hours so that more working adults and students can use…" → để người đi làm, đi học dễ đến thư viện hơn (B). Ngày đào tạo nhân viên chỉ là một ngày đóng cửa, không phải lý do đổi giờ, nên (D) sai.',
            translationVi: 'Tại sao thư viện thay đổi giờ mở cửa?',
            skillTags: ['comprehension.main-idea'],
          },
          {
            text: 'What is the limit on study room reservations?',
            options: [
              'One room per family',
              'Four visits per week',
              'Two hours each day',
              'Online bookings only',
            ],
            answer: 2,
            explanationVi:
              '"Reservations are limited to two hours per day" → tối đa hai giờ mỗi ngày (C). Có thể đặt tại quầy hoặc trực tuyến, nên (D) sai.',
            translationVi: 'Việc đặt phòng học bị giới hạn như thế nào?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'What is indicated about September 2?',
            options: [
              'New computers will be installed.',
              'A class for the public will be held.',
              'The new hours will begin.',
              'The library will not open.',
            ],
            answer: 3,
            explanationVi:
              '"the library will be closed on Monday, September 2" → thư viện không mở cửa (D). Giờ mới bắt đầu từ 1/9, nên (C) sai; buổi đào tạo dành cho nhân viên chứ không cho công chúng, nên (B) sai.',
            translationVi: 'Thông báo cho biết điều gì về ngày 2/9?',
            skillTags: ['comprehension.detail'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Business',
        passage:
          'From: Grace Mensah <g.mensah@solvio.com>\nTo: Order Support <support@printcrest.com>\nDate: April 14\nSubject: Order #58213\n\nHello,\n\nOn April 8, I ordered 500 business cards for our new sales director, Mr. Hugo Brandt. The cards arrived this morning, but his job title is printed as "Sales Manager" instead of "Sales Director." I have checked the proof I approved, and the title was correct there, so I believe the error happened during printing.\n\nMr. Brandt is attending a trade show on April 22 and needs the cards before then. Could you reprint the order and send it by express delivery? Please also let me know whether we should return the incorrect cards.\n\nBest regards,\nGrace Mensah\nOffice Manager, Solvio Inc.',
        questions: [
          {
            text: 'Why did Ms. Mensah write the email?',
            options: [
              'To report a printing error',
              'To place a new order',
              'To complain about a late delivery',
              'To request a price estimate',
            ],
            answer: 0,
            explanationVi:
              'Chức danh trên danh thiếp bị in sai ("Sales Manager" thay vì "Sales Director") → báo lỗi in ấn (A). Hàng đến đúng hạn, không phàn nàn về giao hàng, nên (C) sai.',
            translationVi: 'Tại sao cô Mensah viết email này?',
            skillTags: ['comprehension.main-idea'],
          },
          {
            text: 'What does Ms. Mensah say about the proof?',
            options: [
              'It showed the correct job title.',
              'It was never sent to her.',
              'It was approved by Mr. Brandt.',
              'It contained a spelling error.',
            ],
            answer: 0,
            explanationVi:
              '"I have checked the proof I approved, and the title was correct there" → bản in thử có chức danh đúng (A). Chính cô Mensah duyệt bản in thử, không phải ông Brandt, nên (C) sai.',
            translationVi: 'Cô Mensah nói gì về bản in thử?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'What is suggested about Mr. Brandt?',
            options: [
              'He ordered the cards himself.',
              'He will meet business contacts at an event.',
              'He works for a printing company.',
              'He was recently promoted to manager.',
            ],
            answer: 1,
            explanationVi:
              'Ông Brandt dự triển lãm thương mại ngày 22/4 và cần danh thiếp trước đó → có thể suy ra ông sẽ gặp gỡ đối tác ở sự kiện (B). Ông là giám đốc kinh doanh mới; "Manager" là chức danh bị in sai nên (D) là bẫy.',
            translationVi: 'Có thể suy ra điều gì về ông Brandt?',
            skillTags: ['comprehension.inference'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Health',
        passage:
          'SUNRISE FITNESS CENTER – Spring Membership Offer\n\nSign up between March 1 and March 31 and pay no joining fee (normally $50)!\n\nEvery membership includes:\n• Unlimited access to the gym and swimming pool\n• Two free sessions with a personal trainer\n• A 10% discount at our juice bar\n\nGroup classes such as yoga, spinning, and boxing are available for an additional $20 per month. Members who refer a friend receive one month free.\n\nVisit us at 88 Cedar Lane or call 555-0192. Open 5:30 A.M. to 11:00 P.M. daily.',
        questions: [
          {
            text: 'What is being offered in March?',
            options: [
              'Free group classes',
              'A waived registration fee',
              'A discounted swimming course',
              'A free month for all members',
            ],
            answer: 1,
            explanationVi:
              '"pay no joining fee (normally $50)" → được miễn phí gia nhập (B, "waived" = được miễn). Lớp nhóm phải trả thêm 20 đô, nên (A) sai; tháng miễn phí chỉ dành cho người giới thiệu bạn, nên (D) sai.',
            translationVi: 'Ưu đãi nào được đưa ra trong tháng Ba?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'What is NOT included in every membership?',
            options: [
              'Use of the pool',
              'Sessions with a trainer',
              'Group exercise classes',
              'A discount on drinks',
            ],
            answer: 2,
            explanationVi:
              'Danh sách quyền lợi gồm hồ bơi, hai buổi với huấn luyện viên và giảm giá quầy nước ép; còn lớp nhóm phải trả thêm "$20 per month" → không bao gồm (C).',
            translationVi: 'Điều gì KHÔNG có trong mọi gói hội viên?',
            skillTags: ['comprehension.not-true'],
          },
          {
            text: 'According to the advertisement, how can members get a free month?',
            options: [
              'By paying for a full year in advance',
              'By attending five group classes',
              'By signing up before March 1',
              'By recommending the center to a friend',
            ],
            answer: 3,
            explanationVi:
              '"Members who refer a friend receive one month free" → giới thiệu trung tâm cho bạn bè (D, "recommend" thay cho "refer").',
            translationVi:
              'Theo quảng cáo, hội viên làm thế nào để được miễn phí một tháng?',
            skillTags: ['comprehension.detail'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Transportation',
        passage:
          'RIVERTON — Commuters in Riverton will soon have a new way to get around downtown. Starting May 15, the city will launch CityCycle, a bike-sharing program with 300 bicycles at 25 stations.\n\nUsers can rent a bike through a mobile app for $2 per half hour, or buy a monthly pass for $25 that includes unlimited rides of up to 45 minutes each. Stations will be located near bus stops, the central train station, and major office buildings.\n\n"We want to reduce traffic and give people a healthy, affordable option for short trips," said transportation director Owen Fischer. The program is funded partly by a grant from the regional government and partly by local sponsors, including Riverton Bank.\n\nIf the program proves popular, the city plans to add 15 more stations in residential neighborhoods next year.',
        questions: [
          {
            text: 'What is the article mainly about?',
            options: [
              'A bicycle-sharing program',
              'A new bus route',
              'The opening of a train station',
              'A bank’s expansion',
            ],
            answer: 0,
            explanationVi:
              'Bài báo giới thiệu chương trình xe đạp công cộng CityCycle → (A). Bến xe buýt, ga tàu và ngân hàng chỉ là chi tiết phụ.',
            translationVi: 'Bài báo chủ yếu nói về điều gì?',
            skillTags: ['comprehension.main-idea'],
          },
          {
            text: 'What is true about the monthly pass?',
            options: [
              'It costs $2 per ride.',
              'It covers rides of up to 45 minutes each.',
              'It is available only to bank customers.',
              'It must be bought at a station.',
            ],
            answer: 1,
            explanationVi:
              '"a monthly pass for $25 that includes unlimited rides of up to 45 minutes each" → mỗi chuyến tối đa 45 phút (B). "$2 per half hour" là giá thuê lẻ, nên (A) sai.',
            translationVi: 'Điều gì đúng về vé tháng?',
            skillTags: ['comprehension.detail'],
          },
          {
            text: 'The word "proves" in paragraph 4 is closest in meaning to',
            options: ['argues', 'tests', 'turns out', 'demonstrates'],
            answer: 2,
            explanationVi:
              '"If the program proves popular" = nếu chương trình hóa ra được ưa chuộng → "turns out" (C). "demonstrates" (chứng minh) là nghĩa khác của "prove", cần tân ngữ, không hợp với "proves popular".',
            translationVi: 'Từ "proves" ở đoạn 4 gần nghĩa nhất với từ nào?',
            skillTags: ['comprehension.vocab-in-context'],
          },
          {
            text: 'What is NOT mentioned as a source of funding for the program?',
            options: [
              'The regional government',
              'Local sponsors',
              'Riverton Bank',
              'Advertising on the bicycles',
            ],
            answer: 3,
            explanationVi:
              'Bài báo nêu nguồn tài trợ từ chính quyền vùng và nhà tài trợ địa phương, trong đó có Riverton Bank; không nhắc đến quảng cáo trên xe đạp → (D).',
            translationVi:
              'Điều gì KHÔNG được nhắc đến như một nguồn tài trợ cho chương trình?',
            skillTags: ['comprehension.not-true'],
          },
        ],
      },
      {
        difficulty: 'MEDIUM',
        topic: 'Travel',
        passage:
          'Customer Reviews – Bellmont Hotel, Lisbon\n\n★★★★☆ Posted by Carla V., August 3\n\nI stayed at the Bellmont for four nights while attending an industry conference. The location is excellent, just a ten-minute walk from the convention center, and the staff at the front desk were friendly and helpful. My room was clean and quiet, although the Wi-Fi was slow in the evenings. The breakfast buffet had plenty of choices, but it closes at 9:30, which is too early for guests who are out at late events. Overall, I would stay here again.',
        questions: [
          {
            text: 'Why did Carla V. stay at the hotel?',
            options: [
              'For professional reasons',
              'To visit relatives',
              'To go on vacation',
              'To attend a cooking class',
            ],
            answer: 0,
            explanationVi:
              '"while attending an industry conference" → đi vì công việc (A).',
            translationVi: 'Tại sao Carla V. ở khách sạn này?',
            skillTags: ['comprehension.inference'],
          },
          {
            text: 'What does the reviewer complain about?',
            options: [
              'The noise in her room',
              'The time breakfast ends',
              'The distance to the convention center',
              'The attitude of the staff',
            ],
            answer: 1,
            explanationVi:
              '"it closes at 9:30, which is too early" → bữa sáng kết thúc quá sớm (B). Phòng yên tĩnh, vị trí gần, nhân viên thân thiện, nên (A), (C), (D) ngược với bài đánh giá.',
            translationVi: 'Người viết đánh giá phàn nàn về điều gì?',
            skillTags: ['comprehension.detail'],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Logistics',
        passage:
          'MEMO\nTo: All Northgate Logistics staff\nFrom: Priya Raman, Operations Director\nDate: January 20\nRe: Warehouse management system\n\nAs many of you know, our current warehouse software is more than ten years old and frequently fails during busy periods. — [1] — After reviewing proposals from three vendors, we have selected StockSense to replace it.\n\nThe switch will take place in two stages. The Eastfield warehouse will move to the new system on February 10, and the Lakeview warehouse will follow on March 3, once any problems found at Eastfield have been resolved. — [2] —\n\nStaff at both sites will receive hands-on training a week before their warehouse changes systems. — [3] — Supervisors should make sure that shift schedules allow every team member to attend. — [4] —',
        questions: [
          {
            text: 'What is the purpose of the memo?',
            options: [
              'To introduce a new warehouse location',
              'To explain the schedule for adopting new software',
              'To ask staff to recommend software vendors',
              'To report problems with recent deliveries',
            ],
            answer: 1,
            explanationVi:
              'Bản ghi nhớ thông báo đã chọn StockSense và nêu hai giai đoạn chuyển đổi cùng lịch đào tạo → giải thích kế hoạch áp dụng phần mềm mới (B). Nhà cung cấp đã được chọn xong nên (C) sai.',
            translationVi: 'Mục đích của bản ghi nhớ là gì?',
            skillTags: ['comprehension.main-idea'],
          },
          {
            text: 'What is suggested about the Lakeview warehouse?',
            options: [
              'It is larger than the Eastfield warehouse.',
              'It already uses StockSense.',
              'Its changeover depends on how the first stage goes.',
              'Its staff will be trained at Eastfield.',
            ],
            answer: 2,
            explanationVi:
              'Lakeview chuyển đổi "once any problems found at Eastfield have been resolved" → việc chuyển đổi phụ thuộc vào kết quả giai đoạn đầu (C). Bài không so sánh quy mô và không nói đào tạo ở đâu.',
            translationVi: 'Có thể suy ra điều gì về kho Lakeview?',
            skillTags: ['comprehension.inference'],
          },
          {
            text: 'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"Last November, for example, a system outage delayed more than 200 shipments."',
            options: ['[1]', '[2]', '[3]', '[4]'],
            answer: 0,
            explanationVi:
              'Câu chèn là ví dụ ("for example") cho ý phần mềm cũ "frequently fails during busy periods" → đặt ở [1], ngay sau ý đó. Các vị trí khác nói về lịch chuyển đổi và đào tạo, không cần ví dụ về sự cố.',
            translationVi:
              'Câu sau phù hợp nhất ở vị trí nào trong [1], [2], [3], [4]? "Chẳng hạn, tháng Mười Một năm ngoái, một sự cố hệ thống đã làm chậm hơn 200 lô hàng."',
            skillTags: ['comprehension.sentence-insertion'],
          },
        ],
      },
      {
        difficulty: 'HARD',
        topic: 'Training',
        passage:
          'Westwood Business Center – Professional Workshops (June)\n\nJune 6 | Writing Effective Proposals | Dana Cole | Room 2 | $60\nJune 13 | Negotiation Basics | Martin Hale | Room 5 | $75\nJune 20 | Social Media for Small Businesses | Ines Duarte | Room 2 | $60\nJune 27 | Managing Remote Teams | Martin Hale | Room 3 | $75\n\nAll workshops run from 6:00 to 8:30 P.M. Members of the Westwood Business Association receive a 20% discount. Registration closes three days before each workshop.\n---\nFrom: Leo Hartmann\nTo: Westwood Business Center\nDate: June 8\nSubject: Workshop registration\n\nHello,\n\nI run a small bakery with two shops, and I would like to attract more customers online, so the workshop on June 20 is exactly what I need. As a member of the Westwood Business Association, I understand I am eligible for a discount. Could you confirm the price?\n\nI was also interested in the workshop taught by Mr. Hale on June 13, but I already have a commitment that evening. Will he be teaching it again later this year?\n\nThank you,\nLeo Hartmann',
        questions: [
          {
            text: 'What is the purpose of the email?',
            options: [
              'To cancel a registration',
              'To complain about a workshop',
              'To inquire about attending a workshop',
              'To offer to teach a workshop',
            ],
            answer: 2,
            explanationVi:
              'Ông Hartmann muốn dự buổi ngày 20/6, hỏi giá sau giảm và hỏi buổi của ông Hale có mở lại không → hỏi thông tin để tham dự hội thảo (C).',
            translationVi: 'Mục đích của email là gì?',
            skillTags: ['comprehension.main-idea'],
          },
          {
            text: 'Who will lead the workshop that Mr. Hartmann wants to attend?',
            options: [
              'Dana Cole',
              'Martin Hale',
              'A bakery owner',
              'Ines Duarte',
            ],
            answer: 3,
            explanationVi:
              'Email nói muốn dự buổi ngày 20/6; theo lịch, buổi 20/6 "Social Media for Small Businesses" do Ines Duarte phụ trách → (D). Martin Hale dạy buổi 13/6 mà ông không đi được.',
            translationVi:
              'Ai sẽ phụ trách buổi hội thảo mà ông Hartmann muốn tham dự?',
            skillTags: ['comprehension.cross-reference'],
          },
          {
            text: 'How much will Mr. Hartmann most likely pay for the workshop?',
            options: ['$12', '$48', '$60', '$75'],
            answer: 1,
            explanationVi:
              'Buổi 20/6 giá $60; hội viên Westwood Business Association được giảm 20% → 60 × 0,8 = $48 (B). $12 là số tiền được giảm, không phải số tiền phải trả.',
            translationVi:
              'Ông Hartmann nhiều khả năng sẽ trả bao nhiêu cho buổi hội thảo?',
            skillTags: ['comprehension.cross-reference'],
          },
          {
            text: 'Why will Mr. Hartmann not attend Negotiation Basics?',
            options: [
              'It is fully booked.',
              'Its registration period has ended.',
              'It is too expensive for him.',
              'He is busy on that evening.',
            ],
            answer: 3,
            explanationVi:
              'Negotiation Basics là buổi 13/6 của ông Hale; email viết "I already have a commitment that evening" → ông bận tối hôm đó (D). Email gửi ngày 8/6, trước hạn chót 10/6, nên (B) sai.',
            translationVi:
              'Tại sao ông Hartmann sẽ không tham dự buổi Negotiation Basics?',
            skillTags: [
              'comprehension.cross-reference',
              'comprehension.detail',
            ],
          },
          {
            text: 'In the email, the word "commitment" in paragraph 2 is closest in meaning to',
            options: ['dedication', 'loyalty', 'engagement', 'payment'],
            answer: 2,
            explanationVi:
              '"a commitment that evening" = một việc đã hẹn vào tối đó → "engagement" (cuộc hẹn, việc đã sắp xếp) (C). "dedication", "loyalty" là nghĩa "sự tận tâm, trung thành" của "commitment", không hợp ngữ cảnh.',
            translationVi:
              'Trong email, từ "commitment" ở đoạn 2 gần nghĩa nhất với từ nào?',
            skillTags: ['comprehension.vocab-in-context'],
          },
        ],
      },
    ],
  },
}
