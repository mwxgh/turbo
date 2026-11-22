import type { LessonSpec } from './types'

export const LISTENING_LESSONS: LessonSpec[] = [
  {
    id: 'p1-photos',
    module: 'listening',
    title: 'Mô tả tranh: người, vật và dạng động từ',
    summary:
      'Nhìn tranh trước khi nghe, nhận ra tranh tả người hay tả vật, rồi dựa vào dạng động từ để loại câu sai',
    minutes: 15,
    parts: ['P1'],
    sections: [
      {
        heading: 'Hai nhóm tranh và cách chuẩn bị',
        paragraphs: [
          'Part 1 có 6 tranh, mỗi tranh bốn câu mô tả chỉ được đọc lên, không in ra. Tranh chia thành hai nhóm: tranh có người (một người hoặc nhiều người) và tranh chỉ có vật hoặc cảnh.',
          'Trong vài giây trước khi nghe, hãy tự gọi tên bằng tiếng Anh những gì thấy: ai, đang làm gì, cầm hoặc dùng vật gì, vật đặt ở đâu. Khi nghe, câu nào khớp với danh sách đó thì giữ lại.',
        ],
        bullets: [
          'Tranh một người: tập trung vào hành động và thứ người đó đang cầm, nhìn, mặc',
          'Tranh nhiều người: chú ý điểm chung (They are sitting around a table) và hành động riêng của từng người',
          'Tranh vật hoặc cảnh: tập trung vào vị trí (next to, on top of, along, against) và trạng thái (stacked, lined up, hanging, empty)',
        ],
      },
      {
        heading: 'Ba dạng động từ cần phân biệt',
        paragraphs: [
          'Phần lớn câu Part 1 dùng một trong ba dạng dưới đây. Mỗi dạng chỉ đúng với một loại tranh, nên nghe được dạng động từ là đã loại được nhiều câu.',
        ],
        bullets: [
          'is / are + V-ing (chủ động): người trong tranh đang làm việc đó ngay lúc chụp',
          'is / are being + V3 (bị động tiếp diễn): vật đang được ai đó tác động, nên trong tranh phải có người đang làm',
          'has / have been + V3 hoặc is / are + V3: trạng thái, kết quả đã xong, không cần có người trong tranh',
          'Ngoại lệ hay gặp: "is being displayed" (đang được trưng bày) tả trạng thái, có thể đúng với tranh không có người',
        ],
        examples: [
          {
            en: 'Some boxes are being loaded onto a truck.',
            vi: 'Một số thùng hàng đang được chất lên xe tải.',
            note: 'Chỉ đúng khi trong tranh có người đang chất hàng; nếu tranh chỉ có thùng nằm trên xe thì sai',
          },
          {
            en: 'Some chairs have been stacked against the wall.',
            vi: 'Một số ghế đã được xếp chồng sát tường.',
            note: 'Dạng has been + V3 tả kết quả, đúng với tranh phòng trống không có người',
          },
          {
            en: 'A woman is putting on a jacket. / A woman is wearing a jacket.',
            vi: 'Một người phụ nữ đang mặc áo khoác vào. / Một người phụ nữ đang mặc áo khoác.',
            note: 'putting on là hành động mặc vào, wearing là trạng thái đang mặc. Tranh người đã mặc sẵn áo thì chỉ câu thứ hai đúng',
          },
        ],
      },
      {
        heading: 'Bẫy ở mức 800+',
        paragraphs: [
          'Ở mức 650, người học thường mất điểm vì không nghe kịp từ. Ở mức 800+, lỗi chủ yếu là chọn câu nghe "có vẻ đúng" vì nhắc đúng vật trong tranh nhưng sai hành động hoặc sai vị trí.',
        ],
        bullets: [
          'Đúng vật, sai hành động: tranh người đàn ông đang đọc tài liệu cạnh kệ, câu nghe được là "reaching for a file on a shelf"',
          'Âm gần giống: walk / work, copy / coffee, file / pile, sheet / seat, lamp / ramp',
          'Nhắc vật không có trong tranh: câu nghe hợp lý nhưng có một danh từ không xuất hiện',
          'Suy đoán quá mức: "They are waiting for a bus" khi tranh chỉ cho thấy người đứng ở lề đường, không thấy biển xe buýt',
          'Đáp án đúng hay dùng từ chung thay cho từ cụ thể: vehicles (xe), equipment (máy móc), merchandise (hàng hóa), furniture (đồ đạc), documents (giấy tờ)',
        ],
        examples: [
          {
            en: 'Some vehicles are parked along the street.',
            vi: 'Một số xe đang đỗ dọc con phố.',
            note: 'Tranh có ô tô và xe máy; câu dùng từ chung "vehicles" nên vẫn đúng, đừng loại chỉ vì không nghe thấy "cars"',
          },
          {
            en: 'A man is working at a counter. / A man is walking to a counter.',
            vi: 'Một người đàn ông đang làm việc ở quầy. / Một người đàn ông đang đi về phía quầy.',
            note: 'working và walking nghe gần giống; nhìn tranh xem người đó đứng yên hay đang di chuyển',
          },
        ],
      },
    ],
    keyPoints: [
      'Nhìn tranh trước khi nghe và tự gọi tên người, hành động, vật, vị trí',
      'is being + V3 cần có người đang làm việc đó trong tranh',
      'Đúng vật mà sai hành động hoặc sai vị trí vẫn là câu sai',
      'Đáp án đúng hay dùng từ chung như vehicles, equipment, merchandise',
    ],
  },
  {
    id: 'p2-wh-questions',
    module: 'listening',
    title: 'Câu hỏi Wh-: nghe chắc từ đầu tiên',
    summary:
      'Từ để hỏi ở đầu câu quyết định kiểu câu trả lời; nghe chắc từ đó là loại được ngay các đáp án lạc đề',
    minutes: 18,
    parts: ['P2'],
    sections: [
      {
        heading: 'Từ đầu tiên quyết định đáp án',
        paragraphs: [
          'Part 2 có 25 câu, mỗi câu một câu hỏi và ba câu trả lời, tất cả chỉ được đọc lên. Câu hỏi Wh- là nhóm gặp nhiều trong phần này, và cũng là nhóm dễ lấy điểm nhất nếu nghe được từ để hỏi.',
          'Hãy giữ trong đầu hai thứ: từ để hỏi và ý chính đi sau nó, ví dụ "When ... report" hoặc "Who ... order supplies". Nếu bỏ lỡ từ đầu tiên, rất khó đoán lại từ ba câu trả lời.',
        ],
      },
      {
        heading: 'Mỗi từ để hỏi cần một kiểu trả lời',
        paragraphs: [
          'Khi nghe ba câu trả lời, hỏi lại chính mình: câu này có trả lời đúng loại thông tin mà từ để hỏi yêu cầu không.',
        ],
        bullets: [
          'Who → người, chức danh, phòng ban: "Ms. Park from accounting", "The design team"',
          'When → mốc thời gian: "By Friday", "Not until next month", "Right after lunch"',
          'Where → địa điểm, hoặc người / nguồn có thứ đó: "In the top drawer", "Ask the receptionist"',
          'Why → lý do, có thể không có "because": "The client asked for changes"',
          'How → cách thức; How long / How often / How many / How much → thời lượng, tần suất, số lượng, giá',
          'What / Which → nghe tiếp danh từ đi sau: What time = When, Which room = Where, What kind = loại',
          'Câu trả lời bắt đầu bằng Yes hoặc No gần như luôn sai với câu hỏi Wh-',
        ],
        examples: [
          {
            en: 'When is the new printer being delivered? (A) To the third floor. (B) Sometime tomorrow morning. (C) Yes, it prints in color.',
            vi: 'Khi nào máy in mới được giao? (A) Lên tầng ba. (B) Khoảng sáng mai. (C) Vâng, nó in màu.',
            note: '(A) trả lời Where, (C) bắt đầu bằng Yes và lặp từ "print" → (B)',
          },
          {
            en: "Why was the meeting moved to Thursday? (A) The director is out of town until then. (B) Let's move these boxes first. (C) At two o'clock.",
            vi: 'Vì sao cuộc họp dời sang thứ Năm? (A) Giám đốc đi công tác đến hôm đó. (B) Mình chuyển mấy thùng này trước đã. (C) Lúc hai giờ.',
            note: 'Đáp án đúng nêu lý do mà không có "because"; (B) lặp âm "move", (C) trả lời When → (A)',
          },
        ],
      },
      {
        heading: 'Bẫy âm giống và từ lặp lại',
        paragraphs: [
          'Câu trả lời lặp lại một từ trong câu hỏi, hoặc có từ nghe gần giống, thường là câu sai. Người ra đề dùng nó để giữ chân người chỉ nghe được vài từ quen.',
          'Bẫy liên tưởng cũng hay gặp: câu hỏi nói về chuyến bay, câu trả lời nhắc "airport" hoặc "ticket" nhưng không trả lời điều được hỏi.',
        ],
        bullets: [
          'Âm gần giống: contract / contact, lunch / launch, review / view, apartment / department, retire / tired, fare / fair',
          'Một từ hai nghĩa: charge (phí / phụ trách), book (sách / đặt chỗ), check (kiểm tra / tấm séc), present (món quà / trình bày)',
        ],
        examples: [
          {
            en: "Who's in charge of the training session? (A) Ms. Okafor from human resources. (B) There's a charge of twenty dollars. (C) In the main conference room.",
            vi: 'Ai phụ trách buổi đào tạo? (A) Chị Okafor bên nhân sự. (B) Có khoản phí hai mươi đô. (C) Ở phòng họp chính.',
            note: '(B) lặp "charge" với nghĩa khác, (C) trả lời Where → (A)',
          },
        ],
      },
      {
        heading: 'Bẫy ở mức 800+',
        paragraphs: [
          'Ở đề khó, câu đúng thường không chứa thông tin được hỏi mà trả lời gián tiếp (bài sau nói kỹ). Ngoài ra, một số câu mở đầu bằng từ Wh- nhưng thực chất là lời gợi ý.',
        ],
        bullets: [
          '"Why don\'t we / you ...?" và "How about ...?" là gợi ý; câu trả lời đúng là đồng ý hoặc từ chối, không phải lý do',
          '"When\'s" và "Where\'s" nói nhanh rất dễ nhầm; nghe kỹ âm cuối và nhìn lại ý chính của câu',
          'Câu hỏi Where có thể được trả lời bằng một người: "Jason has the key" vẫn là câu trả lời hợp lý',
        ],
        examples: [
          {
            en: "Why don't we order lunch for the team? (A) Because it was too expensive. (B) That's a good idea. (C) He ordered it last week.",
            vi: 'Hay mình gọi đồ ăn trưa cho cả nhóm nhé? (A) Vì nó quá đắt. (B) Ý hay đấy. (C) Anh ấy đã đặt tuần trước.',
            note: 'Đây là lời gợi ý, không hỏi lý do; (A) bị bẫy bởi chữ Why, (C) lặp "order" → (B)',
          },
          {
            en: 'Where can I find the latest budget report? (A) Daniel was the last one using it. (B) About ten pages long. (C) Yes, I found it useful.',
            vi: 'Tôi có thể tìm bản báo cáo ngân sách mới nhất ở đâu? (A) Daniel là người dùng nó gần nhất. (B) Khoảng mười trang. (C) Vâng, tôi thấy nó hữu ích.',
            note: 'Không nêu địa điểm nhưng chỉ ra người đang giữ báo cáo → (A)',
          },
        ],
      },
    ],
    keyPoints: [
      'Giữ trong đầu từ để hỏi và ý chính đi sau nó',
      'Câu trả lời bắt đầu bằng Yes / No gần như luôn sai với câu hỏi Wh-',
      'Câu lặp từ hoặc có âm giống câu hỏi thường là bẫy',
      "Why don't we / How about là lời gợi ý, không hỏi lý do hay cách thức",
    ],
    practice: { part: 'P2', skillTag: 'listening.wh-question' },
  },
  {
    id: 'p2-yes-no',
    module: 'listening',
    title: 'Câu hỏi Yes/No, câu hỏi đuôi và câu hỏi lựa chọn',
    summary:
      'Nhận ra loại câu hỏi không có từ Wh-, biết câu trả lời tự nhiên trông thế nào và vì sao Yes / No thường không phải mấu chốt',
    minutes: 18,
    parts: ['P2'],
    sections: [
      {
        heading: 'Câu hỏi Yes/No: nghe động từ và ý chính',
        paragraphs: [
          'Câu hỏi bắt đầu bằng Do, Is, Have, Can, Will, Did... Câu trả lời có thể bắt đầu bằng Yes / No, nhưng cũng có thể bỏ hẳn Yes / No và đi thẳng vào thông tin.',
          'Khi có Yes / No, kiểm tra phần sau có khớp không: Yes đi với thông tin khẳng định, No đi với thông tin phủ định. Câu "Yes, I haven\'t started" tự mâu thuẫn nên sai.',
        ],
        examples: [
          {
            en: "Have you finished the sales report? (A) No, I'm still waiting for the figures. (B) Yes, I haven't started it. (C) A report on sales trends.",
            vi: 'Bạn làm xong báo cáo doanh số chưa? (A) Chưa, tôi vẫn đang chờ số liệu. (B) Rồi, tôi chưa bắt đầu. (C) Một báo cáo về xu hướng doanh số.',
            note: '(B) mâu thuẫn giữa Yes và nội dung, (C) lặp từ "report", "sales" → (A)',
          },
        ],
      },
      {
        heading: 'Câu hỏi phủ định và câu hỏi đuôi',
        paragraphs: [
          'Cách đơn giản nhất: bỏ phần phủ định hoặc phần đuôi đi, coi như câu hỏi thường. "Isn\'t the office closed on Monday?" và "The office is closed on Monday, isn\'t it?" đều hỏi cùng một việc: văn phòng có đóng cửa thứ Hai không.',
          'Trả lời theo sự thật: đóng cửa thì "Yes, it is", không đóng thì "No, it\'s open". Đừng cố dịch "Yes" thành "không phải" như cách trả lời câu phủ định trong tiếng Việt.',
        ],
        examples: [
          {
            en: "Isn't Ms. Lopez joining us for dinner? (A) No, she has a client meeting tonight. (B) The dinner menu looks good. (C) At the Italian place on Fifth Street.",
            vi: 'Chị Lopez không đi ăn tối với mình à? (A) Không, tối nay chị ấy gặp khách hàng. (B) Thực đơn bữa tối trông ngon đấy. (C) Ở quán Ý trên phố Fifth.',
            note: 'Coi như "Is Ms. Lopez joining us?"; (B) lặp "dinner", (C) trả lời Where → (A)',
          },
          {
            en: "You've met the new regional manager, haven't you? (A) Yes, at the conference in March. (B) The meeting room is ready. (C) He manages it well.",
            vi: 'Bạn đã gặp quản lý khu vực mới rồi phải không? (A) Rồi, ở hội nghị hồi tháng Ba. (B) Phòng họp đã sẵn sàng. (C) Anh ấy quản lý tốt.',
            note: '(B) âm gần giống met / meeting, (C) lặp gốc từ manage → (A)',
          },
        ],
      },
      {
        heading: 'Câu hỏi lựa chọn A or B',
        paragraphs: [
          'Câu hỏi có "or" gần như không bao giờ được trả lời bằng Yes / No. Câu trả lời đúng có thể chọn một bên, chọn cả hai, không chọn bên nào, hoặc đưa ra lựa chọn thứ ba.',
        ],
        bullets: [
          'Chọn một: "The train would be faster" (không nhất thiết lặp nguyên từ train)',
          'Cả hai hoặc không bên nào: "Either is fine", "Both, if possible", "Neither, actually"',
          'Lựa chọn khác hoặc né: "Could we do it next week instead?", "It doesn\'t matter to me"',
        ],
        examples: [
          {
            en: "Should we take the train or drive to the trade show? (A) Yes, that's right. (B) Parking there is hard to find. (C) A three-day show.",
            vi: 'Mình đi tàu hay lái xe đến hội chợ? (A) Vâng, đúng vậy. (B) Ở đó khó tìm chỗ đỗ xe lắm. (C) Hội chợ kéo dài ba ngày.',
            note: '(B) không nói "train" nhưng ngụ ý nên đi tàu; (A) trả lời Yes cho câu lựa chọn → (B)',
          },
        ],
      },
      {
        heading: 'Lời nhờ, lời mời và câu trần thuật',
        paragraphs: [
          "Can / Could you ...?, Would you mind ...?, Would you like ...?, Let's ... là lời nhờ, mời hoặc rủ. Câu trả lời tự nhiên là đồng ý (Sure, Of course, I'd be glad to) hoặc từ chối kèm lý do (Sorry, I'm on my way out).",
          'Part 2 còn có câu trần thuật, không phải câu hỏi: "The printer is out of paper again." Câu trả lời đúng là phản hồi hợp lý, thường là đề nghị giúp hoặc nêu cách xử lý.',
        ],
        bullets: [
          '"Would you mind ...?" hỏi "bạn có phiền không", nên "Not at all" hoặc "No problem" nghĩa là đồng ý',
          'Câu trần thuật: "I\'ll get some from the supply room" là phản hồi tự nhiên cho câu báo máy in hết giấy',
        ],
        examples: [
          {
            en: 'Would you mind reviewing my slides before the meeting? (A) Not at all, send them over. (B) It has a nice view. (C) Yes, the meeting went well.',
            vi: 'Bạn có phiền xem giúp tôi slide trước buổi họp không? (A) Không sao, gửi qua đi. (B) Ở đó cảnh đẹp. (C) Vâng, cuộc họp diễn ra tốt.',
            note: '"Not at all" là đồng ý; (B) âm giống review / view, (C) lặp "meeting" và sai thì → (A)',
          },
        ],
      },
      {
        heading: 'Bẫy ở mức 800+',
        paragraphs: [
          'Ở đề khó, Yes / No không còn là manh mối: câu đúng thường bỏ Yes / No, còn câu có Yes / No lại sai ở phần thông tin phía sau.',
        ],
        bullets: [
          'Yes / No đúng hướng nhưng nội dung sau lạc đề hoặc sai thì',
          'Câu trả lời đúng ngữ pháp nhưng lệch chủ ngữ: hỏi về "you", trả lời về "he" không rõ là ai',
          'Câu hỏi lựa chọn có đáp án lặp lại cả hai lựa chọn nhưng nói về việc khác',
        ],
      },
    ],
    keyPoints: [
      'Câu hỏi phủ định và câu hỏi đuôi: bỏ phần phủ định, trả lời theo sự thật',
      'Câu hỏi lựa chọn hầu như không trả lời bằng Yes / No',
      'Would you mind ...? → Not at all nghĩa là đồng ý',
      'Có Yes / No thì kiểm tra phần sau có khớp và đúng thì không',
    ],
    practice: { part: 'P2', skillTag: 'listening.yes-no' },
  },
  {
    id: 'p2-indirect',
    module: 'listening',
    title: 'Câu trả lời gián tiếp trong Part 2',
    summary:
      'Nhận ra câu trả lời không chứa thông tin được hỏi nhưng vẫn hợp lý, dạng quyết định điểm Part 2 ở mức 800+',
    minutes: 15,
    parts: ['P2'],
    sections: [
      {
        heading: 'Vì sao đáp án gián tiếp hay đúng',
        paragraphs: [
          'Trong hội thoại thật, người ta ít khi trả lời đúng khuôn câu hỏi: họ nói chưa biết, chỉ sang người khác, hỏi lại hoặc đưa thông tin làm câu hỏi không còn cần thiết. Part 2 ở mức khó dùng chính kiểu trả lời này.',
          'Ở những câu đó, hai đáp án còn lại thường "nghe đúng dạng" (có mốc thời gian cho câu When, có địa điểm cho câu Where) nhưng lặp từ hoặc lạc ý. Người học 650 hay chọn chúng; người học 800+ biết loại chúng và chọn câu gián tiếp.',
        ],
      },
      {
        heading: 'Các kiểu trả lời gián tiếp hay gặp',
        paragraphs: [
          'Học thuộc các mẫu dưới đây để nhận ra chúng ngay khi nghe, kể cả khi không nghe rõ hết câu hỏi.',
        ],
        bullets: [
          'Chưa biết hoặc chỉ sang người khác: "I\'m not sure", "You\'d better ask Tom", "Check with the front desk"',
          'Sẽ kiểm tra: "Let me check my schedule", "I\'ll have to look it up"',
          'Hỏi lại để làm rõ: "Which one do you mean?", "Do you need it today?"',
          'Thông tin mới làm câu hỏi không còn ý nghĩa: "It\'s been postponed", "That position has already been filled"',
          'Nêu tình huống để người hỏi tự hiểu: hỏi khi nào hàng đến, trả lời "The supplier hasn\'t called back yet"',
        ],
        examples: [
          {
            en: "What time does the workshop start on Friday? (A) It's been moved to next week. (B) A five-hour workshop. (C) Yes, it started well.",
            vi: 'Buổi hội thảo thứ Sáu bắt đầu lúc mấy giờ? (A) Nó đã dời sang tuần sau. (B) Một buổi hội thảo năm tiếng. (C) Vâng, nó bắt đầu suôn sẻ.',
            note: 'Không có giờ nào được nêu, nhưng thông tin dời lịch trả lời hợp lý; (B) lặp "workshop", (C) có Yes → (A)',
          },
          {
            en: "Who's going to lead the client presentation? (A) Hasn't that been decided yet? (B) The present was wrapped nicely. (C) To the clients in Osaka.",
            vi: 'Ai sẽ dẫn buổi thuyết trình cho khách hàng? (A) Việc đó vẫn chưa được quyết à? (B) Món quà được gói đẹp. (C) Đến khách hàng ở Osaka.',
            note: 'Trả lời bằng một câu hỏi lại; (B) âm giống presentation / present, (C) lặp "clients" → (A)',
          },
          {
            en: 'Can you send me the updated price list? (A) For retail or wholesale customers? (B) The prices went up. (C) I sent it by express mail.',
            vi: 'Bạn gửi tôi bảng giá mới được không? (A) Cho khách lẻ hay khách sỉ? (B) Giá đã tăng. (C) Tôi đã gửi chuyển phát nhanh.',
            note: 'Hỏi lại để làm rõ trước khi gửi → (A); (C) sai thì và lặp "send"',
          },
        ],
      },
      {
        heading: 'Cách xử lý khi nghe',
        paragraphs: [
          'Vì đáp án gián tiếp khó nhận ra ngay, hãy làm theo cách loại trừ: nghe từng câu, đánh dấu trong đầu "sai rõ", "có thể", rồi chọn câu còn lại.',
        ],
        bullets: [
          'Loại ngay câu lặp từ, âm giống, sai từ để hỏi, có Yes / No với câu Wh-',
          'Câu còn lại dù không trả lời thẳng, nếu nối được với câu hỏi một cách tự nhiên thì chọn',
          'Luôn nghe hết cả ba câu; đừng chọn câu đầu tiên chỉ vì nó đúng dạng',
        ],
      },
      {
        heading: 'Bẫy ở mức 800+',
        paragraphs: [
          'Không phải câu gián tiếp nào cũng đúng. Đề khó có thể đưa một câu kiểu "I\'ll check" nhưng không nối được với tình huống. Câu gián tiếp đúng vẫn phải hợp lý về thời gian và người nói.',
        ],
        examples: [
          {
            en: "Did you enjoy the concert last night? (A) I'll have to check the calendar. (B) I ended up staying late at the office. (C) In the main concert hall.",
            vi: 'Tối qua bạn có thích buổi hòa nhạc không? (A) Tôi phải xem lịch đã. (B) Rốt cuộc tôi phải ở lại văn phòng muộn. (C) Ở phòng hòa nhạc chính.',
            note: 'Buổi hòa nhạc đã diễn ra nên "xem lịch" vô nghĩa; (B) ngụ ý không đi được → (B)',
          },
        ],
      },
    ],
    keyPoints: [
      'Câu trả lời không nêu thông tin được hỏi vẫn có thể đúng',
      'Thuộc các mẫu: chưa biết, sẽ kiểm tra, hỏi lại, đã dời / đã hủy',
      'Loại trừ câu lặp từ và sai từ để hỏi trước, rồi chọn câu còn lại',
      'Câu gián tiếp đúng vẫn phải khớp với thời gian và tình huống',
    ],
    practice: { part: 'P2', skillTag: 'listening.indirect' },
  },
  {
    id: 'p3-preview',
    module: 'listening',
    title: 'Part 3: đọc trước câu hỏi và nghe theo thứ tự',
    summary:
      'Đọc ba câu hỏi trước khi nghe, đoán bối cảnh, rồi bắt thông tin theo đúng thứ tự và nhận ra cách diễn đạt lại',
    minutes: 20,
    parts: ['P3'],
    sections: [
      {
        heading: 'Đọc trước ba câu hỏi',
        paragraphs: [
          'Part 3 có 13 đoạn hội thoại, mỗi đoạn ba câu hỏi in sẵn. Nghe mà không biết cần tìm gì thì rất khó nhớ đủ chi tiết; đọc trước câu hỏi biến việc nghe thành việc tìm thông tin cụ thể.',
          'Cách làm: chọn đáp án ngay trong lúc nghe, không đợi câu hỏi được đọc lên. Thời gian còn lại dùng để đọc ba câu hỏi của đoạn tiếp theo. Nếu một câu chưa chắc, đoán nhanh và đi tiếp, đừng để mất phần đọc trước của đoạn sau.',
        ],
        bullets: [
          'Gạch chân từ để hỏi: what problem, where, why, what will ... do next',
          'Gạch chân người được hỏi: the man, the woman, the men, hay một tên riêng',
          'Đọc lướt bốn đáp án nếu kịp: chúng cho biết nội dung có thể xuất hiện',
        ],
      },
      {
        heading: 'Đoán bối cảnh trước khi nghe',
        paragraphs: [
          'Ba câu hỏi thường đủ để đoán nơi chốn và quan hệ giữa hai người nói. Đoán đúng bối cảnh giúp nghe hiểu nhanh hơn vì đã biết trước những từ có thể gặp.',
        ],
        examples: [
          {
            en: 'Where most likely are the speakers? / What problem does the woman mention? / What will the man probably do next?',
            vi: 'Người nói có lẽ đang ở đâu? / Người phụ nữ nhắc đến vấn đề gì? / Người đàn ông có lẽ sẽ làm gì tiếp theo?',
            note: 'Câu 1 nằm ở đầu hội thoại, câu 2 do người phụ nữ nói ở giữa, câu 3 thường nằm ở lượt cuối của người đàn ông',
          },
          {
            en: 'Options: (A) At a hotel (B) At a car rental agency (C) At a bank (D) At an airport',
            vi: 'Lựa chọn: (A) Khách sạn (B) Công ty cho thuê xe (C) Ngân hàng (D) Sân bay',
            note: 'Đáp án chỉ ra hội thoại có thể liên quan đến đi lại; nghe các từ như reservation, pick up, return, counter',
          },
        ],
      },
      {
        heading: 'Thông tin xuất hiện theo thứ tự và được diễn đạt lại',
        paragraphs: [
          'Câu trả lời cho ba câu hỏi gần như luôn xuất hiện theo thứ tự câu hỏi. Câu chủ đề / nơi chốn / mục đích nằm ở một hai lượt đầu, câu chi tiết ở giữa, câu việc sắp làm hoặc lời đề nghị ở cuối.',
          'Đáp án đúng hiếm khi lặp nguyên từ trong bài nghe. Nó diễn đạt lại bằng từ chung hơn hoặc từ đồng nghĩa.',
        ],
        examples: [
          {
            en: 'Script: "The copier on our floor keeps jamming." → Option: A machine is not working properly.',
            vi: 'Bài nghe: "Máy photo ở tầng mình cứ bị kẹt giấy." → Đáp án: Một chiếc máy hoạt động không bình thường.',
            note: 'copier → machine, keeps jamming → not working properly',
          },
          {
            en: 'Script: "We\'re short two people on the weekend shift." → Option: There are not enough staff.',
            vi: 'Bài nghe: "Ca cuối tuần mình thiếu hai người." → Đáp án: Không đủ nhân viên.',
            note: 'short two people → not enough staff',
          },
          {
            en: 'Script: "I\'ll give the supplier a call this afternoon." → Option: Contact a vendor.',
            vi: 'Bài nghe: "Chiều nay tôi sẽ gọi cho nhà cung cấp." → Đáp án: Liên hệ nhà cung cấp.',
            note: 'give ... a call → contact, supplier → vendor',
          },
        ],
      },
      {
        heading: 'Hội thoại ba người',
        paragraphs: [
          'Một số đoạn có ba người nói, thường là hai người cùng giới và một người khác giới. Câu dẫn sẽ báo trước "conversation with three speakers".',
          'Với dạng này, câu hỏi hay dùng tên riêng hoặc "the men", "the women". Chú ý những lúc người nói gọi tên nhau ("Thanks, Priya") để biết ai nói câu nào.',
        ],
      },
      {
        heading: 'Bẫy ở mức 800+',
        paragraphs: [
          'Đề khó đặt bẫy bằng chính những từ bạn nghe được rõ nhất.',
        ],
        bullets: [
          'Đáp án lặp nguyên từ trong bài nhưng gắn với ý khác hoặc người khác',
          'Nhầm người nói: câu hỏi về người phụ nữ, đáp án là điều người đàn ông nói',
          'Câu hỏi việc sắp làm: chọn việc đã làm xong hoặc việc người kia đề nghị nhưng bị từ chối',
          'Thông tin bị sửa giữa chừng: "Actually, let\'s make it Thursday instead" thì đáp án là thứ Năm, không phải ngày nói trước đó',
        ],
      },
    ],
    keyPoints: [
      'Đọc trước ba câu hỏi, gạch chân từ để hỏi và người được hỏi',
      'Chọn đáp án trong lúc nghe rồi chuyển ngay sang đọc đoạn sau',
      'Đáp án theo thứ tự câu hỏi và thường được diễn đạt lại',
      'Nghe kỹ các từ sửa thông tin như actually, instead, unfortunately',
    ],
    practice: { part: 'P3', skillTag: 'comprehension.detail' },
  },
  {
    id: 'p34-speaker-intent',
    module: 'listening',
    title: 'Câu hỏi ý định người nói',
    summary:
      'Hiểu vì sao người nói dùng một câu trong ngữ cảnh đó, thay vì chọn nghĩa đen của câu',
    minutes: 15,
    parts: ['P3', 'P4'],
    sections: [
      {
        heading: 'Dạng câu hỏi này trông thế nào',
        paragraphs: [
          'Câu hỏi trích nguyên một câu trong bài nghe và hỏi ý định: "What does the man mean when he says, ...?", "Why does the woman say, ...?" hoặc "What does the speaker imply when she says, ...?". Dạng này có ở cả Part 3 và Part 4.',
          'Câu trích được in sẵn, nên nó là mốc để nghe: khi sắp tới câu đó, tập trung vào một hai câu ngay trước và ngay sau nó. Nghĩa của câu trích nằm ở đó, không nằm trong chính câu trích.',
        ],
      },
      {
        heading: 'Ngữ cảnh quyết định nghĩa',
        paragraphs: [
          'Cùng một câu có thể mang những ý định khác nhau. Đáp án đúng mô tả chức năng của câu trong tình huống: từ chối, phàn nàn, đề nghị, trấn an, ngạc nhiên, nhắc nhở.',
        ],
        examples: [
          {
            en: "W: Could you look over this contract with me? M: I've got a client call at two. → (A) He is unable to help right now. (B) He wants to change a meeting time.",
            vi: 'Nữ: Anh xem hợp đồng này với tôi được không? Nam: Hai giờ tôi có cuộc gọi với khách. → (A) Anh ấy chưa thể giúp lúc này. (B) Anh ấy muốn đổi giờ họp.',
            note: 'Câu nói nêu một sự thật nhưng chức năng là từ chối khéo → (A)',
          },
          {
            en: "M: The shipment arrived damaged again. W: That's the third time this month. → (A) She is reporting a schedule. (B) She thinks the problem is serious.",
            vi: 'Nam: Lô hàng lại bị hỏng khi tới. Nữ: Đây là lần thứ ba trong tháng rồi. → (A) Cô ấy báo lịch. (B) Cô ấy cho rằng vấn đề nghiêm trọng.',
            note: 'Câu đếm số lần dùng để phàn nàn, nhấn mạnh vấn đề lặp lại → (B)',
          },
          {
            en: "W: Should I print the handouts for tomorrow's session? M: The projector's working again. → (A) He repaired the projector. (B) Printed copies may not be needed.",
            vi: 'Nữ: Tôi có nên in tài liệu cho buổi ngày mai không? Nam: Máy chiếu chạy lại rồi. → (A) Anh ấy đã sửa máy chiếu. (B) Có lẽ không cần bản in.',
            note: 'Máy chiếu chạy được thì có thể chiếu tài liệu, nên ngụ ý không cần in; câu không nói ai sửa → (B)',
          },
        ],
      },
      {
        heading: 'Cách làm từng bước',
        paragraphs: [
          'Dạng này mất thời gian nếu chỉ nghe rồi mới nghĩ. Chuẩn bị trước giúp quyết định nhanh ngay khi câu trích vừa qua.',
        ],
        bullets: [
          'Đọc câu trích và bốn đáp án khi đọc trước câu hỏi',
          'Đoán các chức năng có thể có của câu trích: đồng ý, từ chối, lo ngại, gợi ý',
          'Nghe câu ngay trước câu trích để biết nó đang đáp lại điều gì',
          'Chọn đáp án mô tả chức năng, loại đáp án chỉ diễn lại nghĩa đen',
        ],
      },
      {
        heading: 'Bẫy ở mức 800+',
        paragraphs: [
          'Người ra đề thường đặt một đáp án lặp lại từ trong câu trích, hoặc mô tả đúng nghĩa đen. Những đáp án đó đọc thấy quen nên dễ chọn, nhưng hiếm khi là ý định thật.',
        ],
        bullets: [
          'Đáp án nghĩa đen: câu "I\'ve got a meeting at two" → đáp án "He has a meeting scheduled" đúng sự thật nhưng không phải ý định',
          'Đáp án đúng với bài nghe nhưng không phải điều câu trích muốn nói',
          'Đáp án suy diễn quá xa: thêm thông tin không có trong hội thoại',
        ],
      },
    ],
    keyPoints: [
      'Ý định nằm ở câu trước và sau câu trích, không nằm trong câu trích',
      'Chọn chức năng của câu: từ chối, phàn nàn, gợi ý, trấn an',
      'Cẩn thận với đáp án lặp từ hoặc chỉ diễn lại nghĩa đen',
    ],
    practice: { part: 'P3', skillTag: 'comprehension.speaker-intent' },
  },
  {
    id: 'p4-talks',
    module: 'listening',
    title: 'Part 4: nhận dạng loại bài nói',
    summary:
      'Biết loại bài nói từ câu dẫn để đoán mục đích, chi tiết và việc tiếp theo nằm ở đâu trong bài',
    minutes: 20,
    parts: ['P4'],
    sections: [
      {
        heading: 'Câu dẫn cho biết loại bài',
        paragraphs: [
          'Part 4 có 10 bài nói của một người, mỗi bài ba câu hỏi. Không có lượt đối đáp nên thông tin dày hơn Part 3, nhưng mỗi loại bài có cấu trúc khá cố định.',
          'Câu dẫn "Questions ... refer to the following ..." nói rõ loại bài: telephone message, announcement, advertisement, broadcast, tour, talk, introduction hoặc excerpt from a meeting. Đọc nó cùng ba câu hỏi là đã đoán được nội dung chính sẽ nằm ở đâu.',
        ],
      },
      {
        heading: 'Các loại bài hay gặp và cấu trúc',
        paragraphs: [
          'Mỗi loại bài sắp xếp mục đích, chi tiết và yêu cầu theo một trật tự quen thuộc.',
        ],
        bullets: [
          'Thông báo (announcement): đầu bài là ai đang nghe và ở đâu (Attention, shoppers), giữa là thay đổi hoặc lý do, cuối là hướng dẫn người nghe làm gì',
          "Tin nhắn thoại (telephone message): đầu bài là người gọi và mục đích (I'm calling about ...), giữa là vấn đề, cuối là yêu cầu gọi lại hoặc việc cần làm",
          'Quảng cáo (advertisement): đầu bài nêu nhu cầu, giữa là điểm mạnh của sản phẩm, cuối là ưu đãi, hạn chót và cách nhận ưu đãi',
          'Bản tin (broadcast): đầu bài là chủ đề, giữa là chi tiết và ý kiến, cuối là nội dung sắp phát tiếp',
          'Tham quan (tour): lời chào, lịch trình, quy định (không chụp ảnh, giữ nhóm), điểm đến tiếp theo',
          'Giới thiệu (introduction): người được giới thiệu là ai, thành tích, lý do có mặt, rồi mời lên nói',
          'Trích đoạn họp (excerpt from a meeting): vấn đề, số liệu, đề xuất và việc giao cho người nghe',
        ],
      },
      {
        heading: 'Ba câu hỏi theo vị trí trong bài',
        paragraphs: [
          'Câu hỏi mục đích, người nói là ai, người nghe là ai thường được trả lời trong hai câu đầu. Câu chi tiết nằm ở giữa. Câu hỏi người nghe được yêu cầu làm gì hoặc việc gì sắp diễn ra nằm ở cuối bài.',
        ],
        examples: [
          {
            en: "Hi, this is Marco from Brightway Rentals. I'm calling about the van you reserved for Saturday. → Purpose: To discuss a vehicle reservation.",
            vi: 'Chào anh, tôi là Marco bên Brightway Rentals. Tôi gọi về chiếc xe tải nhỏ anh đặt cho thứ Bảy. → Mục đích: Trao đổi về việc đặt xe.',
            note: 'Mục đích nằm ngay câu thứ hai; van → vehicle, reserved → reservation',
          },
          {
            en: "Before we go in, please note that photography isn't permitted inside the gallery. → What are listeners asked not to do? Take pictures.",
            vi: 'Trước khi vào, xin lưu ý không được chụp ảnh trong phòng trưng bày. → Người nghe được yêu cầu không làm gì? Chụp ảnh.',
            note: 'Quy định trong bài tham quan; photography → take pictures',
          },
          {
            en: "If you'd like to join, just leave your name with Ms. Ortiz at the front desk by Thursday. → What should interested listeners do? Register with a staff member.",
            vi: 'Ai muốn tham gia thì để lại tên cho chị Ortiz ở quầy lễ tân trước thứ Năm. → Người quan tâm nên làm gì? Đăng ký với một nhân viên.',
            note: 'Yêu cầu ở cuối bài; leave your name → register, Ms. Ortiz → a staff member',
          },
        ],
      },
      {
        heading: 'Bẫy ở mức 800+',
        paragraphs: [
          'Part 4 khó vì một người nói liên tục và có nhiều chi tiết giống nhau: nhiều con số, nhiều ngày, nhiều tên. Đề dùng chính những chi tiết đó làm đáp án sai.',
        ],
        bullets: [
          'Nhầm người nói với người nghe: "Who is the speaker?" khác "Who are the listeners?"',
          'Nhiều con số hoặc ngày trong bài: chọn con số gắn với đúng điều được hỏi, không phải con số nghe rõ nhất',
          'Từ đánh dấu thay đổi (however, unfortunately, actually, instead) thường đi ngay trước đáp án',
          'Câu hỏi có bảng hoặc sơ đồ (Look at the graphic): bài nghe nói một cột, đáp án nằm ở cột còn lại, nên đọc bảng trước khi nghe',
        ],
      },
    ],
    keyPoints: [
      'Đọc câu dẫn để biết loại bài trước khi nghe',
      'Mục đích ở đầu, chi tiết ở giữa, yêu cầu và việc tiếp theo ở cuối',
      'Nghe kỹ sau however, unfortunately, actually',
      'Nhiều con số trong bài: gắn mỗi con số với điều nó mô tả',
    ],
    practice: { part: 'P4', skillTag: 'comprehension.main-idea' },
  },
]
