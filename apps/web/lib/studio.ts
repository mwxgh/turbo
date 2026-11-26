import type { StudioCategory } from '@repo/types'

/** Menu groups of Studio: URL segment ↔ API category, with their labels. */
export const CATEGORIES = [
  {
    segment: 'languages',
    category: 'LANGUAGE',
    label: 'Ngôn ngữ',
    description: 'Cú pháp, kiểu dữ liệu và cách tư duy của từng ngôn ngữ.',
  },
  {
    segment: 'frameworks',
    category: 'FRAMEWORK',
    label: 'Framework',
    description: 'Xây ứng dụng thật với các framework phổ biến.',
  },
  {
    segment: 'patterns',
    category: 'PATTERN',
    label: 'Design pattern',
    description: 'Lời giải đã được kiểm chứng cho các vấn đề thiết kế lặp lại.',
  },
  {
    segment: 'fundamentals',
    category: 'FUNDAMENTAL',
    label: 'Nền tảng',
    description: 'Git, HTTP và những kiến thức mọi lập trình viên cần.',
  },
  {
    segment: 'tools',
    category: 'TOOL',
    label: 'Công cụ',
    description: 'Docker và các công cụ dùng hằng ngày.',
  },
  {
    segment: 'databases',
    category: 'DATABASE',
    label: 'Cơ sở dữ liệu',
    description: 'SQL, thiết kế bảng, index, transaction và NoSQL.',
  },
  {
    segment: 'devops',
    category: 'DEVOPS',
    label: 'DevOps & Cloud',
    description: 'Linux, CI/CD, Kubernetes, cloud và giám sát hệ thống.',
  },
  {
    segment: 'computer-science',
    category: 'CS',
    label: 'Khoa học máy tính',
    description: 'Cấu trúc dữ liệu, giải thuật và thiết kế hệ thống.',
  },
  {
    segment: 'security',
    category: 'SECURITY',
    label: 'Bảo mật',
    description: 'Xác thực, OWASP Top 10 và bảo vệ API.',
  },
] as const satisfies readonly {
  segment: string
  category: StudioCategory
  label: string
  description: string
}[]

export type CategoryInfo = (typeof CATEGORIES)[number]

export const categoryBySegment = (segment: string) =>
  CATEGORIES.find((c) => c.segment === segment)

export const categoryOf = (category: StudioCategory): CategoryInfo =>
  CATEGORIES.find((c) => c.category === category) ?? CATEGORIES[0]

export const trackHref = (slug: string) => `/studio/tracks/${slug}`
export const lessonHref = (track: string, lesson: string) =>
  `/studio/tracks/${track}/${lesson}`

/** Share done as a whole percent; 0 for an empty list. */
export const donePercent = (done: number, total: number) =>
  total ? Math.round((done / total) * 100) : 0
