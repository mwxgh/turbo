/** A vocabulary deck written for Lingo (loaded by POST /lingo/admin/samples). */
export interface DeckFixture {
  title: string
  description: string
  topic: string
  cards: {
    term: string
    pos: string
    /** IPA */
    reading: string
    meaningVi: string
    example: string
    exampleVi: string
  }[]
}

/** A published test written for Lingo: items per part, same shape as a JSON import file. */
export interface TestFixture {
  title: string
  description: string
  /** MINI (default): half of each part; FULL: every part at its ETS count (Part 1 waits for photos) */
  kind?: 'MINI' | 'FULL'
  items: Record<string, object[]>
}
