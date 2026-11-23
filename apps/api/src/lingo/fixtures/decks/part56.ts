import type { DeckFixture } from '../types'

/**
 * Part 5–6 vocabulary from the teacher's handout "600 từ vựng TOEIC Part 5 & 6" (IMAX TOEIC):
 * base words with their "từ mở rộng" (word family, phrases, usage notes), then common phrases.
 * Transcribed as printed; only clear spelling slips are fixed.
 */
export const PART56_DECKS: DeckFixture[] = [
  {
    title: 'Part 5–6 · Từ vựng 1 (about – consultant)',
    description:
      'Từ cơ bản và từ mở rộng Part 5–6, theo tài liệu "600 từ vựng TOEIC Part 5 & 6" (IMAX TOEIC).',
    topic: 'Part 5–6',
    cards: [
      {
        term: 'about',
        pos: 'adv, prep',
        meaningVi: '(adv) khoảng; (prep) về',
        extensions: [
          {
            meaningVi:
              'about thường làm giới từ. Khi đứng trước từ chỉ số lượng, about là trạng từ.',
          },
        ],
      },
      {
        term: 'accept',
        pos: 'v',
        meaningVi: 'chấp nhận',
        extensions: [
          {
            term: 'acceptance',
            pos: 'n',
            meaningVi: 'sự chấp nhận',
          },
          {
            term: 'accept responsibilities for',
            meaningVi: 'nhận trách nhiệm về',
          },
        ],
      },
      {
        term: 'accommodate',
        pos: 'v',
        meaningVi: 'cung cấp nơi ở, đáp ứng',
        extensions: [
          {
            term: 'accommodation',
            pos: 'n',
            meaningVi: 'chỗ ở',
          },
          {
            term: 'accommodate a tour group',
            meaningVi: 'cung cấp phòng cho 1 nhóm theo tua',
          },
        ],
      },
      {
        term: 'according to',
        pos: 'prep',
        meaningVi: 'theo như',
        extensions: [
          {
            term: 'according to the company newsletter',
            meaningVi: 'theo như báo của công ty',
          },
        ],
      },
      {
        term: 'additional',
        pos: 'adj',
        meaningVi: 'thêm vào, bổ sung',
        extensions: [
          {
            term: 'add',
            pos: 'v',
            meaningVi: 'thêm, bổ sung',
          },
          {
            term: 'addition',
            pos: 'n',
            meaningVi: 'sự thêm vào',
          },
          {
            term: 'additional investment',
            meaningVi: 'đầu tư bổ sung',
          },
        ],
      },
      {
        term: 'advise',
        pos: 'v',
        meaningVi: 'khuyên',
        extensions: [
          {
            term: 'advice',
            pos: 'n',
            meaningVi: 'lời khuyên',
          },
          {
            term: 'advisor',
            pos: 'n',
            meaningVi: 'người cố vấn',
          },
          {
            term: 'advisable',
            pos: 'adj',
            meaningVi: 'thích hợp',
          },
        ],
      },
      {
        term: 'after',
        pos: 'conj, prep',
        meaningVi: 'sau khi',
        extensions: [
          {
            term: 'after he returned to the office',
            meaningVi: 'sau khi anh ấy trở lại văn phòng',
          },
        ],
      },
      {
        term: 'agree',
        pos: 'v',
        meaningVi: 'đồng ý',
        extensions: [
          {
            term: 'agreement',
            pos: 'n',
            meaningVi: 'sự đồng ý, hợp đồng',
          },
          {
            term: 'agree with',
            meaningVi: 'đồng ý với',
          },
          {
            term: 'the terms of agreement',
            meaningVi: 'những điều khoản của hợp đồng',
          },
          {
            term: 'terminate an agreement',
            meaningVi: 'thẩm định hợp đồng',
          },
        ],
      },
      {
        term: 'although',
        pos: 'conj',
        meaningVi: 'mặc dù',
        extensions: [
          {
            term: 'despite',
            pos: 'prep',
            meaningVi: 'mặc dù',
          },
          {
            term: 'although he was inexperienced',
            meaningVi: 'mặc dù anh ấy không có kinh nghiệm',
          },
          {
            term: 'despite his efforts',
            meaningVi: 'cho cố gắng của anh ấy',
          },
        ],
      },
      {
        term: 'answer',
        pos: 'v',
        meaningVi: 'trả lời',
        extensions: [
          {
            term: 'respond to',
            pos: 'v',
            meaningVi: 'trả lời',
          },
        ],
      },
      {
        term: 'apology',
        pos: 'n',
        meaningVi: 'lời xin lỗi',
        extensions: [
          {
            term: 'apologize',
            pos: 'v',
            meaningVi: 'xin lỗi',
          },
          {
            term: 'apologize A for B',
            meaningVi: 'xin lỗi A về việc B',
          },
        ],
      },
      {
        term: 'apply',
        pos: 'v',
        meaningVi: 'áp dụng nộp đơn, xin việc',
        extensions: [
          {
            term: 'applicant',
            pos: 'n',
            meaningVi: 'người nộp đơn (xin việc)',
          },
          {
            term: 'application',
            pos: 'n',
            meaningVi: 'đơn xin',
          },
          {
            term: 'apply for',
            meaningVi: 'nộp đơn xin ...',
          },
          {
            term: 'applicants for the position',
            meaningVi: 'ứng cử viên cho chức vụ',
          },
        ],
      },
      {
        term: 'approve',
        pos: 'v',
        meaningVi: 'đồng ý',
        extensions: [
          {
            term: 'approval',
            pos: 'n',
            meaningVi: 'sự đồng ý, sự chấp thuận',
          },
          {
            term: 'approve the construction plan',
            meaningVi: 'đồng ý bản kế hoạch xây dựng',
          },
        ],
      },
      {
        term: 'approximately',
        pos: 'v',
        meaningVi: 'khoảng',
        extensions: [
          {
            term: 'about / almost',
            meaningVi: 'khoảng',
          },
          {
            meaningVi: 'almost đứng trước cụm từ chỉ số lượng',
          },
        ],
      },
      {
        term: 'ask',
        pos: 'v',
        meaningVi: 'hỏi, yêu cầu',
        extensions: [
          {
            term: 'ask A to (do)',
            meaningVi: 'yêu cầu A làm gì',
          },
          {
            term: 'ask more information',
            meaningVi: 'hỏi thêm thông tin',
          },
        ],
      },
      {
        term: 'attend',
        pos: 'v',
        meaningVi: 'tham dự',
        extensions: [
          {
            term: 'attendance',
            pos: 'n',
            meaningVi: 'sự tham dự',
          },
          {
            term: 'attendee',
            pos: 'n',
            meaningVi: 'người tham dự',
          },
          {
            term: 'attend a meeting',
            meaningVi: 'dự một cuộc mít tinh',
          },
          {
            term: 'attendance record',
            meaningVi: 'bản điểm danh',
          },
        ],
      },
      {
        term: 'attract',
        pos: 'v',
        meaningVi: 'thu hút',
        extensions: [
          {
            term: 'attractive',
            pos: 'adj',
            meaningVi: 'quyến rũ',
          },
          {
            term: 'attraction',
            pos: 'n',
            meaningVi: 'sự thu hút',
          },
          {
            term: 'attract many tourists',
            meaningVi: 'thu hút nhiều du khách',
          },
        ],
      },
      {
        term: 'attribute',
        pos: 'v',
        meaningVi: 'được cho là do/ là nhờ',
        extensions: [
          {
            term: "attribute economic improvement to the government's policy",
            meaningVi:
              'cho rằng sự cải thiện kinh tế là nhờ vào chính sách của chính phủ',
          },
        ],
      },
      {
        term: 'authorized',
        pos: 'adj',
        meaningVi: 'được chấp thuận, ủy quyền',
        extensions: [
          {
            term: 'authorize',
            pos: 'v',
            meaningVi: 'ủy quyền, cho phép',
          },
          {
            term: 'authority',
            pos: 'n',
            meaningVi: 'quyền lực',
          },
          {
            term: 'authorize the purchase',
            meaningVi: 'chấp thuận mua',
          },
        ],
      },
      {
        term: 'available',
        pos: 'adj',
        meaningVi: 'có sẵn, sẵn sàng',
        extensions: [
          {
            term: 'availability',
            pos: 'n',
            meaningVi: 'sự sẵn có',
          },
          {
            term: 'A duplicate of the contracts is available',
            meaningVi: 'Bản sao hợp đồng có sẵn ở đây',
          },
        ],
      },
      {
        term: 'avoid',
        pos: 'v',
        meaningVi: 'ngăn ngừa tránh',
        extensions: [
          {
            term: 'avoid an economic slump',
            meaningVi: 'ngăn ngừa sự khủng hoảng kinh tế',
          },
        ],
      },
      {
        term: 'because',
        pos: 'conj',
        meaningVi: 'bởi vì',
        extensions: [
          {
            term: 'because of',
            pos: 'prep',
            meaningVi: 'bởi vì',
          },
          {
            term: 'because it was submitted late',
            meaningVi: 'bởi vì nó được gửi đến trễ',
          },
          {
            term: 'due to + N',
            meaningVi: 'bởi vì (=owing to)',
          },
          {
            term: 'due to the financial problem',
            meaningVi: 'vì vấn đề tài chính',
          },
        ],
      },
      {
        term: 'become',
        pos: 'v',
        meaningVi: 'trở nên',
        extensions: [
          {
            term: 'become available',
            meaningVi: 'có sẵn, rảnh',
          },
        ],
      },
      {
        term: 'before',
        pos: 'conj, prep',
        meaningVi: 'trước khi',
        extensions: [
          {
            term: 'before you leave the office',
            meaningVi: 'trước khi bạn rời văn phòng',
          },
        ],
      },
      {
        term: 'bill',
        pos: 'v, n',
        meaningVi: '(v) kê khai; (n) hóa đơn',
        extensions: [
          {
            term: 'be billed directly by',
            meaningVi: 'được kê khai trực tiếp bởi….',
          },
          {
            term: 'pay a bill',
            meaningVi: 'trả tiền (hóa đơn)',
          },
          {
            term: 'billing statement',
            meaningVi: 'bản kê khai',
          },
        ],
      },
      {
        term: 'charge',
        pos: 'v, n',
        meaningVi: '(v) tính vào; (n) phí',
        extensions: [
          {
            term: 'Be in charge of',
            meaningVi: 'đảm nhiệm',
          },
          {
            term: 'charge',
            pos: 'n',
            meaningVi: 'sự trông nom, coi sóc',
          },
          {
            term: 'in charge of',
            meaningVi: 'chịu trách nhiệm về',
          },
          {
            term: 'shipping charges',
            meaningVi: 'phí chở hàng',
          },
        ],
      },
      {
        term: 'check',
        pos: 'v, n',
        meaningVi: '(v) kiểm tra; (n) ngân phiếu',
        extensions: [
          {
            term: 'be checked regularly',
            meaningVi: 'được kiểm tra thường xuyên',
          },
          {
            term: 'pay by check',
            meaningVi: 'thanh toán bằng ngân phiếu',
          },
        ],
      },
      {
        term: 'choose',
        pos: 'v',
        meaningVi: 'chọn lựa',
        extensions: [
          {
            term: 'choice',
            pos: 'n',
            meaningVi: 'lựa chọn',
          },
          {
            term: 'choose accounting',
            meaningVi: 'chọn lựa cách thanh toán',
          },
        ],
      },
      {
        term: 'clearly',
        pos: 'adv',
        meaningVi: 'một cách rõ ràng, rành mạch',
        extensions: [
          {
            term: 'clear',
            pos: 'adj',
            meaningVi: 'rõ ràng',
          },
          {
            term: 'it is clear that',
            meaningVi: 'rõ ràng là…',
          },
          {
            term: 'speak clearly',
            meaningVi: 'nói rõ ràng',
          },
        ],
      },
      {
        term: 'close',
        pos: 'v',
        meaningVi: 'đóng',
        extensions: [
          {
            term: 'closely',
            pos: 'adv',
            meaningVi: 'một cách chặt chẽ, kỹ càng',
          },
          {
            term: 'close',
            pos: 'adj',
            meaningVi: 'gần, cẩn thận, chi tiết',
          },
        ],
      },
      {
        term: 'collaboratively',
        pos: 'adv',
        meaningVi: '(hợp tác) với nhau',
        extensions: [
          {
            term: 'collaborate',
            pos: 'v',
            meaningVi: 'cộng tác',
          },
          {
            term: 'collaborative',
            pos: 'adj',
            meaningVi: 'cộng tác',
          },
          {
            term: 'work collaboratively',
            meaningVi: 'hợp tác với nhau',
          },
        ],
      },
      {
        term: 'complaint',
        pos: 'n',
        meaningVi: 'lời phàn nàn',
        extensions: [
          {
            term: 'complain',
            pos: 'v',
            meaningVi: 'than phiền, phàn nàn',
          },
          {
            term: 'complaint form',
            meaningVi: 'mẫu đơn than phiền',
          },
          {
            term: 'make a complaint',
            meaningVi: 'than phiền',
          },
        ],
      },
      {
        term: 'completely',
        pos: 'adv',
        meaningVi: '(một cách) hoàn toàn',
        extensions: [
          {
            term: 'complete',
            pos: 'v',
            meaningVi: 'hoàn thành',
          },
          {
            term: 'completion',
            pos: 'n',
            meaningVi: 'sự hoàn thành',
          },
        ],
      },
      {
        term: 'condition',
        pos: 'n',
        meaningVi: 'tình trạng',
        extensions: [
          {
            term: 'conditions',
            pos: 'n',
            meaningVi: 'điều kiện',
          },
        ],
      },
      {
        term: 'conduct',
        pos: 'v',
        meaningVi: 'tiến hành',
        extensions: [
          {
            term: 'conduct a survey / a study / an inspection',
            meaningVi: 'tiến hành một cuộc khảo sát/nghiên cứu/điều tra',
          },
        ],
      },
      {
        term: 'confirm',
        pos: 'v',
        meaningVi: 'xác nhận',
        extensions: [
          {
            term: 'confirmation',
            pos: 'n',
            meaningVi: 'sự xác nhận',
          },
          {
            term: 'confirm a reservation',
            meaningVi: 'xác nhận đặt chỗ',
          },
        ],
      },
      {
        term: 'consider',
        pos: 'v',
        meaningVi: 'xem xét, cân nhắc',
        extensions: [
          {
            term: 'considerable',
            pos: 'adj',
            meaningVi: 'đáng kể',
          },
          {
            term: 'consideration',
            pos: 'n',
            meaningVi: 'việc xem xét',
          },
        ],
      },
      {
        term: 'considerable',
        pos: 'adj',
        meaningVi: 'đáng kể',
        extensions: [
          {
            term: 'considerable efforts',
            meaningVi: 'nỗ lực to lớn',
          },
          {
            term: 'take into consideration',
            meaningVi: 'xem xét việc gì',
          },
        ],
      },
      {
        term: 'construct',
        pos: 'v',
        meaningVi: 'xây dựng',
        extensions: [
          {
            term: 'construction',
            pos: 'n',
            meaningVi: 'việc xây dựng',
          },
          {
            term: 'constructive',
            pos: 'adj',
            meaningVi: 'mang tính xây dựng',
          },
          {
            term: 'construction of the new plant',
            meaningVi: 'việc thi công nhà máy mới',
          },
        ],
      },
      {
        term: 'construction',
        pos: 'n',
        meaningVi: 'việc thi công',
        extensions: [
          {
            term: 'construction site',
            meaningVi: 'công trường',
          },
          {
            term: 'constructive criticism',
            meaningVi: 'sự phê bình mang tính xây dựng',
          },
        ],
      },
      {
        term: 'consultant',
        pos: 'n',
        meaningVi: 'cố vấn',
        extensions: [
          {
            term: 'consult',
            pos: 'v',
            meaningVi: 'cố vấn',
          },
          {
            term: 'a financial consultant',
            meaningVi: 'cố vấn tài chính',
          },
        ],
      },
    ],
  },
  {
    title: 'Part 5–6 · Từ vựng 2 (contact – invite)',
    description:
      'Từ cơ bản và từ mở rộng Part 5–6, theo tài liệu "600 từ vựng TOEIC Part 5 & 6" (IMAX TOEIC).',
    topic: 'Part 5–6',
    cards: [
      {
        term: 'contact',
        pos: 'v, n',
        meaningVi: '(v) liên lạc; (n) sự liên lạc',
        extensions: [
          {
            term: 'contact the sales department',
            meaningVi: 'liên lạc với phòng kinh doanh',
          },
        ],
      },
      {
        term: 'continue',
        pos: 'v',
        meaningVi: 'tiếp tục',
        extensions: [
          {
            term: 'continuing',
            pos: 'adj',
            meaningVi: 'liên tục',
          },
          {
            term: 'a continuing rise in stock prices',
            meaningVi: 'giá chứng khoán liên tục leo thang',
          },
        ],
      },
      {
        term: 'contribution',
        pos: 'n',
        meaningVi: 'sự đóng góp',
        extensions: [
          {
            term: 'contribute to + sth/ make a contribution to + sth/',
            meaningVi: 'đóng góp cho',
          },
        ],
      },
      {
        term: 'convenience',
        pos: 'n',
        meaningVi: 'sự thuận tiện',
        extensions: [
          {
            term: 'inconvenience',
            pos: 'n',
            meaningVi: 'sự bất tiện',
          },
          {
            term: 'convenient',
            pos: 'adj',
            meaningVi: 'thuận tiện',
          },
          {
            term: 'inconvenient',
            pos: 'adj',
            meaningVi: 'bất tiện',
          },
          {
            term: "at one's earliest convenience",
            meaningVi: 'sao cho tiện nhất',
          },
        ],
      },
      {
        term: 'creative',
        pos: 'adj',
        meaningVi: 'sáng tạo',
        extensions: [
          {
            term: 'create',
            pos: 'v',
            meaningVi: 'tạo ra',
          },
          {
            term: 'creation',
            pos: 'n',
            meaningVi: 'sự sáng tác/sáng tạo',
          },
          {
            term: 'creativity',
            pos: 'n',
            meaningVi: 'tính sáng tạo',
          },
          {
            term: 'creative ideas',
            meaningVi: 'ý tưởng sáng tạo',
          },
        ],
      },
      {
        term: 'currently',
        pos: 'adv',
        meaningVi: 'hiện tại',
        extensions: [
          {
            term: 'current',
            pos: 'adj',
            meaningVi: 'hiện tại',
          },
          {
            term: 'be currently closed for renovations',
            meaningVi: 'hiện tại được đóng cửa để nâng cấp',
          },
        ],
      },
      {
        term: 'defective',
        pos: 'adj',
        meaningVi: 'có lỗi',
        extensions: [
          {
            term: 'defect',
            pos: 'n',
            meaningVi: 'sự khiếm khuyết',
          },
          {
            term: 'defective merchandise',
            meaningVi: 'hàng bị lỗi',
          },
        ],
      },
      {
        term: 'deliver',
        pos: 'v',
        meaningVi: 'phân phát',
        extensions: [
          {
            term: 'delivery',
            pos: 'n',
            meaningVi: 'việc phân phát',
          },
          {
            term: 'deliver a speech',
            meaningVi: 'phát biểu',
          },
          {
            term: 'refuse the delivery',
            meaningVi: 'từ chối giao hàng',
          },
        ],
      },
      {
        term: 'deposit',
        pos: 'v, n',
        meaningVi: '(v) đặt cọc; (n) tiền cọc',
        extensions: [
          {
            term: 'deposit',
            pos: 'n',
            meaningVi: 'tiền cọc',
          },
          {
            term: 'Checks must be deposited by noon',
            meaningVi: 'Ngân phiếu phải được đặt cọc trước buổi trưa',
          },
        ],
      },
      {
        term: 'design',
        pos: 'v, n',
        meaningVi: '(v) thiết kế; (n) đồ án, bản thiết kế',
        extensions: [
          {
            term: 'designer',
            pos: 'n',
            meaningVi: 'nhà thiết kế',
          },
          {
            term: 'be designed to do',
            meaningVi: 'được thiết kế để ...',
          },
        ],
      },
      {
        term: 'develop',
        pos: 'n',
        meaningVi: 'phát triển',
        extensions: [
          {
            term: 'development',
            pos: 'n',
            meaningVi: 'sự phát triển',
          },
          {
            term: 'developer',
            pos: 'n',
            meaningVi: 'nhà phát triển',
          },
          {
            term: 'the first stage of development',
            meaningVi: 'bước đầu của sự phát triển',
          },
        ],
      },
      {
        term: 'direct',
        pos: 'v',
        meaningVi: 'chỉ dẫn, quản lý',
        extensions: [
          {
            term: 'directly',
            pos: 'adv',
            meaningVi: 'một cách trực tiếp',
          },
          {
            term: 'direction',
            pos: 'n',
            meaningVi: 'phương hướng',
          },
        ],
      },
      {
        term: 'discuss',
        pos: 'v',
        meaningVi: 'thảo luận',
        extensions: [
          {
            term: 'discussion',
            pos: 'n',
            meaningVi: 'sự thảo luận',
          },
          {
            meaningVi: 'discuss about the delay (sai)',
          },
          {
            meaningVi: 'discuss the delay (đúng)',
          },
        ],
      },
      {
        term: 'display',
        pos: 'v',
        meaningVi: 'trưng bày hiển thị',
        extensions: [
          {
            term: 'Maps are displayed',
            meaningVi: 'Bản đồ được hiển thị',
          },
        ],
      },
      {
        term: 'distribute',
        pos: 'v',
        meaningVi: 'phân phối',
        extensions: [
          {
            term: 'distribution',
            pos: 'n',
            meaningVi: 'việc phân phối',
          },
          {
            term: 'distributor',
            pos: 'n',
            meaningVi: 'nhà phân phối',
          },
          {
            term: 'distribute the document',
            meaningVi: 'phát tài liệu',
          },
        ],
      },
      {
        term: 'document',
        pos: 'n, v',
        meaningVi: '(n) tài liệu; (v) dẫn chứng = tài liệu',
        extensions: [
          {
            term: 'document all transactions',
            meaningVi: 'chứng minh giao dịch',
          },
        ],
      },
      {
        term: 'efficiently',
        pos: 'adv',
        meaningVi: 'một cách hiệu quả',
        extensions: [
          {
            term: 'efficient',
            pos: 'adj',
            meaningVi: 'có năng lực/ hiệu quả',
          },
          {
            term: 'efficiency',
            pos: 'n',
            meaningVi: 'sự hiệu quả',
          },
          {
            term: 'run the department efficiently',
            meaningVi: 'điều hành bộ phận một cách hiệu quả',
          },
        ],
      },
      {
        term: 'elect',
        pos: 'v',
        meaningVi: 'bầu cử',
        extensions: [
          {
            term: 'election',
            pos: 'n',
            meaningVi: 'cuộc bầu cử',
          },
          {
            term: 'Mr. Pierce was elected as vice president',
            meaningVi: 'Ông Pierce được bầu làm phó chủ tịch',
          },
        ],
      },
      {
        term: 'employee',
        pos: 'n',
        meaningVi: 'nhân viên',
        extensions: [
          {
            term: 'employ',
            pos: 'v',
            meaningVi: 'thuê',
          },
          {
            term: 'employer',
            pos: 'n',
            meaningVi: 'chủ (người thuê)',
          },
          {
            term: 'employment',
            pos: 'n',
            meaningVi: 'việc thuê, việc làm',
          },
          {
            term: 'long-term employment',
            meaningVi: 'việc làm dài hạn',
          },
        ],
      },
      {
        term: 'encouragement',
        pos: 'n',
        meaningVi: 'sự khuyến khích',
        extensions: [
          {
            term: 'encourage',
            pos: 'v',
            meaningVi: 'khuyến khích',
          },
          {
            term: 'encouraging',
            pos: 'adj',
            meaningVi: 'mang tính khích lệ',
          },
          {
            term: 'encourage+A+to do',
            meaningVi: 'khuyến khích A làm',
          },
        ],
      },
      {
        term: 'expand',
        pos: 'v',
        meaningVi: 'mở rộng',
        extensions: [
          {
            term: 'expansion',
            pos: 'n',
            meaningVi: 'sự mở rộng',
          },
          {
            term: 'expand its market',
            meaningVi: 'mở rộng thị trường',
          },
        ],
      },
      {
        term: 'experienced',
        pos: 'adj',
        meaningVi: 'có kinh nghiệm',
        extensions: [
          {
            term: 'an experienced manager',
            meaningVi: 'nhà quản lý có kinh nghiệm',
          },
          {
            term: 'be experienced in',
            meaningVi: 'có kinh nghiệm trong (lĩnh vực)',
          },
        ],
      },
      {
        term: 'explain',
        pos: 'v',
        meaningVi: 'giải thích',
        extensions: [
          {
            term: 'explanation',
            pos: 'n',
            meaningVi: 'lời giải thích',
          },
          {
            term: 'The problem was explained',
            meaningVi: 'Vấn đề đã được giải thích',
          },
        ],
      },
      {
        term: 'extend',
        pos: 'v',
        meaningVi: 'mở rộng',
        extensions: [
          {
            term: 'extensive',
            pos: 'adj',
            meaningVi: 'có phạm vi rộng',
          },
          {
            term: 'extension',
            pos: 'n',
            meaningVi: 'sự mở rộng',
          },
        ],
      },
      {
        term: 'extensive',
        pos: 'adj',
        meaningVi: 'có phạm vi rộng',
        extensions: [
          {
            term: 'extend',
            pos: 'v',
            meaningVi: 'mở rộng',
          },
          {
            term: 'extension',
            pos: 'n',
            meaningVi: 'sự mở rộng',
          },
          {
            term: 'conduct an extensive search',
            meaningVi: 'tiến hành tìm kiếm mở rộng',
          },
        ],
      },
      {
        term: 'extremely',
        pos: 'adv',
        meaningVi: 'cực kỳ',
        extensions: [
          {
            term: 'extremely competitive business world',
            meaningVi: 'một thế giới kinh doanh vô cùng cạnh tranh',
          },
        ],
      },
      {
        term: 'final',
        pos: 'adj',
        meaningVi: 'cuối cùng',
        extensions: [
          {
            term: 'finally',
            pos: 'adv',
            meaningVi: 'cuối cùng',
          },
          {
            term: 'final conclusions',
            meaningVi: 'kết luận cuối cùng',
          },
          {
            term: 'be finally distributed',
            meaningVi: 'cuối cùng cũng được phân phát',
          },
        ],
      },
      {
        term: 'handle',
        pos: 'v',
        meaningVi: 'xử lý, giải quyết',
        extensions: [
          {
            term: 'deal with',
            pos: 'v',
            meaningVi: 'xử lý, giải quyết',
          },
        ],
      },
      {
        // The handout prints the meanings of "hard" here; corrected
        term: 'hardly',
        pos: 'adv',
        meaningVi: 'hầu như không, hiếm khi',
        extensions: [
          {
            term: 'hard',
            pos: 'adj, adv',
            meaningVi: '(adj) khó; (adv) chăm chỉ',
          },
        ],
      },
      {
        term: 'highly',
        pos: 'adv',
        meaningVi: 'cực kì, cao độ',
        extensions: [
          {
            term: 'Financial incentives are highly recommended',
            meaningVi:
              'những biện pháp khuyến khích tài chính được đánh giá cao',
          },
        ],
      },
      {
        term: 'hold',
        pos: 'v',
        meaningVi: 'giữ, tổ chức',
        extensions: [
          {
            term: 'hold a press conference',
            meaningVi: 'tổ chức họp báo',
          },
          {
            term: 'The conference will be held in New York',
            meaningVi: 'Hội nghị sẽ được tổ chức ở New York.',
          },
        ],
      },
      {
        term: 'if',
        pos: 'conj',
        meaningVi: 'nếu như',
        extensions: [
          {
            term: 'once',
            pos: 'conj',
            meaningVi: 'khi',
          },
          {
            term: 'unless',
            pos: 'conj',
            meaningVi: 'trừ phi',
          },
        ],
      },
      {
        term: 'implement',
        pos: 'v',
        meaningVi: 'thi hành',
        extensions: [
          {
            term: 'implementation',
            pos: 'n',
            meaningVi: 'việc thi hành',
          },
          {
            term: 'implement new procedures',
            meaningVi: 'áp dụng thủ tục mới',
          },
        ],
      },
      {
        term: 'impress',
        pos: 'v',
        meaningVi: 'gây ấn tượng',
        extensions: [
          {
            term: 'impress',
            pos: 'v',
            meaningVi: 'gây ấn tượng',
          },
          {
            term: 'impression',
            pos: 'n',
            meaningVi: 'ấn tượng',
          },
          {
            term: 'impressive new cars',
            meaningVi: 'những chiếc xe hơi mới ấn tượng',
          },
        ],
      },
      {
        term: 'increasingly',
        pos: 'adv',
        meaningVi: 'theo chiều gia tăng',
        extensions: [
          {
            term: 'increase',
            pos: 'v, n',
            meaningVi: '(v) gia tăng; (n) sự tăng lên',
          },
          {
            term: 'increasingly',
            pos: 'adj',
            meaningVi: 'gia tăng',
          },
          {
            term: 'an increasingly competitive market',
            meaningVi: 'một thị trường ngày càng cạnh tranh',
          },
        ],
      },
      {
        term: 'inform',
        pos: 'v',
        meaningVi: 'thông báo',
        extensions: [
          {
            term: 'inform A of B',
            meaningVi: 'báo cho A về B',
          },
          {
            term: 'tell A about B',
          },
        ],
      },
      {
        term: 'inspect',
        pos: 'v',
        meaningVi: 'điều tra kiểm tra',
        extensions: [
          {
            term: 'inspection',
            pos: 'n',
            meaningVi: 'việc điều tra/kiểm tra',
          },
          {
            term: 'inspector',
            pos: 'n',
            meaningVi: 'thanh tra',
          },
          {
            term: 'inspect the quality',
            meaningVi: 'kiểm tra chất lượng',
          },
          {
            term: 'conduct an inspection',
            meaningVi: 'tổ chức điều tra',
          },
        ],
      },
      {
        term: 'interest',
        pos: 'n',
        meaningVi: 'mối quan tâm/ lợi nhuận',
        extensions: [
          {
            term: 'interested',
            pos: 'adj',
            meaningVi: 'quan tâm',
          },
          {
            term: 'interest rate',
            pos: 'n',
            meaningVi: 'lãi suất',
          },
          {
            term: 'be interested in',
            meaningVi: 'quan tâm tới',
          },
          {
            term: "be in the company's best interest",
            meaningVi: 'vì lợi ích cao nhất của công ty',
          },
        ],
      },
      {
        term: 'introduce',
        pos: 'v',
        meaningVi: 'giới thiệu',
        extensions: [
          {
            term: 'introduction',
            pos: 'n',
            meaningVi: 'việc giới thiệu',
          },
          {
            term: 'introduce a new product',
            meaningVi: 'giới thiệu mặt hàng mới',
          },
        ],
      },
      {
        term: 'invite',
        pos: 'v',
        meaningVi: 'mời',
        extensions: [
          {
            term: 'invitation',
            pos: 'n',
            meaningVi: 'lời mời',
          },
          {
            term: 'send formal invitations',
            meaningVi: 'gửi lời mời chính thức',
          },
          {
            term: 'be invited to do',
            meaningVi: 'được mời làm gì',
          },
        ],
      },
    ],
  },
  {
    title: 'Part 5–6 · Từ vựng 3 (late – represent)',
    description:
      'Từ cơ bản và từ mở rộng Part 5–6, theo tài liệu "600 từ vựng TOEIC Part 5 & 6" (IMAX TOEIC).',
    topic: 'Part 5–6',
    cards: [
      {
        term: 'late',
        pos: 'adj, adv',
        meaningVi: 'trễ',
        extensions: [
          {
            term: 'lately',
            pos: 'adv',
            meaningVi: 'gần đây',
          },
          {
            meaningVi: 'thường dùng trong hiện tại hoàn thành',
          },
        ],
      },
      {
        term: 'join',
        pos: 'v',
        meaningVi: 'tham gia',
        extensions: [
          {
            term: 'join the club',
            meaningVi: 'gia nhập câu lạc bộ',
          },
          {
            meaningVi: 'join không đi kèm với giới từ',
          },
        ],
      },
      {
        term: 'leave',
        pos: 'v, n',
        meaningVi: '(v) ra khỏi, để lại; (n) sự cho phép',
        extensions: [
          {
            term: 'a leave of absence',
            meaningVi: 'vắng mặt có phép',
          },
          {
            term: 'leave your hotel key',
            meaningVi: 'để lại chìa khóa khách sạn',
          },
          {
            term: 'leave immediately for Singapore',
            meaningVi: 'đi Singapore ngay lập tức',
          },
        ],
      },
      {
        term: 'likely',
        pos: 'adj',
        meaningVi: 'có thể, có khả năng, có cơ may',
        extensions: [
          {
            term: 'like',
            pos: 'v, prep',
            meaningVi: '(v) thích; (prep) giống',
          },
          {
            term: 'Kane is likely to finish the project',
            meaningVi: 'Kane có khả năng hoàn thành dự án.',
          },
        ],
      },
      {
        term: 'limited',
        pos: 'adj',
        meaningVi: 'hạn chế',
        extensions: [
          {
            term: 'limit',
            pos: 'n',
            meaningVi: '(n) giới hạn, hạn chế; (n) ranh giới',
          },
          {
            term: 'limitation',
            pos: 'n',
            meaningVi: 'sự hạn chế, mặt hạn chế',
          },
        ],
      },
      {
        term: 'meet',
        pos: 'v',
        meaningVi: 'đáp ứng',
        extensions: [
          {
            term: 'meet',
            pos: 'v',
            meaningVi: 'đáp ứng',
          },
          {
            term: 'meet the needs / goal / deadline / demand',
          },
        ],
      },
      {
        term: 'need',
        pos: 'v, n',
        meaningVi: '(v) cần; (n) nhu cầu',
        extensions: [
          {
            term: "meet one's needs",
            meaningVi: 'đáp ứng nhu cầu của ai',
          },
          {
            term: 'need to do',
            meaningVi: 'cần làm gì',
          },
        ],
      },
      {
        term: 'notice',
        pos: 'n',
        meaningVi: 'sự thông báo',
        extensions: [
          {
            term: 'notices',
            pos: 'n',
            meaningVi: 'mẫu thông báo',
          },
        ],
      },
      {
        term: 'notify',
        pos: 'v',
        meaningVi: 'thông báo',
        extensions: [
          {
            term: 'notification',
            pos: 'n',
            meaningVi: 'việc thông báo',
          },
          {
            term: 'written notification',
            meaningVi: 'thông báo bằng văn bản',
          },
          {
            term: 'notify the client',
            meaningVi: 'thông báo cho khách hàng',
          },
        ],
      },
      {
        term: 'observe',
        pos: 'v',
        meaningVi: 'tuân theo',
        extensions: [
          {
            term: 'comply with',
            pos: 'v',
            meaningVi: 'tuân theo',
          },
        ],
      },
      {
        term: 'offer',
        pos: 'v',
        meaningVi: 'cung cấp',
        extensions: [
          {
            term: 'offer sb sth/ provide sb with sth',
            meaningVi: 'cung cấp cho ai cái gì',
          },
        ],
      },
      {
        term: 'open',
        pos: 'v',
        meaningVi: 'mở, khai trương',
        extensions: [
          {
            term: 'opening',
            pos: 'n',
            meaningVi: 'cơ hội',
          },
          {
            term: 'job openings',
            meaningVi: 'những cơ hội nghề nghiệp',
          },
          {
            term: 'open a new exhibition',
            meaningVi: 'khai trương cuộc triển lãm',
          },
          {
            term: 'open an account',
            meaningVi: 'mở tài khoản',
          },
        ],
      },
      {
        term: 'order',
        pos: 'v, n',
        meaningVi: '(v) ra lệnh, đặt hàng; (n) đơn hàng, thứ tự',
        // The handout repeats the phrases of "need" here and prints these under "originally"
        extensions: [
          {
            term: 'orderly',
            pos: 'adj',
            meaningVi: 'theo thứ tự',
          },
          {
            term: 'out of order',
            meaningVi: 'bị hư hỏng',
          },
          {
            term: 'in order to V',
            meaningVi: 'để làm gì',
          },
          {
            term: 'Office supplies have been ordered',
            meaningVi: 'dụng cụ văn phòng đã được đặt',
          },
        ],
      },
      {
        term: 'originally',
        pos: 'adv',
        meaningVi: 'ban đầu, lúc đầu',
        // Handout: "trước tiên", with the phrases of "order" (moved there); this one written for Lingo
        extensions: [
          {
            term: 'original',
            pos: 'adj',
            meaningVi: 'ban đầu, nguyên bản',
          },
        ],
      },
      {
        term: 'participate',
        pos: 'v',
        meaningVi: 'tham gia',
        extensions: [
          {
            term: 'participation',
            pos: 'n',
            meaningVi: 'sự tham gia',
          },
          {
            term: 'participant',
            pos: 'n',
            meaningVi: 'người tham gia',
          },
          {
            term: 'participate in',
            meaningVi: 'tham gia vào',
          },
          {
            term: 'conference participants',
            meaningVi: 'người tham dự hội nghị',
          },
        ],
      },
      {
        term: 'pay',
        pos: 'v',
        meaningVi: 'thanh toán',
        extensions: [
          {
            term: 'pay the rent',
            meaningVi: 'thanh toán tiền thuê',
          },
        ],
      },
      {
        term: 'perform',
        pos: 'v',
        meaningVi: 'biểu diễn',
        extensions: [
          {
            term: 'performance',
            pos: 'n',
            meaningVi: 'buổi biểu diễn',
          },
          {
            term: 'during the performance',
            meaningVi: 'trong suốt buổi diễn',
          },
        ],
      },
      {
        term: 'permission',
        pos: 'n',
        meaningVi: 'sự cho phép',
        extensions: [
          {
            term: 'permit',
            pos: 'n',
            meaningVi: 'giấy phép',
          },
        ],
      },
      {
        term: 'persuasive',
        pos: 'adj',
        meaningVi: 'mang tính thuyết phục',
        extensions: [
          {
            term: 'persuade',
            pos: 'v',
            meaningVi: 'thuyết phục',
          },
          {
            term: 'persuasive arguments',
            meaningVi: 'lý lẽ thuyết phục',
          },
        ],
      },
      {
        term: 'post',
        pos: 'v, n',
        meaningVi: '(v) đăng; (n) thư',
        extensions: [
          {
            term: 'a notice has been posted',
            meaningVi: 'một thông báo vừa được đăng lên',
          },
          {
            term: 'post office',
            meaningVi: 'bưu điện',
          },
        ],
      },
      {
        term: 'postpone',
        pos: 'v',
        meaningVi: 'hoãn, hoãn lại',
        extensions: [
          {
            term: 'postponement',
            pos: 'n',
            meaningVi: 'sự trì hoãn',
          },
          {
            term: 'The meeting will be postponed',
            meaningVi: 'Cuộc mít tinh sẽ bị hoãn lại.',
          },
        ],
      },
      {
        term: 'present',
        pos: 'n, v, adj',
        meaningVi: '(n) hiện tại; (v) giới thiệu; (adj) có mặt',
        extensions: [
          {
            term: 'presentation',
            pos: 'n',
            meaningVi: 'bài giới thiệu',
          },
          {
            term: 'presently',
            pos: 'adv',
            meaningVi: 'hiện tại',
          },
          {
            term: 'the present production schedule',
            meaningVi: 'kế hoạch sản xuất hiện tại',
          },
        ],
      },
      {
        term: 'probably',
        pos: 'adv',
        meaningVi: 'hầu như chắc chắn',
        extensions: [
          {
            term: 'probable',
            pos: 'adj',
            meaningVi: 'có thể có',
          },
          {
            term: 'probable investors',
            meaningVi: 'những người có nhiều khả năng sẽ đầu tư',
          },
        ],
      },
      {
        term: 'produce',
        pos: 'v',
        meaningVi: 'sản xuất',
        extensions: [
          {
            term: 'product',
            pos: 'n',
            meaningVi: 'sản phẩm',
          },
          {
            term: 'production',
            pos: 'n',
            meaningVi: 'việc sản xuất',
          },
          {
            term: 'productivity',
            pos: 'n',
            meaningVi: 'năng suất',
          },
          {
            term: 'productive',
            pos: 'adj',
            meaningVi: 'có năng suất',
          },
        ],
      },
      {
        term: 'prohibit',
        pos: 'v',
        meaningVi: 'ngăn cản cấm',
        extensions: [
          {
            term: 'prohibit sb from Ving',
            meaningVi: 'cấm ai làm gì',
          },
        ],
      },
      {
        term: 'promising',
        pos: 'adj',
        meaningVi: 'đầy hứa hẹn',
        extensions: [
          {
            term: 'promise',
            pos: 'v, n',
            meaningVi: '(v) hứa; (n) lời hứa',
          },
          {
            term: 'the most promising candidate',
            meaningVi: 'ứng viên đầy hứa hẹn nhất',
          },
        ],
      },
      {
        term: 'promotion',
        pos: 'n',
        meaningVi: 'sự khuyến mãi',
        extensions: [
          {
            term: 'promote',
            pos: 'v',
            meaningVi: 'khuyến mãi',
          },
          {
            term: 'announce the promotion',
            meaningVi: 'công bố đợt khuyến mãi',
          },
        ],
      },
      {
        term: 'promptly',
        pos: 'adv',
        meaningVi: 'ngay lập tức, chính xác',
        extensions: [
          {
            term: 'prompt',
            pos: 'adj',
            meaningVi: 'mau lẹ, nhanh chóng',
          },
          {
            term: 'leave promptly at 7',
            meaningVi: 'rời khỏi lúc đúng 7 giờ',
          },
        ],
      },
      {
        term: 'propose',
        pos: 'v',
        meaningVi: 'đề nghị/ đề xuất',
        extensions: [
          {
            term: 'proposal',
            pos: 'n',
            meaningVi: 'bản đề xuất/ lời đề nghị',
          },
          {
            term: 'propose to widen the road',
            meaningVi: 'đề nghị mở rộng đường',
          },
        ],
      },
      {
        term: 'purchase',
        pos: 'v, n',
        meaningVi: '(v) mua hàng; (n) việc mua hàng',
        extensions: [
          {
            term: 'purchases',
            pos: 'n',
            meaningVi: 'hàng hóa (được mua)',
          },
        ],
      },
      {
        term: 'quickly',
        pos: 'adv',
        meaningVi: 'nhanh chóng',
        extensions: [
          {
            term: 'quick',
            pos: 'adj',
            meaningVi: 'nhanh',
          },
          {
            term: 'take quick action',
            meaningVi: 'hành động nhanh',
          },
          {
            term: 'as quickly as possible',
            meaningVi: 'càng nhanh càng tốt',
          },
        ],
      },
      {
        term: 'raise',
        pos: 'v',
        meaningVi: 'đưa ra',
        extensions: [
          {
            term: 'raise questions',
            meaningVi: 'đặt câu hỏi',
          },
        ],
      },
      {
        term: 'reach',
        pos: 'v',
        meaningVi: 'đến',
        extensions: [
          {
            term: 'arrive in/ at',
            meaningVi: 'đến',
          },
        ],
      },
      {
        term: 'receive',
        pos: 'v',
        meaningVi: 'nhận',
        extensions: [
          {
            term: 'receive',
            pos: 'n',
            meaningVi: 'hóa đơn',
          },
          {
            term: 'receive the necessary support',
            meaningVi: 'nhận hỗ trợ cần thiết',
          },
        ],
      },
      {
        term: 'recent',
        pos: 'adj',
        meaningVi: 'gần đây',
        extensions: [
          {
            term: 'recently',
            pos: 'adv',
            meaningVi: 'gần đây',
          },
          {
            term: 'a recent study',
            meaningVi: 'một nghiên cứu gần đây',
          },
        ],
      },
      {
        term: 'recover',
        pos: 'v',
        meaningVi: 'hồi phục',
        extensions: [
          {
            term: 'recovery',
            pos: 'n',
            meaningVi: 'sự hồi phục',
          },
          {
            term: 'recover from',
            meaningVi: 'hồi phục khỏi…',
          },
        ],
      },
      {
        term: 'reduce',
        pos: 'v',
        meaningVi: 'giảm',
        extensions: [
          {
            term: 'reduction',
            pos: 'n',
            meaningVi: 'sự cắt giảm',
          },
          {
            term: 'reduce its staff',
            meaningVi: 'cắt giảm nhân sự',
          },
        ],
      },
      {
        term: 'register',
        pos: 'v',
        meaningVi: 'đăng ký',
        extensions: [
          {
            term: 'registration',
            pos: 'n',
            meaningVi: 'việc đăng ký',
          },
          {
            term: 'registration instructions',
            meaningVi: 'hướng dẫn đăng ký',
          },
        ],
      },
      {
        term: 'reject',
        pos: 'v',
        meaningVi: 'từ chối, bác bỏ',
        extensions: [
          {
            term: 'rejection',
            pos: 'n',
            meaningVi: 'sự từ chối, bác bỏ',
          },
          {
            term: 'rejected the proposed policy',
            meaningVi: 'bác bỏ những điều khoản được đề xuất',
          },
        ],
      },
      {
        term: 'relatively',
        pos: 'adv',
        meaningVi: 'một cách tương đối',
        extensions: [
          {
            term: 'relative',
            pos: 'adj, n',
            meaningVi: '(adj) tương đối; (n) người thân',
          },
          {
            term: 'be relatively expensive',
            meaningVi: 'khá đắt',
          },
        ],
      },
      {
        term: 'remind',
        pos: 'v',
        meaningVi: 'nhắc nhở, làm gọi nhớ',
        extensions: [
          {
            term: 'remind A of B',
            meaningVi: 'làm A nhớ đến B',
          },
          {
            term: 'remind A to do',
            meaningVi: 'nhắc A làm gì',
          },
        ],
      },
      {
        term: 'renew',
        pos: 'v',
        meaningVi: 'làm mới gia hạn',
        extensions: [
          {
            term: 'renewal',
            pos: 'n',
            meaningVi: 'việc đổi mới/ gia hạn',
          },
          {
            term: 'renew a contract',
            meaningVi: 'gia hạn hợp đồng',
          },
        ],
      },
      {
        term: 'represent',
        pos: 'v',
        meaningVi: 'đại diện',
        extensions: [
          {
            term: 'representative',
            pos: 'n',
            meaningVi: 'người đại diện',
          },
          {
            term: 'represent our company',
            meaningVi: 'đại diện cho công ty chúng tôi',
          },
        ],
      },
    ],
  },
  {
    title: 'Part 5–6 · Từ vựng 4 (request – yet)',
    description:
      'Từ cơ bản và từ mở rộng Part 5–6, theo tài liệu "600 từ vựng TOEIC Part 5 & 6" (IMAX TOEIC).',
    topic: 'Part 5–6',
    cards: [
      {
        term: 'request',
        pos: 'v, n',
        meaningVi: '(v) đề nghị; (n) lời đề nghị',
        extensions: [
          {
            term: 'requests for computer upgrades',
            meaningVi: 'đề nghị nâng cấp máy tính',
          },
        ],
      },
      {
        term: 'require',
        pos: 'v',
        meaningVi: 'yêu cầu',
        extensions: [
          {
            term: 'requirement',
            pos: 'n',
            meaningVi: 'yêu cầu',
          },
          {
            term: 'require A to do',
            meaningVi: 'yêu cầu A làm gì',
          },
        ],
      },
      {
        term: 'reserve',
        pos: 'v',
        meaningVi: 'đặt trước, giữ',
        extensions: [
          {
            term: 'reservation',
            pos: 'n',
            meaningVi: 'việc đặt chỗ',
          },
          {
            term: 'reserve the right to refuse',
            meaningVi: 'có quyền từ chối',
          },
        ],
      },
      {
        term: 'retain',
        pos: 'v',
        meaningVi: 'giữ lại',
        extensions: [
          {
            term: 'retention',
            pos: 'n',
            meaningVi: 'sự có được, giữ được',
          },
          {
            term: 'retain competent employees',
            meaningVi: 'giữ được những nhân viên có năng lực',
          },
        ],
      },
      {
        term: 'return',
        pos: 'v',
        meaningVi: 'gửi trả lại, trở lại',
        extensions: [
          {
            term: 'return',
            pos: 'n',
            meaningVi: 'sự trả lại',
          },
        ],
      },
      {
        term: 'review',
        pos: 'v, n',
        meaningVi: '(v) xem lại; (n) việc xem lại, ôn lại',
        extensions: [
          {
            term: 'review the information',
            meaningVi: 'xem lại thông tin',
          },
        ],
      },
      {
        term: 'revise',
        pos: 'v',
        meaningVi: 'sửa lại',
        extensions: [
          {
            term: 'revision',
            pos: 'n',
            meaningVi: 'việc sửa lại',
          },
          {
            term: 'make necessary revisions',
            meaningVi: 'sửa những gì cần thiết',
          },
        ],
      },
      {
        term: 'satisfy',
        pos: 'v',
        meaningVi: 'làm hài lòng/ thỏa mãn',
        extensions: [
          {
            term: 'satisfaction',
            pos: 'n',
            meaningVi: 'sự hài lòng',
          },
          {
            term: 'customer satisfaction',
            meaningVi: 'sự hài lòng của khách hàng',
          },
          {
            term: 'be satisfied with',
            meaningVi: 'hài lòng với…',
          },
        ],
      },
      {
        term: 'schedule',
        pos: 'v, n',
        meaningVi: '(v) lập kế hoạch; (n) kế hoạch',
        extensions: [
          {
            term: 'be scheduled to do',
            meaningVi: 'làm gì theo kế hoạch',
          },
        ],
      },
      {
        term: 'securely',
        pos: 'adv',
        meaningVi: '(một cách) đảm bảo',
        extensions: [
          {
            term: 'security',
            pos: 'n',
            meaningVi: 'an ninh',
          },
          {
            term: 'secure',
            pos: 'adj',
            meaningVi: 'yên tâm, bảo đảm',
          },
          {
            term: 'improve security',
            meaningVi: 'cải thiện an ninh',
          },
        ],
      },
      {
        term: 'send',
        pos: 'v',
        meaningVi: 'gửi',
        extensions: [
          {
            term: 'sender',
            pos: 'n',
            meaningVi: 'người gửi',
          },
          {
            term: 'The document was sent to you.',
            meaningVi: 'Tài liệu đã được gửi cho bạn.',
          },
        ],
      },
      {
        term: 'ship',
        pos: 'v, n',
        meaningVi: '(v) giao hàng; (n) chiếc tàu',
        extensions: [
          {
            term: 'shipment',
            pos: 'n',
            meaningVi: 'việc giao hàng',
          },
          {
            term: 'ship an order',
            meaningVi: 'giao hàng theo đơn đặt hàng',
          },
        ],
      },
      {
        term: 'sign',
        pos: 'v',
        meaningVi: 'kí tên',
        extensions: [
          {
            term: 'signature',
            pos: 'n',
            meaningVi: 'chữ kí',
          },
          {
            term: 'sign a contract',
            meaningVi: 'ký hợp đồng',
          },
        ],
      },
      {
        term: 'significantly',
        pos: 'adv',
        meaningVi: 'một cách quan trọng/đáng kể',
        extensions: [
          {
            term: 'significant',
            pos: 'adj',
            meaningVi: 'quan trọng, đáng kể',
          },
          {
            term: 'cost significantly less',
            meaningVi: 'đỡ hao tổn đáng kể',
          },
        ],
      },
      {
        term: 'since',
        pos: 'conj, prep',
        meaningVi: 'kể từ khi, bởi vì',
        extensions: [
          {
            term: 'since last year',
            meaningVi: 'kể từ năm ngoái',
          },
          {
            term: 'since he was late',
            meaningVi: 'bởi vì anh ấy trễ',
          },
          {
            term: "since you've been gone",
            meaningVi: 'từ khi bạn rời khỏi',
          },
        ],
      },
      {
        term: 'speak',
        pos: 'v',
        meaningVi: 'nói chuyện',
        extensions: [
          {
            term: 'speaker',
            pos: 'n',
            meaningVi: 'diễn giả',
          },
          {
            term: 'speak to the counselor',
            meaningVi: 'nói chuyện với người cố vấn',
          },
        ],
      },
      {
        term: 'submission',
        pos: 'n',
        meaningVi: 'việc đệ trình',
        extensions: [
          {
            term: 'submit',
            pos: 'v',
            meaningVi: 'đệ trình, nộp',
          },
          {
            term: 'submit A to B',
            meaningVi: 'đệ trình A cho B',
          },
        ],
      },
      {
        term: 'suggest',
        pos: 'v',
        meaningVi: 'đề xuất, đề nghị',
        extensions: [
          {
            term: 'suggestion',
            pos: 'n',
            meaningVi: 'đề xuất, đề nghị',
          },
          {
            term: 'suggested',
            pos: 'adj',
            meaningVi: 'được đề xuất',
          },
          {
            term: 'the suggested revisions',
            meaningVi: 'việc xem xét theo đề xuất',
          },
        ],
      },
      {
        term: 'supervise',
        pos: 'v',
        meaningVi: 'giám sát',
        extensions: [
          {
            term: 'supervision',
            pos: 'n',
            meaningVi: 'việc giám sát',
          },
          {
            term: 'supervisor',
            pos: 'n',
            meaningVi: 'người giám sát',
          },
          {
            term: 'immediate supervisor',
            meaningVi: 'người giám sát trực tiếp',
          },
        ],
      },
      {
        term: 'thoroughly',
        pos: 'adv',
        meaningVi: '(một cách) kỹ lưỡng',
        extensions: [
          {
            term: 'thorough',
            pos: 'adj',
            meaningVi: 'kỹ lưỡng',
          },
          {
            term: 'thoroughly analyze',
            meaningVi: 'phân tích kỹ lưỡng',
          },
        ],
      },
      {
        term: 'transfer',
        pos: 'v',
        meaningVi: 'chuyển',
        extensions: [
          {
            term: 'transfer funds',
            meaningVi: 'chuyển quỹ',
          },
          {
            term: 'be transferred to',
            meaningVi: 'được chuyển đến…',
          },
        ],
      },
      {
        term: 'visit',
        pos: 'v, n',
        meaningVi: '(v) thăm viếng; (n) sự thăm viếng',
        extensions: [
          {
            term: 'visitor',
            pos: 'n',
            meaningVi: 'du khách',
          },
          {
            term: 'visit the new office',
            meaningVi: 'thăm văn phòng mới',
          },
        ],
      },
      {
        term: 'when',
        pos: 'conj',
        meaningVi: 'khi',
        extensions: [
          {
            term: 'when you are ready',
            meaningVi: 'khi bạn sẵn sàng',
          },
        ],
      },
      {
        term: 'while',
        pos: 'conj',
        meaningVi: 'trong khi',
        extensions: [
          {
            term: 'during',
            pos: 'prep',
            meaningVi: 'trong suốt (thời gian)',
          },
          {
            term: 'for',
            pos: 'prep',
            meaningVi: 'trong (thời gian)',
          },
        ],
      },
      {
        term: 'wish',
        pos: 'v, n',
        meaningVi: '(v) ước; (n) điều ước',
        extensions: [
          {
            term: 'wish to',
            meaningVi: 'muốn làm gì',
          },
          {
            term: 'make a wish',
            meaningVi: 'ước nguyện',
          },
          {
            term: 'We wish to apologize for an error',
            meaningVi: 'Chúng tôi muốn xin lỗi vì sự nhầm lẫn',
          },
        ],
      },
      {
        term: 'within',
        pos: 'prep',
        meaningVi: 'trong vòng',
        extensions: [
          {
            term: 'within 24 hours',
            meaningVi: 'trong vòng 24 giờ',
          },
          {
            term: "live within one's income",
            meaningVi: 'chỉ sống nhờ vào thu nhập',
          },
        ],
      },
      {
        term: 'work',
        pos: 'n, v',
        meaningVi: '(n) việc làm; (v) làm việc',
        extensions: [
          {
            term: 'worker',
            pos: 'n',
            meaningVi: 'công nhân',
          },
          {
            term: 'technical support workers',
            meaningVi: 'nhân viên phụ trách hỗ trợ kỹ thuật',
          },
        ],
      },
      {
        term: 'write',
        pos: 'v',
        meaningVi: 'viết',
        extensions: [
          {
            term: 'writing',
            pos: 'n',
            meaningVi: 'chữ viết',
          },
          {
            term: 'in writing',
            meaningVi: 'bằng văn bản',
          },
        ],
      },
      {
        term: 'yet',
        pos: 'adv',
        meaningVi: 'chưa = still (adv) vẫn còn',
        extensions: [
          {
            meaningVi:
              'Yet đứng sau từ phủ định “not”, trong khi still đứng trước từ phủ định “not”.',
          },
          {
            meaningVi: 'It has not yet been decided',
          },
          {
            meaningVi: 'It has still not been decided.',
          },
        ],
      },
    ],
  },
  {
    title: 'Part 5–6 · Cụm từ thường gặp',
    description:
      'Các cụm từ hay gặp trong Part 5–6, theo tài liệu "600 từ vựng TOEIC Part 5 & 6" (IMAX TOEIC).',
    topic: 'Part 5–6',
    cards: [
      {
        term: 'a parking permit',
        pos: 'phrase',
        meaningVi: 'giấy phép đỗ xe',
      },
      {
        term: "above one's expectation",
        pos: 'phrase',
        meaningVi: 'vượt ngoài sự mong đợi',
        extensions: [
          {
            meaningVi: "= beyond one's expectations",
          },
        ],
      },
      {
        term: 'at all times',
        pos: 'phrase',
        meaningVi: 'luôn luôn',
      },
      {
        term: 'at no cost',
        pos: 'phrase',
        meaningVi: 'miễn phí',
        extensions: [
          {
            meaningVi: '( = for free)',
          },
        ],
      },
      {
        term: "at one's expense",
        pos: 'phrase',
        meaningVi: 'do ai đó chịu chi phí',
      },
      {
        term: "at one's earliest convenience",
        pos: 'phrase',
        meaningVi: 'sớm nhất có thể',
      },
      {
        term: 'at the latest',
        pos: 'phrase',
        meaningVi: 'trễ nhất',
      },
      {
        term: 'be able to do sth',
        pos: 'phrase',
        meaningVi: 'có thể làm',
      },
      {
        term: 'be associated with',
        pos: 'phrase',
        meaningVi: 'liên hệ với ~',
        extensions: [
          {
            meaningVi: '( = be related to, be involved in)',
          },
        ],
      },
      {
        term: 'be compatible with',
        pos: 'phrase',
        meaningVi: 'hòa hợp với ~, tương thích với ~',
      },
      {
        term: 'be eligible for + sth',
        pos: 'phrase',
        meaningVi: 'đủ điều kiện để được hưởng quyền lợi nào đó',
        extensions: [
          {
            meaningVi: 'be eligible to do: đủ điều kiện để được làm ~',
          },
        ],
      },
      {
        term: 'be familiar with',
        pos: 'phrase',
        meaningVi: 'quen với',
        extensions: [
          {
            meaningVi:
              '( = be acquainted with) be accustomed to + N/ Ving: quen với cái gì',
          },
        ],
      },
      {
        term: 'be noted for',
        pos: 'phrase',
        meaningVi: 'được biết đến nhờ ~',
        extensions: [
          {
            meaningVi: '( = be known for)',
          },
        ],
      },
      {
        term: 'be on schedule',
        pos: 'phrase',
        meaningVi: 'đúng tiến độ',
        extensions: [
          {
            meaningVi: '( >< behind schedule: trễ tiến độ)',
          },
        ],
      },
      {
        term: 'be responsible for',
        pos: 'phrase',
        meaningVi: 'chịu trách nhiệm về ~',
      },
      {
        term: 'be responsive to',
        pos: 'phrase',
        meaningVi: 'đáp ứng nhiệt tình với ~',
      },
      {
        term: 'be subject to + sth/ Ving',
        pos: 'phrase',
        meaningVi: 'bị/ chịu ảnh hưởng bởi',
      },
      {
        term: 'by means of',
        pos: 'phrase',
        meaningVi: 'bằng cách ~',
      },
      {
        term: 'go into effect',
        pos: 'phrase',
        meaningVi: 'bắt đầu có hiệu lực',
        extensions: [
          {
            meaningVi: '( = put into practice)',
          },
        ],
      },
      {
        term: 'in accordance with',
        pos: 'phrase',
        meaningVi: 'theo đúng ~, theo sát với ~, phù hợp với ~',
      },
      {
        term: 'in addition to',
        pos: 'phrase',
        meaningVi: 'ngoài ra',
      },
      {
        term: 'in celebration of',
        pos: 'phrase',
        meaningVi: 'để (ăn) mừng ~',
      },
      {
        term: 'in compliance with',
        pos: 'phrase',
        meaningVi: 'đúng theo, tuân theo',
        extensions: [
          {
            meaningVi: '( = in observance of)',
          },
        ],
      },
      {
        term: 'in conjunction with',
        pos: 'phrase',
        meaningVi: 'cùng với, liên kết với',
        extensions: [
          {
            meaningVi: '( = in combination with)',
          },
        ],
      },
      {
        term: 'in excess of',
        pos: 'phrase',
        meaningVi: 'vượt quá, hơn ~',
      },
      {
        term: 'in honor of',
        pos: 'phrase',
        meaningVi: 'nhằm vinh danh',
        extensions: [
          {
            meaningVi: '( = in celebration of)',
          },
        ],
      },
      {
        term: 'on behalf of',
        pos: 'phrase',
        meaningVi: 'thay mặt cho cá nhân/ tổ chức',
      },
      {
        term: 'reserve the right to do',
        pos: 'phrase',
        meaningVi: 'có quyền làm',
      },
      {
        term: 'right/promptly/immediately before (after)',
        pos: 'phrase',
        meaningVi: 'ngay trước (sau) khi',
      },
      {
        term: 'take advantage of',
        pos: 'phrase',
        meaningVi: 'tận dụng',
      },
      {
        term: 'take safety precautions',
        pos: 'phrase',
        meaningVi: 'sử dụng các biện pháp đề phòng an toàn',
      },
      {
        term: 'under warranty',
        pos: 'phrase',
        meaningVi: 'được bảo hành',
      },
      {
        term: 'until further notice',
        pos: 'phrase',
        meaningVi: 'cho đến khi có thông báo mới',
      },
      {
        term: 'upon request',
        pos: 'phrase',
        meaningVi: 'khi có yêu cầu',
      },
      {
        term: 'weather condition',
        pos: 'phrase',
        meaningVi: 'điều kiện thời tiết',
      },
      {
        term: 'within 7 days of purchase',
        pos: 'phrase',
        meaningVi: 'trong vòng 7 ngày sau khi mua',
      },
    ],
  },
]
