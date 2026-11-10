import { PasswordField } from '@repo/nest-common'

export class ChangePasswordDto {
  @PasswordField({ minLength: 1, maxLength: 128 })
  currentPassword: string

  @PasswordField({ minLength: 8, maxLength: 128 })
  newPassword: string
}
