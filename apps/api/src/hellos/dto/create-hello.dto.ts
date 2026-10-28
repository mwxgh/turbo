import { StringField } from '@repo/nest-common'

export class CreateHelloDto {
  @StringField({ maxLength: 255, example: 'Hello, world!' })
  message: string
}
