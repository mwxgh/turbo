import { randomUUID } from 'node:crypto'

import { Test } from '@nestjs/testing'

import type { Client } from '@elastic/elasticsearch'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import {
  ELASTICSEARCH,
  ElasticsearchModule,
  SearchIndex,
  pingElasticsearch,
} from '../src/index.js'

describe('@repo/elasticsearch against a real cluster', () => {
  // A unique prefix per run: tests never see or delete other indices
  const indexPrefix = `e2e-${randomUUID()}-`
  let client: Client
  let indices: SearchIndex
  let close: () => Promise<void>

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ElasticsearchModule.forRoot({
          node: process.env.ELASTICSEARCH_URL!,
          indexPrefix,
        }),
      ],
    }).compile()
    client = moduleRef.get(ELASTICSEARCH)
    indices = moduleRef.get(SearchIndex)
    close = () => moduleRef.close()
  })

  afterAll(async () => {
    await indices.drop('words')
    await close()
  })

  it('answers the health ping', async () => {
    expect(await pingElasticsearch(client)).toBe('up')
  })

  it('creates the prefixed index once', async () => {
    const definition = {
      mappings: { properties: { word: { type: 'text' as const } } },
    }
    expect(await indices.ensure('words', definition)).toBe(true)
    expect(await indices.ensure('words', definition)).toBe(false)
    expect(await client.indices.exists({ index: `${indexPrefix}words` })).toBe(
      true,
    )
  })

  it('upserts, searches and deletes documents', async () => {
    await indices.upsert(
      'words',
      [
        { id: '1', word: 'contract', owner: 'a' },
        { id: '2', word: 'contractor', owner: 'b' },
      ],
      true,
    )
    const hits = await indices.search<{ word: string }>('words', {
      query: { match: { word: 'contract' } },
    })
    expect(hits[0]).toMatchObject({ id: '1', word: 'contract' })

    // Replacing a document keeps one copy
    await indices.upsert(
      'words',
      [{ id: '1', word: 'agenda', owner: 'a' }],
      true,
    )
    await indices.deleteWhere('words', { term: { owner: 'b' } }, true)
    const all = await indices.search<{ word: string }>('words', {
      query: { match_all: {} },
    })
    expect(all.map((h) => h.word)).toEqual(['agenda'])
  })
})
