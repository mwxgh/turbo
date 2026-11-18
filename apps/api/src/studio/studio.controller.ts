import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  StreamableFile,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger'
import { ThrottlerGuard } from '@nestjs/throttler'

import { GenerateProjectDto } from './dto/generate-project.dto'
import { StudioService } from './studio.service'

@UseGuards(ThrottlerGuard)
@ApiTags('studio')
@Controller('studio')
export class StudioController {
  constructor(private readonly studio: StudioService) {}

  /** The generated project as a zip (signed-in users: the global auth guard). */
  @Post('generate')
  @HttpCode(HttpStatus.OK)
  @ApiProduces('application/zip')
  @ApiOkResponse({ schema: { type: 'string', format: 'binary' } })
  @ApiBadRequestResponse({ description: 'Options that cannot be generated' })
  async generate(@Body() body: GenerateProjectDto) {
    const { filename, zip } = await this.studio.zip(body)
    return new StreamableFile(zip, {
      type: 'application/zip',
      disposition: `attachment; filename="${filename}"`,
      length: zip.length,
    })
  }
}
