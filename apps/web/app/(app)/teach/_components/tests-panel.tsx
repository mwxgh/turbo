'use client'

import { type FormEvent, useState } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Check,
  ChevronDown,
  ChevronUp,
  Layers,
  Loader2,
  Trash2,
  Undo2,
} from 'lucide-react'

import { Badge } from '@repo/ui/components/badge'
import { Button } from '@repo/ui/components/button'
import { Input } from '@repo/ui/components/input'
import { Label } from '@repo/ui/components/label'
import { toast } from '@repo/ui/components/sonner'
import { formatDateTime } from '@repo/utils'

import { withToast } from '@/lib/action-toast'
import {
  assembleTest,
  deleteTest,
  setItemStatus,
  setTestStatus,
} from '@/lib/lingo-actions'
import {
  adminTestQueryOptions,
  adminTestsQueryOptions,
  lingoKeys,
} from '@/lib/queries/lingo'

import { Panel, selectClass } from './panel'

const TESTS_QUERY = { page: 1, pageSize: 50 }

const STATUS_LABEL: Record<string, string> = {
  DRAFT: 'Nháp',
  NEEDS_REVIEW: 'Cần xem lại',
  PUBLISHED: 'Đã xuất bản',
  REJECTED: 'Đã loại',
}

/** Builds a DRAFT test from published items. */
export function AssembleTestPanel({ exam }: { exam: string }) {
  const queryClient = useQueryClient()
  const [kind, setKind] = useState<'FULL' | 'MINI'>('MINI')
  const [title, setTitle] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    try {
      const res = await assembleTest({ exam, kind, title: title.trim() })
      if (res.data) {
        const short = Object.entries(res.data.shortfall)
        toast.success('Đã ghép đề nháp', {
          description: short.length
            ? `Thiếu câu: ${short.map(([p, n]) => `${p} ${n}`).join(', ')}`
            : 'Đủ câu ở mọi Part.',
        })
        setTitle('')
        await queryClient.invalidateQueries({ queryKey: lingoKeys.all })
      } else
        toast.error('Không ghép được đề', {
          description: res.errors?.join(' · '),
        })
    } catch {
      toast.error('Không kết nối được máy chủ')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Panel
      icon={Layers}
      title="Ghép đề từ câu đã duyệt"
      description="Lấy câu đã xuất bản theo cấu trúc đề, ưu tiên câu chưa nằm trong đề nào. Part thiếu câu được báo lại."
    >
      <form
        onSubmit={(e) => void submit(e)}
        className="flex flex-wrap items-end gap-4"
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="assemble-title">Tên đề</Label>
          <Input
            id="assemble-title"
            required
            maxLength={150}
            value={title}
            placeholder="TOEIC Test 01"
            onChange={(e) => setTitle(e.target.value)}
            className="w-48"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="assemble-kind">Loại</Label>
          <select
            id="assemble-kind"
            className={selectClass}
            value={kind}
            onChange={(e) => setKind(e.target.value as 'FULL' | 'MINI')}
          >
            <option value="MINI">Mini test</option>
            <option value="FULL">Full test</option>
          </select>
        </div>
        <Button type="submit" disabled={busy || !title.trim()}>
          {busy && (
            <Loader2
              aria-hidden
              className="animate-spin motion-reduce:animate-none"
            />
          )}
          Ghép đề
        </Button>
      </form>
    </Panel>
  )
}

