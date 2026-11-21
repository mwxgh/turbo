import {
  Body,
  Controller,
  Get,
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

  /** Choices and the rules between them, for the web form. */
  @Get('options')
  options() {
    return this.studio.options()
  }

  /** Every file of the project (path → content), to review before downloading. */
  @Post('preview')
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({ description: 'Options that cannot be generated' })
  async preview(@Body() body: GenerateProjectDto) {
    return { files: await this.studio.files(body) }
  }

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
