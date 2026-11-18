import { Injectable, NotFoundException } from '@nestjs/common'

import { type Card, type Grade, State, createEmptyCard, fsrs } from 'ts-fsrs'

import type { LingoCardState, Prisma } from '@repo/db'
import { PrismaService } from '@repo/db/nest'
import { dayRange } from '@repo/utils'

/** Cards in a review session at most. */
const QUEUE_LIMIT = 100
const DEFAULT_NEW_PER_DAY = 20

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
  constructor(private readonly prisma: PrismaService) {}

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

  async newAllowance(userId: string, exam?: string) {
    const goal = exam
      ? await this.prisma.lingoGoal.findUnique({
          where: { userId_exam: { userId, exam } },
        })
      : null
    const { start } = dayRange(new Date())
    const introducedToday = await this.prisma.lingoCardState.count({
      where: { userId, createdAt: { gte: start } },
    })
    return Math.max(
      0,
      (goal?.newCardsPerDay ?? DEFAULT_NEW_PER_DAY) - introducedToday,
    )
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
}
