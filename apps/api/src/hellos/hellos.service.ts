import { Injectable } from '@nestjs/common'

import { type Hello, type Prisma, toPrismaListArgs } from '@repo/db'
import { PrismaService } from '@repo/db/nest'
import { type ListQuery, type Paginated, paginated } from '@repo/utils'

import type { CreateHelloDto } from './dto/create-hello.dto'
import type { UpdateHelloDto } from './dto/update-hello.dto'
import { helloListSpec } from './hellos.list-spec'

@Injectable()
export class HellosService {
  constructor(private readonly prisma: PrismaService) {}

  /** Keyword, filters, sort and pagination from `helloListSpec` (400 on invalid input). */
  async findAll(query: ListQuery): Promise<Paginated<Hello>> {
    const { where, ...args } = toPrismaListArgs<
      Prisma.HelloWhereInput,
      Prisma.HelloOrderByWithRelationInput
    >(helloListSpec, query)
    const [items, total] = await this.prisma.$transaction([
      this.prisma.hello.findMany({ where, ...args }),
      this.prisma.hello.count({ where }),
    ])
    return paginated(items, total, query)
  }

  /** Throws P2025 (→ 404 via PrismaExceptionFilter) when missing. */
  findOne(id: string): Promise<Hello> {
    return this.prisma.hello.findUniqueOrThrow({ where: { id } })
  }

  create(data: CreateHelloDto): Promise<Hello> {
    return this.prisma.hello.create({ data })
  }

  update(id: string, data: UpdateHelloDto): Promise<Hello> {
    return this.prisma.hello.update({ where: { id }, data })
  }

  async remove(id: string): Promise<void> {
    await this.prisma.hello.delete({ where: { id } })
  }
}
