import { Test } from '@nestjs/testing'

import type { Client } from '@elastic/elasticsearch'
import { describe, expect, it } from 'vitest'

import {
  ELASTICSEARCH,
  ElasticsearchModule,
  SearchIndex,
  pingElasticsearch,
} from './index.js'

// Nothing listens on port 1: no request leaves the test unless one is sent
const options = {
  node: 'http://127.0.0.1:1',
  indexPrefix: 'unit-',
  maxRetries: 0,
}

describe('ElasticsearchModule', () => {
  it('provides one shared client and index helpers with the prefix', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ElasticsearchModule.forRoot(options)],
    }).compile()

    expect(moduleRef.get(ELASTICSEARCH)).toBeDefined()
    expect(moduleRef.get(SearchIndex).name('cards')).toBe('unit-cards')
    await moduleRef.close() // shutdown hook closes the client
  })

  it('reports an unreachable cluster as down without throwing', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ElasticsearchModule.forRoot(options)],
    }).compile()
    expect(
      await pingElasticsearch(moduleRef.get<Client>(ELASTICSEARCH), 500),
    ).toBe('down')
    await moduleRef.close()
  })
})
