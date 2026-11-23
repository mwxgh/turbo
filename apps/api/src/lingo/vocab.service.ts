import { Injectable, NotFoundException, Optional } from '@nestjs/common'

import {
  type Card,
  type Grade,
  Rating,
  State,
  createEmptyCard,
  fsrs,
} from 'ts-fsrs'

import type { LingoCardState, Prisma } from '@repo/db'
import { PrismaService } from '@repo/db/nest'
import { dayRange } from '@repo/utils'

import { CardSearchService } from './card-search.service'
import { cardExtensionSchema } from './specs/schemas'

/** The learner's own deck that "Học từ mở rộng" adds cards to (one per exam). */
export const EXTENSION_DECK_TITLE = 'Từ mở rộng của tôi'

/** Cards in a review session at most. */
const QUEUE_LIMIT = 100
const DEFAULT_NEW_PER_DAY = 20
/** "Đã biết" cards are due this far away: out of the review list for good */
const KNOWN_DAYS = 36_500

const scheduler = fsrs({ enable_fuzz: true })
/** `State.Review` as stored in the Int column */
const REVIEW_STATE: number = State.Review

/** Decks a learner sees: system decks + their own, of one exam (or all). */
const visibleDecks = (
  userId: string,
  exam?: string,
): Prisma.LingoDeckWhereInput => ({
  OR: [{ ownerId: null }, { ownerId: userId }],
  ...(exam && { exam }),
})

export function toFsrsCard(state: LingoCardState): Card {
  return {
    due: state.due,
    stability: state.stability,
    difficulty: state.difficulty,
    elapsed_days: state.elapsedDays,
    scheduled_days: state.scheduledDays,
    learning_steps: state.learningSteps,
    reps: state.reps,
    lapses: state.lapses,
    state: state.state,
    last_review: state.lastReview ?? undefined,
  }
}

function fromFsrsCard(card: Card) {
  return {
    due: card.due,
    stability: card.stability,
    difficulty: card.difficulty,
    elapsedDays: card.elapsed_days,
    scheduledDays: card.scheduled_days,
    learningSteps: card.learning_steps,
    reps: card.reps,
    lapses: card.lapses,
    state: card.state,
    lastReview: card.last_review ?? null,
  }
}

@Injectable()
export class VocabService {
  constructor(
    private readonly prisma: PrismaService,
    @Optional() private readonly search?: CardSearchService,
  ) {}

  /** Decks with card counts and the learner's progress. */
  async decks(userId: string, exam?: string) {
    const now = new Date()
    const decks = await this.prisma.lingoDeck.findMany({
      where: visibleDecks(userId, exam),
      orderBy: [{ ownerId: 'asc' }, { createdAt: 'asc' }],
      include: { _count: { select: { cards: true } } },
    })
    const states = await this.prisma.lingoCardState.findMany({
      where: { userId, card: { deckId: { in: decks.map((d) => d.id) } } },
      select: { due: true, state: true, card: { select: { deckId: true } } },
    })
    return decks.map(({ _count, ...deck }) => {
      const mine = states.filter((s) => s.card.deckId === deck.id)
      return {
        ...deck,
        cards: _count.cards,
        started: mine.length,
        due: mine.filter((s) => s.due <= now).length,
        learned: mine.filter((s) => s.state === REVIEW_STATE).length,
      }
    })
  }

  /** The learner's goal for new cards a day (default without a goal). */
  async newCardsPerDay(userId: string, exam?: string) {
    const goal = exam
      ? await this.prisma.lingoGoal.findUnique({
          where: { userId_exam: { userId, exam } },
          select: { newCardsPerDay: true },
        })
      : null
    return goal?.newCardsPerDay ?? DEFAULT_NEW_PER_DAY
  }

  async newAllowance(userId: string, exam?: string) {
    const { start } = dayRange(new Date())
    const [perDay, introducedToday] = await Promise.all([
      this.newCardsPerDay(userId, exam),
      this.prisma.lingoCardState.count({
        where: { userId, createdAt: { gte: start } },
      }),
    ])
    return Math.max(0, perDay - introducedToday)
  }

