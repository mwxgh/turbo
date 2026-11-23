import { Inject } from '@nestjs/common'

/** DI token of the shared client: `@InjectRedis() private readonly redis: Redis`. */
export const REDIS = Symbol('REDIS')
export const InjectRedis = () => Inject(REDIS)
