import { StringField } from '@repo/decorators'

export class CreateHelloDto {
  @StringField({ maxLength: 255, example: 'Hello, world!' })
  message: string
}