  /** Due and new cards for today's session (due first). */
  async queue(userId: string, exam?: string, deckId?: string) {
    const deckWhere = {
      ...visibleDecks(userId, exam),
      ...(deckId && { id: deckId }),
    }
    const now = new Date()
    const due = await this.prisma.lingoCardState.findMany({
      where: { userId, due: { lte: now }, card: { deck: deckWhere } },
      orderBy: { due: 'asc' },
      take: QUEUE_LIMIT,
      include: { card: true },
    })
    const allowance = Math.min(
      await this.newAllowance(userId, exam),
      QUEUE_LIMIT - due.length,
    )
    const fresh =
      allowance > 0
        ? await this.prisma.lingoCard.findMany({
            where: { deck: deckWhere, states: { none: { userId } } },
            orderBy: [{ deckId: 'asc' }, { createdAt: 'asc' }, { id: 'asc' }],
            take: allowance,
          })
        : []
    return {
      newPerDay: await this.newCardsPerDay(userId, exam),
      cards: [
        ...due.map(({ card, ...state }) => ({
          ...card,
          isNew: false,
          state: state.state,
        })),
        ...fresh.map((card) => ({
          ...card,
          isNew: true,
          state: State.New,
        })),
      ],
    }
  }

  /** Counts for the dashboard. */
  async queueCounts(userId: string, exam: string) {
    const deckWhere = visibleDecks(userId, exam)
    const [due, unseen, allowance] = await Promise.all([
      this.prisma.lingoCardState.count({
        where: { userId, due: { lte: new Date() }, card: { deck: deckWhere } },
      }),
      this.prisma.lingoCard.count({
        where: { deck: deckWhere, states: { none: { userId } } },
      }),
      this.newAllowance(userId, exam),
    ])
    return { due, new: Math.min(unseen, allowance) }
  }

  /**
   * "Học từ mở rộng": the related words and phrases of a card become cards of the learner's own
   * deck, so FSRS schedules them like any other card. Notes (no term) and known terms are skipped.
   */
  async learnExtensions(userId: string, cardId: string) {
    const card = await this.prisma.lingoCard.findFirst({
      where: { id: cardId, deck: visibleDecks(userId) },
      select: {
        extensions: true,
        deck: { select: { exam: true, language: true } },
      },
    })
    if (!card) throw new NotFoundException('Card not found')
    const parsed = cardExtensionSchema.array().safeParse(card.extensions ?? [])
    const rows = (parsed.success ? parsed.data : []).flatMap((e) =>
      e.term && e.meaningVi
        ? [{ term: e.term, pos: e.pos, meaningVi: e.meaningVi }]
        : [],
    )
    const deck =
      (await this.prisma.lingoDeck.findFirst({
        where: {
          ownerId: userId,
          exam: card.deck.exam,
          title: EXTENSION_DECK_TITLE,
        },
        select: { id: true },
      })) ??
      (await this.prisma.lingoDeck.create({
        data: {
          ownerId: userId,
          exam: card.deck.exam,
          language: card.deck.language,
          title: EXTENSION_DECK_TITLE,
          description: 'Từ và cụm từ mở rộng bạn chọn học từ các thẻ.',
        },
        select: { id: true },
      }))
    const { count } = await this.prisma.lingoCard.createMany({
      data: rows.map((row) => ({
        ...row,
        deckId: deck.id,
        topic: 'Từ mở rộng',
      })),
      skipDuplicates: true,
    })
    if (count) await this.search?.reindexDecks([deck.id])
    return { deckId: deck.id, added: count, known: rows.length - count }
  }

  /** Grades a card with FSRS and stores the next due date. */
  async review(userId: string, cardId: string, rating: Grade) {
    const card = await this.prisma.lingoCard.findFirst({
      where: { id: cardId, deck: visibleDecks(userId) },
      include: { states: { where: { userId } } },
    })
    if (!card) throw new NotFoundException('Card not found')
    const now = new Date()
    const current = card.states[0]
      ? toFsrsCard(card.states[0])
      : createEmptyCard(now)
    const next = fromFsrsCard(scheduler.next(current, now, rating).card)
    return this.prisma.lingoCardState.upsert({
      where: { userId_cardId: { userId, cardId } },
      create: { userId, cardId, ...next },
      update: next,
    })
  }

  /**
   * "Đã biết": the learner knows the card, it leaves the review list for good. Stored as an Easy
   * review due in KNOWN_DAYS, so it counts as learned and never comes back on its own.
   */
  async markKnown(userId: string, cardId: string) {
    const card = await this.prisma.lingoCard.findFirst({
      where: { id: cardId, deck: visibleDecks(userId) },
      include: { states: { where: { userId } } },
    })
    if (!card) throw new NotFoundException('Card not found')
    const now = new Date()
    const current = card.states[0]
      ? toFsrsCard(card.states[0])
      : createEmptyCard(now)
    const next = {
      ...fromFsrsCard(scheduler.next(current, now, Rating.Easy).card),
      state: REVIEW_STATE,
      scheduledDays: KNOWN_DAYS,
      due: new Date(now.getTime() + KNOWN_DAYS * 86_400_000),
    }
    return this.prisma.lingoCardState.upsert({
      where: { userId_cardId: { userId, cardId } },
      create: { userId, cardId, ...next },
      update: next,
    })
  }
}
