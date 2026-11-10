import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

import { Role } from '@repo/db'
import type { AuthResponse, User } from '@repo/types'

/** Response shapes, for Swagger only. */
export class UserDto implements User {
  @ApiProperty({ format: 'uuid' })
  id: string

  @ApiProperty({ type: String, nullable: true, format: 'email' })
  email: string | null

  @ApiProperty({ type: String, nullable: true })
  username: string | null

  @ApiProperty({ type: String, nullable: true })
  name: string | null

  @ApiProperty({ enum: Role })
  role: Role

  @ApiProperty({ type: String, nullable: true, format: 'date-time' })
  disabledAt: string | null

  @ApiProperty({ format: 'date-time' })
  createdAt: string

  @ApiProperty({ format: 'date-time' })
  updatedAt: string
}

export class AuthResponseDto implements AuthResponse {
  @ApiProperty({ type: UserDto })
  user: UserDto

  @ApiProperty({ description: 'Access token lifetime in seconds' })
  expiresIn: number

  @ApiPropertyOptional({ description: 'Only with `x-auth-transport: token`' })
  accessToken?: string

  @ApiPropertyOptional({ description: 'Only with `x-auth-transport: token`' })
  refreshToken?: string
}
