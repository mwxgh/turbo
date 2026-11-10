import { EmailField, PasswordField, StringField } from '@repo/nest-common'

export class RegisterDto {
  @EmailField({ maxLength: 255, toLowerCase: true })
  email: string

  @StringField({
    optional: true,
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-z0-9._-]+$/,
    toLowerCase: true,
    example: 'jane.doe',
  })
  username?: string

  @StringField({ optional: true, maxLength: 100, example: 'Jane Doe' })
  name?: string

  @PasswordField({ minLength: 8, maxLength: 128 })
  password: string
}
