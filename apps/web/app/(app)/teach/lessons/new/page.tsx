import { LessonEditor } from '@/app/(app)/teach/_components/lesson-editor'
import { TeachHeader } from '@/app/(app)/teach/_components/teach-header'
import { DEFAULT_EXAM } from '@/lib/lingo'

export const dynamic = 'force-dynamic'

export default async function NewLessonPage({
  searchParams,
}: PageProps<'/teach/lessons/new'>) {
  const { module } = await searchParams
  return (
    <>
      <TeachHeader
        title="Bài mới"
        description="Bài mới ở trạng thái nháp cho tới khi bạn chọn xuất bản."
      />
      <LessonEditor
        exam={DEFAULT_EXAM}
        moduleId={typeof module === 'string' ? module : undefined}
      />
    </>
  )
}
