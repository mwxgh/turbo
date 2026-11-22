/** Full Test 02, Part 7 Single: written for Lingo (not from ETS). */
export const P7_SINGLE: object[] = [
  {
    difficulty: 'EASY',
    topic: 'Hospitality',
    passage:
      'Nadia Brennan [10:31 A.M.]\nHi Luis, the Okonjo wedding party just arrived. There are twelve of them, and their rooms aren’t due to be ready until 3:00.\n\nLuis Ferreira [10:34 A.M.]\nHousekeeping is two people short today. The best I can promise is six rooms by noon.\n\nNadia Brennan [10:36 A.M.]\nThey’ve just come off an overnight flight. Is there anywhere they can rest in the meantime?\n\nLuis Ferreira [10:39 A.M.]\nThe garden suite on the ground floor was cleaned first thing this morning, and nobody checks in there until Friday.\n\nNadia Brennan [10:41 A.M.]\nIt only has one bedroom, though. Would that be enough?\n\nLuis Ferreira [10:42 A.M.]\nIt has two sofas and a balcony.\n\nNadia Brennan [10:44 A.M.]\nFine. I’ll take them there with some coffee and pastries and let them know as soon as their own rooms are ready.',
    questions: [
      {
        text: 'What problem does Ms. Brennan mention?',
        options: [
          'Some guests have arrived before their rooms are ready.',
          'A wedding reception has been canceled.',
          'A group’s flight has been delayed.',
          'Some guests have complained about housekeeping.',
        ],
        answer: 0,
        explanationVi:
          '"the Okonjo wedding party just arrived… their rooms aren’t due to be ready until 3:00" → khách đến trước khi phòng sẵn sàng (A). Chuyến bay qua đêm đã đến nơi, không bị hoãn (C).',
        translationVi: 'Cô Brennan đề cập đến vấn đề gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'At 10:42 A.M., what does Mr. Ferreira most likely mean when he writes, "It has two sofas and a balcony"?',
        options: [
          'The garden suite costs more than a standard room.',
          'The garden suite has enough space for the group to wait in.',
          'The guests should book the garden suite for Friday.',
          'The garden suite still needs to be cleaned.',
        ],
        answer: 1,
        explanationVi:
          'Cô Brennan lo phòng "only has one bedroom… Would that be enough?" → anh trả lời có hai ghế sofa và ban công, tức là đủ chỗ cho nhóm nghỉ tạm (B). Phòng "was cleaned first thing this morning" nên (D) sai.',
        translationVi:
          'Lúc 10:42 sáng, anh Ferreira nhiều khả năng có ý gì khi viết "It has two sofas and a balcony"?',
        skillTags: ['comprehension.speaker-intent'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Retail',
    passage:
      'CARROWAY HOME & GARDEN\nHoliday Returns Policy\n\nItems bought between 15 November and 24 December may be returned or exchanged until 31 January, instead of within our usual 30 days. Please keep your receipt or the gift receipt printed at the till. Without one, we can offer store credit only.\n\nPlants, cut flowers and made-to-measure curtains cannot be returned unless they are faulty. Large furniture must be returned through our collection service, which can be booked at any customer service desk for a fee of £20.\n\nThank you for shopping with us, and happy holidays!',
    questions: [
      {
        text: 'What is the purpose of the notice?',
        options: [
          'To advertise a holiday sale',
          'To introduce a home delivery service',
          'To announce new opening hours',
          'To explain a longer period for returning goods',
        ],
        answer: 3,
        explanationVi:
          '"may be returned or exchanged until 31 January, instead of within our usual 30 days" → thời hạn đổi trả được kéo dài (D). Dịch vụ thu hồi đồ nội thất chỉ là chi tiết phụ, không phải giao hàng (B).',
        translationVi: 'Mục đích của thông báo là gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'According to the notice, what will customers without a receipt receive?',
        options: [
          'A cash refund',
          'A free collection service',
          'Credit to spend in the store',
          'An exchange for a similar item',
        ],
        answer: 2,
        explanationVi:
          '"Without one, we can offer store credit only" → chỉ nhận tín dụng mua hàng tại cửa hàng (C). Dịch vụ thu hồi tốn phí £20, không miễn phí (B).',
        translationVi:
          'Theo thông báo, khách hàng không có hoá đơn sẽ nhận được gì?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'EASY',
    topic: 'Publishing',
    passage:
      'POSITION AVAILABLE: Editorial Assistant\nHarrowgate Press – Children’s Books Division\n\nHarrowgate Press, which publishes more than 60 picture books and early readers a year, is seeking an editorial assistant to support its team of four editors. Duties include checking manuscripts for consistency, handling correspondence with authors and illustrators, and keeping production schedules up to date.\n\nRequirements:\n• A university degree in English, education or a related subject\n• Excellent attention to detail\n• Familiarity with spreadsheet software\n\nExperience in publishing is welcome but not essential, as full training will be provided. The position is based in our Edinburgh office, with the option of working from home two days a week. To apply, send a CV and a one-page letter describing a children’s book you admire to jobs@harrowgatepress.co.uk by 12 October.',
    questions: [
      {
        text: 'What is NOT listed as a requirement for the position?',
        options: [
          'Careful attention to detail',
          'Knowledge of spreadsheet programs',
          'A university degree',
          'Previous work at a publishing company',
        ],
        answer: 3,
        explanationVi:
          '"Experience in publishing is welcome but not essential" → kinh nghiệm xuất bản không bắt buộc (D). (A), (B), (C) đều nằm trong mục "Requirements".',
        translationVi: 'Điều gì KHÔNG được liệt kê là yêu cầu của vị trí này?',
        skillTags: ['comprehension.not-true'],
      },
      {
        text: 'What are applicants asked to send with their CV?',
        options: [
          'A letter about a children’s book they like',
          'A sample of their own illustrations',
          'A list of authors they have worked with',
          'A proposed production schedule',
        ],
        answer: 0,
        explanationVi:
          '"send a CV and a one-page letter describing a children’s book you admire" → thư viết về một cuốn sách thiếu nhi mình yêu thích (A).',
        translationVi: 'Người ứng tuyển được yêu cầu gửi gì kèm theo CV?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Health',
    passage:
      'CORRIGAN CLINICAL SUPPLY\nORDER CONFIRMATION #CC-55203\nDate: 6 February\nShip to: Ashford Family Practice, 14 Tilden Avenue, Ashford, KY 41101\nOrdered by: Dana Whitcombe, Practice Manager\n\nExam-table paper (case of 12 rolls) × 4 ........ $152.00\nNitrile gloves, medium (box of 100) × 20 ........ $150.00\nThermometer probe covers (pack of 200) × 10 ........ $110.00\nBlood pressure cuff, adult large × 2 ........ BACKORDERED\n\nSubtotal: $412.00\nShipping: $0.00\nTOTAL CHARGED: $412.00\n\nNote: Orders over $400 ship free. Backordered items are sent separately when stock arrives (expected 20 February for the blood pressure cuffs) and are charged to your card on the day they are dispatched. To cancel a backordered item, simply reply to this confirmation before it ships.',
    questions: [
      {
        text: 'Why was Ashford Family Practice not charged for shipping?',
        options: [
          'Ms. Whitcombe used a discount code.',
          'The order total was above a certain amount.',
          'Some of the items were out of stock.',
          'The practice collected the order in person.',
        ],
        answer: 1,
        explanationVi:
          'Phí vận chuyển $0.00 vì "Orders over $400 ship free", mà tổng đơn là $412.00 (B). Văn bản không nhắc đến mã giảm giá (A).',
        translationVi:
          'Tại sao Ashford Family Practice không bị tính phí vận chuyển?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What is suggested about the blood pressure cuffs?',
        options: [
          'They were ordered by mistake.',
          'They will arrive before the rest of the order.',
          'The practice has not yet paid for them.',
          'They can no longer be canceled.',
        ],
        answer: 2,
        explanationVi:
          'Hàng chờ "are charged to your card on the day they are dispatched" và tổng $412.00 không gồm giá máy đo huyết áp → phòng khám chưa trả tiền cho chúng (C). Vẫn có thể huỷ "before it ships" nên (D) sai.',
        translationVi: 'Có thể suy ra điều gì về những vòng bít đo huyết áp?',
        skillTags: ['comprehension.inference'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Logistics',
    passage:
      'Priya Anand [10:35 A.M.]: Heads up, the refrigerated trailer from Dalston Farms is held at the border crossing. Customs wants a corrected temperature log before they release it.\nMarco Bellini [10:37 A.M.]: That’s the dairy load for the Westfield stores. They’re expecting it by 4:00 for the weekend.\nPriya Anand [10:38 A.M.]: Dalston says they sent the log an hour ago, but it went to our old customs broker.\nHye-jin Kwon [10:40 A.M.]: I can forward it to Kessler Brokerage from here. Priya, what’s the shipment reference?\nPriya Anand [10:41 A.M.]: TR-88412.\nHye-jin Kwon [10:42 A.M.]: Done. I copied the border office as well.\nMarco Bellini [10:44 A.M.]: Thanks. Even if it clears by noon, the driver has to take a rest break on the way. I’ll warn Westfield it could be closer to 6:00.\nPriya Anand [10:45 A.M.]: Good idea. I’ll ask Dalston to update their contact list so this doesn’t happen again.',
    questions: [
      {
        text: 'Why has the shipment been held up?',
        options: [
          'The trailer’s refrigeration system failed.',
          'The driver has taken a longer route.',
          'A document was sent to the wrong company.',
          'The Westfield stores changed their order.',
        ],
        answer: 2,
        explanationVi:
          'Hải quan cần "a corrected temperature log", nhưng Dalston gửi nó "to our old customs broker" → tài liệu bị gửi nhầm nơi (C).',
        translationVi: 'Tại sao lô hàng bị giữ lại?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'At 10:42 A.M., what does Ms. Kwon most likely mean when she writes, "Done"?',
        options: [
          'She has sent the log to the company’s current broker.',
          'She has finished updating Dalston’s contact list.',
          'She has confirmed the delivery time with Westfield.',
          'She has found the shipment reference number.',
        ],
        answer: 0,
        explanationVi:
          'Cô vừa nói "I can forward it to Kessler Brokerage" và nhận mã lô hàng từ Priya → "Done" nghĩa là đã chuyển nhật ký nhiệt độ cho công ty môi giới hiện tại (A). Mã số do Priya cung cấp, không phải cô tìm (D).',
        translationVi:
          'Lúc 10:42 sáng, cô Kwon nhiều khả năng có ý gì khi viết "Done"?',
        skillTags: ['comprehension.speaker-intent'],
      },
      {
        text: 'What will Mr. Bellini most likely do next?',
        options: [
          'Contact the border office',
          'Arrange for a second driver',
          'Ask Dalston Farms for a new log',
          'Tell a customer that a delivery may be late',
        ],
        answer: 3,
        explanationVi:
          '"I’ll warn Westfield it could be closer to 6:00" → báo cho cửa hàng Westfield rằng hàng có thể đến muộn (D). Việc liên hệ Dalston là của Priya (C).',
        translationVi: 'Anh Bellini nhiều khả năng sẽ làm gì tiếp theo?',
        skillTags: ['comprehension.next-action'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Health',
    passage:
      'From: Records Office <records@lindenvalehealth.org>\nTo: Samuel Achterberg <s.achterberg@mailbox.net>\nDate: 18 June\nSubject: Your records request (Ref. LV-2291)\n\nDear Mr. Achterberg,\n\nThank you for your request of 11 June to have your medical records sent to Dr. Helen Moyo at Brookside Medical Centre. Before we can release them, however, we need a signed authorization form. The form you submitted online did not include a signature, which is a common oversight with our web form.\n\nPlease print the attached form, sign it, and either upload a scan through the patient portal or drop it off at the reception desk of any Lindenvale clinic. Once we receive it, your records will be transferred electronically within five working days. There is no charge for transfers between healthcare providers; a fee applies only when patients request paper copies for themselves.\n\nIf you would like your X-ray images to be included, please tick the box in section 3. Image files are large and are sent separately, so they may arrive a few days after the rest of your records.\n\nKind regards,\nFiona Galbraith\nRecords Coordinator, Lindenvale Health',
    questions: [
      {
        text: 'Why did Ms. Galbraith write to Mr. Achterberg?',
        options: [
          'To confirm that his records have been sent',
          'To request a form that has been signed',
          'To explain a fee for paper copies',
          'To introduce him to a new doctor',
        ],
        answer: 1,
        explanationVi:
          '"Before we can release them… we need a signed authorization form. The form you submitted online did not include a signature" → yêu cầu gửi lại mẫu đơn có chữ ký (B). Hồ sơ chưa được gửi nên (A) sai.',
        translationVi: 'Tại sao cô Galbraith viết thư cho anh Achterberg?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What is indicated about X-ray images?',
        options: [
          'They are transferred only on paper.',
          'They must be collected from a clinic.',
          'They are sent within five working days.',
          'They are not included unless the patient asks for them.',
        ],
        answer: 3,
        explanationVi:
          '"If you would like your X-ray images to be included, please tick the box in section 3" → ảnh X-quang chỉ được gửi khi bệnh nhân yêu cầu (D). Ảnh có thể đến "a few days after the rest of your records", nên (C) không chắc chắn.',
        translationVi: 'Điều gì được nêu về ảnh X-quang?',
        skillTags: ['comprehension.not-true'],
      },
      {
        text: 'The word "release" in paragraph 1 is closest in meaning to',
        options: ['announce', 'excuse', 'hand over', 'loosen'],
        answer: 2,
        explanationVi:
          '"Before we can release them" (them = hồ sơ y tế) → "release" ở đây là giao ra, chuyển đi = "hand over" (C).',
        translationVi: 'Từ "release" trong đoạn 1 có nghĩa gần nhất với',
        skillTags: ['comprehension.vocab-in-context'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Retail',
    passage:
      'MEMO\nTo: Store managers, Pellham Outdoor\nFrom: Graham Tse, Inventory Control\nDate: 3 March\nRe: Spring stock count\n\nThis year’s spring stock count will take place on the night of Sunday, 23 March, after closing. Unlike in previous years, counts will be done with the handheld scanners introduced last autumn rather than on paper sheets. Results will therefore be uploaded directly to the inventory system instead of being typed in by the regional office the following week.\n\nBecause the scanners are faster, we expect most stores to finish in about four hours, roughly half the time the paper count took. Managers should schedule no more than six staff members for the count, and only those who have completed scanner training. A list of trained employees at each store is attached; anyone not on it can attend a 30-minute refresher session on 17 or 18 March.\n\nPlease also make sure that all deliveries received that week are shelved or tagged "uncounted" by Saturday evening. Last year, boxes left unopened in stockrooms were the main cause of differences between counted and recorded stock, and several stores had to be recounted at their own expense.',
    questions: [
      {
        text: 'What is the main purpose of the memo?',
        options: [
          'To describe changes to a regular procedure',
          'To announce the purchase of new equipment',
          'To report the results of last year’s count',
          'To ask managers to recommend trainers',
        ],
        answer: 0,
        explanationVi:
          'Bản ghi nhớ nói về đợt kiểm kê mùa xuân hằng năm và điểm khác: "Unlike in previous years, counts will be done with the handheld scanners" → mô tả thay đổi trong một quy trình định kỳ (A). Máy quét đã có từ "last autumn", không phải mới mua (B).',
        translationVi: 'Mục đích chính của bản ghi nhớ là gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What is suggested about the paper stock counts?',
        options: [
          'They were carried out by the regional office.',
          'They required at least six employees per store.',
          'They usually took about eight hours.',
          'They were held on Saturday evenings.',
        ],
        answer: 2,
        explanationVi:
          'Máy quét giúp xong trong "about four hours, roughly half the time the paper count took" → kiểm kê bằng giấy mất khoảng tám giờ (C). Văn phòng khu vực chỉ nhập số liệu ("typed in"), không đi đếm hàng (A).',
        translationVi: 'Có thể suy ra điều gì về các đợt kiểm kê bằng giấy?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'What are managers asked to do before the count?',
        options: [
          'Send the inventory list to the regional office',
          'Deal with stock that arrived during the week',
          'Attend a refresher session on the scanners',
          'Open all the boxes in the stockroom on Sunday',
        ],
        answer: 1,
        explanationVi:
          '"make sure that all deliveries received that week are shelved or tagged "uncounted" by Saturday evening" → xử lý hàng nhận trong tuần (B). Buổi ôn tập dành cho nhân viên chưa có trong danh sách, không bắt buộc với quản lý (C).',
        translationVi: 'Các quản lý được yêu cầu làm gì trước đợt kiểm kê?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Logistics',
    passage:
      'DUNMORE — A shopping centre that has stood half-empty since its largest store closed in 2023 has found an unexpected new tenant. Parcelway, a regional delivery company, has signed a ten-year lease on the former department store at Dunmore Galleria and will turn it into a sorting and storage hub for online orders. [1]\n\nThe location is the main attraction. The Galleria sits beside the ring road, within 15 minutes of most homes in the city, and its multi-storey car park can hold Parcelway’s fleet of 80 electric vans overnight. "Out-of-town warehouses are cheaper per square metre, but every extra mile adds cost to the final delivery," said operations director Kieran Walsh. "Here, our drivers begin their routes already surrounded by their customers." [2]\n\nThe 9,000-square-metre space will be fitted with conveyors and loading bays at the rear of the building, away from the remaining shops. Work is due to begin in April, and the hub should be fully operating by the autumn, in time for the busy pre-holiday period. [3]\n\nNot everyone is enthusiastic. Some shop owners in the Galleria worry that van traffic will discourage shoppers. The centre’s management says the vans will use a separate entrance on Fenner Street and will not enter the customer car park during opening hours. [4] Parcelway also plans to open a parcel collection counter inside the centre, which management hopes will bring more people through its doors.',
    questions: [
      {
        text: 'What is the article mainly about?',
        options: [
          'The closure of a department store',
          'The construction of a new ring road',
          'A shopping centre’s plan to attract new shops',
          'A company’s move into an unused retail building',
        ],
        answer: 3,
        explanationVi:
          'Parcelway "has signed a ten-year lease on the former department store… and will turn it into a sorting and storage hub" → công ty chuyển vào toà nhà bán lẻ bỏ trống (D). Việc cửa hàng đóng cửa (2023) chỉ là bối cảnh (A).',
        translationVi: 'Bài báo chủ yếu nói về điều gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'According to Mr. Walsh, what is an advantage of the Galleria site?',
        options: [
          'It costs less to rent than an out-of-town warehouse.',
          'It shortens the distance to delivery addresses.',
          'It has charging points for electric vans.',
          'It is close to the company’s suppliers.',
        ],
        answer: 1,
        explanationVi:
          '"every extra mile adds cost to the final delivery… our drivers begin their routes already surrounded by their customers" → rút ngắn quãng đường đến địa chỉ giao hàng (B). Anh nói kho ngoại thành mới rẻ hơn, nên (A) sai.',
        translationVi: 'Theo anh Walsh, lợi thế của địa điểm Galleria là gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What is NOT stated about the planned hub?',
        options: [
          'It will operate only outside shopping hours.',
          'It will be fully operating by the autumn.',
          'Its vans will use a separate entrance.',
          'It will include a collection counter for parcels.',
        ],
        answer: 0,
        explanationVi:
          'Bài chỉ nói xe "will not enter the customer car park during opening hours", không nói trung tâm chỉ hoạt động ngoài giờ mua sắm (A). (B) "fully operating by the autumn", (C) "a separate entrance on Fenner Street", (D) "a parcel collection counter" đều được nêu.',
        translationVi: 'Điều gì KHÔNG được nêu về trung tâm phân loại dự kiến?',
        skillTags: ['comprehension.not-true'],
      },
      {
        text: 'In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n"As a result, Parcelway expects to cut its average delivery time by almost a third."',
        options: ['[1]', '[2]', '[3]', '[4]'],
        answer: 1,
        explanationVi:
          '"As a result" cần một nguyên nhân liên quan đến thời gian giao hàng: ngay trước [2] là "our drivers begin their routes already surrounded by their customers" → giao nhanh hơn. Các vị trí khác nói về hợp đồng thuê, thi công và giao thông.',
        translationVi:
          'Câu sau phù hợp nhất ở vị trí nào trong [1], [2], [3], [4]? "Nhờ vậy, Parcelway kỳ vọng rút ngắn thời gian giao hàng trung bình gần một phần ba."',
        skillTags: ['comprehension.sentence-insertion'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Hospitality',
    passage:
      'Stanmore Quay Hotel\n4 Harbour Parade, Galway\n\n2 September\n\nMs. Orla Kinsella\nKinsella Coach Tours\n19 Eyre Street, Galway\n\nDear Ms. Kinsella,\n\nI am writing to let you know about building work that will affect the groups you have booked with us this winter. From 4 November to 12 December, we will be refurbishing the east wing, which contains 40 of our 110 rooms as well as the breakfast room.\n\nAll of your confirmed bookings during that period remain valid. However, since your groups usually take rooms in the east wing so that they can stay together, they will instead be spread across the second and third floors of the main building. Breakfast will be served in the Lantern Bar, which will open at 6:30 A.M., half an hour earlier than the breakfast room does at present, to cope with the larger number of guests in a smaller space.\n\nTo make up for the inconvenience, we will reduce the group rate by 15 percent for every night during the works and provide each tour leader with a complimentary room upgrade. If you would prefer to move any departures to dates after the work is finished, our reservations team will do so without the usual change fee, provided you let us know by 30 September.\n\nThe refurbished wing will reopen with new bathrooms, improved soundproofing and accessible rooms on every floor. I would be delighted to show you around once it is complete.\n\nYours sincerely,\nDeclan Furlong\nGeneral Manager',
    questions: [
      {
        text: 'Why did Mr. Furlong write the letter?',
        options: [
          'To confirm a new group booking',
          'To invite Ms. Kinsella to a reopening event',
          'To inform a business partner about the effects of renovation work',
          'To apologize for problems during a recent group stay',
        ],
        answer: 2,
        explanationVi:
          '"I am writing to let you know about building work that will affect the groups you have booked with us" → thông báo ảnh hưởng của việc cải tạo cho đối tác (C). Lời mời tham quan ở cuối thư chỉ là phụ, không phải sự kiện khai trương (B).',
        translationVi: 'Tại sao anh Furlong viết lá thư này?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'What will change about breakfast during the work?',
        options: [
          'It will start earlier in the morning.',
          'It will be served in guests’ rooms.',
          'It will be offered at a reduced price.',
          'It will be available only to tour leaders.',
        ],
        answer: 0,
        explanationVi:
          'Quầy Lantern Bar "will open at 6:30 A.M., half an hour earlier than the breakfast room does at present" → bữa sáng bắt đầu sớm hơn (A). Mức giảm 15% áp dụng cho giá phòng đoàn, không phải bữa sáng (C).',
        translationVi: 'Bữa sáng sẽ thay đổi thế nào trong thời gian thi công?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'The phrase "cope with" in paragraph 2 is closest in meaning to',
        options: ['compete with', 'agree with', 'share with', 'manage'],
        answer: 3,
        explanationVi:
          '"to cope with the larger number of guests in a smaller space" → mở cửa sớm để xoay xở với lượng khách đông hơn trong không gian nhỏ hơn; "cope with" = "manage" (D).',
        translationVi: 'Cụm từ "cope with" trong đoạn 2 có nghĩa gần nhất với',
        skillTags: ['comprehension.vocab-in-context'],
      },
      {
        text: 'What is NOT mentioned as a feature of the refurbished east wing?',
        options: [
          'Better protection from noise',
          'A larger breakfast room',
          'Rooms suitable for guests with disabilities',
          'New bathrooms',
        ],
        answer: 1,
        explanationVi:
          'Cánh đông mới có "new bathrooms, improved soundproofing and accessible rooms on every floor" → (A), (C), (D) đều được nêu. Thư không nói phòng ăn sáng sẽ rộng hơn (B).',
        translationVi:
          'Điều gì KHÔNG được nhắc đến như một đặc điểm của cánh đông sau cải tạo?',
        skillTags: ['comprehension.not-true'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Publishing',
    passage:
      'THE LANTERN QUARTERLY — Emerging Writers Prize\n\nNow in its eighth year, the Emerging Writers Prize is open to anyone who has not yet published a book-length work of fiction with a commercial publisher. Self-published authors and writers whose stories have appeared in magazines or anthologies remain eligible.\n\nEntries must be original, previously unpublished short stories of between 2,000 and 5,000 words, written in English. Each writer may submit up to two stories. The entry fee is $15 per story; the fee is waived for students enrolled at any college or university, who should attach a copy of a current student card.\n\nSubmissions are read anonymously, so the author’s name must not appear anywhere in the manuscript; it should be written only on the online entry form. Stories that break this rule will be set aside without being read.\n\nThe winner will receive $2,500, publication in our spring issue and a one-week stay at the Whitlow Writers’ Retreat in Vermont. Two runners-up will each receive $500 and publication on our website. This year’s judge is novelist Teodora Vance, whose debut collection was itself shortlisted for the prize in its first year.\n\nThe deadline is 31 January. Results will be announced in April, and all entrants will be notified by e-mail. Because of the volume of entries, we are unable to provide individual feedback.',
    questions: [
      {
        text: 'Who is eligible to enter the competition?',
        options: [
          'A writer whose first novel was released by a major publisher',
          'A student who wants feedback on an unfinished story',
          'A writer whose short story has appeared in a magazine',
          'An author whose story has already won a different prize',
        ],
        answer: 2,
        explanationVi:
          '"writers whose stories have appeared in magazines or anthologies remain eligible" → (C). Người đã ra tiểu thuyết với nhà xuất bản thương mại thì không đủ điều kiện (A); cuộc thi "unable to provide individual feedback" (B).',
        translationVi: 'Ai đủ điều kiện tham gia cuộc thi?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What is NOT a condition of entry?',
        options: [
          'Stories must be no longer than 5,000 words.',
          'Manuscripts must not show the writer’s name.',
          'Stories must be written in English.',
          'Each entrant must submit two stories.',
        ],
        answer: 3,
        explanationVi:
          '"Each writer may submit up to two stories" → tối đa hai truyện, không bắt buộc phải gửi hai (D). (A) "between 2,000 and 5,000 words", (B) "the author’s name must not appear", (C) "written in English" đều là điều kiện.',
        translationVi: 'Điều gì KHÔNG phải là điều kiện tham gia?',
        skillTags: ['comprehension.not-true'],
      },
      {
        text: 'The phrase "set aside" in paragraph 3 is closest in meaning to',
        options: ['saved', 'excluded', 'delayed', 'returned'],
        answer: 1,
        explanationVi:
          'Truyện vi phạm quy định "will be set aside without being read" → bị loại, không được đọc; "set aside" ở đây = "excluded" (B), không phải "để dành" (A).',
        translationVi: 'Cụm từ "set aside" trong đoạn 3 có nghĩa gần nhất với',
        skillTags: ['comprehension.vocab-in-context'],
      },
      {
        text: 'What is suggested about Teodora Vance?',
        options: [
          'She once entered the Emerging Writers Prize herself.',
          'She founded The Lantern Quarterly eight years ago.',
          'She teaches at the Whitlow Writers’ Retreat.',
          'She has judged the prize several times before.',
        ],
        answer: 0,
        explanationVi:
          'Tập truyện đầu tay của bà "was itself shortlisted for the prize in its first year" → bà từng gửi tác phẩm dự giải này (A). Văn bản không nói bà sáng lập tạp chí hay từng làm giám khảo.',
        translationVi: 'Có thể suy ra điều gì về Teodora Vance?',
        skillTags: ['comprehension.inference'],
      },
    ],
  },
]
