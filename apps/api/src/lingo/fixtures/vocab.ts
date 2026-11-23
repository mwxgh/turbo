import { parseCsv } from '../specs/csv'
import { cardRowSchema } from '../specs/schemas'
import { PART56_DECKS } from './decks/part56'
import { DECKS_A } from './decks/set-a'
import { DECKS_B } from './decks/set-b'
import { DECKS_C } from './decks/set-c'
import { TOEIC990_DECKS } from './decks/toeic990'
import { TOEIC_TOPIC_DECKS } from './toeic-decks'
import { TOEIC_STARTER_DECK } from './toeic-part5'
import type { DeckFixture } from './types'

type Card = DeckFixture['cards'][number]

/** A source deck, by title, and the topic its cards go to (or a function of the card). */
export interface Source {
  title: string
  cards: Card[]
  topic: (card: Card) => string
  /** Study order inside a topic: starter 0, Lingo decks 1, handout 2, book 3 */
  level: number
}

/**
 * Topics in study order: learners get new cards deck by deck, so this order is the curriculum.
 * Sources are only raw material: each term is one card, under one topic.
 */
const TOPICS: { key: string; name: string; description: string }[] = [
  {
    key: 'office',
    name: 'Văn phòng & hành chính',
    description: 'Công việc văn phòng, thiết bị, quy trình hành chính.',
  },
  {
    key: 'meetings',
    name: 'Cuộc họp, hội nghị & thư từ',
    description:
      'Họp hội đồng, uỷ ban, hội nghị, email và giao tiếp công việc.',
  },
  {
    key: 'hr',
    name: 'Nhân sự & tuyển dụng',
    description: 'Tuyển dụng, lương, thăng chức, nghỉ hưu, hồ sơ xin việc.',
  },
  {
    key: 'sales',
    name: 'Marketing, bán hàng & khách hàng',
    description: 'Tiếp thị, bán hàng, chăm sóc khách hàng và hậu mãi.',
  },
  {
    key: 'purchasing',
    name: 'Mua hàng, đặt hàng & vận chuyển',
    description: 'Mua sắm, đặt hàng, giao hàng, hoá đơn.',
  },
  {
    key: 'finance',
    name: 'Tài chính, ngân hàng & kế toán',
    description: 'Ngân hàng, đầu tư, thuế, kế toán, thanh toán.',
  },
  {
    key: 'contracts',
    name: 'Hợp đồng, đàm phán & pháp lý',
    description: 'Hợp đồng, điều khoản, đàm phán, pháp lý.',
  },
  {
    key: 'management',
    name: 'Quản trị, kế hoạch & sản xuất',
    description:
      'Chiến lược, kế hoạch kinh doanh, dây chuyền, kiểm soát chất lượng.',
  },
  {
    key: 'dining',
    name: 'Nhà hàng & sự kiện',
    description: 'Tiệc, bữa trưa, tiếp tân, đặt chỗ, tổ chức sự kiện.',
  },
  {
    key: 'travel',
    name: 'Du lịch & đi lại',
    description: 'Giao thông, vé, lịch trình, nhà ga, khách sạn.',
  },
  {
    key: 'entertainment',
    name: 'Giải trí & truyền thông',
    description: 'Phim, kịch, âm nhạc, nghệ thuật, báo chí.',
  },
  {
    key: 'health',
    name: 'Y tế, bảo hiểm & phúc lợi',
    description: 'Bảo hiểm, phòng khám, nha sĩ, bệnh viện, phúc lợi.',
  },
  {
    key: 'property',
    name: 'Bất động sản & cơ sở vật chất',
    description: 'Thuê, mua, sửa chữa, bảo trì toà nhà.',
  },
  {
    key: 'tech',
    name: 'Công nghệ & IT',
    description: 'Phần mềm, thiết bị, mạng, hỗ trợ kỹ thuật.',
  },
  {
    key: 'environment',
    name: 'Môi trường, năng lượng & cộng đồng',
    description: 'Môi trường, năng lượng, hoạt động cộng đồng.',
  },
  {
    key: 'verbs',
    name: 'Động từ & cụm động từ hay gặp',
    description: 'Động từ thường gặp trong đề, kèm từ mở rộng.',
  },
  {
    key: 'modifiers',
    name: 'Tính từ & trạng từ hay gặp',
    description: 'Tính từ, trạng từ thường gặp trong đề, kèm từ mở rộng.',
  },
  {
    key: 'function',
    name: 'Giới từ, liên từ & cụm từ cố định',
    description: 'Giới từ, liên từ và cụm cố định cho Part 5–6.',
  },
  {
    key: 'part5',
    name: 'Từ vựng học thuật nâng cao',
    description: 'Danh từ và từ học thuật hay ra trong phần điền từ.',
  },
  {
    key: 'phrases',
    name: 'Cụm từ thường gặp',
    description: 'Cụm từ, thành ngữ hay gặp trong TOEIC.',
  },
  {
    key: 'paraphrase',
    name: 'Paraphrase Part 3–4–7',
    description: 'Cách đề diễn đạt lại cùng một ý.',
  },
]

