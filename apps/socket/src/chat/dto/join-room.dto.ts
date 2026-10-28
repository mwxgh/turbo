import { StringField } from '@repo/nest-common'

export class JoinRoomDto {
  @StringField({ maxLength: 64 })
  room: string
}
