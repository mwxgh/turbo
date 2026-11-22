/** Full Test 04, Part 6: written for Lingo (not from ETS). */
export const P6: object[] = [
  {
    difficulty: 'MEDIUM',
    topic: 'Marketing',
    passage:
      'To: Hiroshi Tanaka <h.tanaka@orchidlanetea.com>\nFrom: Delia Byrne <proofs@inkwellprintco.com>\nDate: 6 May\nSubject: Proof for your brochure order\n\nDear Mr. Tanaka,\n\nAttached is a digital proof of the 2,000 product brochures you ordered last week. Please review it carefully, paying particular attention to prices and contact details, [1] we cannot reprint at our own expense once you have approved the file. [2]. For example, the tea leaves on page 3 may look slightly greener on paper than they do on your monitor. If you would like to see a printed sample before we proceed, we can courier one to you for a small fee. Once we receive your approval, your brochures will be ready for [3] within four working days. If you have any questions, please do not hesitate to [4] me directly on 01632 960418.\n\nBest regards,\n\nDelia Byrne\nPrepress Coordinator, Inkwell Print Co.',
    questions: [
      {
        options: ['as', 'despite', 'unless', 'so that'],
        answer: 0,
        explanationVi:
          'Mệnh đề sau giải thích lý do phải kiểm tra kỹ (sau khi duyệt thì không in lại miễn phí) → "as" (vì). "despite" là giới từ, không đi với mệnh đề; "unless" (trừ khi) và "so that" (để mà) sai logic.',
        skillTags: ['grammar.conjunction'],
      },
      {
        options: [
          'Our shop is closed on public holidays.',
          'Thank you for recommending us to your colleagues.',
          'Please note that colours on a screen can differ slightly from those in print.',
          'Your invoice has already been paid in full.',
        ],
        answer: 2,
        explanationVi:
          'Câu sau bắt đầu bằng "For example, the tea leaves… may look slightly greener on paper than… on your monitor" → cần một câu khái quát về chênh lệch màu giữa màn hình và bản in (C). (A), (B), (D) không có ví dụ nào minh hoạ.',
        translationVi: 'Câu nào phù hợp nhất để điền vào chỗ [2]?',
        skillTags: ['comprehension.sentence-insertion'],
      },
      {
        options: ['collect', 'collection', 'collected', 'collector'],
        answer: 1,
        explanationVi:
          'Sau giới từ "for" cần danh từ chỉ việc → "ready for collection" (sẵn sàng để nhận). "collector" là danh từ chỉ người, không hợp nghĩa; "collect", "collected" là động từ.',
        skillTags: ['grammar.word-form'],
      },
      {
        options: ['contacting', 'contacted', 'to contact', 'contact'],
        answer: 3,
        explanationVi:
          '"do not hesitate to + V nguyên mẫu" và "to" đã có sẵn trước chỗ trống → "contact". "to contact" sẽ lặp "to"; "contacting", "contacted" sai dạng.',
        skillTags: ['grammar.verb-form'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Arts',
    passage:
      'MEMBERSHIP UPDATE\n\nOn 1 July, the Calloway Museum of Modern Art will introduce a new membership structure. The current Individual and Family levels will be [1] by a single Household membership, which admits up to two adults and four children for £85 a year. Members will continue to enjoy free entry to all special exhibitions, as well as a ten percent discount in the museum shop and café. [2], Household members will be invited to a private viewing before each major exhibition opens to the public. Existing memberships will remain valid until they expire. [3]. Those who renew [4] 31 August will also receive a complimentary guest pass.',
    questions: [
      {
        options: ['exchanged', 'returned', 'removed', 'replaced'],
        answer: 3,
        explanationVi:
          'Hai hạng cũ sẽ được thay bằng một hạng mới → "be replaced by" (được thay thế bởi). "exchanged" thường đi với "for"; "returned" (trả lại) và "removed" (bị loại bỏ) không hợp với "by a single Household membership".',
        skillTags: ['comprehension.vocab-in-context'],
      },
      {
        options: ['Instead', 'Moreover', 'Nonetheless', 'Consequently'],
        answer: 1,
        explanationVi:
          'Câu trước liệt kê quyền lợi được giữ nguyên; câu sau thêm một quyền lợi mới (buổi xem riêng) → bổ sung → "Moreover". "Instead" (thay vào đó), "Nonetheless" (tuy vậy), "Consequently" (do đó) sai quan hệ logic.',
        skillTags: ['grammar.conjunction'],
      },
      {
        options: [
          'At that point, members will be offered the new Household level.',
          'The café is open until 5:00 P.M. on weekdays.',
          'Tickets for the summer concert series sell out quickly.',
          'Children under five must be accompanied by an adult.',
        ],
        answer: 0,
        explanationVi:
          'Câu trước: thẻ cũ còn hiệu lực đến khi hết hạn; câu sau: "Those who renew…" → (A) "Vào thời điểm đó, hội viên sẽ được mời chuyển sang hạng Household" nối "until they expire" với việc gia hạn. (B), (C), (D) lạc đề.',
        translationVi: 'Câu nào phù hợp nhất để điền vào chỗ [3]?',
        skillTags: ['comprehension.sentence-insertion'],
      },
      {
        options: ['until', 'within', 'by', 'since'],
        answer: 2,
        explanationVi:
          'Hạn chót để gia hạn → "by 31 August" (trước/chậm nhất ngày). "until" chỉ hành động kéo dài liên tục; "within" đi với khoảng thời gian; "since" đi với thì hoàn thành.',
        skillTags: ['grammar.preposition'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Finance',
    passage:
      'MEMO\n\nTo: All staff who travel for work\nFrom: Bogdan Petrescu, Finance Director\nDate: 12 January\nRe: Changes to expense claims\n\nFrom 1 February, all travel expenses must be submitted through the Expensio portal rather than on paper forms. Claims [1] within thirty days of a trip will be reimbursed in the next payroll cycle; those submitted later will require a manager’s written approval. Receipts should be photographed and uploaded with each claim. [2]. Please keep the originals for six months, however, in case of an audit. We are also raising the daily meal allowance for domestic trips from $45 to $55, the first increase in five years. This reflects rising restaurant prices in the cities our staff visit [3]. Anyone [4] has questions about the new process may attend one of the drop-in sessions listed below.',
    questions: [
      {
        options: ['submitting', 'to submit', 'submitted', 'are submitted'],
        answer: 2,
        explanationVi:
          'Câu đã có động từ chính "will be reimbursed" → chỗ trống là phân từ rút gọn mệnh đề quan hệ mang nghĩa bị động ("Claims (that are) submitted") → "submitted". "submitting" mang nghĩa chủ động; "are submitted" tạo thêm một động từ chính; "to submit" chỉ mục đích/việc sắp làm.',
        skillTags: ['grammar.verb-form'],
      },
      {
        options: [
          'Most employees prefer to travel by train on short trips.',
          'Hotel bookings must be made at least two weeks in advance.',
          'Receipts in foreign currencies are converted at the bank’s rate.',
          'Paper copies no longer need to be sent to the finance office.',
        ],
        answer: 3,
        explanationVi:
          'Câu sau: "Please keep the originals for six months, however" → "however" cho thấy câu [2] phải nói điều ngược lại: không cần gửi bản giấy nữa, nhưng vẫn phải giữ bản gốc (D). (C) cũng nói về hoá đơn nhưng không tạo đối lập với "however"; (A), (B) lạc ý.',
        translationVi: 'Câu nào phù hợp nhất để điền vào chỗ [2]?',
        skillTags: ['comprehension.sentence-insertion'],
      },
      {
        options: [
          'most frequently',
          'more frequent',
          'most frequent',
          'frequency',
        ],
        answer: 0,
        explanationVi:
          'Chỗ trống bổ nghĩa cho động từ "visit" → cần trạng từ, dạng so sánh nhất "most frequently" (thường xuyên nhất). "more frequent", "most frequent" là tính từ; "frequency" là danh từ.',
        skillTags: ['grammar.word-form'],
      },
      {
        options: ['whom', 'who', 'whose', 'which'],
        answer: 1,
        explanationVi:
          'Đại từ quan hệ làm chủ ngữ cho "has questions", thay cho người ("Anyone") → "who". "whom" làm tân ngữ; "whose" cần danh từ theo sau; "which" dùng cho vật.',
        skillTags: ['grammar.relative-clause'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Energy',
    passage:
      'GREENFORD (18 March) — Halberd Wind, the offshore energy developer, has confirmed that its Dunmore Bank project will begin supplying power to the national grid this autumn, almost a year ahead of schedule. The company credits the early finish to a new installation vessel that can fit turbine blades in winds that would have [1] work just a few years ago. [2]. Once fully operational, the forty-turbine site is expected to generate enough electricity for around 300,000 homes. Local fishing groups, which initially opposed the project, have been [3] reassured by an agreement guaranteeing them access to most of the surrounding waters. Halberd has also pledged to fund a training center in Greenford, where it plans to recruit [4] of its maintenance technicians.',
    questions: [
      {
        options: ['resumed', 'hastened', 'permitted', 'halted'],
        answer: 3,
        explanationVi:
          'Con tàu mới lắp được cánh quạt trong điều kiện gió mà vài năm trước "đã làm ngừng" công việc → "halted". "resumed" (tiếp tục lại), "hastened" (đẩy nhanh), "permitted" (cho phép) ngược nghĩa với ý gió mạnh gây cản trở.',
        skillTags: ['comprehension.vocab-in-context'],
      },
      {
        options: [
          'Electricity prices are expected to fall sharply next winter.',
          'The vessel, built in Norway, has cut the time needed to install each turbine by nearly half.',
          'The project was originally proposed by a rival developer.',
          'Fishing groups have called for the project to be cancelled.',
        ],
        answer: 1,
        explanationVi:
          'Câu trước nói con tàu lắp đặt mới là lý do hoàn thành sớm → (B) bổ sung chi tiết về con tàu (giảm gần một nửa thời gian lắp mỗi tua-bin), giải thích vì sao sớm gần một năm. (D) mâu thuẫn với việc các nhóm ngư dân nay đã được trấn an; (A), (C) không liên quan tới con tàu.',
        translationVi: 'Câu nào phù hợp nhất để điền vào chỗ [2]?',
        skillTags: ['comprehension.sentence-insertion'],
      },
      {
        options: ['large', 'larger', 'largely', 'largest'],
        answer: 2,
        explanationVi:
          'Chỗ trống đứng giữa "have been" và phân từ "reassured" → cần trạng từ bổ nghĩa cho động từ → "largely" (phần lớn). "large", "larger", "largest" là tính từ.',
        skillTags: ['grammar.word-form'],
      },
      {
        options: ['many', 'much', 'every', 'little'],
        answer: 0,
        explanationVi:
          '"of its maintenance technicians" là danh từ đếm được số nhiều → "many of". "much", "little" đi với danh từ không đếm được; "every" không đứng trước "of".',
        skillTags: ['grammar.pronoun'],
      },
    ],
  },
]
