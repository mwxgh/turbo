/** Full Test 01, Part 3: written for Lingo (not from ETS). */
export const P3: object[] = [
  {
    difficulty: 'EASY',
    topic: 'Transportation',
    transcript: [
      {
        speaker: 'M',
        accent: 'US',
        text: 'Hi, Akiko. I need one of the company cars on Thursday to visit the solar farm site in Ridgeway. Do you still keep the reservation sheet?',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'It’s all online now, but I can check for you. The hybrid is free all day. The van is out with the installation crew until Friday, though.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'The hybrid is fine. It’s just me and an engineer from our partner firm.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'OK, I’ve booked it from eight to six. Just remember the fuel card is kept in the glove box now, not on the key ring.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Got it. Do I need to fill in a mileage log?',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Yes, enter it in the app when you get back. You’ll need the starting number, so take a photo of the dashboard before you leave.',
      },
    ],
    questions: [
      {
        text: 'What does the man want to do?',
        options: [
          'Hire an engineer',
          'Install some solar panels',
          'Reserve a vehicle',
          'Visit a car dealer',
        ],
        answer: 2,
        explanationVi:
          '"I need one of the company cars on Thursday" → muốn đặt một chiếc xe công ty (C, "vehicle" thay cho "car"). "engineer", "solar" có trong bài nhưng chỉ là bẫy lặp từ.',
        translationVi: 'Người đàn ông muốn làm gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the woman say about the van?',
        options: [
          'It is being used by a team.',
          'It needs to be repaired.',
          'It has recently been sold.',
          'It is too small for the trip.',
        ],
        answer: 0,
        explanationVi:
          '"The van is out with the installation crew until Friday" → xe van đang được đội lắp đặt sử dụng (A, "crew" = "team"). Không có thông tin về sửa chữa hay bán xe.',
        translationVi: 'Người phụ nữ nói gì về chiếc xe van?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the woman ask the man to do before he leaves?',
        options: [
          'Fill the fuel tank',
          'Sign a paper log',
          'Return a key ring',
          'Photograph a mileage reading',
        ],
        answer: 3,
        explanationVi:
          '"take a photo of the dashboard before you leave" để có "the starting number" → chụp ảnh số km trên đồng hồ (D). "fuel card", "key ring" là bẫy lặp từ; nhật ký nhập trên app chứ không phải giấy (B sai).',
        translationVi:
          'Người phụ nữ yêu cầu người đàn ông làm gì trước khi đi?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Finance',
    transcript: [
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Pavel, I tried to submit my expenses for the Lisbon trip, but the portal keeps rejecting my hotel receipt.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Since last month’s update, the system only accepts receipts that show the tax amount separately. Does yours?',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'No, the hotel just gave me one total. And the deadline for this quarter is Friday.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Well, a hotel’s billing office can usually reissue an itemized one within a day.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'I emailed them this morning. But they took three weeks to answer the last time.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'In that case, upload what you have and add a note. Finance can approve it manually, but only if Ms. Ortega signs off as your department head.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'She’s on leave until Thursday. I’ll catch her first thing that morning, then.',
      },
    ],
    questions: [
      {
        text: 'What problem does the woman mention?',
        options: [
          'A flight was canceled.',
          'A receipt was not accepted.',
          'A hotel charged her twice.',
          'A password has expired.',
        ],
        answer: 1,
        explanationVi:
          '"the portal keeps rejecting my hotel receipt" → hóa đơn khách sạn bị hệ thống từ chối (B). Không có chuyện bị tính tiền hai lần (C) hay hủy chuyến bay (A).',
        translationVi: 'Người phụ nữ đề cập đến vấn đề gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the woman imply when she says, "they took three weeks to answer the last time"?',
        options: [
          'She has already been reimbursed.',
          'She would prefer to use a different hotel.',
          'The billing office has closed.',
          'She doubts a document will arrive in time.',
        ],
        answer: 3,
        explanationVi:
          'Hạn chót là thứ Sáu, còn lần trước khách sạn mất ba tuần mới trả lời → cô nghi ngờ hóa đơn chi tiết sẽ không kịp đến (D). Người đàn ông vì thế đề xuất cách khác ("In that case…").',
        translationVi:
          'Người phụ nữ ngụ ý gì khi nói "lần trước họ mất ba tuần mới trả lời"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What will the woman most likely do on Thursday?',
        options: [
          'Get approval from a manager',
          'Book another business trip',
          'Call the hotel’s billing office',
          'Attend a training session on the portal',
        ],
        answer: 0,
        explanationVi:
          'Cần "Ms. Ortega signs off as your department head"; bà ấy nghỉ đến thứ Năm → "I’ll catch her first thing that morning" → xin trưởng bộ phận duyệt (A, "signs off" = "approval").',
        translationVi: 'Người phụ nữ có lẽ sẽ làm gì vào thứ Năm?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Logistics',
    transcript: [
      {
        speaker: 'M',
        accent: 'US',
        text: 'Thanks for coming, Grace, Liam. Head office wants the year-end stock count finished before the auditors arrive on the fifteenth. I’m thinking we close the warehouse to shipping on the twelfth.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'For a full day? We’ve got the Brightline order going out that week. That’s forty pallets.',
      },
      {
        speaker: 'M2',
        accent: 'AU',
        text: 'Couldn’t we count by zone instead? Aisles A to F on the night shift, the rest the following night. Shipping would keep running during the day.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'That could work, but only two people on the night crew are certified to drive the reach trucks.',
      },
      {
        speaker: 'M2',
        accent: 'AU',
        text: 'Well, I’m certified. I could switch to nights for those two days.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'And I’ll move the Brightline pallets to the loading dock ahead of time, so nobody has to pull them out of the racks during the count.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Great. Liam, send me a zone plan by Wednesday and I’ll get it approved.',
      },
    ],
    questions: [
      {
        text: 'What are the speakers mainly discussing?',
        options: [
          'Scheduling an inventory check',
          'Hiring night-shift workers',
          'Preparing for a client’s visit',
          'Renovating a storage area',
        ],
        answer: 0,
        explanationVi:
          'Cả cuộc hội thoại xoay quanh "the year-end stock count" và cách sắp lịch đếm hàng → lên lịch kiểm kê (A, "stock count" = "inventory check"). Kiểm toán viên đến (C) không phải khách hàng.',
        translationVi: 'Những người nói chủ yếu đang thảo luận về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'Why does the woman say, "We’ve got the Brightline order going out that week"?',
        options: [
          'To praise the sales team',
          'To request overtime pay',
          'To object to a proposed closure',
          'To correct a delivery date',
        ],
        answer: 2,
        explanationVi:
          'Ngay sau đề xuất đóng kho một ngày, cô hỏi lại "For a full day?" và nhắc đơn hàng 40 pallet sắp xuất → cô ngầm phản đối việc đóng kho (C). Cô không sửa ngày giao (D).',
        translationVi:
          'Tại sao người phụ nữ nói "Tuần đó chúng ta có đơn hàng Brightline phải xuất đi"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What does Liam offer to do?',
        options: [
          'Train new forklift drivers',
          'Work different hours temporarily',
          'Contact the auditors',
          'Move some pallets to the dock',
        ],
        answer: 1,
        explanationVi:
          'Liam là người được gọi tên ở câu cuối ("Liam, send me a zone plan"), tức người đề xuất đếm theo khu: "I could switch to nights for those two days" → tạm làm ca khác (B). Chuyển pallet (D) là việc Grace nhận.',
        translationVi: 'Liam đề nghị làm gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Maintenance',
    transcript: [
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Hello, this is Dana Whitfield at Corvale Research Labs. One of our precision scales is giving slightly wrong readings, and our calibration contract with your company should cover it.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Let me pull up your account. Yes, you’re on the standard plan. Our next available technician visit is the twenty-second.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'That’s a problem. We start a series of stability tests for a client on Monday, and every measurement has to be traceable.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'I see. For an extra fee, we can lend you a scale that’s already certified. A courier could bring it tomorrow.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'What’s the fee?',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Ninety dollars a week. But it’s waived on our priority plan, which also guarantees a visit within forty-eight hours.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'I’d have to check with our lab director before upgrading. Could you email me the details of that plan?',
      },
    ],
    questions: [
      {
        text: 'Why is the woman calling?',
        options: [
          'To order laboratory supplies',
          'To cancel a service contract',
          'To ask about some test results',
          'To report an inaccurate instrument',
        ],
        answer: 3,
        explanationVi:
          '"One of our precision scales is giving slightly wrong readings" → báo một thiết bị đo không chính xác (D). "test" và "contract" xuất hiện trong bài nhưng (B), (C) sai ý.',
        translationVi: 'Tại sao người phụ nữ gọi điện?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'Why does the woman need a quick solution?',
        options: [
          'A client is visiting the laboratory.',
          'Some testing will begin soon.',
          'Her lab recently failed an inspection.',
          'Her contract is about to expire.',
        ],
        answer: 1,
        explanationVi:
          '"We start a series of stability tests for a client on Monday" → sắp bắt đầu đợt thử nghiệm (B). Có nhắc "client" nhưng khách hàng không đến thăm phòng lab (A).',
        translationVi: 'Tại sao người phụ nữ cần một giải pháp nhanh?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the woman ask the man to send?',
        options: [
          'A certified scale',
          'A refund for a fee',
          'Information about a service plan',
          'A technician’s schedule',
        ],
        answer: 2,
        explanationVi:
          '"Could you email me the details of that plan?" → thông tin về gói dịch vụ ưu tiên (C). Cân đã chứng nhận (A) là đề xuất của người đàn ông, cô chưa đồng ý.',
        translationVi: 'Người phụ nữ yêu cầu người đàn ông gửi gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Construction',
    transcript: [
      {
        speaker: 'M',
        accent: 'AU',
        text: 'Ms. Haddad, I’ve gone over your comments on the floor plan for the bakery. Moving the display counter closer to the entrance is no problem.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Great. And what about a bigger kitchen? We plan to start running cooking classes next year.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'That’s trickier. The rear wall supports the building, so we can’t push it back. But if the storeroom goes down to the basement, you’d gain about fifteen square meters.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Is the basement dry enough for flour and sugar?',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'We’d add a dehumidifier, which isn’t expensive. A freight lift would be, though, and without one your staff would be carrying heavy sacks down the stairs.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'I’ll have to discuss the budget with my business partner. Could you work out the cost of both options, with and without the lift?',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'Sure. You’ll have it by Monday.',
      },
    ],
    questions: [
      {
        text: 'Who most likely is the man?',
        options: [
          'A bakery owner',
          'A cooking instructor',
          'A building designer',
          'A safety inspector',
        ],
        answer: 2,
        explanationVi:
          'Anh ấy chỉnh "the floor plan", bàn về tường chịu lực và diện tích → nhà thiết kế/kiến trúc sư (C). Chủ tiệm bánh là người phụ nữ (A là bẫy).',
        translationVi: 'Người đàn ông có lẽ là ai?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'Why does the woman want a larger kitchen?',
        options: [
          'To hold classes',
          'To hire more bakers',
          'To fit a bigger oven',
          'To store more ingredients',
        ],
        answer: 0,
        explanationVi:
          '"We plan to start running cooking classes next year" → để tổ chức lớp học (A). Bột, đường (D) được nhắc khi nói về tầng hầm, không phải lý do mở rộng bếp.',
        translationVi: 'Tại sao người phụ nữ muốn bếp rộng hơn?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the man agree to do?',
        options: [
          'Inspect the basement',
          'Prepare a cost estimate',
          'Meet the woman’s business partner',
          'Order a dehumidifier',
        ],
        answer: 1,
        explanationVi:
          'Cô nhờ "work out the cost of both options", anh đáp "Sure. You’ll have it by Monday" → lập bảng ước tính chi phí (B). Gặp đối tác (C) là việc của người phụ nữ.',
        translationVi: 'Người đàn ông đồng ý làm gì?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Media',
    transcript: [
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Hi, Josh. It’s Nina from the company podcast team. We’re recording your interview about the new recycling program at two today, right?',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'That’s right. Is everything OK?',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Our sound engineer just called in sick. Could we move it to tomorrow at the same time?',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'I’m at the regional office tomorrow afternoon, but the morning is open.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Ten o’clock works for us. Oh, and we’ll be in Studio B. Studio A is getting new microphones put in.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'No problem. Should I bring anything?',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Just those figures on how much waste we’ve cut this year. Listeners love numbers.',
      },
    ],
    questions: [
      {
        text: 'What is the purpose of the call?',
        options: [
          'To invite a guest to a podcast',
          'To reschedule a recording',
          'To discuss a recycling program',
          'To report a technical fault',
        ],
        answer: 1,
        explanationVi:
          '"Could we move it to tomorrow at the same time?" → dời lịch ghi âm (B). Buổi phỏng vấn đã được hẹn từ trước nên không phải lời mời (A); chương trình tái chế chỉ là nội dung phỏng vấn (C).',
        translationVi: 'Mục đích của cuộc gọi là gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'Why will a different studio be used?',
        options: [
          'It is larger.',
          'It is closer to the regional office.',
          'Equipment is being installed.',
          'Another team has booked it.',
        ],
        answer: 2,
        explanationVi:
          '"Studio A is getting new microphones put in" → đang lắp thiết bị (C, "microphones" → "equipment").',
        translationVi: 'Tại sao sẽ dùng một phòng thu khác?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the woman ask the man to bring?',
        options: [
          'Some statistics',
          'A microphone',
          'A guest list',
          'Some recycling bins',
        ],
        answer: 0,
        explanationVi:
          '"Just those figures on how much waste we’ve cut" → số liệu thống kê (A, "figures/numbers" = "statistics"). "microphone", "recycling" là bẫy lặp từ.',
        translationVi: 'Người phụ nữ nhờ người đàn ông mang theo gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'HR',
    transcript: [
      {
        speaker: 'W',
        accent: 'US',
        text: 'Next on the agenda is the summer internship program. We took six interns last year, and the feedback from the engineering teams was mixed.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Mainly because the interns had nothing to do for the first two weeks. Their laptops and system accounts weren’t ready.',
      },
      {
        speaker: 'W2',
        accent: 'CA',
        text: 'That’s on us in IT. We got the start dates late. If HR sends us the list a month ahead, it won’t happen again.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Fair enough. Finance has approved eight places this year, though, so it’ll be a bigger group.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Then I’d suggest pairing each intern with a mentor from day one. Several of my senior engineers have already volunteered.',
      },
      {
        speaker: 'W2',
        accent: 'CA',
        text: 'Eight laptops is fine. But the security training has to be done in person, and our trainer only runs sessions on Tuesdays.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'And the start date is a Monday. Well, a day of orientation before they touch any systems never hurt anyone.',
      },
    ],
    questions: [
      {
        text: 'What is the conversation mainly about?',
        options: [
          'A product launch',
          'A laptop purchase',
          'A training budget',
          'A program for student workers',
        ],
        answer: 3,
        explanationVi:
          '"Next on the agenda is the summer internship program" → chương trình thực tập sinh (D). Laptop và đào tạo bảo mật chỉ là chi tiết (B, C là bẫy).',
        translationVi: 'Cuộc hội thoại chủ yếu nói về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'According to the man, what was the problem last year?',
        options: [
          'Interns could not start working right away.',
          'No mentors were available.',
          'Several interns left early.',
          'Some feedback forms were lost.',
        ],
        answer: 0,
        explanationVi:
          '"the interns had nothing to do for the first two weeks… laptops and system accounts weren’t ready" → thực tập sinh không thể bắt đầu làm việc ngay (A). Mentor (B) là đề xuất cho năm nay.',
        translationVi: 'Theo người đàn ông, năm ngoái đã có vấn đề gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the woman imply when she says, "a day of orientation before they touch any systems never hurt anyone"?',
        options: [
          'The IT team should change its training schedule.',
          'An outside trainer should be hired.',
          'A one-day wait for system access is acceptable.',
          'The interns were poorly prepared last year.',
        ],
        answer: 2,
        explanationVi:
          'Thực tập sinh bắt đầu thứ Hai nhưng đào tạo bảo mật chỉ có thứ Ba → ngày đầu dành cho định hướng, chờ một ngày mới được truy cập hệ thống cũng không sao (C). Cô không yêu cầu IT đổi lịch (A).',
        translationVi:
          'Người phụ nữ ngụ ý gì khi nói "một ngày định hướng trước khi đụng vào hệ thống thì chẳng hại gì"?',
        skillTags: ['comprehension.speaker-intent'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Real estate',
    transcript: [
      {
        speaker: 'M',
        accent: 'US',
        text: 'Hi, Ms. Barrett. It’s Arjun Mehta from Suite 410. Our lease is up for renewal in March, and I have a few questions before we sign.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Of course. The new rent will be about four percent higher, in line with the rest of the building.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'We expected that. What worries us more is parking. We’ve hired five people this year, and we still have only six reserved spaces.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Our garage is full, I’m afraid. But the building next door rents spaces by the month, and our tenants get a discount there.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'That might work. Also, could we sign for three years instead of two?',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Actually, on a three-year term, the owner usually keeps the rent at the current level for the first year. I’ll put that in writing for you.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'That would be great. I’ll share it with our managing partner.',
      },
    ],
    questions: [
      {
        text: 'Who most likely is the woman?',
        options: [
          'A property manager',
          'A parking attendant',
          'A lawyer',
          'A new employee',
        ],
        answer: 0,
        explanationVi:
          'Cô báo giá thuê mới, nói về "our garage", "our tenants" và điều kiện của chủ nhà → người quản lý tòa nhà (A). "parking" là bẫy lặp từ (B).',
        translationVi: 'Người phụ nữ có lẽ là ai?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'What is the man mainly concerned about?',
        options: [
          'An increase in rent',
          'A shortage of parking',
          'Noise from neighbors',
          'Repairs to his office',
        ],
        answer: 1,
        explanationVi:
          '"What worries us more is parking… only six reserved spaces" → thiếu chỗ đỗ xe (B). Việc tăng tiền thuê thì "We expected that", nên (A) là bẫy.',
        translationVi: 'Người đàn ông chủ yếu lo lắng về điều gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'According to the woman, what is an advantage of a longer lease?',
        options: [
          'Free parking spaces',
          'A larger office',
          'An earlier move-in date',
          'No rent increase for a year',
        ],
        answer: 3,
        explanationVi:
          '"on a three-year term, the owner usually keeps the rent at the current level for the first year" → năm đầu không tăng giá thuê (D). Chỗ đỗ xe chỉ được giảm giá, không miễn phí (A).',
        translationVi:
          'Theo người phụ nữ, lợi ích của hợp đồng thuê dài hơn là gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Events',
    transcript: [
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Hello, I’m calling from Torvane Electronics about the catering for our product launch on the ninth. I need to make a few changes to the order.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Sure. I have you down for a hundred and twenty guests with a seated lunch.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'The number’s the same, but we’d like buffet stations with guests standing instead. Right after lunch the room will be set up for product demonstrations, and tables would just get in the way.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Stations are easy. Do you still want the vegetarian menu?',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Yes, and about a dozen guests have asked for gluten-free meals, so please label those dishes clearly.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Of course. Buffet service needs more serving staff, though, so the total will go up a little. I’ll send you a revised quote.',
      },
      {
        speaker: 'W',
        accent: 'GB',
        text: 'Thanks. Please copy Mr. Ito on that. He’s the one managing the event budget.',
      },
    ],
    questions: [
      {
        text: 'What kind of event is the woman’s company holding?',
        options: [
          'A retirement party',
          'An awards dinner',
          'A product launch',
          'A training session',
        ],
        answer: 2,
        explanationVi:
          '"the catering for our product launch on the ninth" → buổi ra mắt sản phẩm (C).',
        translationVi: 'Công ty của người phụ nữ tổ chức sự kiện gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'Why does the woman want to change the style of service?',
        options: [
          'Fewer guests will attend.',
          'The lunch break will be shorter.',
          'The kitchen is too small.',
          'The room will be used for another activity.',
        ],
        answer: 3,
        explanationVi:
          '"the room will be set up for product demonstrations, and tables would just get in the way" → phòng sẽ dùng cho hoạt động khác (D). Số khách không đổi ("The number’s the same"), nên (A) sai.',
        translationVi: 'Tại sao người phụ nữ muốn đổi hình thức phục vụ?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the woman say about Mr. Ito?',
        options: [
          'He will lead the product demonstrations.',
          'He is responsible for the event’s finances.',
          'He requested gluten-free meals.',
          'He works for the catering company.',
        ],
        answer: 1,
        explanationVi:
          '"He’s the one managing the event budget" → phụ trách tài chính của sự kiện (B, "budget" → "finances").',
        translationVi: 'Người phụ nữ nói gì về ông Ito?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'IT',
    transcript: [
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Rachel, I’ve been going through our invoice for the design software. We pay for forty licenses, but the dashboard shows only twenty-six people have logged in this quarter.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Some of those seats are for contractors who only work with us on big projects. The Harmon Tower bid starts next month.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Even so, that leaves about a dozen seats sitting idle. The vendor now offers shared licenses. People check one out when they need it.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'I’ve heard of that. Well, the renewal is in three weeks.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Exactly, so if we want to switch, we have to tell them soon. Could you find out how many contractors you’ll bring in for Harmon?',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'I’ll ask the project leads. But remember, shared seats run out at busy times. Last spring the drafting team lost half a day waiting for one.',
      },
      {
        speaker: 'M',
        accent: 'CA',
        text: 'Good point. Let’s get the numbers first and then decide on a mix of both types.',
      },
    ],
    questions: [
      {
        text: 'What has the man noticed?',
        options: [
          'A software update failed.',
          'An invoice contains an error.',
          'Some contractors were overpaid.',
          'Some licenses are not being used.',
        ],
        answer: 3,
        explanationVi:
          'Trả tiền 40 giấy phép nhưng chỉ 26 người đăng nhập → "a dozen seats sitting idle" → một số giấy phép không được dùng (D). Hóa đơn không sai (B), chỉ là lãng phí.',
        translationVi: 'Người đàn ông đã nhận ra điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the woman imply when she says, "the renewal is in three weeks"?',
        options: [
          'The vendor has raised its prices.',
          'She will be away for three weeks.',
          'A decision has to be made quickly.',
          'The current contract cannot be canceled.',
        ],
        answer: 2,
        explanationVi:
          'Người đàn ông hiểu ngay: "Exactly, so if we want to switch, we have to tell them soon" → cần quyết định sớm (C). Không có thông tin về giá hay việc cô vắng mặt.',
        translationVi:
          'Người phụ nữ ngụ ý gì khi nói "ba tuần nữa là đến hạn gia hạn"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What does the woman agree to do?',
        options: [
          'Check with project managers',
          'Reduce the number of contractors',
          'Try out a shared license',
          'Call the software vendor',
        ],
        answer: 0,
        explanationVi:
          '"I’ll ask the project leads" (về số nhà thầu cho dự án Harmon) → hỏi các trưởng dự án (A). Liên hệ nhà cung cấp (D) chưa được giao cho ai.',
        translationVi: 'Người phụ nữ đồng ý làm gì?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Manufacturing',
    transcript: [
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Pedro, Hamish, Kestrel Garden Supply has sent photos of damaged planters again. That’s the third shipment this month.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'The cracks are along the rim every time. I don’t think it’s the molding. They leave our line in perfect shape, so it must be the packing.',
      },
      {
        speaker: 'M2',
        accent: 'GB',
        text: 'We switched to thinner cardboard dividers in August to cut costs. The timing fits.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'How much more would the old dividers cost us?',
      },
      {
        speaker: 'M2',
        accent: 'GB',
        text: 'About eleven cents per unit.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Compared with replacing entire shipments? That’s hardly a debate.',
      },
      {
        speaker: 'M',
        accent: 'US',
        text: 'Agreed. Still, I’d like to run a drop test on a few sample boxes before we change anything, just to be sure.',
      },
      {
        speaker: 'M2',
        accent: 'GB',
        text: 'I can set that up for Thursday morning. And I’ll invite someone from Kestrel to watch, if you like.',
      },
      {
        speaker: 'W',
        accent: 'AU',
        text: 'Yes, do. They’ll appreciate seeing that we’re taking this seriously.',
      },
    ],
    questions: [
      {
        text: 'What problem are the speakers discussing?',
        options: [
          'A customer has paid late.',
          'Products are arriving broken.',
          'A machine has stopped working.',
          'Materials are in short supply.',
        ],
        answer: 1,
        explanationVi:
          '"photos of damaged planters again… the third shipment" → hàng đến nơi bị hư hỏng (B, "damaged/cracks" → "broken"). "molding", "line" là bẫy gợi đến máy móc (C).',
        translationVi: 'Những người nói đang thảo luận về vấn đề gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the woman mean when she says, "That’s hardly a debate"?',
        options: [
          'The more expensive option is clearly worthwhile.',
          'She would like to discuss the issue later.',
          'The customer’s complaint is unreasonable.',
          'The cost figure should be checked again.',
        ],
        answer: 0,
        explanationVi:
          'So 11 xu mỗi sản phẩm với chi phí thay cả lô hàng → chẳng có gì phải bàn, dùng lại vách ngăn cũ đắt hơn là đáng (A). "debate" khiến (B) nghe hợp lý nhưng sai ý.',
        translationVi:
          'Người phụ nữ muốn nói gì khi nói "Chuyện đó chẳng có gì phải bàn cãi"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What does one of the men offer to do?',
        options: [
          'Visit a client’s warehouse',
          'Redesign a product',
          'Order new dividers immediately',
          'Have a client representative observe a test',
        ],
        answer: 3,
        explanationVi:
          '"I’ll invite someone from Kestrel to watch" buổi drop test → mời đại diện khách hàng đến xem thử nghiệm (D). Họ muốn thử trước "before we change anything", nên (C) sai.',
        translationVi: 'Một trong hai người đàn ông đề nghị làm gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Arts',
    transcript: [
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Hi, Martin. It’s Elena Rossi from the Harbor City Museum of Art. I’m calling about the three paintings your gallery is lending us for the coastal landscapes exhibition.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'Hi, Elena. Everything’s on track. The crates are being built this week.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Good. Our insurer now wants an updated condition report on each painting before it’s packed. Could your conservator do that?',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'She could, but she’s fully booked until next Wednesday, and the shipping company collects on Tuesday.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Hmm. Could the shipper come a day later?',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'I can ask, but they’re combining our pickup with a delivery to Glasgow. It won’t be easy to move.',
      },
      {
        speaker: 'W',
        accent: 'CA',
        text: 'Well, our own conservator is going to be in your area on Monday.',
      },
      {
        speaker: 'M',
        accent: 'AU',
        text: 'Oh, that would solve everything. I’ll let our registrar know to expect her.',
      },
    ],
    questions: [
      {
        text: 'What is the woman calling about?',
        options: [
          'Artworks on loan',
          'A review of an exhibition',
          'A museum membership',
          'The sale of a painting',
        ],
        answer: 0,
        explanationVi:
          '"the three paintings your gallery is lending us" → các tác phẩm được cho mượn (A). Không có chuyện mua bán tranh (D).',
        translationVi: 'Người phụ nữ gọi điện về việc gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What does the woman’s insurer require?',
        options: [
          'A shipping invoice',
          'A security inspection',
          'A new type of crate',
          'Documentation of each item’s state',
        ],
        answer: 3,
        explanationVi:
          '"an updated condition report on each painting" → tài liệu ghi nhận tình trạng từng bức tranh (D). "crates" là bẫy lặp từ (C).',
        translationVi: 'Công ty bảo hiểm của người phụ nữ yêu cầu gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Why does the woman say, "our own conservator is going to be in your area on Monday"?',
        options: [
          'To recommend a different shipping company',
          'To explain why she cannot visit in person',
          'To offer a way around a scheduling problem',
          'To introduce a newly hired employee',
        ],
        answer: 2,
        explanationVi:
          'Chuyên viên bảo quản của phòng tranh bận đến thứ Tư, còn hàng được lấy vào thứ Ba và khó dời → cô gợi ý để chuyên viên của bảo tàng làm báo cáo vào thứ Hai (C). Người đàn ông đáp "that would solve everything".',
        translationVi:
          'Tại sao người phụ nữ nói "chuyên viên bảo quản của chúng tôi sẽ ở khu vực của anh vào thứ Hai"?',
        skillTags: ['comprehension.speaker-intent'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Health',
    transcript: [
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Hi, I’m Felix Grant, the HR coordinator at Dunmore Logistics. We’re thinking of offering gym memberships to our staff, and a colleague recommended your fitness center.',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Thanks for considering us. We have a corporate plan for groups of twenty or more, and members can use all four of our branches.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'That’s good to hear, since our employees work at two different sites. Do you run any classes at lunchtime?',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'Yes, thirty-minute yoga and cycling classes at noon every weekday.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Excellent. And what’s the price per person?',
      },
      {
        speaker: 'W',
        accent: 'US',
        text: 'That depends on how many people sign up. Why don’t I come to your office and give your staff a short presentation? Then we’ll know how many are interested.',
      },
      {
        speaker: 'M',
        accent: 'GB',
        text: 'Sounds good. I’ll find a day that suits everyone and get back to you.',
      },
    ],
    questions: [
      {
        text: 'Where does the woman most likely work?',
        options: [
          'At a logistics company',
          'At a medical clinic',
          'At a health club',
          'At a recruitment agency',
        ],
        answer: 2,
        explanationVi:
          'Người đàn ông gọi đến "your fitness center", cô giới thiệu gói hội viên và lớp yoga → câu lạc bộ thể hình (C). Công ty logistics là nơi người đàn ông làm (A là bẫy).',
        translationVi: 'Người phụ nữ có lẽ làm việc ở đâu?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'Why is the man pleased with the corporate plan?',
        options: [
          'It includes free personal training.',
          'It can be used at several locations.',
          'It has no minimum group size.',
          'It is cheaper than he expected.',
        ],
        answer: 1,
        explanationVi:
          '"members can use all four of our branches" + "That’s good to hear, since our employees work at two different sites" → dùng được ở nhiều chi nhánh (B). Gói có tối thiểu 20 người nên (C) sai; giá chưa được báo (D).',
        translationVi: 'Tại sao người đàn ông hài lòng với gói doanh nghiệp?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does the woman offer to do?',
        options: [
          'Lower the membership price',
          'Mail a brochure',
          'Extend the opening hours',
          'Speak to the man’s employees',
        ],
        answer: 3,
        explanationVi:
          '"Why don’t I come to your office and give your staff a short presentation?" → đến thuyết trình cho nhân viên (D, "staff" = "employees").',
        translationVi: 'Người phụ nữ đề nghị làm gì?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
]
