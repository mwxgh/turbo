import 'reflect-metadata'

import assert from 'node:assert/strict'

import { DECORATORS } from '@nestjs/swagger'

import { describe, it } from 'vitest'

import {
  BooleanField,
  ClassField,
  DateField,
  EmailField,
  EnumField,
  IntField,
  PasswordField,
  StringField,
  UuidField,
  validateDto,
  validateEnv,
} from '../index.js'

/** Unique failing paths (one field can fail several constraints). */
const failedPaths = (result: ReturnType<typeof validateDto>) =>
  result.ok
    ? []
    : [
        ...new Set(
          result.errors.map(
            (e) =>
              // "each value in tags must…" / "All tags's elements…" (each: true)
              /^(?:each value in |All )?([^\s']+)/.exec(e)?.[1] ?? e,
          ),
        ),
      ]

describe('StringField', () => {
  class Dto {
    @StringField({ maxLength: 5 })
    name: string

    @StringField({ optional: true })
    note?: string
  }

  it('trims and accepts valid input', () => {
    const result = validateDto(Dto, { name: '  abc  ' })
    assert.ok(result.ok)
    assert.equal(result.data.name, 'abc')
  })

  it('requires the field and enforces maxLength', () => {
    assert.deepEqual(failedPaths(validateDto(Dto, {})), ['name'])
    assert.deepEqual(failedPaths(validateDto(Dto, { name: 'toolong' })), [
      'name',
    ])
  })

  it('rejects empty required strings unless allowEmpty', () => {
    assert.deepEqual(failedPaths(validateDto(Dto, { name: '   ' })), ['name'])
    class Loose {
      @StringField({ allowEmpty: true }) name: string
    }
    assert.ok(validateDto(Loose, { name: '' }).ok)
  })

  it('reports one error per field and rejects non-object payloads', () => {
    const result = validateDto(Dto, {})
    assert.ok(!result.ok)
    assert.equal(result.errors.length, 1)
    assert.deepEqual(validateDto(Dto, 'lobby'), {
      ok: false,
      errors: ['payload must be an object'],
    })
  })

  it('turns empty optional strings into undefined', () => {
    const result = validateDto(Dto, { name: 'a', note: '   ' })
    assert.ok(result.ok)
    assert.equal(result.data.note, undefined)
  })

  it('strips unknown keys', () => {
    const result = validateDto(Dto, { name: 'a', hack: 1 })
    assert.ok(result.ok)
    assert.equal('hack' in result.data, false)
  })
})

describe('other fields', () => {
  enum Color {
    Red = 'RED',
    Blue = 'BLUE',
  }
  class Child {
    @IntField({ min: 1 })
    qty: number
  }
  class Dto {
    @EmailField() email: string
    @PasswordField() password: string
    @UuidField({ optional: true }) id?: string
    @IntField({ optional: true, min: 1 }) page?: number
    @BooleanField({ optional: true }) active?: boolean
    @EnumField(Color) color: Color
    @DateField({ optional: true }) at?: Date
    @ClassField(() => Child, { each: true, optional: true }) items?: Child[]
  }

  it('transforms query-string style values', () => {
    const result = validateDto(Dto, {
      email: ' A@B.COM ',
      password: ' secret12 ',
      page: '2',
      active: 'false',
      color: 'RED',
      at: '2026-01-01T00:00:00.000Z',
      items: [{ qty: '3' }],
    })
    assert.ok(result.ok, JSON.stringify(result))
    assert.equal(result.data.email, 'a@b.com')
    assert.equal(result.data.password, ' secret12 ')
    assert.equal(result.data.page, 2)
    assert.equal(result.data.active, false)
    assert.ok(result.data.at instanceof Date)
    assert.equal(result.data.items?.[0]?.qty, 3)
  })

  it('reports invalid values with nested paths', () => {
    const result = validateDto(Dto, {
      email: 'nope',
      password: 'short',
      id: 'x',
      page: '0',
      color: 'GREEN',
      items: [{ qty: 0 }],
    })
    assert.deepEqual(
      new Set(failedPaths(result)),
      new Set(['email', 'password', 'id', 'page', 'color', 'items.0.qty']),
    )
  })
})

describe('EnumField', () => {
  enum Status {
    Draft = 'DRAFT',
    Published = 'PUBLISHED',
  }
  enum Priority {
    Low = 1,
    High = 2,
  }
  const Dir = { Asc: 'asc', Desc: 'desc' } as const
  type Dir = (typeof Dir)[keyof typeof Dir]

  class Dto {
    @EnumField(Status, { caseInsensitive: true }) status: Status
    @EnumField(Status, { optional: true }) exact?: Status
    @EnumField(Dir, { optional: true, caseInsensitive: true }) dir?: Dir
    @EnumField(Priority, { optional: true, caseInsensitive: true })
    priority?: Priority
    @EnumField(Status, {
      optional: true,
      nullable: true,
      caseInsensitive: true,
    })
    maybe?: Status | null
    @EnumField(Status, {
      each: true,
      optional: true,
      caseInsensitive: true,
      uniqueItems: true,
    })
    tags?: Status[]
  }
  const ok = (input: Record<string, unknown>) => {
    const result = validateDto(Dto, { status: 'DRAFT', ...input })
    assert.ok(result.ok, JSON.stringify(result))
    return result.data
  }
  const fails = (input: Record<string, unknown>) =>
    failedPaths(validateDto(Dto, { status: 'DRAFT', ...input }))

  it.each([
    ['DRAFT', Status.Draft],
    ['draft', Status.Draft],
    ['  Published ', Status.Published],
    ['pUbLiShEd', Status.Published],
  ])('caseInsensitive maps %j to the enum value', (input, expected) => {
    assert.equal(ok({ status: input }).status, expected)
  })

  it('works for const objects (lowercase values)', () => {
    assert.equal(ok({ dir: 'DESC' }).dir, 'desc')
    assert.equal(ok({ dir: ' Asc ' }).dir, 'asc')
    assert.deepEqual(fails({ dir: 'up' }), ['dir'])
  })

  it('still rejects unknown, empty and non-string values', () => {
    for (const status of ['GREEN', '', '   ', 'draf', 1, true, {}, ['DRAFT']])
      assert.deepEqual(fails({ status }), ['status'], JSON.stringify(status))
  })

  it('is exact without the option', () => {
    assert.equal(ok({ exact: 'DRAFT' }).exact, Status.Draft)
    assert.deepEqual(fails({ exact: 'draft' }), ['exact'])
    assert.deepEqual(fails({ exact: ' DRAFT' }), ['exact'])
  })

  it('leaves numeric enums alone', () => {
    assert.equal(ok({ priority: 2 }).priority, Priority.High)
    // names are not values (plain IsEnum would accept 'High')
    for (const priority of ['High', 'high', '2', 3])
      assert.deepEqual(fails({ priority }), ['priority'], String(priority))
  })

  it('keeps optional / nullable semantics', () => {
    const data = ok({})
    assert.equal(data.dir, undefined)
    assert.equal(ok({ maybe: null }).maybe, null)
    assert.equal(ok({ maybe: 'published' }).maybe, Status.Published)
    assert.deepEqual(fails({ status: undefined }), ['status'])
    assert.deepEqual(fails({ status: null }), ['status'])
  })

  it('each: wraps a single value and normalizes every item', () => {
    assert.deepEqual(ok({ tags: 'draft' }).tags, [Status.Draft])
    assert.deepEqual(ok({ tags: ['draft', ' PUBLISHED'] }).tags, [
      Status.Draft,
      Status.Published,
    ])
    assert.deepEqual(fails({ tags: ['draft', 'nope'] }), ['tags'])
    // uniqueness is checked after normalization
    assert.deepEqual(fails({ tags: ['draft', 'DRAFT'] }), ['tags'])
    assert.equal(ok({ tags: undefined }).tags, undefined)
  })

  it('exact match wins over a case-insensitive one', () => {
    const Mixed = { Lower: 'a', Upper: 'A', Only: 'Only' } as const
    class M {
      @EnumField(Mixed, { caseInsensitive: true }) v: string
    }
    const value = (v: string) => {
      const result = validateDto(M, { v })
      return result.ok ? result.data.v : 'invalid'
    }
    assert.equal(value('a'), 'a')
    assert.equal(value('A'), 'A')
    assert.equal(value('ONLY'), 'Only')
  })

  it('keeps the enum in the Swagger schema', () => {
    const meta = (key: string) =>
      Reflect.getMetadata(
        DECORATORS.API_MODEL_PROPERTIES,
        Dto.prototype,
        key,
      ) as Record<string, unknown>
    assert.deepEqual(meta('status').enum, ['DRAFT', 'PUBLISHED'])
    assert.deepEqual(meta('dir').enum, ['asc', 'desc'])
    assert.deepEqual(meta('priority').enum, [1, 2])
    assert.equal(meta('tags').isArray, true)
  })
})

describe('each (ToArray)', () => {
  class Dto {
    @StringField({ each: true, optional: true }) names?: string[]
    @IntField({ each: true, optional: true, maxItems: 2 }) ids?: number[]
    @UuidField({ each: true, optional: true }) refs?: string[]
  }
  const uuid = '7b0a8f8e-2f4e-4a8e-9d63-3a1c5f0e2b11'

  it('wraps single query values', () => {
    const result = validateDto(Dto, { names: ' a ', ids: '3', refs: uuid })
    assert.ok(result.ok, JSON.stringify(result))
    assert.deepEqual(result.data.names, ['a'])
    assert.deepEqual(result.data.ids, [3])
    assert.deepEqual(result.data.refs, [uuid])
  })

  it('keeps arrays, missing values and array rules', () => {
    const result = validateDto(Dto, { ids: ['1', '2'] })
    assert.ok(result.ok)
    assert.deepEqual(result.data.ids, [1, 2])
    assert.equal(result.data.names, undefined)
    assert.deepEqual(failedPaths(validateDto(Dto, { ids: [1, 2, 3] })), ['ids'])
    assert.deepEqual(failedPaths(validateDto(Dto, { refs: 'x' })), ['refs'])
  })
})

describe('swagger metadata', () => {
  class Dto {
    @StringField({ maxLength: 10, description: 'Name', example: 'Ann' })
    name: string

    @IntField({ optional: true, min: 1, swagger: false })
    hidden?: number
  }

  it('registers ApiProperty from field options', () => {
    const props = Reflect.getMetadata(
      DECORATORS.API_MODEL_PROPERTIES_ARRAY,
      Dto.prototype,
    ) as string[]
    assert.deepEqual(props, [':name'])
    const meta = Reflect.getMetadata(
      DECORATORS.API_MODEL_PROPERTIES,
      Dto.prototype,
      'name',
    ) as Record<string, unknown>
    assert.equal(meta.required, true)
    assert.equal(meta.maxLength, 10)
    assert.equal(meta.description, 'Name')
    assert.equal(meta.example, 'Ann')
  })
})

describe('validateEnv', () => {
  class Env {
    @IntField({ optional: true, min: 1 })
    PORT = 4000

    @StringField()
    DATABASE_URL: string
  }

  it('applies defaults and coerces numbers', () => {
    const env = validateEnv(Env, { PORT: '5000', DATABASE_URL: 'pg://x' })
    assert.equal(env.PORT, 5000)
    assert.equal(validateEnv(Env, { DATABASE_URL: 'pg://x' }).PORT, 4000)
  })

  it('throws on missing values', () => {
    assert.throws(() => validateEnv(Env, {}), /DATABASE_URL/)
  })
})
