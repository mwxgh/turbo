import type { LessonSpec } from './types'

const ALL_PARTS = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7']

export const STRATEGY_LESSONS: LessonSpec[] = [
  {
    id: 'time-management',
    module: 'strategy',
    title: 'Phân bổ thời gian trong 120 phút',
    summary:
      'Kế hoạch thời gian cho từng phần, cách đoán khi bí và cách dùng phòng thi của Lingo',
    minutes: 15,
    parts: ALL_PARTS,
    sections: [
      {
        heading: 'Toàn cảnh 120 phút',
        paragraphs: [
          'Bài thi có 200 câu trong khoảng 120 phút. Phần nghe khoảng 45 phút cho 100 câu và chạy theo băng, bạn không điều chỉnh được. Phần đọc 75 phút cho 100 câu, và đây là nơi quyết định bạn có làm hết đề hay không.',
          'Người ở mức 650 thường hết giờ khi còn 10 đến 20 câu Part 7. Lên 800+ chủ yếu nhờ làm Part 5 và Part 6 nhanh hơn để có đủ thời gian cho Part 7.',
        ],
        bullets: [
          'Part 5 (30 câu): 10 đến 12 phút, khoảng 20 giây mỗi câu',
          'Part 6 (16 câu): khoảng 8 phút, 2 phút mỗi đoạn',
          'Part 7 (54 câu): khoảng 55 phút, trung bình 1 phút mỗi câu',
        ],
      },
      {
        heading: 'Phần nghe: đi theo nhịp băng',
        paragraphs: [
          'Ở Part 3 và Part 4, dùng khoảng lặng giữa các bộ câu hỏi để đọc trước ba câu hỏi của bộ tiếp theo. Khi phần hướng dẫn đầu Part 3 và Part 4 đang phát, đọc trước câu hỏi của bộ đầu tiên.',
          'Nếu lỡ một câu, chọn ngay một đáp án rồi chuyển sự chú ý sang câu tiếp theo. Tiếc nuối câu vừa qua là cách nhanh nhất để mất thêm hai câu nữa.',
        ],
      },
      {
        heading: 'Phần đọc: mốc giờ cần nhớ',
        paragraphs: [
          'Ghi nhớ vài mốc để biết mình đang nhanh hay chậm, thay vì nhìn đồng hồ sau mỗi câu.',
        ],
        bullets: [
          'Còn khoảng 63 phút: xong Part 5',
          'Còn khoảng 55 phút: xong Part 6, bắt đầu Part 7',
          'Còn khoảng 27 phút: bắt đầu bộ bài đọc kép đầu tiên',
          'Chậm hơn mốc quá 3 phút thì đẩy nhanh: chọn tạm những câu khó và đi tiếp',
        ],
      },
      {
        heading: 'Khi bị kẹt và cách đoán',
        paragraphs: [
          'TOEIC không trừ điểm câu sai, nên không bao giờ để trống. Câu bỏ trống chắc chắn mất điểm, câu đoán còn có khoảng một phần tư cơ hội đúng, nhiều hơn nếu loại được một hai đáp án.',
        ],
        bullets: [
          'Part 5: quá 30 giây chưa ra thì loại được bao nhiêu loại bấy nhiêu, chọn tạm, đánh dấu',
          'Part 7: một câu quá 1,5 phút thì chọn tạm, đánh dấu và đi tiếp; câu sau trong cùng bộ có thể dễ hơn',
          'Câu đánh dấu chỉ quay lại khi đã làm hết đề',
          'Còn 2 phút mà chưa xong: tô hết các câu còn lại bằng cùng một chữ cái',
        ],
      },
      {
        heading: 'Luyện trong phòng thi Lingo',
        paragraphs: [
          'Khi làm đề đầy đủ trong Lingo, bật Toàn màn hình để tránh bị phân tâm. Mỗi bài nghe chỉ phát một lần như thi thật, có đồng hồ đếm ngược, và bài tự nộp khi hết giờ.',
          'Dùng phím để làm nhanh: A đến D để chọn, mũi tên trái phải để chuyển câu, F để đánh dấu câu cần xem lại. Mỗi lựa chọn được lưu ngay, nên lỡ đóng tab thì mở lại sẽ tiếp tục từ chỗ dừng.',
        ],
      },
    ],
    keyPoints: [
      'Part 5 khoảng 10 đến 12 phút, Part 6 khoảng 8 phút, Part 7 khoảng 55 phút',
      'Không để trống câu nào, vì câu sai không bị trừ điểm',
      'Câu khó: chọn tạm, đánh dấu, đi tiếp',
      'Luyện đề đầy đủ với đồng hồ và Toàn màn hình',
    ],
  },
  {
    id: 'review-mistakes',
    module: 'strategy',
    title: 'Chữa đề để điểm tăng đều',
    summary:
      'Phân loại từng câu sai, ôn đúng chỗ yếu và làm lại câu sai sau vài ngày',
    minutes: 15,
    parts: ALL_PARTS,
    sections: [
      {
        heading: 'Chữa đề quan trọng hơn làm thêm đề',
        paragraphs: [
          'Làm liên tục nhiều đề mà không chữa thường khiến điểm đứng yên, vì những lỗi cũ lặp lại ở đề mới. Một đề làm xong nên dành thời gian chữa ít nhất bằng thời gian làm.',
          'Chữa cả những câu đúng nhờ đoán. Với câu đó bạn chưa thật sự biết, và lần sau có thể không may như vậy.',
        ],
      },
      {
        heading: 'Phân loại từng câu sai',
        paragraphs: [
          'Với mỗi câu sai, ghi lại một trong năm nguyên nhân dưới đây. Mỗi nguyên nhân có một cách sửa khác nhau, nên phân loại đúng thì mới ôn đúng.',
        ],
        bullets: [
          'Từ vựng: không biết nghĩa hoặc cách dùng của từ → ghi cả cụm vào sổ từ hoặc thẻ của bạn',
          'Ngữ pháp: không nhận ra điểm ngữ pháp → học lại bài tương ứng trong module Ngữ pháp và làm phần luyện tập',
          'Không nghe ra: biết từ khi đọc nhưng không nhận ra khi nghe → nghe lại câu đó, chép chính tả rồi so với lời thoại',
          'Hết giờ hoặc vội: biết cách làm nhưng không kịp → xem lại bài phân bổ thời gian',
          'Mắc bẫy: hiểu bài nhưng chọn đáp án gần đúng → ghi lại dạng bẫy để lần sau nhận ra',
        ],
        examples: [
          {
            en: 'The firm has -------- a new policy on remote work. (chose: adapted; correct: adopted)',
            vi: 'Công ty đã áp dụng chính sách mới về làm việc từ xa.',
            note: 'Lỗi từ vựng: adapt (điều chỉnh) và adopt (áp dụng) gần cách viết. Ghi cả cặp và cụm "adopt a policy" vào sổ từ',
          },
          {
            en: 'Part 2: "Who is leading the workshop?" — chose "At the workshop", correct "Ms. Lee is, I think."',
            vi: 'Ai dẫn buổi hội thảo? Chọn "Ở buổi hội thảo", đáp án đúng "Tôi nghĩ là cô Lee."',
            note: 'Mắc bẫy lặp từ: đáp án sai lặp lại "workshop" nhưng không trả lời câu hỏi Who',
          },
          {
            en: 'Part 7: the last 8 questions answered by guessing',
            vi: '8 câu cuối Part 7 phải đoán vì hết giờ.',
            note: 'Lỗi thời gian: đo lại thời gian làm Part 5 và Part 6 ở đề sau, mục tiêu xong cả hai trong khoảng 20 phút',
          },
        ],
      },
      {
        heading: 'Dùng Sổ câu sai và bộ thẻ trong Lingo',
        paragraphs: [
          'Sổ câu sai giữ những câu bạn làm sai ở lần gần nhất. Nút Làm lại theo từng Part tạo một bài chỉ gồm các câu đó; câu nào làm đúng lại sẽ tự rời sổ.',
          'Từ mới gặp trong đề, ghi cả cụm kèm câu ví dụ vào sổ từ hoặc thẻ của riêng bạn. Phần lớn từ hay gặp đã có trong các bộ thẻ ở mục Ôn từ vựng; ôn đều mỗi ngày, lịch ôn sẽ tự giãn ra khi bạn nhớ tốt.',
        ],
      },
      {
        heading: 'Làm lại sau vài ngày và theo dõi kỹ năng yếu',
        paragraphs: [
          'Đừng làm lại câu sai ngay sau khi xem đáp án, vì lúc đó bạn chỉ nhớ đáp án. Làm lại sau hai đến ba ngày, rồi thêm một lần sau khoảng một tuần. Câu vẫn sai ở lần thứ hai là điểm cần học lại từ đầu.',
          'Mục Điểm yếu ở trang Luyện tập xếp các kỹ năng theo tỉ lệ đúng (cần từ 3 câu mỗi kỹ năng mới hiện). Mỗi tuần chọn một hoặc hai kỹ năng yếu nhất, học bài tương ứng và làm phần luyện tập của bài đó.',
        ],
      },
    ],
    keyPoints: [
      'Chữa cả câu sai và câu đúng nhờ đoán',
      'Ghi nguyên nhân cho từng câu sai: từ vựng, ngữ pháp, không nghe ra, hết giờ hay mắc bẫy',
      'Làm lại câu sai sau vài ngày, không làm lại ngay',
      'Mỗi tuần tập trung một hoặc hai kỹ năng yếu nhất',
    ],
  },
]
