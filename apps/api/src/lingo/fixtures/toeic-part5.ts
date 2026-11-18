/**
 * Sample TOEIC Part 5 items (written for Lingo, not taken from ETS tests). Loaded by
 * POST /lingo/admin/samples so a fresh environment has something to practise; same shape as a
 * JSON import file.
 */
export const TOEIC_PART5_SAMPLES = [
  {
    difficulty: 'EASY',
    topic: 'Office',
    questions: [
      {
        text: 'Ms. Tanaka ------- the quarterly report to the board every March.',
        options: ['present', 'presents', 'presenting', 'to present'],
        answer: 1,
        explanationVi:
          'Chủ ngữ "Ms. Tanaka" số ít, hành động lặp lại hằng năm (every March) → thì hiện tại đơn, động từ thêm -s: "presents". "present" thiếu -s; "presenting" và "to present" không làm động từ chính được.',
        translationVi:
          'Cô Tanaka trình bày báo cáo quý cho hội đồng vào tháng Ba hằng năm.',
        skillTags: ['grammar.verb-tense', 'grammar.agreement'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Travel',
    questions: [
      {
        text: 'Passengers should arrive at the gate ------- 30 minutes before departure.',
        options: ['at least', 'at most', 'least', 'most'],
        answer: 0,
        explanationVi:
          '"at least" = ít nhất, hợp nghĩa "đến cổng ít nhất 30 phút trước giờ khởi hành". "at most" (nhiều nhất) sai nghĩa; "least", "most" đứng một mình không đi với số lượng như vậy.',
        translationVi:
          'Hành khách nên có mặt ở cổng ít nhất 30 phút trước giờ khởi hành.',
        skillTags: ['vocab.collocation'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'HR',
    questions: [
      {
        text: 'All new employees must attend the safety training ------- their first week.',
        options: ['while', 'during', 'since', 'until'],
        answer: 1,
        explanationVi:
          'Sau chỗ trống là cụm danh từ "their first week" → cần giới từ. "during" (trong suốt) hợp nghĩa. "while" là liên từ, cần mệnh đề; "since" và "until" sai nghĩa.',
        translationVi:
          'Mọi nhân viên mới phải tham gia buổi huấn luyện an toàn trong tuần đầu tiên.',
        skillTags: ['grammar.preposition'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Marketing',
    questions: [
      {
        text: 'The marketing team was ------- pleased with the response to the new campaign.',
        options: ['particular', 'particularly', 'particularity', 'particulars'],
        answer: 1,
        explanationVi:
          'Chỗ trống đứng trước tính từ "pleased" → cần trạng từ bổ nghĩa: "particularly" (đặc biệt). Các đáp án còn lại là tính từ hoặc danh từ.',
        translationVi:
          'Nhóm marketing đặc biệt hài lòng với phản hồi về chiến dịch mới.',
        skillTags: ['grammar.word-form'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Finance',
    questions: [
      {
        text: 'The budget proposal ------- by the finance committee next Monday.',
        options: ['reviews', 'will review', 'will be reviewed', 'has reviewed'],
        answer: 2,
        explanationVi:
          'Chủ ngữ "the budget proposal" không tự xem xét được, có tác nhân "by the finance committee" → câu bị động. "next Monday" → tương lai: "will be reviewed".',
        translationVi:
          'Đề xuất ngân sách sẽ được ủy ban tài chính xem xét vào thứ Hai tới.',
        skillTags: ['grammar.verb-form', 'grammar.verb-tense'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Office',
    questions: [
      {
        text: 'Please submit your expense reports to Mr. Patel, ------- will process them by Friday.',
        options: ['who', 'which', 'whom', 'whose'],
        answer: 0,
        explanationVi:
          'Đại từ quan hệ thay cho người (Mr. Patel) và làm chủ ngữ của "will process" → "who". "which" dùng cho vật; "whom" làm tân ngữ; "whose" chỉ sở hữu.',
        translationVi:
          'Vui lòng nộp báo cáo chi phí cho ông Patel, người sẽ xử lý chúng trước thứ Sáu.',
        skillTags: ['grammar.relative-clause'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Manufacturing',
    questions: [
      {
        text: 'The new assembly line is ------- than the old one, producing twice as many units per hour.',
        options: [
          'efficient',
          'more efficient',
          'most efficient',
          'efficiently',
        ],
        answer: 1,
        explanationVi:
          'Có "than" → so sánh hơn. "efficient" là tính từ dài → "more efficient". "most efficient" là so sánh nhất; "efficiently" là trạng từ.',
        translationVi:
          'Dây chuyền lắp ráp mới hiệu quả hơn dây chuyền cũ, sản xuất gấp đôi số sản phẩm mỗi giờ.',
        skillTags: ['grammar.comparison'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Office',
    questions: [
      {
        text: 'Mr. Chen asked his assistant to schedule the meeting for ------- and the sales director.',
        options: ['he', 'his', 'him', 'himself'],
        answer: 2,
        explanationVi:
          'Sau giới từ "for" cần đại từ tân ngữ → "him". "he" là chủ ngữ, "his" là sở hữu, "himself" là phản thân (chỉ dùng khi chủ ngữ và tân ngữ là một người trong cùng mệnh đề).',
        translationVi:
          'Ông Chen nhờ trợ lý sắp xếp cuộc họp cho ông và giám đốc kinh doanh.',
        skillTags: ['grammar.pronoun'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Finance',
    questions: [
      {
        text: '------- the decline in overseas sales, the company reported record profits this year.',
        options: ['Although', 'Despite', 'Because of', 'However'],
        answer: 1,
        explanationVi:
          'Sau chỗ trống là cụm danh từ "the decline in overseas sales" và hai vế đối lập (doanh số giảm nhưng lợi nhuận kỷ lục) → "Despite". "Although" cần mệnh đề; "Because of" sai nghĩa; "However" là trạng từ nối câu.',
        translationVi:
          'Mặc dù doanh số ở nước ngoài giảm, công ty vẫn báo lãi kỷ lục năm nay.',
        skillTags: ['grammar.conjunction'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Contracts',
    questions: [
      {
        text: 'The supplier agreed to ------- the delivery fee for orders placed before the end of the month.',
        options: ['waive', 'wave', 'waiver', 'waiving'],
        answer: 0,
        explanationVi:
          'Sau "agreed to" cần động từ nguyên mẫu. "waive the fee" = miễn phí (collocation hay gặp). "wave" là vẫy tay (dễ nhầm vì phát âm giống); "waiver" là danh từ; "waiving" sai dạng.',
        translationVi:
          'Nhà cung cấp đồng ý miễn phí giao hàng cho các đơn đặt trước cuối tháng.',
        skillTags: ['vocab.collocation', 'grammar.verb-form'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'HR',
    questions: [
      {
        text: 'Neither the store manager ------- her assistant was informed of the change in the delivery schedule.',
        options: ['or', 'nor', 'and', 'but'],
        answer: 1,
        explanationVi:
          'Cấu trúc cặp liên từ "neither … nor" = không … cũng không. "either … or" mới đi với "or"; "and", "but" không đi với "neither".',
        translationVi:
          'Cả quản lý cửa hàng lẫn trợ lý của cô ấy đều không được báo về việc đổi lịch giao hàng.',
        skillTags: ['grammar.conjunction'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Marketing',
    questions: [
      {
        text: 'The survey results were ------- with the team’s initial predictions about customer preferences.',
        options: ['consistent', 'consisted', 'consisting', 'consistency'],
        answer: 0,
        explanationVi:
          'Sau "were" cần tính từ; cụm cố định "be consistent with" = phù hợp, nhất quán với. "consisted" (consist of = gồm có) sai nghĩa; "consisting" sai dạng; "consistency" là danh từ.',
        translationVi:
          'Kết quả khảo sát khớp với dự đoán ban đầu của nhóm về sở thích khách hàng.',
        skillTags: ['grammar.word-form', 'vocab.collocation'],
      },
    ],
  },
]

/** System deck loaded with the samples. */
export const TOEIC_STARTER_DECK = {
  title: 'TOEIC starter: office & business',
  description: 'Từ vựng mẫu hay gặp trong TOEIC (công sở, tài chính, du lịch).',
  cards: [
    {
      term: 'agenda',
      pos: 'n',
      reading: '/əˈdʒendə/',
      meaningVi: 'chương trình nghị sự (cuộc họp)',
      example: 'The first item on the agenda is the budget.',
      exampleVi: 'Mục đầu tiên trong chương trình họp là ngân sách.',
      topic: 'Office',
    },
    {
      term: 'deadline',
      pos: 'n',
      reading: '/ˈdedlaɪn/',
      meaningVi: 'hạn chót',
      example: 'The deadline for applications is May 1.',
      exampleVi: 'Hạn nộp đơn là ngày 1 tháng 5.',
      topic: 'Office',
    },
    {
      term: 'postpone',
      pos: 'v',
      reading: '/pəʊstˈpəʊn/',
      meaningVi: 'hoãn lại',
      example: 'The meeting was postponed until next week.',
      exampleVi: 'Cuộc họp bị hoãn đến tuần sau.',
      topic: 'Office',
    },
    {
      term: 'colleague',
      pos: 'n',
      reading: '/ˈkɒliːɡ/',
      meaningVi: 'đồng nghiệp',
      example: 'She discussed the plan with her colleagues.',
      exampleVi: 'Cô ấy bàn kế hoạch với đồng nghiệp.',
      topic: 'Office',
    },
    {
      term: 'supervisor',
      pos: 'n',
      reading: '/ˈsuːpəvaɪzə(r)/',
      meaningVi: 'người giám sát, quản lý trực tiếp',
      example: 'Report any problems to your supervisor.',
      exampleVi: 'Báo mọi sự cố cho quản lý trực tiếp của bạn.',
      topic: 'Office',
    },
    {
      term: 'reimburse',
      pos: 'v',
      reading: '/ˌriːɪmˈbɜːs/',
      meaningVi: 'hoàn tiền (chi phí đã bỏ ra)',
      example: 'The company will reimburse your travel expenses.',
      exampleVi: 'Công ty sẽ hoàn lại chi phí đi lại cho bạn.',
      topic: 'Finance',
    },
    {
      term: 'invoice',
      pos: 'n',
      reading: '/ˈɪnvɔɪs/',
      meaningVi: 'hoá đơn',
      example: 'Please pay the invoice within 30 days.',
      exampleVi: 'Vui lòng thanh toán hoá đơn trong vòng 30 ngày.',
      topic: 'Finance',
    },
    {
      term: 'revenue',
      pos: 'n',
      reading: '/ˈrevənjuː/',
      meaningVi: 'doanh thu',
      example: 'Revenue increased by 12% last quarter.',
      exampleVi: 'Doanh thu tăng 12% trong quý trước.',
      topic: 'Finance',
    },
    {
      term: 'budget',
      pos: 'n',
      reading: '/ˈbʌdʒɪt/',
      meaningVi: 'ngân sách',
      example: 'The project is within budget.',
      exampleVi: 'Dự án nằm trong ngân sách.',
      topic: 'Finance',
    },
    {
      term: 'estimate',
      pos: 'n, v',
      reading: '/ˈestɪmət/',
      meaningVi: 'ước tính; bản báo giá',
      example: 'Can you give me an estimate for the repairs?',
      exampleVi: 'Anh có thể báo giá sửa chữa cho tôi không?',
      topic: 'Finance',
    },
    {
      term: 'itinerary',
      pos: 'n',
      reading: '/aɪˈtɪnərəri/',
      meaningVi: 'lịch trình chuyến đi',
      example: 'Your itinerary has been sent by email.',
      exampleVi: 'Lịch trình của bạn đã được gửi qua email.',
      topic: 'Travel',
    },
    {
      term: 'boarding pass',
      pos: 'n',
      reading: '/ˈbɔːdɪŋ pɑːs/',
      meaningVi: 'thẻ lên máy bay',
      example: 'Please show your boarding pass at the gate.',
      exampleVi: 'Vui lòng xuất trình thẻ lên máy bay ở cổng.',
      topic: 'Travel',
    },
    {
      term: 'accommodation',
      pos: 'n',
      reading: '/əˌkɒməˈdeɪʃn/',
      meaningVi: 'chỗ ở',
      example: 'Accommodation is included in the conference fee.',
      exampleVi: 'Phí hội nghị đã bao gồm chỗ ở.',
      topic: 'Travel',
    },
    {
      term: 'reservation',
      pos: 'n',
      reading: '/ˌrezəˈveɪʃn/',
      meaningVi: 'sự đặt chỗ',
      example: 'I would like to confirm my reservation.',
      exampleVi: 'Tôi muốn xác nhận việc đặt chỗ của mình.',
      topic: 'Travel',
    },
    {
      term: 'candidate',
      pos: 'n',
      reading: '/ˈkændɪdət/',
      meaningVi: 'ứng viên',
      example: 'We interviewed five candidates for the position.',
      exampleVi: 'Chúng tôi đã phỏng vấn năm ứng viên cho vị trí này.',
      topic: 'HR',
    },
    {
      term: 'qualification',
      pos: 'n',
      reading: '/ˌkwɒlɪfɪˈkeɪʃn/',
      meaningVi: 'bằng cấp, trình độ',
      example: 'She has the right qualifications for the job.',
      exampleVi: 'Cô ấy có bằng cấp phù hợp với công việc.',
      topic: 'HR',
    },
    {
      term: 'promote',
      pos: 'v',
      reading: '/prəˈməʊt/',
      meaningVi: 'thăng chức; quảng bá',
      example: 'He was promoted to sales manager.',
      exampleVi: 'Anh ấy được thăng chức trưởng phòng kinh doanh.',
      topic: 'HR',
    },
    {
      term: 'benefits',
      pos: 'n',
      reading: '/ˈbenɪfɪts/',
      meaningVi: 'phúc lợi',
      example: 'The job offers excellent benefits.',
      exampleVi: 'Công việc này có phúc lợi rất tốt.',
      topic: 'HR',
    },
    {
      term: 'launch',
      pos: 'v, n',
      reading: '/lɔːntʃ/',
      meaningVi: 'ra mắt (sản phẩm)',
      example: 'The company will launch a new product in June.',
      exampleVi: 'Công ty sẽ ra mắt sản phẩm mới vào tháng Sáu.',
      topic: 'Marketing',
    },
    {
      term: 'survey',
      pos: 'n',
      reading: '/ˈsɜːveɪ/',
      meaningVi: 'cuộc khảo sát',
      example: 'Customers were asked to complete a short survey.',
      exampleVi: 'Khách hàng được mời làm một khảo sát ngắn.',
      topic: 'Marketing',
    },
    {
      term: 'competitor',
      pos: 'n',
      reading: '/kəmˈpetɪtə(r)/',
      meaningVi: 'đối thủ cạnh tranh',
      example: 'Our prices are lower than our competitors’.',
      exampleVi: 'Giá của chúng tôi thấp hơn đối thủ.',
      topic: 'Marketing',
    },
    {
      term: 'warranty',
      pos: 'n',
      reading: '/ˈwɒrənti/',
      meaningVi: 'bảo hành',
      example: 'The printer comes with a two-year warranty.',
      exampleVi: 'Máy in được bảo hành hai năm.',
      topic: 'Purchasing',
    },
    {
      term: 'refund',
      pos: 'n, v',
      reading: '/ˈriːfʌnd/',
      meaningVi: 'hoàn tiền',
      example: 'You can get a full refund within 14 days.',
      exampleVi: 'Bạn được hoàn tiền toàn bộ trong vòng 14 ngày.',
      topic: 'Purchasing',
    },
    {
      term: 'shipment',
      pos: 'n',
      reading: '/ˈʃɪpmənt/',
      meaningVi: 'lô hàng, việc giao hàng',
      example: 'The shipment arrived two days late.',
      exampleVi: 'Lô hàng đến trễ hai ngày.',
      topic: 'Purchasing',
    },
    {
      term: 'inventory',
      pos: 'n',
      reading: '/ˈɪnvəntri/',
      meaningVi: 'hàng tồn kho',
      example: 'We check the inventory every Friday.',
      exampleVi: 'Chúng tôi kiểm kho mỗi thứ Sáu.',
      topic: 'Manufacturing',
    },
    {
      term: 'facility',
      pos: 'n',
      reading: '/fəˈsɪləti/',
      meaningVi: 'cơ sở, nhà máy',
      example: 'The new facility will open next year.',
      exampleVi: 'Nhà máy mới sẽ mở cửa vào năm sau.',
      topic: 'Manufacturing',
    },
    {
      term: 'comply with',
      pos: 'v',
      reading: '/kəmˈplaɪ wɪð/',
      meaningVi: 'tuân thủ',
      example: 'All products must comply with safety standards.',
      exampleVi: 'Mọi sản phẩm phải tuân thủ tiêu chuẩn an toàn.',
      topic: 'Manufacturing',
    },
    {
      term: 'renovation',
      pos: 'n',
      reading: '/ˌrenəˈveɪʃn/',
      meaningVi: 'sự cải tạo, sửa sang',
      example: 'The lobby is closed for renovation.',
      exampleVi: 'Sảnh đóng cửa để cải tạo.',
      topic: 'Facilities',
    },
    {
      term: 'tenant',
      pos: 'n',
      reading: '/ˈtenənt/',
      meaningVi: 'người thuê (nhà, văn phòng)',
      example: 'Tenants must park in the rear lot.',
      exampleVi: 'Người thuê phải đỗ xe ở bãi phía sau.',
      topic: 'Facilities',
    },
    {
      term: 'appointment',
      pos: 'n',
      reading: '/əˈpɔɪntmənt/',
      meaningVi: 'cuộc hẹn',
      example: 'I have an appointment with the dentist at 3 p.m.',
      exampleVi: 'Tôi có hẹn với nha sĩ lúc 3 giờ chiều.',
      topic: 'Health',
    },
  ],
}
