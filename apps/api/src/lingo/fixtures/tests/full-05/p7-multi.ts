/** Full Test 05, Part 7 Multi: written for Lingo (not from ETS). */
export const P7_MULTI: object[] = [
  {
    difficulty: 'MEDIUM',
    topic: 'Catering',
    passage:
      'SAFFRON & SAGE OFFICE CATERING\n\nFeeding a meeting, a training day or a whole floor? We deliver freshly made lunches anywhere in central Manchester.\n\nPlatters (each serves 8):\n• Mezze Platter — £58\n• Sandwich Selection — £46\n• Grain Bowl Platter (vegan) — £52\n• Fruit & Pastry Platter — £38\n\nOrders of four or more platters are delivered free; smaller orders carry a £9 delivery charge. Please order by 3:00 P.M. on the working day before delivery. Every platter is labelled with full allergen information, and gluten-free versions of the Sandwich Selection are available on request at no extra cost.\n\nOrder online at saffronandsage.co.uk or call 0161 555 0142.\n---\nFrom: Leonie Hartmann <l.hartmann@tannerylane.io>\nTo: orders@saffronandsage.co.uk\nDate: Tuesday, 8 October\nSubject: Lunch order for Thursday\n\nHello,\n\nWe have a client workshop on Thursday, 10 October, and I would like lunch delivered to our office at 22 Tannery Lane by 12:15 P.M. We are expecting 24 people, so I would like two Mezze Platters and one Grain Bowl Platter, as three of our guests are vegan.\n\nOne of our clients cannot eat gluten. Could you also add a Sandwich Selection made entirely gluten-free?\n\nI tried to place this order on your website this morning, but the page would not accept our postcode, so I am e-mailing instead. Please send the invoice to accounts@tannerylane.io.\n\nMany thanks,\nLeonie Hartmann\nOffice Coordinator, Tannery Lane Software',
    questions: [
      {
        text: 'What is indicated about Saffron & Sage?',
        options: [
          'It provides allergen details for its food.',
          'It delivers only to customers outside Manchester.',
          'It requires a week’s notice for all orders.',
          'It charges extra for gluten-free food.',
        ],
        answer: 0,
        explanationVi:
          '"Every platter is labelled with full allergen information" → có ghi thông tin dị ứng (A). Chỉ cần đặt trước 3 giờ chiều ngày làm việc hôm trước (C); bản không gluten "at no extra cost" (D).',
        translationVi: 'Điều gì được nêu về Saffron & Sage?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Why did Ms. Hartmann send the e-mail?',
        options: [
          'To cancel an earlier order',
          'To change a delivery address',
          'To place an order she could not complete online',
          'To complain about a late delivery',
        ],
        answer: 2,
        explanationVi:
          'Cô đặt các khay đồ ăn cho thứ Năm và giải thích "the page would not accept our postcode, so I am e-mailing instead" → đặt hàng qua email vì không đặt được trên web (C).',
        translationVi: 'Vì sao cô Hartmann gửi email?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'How much will Tannery Lane Software most likely pay for delivery?',
        options: ['£9', '£46', '£38', 'Nothing'],
        answer: 3,
        explanationVi:
          'Email: 2 Mezze + 1 Grain Bowl + 1 Sandwich Selection = 4 khay. Quảng cáo: "Orders of four or more platters are delivered free" → không mất phí giao hàng (D). £9 chỉ áp dụng cho đơn dưới 4 khay.',
        translationVi:
          'Tannery Lane Software nhiều khả năng sẽ trả bao nhiêu tiền giao hàng?',
        skillTags: ['comprehension.cross-reference', 'comprehension.detail'],
      },
      {
        text: 'What is suggested about the gluten-free Sandwich Selection that Ms. Hartmann requested?',
        options: [
          'It will cost more than the other platters.',
          'It will be priced the same as the standard version.',
          'It must be ordered a week in advance.',
          'It is suitable for vegan guests.',
        ],
        answer: 1,
        explanationVi:
          'Cô Hartmann xin một khay Sandwich Selection không gluten; quảng cáo nói bản không gluten "available on request at no extra cost" → giá bằng bản thường, £46 (B).',
        translationVi:
          'Điều gì được gợi ý về khay Sandwich Selection không gluten mà cô Hartmann yêu cầu?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'In the e-mail, the word "accept" in paragraph 3 is closest in meaning to',
        options: ['agree with', 'recognize', 'welcome', 'believe'],
        answer: 1,
        explanationVi:
          '"the page would not accept our postcode" = trang web không nhận/không nhận diện mã bưu chính → "recognize" (B). "agree with" và "welcome" là nghĩa khác của accept, không hợp với một trang web.',
        translationVi: 'Trong email, từ "accept" ở đoạn 3 gần nghĩa nhất với',
        skillTags: ['comprehension.vocab-in-context'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Software',
    passage:
      'LEDGERLY 6.2 — Release Notes (published 2 June)\n\nWhat’s new\n• Bank feeds: Ledgerly now imports transactions automatically from 14 additional banks, including Corbel Bank and Westmarch Savings.\n• Receipts: Snap a photo of a receipt in the mobile app, and Ledgerly will fill in the date, amount and supplier for you.\n• Reports: The profit-and-loss report can now be exported in spreadsheet format.\n\nChanges\n• Support for version 4 of the Ledgerly desktop app ends on 30 June. Customers still using it should switch to the browser version, which is free for all subscribers.\n• The Starter plan now includes up to 2 users (previously 1). The Plus plan remains at 5 users.\n\nKnown issue\n• Receipt scanning does not yet work for receipts in currencies other than pounds sterling. A fix is planned for version 6.3.\n---\nFrom: Ravi Chandrasekar <ravi@kilnhousepottery.co.uk>\nTo: support@ledgerly.com\nDate: 9 June\nSubject: Receipt scanning and desktop app\n\nHello,\n\nI run a small pottery studio and have used Ledgerly on the Starter plan for three years. My bookkeeper, Moira, has been sharing my login, so I was pleased to read that she can now have her own account.\n\nHowever, I have had trouble with the new receipt feature. Last week I bought glazes from a supplier in Lisbon, and when I photographed the receipt, the amount came out wrong. Receipts from my local suppliers have been read perfectly.\n\nAlso, I still use the desktop app on my studio computer. Will I have to pay anything to keep using Ledgerly after the end of the month?\n\nBest regards,\nRavi Chandrasekar\nKilnhouse Pottery',
    questions: [
      {
        text: 'What is one purpose of the release notes?',
        options: [
          'To announce a price increase',
          'To describe new features of a product',
          'To recruit new bank partners',
          'To apologize for a service outage',
        ],
        answer: 1,
        explanationVi:
          'Mục "What’s new" liệt kê các tính năng mới (bank feeds, quét hoá đơn, xuất báo cáo) → mô tả tính năng mới của sản phẩm (B). Không có tăng giá (A).',
        translationVi: 'Một mục đích của bản ghi chú phát hành là gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'Why most likely was the amount on the Lisbon receipt read incorrectly?',
        options: [
          'The receipt was in a currency other than pounds.',
          'The photo was taken on a desktop computer.',
          'The supplier’s bank is not supported.',
          'Mr. Chandrasekar’s plan does not include receipt scanning.',
        ],
        answer: 0,
        explanationVi:
          'Email: hoá đơn từ nhà cung cấp ở Lisbon (Bồ Đào Nha) bị đọc sai, hoá đơn trong nước thì đúng. Ghi chú: quét hoá đơn "does not yet work for receipts in currencies other than pounds sterling" → hoá đơn bằng ngoại tệ (A).',
        translationVi:
          'Vì sao số tiền trên hoá đơn từ Lisbon nhiều khả năng bị đọc sai?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'What is suggested about Moira?',
        options: [
          'She works for Ledgerly.',
          'She can use Ledgerly only on the Plus plan.',
          'She can now be added as a second user.',
          'She recommended that the studio change software.',
        ],
        answer: 2,
        explanationVi:
          'Ông Chandrasekar dùng gói Starter và nói Moira giờ có thể có tài khoản riêng; ghi chú cho biết gói Starter "now includes up to 2 users (previously 1)" → Moira là người dùng thứ hai (C).',
        translationVi: 'Điều gì được gợi ý về Moira?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'What will Mr. Chandrasekar most likely be told about the desktop app?',
        options: [
          'He must pay to upgrade to version 6.2.',
          'He can move to the browser version at no cost.',
          'He can keep using it until version 6.3 is released.',
          'He should contact his bank for help.',
        ],
        answer: 1,
        explanationVi:
          'Ông vẫn dùng bản desktop và hỏi có phải trả tiền sau cuối tháng không; ghi chú: hỗ trợ bản desktop 4 kết thúc 30/6, nên chuyển sang "the browser version, which is free for all subscribers" → chuyển sang bản trình duyệt miễn phí (B).',
        translationVi:
          'Ông Chandrasekar nhiều khả năng sẽ được trả lời gì về ứng dụng máy tính?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'What does Mr. Chandrasekar say about receipts from local suppliers?',
        options: [
          'They had to be entered by hand.',
          'They were sent to him by e-mail.',
          'Some of them were lost.',
          'They were scanned correctly.',
        ],
        answer: 3,
        explanationVi:
          '"Receipts from my local suppliers have been read perfectly" → được quét chính xác (D).',
        translationVi:
          'Ông Chandrasekar nói gì về hoá đơn từ các nhà cung cấp trong nước?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'MEDIUM',
    topic: 'Trade shows',
    passage:
      'NORDIC FURNITURE & DESIGN FAIR\nHelsinki Expo Centre, 18–21 March\n\nExhibitor Stand Options\n\nStandard Stand (9 m²): €2,400 — walls, carpet, one table, two chairs\nCorner Stand (12 m²): €3,600 — open on two sides, same furniture as Standard\nPremium Island (24 m²): €7,800 — open on all sides, includes lighting and a storage room\n\nExhibitors who book by 31 October receive a 15% early-booking discount. All stands include two exhibitor passes; additional passes are €45 each. Electricity is not included and must be ordered separately.\n---\nSTAND BOOKING FORM\n\nCompany: Aalto Grove Interiors Oy\nContact: Mikaela Rautio\nDate submitted: 27 October\nStand type: Corner Stand\nPreferred hall: Hall B (lighting & textiles)\nAdditional exhibitor passes: 3\nElectricity required: Yes\nComments: We will be launching a new range of wool rugs and would like a location near the hall entrance if possible.\n---\nFrom: Joonas Lehtinen <exhibitors@nfdf.fi>\nTo: Mikaela Rautio <m.rautio@aaltogrove.fi>\nDate: 4 November\nSubject: Your stand at the fair\n\nDear Ms. Rautio,\n\nThank you for your booking. I am sorry to say that all stands near the Hall B entrance had already been reserved by the time your form arrived. However, a Corner Stand has become available in Hall A, directly beside the main café, which is where visitors gather between seminars. If you would prefer this location, please let me know by 11 November.\n\nYour invoice, including your early-booking discount and extra passes, is attached. Please note that the furniture provided with your stand can be exchanged for display shelves free of charge if you tell us at least four weeks before the fair.\n\nBest regards,\nJoonas Lehtinen\nExhibitor Services',
    questions: [
      {
        text: 'What is indicated about Premium Island stands?',
        options: [
          'They are located in Hall B.',
          'They are available only to returning exhibitors.',
          'They come with four exhibitor passes.',
          'They include a storage room.',
        ],
        answer: 3,
        explanationVi:
          'Premium Island "includes lighting and a storage room" → có phòng chứa đồ (D). Mọi gian đều chỉ kèm hai thẻ triển lãm (C).',
        translationVi: 'Điều gì được nêu về gian Premium Island?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'How many exhibitor passes will Aalto Grove Interiors have in total?',
        options: ['Five', 'Two', 'Three', 'Four'],
        answer: 0,
        explanationVi:
          'Bảng giá: mỗi gian kèm 2 thẻ. Phiếu đăng ký: thêm 3 thẻ → tổng cộng 5 thẻ (A). "Three" chỉ là số thẻ mua thêm.',
        translationVi:
          'Aalto Grove Interiors sẽ có tổng cộng bao nhiêu thẻ triển lãm?',
        skillTags: ['comprehension.cross-reference', 'comprehension.detail'],
      },
      {
        text: 'What is suggested about Aalto Grove Interiors?',
        options: [
          'It has exhibited at the fair before.',
          'It does not need electricity.',
          'It will pay a reduced price for its stand.',
          'It asked for a Premium Island.',
        ],
        answer: 2,
        explanationVi:
          'Phiếu được nộp ngày 27/10, trước hạn 31/10 để được giảm 15% → được giảm giá gian hàng (C); email cũng xác nhận "your early-booking discount". Công ty cần điện (B) và chọn Corner Stand (D).',
        translationVi: 'Điều gì được gợi ý về Aalto Grove Interiors?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'Why does Mr. Lehtinen mention the café?',
        options: [
          'To recommend a place to have lunch',
          'To explain why a different location may attract visitors',
          'To announce that it will be closed during seminars',
          'To suggest a place for a meeting with him',
        ],
        answer: 1,
        explanationVi:
          'Cô Rautio muốn chỗ gần lối vào để giới thiệu sản phẩm mới; ông Lehtinen đề xuất gian ở Hall A cạnh quán cà phê, "where visitors gather between seminars" → giải thích vì sao vị trí mới vẫn thu hút khách (B).',
        translationVi: 'Vì sao ông Lehtinen nhắc đến quán cà phê?',
        skillTags: ['comprehension.inference'],
      },
      {
        text: 'According to the e-mail, what can Ms. Rautio do if she informs the organizers at least four weeks before the fair?',
        options: [
          'Move her stand to Hall B',
          'Cancel her booking without charge',
          'Replace the stand’s furniture with shelves',
          'Order electricity at a lower price',
        ],
        answer: 2,
        explanationVi:
          '"the furniture… can be exchanged for display shelves free of charge if you tell us at least four weeks before the fair" → đổi bàn ghế lấy kệ trưng bày (C).',
        translationVi:
          'Theo email, cô Rautio có thể làm gì nếu báo cho ban tổ chức trước ít nhất bốn tuần?',
        skillTags: ['comprehension.detail'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Property',
    passage:
      'Harbourline Commercial Lettings — Offices to Let, Bristol\n\nUnit 3, Quayside House — 85 m², ground floor, £2,100/month. Kitchenette, shared meeting room. Available 1 February.\n\nSuite 12, The Ropeworks — 140 m², second floor (lift), £3,400/month. Two private offices, open-plan area, bicycle storage. Available immediately.\n\nFloor 4, Castlegate Chambers — 160 m², fourth floor (lift), £3,150/month. Open-plan with rooftop terrace. Available 1 February. Minimum lease: five years.\n\nUnit 7, Temple Yard — 120 m², ground floor, £2,750/month. Open-plan, on-site parking for four cars. Available 1 January.\n\nAll rents exclude business rates and service charges. Viewings by appointment only.\n---\nFrom: Anouk de Vries <anouk@bramblecode.games>\nTo: Callum Pierce <c.pierce@harbourline.co.uk>\nDate: 2 December\nSubject: Office search\n\nDear Mr. Pierce,\n\nOur games studio is growing from 14 to 22 staff, and we need to move by the end of February at the latest. We are looking for at least 110 m², ideally with some space for private calls, and our budget is £3,500 a month. Because the business is still young, our board will not sign a lease longer than three years. Several of our team cycle to work, so secure bicycle storage would be a strong advantage.\n\nCould we view any suitable offices on 9 or 10 December?\n\nKind regards,\nAnouk de Vries\nOperations Director, Bramblecode\n---\nHARBOURLINE COMMERCIAL LETTINGS\nViewing Schedule — Callum Pierce\nTuesday, 10 December\n\n9:30 A.M. — Suite 12, The Ropeworks — Bramblecode (A. de Vries + 1)\n11:00 A.M. — Unit 7, Temple Yard — Bramblecode (A. de Vries + 1)\n2:00 P.M. — Unit 3, Quayside House — Fenwick Dental\n4:00 P.M. — Unit 7, Temple Yard — Osei Architecture\n\nNote: The Temple Yard landlord has agreed to install a covered bicycle shelter if a tenant signs by 20 December.',
    questions: [
      {
        text: 'What is the purpose of Ms. de Vries’s e-mail?',
        options: [
          'To request viewings of offices that meet certain needs',
          'To renew an existing lease',
          'To complain about a rent increase',
          'To recommend a property to a colleague',
        ],
        answer: 0,
        explanationVi:
          'Cô nêu yêu cầu (diện tích, ngân sách, thời hạn thuê, chỗ để xe đạp) và hỏi "Could we view any suitable offices…?" → xin xem các văn phòng phù hợp (A).',
        translationVi: 'Mục đích email của cô de Vries là gì?',
        skillTags: ['comprehension.main-idea'],
      },
      {
        text: 'Why most likely is Floor 4, Castlegate Chambers not on Bramblecode’s viewing schedule?',
        options: [
          'Its rent is above Bramblecode’s budget.',
          'It is too small for the studio.',
          'It requires a longer lease than the board will accept.',
          'It will not be available until after February.',
        ],
        answer: 2,
        explanationVi:
          'Castlegate rộng 160 m², giá £3,150 (trong ngân sách), trống từ 1/2, nhưng "Minimum lease: five years"; email: hội đồng "will not sign a lease longer than three years" → yêu cầu hợp đồng quá dài (C).',
        translationVi:
          'Vì sao Floor 4, Castlegate Chambers nhiều khả năng không có trong lịch xem văn phòng của Bramblecode?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'What is indicated about Suite 12, The Ropeworks?',
        options: [
          'It has on-site parking.',
          'Its rent is within Bramblecode’s budget.',
          'It is on the ground floor.',
          'It will become available in March.',
        ],
        answer: 1,
        explanationVi:
          'Suite 12 giá £3,400/tháng, dưới ngân sách £3,500 của Bramblecode (B). Chỗ đỗ xe thuộc Unit 7 (A); Suite 12 ở tầng hai và "Available immediately" (C, D sai).',
        translationVi: 'Điều gì được nêu về Suite 12, The Ropeworks?',
        skillTags: ['comprehension.cross-reference', 'comprehension.detail'],
      },
      {
        text: 'What is suggested about Unit 7, Temple Yard?',
        options: [
          'It is not available until March.',
          'Bramblecode is the only company viewing it on 10 December.',
          'It includes two private offices.',
          'It could meet one of Bramblecode’s wishes if a lease is signed soon.',
        ],
        answer: 3,
        explanationVi:
          'Bramblecode muốn có chỗ để xe đạp an toàn; ghi chú lịch: chủ nhà Temple Yard sẽ lắp mái che xe đạp "if a tenant signs by 20 December" → đáp ứng mong muốn đó nếu ký sớm (D). Osei Architecture cũng xem Unit 7 lúc 4 giờ chiều (B sai).',
        translationVi: 'Điều gì được gợi ý về Unit 7, Temple Yard?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'What is NOT true about the viewings on 10 December?',
        options: [
          'Ms. de Vries will bring one other person.',
          'Mr. Pierce will show Unit 7 to two different clients.',
          'Bramblecode will view three properties.',
          'Fenwick Dental will view Unit 3, Quayside House.',
        ],
        answer: 2,
        explanationVi:
          'Bramblecode chỉ có hai lịch xem (Suite 12 và Unit 7) → (C) sai. "A. de Vries + 1" (A), Unit 7 được xem bởi Bramblecode và Osei Architecture (B), Fenwick Dental xem Unit 3 (D) đều đúng.',
        translationVi:
          'Điều gì KHÔNG đúng về các buổi xem văn phòng ngày 10/12?',
        skillTags: ['comprehension.not-true'],
      },
    ],
  },
  {
    difficulty: 'HARD',
    topic: 'Translation',
    passage:
      'VERBA BRIDGE TRANSLATIONS — Rates for Business Clients\n\nStandard translation (delivered within 5 working days): €0.12 per word\nExpress translation (delivered within 48 hours): €0.18 per word\nCertified translation of legal documents: €0.15 per word + €25 certification fee per document\n\nMinimum charge per order: €60\nDesktop publishing (reproducing the original layout of brochures and manuals): €30 per page\n\nClients who order more than 20,000 words in a calendar month receive 10% off all translation charges for that month. Every translation is checked by a second linguist before delivery.\n---\nFrom: Sunniva Hagen <s.hagen@polarisoutdoor.no>\nTo: projects@verbabridge.eu\nDate: 3 April\nSubject: Spring catalogue\n\nHello,\n\nPolaris Outdoor would like our spring product catalogue translated from Norwegian into German and French. Each version is about 12,000 words. The catalogue is 24 pages long, and we would like the translated versions to look exactly like the original, as they will go straight to our printer.\n\nThe German version is needed by 30 April, but the French one is not urgent, since our French stores will not stock the spring range until June. We can send the files on Monday, 7 April.\n\nPlease let me know if you need anything else from us.\n\nBest regards,\nSunniva Hagen\nMarketing Manager, Polaris Outdoor\n---\nVERBA BRIDGE TRANSLATIONS\nINVOICE VB-1187 — Date: 30 April\nClient: Polaris Outdoor AS\n\nCatalogue translation, Norwegian–German (12,050 words × €0.12) ........ €1,446.00\nCatalogue translation, Norwegian–French (11,900 words × €0.12) ........ €1,428.00\nMonthly volume discount (10%) ........ –€287.40\nDesktop publishing, German version (24 pages × €30) ........ €720.00\n\nTOTAL: €3,306.60\n\nNote: Desktop publishing for the French version will be invoiced on delivery in May.',
    questions: [
      {
        text: 'What is stated about Verba Bridge Translations?',
        options: [
          'It translates only legal documents.',
          'Its work is reviewed by a second translator.',
          'It delivers all orders within 48 hours.',
          'It charges a fee for every page translated.',
        ],
        answer: 1,
        explanationVi:
          '"Every translation is checked by a second linguist before delivery" → được người dịch thứ hai kiểm tra (B). Chỉ dịch nhanh mới giao trong 48 giờ (C); phí theo trang chỉ áp dụng cho dàn trang (D).',
        translationVi: 'Điều gì được nêu về Verba Bridge Translations?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'What does Ms. Hagen request?',
        options: [
          'Certified translations of a contract',
          'A discount on printing costs',
          'Delivery of both versions by 30 April',
          'Translations that match the design of the original',
        ],
        answer: 3,
        explanationVi:
          '"we would like the translated versions to look exactly like the original" → bản dịch giữ nguyên thiết kế bản gốc (D). Chỉ bản tiếng Đức cần trước 30/4 (C).',
        translationVi: 'Cô Hagen yêu cầu điều gì?',
        skillTags: ['comprehension.detail'],
      },
      {
        text: 'Why was Polaris Outdoor given a discount?',
        options: [
          'It ordered more than 20,000 words in one month.',
          'It sent its files earlier than planned.',
          'It was a new client.',
          'It chose express delivery.',
        ],
        answer: 0,
        explanationVi:
          'Hoá đơn: 12,050 + 11,900 = 23,950 từ trong tháng 4. Bảng giá: khách đặt "more than 20,000 words in a calendar month" được giảm 10% → (A). Cả hai bản đều tính giá thường €0.12, không phải giá dịch nhanh (D).',
        translationVi: 'Vì sao Polaris Outdoor được giảm giá?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'What is suggested about the French version of the catalogue?',
        options: [
          'It was charged at the express rate.',
          'It needs to be certified.',
          'It will be delivered after the German version.',
          'It is longer than the German version.',
        ],
        answer: 2,
        explanationVi:
          'Email: bản tiếng Pháp "is not urgent" vì cửa hàng Pháp đến tháng 6 mới bán. Hoá đơn ngày 30/4 chỉ tính dàn trang bản Đức; dàn trang bản Pháp "will be invoiced on delivery in May" → bản Pháp giao sau bản Đức (C). Bản Pháp có 11,900 từ, ít hơn bản Đức (D).',
        translationVi: 'Điều gì được gợi ý về bản tiếng Pháp của catalogue?',
        skillTags: ['comprehension.cross-reference', 'comprehension.inference'],
      },
      {
        text: 'In the e-mail, the word "stock" in paragraph 2 is closest in meaning to',
        options: ['carry', 'count', 'invest in', 'supply'],
        answer: 0,
        explanationVi:
          '"our French stores will not stock the spring range until June" = cửa hàng chưa bày bán dòng sản phẩm mùa xuân → "carry" (A). "count" (kiểm kê) và "invest in" là nghĩa khác của stock.',
        translationVi: 'Trong email, từ "stock" ở đoạn 2 gần nghĩa nhất với',
        skillTags: ['comprehension.vocab-in-context'],
      },
    ],
  },
]
