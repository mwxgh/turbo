import { StringField } from '@repo/nest-common'

/** Native clients send the refresh token in the body; browsers send the refresh cookie. */
export class RefreshDto {
  @StringField({ optional: true, maxLength: 200 })
  refreshToken?: string
}
