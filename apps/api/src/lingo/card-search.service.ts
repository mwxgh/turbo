import {
  Injectable,
  Logger,
  type OnApplicationBootstrap,
  Optional,
} from '@nestjs/common'

import type { Prisma } from '@repo/db'
import { PrismaService } from '@repo/db/nest'
import { type IndexDefinition, SearchIndex } from '@repo/infra/elasticsearch'

import { cardExtensionSchema } from './specs/schemas'

// Bump the version when CARD_INDEX changes: the new index is built at start, the old one can go
const INDEX = 'lingo-cards-v1'
const LIMIT = 20
const BATCH = 500

/**
 * Lowercase + accents folded ("hợp đồng" = "hop dong"); `term.prefix` also matches the start of
 * words, `term.exact` the whole term.
 */
export const CARD_INDEX: IndexDefinition = {
  settings: {
    analysis: {
      filter: { edge: { type: 'edge_ngram', min_gram: 2, max_gram: 20 } },
      normalizer: {
        folded: { type: 'custom', filter: ['lowercase', 'asciifolding'] },
      },
      analyzer: {
        folded: {
          type: 'custom',
          tokenizer: 'standard',
          filter: ['lowercase', 'asciifolding'],
        },
        folded_prefix: {
          type: 'custom',
          tokenizer: 'standard',
          filter: ['lowercase', 'asciifolding', 'edge'],
        },
      },
    },
  },
  mappings: {
    properties: {
      term: {
        type: 'text',
        analyzer: 'folded',
        fields: {
          exact: { type: 'keyword', normalizer: 'folded' },
          prefix: {
            type: 'text',
            analyzer: 'folded_prefix',
            search_analyzer: 'folded',
          },
        },
      },
      meaningVi: { type: 'text', analyzer: 'folded' },
      extensions: { type: 'text', analyzer: 'folded' },
      example: { type: 'text', analyzer: 'folded' },
      pos: { type: 'keyword', index: false },
      reading: { type: 'keyword', index: false },
      exampleVi: { type: 'keyword', index: false },
      deckId: { type: 'keyword' },
      deckTitle: { type: 'keyword', index: false },
      ownerId: { type: 'keyword' },
      exam: { type: 'keyword' },
    },
  },
}

const cardSelect = {
  id: true,
  term: true,
  pos: true,
  reading: true,
  meaningVi: true,
  example: true,
  exampleVi: true,
  extensions: true,
  deckId: true,
  deck: { select: { title: true, ownerId: true, exam: true } },
} satisfies Prisma.LingoCardSelect

type CardRow = Prisma.LingoCardGetPayload<{ select: typeof cardSelect }>

export interface CardHit {
  id: string
  term: string
  pos: string | null
  reading: string | null
  meaningVi: string
  example: string | null
  exampleVi: string | null
  deckId: string
  deckTitle: string
}

/** The searchable document of a card: từ mở rộng flattened to text. */
function toDoc({ deck, extensions, ...card }: CardRow) {
  const parsed = cardExtensionSchema.array().safeParse(extensions ?? [])
  return {
    ...card,
    extensions: (parsed.success ? parsed.data : [])
      .map((e) => [e.term, e.meaningVi].filter(Boolean).join(' '))
      .join('\n'),
    deckTitle: deck.title,
    ownerId: deck.ownerId,
    exam: deck.exam,
  }
}

/**
 * Full-text search over the cards a learner can see (system decks + their own). With
 * Elasticsearch: folded accents, word prefixes and typos, ranked; the index follows the cards
 * (rebuilt at start, updated when cards are written). Without it: a plain Postgres match.
 */
@Injectable()
export class CardSearchService implements OnApplicationBootstrap {
  private readonly logger = new Logger(CardSearchService.name)

  constructor(
    private readonly prisma: PrismaService,
    @Optional() private readonly index?: SearchIndex,
  ) {}

  get engine(): 'elasticsearch' | 'database' {
    return this.index ? 'elasticsearch' : 'database'
  }

  /** Brings the index in line with the database, in the background (start must not wait on it). */
  onApplicationBootstrap() {
    if (this.index) void this.reindexAll()
  }

