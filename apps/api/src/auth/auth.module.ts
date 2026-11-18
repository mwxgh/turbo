import { Module } from '@nestjs/common'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PendingLinks } from './pending-links'

@Module({
  controllers: [AuthController],
  providers: [AuthService, PendingLinks],
  exports: [AuthService, PendingLinks],
})
export class AuthModule {}