/** Item statuses of one test, with the actions that publish it. */
function TestReview({ id, status }: { id: string; status: string }) {
  const queryClient = useQueryClient()
  const { data: test } = useQuery(adminTestQueryOptions(id))
  if (!test) return <p className="text-sm text-muted-foreground">Đang tải…</p>

  const pending = test.items.filter((i) => i.status !== 'PUBLISHED')
  const noPhoto = test.items.filter(
    (i) => i.part === 'P1' && !i.imageKey,
  ).length
  const counts = test.items.reduce<Record<string, number>>((acc, i) => {
    acc[i.status] = (acc[i.status] ?? 0) + 1
    return acc
  }, {})

  async function publishItems() {
    const res = await withToast(
      setItemStatus(
        pending.map((i) => i.id),
        'PUBLISHED',
      ),
      {
        success: `Đã duyệt ${pending.length} item`,
        error: 'Không duyệt được item',
      },
    )
    if (!res.errors)
      await queryClient.invalidateQueries({ queryKey: lingoKeys.all })
  }

  return (
    <div className="flex flex-col gap-3 border-t pt-3 text-sm">
      <p className="text-muted-foreground">
        {test.items.length} item ·{' '}
        {Object.entries(counts)
          .map(([s, n]) => `${STATUS_LABEL[s] ?? s} ${n}`)
          .join(' · ')}
        {test.batch?.message && ` · AI: ${test.batch.message}`}
      </p>
      {noPhoto > 0 && (
        <p className="text-amber-700 dark:text-amber-300">
          {noPhoto} câu Part 1 chưa có ảnh: tải ảnh ở “Ngân hàng câu hỏi” (lọc
          Part P1) trước khi duyệt.
        </p>
      )}
      {status !== 'PUBLISHED' && pending.length > 0 && (
        <div className="flex flex-col gap-2">
          <p>
            Xem kỹ các item trong “Ngân hàng câu hỏi” trước. Duyệt hàng loạt chỉ
            nên dùng khi đã kiểm tra.
          </p>
          <Button
            size="sm"
            variant="outline"
            className="self-start"
            disabled={noPhoto > 0}
            onClick={() => {
              if (
                window.confirm(
                  `Duyệt ${pending.length} item chưa xuất bản của đề này?`,
                )
              )
                void publishItems()
            }}
          >
            <Check aria-hidden />
            Duyệt {pending.length} item của đề
          </Button>
        </div>
      )}
    </div>
  )
}

/** Every test: review, publish, unpublish, delete. */
export function TestsListPanel() {
  const queryClient = useQueryClient()
  const { data } = useQuery(adminTestsQueryOptions(TESTS_QUERY))
  const [open, setOpen] = useState<string>()
  const tests = data?.items ?? []

  async function change(id: string, status: string) {
    const res = await withToast(setTestStatus(id, status), {
      success: status === 'PUBLISHED' ? 'Đã xuất bản đề' : 'Đã gỡ đề',
      error: 'Không đổi được trạng thái đề',
    })
    if (!res.errors)
      await queryClient.invalidateQueries({ queryKey: lingoKeys.all })
  }

  async function remove(id: string, title: string) {
    if (!window.confirm(`Xoá đề “${title}”? Câu hỏi vẫn được giữ.`)) return
    const res = await withToast(deleteTest(id), {
      success: 'Đã xoá đề',
      error: 'Không xoá được đề',
    })
    if (!res.errors)
      await queryClient.invalidateQueries({ queryKey: lingoKeys.all })
  }

  return (
    <section aria-labelledby="tests-heading" className="flex flex-col gap-3">
      <h2 id="tests-heading" className="text-lg font-semibold">
        Bộ đề
      </h2>
      {tests.length === 0 ? (
        <p
          className="rounded-xl border border-dashed p-6 text-center text-sm
            text-muted-foreground"
        >
          Chưa có đề nào. Ghép đề từ câu đã duyệt hoặc sinh đề bằng AI.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {tests.map((test) => (
            <li
              key={test.id}
              className="flex flex-col gap-2 rounded-xl border p-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">{test.title}</span>
                <Badge variant="outline">{test.kind}</Badge>
                <Badge
                  variant={
                    test.status === 'PUBLISHED' ? 'default' : 'secondary'
                  }
                >
                  {STATUS_LABEL[test.status] ?? test.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {test.questions} câu ·{' '}
                  {test.parts
                    .map((p) =>
                      p.questions < p.target
                        ? `${p.code} ${p.questions}/${p.target}`
                        : p.code,
                    )
                    .join(', ')}{' '}
                  · {formatDateTime(test.createdAt)}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  aria-expanded={open === test.id}
                  onClick={() =>
                    setOpen((prev) => (prev === test.id ? undefined : test.id))
                  }
                >
                  {open === test.id ? (
                    <ChevronUp aria-hidden />
                  ) : (
                    <ChevronDown aria-hidden />
                  )}
                  Chi tiết
                </Button>
                {test.status === 'PUBLISHED' ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => void change(test.id, 'DRAFT')}
                  >
                    <Undo2 aria-hidden />
                    Gỡ xuống
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => void change(test.id, 'PUBLISHED')}
                  >
                    <Check aria-hidden />
                    Xuất bản
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => void remove(test.id, test.title)}
                >
                  <Trash2 aria-hidden />
                  Xoá
                </Button>
              </div>
              {open === test.id && (
                <TestReview id={test.id} status={test.status} />
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
