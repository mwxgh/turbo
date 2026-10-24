import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger'

import { CreateUploadDto } from './dto/create-upload.dto'
import { PresignedUploadDto } from './dto/presigned-upload.dto'
import { FilesService } from './files.service'

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly files: FilesService) {}

  /** Presigned POST: the browser sends the file straight to storage. */
  @Post('uploads')
  @ApiCreatedResponse({ type: PresignedUploadDto })
  createUpload(@Body() body: CreateUploadDto) {
    return this.files.createUpload(body)
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  remove(@Query('key') key: string) {
    return this.files.remove(key)
  }
}
