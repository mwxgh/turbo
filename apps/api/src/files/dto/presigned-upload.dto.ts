import { ApiProperty } from '@nestjs/swagger'

/** Response shape for Swagger only. */
export class PresignedUploadDto {
  @ApiProperty({ description: 'POST the form here (multipart, file last)' })
  url: string

  @ApiProperty({
    type: 'object',
    additionalProperties: { type: 'string' },
    description: 'Form fields to send before the file',
  })
  fields: Record<string, string>

  @ApiProperty({ example: 'uploads/2026/10/<uuid>/my-cv.pdf' })
  key: string
}