const LINGO_TOPIC: Record<string, string> = {
  'TOEIC 01': 'office',
  'TOEIC 02': 'hr',
  'TOEIC 03': 'finance',
  'TOEIC 04': 'sales',
  'TOEIC 05': 'travel',
  'TOEIC 06': 'purchasing',
  'TOEIC 07': 'tech',
  'TOEIC 08': 'property',
  'TOEIC 09': 'health',
  'TOEIC 10': 'sales',
  'TOEIC 11': 'environment',
  'TOEIC 12': 'verbs',
  'TOEIC 13': 'modifiers',
  'TOEIC 14': 'function',
  'TOEIC 15': 'meetings',
  'TOEIC 16': 'contracts',
  'TOEIC 17': 'management',
  'TOEIC 18': 'part5',
  'TOEIC 19': 'paraphrase',
}

/** Book chapter (and section for chapters split across topics) → topic. */
const BOOK_TOPIC: Record<string, string> = {
  '1-1': 'contracts',
  '1-2': 'contracts',
  '1-3': 'sales',
  '1-4': 'sales',
  '1-5': 'meetings',
  '1-6': 'management',
  '2-1': 'meetings',
  '2-2': 'meetings',
  '2-3': 'meetings',
  '2-4': 'office',
  '2-5': 'office',
  '3': 'hr',
  '4': 'purchasing',
  '5': 'finance',
  '6-1': 'management',
  '6-2': 'management',
  '6-3': 'meetings',
  '7': 'dining',
  '8': 'travel',
  '9': 'entertainment',
  '10': 'health',
}

/** Handout cards have no topic: sorted by part of speech. */
const byPos = (card: Card) => {
  const pos = card.pos.split(',')[0]?.trim()
  if (pos === 'phrase') return 'phrases'
  if (pos === 'v') return 'verbs'
  if (pos === 'adj' || pos === 'adv') return 'modifiers'
  if (pos === 'prep' || pos === 'conj') return 'function'
  return 'part5'
}

const lingoTopic = (title: string) => {
  const topic = LINGO_TOPIC[title.slice(0, 8)]
  if (!topic) throw new Error(`No topic for deck "${title}"`)
  return topic
}

const rows = (csv: string): Card[] =>
  parseCsv(csv).map((row) => cardRowSchema.parse(row) as Card)

/** Book decks are book sections ("1-1 Contracts", "Phrases A~E"): by section, else chapter. */
const bookTopic = (title: string) => {
  if (title.startsWith('Phrases')) return 'phrases'
  const [section = ''] = title.split(' ')
  const [chapter = ''] = section.split('-')
  const topic = BOOK_TOPIC[section] ?? BOOK_TOPIC[chapter]
  if (!topic) throw new Error(`No topic for book section "${title}"`)
  return topic
}

/** Every source, in priority order: the first source of a term gives its topic and main content. */
export const VOCAB_SOURCES: Source[] = [
  ...TOEIC990_DECKS.map((d) => ({
    title: d.title,
    cards: d.cards,
    topic: () => bookTopic(d.title),
    level: 3,
  })),
  ...PART56_DECKS.map((d) => ({
    title: d.title,
    cards: d.cards,
    topic: byPos,
    level: 2,
  })),
  {
    title: TOEIC_STARTER_DECK.title,
    cards: TOEIC_STARTER_DECK.cards,
    topic: () => 'office',
    level: 0,
  },
  ...TOEIC_TOPIC_DECKS.map((d) => ({
    title: d.title,
    cards: rows(d.csv),
    topic: () => lingoTopic(d.title),
    level: 1,
  })),
  ...[...DECKS_A, ...DECKS_B, ...DECKS_C].map((d) => ({
    title: d.title,
    cards: d.cards,
    topic: () => lingoTopic(d.title),
    level: 1,
  })),
]

