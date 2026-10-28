import { StringField } from '@repo/nest-common'

export class SendMessageDto {
  @StringField({ maxLength: 64 })
  room: string

  @StringField({ maxLength: 2000 })
  text: string
}
