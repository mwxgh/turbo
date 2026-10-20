import { type Type, applyDecorators } from '@nestjs/common'
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger'

import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  type Paginated,
  type PaginationQuery,
} from '@repo/utils'

import { IntField } from './number.js'

/** `?page=&pageSize=` for list endpoints: `@Query() query: PaginationQueryDto`. */
export class PaginationQueryDto implements PaginationQuery {
  @IntField({
    optional: true,
    min: 1,
    example: DEFAULT_PAGE,
    description: '1-based page number',
  })
  page = DEFAULT_PAGE

  @IntField({
    optional: true,
    min: 1,
    max: MAX_PAGE_SIZE,
    example: DEFAULT_PAGE_SIZE,
    description: 'Items per page',
  })
  pageSize = DEFAULT_PAGE_SIZE
}

/** Swagger schema of the pagination fields (items are added per endpoint). */
export class PaginatedMetaDto implements Omit<Paginated<never>, 'items'> {
  @ApiProperty({ example: 42 })
  total: number

  @ApiProperty({ example: DEFAULT_PAGE })
  page: number

  @ApiProperty({ example: DEFAULT_PAGE_SIZE })
  pageSize: number

  @ApiProperty({ example: 3 })
  totalPages: number
}

/**
 * Documents a `Paginated<Item>` response (200) in Swagger:
 *   @Get() @ApiPaginatedResponse(HelloDto) findAll(@Query() q: PaginationQueryDto)
 */
export const ApiPaginatedResponse = (item: Type) =>
  applyDecorators(
    ApiExtraModels(PaginatedMetaDto, item),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedMetaDto) },
          {
            type: 'object',
            required: ['items'],
            properties: {
              items: { type: 'array', items: { $ref: getSchemaPath(item) } },
            },
          },
        ],
      },
    }),
  )