const ipa = (reading?: string) =>
  reading && !reading.startsWith('/') ? `/${reading}/` : reading

/** One card from every source of a term: the first fills the fields, the rest fill gaps. */
function merge([first, ...rest]: [Card, ...Card[]]): Card {
  const cards = [first, ...rest]
  const pick = <K extends keyof Card>(key: K) =>
    cards.find((c) => c[key])?.[key]
  const extensions: NonNullable<Card['extensions']> = []
  const seen = new Set<string>()
  for (const card of cards)
    for (const ext of card.extensions ?? []) {
      const key = (ext.term ?? ext.meaningVi ?? '').toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      extensions.push(ext)
    }
  // The first source's meaning, plus senses of the others it lacks (book glosses can be short)
  const meanings = [first.meaningVi.trim()]
  for (const card of rest)
    for (const sense of card.meaningVi.split(/[;,](?![^(]*\))/)) {
      const s = sense.trim()
      if (s && !meanings.some((m) => m.toLowerCase().includes(s.toLowerCase())))
        meanings.push(s)
    }
  const card: Card = {
    term: first.term,
    pos: first.pos,
    meaningVi: meanings.join('; ').slice(0, 500),
  }
  const reading = ipa(pick('reading'))
  if (reading) card.reading = reading
  // Example and its translation come as a pair from one source
  const example = cards.find((c) => c.example)
  if (example?.example) card.example = example.example
  if (example?.exampleVi) card.exampleVi = example.exampleVi
  if (extensions.length) card.extensions = extensions.slice(0, 20)
  return card
}

const DECK_SIZE = 40

function build(): DeckFixture[] {
  const byTerm = new Map<
    string,
    { topic: string; level: number; cards: [Card, ...Card[]] }
  >()
  for (const source of VOCAB_SOURCES)
    for (const card of source.cards) {
      const key = card.term.trim().toLowerCase()
      const entry = byTerm.get(key)
      if (!entry)
        byTerm.set(key, {
          topic: source.topic(card),
          level: source.level,
          cards: [card],
        })
      else {
        entry.cards.push(card)
        entry.level = Math.min(entry.level, source.level)
      }
    }
  const decks: DeckFixture[] = []
  for (const topic of TOPICS) {
    const cards = [...byTerm.values()]
      .filter((e) => e.topic === topic.key)
      .sort((a, b) => a.level - b.level)
      .map((e) => merge(e.cards))
    const parts = Math.ceil(cards.length / DECK_SIZE)
    const size = Math.ceil(cards.length / parts)
    for (let i = 0; i < parts; i++)
      decks.push({
        title: `Bài ${String(decks.length + 1).padStart(2, '0')} · ${topic.name}${parts > 1 ? ` (${i + 1}/${parts})` : ''}`,
        description: topic.description,
        topic: topic.name,
        cards: cards.slice(i * size, (i + 1) * size),
      })
  }
  return decks
}

/** The vocabulary curriculum: one card per term, topic decks of up to 40 in study order. */
export const VOCAB_DECKS: DeckFixture[] = build()

/** System decks of v0.8.0, by book chapter (now one source deck per section). */
const BOOK_DECKS_0_8 = [
  '1. General Business · Thương mại tổng quát (1/2)',
  '1. General Business · Thương mại tổng quát (2/2)',
  '2. Office Issues · Hành chính văn phòng',
  '3. Personnel · Nhân sự',
  '4. Purchasing · Mua hàng',
  '5. Finance and Budgeting · Tài chính và Ngân sách',
  '6. Management Issues · Vấn đề quản lý',
  '7. Restaurants and Events · Nhà hàng và Sự kiện',
  '8. Travel · Du lịch',
  '9. Entertainment · Giải trí',
  '10. Health · Sức khỏe',
  'Cụm từ A–E',
  'Cụm từ F–O',
  'Cụm từ P–Z',
].map((title) => `TOEIC 0–990 · ${title}`)

/** Titles of system decks from earlier releases: their cards move into VOCAB_DECKS. */
export const LEGACY_DECK_TITLES: string[] = [
  ...VOCAB_SOURCES.filter(
    (s) => !TOEIC990_DECKS.some((d) => d.title === s.title),
  ).map((s) => s.title),
  ...BOOK_DECKS_0_8,
]
