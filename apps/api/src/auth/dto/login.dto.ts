import { PasswordField, StringField } from '@repo/nest-common'

export class LoginDto {
  /** Email or username (case-insensitive). */
  @StringField({
    maxLength: 255,
    toLowerCase: true,
    example: 'admin@example.com',
  })
  login: string

  @PasswordField({ minLength: 1, maxLength: 128 })
  password: string
}
