import { describe, expect, it, vi } from 'vitest'

import type { PrismaService } from '@repo/db/nest'
import type { SearchIndex } from '@repo/elasticsearch'

import { CardSearchService } from './card-search.service'

const row = (id: string, ownerId: string | null = null) => ({
  id,
  term: `term ${id}`,
  pos: 'n',
  reading: null,
  meaningVi: 'nghĩa',
  example: null,
  exampleVi: null,
  extensions: [
    { term: 'related', meaningVi: 'liên quan' },
    { meaningVi: 'ghi chú' },
  ],
  deckId: 'deck-1',
  deck: { title: 'Bài 01', ownerId, exam: 'TOEIC_LR' },
})

const prismaWith = (findMany: ReturnType<typeof vi.fn>) =>
  ({ lingoCard: { findMany } }) as unknown as PrismaService

const indexMock = () => ({
  ensure: vi.fn().mockResolvedValue(false),
  upsert: vi.fn().mockResolvedValue(undefined),
  deleteWhere: vi.fn().mockResolvedValue(undefined),
  search: vi.fn().mockResolvedValue([]),
})

describe('CardSearchService', () => {
  it('without Elasticsearch, matches term or meaning in Postgres, visible decks only', async () => {
    const findMany = vi.fn().mockResolvedValue([row('1')])
    const service = new CardSearchService(prismaWith(findMany))

    const result = await service.search('u1', 'hợp đồng', 'TOEIC_LR')

    expect(result.engine).toBe('database')
    expect(result.items).toEqual([
      expect.objectContaining({ id: '1', deckTitle: 'Bài 01' }),
    ])
    expect(result.items[0]).not.toHaveProperty('extensions')
    expect(findMany.mock.calls[0]![0]).toMatchObject({
      where: {
        deck: { OR: [{ ownerId: null }, { ownerId: 'u1' }], exam: 'TOEIC_LR' },
      },
      take: 20,
    })
  })

  it('with Elasticsearch, filters to system decks and the user’s own', async () => {
    const index = indexMock()
    const service = new CardSearchService(
      prismaWith(vi.fn()),
      index as unknown as SearchIndex,
    )

    expect((await service.search('u1', 'contract')).engine).toBe(
      'elasticsearch',
    )
    const [, request] = index.search.mock.calls[0]!
    expect(request.query.bool.filter).toEqual([
      {
        bool: {
          should: [
            { bool: { must_not: { exists: { field: 'ownerId' } } } },
            { term: { ownerId: 'u1' } },
          ],
        },
      },
    ])
    expect(request.query.bool.must.multi_match).toMatchObject({
      query: 'contract',
      fuzziness: 'AUTO',
    })
  })

  it('reindexes page by page, flattens từ mở rộng, drops removed cards', async () => {
    const index = indexMock()
    const findMany = vi
      .fn()
      .mockResolvedValueOnce([row('1'), row('2', 'u1')])
      .mockResolvedValueOnce([])
    const service = new CardSearchService(
      prismaWith(findMany),
      index as unknown as SearchIndex,
    )

    await service.reindexAll()

    expect(index.upsert).toHaveBeenCalledWith('lingo-cards-v1', [
      expect.objectContaining({
        id: '1',
        ownerId: null,
        exam: 'TOEIC_LR',
        extensions: 'related liên quan\nghi chú',
      }),
      expect.objectContaining({ id: '2', ownerId: 'u1' }),
    ])
    expect(findMany.mock.calls[1]![0]).toMatchObject({
      cursor: { id: '2' },
      skip: 1,
    })
    expect(index.deleteWhere).toHaveBeenCalledWith(
      'lingo-cards-v1',
      { bool: { must_not: { ids: { values: ['1', '2'] } } } },
      true,
    )
  })

  it('logs an index failure instead of failing the write', async () => {
    const index = indexMock()
    index.ensure.mockRejectedValue(new Error('cluster down'))
    const service = new CardSearchService(
      prismaWith(vi.fn()),
      index as unknown as SearchIndex,
    )
    await expect(service.reindexDecks(['deck-1'])).resolves.toBeUndefined()
  })
})
