import { StringField } from '@repo/decorators'

export class JoinRoomDto {
  @StringField({ maxLength: 64 })
  room: string
}
