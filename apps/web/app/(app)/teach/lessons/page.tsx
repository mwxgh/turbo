import { LessonsAdmin } from '@/app/(app)/teach/_components/lessons-admin'
import { TeachHeader } from '@/app/(app)/teach/_components/teach-header'
import { DEFAULT_EXAM } from '@/lib/lingo'

export const dynamic = 'force-dynamic'

export default function TeachLessonsPage() {
  return (
    <>
      <TeachHeader
        title="Bài học"
        description="Soạn giáo trình theo module: nội dung Markdown, điểm cần nhớ và phần luyện. Học viên chỉ thấy bài đã xuất bản."
      />
      <LessonsAdmin exam={DEFAULT_EXAM} />
    </>
  )
}
