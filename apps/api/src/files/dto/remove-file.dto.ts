import { StringField } from '@repo/nest-common'

export class RemoveFileDto {
  @StringField({ maxLength: 512, example: 'uploads/2026/10/<uuid>/my-cv.pdf' })
  key: string
}
