import {
  type DynamicModule,
  Module,
  type OnApplicationShutdown,
} from '@nestjs/common'

import { Client, type ClientOptions } from '@elastic/elasticsearch'

import { SearchIndex } from './search-index.js'
import {
  ELASTICSEARCH,
  ELASTICSEARCH_INDEX_PREFIX,
  InjectElasticsearch,
} from './tokens.js'

export interface ElasticsearchModuleOptions extends ClientOptions {
  /** `http://host:9200` (`https://user:pass@host:9200` with security on). */
  node: string
  /** Prepended to every index name, per environment (`dev-`, `prod-`): see `SearchIndex`. */
  indexPrefix?: string
}

/**
 * One Elasticsearch client per app, injectable everywhere (global):
 *
 *   ElasticsearchModule.forRoot({ node: env.ELASTICSEARCH_URL, indexPrefix: `${env.APP_ENV}-` })
 *
 * Provides `ELASTICSEARCH` (the client) and `SearchIndex` (index helpers with the prefix).
 * The client is closed when the app shuts down.
 */
@Module({})
export class ElasticsearchModule implements OnApplicationShutdown {
  constructor(@InjectElasticsearch() private readonly client: Client) {}

  static forRoot({
    indexPrefix = '',
    ...options
  }: ElasticsearchModuleOptions): DynamicModule {
    return {
      module: ElasticsearchModule,
      global: true,
      providers: [
        { provide: ELASTICSEARCH, useFactory: () => new Client(options) },
        { provide: ELASTICSEARCH_INDEX_PREFIX, useValue: indexPrefix },
        SearchIndex,
      ],
      exports: [ELASTICSEARCH, SearchIndex],
    }
  }

  async onApplicationShutdown() {
    await this.client.close()
  }
}
