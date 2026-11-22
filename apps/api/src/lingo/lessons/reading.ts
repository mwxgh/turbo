import type { LessonSpec } from './types'

export const READING_LESSONS: LessonSpec[] = [
  {
    id: 'p6-insertion',
    module: 'reading',
    title: 'Chèn câu và đọc theo ngữ cảnh ở Part 6',
    summary:
      'Dùng từ nối, đại từ và "this / these" để biết câu nào khớp với câu trước và câu sau chỗ trống',
    minutes: 20,
    parts: ['P6'],
    sections: [
      {
        heading: 'Part 6 khác Part 5 ở đâu',
        paragraphs: [
          'Part 6 có 4 đoạn văn, mỗi đoạn 4 câu hỏi. Ba câu là điền từ như Part 5, nhưng đáp án phụ thuộc vào cả đoạn chứ không chỉ một câu. Câu còn lại của mỗi đoạn là chèn cả một câu vào chỗ trống.',
          'Ở câu chèn câu, cả bốn đáp án đều đúng ngữ pháp. Câu đúng là câu nối được với câu ngay trước và câu ngay sau chỗ trống. Vì vậy phải đọc ít nhất hai câu này, không chọn chỉ vì đáp án có từ khóa giống đoạn văn.',
        ],
      },
      {
        heading: 'Tín hiệu nối câu',
        paragraphs: [
          'Câu đúng thường có một từ "chỉ ngược" về câu trước, hoặc câu sau có một từ chỉ ngược về câu cần chèn. Tìm những từ này trước khi hiểu hết nghĩa.',
        ],
        bullets: [
          'Đại từ: it, they, them, this, these, such, one → phải có danh từ phù hợp ngay trước đó (số ít / số nhiều, người / vật)',
          '"the + danh từ" (the change, the event) → danh từ đó đã được nhắc ở câu trước',
          'Từ nối bổ sung: In addition, Also, Furthermore → câu trước cùng ý, cùng hướng',
          'Từ nối đối lập: However, Nevertheless, Instead → câu trước có ý ngược lại',
          'Từ nối kết quả: As a result, Therefore, Consequently → câu trước là nguyên nhân',
        ],
        examples: [
          {
            en: 'Starting next month, all visitors must sign in at the security desk. --------. Visitors are asked to wear it at all times while in the building. (A) The lobby was renovated last spring. (B) After signing in, each visitor will receive a temporary badge. (C) However, the parking garage will remain open. (D) Our staff have praised the new cafeteria.',
            vi: 'Từ tháng sau, mọi khách phải đăng ký ở bàn bảo vệ. Sau khi đăng ký, mỗi khách sẽ nhận một thẻ tạm. Khách cần đeo thẻ suốt thời gian ở trong tòa nhà.',
            note: '"it" ở câu sau cần một danh từ số ít có thể đeo được: a temporary badge → (B). (C) có However nhưng không có ý đối lập nào với câu trước',
          },
        ],
      },
      {
        heading: 'Thì và từ nối phụ thuộc cả đoạn',
        paragraphs: [
          'Ba câu điền từ còn lại của Part 6 cũng cần ngữ cảnh. Thì của động từ phụ thuộc vào ngày viết thư so với sự việc. Từ nối phụ thuộc vào quan hệ với câu trước, nên không thể chọn khi chỉ đọc câu có chỗ trống.',
        ],
        examples: [
          {
            en: '(E-mail dated May 3) The training session, which -------- on May 10, will cover the new billing system. (A) took place (B) will take place (C) has taken place (D) was taking place',
            vi: 'Buổi đào tạo diễn ra vào ngày 10 tháng 5 sẽ giới thiệu hệ thống tính phí mới.',
            note: 'Email viết ngày 3/5, buổi đào tạo ngày 10/5 là tương lai, khớp với "will cover" → (B)',
          },
          {
            en: 'The renovation of the north wing was completed last week. --------, the staff lounge will reopen on Monday. (A) As a result (B) However (C) Instead (D) Otherwise',
            vi: 'Việc sửa chữa cánh phía bắc đã xong vào tuần trước. Vì vậy, phòng nghỉ nhân viên sẽ mở lại vào thứ Hai.',
            note: 'Sửa xong là nguyên nhân, mở lại là kết quả → (A)',
          },
        ],
      },
      {
        heading: 'Quy trình làm câu chèn câu',
        paragraphs: [
          'Nếu đọc đến chỗ trống mà chưa chắc, hãy đọc tiếp đến hết đoạn rồi quay lại. Đôi khi câu sau mới cho manh mối rõ nhất.',
        ],
        bullets: [
          'Đọc câu ngay trước và ngay sau chỗ trống',
          'Gạch các từ chỉ ngược trong từng đáp án (this, they, the + danh từ, từ nối)',
          'Loại đáp án mở ra chủ đề mới không được nhắc lại, lặp ý đã nói, hoặc mâu thuẫn với đoạn văn',
          'Cẩn thận với đáp án lặp lại từ khóa của đoạn văn nhưng không nối được về logic',
        ],
      },
    ],
    keyPoints: [
      'Đọc câu trước và câu sau chỗ trống, không chỉ câu có chỗ trống',
      'Đại từ và "the + danh từ" phải chỉ được về một thứ đã nhắc',
      'Từ nối phải đúng quan hệ: bổ sung, đối lập hay kết quả',
      'Thì của động từ xét theo ngày viết của văn bản',
    ],
    practice: { part: 'P6', skillTag: 'comprehension.sentence-insertion' },
  },
  {
    id: 'p7-not-true',
    module: 'reading',
    title: 'Câu hỏi NOT ở Part 7',
    summary:
      'Loại trừ ba đáp án có trong bài để tìm đáp án không được nhắc hoặc sai với bài',
    minutes: 15,
    parts: ['P7'],
    sections: [
      {
        heading: 'Nhận ra câu hỏi NOT',
        paragraphs: [
          'Câu hỏi có chữ NOT viết hoa: "What is NOT mentioned about...", "What is NOT indicated...", "What is NOT true about...". Ba đáp án có trong bài, một đáp án không có hoặc trái với bài.',
          'Dạng này tốn thời gian vì phải kiểm tra ba đáp án thay vì tìm một. Nếu bộ câu hỏi có câu NOT, hãy làm nó sau các câu khác trong cùng bộ: lúc đó bạn đã đọc nhiều hơn và nhớ thông tin nằm ở đâu.',
        ],
      },
      {
        heading: 'Cách loại trừ',
        paragraphs: [
          'Đọc từng đáp án, tìm câu trong bài nói cùng ý, rồi đánh dấu đáp án đó là đã có. Đáp án cuối cùng không tìm được bằng chứng là câu trả lời.',
        ],
        bullets: [
          'Thông tin của ba đáp án đúng thường nằm rải ở nhiều chỗ, có khi ở cả tiêu đề, bảng hay chú thích cuối bài',
          'Đáp án gần như luôn diễn đạt lại (paraphrase): daily = every day, additional fee = extra cost, complimentary = free',
          'Với "NOT mentioned", đáp án là thứ bài không nói tới. Với "NOT true", đáp án có thể là thứ bài nói ngược lại',
        ],
        examples: [
          {
            en: 'Greenfield Fitness Center is open daily from 6 A.M. to 10 P.M. Members enjoy free access to our indoor pool and group classes. Personal training is available for an additional fee. New members who join before June 30 will receive a free water bottle. — What is NOT mentioned about Greenfield Fitness Center? (A) It is open every day. (B) It charges extra for some services. (C) It has recently moved to a new location. (D) It gives a gift to some new members.',
            vi: 'Trung tâm thể hình Greenfield mở cửa hằng ngày từ 6 giờ sáng đến 10 giờ tối. Hội viên dùng miễn phí hồ bơi và các lớp tập nhóm. Huấn luyện cá nhân tính thêm phí. Hội viên mới đăng ký trước 30/6 được tặng bình nước.',
            note: '(A) = daily, (B) = additional fee, (D) = free water bottle. Bài không nói gì về việc chuyển địa điểm → (C)',
          },
        ],
      },
      {
        heading: 'Bẫy ở mức 800+',
        paragraphs: [
          'Đề khó thường để một đáp án dùng đúng từ trong bài nhưng đổi một chi tiết nhỏ: đổi người, đổi số, đổi "một số" thành "tất cả".',
        ],
        examples: [
          {
            en: '(Same text) What is NOT true about Greenfield Fitness Center? (A) Members can use the pool at no charge. (B) Personal training is included in the membership fee. (C) It closes at 10 P.M. (D) It offers group classes.',
            vi: 'Điều nào KHÔNG đúng về trung tâm thể hình Greenfield?',
            note: 'Bài nói huấn luyện cá nhân tính thêm phí, (B) nói đã bao gồm trong phí hội viên → sai với bài → (B). Từ "personal training" xuất hiện trong bài nên dễ bị đánh dấu là "có nhắc"',
          },
        ],
      },
    ],
    keyPoints: [
      'Làm câu NOT sau các câu khác cùng bộ',
      'Tìm bằng chứng cho từng đáp án, đáp án không có bằng chứng là câu trả lời',
      'Đáp án dùng đúng từ trong bài vẫn có thể bị đổi chi tiết',
    ],
    practice: { part: 'P7', skillTag: 'comprehension.not-true' },
  },
  {
    id: 'p7-inference',
    module: 'reading',
    title: 'Suy luận và ý định người viết ở Part 7',
    summary:
      'Trả lời câu "most likely", "suggested", "implied" bằng bằng chứng trong bài, và hiểu ý một câu trong đoạn chat',
    minutes: 20,
    parts: ['P7'],
    sections: [
      {
        heading: 'Suy luận nhưng vẫn phải có bằng chứng',
        paragraphs: [
          'Câu suy luận có các từ most likely, probably, suggested, implied, inferred. Đáp án không được viết thẳng trong bài, nhưng phải được một hoặc hai câu trong bài ủng hộ.',
          'Không dùng hiểu biết bên ngoài hay suy đoán xa. Nếu không chỉ ra được câu nào trong bài dẫn tới đáp án, đó chưa phải là đáp án.',
        ],
        bullets: [
          'Who most likely is...? → nhìn nghề nghiệp qua việc người đó làm, chức danh, tên công ty',
          'Where would the notice most likely be found? → nhìn người đọc mà thông báo hướng tới',
          'What is suggested about...? → thường cần ghép hai chi tiết trong bài',
        ],
      },
      {
        heading: 'Từ chi tiết đến kết luận',
        paragraphs: [
          'Đọc câu hỏi, tìm đoạn nói về đối tượng được hỏi, rồi hỏi: chi tiết này cho thấy điều gì chắc chắn đúng.',
        ],
        examples: [
          {
            en: 'I have attached the revised floor plan. As you requested during our visit to the site last Tuesday, the reception desk has been moved closer to the main entrance. — Who most likely is the writer? (A) A real estate agent (B) An interior designer (C) A receptionist (D) A security guard',
            vi: 'Tôi gửi kèm bản vẽ mặt bằng đã sửa. Như anh chị yêu cầu khi chúng ta đến xem công trình thứ Ba tuần trước, quầy lễ tân đã được dời gần cửa chính hơn.',
            note: 'Người viết sửa bản vẽ mặt bằng theo yêu cầu khách → (B). (C) là bẫy vì có từ "reception"',
          },
          {
            en: '(Same text) What is suggested about the recipient? (A) He has visited the site. (B) He works at the reception desk. (C) He drew the original plan. (D) He will move to a new office.',
            vi: 'Điều gì được gợi ý về người nhận?',
            note: '"our visit to the site" → người nhận đã đến công trình → (A). (C) không có bằng chứng',
          },
        ],
      },
      {
        heading: 'Ý định người viết trong đoạn chat',
        paragraphs: [
          'Câu dạng "At 9:16 A.M., what does Mr. Haddad mean when he writes, \'...\'?" hỏi ý của một câu ngắn trong ngữ cảnh. Câu được trích thường có nghĩa đen khác nghĩa thật, nên phải đọc tin nhắn ngay trước và ngay sau.',
        ],
        examples: [
          {
            en: "Lena Ruiz (9:15 A.M.): The printer on our floor is jammed again. Could we use yours for the client handouts? / Omar Haddad (9:16 A.M.): Mine's out of toner, unfortunately. / Lena Ruiz (9:17 A.M.): OK, I'll ask Jae-won then. — At 9:16 A.M., what does Mr. Haddad mean? (A) He cannot help with the printing. (B) He will order more toner. (C) He wants to see the handouts. (D) He will fix the printer.",
            vi: 'Lena: Máy in tầng mình lại kẹt giấy. Mình dùng máy của anh để in tài liệu cho khách được không? Omar: Tiếc là máy tôi hết mực. Lena: Vậy tôi hỏi Jae-won.',
            note: 'Hết mực nghĩa là không in giúp được, và Lena chuyển sang hỏi người khác → (A). (B) có thể xảy ra nhưng bài không nói',
          },
        ],
      },
      {
        heading: 'Bẫy thường gặp',
        paragraphs: [
          'Đáp án sai ở câu suy luận thường "nghe hợp lý" nhưng vượt quá những gì bài nói.',
        ],
        bullets: [
          'Đáp án dùng từ tuyệt đối (all, always, never, only) trong khi bài chỉ nói về một trường hợp',
          'Đáp án lặp từ khóa trong bài nhưng nói về người hoặc vật khác',
          'Đáp án đúng với bài nhưng không trả lời đúng câu hỏi',
        ],
      },
    ],
    keyPoints: [
      'Mỗi đáp án suy luận phải chỉ ra được câu làm bằng chứng',
      'Không dùng hiểu biết ngoài bài',
      'Câu trích trong đoạn chat: đọc tin nhắn ngay trước và ngay sau',
      'Cẩn thận với từ tuyệt đối và đáp án đi quá xa',
    ],
    practice: { part: 'P7', skillTag: 'comprehension.inference' },
  },
  {
    id: 'p7-vocab-in-context',
    module: 'reading',
    title: 'Từ đồng nghĩa trong ngữ cảnh ở Part 7',
    summary:
      'Chọn nghĩa của một từ nhiều nghĩa theo đúng câu chứa nó, không theo nghĩa quen thuộc nhất',
    minutes: 15,
    parts: ['P7'],
    sections: [
      {
        heading: 'Dạng câu hỏi',
        paragraphs: [
          'Câu hỏi có dạng: "In the e-mail, the word \'X\' in paragraph 2, line 3, is closest in meaning to". Từ được hỏi thường là từ quen nhưng nhiều nghĩa: cover, address, run, carry, figure, term, meet, assume, feature, reflect.',
          'Bốn đáp án thường đều là nghĩa có thật của từ đó trong những ngữ cảnh khác. Vì vậy câu hỏi không kiểm tra bạn có biết từ không, mà kiểm tra bạn có đọc câu chứa từ không.',
        ],
      },
      {
        heading: 'Cách làm trong 30 giây',
        paragraphs: [
          'Dạng này nhanh nếu làm đúng cách. Đừng chọn ngay nghĩa bạn quen nhất.',
        ],
        bullets: [
          'Đọc trọn câu chứa từ, cả chủ ngữ và tân ngữ của nó',
          'Thay từng đáp án vào chỗ của từ, đọc lại câu',
          'Chọn đáp án giữ nguyên nghĩa câu và đúng cách dùng (cùng loại từ, cùng cấu trúc)',
        ],
      },
      {
        heading: 'Ví dụ',
        paragraphs: [
          'Trong các câu dưới đây, nghĩa quen nhất của từ được hỏi đều là đáp án sai.',
        ],
        examples: [
          {
            en: 'The annual report covers the period from January to December. — "covers" is closest in meaning to (A) hides (B) includes (C) pays for (D) protects',
            vi: 'Báo cáo năm bao gồm giai đoạn từ tháng 1 đến tháng 12.',
            note: 'Báo cáo "bao quát" một khoảng thời gian → (B). Hides, protects là nghĩa "che phủ"; pays for là nghĩa trong "cover the cost"',
          },
          {
            en: 'Ms. Patel will assume the role of department head in March. — "assume" is closest in meaning to (A) suppose (B) take on (C) pretend (D) expect',
            vi: 'Cô Patel sẽ đảm nhận vị trí trưởng phòng vào tháng 3.',
            note: 'assume + vai trò, trách nhiệm nghĩa là đảm nhận → (B). Suppose là nghĩa "cho rằng", không đi với "the role"',
          },
          {
            en: 'Please address any questions about your invoice to our billing department. — "address" is closest in meaning to (A) direct (B) solve (C) speak (D) locate',
            vi: 'Vui lòng gửi mọi câu hỏi về hóa đơn đến bộ phận thanh toán.',
            note: 'address sth to sb nghĩa là gửi đến → (A). Solve là nghĩa trong "address an issue" (giải quyết vấn đề), không hợp với "to our billing department"',
          },
        ],
      },
    ],
    keyPoints: [
      'Đọc cả câu chứa từ trước khi xem đáp án',
      'Thay từng đáp án vào câu, giữ nghĩa và cấu trúc',
      'Nghĩa quen nhất thường là bẫy',
    ],
    practice: { part: 'P7', skillTag: 'comprehension.vocab-in-context' },
  },
  {
    id: 'p7-multi-passage',
    module: 'reading',
    title: 'Bài đọc kép và bài đọc ba ở Part 7',
    summary:
      'Biết câu hỏi nào cần văn bản nào và nối ngày, giá, mã số giữa các văn bản',
    minutes: 25,
    parts: ['P7'],
    sections: [
      {
        heading: 'Cấu trúc phần đọc nhiều văn bản',
        paragraphs: [
          'Part 7 có 54 câu: 29 câu ở các bài đọc đơn, 10 câu ở hai bộ bài đọc kép (hai văn bản) và 15 câu ở ba bộ bài đọc ba (ba văn bản). Mỗi bộ có 5 câu hỏi.',
          'Trong mỗi bộ thường có một hoặc hai câu chỉ trả lời được khi ghép thông tin từ hai văn bản. Những câu này phân biệt người đạt 700 với người đạt 800+.',
        ],
      },
      {
        heading: 'Câu hỏi nào cần văn bản nào',
        paragraphs: [
          'Trước khi đọc kỹ, lướt tiêu đề và phần đầu từng văn bản: loại văn bản gì (email, bảng giá, đơn hàng, đánh giá), ai viết cho ai, ngày nào. Sau đó đọc câu hỏi để biết cần tìm ở đâu.',
        ],
        bullets: [
          'Câu hỏi nêu tên văn bản ("According to the e-mail", "in the invoice") → chỉ tìm trong văn bản đó',
          'Câu hỏi đầu tiên của bộ thường về văn bản đầu tiên, các câu sau đi dần theo thứ tự văn bản',
          'Câu hỏi nhắc một người, sản phẩm hay ngày có mặt ở hai văn bản → khả năng cao là câu cần ghép',
          'Câu hỏi có "most likely" hoặc "suggested" trong bộ nhiều văn bản thường cần ghép thông tin',
        ],
      },
      {
        heading: 'Nối thông tin giữa các văn bản',
        paragraphs: [
          'Thông tin hay được nối là ngày, giá, mã sản phẩm, tên người và địa điểm. Một văn bản đưa điều kiện (bảng giá, chính sách, lịch), văn bản kia đưa trường hợp cụ thể (email đặt hàng, phàn nàn).',
        ],
        examples: [
          {
            en: 'Text 1 (Rate card): Standard room $120 per night. Deluxe room (garden view) $165 per night. Guests staying three nights or more receive 10% off. / Text 2 (E-mail): I would like to book a room with a garden view for four nights, from October 8 to 12. — What is suggested about the guest? (A) She will stay in a standard room. (B) She will receive a discount. (C) She has stayed at the hotel before. (D) She will arrive on October 7.',
            vi: 'Bảng giá: phòng thường 120 đô một đêm, phòng deluxe (nhìn ra vườn) 165 đô một đêm, ở từ ba đêm được giảm 10%. Email: tôi muốn đặt phòng nhìn ra vườn bốn đêm, từ 8 đến 12 tháng 10.',
            note: 'Bốn đêm (email) thỏa điều kiện ba đêm trở lên (bảng giá) → (B). Chỉ đọc một văn bản thì không trả lời được',
          },
          {
            en: 'Text 1 (Order form): Item BX-204, desk lamp, quantity 3. / Text 2 (E-mail): One of the lamps arrived with a cracked base. / Text 3 (Reply): We will ship a replacement for item BX-204 at no cost. — How many lamps did the customer receive in good condition? (A) One (B) Two (C) Three (D) Four',
            vi: 'Đơn hàng: mã BX-204, đèn bàn, số lượng 3. Email: một chiếc đèn bị nứt đế. Thư trả lời: chúng tôi sẽ gửi đèn thay thế miễn phí.',
            note: 'Ghép số lượng ở đơn hàng (3) với số đèn hỏng ở email (1) → (B). (C) là bẫy nếu chỉ đọc đơn hàng',
          },
        ],
      },
      {
        heading: 'Thời gian cho mỗi bộ',
        paragraphs: [
          'Một bộ 5 câu nên làm trong khoảng 5 đến 6 phút. Nếu một câu ghép thông tin mất quá 1,5 phút, hãy chọn tạm, đánh dấu và sang câu tiếp theo; các câu còn lại của bộ thường dễ hơn.',
        ],
      },
    ],
    keyPoints: [
      'Lướt loại văn bản, người gửi, người nhận và ngày trước khi đọc kỹ',
      'Câu hỏi nêu tên văn bản thì chỉ tìm trong văn bản đó',
      'Một văn bản cho điều kiện, văn bản kia cho trường hợp cụ thể',
      'Mỗi bộ 5 câu khoảng 5 đến 6 phút',
    ],
    practice: { part: 'P7', skillTag: 'comprehension.cross-reference' },
  },
]
