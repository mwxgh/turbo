import { EnumField, StringField } from '@repo/nest-common'

import {
  BACKENDS,
  type Choice,
  DATABASES,
  FRONTENDS,
  ORMS,
  REPOS,
  type ScaffoldOptions,
} from '../scaffold'

/** `{ value: value }` of an option list, as EnumField takes it. */
const values = <T extends string>(list: Choice<T>[]) =>
  Object.fromEntries(list.map((c) => [c.value, c.value])) as Record<T, T>

/**
 * Studio options. Shapes only: the name pattern, planned entries and pairs that do not fit are
 * checked by `incompatibilities()` (one place, the same messages for preview and download).
 */
export class GenerateProjectDto implements ScaffoldOptions {
  @StringField({ maxLength: 50, example: 'my-app' })
  name: string

  @EnumField(values(REPOS), { enumName: 'StudioRepo' })
  repo: ScaffoldOptions['repo']

  @EnumField(values(BACKENDS), { enumName: 'StudioBackend' })
  backend: ScaffoldOptions['backend']

  @EnumField(values(DATABASES), { enumName: 'StudioDatabase' })
  database: ScaffoldOptions['database']

  @EnumField(values(ORMS), { enumName: 'StudioOrm' })
  orm: ScaffoldOptions['orm']

  @EnumField(values(FRONTENDS), { enumName: 'StudioFrontend' })
  frontend: ScaffoldOptions['frontend']
}
