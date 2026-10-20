import 'reflect-metadata'

import { Controller, Get, Query } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ApiProperty, DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { describe, expect, it } from 'vitest'

import {
  ApiPaginatedResponse,
  PaginationQueryDto,
  validateDto,
} from './index.js'

describe('PaginationQueryDto', () => {
  it('applies defaults and converts query strings', () => {
    expect(validateDto(PaginationQueryDto, {})).toMatchObject({
      ok: true,
      data: { page: 1, pageSize: 20 },
    })
    expect(
      validateDto(PaginationQueryDto, { page: '2', pageSize: '50' }),
    ).toMatchObject({ ok: true, data: { page: 2, pageSize: 50 } })
  })

  it.each([{ page: '0' }, { pageSize: '101' }, { page: 'abc' }])(
    'rejects %j',
    (query) => {
      expect(validateDto(PaginationQueryDto, query).ok).toBe(false)
    },
  )
})

describe('ApiPaginatedResponse', () => {
  class ItemDto {
    @ApiProperty() id: string
  }

  @Controller('items')
  class ItemsController {
    @Get()
    @ApiPaginatedResponse(ItemDto)
    findAll(@Query() query: PaginationQueryDto) {
      return query
    }
  }

  it('documents items + pagination fields in OpenAPI', async () => {
    const { Module } = await import('@nestjs/common')
    @Module({ controllers: [ItemsController] })
    class AppModule {}

    const app = await NestFactory.create(AppModule, { logger: false })
    const doc = SwaggerModule.createDocument(app, new DocumentBuilder().build())
    await app.close()

    const op = doc.paths['/items']?.get
    const schema = (
      op?.responses['200'] as { content: Record<string, { schema: unknown }> }
    ).content['application/json']?.schema
    expect(schema).toEqual({
      allOf: [
        { $ref: '#/components/schemas/PaginatedMetaDto' },
        {
          type: 'object',
          required: ['items'],
          properties: {
            items: {
              type: 'array',
              items: { $ref: '#/components/schemas/ItemDto' },
            },
          },
        },
      ],
    })
    expect(Object.keys(doc.components?.schemas ?? {})).toEqual(
      expect.arrayContaining(['PaginatedMetaDto', 'ItemDto']),
    )
    expect(op?.parameters?.map((p) => ('name' in p ? p.name : ''))).toEqual([
      'page',
      'pageSize',
    ])
  })
})
