import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common'

import { LingoChatRole, type Prisma, toPrismaListArgs } from '@repo/db'
import { PrismaService } from '@repo/db/nest'
import { type ListQuery, paginated } from '@repo/utils'

import { type ArkMessage, ArkModel } from './ark-model'
import { chatListSpec } from './lingo.list-spec'

/** Earlier messages sent along with a question: enough context, bounded cost. */
const HISTORY_LIMIT = 20
const TITLE_LENGTH = 100
export const NEW_CHAT_TITLE = 'Cuộc trò chuyện mới'

export const TUTOR_PROMPT = `Bạn là gia sư tiếng Anh của Lingo, giúp người Việt luyện thi TOEIC.
- Trả lời bằng tiếng Việt, ví dụ và thuật ngữ bằng tiếng Anh.
- Giải thích ngắn gọn, có ví dụ; khi sửa câu thì nêu lỗi và lý do.
- Câu hỏi ngoài việc học ngoại ngữ: từ chối lịch sự và gợi ý quay lại bài học.
- Không chắc thì nói không chắc, không bịa quy tắc.`

export const chatTitle = (text: string) => {
  const line = text.trim().replace(/\s+/g, ' ')
  return line.length > TITLE_LENGTH
    ? `${line.slice(0, TITLE_LENGTH - 1)}…`
    : line
}

/** AI tutor chats of a learner (docs/product/lingo.md). */
@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name)

  constructor(
    private readonly prisma: PrismaService,
    private readonly model: ArkModel,
  ) {}

  list(userId: string, query: ListQuery) {
    const { where, ...args } = toPrismaListArgs<
      Prisma.LingoChatWhereInput,
      Prisma.LingoChatOrderByWithRelationInput
    >(chatListSpec, query)
    const scoped = { ...where, userId }
    return Promise.all([
      this.prisma.lingoChat.findMany({ where: scoped, ...args }),
      this.prisma.lingoChat.count({ where: scoped }),
    ]).then(([items, total]) => paginated(items, total, query))
  }

  create(userId: string) {
    return this.prisma.lingoChat.create({
      data: { userId, title: NEW_CHAT_TITLE },
    })
  }

  async view(userId: string, id: string) {
    const chat = await this.prisma.lingoChat.findFirst({
      where: { id, userId },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    })
    if (!chat) throw new NotFoundException('Chat not found')
    return chat
  }

  async remove(userId: string, id: string) {
    const { count } = await this.prisma.lingoChat.deleteMany({
      where: { id, userId },
    })
    if (!count) throw new NotFoundException('Chat not found')
  }

  /**
   * Checks before the response starts streaming (errors still become HTTP statuses), saves the
   * question and returns the reply stream. The reply is saved when the stream ends, also when it
   * is cut short (client gone, model error) as long as some text arrived.
   */
  async ask(
    userId: string,
    chatId: string,
    text: string,
    signal?: AbortSignal,
  ) {
    if (!this.model.enabled)
      throw new ServiceUnavailableException('AI tutor is not configured')
    const chat = await this.prisma.lingoChat.findFirst({
      where: { id: chatId, userId },
      select: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: HISTORY_LIMIT,
          select: { role: true, content: true },
        },
      },
    })
    if (!chat) throw new NotFoundException('Chat not found')

    await this.prisma.lingoChat.update({
      where: { id: chatId },
      data: {
        ...(!chat.messages.length && { title: chatTitle(text) }),
        messages: { create: { role: LingoChatRole.USER, content: text } },
      },
    })

    const messages: ArkMessage[] = [
      { role: 'system', content: TUTOR_PROMPT },
      ...chat.messages.reverse().map((message) => ({
        role:
          message.role === LingoChatRole.USER
            ? ('user' as const)
            : ('assistant' as const),
        content: message.content,
      })),
      { role: 'user', content: text },
    ]
    return this.reply(chatId, messages, signal)
  }

  private async *reply(
    chatId: string,
    messages: ArkMessage[],
    signal?: AbortSignal,
  ): AsyncGenerator<string> {
    let answer = ''
    try {
      for await (const piece of this.model.stream(messages, signal)) {
        answer += piece
        yield piece
      }
    } catch (error) {
      if (!signal?.aborted) this.logger.error(error)
      if (!answer) throw error
    } finally {
      if (answer)
        await this.prisma.lingoChat.update({
          where: { id: chatId },
          data: {
            messages: {
              create: { role: LingoChatRole.ASSISTANT, content: answer },
            },
          },
        })
    }
  }
}
