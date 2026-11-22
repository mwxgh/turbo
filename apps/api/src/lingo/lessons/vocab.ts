import type { LessonSpec } from './types'

export const VOCAB_LESSONS: LessonSpec[] = [
  {
    id: 'word-meaning',
    module: 'vocab',
    title: 'Chọn từ đúng nghĩa và đúng cách dùng',
    summary:
      'Phân biệt các từ gần nghĩa bằng cách dùng của chúng và đọc cả câu để tìm manh mối về nghĩa',
    minutes: 20,
    parts: ['P5', 'P6'],
    sections: [
      {
        heading: 'Câu từ vựng khác câu từ loại ở đâu',
        paragraphs: [
          'Ở câu từ vựng, bốn đáp án thường cùng loại từ (cùng là động từ, hoặc cùng là danh từ), nên nhìn vị trí chỗ trống không đủ để chọn. Phải hiểu câu đang nói gì và từ nào đi được với các từ xung quanh.',
          'Ở mức 650, người học thường chọn theo cảm giác "nghĩa tiếng Việt nghe hợp". Để lên 800+, cần hỏi thêm hai câu: từ này có cần tân ngữ không, và sau nó là giới từ nào. Nhiều cặp từ dịch ra tiếng Việt giống nhau nhưng chỉ một từ đúng cấu trúc của câu.',
        ],
      },
      {
        heading: 'Những cặp từ hay bị nhầm',
        paragraphs: [
          'Các cặp dưới đây gần nghĩa hoặc gần cách viết, khác nhau ở cách dùng. Học cả cặp cùng lúc, kèm một cụm ví dụ ngắn.',
        ],
        bullets: [
          'raise (ngoại động từ, cần tân ngữ: raise prices, raise funds) / rise (nội động từ, không có tân ngữ: costs rose by 5%)',
          'affect (động từ: the delay affected sales) / effect (thường là danh từ: have an effect on sales)',
          'borrow (mượn, borrow something from someone) / lend (cho mượn, lend someone something, lend something to someone)',
          'accept (động từ, chấp nhận: accept an offer) / except (giới từ, ngoại trừ: open every day except Sunday)',
          'adjacent (nằm sát bên, adjacent to the station) / adjoining (thông sang nhau, có chung tường: adjoining rooms)',
          'arrive (cần at / in: arrive at the airport) / reach (không cần giới từ: reach the airport)',
        ],
        examples: [
          {
            en: 'The price of raw materials has -------- steadily over the past six months. (A) raised (B) risen (C) lifted (D) boosted',
            vi: 'Giá nguyên liệu thô đã tăng đều trong sáu tháng qua.',
            note: 'Sau chỗ trống không có tân ngữ. Raised, lifted, boosted đều là ngoại động từ, cần tân ngữ (raise the price) → (B) risen',
          },
          {
            en: 'The board meeting will be held in the conference room -------- to the main lobby. (A) adjacent (B) adjoining (C) beside (D) nearby',
            vi: 'Cuộc họp hội đồng quản trị sẽ diễn ra ở phòng hội nghị nằm sát sảnh chính.',
            note: 'Sau chỗ trống là "to": chỉ adjacent đi với to → (A). Beside và nearby không đi với to',
          },
        ],
      },
      {
        heading: 'Manh mối nằm ở cấu trúc quanh chỗ trống',
        paragraphs: [
          'Khi bốn đáp án đều có nghĩa gần đúng, hãy nhìn từ đứng sau chỗ trống: tân ngữ là người hay vật, có "to + động từ" không, có giới từ nào không. Cấu trúc thường loại được hai hoặc ba đáp án.',
        ],
        examples: [
          {
            en: 'The new software will -------- staff to process refunds in half the time. (A) enable (B) let (C) assist (D) make',
            vi: 'Phần mềm mới sẽ giúp nhân viên xử lý hoàn tiền nhanh gấp đôi.',
            note: 'Mẫu "động từ + người + to V": enable sb to do → (A). Let và make đi với động từ nguyên mẫu không "to"; assist đi với "with" hoặc "in"',
          },
          {
            en: 'Mr. Okafor will -------- the interns about the safety rules on their first morning. (A) explain (B) brief (C) say (D) talk',
            vi: 'Ông Okafor sẽ phổ biến quy định an toàn cho thực tập sinh vào sáng ngày đầu tiên.',
            note: 'Tân ngữ là người, sau đó là "about": brief sb about sth → (B). Explain cần "sth to sb", say không lấy người làm tân ngữ, talk cần "to sb"',
          },
        ],
      },
      {
        heading: 'Đọc cả câu khi cấu trúc không đủ',
        paragraphs: [
          'Có câu mà cả bốn đáp án đều đúng ngữ pháp. Khi đó manh mối là một cụm ở đầu hoặc cuối câu: chỉ thời gian, nguyên nhân, kết quả. Đọc cả câu một lần rồi mới thử từng đáp án.',
        ],
        examples: [
          {
            en: 'Because of the heavy rain forecast, the outdoor concert has been -------- until next Saturday. (A) postponed (B) canceled (C) prevented (D) avoided',
            vi: 'Do dự báo mưa lớn, buổi hòa nhạc ngoài trời được dời sang thứ Bảy tuần sau.',
            note: '"until next Saturday" cho biết sự kiện vẫn diễn ra nhưng muộn hơn → (A). Canceled là bẫy vì hợp với "heavy rain" nhưng mâu thuẫn với "until"',
          },
          {
            en: 'Applicants must have at least three years of -------- experience in hotel management. (A) relevant (B) relative (C) related (D) reliable',
            vi: 'Ứng viên phải có ít nhất ba năm kinh nghiệm liên quan trong quản lý khách sạn.',
            note: 'Relevant experience là cụm chuẩn trong tin tuyển dụng. Relative nghĩa là tương đối, reliable nghĩa là đáng tin cậy. Related cũng có nghĩa liên quan nhưng thường đi sau danh từ hoặc với "to" (experience related to sales)',
          },
        ],
      },
    ],
    keyPoints: [
      'Bốn đáp án cùng loại từ thì đây là câu nghĩa: đọc cả câu',
      'Nhìn tân ngữ và giới từ sau chỗ trống để loại đáp án sai cấu trúc',
      'Học từ gần nghĩa theo cặp, kèm một cụm ví dụ',
      'Đáp án hợp với một nửa câu nhưng mâu thuẫn với nửa còn lại là bẫy',
    ],
    practice: { part: 'P5', skillTag: 'vocab.meaning' },
  },
  {
    id: 'collocation',
    module: 'vocab',
    title: 'Cụm từ cố định trong tiếng Anh kinh doanh',
    summary:
      'Nhận ra các cặp từ luôn đi cùng nhau: động từ với danh từ, tính từ với danh từ, tính từ với giới từ và các cụm cố định',
    minutes: 20,
    parts: ['P5', 'P6'],
    sections: [
      {
        heading: 'Collocation là gì và vì sao khó',
        paragraphs: [
          'Collocation là những từ người bản ngữ quen dùng với nhau. Tiếng Việt nói "đặt chỗ", tiếng Anh nói make a reservation chứ không nói do a reservation, dù cả hai động từ đều có nghĩa "làm".',
          'Ở dạng câu này, bốn đáp án thường cùng nghĩa khi dịch, nên dịch không giúp được. Cách duy nhất là đã gặp cụm đó đủ nhiều. Vì vậy hãy học và ghi thẻ theo cả cụm (meet a deadline), không học từ đơn lẻ (meet).',
        ],
      },
      {
        heading: 'Động từ + danh từ',
        paragraphs: [
          'Nhóm hay ra nhất. Khi thấy chỗ trống là động từ và tân ngữ là một danh từ quen thuộc trong công việc, hãy nghĩ ngay đến động từ hay đi cùng danh từ đó.',
        ],
        bullets: [
          'make: a decision, a reservation, a payment, an effort, an appointment, changes',
          'take: place, action, measures, responsibility for, advantage of',
          'meet: a deadline, a requirement, demand, expectations',
          'conduct: a survey, an inspection, an interview, research',
          'place an order, submit a proposal, reach an agreement, raise concerns, address an issue',
        ],
        examples: [
          {
            en: 'To -------- the growing demand for its products, the factory has added a night shift. (A) meet (B) reach (C) fill (D) catch',
            vi: 'Để đáp ứng nhu cầu ngày càng tăng, nhà máy đã thêm ca đêm.',
            note: 'meet demand là cụm cố định → (A). Reach đi với agreement, goal, target',
          },
          {
            en: 'The city will -------- an inspection of all restaurant kitchens next month. (A) conduct (B) perform (C) hold (D) act',
            vi: 'Thành phố sẽ tiến hành kiểm tra tất cả bếp nhà hàng vào tháng tới.',
            note: 'conduct an inspection → (A). Hold đi với meeting, event; act là nội động từ',
          },
        ],
      },
      {
        heading: 'Tính từ + danh từ và tính từ + giới từ',
        paragraphs: [
          'Với tính từ đứng trước danh từ, hãy xem danh từ là gì rồi chọn tính từ quen đi cùng. Với tính từ đứng sau động từ to be, giới từ ngay sau chỗ trống thường quyết định đáp án.',
        ],
        bullets: [
          'Tính từ + danh từ: sharp increase, steady growth, substantial discount, extensive experience, heavy traffic, strong candidate, prompt response',
          'Tính từ + giới từ: responsible for, eligible for, aware of, capable of, familiar with, compatible with, comparable to, subject to, exempt from, dependent on',
        ],
        examples: [
          {
            en: 'Employees with more than one year of service are -------- for the annual bonus. (A) eligible (B) capable (C) entitled (D) aware',
            vi: 'Nhân viên làm việc trên một năm đủ điều kiện nhận thưởng cuối năm.',
            note: 'Sau chỗ trống là "for": eligible for → (A). Capable of, entitled to, aware of đều sai giới từ',
          },
          {
            en: 'All prices in this catalog are -------- to change without notice. (A) subject (B) depending (C) according (D) relevant',
            vi: 'Mọi mức giá trong danh mục có thể thay đổi mà không báo trước.',
            note: 'subject to change là cụm cố định trên báo giá, hợp đồng → (A)',
          },
        ],
      },
      {
        heading: 'Cụm cố định trong thư và thông báo',
        paragraphs: [
          'Thư, email và thông báo trong Part 5 và Part 6 dùng lại một nhóm cụm khá cố định. Chỉ cần nhận ra vài từ đầu là điền được chỗ trống.',
        ],
        bullets: [
          'in advance, prior to, as of (+ ngày), until further notice, on short notice',
          'on behalf of, in charge of, in accordance with, in light of',
          'free of charge, out of stock, at your earliest convenience',
        ],
        examples: [
          {
            en: 'The east entrance will remain closed until further --------. (A) notice (B) announcement (C) information (D) note',
            vi: 'Lối vào phía đông sẽ đóng cho đến khi có thông báo mới.',
            note: 'until further notice là cụm cố định → (A)',
          },
          {
            en: 'Please return the signed contract at your earliest --------. (A) convenience (B) comfort (C) opportunity (D) availability',
            vi: 'Vui lòng gửi lại hợp đồng đã ký sớm nhất khi có thể.',
            note: 'at your earliest convenience → (A). Opportunity đi với "at the first opportunity", không đi với "your earliest"',
          },
        ],
      },
    ],
    keyPoints: [
      'Bốn đáp án dịch ra giống nhau thì đây là câu collocation',
      'Nhìn danh từ hoặc giới từ ngay sau chỗ trống trước tiên',
      'Ghi thẻ theo cả cụm, không theo từ đơn',
    ],
    practice: { part: 'P5', skillTag: 'vocab.collocation' },
  },
]
