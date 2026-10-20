import { PartialType } from '@nestjs/swagger'

import { CreateHelloDto } from './create-hello.dto.js'

export class UpdateHelloDto extends PartialType(CreateHelloDto) {}
