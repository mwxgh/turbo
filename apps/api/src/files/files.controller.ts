import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger'
import { ThrottlerGuard } from '@nestjs/throttler'

import { CreateUploadDto } from './dto/create-upload.dto'
import { PresignedUploadDto } from './dto/presigned-upload.dto'
import { RemoveFileDto } from './dto/remove-file.dto'
import { FilesService } from './files.service'

@UseGuards(ThrottlerGuard)
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
  remove(@Query() { key }: RemoveFileDto) {
    return this.files.remove(key)
  }
}
