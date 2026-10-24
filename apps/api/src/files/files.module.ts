import { Module } from '@nestjs/common'

import { env } from '../config/env'
import { FilesController } from './files.controller'
import { FilesService, STORAGE_CONFIG } from './files.service'
import { storageConfig } from './storage'

@Module({
  controllers: [FilesController],
  providers: [
    { provide: STORAGE_CONFIG, useValue: storageConfig(env) },
    FilesService,
  ],
})
export class FilesModule {}
