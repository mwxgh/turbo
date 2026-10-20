import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'

import {
  ApiListQuery,
  ApiPaginatedResponse,
  ListQueryDto,
} from '@repo/decorators'

import { CreateHelloDto } from './dto/create-hello.dto.js'
import { HelloDto } from './dto/hello.dto.js'
import { UpdateHelloDto } from './dto/update-hello.dto.js'
import { helloListSpec } from './hellos.list-spec.js'
import { HellosService } from './hellos.service.js'

@ApiTags('hellos')
@Controller('hellos')
export class HellosController {
  constructor(private readonly hellosService: HellosService) {}

  @Get()
  @ApiListQuery(helloListSpec)
  @ApiPaginatedResponse(HelloDto)
  findAll(@Query() query: ListQueryDto) {
    return this.hellosService.findAll(query)
  }

  @Get(':id')
  @ApiOkResponse({ type: HelloDto })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.hellosService.findOne(id)
  }

  @Post()
  @ApiCreatedResponse({ type: HelloDto })
  create(@Body() body: CreateHelloDto) {
    return this.hellosService.create(body)
  }

  @Patch(':id')
  @ApiOkResponse({ type: HelloDto })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateHelloDto) {
    return this.hellosService.update(id, body)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.hellosService.remove(id)
  }
}
