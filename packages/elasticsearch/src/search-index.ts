import { Inject, Injectable } from '@nestjs/common'

import type { Client, estypes } from '@elastic/elasticsearch'

import { ELASTICSEARCH_INDEX_PREFIX, InjectElasticsearch } from './tokens.js'

/** A document to index: `id` becomes the Elasticsearch `_id`. */
export type SearchDoc = { id: string } & Record<string, unknown>

/** Index settings and mappings, as given to `indices.create`. */
export type IndexDefinition = Pick<
  estypes.IndicesCreateRequest,
  'settings' | 'mappings'
>

/**
 * Index helpers that apply this environment's prefix, so dev / stg / prod can share one cluster:
 * every method takes the base name (`lingo-cards`) and works on `<prefix>lingo-cards`.
 */
@Injectable()
export class SearchIndex {
  constructor(
    @InjectElasticsearch() private readonly client: Client,
    @Inject(ELASTICSEARCH_INDEX_PREFIX) private readonly prefix: string,
  ) {}

  /** Full index name of `base` in this environment. */
  name(base: string): string {
    return `${this.prefix}${base}`
  }

  /** Creates the index if it does not exist; returns true when it was created. */
  async ensure(base: string, definition: IndexDefinition): Promise<boolean> {
    const index = this.name(base)
    if (await this.client.indices.exists({ index })) return false
    await this.client.indices.create({ index, ...definition })
    return true
  }

  /** Index (create or replace) documents in one bulk request; throws on any failed item. */
  async upsert(base: string, docs: SearchDoc[], refresh = false) {
    if (!docs.length) return
    const index = this.name(base)
    const result = await this.client.bulk({
      refresh,
      operations: docs.flatMap(({ id, ...doc }) => [
        { index: { _index: index, _id: id } },
        doc,
      ]),
    })
    if (result.errors) {
      const failed = result.items.find((item) => item.index?.error)
      throw new Error(
        `Elasticsearch bulk index failed: ${failed?.index?.error?.reason ?? 'unknown'}`,
      )
    }
  }

  /** Deletes the documents matching `query` (all of them by default). */
  async deleteWhere(
    base: string,
    query: estypes.QueryDslQueryContainer = { match_all: {} },
    refresh = false,
  ) {
    await this.client.deleteByQuery({
      index: this.name(base),
      query,
      refresh,
      conflicts: 'proceed',
    })
  }

  /** Searches the index; hits keep their `_id` as `id` next to the source fields. */
  async search<T>(
    base: string,
    request: Omit<estypes.SearchRequest, 'index'>,
  ): Promise<(T & { id: string; score: number })[]> {
    const result = await this.client.search<T>({
      index: this.name(base),
      ...request,
    })
    return result.hits.hits.map((hit) => ({
      ...(hit._source as T),
      id: hit._id!,
      score: hit._score ?? 0,
    }))
  }

  /** Drops the index (tests, rebuilds); missing is fine. */
  async drop(base: string) {
    await this.client.indices.delete(
      { index: this.name(base) },
      { ignore: [404] },
    )
  }
}