  async search(
    userId: string,
    q: string,
    exam?: string,
  ): Promise<{ engine: string; items: CardHit[] }> {
    return {
      engine: this.engine,
      items: this.index
        ? await this.index.search<CardHit>(INDEX, {
            size: LIMIT,
            _source: { excludes: ['extensions', 'ownerId', 'exam'] },
            query: {
              bool: {
                // Ranked: whole term > phrase in term / meaning > all words (typos ok) > word starts
                should: [
                  { term: { 'term.exact': { value: q, boost: 20 } } },
                  { match_phrase: { term: { query: q, boost: 8 } } },
                  { match_phrase: { meaningVi: { query: q, boost: 6 } } },
                  // Typos in the English term only (1 edit from 4 letters, 2 from 8);
                  // short Vietnamese syllables would match each other ("dat" ~ "day")
                  {
                    match: {
                      term: {
                        query: q,
                        operator: 'and',
                        fuzziness: 'AUTO:4,8',
                        boost: 4,
                      },
                    },
                  },
                  {
                    multi_match: {
                      query: q,
                      fields: ['meaningVi^2', 'extensions', 'example^0.5'],
                      operator: 'and',
                    },
                  },
                  // No fuzziness on n-grams: "dong" would match "donate"
                  {
                    match: {
                      'term.prefix': { query: q, operator: 'and', boost: 2 },
                    },
                  },
                ],
                minimum_should_match: 1,
                filter: [
                  {
                    bool: {
                      should: [
                        {
                          bool: { must_not: { exists: { field: 'ownerId' } } },
                        },
                        { term: { ownerId: userId } },
                      ],
                    },
                  },
                  ...(exam ? [{ term: { exam } }] : []),
                ],
              },
            },
          })
        : await this.searchDatabase(userId, q, exam),
    }
  }

  private async searchDatabase(userId: string, q: string, exam?: string) {
    const cards = await this.prisma.lingoCard.findMany({
      where: {
        deck: {
          OR: [{ ownerId: null }, { ownerId: userId }],
          ...(exam && { exam }),
        },
        OR: [
          { term: { contains: q, mode: 'insensitive' } },
          { meaningVi: { contains: q, mode: 'insensitive' } },
        ],
      },
      select: cardSelect,
      orderBy: { term: 'asc' },
      take: LIMIT,
    })
    return cards.map((card) => {
      const { extensions: _, ownerId: __, exam: ___, ...hit } = toDoc(card)
      return hit
    })
  }

  /** Re-indexes every card, then drops documents of cards that no longer exist. Never throws. */
  async reindexAll() {
    await this.safely('reindex', async (index) => {
      await index.ensure(INDEX, CARD_INDEX)
      const ids: string[] = []
      for (let cursor: string | undefined; ;) {
        const cards = await this.prisma.lingoCard.findMany({
          select: cardSelect,
          orderBy: { id: 'asc' },
          take: BATCH,
          ...(cursor && { cursor: { id: cursor }, skip: 1 }),
        })
        if (!cards.length) break
        await index.upsert(INDEX, cards.map(toDoc))
        ids.push(...cards.map((c) => c.id))
        cursor = cards.at(-1)!.id
      }
      await index.deleteWhere(
        INDEX,
        { bool: { must_not: { ids: { values: ids } } } },
        true,
      )
      this.logger.log(`indexed ${ids.length} cards`)
    })
  }

  /** Re-indexes the cards of some decks (after an import). Never throws. */
  async reindexDecks(deckIds: string[]) {
    await this.safely('reindex decks', async (index) => {
      await index.ensure(INDEX, CARD_INDEX)
      await index.deleteWhere(INDEX, { terms: { deckId: deckIds } })
      const cards = await this.prisma.lingoCard.findMany({
        where: { deckId: { in: deckIds } },
        select: cardSelect,
      })
      await index.upsert(INDEX, cards.map(toDoc), true)
    })
  }

  /** The index is derived data: a failure is logged, the write that triggered it stands. */
  private async safely(
    what: string,
    run: (index: SearchIndex) => Promise<void>,
  ) {
    if (!this.index) return
    try {
      await run(this.index)
    } catch (error) {
      this.logger.error(
        `${what} failed: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  }
}
