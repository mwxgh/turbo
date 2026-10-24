import { IntField, StringField } from '@repo/decorators'

export class CreateUploadDto {
  @StringField({ maxLength: 255, example: 'my-cv.pdf' })
  fileName: string

  @StringField({ maxLength: 255, example: 'application/pdf' })
  contentType: string

  /** Bytes; checked against MAX_UPLOAD_BYTES and enforced by the signed policy. */
  @IntField({ min: 1, example: 122880 })
  size: number
}
