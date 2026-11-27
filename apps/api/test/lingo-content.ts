import { getExam } from '../src/lingo/specs'

/**
 * Made-up TOEIC content for e2e (not learning content): a full part's worth of valid items for
 * every part but Part 1 (photos), each one unique. Part 5 questions test word form.
 */
export function toeicTestContent(tag = 'e2e') {
  const exam = getExam('TOEIC_LR')
  const items: Record<string, object[]> = {}
  for (const part of exam.sections.flatMap((s) => s.parts)) {
    if (part.media.includes('image')) continue
    const per = part.questionsPerItem[0]
    items[part.code] = Array.from(
      { length: Math.ceil(part.count / per) },
      (_, i) => ({
        difficulty: 'EASY',
        ...(part.passage && { passage: `${tag} ${part.code} passage ${i}` }),
        ...(part.transcript && {
          transcript: [{ speaker: 'M', text: `${tag} ${part.code} line ${i}` }],
        }),
        // One longer item where a part allows it, so any question count can be reached
        questions: Array.from(
          { length: per + (i === 0 && part.questionsPerItem[1] > per ? 1 : 0) },
          (_, q) => ({
            ...(part.questionText !== 'none' && {
              text: `${tag} ${part.code} item ${i} question ${q}`,
            }),
            options: Array.from({ length: part.options }, (_, o) => `opt ${o}`),
            answer: 0,
            ...(part.code === 'P5' && { skillTags: ['grammar.word-form'] }),
          }),
        ),
      }),
    )
  }
  return {
    exam: exam.code,
    items,
    decks: [
      {
        title: `${tag} · Văn phòng`,
        topic: 'Office',
        cards: [
          {
            term: 'accept',
            pos: 'v',
            meaningVi: 'chấp nhận',
            extensions: [
              { term: 'acceptance', pos: 'n', meaningVi: 'sự chấp nhận' },
              { term: 'acceptable', pos: 'adj', meaningVi: 'chấp nhận được' },
              {
                term: 'accept responsibilities for',
                meaningVi: 'nhận trách nhiệm về',
              },
            ],
          },
          { term: 'contract', pos: 'n', meaningVi: 'hợp đồng' },
          { term: 'attend', pos: 'v', meaningVi: 'tham dự' },
          { term: 'deadline', pos: 'n', meaningVi: 'hạn chót' },
          { term: 'agenda', pos: 'n', meaningVi: 'chương trình họp' },
          { term: 'invoice', pos: 'n', meaningVi: 'hoá đơn' },
          { term: 'schedule', pos: 'n', meaningVi: 'lịch trình' },
        ],
      },
    ],
    tests: [
      {
        title: `${tag} mini test`,
        items: { P5: (items.P5 ?? []).slice(0, 3) },
      },
    ],
  }
}
