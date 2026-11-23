import type { DeckFixture } from '../types'

/**
 * Topic vocabulary and common phrases from the book "Full bộ từ vựng ôn thi TOEIC từ 0–990"
 * (Prep for the New TOEIC, Vietnamese edition), one deck per book section: IPA, example, note and
 * related words ("từ mở rộng", labelled đồng nghĩa / trái nghĩa / dễ nhầm). Transcribed as
 * printed; only clear spelling slips are fixed. Raw material for the curriculum in ../vocab.ts.
 */
export const TOEIC990_DECKS: DeckFixture[] = [
  {
    title: '1-1 Contracts',
    description: 'Track 01',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'acceptance',
        pos: 'n',
        reading: 'əkˈseptəns',
        meaningVi: 'sự chấp nhận',
        example:
          'Now that you have shown your acceptance of our offer, I will prepare the contract for you to sign.',
        exampleVi:
          'Do ông chấp nhận đơn đặt hàng của chúng tôi, tôi sẽ chuẩn bị hợp đồng để ông ký.',
        extensions: [
          {
            meaningVi:
              'acceptance trong thương mại có thể dùng để chỉ “hóa đơn, hay chứng từ giao có đảm bảo thanh toán”.',
          },
          {
            term: 'recognition',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự công nhận',
          },
          {
            term: 'rejection',
            pos: 'n',
            meaningVi: '(trái nghĩa) sự từ chối',
          },
          {
            term: 'accept',
            pos: 'v',
            meaningVi: 'đồng ý, chấp nhận',
          },
        ],
      },
      {
        term: 'agreement',
        pos: 'n',
        reading: 'əˈgriːmənt',
        meaningVi: 'hợp đồng',
        example: 'The two countries signed a trade agreement.',
        exampleVi: 'Hai quốc gia đã ký một hợp đồng thương mại.',
        extensions: [
          {
            meaningVi:
              'agreement khi mang nghĩa “hiệp định, hiệp ước” là danh từ đếm được, khi mang nghĩa là “đồng ý, thống nhất” thì lại là danh từ không đếm được. Trade agreement chỉ “hiệp định thương mại”.',
          },
          {
            term: 'compact - treaty',
            pos: 'n',
            meaningVi: '(đồng nghĩa) hiệp ước, thỏa ước',
          },
          {
            term: 'agree',
            pos: 'v',
            meaningVi: 'đồng ý',
          },
        ],
      },
      {
        term: 'amend',
        pos: 'v',
        reading: 'əˈmend',
        meaningVi: 'sửa đổi, hiệu chỉnh',
        example: 'Can we amend this part of the contract before we sign?',
        exampleVi:
          'Chúng tôi có thể sửa đổi một phần của bản hợp đồng này trước khi chúng tôi ký không?',
        extensions: [
          {
            term: 'correct',
            pos: 'v',
            meaningVi: '(đồng nghĩa) hiệu chỉnh',
          },
          {
            term: 'amendable',
            pos: 'adj',
            meaningVi: 'có thể hiệu chỉnh',
          },
          {
            term: 'amendment',
            pos: 'n',
            meaningVi: 'sự sửa đổi',
          },
        ],
      },
      {
        term: 'amendment',
        pos: 'n',
        reading: 'əˈmendmənt',
        meaningVi: 'sự sửa đổi, sự hiệu chỉnh',
        example:
          'I have made the amendments you wanted; would you like to sign it now?',
        exampleVi:
          'Tôi vừa thực hiện một số sửa đổi như ông muốn, vậy ông sẽ ký bây giờ chứ?',
        extensions: [
          {
            meaningVi:
              'amendment thường dùng để chỉ “sự bổ sung hoặc sửa đổi một hiến pháp hay một đạo luật”, ví dụ: a constitutional amendment là chỉ “sửa đổi một hiến pháp”.',
          },
          {
            term: 'correction - alteration - emendation',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự sửa đổi',
          },
          {
            term: 'amend',
            pos: 'v',
            meaningVi: 'sửa đổi, tu chỉnh',
          },
        ],
      },
      {
        term: 'bind',
        pos: 'v',
        reading: 'baind',
        meaningVi: 'buộc, bó buộc, ràng buộc',
        example:
          'She cannot work for anyone else as she is bound by her contract.',
        exampleVi:
          'Cô ấy không thể làm việc cho người khác bởi vì cô ấy bị ràng buộc bởi hợp đồng của cô.',
        extensions: [
          {
            meaningVi:
              'khi bind có nghĩa “bắt buộc, ràng buộc”, thường dùng hình thức bị động dạng “be bound”. Thì quá khứ và quá khứ phân từ của “bind” là “bound”.',
          },
          {
            term: 'unbind - unfetter',
            pos: 'v',
            meaningVi: '(trái nghĩa) nới lỏng, tháo bỏ',
          },
          {
            term: 'binder',
            pos: 'n',
            meaningVi: 'người ràng buộc',
          },
        ],
      },
      {
        term: 'binding',
        pos: 'adj',
        reading: 'ˈbaindiŋ',
        meaningVi: 'ràng buộc',
        example: 'The contract is legally binding.',
        exampleVi: 'Hợp đồng này là ràng buộc hợp pháp.',
        extensions: [
          {
            meaningVi:
              'khi binding là một danh từ, có thể chỉ “bìa sách, keo, chất dán, dây buộc, miếng nẹp...”.',
          },
          {
            term: 'nonbinding',
            pos: 'adj',
            meaningVi: '(trái nghĩa) không ràng buộc',
          },
          {
            term: 'bind',
            pos: 'v',
            meaningVi: 'bó buộc',
          },
          {
            term: 'abiding',
            pos: 'adj',
            meaningVi: '(dễ nhầm) kéo dài (=lasting)',
          },
        ],
      },
      {
        term: 'breach',
        pos: 'n, v',
        reading: 'briːtʃ',
        meaningVi: 'sự vi phạm, vi phạm',
        example:
          'If you raise the price, that will be a breach of our contract.',
        exampleVi:
          'Nếu ông tăng giá cả lên thì sẽ vi phạm hợp đồng của chúng ta.',
        extensions: [
          {
            meaningVi:
              'breach of sth biểu thị “vi phạm việc gì đó”, ví dụ: breach of an agreement (vi phạm hiệp ước), breach of etiquette (vi phạm thuần phong mỹ tục), breach of trust (bội tín)...',
          },
          {
            term: 'infraction - violation',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự phá vỡ, sự vi phạm',
          },
          {
            term: 'break - violate - infringe',
            pos: 'v',
            meaningVi: '(đồng nghĩa) phá vỡ, vi phạm',
          },
          {
            term: 'nonviolation - observance',
            pos: 'n',
            meaningVi: '(trái nghĩa) sự tuân thủ',
          },
          {
            term: 'follow - obey - observe',
            pos: 'v',
            meaningVi: '(trái nghĩa) làm theo, tuân theo',
          },
        ],
      },
      {
        term: 'clause',
        pos: 'n',
        reading: 'klɔːz',
        meaningVi: 'điều khoản',
        example:
          'I want a clause put in the contract that says I will also get 5 percent of the profits.',
        exampleVi:
          'Tôi muốn trong hợp đồng này có điều khoản rằng tôi cũng sẽ nhận được 5% lợi nhuận.',
        extensions: [
          {
            meaningVi:
              'Trong ngữ pháp, clause có nghĩa là mệnh đề, ví dụ: main clause (mệnh đề chính), relative clause (mệnh đề quan hệ), subordinate clause (mệnh đề phụ thuộc)...',
          },
          {
            term: 'commerce clause',
            meaningVi: 'điều khoản thương mại',
          },
          {
            term: 'penalty clause',
            meaningVi: 'điều khoản bồi thường',
          },
          {
            term: 'saving clause',
            meaningVi: 'điều khoản tiết kiệm',
          },
        ],
      },
      {
        term: 'contractual',
        pos: 'adj',
        reading: 'kənˈtræktʃuəl',
        meaningVi: 'bằng hợp đồng',
        example: 'We have a contractual agreement.',
        exampleVi: 'Tôi có một thỏa thuận bằng hợp đồng.',
        extensions: [
          {
            term: 'contractual obligation',
            meaningVi: 'sự quy định theo hợp đồng',
          },
          {
            term: 'contract',
            pos: 'n, v',
            meaningVi: 'hợp đồng',
          },
          {
            term: 'contractually',
            pos: 'adv',
            meaningVi: 'tuân theo hợp đồng',
          },
        ],
      },
      {
        term: 'currently',
        pos: 'adv',
        reading: 'ˈkʌrəntli',
        meaningVi: 'hiện tại, hiện thời',
        example:
          'We are currently tied to another contract, but that will end early next year.',
        exampleVi:
          'Hiện tại chúng tôi bị ràng buộc bởi hợp đồng khác, nhưng nó sẽ kết thúc vào đầu năm sau.',
        extensions: [
          {
            term: 'now - presently - right now - at present',
            meaningVi: '(đồng nghĩa) hiện tại, ngay bây giờ',
          },
          {
            term: 'current',
            pos: 'adj',
            meaningVi: 'hiện tại',
          },
        ],
      },
      {
        term: 'obligate',
        pos: 'v',
        reading: 'ˈɒblɪgeɪt',
        meaningVi: 'bắt buộc',
        example:
          'You are obligated to buy our products for the next three years.',
        exampleVi:
          'Anh phải có nghĩa vụ mua sản phẩm của chúng tôi trong khoảng 3 năm tới.',
        extensions: [
          {
            meaningVi:
              'mẫu câu thường dùng là “be obligated to V.”, biểu thị “có nghĩa vụ...”.',
          },
          {
            term: 'force - constrain',
            pos: 'v',
            meaningVi: '(đồng nghĩa) bắt buộc, ép buộc',
          },
          {
            term: 'obligation',
            pos: 'n',
            meaningVi: 'nghĩa vụ',
          },
          {
            term: 'obligatory',
            pos: 'adj',
            meaningVi: 'bắt buộc, cưỡng chế',
          },
        ],
      },
      {
        term: 'obligation',
        pos: 'n',
        reading: 'ˌɒblɪˈgeɪʃ(ə)n',
        meaningVi: 'nghĩa vụ, bổn phận, trách nhiệm',
        example: 'According to the contract, you have an obligation to pay.',
        exampleVi: 'Theo hợp đồng này, anh có nghĩa vụ phải thanh toán.',
        extensions: [
          {
            term: 'commitment - duty - responsibility',
            pos: 'n',
            meaningVi: '(đồng nghĩa) nghĩa vụ, trách nhiệm',
          },
          {
            term: 'obligate',
            pos: 'v',
            meaningVi: 'bắt buộc',
          },
        ],
      },
      {
        term: 'oblige',
        pos: 'v',
        reading: 'əˈblaidʒ',
        meaningVi: 'bắt buộc, cưỡng chế',
        example: 'The law obliges people to pay tax.',
        exampleVi: 'Luật này buộc người dân phải nộp thuế.',
        extensions: [
          {
            meaningVi:
              'oblige cũng có thể chỉ “khiến... cảm động”, thường dùng quá khứ phân từ để biểu thị, ví dụ như: much obliged, I am obliged to you, hoặc là dùng would/ should be obliged để biểu thị, đây đều là những cách dùng chính thức.',
          },
          {
            term: 'compel - force',
            pos: 'v',
            meaningVi: '(đồng nghĩa) bắt buộc, cưỡng chế',
          },
          {
            term: 'be obliged to',
            pos: 'v',
            meaningVi: '(đồng nghĩa) bị buộc phải làm',
          },
        ],
      },
      {
        term: 'party',
        pos: 'n',
        reading: 'ˈpaːtɪ',
        meaningVi: 'bên',
        example: 'Both parties need to sign the contract.',
        exampleVi: 'Hai bên cần ký hợp đồng này.',
        extensions: [
          {
            meaningVi:
              'Party ngoài ý nghĩa trên, còn có nghĩa là “chính đảng, đảng phái”, ví dụ: the Democratic Party (Đảng Dân chủ).',
          },
          {
            term: 'participant',
            pos: 'n',
            meaningVi: '(đồng nghĩa) bên tham gia',
          },
          {
            term: 'third party',
            meaningVi: 'bên thứ ba',
          },
          {
            term: 'the guilty party',
            meaningVi: 'bên phạm tội, bên vi phạm',
          },
        ],
      },
      {
        term: 'persuasion',
        pos: 'n',
        reading: 'pəˈsweɪʒ(ə)n',
        meaningVi: 'sự thuyết phục',
        example: 'It took a lot of persuasion to get her to sign.',
        exampleVi: 'Phải thuyết phục nhiều cô ấy mới chịu ký.',
        extensions: [
          {
            term: 'persuade',
            pos: 'v',
            meaningVi: 'thuyết phục',
          },
          {
            term: 'persuasive - convincing - inducing',
            pos: 'adj',
            meaningVi: 'mang tính thuyết phục, dễ tin',
          },
        ],
      },
      {
        term: 'protect',
        pos: 'v',
        reading: 'prəˈtekt',
        meaningVi: 'bảo vệ',
        example:
          'The contract protects us both from any misunderstandings later.',
        exampleVi:
          'Hợp đồng này bảo vệ cả hai chúng ta khỏi những hiểu lầm sau này.',
        extensions: [
          {
            meaningVi:
              'khi protect có nghĩa là “bảo vệ”, thường dùng mẫu câu: protect sb/ sth from against sth. Protect cũng có thể chỉ “(chính phủ) bảo vệ (tài sản đất nước)”, hoặc “bảo hiểm cho tài sản của người nào đó”.',
          },
          {
            term: 'protection',
            pos: 'n',
            meaningVi: 'sự bảo vệ',
          },
          {
            term: 'protective',
            pos: 'adj',
            meaningVi: 'mang tính bảo vệ',
          },
          {
            term: 'protectionism',
            pos: 'n',
            meaningVi: 'chủ nghĩa bảo vệ',
          },
        ],
      },
      {
        term: 'satisfy',
        pos: 'phrase',
        reading: 'ˈsætisfai',
        meaningVi: 'làm thỏa mãn, đáp ứng, tuân thủ',
        example: 'You must satisfy the contract.',
        exampleVi: 'Các ông phải tuân thủ hợp đồng này.',
        extensions: [
          {
            meaningVi:
              'những ý thường gặp khác của satisfy là “khiến... hài lòng, thỏa mãn (kì vọng, tiêu chuẩn), khiến... tin tưởng...”.',
          },
          {
            term: 'discharge - fulfill - meet - comply (with)',
            pos: 'v',
            meaningVi: '(đồng nghĩa) hoàn thành, đáp ứng, tuân thủ',
          },
          {
            term: 'breach - break - violate',
            pos: 'v',
            meaningVi: '(trái nghĩa) phá vỡ, vi phạm',
          },
        ],
      },
      {
        term: 'sign',
        pos: 'v, n',
        reading: 'sain',
        meaningVi: 'ký, ký kết',
        example: 'We just need to sign the contract now.',
        exampleVi: 'Bây giờ chúng ta chỉ cần ký vào hợp đồng này.',
        extensions: [
          {
            term: 'signature',
            pos: 'n',
            meaningVi: 'chữ ký',
          },
        ],
      },
      {
        term: 'signature',
        pos: 'n',
        reading: 'ˈsɪgnətʃə',
        meaningVi: 'chữ ký',
        example: 'Please put your signature at the bottom of the page.',
        exampleVi: 'Vui lòng ký tên của ông ở cuối trang giấy.',
        extensions: [
          {
            term: 'signatory',
            pos: 'adj, n',
            meaningVi: 'thuộc về chữ ký',
          },
        ],
      },
    ],
  },
  {
    title: '1-2 Negotiations',
    description: 'Track 02',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'accommodate',
        pos: 'v',
        reading: 'əˈkɒmədeɪt',
        meaningVi: 'cung cấp',
        example: 'Can you accommodate us with a better offer?',
        exampleVi: 'Ông có thể cung cấp cho chúng tôi với giá tốt hơn.',
        extensions: [
          {
            meaningVi:
              'một nghĩa khác của “accommodate” là “cung cấp chỗ ở”, còn danh từ “accommodations” là chỉ “nơi ở”, khi dùng với nghĩa này thường dùng với hình thức số nhiều.',
          },
          {
            term: 'accommodator',
            pos: 'n',
            meaningVi: 'người cung cấp',
          },
        ],
      },
      {
        term: 'afford',
        pos: 'v',
        reading: 'əˈfɔːd',
        meaningVi: 'có đủ khả năng, cố gắng',
        example:
          "I don't think we can afford to hire a new employee until we get more clients.",
        exampleVi:
          'Tôi không nghĩ chúng ta có đủ khả năng để thuê nhân công mới cho đến khi chúng ta có nhiều khách hàng hơn.',
        extensions: [
          {
            meaningVi:
              'afford thường dùng chung với “can, could, be able to”, thường dùng trong câu phủ định hoặc nghi vấn.',
          },
        ],
      },
      {
        term: 'aggressive',
        pos: 'adj',
        reading: 'əˈgresiv',
        meaningVi: 'đẩy mạnh, tăng cường, xông xáo',
        example:
          'New companies have to be aggressive in promoting their products in order to break into the market.',
        exampleVi:
          'Những công ty mới phải xông xáo trong việc quảng bá sản phẩm để xâm nhập vào thị trường.',
      },
      {
        term: 'apprehensive',
        pos: 'adj',
        reading: 'æpriˈhensiv',
        meaningVi: 'lo lắng, lo âu',
        example:
          'Leslie was a little apprehensive about being in charge of her first project, but she performed well.',
        exampleVi:
          'Leslie lo lắng nhiều về việc chịu trách nhiệm cho dự án đầu tiên của mình, nhưng cô ấy đã trình bày tốt.',
        extensions: [
          {
            term: 'apprehension',
            pos: 'n',
            meaningVi: 'sự lo lắng, lo âu',
          },
          {
            term: 'apprehensively',
            pos: 'adv',
            meaningVi: 'một cách sợ hãi',
          },
        ],
      },
      {
        term: 'bargain',
        pos: 'v, n',
        reading: 'ˈbɑːgɪn',
        meaningVi: 'thương lượng, trả giá, sự mặc cả',
        example: 'They are bargaining over the price right now.',
        exampleVi: 'Bây giờ họ đang thương lượng giá cả.',
        extensions: [
          {
            meaningVi:
              '“bargain over sth” là “điều đình, trả giá nào đó”, bargain for sth là “dự tính...”, bargain with sb là “thương lượng với người nào đó”.',
          },
          {
            term: 'haggle',
            pos: 'v',
            meaningVi: '(đồng nghĩa) thương lượng, trả giá',
          },
          {
            term: 'buy - steal',
            pos: 'n',
            meaningVi: '(đồng nghĩa) mua, lấy',
          },
          {
            term: 'bargainer',
            pos: 'n',
            meaningVi: 'người mặc cả',
          },
          {
            term: 'bargain price',
            meaningVi: 'giá cả phải chăng',
          },
        ],
      },
      {
        term: 'compromise',
        pos: 'n, v',
        reading: 'ˈkɒmprəmaiz',
        meaningVi: 'nhất trí, thống nhất',
        example:
          'The two sides could not reach a compromise, so the meeting ended without resolving anything.',
        exampleVi:
          'Hai bên không thể đạt được sự nhất trí, vì vậy buổi họp kết thúc mà chưa giải quyết được việc gì.',
      },
      {
        term: 'concede',
        pos: 'v',
        reading: 'kənˈsiːd',
        meaningVi: 'thừa nhận, nhượng bộ',
        example:
          'After five years, the company had to concede that the project had been a failure.',
        exampleVi:
          'Sau 5 năm, công ty phải thừa nhận dự án này là một thất bại.',
        extensions: [
          {
            term: 'concession',
            pos: 'n',
            meaningVi: 'sự nhượng bộ',
          },
          {
            term: 'concessive',
            pos: 'adj',
            meaningVi: 'nhượng bộ',
          },
        ],
      },
      {
        term: 'consider',
        pos: 'v',
        reading: 'kənˈsɪdə',
        meaningVi: 'xem xét',
        example: 'Would you consider lowering the price?',
        exampleVi: 'Anh sẽ xem xét hạ thấp giá được chứ?',
        extensions: [
          {
            meaningVi: 'Sau “consider” phải là một động từ có hình thức V-ing.',
          },
          {
            term: 'ponder - think about',
            meaningVi: '(đồng nghĩa) xem xét, suy nghĩ về',
          },
          {
            term: 'consideration',
            pos: 'n',
            meaningVi: 'sự xem xét',
          },
          {
            term: 'considerable',
            pos: 'adj',
            meaningVi: 'đáng xem xét',
          },
        ],
      },
      {
        term: 'delicately',
        pos: 'adv',
        reading: 'ˈdelikətli',
        meaningVi: 'một cách tế nhị',
        example:
          'Grant delicately asked Jan about her divorce because he knew it was a sensitive subject.',
        exampleVi:
          'Grant hỏi Jan một cách tế nhị về cuộc ly hôn của cô ấy vì anh biết đây là chủ đề nhạy cảm.',
        extensions: [
          {
            term: 'delicate',
            pos: 'adj',
            meaningVi: 'tế nhị, khéo léo',
          },
          {
            term: 'delicacy',
            pos: 'n',
            meaningVi: 'sự khéo léo, sự tế nhị, sự duyên dáng',
          },
        ],
      },
      {
        term: 'offer',
        pos: 'n, v',
        reading: 'ˈɒfə',
        meaningVi: 'đề nghị, lời đề nghị',
        example:
          'Is that your final offer? I was hoping you might lower the price more than that.',
        exampleVi:
          'Đó là đề nghị cuối cùng của anh chưa? Tôi hy vọng anh có thể hạ thấp giá hơn thế.',
        extensions: [
          {
            meaningVi:
              'khi offer làm danh từ, ngoài việc chỉ ý “cung cấp, cho ý kiến” ra, trong giá cả là chỉ ý “ra giá”, còn special offer có ý là “giá cả đặc biệt, cung cấp giá đặc biệt”.',
          },
          {
            term: 'propose - suggest',
            pos: 'v',
            meaningVi: '(đồng nghĩa) đề nghị',
          },
          {
            term: 'proposal',
            pos: 'n',
            meaningVi: '(đồng nghĩa) lời đề nghị',
          },
        ],
      },
      {
        term: 'offset',
        pos: 'v',
        reading: 'ɒfˈset',
        meaningVi: 'bù cho, bù đắp (thiệt hại)',
        example:
          'The losses incurred by the luxury car division in the last quarter were offset by the increase in the sales of compacts.',
        exampleVi:
          'Trong quý cuối, sự thua lỗ ở dòng xe hơi sang trọng được bù đắp bằng sự tăng doanh số ở dòng xe hơi nhỏ.',
      },
      {
        term: 'strong',
        pos: 'adj',
        reading: 'strɒŋ',
        meaningVi: 'mạnh',
        example: 'They have a very strong position in the negotiations.',
        exampleVi: 'Họ có vị thế mạnh trong các cuộc thương lượng.',
        extensions: [
          {
            term: 'forceful - decisive',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) mạnh mẽ, quả quyết',
          },
          {
            term: 'inconclusive',
            pos: 'adj',
            meaningVi: '(trái nghĩa) không bao gồm',
          },
          {
            term: 'indecisive',
            pos: 'adj',
            meaningVi: '(trái nghĩa) thiếu quả quyết',
          },
          {
            term: 'ineffective',
            pos: 'adj',
            meaningVi: '(trái nghĩa) không hiệu quả',
          },
        ],
      },
    ],
  },
  {
    title: '1-3 Marketing',
    description: 'Track 03',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'commercial',
        pos: 'n, adj',
        reading: 'kəˈməːʃ(ə)l',
        meaningVi: 'thuộc về thương mại; buổi phát thanh, phát hình quảng cáo',
        example: 'Our new commercial will be shown on TV tonight.',
        exampleVi:
          'Buổi phát hình quảng cáo mới của chúng ta sẽ được trình chiếu trên TV tối nay.',
        extensions: [
          {
            meaningVi:
              'advertisement (viết tắt là ad, advert) là chỉ “quảng cáo trên ti vi, phát thanh”, phạm vi tương đối rộng.',
          },
          {
            term: 'marketable - salable',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) thuộc về kinh doanh',
          },
          {
            term: 'noncommercial',
            pos: 'adj',
            meaningVi: '(trái nghĩa) phi thương mại',
          },
          {
            term: 'commerce',
            pos: 'n',
            meaningVi: 'thương mại',
          },
          {
            term: 'commercially',
            pos: 'adv',
            meaningVi: 'một cách có lợi',
          },
        ],
      },
      {
        term: 'compare',
        pos: 'v',
        reading: 'kəmˈpeə',
        meaningVi: 'so sánh',
        example:
          'Customers will always compare your product with those of other companies.',
        exampleVi:
          'Khách hàng sẽ luôn so sánh sản phẩm của bạn với sản phẩm của những công ty khác.',
        extensions: [
          {
            meaningVi:
              'mẫu câu “compare A with B” là chỉ “lấy A so với B”, “compare A to B” là “so sánh A với B”.',
          },
          {
            term: 'comparative',
            pos: 'adj',
            meaningVi: 'tương đối',
          },
          {
            term: 'comparatively',
            pos: 'adv',
            meaningVi: 'một cách tương đối',
          },
          {
            term: 'comparison',
            pos: 'n',
            meaningVi: 'sự so sánh',
          },
        ],
      },
      {
        term: 'consume',
        pos: 'v',
        reading: 'kənˈsjuːm',
        meaningVi: 'tiêu thụ, tiêu dùng',
        example: 'What kind of people consume our services?',
        exampleVi: 'Những ai tiêu dùng dịch vụ của chúng ta?',
        extensions: [
          {
            term: 'consumer',
            pos: 'n',
            meaningVi: 'khách hàng, người tiêu dùng',
          },
          {
            term: 'consumer confidence',
            meaningVi: 'niềm tin của người tiêu dùng',
          },
          {
            term: 'consumer demand',
            meaningVi: 'nhu cầu của người tiêu dùng',
          },
          {
            term: 'consumer price index',
            meaningVi: 'chỉ số giá tiêu dùng',
          },
          {
            term: 'consumption',
            pos: 'n',
            meaningVi: 'sự tiêu thụ',
          },
        ],
      },
      {
        term: 'direct marketing',
        pos: 'phrase',
        reading: 'dɪˈrekt ˈmaːkɪtɪŋ',
        meaningVi: 'tiếp thị trực tiếp',
        example:
          'Using direct marketing, we were able to advertise our products to the people most likely to buy them.',
        exampleVi:
          'Bằng cách tiếp thị trực tiếp, chúng ta có thể quảng cáo sản phẩm của chúng ta đến những người thích mua chúng nhất.',
        extensions: [
          {
            meaningVi:
              'còn được gọi là “direct mail” tức “thư quảng cáo trực tiếp gửi cho cá nhân”.',
          },
        ],
      },
      {
        term: 'direct-response',
        pos: 'adj',
        reading: 'dɪˈrekt,rɪˈspɒns',
        meaningVi: 'trả lời trực tiếp',
        example: 'Direct-response advertising is very popular on the Internet.',
        exampleVi:
          'Quảng cáo bằng cách trả lời trực tiếp rất phổ biến trên Internet.',
        extensions: [
          {
            meaningVi:
              '“direct-response” có liên quan đến “direct marketing”, chỉ cách mua bán từ rất nhiều khách hàng, ta trực tiếp nhận được câu trả lời, ví dụ: mua tem, các kênh bán hàng, trạm bán hàng...',
          },
        ],
      },
      {
        term: 'distribution',
        pos: 'n',
        reading: 'ˌdɪstrɪˈbjuːʃ(ə)n',
        meaningVi: 'sự phân phối',
        example: 'We are planning for global distribution of our product.',
        exampleVi:
          'Chúng tôi dự định phân phối sản phẩm của chúng tôi trên toàn cầu.',
        extensions: [
          {
            meaningVi:
              'Ngoài ý nghĩa trên, trong thống kê học còn có nghĩa là “phân bố”, ví dụ: normal distribution là chỉ “sự phân bố chuẩn”.',
          },
          {
            term: 'spread',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự lan rộng',
          },
          {
            term: 'distribute',
            pos: 'v',
            meaningVi: 'phân phối, phân phát',
          },
          {
            term: 'distributor',
            pos: 'n',
            meaningVi: 'nhà phân phối',
          },
        ],
      },
      {
        term: 'distributor',
        pos: 'n',
        reading: 'dɪˈstrɪbjʊtə',
        meaningVi: 'nhà phân phối, đại lý',
        example:
          'Contact the distributor and find out where we can buy this product.',
        exampleVi:
          'Liên hệ với nhà phân phối và tìm kiếm nơi chúng ta có thể mua sản phẩm này.',
        extensions: [
          {
            meaningVi:
              'distributor có thể chỉ wholesaler (bán sỉ) hoặc retailer (bán lẻ).',
          },
          {
            term: 'distributive',
            pos: 'adj',
            meaningVi: 'mang tính phân bố',
          },
        ],
      },
      {
        term: 'fair trade',
        pos: 'n',
        reading: 'feə treid',
        meaningVi: 'hội chợ thương mại',
        example:
          'We buy our coffee directly from the farmer in Brazil, as we believe in fair-trade.',
        exampleVi:
          'Chúng tôi mua cà phê trực tiếp từ nông dân tại Brazil vì chúng tôi tin tưởng vào sự kinh doanh ngay thẳng.',
        extensions: [
          {
            term: 'fair-trade',
            meaningVi: 'sự kinh doanh công bằng, ngay thẳng',
          },
          {
            term: 'a fair-trade agreement',
            meaningVi: 'thỏa ước thương mại công bằng.',
          },
        ],
      },
      {
        term: 'hook',
        pos: 'n',
        reading: 'hʊk',
        meaningVi: 'cách, phương pháp',
        example:
          'The marketing hook for the movie The Blair Witch Project was making people believe that what happened was real and not acted.',
        exampleVi:
          'Cách tiếp thị cho bộ phim “The Blair Witch Project” khiến người ta tin những gì xảy ra giống như thật chứ không phải là diễn.',
        extensions: [
          {
            term: 'a selling point',
            meaningVi: 'điểm bán',
          },
          {
            term: 'marketing scheme',
            meaningVi: 'chương trình tiếp thị',
          },
        ],
      },
      {
        term: 'market',
        pos: 'v, n',
        reading: 'ˈmaːkɪt',
        meaningVi: 'tiếp thị, chợ',
        example: 'They are marketing their product toward young females.',
        exampleVi: 'Họ đang tiếp thị sản phẩm của họ cho thiếu nữ.',
        extensions: [
          {
            term: 'merchandise - sell',
            pos: 'v',
            meaningVi: '(đồng nghĩa) bán, kinh doanh',
          },
          {
            term: 'purchase - buy',
            pos: 'v',
            meaningVi: '(trái nghĩa) mua',
          },
          {
            term: 'marketing',
            pos: 'n',
            meaningVi: 'tiếp thị',
          },
          {
            term: 'market value',
            meaningVi: 'đánh giá thị trường',
          },
          {
            term: 'market research',
            meaningVi: 'nghiên cứu thị trường',
          },
        ],
      },
      {
        term: 'merchandising',
        pos: 'n',
        reading: 'ˈməːtʃ(ə)ndaiziŋ',
        meaningVi: 'hoạt động bán hàng',
        example:
          'One kind of merchandising is to use popular movies to help sell food.',
        exampleVi:
          'Một kiểu của hoạt động bán hàng là sử dụng những bộ phim phổ biến để giúp bán thực phẩm.',
        extensions: [
          {
            term: 'merchandise',
            pos: 'v, n',
            meaningVi: 'hàng hóa, mua bán hàng hóa',
          },
        ],
      },
      {
        term: 'primarily',
        pos: 'adv',
        reading: 'ˈpraimərəli',
        meaningVi: 'chính yếu, chủ yếu',
        example:
          'Our customers are primarily women, but many men also buy our products.',
        exampleVi:
          'Khách hàng của chúng tôi chủ yếu là phụ nữ, nhưng nhiều nam giới cũng mua sản phẩm của chúng tôi.',
        extensions: [
          {
            term: 'chiefly - mainly - mostly',
            pos: 'adv',
            meaningVi: '(đồng nghĩa) chính yếu, chủ yếu',
          },
          {
            term: 'primary',
            pos: 'adj',
            meaningVi: 'chính yếu, nồng cốt',
          },
        ],
      },
      {
        term: 'reputation',
        pos: 'n',
        reading: 'repjuˈteiʃ(ə)n',
        meaningVi: 'danh tiếng',
        example: 'Customers will trust a company with a good reputation.',
        exampleVi: 'Khách hàng sẽ tin vào công ty có tiếng thơm.',
        extensions: [
          {
            term: 'reputable',
            pos: 'adj',
            meaningVi: 'nổi tiếng',
          },
        ],
      },
      {
        term: 'satisfaction',
        pos: 'n',
        reading: 'sætisˈfækʃ(ə)n',
        meaningVi: 'sự thỏa mãn, sự hài lòng',
        example: 'Customer satisfaction is very important.',
        exampleVi: 'Sự hài lòng của khách hàng là rất quan trọng.',
        extensions: [
          {
            term: 'content - pleasure - gratification',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự hài lòng, sự thỏa mãn',
          },
          {
            term: 'dissatisfaction - displeasure',
            pos: 'n',
            meaningVi: '(trái nghĩa) sự không hài lòng',
          },
          {
            term: 'job satisfaction',
            meaningVi: 'sự hài lòng trong công việc',
          },
          {
            term: 'satisfy',
            pos: 'v',
            meaningVi: 'làm cho hài lòng',
          },
        ],
      },
      {
        term: 'strategy',
        pos: 'n',
        reading: 'ˈstrætədʒi',
        meaningVi: 'chiến lược, kế hoạch',
        example:
          'We need to think very carefully about our marketing strategy for this product.',
        exampleVi:
          'Chúng ta cần suy nghĩ thật cẩn thận về chiến lược tiếp thị của chúng ta cho sản phẩm này.',
        extensions: [
          {
            meaningVi: 'Sau nó có thể thêm “for N./V-ing” hoặc “to V”.',
          },
          {
            term: 'tactics - plan - scheme',
            pos: 'n',
            meaningVi: '(đồng nghĩa) chiến thuật, kế hoạch',
          },
          {
            term: 'exit strategy',
            meaningVi: 'chiến lược thoát',
          },
          {
            term: 'strategic',
            pos: 'adj',
            meaningVi: 'thuộc về chiến lược',
          },
        ],
      },
    ],
  },
  {
    title: '1-4 Sales',
    description: 'Track 04',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'assurance',
        pos: 'n',
        reading: 'əˈʃuərəns',
        meaningVi: 'sự bảo đảm',
        example:
          'The salesman gave his assurance that the price would not go up.',
        exampleVi: 'Người bán hàng đảm bảo rằng giá cả sẽ không tăng.',
        extensions: [
          {
            term: 'certainty - conviction - certitude',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự chắc chắn',
          },
          {
            term: 'doubt - uncertainty',
            pos: 'n',
            meaningVi: '(trái nghĩa) nghi ngờ',
          },
          {
            term: 'quality assurance',
            meaningVi: 'đảm bảo chất lượng',
          },
          {
            term: 'assure',
            pos: 'v',
            meaningVi: 'đảm bảo',
          },
        ],
      },
      {
        term: 'auction',
        pos: 'n',
        reading: 'ˈɔːkʃ(ə)n',
        meaningVi: 'buổi đấu giá',
        example:
          "Sotheby's announced that they would be selling a Monet painting in the May auction.",
        exampleVi:
          'Sotheby thông báo họ sắp bán bức tranh Monet vào buổi đấu giá tháng Năm.',
      },
      {
        term: 'avoid',
        pos: 'v',
        reading: 'əˈvɔɪd',
        meaningVi: 'tránh',
        example: 'Try to avoid talking about the price until the very end.',
        exampleVi: 'Cố gắng tránh nói về giá cả cho đến cuối cùng.',
        extensions: [
          {
            meaningVi: 'Sau “avoid” phải thêm danh từ hoặc “V-ing”.',
          },
          {
            term: 'escape - elude',
            pos: 'v',
            meaningVi: '(đồng nghĩa) tránh',
          },
          {
            term: 'avoidable',
            pos: 'adj',
            meaningVi: 'có thể tránh được',
          },
          {
            term: 'avoidably',
            pos: 'adv',
            meaningVi: 'có thể tránh được',
          },
        ],
      },
      {
        term: 'boom',
        pos: 'v, n',
        reading: 'buːm',
        meaningVi: 'phát triển thịnh vượng; tiếng nổ lớn',
        example:
          'During the 90s, the U.S. economy boomed in large part because of the expansion of the Internet.',
        exampleVi:
          'Suốt những năm 90, nền kinh tế Mỹ phát triển thịnh vượng bởi vì sự phát triển của Internet.',
        extensions: [
          {
            term: 'slump',
            pos: 'v, n',
            meaningVi: '(trái nghĩa) suy sụp; sự suy thoái kinh tế',
          },
        ],
      },
      {
        term: 'characteristic',
        pos: 'n',
        reading: 'kærəktəˈristik',
        meaningVi: 'đặc điểm, đặc tính',
        example: 'Explain the characteristics of the product to the customer.',
        exampleVi: 'Giải thích đặc tính của sản phẩm với khách hàng.',
        extensions: [
          {
            meaningVi:
              'khi characteristic làm tính từ, tức chỉ “nét đặc sắc, tiêu biểu”.',
          },
          {
            term: 'feature - quality',
            pos: 'n',
            meaningVi: '(đồng nghĩa) đặc tính',
          },
          {
            term: 'characterize',
            pos: 'v',
            meaningVi: 'định rõ đặc điểm',
          },
        ],
      },
      {
        term: 'convince',
        pos: 'v',
        reading: 'kənˌvɪns',
        meaningVi: 'thuyết phục',
        example:
          'You must convince the customer that your product is what he or she wants.',
        exampleVi:
          'Bạn phải thuyết phục với khách hàng rằng sản phẩm của chúng ta là những gì họ muốn.',
        extensions: [
          {
            term: 'persuade',
            pos: 'v',
            meaningVi: '(đồng nghĩa) thuyết phục',
          },
          {
            term: 'convincing - inducing - persuasive',
            pos: 'adj',
            meaningVi: 'mang tính thuyết phục',
          },
        ],
      },
      {
        term: 'demonstrate',
        pos: 'v',
        reading: 'ˈdemənstreit',
        meaningVi: 'chứng minh, mô tả',
        example:
          'Customers are more likely to buy if you demonstrate the product for them.',
        exampleVi:
          'Khách hàng sẽ thích mua hơn nếu bạn chứng minh sản phẩm cho họ.',
        extensions: [
          {
            term: 'show',
            pos: 'v',
            meaningVi: '(đồng nghĩa) chỉ ra, trình bày',
          },
          {
            term: 'demonstration/demo',
            pos: 'n',
            meaningVi: 'sự mô tả, chứng tỏ',
          },
          {
            term: 'demonstrator',
            pos: 'n',
            meaningVi: 'người chứng minh, người mô tả',
          },
        ],
      },
      {
        term: 'evaluate',
        pos: 'v',
        reading: 'iˈvæljueit',
        meaningVi: 'đánh giá',
        example:
          'It will help you make the sale if you first evaluate the mood of the customer.',
        exampleVi:
          'Sẽ hữu ích cho việc bán hàng của bạn nếu đầu tiên bạn đánh giá tâm trạng của khách hàng.',
        extensions: [
          {
            term: 'estimate - assess',
            pos: 'v',
            meaningVi: '(đồng nghĩa) đánh giá',
          },
          {
            term: 'evaluation',
            pos: 'n',
            meaningVi: 'sự đánh giá',
          },
        ],
      },
      {
        term: 'legitimate',
        pos: 'adj',
        reading: 'liˈdʒitəmət',
        meaningVi: 'hợp pháp, chính thống',
        example:
          'Criminals with excess money often invest in legitimate businesses.',
        exampleVi:
          'Tội phạm có nhiều tiền thường đầu tư vào những doanh nghiệp hợp pháp.',
        extensions: [
          {
            meaningVi:
              'legitimate chỉ tư cách hay quyền lợi trong pháp luật. Từ mang nghĩa “hợp pháp” được dùng nhiều nhất là “lawful”, còn “legal” tức là phù hợp với điều khoản pháp luật, dựa trên pháp luật.',
          },
        ],
      },
      {
        term: 'promise',
        pos: 'v, n',
        reading: 'ˈprɒmɪs',
        meaningVi: 'hứa, cam đoan; lời hứa',
        example: 'Never promise the customer anything!',
        exampleVi: 'Đừng bao giờ hứa với khách hàng điều gì!',
        extensions: [
          {
            meaningVi:
              'Khi “promise” làm động từ, có thể thêm vế câu “to V., that” hoặc “promise sth”.',
          },
          {
            term: 'promising',
            pos: 'adj',
            meaningVi: 'đầy hứa hẹn',
          },
        ],
      },
      {
        term: 'specific',
        pos: 'adj',
        reading: 'spəˈsɪfɪk',
        meaningVi: 'riêng, đặc trưng, cụ thể',
        example: 'Every customer has a specific need.',
        exampleVi: 'Mỗi khách hàng có nhu cầu riêng.',
        extensions: [
          {
            meaningVi:
              'Khi specific làm danh từ, có thể chỉ “chi tiết”, thường dùng với hình dạng số nhiều.',
          },
          {
            term: 'distinct - special',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) đặc trưng, đặc biệt',
          },
          {
            term: 'general',
            pos: 'adj',
            meaningVi: '(trái nghĩa) chung, tổng quát',
          },
          {
            term: 'specify',
            pos: 'v',
            meaningVi: 'cụ thể hóa',
          },
          {
            term: 'specification',
            pos: 'n',
            meaningVi: 'đặc điểm',
          },
        ],
      },
      {
        term: 'variety',
        pos: 'n',
        reading: 'vəˈraiəti',
        meaningVi: 'sự đa dạng',
        example: 'We have a variety of products that would suit you.',
        exampleVi: 'Chúng tôi có nhiều sản phẩm phù hợp cho bạn.',
        extensions: [
          {
            term: 'diversity',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự đa dạng',
          },
          {
            term: 'monotony',
            pos: 'n',
            meaningVi: '(trái nghĩa) sự đơn điệu',
          },
          {
            term: 'various',
            pos: 'adj',
            meaningVi: 'đa dạng',
          },
        ],
      },
    ],
  },
  {
    title: '1-5 Conferences',
    description: 'Track 05',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'address',
        pos: 'v',
        reading: 'əˈdres',
        meaningVi: 'diễn thuyết với',
        example: 'The speaker addressed the audience.',
        exampleVi: 'Người phát ngôn diễn thuyết với khán giả.',
        extensions: [
          {
            meaningVi:
              "Khi address làm danh từ, ngoài ý “diễn thuyết” ra, còn có nghĩa là “địa chỉ” (lúc này sẽ phát âm là [ə'dres]). Ngoài ra, address còn dùng để chỉ website (địa chỉ trên mạng).",
          },
        ],
      },
      {
        term: 'affiliate',
        pos: 'n',
        reading: 'əˈfɪlɪeɪt',
        meaningVi: 'công ty con',
        example: 'The organization is an affiliate of the Red Cross.',
        exampleVi: 'Tổ chức này là công ty con của Red Cross.',
        extensions: [
          {
            meaningVi:
              "Khi “affiliate” làm động từ, đọc là [ə'fɪlɪeɪt], chỉ “nhận làm chi nhánh, làm hội viên”.",
          },
          {
            term: 'affiliated',
            pos: 'adj',
            meaningVi: 'sáp nhập, liên kết',
          },
          {
            term: 'affiliation',
            pos: 'n',
            meaningVi: 'sự sáp nhập',
          },
        ],
      },
      {
        term: 'attend',
        pos: 'v',
        reading: 'əˈtend',
        meaningVi: 'tham dự',
        example: 'Five hundred businesspeople attended the conference.',
        exampleVi: 'Năm trăm doanh nhân tham dự hội nghị này.',
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
        ],
      },
      {
        term: 'attract',
        pos: 'v',
        reading: 'əˈtrækt',
        meaningVi: 'thu hút',
        example:
          'The conference attracted businesspeople from all over the world.',
        exampleVi: 'Hội nghị này thu hút doanh nhân từ khắp nơi trên thế giới.',
        extensions: [
          {
            term: 'attraction',
            pos: 'n',
            meaningVi: 'sự thu hút',
          },
          {
            term: 'attractive',
            pos: 'adj',
            meaningVi: 'hấp dẫn',
          },
        ],
      },
      {
        term: 'cancellation',
        pos: 'n',
        reading: 'kænsəˈleiʃ(ə)n',
        meaningVi: 'sự hủy bỏ',
        example:
          'We are sorry to inform you of the cancellation of the conference.',
        exampleVi:
          'Chúng tôi thật tiếc phải thông báo với quý vị về việc hủy bỏ buổi hội nghị.',
        extensions: [
          {
            term: 'continuation',
            pos: 'n',
            meaningVi: '(trái nghĩa) sự tiếp tục',
          },
          {
            term: 'cancel',
            pos: 'v',
            meaningVi: 'hủy bỏ',
          },
        ],
      },
      {
        term: 'gather',
        pos: 'v',
        reading: 'ˈgæðə',
        meaningVi: 'tập trung, tụ họp',
        example:
          'Thousands of managers are gathering in Taipei for the trade fair.',
        exampleVi:
          'Hàng ngàn giám đốc đang tập trung tại Đài Loan tham dự hội chợ thương mại.',
        extensions: [
          {
            term: 'meet - assemble - get together',
            meaningVi: '(đồng nghĩa) gặp gỡ, tụ họp',
          },
          {
            term: 'disperse - break up',
            meaningVi: '(trái nghĩa) giải tán',
          },
          {
            term: 'gathering',
            pos: 'n',
            meaningVi: 'hội, nhóm',
          },
        ],
      },
      {
        term: 'hold',
        pos: 'v',
        reading: 'həuld',
        meaningVi: 'tổ chức',
        example: 'The meeting was held in Taipei.',
        exampleVi: 'Cuộc họp được tổ chức tại Đài Loan.',
        extensions: [
          {
            meaningVi:
              'khi hold dùng với ý chỉ “tổ chức” thường dùng dạng bị động, ngoài ra, ý nghĩa thường gặp khác là “nắm giữ, bảo lưu, bảo tồn”...',
          },
        ],
      },
      {
        term: 'location',
        pos: 'n',
        reading: 'ləʊˌkeɪʃ(ə)n',
        meaningVi: 'địa điểm',
        example: 'We need to find a good location for the convention.',
        exampleVi: 'Chúng tôi cần tìm một địa điểm tốt để tổ chức hội nghị.',
        extensions: [
          {
            term: 'place - site - spot - position',
            pos: 'n',
            meaningVi: '(đồng nghĩa) địa điểm, chỗ',
          },
          {
            term: 'locate',
            pos: 'v',
            meaningVi: 'xác định vị trí, định vị',
          },
        ],
      },
      {
        term: 'productive',
        pos: 'adj',
        reading: 'prəˌdʌktɪv',
        meaningVi: 'đạt năng suất, hiệu quả',
        example: 'I thought the discussion was very productive.',
        exampleVi: 'Tôi nghĩ buổi thảo luận rất thành công.',
        extensions: [
          {
            term: 'constructive',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) giúp ích',
          },
          {
            term: 'unproductive',
            pos: 'adj',
            meaningVi: '(trái nghĩa) không đạt năng suất',
          },
          {
            term: 'produce',
            pos: 'v',
            meaningVi: 'sản xuất',
          },
          {
            term: 'production',
            pos: 'n',
            meaningVi: 'sự sản xuất',
          },
        ],
      },
      {
        term: 'session',
        pos: 'n',
        reading: 'ˈseʃ(ə)n',
        meaningVi: 'buổi, phiên, phiên họp',
        example:
          'The presentation will be given in two sessions: one in the morning, and the other in the afternoon.',
        exampleVi:
          'Bài thuyết trình được chia thành 2 buổi: một buổi sáng và một buổi trưa.',
        extensions: [
          {
            term: 'training session',
            meaningVi: 'buổi huấn luyện',
          },
          {
            term: 'emergency session',
            meaningVi: 'cuộc họp khẩn cấp',
          },
        ],
      },
    ],
  },
  {
    title: '1-6 Business Planning',
    description: 'Track 06',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'arrangement',
        pos: 'n',
        reading: 'əˌreɪndʒmənt',
        meaningVi: 'sự sắp xếp, sự giao kèo',
        example:
          "We have a special arrangement with the supplier, so we don't have to pay immediately.",
        exampleVi:
          'Chúng tôi có một giao kèo đặc biệt với nhà cung cấp, vì thế chúng tôi không cần thanh toán ngay.',
        extensions: [
          {
            term: 'agreement',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự giao kèo, bản hợp đồng',
          },
          {
            term: 'arrange',
            pos: 'v',
            meaningVi: 'sắp xếp',
          },
        ],
      },
      {
        term: 'competition',
        pos: 'n',
        reading: 'ˌkɒmpɪˈtɪʃ(ə)n',
        meaningVi: 'sự cạnh tranh',
        example: 'It is important to know who your competition will be.',
        exampleVi: 'Thật quan trọng để biết ai là đối thủ cạnh tranh của bạn.',
        extensions: [
          {
            meaningVi:
              'khi chỉ ý “cạnh tranh”, là danh từ không đếm được. Khi chỉ “đối thủ cạnh tranh”, tức chỉ đối thủ ở trên thương trường hay trong trận đấu, giống với “competitor”.',
          },
          {
            term: 'competitor - rival',
            pos: 'n',
            meaningVi: '(đồng nghĩa) đối thủ cạnh tranh',
          },
          {
            term: 'compete',
            pos: 'v',
            meaningVi: 'cạnh tranh, tranh tài',
          },
          {
            term: 'competitive',
            pos: 'adj',
            meaningVi: 'có tính cách cạnh tranh',
          },
        ],
      },
      {
        term: 'consequence',
        pos: 'n',
        reading: 'ˈkɒnsɪkwəns',
        meaningVi: 'hậu quả, kết quả',
        example:
          'The consequence of not planning well is a business that does badly.',
        exampleVi:
          'Hậu quả của việc không hoạch định tốt là một cuộc làm ăn thua lỗ.',
        extensions: [
          {
            term: 'effect - result',
            pos: 'n',
            meaningVi: '(đồng nghĩa) kết quả',
          },
          {
            term: 'consequent',
            pos: 'adj',
            meaningVi: 'tiếp theo sau là hậu quả',
          },
          {
            term: 'consequently',
            pos: 'adv',
            meaningVi: 'do đó, bởi vậy',
          },
        ],
      },
      {
        term: 'cover',
        pos: 'v',
        reading: 'ˈkʌvə',
        meaningVi: 'bao gồm, bao hàm',
        example: 'A good business plan should cover everything.',
        exampleVi: 'Một kế hoạch kinh doanh tốt nên bao hàm mọi việc.',
        extensions: [
          {
            meaningVi:
              'cover còn có nghĩa là “đủ để chi trả...”, “đảm bảo (tổn thất)”.',
          },
          {
            term: 'deal with - concern - include',
            meaningVi: '(đồng nghĩa) giải quyết, bao gồm',
          },
        ],
      },
      {
        term: 'designate',
        pos: 'v',
        reading: 'ˈdezɪgneɪt',
        meaningVi: 'bổ nhiệm, chỉ định',
        example:
          'We voted last night, and designated Tom the spokesman for our group.',
        exampleVi:
          'Tối qua chúng tôi đã bầu chọn và bổ nhiệm Tom là người phát ngôn cho nhóm chúng tôi.',
        extensions: [
          {
            term: 'designation',
            pos: 'n',
            meaningVi: 'sự bổ nhiệm',
          },
          {
            term: 'designed',
            pos: 'adj',
            meaningVi: 'cố ý, có dụng ý',
          },
        ],
      },
      {
        term: 'determine',
        pos: 'v',
        reading: 'dɪˈtɜːmɪn',
        meaningVi: 'quyết định',
        example: 'We have determined both our market and price.',
        exampleVi:
          'Chúng tôi vừa quyết định thị trường và giá cả của chúng tôi.',
        extensions: [
          {
            term: 'decide',
            pos: 'v',
            meaningVi: '(đồng nghĩa) quyết định',
          },
          {
            term: 'identify',
            pos: 'v',
            meaningVi: '(đồng nghĩa) nhận diện',
          },
          {
            term: 'determined',
            pos: 'adj',
            meaningVi: 'cương quyết',
          },
          {
            term: 'determination',
            pos: 'n',
            meaningVi: 'sự quyết định',
          },
        ],
      },
      {
        term: 'develop',
        pos: 'v',
        reading: 'dɪˈveləp',
        meaningVi: 'phát triển',
        example: 'We need to develop a strong sales team.',
        exampleVi: 'Chúng ta cần phát triển một đội bán hàng hùng mạnh.',
        extensions: [
          {
            term: 'development',
            pos: 'n',
            meaningVi: 'sự phát triển',
          },
          {
            term: 'developer',
            pos: 'n',
            meaningVi: 'người phát triển',
          },
          {
            term: 'developing',
            pos: 'adj',
            meaningVi: 'đang phát triển',
          },
        ],
      },
      {
        term: 'downsize',
        pos: 'v',
        reading: 'ˈdaʊnsaɪz',
        meaningVi: 'cắt giảm nhân công',
        example:
          'With the economy having problems, a lot of companies have been forced to downsize to stay competitive.',
        exampleVi:
          'Khi nền kinh tế đang gặp khó khăn, nhiều công ty buộc phải cắt giảm nhân công để duy trì khả năng cạnh tranh.',
      },
      {
        term: 'enterprise',
        pos: 'n',
        reading: 'ˈentəpraɪz',
        meaningVi: 'doanh nghiệp',
        example:
          'The city government offered grants in hopes of stimulating local enterprises.',
        exampleVi:
          'Chính quyền thành phố trao trợ cấp với mong muốn kích thích những doanh nghiệp địa phương.',
        extensions: [
          {
            term: 'enterpriser',
            pos: 'n',
            meaningVi: 'doanh nhân',
          },
          {
            term: 'enterprising',
            pos: 'adj',
            meaningVi: 'có ý tưởng kinh doanh',
          },
        ],
      },
      {
        term: 'entrepreneur',
        pos: 'n',
        reading: 'ˌɒntrəprəˈnɜː',
        meaningVi: 'doanh nhân',
        example:
          'Donald Trump is one of the most famous entrepreneurs in the world.',
        exampleVi:
          'Donald Trump là một trong những doanh nhân nổi tiếng trên thế giới.',
        extensions: [
          {
            meaningVi: 'có nguồn gốc từ chữ Pháp.',
          },
          {
            term: 'enterpriser',
            pos: 'n',
            meaningVi: '(đồng nghĩa) doanh nhân',
          },
        ],
      },
      {
        term: 'establish',
        pos: 'v',
        reading: 'ɪˈstæblɪʃ',
        meaningVi: 'thiết lập, thành lập',
        example: "It isn't easy establishing a new business.",
        exampleVi: 'Thật không dễ để thành lập một doanh nghiệp mới.',
        extensions: [
          {
            term: 'start - found - set up',
            meaningVi: '(đồng nghĩa) sáng lập, thành lập',
          },
          {
            term: 'close (down) - shut (up)',
            pos: 'v',
            meaningVi: '(trái nghĩa) đóng cửa',
          },
          {
            term: 'establishment',
            pos: 'n',
            meaningVi: 'sự thành lập',
          },
        ],
      },
      {
        term: 'expand',
        pos: 'v',
        reading: 'ɪkˈspænd',
        meaningVi: 'mở rộng',
        example:
          'The company has recently found it difficult to expand its market base and reach new customers.',
        exampleVi:
          'Gần đây công ty nhận thấy khó khăn để mở rộng thị trường và tìm kiếm khách hàng mới.',
        extensions: [
          {
            term: 'expansion',
            pos: 'n',
            meaningVi: 'sự mở rộng',
          },
          {
            term: 'expansive',
            pos: 'adj',
            meaningVi: 'bành trướng',
          },
        ],
      },
      {
        term: 'fad',
        pos: 'n',
        reading: 'fæd',
        meaningVi: 'mốt, kiểu thời trang; khuynh hướng',
        example: 'A good businessperson will know all the latest fads.',
        exampleVi:
          'Một doanh nhân giỏi phải biết tất cả các khuynh hướng mới nhất.',
        extensions: [
          {
            term: 'craze - fashion - trend',
            pos: 'n',
            meaningVi: '(đồng nghĩa) mốt, khuynh hướng',
          },
          {
            term: 'faddish',
            pos: 'adj',
            meaningVi: 'kỳ cục',
          },
        ],
      },
      {
        term: 'franchise',
        pos: 'n',
        reading: 'ˈfræntʃaɪz',
        meaningVi: 'đặc quyền, quyền ưu tiên',
        example:
          'The largest fast-food chains operate on the franchise system.',
        exampleVi:
          'Chuỗi nhà hàng thức ăn nhanh lớn nhất hoạt động dựa trên hệ thống đặc quyền.',
        extensions: [
          {
            term: 'franchisee',
            pos: 'n',
            meaningVi: 'đặc quyền',
          },
          {
            term: 'franchise organization',
            meaningVi: 'tổ chức đặc quyền',
          },
        ],
      },
      {
        term: 'headquarters',
        pos: 'n',
        reading: 'ˌhedˈkwɔːtəz',
        meaningVi: 'trụ sở',
        example:
          'The CEO promised to hold a press conference from the company headquarters in Chicago.',
        exampleVi:
          'Giám đốc điều hành hứa tổ chức một buổi hội báo tại trụ sở của công ty ở Chicago.',
        extensions: [
          {
            meaningVi:
              'chữ này là hình thức số nhiều, nhưng có thể dùng như số ít hoặc số nhiều.',
          },
          {
            term: 'be headquartered in',
            meaningVi: 'được đặt tại...',
          },
        ],
      },
      {
        term: 'joint venture',
        pos: 'phrase',
        reading: 'dʒɔɪnt ˈventʃə',
        meaningVi: 'liên doanh',
        example:
          'Most of the foreign investments in mainland China are joint ventures between foreign and local firms.',
        exampleVi:
          'Hầu hết đầu tư nước ngoài tại Trung Hoa đại lục đều là liên doanh giữa công ty nước ngoài và công ty địa phương.',
        extensions: [
          {
            term: 'venture capital',
            meaningVi: 'vốn rủi ro',
          },
        ],
      },
      {
        term: 'mission',
        pos: 'n',
        reading: 'ˈmɪʃ(ə)n',
        meaningVi: 'sứ mệnh, công việc, nhiệm vụ',
        example: "This company's goals are outlined in our mission statement.",
        exampleVi:
          'Mục tiêu của công ty này được nêu rõ trong bản báo cáo nhiệm vụ của chúng ta.',
      },
      {
        term: 'register',
        pos: 'v',
        reading: 'ˈredʒɪstə',
        meaningVi: 'đăng ký',
        example:
          'You must register the business before you can start selling anything.',
        exampleVi:
          'Bạn phải đăng ký kinh doanh trước khi bắt đầu buôn bán thứ gì đó.',
        extensions: [
          {
            meaningVi: 'register có thể làm danh từ, chỉ “sổ đăng kí”.',
          },
          {
            term: 'registration',
            pos: 'n',
            meaningVi: 'sự đăng ký',
          },
          {
            term: 'registered',
            pos: 'adj',
            meaningVi: 'được đăng ký',
          },
          {
            term: 'registry',
            pos: 'n',
            meaningVi: 'phòng đăng ký',
          },
          {
            term: 'cash register',
            meaningVi: 'máy rút tiền',
          },
        ],
      },
      {
        term: 'require',
        pos: 'v',
        reading: 'rɪˈkwaɪə',
        meaningVi: 'đòi hỏi, yêu cầu',
        example:
          'Most banks require some kind of ID before they will let you open an account.',
        exampleVi:
          'Hầu hết ngân hàng đòi hỏi vài loại chứng minh trước khi họ cho phép bạn mở một tài khoản.',
        extensions: [
          {
            term: 'want - need',
            pos: 'v',
            meaningVi: '(đồng nghĩa) cần, muốn',
          },
          {
            term: 'requirement',
            pos: 'n',
            meaningVi: 'sự đòi hỏi',
          },
        ],
      },
      {
        term: 'risk',
        pos: 'n',
        reading: 'rɪsk',
        meaningVi: 'rủi ro',
        example:
          'Starting a new business has its risks, but also many rewards.',
        exampleVi:
          'Thành lập một doanh nghiệp mới có rủi ro nhưng cũng có nhiều lợi ích.',
        extensions: [
          {
            meaningVi:
              '“risk” có thể làm động từ, chỉ “liều”, sau có thường thêm V-ing.',
          },
          {
            term: 'danger - hazard - threat',
            pos: 'n',
            meaningVi: '(đồng nghĩa) nguy hiểm, rủi ro',
          },
          {
            term: 'risk/venture capital',
            meaningVi: 'vốn rủi ro',
          },
          {
            term: 'risk management',
            meaningVi: 'sự quản lý rủi ro',
          },
          {
            term: 'risky',
            pos: 'adj',
            meaningVi: 'có tính chất rủi ro',
          },
        ],
      },
    ],
  },
  {
    title: '2-1 Board Meetings',
    description: 'Track 07',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'capacity',
        pos: 'n',
        reading: 'kəˈpæsɪti',
        meaningVi: 'sức chứa, dung tích, năng suất',
        example: 'The boardroom has a large seating capacity.',
        exampleVi: 'Phòng họp của công ty có sức chứa lớn.',
        extensions: [
          {
            term: 'surplus capacity',
            meaningVi: 'năng suất thặng dư',
          },
          {
            term: 'capacious',
            pos: 'adj',
            meaningVi: 'rộng',
          },
        ],
      },
      {
        term: 'expose',
        pos: 'v',
        reading: 'ɪkˈspəʊz',
        meaningVi: 'phơi bày, bộc lộ',
        example: 'The problem was exposed at the meeting.',
        exampleVi: 'Vấn đề được phơi bày tại cuộc họp.',
        extensions: [
          {
            term: 'uncover',
            pos: 'v',
            meaningVi: '(đồng nghĩa) phơi bày, bộc lộ',
          },
          {
            term: 'protect',
            pos: 'v',
            meaningVi: '(trái nghĩa) bảo vệ',
          },
          {
            term: 'exposed',
            pos: 'adj',
            meaningVi: 'trần truồng',
          },
          {
            term: 'exposure',
            pos: 'n',
            meaningVi: 'sự phơi bày, sự tiết lộ',
          },
        ],
      },
      {
        term: 'initiative',
        pos: 'n',
        reading: 'ɪˈnɪʃətɪv',
        meaningVi: 'sáng kiến',
        example: 'I took the initiative of calling a meeting.',
        exampleVi: 'Tôi bắt đầu kêu gọi cuộc họp.',
        extensions: [
          {
            meaningVi:
              'initiative thường dùng với động từ “take, seize, lose”... Ngoài ra, initiative cũng có thể làm tính từ, chỉ “mở đầu, sớm nhất”.',
          },
          {
            term: 'initiate',
            pos: 'v',
            meaningVi: 'bắt đầu, sáng tạo',
          },
          {
            term: 'initial',
            pos: 'adj',
            meaningVi: 'thoạt đầu',
          },
        ],
      },
      {
        term: 'mention',
        pos: 'v',
        reading: 'ˈmenʃ(ə)n',
        meaningVi: 'đề cập',
        example:
          'I think what you said is important. Maybe you should mention it at the meeting.',
        exampleVi:
          'Tôi nghĩ những gì bạn nói là quan trọng. Có lẽ bạn nên đề cập nó tại buổi họp.',
        extensions: [
          {
            term: 'note',
            pos: 'v',
            meaningVi: '(đồng nghĩa) ghi chú, lưu ý',
          },
        ],
      },
      {
        term: 'outlook',
        pos: 'n',
        reading: 'ˈaʊtlʊk',
        meaningVi: 'viễn cảnh, quan điểm',
        example:
          "With the appointment of a new CEO, the company's outlook has gotten better.",
        exampleVi:
          'Với việc bổ nhiệm giám đốc điều hành mới, viễn cảnh của công ty sẽ tốt hơn.',
        extensions: [
          {
            term: 'prospect',
            pos: 'n',
            meaningVi: '(đồng nghĩa) viễn cảnh',
          },
        ],
      },
      {
        term: 'sharp',
        pos: 'adv',
        reading: 'ʃɑːp',
        meaningVi: 'chính xác',
        example: "The meeting starts at nine o'clock sharp, so don't be late.",
        exampleVi: 'Cuộc họp bắt đầu lúc 9 giờ đúng vì vậy đừng đến trễ.',
        extensions: [
          {
            meaningVi:
              'sharp có thể làm tính từ, ý nghĩa thường gặp là “sắc, nhọn”.',
          },
          {
            term: 'exactly',
            pos: 'adv',
            meaningVi: '(đồng nghĩa) chính xác',
          },
        ],
      },
    ],
  },
  {
    title: '2-2 Committees',
    description: 'Track 08',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'appoint',
        pos: 'v',
        reading: 'əˈpɔɪnt',
        meaningVi: 'chọn, bổ nhiệm, chỉ định',
        example:
          'He had the most successful track record, so he was appointed head of the new project.',
        exampleVi:
          'Anh ấy có thành tích cá nhân thành công nhất, vì vậy anh ấy được chỉ định là trưởng nhóm cho dự án mới.',
        extensions: [
          {
            meaningVi:
              'be appointed chỉ “được bổ nhiệm làm...”, phía sau trực tiếp thêm xưng hô.',
          },
          {
            term: 'appointed',
            pos: 'adj',
            meaningVi: 'được bổ nhiệm',
          },
          {
            term: 'appointment',
            pos: 'n',
            meaningVi: 'sự bổ nhiệm, sự chỉ định',
          },
        ],
      },
      {
        term: 'association',
        pos: 'n',
        reading: 'əˌsəʊsiˈeɪʃ(ə)n',
        meaningVi: 'sự hợp tác',
        example:
          'Our long-term association with your advertising firm has brought benefits to both sides.',
        exampleVi:
          'Sự hợp tác lâu dài của chúng tôi với công ty quảng cáo của bạn đã mang đến lợi ích cho cả hai bên.',
        extensions: [
          {
            meaningVi:
              'khi association chỉ “kết hợp, liên kết”, là danh từ không đếm được.',
          },
          {
            term: 'associated',
            pos: 'adj',
            meaningVi: 'có kết hợp, cùng cộng tác',
          },
          {
            term: 'associate',
            pos: 'v',
            meaningVi: 'kết hợp, liên kết',
          },
        ],
      },
      {
        term: 'colleague',
        pos: 'n',
        reading: 'ˈkɒliːg',
        meaningVi: 'đồng nghiệp',
        example:
          'My colleague would be happy to meet with you and answer any questions you have.',
        exampleVi:
          'Đồng nghiệp của tôi vui vẻ gặp và trả lời những thắc mắc của các bạn.',
        extensions: [
          {
            term: 'coworker',
            pos: 'n',
            meaningVi: '(đồng nghĩa) đồng nghiệp',
          },
        ],
      },
      {
        term: 'commitment',
        pos: 'n',
        reading: 'kəˈmɪtm(ə)nt',
        meaningVi: 'sự ủy thác, sự chuyển giao một dự luật',
        example:
          'The U.S. army demands a four-year commitment from its enlistees.',
        exampleVi:
          'Quân đội Mỹ đòi hỏi sự chuyển giao 4 năm 1 lần từ những người có tên trên danh sách.',
        extensions: [
          {
            term: 'commit',
            pos: 'v',
            meaningVi: 'giao phó, ủy thác',
          },
          {
            term: 'committed',
            pos: 'adj',
            meaningVi: 'tận tụy, hết lòng',
          },
        ],
      },
      {
        term: 'committee',
        pos: 'n',
        reading: 'kəˈmɪti',
        meaningVi: 'ủy ban',
        example:
          'Congresspeople all have to serve on committees that facilitate the evaluation of laws.',
        exampleVi:
          'Tất cả nghị sĩ quốc hội phải phục vụ trên những ủy ban tạo thuận tiện trong việc đánh giá các điều luật.',
        extensions: [
          {
            meaningVi: 'khi committee chỉ “ủy viên” là danh từ phức hợp.',
          },
          {
            term: 'executive committee',
            meaningVi: 'ủy ban điều hành',
          },
        ],
      },
      {
        term: 'consensus',
        pos: 'n',
        reading: 'kənˈsensəs',
        meaningVi: 'sự thống nhất, sự nhất trí',
        example:
          'By general consensus, Jerry was picked as the class president.',
        exampleVi:
          'Qua sự nhất trí chung, Jerry được bầu làm lớp trưởng của lớp.',
        extensions: [
          {
            term: 'consensus of opinion',
            meaningVi: 'sự nhất trí ý kiến',
          },
        ],
      },
      {
        term: 'discharge',
        pos: 'v',
        reading: 'dɪsˈtʃɑːdʒ',
        meaningVi: 'sa thải',
        example: 'He was discharged after failing to meet company standards.',
        exampleVi:
          'Anh ta bị sa thải sau khi không đáp ứng được tiêu chuẩn của công ty.',
        extensions: [
          {
            meaningVi:
              'discharge cũng có thể chỉ “xả điện”, ví dụ: discharge electricity, từ trái nghĩa là “charge”.',
          },
        ],
      },
      {
        term: 'executive',
        pos: 'n, adj',
        reading: 'ɪgˈzekjʊtɪv',
        meaningVi: 'người điều hành, giám đốc điều hành',
        example:
          'His ambition is to become an executive in a multinational corporation.',
        exampleVi:
          'Hoài bão của anh ta là trở thành giám đốc điều hành tại một công ty đa quốc gia.',
        extensions: [
          {
            meaningVi:
              'Khi “executive” làm danh từ, còn có thể chỉ “cơ quan hành chính, ngành hành pháp của một chính phủ”, ví dụ: viện hành chính thì gọi là “Executive Yuan”.',
          },
          {
            term: 'executive officer',
            meaningVi: 'nhân viên điều hành',
          },
          {
            term: 'execution',
            pos: 'n',
            meaningVi: 'sự thi hành, sự thực hiện',
          },
          {
            term: 'execute',
            pos: 'v',
            meaningVi: 'thi hành một nhiệm vụ; xử tử,...',
          },
        ],
      },
    ],
  },
  {
    title: '2-3 Communication',
    description: 'Track 09',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'appreciation',
        pos: 'n',
        reading: 'əpriːʃɪˈeɪʃ(ə)n',
        meaningVi: 'sự biết ơn, sự đánh giá cao',
        example:
          'We need to send a letter of appreciation to the mayor for helping us out yesterday.',
        exampleVi:
          'Chúng ta cần gửi một lá thư cám ơn ông thị trưởng vì đã giúp đỡ chúng ta hôm qua.',
        extensions: [
          {
            term: 'gratitude',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự biết ơn',
          },
          {
            term: 'depreciation',
            pos: 'n',
            meaningVi: '(trái nghĩa) sự làm giảm giá trị',
          },
          {
            term: 'appreciate',
            pos: 'v',
            meaningVi: 'biết ơn, đánh giá cao',
          },
        ],
      },
      {
        term: 'authorization',
        pos: 'n',
        reading: 'ˌɔːθəraɪˈzeɪʃ(ə)n',
        meaningVi: 'sự ủy quyền',
        example:
          'We have gotten authorization from our boss to agree to your terms.',
        exampleVi:
          'Chúng tôi được ông chủ ủy quyền để chấp nhận các điều khoản của bạn.',
        extensions: [
          {
            term: 'authorize',
            pos: 'v',
            meaningVi: 'ủy quyền',
          },
        ],
      },
      {
        term: 'branch',
        pos: 'n',
        reading: 'brɑːn(t)ʃ',
        meaningVi: 'nhánh, chi nhánh',
        example:
          'You can contact the company either at the main headquarters or the branch office nearest you.',
        exampleVi:
          'Bạn cần liên hệ với công ty tại trụ sở chính hoặc văn phòng chi nhánh gần bạn nhất.',
      },
      {
        term: 'bulletin',
        pos: 'n',
        reading: 'ˈbʊlətɪn',
        meaningVi: 'bản báo cáo, bản thông báo',
        example:
          'Justin posted a bulletin at the dorm that said he was looking for a new roommate.',
        exampleVi:
          'Justin đã dán một bản thông báo tại ký túc xá thông báo rằng anh ấy đang tìm người bạn ở chung phòng mới.',
        extensions: [
          {
            term: 'bulletin board',
            meaningVi: 'bản thông báo',
          },
        ],
      },
      {
        term: 'correspondence',
        pos: 'n',
        reading: 'ˌkɒrɪˈspɒnd(ə)ns',
        meaningVi: 'sự liên lạc thư từ',
        example: "Most of the company's correspondence is now done by e-mail.",
        exampleVi:
          'Hầu hết việc liên lạc của công ty bây giờ được thực hiện bằng thư điện tử.',
        extensions: [
          {
            term: 'correspondent',
            pos: 'n',
            meaningVi: 'người giao dịch bằng thư từ',
          },
          {
            term: 'correspond',
            pos: 'v',
            meaningVi: 'giao dịch trao đổi bằng thư tín',
          },
        ],
      },
      {
        term: 'delete',
        pos: 'v',
        reading: 'dɪˈliːt',
        meaningVi: 'xóa',
        example: 'Can I delete these e-mails now?',
        exampleVi: 'Bây giờ tôi có thể xoá những bức thư điện tử này chứ?',
        extensions: [
          {
            term: 'erase - cancel',
            pos: 'v',
            meaningVi: '(đồng nghĩa) xóa, hủy bỏ',
          },
          {
            term: 'deletion',
            pos: 'n',
            meaningVi: 'sự xóa bỏ',
          },
        ],
      },
      {
        term: 'disk',
        pos: 'n',
        reading: 'dɪsk',
        meaningVi: 'ổ đĩa',
        example: 'Be sure to save all your files on a disk.',
        exampleVi: 'Hãy đảm bảo lưu tất cả hồ sơ dữ liệu trên ổ đĩa.',
        extensions: [
          {
            term: 'hard disk',
            meaningVi: 'đĩa cứng',
          },
          {
            term: 'disk drive',
            meaningVi: 'ổ đĩa',
          },
        ],
      },
      {
        term: 'forward',
        pos: 'adv',
        reading: 'ˈfɔːwəd',
        meaningVi: 'trước, phía trước',
        example:
          'Arguing about past mistakes does not help you move forward to success.',
        exampleVi:
          'Tranh cãi về những lỗi lầm trong quá khứ không giúp anh đạt được thành công phía trước.',
        extensions: [
          {
            meaningVi:
              'vừa có thể làm tính từ, chỉ “hướng về trước, phía trước”.',
          },
          {
            term: 'backward',
            pos: 'adv, adj',
            meaningVi: '(trái nghĩa) lạc hậu, thụt lùi đằng sau',
          },
        ],
      },
      {
        term: 'glimpse',
        pos: 'n, v',
        reading: 'glɪmps',
        meaningVi: 'sự liếc nhìn thoáng qua, liếc qua',
        example: "I only had a glimpse of the fax; I'll read it properly now.",
        exampleVi:
          'Tôi chỉ mới liếc qua tờ fax; bây giờ tôi sẽ đọc chi tiết nó.',
        extensions: [
          {
            meaningVi: 'Mẫu câu thường dùng là “have/catch a glimpse of N”.',
          },
          {
            term: 'glance - peep',
            pos: 'n',
            meaningVi: '(đồng nghĩa) liếc nhìn',
          },
        ],
      },
      {
        term: 'ignore',
        pos: 'v',
        reading: 'ɪgˈnɔː',
        meaningVi: 'phớt lờ, xao lãng',
        example: "You must answer the telephone; you can't keep ignoring it.",
        exampleVi: 'Bạn phải trả lời điện thoại, bạn không thể phớt lờ hoài.',
        extensions: [
          {
            term: 'disregard - neglect - overlook',
            pos: 'v',
            meaningVi: '(đồng nghĩa) xao lãng',
          },
          {
            term: 'ignorant',
            pos: 'adj',
            meaningVi: 'thất học, mù chữ, dốt nát',
          },
        ],
      },
      {
        term: 'interaction',
        pos: 'n',
        reading: 'ɪntərˈækʃ(ə)n',
        meaningVi: 'sự giao tiếp',
        example:
          'Computers are more efficient, but customers often prefer interaction with real people.',
        exampleVi:
          'Máy tính có nhiều lợi ích nhưng khách hàng thường thích giao tiếp với người thật hơn.',
        extensions: [
          {
            term: 'interact',
            pos: 'v',
            meaningVi: 'giao tiếp',
          },
          {
            term: 'interactive',
            pos: 'adj',
            meaningVi: 'ảnh hưởng lẫn nhau',
          },
        ],
      },
      {
        term: 'letterhead',
        pos: 'n',
        reading: 'ˈletəhed',
        meaningVi: 'giấy viết thư',
        example:
          'All correspondence with our clients must be put on company letterhead.',
        exampleVi:
          'Tất cả giao dịch bằng thư từ với khách hàng của chúng ta phải được viết trên giấy viết thư của công ty.',
      },
      {
        term: 'physically',
        pos: 'adv',
        reading: 'ˈfɪzɪkli',
        meaningVi: 'về thân thể',
        example:
          "The good thing about e-mails is that you don't have to physically send them.",
        exampleVi:
          'Mặt tốt của thư điện tử là bạn không cần gửi chúng bằng sức người.',
        extensions: [
          {
            term: 'mentally',
            pos: 'adv',
            meaningVi: '(trái nghĩa) về đầu óc',
          },
          {
            term: 'physical',
            pos: 'adj',
            meaningVi: 'thuộc về thân thể, thể chất',
          },
          {
            term: 'physics',
            pos: 'n',
            meaningVi: 'môn vật lý, khoa vật lý',
          },
        ],
      },
      {
        term: 'popularity',
        pos: 'n',
        reading: 'pɒpjuˈlærəti',
        meaningVi: 'sự phổ biến',
        example:
          'Faxes are losing popularity as people prefer to send e-mails.',
        exampleVi:
          'Fax dần mất tính phổ biến khi người ta thích gửi bằng thư điện tử hơn.',
        extensions: [
          {
            term: 'favor',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự đặc ân',
          },
          {
            term: 'popular',
            pos: 'adj',
            meaningVi: 'phổ biến',
          },
        ],
      },
      {
        term: 'provider',
        pos: 'n',
        reading: 'prəˈvaɪdə',
        meaningVi: 'nhà cung cấp',
        example: 'The Internet provider will send you monthly bills.',
        exampleVi:
          'Nhà cung cấp dịch vụ Internet sẽ gửi hóa đơn hàng tháng cho bạn.',
        extensions: [
          {
            term: 'provide',
            pos: 'v',
            meaningVi: 'cung cấp',
          },
          {
            term: 'Internet service provider (ISP)',
            meaningVi: 'nhà cung cấp dịch vụ Internet',
          },
        ],
      },
    ],
  },
  {
    title: '2-4 Furniture & Equipment',
    description: 'Track 10',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'affordable',
        pos: 'adj',
        reading: 'əˈfɔːdəbəl',
        meaningVi: 'đủ khả năng, đủ điều kiện',
        example: 'This computer system is very affordable.',
        exampleVi: 'Hệ thống máy tính này rất hữu dụng.',
        extensions: [
          {
            term: 'afford',
            pos: 'v',
            meaningVi: 'có đủ sức, có thể',
          },
        ],
      },
      {
        term: 'allocate',
        pos: 'v',
        reading: 'ˈæləkeɪt',
        meaningVi: 'cấp cho, phân phát',
        example: 'Every member of staff is allocated his or her own desk.',
        exampleVi: 'Mỗi nhân viên được cấp một chiếc bàn làm việc.',
        extensions: [
          {
            meaningVi:
              'biểu thị “đem vật gì đó chia cho người nào đó”, cách dùng là “allocate sth to sb” hoặc “allocate sb sth”.',
          },
          {
            term: 'allot',
            pos: 'v',
            meaningVi: '(đồng nghĩa) cấp cho, phân phát, chia phần.',
          },
          {
            term: 'allocation',
            pos: 'n',
            meaningVi: 'sự cấp phát',
          },
        ],
      },
      {
        term: 'assemble',
        pos: 'v',
        reading: 'əˈsemb(ə)l',
        meaningVi: 'họp lại, tụ tập, ráp',
        example:
          'The new desks have arrived, but we need to assemble them ourselves.',
        exampleVi:
          'Những chiếc bàn mới vừa đến nhưng chúng ta cần ráp chúng lại với nhau.',
        extensions: [
          {
            term: 'gather - put together',
            meaningVi: '(đồng nghĩa) tụ tập, họp lại',
          },
          {
            term: 'disassemble',
            pos: 'v',
            meaningVi: '(trái nghĩa) giải thể, giải tán',
          },
          {
            term: 'assembly',
            pos: 'n',
            meaningVi: 'hội nghị',
          },
          {
            term: 'assembly hall',
            meaningVi: 'phòng hội nghị',
          },
          {
            term: 'assembly line',
            meaningVi: 'dây chuyền lắp ráp',
          },
        ],
      },
      {
        term: 'compatible',
        pos: 'adj',
        reading: 'kəmˈpætəb(ə)l',
        meaningVi: 'tương thích, tương hợp',
        example: 'Are these printers compatible with our computer system?',
        exampleVi:
          'Những máy in này tương thích với hệ thống máy vi tính của bạn chứ?',
        extensions: [
          {
            meaningVi: 'thường dùng với giới từ with.',
          },
          {
            term: 'incompatible',
            pos: 'adj',
            meaningVi: '(trái nghĩa) không tương thích',
          },
          {
            term: 'compatibility',
            pos: 'n',
            meaningVi: 'sự tương thích, tính tương hợp',
          },
        ],
      },
      {
        term: 'courier',
        pos: 'n',
        reading: 'ˈkʊriə',
        meaningVi: 'người đưa thư',
        example:
          'I am sending this package by courier right away, as it must arrive before noon.',
        exampleVi:
          'Tôi sẽ yêu cầu người đưa thư gửi kiện hàng này ngay lập tức vì nó phải đến trước buổi trưa.',
        extensions: [
          {
            meaningVi:
              'khi courier làm danh từ, thì có ý chỉ “người đưa thư khẩn cấp” hoặc “hướng dẫn viên du lịch”.',
          },
        ],
      },
      {
        term: 'durable',
        pos: 'adj',
        reading: 'ˈdjʊərəb(ə)l',
        meaningVi: 'bền',
        example: 'The strong plastic makes these chairs very durable.',
        exampleVi: 'Nhựa dẻo làm cho những chiếc ghế này rất bền.',
        extensions: [
          {
            term: 'durability',
            pos: 'n',
            meaningVi: 'sự bền, sức bền',
          },
          {
            term: 'durable goods',
            meaningVi: 'hàng hóa bền',
          },
        ],
      },
      {
        term: 'express',
        pos: 'adj',
        reading: 'ɪkˈspres',
        meaningVi: 'nhanh, cấp tốc',
        example:
          'This letter needs to arrive tomorrow, so please send it by express delivery.',
        exampleVi:
          'Bức thư này cần đến vào ngày mai, vì thế hãy gửi nó cấp tốc.',
        extensions: [
          {
            meaningVi:
              'express có thể làm danh từ, biểu thị “xe tốc hành, chuyển phát nhanh”.',
          },
          {
            term: 'express mail',
            meaningVi: 'thư cấp tốc',
          },
        ],
      },
      {
        term: 'fold',
        pos: 'v',
        reading: 'fəʊld',
        meaningVi: 'xếp, gấp (một tờ giấy)',
        example:
          'We should hire someone to fold all these letters and put them in the envelopes.',
        exampleVi:
          'Chúng ta nên thuê ai đó gấp những bức thư này và bỏ chúng vào phong bì.',
        extensions: [
          {
            meaningVi: 'fold còn có thể chỉ “(công ty) phá sản”.',
          },
          {
            term: 'unfold',
            pos: 'v',
            meaningVi: '(trái nghĩa) mở nếp gấp ra',
          },
          {
            term: 'folder',
            pos: 'n',
            meaningVi: 'người gấp giấy',
          },
        ],
      },
      {
        term: 'layout',
        pos: 'n',
        reading: 'ˈleɪaʊt',
        meaningVi: 'cách bố trí, cách trình bày',
        example: "I'm working on the layout of the company newsletter.",
        exampleVi: 'Tôi đang làm công việc trình bày bản tin cho công ty.',
        extensions: [
          {
            term: 'format - arrangement',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự định dạng, sự bố trí',
          },
          {
            term: 'lay out',
            meaningVi: 'định dạng, trình bày',
          },
        ],
      },
      {
        term: 'network',
        pos: 'n',
        reading: 'ˈnetwɜːk',
        meaningVi: 'hệ thống, mạng',
        example:
          "A computer network allows you to see files on other people's computers.",
        exampleVi:
          'Mạng máy vi tính cho phép bạn nhìn thấy tất cả hồ sơ trên máy tính người khác.',
        extensions: [
          {
            meaningVi:
              'khi network làm động từ, có thể chỉ “giao thiệp để tìm kiếm cơ hội kinh doanh, công việc làm ăn”.',
          },
          {
            term: 'road/rail network',
            meaningVi: 'hệ thống đường/đường ray',
          },
          {
            term: 'local area network',
            meaningVi: 'mạng khu vực địa phương',
          },
        ],
      },
      {
        term: 'outdated',
        pos: 'adj',
        reading: 'ˌaʊtˈdeɪtɪd',
        meaningVi: 'lỗi thời',
        example: 'The computer system is outdated; we need to get a new one.',
        exampleVi:
          'Hệ thống máy tính này lỗi thời rồi; chúng ta cần có một hệ thống mới.',
        extensions: [
          {
            term: 'old-fashioned - out-of-date',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) lỗi thời',
          },
        ],
      },
      {
        term: 'replace',
        pos: 'v',
        reading: 'rɪˈpleɪs',
        meaningVi: 'thay thế',
        example:
          'All the chairs have been replaced with newer, more comfortable ones.',
        exampleVi:
          'Tất cả những chiếc ghế này cần được thay thế bằng những chiếc mới hơn, thoải mái hơn.',
        extensions: [
          {
            meaningVi:
              'cách dùng để biểu thị ý “dùng B thay thế A” là replace A with B.',
          },
          {
            term: 'displace',
            pos: 'v',
            meaningVi: '(đồng nghĩa) thế chỗ',
          },
          {
            term: 'replaceable',
            pos: 'adj',
            meaningVi: 'có thể thay thế được',
          },
          {
            term: 'replacement',
            pos: 'n',
            meaningVi: 'sự thay thế',
          },
        ],
      },
      {
        term: 'search',
        pos: 'v',
        reading: 'sɜːtʃ',
        meaningVi: 'tìm kiếm, tra cứu',
        example: "We're searching for some good, cheap office furniture.",
        exampleVi: 'Chúng tôi đang tìm một số đồ đạc văn phòng tốt mà rẻ.',
        extensions: [
          {
            meaningVi: 'search có thể làm danh từ.',
          },
          {
            term: 'seek - look for',
            meaningVi: '(đồng nghĩa) tìm kiếm',
          },
          {
            term: 'in search of',
            meaningVi: 'tìm kiếm',
          },
          {
            term: 'search engine',
            meaningVi: 'máy dò tìm',
          },
        ],
      },
      {
        term: 'software',
        pos: 'n',
        reading: 'ˈsɒf(t)weə',
        meaningVi: 'phần mềm',
        example:
          'Purchasing software for all the computers can be very expensive.',
        exampleVi: 'Mua phần mềm cho tất cả máy tính có thể rất tốn kém.',
        extensions: [
          {
            term: 'hardware',
            pos: 'n',
            meaningVi: '(trái nghĩa) phần cứng',
          },
          {
            term: 'word-processing software',
            meaningVi: 'phần mềm xử lý văn bản',
          },
          {
            term: 'design software',
            meaningVi: 'phần mềm thiết kế',
          },
          {
            term: 'antivirus software',
            meaningVi: 'phần mềm diệt vi rút',
          },
        ],
      },
    ],
  },
  {
    title: '2-5 Office Procedures',
    description: 'Track 11',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'access',
        pos: 'n',
        reading: 'ˈækses',
        meaningVi: 'sự truy cập, lối vào',
        example: 'We now have access to the Internet.',
        exampleVi: 'Bây giờ chúng tôi truy cập Internet.',
        extensions: [
          {
            meaningVi: 'khi access làm động từ chỉ “lấy thông tin (máy tính)”.',
          },
          {
            term: 'doorway - entry - gateway',
            pos: 'n',
            meaningVi: '(đồng nghĩa) lối vào',
          },
          {
            term: 'remote access',
            meaningVi: 'truy cập từ xa',
          },
          {
            term: 'accessible',
            pos: 'adj',
            meaningVi: 'có thể truy cập được',
          },
        ],
      },
      {
        term: 'beforehand',
        pos: 'adv',
        reading: 'bɪˈfɔːhænd',
        meaningVi: 'trước, trước tiên',
        example:
          'If you need to take a day off, be sure to tell the manager beforehand.',
        exampleVi:
          'Nếu bạn cần nghỉ một ngày, chắc chắn phải nói trước với giám đốc.',
        extensions: [
          {
            term: 'in advance - previously',
            meaningVi: '(đồng nghĩa) trước, trước tiên',
          },
          {
            term: 'afterward',
            pos: 'adv',
            meaningVi: '(trái nghĩa) sau, sau đó',
          },
        ],
      },
      {
        term: 'code',
        pos: 'n',
        reading: 'kəʊd',
        meaningVi: 'mật mã, mã số, quy tắc',
        example:
          "We don't have a dress code in the office, but it's better to wear something smart.",
        exampleVi:
          'Chúng ta không cần phải ăn mặc đúng quy cách tại công sở, nhưng tốt hơn là chúng ta nên mặc đồ lịch sự.',
        extensions: [
          {
            meaningVi: 'code có thể chỉ “mật mã, thông tin bảo mật”.',
          },
          {
            term: 'dress code',
            meaningVi: 'quy cách ăn mặc',
          },
          {
            term: 'code of conduct/behavior',
            meaningVi: 'quy tắc đạo đức/ứng xử',
          },
        ],
      },
      {
        term: 'complication',
        pos: 'n',
        reading: 'ˌkɒmplɪˈkeɪʃ(ə)n',
        meaningVi: 'sự rắc rối, sự phức tạp',
        example:
          "To avoid complications, it's better to let the manager fix any problems that aren't part of your job.",
        exampleVi:
          'Để tránh những rắc rối, tốt hơn nên để giám đốc giải quyết những vấn đề không phải là việc của bạn.',
        extensions: [
          {
            meaningVi:
              'complication có thể chỉ “biến chứng”, nhưng khi mang ý nghĩa này thường dùng với dạng số nhiều.',
          },
          {
            term: 'difficulty - complexity',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự khó khăn, sự phức tạp',
          },
          {
            term: 'complicate',
            pos: 'v',
            meaningVi: 'làm phức tạp, làm phiền phức',
          },
          {
            term: 'complicated',
            pos: 'adj',
            meaningVi: 'phức tạp, phiền phức',
          },
        ],
      },
      {
        term: 'display',
        pos: 'v',
        reading: 'dɪˈspleɪ',
        meaningVi: 'phơi bày, trưng bày',
        example: 'The office rules are displayed on the message board.',
        exampleVi:
          'Quy định của văn phòng được nêu rõ trên bảng dán thông báo.',
        extensions: [
          {
            meaningVi:
              'khi là danh từ ý chỉ “biểu diễn, triển lãm, sản phẩm triển lãm, trưng bày”.',
          },
          {
            term: 'show',
            pos: 'v',
            meaningVi: '(đồng nghĩa) phơi bày, chỉ ra',
          },
        ],
      },
      {
        term: 'duplicate',
        pos: 'n',
        reading: 'ˈdjuːplɪkət',
        meaningVi: 'bản sao',
        example:
          'Give the customer the original invoice and keep the duplicate for our records.',
        exampleVi:
          'Đưa cho khách hàng hóa đơn gốc và giữ lại bản sao để chúng ta lưu giữ.',
        extensions: [
          {
            meaningVi:
              'có thể làm động từ, chỉ “phục chế, sao chép”. Cũng có thể làm tính từ, chỉ “thuộc về phục chế”.',
          },
          {
            term: 'copy',
            pos: 'n',
            meaningVi: '(đồng nghĩa) bản sao',
          },
          {
            term: 'duplication',
            pos: 'n',
            meaningVi: 'sự sao chép',
          },
        ],
      },
      {
        term: 'facilitate',
        pos: 'v',
        reading: 'fəˈsɪləteɪt',
        meaningVi: 'tạo điều kiện thuận lợi',
        example:
          "An open office facilitates teamwork; one with many small offices and closed doors doesn't.",
        exampleVi:
          'Một văn phòng mở tạo điều kiện thuận lợi để làm việc theo nhóm; một văn phòng với nhiều văn phòng nhỏ và các cửa đóng không làm được như vậy.',
        extensions: [
          {
            term: 'complicate',
            pos: 'v',
            meaningVi: '(trái nghĩa) làm cho phiền phức',
          },
          {
            term: 'facilitation',
            pos: 'n',
            meaningVi: 'sự tạo điều kiện thuận lợi',
          },
        ],
      },
      {
        term: 'process',
        pos: 'n',
        reading: 'ˈprəʊses',
        meaningVi: 'quy trình',
        example:
          'All staff must follow the same process for booking time off work.',
        exampleVi:
          'Tất cả nhân viên phải theo cùng một quy trình để xin nghỉ phép.',
        extensions: [
          {
            meaningVi:
              'Khi process làm động từ có thể chỉ “xử lý (văn kiện, tài liệu...), gia công (thực phẩm)”.',
          },
          {
            term: 'procedure',
            pos: 'n',
            meaningVi: '(đồng nghĩa) quy trình, thủ tục',
          },
        ],
      },
      {
        term: 'practice',
        pos: 'v',
        reading: 'ˈpræktɪs',
        meaningVi: 'thực hành, luyện tập',
        example:
          'Every three months, we practice what to do if there is a fire.',
        exampleVi:
          'Cứ 3 tháng 1 lần, chúng tôi luyện tập những việc phải làm nếu có hỏa hoạn.',
        extensions: [
          {
            meaningVi:
              'Kiểu viết của người Anh là “practise”. Ngoài ra, “practice” còn có thể dùng như danh từ.',
          },
          {
            term: 'practiced',
            pos: 'adj',
            meaningVi: 'khéo léo (trong công việc)',
          },
          {
            term: 'practitioner',
            pos: 'n',
            meaningVi: 'người hành nghề',
          },
        ],
      },
      {
        term: 'reduction',
        pos: 'n',
        reading: 'rɪˈdʌkʃ(ə)n',
        meaningVi: 'sự giảm xuống',
        example:
          'Recycling helped us achieve a big reduction in paper costs last year.',
        exampleVi:
          'Việc tái chế giúp chúng ta giảm đáng kể chi phí giấy vào năm ngoái.',
        extensions: [
          {
            term: 'decrease - decline - drop',
            pos: 'n',
            meaningVi: '(đồng nghĩa) giảm, làm giảm',
          },
          {
            term: 'increase - boost - raise',
            pos: 'n',
            meaningVi: '(trái nghĩa) tăng, đẩy mạnh',
          },
          {
            term: 'reduce',
            pos: 'v',
            meaningVi: 'làm giảm',
          },
        ],
      },
      {
        term: 'revise',
        pos: 'v',
        reading: 'rɪˈvaɪz',
        meaningVi: 'sửa đổi',
        example:
          "The office rules are being revised, so we'll have new ones very soon.",
        exampleVi:
          'Những quy định của văn phòng được sửa đổi, vì thế chúng ta sẽ có những quy định mới ngay.',
        extensions: [
          {
            term: 'modify - amend - edit',
            pos: 'v',
            meaningVi: '(đồng nghĩa) sửa đổi',
          },
          {
            term: 'revision',
            pos: 'n',
            meaningVi: 'sự sửa đổi',
          },
        ],
      },
      {
        term: 'stock',
        pos: 'n',
        reading: 'stɒk',
        meaningVi: 'hàng tồn kho, kho hàng',
        example:
          'If you need any stock for your department, just ask your supervisor.',
        exampleVi: 'Nếu bạn cần hàng cho ban của bạn, hãy hỏi người giám sát.',
        extensions: [
          {
            meaningVi:
              'ngoài ra có thể chỉ “cổ phần, cổ phiếu”, giống như “share”.',
          },
          {
            term: 'stock price',
            meaningVi: 'giá cổ phiếu',
          },
          {
            term: 'stock company',
            meaningVi: 'công ty cổ phần',
          },
          {
            term: 'stockbroker',
            pos: 'n',
            meaningVi: 'người buôn bán chứng khoán',
          },
        ],
      },
      {
        term: 'warning',
        pos: 'n',
        reading: 'ˈwɔːnɪŋ',
        meaningVi: 'lời cảnh báo',
        example:
          'If you keep breaking office rules, the manager will give you a written warning.',
        exampleVi:
          'Nếu bạn vẫn cứ vi phạm quy định của văn phòng, giám đốc sẽ cảnh báo bạn bằng văn bản.',
        extensions: [
          {
            meaningVi:
              'cũng có thể làm tính từ, biểu thị “cảnh cáo”, ví dụ: warning sign (thông tin cảnh báo).',
          },
          {
            term: 'alarm - alert - caution',
            pos: 'n',
            meaningVi: '(đồng nghĩa) cảnh báo, lưu ý',
          },
          {
            term: 'written/verbal warning',
            meaningVi: 'cảnh báo bằng văn bản/bằng miệng',
          },
          {
            term: 'warn',
            pos: 'v',
            meaningVi: 'cảnh báo',
          },
        ],
      },
      {
        term: 'verbally',
        pos: 'adv',
        reading: 'ˈvɜːb(ə)li',
        meaningVi: 'bằng lời nói, bằng miệng',
        example:
          'Employees should be told in writing that they are being fired, but only after first being told verbally.',
        exampleVi:
          'Nhân viên được thông báo bằng văn bản rằng họ bị sa thải, nhưng chỉ sau khi họ được thông báo trước bằng miệng.',
        extensions: [
          {
            term: 'verbal',
            pos: 'adj',
            meaningVi: 'bằng lời nói, bằng miệng',
          },
        ],
      },
    ],
  },
  {
    title: '3-1 Recruiting',
    description: 'Track 12',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'abundant',
        pos: 'adj',
        reading: 'əˈbʌndənt',
        meaningVi: 'phong phú, đa dạng, nhiều',
        example:
          'An abundant supply of willing workers drives the price of labor down.',
        exampleVi:
          'Lượng cung công nhân sẵn sàng làm việc phong phú làm cho giá cả lao động giảm xuống.',
        extensions: [
          {
            term: 'plentiful - ample',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) nhiều, phong phú',
          },
          {
            term: 'bare - scarce',
            pos: 'adj',
            meaningVi: '(trái nghĩa) ít, hiếm',
          },
          {
            term: 'abundance',
            pos: 'n',
            meaningVi: 'sự phong phú',
          },
        ],
      },
      {
        term: 'candidate',
        pos: 'n',
        reading: 'ˈkændideit',
        meaningVi: 'thí sinh, ứng cử viên',
        example: 'Only the best candidates will be invited to an interview.',
        exampleVi: 'Chỉ có những ứng viên giỏi nhất mới được mời phỏng vấn.',
        extensions: [
          {
            term: 'applicant',
            pos: 'n',
            meaningVi: '(đồng nghĩa) người nộp đơn, ứng cử viên',
          },
        ],
      },
      {
        term: 'generate',
        pos: 'v',
        reading: 'ˈdʒenəreɪt',
        meaningVi: 'tạo, sản xuất',
        example: 'The ad generated only a few applications.',
        exampleVi: 'Quảng cáo đó chỉ tạo nên vài ứng dụng.',
        extensions: [
          {
            term: 'create - produce - cause',
            pos: 'v',
            meaningVi: '(đồng nghĩa) tạo, sản xuất',
          },
          {
            term: 'generation',
            pos: 'n',
            meaningVi: 'sự tạo ra, sự sản xuất ra',
          },
          {
            term: 'generator',
            pos: 'n',
            meaningVi: 'người tạo ra, máy phát điện',
          },
        ],
      },
      {
        term: 'hire',
        pos: 'v',
        reading: 'haɪə',
        meaningVi: 'thuê, mướn',
        example: 'We need to hire some more office staff.',
        exampleVi: 'Chúng ta cần thuê thêm một số nhân viên văn phòng.',
        extensions: [
          {
            meaningVi:
              'khi “hire” làm danh từ, ngoài ý chỉ “thuê mướn” ra, còn có thể chỉ “thuê, phí sử dụng, tiền công”, ví dụ: car hire (thuê xe).',
          },
          {
            term: 'employ - rent',
            pos: 'v',
            meaningVi: '(đồng nghĩa) thuê',
          },
          {
            term: 'fire - dismiss - discharge',
            pos: 'v',
            meaningVi: '(trái nghĩa) sa thải, đuổi việc',
          },
        ],
      },
      {
        term: 'qualification',
        pos: 'n',
        reading: 'ˌkwɒlɪfɪˈkeʃ(ə)n',
        meaningVi: 'phẩm chất, tiêu chuẩn, khả năng',
        example:
          'We will choose the person with the best qualifications for this position.',
        exampleVi:
          'Chúng ta cần chọn người có phẩm chất tốt nhất cho vị trí này.',
        extensions: [
          {
            meaningVi:
              'khi chỉ “tư cách”, cách dùng thường gặp là “qualifications for sth” hoặc “qualifications to do sth”.',
          },
          {
            term: 'capability - credentials',
            pos: 'n',
            meaningVi: '(đồng nghĩa) khả năng, tiêu chuẩn',
          },
          {
            term: 'qualify',
            pos: 'v',
            meaningVi: 'làm cho đủ tiêu chuẩn',
          },
          {
            term: 'qualified',
            pos: 'adj',
            meaningVi: 'đủ tiêu chuẩn',
          },
        ],
      },
      {
        term: 'recruit',
        pos: 'v',
        reading: 'rɪˈkruːt',
        meaningVi: 'tuyển chọn, tuyển dụng',
        example: 'The company likes to recruit people straight out of school.',
        exampleVi: 'Công ty thích tuyển người trực tiếp từ trường học.',
        extensions: [
          {
            meaningVi:
              'khi “recruit” là danh từ có ý chỉ “người mới đến, lính mới”.',
          },
          {
            term: 'recruitment',
            pos: 'n',
            meaningVi: 'sự tuyển dụng',
          },
          {
            term: 'recruiter',
            pos: 'n',
            meaningVi: 'nhà tuyển dụng',
          },
        ],
      },
    ],
  },
  {
    title: '3-2 Retiring',
    description: 'Track 13',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'eligible',
        pos: 'adj',
        reading: 'ˈelidʒəb(ə)l',
        meaningVi: 'đủ điều kiện',
        example: "I'll be eligible for retirement next year.",
        exampleVi: 'Tôi đủ điều kiện để về hưu vào năm sau.',
        extensions: [
          {
            meaningVi:
              'cách dùng là “be eligible for sth” hoặc “be eligible to do sth”.',
          },
          {
            term: 'eligibility',
            pos: 'n',
            meaningVi: 'sự đủ điều kiện',
          },
        ],
      },
      {
        term: 'loyal',
        pos: 'adj',
        reading: 'ˈlɔɪəl',
        meaningVi: 'trung thành',
        example:
          'You have been a loyal employee, having worked in our company for over forty years.',
        exampleVi:
          'Bạn là một nhân viên trung thành khi bạn làm việc tại công ty chúng tôi trên 40 năm.',
        extensions: [
          {
            meaningVi: 'Phía sau thêm giới từ “to”.',
          },
          {
            term: 'constant - faithful',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) trung thành, thành thật',
          },
          {
            term: 'disloyal - inconstant - faithless',
            pos: 'adj',
            meaningVi: '(trái nghĩa) dối trá, bất trung',
          },
          {
            term: 'loyalty',
            pos: 'n',
            meaningVi: 'lòng trung thành',
          },
          {
            term: 'loyally',
            pos: 'adv',
            meaningVi: 'trung thành',
          },
        ],
      },
      {
        term: 'mentor',
        pos: 'n',
        reading: 'ˈmentɔː',
        meaningVi: 'người cố vấn, quân sư',
        example:
          'I am so sad you are retiring because you are my mentor. Who will teach me now?',
        exampleVi:
          'Tôi rất buồn khi anh sắp về hưu vì anh là quân sư của tôi mà. Bây giờ ai sẽ dạy tôi đây?',
      },
      {
        term: 'present',
        pos: 'v',
        reading: 'ˈprezent',
        meaningVi: 'tặng, biếu',
        example:
          "Harry's boss presented him with a gold watch on his retirement.",
        exampleVi:
          'Ông chủ của Harry tặng anh ấy một chiếc đồng hồ đeo tay bằng vàng khi anh ấy nghỉ hưu.',
        extensions: [
          {
            meaningVi:
              'khi có ý chỉ “tặng, cho”, cách dùng là “present sb with sth” hoặc “present sth to sb”.',
          },
          {
            term: 'give',
            pos: 'v',
            meaningVi: '(đồng nghĩa) cho, tặng',
          },
        ],
      },
      {
        term: 'recognition',
        pos: 'n',
        reading: 'ˌrekəgˈnɪʃ(ə)n',
        meaningVi: 'sự công nhận',
        example:
          'The company threw a retirement party for him in recognition of his many years of hard work.',
        exampleVi:
          'Công ty tổ chức một bữa tiệc nghỉ hưu cho ông ấy để công nhận nhiều năm làm việc chăm chỉ của ông.',
        extensions: [
          {
            term: 'appreciation',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự biết ơn, lòng biết ơn',
          },
          {
            term: 'recognize',
            pos: 'v',
            meaningVi: 'công nhận',
          },
        ],
      },
      {
        term: 'retire',
        pos: 'v',
        reading: 'rɪˈtaɪə',
        meaningVi: 'nghỉ hưu',
        example: "I hope I don't get bored when I retire.",
        exampleVi: 'Tôi hy vọng mình không chán khi về hưu.',
        extensions: [
          {
            meaningVi:
              'retire from sth chỉ “tự nghỉ hưu (nơi nào đó)”, retire as sth chỉ “khi đương nhiệm (chức vụ gì đó) thì nghỉ hưu”.',
          },
          {
            term: 'retired',
            pos: 'adj',
            meaningVi: 'hưu trí, ẩn dật',
          },
          {
            term: 'retiree',
            pos: 'n',
            meaningVi: 'người về hưu',
          },
          {
            term: 'retirement',
            pos: 'n',
            meaningVi: 'sự về hưu, việc về hưu',
          },
        ],
      },
      {
        term: 'value',
        pos: 'v',
        reading: 'ˈvæljuː',
        meaningVi: 'đánh giá, xem xét',
        example:
          'We will miss Terry; we valued her as a coworker and a friend.',
        exampleVi:
          'Chúng ta sẽ nhớ Terry; chúng ta xem cô ấy như một người đồng nghiệp, một người bạn.',
        extensions: [
          {
            meaningVi:
              'khi value làm danh từ ý chỉ “giá trị, tính quan trọng”, ví dụ: market value (giá trị thị trường).',
          },
          {
            term: 'appreciate - cherish - treasure',
            pos: 'v',
            meaningVi: '(đồng nghĩa) đánh giá',
          },
          {
            term: 'valuable',
            pos: 'adj',
            meaningVi: 'đáng giá',
          },
          {
            term: 'valueless',
            pos: 'adj',
            meaningVi: 'không có giá trị',
          },
        ],
      },
    ],
  },
  {
    title: '3-3 Salaries',
    description: 'Track 14',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'basis',
        pos: 'n',
        reading: 'ˈbeɪsɪs',
        meaningVi: 'nền tảng, căn cứ',
        example:
          'Your experience and qualifications are the basis for your starting salary.',
        exampleVi:
          'Kinh nghiệm và khả năng của bạn là căn cứ cho mức lương khởi điểm của bạn.',
        extensions: [
          {
            term: 'base',
            pos: 'v',
            meaningVi: 'căn cứ vào, dựa trên',
          },
        ],
      },
      {
        term: 'benefit',
        pos: 'n',
        reading: 'ˈbenɪfɪt',
        meaningVi: 'phúc lợi, tiền phụ cấp',
        example: 'The salary is not very good, but the benefits are excellent.',
        exampleVi: 'Lương không khá lắm nhưng phúc lợi thì tuyệt vời.',
        extensions: [
          {
            meaningVi:
              'khi là động từ, chỉ “khiến lợi ích”, hoặc thêm from vào thì mang nghĩa “có được lợi ích từ...”.',
          },
          {
            term: 'boon - blessing',
            pos: 'n',
            meaningVi: '(đồng nghĩa) lợi ích',
          },
          {
            term: 'fringe benefit',
            meaningVi: 'phụ cấp ngoài',
          },
          {
            term: 'unemployment benefits',
            meaningVi: 'phụ cấp thất nghiệp',
          },
          {
            term: 'beneficial',
            pos: 'adj',
            meaningVi: 'hữu ích',
          },
        ],
      },
      {
        term: 'compensate',
        pos: 'v',
        reading: 'ˈkɒmpenseɪt',
        meaningVi: 'đền bù, bồi thường',
        example: 'You will be compensated for any extra hours you work.',
        exampleVi: 'Bạn sẽ được đền bù cho những giờ làm việc thêm.',
        extensions: [
          {
            meaningVi:
              'Cách dùng là compensate for sth hoặc compensate sb for sth.',
          },
          {
            term: 'compensation',
            pos: 'n',
            meaningVi: 'sự đền bù',
          },
          {
            term: 'compensatory',
            pos: 'adj',
            meaningVi: 'bồi thường',
          },
        ],
      },
      {
        term: 'constantly',
        pos: 'adv',
        reading: 'ˈkɒnst(ə)ntli',
        meaningVi: 'thường xuyên, liên tục',
        example:
          'She is constantly talking about her salary; she rarely talks about anything else!',
        exampleVi:
          'Cô ta thường xuyên nói về lương bổng của cô ta; cô ta hiếm khi nói gì khác!',
        extensions: [
          {
            term: 'always - continually',
            pos: 'adv',
            meaningVi: '(đồng nghĩa) luôn luôn',
          },
          {
            term: 'often - frequently',
            pos: 'adv',
            meaningVi: '(đồng nghĩa) thường thường',
          },
          {
            term: 'constant',
            pos: 'adj',
            meaningVi: 'thường xuyên',
          },
          {
            term: 'constancy',
            pos: 'n',
            meaningVi: 'sự thường xuyên',
          },
        ],
      },
      {
        term: 'hesitant',
        pos: 'adj',
        reading: 'ˈhezɪtənt',
        meaningVi: 'do dự',
        example:
          'I was a little hesitant to ask for a pay raise because I had only been with the company for a few months.',
        exampleVi:
          'Tôi có một chút do dự để yêu cầu tăng lương vì tôi chỉ làm tại công ty được vài tháng.',
        extensions: [
          {
            meaningVi:
              'khi chỉ ý “do dự về...”, đằng sau có thể đi với about V-ing, hoặc to V.',
          },
          {
            term: 'hesitate',
            pos: 'v',
            meaningVi: 'do dự',
          },
          {
            term: 'hesitation',
            pos: 'n',
            meaningVi: 'sự do dự',
          },
          {
            term: 'hesitantly',
            pos: 'adv',
            meaningVi: 'do dự, chần chừ',
          },
        ],
      },
      {
        term: 'match',
        pos: 'v',
        reading: 'mætʃ',
        meaningVi: 'làm bằng nhau, tương xứng',
        example:
          "I'm hoping you can match the salary I had with my last company.",
        exampleVi:
          'Tôi hy vọng bạn có thể đưa mức lương bằng mức lương của tôi ở công ty trước đây.',
        extensions: [
          {
            meaningVi:
              'match cũng có thể là danh từ, chỉ “cuộc thi, đối thủ...”.',
          },
        ],
      },
      {
        term: 'negotiate',
        pos: 'v',
        reading: 'nɪˈgəʊʃieɪt',
        meaningVi: 'thương lượng, đàm phán',
        example: "He's talking to the boss to try to negotiate a pay raise.",
        exampleVi: 'Anh ấy nói chuyện với ông chủ để cố gắng đòi tăng lương.',
        extensions: [
          {
            term: 'discuss',
            pos: 'v',
            meaningVi: '(đồng nghĩa) thảo luận',
          },
          {
            term: 'negotiation',
            pos: 'n',
            meaningVi: 'sự thương lượng',
          },
          {
            term: 'negotiable',
            pos: 'adj',
            meaningVi: 'có thể thương lượng',
          },
          {
            term: 'the negotiating table',
            meaningVi: 'bàn đàm phán',
          },
        ],
      },
      {
        term: 'obviously',
        pos: 'adv',
        reading: 'ˈɒbviəsli',
        meaningVi: 'rõ ràng',
        example:
          'She keeps asking for a pay raise; she obviously needs the money.',
        exampleVi: 'Cô ấy cứ yêu cầu tăng lương; rõ ràng cô ấy cần tiền.',
        extensions: [
          {
            term: 'evidently - clearly',
            pos: 'adv',
            meaningVi: '(đồng nghĩa) một cách rõ ràng',
          },
          {
            term: 'obvious',
            pos: 'adj',
            meaningVi: 'rõ ràng, hiển nhiên',
          },
        ],
      },
    ],
  },
  {
    title: '3-4 Promotions',
    description: 'Track 15',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'apprentice',
        pos: 'n',
        reading: 'əˈprentɪs',
        meaningVi: 'thực tập sinh',
        example:
          'Most skilled laborers learn their trade by becoming apprentices to more experienced people.',
        exampleVi:
          'Hầu hết những lao động giỏi học nghề của họ bằng cách trở thành thực tập sinh cho những người có nhiều kinh nghiệm hơn.',
        extensions: [
          {
            term: 'beginner - novice - tyro',
            pos: 'n',
            meaningVi: '(đồng nghĩa) người bắt đầu, người tiên phong',
          },
          {
            term: 'veteran',
            pos: 'n',
            meaningVi: '(trái nghĩa) người có kinh nghiệm',
          },
          {
            term: 'apprenticeship',
            pos: 'n',
            meaningVi: 'học nghề',
          },
        ],
      },
      {
        term: 'commensurate',
        pos: 'adj',
        reading: 'kəˈmenʃərət',
        meaningVi: 'cân xứng, tương xứng',
        example:
          'You will receive a new salary commensurate with the position.',
        exampleVi: 'Bạn sẽ nhận một mức lương mới tương xứng với vị trí này.',
        extensions: [
          {
            meaningVi: 'cách dùng be commensurate with sth.',
          },
          {
            term: 'proportional',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) cân xứng, tương xứng',
          },
        ],
      },
      {
        term: 'conduct',
        pos: 'n',
        reading: 'ˈkɒndʌkt',
        meaningVi: 'tư cách đạo đức, cách chỉ đạo, cách quản lý',
        example:
          'She was given a promotion because of her excellent conduct at work.',
        exampleVi:
          'Cô ấy được thăng chức bởi vì cách quản lý tuyệt vời của cô ở công việc.',
        extensions: [
          {
            meaningVi:
              'khi làm động từ có thể chỉ “điều khiển, hướng dẫn, quản lý”, phát âm là [kənˊdʌkt]',
          },
          {
            term: 'behavior',
            pos: 'n',
            meaningVi: '(đồng nghĩa) cư xử, ứng xử',
          },
          {
            term: 'management - administration',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự quản lý',
          },
          {
            term: 'conductor',
            pos: 'n',
            meaningVi: 'người điều khiển, người chỉ dẫn',
          },
        ],
      },
      {
        term: 'dedication',
        pos: 'n',
        reading: 'ˌdedɪˈkeɪʃən',
        meaningVi: 'sự cống hiến, sự đóng góp',
        example:
          'Her dedication to the job has finally earned her a promotion.',
        exampleVi:
          'Sự cống hiến cho công việc của cô ấy cuối cùng đã đem đến sự thăng chức cho cô ấy.',
        extensions: [
          {
            meaningVi: 'cách dùng thường gặp nhất dedication to sth.',
          },
          {
            term: 'devotion - fidelity',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự cống hiến',
          },
          {
            term: 'dedicate',
            pos: 'v',
            meaningVi: 'cống hiến',
          },
          {
            term: 'dedicated',
            pos: 'adj',
            meaningVi: 'dành cho, có lòng trung thành duy nhất với',
          },
        ],
      },
      {
        term: 'expert',
        pos: 'n',
        reading: 'ˈekspɜːt',
        meaningVi: 'chuyên gia',
        example:
          'You were chosen for the job because you are an expert on doing business in China.',
        exampleVi:
          'Bạn được chọn cho công việc này bởi vì bạn là chuyên gia về kinh doanh ở Trung Quốc.',
        extensions: [
          {
            meaningVi:
              'thông thường đi với on, in hoặc at để thể hiện “chuyên gia ở phương diện...”.',
          },
          {
            term: 'ace - master - specialist',
            pos: 'n',
            meaningVi: '(đồng nghĩa) chuyên gia',
          },
          {
            term: 'amateur',
            pos: 'n',
            meaningVi: '(trái nghĩa) nghiệp dư',
          },
          {
            term: 'expert',
            pos: 'adj',
            meaningVi: 'thành thạo, chuyên về',
          },
        ],
      },
      {
        term: 'promote',
        pos: 'v',
        reading: 'prəˈməʊt',
        meaningVi: 'đề bạt, thăng tiến',
        example: 'She has recently been promoted to manager.',
        exampleVi: 'Gần đây cô ấy được đề bạt làm giám đốc.',
        extensions: [
          {
            meaningVi:
              'khi mang nghĩa “thăng chức”, thường có cách dùng promote sb to sth, sau to đi trực tiếp với tên chức danh.',
          },
          {
            term: 'advance - raise - upgrade',
            pos: 'v',
            meaningVi: '(đồng nghĩa) nâng cao, nâng cấp',
          },
          {
            term: 'degrade - demote',
            pos: 'v',
            meaningVi: '(trái nghĩa) giáng cấp',
          },
          {
            term: 'promotion',
            pos: 'n',
            meaningVi: 'sự thăng chức',
          },
          {
            term: 'promotional',
            pos: 'adj',
            meaningVi: 'thuộc về thăng chức',
          },
        ],
      },
      {
        term: 'success',
        pos: 'n',
        reading: 'səkˈses',
        meaningVi: 'sự thành công',
        example: "He got promoted again; he is such a success, isn't he?",
        exampleVi:
          'Anh ấy lại được thăng chức; anh ấy là một người thành công đúng không?',
        extensions: [
          {
            term: 'winner - smash - hit',
            pos: 'n',
            meaningVi: '(đồng nghĩa) người chiến thắng',
          },
          {
            term: 'failure',
            pos: 'n',
            meaningVi: '(trái nghĩa) sự thất bại',
          },
          {
            term: 'succeed',
            pos: 'v',
            meaningVi: 'thành công',
          },
          {
            term: 'successful',
            pos: 'adj',
            meaningVi: 'thành công',
          },
        ],
      },
      {
        term: 'vested',
        pos: 'adj',
        reading: 'ˈvestɪd',
        meaningVi: 'được trao cho, (thuộc) quyền sở hữu bất di bất dịch',
        example: "She has a vested interest in the company's success.",
        exampleVi:
          'Cô ấy được trao cho quyền lợi trong sự thành công của công ty.',
        extensions: [
          {
            term: 'vested interest',
            meaningVi: 'quyền lợi được ban cho',
          },
          {
            term: 'vest',
            pos: 'v',
            meaningVi: 'trao cho, ban cho',
          },
        ],
      },
    ],
  },
  {
    title: '3-5 Job Applications',
    description: 'Track 16',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'accomplishment',
        pos: 'n',
        reading: 'əˈkʌmplɪʃmənt',
        meaningVi: 'thành tích, thành tựu',
        example: 'What are some of your greatest accomplishments?',
        exampleVi: 'Vài thành tích nổi bật nhất của anh là gì?',
        extensions: [
          {
            term: 'achievement - success - triumph',
            pos: 'n',
            meaningVi: '(đồng nghĩa) thành tích',
          },
          {
            term: 'accomplish',
            pos: 'v',
            meaningVi: 'đạt được',
          },
          {
            term: 'accomplished',
            pos: 'adj',
            meaningVi: 'có thành tích',
          },
        ],
      },
      {
        term: 'achievement',
        pos: 'n',
        reading: 'əˈtʃiːvmənt',
        meaningVi: 'thành tựu',
        example:
          'He is a man of many achievements, both in the business world and in his personal life.',
        exampleVi:
          'Anh ấy là người đàn ông có nhiều thành tựu, cả trong lĩnh vực kinh doanh và trong đời sống cá nhân.',
        extensions: [
          {
            term: 'accomplishment - success - triumph',
            pos: 'n',
            meaningVi: '(đồng nghĩa) thành tựu',
          },
          {
            term: 'achieve',
            pos: 'v',
            meaningVi: 'đạt được',
          },
          {
            term: 'achievable',
            pos: 'adj',
            meaningVi: 'có thể đạt được',
          },
        ],
      },
      {
        term: 'apply',
        pos: 'v',
        reading: 'əˈplaɪ',
        meaningVi: 'nộp đơn, xin, thỉnh cầu',
        example: "Why don't you apply for the job?",
        exampleVi: 'Tại sao bạn không nộp đơn cho công việc này?',
        extensions: [
          {
            meaningVi:
              'khi mang nghĩa “xin (vật hay việc nào đó)”, dùng giới từ for. Khi “xin (cơ quan nào đó)” thì dùng giới từ to.',
          },
          {
            term: 'application',
            pos: 'n',
            meaningVi: 'sự nộp đơn, sự thỉnh cầu',
          },
          {
            term: 'applicant',
            pos: 'n',
            meaningVi: 'người nộp đơn, người xin việc',
          },
          {
            term: 'applied',
            pos: 'adj',
            meaningVi: 'được thỉnh cầu',
          },
        ],
      },
      {
        term: 'background',
        pos: 'n',
        reading: 'ˈbækgraʊnd',
        meaningVi: 'bối cảnh, quá trình đào tạo, nền tảng',
        example:
          'I currently work as an office manager, but my background is in engineering.',
        exampleVi:
          'Hiện tôi làm giám đốc văn phòng, nhưng ngành đào tạo của tôi là kỹ sư xây dựng.',
        extensions: [
          {
            meaningVi:
              'thể hiện “có kinh nghiệm ở phương diện...”, dùng giới từ in.',
          },
          {
            term: 'cultural/educational/family background',
            meaningVi: 'nền tảng văn hoá/giáo dục/gia đình',
          },
          {
            term: 'privileged/wealthy background',
            meaningVi: 'bối cảnh thịnh vượng/giàu có',
          },
        ],
      },
      {
        term: 'confidence',
        pos: 'n',
        reading: 'ˈkɒnfɪdəns',
        meaningVi: 'sự tin tưởng, lòng tin',
        example:
          'I can see you certainly have enough confidence for the position, but do you have the experience?',
        exampleVi:
          'Tôi có thể thấy được bạn có đủ sự tự tin cho vị trí này, nhưng bạn có kinh nghiệm không?',
        extensions: [
          {
            term: 'assurance - certainty',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự đảm bảo, sự chắc chắn',
          },
          {
            term: 'confident',
            pos: 'adj',
            meaningVi: 'tự tin',
          },
          {
            term: 'self-confidence',
            pos: 'n',
            meaningVi: 'sự tự tin',
          },
          {
            term: 'consumer confidence',
            meaningVi: 'lòng tin của khách hàng',
          },
        ],
      },
      {
        term: 'contribute',
        pos: 'v',
        reading: 'kənˈtrɪbjuːt',
        meaningVi: 'đóng góp',
        example:
          "With my experience, I feel I can contribute a lot to the company's success.",
        exampleVi:
          'Với kinh nghiệm của tôi, tôi nhận thấy mình có thể đóng góp nhiều cho sự thành công của công ty.',
        extensions: [
          {
            meaningVi: 'cách dùng là contribute sth to/toward sth.',
          },
          {
            term: 'donate - give - present',
            pos: 'v',
            meaningVi: '(đồng nghĩa) hiến dâng, tặng',
          },
          {
            term: 'contribution',
            pos: 'n',
            meaningVi: 'sự đóng góp',
          },
          {
            term: 'contributor',
            pos: 'n',
            meaningVi: 'người đóng góp',
          },
        ],
      },
      {
        term: 'merit',
        pos: 'n',
        reading: 'ˈmerɪt',
        meaningVi: 'sự xuất sắc, sự xứng đáng',
        example:
          'Your resume lists all your merits, but tell me what you think your biggest fault is.',
        exampleVi:
          'Bản sơ yếu lý lịch của bạn liệt kê tất cả những phẩm chất xuất sắc của bạn, nhưng hãy cho tôi biết bạn nghĩ điểm yếu lớn nhất của bạn là gì?',
        extensions: [
          {
            term: 'advantage - strength',
            pos: 'n',
            meaningVi: '(đồng nghĩa) điểm mạnh',
          },
          {
            term: 'fault - flaw - defect',
            pos: 'n',
            meaningVi: '(trái nghĩa) điểm yếu',
          },
        ],
      },
      {
        term: 'profile',
        pos: 'n',
        reading: 'ˈprəʊfaɪl',
        meaningVi: 'sự mô tả sơ lược',
        example: 'Please include a short profile with your resume.',
        exampleVi:
          'Vui lòng bao gồm sự mô tả ngắn cùng với sơ yếu lý lịch của bạn.',
        extensions: [
          {
            meaningVi:
              'khi làm động từ chỉ “vẽ mặt nghiêng, viết giới thiệu của...”.',
          },
          {
            term: 'DNA profiling',
            meaningVi: 'DNA mô phỏng DNA',
          },
          {
            term: 'high-profile',
            pos: 'adj',
            meaningVi: 'có danh tiếng.',
          },
        ],
      },
      {
        term: 'reject',
        pos: 'v',
        reading: 'rɪˈdʒekt',
        meaningVi: 'từ chối, bác bỏ',
        example:
          "His application was rejected because he doesn't have a college degree.",
        exampleVi:
          'Đơn xin việc của anh ấy bị bác bỏ vì anh ấy không có bằng đại học.',
        extensions: [
          {
            meaningVi:
              'khi là danh từ, chỉ “người bị xã hội từ chối” hoặc “phế phẩm, vật bị loại”.',
          },
          {
            term: 'deny - refuse - decline',
            pos: 'v',
            meaningVi: '(đồng nghĩa) từ chối, bác bỏ',
          },
          {
            term: 'accept - approve',
            pos: 'v',
            meaningVi: '(trái nghĩa) chấp nhận, tán thành',
          },
          {
            term: 'rejection',
            pos: 'n',
            meaningVi: 'sự bác bỏ',
          },
        ],
      },
      {
        term: 'submit',
        pos: 'v',
        reading: 'səbˈmɪt',
        meaningVi: 'đệ trình, nộp',
        example: 'Please submit your application before February 28th.',
        exampleVi: 'Vui lòng nộp đơn xin việc của bạn trước ngày 28 tháng Hai.',
        extensions: [
          {
            term: 'submission',
            pos: 'n',
            meaningVi: 'sự đệ trình',
          },
        ],
      },
      {
        term: 'time-consuming',
        pos: 'adj',
        reading: 'ˈtaɪmkənˈsjuːmɪŋ',
        meaningVi: 'tốn thời gian',
        example: 'Reading all the applications can be so time-consuming.',
        exampleVi: 'Đọc tất cả đơn xin việc có thể rất tốn nhiều thời gian.',
      },
      {
        term: 'training',
        pos: 'n',
        reading: 'ˈtreɪnɪŋ',
        meaningVi: 'sự đào tạo',
        example:
          "We provide training for the job, so it's OK if you don't have experience.",
        exampleVi:
          'Chúng tôi sẽ đào tạo cho công việc này, vì thế nếu bạn không có kinh nghiệm cũng không sao.',
        extensions: [
          {
            term: 'train',
            pos: 'v',
            meaningVi: 'đào tạo',
          },
          {
            term: 'training session',
            meaningVi: 'khóa đào tạo',
          },
          {
            term: 'on-the-job training',
            meaningVi: 'đào tạo cho công việc',
          },
        ],
      },
      {
        term: 'update',
        pos: 'v',
        reading: 'ˌʌpˈdeɪt',
        meaningVi: 'cập nhật, cung cấp thông tin mới nhất cho ai',
        example:
          'Your resume only goes up to the end of last year; can you update me on what you have been doing recently?',
        exampleVi:
          'Sơ yếu lý lịch của bạn chỉ nêu đến cuối năm ngoái, bạn có thể cung cấp cho tôi những gì bạn đã làm gần đây chứ?',
        extensions: [
          {
            meaningVi:
              'khi muốn thể hiện ý “cho (ai) biết được tin mới nhất”, cách dùng là update sb on sth.',
          },
        ],
      },
      {
        term: 'wage',
        pos: 'n',
        reading: 'weɪdʒ',
        meaningVi: 'tiền công',
        example: 'I want a fair wage for this new position.',
        exampleVi: 'Tôi muốn tiền lương công bằng cho vị trí mới này.',
        extensions: [
          {
            term: 'pay - payment',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự thanh toán, sự trả lương',
          },
          {
            term: 'minimum wage',
            meaningVi: 'tiền công tối thiểu',
          },
        ],
      },
    ],
  },
  {
    title: '4-1 Shopping',
    description: 'Track 17',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'allowance',
        pos: 'n',
        reading: 'əˈlaʊəns',
        meaningVi: 'sự cho phép, tiền phụ cấp',
        example:
          'You have to check with the airline to find out their weight allowance.',
        exampleVi:
          'Bạn phải kiểm tra với công ty hàng không để biết trọng lượng cho phép.',
        extensions: [
          {
            meaningVi:
              'allowance còn có nghĩa “sự chiếu cố, sự dung thứ”, thường dùng make allowance(s) for sb để thể hiện.',
          },
          {
            term: 'pocket money',
            meaningVi: '(đồng nghĩa) một chút tiền',
          },
          {
            term: 'baggage allowance',
            meaningVi: 'khối lượng hành lý được phép',
          },
          {
            term: 'tax allowance',
            meaningVi: 'tiền thuế',
          },
          {
            term: 'recommended daily allowance',
            meaningVi: 'tiền phụ cấp cho nhu cầu hằng ngày',
          },
        ],
      },
      {
        term: 'checkout',
        pos: 'n',
        reading: 'ˈtʃekaʊt',
        meaningVi: 'việc trả tiền để rời khỏi khách sạn',
        example:
          "I got to the checkout and then found that I didn't have any money on me!",
        exampleVi:
          'Tôi phải trả tiền để rời khỏi khách sạn và rồi tôi phát hiện mình không mang theo tiền.',
        extensions: [
          {
            term: 'check out',
            meaningVi: 'trả tiền để rời khỏi khách sạn',
          },
        ],
      },
      {
        term: 'customer',
        pos: 'n',
        reading: 'ˈkʌstəmə',
        meaningVi: 'khách hàng',
        example: 'If a store has no customers, it will make no money.',
        exampleVi:
          'Nếu một cửa hàng không có khách hàng thì nó không kiếm được tiền.',
        extensions: [
          {
            term: 'guest - patron - client',
            pos: 'n',
            meaningVi: '(đồng nghĩa) khách hàng',
          },
          {
            term: 'customer service',
            meaningVi: 'dịch vụ khách hàng',
          },
          {
            term: 'regular/repeat customer',
            meaningVi: 'khách hàng thường xuyên/khách quen',
          },
        ],
      },
      {
        term: 'item',
        pos: 'n',
        reading: 'ˈaɪtəm',
        meaningVi: 'khoản, mục, món hàng',
        example: 'I only have two items; can I go in front of you?',
        exampleVi: 'Tôi chỉ có 2 món, tôi có thể đi trước bạn không?',
        extensions: [
          {
            term: "collector's item",
            meaningVi: 'món đồ quý giá của người sưu tầm',
          },
        ],
      },
      {
        term: 'obtain',
        pos: 'v',
        reading: 'əbˈteɪn',
        meaningVi: 'thu được, kiếm được, giành được',
        example: 'I need to obtain a free-parking ticket.',
        exampleVi: 'Tôi cần đạt được chiếc vé đậu xe miễn phí.',
        extensions: [
          {
            term: 'acquire - earn - gain',
            pos: 'v',
            meaningVi: '(đồng nghĩa) thu được, giành được',
          },
          {
            term: 'obtainable',
            pos: 'adj',
            meaningVi: 'có thể giành được',
          },
        ],
      },
      {
        term: 'prerequisite',
        pos: 'n',
        reading: 'priːˈrekwəzit',
        meaningVi: 'điều bắt buộc trước nhất, điều chủ yếu',
        example:
          'Knowing what you want and how much you want to pay is a prerequisite to a happy shopping experience.',
        exampleVi:
          'Biết những gì bạn muốn và bao nhiêu tiền bạn muốn trả là điều chủ yếu nhất để có một trải nghiệm mua sắm vui vẻ.',
        extensions: [
          {
            meaningVi: 'đi với giới từ for, of hoặc to.',
          },
          {
            term: 'precondition',
            pos: 'n',
            meaningVi: '(đồng nghĩa) điều kiện tiên quyết',
          },
        ],
      },
      {
        term: 'quality',
        pos: 'n',
        reading: 'ˈkwɒlɪti',
        meaningVi: 'chất lượng',
        example: 'Usually, a cheaper price means poorer quality.',
        exampleVi:
          'Thường thường, giá rẻ hơn đồng nghĩa với chất lượng kém hơn.',
        extensions: [
          {
            meaningVi:
              'khi là tính từ mang nghĩa “tính tốt, phẩm chất tốt”, như quality product (sản phẩm phẩm chất tốt).',
          },
          {
            term: 'class - grade',
            pos: 'n',
            meaningVi: '(đồng nghĩa) loại, bậc',
          },
          {
            term: 'quality control',
            meaningVi: 'kiểm soát chất lượng',
          },
          {
            term: 'quality assurance',
            meaningVi: 'đảm bảo chất lượng',
          },
          {
            term: 'quantity',
            pos: 'n',
            meaningVi: '(dễ nhầm) số lượng',
          },
        ],
      },
      {
        term: 'scan',
        pos: 'v',
        reading: 'skæn',
        meaningVi: 'quét qua',
        example:
          "If the price label won't scan properly, you'll have to type in the price by hand.",
        exampleVi:
          'Nếu nhãn giá không thể quét được, bạn sẽ phải đánh máy giá cả bằng tay.',
        extensions: [
          {
            meaningVi:
              'cũng có thể sử dụng như danh từ, như ultrasound scan (siêu âm), brain scan (siêu âm não).',
          },
          {
            term: 'scanner',
            pos: 'n',
            meaningVi: 'máy quét',
          },
        ],
      },
      {
        term: 'trend',
        pos: 'n',
        reading: 'trend',
        meaningVi: 'khuynh hướng',
        example:
          'Shopping trends show what kinds of things people buy and when.',
        exampleVi:
          'Khuynh hướng mua sắm cho biết loại hàng hóa nào người ta mua và khi nào mua.',
        extensions: [
          {
            term: 'current - tendency',
            pos: 'n',
            meaningVi: '(đồng nghĩa) khuynh hướng',
          },
          {
            term: 'fad - fashion - craze',
            pos: 'n',
            meaningVi: '(đồng nghĩa) mốt, khuynh hướng',
          },
          {
            term: 'trendy',
            pos: 'adj',
            meaningVi: 'chạy theo mốt, rất mốt',
          },
          {
            term: 'trendsetter',
            pos: 'n',
            meaningVi: 'người khởi xướng một mốt mới, khuynh hướng mới',
          },
        ],
      },
    ],
  },
  {
    title: '4-2 Ordering Supplies',
    description: 'Track 18',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'automatically',
        pos: 'adv',
        reading: 'ɔːtəˈmætikli',
        meaningVi: 'một cách tự động',
        example:
          'Our computer system automatically tells us when we need to order more supplies.',
        exampleVi:
          'Hệ thống máy tính của chúng ta tự động báo khi nào chúng ta cần đặt mua nhiều hàng cung cấp hơn.',
        extensions: [
          {
            term: 'automatic',
            pos: 'adj',
            meaningVi: 'tự động',
          },
        ],
      },
      {
        term: 'catalog',
        pos: 'n',
        reading: 'kæt(ə)lɒg',
        meaningVi: 'sách in kiểu mẫu và giá tiền, catalô',
        example: 'I would like to order something I saw in your catalog.',
        exampleVi: 'Tôi muốn đặt mua vài thứ tôi thấy trong catalô của bạn.',
        extensions: [
          {
            meaningVi:
              'cách phiên âm của người Anh là catalogue; catalog cũng có thể làm động từ, mang ý “đính kèm... trong mục lục”.',
          },
          {
            term: 'list',
            pos: 'n',
            meaningVi: '(đồng nghĩa) danh sách',
          },
        ],
      },
      {
        term: 'crucial',
        pos: 'adj',
        reading: 'ˈkruːʃəl',
        meaningVi: 'quan trọng, thiết yếu',
        example:
          "It's crucial that we receive these supplies before Christmas.",
        exampleVi:
          'Điều quan trọng là chúng tôi phải nhận được những hàng hóa này trước lễ Giáng Sinh.',
        extensions: [
          {
            meaningVi:
              'khi thể hiện “đối với... rất quan trọng” thì dùng giới từ to.',
          },
          {
            term: 'critical - key - vital - essential',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) quan trọng, thiết yếu, nhất thiết',
          },
          {
            term: 'crucially',
            pos: 'adv',
            meaningVi: 'một cách quan trọng',
          },
        ],
      },
      {
        term: 'fulfill',
        pos: 'v',
        reading: 'fulˈfɪl',
        meaningVi: 'hoàn thành',
        example: 'Will you be able to fulfill our order?',
        exampleVi: 'Bạn có thể hoàn thành đơn đặt hàng này không?',
        extensions: [
          {
            term: 'achieve - satisfy',
            pos: 'v',
            meaningVi: '(đồng nghĩa) đạt được',
          },
          {
            term: 'fulfillment',
            pos: 'n',
            meaningVi: 'sự hoàn thành',
          },
        ],
      },
      {
        term: 'inventory',
        pos: 'n',
        reading: 'ˈɪnvənt(ə)ri',
        meaningVi: 'bản kiểm kê hàng hóa',
        example:
          'I have taken inventory to see what supplies we need to order.',
        exampleVi:
          'Tôi kiểm kê hàng hóa để xem chúng tôi cần đặt những hàng hóa nào.',
        extensions: [
          {
            term: 'stock',
            pos: 'n',
            meaningVi: '(đồng nghĩa) hàng tồn kho',
          },
          {
            term: 'inventory control',
            meaningVi: 'kiểm kê hàng tồn kho',
          },
          {
            term: 'inventory management',
            meaningVi: 'quản lý hàng tồn kho',
          },
        ],
      },
      {
        term: 'maintain',
        pos: 'v',
        reading: 'meɪnˈteɪn',
        meaningVi: 'duy trì',
        example:
          'You can usually get better prices and service if you maintain a good relationship with the supplier.',
        exampleVi:
          'Bạn thường có thể nhận giá cả và dịch vụ tốt hơn nếu bạn duy trì quan hệ tốt với nhà cung cấp.',
        extensions: [
          {
            term: 'maintenance',
            pos: 'n',
            meaningVi: 'sự duy trì',
          },
          {
            term: 'upkeep',
            pos: 'n',
            meaningVi: 'sự duy trì',
          },
        ],
      },
      {
        term: 'order',
        pos: 'v',
        reading: 'ˈɔːdə',
        meaningVi: 'đặt hàng',
        example: 'If we order the pens today, when will we receive them?',
        exampleVi:
          'Nếu hôm nay chúng tôi đặt mua viết thì khi nào chúng tôi sẽ nhận chúng?',
        extensions: [
          {
            meaningVi:
              'khi làm danh từ thì mang nghĩa “đơn đặt hàng, hàng đặt”, như place an order (đặt hàng), receive an order (nhận được đơn đặt hàng).',
          },
        ],
      },
      {
        term: 'promptly',
        pos: 'adv',
        reading: 'ˈprɒmptli',
        meaningVi: 'nhanh chóng, ngay lập tức',
        example:
          'I ordered the supplies and they promptly arrived the next day.',
        exampleVi: 'Tôi đặt hàng và chúng ngay lập tức đến vào ngày hôm sau.',
        extensions: [
          {
            term: 'immediately - without delay',
            meaningVi: '(đồng nghĩa) ngay lập tức, không chậm trễ',
          },
          {
            term: 'on time',
            meaningVi: '(đồng nghĩa) đúng giờ',
          },
          {
            term: 'prompt',
            pos: 'adj',
            meaningVi: 'nhanh chóng',
          },
          {
            term: 'promptness',
            pos: 'n',
            meaningVi: 'sự nhanh chóng',
          },
        ],
      },
      {
        term: 'rectify',
        pos: 'v',
        reading: 'ˈrektɪfaɪ',
        meaningVi: 'chỉnh sửa, hiệu đính',
        example:
          'You sent us the wrong order. How will you rectify the situation?',
        exampleVi:
          'Bạn đã gửi đơn hàng sai cho chúng tôi. Bạn sẽ sửa đổi tình trạng này như thế nào?',
        extensions: [
          {
            term: 'correct - put right',
            meaningVi: '(đồng nghĩa) làm đúng, hiệu đính',
          },
          {
            term: 'rectification',
            pos: 'n',
            meaningVi: 'sự chỉnh sửa, sự hiệu đính',
          },
        ],
      },
      {
        term: 'remember',
        pos: 'v',
        reading: 'rɪˈmembɚ',
        meaningVi: 'nhớ, ghi nhớ',
        example: 'Did you remember to order the copy paper?',
        exampleVi: 'Bạn có nhớ đặt mua giấy copy không?',
        extensions: [
          {
            meaningVi:
              'remember V-ing chỉ “nhớ làm việc gì đó ở quá khứ”, remember to V chỉ “nhớ phải đi làm việc gì đó”.',
          },
          {
            term: 'forget',
            pos: 'v',
            meaningVi: '(trái nghĩa) quên',
          },
        ],
      },
      {
        term: 'stationery',
        pos: 'n',
        reading: 'ˈsteiʃ(ə)n(ə)ri',
        meaningVi: 'văn phòng phẩm',
        example: 'I need some more stationery: just some paper and pens.',
        exampleVi: 'Tôi cần thêm văn phòng phẩm: chỉ giấy và bút.',
        extensions: [
          {
            term: 'stationary',
            pos: 'adj',
            meaningVi: 'thuộc về văn phòng phẩm',
          },
        ],
      },
      {
        term: 'sufficiently',
        pos: 'adv',
        reading: 'səˈfɪʃəntlɪ',
        meaningVi: 'đầy đủ',
        example:
          'The defects resulted from the workers not being sufficiently trained.',
        exampleVi: 'Sai sót do từ những công nhân chưa được đào tạo đầy đủ.',
        extensions: [
          {
            term: 'enough',
            pos: 'adv',
            meaningVi: '(đồng nghĩa) đủ',
          },
          {
            term: 'insufficiently',
            pos: 'adv',
            meaningVi: '(trái nghĩa) thiếu',
          },
          {
            term: 'sufficient',
            pos: 'adj',
            meaningVi: 'đầy đủ',
          },
          {
            term: 'suffice',
            pos: 'v',
            meaningVi: 'làm cho đủ',
          },
          {
            term: 'sufficiency',
            pos: 'n',
            meaningVi: 'sự đầy đủ',
          },
        ],
      },
      {
        term: 'supply',
        pos: 'v',
        reading: 'səˈplaɪ',
        meaningVi: 'cung cấp',
        example: 'This is the company that supplies our computer equipment.',
        exampleVi: 'Đây là công ty cung cấp thiết bị máy tính.',
        extensions: [
          {
            meaningVi:
              'khi supply là danh từ thì nó có nghĩa “sự cung cấp, hàng cung cấp, nguồn dự trữ”, như water supply (sự cung cấp nước), electricity supply (sự cung ứng điện).',
          },
          {
            term: 'provide',
            pos: 'v',
            meaningVi: '(đồng nghĩa) cung cấp',
          },
          {
            term: 'supplier',
            pos: 'n',
            meaningVi: 'nhà cung cấp',
          },
          {
            term: 'supply and demand',
            meaningVi: 'cung và cầu',
          },
        ],
      },
      {
        term: 'verify',
        pos: 'v',
        reading: 'ˈverɪfaɪ',
        meaningVi: 'xác minh, xác nhận, khẳng định',
        example:
          'Can you verify that the order will arrive by the end of the week?',
        exampleVi: 'Bạn có thể khẳng định hàng đặt sẽ đến vào cuối tuần chứ?',
        extensions: [
          {
            term: 'confirm',
            pos: 'v',
            meaningVi: '(đồng nghĩa) khẳng định',
          },
          {
            term: 'verifiable',
            pos: 'adj',
            meaningVi: 'có thể xác minh',
          },
          {
            term: 'verification',
            pos: 'n',
            meaningVi: 'sự xác minh',
          },
        ],
      },
    ],
  },
  {
    title: '4-3 Shipping',
    description: 'Track 19',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'carrier',
        pos: 'n',
        reading: 'ˈkæriə',
        meaningVi: 'hãng vận tải, tàu chuyên chở',
        example:
          'We can ship it out tomorrow, but which carrier do you want to use?',
        exampleVi:
          'Chúng tôi có thể gửi chở hàng bằng tàu vào ngày mai, nhưng bạn muốn sử dụng hãng vận tải nào?',
        extensions: [
          {
            term: 'carry',
            pos: 'v',
            meaningVi: 'mang, khuân',
          },
          {
            term: 'aircraft carrier',
            meaningVi: 'hàng không mẫu hạm',
          },
        ],
      },
      {
        term: 'essentially',
        pos: 'adv',
        reading: 'ɪˈsenʃəli',
        meaningVi: 'về cơ bản, về bản chất',
        example:
          'Essentially, we need your order by the 7th if you want to receive the goods by the end of the month.',
        exampleVi:
          'Về cơ bản, chúng tôi cần đơn đặt hàng của các anh vào ngày 7 nếu các anh muốn nhận hàng vào cuối tháng.',
        extensions: [
          {
            term: 'basically',
            pos: 'adv',
            meaningVi: '(đồng nghĩa) về cơ bản',
          },
          {
            term: 'essential',
            pos: 'adj',
            meaningVi: 'thiết yếu',
          },
        ],
      },
      {
        term: 'estimate',
        pos: 'n',
        reading: 'ˈestimeit',
        meaningVi: 'sự đánh giá, sự ước lượng',
        example: 'Can you give me an estimate of the delivery time?',
        exampleVi:
          'Bạn có thể cho tôi một ước lượng về thời gian giao hàng được không?',
        extensions: [
          {
            meaningVi:
              'khi là động từ, đọc [ˈestɪmeɪt], ngoài chỉ “ước đoán”, còn có thể chỉ “đánh giá, phán đoán”.',
          },
          {
            term: 'guesstimate',
            pos: 'n, v',
            meaningVi: '(đồng nghĩa) đoán',
          },
          {
            term: 'rough estimate',
            meaningVi: 'đoán chính xác',
          },
          {
            term: 'conservative estimate',
            meaningVi: 'đoán chừng',
          },
        ],
      },
      {
        term: 'liability',
        pos: 'n',
        reading: 'laɪəˈbɪlɪti',
        meaningVi: 'trách nhiệm pháp lý',
        example:
          'What is your liability if the order is lost or broken in shipping?',
        exampleVi:
          'Trách nhiệm pháp lý của bạn là gì nếu hàng hóa bị mất hoặc bị vỡ trong quá trình vận chuyển?',
        extensions: [
          {
            meaningVi:
              'liability cũng có nghĩa là “nợ”, thường ở dạng số nhiều.',
          },
          {
            term: 'responsibility - blame - fault',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự chịu trách nhiệm',
          },
          {
            term: 'liable',
            pos: 'adj',
            meaningVi: 'khả năng pháp lý',
          },
          {
            term: 'limited liability',
            meaningVi: 'trách nhiệm hữu hạn',
          },
        ],
      },
      {
        term: 'mandatory',
        pos: 'adj',
        reading: 'ˈmændətərɪ',
        meaningVi: 'có tính bắt buộc',
        example: 'Shipping insurance is mandatory and included in the price.',
        exampleVi:
          'Bảo hiểm vận chuyển bằng tàu là bắt buộc và được bao gồm trong giá cả.',
        extensions: [
          {
            meaningVi: 'khi chỉ “là nghĩa vụ với...”, dùng giới từ for.',
          },
          {
            term: 'compulsory - obligatory',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) bắt buộc, cưỡng chế',
          },
          {
            term: 'voluntary',
            pos: 'adj',
            meaningVi: '(trái nghĩa) tự nguyện',
          },
        ],
      },
      {
        term: 'merchandise',
        pos: 'n',
        reading: 'ˈmɜːtʃəndaɪs',
        meaningVi: 'hàng hoá',
        example: 'When will our merchandise arrive?',
        exampleVi: 'Khi nào hàng hóa của chúng tôi sẽ đến?',
        extensions: [
          {
            meaningVi: 'khi làm động từ, nó có nghĩa là “mua bán, tiêu thụ”.',
          },
          {
            term: 'commodities - goods - products',
            pos: 'n',
            meaningVi: '(đồng nghĩa) hàng hóa',
          },
          {
            term: 'merchant',
            pos: 'n',
            meaningVi: 'thương buôn',
          },
        ],
      },
      {
        term: 'minimize',
        pos: 'v',
        reading: 'ˈmɪnɪmaɪz',
        meaningVi: 'tối thiểu hóa',
        example:
          'Shipping the order out on a Monday will minimize the shipping time.',
        exampleVi:
          'Chở hàng hóa bằng tàu vào thứ Hai sẽ làm ít tốn thời gian chuyên chở bằng tàu nhất.',
        extensions: [
          {
            term: 'maximize',
            pos: 'v',
            meaningVi: '(trái nghĩa) tối đa hóa',
          },
          {
            term: 'minimum',
            pos: 'adj, n',
            meaningVi: 'tối thiểu',
          },
          {
            term: 'minimization',
            pos: 'n',
            meaningVi: 'sự tối thiểu',
          },
        ],
      },
      {
        term: 'reflection',
        pos: 'n',
        reading: 'rɪˈflekʃ(ə)n',
        meaningVi: 'sự phản ảnh',
        example:
          'Satisfied customers are a reflection of how professional a company is.',
        exampleVi:
          'Khách hàng được thỏa mãn là sự phản ảnh một công ty chuyên nghiệp như thế nào.',
        extensions: [
          {
            term: 'reflect',
            pos: 'v',
            meaningVi: 'phản chiếu, phản ánh',
          },
        ],
      },
      {
        term: 'ship',
        pos: 'v',
        reading: 'ʃɪp',
        meaningVi: 'chở bằng tàu',
        example: 'We can ship orders anywhere in the world.',
        exampleVi:
          'Chúng ta có thể chở hàng bằng tàu tới bất cứ nơi đâu trên thế giới.',
        extensions: [
          {
            meaningVi:
              '“vận chuyển hàng” thường dùng dạng câu ship sth out/to/over.',
          },
          {
            term: 'send - transport',
            pos: 'v',
            meaningVi: '(đồng nghĩa) vận chuyển',
          },
          {
            term: 'shipment',
            pos: 'n',
            meaningVi: 'sự chuyển hàng xuống tàu',
          },
          {
            term: 'shipping',
            pos: 'n',
            meaningVi: 'sự chở hàng bằng tàu',
          },
        ],
      },
    ],
  },
  {
    title: '4-4 Invoices',
    description: 'Track 20',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'accurately',
        pos: 'adv',
        reading: 'ˈækjurətli',
        meaningVi: 'một cách chính xác',
        example:
          'Invoices must be written accurately, otherwise we could lose money.',
        exampleVi:
          'Hóa đơn phải được viết một cách chính xác, nếu không chúng ta có thể mất tiền.',
        extensions: [
          {
            term: 'precisely - exactly',
            pos: 'adv',
            meaningVi: '(đồng nghĩa) một cách chính xác',
          },
          {
            term: 'inaccurately',
            pos: 'adv',
            meaningVi: '(trái nghĩa) một cách không chính xác',
          },
          {
            term: 'accurate',
            pos: 'adj',
            meaningVi: 'chính xác',
          },
          {
            term: 'accuracy',
            pos: 'n',
            meaningVi: 'sự chính xác',
          },
        ],
      },
      {
        term: 'adjustment',
        pos: 'n',
        reading: 'əˈdʒʌstmənt',
        meaningVi: 'sự điều chỉnh',
        example:
          'You promised me a discount, so can you make an adjustment on the invoice, please?',
        exampleVi:
          'Bạn hứa đưa tôi một khoản chiết khấu, vì thế bạn có thể vui lòng điều chỉnh trên hóa đơn?',
        extensions: [
          {
            meaningVi:
              'khi thể hiện “sự điều chỉnh nhỏ”, có thể dùng minor/slight adjustment.',
          },
          {
            term: 'modification - amendment',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự điều chỉnh',
          },
          {
            term: 'adjust',
            pos: 'v',
            meaningVi: 'điều chỉnh',
          },
          {
            term: 'adjustable',
            pos: 'adj',
            meaningVi: 'có thể điều chỉnh',
          },
        ],
      },
      {
        term: 'charge',
        pos: 'n',
        reading: 'tʃɑːdʒ',
        meaningVi: 'phí, chi phí',
        example:
          'If this invoice is not paid by the 25th, there will be an additional charge of one percent per day.',
        exampleVi:
          'Nếu hoá đơn này không được trả vào ngày 25 thì mỗi ngày sẽ có thêm khoản phí 1%.',
        extensions: [
          {
            meaningVi:
              'charge cũng có thể là động từ, chỉ “thu phí, tính giá”.',
          },
          {
            term: 'price - cost - fee',
            pos: 'n',
            meaningVi: '(đồng nghĩa) phí, chi phí',
          },
          {
            term: 'free of charge',
            meaningVi: 'miễn phí',
          },
          {
            term: 'carrying charge',
            meaningVi: 'phí khuân vác',
          },
          {
            term: 'service charge',
            meaningVi: 'phí dịch vụ',
          },
        ],
      },
      {
        term: 'compile',
        pos: 'v',
        reading: 'kəmˈpaɪl',
        meaningVi: 'biên soạn, thu thập',
        example:
          "We're just compiling your invoices now, and we will send them to you as soon as we're finished.",
        exampleVi:
          'Bây giờ chúng tôi đang soạn những hóa đơn của bạn và chúng tôi sẽ gửi chúng cho bạn ngay khi chúng tôi hoàn thành.',
        extensions: [
          {
            term: 'collect - gather - accumulate',
            pos: 'v',
            meaningVi: '(đồng nghĩa) thu thập, sưu tầm',
          },
          {
            term: 'compilation',
            pos: 'n',
            meaningVi: 'sự biên soạn, sự thu thập',
          },
          {
            term: 'compiler',
            pos: 'n',
            meaningVi: 'người biên tập, người sưu tầm',
          },
        ],
      },
      {
        term: 'discount',
        pos: 'n',
        reading: 'ˈdɪskaʊnt',
        meaningVi: 'tiền chiết khấu',
        example:
          'If the invoice is paid before the 25th, you will receive a five percent discount.',
        exampleVi:
          'Nếu hoá đơn này được trả trước ngày 25 thì bạn sẽ nhận khoản chiết khấu 5%.',
        extensions: [
          {
            meaningVi:
              'thể hiện “chiết khấu bao nhiêu phần trăm”, có thể dùng “mấy phần trăm + discount” hoặc “discount of mấy phần trăm”.',
          },
          {
            term: 'cash discount',
            meaningVi: 'chiết khấu bằng tiền mặt',
          },
        ],
      },
      {
        term: 'discrepancy',
        pos: 'n',
        reading: 'dɪsˈkrepənsi',
        meaningVi: 'sự khác nhau, sự không nhất quán',
        example:
          'There seems to be a discrepancy on the invoice: yours says fifty dollars, and ours says forty-five.',
        exampleVi:
          'Dường như có sự không nhất quán trong hoá đơn: của bạn là 50 đô la, của chúng tôi là 45 đô la.',
        extensions: [
          {
            term: 'difference - disagreement',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự khác nhau',
          },
          {
            term: 'discrepant',
            pos: 'adj',
            meaningVi: 'khác biệt',
          },
          {
            term: 'discrepantly',
            pos: 'adv',
            meaningVi: 'một cách khác biệt',
          },
        ],
      },
      {
        term: 'efficient',
        pos: 'adj',
        reading: 'ɪˈfɪʃ(ə)nt',
        meaningVi: 'hiệu quả',
        example:
          'It is much more efficient to write out all the invoices at the same time.',
        exampleVi: 'Viết tất cả hóa đơn cùng một lúc thì hiệu quả hơn nhiều.',
        extensions: [
          {
            term: 'effective',
            pos: 'adj',
            meaningVi: '(dễ nhầm) có hiệu quả',
          },
          {
            term: 'inefficient',
            pos: 'adj',
            meaningVi: '(trái nghĩa) không hiệu quả',
          },
          {
            term: 'efficiently',
            pos: 'adv',
            meaningVi: 'một cách có hiệu quả',
          },
          {
            term: 'efficiency',
            pos: 'n',
            meaningVi: 'một cách có hiệu quả',
          },
        ],
      },
      {
        term: 'everyday',
        pos: 'adj',
        reading: 'ˈevrɪdeɪ',
        meaningVi: 'mỗi ngày, thường nhật',
        example: 'Paying invoices is an everyday job in our busy office.',
        exampleVi:
          'Thanh toán những hóa đơn là công việc hằng ngày tại văn phòng bận rộn của chúng ta.',
        extensions: [
          {
            meaningVi:
              'everyday là tính từ, khi viết thành hai chữ, every day thì trở thành phó từ chỉ thời gian, nghĩa “mỗi ngày”.',
          },
          {
            term: 'ordinary - routine - common',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) thường ngày',
          },
          {
            term: 'abnormal - unusual',
            pos: 'adj',
            meaningVi: '(trái nghĩa) thường thường',
          },
        ],
      },
      {
        term: 'function',
        pos: 'n',
        reading: 'ˈfʌŋkʃ(ə)n',
        meaningVi: 'chức năng, vai trò, nhiệm vụ',
        example: 'One of my functions in the office is to prepare invoices.',
        exampleVi:
          'Một trong những nhiệm vụ của tôi tại văn phòng là chuẩn bị hóa đơn.',
        extensions: [
          {
            meaningVi:
              'khi làm động từ, mang nghĩa “có chức năng..., phát huy công dụng”.',
          },
          {
            term: 'job - position - duty',
            pos: 'n',
            meaningVi: '(đồng nghĩa) nhiệm vụ, công việc',
          },
        ],
      },
      {
        term: 'impose',
        pos: 'v',
        reading: 'ɪmˈpəʊz',
        meaningVi: 'đánh thuế, bắt chịu',
        example:
          'As you are paying the invoice late, we have to impose a small fine.',
        exampleVi:
          'Khi bạn thanh toán hoá đơn trễ, chúng tôi buộc bạn chịu một khoản tiền phạt nhỏ.',
        extensions: [
          {
            meaningVi:
              'khi thể hiện “cưỡng bức ai đó chấp nhận vật gì đó”, dùng impose sth on sb.',
          },
          {
            term: 'imposition',
            pos: 'n',
            meaningVi: 'sự đánh thuế, sự bắt chịu',
          },
        ],
      },
      {
        term: 'integral',
        pos: 'adj',
        reading: 'ˈɪntɪgrəl',
        meaningVi: 'toàn bộ, trọn vẹn, không thể thiếu',
        example:
          'Sending out and paying invoices is an integral part of doing business.',
        exampleVi:
          'Gửi và thanh toán hoá đơn là một phần không thể thiếu của việc kinh doanh.',
        extensions: [
          {
            meaningVi: 'khi chỉ “là cần thiết đối với...”, dùng giới từ to.',
          },
          {
            term: 'essential - necessary - required',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) thiết yếu, cần thiết',
          },
          {
            term: 'integrate',
            pos: 'v',
            meaningVi: 'hòa nhập, hợp nhất',
          },
        ],
      },
      {
        term: 'joint',
        pos: 'adj',
        reading: 'dʒɔɪnt',
        meaningVi: 'chung',
        example:
          'We have a joint account, and both our salaries get paid into it.',
        exampleVi:
          'Chúng tôi có một tài khoản chung và lương của cả hai chúng tôi được trả vào đó.',
        extensions: [
          {
            meaningVi: 'khi là danh từ chỉ “chỗ nối, mối nối”.',
          },
          {
            term: 'shared - combined - collective',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) chung, kết hợp',
          },
          {
            term: 'individual - separate',
            pos: 'adj',
            meaningVi: '(trái nghĩa) cá nhân, riêng lẻ',
          },
        ],
      },
      {
        term: 'mistake',
        pos: 'n',
        reading: 'mɪˈsteɪk',
        meaningVi: 'lỗi, chỗ sai',
        example:
          "There's a mistake on this invoice; we have already paid for some of these.",
        exampleVi:
          'Có một lỗi trong hóa đơn này; chúng ta vừa thanh toán một vài trong số này.',
        extensions: [
          {
            meaningVi: 'khi làm động từ, có nghĩa “hiểu lầm, phạm lỗi”.',
          },
          {
            term: 'error - fault',
            pos: 'n',
            meaningVi: '(đồng nghĩa) lỗi, chỗ sai',
          },
        ],
      },
      {
        term: 'run',
        pos: 'v',
        reading: 'rʌn',
        meaningVi: 'chạy, hoạt động, vận hành',
        example:
          'I started out preparing invoices two years ago, and now I run the whole office.',
        exampleVi:
          'Tôi đã bắt đầu chuẩn bị nhiều hóa đơn cách đây hai năm và bây giờ tôi kiểm soát cả văn phòng.',
        extensions: [
          {
            term: 'conduct - administer - control',
            pos: 'v',
            meaningVi: '(đồng nghĩa) kiểm soát, quản lý',
          },
        ],
      },
      {
        term: 'strictly',
        pos: 'adv',
        reading: 'ˈstrɪktli',
        meaningVi: 'chính xác',
        example: 'The lower price is strictly for those invoices paid on time.',
        exampleVi:
          'Giá thấp hơn được dành chính xác cho những hoá đơn thanh toán đúng hạn.',
        extensions: [
          {
            term: 'exactly - precisely',
            pos: 'adv',
            meaningVi: '(đồng nghĩa) chính xác',
          },
          {
            term: 'strict',
            pos: 'adj',
            meaningVi: 'khắc khe, nghiêm khắc',
          },
        ],
      },
      {
        term: 'subtract',
        pos: 'v',
        reading: 'səbˈtrækt',
        meaningVi: 'trừ, giảm',
        example:
          "We didn't receive these, so you need to subtract them from the bill.",
        exampleVi:
          'Chúng tôi không nhận những thứ này, vì thế bạn nên trừ chúng khỏi hóa đơn thanh toán.',
        extensions: [
          {
            term: 'deduct',
            pos: 'v',
            meaningVi: '(đồng nghĩa) giảm',
          },
          {
            term: 'add',
            pos: 'v',
            meaningVi: '(trái nghĩa) thêm vào',
          },
          {
            term: 'subtraction',
            pos: 'n',
            meaningVi: 'sự trừ ra',
          },
          {
            term: 'multiply',
            pos: 'v',
            meaningVi: 'nhân lên',
          },
          {
            term: 'divide',
            pos: 'v',
            meaningVi: 'chia cho',
          },
        ],
      },
      {
        term: 'tedious',
        pos: 'adj',
        reading: 'ˈtiːdɪəs',
        meaningVi: 'chán, tẻ nhạt',
        example: 'Writing invoices can be tedious, but it is very important.',
        exampleVi: 'Viết hóa đơn có thể tẻ nhạt nhưng nó rất quan trọng.',
        extensions: [
          {
            term: 'boring - dull',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) chán',
          },
          {
            term: 'interesting',
            pos: 'adj',
            meaningVi: '(trái nghĩa) hấp dẫn, thú vị',
          },
          {
            term: 'tediously',
            pos: 'adv',
            meaningVi: 'buồn chán, tẻ nhạt',
          },
          {
            term: 'tediousness',
            pos: 'n',
            meaningVi: 'sự buồn chán',
          },
        ],
      },
      {
        term: 'term',
        pos: 'n',
        reading: 'tɜːm',
        meaningVi: 'điều khoản',
        example:
          'According to the terms listed in our invoice, if you cancel, you still have to pay half of the total.',
        exampleVi:
          'Theo những điều khoản được liệt kê trong hoá đơn của chúng tôi, nếu bạn hủy, bạn vẫn phải thanh toán một nửa trong tổng số.',
        extensions: [
          {
            meaningVi:
              'khi chỉ “điều kiện, điều khoản” thường dùng dạng số nhiều.',
          },
          {
            term: 'terms and conditions',
            meaningVi: 'điều khoản và điều kiện',
          },
        ],
      },
    ],
  },
  {
    title: '5-1 Banking',
    description: 'Track 21',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'accept',
        pos: 'v',
        reading: 'əkˈsept',
        meaningVi: 'chấp nhận, đồng ý, nhận',
        example: 'Do you accept American dollars?',
        exampleVi: 'Bạn có nhận đồng đô la Mỹ không?',
        extensions: [
          {
            term: 'take',
            pos: 'v',
            meaningVi: '(đồng nghĩa) nhận, lấy',
          },
          {
            term: 'refuse - reject - decline',
            pos: 'v',
            meaningVi: '(trái nghĩa) từ chối, bác bỏ',
          },
          {
            term: 'acceptable',
            pos: 'adj',
            meaningVi: 'có thể chấp nhận được',
          },
          {
            term: 'acceptance',
            pos: 'n',
            meaningVi: 'sự chấp nhận',
          },
        ],
      },
      {
        term: 'account',
        pos: 'n',
        reading: 'əˈkaʊnt',
        meaningVi: 'tài khoản',
        example:
          'Please include your account number to expedite the transaction.',
        exampleVi:
          'Vui lòng bao gồm số tài khoản của anh để xúc tiến hợp đồng này.',
        extensions: [
          {
            meaningVi:
              'khi account làm động từ, nó có nghĩa “thuyết minh, giải thích”.',
          },
          {
            term: 'bank account',
            meaningVi: 'tài khoản ngân hàng',
          },
          {
            term: 'savings account',
            meaningVi: 'tài khoản tiết kiệm',
          },
        ],
      },
      {
        term: 'activate',
        pos: 'v',
        reading: 'ˈæktiveti',
        meaningVi: 'kích hoạt',
        example:
          "After you have filled in the paperwork, we'll be able to activate your account.",
        exampleVi:
          'Sau khi bạn điền đầy đủ vào giấy tờ, chúng tôi sẽ kích hoạt tài khoản cho bạn.',
        extensions: [
          {
            meaningVi: 'activate còn có thể chỉ “đẩy nhanh phản ứng hóa học”.',
          },
          {
            term: 'activation',
            pos: 'n',
            meaningVi: 'sự kích hoạt',
          },
          {
            term: 'activated',
            pos: 'adj',
            meaningVi: 'được kích hoạt',
          },
        ],
      },
      {
        term: 'balance',
        pos: 'n',
        reading: 'ˈbæləns',
        meaningVi: 'bảng cân đối tài khoản',
        example: 'The balance of your account is $78,000.',
        exampleVi: 'Bảng cân đối tài khoản của bạn là 78.000 đô la.',
        extensions: [
          {
            meaningVi:
              'khi thể hiện “bảng quyết toán” cũng có thể nói bank balance.',
          },
        ],
      },
      {
        term: 'borrow',
        pos: 'v',
        reading: 'ˈbɒrəʊ',
        meaningVi: 'mượn',
        example:
          'You can borrow up to one hundred thousand dollars and pay it back over five years.',
        exampleVi:
          'Bạn có thể mượn đến một trăm ngàn đô la và trả lại trên 5 năm.',
        extensions: [
          {
            meaningVi:
              'khi borrow mang ý “mượn”, thì dùng giới từ from, lend là “cho mượn”, dùng giới từ to.',
          },
          {
            term: 'borrower',
            pos: 'n',
            meaningVi: 'người mượn',
          },
        ],
      },
      {
        term: 'cashier',
        pos: 'n',
        reading: 'kæˈʃiə',
        meaningVi: 'người thu ngân',
        example: 'Ms. Lee works at a bank as a cashier.',
        exampleVi: 'Cô Lee làm thu ngân tại ngân hàng.',
        extensions: [
          {
            meaningVi:
              'cashier cũng có thể xem là động từ có ý chỉ “cách chức, thải ra”.',
          },
        ],
      },
      {
        term: 'convert',
        pos: 'v',
        reading: 'kənˈvɜːt',
        meaningVi: 'đổi, chuyển đổi',
        example: 'Please convert one hundred U.S. dollars into euros.',
        exampleVi: 'Vui lòng đổi 100 đô la Mỹ thành đồng euro.',
        extensions: [
          {
            term: 'convertible',
            pos: 'adj',
            meaningVi: 'có thể chuyển đổi',
          },
          {
            term: 'converter',
            pos: 'n',
            meaningVi: 'lò chuyển, máy đổi điện',
          },
        ],
      },
      {
        term: 'deposit',
        pos: 'n',
        reading: 'dɪˈpɒzɪt',
        meaningVi: 'tiền ký gửi, tiền đặt cọc',
        example:
          'If you want to rent the apartment, you have to pay a two-month deposit.',
        exampleVi: 'Nếu anh muốn thuê căn hộ, anh phải đặt tiền cọc 2 tháng.',
        extensions: [
          {
            meaningVi:
              'khi deposit làm động từ, nó có nghĩa “gửi (tiền, vật), gửi (tiền) ở ngân hàng”.',
          },
          {
            term: 'withdrawal',
            pos: 'n',
            meaningVi: '(trái nghĩa) sự rút tiền',
          },
          {
            term: 'depositor',
            pos: 'n',
            meaningVi: 'người ký gửi',
          },
          {
            term: 'security deposit',
            meaningVi: 'tiền đặt cọc bảo đảm',
          },
        ],
      },
      {
        term: 'down payment',
        pos: 'phrase',
        reading: 'daʊn ˈpeɪmənt',
        meaningVi: 'trả tiền hàng tháng',
        example:
          'We are saving money to make a down payment on the house we want to buy.',
        exampleVi:
          'Chúng tôi đang tiết kiệm tiền để thanh toán tiền hàng tháng cho căn nhà chúng tôi muốn mua.',
      },
      {
        term: 'endorse',
        pos: 'v',
        reading: 'ɪnˈdɔːs',
        meaningVi: 'ký hậu',
        example: 'Can you endorse the back of the check, please?',
        exampleVi: 'Vui lòng ký phía sau tờ sec?',
        extensions: [
          {
            meaningVi:
              'endorse ngoài chỉ “ký đằng sau (séc, hối phiếu”, còn được thể hiện nhiều với ý “làm đại diện (cho sản phẩm nào đó), chứng thực” và “người nổi tiếng chứng thực” tiếng Anh là celebrity endorsement.',
          },
          {
            term: 'endorsement',
            pos: 'n',
            meaningVi: 'sự ký hậu',
          },
        ],
      },
      {
        term: 'exchange',
        pos: 'v',
        reading: 'ɪksˈtʃeɪndʒ',
        meaningVi: 'đổi',
        example: 'Please help me exchange these N.T. dollars for yuan.',
        exampleVi:
          'Vui lòng giúp tôi đổi những đồng đôla Đài Loan này sang đồng nhân dân tệ.',
        extensions: [
          {
            term: 'exchange rate',
            meaningVi: 'tỉ giá hối đoái',
          },
          {
            term: 'foreign exchange',
            meaningVi: 'trao đổi ngoại tệ',
          },
        ],
      },
      {
        term: 'mortgage',
        pos: 'n',
        reading: 'ˈmɔːgɪdʒ',
        meaningVi: 'vật cầm cố, vật thế chấp',
        example: "We've almost finished paying off the mortgage on our house.",
        exampleVi:
          'Chúng tôi hầu như hoàn thành việc thanh toán thế chấp cho căn nhà của chúng tôi.',
        extensions: [
          {
            meaningVi:
              'có thể dùng take out a... mortgage để thể hiện số tiền và kỳ hạn của thế chấp, ví dụ như take out a $50,000 mortgage chỉ “thế chấp 50 ngàn”, take out a ten year mortgage chỉ “thế chấp 10 năm”.',
          },
          {
            term: 'loan',
            pos: 'n',
            meaningVi: '(đồng nghĩa) nợ, khoản vay',
          },
        ],
      },
      {
        term: 'overdraw',
        pos: 'v',
        reading: 'ˌəʊvəˈdrɔː',
        meaningVi: 'rút tiền quá mức',
        example: 'I overdrew my account by five thousand dollars.',
        exampleVi: 'Tôi rút quá 5 ngàn đôla khỏi tài khoản của tôi.',
        extensions: [
          {
            term: 'overdrawn',
            pos: 'adj',
            meaningVi: 'bị rút quá mức',
          },
        ],
      },
      {
        term: 'restricted',
        pos: 'adj',
        reading: 'rɪˈstrɪktɪd',
        meaningVi: 'hạn định, hạn chế',
        example: 'This special account is restricted to local customers.',
        exampleVi:
          'Tài khoản đặc biệt này được hạn định cho những khách hàng địa phương.',
        extensions: [
          {
            meaningVi:
              'khi chỉ “hạn chế ở (người hay vật việc nào đó)” dùng giới từ to.',
          },
          {
            term: 'confined - limited',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) hạn chế, giới hạn',
          },
          {
            term: 'restrict',
            pos: 'v',
            meaningVi: 'hạn chế, giới hạn',
          },
          {
            term: 'restriction',
            pos: 'n',
            meaningVi: 'sự giới hạn',
          },
        ],
      },
      {
        term: 'transaction',
        pos: 'n',
        reading: 'trænˈzækʃən',
        meaningVi: 'hợp đồng, giao dịch',
        example: "I'd like a list of my last ten transactions.",
        exampleVi: 'Tôi muốn một danh sách gồm 10 giao dịch cuối cùng của tôi.',
        extensions: [
          {
            term: 'transact',
            pos: 'v',
            meaningVi: 'làm giao dịch',
          },
        ],
      },
      {
        term: 'typically',
        pos: 'adv',
        reading: 'ˈtɪpɪk(ə)li',
        meaningVi: 'đặc trưng, tiêu biểu, điển hình',
        example:
          'It typically takes two days for the money to reach your account.',
        exampleVi: 'Thường thì phải mất 2 ngày tiền mới đến tài khoản của bạn.',
        extensions: [
          {
            term: 'typical',
            pos: 'adj',
            meaningVi: 'điển hình, tiêu biểu',
          },
        ],
      },
    ],
  },
  {
    title: '5-2 Investments',
    description: 'Track 22',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'accumulate',
        pos: 'v',
        reading: 'əˈkjuːmjʊleɪt',
        meaningVi: 'tích luỹ',
        example: 'She accumulated over a million dollars through investing.',
        exampleVi: 'Cô ấy tích luỹ được trên một triệu đô la từ việc đầu tư.',
        extensions: [
          {
            term: 'amass - gather - collect',
            pos: 'v',
            meaningVi: '(đồng nghĩa) tích lũy, thu thập',
          },
          {
            term: 'accumulation',
            pos: 'n',
            meaningVi: 'sự tích lũy',
          },
        ],
      },
      {
        term: 'aggressively',
        pos: 'adv',
        reading: 'əˈgresɪvli',
        meaningVi: 'xông xáo, mạnh mẽ, dữ dội',
        example: 'I made a lot of money by investing aggressively in stock.',
        exampleVi:
          'Tôi kiếm được nhiều tiền bằng cách đầu tư xông xáo vào cổ phiếu.',
        extensions: [
          {
            term: 'aggressive',
            pos: 'adj',
            meaningVi: 'dữ dội, mạnh mẽ',
          },
          {
            term: 'aggression',
            pos: 'n',
            meaningVi: 'sự dữ dội',
          },
          {
            term: 'passively',
            pos: 'adv',
            meaningVi: '(trái nghĩa) một cách thụ động',
          },
        ],
      },
      {
        term: 'bond',
        pos: 'n',
        reading: 'bɒnd',
        meaningVi: 'trái phiếu',
        example:
          'Savings bonds offer a low-risk return for your investment, but are not as profitable as a good stock.',
        exampleVi:
          'Những trái phiếu tiết kiệm tạo ra lãi với rủi ro thấp hơn cho việc đầu tư của anh, nhưng không nhiều lợi nhuận như cổ phiếu tốt.',
        extensions: [
          {
            meaningVi:
              'khi bond là động từ chỉ “làm cho bó lại, lấy... làm thế chấp”.',
          },
          {
            term: 'Treasury bond',
            meaningVi: 'trái phiếu kho bạc',
          },
        ],
      },
      {
        term: 'cautiously',
        pos: 'adv',
        reading: 'ˈkɔːʃəsli',
        meaningVi: 'cẩn thận, thận trọng',
        example:
          'You should invest more cautiously, or you could lose a lot of money.',
        exampleVi:
          'Bạn nên đầu tư một cách thận trọng nếu không bạn sẽ mất nhiều tiền.',
        extensions: [
          {
            term: 'carefully',
            pos: 'adv',
            meaningVi: '(đồng nghĩa) một cách cẩn thận',
          },
          {
            term: 'cautious',
            pos: 'adj',
            meaningVi: 'thận trọng',
          },
          {
            term: 'caution',
            pos: 'n',
            meaningVi: 'sự lưu ý',
          },
          {
            term: 'cautiousness',
            pos: 'n',
            meaningVi: 'sự thận trọng',
          },
        ],
      },
      {
        term: 'commit',
        pos: 'v',
        reading: 'kəˈmɪt',
        meaningVi: 'giam giữ',
        example:
          'With this kind of investment, you must commit your money for at least five years.',
        exampleVi:
          'Với kiểu đầu tư này, bạn phải giam tiền của bạn ít nhất 5 năm.',
        extensions: [
          {
            meaningVi:
              'dạng câu thể hiện “dùng thời gian, tiền bạc... vào việc nào đó” là commit sth to sth.',
          },
          {
            term: 'commitment',
            pos: 'n',
            meaningVi: 'sự giam giữ',
          },
        ],
      },
      {
        term: 'conservative',
        pos: 'adj',
        reading: 'kənˈsɜːvətɪv',
        meaningVi: 'ước chừng, khoảng chừng',
        example:
          "I should make about ten thousand dollars, and that's a conservative estimate.",
        exampleVi:
          'Tôi sẽ kiếm được 10 ngàn đô la, và đó là một dự đoán ước chừng.',
        extensions: [
          {
            term: 'conservatively',
            pos: 'adv',
            meaningVi: 'một cách ước chừng',
          },
          {
            term: 'conservation',
            pos: 'n',
            meaningVi: 'sự ước chừng, chừng mực',
          },
        ],
      },
      {
        term: 'currency',
        pos: 'n',
        reading: 'ˈkʌrənsi',
        meaningVi: 'giá trị tiền tệ',
        example: 'Where can I change foreign currency?',
        exampleVi: 'Tôi có thể đổi ngoại tệ ở đâu?',
        extensions: [
          {
            term: 'foreign currency',
            meaningVi: 'ngoại tệ',
          },
          {
            term: 'hard currency',
            meaningVi: 'tiền mặt',
          },
        ],
      },
      {
        term: 'depression',
        pos: 'n',
        reading: 'dɪˈpreʃ(ə)n',
        meaningVi: 'sự suy thoái',
        example: 'The stock market crash meant the coming of a depression.',
        exampleVi:
          'Sự sụp đổ của thị trường chứng khoán có nghĩa là sự suy thoái sắp xảy ra.',
        extensions: [
          {
            meaningVi:
              'depression cũng có thể chỉ “sự buồn rầu, sự suy nhược”.',
          },
          {
            term: 'recession - slump',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự suy thoái',
          },
          {
            term: 'depressing',
            pos: 'adj',
            meaningVi: 'có khuynh hướng suy thoái',
          },
          {
            term: 'depress',
            pos: 'v',
            meaningVi: 'làm cho suy sụp',
          },
        ],
      },
      {
        term: 'desire',
        pos: 'n',
        reading: 'dɪˈzaɪə',
        meaningVi: 'ước muốn, mong ước',
        example:
          "I have no desire to invest my money; I'd rather keep it in the bank.",
        exampleVi:
          'Tôi không có ước muốn đầu tư tiền của tôi; tôi thích gửi nó trong ngân hàng hơn.',
        extensions: [
          {
            meaningVi: 'theo sau desire là to V, for N hoặc mệnh đề that.',
          },
          {
            term: 'craving - longing - appetite',
            pos: 'n',
            meaningVi: '(đồng nghĩa) mong muốn, mong ước',
          },
        ],
      },
      {
        term: 'dividend',
        pos: 'n',
        reading: 'ˈdɪvɪdend',
        meaningVi: 'cổ tức',
        example:
          'Are the dividends for this investment paid twice or four times a year?',
        exampleVi:
          'Có phải cổ tức cho đầu tư này được trả 2 hoặc 4 lần trong một năm không?',
        extensions: [
          {
            term: 'bonus',
            pos: 'n',
            meaningVi: '(đồng nghĩa) tiền hoa hồng',
          },
        ],
      },
      {
        term: 'fund',
        pos: 'n',
        reading: 'fʌnd',
        meaningVi: 'quỹ, tiền vốn',
        example: 'I have most of my money invested in a special fund.',
        exampleVi: 'Hầu hết tiền của tôi được đầu tư vào một quỹ đặc biệt.',
        extensions: [
          {
            meaningVi: 'khi làm động từ nó có nghĩa “cung cấp nguồn quỹ...”.',
          },
          {
            term: 'pension fund',
            meaningVi: 'quỹ hưu trí',
          },
          {
            term: 'trust fund',
            meaningVi: 'quỹ tín thác',
          },
          {
            term: 'fund-raising',
            pos: 'n',
            meaningVi: 'quỹ quyên góp',
          },
        ],
      },
      {
        term: 'invest',
        pos: 'v',
        reading: 'ɪnˈvest',
        meaningVi: 'đầu tư',
        example:
          'You should only invest as much money as you can afford to lose.',
        exampleVi:
          'Bạn chỉ nên đầu tư nhiều tiền khi bạn có đủ khả năng thua lỗ.',
        extensions: [
          {
            meaningVi: 'cách dùng là invest in sth.',
          },
          {
            term: 'investment',
            pos: 'n',
            meaningVi: 'sự đầu tư',
          },
          {
            term: 'investor',
            pos: 'n',
            meaningVi: 'nhà đầu tư',
          },
        ],
      },
      {
        term: 'long-term',
        pos: 'adj',
        reading: 'ˈlɒŋˈtɜːm',
        meaningVi: 'dài hạn',
        example:
          "This is a long-term investment, so make sure you won't need the money within the next ten years.",
        exampleVi:
          'Đây là một khoản đầu tư dài hạn, vì thế hãy chắc chắn rằng bạn không cần tiền trong vòng 10 năm tới.',
        extensions: [
          {
            term: 'short-term',
            pos: 'adj',
            meaningVi: '(trái nghĩa) ngắn hạn',
          },
        ],
      },
      {
        term: 'portfolio',
        pos: 'n',
        reading: 'pɔːtˈfəʊlɪəʊ',
        meaningVi: 'danh mục vốn đầu tư',
        example:
          'I only have four investments in my portfolio. How many do you have?',
        exampleVi:
          'Tôi chỉ có bốn khoản đầu tư trong danh mục vốn đầu tư của tôi. Anh có mấy khoản?',
        extensions: [
          {
            meaningVi:
              'portfolio cũng mang nghĩa “tuyển tập tác phẩm”, như a portfolio of work.',
          },
        ],
      },
      {
        term: 'profitably',
        pos: 'adv',
        reading: 'ˈprɒfɪtəb(ə)li',
        meaningVi: 'có lời',
        example:
          "It isn't easy to invest profitably; many people don't make money at all.",
        exampleVi:
          'Thật không dễ để đầu tư có lời; nhiều người không kiếm được tiền gì cả.',
        extensions: [
          {
            term: 'profit',
            pos: 'n',
            meaningVi: 'lợi nhuận, khoản lời',
          },
          {
            term: 'profitable',
            pos: 'adj',
            meaningVi: 'có thể có lời',
          },
        ],
      },
      {
        term: 'realistic',
        pos: 'adj',
        reading: 'ˌrɪəˈlɪstɪk',
        meaningVi: 'thực tế, hiện thực',
        example:
          'If you think that investing can make you rich quickly, you are not being realistic.',
        exampleVi:
          'Nếu bạn nghĩ việc đầu tư có thể làm bạn giàu có nhanh chóng thì bạn không thực tế rồi.',
        extensions: [
          {
            term: 'practical - down-to-earth',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) thực tế',
          },
          {
            term: 'unrealistic',
            pos: 'adj',
            meaningVi: '(trái nghĩa) phi thực tế',
          },
          {
            term: 'reality',
            pos: 'n',
            meaningVi: 'bản chất thực, hiện thực',
          },
          {
            term: 'realism',
            pos: 'n',
            meaningVi: 'chủ nghĩa hiện thực',
          },
        ],
      },
      {
        term: 'return',
        pos: 'n',
        reading: 'rɪˈtɜːn',
        meaningVi: 'tiền lời, tiền lãi',
        example: 'I got a really good return on my investment.',
        exampleVi: 'Tôi có một khoản tiền lãi khá nhiều cho đầu tư của tôi.',
        extensions: [
          {
            meaningVi: 'chỉ “có được lợi nhuận từ...”, dùng giới từ on.',
          },
          {
            term: 'profit - earnings - gain',
            pos: 'n',
            meaningVi: '(đồng nghĩa) tiền lời, lợi nhuận',
          },
        ],
      },
      {
        term: 'target',
        pos: 'n',
        reading: 'ˈtɑːgɪt',
        meaningVi: 'mục tiêu',
        example: 'My target is to make a million dollars over thirty years.',
        exampleVi:
          'Mục tiêu của tôi là kiếm một triệu đô la trong khoảng hơn 30 năm.',
        extensions: [
          {
            meaningVi: 'target cũng làm động từ, chỉ “lấy... làm mục tiêu”.',
          },
          {
            term: 'goal - aim - purpose',
            pos: 'n',
            meaningVi: '(đồng nghĩa) mục tiêu',
          },
        ],
      },
      {
        term: 'wisely',
        pos: 'adv',
        reading: 'ˈwaɪzli',
        meaningVi: 'một cách khôn ngoan',
        example: "If you invest wisely, you won't lose money.",
        exampleVi:
          'Nếu bạn đầu tư một cách khôn ngoan thì bạn sẽ không mất tiền.',
        extensions: [
          {
            term: 'wise',
            pos: 'adj',
            meaningVi: 'khôn ngoan',
          },
          {
            term: 'wisdom',
            pos: 'n',
            meaningVi: 'sự khôn ngoan',
          },
        ],
      },
      {
        term: 'yield',
        pos: 'v',
        reading: 'jiːld',
        meaningVi: 'sản xuất, sinh lợi, mang lại',
        example: 'The investment yielded a profit of two thousand dollars.',
        exampleVi: 'Đầu tư này sản sinh 2.000 đô la tiền lời.',
        extensions: [
          {
            meaningVi: 'khi là danh từ, chỉ “sản lượng, lợi nhuận”.',
          },
          {
            term: 'produce',
            pos: 'v',
            meaningVi: '(đồng nghĩa) sản xuất',
          },
          {
            term: 'high-yielding',
            pos: 'adj',
            meaningVi: 'có lời cao',
          },
          {
            term: 'low-yielding',
            pos: 'adj',
            meaningVi: 'có lời thấp',
          },
        ],
      },
    ],
  },
  {
    title: '5-3 Taxes',
    description: 'Track 23',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'calculation',
        pos: 'n',
        reading: 'kælkjuˈleiʃən',
        meaningVi: 'sự tính toán',
        example:
          'According to my calculations, you owe just under eighteen thousand dollars in taxes.',
        exampleVi:
          'Theo sự tính toán của tôi, bạn nợ chỉ dưới 18.000 đô la tiền thuế.',
        extensions: [
          {
            term: 'calculate',
            pos: 'v',
            meaningVi: 'tính toán',
          },
          {
            term: 'calculator',
            pos: 'n',
            meaningVi: 'máy tính',
          },
          {
            term: 'calculus',
            pos: 'n',
            meaningVi: 'phép tính',
          },
        ],
      },
      {
        term: 'contribution',
        pos: 'n',
        reading: 'ˌkɒntrɪˈbjuːʃən',
        meaningVi: 'sự đóng góp',
        example: "He doesn't make much of a contribution to his team.",
        exampleVi: 'Anh ấy không đóng góp nhiều cho đội của anh ấy.',
        extensions: [
          {
            term: 'contribute',
            pos: 'v',
            meaningVi: 'đóng góp',
          },
          {
            term: 'contributor',
            pos: 'n',
            meaningVi: 'người đóng góp',
          },
        ],
      },
      {
        term: 'deadline',
        pos: 'n',
        reading: 'ˈdedlaɪn',
        meaningVi: 'hạn chót',
        example: 'The deadline for doing your taxes is the end of May.',
        exampleVi: 'Hạn chót để bạn đóng thuế là cuối tháng Năm.',
        extensions: [
          {
            meaningVi: 'thể hiện “hạn chót của việc nào đó”, dùng giới từ for.',
          },
        ],
      },
      {
        term: 'file',
        pos: 'v',
        reading: 'faɪl',
        meaningVi: 'đệ trình, nộp',
        example: 'Have you filed your taxes for last year?',
        exampleVi: 'Năm ngoái bạn có nộp thuế chưa?',
        extensions: [
          {
            meaningVi: 'có thể làm danh từ, chỉ “văn kiện, hồ sơ, tài liệu”.',
          },
        ],
      },
      {
        term: 'overall',
        pos: 'adv',
        reading: 'ˌəʊvəˈrɔːl',
        meaningVi: 'tất cả, tổng quát, nhìn chung',
        example: 'You owe eleven thousand dollars overall.',
        exampleVi: 'Bạn nợ tất cả 11.000 đô la.',
        extensions: [
          {
            meaningVi: 'có thể làm tính từ, chỉ “toàn bộ”.',
          },
          {
            term: 'generally',
            pos: 'adv',
            meaningVi: '(đồng nghĩa) nhìn chung',
          },
        ],
      },
      {
        term: 'refund',
        pos: 'n',
        reading: 'ˌrɪˈfʌnd',
        meaningVi: 'sự trả lại, số tiền trả lại',
        example: 'I got a really big tax refund last year.',
        exampleVi: 'Năm ngoái tôi có một khoản tiền hoàn thuế rất lớn.',
        extensions: [
          {
            meaningVi:
              'khi làm động từ chỉ “hoàn trả (tiền)”, phát âm [rɪˈfʌnd], ý gần với reimburse.',
          },
          {
            term: 'tax refund',
            meaningVi: 'tiền hoàn thuế',
          },
          {
            term: 'full refund',
            meaningVi: 'tiền hoàn trả đủ',
          },
          {
            term: 'nonrefundable',
            pos: 'adj',
            meaningVi: 'không thể hoàn trả lại',
          },
        ],
      },
      {
        term: 'spouse',
        pos: 'n',
        reading: 'spaʊs',
        meaningVi: 'vợ (chồng)',
        example: 'Both you and your spouse had to sign the loan agreement.',
        exampleVi: 'Cả bạn và vợ (chồng) bạn phải ký vào hợp đồng vay này.',
        extensions: [
          {
            term: 'spousal',
            pos: 'adj',
            meaningVi: 'thuộc về vợ (chồng)',
          },
        ],
      },
      {
        term: 'withhold',
        pos: 'v',
        reading: 'wɪðˈhəʊld',
        meaningVi: 'giữ lại, cầm lại',
        example:
          "About two hundred dollars is withheld from Anna's paycheck each month.",
        exampleVi:
          'Khoảng 200 đô la được giữ lại từ sec phải thanh toán của Anna mỗi tháng.',
        extensions: [
          {
            term: 'withholding tax',
            meaningVi: 'thuế giữ lại',
          },
        ],
      },
    ],
  },
  {
    title: '5-4 Accounting',
    description: 'Track 24',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'accounting',
        pos: 'n',
        reading: 'əˈkaʊntɪŋ',
        meaningVi: 'khoa kế toán, môn kế toán',
        example:
          "The accounting department provides a company's financial information.",
        exampleVi: 'Ban kế toán cung cấp thông tin tài chính của công ty.',
        extensions: [
          {
            meaningVi: 'tiếng Anh của người Anh dùng accountancy.',
          },
          {
            term: 'account',
            pos: 'n',
            meaningVi: 'tài khoản',
          },
          {
            term: 'accountant',
            pos: 'n',
            meaningVi: 'kế toán viên',
          },
          {
            term: 'accounting/fiscal year',
            meaningVi: 'năm tài khóa',
          },
        ],
      },
      {
        term: 'asset',
        pos: 'n',
        reading: 'ˈæset',
        meaningVi: 'tài sản',
        example:
          'The company has many assets that it could sell to raise money.',
        exampleVi: 'Công ty có nhiều tài sản có thể bán để thu tiền.',
        extensions: [
          {
            term: 'capital assets',
            meaningVi: 'tài sản vốn',
          },
          {
            term: 'liquid assets',
            meaningVi: 'tài sản dễ bán',
          },
        ],
      },
      {
        term: 'audit',
        pos: 'v',
        reading: 'ˈɔːdɪt',
        meaningVi: 'kiểm toán',
        example:
          "We have finished auditing the company's accounts, and everything seems to be correct.",
        exampleVi:
          'Chúng tôi vừa hoàn thành việc kiểm toán tài khoản của công ty và mọi thứ đều đúng.',
        extensions: [
          {
            meaningVi: 'cũng có thể làm danh từ.',
          },
          {
            term: 'auditor',
            pos: 'n',
            meaningVi: 'kiểm toán viên',
          },
        ],
      },
      {
        term: 'budget',
        pos: 'v',
        reading: 'ˈbʌdʒɪt',
        meaningVi: 'dự thảo ngân sách',
        example:
          'It is important to budget for the year so that we will have enough money.',
        exampleVi:
          'Điều quan trọng là phải dự thảo ngân sách của năm để chúng ta sẽ có đủ tiền.',
        extensions: [
          {
            meaningVi:
              'chỉ “dự thảo ngân sách cho...”, dùng giới từ for. Khi làm danh từ, budget chỉ “dự tính”, khi là tính từ chỉ “rẻ”.',
          },
        ],
      },
      {
        term: 'calculate',
        pos: 'v',
        reading: 'ˈkælkjuleɪt',
        meaningVi: 'tính toán',
        example: 'Can you calculate how much the decoration will cost?',
        exampleVi:
          'Bạn có thể tính toán xem trang trí tốn bao nhiêu tiền được không?',
        extensions: [
          {
            term: 'estimate - figure - assess',
            pos: 'v',
            meaningVi: '(đồng nghĩa) tính, ước tính',
          },
          {
            term: 'calculation',
            pos: 'n',
            meaningVi: 'sự tính toán',
          },
          {
            term: 'calculator',
            pos: 'n',
            meaningVi: 'máy tính',
          },
        ],
      },
      {
        term: 'capital',
        pos: 'n',
        reading: 'ˈkæpɪt(ə)l',
        meaningVi: 'vốn, số tiền đầu tư',
        example:
          "Without capital, you won't be able to get your business started.",
        exampleVi: 'Không có vốn, bạn sẽ không thể bắt đầu kinh doanh.',
        extensions: [
          {
            meaningVi:
              'capital cũng có thể làm tính từ, chỉ “thuộc về vốn, viết hoa, quan trọng”.',
          },
          {
            term: 'Capital account',
            meaningVi: 'tài khoản vốn',
          },
          {
            term: 'capital investment',
            meaningVi: 'sự đầu tư vốn',
          },
        ],
      },
      {
        term: 'client',
        pos: 'n',
        reading: 'ˈklaɪənt',
        meaningVi: 'khách hàng',
        example:
          'Most of our clients are happy to pay for our services because we help them save money.',
        exampleVi:
          'Hầu hết khách hàng của chúng tôi vui vẻ trả cho dịch vụ của chúng tôi bởi vì chúng tôi giúp họ tiết kiệm tiền.',
        extensions: [
          {
            term: 'customer',
            pos: 'n',
            meaningVi: '(đồng nghĩa) khách hàng',
          },
        ],
      },
      {
        term: 'commission',
        pos: 'n',
        reading: 'kəˈmɪʃ(ə)n',
        meaningVi: 'tiền hoa hồng',
        example:
          "One of the advantages of investing online is that you don't need to pay commission to a broker.",
        exampleVi:
          'Một trong những thuận lợi của đầu tư trực tuyến là bạn không cần trả tiền hoa hồng cho nhà môi giới.',
        extensions: [
          {
            meaningVi:
              'commission cũng có thể làm động từ, chỉ “ủy nhiệm, ủy thác”.',
          },
        ],
      },
      {
        term: 'debt',
        pos: 'n',
        reading: 'det',
        meaningVi: 'nợ, món nợ',
        example: "I have paid off all my debts; I don't owe money to anybody.",
        exampleVi:
          'Tôi vừa trả hết các khoản nợ của tôi; tôi không còn nợ tiền ai nữa.',
        extensions: [
          {
            term: 'debtor',
            pos: 'n',
            meaningVi: 'con nợ (creditor n. chủ nợ)',
          },
          {
            term: 'debt collector',
            meaningVi: 'người thu nợ',
          },
          {
            term: 'debt-ridden',
            pos: 'adj',
            meaningVi: 'nợ chồng chất',
          },
        ],
      },
      {
        term: 'expenditure',
        pos: 'n',
        reading: 'ɪkˈspendɪtʃə',
        meaningVi: 'chi tiêu',
        example: 'Government expenditure must be kept under strict control.',
        exampleVi:
          'Chi tiêu của chính phủ phải được giữ trong tầm kiểm soát nghiêm ngặt.',
        extensions: [
          {
            term: 'costs - expenses',
            pos: 'n',
            meaningVi: '(đồng nghĩa) chi tiêu',
          },
          {
            term: 'expend',
            pos: 'v',
            meaningVi: 'tiêu xài',
          },
        ],
      },
      {
        term: 'forecast',
        pos: 'n',
        reading: 'ˈfɔːkɑːst',
        meaningVi: 'dự báo, dự đoán',
        example:
          'According to our forecast, the company should be making a profit by next January.',
        exampleVi:
          'Theo dự đoán của chúng tôi, công ty sẽ thu được lợi nhuận vào tháng Giêng tới.',
        extensions: [
          {
            meaningVi: 'cũng có thể làm động từ.',
          },
          {
            term: 'prediction',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự dự đoán',
          },
          {
            term: 'forecaster',
            pos: 'n',
            meaningVi: 'người dự đoán, dự báo',
          },
          {
            term: 'weather forecaster',
            meaningVi: 'nhà dự báo thời tiết',
          },
          {
            term: 'economic forecaster',
            meaningVi: 'nhà dự báo kinh tế',
          },
        ],
      },
      {
        term: 'outstanding',
        pos: 'adj',
        reading: 'aʊtˈstændɪŋ',
        meaningVi: 'chưa thanh toán',
        example:
          'We still have two bills outstanding, but I can pay them this week.',
        exampleVi:
          'Chúng tôi vẫn còn hai hóa đơn chưa thanh toán nhưng tôi có thể thanh toán chúng vào tuần này.',
        extensions: [
          {
            meaningVi: 'outstanding cũng có ý “kiệt xuất, ưu tú”.',
          },
          {
            term: 'unpaid - owing - payable',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) chưa thanh toán',
          },
        ],
      },
      {
        term: 'project',
        pos: 'v',
        reading: 'prəˈdʒekt',
        meaningVi: 'hoạch định, dự đoán',
        example:
          'Our income is projected to rise by eight percent over the year.',
        exampleVi: 'Thu nhập của chúng ta được dự đoán tăng 8% một năm.',
        extensions: [
          {
            meaningVi:
              'thường dùng be projected to V để thể hiện “dự đoán tương lai sẽ...”.',
          },
          {
            term: 'calculate - predict',
            pos: 'v',
            meaningVi: '(đồng nghĩa) dự đoán',
          },
          {
            term: 'projection',
            pos: 'n',
            meaningVi: 'sự hoạch định, sự dự đoán',
          },
        ],
      },
      {
        term: 'reconcile',
        pos: 'v',
        reading: 'ˈrekənsaɪl',
        meaningVi: 'làm cho tương thích, điều hòa',
        example:
          'The auditor tried to reconcile his expenses with his stated income.',
        exampleVi:
          'Kiểm toán viên cố gắng điều hòa chi tiêu với khoản thu nhập cố định của anh ấy.',
        extensions: [
          {
            meaningVi: 'còn có nghĩa “hòa giải, dàn xếp”.',
          },
        ],
      },
      {
        term: 'revenue',
        pos: 'n',
        reading: 'ˈrevəˌnjuː',
        meaningVi: 'thu nhập',
        example: "The company's revenues fell last year.",
        exampleVi: 'Năm ngoái thu nhập của công ty giảm.',
        extensions: [
          {
            term: 'revenue stamp',
            meaningVi: 'phiếu thu nhập',
          },
          {
            term: 'revenue tariff/tax',
            meaningVi: 'thuế thu nhập',
          },
        ],
      },
      {
        term: 'surplus',
        pos: 'n',
        reading: 'ˈsɜːpləs',
        meaningVi: 'thặng dư',
        example: 'The country has a trade surplus of one billion dollars.',
        exampleVi: 'Quốc gia này có một tỷ đô la thặng dư thương mại.',
        extensions: [
          {
            meaningVi: 'surplus cũng là tính từ, chỉ “dư thừa”.',
          },
          {
            term: 'excess',
            pos: 'n',
            meaningVi: '(đồng nghĩa) thặng dư',
          },
          {
            term: 'deficit',
            pos: 'n',
            meaningVi: '(trái nghĩa) số tiền thiếu hụt',
          },
          {
            term: 'trade surplus',
            meaningVi: 'thặng dư thương mại',
          },
        ],
      },
      {
        term: 'turnover',
        pos: 'n',
        reading: 'ˈtɜːnˌəʊvə',
        meaningVi: 'doanh số, doanh thu, tốc độ thay thế công nhân',
        example: 'Retail companies have a high turnover rate for employees.',
        exampleVi:
          'Những công ty bán lẻ có tốc độ thay thế công nhân viên cao.',
        extensions: [
          {
            term: 'employee/staff turnover',
            meaningVi: 'tốc độ thay thế công nhân',
          },
        ],
      },
      {
        term: 'voucher',
        pos: 'n',
        reading: 'ˈvaʊtʃə',
        meaningVi: 'biên lai',
        example: 'The voucher is valid until April 30th.',
        exampleVi: 'Biên lai này có hiệu lực cho đến ngày 30 tháng 4.',
        extensions: [
          {
            term: 'receipt',
            pos: 'n',
            meaningVi: '(đồng nghĩa) biên lai',
          },
          {
            term: 'gift voucher',
            meaningVi: 'phiếu quà tặng',
          },
        ],
      },
    ],
  },
  {
    title: '5-5 Billing',
    description: 'Track 25',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'coupon',
        pos: 'n',
        reading: 'ˈkuːpɒn',
        meaningVi: 'vé, phiếu mua hàng, phiếu dự thưởng',
        example: 'My sister collects a lot of coupons from the newspaper.',
        exampleVi: 'Chị tôi thu nhiều phiếu dự thưởng từ báo.',
        extensions: [
          {
            term: 'discount coupon',
            meaningVi: 'phiếu mua hàng giảm giá',
          },
        ],
      },
      {
        term: 'customs',
        pos: 'n',
        reading: 'ˈkʌstəmz',
        meaningVi: 'hải quan',
        example: 'How long does it take to go through customs?',
        exampleVi: 'Đi qua hải quan mất bao lâu?',
        extensions: [
          {
            meaningVi:
              'Khi chỉ hải quan, customs phải ở hình thức số nhiều, khi là số ít thì chỉ “thói quen”.',
          },
          {
            term: 'customs officer',
            meaningVi: 'nhân viên hải quan',
          },
          {
            term: 'customs duty',
            meaningVi: 'nhiệm vụ hải quan',
          },
        ],
      },
      {
        term: 'deduct',
        pos: 'v',
        reading: 'dɪˈdʌkt',
        meaningVi: 'khấu trừ, làm giảm',
        example: 'We can deduct the late fee if you pay the bill by the 9th.',
        exampleVi:
          'Chúng tôi có thể khấu trừ phí trễ nếu bạn thanh toán hoá đơn vào ngày 9.',
        extensions: [
          {
            term: 'deduction',
            pos: 'n',
            meaningVi: 'sự khấu trừ',
          },
          {
            term: 'tax-deductible',
            pos: 'adj',
            meaningVi: 'có thể khấu trừ thuế',
          },
        ],
      },
      {
        term: 'detail',
        pos: 'n',
        reading: 'ˈdiːteɪl',
        meaningVi: 'chi tiết',
        example:
          'Check the details on the bill to make sure that everything is correct.',
        exampleVi:
          'Kiểm tra những chi tiết trên hóa đơn để chắc chắn rằng mọi thứ đều đúng.',
        extensions: [
          {
            meaningVi:
              'detail còn làm động từ, chỉ “thuyết minh chi tiết, kể tường tận”.',
          },
          {
            term: 'detailed',
            pos: 'adj',
            meaningVi: 'tỉ mỉ',
          },
        ],
      },
      {
        term: 'owe',
        pos: 'v',
        reading: 'əʊ',
        meaningVi: 'mắc nợ',
        example: 'You currently owe two thousand dollars.',
        exampleVi: 'Hiện tại bạn nợ 2.000 đô la.',
        extensions: [
          {
            meaningVi: 'cách dùng owe sb money hoặc owe sb for sth.',
          },
          {
            term: 'owing',
            pos: 'adj',
            meaningVi: 'đang thiếu nợ',
          },
        ],
      },
      {
        term: 'penalty',
        pos: 'n',
        reading: 'ˈpenəlti',
        meaningVi: 'phạt đền, tiền phạt',
        example:
          'There will be a five percent penalty for any bills paid more than thirty days late.',
        exampleVi:
          'Sẽ có khoản tiền phạt 5% đối với những hoá đơn thanh toán trễ hơn 30 ngày.',
        extensions: [
          {
            meaningVi:
              'để chỉ “hình phạt, trừng phạt vì...”, dùng giới từ for.',
          },
          {
            term: 'punishment - fine',
            pos: 'n',
            meaningVi: '(đồng nghĩa) tiền phạt',
          },
          {
            term: 'penalize',
            pos: 'v',
            meaningVi: 'trừng phạt',
          },
        ],
      },
      {
        term: 'reimburse',
        pos: 'v',
        reading: 'ˌriːɪmˈbɜːs',
        meaningVi: 'hoàn trả, trả lại',
        example: 'I will reimburse the cost to you.',
        exampleVi: 'Tôi sẽ trả lại chi phí cho bạn.',
        extensions: [
          {
            meaningVi: 'dạng câu thường dùng reimburse sb for sth.',
          },
          {
            term: 'repay - pay back',
            meaningVi: '(đồng nghĩa) trả lại',
          },
          {
            term: 'reimbursement',
            pos: 'n',
            meaningVi: 'sự hoàn trả',
          },
        ],
      },
    ],
  },
  {
    title: '6-1 Assembly Lines',
    description: 'Track 26',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'adjacent',
        pos: 'adj',
        reading: 'əˈdʒeɪ(ə)nt',
        meaningVi: 'gần, bên cạnh',
        example:
          'The research department is adjacent to the design department.',
        exampleVi: 'Phòng nghiên cứu bên cạnh phòng thiết kế.',
        extensions: [
          {
            term: 'next to - beside',
            meaningVi: '(đồng nghĩa) bên cạnh',
          },
        ],
      },
      {
        term: 'conform',
        pos: 'v',
        reading: 'kənˈfɔːm',
        meaningVi: 'tuân theo, tuân thủ',
        example: 'The finished product must conform to industry standards.',
        exampleVi:
          'Sản phẩm được hoàn thành phải tuân thủ những tiêu chuẩn công nghiệp.',
        extensions: [
          {
            meaningVi:
              'khi conform đứng riêng lẻ, chỉ “hành động theo qui phạm của xã hội”. Khi chỉ “phù hợp (pháp luật, qui định)”, cần thêm giới từ to hoặc with.',
          },
          {
            term: 'obey - follow - observe',
            pos: 'v',
            meaningVi: '(đồng nghĩa) tuân theo',
          },
          {
            term: 'disobey',
            pos: 'v',
            meaningVi: '(trái nghĩa) không tuân theo',
          },
        ],
      },
      {
        term: 'decade',
        pos: 'n',
        reading: 'ˈdeˌkeɪd',
        meaningVi: 'thập niên',
        example:
          'We have been running this assembly line for almost a decade now.',
        exampleVi:
          'Chúng tôi vận hành dây chuyền sản xuất này cho tới bây giờ được gần một thập niên.',
        extensions: [
          {
            term: 'century',
            pos: 'n',
            meaningVi: 'thế kỷ',
          },
          {
            term: 'millennium',
            pos: 'n',
            meaningVi: 'thiên niên kỷ',
          },
        ],
      },
      {
        term: 'examine',
        pos: 'v',
        reading: 'ɪɡˈzæmɪn',
        meaningVi: 'kiểm tra',
        example:
          'We examine the parts to make sure that they have been made well.',
        exampleVi:
          'Chúng tôi kiểm tra những bộ phận này để đảm bảo rằng chúng được làm tốt.',
        extensions: [
          {
            term: 'inspect - check over - scrutinize',
            meaningVi: '(đồng nghĩa) kiểm tra',
          },
          {
            term: 'examination',
            pos: 'n',
            meaningVi: 'sự kiểm tra, cuộc điều tra',
          },
          {
            term: 'examiner',
            pos: 'n',
            meaningVi: 'người kiểm tra',
          },
          {
            term: 'examinee',
            pos: 'n',
            meaningVi: 'người được kiểm tra',
          },
        ],
      },
      {
        term: 'lease',
        pos: 'v',
        reading: 'liːs',
        meaningVi: 'cho thuê',
        example: "We don't own the building; we lease it.",
        exampleVi:
          'Chúng tôi không phải chủ của tòa nhà này; chúng tôi thuê nó.',
        extensions: [
          {
            meaningVi:
              'khi làm danh từ nó có nghĩa là “hợp đồng thuê, mướn nhà”.',
          },
          {
            term: 'rent',
            pos: 'v',
            meaningVi: '(đồng nghĩa) cho thuê',
          },
        ],
      },
      {
        term: 'logical',
        pos: 'adj',
        reading: 'ˈlɒdʒɪk(ə)l',
        meaningVi: 'lô gíc, hợp lý',
        example:
          'It is logical to have the packing at the end of the assembly line, not the beginning.',
        exampleVi:
          'Đó là hợp lý khi đóng gói ở giai đoạn cuối của dây chuyền sản xuất, không phải giai đoạn đầu.',
        extensions: [
          {
            term: 'rational - reasonable - sensible',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) hợp lý, có lý',
          },
          {
            term: 'illogical - unreasonable',
            pos: 'adj',
            meaningVi: '(trái nghĩa) vô lý',
          },
          {
            term: 'logic',
            pos: 'n',
            meaningVi: 'sự hợp lý',
          },
          {
            term: 'logically',
            pos: 'adv',
            meaningVi: 'một cách hợp lý',
          },
        ],
      },
      {
        term: 'priority',
        pos: 'n',
        reading: 'praɪˈɒrɪti',
        meaningVi: 'sự ưu tiên',
        example:
          'Safety is our priority here, so you must first learn how to work on the line.',
        exampleVi:
          'An toàn là ưu tiên của chúng tôi ở đây, vì thế trước tiên bạn phải học cách để làm việc trong hệ thống này.',
        extensions: [
          {
            term: 'first/top priority',
            meaningVi: 'ưu tiên hàng đầu',
          },
          {
            term: 'prioritize',
            pos: 'v',
            meaningVi: 'ưu tiên hóa',
          },
        ],
      },
      {
        term: 'systematically',
        pos: 'adv',
        reading: 'ˌsɪstəˈmætɪkli',
        meaningVi: 'một cách có hệ thống, có phương pháp',
        example:
          'Doing things systematically helps make sure that everything gets done, and gets done well.',
        exampleVi:
          'Tiến hành mọi việc có hệ thống giúp đảm bảo rằng mọi việc được làm và được làm tốt.',
        extensions: [
          {
            term: 'system',
            pos: 'n',
            meaningVi: 'hệ thống',
          },
          {
            term: 'systematic',
            pos: 'adj',
            meaningVi: 'có hệ thống',
          },
        ],
      },
      {
        term: 'uniformly',
        pos: 'adv',
        reading: 'ˈjuːnɪˌfɔːmli',
        meaningVi: 'một cách đồng bộ, giống nhau',
        example:
          'If everything is done uniformly, then all the finished items should look exactly the same.',
        exampleVi:
          'Nếu mọi thứ được làm một cách đồng bộ thì tất cả thành phẩm sẽ trông hoàn toàn giống nhau.',
        extensions: [
          {
            term: 'identically',
            pos: 'adv',
            meaningVi: '(đồng nghĩa) tương tự nhau, y hệt nhau',
          },
          {
            term: 'uniform',
            pos: 'adj',
            meaningVi: 'như nhau, giống nhau',
          },
          {
            term: 'uniform',
            pos: 'n',
            meaningVi: 'đồng phục',
          },
        ],
      },
    ],
  },
  {
    title: '6-2 Quality Control',
    description: 'Track 27',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'circumstance',
        pos: 'n',
        reading: 'ˈsɜːkəmstəns',
        meaningVi: 'tình trạng, điều kiện, hoàn cảnh',
        example:
          'Under no circumstances should items go out if they have any problems.',
        exampleVi:
          'Nếu những mặt hàng có vấn đề thì dù với bất kỳ hoàn cảnh nào cũng nên hủy bỏ chúng.',
        extensions: [
          {
            term: 'condition - situation - state',
            pos: 'n',
            meaningVi: '(đồng nghĩa) tình trạng, điều kiện',
          },
          {
            term: 'economic/financial circumstances',
            meaningVi: 'tình trạng kinh tế/tài chính',
          },
        ],
      },
      {
        term: 'collaboration',
        pos: 'n',
        reading: 'kəlæbəˈreɪʃn',
        meaningVi: 'sự hợp tác',
        example:
          'We can choose to work in collaboration with another company or on our own.',
        exampleVi:
          'Chúng ta có thể chọn hợp tác làm việc với công ty khác hoặc chúng ta làm chủ.',
        extensions: [
          {
            meaningVi: 'dùng với “with + đối tượng hợp tác”.',
          },
          {
            term: 'association - cooperation',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự hợp tác',
          },
          {
            term: 'collaborate',
            pos: 'v',
            meaningVi: 'hợp tác',
          },
          {
            term: 'collaborative',
            pos: 'adj',
            meaningVi: 'mang tính hợp tác',
          },
        ],
      },
      {
        term: 'concentrate',
        pos: 'v',
        reading: 'ˈkɒns(ə)ntreɪt',
        meaningVi: 'tập trung',
        example:
          "You have to concentrate very hard to make sure that you don't miss any problems.",
        exampleVi:
          'Bạn phải tập trung rất nhiều để đảm bảo rằng bạn không bỏ lỡ bất kỳ vấn đề nào.',
        extensions: [
          {
            meaningVi:
              'khi chỉ “chuyên tâm vào (vật việc nào đó)”, cần thêm giới từ on.',
          },
          {
            term: 'focus',
            pos: 'v',
            meaningVi: '(đồng nghĩa) tập trung',
          },
          {
            term: 'distract',
            pos: 'v',
            meaningVi: '(trái nghĩa) phân tán',
          },
          {
            term: 'concentration',
            pos: 'n',
            meaningVi: 'sự tập trung',
          },
        ],
      },
      {
        term: 'condition',
        pos: 'n',
        reading: 'kənˈdɪʃ(ə)n',
        meaningVi: 'điều kiện, tình trạng',
        example: 'We want everything to go out in perfect condition.',
        exampleVi: 'Tôi muốn mọi việc được tiến hành trong điều kiện hoàn hảo.',
        extensions: [
          {
            term: 'conditional',
            pos: 'adj',
            meaningVi: 'có điều kiện',
          },
          {
            term: 'living/working conditions',
            meaningVi: 'điều kiện sống/làm việc',
          },
        ],
      },
      {
        term: 'defect',
        pos: 'n',
        reading: 'ˈdiːfekt',
        meaningVi: 'khuyết điểm, khiếm khuyết, lỗi',
        example:
          'If an item has even the smallest defect, we must not send it out.',
        exampleVi:
          'Nếu một món hàng dù có khiếm khuyết nhỏ nhất thì chúng ta cũng không được gửi nó đi.',
        extensions: [
          {
            term: 'blemish - fault - flaw',
            pos: 'n',
            meaningVi: '(đồng nghĩa) khuyết điểm, lỗi',
          },
          {
            term: 'birth defect',
            meaningVi: 'hoại tử',
          },
          {
            term: 'genetic defect',
            meaningVi: 'khiếm khuyết gen',
          },
          {
            term: 'defective',
            pos: 'adj',
            meaningVi: 'có nhược điểm',
          },
        ],
      },
      {
        term: 'disruption',
        pos: 'n',
        reading: 'dɪsˈrʌpʃn',
        meaningVi: 'sự phá vỡ',
        example: 'The mistake caused a big disruption to the order schedule.',
        exampleVi:
          'Lỗi lầm đã gây nên sự phá vỡ lớn đối với kế hoạch đặt hàng.',
        extensions: [
          {
            term: 'disturbance',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự rối loạn',
          },
          {
            term: 'disrupt',
            pos: 'v',
            meaningVi: 'phá vỡ',
          },
          {
            term: 'disruptive',
            pos: 'adj',
            meaningVi: '(làm) gãy, vỡ',
          },
        ],
      },
      {
        term: 'experiment',
        pos: 'v',
        reading: 'ɪkˈsperɪmənt',
        meaningVi: 'làm thí nghiệm, thử nghiệm',
        example:
          'We are experimenting with ways to improve the quality of our product.',
        exampleVi:
          'Chúng tôi đang thử nghiệm những cách để nâng cao chất lượng sản phẩm của chúng tôi.',
        extensions: [
          {
            meaningVi:
              'khi làm động từ, cần thêm giới từ with hoặc on. Cũng có thể làm danh từ, chỉ “thí nghiệm, sự thử”.',
          },
          {
            term: 'experimental',
            pos: 'adj',
            meaningVi: 'thuộc về thí nghiệm',
          },
          {
            term: 'experimentation',
            pos: 'n',
            meaningVi: 'sự thử nghiệm',
          },
        ],
      },
      {
        term: 'fluctuate',
        pos: 'v',
        reading: 'ˈflʌktʃʊeɪt',
        meaningVi: 'biến chuyển, thay đổi',
        example:
          "Quality can go up and down just a little, but it would be better if it didn't fluctuate at all.",
        exampleVi:
          'Chất lượng có thể tăng lên rồi giảm xuống một tí nhưng nó sẽ tốt hơn nếu nó không thay đổi gì cả.',
        extensions: [
          {
            term: 'vary - change - shift',
            pos: 'v',
            meaningVi: '(đồng nghĩa) thay đổi',
          },
          {
            term: 'fluctuation',
            pos: 'n',
            meaningVi: 'sự biến chuyển, sự thay đổi',
          },
        ],
      },
      {
        term: 'garment',
        pos: 'n',
        reading: 'ˈɡɑːmənt',
        meaningVi: 'quần áo, y phục',
        example:
          'We are very happy with the way our dresses and other garments look.',
        exampleVi:
          'Chúng tôi rất hài lòng với kiểu cách của những chiếc đầm và những y phục khác của chúng tôi.',
        extensions: [
          {
            meaningVi:
              'garment là cách nói trịnh trọng, thường khẩu ngữ dùng clothes, ngoài ra clothing là cách nói chung của y phục.',
          },
          {
            term: 'garment industry',
            meaningVi: 'ngành may mặc',
          },
        ],
      },
      {
        term: 'hamper',
        pos: 'v',
        reading: 'ˈhæmpə',
        meaningVi: 'cản trở, làm trở ngại',
        example:
          'Our efforts are being hampered by a shortage of trained staff.',
        exampleVi:
          'Những nỗ lực của chúng ta bị cản trở bởi thiếu nhân viên lành nghề.',
        extensions: [
          {
            meaningVi:
              'khi làm danh từ, hamper chỉ “cái hòm mây (đựng thức ăn, quần áo)”.',
          },
          {
            term: 'cramp - hold back - obstruct - hinder',
            meaningVi: '(đồng nghĩa) làm trở ngại',
          },
        ],
      },
      {
        term: 'indicator',
        pos: 'n',
        reading: 'ˈɪndɪkeɪtə',
        meaningVi: 'dụng cụ chỉ báo, đồng hồ chỉ',
        example: 'Price is not always an indicator of quality.',
        exampleVi: 'Giá cả không phải lúc nào cũng là dụng cụ chỉ chất lượng.',
        extensions: [
          {
            term: 'pointer',
            pos: 'n',
            meaningVi: '(đồng nghĩa) cây kim (đồng hồ)',
          },
          {
            term: 'indicate',
            pos: 'v',
            meaningVi: 'chỉ, chỉ dẫn',
          },
          {
            term: 'indication',
            pos: 'n',
            meaningVi: 'sự chỉ dẫn',
          },
        ],
      },
      {
        term: 'inspect',
        pos: 'v',
        reading: 'ɪnˈspekt',
        meaningVi: 'kiểm tra, điều tra',
        example: 'We inspect every item before it goes out.',
        exampleVi: 'Chúng tôi kiểm tra mỗi món hàng trước khi nó xuất.',
        extensions: [
          {
            term: 'examine - scrutinize',
            pos: 'v',
            meaningVi: '(đồng nghĩa) kiểm tra',
          },
          {
            term: 'inspector',
            pos: 'n',
            meaningVi: 'thanh tra viên',
          },
          {
            term: 'inspection',
            pos: 'n',
            meaningVi: 'sự điều tra',
          },
        ],
      },
      {
        term: 'opt',
        pos: 'v',
        reading: 'ɒpt',
        meaningVi: 'chọn, chọn lựa',
        example: 'We have opted to take on an extra quality control manager.',
        exampleVi:
          'Chúng tôi vừa tuyển chọn để nhận thêm một quản lý kiểm soát chất lượng.',
        extensions: [
          {
            meaningVi: 'cách dùng là opt for sth hoặc opt to V.',
          },
          {
            term: 'choose',
            pos: 'v',
            meaningVi: '(đồng nghĩa) chọn lựa',
          },
          {
            term: 'option',
            pos: 'n',
            meaningVi: 'sự chọn lựa',
          },
        ],
      },
      {
        term: 'recall',
        pos: 'v',
        reading: 'rɪˈkɔːl',
        meaningVi: 'rút lại, thu hồi',
        example:
          'The automaker recalled 3,000 SUVs because of a brake problem.',
        exampleVi:
          'Nhà sản xuất xe hơi đã thu hồi 3.000 SUV vì có lỗi ở bộ phận thắng.',
        extensions: [
          {
            meaningVi:
              'recall cũng có thể là danh từ, order/issue a recall of... thể hiện “(công ty nào đó) thu hồi (sản phẩm nào đó)”.',
          },
          {
            term: 'withdraw',
            pos: 'v',
            meaningVi: '(đồng nghĩa) rút (tiền), rút lại, hủy bỏ',
          },
        ],
      },
      {
        term: 'research',
        pos: 'n',
        reading: 'ˈriːsɜːtʃ',
        meaningVi: 'cuộc nghiên cứu',
        example:
          'Our research shows that employees work better if allowed several short breaks.',
        exampleVi:
          'Cuộc nghiên cứu của chúng tôi cho thấy rằng công nhân viên sẽ làm việc tốt hơn nếu được phép nghỉ và giải lao ngắn.',
        extensions: [
          {
            meaningVi:
              'thể hiện “sự nghiên cứu về (chủ đề nào đó)”, dùng giới từ into hoặc on. Cũng có thể dùng như động từ.',
          },
          {
            term: 'study - investigation',
            pos: 'n',
            meaningVi: '(đồng nghĩa) cuộc nghiên cứu',
          },
          {
            term: 'market research',
            meaningVi: 'cuộc nghiên cứu thị trường',
          },
          {
            term: 'research and development (R and D)',
            meaningVi: 'nghiên cứu và phát triển',
          },
          {
            term: 'researcher',
            pos: 'n',
            meaningVi: 'nhà nghiên cứu',
          },
        ],
      },
      {
        term: 'responsibility',
        pos: 'n',
        reading: 'rɪˌspɒnsɪˈbɪlɪti',
        meaningVi: 'trách nhiệm, bổn phận',
        example:
          'It is your responsibility to make sure that the quality is excellent.',
        exampleVi:
          'Trách nhiệm của bạn chính là để đảm bảo rằng chất lượng tốt.',
        extensions: [
          {
            meaningVi: 'Dùng với for N./V-ing hoặc to V.',
          },
          {
            term: 'duty - obligation',
            pos: 'n',
            meaningVi: '(đồng nghĩa) trách nhiệm, nghĩa vụ',
          },
          {
            term: 'responsible',
            pos: 'adj',
            meaningVi: 'chịu trách nhiệm',
          },
        ],
      },
      {
        term: 'scrutiny',
        pos: 'n',
        reading: 'ˈskruːtɪni',
        meaningVi: 'sự kiểm tra, việc kiểm tra kỹ',
        example:
          'Even under the closest scrutiny, the product was found to be of the highest quality.',
        exampleVi:
          'Dù có được kiểm tra tỉ mỉ nhất thì sản phẩm vẫn đạt chất lượng cao nhất.',
        extensions: [
          {
            term: 'inspection - examination',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự kiểm tra',
          },
          {
            term: 'scrutinize',
            pos: 'v',
            meaningVi: 'kiểm tra',
          },
        ],
      },
      {
        term: 'supervisor',
        pos: 'n',
        reading: 'ˈsuːpəvaɪzə',
        meaningVi: 'người quản lý, người điều khiển',
        example:
          'The supervisor makes sure that the workers are doing a good job.',
        exampleVi:
          'Người quản lý đảm bảo rằng những công nhân đang làm việc tốt.',
        extensions: [
          {
            term: 'executive - administrator - manager',
            pos: 'n',
            meaningVi: '(đồng nghĩa) người quản lý, người điều hành',
          },
          {
            term: 'supervise',
            pos: 'v',
            meaningVi: 'quản lý, điều khiển',
          },
          {
            term: 'supervision',
            pos: 'n',
            meaningVi: 'sự quản lý',
          },
          {
            term: 'supervisory',
            pos: 'adj',
            meaningVi: 'mang tính quản lý',
          },
        ],
      },
      {
        term: 'waste',
        pos: 'n',
        reading: 'weɪst',
        meaningVi: 'vật phế thải, lãng phí',
        example:
          'We throw away items with even the smallest flaws, which I think is a real waste.',
        exampleVi:
          'Chúng ta loại bỏ những thứ dù chỉ hơi có khiếm khuyết, tôi nghĩ đó là lãng phí thật sự.',
        extensions: [
          {
            term: 'industrial/chemical/nuclear waste',
            meaningVi: 'chất thải công nghiệp/hoá học/hạt nhân',
          },
          {
            term: 'waste ground',
            meaningVi: 'cặn bã, rác thải',
          },
        ],
      },
      {
        term: 'wrinkle',
        pos: 'n',
        reading: 'ˈrɪŋk(ə)l',
        meaningVi: 'làn, nếp nhăn',
        example: 'The clothes should not have wrinkles in them.',
        exampleVi: 'Quần áo không nên có nếp nhăn.',
        extensions: [
          {
            term: 'crease - crinkle',
            pos: 'n',
            meaningVi: '(đồng nghĩa) nếp',
          },
        ],
      },
    ],
  },
  {
    title: '6-3 Management Meetings',
    description: 'Track 28',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'agenda',
        pos: 'n',
        reading: 'əˈdʒendə',
        meaningVi: 'hội nghị',
        example: "We cannot discuss that today because it's not on the agenda.",
        exampleVi:
          'Chúng ta không thể thảo luận việc đó hôm nay vì nó không có trong chương trình nghị sự.',
        extensions: [
          {
            term: 'political/economic agenda',
            meaningVi: 'hội nghị chính trị/kinh tế',
          },
          {
            term: 'hidden agenda',
            meaningVi: 'hội nghị kín, hội nghị mật',
          },
        ],
      },
      {
        term: 'anxious',
        pos: 'adj',
        reading: 'ˈæŋkʃəs',
        meaningVi: 'lo lắng, hồi hộp, nôn nóng, háo hức',
        example: 'We are anxious to talk about it as soon as possible.',
        exampleVi: 'Chúng tôi háo hức nói về nó càng sớm càng tốt.',
        extensions: [
          {
            meaningVi: 'Dùng với to V., for N. hoặc mệnh đề that.',
          },
          {
            term: 'eager - keen - ardent - desirous',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) hăm hở, hăng hái',
          },
          {
            term: 'indifferent',
            pos: 'adj',
            meaningVi: '(trái nghĩa) dửng dưng',
          },
          {
            term: 'anxiety',
            pos: 'n',
            meaningVi: 'sự lo lắng',
          },
          {
            term: 'anxiously',
            pos: 'adv',
            meaningVi: 'có vẻ lo lắng',
          },
        ],
      },
      {
        term: 'ascertain',
        pos: 'v',
        reading: 'ˌæsəˈteɪn',
        meaningVi: 'biết chắc, tìm hiểu chắc chắn, xác định',
        example: 'We need to ascertain what the problem is so we can fix it.',
        exampleVi:
          'Chúng tôi cần xác định xem sự cố là gì để chúng tôi có thể sửa nó.',
        extensions: [
          {
            meaningVi:
              'Dùng với những từ nghi vấn what/whether/how hoặc mệnh đề that.',
          },
          {
            term: 'discover - find out',
            meaningVi: '(đồng nghĩa) khám phá',
          },
          {
            term: 'determine',
            pos: 'v',
            meaningVi: '(đồng nghĩa) quyết định',
          },
        ],
      },
      {
        term: 'assume',
        pos: 'v',
        reading: 'əˈsjuːm',
        meaningVi: 'giả định, giả thuyết, cho rằng',
        example: 'I assume everyone knows why I have called this meeting.',
        exampleVi:
          'Tôi cho rằng mọi người hiểu tại sao tôi triệu tập cuộc họp này.',
        extensions: [
          {
            term: 'presume - suppose',
            pos: 'v',
            meaningVi: '(đồng nghĩa) giả định',
          },
          {
            term: 'assumption',
            pos: 'n',
            meaningVi: 'sự giả định',
          },
          {
            term: 'assuming (that)',
            pos: 'conj',
            meaningVi: 'giả định rằng',
          },
        ],
      },
      {
        term: 'brand',
        pos: 'n',
        reading: 'brænd',
        meaningVi: 'nhãn hiệu',
        example:
          'There is a new brand on the market, and we need to discuss how it will affect us.',
        exampleVi:
          'Có một nhãn hiệu mới trên thị trường và chúng ta cần thảo luận xem nó ảnh hưởng đến chúng ta như thế nào.',
        extensions: [
          {
            term: 'trademark',
            pos: 'n',
            meaningVi: '(đồng nghĩa) thương hiệu',
          },
          {
            term: 'brand name',
            meaningVi: 'tên nhãn hiệu',
          },
          {
            term: 'brand loyalty',
            meaningVi: 'lòng trung thành với một nhãn hiệu',
          },
          {
            term: 'brand leader',
            meaningVi: 'người đứng đầu về thương hiệu',
          },
        ],
      },
      {
        term: 'conclude',
        pos: 'v',
        reading: 'kənˈkluːd',
        meaningVi: 'kết luận, kết thúc',
        example:
          "Well, if no one has anything else to say, let's conclude the meeting.",
        exampleVi:
          'Nếu không ai nói gì nữa thì chúng ta hãy kết thúc buổi họp.',
        extensions: [
          {
            term: 'end - finish',
            pos: 'v',
            meaningVi: '(đồng nghĩa) kết thúc',
          },
          {
            term: 'conclusion',
            pos: 'n',
            meaningVi: 'sự kết luận',
          },
          {
            term: 'concluding',
            pos: 'adj',
            meaningVi: 'cuối, sau cùng',
          },
          {
            term: 'conclusive',
            pos: 'adj',
            meaningVi: 'quả quyết, hiển nhiên',
          },
        ],
      },
      {
        term: 'goal',
        pos: 'n',
        reading: 'ɡəʊl',
        meaningVi: 'mục tiêu',
        example:
          'The goal of this meeting is to decide on a new look for our product.',
        exampleVi:
          'Mục tiêu của buổi họp này là để quyết định chọn diện mạo mới cho sản phẩm của chúng ta.',
        extensions: [
          {
            term: 'aim - purpose - target',
            pos: 'n',
            meaningVi: '(đồng nghĩa) mục tiêu',
          },
          {
            term: 'long-term goal',
            meaningVi: 'mục tiêu dài hạn',
          },
          {
            term: 'short-term goal',
            meaningVi: 'mục tiêu ngắn hạn',
          },
        ],
      },
      {
        term: 'lengthy',
        pos: 'adj',
        reading: 'ˈleŋθɪ',
        meaningVi: 'dài, lâu',
        example: 'It was a lengthy meeting, but a good one.',
        exampleVi: 'Nó là một buổi họp dài dòng nhưng hay.',
        extensions: [
          {
            meaningVi: 'thông thường đứng trước và bổ nghĩa cho danh từ.',
          },
          {
            term: 'long - overlong',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) dài, lâu',
          },
          {
            term: 'short - brief',
            pos: 'adj',
            meaningVi: '(trái nghĩa) ngắn, ngắn gọn',
          },
          {
            term: 'length',
            pos: 'n',
            meaningVi: 'chiều dài',
          },
          {
            term: 'lengthen',
            pos: 'v',
            meaningVi: 'kéo dài',
          },
        ],
      },
      {
        term: 'lobby',
        pos: 'v',
        reading: 'ˈlɒbi',
        meaningVi: 'vận động hành lang',
        example: 'It sounds like you are lobbying to fire the general manager.',
        exampleVi:
          'Có vẻ như bạn đang vận động hành lang để sa thải tổng giám đốc.',
        extensions: [
          {
            meaningVi:
              'cách dùng là lobby sb to do sth, có nghĩa là “vận động hành lang ai đó làm việc gì đó”. nghĩa thường gặp khác của lobby khi là danh từ là “hành lang”.',
          },
          {
            term: 'lobbyist',
            pos: 'n',
            meaningVi: 'người vận động hành lang',
          },
        ],
      },
      {
        term: 'matter',
        pos: 'n',
        reading: 'ˈmætər',
        meaningVi: 'vấn đề, chủ đề',
        example: 'There is another matter I would like to discuss.',
        exampleVi: 'Có một chủ đề khác tôi muốn thảo luận.',
        extensions: [
          {
            term: 'subject - topic',
            pos: 'n',
            meaningVi: '(đồng nghĩa) chủ đề, đề tài',
          },
          {
            term: 'an important matter/ a matter of importance',
            meaningVi: 'một vấn đề quan trọng',
          },
          {
            term: 'a private/personal matter',
            meaningVi: 'vấn đề riêng tư',
          },
        ],
      },
      {
        term: 'option',
        pos: 'n',
        reading: 'ˈɒpʃ(ə)n',
        meaningVi: 'sự lựa chọn, tùy chọn',
        example:
          'We have the option of delivering the order on Tuesday or Thursday.',
        exampleVi: 'Chúng ta có sự lựa chọn giao hàng vào thứ Ba hoặc thứ Năm.',
        extensions: [
          {
            meaningVi:
              '“sự lựa chọn làm việc gì đó”, cách dùng là option of doing sth.',
          },
          {
            term: 'choice - alternative',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự lựa chọn',
          },
          {
            term: 'opt',
            pos: 'v',
            meaningVi: 'chọn lựa',
          },
          {
            term: 'optional',
            pos: 'adj',
            meaningVi: 'tùy ý lựa chọn',
          },
          {
            term: 'a viable option',
            meaningVi: 'một chọn lựa mang tính khả thi',
          },
        ],
      },
      {
        term: 'periodically',
        pos: 'adv',
        reading: 'ˌpɪərɪˈɒdɪk(ə)li',
        meaningVi: 'một cách định kỳ',
        example: 'We have meetings periodically, but not on a fixed schedule.',
        exampleVi:
          'Chúng tôi có buổi họp định kỳ nhưng không phải theo lịch cố định.',
        extensions: [
          {
            term: 'occasionally - from time to time - at times - sometimes',
            meaningVi: '(đồng nghĩa) theo dịp, định kỳ',
          },
        ],
      },
      {
        term: 'progress',
        pos: 'n',
        reading: 'ˈprəʊgres',
        meaningVi: 'sự tiến bộ',
        example:
          'We didn’t make much progress at the last meeting, so I hope we can be more successful this time.',
        exampleVi:
          'Chúng ta không có nhiều tiến bộ tại buổi họp trước vì vậy tôi hy vọng chúng ta có thể thành công hơn vào lần này.',
        extensions: [
          {
            meaningVi: 'khi làm động từ, chỉ “tiến bộ, tiến hành”.',
          },
          {
            term: 'advance',
            pos: 'n',
            meaningVi: '(đồng nghĩa) tiến triển',
          },
          {
            term: 'progressive',
            pos: 'adj',
            meaningVi: 'có tiến bộ',
          },
          {
            term: 'progressively',
            pos: 'adv',
            meaningVi: 'có vẻ tiến bộ',
          },
        ],
      },
      {
        term: 'solve',
        pos: 'v',
        reading: 'sɒlv',
        meaningVi: 'giải quyết',
        example:
          'You can solve many problems by discussing them with coworkers.',
        exampleVi:
          'Bạn có thể giải quyết nhiều vấn đề bằng cách thảo luận với đồng nghiệp.',
        extensions: [
          {
            term: 'figure out - work out - resolve',
            meaningVi: '(đồng nghĩa) giải quyết, tiến hành',
          },
          {
            term: 'solution',
            pos: 'n',
            meaningVi: 'sự giải quyết',
          },
        ],
      },
    ],
  },
  {
    title: '7-1 Banquets',
    description: 'Track 29',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'appeal',
        pos: 'v',
        reading: 'əˈpiːl',
        meaningVi: 'thu hút, cuốn hút',
        example:
          'This restaurant appeals to people with lots of money to spend.',
        exampleVi: 'Nhà hàng này thu hút người ta tiêu nhiều tiền.',
        extensions: [
          {
            meaningVi:
              'khi dùng để chỉ “hấp dẫn (ai đó)”, cách dùng appeal to sb.',
          },
          {
            term: 'attract - draw',
            pos: 'v',
            meaningVi: '(đồng nghĩa) thu hút',
          },
          {
            term: 'appeal',
            pos: 'n',
            meaningVi: 'sự thu hút',
          },
          {
            term: 'appealing',
            pos: 'adj',
            meaningVi: 'quyến rũ, hấp dẫn',
          },
        ],
      },
      {
        term: 'culinary',
        pos: 'adj',
        reading: 'ˈkʌlɪnəri',
        meaningVi: 'thuộc về nhà bếp',
        example:
          'The banquet was a culinary success; everyone thought the food was amazing.',
        exampleVi:
          'Buổi tiệc lớn là một thành công của nhà bếp; mọi người nghĩ thức ăn thật ngon.',
        extensions: [
          {
            meaningVi: 'đứng phía trước và bổ nghĩa cho danh từ.',
          },
          {
            term: 'culinary skills',
            meaningVi: 'kỹ năng làm bếp, kỹ năng nấu nướng',
          },
          {
            term: 'culinary delights',
            meaningVi: 'sở thích làm bếp, sở thích nấu nướng',
          },
        ],
      },
      {
        term: 'delivery',
        pos: 'n',
        reading: 'dɪˈlɪvəri',
        meaningVi: 'sự phân phối, sự phân phát',
        example: 'We are waiting for the delivery of the chairs.',
        exampleVi: 'Chúng tôi chờ giao những chiếc ghế này.',
        extensions: [
          {
            term: 'deliver',
            pos: 'v',
            meaningVi: 'phân phát, giao',
          },
        ],
      },
      {
        term: 'elegance',
        pos: 'n',
        reading: 'ˈelɪgəns',
        meaningVi: 'sự tao nhã, sự nhã nhặn',
        example: 'I love the elegance of a five-star hotel.',
        exampleVi: 'Tôi yêu nét tao nhã của khách sạn năm sao.',
        extensions: [
          {
            term: 'class - gracefulness',
            pos: 'n',
            meaningVi: 'sự duyên dáng',
          },
          {
            term: 'crudeness - roughness',
            pos: 'n',
            meaningVi: '(trái nghĩa) sự thô kệch',
          },
          {
            term: 'elegant',
            pos: 'adj',
            meaningVi: 'tao nhã, nhã nhặn',
          },
          {
            term: 'elegantly',
            pos: 'adv',
            meaningVi: 'có vẻ nhã nhặn',
          },
        ],
      },
      {
        term: 'impress',
        pos: 'v',
        reading: 'ɪmˈpres',
        meaningVi: 'tạo ấn tượng',
        example:
          'If you want to impress your wedding guests, you should hold an expensive banquet.',
        exampleVi:
          'Nếu bạn muốn tạo ấn tượng cho khách dự tiệc cưới của bạn thì bạn nên tổ chức một buổi tiệc lớn đắt tiền.',
        extensions: [
          {
            meaningVi: 'dạng câu thường dùng impress sb with/by sth.',
          },
          {
            term: 'affect - move - touch',
            pos: 'v',
            meaningVi: '(đồng nghĩa) tác động, làm ảnh hưởng',
          },
          {
            term: 'impressive',
            pos: 'adj',
            meaningVi: 'có ấn tượng',
          },
          {
            term: 'impression',
            pos: 'n',
            meaningVi: 'sự ấn tượng',
          },
        ],
      },
      {
        term: 'majority',
        pos: 'n',
        reading: 'məˈdʒɒrɪti',
        meaningVi: 'đa số',
        example: 'The majority of the people we invited are going to attend.',
        exampleVi: 'Đa số những người chúng tôi mời đều đến tham dự.',
        extensions: [
          {
            term: 'minority',
            pos: 'n',
            meaningVi: '(trái nghĩa) thiểu số',
          },
          {
            term: 'major',
            pos: 'adj',
            meaningVi: 'chính yếu',
          },
          {
            term: 'majority rule',
            meaningVi: 'quy luật đa số',
          },
        ],
      },
      {
        term: 'plan',
        pos: 'v',
        reading: 'plæn',
        meaningVi: 'hoạch định, dự kiến',
        example: 'The bride and groom planned their wedding a year in advance.',
        exampleVi:
          'Cô dâu và chú rể hoạch định cho đám cưới của họ một năm trước.',
        extensions: [
          {
            meaningVi:
              'cũng có thể làm danh từ, có nghĩa là “kế hoạch, phương pháp”.',
          },
          {
            term: 'arrange - design',
            pos: 'v',
            meaningVi: '(đồng nghĩa) sắp xếp',
          },
          {
            term: 'planner',
            pos: 'n',
            meaningVi: 'người lên kế hoạch',
          },
        ],
      },
      {
        term: 'predict',
        pos: 'v',
        reading: 'prɪˈdɪkt',
        meaningVi: 'dự đoán, tiên đoán',
        example:
          'It’s difficult to predict how much food you’ll need for a banquet.',
        exampleVi:
          'Thật khó để dự đoán một buổi tiệc lớn cần bao nhiêu thức ăn.',
        extensions: [
          {
            meaningVi:
              'Dùng với các từ nghi vấn how/what/when/whether hoặc mệnh đề that.',
          },
          {
            term: 'forecast - foretell',
            pos: 'v',
            meaningVi: '(đồng nghĩa) dự đoán',
          },
          {
            term: 'predictable',
            pos: 'adj',
            meaningVi: 'có thể dự đoán được',
          },
          {
            term: 'prediction',
            pos: 'n',
            meaningVi: 'sự dự đoán',
          },
        ],
      },
      {
        term: 'theme',
        pos: 'n',
        reading: 'θiːm',
        meaningVi: 'chủ đề, chủ điểm',
        example:
          'This banquet has a Halloween theme, so you should wear a costume.',
        exampleVi:
          'Buổi tiệc lớn này có chủ đề Halloween, vì thế bạn nên mặc trang phục.',
        extensions: [
          {
            term: 'thematic',
            pos: 'adj',
            meaningVi: 'thuộc chủ đề',
          },
          {
            term: 'theme park',
            meaningVi: 'công viên chính',
          },
          {
            term: 'theme party',
            meaningVi: 'buổi tiệc chủ điểm',
          },
          {
            term: 'theme song',
            meaningVi: 'nhạc hiệu',
          },
        ],
      },
    ],
  },
  {
    title: '7-2 Informal Lunches',
    description: 'Track 30',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'basic',
        pos: 'adj',
        reading: 'ˈbeɪsɪk',
        meaningVi: 'cơ bản, đơn giản nhất',
        example: 'I just want something basic, like a sandwich or noodles.',
        exampleVi:
          'Tôi chỉ muốn thứ gì đơn giản, giống như bánh mì sandwich hay mì.',
        extensions: [
          {
            term: 'fundamental - essential',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) thiết yếu',
          },
          {
            term: 'basics',
            pos: 'n',
            meaningVi: 'những vấn đề chủ yếu',
          },
          {
            term: 'basically',
            pos: 'adv',
            meaningVi: 'về cơ bản',
          },
        ],
      },
      {
        term: 'familiar',
        pos: 'adj',
        reading: 'fəˈmɪliə',
        meaningVi: 'quen thuộc, thân thiết',
        example: 'Are you familiar with this cafe?',
        exampleVi: 'Bạn quen với quán cà phê này hả?',
        extensions: [
          {
            meaningVi:
              'để chỉ nghĩa “quen thuộc với...”, dùng be familiar with.',
          },
          {
            term: 'unfamiliar',
            pos: 'adj',
            meaningVi: '(trái nghĩa) không quen thuộc, xa lạ',
          },
          {
            term: 'familiarize',
            pos: 'v',
            meaningVi: 'làm quen',
          },
          {
            term: 'familiarity',
            pos: 'n',
            meaningVi: 'sự quen thân, sự thân mật',
          },
        ],
      },
      {
        term: 'flavor',
        pos: 'n',
        reading: 'ˈfleɪvə',
        meaningVi: 'hương vị',
        example: 'What flavor of ice cream would you like?',
        exampleVi: 'Bạn thích hương kem nào?',
        extensions: [
          {
            meaningVi:
              'flavor có thể dùng như động từ, có nghĩa là “cho gia vị, làm tăng thêm mùi vị”.',
          },
          {
            term: 'taste',
            pos: 'n',
            meaningVi: '(đồng nghĩa) vị',
          },
        ],
      },
      {
        term: 'ingredient',
        pos: 'n',
        reading: 'ɪnˈgriːdɪənt',
        meaningVi: 'nguyên liệu, thành phần',
        example: 'What are the ingredients of this amazing cake?',
        exampleVi: 'Nguyên liệu của chiếc bánh ngon này là gì?',
        extensions: [
          {
            meaningVi:
              'cũng có thể chỉ “tố chất (của ai đó)”, ví dụ như ingredients of a great baseball player (tố chất của một cầu thủ bóng chày ưu tú).',
          },
          {
            term: 'element - component - constituent - factor',
            pos: 'n',
            meaningVi: 'yếu tố, thành phần',
          },
        ],
      },
      {
        term: 'randomly',
        pos: 'adv',
        reading: 'ˈrændəmli',
        meaningVi: 'tình cờ, ngẫu nhiên',
        example:
          'I just randomly chose this place, but the food is actually quite good.',
        exampleVi: 'Tôi chỉ tình cờ chọn nơi này, nhưng thức ăn thật sự ngon.',
        extensions: [
          {
            term: 'aimlessly - at random',
            meaningVi: '(đồng nghĩa) tình cờ',
          },
          {
            term: 'random',
            pos: 'adj',
            meaningVi: 'tình cờ',
          },
        ],
      },
      {
        term: 'suggestion',
        pos: 'n',
        reading: 'səˈdʒestʃən',
        meaningVi: 'sự đề nghị',
        example: 'I’ll go with your suggestion and take the vegetarian pizza.',
        exampleVi:
          'Tôi sẽ đi theo sự đề nghị của bạn và mang theo bánh pizza chay.',
        extensions: [
          {
            term: 'advice',
            pos: 'n',
            meaningVi: '(đồng nghĩa) lời khuyên',
          },
          {
            term: 'suggest',
            pos: 'v',
            meaningVi: 'đề nghị',
          },
          {
            term: 'suggestive',
            pos: 'adj',
            meaningVi: 'có vẻ gợi ý',
          },
        ],
      },
    ],
  },
  {
    title: '7-3 Receptions',
    description: 'Track 31',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'arrive',
        pos: 'v',
        reading: 'əˈraɪv',
        meaningVi: 'đến',
        example: 'The guests have started to arrive.',
        exampleVi: 'Khách bắt đầu đến.',
        extensions: [
          {
            meaningVi: 'Dùng với nơi chốn, arrive at/in + nơi chốn.',
          },
          {
            term: 'come - show up - turn up',
            meaningVi: '(đồng nghĩa) đến',
          },
          {
            term: 'arrival',
            pos: 'n',
            meaningVi: 'chuyến đến thăm',
          },
        ],
      },
      {
        term: 'assist',
        pos: 'v',
        reading: 'əˈsɪst',
        meaningVi: 'giúp, trợ giúp',
        example: 'Can you assist Carol with the scheduling?',
        exampleVi: 'Bạn có thể giúp Carol lên kế hoạch không?',
        extensions: [
          {
            meaningVi: 'dạng câu thường dùng assist sb with/in sth.',
          },
          {
            term: 'help - aid',
            pos: 'v',
            meaningVi: '(đồng nghĩa) giúp, trợ giúp',
          },
          {
            term: 'assistance',
            pos: 'n',
            meaningVi: 'sự giúp đỡ',
          },
          {
            term: 'assistant',
            pos: 'n, adj',
            meaningVi: 'người trợ lý',
          },
          {
            term: 'interfere - hinder',
            pos: 'v',
            meaningVi: '(trái nghĩa) cản trở, gây trở ngại',
          },
        ],
      },
      {
        term: 'burden',
        pos: 'v',
        reading: 'ˈbɜːd(ə)n',
        meaningVi: 'đè nặng, chất nặng',
        example: 'Can I burden you with a favor?',
        exampleVi: 'Bạn có thể làm ơn giúp giùm tôi được không?',
        extensions: [
          {
            meaningVi:
              'khi làm động từ, nó có cách dùng là burden sb with sth. Khi là danh từ, nó có nghĩa là “trách nhiệm”.',
          },
          {
            term: 'load',
            pos: 'v',
            meaningVi: '(đồng nghĩa) tải nặng',
          },
          {
            term: 'oppress',
            pos: 'v',
            meaningVi: '(đồng nghĩa) đè nặng',
          },
          {
            term: 'beast of burden',
            meaningVi: 'thú vật chở đồ nặng',
          },
          {
            term: 'burdensome',
            pos: 'adj',
            meaningVi: 'nặng nề, làm khó chịu',
          },
        ],
      },
      {
        term: 'commonly',
        pos: 'adv',
        reading: 'ˈkɒmənli',
        meaningVi: 'thường thường, lắm khi',
        example: 'Wedding receptions are commonly held in hotels.',
        exampleVi: 'Các tiệc cưới thường được tổ chức trong khách sạn.',
        extensions: [
          {
            term: 'generally - normally',
            pos: 'adv',
            meaningVi: '(đồng nghĩa) thường thường',
          },
          {
            term: 'common',
            pos: 'adj',
            meaningVi: 'phổ biến, chung',
          },
          {
            term: 'commoner',
            pos: 'n',
            meaningVi: 'người thường dân',
          },
        ],
      },
      {
        term: 'individual',
        pos: 'adj',
        reading: 'ˌɪndɪˈvɪdjʊəl',
        meaningVi: 'cá nhân, riêng tư',
        example:
          'The entire staff received individual invitations to the party.',
        exampleVi: 'Toàn bộ nhân viên nhận lời mời riêng đến bữa tiệc.',
        extensions: [
          {
            meaningVi:
              'individual cũng có thể là danh từ, chỉ “cá nhân, cá thể”.',
          },
          {
            term: 'distinctive - peculiar - unique - separate',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) đặc trưng, riêng tư',
          },
          {
            term: 'individually',
            pos: 'adv',
            meaningVi: 'có vẻ riêng tư',
          },
          {
            term: 'individualism',
            pos: 'n',
            meaningVi: 'chủ nghĩa cá nhân',
          },
          {
            term: 'individualize',
            pos: 'v',
            meaningVi: 'cá nhân hóa',
          },
        ],
      },
      {
        term: 'list',
        pos: 'n',
        reading: 'lɪst',
        meaningVi: 'danh sách',
        example: 'There are almost a hundred people on our wedding list.',
        exampleVi: 'Có gần 100 người trong danh sách tiệc cưới của chúng tôi.',
        extensions: [
          {
            term: 'checklist - roll',
            pos: 'n',
            meaningVi: '(đồng nghĩa) danh sách',
          },
          {
            term: 'waiting list',
            meaningVi: 'danh sách chờ',
          },
          {
            term: 'shopping list',
            meaningVi: 'danh sách mua sắm',
          },
          {
            term: 'mailing list',
            meaningVi: 'danh sách gửi thư',
          },
        ],
      },
      {
        term: 'mix',
        pos: 'v',
        reading: 'mɪks',
        meaningVi: 'sống hòa hợp với người khác, hòa đồng',
        example: 'Receptions are a great place for people to mix.',
        exampleVi:
          'Tiệc chiêu đãi là một nơi tuyệt vời để mọi người giao thiệp với nhau.',
        extensions: [
          {
            meaningVi: 'dùng với giới từ with + người.',
          },
          {
            term: 'socialize - mingle',
            pos: 'v',
            meaningVi: '(đồng nghĩa) hòa hợp',
          },
          {
            term: 'a good/bad mixer',
            meaningVi: 'người hòa đồng giỏi/dở',
          },
        ],
      },
      {
        term: 'profession',
        pos: 'n',
        reading: 'prəˈfeʃ(ə)n',
        meaningVi: 'nghề, nghề nghiệp',
        example: 'Anne enjoys her profession as a party planner.',
        exampleVi: 'Anne thích nghề làm người tổ chức tiệc.',
        extensions: [
          {
            term: 'occupation - employment - vocation',
            pos: 'n',
            meaningVi: '(đồng nghĩa) chuyên môn, nghề nghiệp',
          },
          {
            term: 'professional',
            pos: 'adj, n',
            meaningVi: 'chuyên nghiệp',
          },
        ],
      },
    ],
  },
  {
    title: '7-4 Reservations',
    description: 'Track 32',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'demand',
        pos: 'v',
        reading: 'dɪˈmɑːnd',
        meaningVi: 'đòi hỏi, yêu cầu',
        example:
          'But we booked the table a week ago! I demand to see the manager.',
        exampleVi:
          'Nhưng chúng tôi đã đặt bàn cách đây một tuần! Tôi yêu cầu được gặp giám đốc.',
        extensions: [
          {
            meaningVi:
              'Dùng với to V hoặc mệnh đề that. Ngoài ra, demand còn có thể làm danh từ, chỉ “yêu cầu, đòi hỏi”.',
          },
          {
            term: 'demanding',
            pos: 'adj',
            meaningVi: 'đòi hỏi khắt khe',
          },
        ],
      },
      {
        term: 'forget',
        pos: 'v',
        reading: 'fəˈget',
        meaningVi: 'quên',
        example: 'Did you forget to make a reservation?',
        exampleVi: 'Bạn quên đặt chỗ trước phải không?',
        extensions: [
          {
            meaningVi:
              'forget to V có nghĩa là “quên làm việc gì đó”, forget V-ing có nghĩa là “quên sự việc gì ở quá khứ”.',
          },
          {
            term: 'remember',
            pos: 'v',
            meaningVi: '(trái nghĩa) nhớ',
          },
          {
            term: 'forgetful',
            pos: 'adj',
            meaningVi: 'lãng quên',
          },
          {
            term: 'forgettable',
            pos: 'adj',
            meaningVi: 'đáng quên',
          },
        ],
      },
      {
        term: 'mix-up',
        pos: 'n',
        reading: 'ˈmɪksˌʌp',
        meaningVi: 'sự lẫn lộn, sự hỗn loạn, cuộc ẩu đả',
        example:
          'There seems to be a mix-up: you gave us a table near the kitchen, but we wanted a table near the window.',
        exampleVi:
          'Dường như có sự lẫn lộn: bạn dành cho chúng tôi bàn gần nhà bếp nhưng chúng tôi muốn một bàn gần cửa sổ.',
        extensions: [
          {
            term: 'foul-up - confusion',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự lộn xộn',
          },
          {
            term: 'mixture',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự trộn lẫn',
          },
          {
            term: 'fight',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự cãi lộn',
          },
          {
            term: 'mixed',
            pos: 'adj',
            meaningVi: 'được trộn lẫn',
          },
        ],
      },
      {
        term: 'patron',
        pos: 'n',
        reading: 'ˈpeɪtrən',
        meaningVi: 'khách hàng quen, người bảo trợ',
        example: 'Patrons of the hotel can park their cars for free.',
        exampleVi: 'Khách hàng quen của khách sạn có thể đậu xe miễn phí.',
        extensions: [
          {
            term: 'customer',
            pos: 'n',
            meaningVi: '(đồng nghĩa) khách hàng',
          },
          {
            term: 'sponsor',
            pos: 'n',
            meaningVi: '(đồng nghĩa) người bảo trợ',
          },
          {
            term: 'patronize',
            pos: 'v',
            meaningVi: 'sự bảo trợ',
          },
          {
            term: 'patronage',
            pos: 'n',
            meaningVi: 'bảo trợ, giúp đỡ',
          },
        ],
      },
      {
        term: 'relinquish',
        pos: 'v',
        reading: 'rɪˈlɪŋkwɪʃ',
        meaningVi: 'bỏ, từ bỏ, từ chức, nhường',
        example: 'Andy relinquished his seat to a guest who was waiting.',
        exampleVi: 'Andy nhường chỗ của anh cho người khách đang chờ.',
        extensions: [
          {
            meaningVi: 'cách dùng relinquish sth to sb.',
          },
          {
            term: 'yield - resign - waive - renounce',
            pos: 'v',
            meaningVi: '(đồng nghĩa) từ bỏ',
          },
        ],
      },
      {
        term: 'remind',
        pos: 'v',
        reading: 'rɪˈmaɪnd',
        meaningVi: 'nhắc, nhắc nhở',
        example: 'The waiter forgot my drink; I need to remind him.',
        exampleVi:
          'Người phục vụ đã quên thức uống của tôi; tôi cần nhắc anh ấy.',
        extensions: [
          {
            meaningVi:
              'khi chỉ “nhắc nhở”, dùng dạng câu remind sb about sth, remind sb to V, remind sb that... Khi chỉ “làm cho ai nhớ ra”, dùng remind sb of sth.',
          },
          {
            term: 'reminder',
            pos: 'n',
            meaningVi: 'người nhắc nhở',
          },
        ],
      },
      {
        term: 'secure',
        pos: 'v',
        reading: 'sɪˈkjʊə',
        meaningVi: 'bảo đảm',
        example: 'You have to pay now to secure the reservation.',
        exampleVi: 'Bạn phải trả bây giờ để bảo đảm chỗ đặt trước.',
        extensions: [
          {
            meaningVi:
              'khi làm tính từ, mang nghĩa “an toàn, chắc chắn, bảo đảm”.',
          },
          {
            term: 'get - achieve',
            pos: 'v',
            meaningVi: '(đồng nghĩa) đoạt được',
          },
          {
            term: 'security',
            pos: 'n',
            meaningVi: 'sự bảo đảm',
          },
        ],
      },
    ],
  },
  {
    title: '7-5 Events',
    description: 'Track 33',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'complete',
        pos: 'adj',
        reading: 'kəmˈpliːt',
        meaningVi: 'hoàn toàn, trọn vẹn',
        example: 'The event was a complete success.',
        exampleVi: 'Sự kiện này là một thành công trọn vẹn.',
        extensions: [
          {
            meaningVi:
              'thường đứng trước danh từ. Khi làm động từ, mang nghĩa “hoàn thành, làm cho hoàn chỉnh”.',
          },
          {
            term: 'absolute - perfect - total',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) hoàn toàn, tuyệt đối',
          },
          {
            term: 'completely',
            pos: 'adv',
            meaningVi: 'tuyệt đối',
          },
          {
            term: 'completion',
            pos: 'n',
            meaningVi: 'sự hoàn thành',
          },
          {
            term: 'incomplete',
            pos: 'adj',
            meaningVi: '(trái nghĩa) còn dở dang',
          },
        ],
      },
      {
        term: 'coordinate',
        pos: 'v',
        reading: 'kəʊˈɔːdɪneɪt',
        meaningVi: 'xếp đặt, phối hợp, điều hành',
        example:
          'For the event to be successful, we need to coordinate everything with the caterers.',
        exampleVi:
          'Để sự kiện thành công, chúng ta cần phối hợp mọi việc với những người quản lý khách sạn.',
        extensions: [
          {
            term: 'coordination',
            pos: 'n',
            meaningVi: 'sự phối hợp',
          },
          {
            term: 'coordinator',
            pos: 'n',
            meaningVi: 'người điều phối, điều phối viên',
          },
        ],
      },
      {
        term: 'daringly',
        pos: 'adv',
        reading: 'ˈdeərɪŋli',
        meaningVi: 'có vẻ gan dạ, liều lĩnh',
        example: 'She daringly invited the mayor to the party.',
        exampleVi: 'Cô ấy liều lĩnh mời thị trưởng đến dự tiệc.',
        extensions: [
          {
            term: 'boldly',
            pos: 'adv',
            meaningVi: '(đồng nghĩa) có vẻ liều lĩnh, táo bạo',
          },
          {
            term: 'daring',
            pos: 'adj',
            meaningVi: 'liều lĩnh, táo bạo',
          },
          {
            term: 'dare',
            pos: 'aux, v',
            meaningVi: 'đủ can đảm, dám làm',
          },
        ],
      },
      {
        term: 'exact',
        pos: 'adj',
        reading: 'ɪgˈzækt',
        meaningVi: 'chính xác',
        example: 'The band played the exact same music as last time!',
        exampleVi: 'Ban nhạc chơi cùng một loại nhạc như lúc trước.',
        extensions: [
          {
            term: 'exactly',
            pos: 'adv',
            meaningVi: 'một cách chính xác, đúng đắn',
          },
        ],
      },
      {
        term: 'excite',
        pos: 'v',
        reading: 'ɪkˈsaɪt',
        meaningVi: 'kích thích, kích động',
        example: 'Fireworks always excite a crowd.',
        exampleVi: 'Pháo hoa luôn làm đám đông kích động.',
        extensions: [
          {
            term: 'excited',
            pos: 'adj',
            meaningVi: 'bị kích động, sôi nổi',
          },
          {
            term: 'exciting',
            pos: 'adj',
            meaningVi: 'hứng thú, làm náo động',
          },
          {
            term: 'excitement',
            pos: 'n',
            meaningVi: 'sự kích động',
          },
        ],
      },
      {
        term: 'general',
        pos: 'adj',
        reading: 'ˈdʒen(ə)r(ə)l',
        meaningVi: 'chung, phổ biến',
        example:
          'There was general agreement that this was the best party of the year.',
        exampleVi:
          'Có một sự đồng ý chung rằng đây là bữa tiệc tuyệt vời nhất của năm.',
        extensions: [
          {
            term: 'common - usual',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) chung, thường',
          },
          {
            term: 'public',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) chung, công cộng',
          },
          {
            term: 'rough',
            pos: 'adj',
            meaningVi: 'thô lỗ',
          },
        ],
      },
      {
        term: 'guide',
        pos: 'n',
        reading: 'gaɪd',
        meaningVi: 'hướng dẫn viên',
        example: 'The restaurant guide gave this place a high rating.',
        exampleVi: 'Hướng dẫn viên của khách sạn đánh giá cao nơi này.',
        extensions: [
          {
            meaningVi: 'cũng có thể là động từ, thể hiện “hướng dẫn, chỉ dẫn”.',
          },
          {
            term: 'instructions',
            pos: 'n',
            meaningVi: '(đồng nghĩa) lời hướng dẫn',
          },
          {
            term: 'tour guide',
            meaningVi: 'hướng dẫn viên du lịch',
          },
          {
            term: 'spiritual guide',
            meaningVi: 'người dẫn lối tâm hồn',
          },
          {
            term: 'guidance',
            pos: 'n',
            meaningVi: 'sự chỉ đạo, sự hướng dẫn',
          },
        ],
      },
      {
        term: 'ideally',
        pos: 'adv',
        reading: 'aɪˈdɪəli',
        meaningVi: 'một cách lý tưởng',
        example: 'Ideally, the banquet should start at 4:00 p.m.',
        exampleVi:
          'Buổi tiệc lớn này nên bắt đầu lúc 4 giờ chiều là lý tưởng nhất.',
        extensions: [
          {
            term: 'in reality',
            meaningVi: '(trái nghĩa) thật ra, trên thực tế',
          },
          {
            term: 'ideal',
            pos: 'adj, n',
            meaningVi: 'lý tưởng',
          },
          {
            term: 'idealize',
            pos: 'v',
            meaningVi: 'lý tưởng hóa',
          },
          {
            term: 'idealization',
            pos: 'n',
            meaningVi: 'sự lý tưởng hóa',
          },
        ],
      },
      {
        term: 'incorporate',
        pos: 'v',
        reading: 'ɪnˈkɔːpəreɪt',
        meaningVi: 'sáp nhập, kết hợp chặt chẽ',
        example:
          'It would be great if we could incorporate the presentation into our event.',
        exampleVi:
          'Thật tuyệt vời nếu chúng ta kết hợp diễn thuyết trong sự kiện của chúng ta.',
        extensions: [
          {
            meaningVi: 'cách dùng thường gặp incorporate A into/in B.',
          },
          {
            term: 'integrate - include',
            pos: 'v',
            meaningVi: '(đồng nghĩa) sáp nhập, bao hàm',
          },
          {
            term: 'incorporation',
            pos: 'n',
            meaningVi: 'sự sáp nhập, kết hợp chặt chẽ',
          },
          {
            term: 'incorporated (Inc.)',
            pos: 'adj',
            meaningVi: 'sáp nhập, hợp nhất',
          },
        ],
      },
      {
        term: 'judge',
        pos: 'v',
        reading: 'dʒʌdʒ',
        meaningVi: 'phán đoán, đánh giá, phân xử',
        example:
          'It’s difficult to judge what kind of music to play at these events.',
        exampleVi:
          'Thật khó để phán đoán loại nhạc nào để chơi trong những sự kiện này.',
        extensions: [
          {
            meaningVi:
              'judge cũng có thể làm danh từ, chỉ “quan tòa, thẩm phán”.',
          },
          {
            term: 'decide - determine',
            pos: 'v',
            meaningVi: '(đồng nghĩa) quyết định',
          },
          {
            term: 'judgment',
            pos: 'n',
            meaningVi: 'sự đánh giá, phân xử',
          },
          {
            term: 'Don’t judge a book by its cover.',
            meaningVi: 'Tốt gỗ hơn tốt nước sơn.',
          },
        ],
      },
      {
        term: 'rely',
        pos: 'v',
        reading: 'rɪˈlaɪ',
        meaningVi: 'dựa vào, tin vào, cậy vào',
        example: 'You can rely on Judy to get everything done on time.',
        exampleVi: 'Bạn có dựa vào Judy để hoàn thành mọi việc đúng giờ.',
        extensions: [
          {
            meaningVi:
              'cách dùng là rely on sb to V hoặc rely on sb/sth for sth.',
          },
          {
            term: 'depend - count',
            pos: 'v',
            meaningVi: '(đồng nghĩa) phụ thuộc vào',
          },
          {
            term: 'reliable',
            pos: 'adj',
            meaningVi: 'đáng tin cậy',
          },
        ],
      },
      {
        term: 'stage',
        pos: 'n',
        reading: 'steɪdʒ',
        meaningVi: 'sân khấu',
        example: 'The singer will be on stage soon.',
        exampleVi: 'Ca sĩ sẽ lên sân khấu ngay.',
        extensions: [
          {
            meaningVi:
              'cũng có thể làm động từ, có nghĩa là “đưa (vở kịch) lên sân khấu, dàn cảnh”.',
          },
          {
            term: 'backstage',
            pos: 'adv',
            meaningVi: 'ở sau sân khấu, hậu trường',
          },
          {
            term: 'stage fright',
            meaningVi: 'sự hồi hộp khi đứng trước khán giả',
          },
        ],
      },
    ],
  },
  {
    title: '8-1 Transportation',
    description: 'Track 34',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'beverage',
        pos: 'n',
        reading: 'ˈbevərɪdʒ',
        meaningVi: 'nước giải khát',
        example: 'What kind of beverages do you offer?',
        exampleVi: 'Bạn gọi loại nước giải khát nào?',
        extensions: [
          {
            term: 'drink',
            pos: 'n',
            meaningVi: '(đồng nghĩa) uống',
          },
          {
            term: 'alcoholic beverages',
            meaningVi: 'nước uống có cồn',
          },
          {
            term: 'nonalcoholic beverages',
            meaningVi: 'nước uống không chứa cồn',
          },
        ],
      },
      {
        term: 'blanket',
        pos: 'n, adj',
        reading: 'ˈblæŋkit',
        meaningVi: 'mền, chăn; bao trùm',
        example: 'Can you ask the flight attendant to give me a blanket?',
        exampleVi:
          'Bạn có thể yêu cầu tiếp viên máy bay đưa cho tôi chiếc mền được chứ?',
        extensions: [
          {
            meaningVi:
              'thường dùng a blanket of để hình dung “một lớp phủ dày”, như a blanket of snow.',
          },
          {
            term: 'blanket statement',
            meaningVi: 'lời phát biểu chung chung',
          },
        ],
      },
      {
        term: 'board',
        pos: 'v',
        reading: 'bɔːd',
        meaningVi: 'lên tàu, lên máy bay',
        example: 'We need to board the plane now, as it will be leaving soon.',
        exampleVi: 'Bây giờ chúng ta phải lên máy bay vì nó sắp cất cánh.',
        extensions: [
          {
            meaningVi:
              'thể hiện “mở cửa cho hành khách (máy bay, thuyền...) vào”, có thể nói be boarding.',
          },
          {
            term: 'boarding pass',
            meaningVi: 'vé lên máy bay, lên tàu',
          },
        ],
      },
      {
        term: 'chain',
        pos: 'n',
        reading: 'tʃeɪn',
        meaningVi: 'chuỗi, dây xích, dây.',
        example: 'If you pull that chain, the train will stop.',
        exampleVi: 'Nếu bạn kéo dây đó, xe lửa sẽ dừng.',
        extensions: [
          {
            term: 'chain store',
            meaningVi: 'chuỗi cửa hàng',
          },
          {
            term: 'food chain',
            meaningVi: 'xâu thức ăn',
          },
          {
            term: 'supply chain',
            meaningVi: 'hàng loạt cung cấp, chuỗi cung cấp',
          },
        ],
      },
      {
        term: 'deluxe',
        pos: 'adj',
        reading: 'dəˈlʌks',
        meaningVi: 'thuộc loại sang trọng, xa xỉ',
        example: 'We bought tickets for the deluxe train car.',
        exampleVi: 'Chúng tôi mua vé xe hạng sang.',
        extensions: [
          {
            term: 'luxurious - lavish',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) sang trọng, xa xỉ',
          },
        ],
      },
      {
        term: 'disappoint',
        pos: 'v',
        reading: 'ˌdɪsəˈpɔɪnt',
        meaningVi: 'làm hỏng, làm thất vọng',
        example:
          'I’m sorry to disappoint you, but the train is not going to arrive in time.',
        exampleVi:
          'Tôi xin lỗi đã làm bạn thất vọng nhưng tàu lửa đến không đúng giờ.',
        extensions: [
          {
            term: 'let down - dissatisfy - discontent',
            meaningVi: '(đồng nghĩa) làm thất vọng',
          },
          {
            term: 'satisfy',
            pos: 'v',
            meaningVi: '(trái nghĩa) làm thỏa mãn, làm hài lòng',
          },
          {
            term: 'disappointment',
            pos: 'n',
            meaningVi: 'sự thất vọng',
          },
          {
            term: 'disappointing',
            pos: 'adj',
            meaningVi: 'làm thất vọng',
          },
          {
            term: 'disappointed',
            pos: 'adj',
            meaningVi: 'thất vọng',
          },
        ],
      },
      {
        term: 'distinguish',
        pos: 'v',
        reading: 'dɪˈstɪŋgwɪʃ',
        meaningVi: 'phân biệt, nhận ra',
        example:
          'He can distinguish where a wine was produced just by tasting it.',
        exampleVi:
          'Anh ấy có thể nhận ra rượu được sản xuất ở đâu chỉ bằng cách nếm thử.',
        extensions: [
          {
            meaningVi: 'cách dùng là distinguish A from B.',
          },
          {
            term: 'separate',
            pos: 'v',
            meaningVi: '(đồng nghĩa) phân biệt',
          },
          {
            term: 'distinguished',
            pos: 'adj',
            meaningVi: 'đặc sắc, đặc trưng',
          },
          {
            term: 'distinguishable',
            pos: 'adj',
            meaningVi: 'có thể phân biệt, nhận biết được',
          },
        ],
      },
      {
        term: 'license',
        pos: 'n',
        reading: 'ˈlaɪsṇs',
        meaningVi: 'sự cho phép, giấy phép, chứng chỉ',
        example: 'You need a valid license to rent this car.',
        exampleVi: 'Bạn cần giấy phép hợp lệ để thuê chiếc ô tô này.',
        extensions: [
          {
            meaningVi:
              'khi làm động từ chỉ “phân phát giấy chứng nhận cho ai đó”.',
          },
          {
            term: 'driver’s license',
            meaningVi: 'bằng lái xe',
          },
          {
            term: 'license plate',
            meaningVi: 'bảng đăng ký (xe ô tô...)',
          },
        ],
      },
      {
        term: 'multiple',
        pos: 'adj',
        reading: 'ˈmʌltɪp(ə)l',
        meaningVi: 'nhiều, phức tạp',
        example: 'This train ticket allows me to make multiple stops.',
        exampleVi: 'Vé xe lửa này cho phép tôi đón xe ở nhiều trạm.',
        extensions: [
          {
            meaningVi: 'khi làm danh từ chỉ “bội số”.',
          },
          {
            term: 'multiple-choice',
            pos: 'adj',
            meaningVi: 'đa lựa chọn',
          },
          {
            term: 'multiple personality',
            meaningVi: 'đa tính cách',
          },
        ],
      },
      {
        term: 'prohibit',
        pos: 'v',
        reading: 'prəˈhɪbɪt',
        meaningVi: 'cấm, ngăn chặn',
        example: 'Smoking is prohibited on the train.',
        exampleVi: 'Cấm hút thuốc trên xe lửa.',
        extensions: [
          {
            meaningVi:
              'dạng câu thường gặp prohibit sb from V-ing, nhưng thường dùng dưới dạng câu bị động.',
          },
          {
            term: 'ban - forbid',
            pos: 'v',
            meaningVi: '(đồng nghĩa) cấm',
          },
          {
            term: 'allow - permit',
            pos: 'v',
            meaningVi: '(trái nghĩa) cho phép',
          },
          {
            term: 'prohibition',
            pos: 'n',
            meaningVi: 'sự ngăn cấm',
          },
          {
            term: 'prohibitive',
            pos: 'adj',
            meaningVi: 'nhằm ngăn cấm',
          },
        ],
      },
      {
        term: 'relatively',
        pos: 'adv',
        reading: 'ˈrelətɪvli',
        meaningVi: 'tương đối, khá, vừa phải',
        example:
          'A plane ticket is relatively expensive, but we’ll get there faster.',
        exampleVi: 'Vé máy bay tương đối đắt nhưng chúng ta sẽ đi nhanh hơn.',
        extensions: [
          {
            term: 'comparatively',
            pos: 'adv',
            meaningVi: '(đồng nghĩa) tương đối',
          },
          {
            term: 'relative',
            pos: 'adj, n',
            meaningVi: 'có liên quan, cân đối với người bà con',
          },
        ],
      },
      {
        term: 'service',
        pos: 'n',
        reading: 'ˈsɜːvɪs',
        meaningVi: 'sự phục vụ',
        example:
          'The service on the flight was really good, and so was the food.',
        exampleVi: 'Sự phục vụ trên máy bay thật sự tốt và thức ăn cũng ngon.',
        extensions: [
          {
            term: 'serve',
            pos: 'v',
            meaningVi: 'phục vụ',
          },
          {
            term: 'service charge',
            meaningVi: 'phí dịch vụ',
          },
          {
            term: 'service industry',
            meaningVi: 'ngành dịch vụ',
          },
        ],
      },
      {
        term: 'substantially',
        pos: 'adv',
        reading: 'səbˈstænʃəli',
        meaningVi: 'lớn lao, đáng kể',
        example:
          'Planes are substantially faster than other kinds of transport.',
        exampleVi:
          'Máy bay thì nhanh hơn rất nhiều so với những phương tiện giao thông khác.',
        extensions: [
          {
            term: 'greatly - much - considerably',
            pos: 'adv',
            meaningVi: '(đồng nghĩa) lớn lao, nhiều, đáng kể',
          },
          {
            term: 'basically - generally - essentially',
            pos: 'adv',
            meaningVi: '(đồng nghĩa) về bản chất, về căn bản',
          },
          {
            term: 'slightly - little',
            pos: 'adv',
            meaningVi: '(trái nghĩa) nhỏ, ở mức độ không đáng kể',
          },
          {
            term: 'substantial',
            pos: 'adj',
            meaningVi: 'lớn lao, đáng kể, trọng yếu',
          },
        ],
      },
      {
        term: 'thrill',
        pos: 'n',
        reading: 'θrɪl',
        meaningVi: 'sự rùng mình, sự kích động',
        example: 'Flying is always a thrill for me.',
        exampleVi: 'Đi máy bay luôn là nỗi sợ đối với tôi.',
        extensions: [
          {
            meaningVi:
              'dạng câu the thrill of (doing) sth chỉ “(làm) việc gì đó đem lại sự sung sướng”. Khi làm động từ thrill chỉ “làm xúc động, làm rùng mình”.',
          },
          {
            term: 'excitement',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự kích động',
          },
          {
            term: 'thriller',
            pos: 'n',
            meaningVi: 'tiểu thuyết, vở kịch hoặc bộ phim có nội dung ly kỳ',
          },
        ],
      },
    ],
  },
  {
    title: '8-2 Tickets',
    description: 'Track 35',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'agent',
        pos: 'n',
        reading: 'ˈeɪdʒənt',
        meaningVi: 'đại lý, tác nhân',
        example:
          'The agent says we can pay for the tickets with a credit card.',
        exampleVi:
          'Đại lý cho biết rằng chúng ta có thể thanh toán vé bằng thẻ tín dụng.',
        extensions: [
          {
            term: 'representative',
            pos: 'n',
            meaningVi: '(đồng nghĩa) người đại diện, đại lý',
          },
          {
            term: 'agency',
            pos: 'n',
            meaningVi: 'đại lý, sự môi giới',
          },
          {
            term: 'real estate agent',
            meaningVi: 'đại lý bất động sản',
          },
          {
            term: 'travel agency',
            meaningVi: 'khu nghỉ dưỡng, khu du lịch',
          },
        ],
      },
      {
        term: 'confirm',
        pos: 'v',
        reading: 'kənˈfɜːm',
        meaningVi: 'xác nhận, xác minh',
        example: "I'm just calling to confirm that our seats have been booked.",
        exampleVi:
          'Tôi chỉ gọi để xác nhận chỗ ngồi của chúng tôi đã được đặt.',
        extensions: [
          {
            meaningVi:
              'đằng sau đi với các từ nghi vấn như what hoặc mệnh đề that.',
          },
          {
            term: 'verify',
            pos: 'v',
            meaningVi: '(đồng nghĩa) xác nhận',
          },
          {
            term: 'confirmation',
            pos: 'n',
            meaningVi: 'sự xác nhận',
          },
        ],
      },
      {
        term: 'destination',
        pos: 'n',
        reading: 'ˌdestɪˈneɪʃ(ə)n',
        meaningVi: 'nơi đến',
        example:
          "We're going to Paris, but on this ticket it says the destination is London!",
        exampleVi:
          'Chúng tôi đến Paris nhưng vé máy bay ghi nơi đến là Luân Đôn!',
        extensions: [
          {
            term: 'destined',
            pos: 'adj',
            meaningVi: 'đi đến',
          },
          {
            term: 'tourist destination',
            meaningVi: 'điểm đến du lịch',
          },
        ],
      },
      {
        term: 'economize',
        pos: 'v',
        reading: 'ɪˈkɒnəmʌɪz',
        meaningVi: 'tiết kiệm',
        example: 'We can economize by taking the train instead of flying.',
        exampleVi:
          'Chúng ta có thể tiết kiệm bằng cách đi xe lửa thay vì đi máy bay.',
        extensions: [
          {
            meaningVi:
              'khi thể hiện “tiết kiệm, giảm chi vật gì đó”, thường nói economize on sth, như economize on fuel (tiết kiệm nhiên liệu), economize on water (tiết kiệm nước).',
          },
          {
            term: 'save',
            pos: 'v',
            meaningVi: '(đồng nghĩa) tiết kiệm',
          },
          {
            term: 'waste',
            pos: 'v',
            meaningVi: '(trái nghĩa) phung phí, lãng phí',
          },
          {
            term: 'economy',
            pos: 'n',
            meaningVi: 'nền kinh tế',
          },
          {
            term: 'economical',
            pos: 'adj',
            meaningVi: 'tiết kiệm',
          },
          {
            term: 'economic',
            pos: 'adj',
            meaningVi: 'về kinh tế',
          },
        ],
      },
      {
        term: 'equivalent',
        pos: 'adj',
        reading: 'ɪˈkwɪvələnt',
        meaningVi: 'tương đương, ngang bằng',
        example: 'US$500 is equivalent to about NT$16,000.',
        exampleVi: '500 đô la Mỹ bằng 16.000 đô la Đài Loan.',
        extensions: [
          {
            meaningVi:
              'cũng có thể làm danh từ, chỉ “vật tương đương, từ đồng nghĩa, vật đồng giá”. Cách nói the equivalent of sth, thể hiện “tương đương với vật nào đó”.',
          },
          {
            term: 'equal',
            pos: 'adj',
            meaningVi: 'bằng',
          },
          {
            term: 'equivalence',
            pos: 'n',
            meaningVi: 'sự tương đương, ngang bằng',
          },
        ],
      },
      {
        term: 'excursion',
        pos: 'n',
        reading: 'ɪkˈskɜːʃ(ə)n',
        meaningVi: 'cuộc đi chơi, chuyến tham quan',
        example: "We're going on an excursion to Ilan next weekend.",
        exampleVi: 'Chúng tôi sắp đi tham quan ILan cuối tuần sau.',
        extensions: [
          {
            meaningVi: 'đằng sau đi với giới từ to + nơi chốn.',
          },
          {
            term: 'outing - trip',
            pos: 'n',
            meaningVi: '(đồng nghĩa) cuộc đi chơi',
          },
        ],
      },
      {
        term: 'expense',
        pos: 'n',
        reading: 'ɪkˈspens',
        meaningVi: 'sự tiêu, phí tổn',
        example:
          'Plane tickets are usually the biggest expense of a trip overseas.',
        exampleVi:
          'Vé máy bay thường là chi tiêu lớn nhất cho chuyến tham quan nước ngoài.',
        extensions: [
          {
            term: 'costs - expenditure',
            pos: 'n',
            meaningVi: 'chi tiêu',
          },
          {
            term: 'expensive',
            pos: 'adj',
            meaningVi: 'đắt, tốn kém',
          },
        ],
      },
      {
        term: 'extend',
        pos: 'v',
        reading: 'ɪkˈstend',
        meaningVi: 'kéo dài, mở rộng',
        example: 'We want to extend our trip by two days.',
        exampleVi: 'Chúng tôi muốn kéo dài chuyến tham quan 2 ngày.',
        extensions: [
          {
            term: 'extension',
            pos: 'n',
            meaningVi: 'sự gia hạn, sự mở rộng',
          },
          {
            term: 'extensive',
            pos: 'adj',
            meaningVi: 'có phạm vi rộng, kéo dài ra',
          },
          {
            term: 'extended',
            pos: 'adj',
            meaningVi: 'mở rộng',
          },
        ],
      },
      {
        term: 'fare',
        pos: 'n',
        reading: 'feə',
        meaningVi: 'tiền xe, tiền vé',
        example: 'How much is the bus fare from the station to the zoo?',
        exampleVi: 'Vé xe buýt từ trạm này đến sở thú bao nhiêu tiền?',
        extensions: [
          {
            term: 'bus/train/cab fare',
            meaningVi: 'tiền vé xe buýt/xe lửa/taxi',
          },
          {
            term: 'half-fare',
            pos: 'adj',
            meaningVi: 'nửa tiền vé bình thường',
          },
          {
            term: 'full-fare',
            pos: 'adj',
            meaningVi: 'tiền vé đầy đủ',
          },
        ],
      },
      {
        term: 'quote',
        pos: 'n',
        reading: 'kwəʊt',
        meaningVi: 'việc đặt giá, định giá',
        example: 'Can you give me a quote for remodeling the whole kitchen?',
        exampleVi: 'Anh có thể định giá cho việc sửa chữa toàn bộ nhà bếp chứ?',
        extensions: [
          {
            meaningVi:
              'chỉ “báo giá của...”, dùng giới từ for, thể hiện “trích dẫn từ...”, dùng giới từ from.',
          },
          {
            term: 'quotation',
            pos: 'n',
            meaningVi: 'bản dự kê giá',
          },
          {
            term: 'quotation mark',
            meaningVi: 'dấu ngoặc kép',
          },
        ],
      },
      {
        term: 'rate',
        pos: 'n',
        reading: 'reɪt',
        meaningVi: 'tỷ lệ, giá',
        example: 'Does the taxi rate go up during holidays?',
        exampleVi: 'Có phải tỷ lệ taxi tăng lên trong suốt lễ hội không?',
        extensions: [
          {
            term: 'the going rate',
            meaningVi: 'thương lượng',
          },
          {
            term: 'hourly/weekly/monthly rate',
            meaningVi: 'mức giá hàng giờ/hàng tuần/hàng tháng',
          },
          {
            term: 'birth/unemployment/crime rate',
            meaningVi: 'tỷ lệ sinh/thất nghiệp/tội phạm',
          },
        ],
      },
      {
        term: 'reservation',
        pos: 'n',
        reading: 'ˌrezəˈveɪʃ(ə)n',
        meaningVi: 'sự đặt chỗ trước',
        example: 'You have a reservation for two tickets to Tokyo.',
        exampleVi: 'Bạn đặt chỗ trước cho 2 vé đi Tokyo.',
        extensions: [
          {
            term: 'booking',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự mua vé trước, đặt chỗ trước',
          },
          {
            term: 'reserve',
            pos: 'v',
            meaningVi: 'đặt chỗ trước, dự phòng',
          },
        ],
      },
      {
        term: 'tempt',
        pos: 'v',
        reading: 'tempt',
        meaningVi: 'lôi cuốn, cám dỗ',
        example: "I was tempted to buy first-class tickets, but I didn't.",
        exampleVi:
          'Tôi bị lôi cuốn mua những vé hạng nhất nhưng tôi không mua được.',
        extensions: [
          {
            meaningVi: 'cách dùng tempt sb to V. và tempt sb into V-ing.',
          },
          {
            term: 'allure - seduce',
            pos: 'v',
            meaningVi: '(đồng nghĩa) lôi cuốn, cám dỗ',
          },
          {
            term: 'temptation',
            pos: 'n',
            meaningVi: 'sự cám dỗ, lôi cuốn',
          },
          {
            term: 'tempting',
            pos: 'adj',
            meaningVi: 'hấp dẫn, cám dỗ',
          },
        ],
      },
      {
        term: 'ticket',
        pos: 'n',
        reading: 'ˈtɪkɪt',
        meaningVi: 'vé',
        example: 'How much is a ticket to Hong Kong?',
        exampleVi: 'Vé đến Hồng Kông bao nhiêu tiền?',
        extensions: [
          {
            term: 'big-ticket',
            pos: 'adj',
            meaningVi: 'mẻ lớn',
          },
          {
            term: 'round-trip ticket',
            meaningVi: 'vé khứ hồi',
          },
          {
            term: 'one-way ticket',
            meaningVi: 'vé một chiều',
          },
          {
            term: 'season ticket',
            meaningVi: 'vé đợt',
          },
          {
            term: 'meal ticket',
            meaningVi: 'vé ăn',
          },
        ],
      },
      {
        term: 'valid',
        pos: 'adj',
        reading: 'ˈvælɪd',
        meaningVi: 'hiệu lực, hợp lệ',
        example: 'Only keep the coupons that are still valid.',
        exampleVi: 'Chỉ giữ những phiếu mua hàng nào vẫn còn hiệu lực.',
        extensions: [
          {
            term: 'invalid',
            pos: 'adj',
            meaningVi: '(trái nghĩa) hết hiệu lực, không còn hợp lệ',
          },
          {
            term: 'validate',
            pos: 'v',
            meaningVi: 'phê chuẩn, công nhận giá trị',
          },
          {
            term: 'validation',
            pos: 'n',
            meaningVi: 'sự phê chuẩn, sự công nhận giá trị',
          },
        ],
      },
    ],
  },
  {
    title: '8-3 Schedules',
    description: 'Track 36',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'coincide',
        pos: 'v',
        reading: 'ˌkəʊɪnˈsaɪd',
        meaningVi: 'trùng với, đồng nhất với',
        example: 'Our trip coincides with the festival.',
        exampleVi: 'Chuyến tham quan của chúng ta trùng với lễ hội này.',
        extensions: [
          {
            meaningVi: 'khi chỉ “cùng lúc xảy ra với...”, dùng giới từ with.',
          },
          {
            term: 'concur',
            pos: 'v',
            meaningVi: '(đồng nghĩa) đồng tình, trùng hợp',
          },
          {
            term: 'coincidence',
            pos: 'n',
            meaningVi: 'sự trùng hợp',
          },
          {
            term: 'coincident',
            pos: 'adj',
            meaningVi: 'trùng khớp, trùng hợp',
          },
          {
            term: 'coincidental',
            pos: 'adj',
            meaningVi: 'trùng khớp',
          },
        ],
      },
      {
        term: 'comprehensive',
        pos: 'adj',
        reading: 'ˌkɒmprɪˈhensɪv',
        meaningVi: 'bao hàm, toàn diện',
        example:
          "It's a fully comprehensive tour package; meals and drinks are included.",
        exampleVi: 'Một chuyến du lịch trọn gói bao gồm thức ăn và nước uống.',
        extensions: [
          {
            term: 'complete - all-inclusive - extensive',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) hoàn toàn, hoàn thành',
          },
          {
            term: 'comprehensively',
            pos: 'adv',
            meaningVi: 'hoàn toàn, toàn diện',
          },
        ],
      },
      {
        term: 'confusion',
        pos: 'n',
        reading: 'kənˈfjuːʒ(ə)n',
        meaningVi: 'sự hỗn loạn, sự nhầm lẫn, lộn xộn',
        example:
          "There seems to be some confusion as to when we're stopping for lunch.",
        exampleVi: 'Dường như có vài sự lộn xộn khi chúng tôi nghỉ để ăn trưa.',
        extensions: [
          {
            term: 'puzzlement - bewilderment - perplexity',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự hỗn loạn, sự rắc rối',
          },
          {
            term: 'confuse',
            pos: 'v',
            meaningVi: 'làm xáo trộn',
          },
          {
            term: 'confused',
            pos: 'adj',
            meaningVi: 'lộn xộn, không rõ ràng',
          },
          {
            term: 'confusing',
            pos: 'adj',
            meaningVi: 'khó hiểu, gây bối rối',
          },
        ],
      },
      {
        term: 'contact',
        pos: 'v',
        reading: 'ˈkɒntækt',
        meaningVi: 'liên lạc, liên hệ',
        example:
          "You need to contact the hotel to let them know we'll be late.",
        exampleVi:
          'Bạn cần liên hệ với khách sạn để cho họ biết chúng ta sẽ đến trễ.',
        extensions: [
          {
            meaningVi:
              'khi là danh từ thường đi với giới từ with, cũng có thể mang nghĩa “người quen, cơ hội gặp gỡ”, khi mang nghĩa này thường dưới dạng số nhiều.',
          },
        ],
      },
      {
        term: 'delay',
        pos: 'v',
        reading: 'dɪˈleɪ',
        meaningVi: 'hoãn, trì hoãn',
        example: "The flight has been delayed until three o'clock.",
        exampleVi: 'Chuyến bay bị hoãn lại cho đến 3 giờ.',
        extensions: [
          {
            meaningVi:
              'khi đi với động từ, delay + V-ing, thể hiện “trì hoãn làm việc gì đó”.',
          },
          {
            term: 'postpone - defer - hold up',
            meaningVi: '(đồng nghĩa) hoãn, trì hoãn',
          },
          {
            term: 'advance',
            pos: 'v',
            meaningVi: '(trái nghĩa) trước, đi trước',
          },
        ],
      },
      {
        term: 'depart',
        pos: 'v',
        reading: 'dɪˈpɑːt',
        meaningVi: 'xuất phát, khởi hành',
        example: "The train will depart at six o'clock, so don't be late.",
        exampleVi: 'Xe lửa sẽ khởi hành lúc 6 giờ, vì thế đừng có đến trễ.',
        extensions: [
          {
            meaningVi:
              'thể hiện “khởi hành đến...”, dùng depart for + nơi chốn; thể hiện “xuất phát từ...”, dùng depart from + nơi chốn.',
          },
          {
            term: 'leave - go - get off',
            meaningVi: '(đồng nghĩa) xuất phát',
          },
          {
            term: 'arrive',
            pos: 'v',
            meaningVi: '(trái nghĩa) đến nơi',
          },
          {
            term: 'departure',
            pos: 'n',
            meaningVi: 'sự khởi hành',
          },
        ],
      },
      {
        term: 'duration',
        pos: 'n',
        reading: 'djʊˈreɪʃ(ə)n',
        meaningVi: 'khoảng thời gian',
        example: 'I spent the duration of my vacation relaxing on the beach.',
        exampleVi: 'Tôi thư giãn trên bãi biển trong suốt kỳ nghỉ.',
        extensions: [
          {
            term: 'time - span - stretch',
            pos: 'n',
            meaningVi: '(đồng nghĩa) khoảng thời gian',
          },
        ],
      },
      {
        term: 'embarkation',
        pos: 'n',
        reading: 'ˌɪmˈbɑːkeɪʃn',
        meaningVi: 'sự cho lên tàu',
        example: 'At embarkation, please have your passport available.',
        exampleVi: 'Lúc lên tàu, vui lòng cầm sẵn hộ chiếu của quý vị.',
        extensions: [
          {
            term: 'disembarkation',
            pos: 'n',
            meaningVi: '(trái nghĩa) sự cho lên bờ, sự xuống xe',
          },
          {
            term: 'embark',
            pos: 'v',
            meaningVi: 'lên tàu, lên xe',
          },
          {
            term: 'embark on/upon sth',
            meaningVi: 'bắt tay vào việc gì',
          },
        ],
      },
      {
        term: 'expect',
        pos: 'v',
        reading: 'ɪkˈspekt',
        meaningVi: 'mong, mong đợi',
        example: 'What time do you expect the bus to arrive?',
        exampleVi: 'Bạn mong xe buýt đến lúc mấy giờ?',
        extensions: [
          {
            term: 'expectable',
            pos: 'adj',
            meaningVi: 'có thể kỳ vọng',
          },
          {
            term: 'expectation',
            pos: 'n',
            meaningVi: 'sự mong đợi',
          },
          {
            term: 'expectancy',
            pos: 'n',
            meaningVi: 'tình trạng mong chờ',
          },
        ],
      },
      {
        term: 'intend',
        pos: 'v',
        reading: 'ɪnˈtend',
        meaningVi: 'dự định',
        example: 'We intend to do lots of shopping on this trip!',
        exampleVi:
          'Chúng tôi dự định sẽ mua sắm nhiều trong chuyến tham quan này.',
        extensions: [
          {
            meaningVi: 'cách dùng intend to V. hoặc intend for V-ing.',
          },
          {
            term: 'plan - aim - propose',
            pos: 'v',
            meaningVi: '(đồng nghĩa) lên kế hoạch',
          },
          {
            term: 'intention',
            pos: 'n',
            meaningVi: 'ý định, dự định',
          },
          {
            term: 'intentional',
            pos: 'adj',
            meaningVi: 'cố ý, có chủ tâm',
          },
          {
            term: 'intentionally',
            pos: 'adv',
            meaningVi: 'cố ý, cố tình',
          },
        ],
      },
      {
        term: 'itinerary',
        pos: 'n',
        reading: 'aɪˈtɪnərəri',
        meaningVi: 'kế hoạch về một cuộc hành trình',
        example:
          "According to the itinerary, we'll be going to see a show tomorrow night.",
        exampleVi:
          'Theo kế hoạch cuộc hành trình, chúng ta sẽ xem buổi trình diễn vào tối mai.',
      },
      {
        term: 'notify',
        pos: 'v',
        reading: 'ˈnəʊtɪfaɪ',
        meaningVi: 'thông báo',
        example:
          'Please notify the tour guide if you will not be getting back on the bus.',
        exampleVi:
          'Vui lòng thông báo cho hướng dẫn viên du lịch biết nếu bạn không thể trở lại xe buýt.',
        extensions: [
          {
            meaningVi:
              'dạng câu thường gặp notify sb of sth hoặc mệnh đề notify sb that.',
          },
          {
            term: 'inform',
            pos: 'v',
            meaningVi: '(đồng nghĩa) thông báo',
          },
          {
            term: 'notification',
            pos: 'n',
            meaningVi: 'sự thông báo',
          },
        ],
      },
      {
        term: 'optional',
        pos: 'adj',
        reading: 'ˈɒpʃ(ə)n(ə)l',
        meaningVi: 'tùy ý, không bắt buộc',
        example:
          "You don't have to go shopping with everyone else; it's optional.",
        exampleVi:
          'Bạn không phải đi mua sắm cùng mọi người; đó là không bắt buộc.',
        extensions: [
          {
            term: 'elective - voluntary',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) có thể lựa chọn, tình nguyện',
          },
          {
            term: 'compulsory - mandatory - obligatory - required',
            pos: 'adj',
            meaningVi: '(trái nghĩa) bắt buộc, cưỡng chế',
          },
          {
            term: 'option',
            pos: 'n',
            meaningVi: 'sự lựa chọn, tùy chọn',
          },
          {
            term: 'opt',
            pos: 'v',
            meaningVi: 'chọn, chọn lựa',
          },
        ],
      },
      {
        term: 'preclude',
        pos: 'v',
        reading: 'prɪˈkluːd',
        meaningVi: 'ngăn chặn, ngăn cản',
        example: 'Rain would preclude our plans to have a picnic.',
        exampleVi: 'Mưa sẽ ngăn cản kế hoạch đi dã ngoại của chúng ta.',
        extensions: [
          {
            meaningVi: 'cách dùng preclude sb from doing sth.',
          },
          {
            term: 'prevent',
            pos: 'v',
            meaningVi: '(đồng nghĩa) ngăn chặn, ngăn cản',
          },
          {
            term: 'preclusion',
            pos: 'n',
            meaningVi: 'sự ngăn chặn, ngăn cản',
          },
        ],
      },
      {
        term: 'remainder',
        pos: 'n',
        reading: 'rɪˈmeɪndə',
        meaningVi: 'thời gian còn lại, phần còn lại',
        example:
          'I think we will spend the remainder of the trip at the beach.',
        exampleVi:
          'Tôi nghĩ chúng ta sẽ dành thời gian còn lại của chuyến tham quan tại bãi biển.',
        extensions: [
          {
            meaningVi: 'thường dùng dưới dạng the remainder (of sth).',
          },
          {
            term: 'rest - remains',
            pos: 'n',
            meaningVi: '(đồng nghĩa) phần còn lại',
          },
          {
            term: 'remain',
            pos: 'v',
            meaningVi: 'còn lại, còn để',
          },
          {
            term: 'remaining',
            pos: 'adj',
            meaningVi: 'tình trạng giữ nguyên',
          },
        ],
      },
    ],
  },
  {
    title: '8-4 Stations and Terminals',
    description: 'Track 37',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'advanced',
        pos: 'adj',
        reading: 'ədˈvɑːnst',
        meaningVi: 'cao cấp, tiên tiến',
        example:
          'The station has a very advanced computer system that tells you where all the trains are.',
        exampleVi:
          'Nhà ga này có hệ thống máy tính tiên tiến cho bạn biết tất cả nơi những chuyến xe lửa đi qua.',
        extensions: [
          {
            term: 'developed - improved',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) tiến bộ',
          },
          {
            term: 'backward - primitive - undeveloped',
            pos: 'adj',
            meaningVi: '(trái nghĩa) lạc hậu',
          },
          {
            term: 'advance',
            pos: 'v, n',
            meaningVi: 'có tiến bộ, sự tiến bộ',
          },
          {
            term: 'advancement',
            pos: 'n',
            meaningVi: 'sự tiến bộ',
          },
        ],
      },
      {
        term: 'announcement',
        pos: 'n',
        reading: 'əˈnaʊnsmənt',
        meaningVi: 'sự thông báo',
        example:
          'I just heard an announcement that the train is going to be late.',
        exampleVi: 'Tôi vừa nghe thông báo rằng xe lửa sẽ đến trễ.',
        extensions: [
          {
            term: 'announce',
            pos: 'v',
            meaningVi: 'thông báo',
          },
          {
            term: 'announcer',
            pos: 'n',
            meaningVi: 'người thông báo',
          },
        ],
      },
      {
        term: 'busy',
        pos: 'adj',
        reading: 'ˈbɪzi',
        meaningVi: 'bận rộn, náo nhiệt',
        example: "This is the main station, so it's always very busy.",
        exampleVi: 'Đây là nhà ga chính, vì thế nó luôn náo nhiệt.',
        extensions: [
          {
            term: 'bustling - thriving - vibrant',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) náo nhiệt, nhộn nhịp',
          },
          {
            term: 'dead - inactive - lifeless',
            pos: 'adj',
            meaningVi: '(trái nghĩa) tẻ nhạt',
          },
        ],
      },
      {
        term: 'claim',
        pos: 'v',
        reading: 'kleɪm',
        meaningVi: 'đòi hỏi, yêu sách',
        example: 'You must show your ticket before you can claim your baggage.',
        exampleVi: 'Bạn phải trình vé trước khi bạn đòi hành lý của mình.',
        extensions: [
          {
            meaningVi: 'claim cũng làm danh từ, chỉ “sự yêu sách, sự yêu cầu”.',
          },
          {
            term: 'baggage claim',
            meaningVi: 'khu vực hành lý',
          },
        ],
      },
      {
        term: 'nervously',
        pos: 'adv',
        reading: 'ˈnɜːvəsli',
        meaningVi: 'bồn chồn, lo lắng',
        example:
          "She's scared of flying and is nervously looking out the window.",
        exampleVi: 'Cô ấy sợ đi máy bay và cô ấy lo lắng nhìn ra ngoài cửa sổ.',
        extensions: [
          {
            term: 'anxiously - uneasily - tensely',
            pos: 'adv',
            meaningVi: '(đồng nghĩa) lo lắng',
          },
          {
            term: 'nervous',
            pos: 'adj',
            meaningVi: 'lo lắng',
          },
          {
            term: 'nerve',
            pos: 'n',
            meaningVi: 'dây thần kinh, khí phách',
          },
        ],
      },
      {
        term: 'operate',
        pos: 'v',
        reading: 'ˈɒpəreɪt',
        meaningVi: 'hoạt động, điều khiển, quản lý',
        example: "That airline doesn't operate out of Taipei.",
        exampleVi: 'Hãng hàng không đó không hoạt động ngoài Đài Bắc.',
        extensions: [
          {
            term: 'operation',
            pos: 'n',
            meaningVi: 'sự hoạt động, sự điều khiển, quản lý',
          },
          {
            term: 'operational',
            pos: 'adj',
            meaningVi: 'sẵn sàng để dùng',
          },
        ],
      },
      {
        term: 'punctually',
        pos: 'adv',
        reading: 'ˈpʌŋktʃəli',
        meaningVi: 'đúng giờ',
        example: "The trains always leave punctually; they're never late.",
        exampleVi: 'Xe lửa luôn khởi hành đúng giờ, chúng không bao giờ trễ.',
        extensions: [
          {
            term: 'on time',
            meaningVi: '(đồng nghĩa) đúng giờ',
          },
          {
            term: 'punctual',
            pos: 'adj',
            meaningVi: 'đúng giờ',
          },
          {
            term: 'punctuality',
            pos: 'n',
            meaningVi: 'tính đúng giờ',
          },
        ],
      },
      {
        term: 'remote',
        pos: 'adj',
        reading: 'rɪˈməʊt',
        meaningVi: 'xa xôi, hẻo lánh, biệt lập',
        example:
          "You don't see many people at this station because it's so remote.",
        exampleVi:
          'Bạn không thấy nhiều người tại sân ga này vì nó quá hẻo lánh.',
        extensions: [
          {
            term: 'isolated - secluded',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) biệt lập, hẻo lánh',
          },
          {
            term: 'remote (control)',
            pos: 'n',
            meaningVi: 'điều khiển',
          },
          {
            term: 'remotely',
            pos: 'adv',
            meaningVi: 'ở mức rất nhỏ, rất mơ hồ, rất xa',
          },
        ],
      },
      {
        term: 'system',
        pos: 'n',
        reading: 'ˈsɪstəm',
        meaningVi: 'hệ thống, chế độ, phương pháp',
        example:
          'The station has a very good system for making sure the trains leave on time.',
        exampleVi:
          'Nhà ga này có hệ thống rất tốt để bảo đảm rằng xe lửa khởi hành đúng giờ.',
        extensions: [
          {
            term: 'method - way - approach',
            pos: 'n',
            meaningVi: 'phương pháp',
          },
          {
            term: 'systematic',
            pos: 'adj',
            meaningVi: 'có hệ thống, có phương pháp',
          },
          {
            term: 'systematize',
            pos: 'v',
            meaningVi: 'hệ thống hóa, sắp xếp theo hệ thống',
          },
        ],
      },
    ],
  },
  {
    title: '9-1 Movies',
    description: 'Track 38',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'action',
        pos: 'n',
        reading: 'ækʃ(ə)n',
        meaningVi: 'hành động, hành vi',
        example:
          "I don't like action movies very much; there's always too much fighting.",
        exampleVi:
          'Tôi không thích phim hành động lắm; lúc nào cũng có quá nhiều cảnh đánh nhau.',
        extensions: [
          {
            term: 'action hero',
            meaningVi: 'người hùng',
          },
          {
            term: 'act',
            pos: 'v',
            meaningVi: 'hành động',
          },
        ],
      },
      {
        term: 'admire',
        pos: 'v',
        reading: 'ædˈmaiə',
        meaningVi: 'hâm mộ, ngưỡng mộ',
        example: 'I really admire this actor because all his movies are great.',
        exampleVi:
          'Tôi thực sự hâm mộ nam diễn viên này vì tất cả phim của anh ấy đều hay.',
        extensions: [
          {
            meaningVi:
              'cách nói thể hiện “tôn sùng (ai đó) ở mặt nào hoặc việc nào” là admire sb for N./V-ing.',
          },
          {
            term: 'appreciate - esteem - respect - regard',
            pos: 'v',
            meaningVi: '(đồng nghĩa) khâm phục',
          },
          {
            term: 'admirable',
            pos: 'adj',
            meaningVi: 'đáng ngưỡng mộ, tuyệt diệu',
          },
          {
            term: 'admiration',
            pos: 'n',
            meaningVi: 'sự ngưỡng mộ, hâm mộ',
          },
          {
            term: 'admirer',
            pos: 'n',
            meaningVi: 'người hâm mộ, người ngưỡng mộ',
          },
        ],
      },
      {
        term: 'collection',
        pos: 'n',
        reading: 'kəˈlekʃ(ə)n',
        meaningVi: 'sự sưu tập, sự thu thập',
        example: 'I have a collection of nature DVDs.',
        exampleVi: 'Tôi có bộ sưu tập những DVD gốc.',
        extensions: [
          {
            term: 'collect',
            pos: 'v',
            meaningVi: 'sưu tập, thu thập',
          },
          {
            term: 'collector',
            pos: 'n',
            meaningVi: 'người sưu tập',
          },
        ],
      },
      {
        term: 'dialogue',
        pos: 'n',
        reading: 'ˈdaɪəlɒg',
        meaningVi: 'cuộc đối thoại',
        example: "There wasn't much dialogue in that new kung fu movie.",
        exampleVi: 'Không có nhiều cuộc đối thoại trong phim kung fu mới.',
        extensions: [
          {
            meaningVi: 'tiếng Anh của người Mỹ thường ghi là dialog.',
          },
          {
            term: 'conversation',
            pos: 'n',
            meaningVi: 'cuộc đối thoại',
          },
          {
            term: 'monologue',
            pos: 'n',
            meaningVi: '(trái nghĩa) độc thoại',
          },
          {
            term: 'dialogue box',
            meaningVi: 'phòng đối thoại',
          },
        ],
      },
      {
        term: 'entertainment',
        pos: 'n',
        reading: 'ˌentəˈteɪnmənt',
        meaningVi: 'cuộc giải trí, cuộc tiêu khiển',
        example: 'Movies are my favorite kind of entertainment.',
        exampleVi: 'Phim là kiểu giải trí ưa thích nhất của tôi.',
        extensions: [
          {
            term: 'amusement - recreation',
            pos: 'n',
            meaningVi: 'sự giải trí',
          },
          {
            term: 'entertain',
            pos: 'v',
            meaningVi: 'giải trí',
          },
          {
            term: 'entertainer',
            pos: 'n',
            meaningVi: 'người làm trò tiêu khiển',
          },
          {
            term: 'entertaining',
            pos: 'adj',
            meaningVi: 'làm vui lòng, làm vừa ý',
          },
        ],
      },
      {
        term: 'experience',
        pos: 'n',
        reading: 'ɪkˈspɪərɪəns',
        meaningVi: 'kinh nghiệm, trải nghiệm',
        example: 'For me, seeing a movie is a really enjoyable experience.',
        exampleVi: 'Đối với tôi, xem phim là một trải nghiệm thực sự thú vị.',
        extensions: [
          {
            meaningVi:
              'có thể đi với giới từ of hoặc with; cũng có thể sử dụng như động từ.',
          },
          {
            term: 'experienced',
            pos: 'adj',
            meaningVi: 'từng trải, lão luyện',
          },
          {
            term: 'experiential',
            pos: 'adj',
            meaningVi: 'theo kinh nghiệm',
          },
        ],
      },
      {
        term: 'leisure',
        pos: 'adj',
        reading: 'ˈleʒə',
        meaningVi: 'nhàn rỗi, rảnh rỗi',
        example: 'One of my favorite leisure activities is watching movies.',
        exampleVi:
          'Một trong những hoạt động ưa thích nhất của tôi lúc rảnh rỗi là xem phim.',
        extensions: [
          {
            meaningVi:
              "khi là danh từ thể hiện “thời gian nhàn rỗi”, hoặc có thể nói leisure time. at (one's) leisure thể hiện “ở thời gian nhàn rỗi (của ai đó), khi (ai đó) nhàn rỗi”.",
          },
          {
            term: 'spare',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) nhàn rỗi, rảnh rỗi',
          },
          {
            term: 'leisure suit',
            meaningVi: 'quần áo thoải mái',
          },
        ],
      },
      {
        term: 'release',
        pos: 'v',
        reading: 'rɪˈliːs',
        meaningVi: 'phóng thích, phát hành, đưa ra bán',
        example: 'When will the movie be released in Taiwan?',
        exampleVi: 'Khi nào bộ phim này được công chiếu ở Đài Loan?',
        extensions: [
          {
            meaningVi:
              'khi làm danh từ, nghĩa là “phát hành, công bố” hoặc “đĩa hát được phát hành”, “tin tức được công bố”.',
          },
          {
            term: 'release date',
            meaningVi: 'ngày phát hành',
          },
        ],
      },
    ],
  },
  {
    title: '9-2 Theater',
    description: 'Track 39',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'audience',
        pos: 'n',
        reading: 'ˈɔːdɪəns',
        meaningVi: 'khán giả, thính giả',
        example: 'The audience enjoyed the play.',
        exampleVi: 'Khán giả thích vở kịch này.',
        extensions: [
          {
            meaningVi:
              'là danh từ tổng hợp. Nếu muốn chỉ “một vị khán giả” thì phải nói a member of the audience. Ngoài ra, khán giả xem trận đấu thể thao được gọi là spectators hoặc the crowd.',
          },
          {
            term: 'auditorium',
            pos: 'n',
            meaningVi: 'thính phòng',
          },
        ],
      },
      {
        term: 'continue',
        pos: 'v',
        reading: 'kənˈtɪnjuː',
        meaningVi: 'tiếp tục',
        example: 'The show will continue after the break.',
        exampleVi: 'Buổi diễn này sẽ tiếp tục sau giờ giải lao.',
        extensions: [
          {
            term: 'resume - restart',
            pos: 'v',
            meaningVi: '(đồng nghĩa) tiếp tục',
          },
          {
            term: 'discontinue',
            pos: 'v',
            meaningVi: '(trái nghĩa) gián đoạn',
          },
          {
            term: 'continuous',
            pos: 'adj',
            meaningVi: 'liên tục, không ngừng',
          },
          {
            term: 'continuously',
            pos: 'adv',
            meaningVi: 'liên tục',
          },
          {
            term: 'continuity',
            pos: 'n',
            meaningVi: 'sự liên tục, liên tiếp',
          },
        ],
      },
      {
        term: 'criticism',
        pos: 'n',
        reading: 'ˈkrɪtɪsɪz(ə)m',
        meaningVi: 'lời phê bình, sự phê bình',
        example:
          'The theater came under criticism for allowing people to smoke.',
        exampleVi: 'Nhà hát này bị phê bình vì cho phép người xem hút thuốc.',
        extensions: [
          {
            term: 'criticize',
            pos: 'v',
            meaningVi: 'phê bình, bình phẩm',
          },
          {
            term: 'critic',
            pos: 'n',
            meaningVi: 'nhà phê bình',
          },
          {
            term: 'critical',
            pos: 'adj',
            meaningVi: 'bình phẩm, phê bình',
          },
        ],
      },
      {
        term: 'occur',
        pos: 'v',
        reading: 'əˈkɜː',
        meaningVi: 'xảy ra, diễn ra, xuất hiện',
        example: 'The opening of the new theater should occur this summer.',
        exampleVi: 'Buổi khai trương nhà hát mới sẽ diễn ra vào mùa hè này.',
        extensions: [
          {
            term: 'happen - take place',
            meaningVi: '(đồng nghĩa) xảy ra, diễn ra',
          },
          {
            term: 'occurrence',
            pos: 'n',
            meaningVi: 'sự kiện, chuyện xảy ra',
          },
        ],
      },
      {
        term: 'perform',
        pos: 'v',
        reading: 'pəˈfɔːm',
        meaningVi: 'biểu diễn, trình diễn, cử hành',
        example: 'The actors performed really well.',
        exampleVi: 'Các diễn viên diễn thật sự hay.',
        extensions: [
          {
            term: 'act - play',
            pos: 'v',
            meaningVi: '(đồng nghĩa) diễn',
          },
          {
            term: 'perform well/poorly/satisfactorily',
            meaningVi: 'biểu diễn hay/tệ/một cách hài lòng',
          },
          {
            term: 'performance',
            pos: 'n',
            meaningVi: 'buổi biểu diễn, buổi trình diễn',
          },
          {
            term: 'performer',
            pos: 'n',
            meaningVi: 'người biểu diễn',
          },
        ],
      },
      {
        term: 'rehearse',
        pos: 'v',
        reading: 'rɪˈhɜːs',
        meaningVi: 'nhắc lại, diễn tập',
        example:
          "We need to rehearse more because we still haven't got it quite right.",
        exampleVi:
          'Chúng ta cần diễn tập nhiều hơn bởi vì chúng ta vẫn chưa diễn đúng lắm.',
        extensions: [
          {
            term: 'rehearsal',
            pos: 'n',
            meaningVi: 'sự nhắc lại, sự diễn tập',
          },
        ],
      },
      {
        term: 'schedule',
        pos: 'v',
        reading: 'ˈskedjuːl',
        meaningVi: 'dự định, lên kế hoạch',
        example: 'The play is scheduled to begin next Friday.',
        exampleVi: 'Vở kịch này dự định bắt đầu vào thứ Sáu tới.',
        extensions: [
          {
            meaningVi:
              'khi làm động từ thường dưới dạng bị động: be scheduled to V. hoặc be scheduled for N. khi làm danh từ chỉ “biểu thời gian, bảng phụ lục”.',
          },
        ],
      },
      {
        term: 'successive',
        pos: 'adj',
        reading: 'səkˈsesɪv',
        meaningVi: 'liên tục, liên tiếp, lần lượt',
        example:
          'This Christmas play has been shown here for four successive years.',
        exampleVi: 'Vở kịch Giáng Sinh này được diễn ở đây 4 năm liên tiếp.',
        extensions: [
          {
            term: 'consecutive - sequential',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) liên tục, liên tiếp',
          },
          {
            term: 'succeed',
            pos: 'v',
            meaningVi: 'thành công',
          },
          {
            term: 'successively',
            pos: 'adv',
            meaningVi: 'liên tục, liên tiếp, lần lượt',
          },
          {
            term: 'succession',
            pos: 'n',
            meaningVi: 'sự kế tiếp, sự kế vị',
          },
          {
            term: 'by succession',
            meaningVi: 'kế vị, nối ngôi',
          },
        ],
      },
    ],
  },
  {
    title: '9-3 Music',
    description: 'Track 40',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'available',
        pos: 'adj',
        reading: 'əˈveɪləb(ə)l',
        meaningVi: 'sẵn có để dùng, có hiệu lực',
        example: 'The CD will be available in stores next month.',
        exampleVi: 'Đĩa CD này sẽ có trong cửa hàng vào tháng tới.',
        extensions: [
          {
            term: 'accessible - obtainable',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) sử dụng được',
          },
          {
            term: 'unavailable - inaccessible - unobtainable',
            pos: 'adj',
            meaningVi: '(trái nghĩa) không dùng được',
          },
          {
            term: 'freely/easily available',
            meaningVi: 'miễn phí/dễ dàng sử dụng',
          },
        ],
      },
      {
        term: 'category',
        pos: 'n',
        reading: 'ˈkætigəri',
        meaningVi: 'loại',
        example:
          "His music is so different that it can't be put into just one category.",
        exampleVi:
          'Nhạc của anh ấy rất khác đến nỗi không thể xếp nó vào một loại nào.',
        extensions: [
          {
            term: 'class - group - kind - type',
            pos: 'n',
            meaningVi: '(đồng nghĩa) loại',
          },
          {
            term: 'categorize',
            pos: 'v',
            meaningVi: 'chia loại, phân loại',
          },
          {
            term: 'categorization',
            pos: 'n',
            meaningVi: 'sự phân loại',
          },
        ],
      },
      {
        term: 'combine',
        pos: 'v',
        reading: 'kəmˈbaɪn',
        meaningVi: 'kết hợp, phối hợp',
        example: 'His songs combine jazz with traditional music.',
        exampleVi:
          'Những bài hát của anh ấy phối hợp giữa nhạc jazz và nhạc dân tộc.',
        extensions: [
          {
            meaningVi: 'cách dùng thường gặp combine A with B.',
          },
          {
            term: 'blend - mix - merge - incorporate - integrate',
            pos: 'v',
            meaningVi: '(đồng nghĩa) kết hợp, phối hợp',
          },
          {
            term: 'break down - break up - separate',
            meaningVi: '(trái nghĩa) giải tán, phân chia',
          },
          {
            term: 'combination',
            pos: 'n',
            meaningVi: 'sự kết hợp, phối hợp',
          },
        ],
      },
      {
        term: 'disparate',
        pos: 'adj',
        reading: 'ˈdɪspərət',
        meaningVi: 'khác hẳn, khác loại',
        example:
          'She has taken two disparate music styles and made them work very well together.',
        exampleVi:
          'Cô ấy chơi 2 thể loại nhạc khác nhau và kết hợp chúng rất hay.',
        extensions: [
          {
            term: 'different - diverse - distinct',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) khác nhau',
          },
          {
            term: 'same - similar - parallel',
            pos: 'adj',
            meaningVi: '(trái nghĩa) giống nhau',
          },
          {
            term: 'disparity',
            pos: 'n',
            meaningVi: 'sự khác biệt',
          },
        ],
      },
      {
        term: 'element',
        pos: 'n',
        reading: 'ˈeləmənt',
        meaningVi: 'yếu tố',
        example: "Loud drums are just one element of the band's style.",
        exampleVi:
          'Trống âm thanh lớn chỉ là một yếu tố trong phong cách của ban nhạc.',
        extensions: [
          {
            term: 'component - factor',
            pos: 'n',
            meaningVi: 'yếu tố, nhân tố',
          },
          {
            term: 'elementary',
            pos: 'adj',
            meaningVi: 'sơ cấp, sơ đẳng',
          },
        ],
      },
      {
        term: 'fashion',
        pos: 'n',
        reading: 'ˈfæʃ(ə)n',
        meaningVi: 'mốt, thời trang',
        example: "Rock music isn't in fashion anymore.",
        exampleVi: 'Nhạc rock không còn hợp thời nữa.',
        extensions: [
          {
            term: 'fashionable',
            pos: 'adj',
            meaningVi: 'đúng mốt, hợp thời trang',
          },
        ],
      },
      {
        term: 'impact',
        pos: 'n',
        reading: 'ˈimpækt',
        meaningVi: 'sự ảnh hưởng, tác động',
        example: 'Her music has had quite an impact on the world.',
        exampleVi: 'Nhạc của cô ấy rất có ảnh hưởng trên thế giới.',
        extensions: [
          {
            meaningVi:
              'khi chỉ “có ảnh hưởng đến...” dùng cách nói have an impact on; impact cũng có thể là động từ.',
          },
          {
            term: 'effect - influence - sway',
            pos: 'n',
            meaningVi: '(đồng nghĩa) ảnh hưởng, tác động',
          },
          {
            term: 'adverse/profound/significant/major impact',
            meaningVi: 'tác động bất lợi/sâu sắc/đáng kể/chính yếu',
          },
          {
            term: 'soften/lessen an impact',
            meaningVi: 'làm giảm tác động',
          },
        ],
      },
      {
        term: 'influence',
        pos: 'v',
        reading: 'ˈɪnflʊəns',
        meaningVi: 'tác động, ảnh hưởng',
        example: 'He was influenced by Japanese pop music.',
        exampleVi: 'Anh ấy bị ảnh hưởng bởi nhạc pop Nhật Bản.',
        extensions: [
          {
            meaningVi:
              'khi thể hiện “ảnh hưởng ai đó làm việc gì đó”, dùng influence sb to V; influence cũng có thể là danh từ.',
          },
          {
            term: 'affect - impact',
            pos: 'v',
            meaningVi: 'tác động, ảnh hưởng',
          },
          {
            term: 'influential',
            pos: 'adj',
            meaningVi: 'có ảnh hưởng, có sức thuyết phục',
          },
        ],
      },
      {
        term: 'range',
        pos: 'v',
        reading: 'reɪndʒ',
        meaningVi: 'xếp loại, đi khắp',
        example: 'Her songs range from sad love songs to loud rock.',
        exampleVi:
          'Các bài hát của cô ấy bao gồm từ những bản tình ca buồn đến những bản rock sôi động.',
        extensions: [
          {
            meaningVi:
              'cách dùng range from A to B hoặc range between A and B.',
          },
        ],
      },
      {
        term: 'relaxation',
        pos: 'n',
        reading: 'ˌriːlækˈseɪʃn',
        meaningVi: 'sự thư giãn, sự nghỉ ngơi, sự giải trí',
        example: 'For relaxation, I listen to classical music.',
        exampleVi: 'Để thư giãn, tôi nghe nhạc cổ điển.',
        extensions: [
          {
            term: 'fun - recreation',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự giải trí, tiêu khiển',
          },
          {
            term: 'relax',
            pos: 'v',
            meaningVi: 'thư giãn, giải trí',
          },
          {
            term: 'relaxed',
            pos: 'adj',
            meaningVi: 'thanh thản, thoải mái',
          },
        ],
      },
      {
        term: 'sellout',
        pos: 'n',
        reading: 'ˈselˌaʊt',
        meaningVi: 'buổi diễn bán hết vé, sự bán đắt hàng',
        example: "The popular singer's concerts were all sellouts.",
        exampleVi: 'Các buổi nhạc của ca sĩ nổi tiếng luôn bán hết vé.',
        extensions: [
          {
            term: 'sell out',
            meaningVi: 'bán hết vé, bán hết hàng',
          },
          {
            term: 'sold-out',
            pos: 'adj',
            meaningVi: 'bán hết (vé, hàng)',
          },
        ],
      },
      {
        term: 'significant',
        pos: 'adj',
        reading: 'sɪgˈnɪfɪkənt',
        meaningVi: 'quan trọng, chính yếu',
        example: 'The musician has had a significant impact on jazz music.',
        exampleVi: 'Nhạc sĩ này có ảnh hưởng quan trọng về nhạc jazz.',
        extensions: [
          {
            term: 'important - crucial - noteworthy',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) quan trọng, chính yếu',
          },
          {
            term: 'insignificant - negligible - inconsequential',
            pos: 'adj',
            meaningVi: '(trái nghĩa) tầm thường, không đáng kể',
          },
          {
            term: 'significance',
            pos: 'n',
            meaningVi: 'sự quan trọng, sự đáng kể',
          },
        ],
      },
      {
        term: 'spectrum',
        pos: 'n',
        reading: 'ˈspektrəm',
        meaningVi: 'loạt những dải âm thanh tương tự quang phổ',
        example: 'He can play a broad spectrum of musical instruments.',
        exampleVi: 'Anh ấy có thể chơi những loại nhạc cụ có quang phổ rộng.',
        extensions: [
          {
            meaningVi:
              'thường dùng a spectrum of sth thể hiện “vật/việc trong phạm vi nào đó”.',
          },
          {
            term: 'range',
            pos: 'n',
            meaningVi: '(đồng nghĩa) dãy, tầm truyền',
          },
          {
            term: 'wide/broad spectrum',
            meaningVi: 'dải âm thanh rộng',
          },
        ],
      },
      {
        term: 'taste',
        pos: 'n',
        reading: 'teɪst',
        meaningVi: 'sự thưởng thức, sở thích, thị hiếu',
        example: 'Her taste in music is very strange.',
        exampleVi: 'Thị hiếu âm nhạc của cô ấy rất lạ.',
        extensions: [
          {
            meaningVi:
              'thể hiện “thị hiếu ở phương diện nào đó”, dùng giới từ in. khi thể hiện “sự thưởng thức...”, dùng giới từ for, ví dụ a taste for fine wines (thưởng thức rượu ngon).',
          },
          {
            term: 'liking - preference - appetite',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sở thích',
          },
          {
            term: 'acquired taste',
            meaningVi: 'sở thích từ thói quen',
          },
        ],
      },
    ],
  },
  {
    title: '9-4 Art',
    description: 'Track 41',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'acquire',
        pos: 'v',
        reading: 'əˈkwʌɪə(r)',
        meaningVi: 'đạt được, thu được, kiếm được',
        example: 'I have acquired a large number of very old paintings.',
        exampleVi: 'Tôi thu được rất nhiều bức tranh cũ.',
        extensions: [
          {
            term: 'obtain - gain',
            pos: 'v',
            meaningVi: '(đồng nghĩa) giành được, đạt được',
          },
          {
            term: 'lose',
            pos: 'v',
            meaningVi: '(trái nghĩa) đánh mất',
          },
          {
            term: 'acquisition',
            pos: 'n',
            meaningVi: 'sự đạt được, thu được, kiếm được',
          },
          {
            term: 'acquisitive',
            pos: 'adj',
            meaningVi: 'có khả năng tiếp thu, có thể học hỏi',
          },
          {
            term: 'acquirement',
            pos: 'n',
            meaningVi: 'sự đạt được, thu được, kiếm được',
          },
        ],
      },
      {
        term: 'approach',
        pos: 'n',
        reading: 'əˈprəʊtʃ',
        meaningVi: 'phương pháp, cách tiếp cận',
        example:
          'His approach to art is to paint what he feels, not what he sees.',
        exampleVi:
          'Cách tiếp cận nghệ thuật của anh ấy là vẽ những gì anh ấy nhận thấy chứ không phải những gì anh ấy nhìn thấy.',
        extensions: [
          {
            meaningVi:
              'khi thể hiện “phương pháp của...” dùng dạng câu an approach to sth.',
          },
          {
            term: 'method - style',
            pos: 'n',
            meaningVi: '(đồng nghĩa) phương pháp, phương thức',
          },
          {
            term: 'approachable',
            pos: 'adj',
            meaningVi: 'có thể tiếp cận, có thể tiếp xúc để đặt vấn đề',
          },
        ],
      },
      {
        term: 'broaden',
        pos: 'v',
        reading: 'ˈbrɔːd(ə)n',
        meaningVi: 'mở rộng',
        example: 'Studying art has really broadened my mind.',
        exampleVi: 'Nghiên cứu nghệ thuật làm đầu óc tôi mở mang.',
        extensions: [
          {
            term: 'broad',
            pos: 'adj',
            meaningVi: 'rộng',
          },
          {
            term: 'breadth',
            pos: 'n',
            meaningVi: 'bề rộng, sự phóng khoáng',
          },
        ],
      },
      {
        term: 'constantly',
        pos: 'adv',
        reading: 'ˈkɒnstəntli',
        meaningVi: 'luôn luôn, liên tục, liên miên',
        example: "He's constantly experimenting with new techniques.",
        exampleVi: 'Anh ấy liên tục tìm kiếm những kỹ thuật mới.',
        extensions: [
          {
            term: 'always - invariably',
            pos: 'adv',
            meaningVi: '(đồng nghĩa) luôn luôn',
          },
          {
            term: 'often - frequently',
            pos: 'adv',
            meaningVi: '(đồng nghĩa) liên tục, thường xuyên',
          },
          {
            term: 'constant',
            pos: 'adj',
            meaningVi: 'liên tục, không ngừng',
          },
          {
            term: 'constancy',
            pos: 'n',
            meaningVi: 'tính kiên định, sự bất biến',
          },
        ],
      },
      {
        term: 'creative',
        pos: 'adj',
        reading: 'kriːeɪtɪv',
        meaningVi: 'sáng tạo, giàu trí tưởng tượng',
        example: "I'm not very creative, so I'm not very good at art.",
        exampleVi:
          'Tôi không giàu trí tưởng tượng vì vậy tôi không giỏi về nghệ thuật.',
        extensions: [
          {
            term: 'imaginative - original - ingenious - innovative - inventive',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) giàu trí tưởng tượng',
          },
          {
            term: 'uncreative - unimaginative - unoriginal',
            pos: 'adj',
            meaningVi:
              '(trái nghĩa) không sáng tạo, không giàu trí tưởng tượng',
          },
          {
            term: 'creativity',
            pos: 'n',
            meaningVi: 'sự sáng tạo',
          },
        ],
      },
      {
        term: 'disperse',
        pos: 'v',
        reading: 'dɪˈspəːs',
        meaningVi: 'giải tán',
        example: 'The crowd began to disperse after the concert.',
        exampleVi: 'Đám đông bắt đầu giải tán sau buổi nhạc.',
        extensions: [
          {
            term: 'scatter',
            pos: 'v',
            meaningVi: '(đồng nghĩa) giải tán, phân tán',
          },
          {
            term: 'dispersal',
            pos: 'n',
            meaningVi: 'sự giải tán',
          },
        ],
      },
      {
        term: 'in-depth',
        pos: 'adj',
        reading: 'ɪnˌdepθ',
        meaningVi: 'sâu sắc, hoàn toàn',
        example: 'We shall take an in-depth look at the art of that period.',
        exampleVi: 'Chúng tôi sẽ xem xét kỹ nghệ thuật trong giai đoạn đó.',
        extensions: [
          {
            term: 'complete - comprehensive - thorough',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) hoàn toàn, sâu sắc',
          },
        ],
      },
      {
        term: 'prefer',
        pos: 'v',
        reading: 'prɪˈfə(r)',
        meaningVi: 'thích hơn, ưa chuộng hơn',
        example: 'What style of art do you prefer?',
        exampleVi: 'Bạn thích loại hình nghệ thuật nào hơn?',
        extensions: [
          {
            meaningVi: 'khi thể hiện “thích B hơn A”, dùng prefer B to A.',
          },
          {
            term: 'favor',
            pos: 'v',
            meaningVi: '(đồng nghĩa) thích hơn',
          },
          {
            term: 'preference',
            pos: 'n',
            meaningVi: 'sự ưa chuộng hơn',
          },
          {
            term: 'preferable',
            pos: 'adj',
            meaningVi: 'thích hợp hơn',
          },
          {
            term: 'preferably',
            pos: 'adv',
            meaningVi: 'tốt nhất là',
          },
        ],
      },
      {
        term: 'representation',
        pos: 'n',
        reading: 'ˌreprizenˈteiʃ(ə)n',
        meaningVi: 'sự miêu tả, sự trình bày, sự đại diện, sự tượng trưng cho',
        example: "The painting is a representation of the artist's hometown.",
        exampleVi: 'Bức tranh này là một biểu trưng quê nhà của người họa sĩ.',
        extensions: [
          {
            term: 'represent',
            pos: 'v',
            meaningVi: 'trình bày',
          },
          {
            term: 'representative',
            pos: 'n',
            meaningVi: 'người đại diện',
          },
          {
            term: 'representational',
            pos: 'adj',
            meaningVi: 'tiêu biểu, tượng trưng',
          },
          {
            term: 'depiction',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự miêu tả, thuật vẽ',
          },
        ],
      },
      {
        term: 'subscribe',
        pos: 'v',
        reading: 'səbˈskraɪb',
        meaningVi: 'đồng ý, tán thành',
        example: "I don't really subscribe to the current idea of art.",
        exampleVi:
          'Tôi thực sự không đồng ý với tư tưởng nghệ thuật hiện thời.',
        extensions: [
          {
            meaningVi:
              'phải đi với to. Ngoài ra subscribe còn chỉ “đặt xem (báo, tạp chí”, hoặc “quyên góp (tổ chức từ thiện).',
          },
          {
            term: 'approve of',
            meaningVi: '(đồng nghĩa) tán thành, ưng thuận, bằng lòng',
          },
          {
            term: 'subscriber',
            pos: 'n',
            meaningVi: 'người đăng ký, người góp tiền',
          },
          {
            term: 'subscription',
            pos: 'n',
            meaningVi: 'sự tán thành',
          },
        ],
      },
      {
        term: 'urge',
        pos: 'v',
        reading: 'ˈəːdʒ',
        meaningVi: 'khuyến khích, cổ vũ',
        example:
          "I would urge everyone to just pick up a pencil and draw; it's very relaxing.",
        exampleVi:
          'Tôi khuyến khích mọi người cầm bút chì lên vẽ; nó rất thư giãn.',
        extensions: [
          {
            term: 'encourage',
            pos: 'v',
            meaningVi: '(đồng nghĩa) khuyến khích',
          },
          {
            term: 'urgent',
            pos: 'adj',
            meaningVi: 'khẩn cấp',
          },
          {
            term: 'urgently',
            pos: 'adv',
            meaningVi: 'có vẻ khẩn cấp',
          },
        ],
      },
    ],
  },
  {
    title: '9-5 Media',
    description: 'Track 42',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'assignment',
        pos: 'n',
        reading: 'əˈsaɪnmənt',
        meaningVi: 'nhiệm vụ, bổn phận',
        example:
          'For my art assignment, I have chosen photography as my medium.',
        exampleVi:
          'Vì công việc hội họa của tôi, tôi chọn nhiếp ảnh như là một bước trung gian.',
        extensions: [
          {
            term: 'assign',
            pos: 'v',
            meaningVi: 'phân công, bổ nhiệm ai',
          },
        ],
      },
      {
        term: 'choose',
        pos: 'v',
        reading: 'tʃuːz',
        meaningVi: 'chọn lựa',
        example: 'The painter chose to move to Paris.',
        exampleVi: 'Người họa sĩ này chọn chuyển đến Paris.',
        extensions: [
          {
            term: 'select - pick',
            pos: 'v',
            meaningVi: '(đồng nghĩa) chọn lựa',
          },
          {
            term: 'choice',
            pos: 'n',
            meaningVi: 'sự lựa chọn',
          },
        ],
      },
      {
        term: 'decision',
        pos: 'n',
        reading: 'dɪˈsɪʒ(ə)n',
        meaningVi: 'sự quyết định',
        example: 'What influenced your decision to paint using ink?',
        exampleVi: 'Điều gì làm bạn quyết định vẽ bằng mực?',
        extensions: [
          {
            term: 'decide',
            pos: 'v',
            meaningVi: 'quyết định',
          },
          {
            term: 'decided',
            pos: 'adj',
            meaningVi: 'đã được quyết định, kiên quyết',
          },
          {
            term: 'decisive',
            pos: 'adj',
            meaningVi: 'kiên quyết, dứt khoát',
          },
        ],
      },
      {
        term: 'disseminate',
        pos: 'v',
        reading: 'dɪˈsemɪneɪt',
        meaningVi: 'phổ biến, gieo rắc',
        example: 'She helped disseminate information about the new artist.',
        exampleVi: 'Cô ấy giúp phổ biến thông tin về người nghệ sĩ mới.',
        extensions: [
          {
            term: 'spread - broadcast - circulate',
            pos: 'v',
            meaningVi: 'lan tin, truyền tin',
          },
          {
            term: 'dissemination',
            pos: 'n',
            meaningVi: 'sự phổ biến, sự lan rộng',
          },
        ],
      },
      {
        term: 'express',
        pos: 'v',
        reading: 'ɪkˈspres',
        meaningVi: 'biểu lộ, diễn đạt',
        example: 'She used black paint to express her sad feelings.',
        exampleVi: 'Cô ấy dùng nước sơn đen để biểu đạt cảm xúc buồn đau.',
        extensions: [
          {
            term: 'show - reflect',
            pos: 'v',
            meaningVi: '(đồng nghĩa) thể hiện, phản ánh',
          },
          {
            term: 'expression',
            pos: 'n',
            meaningVi: 'sự diễn đạt',
          },
          {
            term: 'expressive',
            pos: 'adj',
            meaningVi: 'có ý nghĩa, diễn cảm',
          },
          {
            term: 'expressionism',
            pos: 'n',
            meaningVi: '(nghệ thuật) chủ nghĩa biểu hiện',
          },
        ],
      },
      {
        term: 'favor',
        pos: 'v',
        reading: 'ˈfeɪvə',
        meaningVi: 'thích hơn',
        example: 'This artist favors pencils over paint.',
        exampleVi: 'Họa sĩ này thích vẽ chì hơn vẽ sơn.',
        extensions: [
          {
            meaningVi:
              'khi thể hiện “thích A hơn B”, dùng cách nói favor A over B. favor còn có thể dùng như danh từ, chỉ “ân huệ, ủng hộ”.',
          },
          {
            term: 'prefer',
            pos: 'v',
            meaningVi: '(đồng nghĩa) thích hơn',
          },
          {
            term: 'favorable',
            pos: 'adj',
            meaningVi: 'hứa hẹn, có triển vọng',
          },
        ],
      },
      {
        term: 'specialize',
        pos: 'v',
        reading: 'ˈspeʃəlaɪz',
        meaningVi: 'làm thành đặc trưng, chuyên môn hóa',
        example: 'He specializes in sculpture, but he also likes painting.',
        exampleVi:
          'Anh ấy chuyên về điêu khắc nhưng anh ấy cũng thích hội họa.',
        extensions: [
          {
            meaningVi: 'khi chỉ “chuyên sâu về (việc gì)”, dùng giới từ in.',
          },
          {
            term: 'specialization',
            pos: 'n',
            meaningVi: 'sự chuyên môn hóa',
          },
          {
            term: 'specialist',
            pos: 'n',
            meaningVi: 'chuyên gia',
          },
          {
            term: 'specialty',
            pos: 'n',
            meaningVi: 'chuyên môn, nét đặc trưng',
          },
        ],
      },
    ],
  },
  {
    title: '10-1 Medical Insurance',
    description: 'Track 43',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'aware',
        pos: 'adj',
        reading: 'əˈweə',
        meaningVi: 'nhận thức',
        example:
          "I wasn't aware that my medical insurance didn't cover dental work.",
        exampleVi:
          'Tôi không nhận thức được rằng bảo hiểm y tế của tôi không bao gồm dịch vụ về răng.',
        extensions: [
          {
            meaningVi:
              'cách dùng be aware of sth hoặc be aware + mệnh đề that.',
          },
          {
            term: 'conscious - sensible - cognizant',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) nhận ra, có ý thức',
          },
          {
            term: 'unconscious - insensible - unaware',
            pos: 'adj',
            meaningVi: '(trái nghĩa) không có ý thức',
          },
          {
            term: 'awareness',
            pos: 'n',
            meaningVi: 'sự nhận thức',
          },
        ],
      },
      {
        term: 'convenient',
        pos: 'adj',
        reading: 'kənˈviːnɪənt',
        meaningVi: 'thuận lợi, thuận tiện',
        example: 'The clinic on Maple Drive is more convenient for me.',
        exampleVi: 'Phòng mạch ở Maple Drive thì thuận tiện hơn cho tôi.',
        extensions: [
          {
            term: 'inconvenient',
            pos: 'adj',
            meaningVi: '(trái nghĩa) bất lợi',
          },
          {
            term: 'conveniently',
            pos: 'adv',
            meaningVi: 'thuận lợi, thuận tiện',
          },
          {
            term: 'convenience',
            pos: 'n',
            meaningVi: 'sự thuận tiện',
          },
          {
            term: 'convenience store',
            meaningVi: 'cửa hàng tiện nghi',
          },
          {
            term: 'convenience food',
            meaningVi: 'thức ăn (đóng hộp, đóng gói...) rất tiện lợi',
          },
        ],
      },
      {
        term: 'limit',
        pos: 'n',
        reading: 'ˈlɪmɪt',
        meaningVi: 'giới hạn, hạn định',
        example: 'Is there a limit to how much my insurance will pay out?',
        exampleVi: 'Có một hạn định bảo hiểm của tôi sẽ trả bao nhiêu không?',
        extensions: [
          {
            meaningVi:
              'còn có thể dùng như động từ, dạng câu thường gặp limit... to, chỉ “... sẽ bị hạn chế trong phạm vi nào đó”.',
          },
          {
            term: 'upper limit',
            meaningVi: 'giới hạn trên',
          },
          {
            term: 'lower limit',
            meaningVi: 'giới hạn dưới',
          },
          {
            term: 'credit limit',
            meaningVi: 'hạn mức tín dụng',
          },
          {
            term: 'limitation',
            pos: 'n',
            meaningVi: 'sự giới hạn, hạn định',
          },
          {
            term: 'limited',
            pos: 'adj',
            meaningVi: 'hạn chế, có giới hạn',
          },
        ],
      },
      {
        term: 'manage',
        pos: 'v',
        reading: 'ˈmænidʒ',
        meaningVi: 'quản lý, điều khiển, xoay sở',
        example:
          'Did you manage to get the money back from the insurance company?',
        exampleVi: 'Bạn có xoay sở để lấy lại tiền từ công ty bảo hiểm không?',
        extensions: [
          {
            meaningVi: 'cách dùng thường gặp manage to V.',
          },
          {
            term: 'manageable',
            pos: 'adj',
            meaningVi: 'có thể quản lý',
          },
          {
            term: 'management',
            pos: 'n',
            meaningVi: 'sự quản lý, sự điều khiển',
          },
          {
            term: 'managerial',
            pos: 'adj',
            meaningVi: 'thuộc người quản lý, ban quản lý',
          },
        ],
      },
      {
        term: 'personnel',
        pos: 'n',
        reading: 'ˌpəːsəˈnel',
        meaningVi: 'nhân sự, nhân công',
        example: 'Many of the factory personnel will lose their jobs.',
        exampleVi: 'Nhiều nhân công nhà máy sẽ mất việc.',
        extensions: [
          {
            term: 'staff - employees',
            pos: 'n',
            meaningVi: 'nhân viên',
          },
          {
            term: 'human resources',
            meaningVi: 'nguồn nhân sự',
          },
        ],
      },
      {
        term: 'pertinent',
        pos: 'adj',
        reading: 'ˈpəːtɪnənt',
        meaningVi: 'thích đáng, thích hợp',
        example: 'This medication is not pertinent to your health problem.',
        exampleVi: 'Dược phẩm này không thích hợp cho bệnh trạng của bạn.',
        extensions: [
          {
            meaningVi: '“có liên quan đến...”, dùng giới từ to.',
          },
          {
            term: 'relative - relevant',
            pos: 'adj',
            meaningVi: 'thích đáng, có liên quan',
          },
          {
            term: 'irrelevant',
            pos: 'adj',
            meaningVi: 'không thích đáng',
          },
        ],
      },
      {
        term: 'policy',
        pos: 'n',
        reading: 'ˈpɒlɪsi',
        meaningVi: 'chính sách, chủ trương',
        example:
          'Your insurance policy states that you must get an official letter from your doctor.',
        exampleVi:
          'Chính sách bảo hiểm của bạn yêu cầu bạn phải có thư chính thức từ bác sĩ của bạn.',
        extensions: [
          {
            meaningVi:
              'khi policy chỉ “hợp đồng bảo hiểm”, cũng có thể nói insurance policy.',
          },
          {
            term: 'policyholder',
            pos: 'n',
            meaningVi: 'người có hợp đồng bảo hiểm',
          },
          {
            term: 'life insurance',
            meaningVi: 'bảo hiểm nhân thọ',
          },
          {
            term: 'automobile insurance',
            meaningVi: 'bảo hiểm xe',
          },
          {
            term: 'casualty insurance',
            meaningVi: 'bảo hiểm tai nạn',
          },
        ],
      },
      {
        term: 'salary',
        pos: 'n',
        reading: 'ˈsæləri',
        meaningVi: 'lương, tiền lương',
        example:
          'Your health insurance payment comes straight out of your salary every month.',
        exampleVi:
          'Bảo hiểm y tế sẽ thanh toán trực tiếp qua lương hàng tháng của bạn.',
        extensions: [
          {
            term: 'wage - pay',
            pos: 'n',
            meaningVi: '(đồng nghĩa) tiền lương',
          },
          {
            term: 'basic/base salary',
            meaningVi: 'lương căn bản',
          },
          {
            term: 'monthly salary',
            meaningVi: 'lương hàng tháng',
          },
          {
            term: 'annual/yearly salary',
            meaningVi: 'lương hàng năm',
          },
        ],
      },
      {
        term: 'statement',
        pos: 'n',
        reading: 'ˈsteɪtmənt',
        meaningVi: 'lời phát biểu, bản tuyên bố',
        example:
          'I had to sign a statement saying that my insurance claim is correct.',
        exampleVi:
          'Tôi phải ký một bản tuyên bố nói rằng lời khai bảo hiểm của tôi là chính xác.',
        extensions: [
          {
            meaningVi: '“phát biểu” có thể nói make/issue/give a statement.',
          },
          {
            term: 'bank statement',
            meaningVi: 'bản kê khai tài khoản',
          },
          {
            term: 'mission statement',
            meaningVi: 'bản kê nhiệm vụ',
          },
          {
            term: 'state',
            pos: 'v',
            meaningVi: 'nói, phát biểu',
          },
        ],
      },
    ],
  },
  {
    title: "10-2 At the Doctor's Office",
    description: 'Track 44',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'appointment',
        pos: 'n',
        reading: 'əˈpɔɪntmənt',
        meaningVi: 'cuộc hẹn gặp, sự hứa hẹn',
        example: "I have an appointment to see Dr. Jones at three o'clock.",
        exampleVi: 'Tôi có một cuộc hẹn gặp ngài Jone lúc 3 giờ.',
        extensions: [
          {
            term: 'engagement - date',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự hứa hẹn, cuộc hẹn gặp',
          },
          {
            term: 'appoint',
            pos: 'v',
            meaningVi: 'định, hẹn (ngày, giờ...)',
          },
          {
            term: 'appointed',
            pos: 'adj',
            meaningVi: 'đã được hẹn',
          },
        ],
      },
      {
        term: 'aspect',
        pos: 'n',
        reading: 'ˈæspekt',
        meaningVi: 'khía cạnh, mặt',
        example:
          'Seeing a doctor when you are sick is just one aspect of staying healthy.',
        exampleVi:
          'Đi khám bác sĩ khi bạn bệnh chỉ là một việc làm để khỏe mạnh.',
        extensions: [
          {
            term: 'angle - facet - side',
            pos: 'n',
            meaningVi: '(đồng nghĩa) khía cạnh, mặt',
          },
        ],
      },
      {
        term: 'assess',
        pos: 'v',
        reading: 'əˈses',
        meaningVi: 'đánh giá',
        example:
          'The doctor can assess your problem and tell you how best to cure it.',
        exampleVi:
          'Bác sĩ có thể đánh giá bệnh trạng của bạn và nói cho bạn cách chữa trị tốt nhất.',
        extensions: [
          {
            term: 'estimate - evaluate',
            pos: 'v',
            meaningVi: '(đồng nghĩa) đánh giá',
          },
          {
            term: 'assessment',
            pos: 'n',
            meaningVi: 'sự đánh giá',
          },
        ],
      },
      {
        term: 'authorize',
        pos: 'v',
        reading: 'ˈɔːθəraɪz',
        meaningVi: 'cho quyền, ủy quyền, cho phép',
        example:
          'I have authorized the doctor to perform all the tests he needs.',
        exampleVi:
          'Tôi cho phép bác sĩ thực hiện tất cả xét nghiệm ông ấy cần.',
        extensions: [
          {
            meaningVi: 'cách dùng authorize sb to V.',
          },
          {
            term: 'empower - allow - permit',
            pos: 'v',
            meaningVi: '(đồng nghĩa) cho phép',
          },
          {
            term: 'authority',
            pos: 'n',
            meaningVi: '(đồng nghĩa) uy quyền, quyền thế',
          },
          {
            term: 'authorization',
            pos: 'n',
            meaningVi: 'sự cho phép, sự ủy quyền',
          },
          {
            term: 'authorized',
            pos: 'adj',
            meaningVi: 'cho quyền, ủy quyền, cho phép',
          },
        ],
      },
      {
        term: 'consult',
        pos: 'v',
        reading: 'kənˈsʌlt',
        meaningVi: 'hỏi ý kiến, tham khảo',
        example: 'She consulted her doctor about her skin problem.',
        exampleVi: 'Cô ấy hỏi ý kiến bác sĩ vấn đề về da của cô ấy.',
        extensions: [
          {
            meaningVi: 'cách dùng consult sb about sth.',
          },
          {
            term: 'consulting',
            pos: 'adj',
            meaningVi: 'cố vấn, để hỏi ý kiến',
          },
          {
            term: 'consultation',
            pos: 'n',
            meaningVi: 'sự hỏi ý kiến, sự bàn bạc',
          },
          {
            term: 'consultant',
            pos: 'n',
            meaningVi: 'cố vấn, tư vấn viên',
          },
          {
            term: 'consultancy',
            pos: 'n',
            meaningVi: 'văn phòng tư vấn',
          },
        ],
      },
      {
        term: 'effective',
        pos: 'adj',
        reading: 'ɪˈfektɪv',
        meaningVi: 'có hiệu quả, hiệu nghiệm',
        example:
          "The medicine wasn't effective, so the doctor tried a different kind.",
        exampleVi:
          'Dược phẩm này không có hiệu nghiệm do đó bác sĩ thử một loại khác.',
        extensions: [
          {
            term: 'efficacious - effectual',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) có hiệu quả, hiệu nghiệm',
          },
          {
            term: 'ineffective - ineffectual',
            pos: 'adj',
            meaningVi: '(trái nghĩa) không có hiệu quả, hiệu nghiệm',
          },
          {
            term: 'effect',
            pos: 'n',
            meaningVi: 'tác dụng, hiệu quả',
          },
          {
            term: 'effectively',
            pos: 'adv',
            meaningVi: 'có hiệu quả',
          },
          {
            term: 'effectiveness',
            pos: 'n',
            meaningVi: 'sự có hiệu lực',
          },
        ],
      },
      {
        term: 'factor',
        pos: 'n',
        reading: 'ˈfæktə',
        meaningVi: 'yếu tố',
        example: 'Smoking is a major factor of many serious illnesses.',
        exampleVi:
          'Hút thuốc là một yếu tố chính yếu của nhiều căn bệnh nghiêm trọng.',
        extensions: [
          {
            term: 'element',
            pos: 'n',
            meaningVi: '(đồng nghĩa) yếu tố',
          },
          {
            term: 'deciding/decisive/determining factor',
            meaningVi: 'yếu tố quyết định',
          },
          {
            term: 'risk factor',
            meaningVi: 'yếu tố rủi ro',
          },
        ],
      },
      {
        term: 'incur',
        pos: 'v',
        reading: 'ɪnˈkɜː',
        meaningVi: 'phải gánh chịu, mắc',
        example: 'Smokers incur many health problems.',
        exampleVi: 'Người hút thuốc phải gánh chịu nhiều vấn đề về sức khỏe.',
        extensions: [
          {
            meaningVi:
              'đằng sau incur thông thường đi với những từ mang ý không tốt, ví dụ losses (tổn thất), debts (nợ)...',
          },
        ],
      },
      {
        term: 'potential',
        pos: 'n',
        reading: 'pəˈtenʃ(ə)l',
        meaningVi: 'khả năng, tiềm lực',
        example:
          'Adam is so healthy that he has the potential to live to a hundred!',
        exampleVi: 'Adam rất khỏe đến nỗi ông ấy có thể sống đến trăm tuổi!',
        extensions: [
          {
            meaningVi:
              'chỉ “có khả năng...”, thường dùng dạng câu have the potential for sth. Cũng có thể là tính từ, chỉ “có khả năng, tiềm ẩn”.',
          },
          {
            term: 'possibility',
            pos: 'n',
            meaningVi: '(đồng nghĩa) khả năng',
          },
          {
            term: 'potentially',
            pos: 'adv',
            meaningVi: 'có khả năng',
          },
          {
            term: 'potentiality',
            pos: 'n',
            meaningVi: 'tiềm năng',
          },
          {
            term: "realize/achieve/fulfill one's full potential",
            meaningVi: 'tiềm lực lý tưởng',
          },
        ],
      },
      {
        term: 'restore',
        pos: 'v',
        reading: 'rɪˈstɔː',
        meaningVi: 'khôi phục lại, hồi phục',
        example: 'The medicine soon restored my health.',
        exampleVi: 'Dược phẩm này nhanh chóng làm sức khỏe tôi hồi phục.',
        extensions: [
          {
            meaningVi:
              'thường dùng dạng câu restore sth to sth, như restore the economy to good health (khôi phục nền kinh tế đến trạng thái phồn thịnh).',
          },
          {
            term: 'restoration',
            pos: 'n',
            meaningVi: 'sự khôi phục, hồi phục',
          },
          {
            term: 'restored',
            pos: 'adj',
            meaningVi: 'được khôi phục, hồi phục',
          },
        ],
      },
      {
        term: 'serious',
        pos: 'adj',
        reading: 'ˈsɪərɪəs',
        meaningVi: 'nghiêm trọng, nguy hiểm',
        example: "The doctor said that it's nothing serious, just a cold.",
        exampleVi: 'Bác sĩ nói không có gì nghiêm trọng, chỉ cảm lạnh thôi.',
        extensions: [
          {
            meaningVi:
              'serious còn mang nghĩa “thành thật”, dạng câu thường dùng be serious about sth.',
          },
          {
            term: 'dangerous - threatening - perilous',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) nguy hiểm',
          },
          {
            term: 'seriously',
            pos: 'adv',
            meaningVi: 'nghiêm trọng, trầm trọng, nặng',
          },
          {
            term: 'seriousness',
            pos: 'n',
            meaningVi:
              'tính chất nghiêm trang, tính chất nghiêm trọng, tính chất thành thật',
          },
        ],
      },
    ],
  },
  {
    title: "10-3 At the Dentist's Office",
    description: 'Track 45',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'distraction',
        pos: 'n',
        reading: 'dɪˈstrækʃ(ə)n',
        meaningVi: 'sự xao lãng, sự giải trí, sự làm đứt quãng',
        example: 'I study in the library because there are no distractions.',
        exampleVi:
          'Tôi học trong thư viện bởi vì không có bất kỳ sự xao lãng nào.',
        extensions: [
          {
            term: 'entertainment - amusement - recreation',
            pos: 'n',
            meaningVi: 'sự giải trí',
          },
          {
            term: 'distract',
            pos: 'v',
            meaningVi: 'làm xao lãng, làm rối trí',
          },
        ],
      },
      {
        term: 'emphasize',
        pos: 'v',
        reading: 'ˈemfəsaɪz',
        meaningVi: 'nhấn mạnh',
        example:
          'The dentist emphasized the need to brush my teeth after every meal.',
        exampleVi: 'Nha sĩ nhấn mạnh rằng tôi cần đánh răng sau mỗi bữa ăn.',
        extensions: [
          {
            term: 'stress - highlight - underline',
            pos: 'v',
            meaningVi: 'nhấn mạnh, nêu bật',
          },
          {
            term: 'emphasis',
            pos: 'n',
            meaningVi: 'sự nhấn mạnh',
          },
          {
            term: 'emphatic',
            pos: 'adj',
            meaningVi: 'mạnh mẽ, dứt khoát',
          },
        ],
      },
      {
        term: 'habit',
        pos: 'n',
        reading: 'ˈhæbɪt',
        meaningVi: 'thói quen',
        example: 'Regularly watching hours of TV is a bad habit.',
        exampleVi: 'Thường xuyên xem ti vi hàng giờ là một thói quen xấu.',
        extensions: [
          {
            term: 'custom - pattern',
            pos: 'n',
            meaningVi: 'thói quen, tập tục',
          },
          {
            term: 'habitual',
            pos: 'adj',
            meaningVi: 'thường lệ, quen thuộc',
          },
        ],
      },
      {
        term: 'instrument',
        pos: 'n',
        reading: 'ˈɪnstrumənt',
        meaningVi: 'dụng cụ, công cụ, nhạc cụ',
        example: 'The dentist uses many instruments to fix teeth.',
        exampleVi: 'Nha sĩ sử dụng nhiều dụng cụ để chữa răng.',
        extensions: [
          {
            term: 'implement - device - tool',
            pos: 'n',
            meaningVi: '(đồng nghĩa) dụng cụ, công cụ',
          },
          {
            term: 'string/wind instrument',
            meaningVi: 'nhạc cụ dây/khí',
          },
        ],
      },
      {
        term: 'prevent',
        pos: 'v',
        reading: 'prɪˈvent',
        meaningVi: 'ngăn chặn',
        example: 'Brushing your teeth every day helps prevent problems later.',
        exampleVi: 'Đánh răng mỗi ngày giúp ngăn chặn những vấn đề sau này.',
        extensions: [
          {
            meaningVi:
              'cách nói “ngăn cản ai đó làm việc gì đó” là prevent sb from V-ing.',
          },
          {
            term: 'preclude',
            pos: 'v',
            meaningVi: '(đồng nghĩa) ngăn chặn',
          },
          {
            term: 'prevention',
            pos: 'n',
            meaningVi: 'sự ngăn chặn',
          },
          {
            term: 'preventable',
            pos: 'adj',
            meaningVi: 'có thể ngăn ngừa được',
          },
          {
            term: 'preventive',
            pos: 'adj',
            meaningVi: 'phòng ngừa',
          },
        ],
      },
      {
        term: 'procedure',
        pos: 'n',
        reading: 'prəˈsidʒə',
        meaningVi: 'thủ tục, quy trình, ca phẫu thuật',
        example: 'The procedure lasted only a few minutes.',
        exampleVi: 'Ca phẫu thuật kéo dài chỉ vài phút.',
        extensions: [
          {
            term: 'treatment - operation',
            pos: 'n',
            meaningVi: 'sự điều trị, ca phẫu thuật',
          },
          {
            term: 'process - course',
            pos: 'n',
            meaningVi: 'quy trình',
          },
          {
            term: 'standard procedure',
            meaningVi: 'thủ tục chuẩn',
          },
        ],
      },
      {
        term: 'regularly',
        pos: 'adv',
        reading: 'ˈregjuləli',
        meaningVi: 'định kỳ, đều đặn',
        example:
          'You must visit your dentist regularly, at least every six months.',
        exampleVi: 'Bạn phải đi khám nha sĩ đều đặn, ít nhất 6 tháng một lần.',
        extensions: [
          {
            term: 'at regular time - often',
            meaningVi: '(đồng nghĩa) thường xuyên, đều đặn',
          },
          {
            term: 'regular',
            pos: 'adj',
            meaningVi: 'đều đặn',
          },
        ],
      },
    ],
  },
  {
    title: '10-4 At the Clinic',
    description: 'Track 46',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'annually',
        pos: 'adv',
        reading: 'ˈænjuəli',
        meaningVi: 'hằng năm',
        example: 'I annually go for checkups at my clinic.',
        exampleVi: 'Tôi đi kiểm tra sức khỏe tổng quát hằng năm.',
        extensions: [
          {
            term: 'yearly',
            pos: 'adv',
            meaningVi: '(đồng nghĩa) hằng năm',
          },
          {
            term: 'annual',
            pos: 'adj',
            meaningVi: 'hằng năm',
          },
        ],
      },
      {
        term: 'concern',
        pos: 'v',
        reading: 'kənˈsəːn',
        meaningVi: 'lo lắng, quan tâm',
        example: 'I was a little concerned about the pain in my arm.',
        exampleVi: 'Tôi hơi lo lắng cho cái đau trên cánh tay.',
        extensions: [
          {
            meaningVi:
              'dạng câu thường dùng be concerned about hoặc be concerned + mệnh đề that.',
          },
          {
            term: 'disturb - bother - worry - upset',
            pos: 'v',
            meaningVi: '(đồng nghĩa) lo lắng',
          },
          {
            term: 'concerned',
            pos: 'adj',
            meaningVi: 'lo lắng',
          },
          {
            term: 'concerning',
            pos: 'prep',
            meaningVi: 'lo lắng đến ai/cái gì',
          },
        ],
      },
      {
        term: 'evident',
        pos: 'adj',
        reading: 'ˈevɪdənt',
        meaningVi: 'hiển nhiên, rành rành',
        example:
          'It was evident that she had not been taking good care of herself.',
        exampleVi: 'Rõ ràng cô ấy không tự chăm sóc mình tốt.',
        extensions: [
          {
            term: 'apparent - obvious - clear',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) rõ ràng, hiển nhiên',
          },
          {
            term: 'evidence',
            pos: 'n',
            meaningVi: 'chứng cớ, bằng chứng',
          },
        ],
      },
      {
        term: 'identify',
        pos: 'v',
        reading: 'aɪˈdentɪfaɪ',
        meaningVi: 'nhận ra, nhận diện',
        example: 'I hope the clinic can identify the problem.',
        exampleVi: 'Tôi hy vọng dưỡng đường này có thể nhận ra vấn đề.',
        extensions: [
          {
            meaningVi: 'cách dùng là identify A as B (xác định A như B).',
          },
          {
            term: 'distinguish - recognize - single out - determine',
            meaningVi: '(đồng nghĩa) phân biệt, nhận biết',
          },
          {
            term: 'identification',
            pos: 'n',
            meaningVi: 'sự nhận diện',
          },
        ],
      },
      {
        term: 'usually',
        pos: 'adv',
        reading: 'ˈjuːʒuəlɪ',
        meaningVi: 'thường thường, thông thường',
        example: 'It usually takes a few days to get the results of the test.',
        exampleVi: 'Thường mất vài ngày mới có kết quả xét nghiệm.',
        extensions: [
          {
            term: 'generally - normally - typically',
            pos: 'adv',
            meaningVi: '(đồng nghĩa) thông thường',
          },
          {
            term: 'usual',
            pos: 'adj',
            meaningVi: 'thông thường',
          },
        ],
      },
    ],
  },
  {
    title: '10-5 At the Hospital',
    description: 'Track 47',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'admit',
        pos: 'v',
        reading: 'ədˈmɪt',
        meaningVi: 'nhận vào, cho vào',
        example: "He's been admitted to the hospital for a few days.",
        exampleVi: 'Anh ấy được cho nhập viện vài ngày.',
        extensions: [
          {
            meaningVi:
              'be admitted to (the) hospital chỉ “nhập viện”; ngược lại “xuất viện” là be discharged from (the) hospital.',
          },
          {
            term: 'admission',
            pos: 'n',
            meaningVi: 'sự vào hoặc được nhận vào',
          },
        ],
      },
      {
        term: 'allow',
        pos: 'v',
        reading: 'əˈlaʊ',
        meaningVi: 'cho phép',
        example: "They don't allow you to smoke in the hospital.",
        exampleVi: 'Họ không cho phép bạn hút thuốc trong bệnh viện.',
        extensions: [
          {
            meaningVi: 'cách dùng allow sb to V. hoặc allow sb sth.',
          },
          {
            term: 'permit',
            pos: 'v',
            meaningVi: '(đồng nghĩa) cho phép',
          },
          {
            term: 'forbid - ban - prohibit',
            pos: 'v',
            meaningVi: '(trái nghĩa) cấm',
          },
          {
            term: 'allowable',
            pos: 'adj',
            meaningVi: 'được cho phép',
          },
          {
            term: 'allowance',
            pos: 'n',
            meaningVi: 'sự thừa nhận, sự công nhận',
          },
        ],
      },
      {
        term: 'alternative',
        pos: 'n',
        reading: 'ɔːlˈtəːnətɪv',
        meaningVi: 'sự thay thế, sự chọn lựa khác',
        example:
          "I don't want to go to the hospital. Are there any alternatives?",
        exampleVi: 'Tôi không muốn đến bệnh viện. Có cách nào khác không?',
        extensions: [
          {
            meaningVi:
              'dùng alternative to sth khi thể hiện “ngoài sự lựa chọn...”. Còn có thể làm tính từ, chỉ “lựa chọn (một trong hai), thay phiên nhau”.',
          },
          {
            term: 'replacement',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự thay thế',
          },
          {
            term: 'choice - option',
            pos: 'n',
            meaningVi: '(đồng nghĩa) sự lựa chọn',
          },
          {
            term: 'alternative medicine',
            meaningVi: 'thuốc thay thế',
          },
          {
            term: 'alternative energy',
            meaningVi: 'năng lượng thay thế',
          },
        ],
      },
      {
        term: 'control',
        pos: 'n',
        reading: 'kənˈtrəʊl',
        meaningVi: 'sự kiểm soát',
        example: "The doctor has brought the boy's fever under control.",
        exampleVi: 'Bác sĩ đã kiểm soát được bệnh sốt của cậu bé.',
        extensions: [
          {
            term: 'controllable',
            pos: 'adj',
            meaningVi: 'có thể kiểm soát',
          },
          {
            term: 'controlled',
            pos: 'adj',
            meaningVi: 'được kiểm soát',
          },
        ],
      },
      {
        term: 'detect',
        pos: 'v',
        reading: 'dɪˈtekt',
        meaningVi: 'phát hiện, khám phá ra',
        example: 'They have detected a problem with his blood.',
        exampleVi: 'Họ phát hiện ra máu của anh ấy có vấn đề.',
        extensions: [
          {
            term: 'find (out) - discover - notice',
            pos: 'v',
            meaningVi: '(đồng nghĩa) khám phá',
          },
          {
            term: 'miss - overlook',
            pos: 'v',
            meaningVi: '(trái nghĩa) bỏ qua',
          },
          {
            term: 'detection',
            pos: 'n',
            meaningVi: 'sự phát hiện, sự khám phá ra',
          },
          {
            term: 'detectable',
            pos: 'adj',
            meaningVi: 'có thể phát hiện ra',
          },
          {
            term: 'detective',
            pos: 'n, adj',
            meaningVi: 'thám tử trinh thám, để khám phá ra',
          },
          {
            term: 'detector',
            pos: 'n',
            meaningVi: 'người khám phá ra',
          },
        ],
      },
      {
        term: 'diagnose',
        pos: 'v',
        reading: 'ˈdaɪəgnəuz',
        meaningVi: 'chẩn đoán',
        example: 'The woman was diagnosed with cancer.',
        exampleVi: 'Người phụ nữ được chẩn đoán mắc bệnh ung thư.',
        extensions: [
          {
            meaningVi:
              '“chẩn đoán ai đó mắc bệnh gì đó” là diagnose sb with/as (having) sth, “chẩn đoán tình trạng nào đó của bệnh nào đó” là diagnose sth as sth.',
          },
          {
            term: 'diagnosis',
            pos: 'n',
            meaningVi: 'sự chẩn đoán',
          },
          {
            term: 'diagnostic',
            pos: 'adj',
            meaningVi: 'chẩn đoán',
          },
        ],
      },
      {
        term: 'monitor',
        pos: 'v',
        reading: 'ˈmɒnɪtə',
        meaningVi: 'giám sát, trông coi',
        example: 'They are monitoring his condition.',
        exampleVi: 'Họ đang giám sát tình trạng của anh ấy.',
        extensions: [
          {
            meaningVi: 'khi là danh từ chỉ “máy giám sát”.',
          },
          {
            term: 'watch - keep an eye on',
            meaningVi: 'giám sát',
          },
        ],
      },
      {
        term: 'recommendation',
        pos: 'n',
        reading: 'ˌrekəmenˈdeɪʃ(ə)n',
        meaningVi: 'sự đề nghị, sự gợi ý',
        example: "I underwent the operation on my doctor's recommendation.",
        exampleVi: 'Tôi phải trải qua ca phẫu thuật theo đề nghị của bác sĩ.',
        extensions: [
          {
            term: 'recommend',
            pos: 'v',
            meaningVi: 'đề nghị, gợi ý',
          },
        ],
      },
      {
        term: 'record',
        pos: 'n',
        reading: 'ˈrekɔːd',
        meaningVi: 'sổ sách ghi chép, hồ sơ',
        example: 'Your hospital record shows your medical history.',
        exampleVi: 'Hồ sơ của bệnh viện cho biết quá trình điều trị của bạn.',
        extensions: [
          {
            meaningVi:
              'khi là động từ chỉ “ghi chép, ghi nhận, thu âm”, phát âm [rɪ`kɔ:d].',
          },
          {
            term: 'account - history',
            pos: 'n',
            meaningVi: 'bản kê khai',
          },
        ],
      },
      {
        term: 'refer',
        pos: 'v',
        reading: 'rɪˈfɜː',
        meaningVi: 'đưa đến',
        example: 'My doctor referred me to an excellent surgeon.',
        exampleVi: 'Bác sĩ của tôi gửi cho tôi một bác sĩ phẫu thuật giỏi.',
        extensions: [
          {
            meaningVi: 'cách dùng là refer sb/sth to sb.',
          },
          {
            term: 'referral',
            pos: 'n',
            meaningVi: 'sự hướng dẫn đến chuyên gia y học',
          },
          {
            term: 'reference',
            pos: 'n',
            meaningVi: 'sự tham khảo',
          },
        ],
      },
      {
        term: 'regardless',
        pos: 'adv',
        reading: 'rɪˈgɑdlɪs',
        meaningVi: 'bất chấp, không chú ý tới',
        example:
          'Your insurance must cover you regardless of your medical history.',
        exampleVi:
          'Bảo hiểm của bạn phải chi trả cho bạn bất kể quá trình điều trị của bạn.',
        extensions: [
          {
            meaningVi: 'thường đi chung với of.',
          },
        ],
      },
      {
        term: 'result',
        pos: 'n',
        reading: 'rɪˈzʌlt',
        meaningVi: 'kết quả',
        example:
          'The results show that everything is normal and you have nothing to worry about.',
        exampleVi:
          'Kết quả cho thấy rằng mọi việc là bình thường và bạn không có gì phải lo lắng.',
        extensions: [
          {
            meaningVi:
              'cũng có thể là động từ, result from thể hiện “do, bởi vì”, result in thể hiện “dẫn đến...”.',
          },
        ],
      },
      {
        term: 'sample',
        pos: 'n',
        reading: 'ˈsaːmp(ə)l',
        meaningVi: 'vật mẫu, hàng mẫu',
        example: 'The nurse just needs to take a blood sample.',
        exampleVi: 'Y tá chỉ cần lấy mẫu máu.',
        extensions: [
          {
            meaningVi: 'sample cũng có thể xem là động từ, chỉ “thử, lấy mẫu”.',
          },
          {
            term: 'blood sample',
            meaningVi: 'mẫu máu',
          },
          {
            term: 'urine sample',
            meaningVi: 'mẫu nước tiểu',
          },
          {
            term: 'free sample',
            meaningVi: 'hàng mẫu miễn phí',
          },
        ],
      },
    ],
  },
  {
    title: 'Phrases A~E',
    description: 'Track 48',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'a collection of',
        pos: 'phrase',
        reading: 'ə kəˈlekʃ(ə)n əv',
        meaningVi: 'một bộ sưu tập, một nhóm người',
        example:
          'Our platoon consisted of a collection of farm boys from different areas around the country.',
        exampleVi:
          'Trung đội của chúng ta gồm một nhóm các cậu nông dân từ những vùng khác nhau trên khắp đất nước.',
        extensions: [
          {
            meaningVi:
              'khi thể hiện “thu thập của...”, có thể dùng tính từ vast, extensive để bổ nghĩa, như a vast collection of stamps (bộ sưu tập tem phong phú).',
          },
        ],
      },
      {
        term: 'a sense of achievement',
        pos: 'phrase',
        reading: 'ə sens əv əˈtʃiːvmənt',
        meaningVi: 'cảm giác thành đạt',
        example: 'Finishing graduate school gave Rita a sense of achievement.',
        exampleVi: 'Tốt nghiệp ở trường làm Rita có một cảm giác thành đạt.',
        extensions: [
          {
            meaningVi:
              'a sense of có thể dùng để biểu đạt những cảm giác đặc biệt nào đó, như a sense of humor (cảm giác hài hước), a sense of responsibility (ý thức trách nhiệm), a sense of security (cảm giác an toàn)...',
          },
        ],
      },
      {
        term: 'a variety of',
        pos: 'phrase',
        reading: 'ə vəˈraiəti əv',
        meaningVi: 'đa dạng',
        example: 'This store offers a variety of electronic items.',
        exampleVi: 'Cửa hàng này cung cấp đa dạng các mặt hàng điện tử.',
        extensions: [
          {
            meaningVi:
              'variety cũng được xem là danh từ không đếm được, chỉ “đa dạng, muôn màu muôn vẻ”, give/add variety to sth là “khiến vật nào đó trở nên đa dạng, thú vị”.',
          },
        ],
      },
      {
        term: 'abide by',
        pos: 'phrase',
        reading: 'əˈbaid bai',
        meaningVi: 'tuân theo',
        example: 'You must abide by the contract.',
        exampleVi: 'Bạn phải tuân thủ hợp đồng này.',
        extensions: [
          {
            meaningVi:
              'khi abide giải thích là “tuân thủ”, cần có giới từ by. Ngoài ra, abide còn chỉ “chịu đựng, nhẫn nhịn”, ý gần với stand, tolerate.',
          },
          {
            term: 'stick to - comply with - adhere to',
            meaningVi: 'tuân thủ, tuân theo',
          },
        ],
      },
      {
        term: 'account for',
        pos: 'phrase',
        reading: 'əˈkaunt fɔː',
        meaningVi: 'giải thích nguyên nhân gây ra việc gì',
        example: 'I can account for my lateness.',
        exampleVi: 'Tôi có thể giải thích lí do tôi đi trễ.',
        extensions: [
          {
            meaningVi:
              'account cũng được coi là danh từ, give a detailed account of sth thể hiện “thuyết minh tường tận, giải thích việc gì đó”.',
          },
          {
            term: 'explain',
            pos: 'v',
            meaningVi: '(đồng nghĩa) giải thích',
          },
          {
            term: 'on account',
            meaningVi: 'do, vì',
          },
          {
            term: 'on account of',
            meaningVi: 'do cái gì',
          },
        ],
      },
      {
        term: 'add flavor to sth',
        pos: 'phrase',
        reading: 'æd fleivə tu',
        meaningVi: 'thêm hương vị vào việc gì',
        example:
          'Craig and Naomi are taking an evening class together in order to add flavor to their marriage.',
        exampleVi:
          'Craig và Naomi cùng nhau tham gia lớp học buổi tối để thêm sự lãng mạn cho cuộc hôn nhân của họ.',
        extensions: [
          {
            meaningVi:
              'đằng sau đi với danh từ trừu tượng, như relationship, romance..., thể hiện “để tình cảm thêm nồng nàn”.',
          },
          {
            term: 'flavor of the month',
            meaningVi: 'nhân vật trong tháng',
          },
        ],
      },
      {
        term: 'apply for',
        pos: 'phrase',
        reading: 'əˈplai fɔː',
        meaningVi: 'đưa ra một yêu cầu chính thức',
        example: 'Do we need to apply for a license to fish in this river?',
        exampleVi:
          'Chúng ta có cần xin giấy phép để câu cá ở con sông này không?',
        extensions: [
          {
            meaningVi:
              'issue a license thể hiện “cấp giấy phép”; ngược lại revoke a license là “thu hồi giấy phép”.',
          },
          {
            term: 'apply oneself to V-ing',
            meaningVi: 'chú tâm, chuyên tâm',
          },
          {
            term: 'apply to',
            meaningVi: 'tiếp xúc với ai để biết tin',
          },
        ],
      },
      {
        term: 'as a matter of fact',
        pos: 'phrase',
        reading: 'æz əˈmætə əv fækt',
        meaningVi: 'trên thực tế, sự thật',
        example: "As a matter of fact, I don't really like Japanese food.",
        exampleVi: 'Trên thực tế, tôi thật sự không thích thức ăn Nhật Bản.',
        extensions: [
          {
            term: 'in fact - in truth - in reality - actually',
            meaningVi: 'trên thực tế, sự thật',
          },
        ],
      },
      {
        term: 'as a result of',
        pos: 'phrase',
        reading: 'æz ə riˈzʌlt əv',
        meaningVi: 'do kết quả của, vì',
        example:
          "The company's quality standards went down as a result of the increase in new, untrained workers.",
        exampleVi:
          'Tiêu chuẩn chất lượng của công ty giảm do kết quả của việc tăng nhân viên mới chưa được huấn luyện.',
        extensions: [
          {
            term: 'as a consequence of - because of - owing to - due to',
            meaningVi: 'do, vì',
          },
        ],
      },
      {
        term: 'as needed',
        pos: 'phrase',
        reading: 'æz niːdid',
        meaningVi: 'phòng khi cần',
        example: 'You can put paper in the printer as needed.',
        exampleVi: 'Bạn có thể đặt giấy vào máy in phòng khi cần.',
        extensions: [
          {
            term: 'in need',
            meaningVi: 'khi cần, lúc khó khăn',
          },
          {
            term: 'in need of',
            meaningVi: 'cần cái gì',
          },
          {
            term: 'if necessary',
            meaningVi: 'nếu cần thiết',
          },
        ],
      },
      {
        term: 'at a discount',
        pos: 'phrase',
        reading: 'æt ə ˈdiskaunt',
        meaningVi: 'hạ giá, giảm giá',
        example: 'We bought these car parts at a discount.',
        exampleVi: 'Chúng tôi đã mua những phụ tùng ô tô này lúc giảm giá.',
        extensions: [
          {
            meaningVi:
              'khi thể hiện vật phẩm nào được chiết khấu dùng giới từ on, ví dụ a discount on books.',
          },
          {
            term: 'offer/give sb a discount',
            meaningVi: 'giảm giá cho ai',
          },
          {
            term: 'discount price',
            meaningVi: 'giá chiết khấu',
          },
          {
            term: 'discount store',
            meaningVi: 'cửa hàng giảm giá',
          },
        ],
      },
      {
        term: "at sb's expense",
        pos: 'phrase',
        reading: 'æt ikˈspens',
        meaningVi: 'bằng mồ hôi nước mắt của ai đó',
        example:
          "It's not funny. You're making the joke at your son's expense.",
        exampleVi:
          'Nó không đáng cười. Bạn đang đùa với mồ hôi nước mắt của con trai bạn.',
        extensions: [
          {
            meaningVi:
              "cụm từ này còn thể hiện “chi tiền của ai đó”, dạng câu thường dùng do sth at sb's expense.",
          },
          {
            term: 'at the expense of sb/sth',
            meaningVi: 'do ai/việc gì chịu phí tổn',
          },
          {
            term: 'medical/travel expenses',
            meaningVi: 'chi phí y tế/du lịch',
          },
        ],
      },
      {
        term: 'attract criticism',
        pos: 'phrase',
        reading: 'əˈtrækt ˈkritisiz(ə)m',
        meaningVi: 'gây chỉ trích',
        example:
          "If the company doesn't support environmental initiatives, it will attract criticism.",
        exampleVi:
          'Nếu công ty không ủng hộ những sáng kiến liên quan đến môi trường thì nó sẽ bị chỉ trích.',
        extensions: [
          {
            meaningVi:
              'còn có thể nói draw criticism hoặc come in for criticism.',
          },
          {
            term: 'take/accept criticism',
            meaningVi: 'chấp nhận bình phẩm',
          },
          {
            term: 'constructive criticism',
            meaningVi: 'phê bình xây dựng',
          },
        ],
      },
      {
        term: "attract one's attention",
        pos: 'phrase',
        reading: 'əˈtrækt wʌnz əˈtenʃ(ə)n',
        meaningVi: 'thu hút sự chú ý',
        example: 'The billboard attracts our attention.',
        exampleVi: 'Bảng thông báo thu hút sự chú ý của chúng ta.',
        extensions: [
          {
            meaningVi: 'có thể thay thế attract bằng catch, get.',
          },
          {
            term: "bring sth to sb's attention",
            meaningVi: 'làm cho ai chú ý',
          },
          {
            term: 'pay attention to',
            meaningVi: 'chú ý, quan tâm',
          },
        ],
      },
      {
        term: 'be accustomed to',
        pos: 'phrase',
        reading: 'biː əˈkʌstəmd tu',
        meaningVi: 'quen với',
        example: 'Mr. Derek is accustomed to these very formal events.',
        exampleVi: 'Ông Derek đã quen với những sự kiện trang trọng này.',
        extensions: [
          {
            meaningVi:
              'accustomed to ngoài đi với be, còn có thể đi với become, get, grow..., có ý “dần dần quen với, thích ứng...”.',
          },
          {
            term: 'be/get used to',
            meaningVi: '(đồng nghĩa) quen với',
          },
        ],
      },
      {
        term: 'be aware of',
        pos: 'phrase',
        reading: 'biː əˈweə əʌ',
        meaningVi: 'biết, nhận thức, nhận thấy',
        example:
          'Are you aware of the extra hours that come with the position?',
        exampleVi: 'Bạn có nhận thấy vị trí này mang lại thêm giờ không?',
        extensions: [
          {
            meaningVi: 'còn có thể dùng be aware + mệnh đề that.',
          },
          {
            term: 'be conscious of',
            meaningVi: '(đồng nghĩa) nhận thức, biết',
          },
          {
            term: 'be unaware of',
            meaningVi: '(trái nghĩa) không biết, không nhận thức',
          },
        ],
      },
      {
        term: 'be filled to capacity',
        pos: 'phrase',
        reading: 'biː fild tu kəˈpæsiti',
        meaningVi: 'đầy chỗ',
        example: 'The stadium was filled to capacity.',
        exampleVi: 'Sân vận động đã đầy chỗ.',
        extensions: [
          {
            term: 'at full capacity',
            meaningVi: 'đầy chỗ',
          },
          {
            term: 'have a capacity of',
            meaningVi: 'có sức chứa',
          },
        ],
      },
      {
        term: 'be high on the agenda',
        pos: 'phrase',
        reading: 'biː hai ɒn əˈdʒendə',
        meaningVi: 'trọng yếu',
        example: 'Getting the budget passed will be high on the agenda.',
        exampleVi:
          'Làm cho ngân sách này được thông qua là trọng điểm của buổi hội nghị.',
        extensions: [
          {
            meaningVi: 'còn có thể nói be top of the agenda.',
          },
        ],
      },
      {
        term: 'be in the red',
        pos: 'phrase',
        reading: 'biː in ðə red',
        meaningVi: 'mắc nợ, làm ăn thua lỗ',
        example:
          "I wouldn't invest in this company if I were you. They've been in the red for the past seven years.",
        exampleVi:
          'Tôi sẽ không đầu tư vào công ty này nếu tôi là bạn. Họ đã làm ăn thua lỗ trong suốt 7 năm qua.',
        extensions: [
          {
            term: 'be in the black',
            meaningVi: '(trái nghĩa) có tiền',
          },
          {
            term: 'be on red alert',
            meaningVi: 'cảnh giác',
          },
        ],
      },
      {
        term: 'be made of',
        pos: 'phrase',
        reading: 'biː meid əv',
        meaningVi: 'được làm bằng',
        example:
          'The desks are all made of dark wood, which looks very professional.',
        exampleVi:
          'Những chiếc bàn này đều được làm bằng gỗ sậm màu, trông rất chuyên nghiệp.',
        extensions: [
          {
            meaningVi:
              'thể hiện “vật nào đó do chất liệu nào đó tạo thành”, dùng dạng câu be made out of sth.',
          },
          {
            term: 'consist of - be composed of',
            meaningVi: '(đồng nghĩa) được làm bằng',
          },
        ],
      },
      {
        term: 'be ready for',
        pos: 'phrase',
        reading: 'biː ˈredi fɔː',
        meaningVi: 'sẵn sàng',
        example: 'So, are you ready for your retirement?',
        exampleVi: 'Anh đã sẵn sàng về hưu chưa?',
        extensions: [
          {
            meaningVi: 'cũng có thể dùng dạng câu be ready to do sth.',
          },
        ],
      },
      {
        term: 'bind sb to do sth',
        pos: 'phrase',
        reading: 'baind tu duː',
        meaningVi: 'bắt buộc ai làm việc gì',
        example:
          'The contract binds Alex to play for the Giants for the next six years.',
        exampleVi:
          'Hợp đồng này buộc Alex làm việc cho Giants khoảng 6 năm tới.',
        extensions: [
          {
            term: 'in a bind',
            meaningVi: 'bị ràng buộc',
          },
        ],
      },
      {
        term: 'bring in',
        pos: 'phrase',
        reading: 'briŋ in',
        meaningVi: 'đem lại (lợi tức)',
        example:
          'Answering the phone quickly helps a business bring in more sales.',
        exampleVi:
          'Trả lời điện thoại nhanh chóng giúp đem lại nhiều doanh số hơn cho việc kinh doanh.',
        extensions: [
          {
            meaningVi:
              'ngoài ra, bring sb in to do sth có ý “mời ai đó tham gia việc gì đó, tuyển ai đó”.',
          },
        ],
      },
      {
        term: 'bring together',
        pos: 'phrase',
        reading: 'briŋ tuˈgeðə',
        meaningVi: 'nhóm lại, họp lại',
        example:
          'All her old colleagues were brought together for her retirement party.',
        exampleVi:
          'Tất cả đồng nghiệp cũ của cô ấy đã cùng họp lại để tham gia buổi tiệc nghỉ hưu của cô.',
      },
      {
        term: 'bring sth under control',
        pos: 'phrase',
        reading: 'briŋ sth ˈʌndə kənˈtrəul',
        meaningVi: 'kiểm soát được việc gì đó',
        example:
          'The firefighters worked throughout the night to bring the fire under control.',
        exampleVi:
          'Lính chữa cháy đã làm việc suốt đêm để dập tắt được đám cháy.',
        extensions: [
          {
            term: 'take control of sth',
            meaningVi: 'kiểm soát việc gì đó',
          },
          {
            term: 'lose control of sth',
            meaningVi: 'mất kiểm soát việc gì',
          },
          {
            term: 'out of control',
            meaningVi: 'ngoài tầm kiểm soát',
          },
        ],
      },
      {
        term: 'bring up',
        pos: 'phrase',
        reading: 'briŋ ʌp',
        meaningVi: 'nêu lên, đưa ra (vấn đề)',
        example:
          'Does anyone want to bring up anything else before we close the meeting?',
        exampleVi:
          'Còn ai muốn đưa ra vấn đề gì trước khi chúng ta kết thúc buổi họp không?',
        extensions: [
          {
            meaningVi: 'bring up còn chỉ “dưỡng dục (trẻ nhỏ)”.',
          },
          {
            term: 'raise',
            pos: 'v',
            meaningVi: '(đồng nghĩa) nêu lên, đưa ra',
          },
        ],
      },
      {
        term: "broaden one's horizons",
        pos: 'phrase',
        reading: 'brɔːdən wʌnz həˈraiz(ə)n',
        meaningVi: 'mở rộng tầm nhìn',
        example:
          'The reason Sabrina is traveling around the world is that she hopes to broaden her horizons.',
        exampleVi:
          'Lý do Sabrina du lịch vòng quanh thế giới là cô ấy muốn mở rộng tầm nhìn của mình.',
        extensions: [
          {
            meaningVi:
              "còn có thể nói expand one's horizons, chú ý horizon phải dùng dạng số nhiều.",
          },
          {
            term: "broaden one's mind",
            meaningVi: 'mở rộng hiểu biết',
          },
          {
            term: 'on the horizon',
            meaningVi: 'sắp xảy ra đến nơi (sự việc)',
          },
        ],
      },
      {
        term: 'build up',
        pos: 'phrase',
        reading: 'bild ʌp',
        meaningVi: 'xây dựng, thành lập',
        example: 'She has built up an extensive portfolio over the years.',
        exampleVi:
          'Cô ấy đã thiết lập một nguồn vốn đầu tư khổng lồ nhiều năm qua.',
        extensions: [
          {
            meaningVi:
              'build sth up into chỉ “khiến vật nào đó phát triển thành...”, như build the small hotel up into a five-star resort (khiến căn khách sạn nhỏ này trở thành khu nghỉ mát năm sao).',
          },
        ],
      },
      {
        term: 'cash on delivery',
        pos: 'phrase',
        reading: 'kæʃ ɒn diˈliv(ə)ri',
        meaningVi: 'trả tiền lúc nhận hàng',
        example: 'Payment for this item will be cash on delivery.',
        exampleVi: 'Mặt hàng này sẽ được trả tiền lúc nhận hàng.',
      },
      {
        term: 'carry out',
        pos: 'phrase',
        reading: 'ˈkæri aut',
        meaningVi: 'tiến hành, thực hiện',
        example:
          'The officer carried out the assignment in a professional manner.',
        exampleVi:
          'Viên chức này thực hiện nhiệm vụ với tác phong chuyên nghiệp.',
        extensions: [
          {
            meaningVi:
              'thường đi với các từ plan (kế hoạch), promise (lời hứa), order (mệnh lệnh), instruction (hướng dẫn)..., có ý “hoàn thành, chấp hành”.',
          },
        ],
      },
      {
        term: 'check in',
        pos: 'phrase',
        reading: 'tʃek in',
        meaningVi: 'đăng ký, ghi tên khi đến',
        example:
          "You need to check in first, or you won't be able to get on the plane.",
        exampleVi: 'Muốn lên máy bay bạn phải đăng ký tên trước đã.',
      },
      {
        term: 'come as a surprise',
        pos: 'phrase',
        reading: 'kʌm æz ə səːˈpraiz',
        meaningVi: 'bất ngờ, đáng ngạc nhiên',
        example:
          "I didn't know that you were married. That really comes as a surprise!",
        exampleVi: 'Tôi không biết bạn đã kết hôn. Điều đó thực sự bất ngờ!',
        extensions: [
          {
            meaningVi:
              'đằng sau cụm từ có thể đi với giới từ to, thể hiện “(việc gì đó xảy ra bất ngờ) khiến ai đó cảm thấy kinh ngạc”.',
          },
          {
            term: 'come as no surprise',
            meaningVi: '(trái nghĩa) bình thường, chẳng có gì bất ngờ',
          },
          {
            term: "to sb's surprise",
            meaningVi: 'làm ai đó ngạc nhiên',
          },
        ],
      },
      {
        term: 'come to an agreement',
        pos: 'phrase',
        reading: 'kʌm tu ən əˈgriːmənt',
        meaningVi: 'đạt được thỏa thuận',
        example: "We still haven't come to an agreement with our supplier.",
        exampleVi:
          'Chúng tôi vẫn chưa đạt được thỏa thuận với nhà cung cấp của chúng tôi.',
        extensions: [
          {
            meaningVi:
              'thể hiện “đạt đến hiệp ước với ai đó” phải dùng giới từ with, “việc nào đó đạt đến hiệp ước”, dùng giới từ on.',
          },
          {
            term: 'reach an agreement - be in agreement',
            meaningVi: '(đồng nghĩa) đạt được thỏa thuận',
          },
        ],
      },
      {
        term: 'come under scrutiny',
        pos: 'phrase',
        reading: 'kʌm ˈʌndə ˈskruːtini',
        meaningVi: 'chịu sự kiểm soát',
        example:
          'The accounting practices of that company have come under scrutiny recently.',
        exampleVi:
          'Gần đây những hoạt động kiểm toán của công ty đó đều chịu sự kiểm soát.',
        extensions: [
          {
            meaningVi:
              'nếu muốn thể hiện “chấp nhận kiểm tra chi tiết, tường tận” có thể nói come under close/careful scrutiny.',
          },
        ],
      },
      {
        term: 'come up with',
        pos: 'phrase',
        reading: 'kʌm ʌp wið',
        meaningVi: 'nêu lên, nghĩ ra',
        example:
          'We discussed my salary and came up with something we were both happy with.',
        exampleVi:
          'Chúng tôi đã thảo luận mức lương của tôi và nghĩ ra một điều mà làm chúng tôi đều vui vẻ.',
        extensions: [
          {
            meaningVi:
              'dùng trong khẩu ngữ, come up with cũng có thể chỉ “quyên (tiền)”.',
          },
        ],
      },
      {
        term: 'compromise with sb on sth',
        pos: 'phrase',
        reading: 'ˈkɒmprəmaiz wið ɒn',
        meaningVi: 'nhất trí với ai về việc gì',
        example:
          "I don't think the opposition party will compromise with the ruling party on this new health bill.",
        exampleVi:
          'Tôi không nghĩ đảng đối lập sẽ nhất trí với đảng cầm quyền về dự luật y tế mới này.',
        extensions: [
          {
            meaningVi:
              'compromise cũng được xem là danh từ, cụm từ make a compromise with sb thể hiện “thực hiện một thỏa hiệp với ai đó”.',
          },
        ],
      },
      {
        term: 'concentrate on',
        pos: 'phrase',
        reading: 'ˈkɒns(ə)ntreit ɒn',
        meaningVi: 'tập trung vào',
        example: 'Justin has a lot of trouble concentrating on his homework.',
        exampleVi: 'Justin không thể tập trung vào bài tập về nhà của mình.',
        extensions: [
          {
            term: 'focus on - pay attention to',
            meaningVi: '(đồng nghĩa) tập trung vào, chú ý đến',
          },
        ],
      },
      {
        term: 'deal with',
        pos: 'phrase',
        reading: 'diːl wið',
        meaningVi: 'giải quyết, xử lý',
        example:
          "I prefer to go on organized tours so I don't have to deal with the planning.",
        exampleVi:
          'Tôi thích đi những chuyến du lịch được tổ chức sẵn để tôi không phải tự lên kế hoạch.',
        extensions: [
          {
            meaningVi:
              'deal with còn chỉ “kinh doanh, hợp tác (với ai đó)”, cùng nghĩa với do business with.',
          },
          {
            term: 'handle - be concerned with',
            meaningVi: 'giải quyết, xử lý',
          },
        ],
      },
      {
        term: 'deduct A from B',
        pos: 'phrase',
        reading: 'diˈdʌkt frəm',
        meaningVi: 'giảm từ B xuống A',
        example:
          "The accountant says they're going to deduct NT$125 from my salary.",
        exampleVi:
          'Kế toán nói rằng họ sắp giảm lương của tôi 125 đô la Đài Loan.',
        extensions: [
          {
            term: 'add A to B',
            meaningVi: '(trái nghĩa) cộng thêm/cho thêm A vào B',
          },
        ],
      },
      {
        term: 'demand a refund',
        pos: 'phrase',
        reading: 'diˈmaːnd ə riˈfʌnd',
        meaningVi: 'đòi trả lại tiền',
        example:
          'Chris demanded a refund for all the faulty toys his wife had bought at the store.',
        exampleVi:
          'Chris đòi trả lại tiền đối với tất cả món đồ chơi hỏng mà vợ anh ấy đã mua ở cửa hàng.',
        extensions: [
          {
            meaningVi: 'demand có thể được thay thế bởi ask for.',
          },
          {
            term: 'be given/get a refund',
            meaningVi: '(trái nghĩa) trả lại tiền',
          },
        ],
      },
      {
        term: 'drive a hard bargain',
        pos: 'phrase',
        reading: 'draiv ə haːd ˈbaːgin',
        meaningVi: 'cò kè bớt một thêm hai, mặc cả',
        example:
          'Eric knocked thirty percent off the original price. He drives a hard bargain.',
        exampleVi:
          'Eric cò kè bớt một thêm hai, cuối cùng cũng bớt được 30% so với giá gốc.',
        extensions: [
          {
            meaningVi: 'cũng có thể nói strike a hard bargain.',
          },
        ],
      },
      {
        term: 'drive sb to distraction',
        pos: 'phrase',
        reading: 'draiv sb tu disˈtrækʃ(ə)n',
        meaningVi: 'khiến ai đó phát điên',
        example:
          'The noise from the construction going on next door is driving me to distraction.',
        exampleVi:
          'Tiếng ồn của công trình xây dựng bên cạnh làm tôi sắp phát điên lên.',
        extensions: [
          {
            term: 'drive sb to desperation',
            meaningVi: 'làm ai tuyệt vọng, dồn ai vào thế cùng',
          },
          {
            term: 'drive sb crazy/mad',
            meaningVi: 'làm ai phát điên',
          },
        ],
      },
    ],
  },
  {
    title: 'Phrases F~J',
    description: 'Track 49',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'fail to',
        pos: 'phrase',
        reading: 'feil tu',
        meaningVi: 'quên',
        example:
          "The florist failed to bring the flowers on time, so I don't think we should pay him.",
        exampleVi:
          'Người bán hoa quên mang hoa đến đúng giờ vì thế tôi nghĩ chúng ta không nên trả tiền cho anh ấy.',
        extensions: [
          {
            meaningVi: 'sau to phải là động từ nguyên mẫu.',
          },
          {
            term: 'fail sb',
            meaningVi: 'lờ đi, quên, thất bại',
          },
          {
            term: 'achieve - accomplish - succeed',
            pos: 'v',
            meaningVi: '(trái nghĩa) đạt được, thành công',
          },
          {
            term: 'manage to',
            meaningVi: '(trái nghĩa) có thể hoàn thành',
          },
        ],
      },
      {
        term: 'fall into (a category)',
        pos: 'phrase',
        reading: 'fɔːl ˈintu',
        meaningVi: 'xếp vào loại',
        example:
          "I don't know if this kind of music falls into a specific category.",
        exampleVi:
          'Tôi không biết liệu loại nhạc này có được xếp vào loại đặc biệt hay không.',
        extensions: [
          {
            meaningVi: 'còn có thể nói belong in/fit into (a category).',
          },
        ],
      },
      {
        term: 'figure out',
        pos: 'phrase',
        reading: 'ˈfigə aut',
        meaningVi: 'hiểu ra, tìm ra, giải quyết',
        example: "I can't figure out how to use the fax machine.",
        exampleVi: 'Tôi không thể nghĩ ra cách sử dụng máy fax này.',
        extensions: [
          {
            meaningVi:
              'thường dùng để thể hiện “tìm được phương pháp giải quyết vấn đề”, hoặc “nắm rõ triệt để ai hay việc gì đó”, và thường đi với từ nghi vấn, như how, what, why...',
          },
          {
            term: 'solve - work out',
            meaningVi: '(đồng nghĩa) giải quyết, tìm ra',
          },
        ],
      },
      {
        term: 'fill out',
        pos: 'phrase',
        reading: 'fil aut',
        meaningVi: 'điền vào',
        example: 'Please fill out the tax form using a black pen.',
        exampleVi: 'Vui lòng điền vào đơn thuế này bằng bút đen.',
        extensions: [
          {
            term: 'fill in',
            meaningVi: '(đồng nghĩa) điền vào, ghi vào',
          },
          {
            term: 'fill up with',
            meaningVi: 'lấp đầy với, điền vào đầy đủ',
          },
        ],
      },
      {
        term: 'follow a procedure',
        pos: 'phrase',
        reading: 'ˈfɒləu ə prəˈsiːdʒə',
        meaningVi: 'theo thủ tục, theo quy trình',
        example: 'Being a phone operator requires following a procedure.',
        exampleVi:
          'Là một nhân viên trực tổng đài điện thoại đòi hỏi phải theo quy trình.',
        extensions: [
          {
            meaningVi:
              'khi procedure làm danh từ, có thể thể hiện “trình tự, các bước”, thường có động từ follow đi trước, đằng sau thường đi với undergo.',
          },
        ],
      },
      {
        term: 'follow up',
        pos: 'phrase',
        reading: 'ˈfɒləu ʌp',
        meaningVi: 'bồi thêm, thêm vào',
        example:
          'It is important to follow up an interview with a thank-you e-mail.',
        exampleVi:
          'Việc gửi thêm một bức thư điện tử cám ơn sau khi phỏng vấn là rất quan trọng.',
        extensions: [
          {
            meaningVi:
              'follow-up có thể xem là danh từ, chỉ “hành động kế tục”, hoặc làm tính từ, thể hiện “thuộc về kế tục”, như follow-up action (động tác kế tục), follow-up care (chăm sóc kế tục).',
          },
        ],
      },
      {
        term: 'for the duration (of sth)',
        pos: 'phrase',
        reading: 'fɔː ðə djuˈreiʃ(ə)n',
        meaningVi: 'khoảng của việc gì, suốt',
        example:
          'As the office was freezing, Wendy felt uncomfortable for the duration of the meeting.',
        exampleVi:
          'Vì khi văn phòng lạnh cóng, Wendy cảm thấy không thoải mái trong suốt buổi họp.',
        extensions: [
          {
            meaningVi:
              "khi thể hiện “thời gian bao lâu”, có thể trực tiếp thêm duration ngay sau thời gian, như five days' duration (thời gian 5 ngày).",
          },
        ],
      },
      {
        term: 'gather around',
        pos: 'phrase',
        reading: 'ˈgæðə əˈraund',
        meaningVi: 'tập hợp xung quanh',
        example: 'We gathered around the Christmas tree to open the presents.',
        exampleVi: 'Chúng tôi tụ họp quanh cây thông Noel để mở quà.',
        extensions: [
          {
            meaningVi:
              'tiếng Anh của người Anh, thường thay thế round bằng around.',
          },
        ],
      },
      {
        term: 'get out of',
        pos: 'phrase',
        reading: 'get aut əv',
        meaningVi: 'gạt bỏ, loại bỏ, không thực hiện',
        example:
          "Ken got out of the company picnic by claiming he had a doctor's appointment.",
        exampleVi:
          'Ken không tham gia chuyến dã ngoại của công ty bằng cách tuyên bố anh ấy có cuộc hẹn với bác sĩ.',
        extensions: [
          {
            meaningVi:
              'còn chỉ “ngừng làm việc gì đó” hoặc “rút lui từ việc gì”.',
          },
          {
            term: 'get sth out of sb',
            meaningVi: '(dễ nhầm) gạt bỏ gì ra khỏi ai',
          },
        ],
      },
      {
        term: 'give sb a thrill',
        pos: 'phrase',
        reading: 'giv sb ə θril',
        meaningVi: 'cuốn hút, gây hứng thú',
        example: 'Investing in the stock market gives Warren a thrill.',
        exampleVi: 'Việc đầu tư vào thị trường chứng khoán cuốn hút Warren.',
        extensions: [
          {
            term: 'get a thrill out of doing sth',
            meaningVi: 'gạt bỏ ham muốn, đam mê',
          },
          {
            term: 'be thrilled to bits',
            meaningVi: 'cao hứng',
          },
        ],
      },
      {
        term: 'give sb/sth the green light',
        pos: 'phrase',
        reading: 'giv sb/sth ðə griːn lait',
        meaningVi: 'cho phép ai/việc gì xảy ra, bật đèn xanh cho ai/việc gì',
        example:
          "She's still waiting for her boss to give her the green light.",
        exampleVi: 'Cô ấy vẫn chờ ông chủ cho phép.',
        extensions: [
          {
            term: 'give permission/the OK/the go-ahead',
            meaningVi: '(đồng nghĩa) cho phép',
          },
        ],
      },
      {
        term: 'go ahead',
        pos: 'phrase',
        reading: 'gəu əˈhed',
        meaningVi: 'tiến lên, thẳng tiến, tiến hành',
        example: 'Peter, would you like to go ahead and start the meeting?',
        exampleVi: 'Anh có muốn tiến hành và bắt đầu cuộc họp chưa, Peter?',
        extensions: [
          {
            meaningVi:
              'go ahead thường dùng dưới dạng khẩu ngữ, thể hiện “cho phép ai đó làm việc nào đó”.',
          },
        ],
      },
      {
        term: 'go into a profession',
        pos: 'phrase',
        reading: 'gəu intu ə prəˈfeʃ(ə)n',
        meaningVi: 'hướng vào một chuyên môn',
        example:
          'When Henry was a boy, his father often encouraged him to go into a profession.',
        exampleVi:
          'Cha Henry thường khuyến khích cậu ấy hướng vào một chuyên môn từ khi cậu chỉ là một đứa bé.',
        extensions: [
          {
            meaningVi:
              'go into có thể thay thế bằng enter, join. Ngoài ra, đằng sau go into đi trực tiếp với tên nghề nghiệp, thể hiện “làm nghề nào đó”, như go into medicine (làm nghề dược), go into law (làm việc về pháp luật).',
          },
          {
            term: 'by profession',
            meaningVi: 'chuyên nghiệp',
          },
        ],
      },
      {
        term: 'go on an excursion',
        pos: 'phrase',
        reading: 'gəu ɒn ən ikˈskɜːʃ(ə)n',
        meaningVi: 'tiếp tục cuộc hành trình',
        example: 'My mother will go on an excursion this afternoon.',
        exampleVi: 'Trưa nay, mẹ tôi sẽ tiếp tục cuộc hành trình.',
        extensions: [
          {
            meaningVi: 'đằng sau cụm từ này thường đi với to + nơi chốn.',
          },
        ],
      },
      {
        term: 'go to waste',
        pos: 'phrase',
        reading: 'gəu tu weist',
        meaningVi: 'lãng phí, phung phí',
        example: "Eat up! I don't want all of this cake to go to waste.",
        exampleVi: 'Hãy ăn hết đi! Tôi không muốn bạn bỏ phí cái bánh này.',
        extensions: [
          {
            term: 'a waste of time/effort/money',
            meaningVi: 'lãng phí thời gian/sức lực/tiền của',
          },
        ],
      },
      {
        term: 'have a reputation for',
        pos: 'phrase',
        reading: 'hæv ə repjuˈteiʃ(ə)n fɔː',
        meaningVi: 'nổi tiếng nhờ',
        example: 'Toyota has a reputation for making durable cars.',
        exampleVi: 'Toyota nổi tiếng nhờ sản xuất những chiếc ô tô bền bỉ.',
        extensions: [
          {
            meaningVi:
              '“lấy danh tiếng là...” cần dùng giới từ as, như have a reputation as a great cook.',
          },
          {
            term: 'earn/gain/establish a reputation',
            meaningVi: 'tạo dựng/thiết lập thanh danh',
          },
        ],
      },
      {
        term: 'in association with',
        pos: 'phrase',
        reading: 'in əsəusiˈeiʃ(ə)n wið',
        meaningVi: 'hợp tác với, liên kết với',
        example:
          'The company is developing a new line of fall fashions in association with this designer.',
        exampleVi:
          'Công ty đang hợp tác với nhà thiết kế này để phát triển dòng thời trang mới cho mùa thu.',
        extensions: [
          {
            term: 'in cooperation with',
            meaningVi: '(đồng nghĩa) hợp tác với',
          },
          {
            term: 'association between A and B',
            meaningVi: 'sự hợp tác giữa A và B',
          },
        ],
      },
      {
        term: 'in case of',
        pos: 'phrase',
        reading: 'in keis əv',
        meaningVi: 'nếu cái gì xảy ra',
        example: 'In case of fire, pull this lever.',
        exampleVi: 'Nếu xảy ra hỏa hoạn thì hãy kéo cái cần gạt này.',
        extensions: [
          {
            term: 'in any case',
            meaningVi: 'trong bất kỳ trường hợp nào, bất luận thế nào',
          },
          {
            term: 'in that case',
            meaningVi: 'trong trường hợp đó, nếu vậy',
          },
          {
            term: 'a case in point',
            meaningVi: 'ví dụ thích hợp đối với vấn đề đang tranh luận',
          },
        ],
      },
      {
        term: 'in charge of',
        pos: 'phrase',
        reading: 'in tʃaːdʒ əv',
        meaningVi: 'chịu trách nhiệm',
        example: 'Someone needs to be in charge of watering the plants.',
        exampleVi: 'Ai đó cần chịu trách nhiệm việc tưới cây.',
        extensions: [
          {
            term: 'be responsible for',
            meaningVi: '(đồng nghĩa) chịu trách nhiệm',
          },
          {
            term: 'take charge of',
            meaningVi: 'chịu trách nhiệm, đảm đương',
          },
          {
            term: "in/under sb's charge",
            meaningVi: 'trách nhiệm, bổn phận của ai',
          },
        ],
      },
      {
        term: 'in fashion',
        pos: 'phrase',
        reading: 'in ˈfæʃ(ə)n',
        meaningVi: 'hợp thời trang, mốt',
        example: 'Miniskirts are in fashion again this spring.',
        exampleVi: 'Váy ngắn lại là mốt trong mùa xuân này.',
        extensions: [
          {
            term: 'in style',
            meaningVi: '(đồng nghĩa) mốt, hợp thời trang',
          },
          {
            term: 'all the fashion',
            meaningVi: 'phổ biến, hợp thời',
          },
          {
            term: 'be/go out of fashion',
            meaningVi: 'hợp thời/lỗi thời',
          },
        ],
      },
      {
        term: 'in good condition',
        pos: 'phrase',
        reading: 'in gud kənˈdiʃ(ə)n',
        meaningVi: 'trong tình trạng tốt',
        example: 'This secondhand car is still in good condition.',
        exampleVi: 'Chiếc ô tô sử dụng rồi vẫn còn tốt.',
        extensions: [
          {
            meaningVi:
              'thể hiện “trạng thái rất tốt” có thể nói in excellent condition.',
          },
          {
            term: 'in poor condition',
            meaningVi: '(trái nghĩa) trong tình trạng tồi tệ',
          },
          {
            term: 'out of condition',
            meaningVi: 'không khỏe mạnh',
          },
        ],
      },
      {
        term: 'in order of priority',
        pos: 'phrase',
        reading: 'in ɔːðə əv praiˈɒriti',
        meaningVi: 'thứ tự ưu tiên',
        example:
          "If there are more requests than the number of places available, they'll be dealt with in order of priority.",
        exampleVi:
          'Nếu có nhiều yêu cầu hơn số chỗ sẵn có thì họ sẽ giải quyết theo thứ tự ưu tiên.',
        extensions: [
          {
            meaningVi:
              'in order of thể hiện theo trình tự nào đó, như in order of importance (theo thứ tự tầm quan trọng), in order of preference (theo thứ tự ưu tiên).',
          },
          {
            term: 'take priority',
            meaningVi: 'ưu tiên',
          },
        ],
      },
      {
        term: 'in session',
        pos: 'phrase',
        reading: 'in ˈseʃ(ə)n',
        meaningVi: 'đang họp',
        example: 'Court is in session now. Would everybody please sit down?',
        exampleVi:
          'Bây giờ phiên tòa đang diễn ra. Mọi người vui lòng ngồi xuống?',
        extensions: [
          {
            term: 'between sessions - in closed session',
            meaningVi: '(trái nghĩa) thời gian giải lao',
          },
        ],
      },
      {
        term: 'in stock',
        pos: 'phrase',
        reading: 'in stɒk',
        meaningVi: 'tồn kho, cất trong kho',
        example: 'We have lots of paper in stock.',
        exampleVi: 'Chúng tôi còn nhiều giấy trong kho.',
        extensions: [
          {
            term: 'out of stock',
            meaningVi:
              '(trái nghĩa) hết hàng trong kho, không có sẵn trong cửa hàng',
          },
          {
            term: 'take stock',
            meaningVi: 'kiểm kê hàng hoá trong kho',
          },
        ],
      },
      {
        term: 'in training for sth',
        pos: 'phrase',
        reading: 'in treiniŋ fɔː ˈsʌmθiŋ',
        meaningVi: 'được đào tạo, huấn luyện cho việc gì',
        example: 'Karl is in training for the upcoming Olympics.',
        exampleVi: 'Karl đang được huấn luyện cho kỳ Olympic sắp tới.',
        extensions: [
          {
            meaningVi:
              'động từ thể hiện chấp nhận huấn luyện có thể dùng receive, undergo.',
          },
        ],
      },
      {
        term: "incur sb's wrath",
        pos: 'phrase',
        reading: 'inˈkɜː rɒθ',
        meaningVi: 'gánh chịu sự phẫn nộ, cơn giận của ai',
        example:
          "I'd be careful if I were you. You don't want to incur Mr. Clark's wrath.",
        exampleVi:
          'Tôi sẽ cẩn thận nếu tôi là bạn. Bạn không muốn gánh chịu cơn giận của ông Clark.',
        extensions: [
          {
            term: "incur sb's displeasure",
            meaningVi: 'chịu sự bực mình của ai',
          },
          {
            term: "incur sb's disapproval",
            meaningVi: 'chịu sự phản đối của ai',
          },
        ],
      },
    ],
  },
  {
    title: 'Phrases K~O',
    description: 'Track 50',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: "keep one's promise",
        pos: 'phrase',
        reading: 'kiːp wʌnz ˈpromis',
        meaningVi: 'giữ lời',
        example: 'Grandpa Roy kept his promise to come to my birthday party.',
        exampleVi:
          'Ông nội Roy đã giữ lời hứa là đến bữa tiệc sinh nhật của tôi.',
        extensions: [
          {
            term: "break one's promise",
            meaningVi: '(trái nghĩa) thất hứa',
          },
          {
            term: 'make a promise',
            meaningVi: 'hứa, hứa hẹn',
          },
          {
            term: 'full of promise',
            meaningVi: 'đầy hứa hẹn',
          },
        ],
      },
      {
        term: 'keep a record',
        pos: 'phrase',
        reading: 'kiːp ə ˈrekɔːd',
        meaningVi: 'ghi chép, ghi vào sổ sách',
        example: 'Tell Ms. Hopkins to keep a record of her expenses.',
        exampleVi: 'Hãy nói bà Hopkins ghi vào sổ những chi tiêu của bà ấy.',
        extensions: [
          {
            term: 'maintain a record - keep an account',
            meaningVi: '(đồng nghĩa) ghi vào sổ',
          },
          {
            term: 'on record',
            meaningVi: 'đã được ghi, được biết công khai',
          },
          {
            term: 'set a record',
            meaningVi: 'lập kỷ lục',
          },
          {
            term: 'beat/break a record',
            meaningVi: 'phá kỷ lục',
          },
          {
            term: 'hold a record',
            meaningVi: 'giữ kỷ lục',
          },
        ],
      },
      {
        term: "keep one's options open",
        pos: 'phrase',
        reading: 'kiːp wʌnz ˈɒpʃ(ə)n ˈəupən',
        meaningVi: 'chưa vội lựa chọn',
        example:
          "I haven't decided which offer to take. I'm keeping my options open.",
        exampleVi:
          'Tôi vẫn chưa quyết định chọn cái nào. Tôi chưa vội lựa chọn.',
        extensions: [
          {
            meaningVi: "còn có thể nói là leave one's options open.",
          },
          {
            term: 'have no option but to V.',
            meaningVi: 'không còn chọn lựa nào khác ngoài...',
          },
        ],
      },
      {
        term: 'keep up with',
        pos: 'phrase',
        reading: 'kiːp ʌp wið',
        meaningVi: 'theo kịp, không thua kém',
        example:
          'Although I graduated over ten years ago, I have always kept up with the latest research.',
        exampleVi:
          'Dù tôi đã tốt nghiệp 10 năm trước đây nhưng tôi luôn theo kịp nghiên cứu mới nhất.',
        extensions: [
          {
            meaningVi:
              'keep up with sb thường dùng để chỉ “thể hiện tốt như người khác”; ngược lại “tụt hậu so với người khác” có thể nói fall behind sb.',
          },
        ],
      },
      {
        term: 'lock into',
        pos: 'phrase',
        reading: 'lɒk intu',
        meaningVi: 'buộc vào, khóa vào',
        example: 'The company is locked into that contract for five years.',
        exampleVi: 'Công ty này bị dính vào một hợp đồng khoảng 5 năm.',
        extensions: [
          {
            meaningVi:
              'dạng câu này thường dùng ở trạng thái bị động, thể hiện “chịu sự ràng buộc (của hợp đồng, hiệp ước)”, ý gần giống như be bound by.',
          },
        ],
      },
      {
        term: 'look forward to',
        pos: 'phrase',
        reading: 'luk ˈfɔːwəd tu',
        meaningVi: 'mong, mong đợi',
        example:
          "I'm looking forward to retiring. I won't miss working at all.",
        exampleVi: 'Tôi mong về hưu. Rồi tôi sẽ không nhớ công việc tý nào cả.',
        extensions: [
          {
            meaningVi: 'đằng sau cần đi với danh từ hoặc V-ing.',
          },
          {
            term: "can't wait to (do sth)",
            meaningVi: '(đồng nghĩa) không thể đợi để làm gì',
          },
        ],
      },
      {
        term: 'look to',
        pos: 'phrase',
        reading: 'luk tu',
        meaningVi: 'mong đợi, toan tính',
        example: "They're looking to hire a lot of new staff in the new year.",
        exampleVi: 'Họ đang tính thuê nhiều nhân viên mới vào năm mới.',
        extensions: [
          {
            meaningVi:
              'thường dùng dạng câu be looking to do sth; ngoài ra, đằng sau look to có thể đi với danh từ, thể hiện “dựa dẫm vào, ỷ lại”.',
          },
        ],
      },
      {
        term: 'look up to',
        pos: 'phrase',
        reading: 'luk ʌp tu',
        meaningVi: 'ngưỡng mộ, tôn kính',
        example:
          "I'm going to miss you, Harriet. I have always looked up to you and have learned so much from you.",
        exampleVi:
          'Tôi sẽ nhớ bạn, Harriet. Tôi luôn ngưỡng mộ bạn và học hỏi nhiều từ bạn.',
        extensions: [
          {
            term: 'admire - respect',
            pos: 'v',
            meaningVi: '(đồng nghĩa) ngưỡng mộ, tôn kính',
          },
          {
            term: 'look down on',
            meaningVi: '(trái nghĩa) ra vẻ kẻ cả, phô trương',
          },
        ],
      },
      {
        term: 'make a calculation',
        pos: 'phrase',
        reading: 'meik ə kælkjuˈleiʃ(ə)n',
        meaningVi: 'tính toán',
        example:
          "I have no idea how much it'll cost. I haven't made a calculation yet.",
        exampleVi:
          'Tôi không biết nó trị giá bao nhiêu. Tôi vẫn chưa tính nữa.',
        extensions: [
          {
            meaningVi: 'còn có thể nói do a calculation.',
          },
          {
            term: "by one's calculations",
            meaningVi: 'trong toan tính, trù liệu của ai',
          },
        ],
      },
      {
        term: 'make a decision',
        pos: 'phrase',
        reading: 'meik ə diˈsiʒ(ə)n',
        meaningVi: 'đưa ra quyết định',
        example:
          "Our manager still hasn't made a decision on how the layout will be.",
        exampleVi:
          'Giám đốc của chúng ta vẫn chưa quyết định mẫu thiết kế cuối cùng sẽ như thế nào.',
        extensions: [
          {
            term: 'reach/come to a decision',
            meaningVi: 'đưa ra quyết định',
          },
          {
            term: 'reverse/overturn a decision',
            meaningVi: 'đảo lộn quyết định',
          },
        ],
      },
      {
        term: 'make a list',
        pos: 'phrase',
        reading: 'meik ə list',
        meaningVi: 'lập danh sách',
        example: 'Santa will make a list of all the naughty little boys.',
        exampleVi: 'Santa sẽ lập danh sách tất cả cậu bé nghịch ngợm.',
        extensions: [
          {
            meaningVi: 'còn có thể nói draw up/write a list.',
          },
        ],
      },
      {
        term: 'make a reservation',
        pos: 'phrase',
        reading: 'meik ə rezəˈveiʃ(ə)n',
        meaningVi: 'đặt chỗ trước',
        example:
          'I made a reservation for this Saturday at my favorite restaurant.',
        exampleVi:
          'Tôi đã đặt chỗ trước cho thứ Bảy này ở nhà hàng mà tôi thích.',
        extensions: [
          {
            meaningVi:
              'nếu muốn thể hiện “xác nhận đặt trước” có thể nói confirm a reservation.',
          },
          {
            term: 'have reservations about sth',
            meaningVi: 'nghi ngại về điều gì',
          },
          {
            term: 'without reservation',
            meaningVi: 'không dè dặt, hoàn toàn',
          },
        ],
      },
      {
        term: 'make a suggestion',
        pos: 'phrase',
        reading: 'meik ə səˈdʒestʃ(ə)n',
        meaningVi: 'đề nghị, nêu lên gợi ý',
        example: 'Can we make a suggestion? It might help.',
        exampleVi: 'Chúng tôi có thể nêu lên gợi ý chứ? Nó có thể hữu ích.',
        extensions: [
          {
            meaningVi: 'có thể thay thế make bằng offer.',
          },
          {
            term: "at sb's suggestion",
            meaningVi: 'theo đề nghị của ai',
          },
          {
            term: 'open to suggestions',
            meaningVi: 'mở ra những gợi ý',
          },
        ],
      },
      {
        term: 'make an appointment',
        pos: 'phrase',
        reading: 'meik ən əˈpɔintmənt',
        meaningVi: 'có cuộc hẹn gặp',
        example: "Jack made an appointment with his dentist for two o'clock.",
        exampleVi: 'Jack đã hẹn gặp với nha sĩ khoảng 2 giờ.',
        extensions: [
          {
            meaningVi: 'đằng sau thường đi với giới từ quan hệ with + người.',
          },
          {
            term: 'cancel an appointment',
            meaningVi: 'hủy cuộc hẹn',
          },
          {
            term: 'miss an appointment',
            meaningVi: 'bỏ lỡ cuộc hẹn',
          },
          {
            term: 'keep an appointment',
            meaningVi: 'giữ đúng hẹn',
          },
          {
            term: 'by appointment only',
            meaningVi: 'có hẹn trước',
          },
        ],
      },
      {
        term: 'make an impression',
        pos: 'phrase',
        reading: 'meik ən imˈpreʃ(ə)n',
        meaningVi: 'gây ấn tượng',
        example: "John's speech made an impression on the company's CEO.",
        exampleVi:
          'Bài diễn thuyết của John gây ấn tượng đối với chủ tịch hội đồng quản trị của công ty.',
        extensions: [
          {
            meaningVi:
              'phía trước impression có thể dùng tính từ để bổ nghĩa, như make a good/bad/strong impression (để lại ấn tượng tốt/xấu/ấn tượng).',
          },
          {
            term: 'be under the impression',
            meaningVi: 'để lại ấn tượng',
          },
        ],
      },
      {
        term: 'make contact with',
        pos: 'phrase',
        reading: 'meik ˈkɒntækt wið',
        meaningVi: 'liên lạc, liên hệ',
        example:
          "As far as I know, we've never made contact with that company.",
        exampleVi:
          'Theo tất cả những gì tôi biết, chúng tôi chưa bao giờ liên hệ với công ty đó.',
        extensions: [
          {
            term: 'get in contact/touch with - get hold of',
            meaningVi: '(đồng nghĩa) liên lạc, liên hệ',
          },
          {
            term: 'be/stay/keep in contact/touch',
            meaningVi: 'giữ liên lạc',
          },
          {
            term: 'lose contact/touch with sb',
            meaningVi: 'mất liên lạc với ai',
          },
        ],
      },
      {
        term: 'make progress',
        pos: 'phrase',
        reading: 'meik ˈprəugres',
        meaningVi: 'có tiến bộ, tiến triển',
        example:
          "I can understand Tina a lot better now. She's made progress in her English.",
        exampleVi:
          'Giờ đây tôi có thể hiểu Tina nhiều hơn. Tiếng Anh của cô ấy đã có tiến bộ.',
        extensions: [
          {
            meaningVi:
              '“sự việc có tiến triển rất lớn” có thể nói make good/a lot of progress; ngược lại “(dường như) không có tiến triển” là make little/no progress.',
          },
          {
            term: 'monitor/track progress',
            meaningVi: 'theo dõi tiến trình',
          },
          {
            term: 'in progress',
            meaningVi: 'đang tiếp diễn',
          },
        ],
      },
      {
        term: 'match sth/sb up',
        pos: 'phrase',
        reading: 'mætʃ sth/sb ʌp',
        meaningVi: 'làm cho ai/cái gì phù hợp với',
        example: 'Can you match us up with a similar company in India?',
        exampleVi:
          'Bạn có thể sắp xếp chúng tôi thích hợp vào một công ty tương tự như vậy ở Ấn Độ chứ?',
        extensions: [
          {
            term: 'match up',
            meaningVi: 'kết nối',
          },
          {
            term: "match up to sb's expectations",
            meaningVi: 'làm thỏa mãn mong đợi của ai',
          },
        ],
      },
      {
        term: 'meet a deadline',
        pos: 'phrase',
        reading: 'miːt ə ˈdedlain',
        meaningVi: 'kịp thời hạn đã định',
        example: "If you accept this project, you'll have to meet a deadline.",
        exampleVi:
          'Nếu bạn chấp nhận dự án này thì bạn phải thực hiện đúng thời hạn đã định.',
        extensions: [
          {
            term: 'miss a deadline',
            meaningVi: '(trái nghĩa) không kịp thời hạn đã định',
          },
          {
            term: 'set/impose a deadline',
            meaningVi: 'lập thời gian hết hạn',
          },
        ],
      },
      {
        term: 'meet an obligation',
        pos: 'phrase',
        reading: 'miːt ən ɒbliˈgeiʃ(ə)n',
        meaningVi: 'thực hiện trách nhiệm, nghĩa vụ',
        example: "Kathy hasn't met all the obligations of a good manager.",
        exampleVi:
          'Kathy không thực hiện đầy đủ trách nhiệm của một giám đốc giỏi.',
        extensions: [
          {
            term: 'fulfill an obligation - meet a commitment',
            meaningVi: '(đồng nghĩa) thực hiện trách nhiệm, nghĩa vụ',
          },
          {
            term: 'under an obligation',
            meaningVi: 'có nghĩa vụ, trách nhiệm',
          },
        ],
      },
      {
        term: 'move up',
        pos: 'phrase',
        reading: 'muːv ʌp',
        meaningVi: 'chuyển lên, tiến lên, thăng tiến',
        example: 'She wants to move up in the company.',
        exampleVi: 'Cô ấy muốn thăng tiến trong công ty.',
        extensions: [
          {
            term: 'move up the corporate ladder',
            meaningVi: 'thăng tiến',
          },
          {
            term: 'move up in the world',
            meaningVi: 'nổi tiếng',
          },
        ],
      },
      {
        term: 'not to mention',
        pos: 'phrase',
        reading: 'nɒt tu ˈmenʃ(ə)n',
        meaningVi: 'chưa tính, chưa kể đến',
        example:
          'The company has lost a lot of money, not to mention prestige.',
        exampleVi: 'Công ty đã mất nhiều tiền, chưa kể đến danh tiếng nữa.',
        extensions: [
          {
            term: "don't mention it",
            meaningVi: '(dễ nhầm) không sao',
          },
          {
            term: 'now you mention it',
            meaningVi: 'giờ bạn nêu lên vấn đề đi',
          },
          {
            term: 'mention in passing',
            meaningVi: 'nhân tiện nêu lên vấn đề',
          },
        ],
      },
      {
        term: 'on duty',
        pos: 'phrase',
        reading: 'ɒn ˈdjuːti',
        meaningVi: 'trong ca trực',
        example: 'Richard is on duty from two to ten.',
        exampleVi: 'Richard trực từ 2 giờ đến 10 giờ.',
        extensions: [
          {
            meaningVi:
              'có thể đi chung với động từ go, như go on duty (đi làm), go off duty (tan ca).',
          },
          {
            term: 'neglect of duty',
            meaningVi: 'xao lãng trách nhiệm',
          },
        ],
      },
      {
        term: 'on hand',
        pos: 'phrase',
        reading: 'ɒn hænd',
        meaningVi: 'sẵn có',
        example:
          'We keep most supplies on hand, but sometimes we still need to make special orders.',
        exampleVi:
          'Chúng tôi sẵn có hầu hết các hàng hóa để cung cấp nhưng thỉnh thoảng chúng tôi vẫn cần thực hiện những đơn hàng đặc biệt.',
        extensions: [
          {
            term: 'available',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) sẵn có',
          },
          {
            term: 'on the other hand',
            meaningVi: 'mặt khác',
          },
        ],
      },
      {
        term: 'on reflection',
        pos: 'phrase',
        reading: 'ɒn riˈflekʃ(ə)n',
        meaningVi: 'suy nghĩ kỹ',
        example: 'On reflection, I have decided to take your advice.',
        exampleVi:
          'Sau khi suy nghĩ kỹ tôi quyết định nhận lời khuyên của bạn.',
        extensions: [
          {
            meaningVi: 'có thể nói thành upon reflection.',
          },
          {
            term: 'be a reflection on sb/sth',
            meaningVi: 'suy nghĩ kỹ về ai/việc gì',
          },
        ],
      },
      {
        term: 'on target',
        pos: 'phrase',
        reading: 'ɒn ˈtɑːgit',
        meaningVi: 'đặt mục tiêu',
        example: "We're still on target for an early completion date.",
        exampleVi: 'Chúng tôi vẫn đặt mục tiêu ngày hoàn thành sớm.',
        extensions: [
          {
            term: "meet/achieve one's target",
            meaningVi: 'đạt được mục tiêu',
          },
        ],
      },
      {
        term: 'on track',
        pos: 'phrase',
        reading: 'ɒn træk',
        meaningVi: 'đi đúng hướng',
        example:
          "She's been working very hard recently and seems to be on track for a promotion.",
        exampleVi:
          'Gần đây cô ấy làm việc rất chăm chỉ và dường như cô đi đúng hướng để được thăng chức.',
        extensions: [
          {
            meaningVi: 'đằng sau cụm từ có thể đi với for N./V-ing hoặc to V.',
          },
          {
            term: 'be on the track of sb/sth',
            meaningVi: 'theo dõi',
          },
          {
            term: 'keep track of',
            meaningVi: 'theo dõi',
          },
          {
            term: 'get off the track',
            meaningVi: '(trái nghĩa) thoát khỏi lối mòn, cải tiến',
          },
        ],
      },
      {
        term: 'on the basis of',
        pos: 'phrase',
        reading: 'ɒn ðə ˈbeisis əv',
        meaningVi: 'trên cơ sở, dựa trên',
        example:
          "You will be evaluated on the basis of how much you've contributed to the company.",
        exampleVi:
          'Bạn sẽ được đánh giá dựa trên việc bạn đã đóng góp bao nhiêu cho công ty.',
        extensions: [
          {
            meaningVi:
              'cụm từ này còn có thể chỉ “bởi vì”, đằng sau thường là sự thật hoặc tình huống đặc biệt, gần như because of.',
          },
          {
            term: 'based on',
            meaningVi: '(đồng nghĩa) dựa trên',
          },
          {
            term: 'on a daily/weekly basis',
            meaningVi: 'trên cơ sở hằng ngày/hằng tuần',
          },
        ],
      },
      {
        term: 'open to',
        pos: 'phrase',
        reading: 'ˈəupən tu',
        meaningVi: 'có thể dùng, đưa ra',
        example: 'This proposal is open to discussion.',
        exampleVi: 'Đề nghị này có thể đưa ra để thảo luận.',
        extensions: [
          {
            meaningVi:
              'open to sth còn có thể chỉ “có thể gặp phải..., có thể chịu ảnh hưởng của...”, như open to criticism (gặp phải sự chỉ trích).',
          },
          {
            term: 'open to the public',
            meaningVi: 'công bố rộng rãi trước công chúng',
          },
          {
            term: 'open to negotiation',
            meaningVi: 'đưa ra để thương lượng',
          },
        ],
      },
      {
        term: 'out of',
        pos: 'phrase',
        reading: 'aut əv',
        meaningVi: 'hết, dùng hết rồi',
        example: "We're out of printer ink. Can you order some more?",
        exampleVi: 'Chúng ta hết mực máy in rồi. Bạn có thể đặt thêm chứ?',
        extensions: [
          {
            meaningVi: 'còn có thể nói run out of sth.',
          },
          {
            term: 'out of it',
            meaningVi: 'hết, hỏng',
          },
        ],
      },
      {
        term: 'out of commission',
        pos: 'phrase',
        reading: 'aut əv kəˈmiʃ(ə)n',
        meaningVi: 'hư, không hoạt động',
        example: 'Those machines were out of commission.',
        exampleVi: 'Những chiếc máy đó đã hỏng rồi.',
        extensions: [
          {
            meaningVi:
              'trong khẩu ngữ cụm từ này còn có thể dùng để hình dung người, thể hiện “bị bệnh, bị thương, không thể làm việc được”.',
          },
          {
            term: 'damaged - broken',
            pos: 'adj',
            meaningVi: '(đồng nghĩa) hư, hỏng',
          },
          {
            term: 'in commission',
            meaningVi: '(trái nghĩa) có thể dùng, được trang bị đầy đủ',
          },
          {
            term: 'on commission',
            meaningVi: 'hưởng hoa hồng',
          },
        ],
      },
      {
        term: 'out of habit',
        pos: 'phrase',
        reading: 'aut əv ˈhæbit',
        meaningVi: 'theo thói quen',
        example: "Sorry, I'm just sitting here out of habit.",
        exampleVi: 'Xin lỗi, tôi chỉ ngồi ở đây theo thói quen.',
        extensions: [
          {
            term: 'from habit',
            meaningVi: '(đồng nghĩa) theo thói quen',
          },
          {
            term: 'get in/into the habit of V-ing',
            meaningVi: 'thói quen làm gì',
          },
          {
            term: 'develop/form a habit',
            meaningVi: 'hình thành thói quen',
          },
          {
            term: 'break/kick a habit',
            meaningVi: 'từ bỏ thói quen',
          },
        ],
      },
    ],
  },
  {
    title: 'Phrases P~T',
    description: 'Track 51',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'pay dividends',
        pos: 'phrase',
        reading: 'pei ˈdividendz',
        meaningVi: 'có lợi, sinh lợi',
        example: 'My decision to get my MBA is really paying dividends.',
        exampleVi: 'Quyết định học bằng thạc sĩ của tôi thì thực sự có lợi.',
        extensions: [
          {
            term: 'bring dividends - produce great advantages',
            meaningVi: '(đồng nghĩa) sinh lợi',
          },
        ],
      },
      {
        term: 'pay off a debt',
        pos: 'phrase',
        reading: 'pei ɒf ə det',
        meaningVi: 'trả nợ',
        example: 'Greg still needs to pay off a debt to his uncle.',
        exampleVi: 'Greg vẫn cần trả nợ cho chú anh ấy.',
        extensions: [
          {
            meaningVi: 'pay off còn có thể thay thế bằng clear, settle.',
          },
          {
            term: 'cancel/write off a debt',
            meaningVi: 'hủy nợ',
          },
          {
            term: 'in debt',
            meaningVi: 'mắc nợ',
          },
        ],
      },
      {
        term: 'perform a function',
        pos: 'phrase',
        reading: 'pəˈfɔːm ə fʌŋkʃ(ə)n',
        meaningVi: 'thực hiện một nhiệm vụ',
        example: 'This job requires you to perform a variety of functions.',
        exampleVi:
          'Công việc này đòi hỏi bạn thực hiện nhiều nhiệm vụ khác nhau.',
        extensions: [
          {
            meaningVi:
              'cụm từ này còn có thể chỉ “(máy móc) có chức năng...”, như My new cell phone performs many functions. (máy điện thoại mới của tôi có rất nhiều chức năng).',
          },
          {
            term: 'fulfill a function - carry out a duty',
            meaningVi: '(đồng nghĩa) thực hiện một nhiệm vụ',
          },
        ],
      },
      {
        term: 'pick up',
        pos: 'phrase',
        reading: 'pik ʌp',
        meaningVi: 'nhặt, đón',
        example: 'Can you pick up a snack for me on your way home?',
        exampleVi:
          'Bạn có thể mua cho tôi chút thức ăn nhẹ trên đường về nhà chứ?',
        extensions: [
          {
            meaningVi:
              'pick up ngoài cách dùng trên, còn có thể chỉ “nhận được (phần thắng)”, như pick up a prize, hoặc “bị nhiễm (bệnh tật, vi rút gây bệnh)”, như pick up a virus.',
          },
        ],
      },
      {
        term: 'pull out',
        pos: 'phrase',
        reading: 'pul aut',
        meaningVi: 'kéo ra, rút ra',
        example:
          'If the investment keeps doing badly, I will have to pull my money out.',
        exampleVi:
          'Nếu việc đầu tư này vẫn tiếp tục thua lỗ thì tôi sẽ rút tiền của mình ra.',
        extensions: [
          {
            meaningVi:
              'pull out còn có thể chỉ “(xe lửa) rời trạm”; ngược lại “(xe lửa) vào trạm” có thể nói pull in.',
          },
          {
            term: 'pull sb/sth in',
            meaningVi: '(trái nghĩa) lôi vào, đặt vào',
          },
        ],
      },
      {
        term: "put one's signature on",
        pos: 'phrase',
        reading: 'put wʌnz ˈsignətʃə ɒn',
        meaningVi: 'ký vào',
        example: 'Could you please put your signature on the dotted line.',
        exampleVi: 'Xin vui lòng ký tên vào dòng chấm chấm được không?',
      },
      {
        term: "reach one's destination",
        pos: 'phrase',
        reading: 'riːtʃ wʌnz destiˈneiʃ(ə)n',
        meaningVi: 'đến đích',
        example: "They didn't reach their destination until after midnight.",
        exampleVi: 'Họ không thể đến đích cho đến sau giữa khuya.',
        extensions: [
          {
            meaningVi: 'còn có thể dùng arrive at thay thế reach.',
          },
        ],
      },
      {
        term: "restore sb's sight",
        pos: 'phrase',
        reading: 'riˈstɔː sbˈs sait',
        meaningVi: 'khôi phục thị lực',
        example:
          "There's a good chance that the operation will restore her sight.",
        exampleVi:
          'Có một cơ hội tốt rằng ca phẫu thuật sẽ khôi phục thị lực cho cô ấy.',
        extensions: [
          {
            meaningVi:
              'đằng sau restore có thể dùng hearing (nghe) hoặc danh từ trừu tượng, như morale (sĩ khí), confidence (lòng tin).',
          },
          {
            term: 'restore sth to sb',
            meaningVi: 'khôi phục cái gì cho ai',
          },
        ],
      },
      {
        term: 'see eye to eye',
        pos: 'phrase',
        reading: 'siː ai tu ai',
        meaningVi: 'đồng ý',
        example:
          'After talking to Amy for over an hour, I can safely say we see eye to eye on this issue.',
        exampleVi:
          'Sau khi nói chuyện với Amy hơn một giờ, tôi có thể đảm bảo rằng chúng tôi sẽ nhất trí với vấn đề này.',
        extensions: [
          {
            meaningVi:
              'thể hiện “có cùng cách nhìn với ai đó” dùng giới từ with, “nhất chí về việc nào đó”, dùng giới từ on hoặc about.',
          },
          {
            term: 'agree',
            pos: 'v',
            meaningVi: '(đồng nghĩa) đồng ý',
          },
        ],
      },
      {
        term: 'set a goal',
        pos: 'phrase',
        reading: 'set ə gəul',
        meaningVi: 'đặt mục tiêu',
        example: 'If Michael sets a goal, he tries to reach it.',
        exampleVi: 'Nếu Michael đặt ra mục tiêu anh ấy sẽ cố gắng đạt được.',
        extensions: [
          {
            meaningVi: 'set có thể dùng establish thay thế.',
          },
          {
            term: 'achieve/reach/attain a goal',
            meaningVi: 'đạt được mục tiêu',
          },
        ],
      },
      {
        term: "settle one's bill",
        pos: 'phrase',
        reading: 'set(ə)l wʌnz bil',
        meaningVi: 'thanh toán hóa đơn',
        example: "We can't leave yet because I haven't settled the bill.",
        exampleVi:
          'Chúng tôi vẫn chưa thể đi bởi vì chúng tôi chưa thanh toán hóa đơn.',
        extensions: [
          {
            meaningVi:
              'settle ngoài thể hiện “chi trả, kết toán”, còn có ý “giải quyết (vấn đề)”, kết thúc (tranh chấp)”, do đó “giải quyết tranh chấp, xung đột” có thể nói settle a dispute/conflict.',
          },
          {
            term: 'fit/fill the bill',
            meaningVi: 'thích hợp với thực tế',
          },
        ],
      },
      {
        term: 'shut down',
        pos: 'phrase',
        reading: 'ʃʌt daun',
        meaningVi: 'tắt, ngưng hoạt động',
        example: 'Remember to shut down your computer before you go home.',
        exampleVi: 'Hãy nhớ tắt máy vi tính của bạn trước khi ra về.',
        extensions: [
          {
            meaningVi: 'shutdown là danh từ, chỉ “ngưng hoạt động”.',
          },
        ],
      },
      {
        term: 'sign up for sth',
        pos: 'phrase',
        reading: 'sain ʌp fɔː ˈsʌmθiŋ',
        meaningVi: 'đăng ký việc gì',
        example: 'Tiffany signed up for the beauty contest.',
        exampleVi: 'Tiffany đăng ký cuộc thi hoa hậu.',
        extensions: [
          {
            meaningVi:
              '“ghi danh giúp ai đó” có thể dùng dạng câu sign sb up for sth, như Jeff signed his wife up for cooking lessons (Jeff đã ghi danh giúp vợ vào bài học nấu ăn).',
          },
          {
            term: 'sign sb up',
            meaningVi: 'đăng ký cho ai',
          },
        ],
      },
      {
        term: 'stay on top of',
        pos: 'phrase',
        reading: 'stei ɒn tɒp əv',
        meaningVi: 'nắm bắt được',
        example:
          'Regular meetings help a business stay on top of any problems.',
        exampleVi:
          'Các cuộc họp đều đặn giúp cho doanh nghiệp nắm bắt được mọi vấn đề.',
        extensions: [
          {
            term: '(sth) get on top of sb',
            meaningVi: 'việc gì khiến ai đó chịu không nổi',
          },
        ],
      },
      {
        term: 'subject to',
        pos: 'phrase',
        reading: 'ˈsʌbdʒikt tu',
        meaningVi: 'tùy thuộc vào',
        example: 'Wine quality is subject to the quality of the grapes.',
        exampleVi: 'Chất lượng rượu là tùy thuộc vào chất lượng nho.',
        extensions: [
          {
            meaningVi:
              'be subject còn mang ý “có khả năng bị... ảnh hưởng”, như rates are subject to change (mức giá có khả năng thay đổi).',
          },
        ],
      },
      {
        term: 'take a ... approach',
        pos: 'phrase',
        reading: 'teik ə... əˈprəutʃ',
        meaningVi: 'làm theo phương pháp',
        example: "Let's take a wait-and-see approach.",
        exampleVi: 'Hãy thực hiện phương pháp “đợi đấy mà xem”.',
        extensions: [
          {
            meaningVi:
              'có thể dùng adopt, use thay thế take; đằng trước approach có thể dùng tính từ để bổ nghĩa, như positive (tích cực), tough (cứng rắn).',
          },
        ],
      },
      {
        term: 'take back',
        pos: 'phrase',
        reading: 'teik bæk',
        meaningVi: 'mang về, đem về',
        example: "I didn't know that, so let me take back what I just said.",
        exampleVi:
          'Tôi không biết điều đó vì vậy hãy cho tôi rút lại những gì tôi vừa nói.',
        extensions: [
          {
            meaningVi:
              "cụm từ này thường dùng để thể hiện “rút lại (lời nói sai)”, như take it back, take one's words back.",
          },
          {
            term: 'take sb back',
            meaningVi: 'mang ai trở lại',
          },
        ],
      },
      {
        term: 'take center stage',
        pos: 'phrase',
        reading: 'teik ˈsentə steidʒ',
        meaningVi: 'nổi bật',
        example: "Toyota's new SUV is taking center stage at this car show.",
        exampleVi: 'SUV mới của Toyota nổi bật trong buổi triển lãm ô tô.',
        extensions: [
          {
            term: 'be in the spotlight',
            meaningVi: '(đồng nghĩa) nổi bật',
          },
          {
            term: 'go on the stage',
            meaningVi: 'trở thành nhân vật trung tâm',
          },
          {
            term: 'take/leave the stage',
            meaningVi: 'lên/xuống sân khấu',
          },
        ],
      },
      {
        term: 'take into consideration',
        pos: 'phrase',
        reading: 'teik intu kənsidəˈreiʃ(ə)n',
        meaningVi: 'xem xét',
        example: 'We promise to take your suggestion into consideration.',
        exampleVi: 'Chúng tôi hứa xem xét đề nghị của bạn.',
        extensions: [
          {
            term: 'take into account',
            meaningVi: '(đồng nghĩa) xem xét',
          },
          {
            term: 'under consideration',
            meaningVi: 'dưới sự xem xét',
          },
        ],
      },
      {
        term: 'take out',
        pos: 'phrase',
        reading: 'teik aut',
        meaningVi: 'rút, rút ra',
        example: 'I can only take out five hundred dollars a day from the ATM.',
        exampleVi: 'Tôi chỉ có thể rút 500 đô la một ngày từ ATM.',
        extensions: [
          {
            term: 'withdraw',
            pos: 'v',
            meaningVi: '(đồng nghĩa) rút, rút ra',
          },
          {
            term: 'make a deposit',
            meaningVi: '(trái nghĩa) gửi vào',
          },
        ],
      },
      {
        term: 'take out a policy',
        pos: 'phrase',
        reading: 'teik aut ə ˈpɒləsi',
        meaningVi: 'rút hợp đồng',
        example:
          'It seems Mr. Howe took out a life insurance policy on his wife a week before she died.',
        exampleVi:
          'Dường như ông Howe rút lại hợp đồng bảo hiểm nhân thọ cho vợ ông ấy một tuần trước khi bà ấy chết.',
        extensions: [
          {
            meaningVi:
              'hợp đồng bảo hiểm tiếng Anh còn có thể nói insurance policy; ngoài ra, thể hiện “tiếp tục hợp đồng bảo hiểm”, cần dùng động từ renew.',
          },
        ],
      },
      {
        term: 'take part',
        pos: 'phrase',
        reading: 'teik pɑːt',
        meaningVi: 'tham gia',
        example: 'Will you be taking part in the running of the business?',
        exampleVi: 'Bạn sẽ tham gia thành lập doanh nghiệp chứ?',
        extensions: [
          {
            meaningVi: 'cần thêm giới từ in trước danh từ.',
          },
          {
            term: 'participate - be involved - play a part (role)',
            meaningVi: '(đồng nghĩa) tham gia',
          },
        ],
      },
      {
        term: "take sb up on sb's offer",
        pos: 'phrase',
        reading: 'teik sb ʌp ɒn sbˈs ˈɒfə',
        meaningVi: 'chấp nhận đề nghị của ai',
        example:
          "If you give me a ten percent discount, I'll take you up on your offer.",
        exampleVi:
          'Nếu anh đưa tôi 10% chiết khấu tôi sẽ chấp nhận đề nghị của anh.',
        extensions: [
          {
            meaningVi:
              'còn có thể dùng promise, suggestion để thay thế offer, thể hiện “tin tưởng lời hứa (của ai đó), chấp nhận kiến nghị (của ai đó)”.',
          },
          {
            term: "accept sb's offer",
            meaningVi: '(đồng nghĩa) đồng ý/chấp nhận đề nghị của ai',
          },
        ],
      },
      {
        term: 'take the consequences',
        pos: 'phrase',
        reading: 'teik ðə ˈkɒnsikwəns',
        meaningVi: 'chịu hậu quả',
        example: "If the deal falls through, I'll take the consequences.",
        exampleVi: 'Nếu giao dịch này thua lỗ thì tôi sẽ gánh chịu hậu quả.',
        extensions: [
          {
            meaningVi: 'take còn có thể dùng face hoặc suffer để thay thế.',
          },
          {
            term: 'face the music',
            meaningVi: '(đồng nghĩa) gánh chịu hậu quả',
          },
        ],
      },
      {
        term: 'throw out',
        pos: 'phrase',
        reading: 'θrəu aut',
        meaningVi: 'phát ra, tung ra',
        example:
          "I'd like to throw out some ideas and see what you think of them.",
        exampleVi: 'Tôi sẽ ra vài ý kiến rồi xem bạn nghĩ gì về chúng.',
        extensions: [
          {
            meaningVi:
              'throw out còn có nghĩa ném ra, đuổi (ai đó) rời khỏi, phát ra (khói, bụi...), tùy theo nghĩa của câu.',
          },
        ],
      },
    ],
  },
  {
    title: 'Phrases U~Z',
    description: 'Track 52',
    topic: 'Từ vựng 0–990',
    cards: [
      {
        term: 'under a cloud',
        pos: 'phrase',
        reading: 'ˈʌndə ə klaud',
        meaningVi: 'lâm vào ngờ vực',
        example: 'Mr. Wang left the country under a cloud of suspicion.',
        exampleVi: 'Ông Vương rời khỏi nước trong sự ngờ vực.',
        extensions: [
          {
            meaningVi:
              'cụm từ này thường dùng để thể hiện “bất hợp pháp (illegal), phạm tội (criminal)”.',
          },
          {
            term: 'under suspicion - out of favor',
            meaningVi: '(đồng nghĩa) bị nghi ngờ làm điều sai trái',
          },
        ],
      },
      {
        term: 'under fire',
        pos: 'phrase',
        reading: 'ˈʌndə ˈfaiə',
        meaningVi: 'chịu sự phê bình',
        example: "The government's new medical policy has come under fire.",
        exampleVi: 'Chính sách y tế mới của chính phủ bị phê bình.',
        extensions: [
          {
            meaningVi:
              'thường dùng dạng câu come under fire; ngoài ra, “chịu sự phê bình của ai đó”, dùng giới từ from, “vì... mà chịu phê bình”, dùng giới từ for.',
          },
          {
            term: 'be criticized/blamed',
            meaningVi: '(đồng nghĩa) bị phê bình',
          },
        ],
      },
      {
        term: 'under no circumstances',
        pos: 'phrase',
        reading: 'ˈʌndə nəu ˈsɜːkəmstənsiz',
        meaningVi: 'dù trong hoàn cảnh nào cũng không được',
        example: 'Under no circumstances are you to smoke in this office.',
        exampleVi:
          'Dù trong hoàn cảnh nào thì bạn cũng không được hút thuốc trong văn phòng này.',
        extensions: [
          {
            meaningVi: 'nếu cụm từ này đứng đầu câu, câu thường phải đảo ngữ.',
          },
          {
            term: 'in no circumstances - under no conditions - by no means',
            meaningVi: '(đồng nghĩa) dù trong hoàn cảnh nào cũng không được',
          },
          {
            term: 'under the circumstances',
            meaningVi: 'trong hoàn cảnh như vậy',
          },
        ],
      },
      {
        term: "under sb's thumb",
        pos: 'phrase',
        reading: 'ˈʌndə sbˈs θʌmb',
        meaningVi: 'bị ai khống chế',
        example:
          "Kathy is tired of being kept under your thumb. She's leaving.",
        exampleVi: 'Kathy mệt mỏi vì bị bạn khống chế. Cô ấy ra đi.',
        extensions: [
          {
            term: "be controlled completely - under sb's influence/sway",
            meaningVi: '(đồng nghĩa) bị ai khống chế',
          },
        ],
      },
      {
        term: 'up for grabs',
        pos: 'phrase',
        reading: 'ʌp fɔː græbz',
        meaningVi: 'có đủ cho mọi người',
        example:
          "The championship is up for grabs! It'll be decided on the last day of the season.",
        exampleVi:
          'Mọi người đều có quyền dành giải vô địch này! Nó sẽ được quyết định vào ngày cuối cùng của mùa.',
        extensions: [
          {
            meaningVi:
              'cụm từ trên thường đi với job (công việc), prize (giải thưởng), opportunity (cơ hội)..., thể hiện “chỉ cần cố gắng, ai ai cũng có khả năng đạt được”.',
          },
        ],
      },
      {
        term: 'up in the air',
        pos: 'phrase',
        reading: 'ʌp in ði ˈeə',
        meaningVi: 'hảo huyền, viễn vông, ở đâu đâu',
        example: 'Our vacation plans are still up in the air.',
        exampleVi: 'Kế hoạch chuyến du lịch của chúng tôi vẫn còn ở đâu đâu.',
        extensions: [
          {
            term: 'be in the air',
            meaningVi: 'hảo huyền, viễn vông, ở đâu đâu',
          },
          {
            term: 'be on (the) air',
            meaningVi: 'đang phát trên truyền hình',
          },
        ],
      },
      {
        term: 'walk in the park',
        pos: 'phrase',
        reading: 'wɔːk in ðə pɑːk',
        meaningVi: 'dễ dàng',
        example:
          "Physics is like a walk in the park for Albert. He's a genius.",
        exampleVi:
          'Vật lý thì thật dễ đối với Albert. Anh ấy là một thiên tài.',
        extensions: [
          {
            term: 'a piece of cake - really easy',
            meaningVi: '(đồng nghĩa) hoàn toàn dễ dàng',
          },
          {
            term: 'no walk in the park',
            meaningVi: '(trái nghĩa) không dễ dàng',
          },
        ],
      },
      {
        term: 'walk on eggshells',
        pos: 'phrase',
        reading: 'wɔːk ɒn egʃelz',
        meaningVi: 'hành động một cách thận trọng',
        example:
          "Peter's been walking on eggshells ever since he started working here.",
        exampleVi:
          'Peter làm việc rất thận trọng kể từ khi anh ấy làm việc ở đây.',
        extensions: [
          {
            meaningVi: 'cũng có thể nói walk on eggs.',
          },
          {
            term: 'exercise extreme caution - be very careful',
            meaningVi: '(đồng nghĩa) hành động một cách thận trọng',
          },
        ],
      },
      {
        term: 'walk on air',
        pos: 'phrase',
        reading: 'wɔːk ɒn ˈeə',
        meaningVi: 'cực kỳ sung sướng, rất hạnh phúc',
        example:
          "Ever since Eric was accepted into Harvard, he's been walking on air.",
        exampleVi:
          'Từ khi Eric được chấp nhận vào trường Harvard, anh ấy vô cùng sung sướng.',
        extensions: [
          {
            meaningVi: 'thường dùng be walking on air để biểu đạt.',
          },
          {
            term: 'float on air - feel very happy/elated - be on cloud nine',
            meaningVi: '(đồng nghĩa) cực kỳ sung sướng, rất hạnh phúc',
          },
        ],
      },
      {
        term: 'watch the grass grow',
        pos: 'phrase',
        reading: 'wɒtʃ ðə grɑːs grəu',
        meaningVi: 'chán, buồn chán, tẻ nhạt',
        example:
          "Every time Terry goes to his mother-in-law's home, he just sits around and watches the grass grow.",
        exampleVi: 'Mỗi lần đến nhà mẹ vợ, Terry chỉ ngồi và chán.',
        extensions: [
          {
            meaningVi:
              'thường dùng sth is like watching the grass grow thể hiện “việc nào đó quá nhàm chán”.',
          },
          {
            term: 'watch the paint dry - be really boring',
            meaningVi: '(đồng nghĩa) rất nhàm chán',
          },
        ],
      },
      {
        term: 'weather the storm',
        pos: 'phrase',
        reading: 'ˈweðə ðə stɔːm',
        meaningVi: 'vượt qua khó khăn',
        example:
          'The Lakers are coming on strong. Do you think the Suns will be able to weather the storm?',
        exampleVi:
          'Lakers đang hùng mạnh. Bạn có nghĩ Suns sẽ có thể vượt qua khó khăn không?',
        extensions: [
          {
            term: 'get through difficult times - survive a crisis',
            meaningVi: '(đồng nghĩa) vượt qua khó khăn',
          },
        ],
      },
      {
        term: 'will never fly',
        pos: 'phrase',
        reading: 'wil ˈnevə flai',
        meaningVi: 'không thể thành công',
        example: 'This ad campaign will never fly.',
        exampleVi: 'Chiến dịch quảng cáo này sẽ không bao giờ thành công.',
        extensions: [
          {
            meaningVi:
              'cụm từ có ý tương tự là when pigs fly, dùng để tả “việc không thể có”.',
          },
          {
            term: 'have no chance of succeeding - will not succeed',
            meaningVi: '(đồng nghĩa) không thể thành công',
          },
        ],
      },
      {
        term: 'with a heavy hand',
        pos: 'phrase',
        reading: 'wið ə ˈhevi hænd',
        meaningVi: 'nghiêm khắc',
        example: "You shouldn't treat Tiffany with such a heavy hand.",
        exampleVi: 'Bạn không nên đối xử với Tiffany nghiêm khắc như thế.',
        extensions: [
          {
            meaningVi:
              'cụm từ này còn có thể biểu đạt “vụng về”, ý gần như clumsily, awkwardly.',
          },
          {
            term: 'oppressively - severely - with severity - in a strict way',
            meaningVi: '(đồng nghĩa) nghiêm khắc',
          },
          {
            term: 'with a high hand',
            meaningVi: 'ngạo mạn, kiêu căng',
          },
        ],
      },
      {
        term: "you're toast",
        pos: 'phrase',
        reading: 'jɔː təust',
        meaningVi: 'bạn sẽ gặp phiền phức',
        example:
          "If you don't do a good job on the presentation, you're toast.",
        exampleVi:
          'Nếu bạn không thuyết trình tốt thì bạn sẽ gặp phiền phức đấy.',
        extensions: [
          {
            term: 'be in a lot of trouble - be doomed',
            meaningVi: '(đồng nghĩa) phiền phức, phiền toái',
          },
        ],
      },
      {
        term: 'your call',
        pos: 'phrase',
        reading: 'jɔː kɔːl',
        meaningVi: 'tùy vào bạn',
        example: "You could either stay or leave. It's your call.",
        exampleVi: 'Bạn có thể ở lại hay ra về. Đó là tùy vào bạn.',
        extensions: [
          {
            term: 'up to you - your choice - your decision',
            meaningVi: '(đồng nghĩa) tùy vào bạn',
          },
        ],
      },
    ],
  },
]
