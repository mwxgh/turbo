import { Inject } from '@nestjs/common'

/** DI token of the shared client: `@InjectElasticsearch() private readonly es: Client`. */
export const ELASTICSEARCH = Symbol('ELASTICSEARCH')
export const InjectElasticsearch = () => Inject(ELASTICSEARCH)

/** Index name prefix of this environment (set by `ElasticsearchModule.forRoot`). */
export const ELASTICSEARCH_INDEX_PREFIX = Symbol('ELASTICSEARCH_INDEX_PREFIX')
