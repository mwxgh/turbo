import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpStatus,
  applyDecorators,
} from '@nestjs/common'
import { ApiQuery } from '@nestjs/swagger'

import {
  FILTER_OPERATORS,
  type ListQuery,
  ListQueryError,
  type ListSpec,
  SortDirection,
} from '@repo/utils'

import { EnumField, JsonField } from './other.js'
import { PaginationQueryDto } from './pagination.js'
import { StringField } from './string.js'

/**
 * Query of every list endpoint:
 *   ?page&pageSize&keyword&sortBy&sortDir&filter={json} | filter[field]=…
 * Validate filter/sort against the resource's spec with `toPrismaListArgs` (@repo/db).
 */
export class ListQueryDto extends PaginationQueryDto implements ListQuery {
  @StringField({
    optional: true,
    maxLength: 200,
    description: 'Free-text search',
  })
  keyword?: string

  @StringField({ optional: true, maxLength: 100, description: 'Sort field' })
  sortBy?: string

  @EnumField(SortDirection, {
    optional: true,
    caseInsensitive: true,
    enumName: 'SortDirection',
  })
  sortDir?: SortDirection

  @JsonField({
    optional: true,
    description:
      'JSON object: {"field": value | [values] | null | {"op": value}} – or filter[field]=value',
    example: '{"status":["DRAFT"],"createdAt":{"from":"2026-10-01"}}',
  })
  filter?: Record<string, unknown>
}

const describeFilters = (spec: ListSpec): string => {
  const lines = Object.entries(spec.filters ?? {}).flatMap(([key, field]) => {
    if (!field) return []
    const values = field.values ? ` (${field.values.join(' | ')})` : ''
    const nullable = field.nullable ? ', nullable' : ''
    return `- \`${key}\`: ${field.type}${values}${nullable} – ${FILTER_OPERATORS[field.type].join(', ')}`
  })
  return [
    'JSON object. Value forms: `x` (eq), `[x, y]` (in), `null` (IS NULL), `{"op": x}`.',
    '`date` fields use whole days in Vietnam time (`from`/`to`).',
    ...lines,
  ].join('\n')
}

/**
 * Swagger docs for a list endpoint generated from its spec (allowed filters,
 * operators, sort fields, keyword fields):
 *   @Get() @ApiListQuery(helloListSpec) findAll(@Query() q: ListQueryDto)
 */
export const ApiListQuery = (spec: ListSpec) =>
  applyDecorators(
    ApiQuery({
      name: 'keyword',
      required: false,
      type: String,
      description: spec.keywordFields?.length
        ? `Searches (contains, case-insensitive): ${spec.keywordFields.join(', ')}`
        : 'Not supported by this endpoint',
    }),
    ApiQuery({
      name: 'sortBy',
      required: false,
      enum: [...(spec.sortable ?? [])],
      description: spec.defaultSort
        ? `Default: ${spec.defaultSort.field} ${spec.defaultSort.dir}`
        : undefined,
    }),
    ApiQuery({
      name: 'filter',
      required: false,
      type: String,
      description: describeFilters(spec),
    }),
  )

/** Maps `ListQueryError` (bad filter/sort) to 400 like ValidationPipe errors. */
@Catch(ListQueryError)
export class ListQueryExceptionFilter implements ExceptionFilter {
  catch(error: ListQueryError, host: ArgumentsHost) {
    host
      .switchToHttp()
      .getResponse<{ status(code: number): { json(body: unknown): void } }>()
      .status(HttpStatus.BAD_REQUEST)
      .json({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Bad Request',
        message: [error.message],
      })
  }
}
