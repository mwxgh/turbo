import { ApiProperty } from '@nestjs/swagger'

/** Response shapes, for Swagger only (no validation). */
export class HelloDto {
  @ApiProperty({ format: 'uuid' })
  id: string

  @ApiProperty()
  message: string

  @ApiProperty({ format: 'date-time' })
  createdAt: string

  @ApiProperty({ format: 'date-time' })
  updatedAt: string
}
