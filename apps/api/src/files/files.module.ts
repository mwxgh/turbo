import { Module } from '@nestjs/common'

import { env } from '../config/env.js'
import { FilesController } from './files.controller.js'
import { FilesService, STORAGE_CONFIG } from './files.service.js'
import { storageConfig } from './storage.js'

@Module({
  controllers: [FilesController],
  providers: [
    { provide: STORAGE_CONFIG, useValue: storageConfig(env) },
    FilesService,
  ],
})
export class FilesModule {}
