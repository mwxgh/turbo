import 'reflect-metadata'

import type { AddressInfo } from 'node:net'

import {
  Controller,
  Get,
  type INestApplication,
  Module,
  Query,
  ValidationPipe,
} from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { defineListSpec, parseListFilter, parseListSort } from '@repo/utils'

import {
  ApiListQuery,
  ListQueryDto,
  ListQueryExceptionFilter,
  VALIDATOR_OPTIONS,
} from './index.js'

const spec = defineListSpec({
  keywordFields: ['title'],
  sortable: ['title', 'createdAt'],
  defaultSort: { field: 'createdAt', dir: 'desc' },
  filters: {
    status: { type: 'enum', values: ['A', 'B'] },
    price: { type: 'float' },
  },
})

@Controller('items')
class ItemsController {
  @Get()
  @ApiListQuery(spec)
  findAll(@Query() query: ListQueryDto) {
    // What a service does: validate against the spec, echo the result
    return {
      query,
      filter: parseListFilter(spec, query.filter),
      sort: parseListSort(spec, query.sortBy, query.sortDir),
    }
  }
}

@Module({ controllers: [ItemsController] })
class AppModule {}

describe('ListQueryDto over HTTP', () => {
  let app: INestApplication
  let base: string
  /** Shape returned by ItemsController (200) or the error filters (400). */
  interface Body {
    query: Record<string, unknown>
    filter: unknown[]
    sort: unknown
    message: string[]
  }
  const get = async (qs: string) => {
    const res = await fetch(`${base}/items?${qs}`)
    return { status: res.status, body: (await res.json()) as Body }
  }

  beforeAll(async () => {
    const nest = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: false,
    })
    nest.set('query parser', 'extended') // filter[field]=… → object
    nest.useGlobalPipes(
      new ValidationPipe({
        ...VALIDATOR_OPTIONS,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    )
    nest.useGlobalFilters(new ListQueryExceptionFilter())
    await nest.listen(0, '127.0.0.1')
    app = nest
    base = `http://127.0.0.1:${(nest.getHttpServer().address() as AddressInfo).port}`
  })

  afterAll(async () => {
    await app.close()
  })

  it('accepts the JSON filter form', async () => {
    const filter = encodeURIComponent('{"status":["A","B"],"price":{"gte":10}}')
    const { status, body } = await get(
      `keyword=%20abc%20&sortBy=title&sortDir=DESC&filter=${filter}`,
    )
    expect(status).toBe(200)
    expect(body.query).toMatchObject({ page: 1, pageSize: 20, keyword: 'abc' })
    expect(body.filter).toEqual([
      { path: 'status', op: 'in', value: ['A', 'B'], caseInsensitive: false },
      { path: 'price', op: 'gte', value: 10, caseInsensitive: false },
    ])
    expect(body.sort).toEqual({ path: 'title', dir: 'desc' })
  })

  it('accepts the bracket form (qs)', async () => {
    const { status, body } = await get(
      'filter[status][]=A&filter[price][lt]=5&sortBy=title&sortDir=asc',
    )
    expect(status).toBe(200)
    expect(body.filter).toEqual([
      { path: 'status', op: 'in', value: ['A'], caseInsensitive: false },
      { path: 'price', op: 'lt', value: 5, caseInsensitive: false },
    ])
    expect(body.sort).toEqual({ path: 'title', dir: 'asc' })
  })

  it.each([
    ['DESC', 'desc'],
    ['%20Asc%20', 'asc'],
  ])('normalizes sortDir=%s in the DTO', async (raw, dir) => {
    const { status, body } = await get(`sortDir=${raw}`)
    expect(status).toBe(200)
    expect(body.query.sortDir).toBe(dir)
    expect(body.sort).toEqual({ path: 'createdAt', dir })
  })

  it('uses the default sort', async () => {
    expect((await get('')).body.sort).toEqual({
      path: 'createdAt',
      dir: 'desc',
    })
  })

  it.each([
    ['filter={not json', 'filter must be an object'],
    ['filter={"secret":1}', 'Unknown filter "secret". Allowed: status, price'],
    ['filter[price][like]=1', 'Filter "price" does not support "like"'],
    ['sortBy=password', 'Cannot sort by "password". Allowed: title, createdAt'],
    ['sortDir=up', 'sortDir must be one of the following values: asc, desc'],
    // one term only: sort*, never order*
    ['orderBy=title', 'property orderBy should not exist'],
    ['hack=1', 'property hack should not exist'],
  ])('400 for %s', async (qs, message) => {
    const { status, body } = await get(qs)
    expect(status).toBe(400)
    expect(body.message).toContainEqual(expect.stringContaining(message))
  })

  it('documents the spec in OpenAPI', () => {
    const doc = SwaggerModule.createDocument(app, new DocumentBuilder().build())
    const params = doc.paths['/items']?.get?.parameters as {
      name: string
      description?: string
      schema?: { enum?: string[] }
    }[]
    const byName = Object.fromEntries(params.map((p) => [p.name, p]))
    expect(Object.keys(byName)).toEqual(
      expect.arrayContaining([
        'page',
        'pageSize',
        'keyword',
        'sortBy',
        'sortDir',
        'filter',
      ]),
    )
    // one entry per name (spec docs replace the generic DTO docs)
    expect(params.filter((p) => p.name === 'filter')).toHaveLength(1)
    expect(byName.sortBy?.schema?.enum).toEqual(['title', 'createdAt'])
    expect(byName.keyword?.description).toContain('title')
    expect(byName.filter?.description).toContain('`status`: enum (A | B)')
    expect(byName.orderBy).toBeUndefined()
    expect(byName.sortDir?.schema).toEqual({
      $ref: '#/components/schemas/SortDirection',
    })
    expect(doc.components?.schemas?.SortDirection).toMatchObject({
      enum: ['asc', 'desc'],
    })
  })
})
