import { describe, expectTypeOf, it } from 'vitest'

import type { JsonValue, LimitDepth } from './helpers.js'

interface User {
  id: number
  meta: JsonValue | null
  orders?: LimitDepth<Order, 2>[]
}

interface Order {
  id: number
  createdAt: string
  user?: LimitDepth<User, 2>
}

interface Category {
  id: number
  name: string
  parent?: LimitDepth<Category, 1> | null
  children?: LimitDepth<Category, 1>[]
}

describe('LimitDepth', () => {
  it('keeps scalar and Json fields of included relations', () => {
    type U = NonNullable<Order['user']>
    expectTypeOf<U['id']>().toEqualTypeOf<number>()
    expectTypeOf<U['meta']>().toEqualTypeOf<JsonValue | null>()
    type O = NonNullable<U['orders']>[number]
    expectTypeOf<O['createdAt']>().toEqualTypeOf<string>()
  })

  it('collapses relations deeper than the limit to object', () => {
    type O = NonNullable<NonNullable<Order['user']>['orders']>[number]
    expectTypeOf<O['user']>().toEqualTypeOf<object | undefined>()
  })

  it('stops a self relation after one level', () => {
    type Parent = NonNullable<Category['parent']>
    expectTypeOf<Parent['name']>().toEqualTypeOf<string>()
    expectTypeOf<Parent['parent']>().toEqualTypeOf<object | null | undefined>()
    expectTypeOf<NonNullable<Parent['children']>>().toEqualTypeOf<object[]>()
  })
})
