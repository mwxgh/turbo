import { ApiProperty } from '@nestjs/swagger'

import type { Jsonify } from 'type-fest'

import type { Hello } from '@repo/db'

/**
 * Response shape, for Swagger only (no validation). `implements` keeps it in
 * sync with the Prisma model as JSON (dates → ISO strings).
 */
export class HelloDto implements Jsonify<Hello> {
  @ApiProperty({ format: 'uuid' })
  id: string

  @ApiProperty()
  message: string

  @ApiProperty({ format: 'date-time' })
  createdAt: string

  @ApiProperty({ format: 'date-time' })
  updatedAt: string
}
