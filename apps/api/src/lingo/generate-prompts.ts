import type { ArkMessage } from './ark-model'
import type { ExamSpec, PartSpec } from './specs'

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

const DEFAULT_TOPICS =
  'vary the business topics: office, meetings, travel, finance, HR, marketing, sales, manufacturing, dining, health, real estate, technology'

/** An item of the part with placeholders: shows the model the exact JSON shape. */
export function itemTemplate(part: PartSpec, questions: number) {
  const question = {
    ...(part.questionText !== 'none' && {
      text:
        part.questionText === 'optional'
          ? '<question, may be omitted for a blank>'
          : '<question>',
    }),
    options: Array.from(
      { length: part.options },
      (_, i) => `<option ${'ABCD'[i]}>`,
    ),
    answer: 0,
    explanationVi:
      '<Vietnamese: why the answer is right, why each other option is wrong>',
    translationVi: '<Vietnamese translation>',
    skillTags: ['<skill tag>'],
  }
  return {
    difficulty: 'MEDIUM',
    topic: '<short topic>',
    ...(part.passage && { passage: '<text>' }),
    ...(part.transcript && {
      transcript: [
        { speaker: 'W', accent: 'US', text: '<line>' },
        { speaker: 'M', accent: 'GB', text: '<line>' },
      ],
    }),
    ...(part.spokenOptions && { accent: 'US' }),
    ...(part.media.includes('image') && { scene: '<what the photo shows>' }),
    questions: Array.from({ length: questions }, () => question),
  }
}

const SYSTEM = (exam: ExamSpec) =>
  `You write original practice content for ${exam.name} for Vietnamese learners. ` +
  'Never copy real ETS / official test questions. Use natural, current business English. ' +
  'Answer with one JSON object only, no Markdown.'

/** Ask for `count` new items of one part. */
export function itemsPrompt(
  exam: ExamSpec,
  part: PartSpec,
  input: { count: number; difficulty: Difficulty; topic?: string },
): ArkMessage[] {
  const [min, max] = part.questionsPerItem
  const tags = Object.entries(exam.skillTags)
    .map(([tag, label]) => `${tag} (${label})`)
    .join(', ')
  return [
    { role: 'system', content: SYSTEM(exam) },
    {
      role: 'user',
      content: [
        `Write ${input.count} new, different items for ${part.code} – ${part.name}.`,
        `Format: ${part.guide}`,
        `Questions per item: ${min === max ? min : `${min}–${max}`}.`,
        `Difficulty: ${input.difficulty} (${exam.difficulties[input.difficulty]}). Set "difficulty" to "${input.difficulty}".`,
        `Topic: ${input.topic ?? DEFAULT_TOPICS}.`,
        `Each item has exactly this JSON shape (placeholders in <>):`,
        JSON.stringify(itemTemplate(part, min), null, 2),
        'Rules:',
        `- "options": exactly ${part.options} strings; "answer": 0-based index of the only correct option. Spread correct answers over all positions.`,
        '- "explanationVi" and "translationVi" are in Vietnamese; explain traps briefly.',
        part.transcript
          ? '- "speaker": M, W, M2, W2 or N (narrator); "accent": US, GB, AU or CA; vary accents between items.'
          : '',
        `- "skillTags": 1–2 tags from: ${tags}.`,
        'Return {"items": [ ... ]}.',
      ]
        .filter(Boolean)
        .join('\n'),
    },
  ]
}

/** The model answers its own items (answer keys removed): mismatches go to review. */
export function checkPrompt(
  exam: ExamSpec,
  part: PartSpec,
  items: {
    passage?: string
    transcript?: { speaker: string; text: string }[]
    scene?: string
    questions: { text?: string; options: string[] }[]
  }[],
): ArkMessage[] {
  const tasks = items.map((item) => ({
    ...(item.passage && { passage: item.passage }),
    ...(item.transcript && { transcript: item.transcript }),
    ...(item.scene && { photo: item.scene }),
    questions: item.questions.map((q) => ({
      ...(q.text && { text: q.text }),
      options: q.options,
    })),
  }))
  return [
    { role: 'system', content: SYSTEM(exam) },
    {
      role: 'user',
      content: [
        `Solve these ${exam.name} ${part.code} (${part.name}) items as a careful test taker.`,
        part.spokenOptions
          ? 'Text and options are what the test taker hears.'
          : '',
        'For each item give the 0-based index of the best option of each question, in order.',
        'Return {"items": [{"answers": [0, 2]}, ...]} with one entry per item, same order.',
        JSON.stringify(tasks),
      ]
        .filter(Boolean)
        .join('\n'),
    },
  ]
}

/** Vocabulary cards for terms, in the CSV row shape. */
export function cardsPrompt(
  exam: ExamSpec | undefined,
  language: string,
  terms: string[],
): ArkMessage[] {
  return [
    {
      role: 'system',
      content:
        'You write vocabulary flashcards for Vietnamese learners. Answer with one JSON object only, no Markdown.',
    },
    {
      role: 'user',
      content: [
        `Make one card per term (language: ${language}${exam ? `, for ${exam.name}` : ''}).`,
        'Card shape: {"term": "<as given>", "pos": "<n. / v. / adj. / adv. / phr.>", "reading": "<IPA for English, pinyin for Chinese>", "meaningVi": "<short Vietnamese meaning>", "example": "<one natural example sentence>", "exampleVi": "<its Vietnamese translation>", "topic": "<one-word topic>"}',
        'Return {"cards": [ ... ]} in the order of the terms.',
        `Terms: ${JSON.stringify(terms)}`,
      ].join('\n'),
    },
  ]
}
