import { StringField } from '@repo/nest-common'

export class SendChatMessageDto {
  @StringField({
    minLength: 1,
    maxLength: 2000,
    example: 'Khi nào dùng "since"?',
  })
  text: string
}
