import { GRAMMAR_LESSONS } from './grammar'
import { LISTENING_LESSONS } from './listening'
import { READING_LESSONS } from './reading'
import { STRATEGY_LESSONS } from './strategy'
import type { LessonSpec, ModuleId } from './types'
import { VOCAB_LESSONS } from './vocab'

export type {
  LessonExample,
  LessonSection,
  LessonSpec,
  ModuleId,
} from './types'

/** Course modules in study order. */
export const LESSON_MODULES: {
  id: ModuleId
  title: string
  description: string
}[] = [
  {
    id: 'grammar',
    title: 'Ngữ pháp Part 5–6',
    description: 'Mười chủ điểm ngữ pháp ra nhiều nhất ở Part 5 và Part 6',
  },
  {
    id: 'vocab',
    title: 'Từ vựng',
    description:
      'Chọn từ đúng nghĩa và cụm từ cố định, phần khó nhất của Part 5 ở mức 800+',
  },
  {
    id: 'listening',
    title: 'Nghe Part 1–4',
    description: 'Dạng câu hỏi, bẫy thường gặp và cách nghe có chủ đích',
  },
  {
    id: 'reading',
    title: 'Đọc Part 6–7',
    description:
      'Chèn câu, câu NOT, suy luận, từ trong ngữ cảnh và bài đọc nhiều đoạn',
  },
  {
    id: 'strategy',
    title: 'Chiến thuật làm đề',
    description: 'Phân bổ thời gian và cách chữa đề để điểm tăng đều',
  },
]

export const LESSONS: LessonSpec[] = [
  ...GRAMMAR_LESSONS,
  ...VOCAB_LESSONS,
  ...LISTENING_LESSONS,
  ...READING_LESSONS,
  ...STRATEGY_LESSONS,
]

export const lessonById = (id: string) => LESSONS.find((l) => l.id === id)
