'use client'

import { useState } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Check,
  Database,
  FileJson,
  FileSpreadsheet,
  ImageUp,
  Loader2,
  X,
} from 'pulsoicon-react'

import { Button } from '@repo/ui/components/button'
import { FileUploadDialog } from '@repo/ui/components/file-upload'
import { Input } from '@repo/ui/components/input'
import { Label } from '@repo/ui/components/label'
import { toast } from '@repo/ui/components/sonner'
import { cn } from '@repo/ui/lib/utils'
import { MAX_UPLOAD_BYTES, formatDateTime } from '@repo/utils'

import { Transcript } from '@/app/(app)/lingo/_components/question-media'
import { withToast } from '@/lib/action-toast'
import { LETTERS } from '@/lib/lingo'
import {
  createDeck,
  importCards,
  importItems,
  loadSamples,
  setItemImage,
  setItemStatus,
} from '@/lib/lingo-actions'
import {
  type AdminItem,
  type ImportResult,
  type ScriptLine,
  adminItemsQueryOptions,
  batchesQueryOptions,
  decksQueryOptions,
  examQueryOptions,
  lingoKeys,
} from '@/lib/queries/lingo'
import { deleteFromStorage, uploadToStorage } from '@/lib/storage'

import {
  DIFFICULTY_LABEL,
  Panel,
  ResultSummary,
  STATUS_LABEL,
  StatusDot,
  emptyClass,
  sectionHeadingClass,
  selectClass,
} from './panel'

const ITEM_EXAMPLE = `[
  {
    "difficulty": "MEDIUM",
    "topic": "Office",
    "questions": [
      {
        "text": "Ms. Tanaka ------- the report every March.",
        "options": ["present", "presents", "presenting", "to present"],
        "answer": 1,
        "explanationVi": "Chủ ngữ số ít, thói quen → hiện tại đơn: presents.",
        "translationVi": "Cô Tanaka trình bày báo cáo vào tháng Ba hằng năm.",
        "skillTags": ["grammar.verb-tense"]
      }
    ]
  }
]`

const CSV_EXAMPLE = `term,pos,reading,meaningVi,example,exampleVi,topic
deadline,n,/ˈdedlaɪn/,hạn chót,The deadline is May 1.,Hạn chót là ngày 1/5.,Office`

export function SamplesPanel() {
  const queryClient = useQueryClient()
  const [busy, setBusy] = useState(false)
  async function run() {
    setBusy(true)
    try {
      const res = await loadSamples()
      if (res.data) {
        toast.success('Đã nạp dữ liệu mẫu', {
          description: `${res.data.items.succeeded} câu, ${res.data.cards.succeeded} thẻ mới`,
        })
        await queryClient.invalidateQueries({ queryKey: lingoKeys.all })
      } else
        toast.error('Không nạp được', { description: res.errors?.join(' · ') })
    } finally {
      setBusy(false)
    }
  }
  return (
    <Panel
      icon={Database}
      title="Dữ liệu mẫu"
      description="40 câu mẫu Part 2–7 (đã xuất bản), một đề mẫu, bộ 30 từ cơ bản và 6 bộ từ vựng theo chủ đề (240 từ). Chạy lại không tạo trùng."
    >
      <Button
        variant="outline"
        className="self-start"
        onClick={() => void run()}
        disabled={busy}
      >
        {busy && (
          <Loader2
            aria-hidden="true"
            className="animate-spin motion-reduce:animate-none"
          />
        )}
        Nạp dữ liệu mẫu
      </Button>
    </Panel>
  )
}

export function ImportItemsPanel({ exam }: { exam: string }) {
  const queryClient = useQueryClient()
  const { data: spec } = useQuery(examQueryOptions(exam))
  const parts = spec?.sections.flatMap((s) => s.parts) ?? []
  const [part, setPart] = useState('P5')
  const [text, setText] = useState('')
  const [fileName, setFileName] = useState<string>()
  const [result, setResult] = useState<ImportResult>()
  const [busy, setBusy] = useState(false)

  async function onFile(file: File | undefined) {
    if (!file) return
    setFileName(file.name)
    setText(await file.text())
  }

  async function submit() {
    let items: unknown
    try {
      items = JSON.parse(text)
    } catch {
      toast.error('JSON không hợp lệ')
      return
    }
    if (!Array.isArray(items) || !items.length) {
      toast.error('File phải là một mảng item')
      return
    }
    setBusy(true)
    try {
      const res = await importItems({ exam, part, items, fileName })
      if (res.data) {
        setResult(res.data)
        toast.success(`Đã nhập ${res.data.succeeded} item vào hàng chờ duyệt`)
        await queryClient.invalidateQueries({ queryKey: lingoKeys.all })
      } else
        toast.error('Không nhập được', { description: res.errors?.join(' · ') })
    } catch {
      toast.error('Không gửi được (file quá 100 KB?)')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Panel
      icon={FileJson}
      title="Nhập câu hỏi (JSON)"
      description="Mảng item theo định dạng bên dưới. Item hợp lệ vào hàng chờ duyệt, item lỗi được liệt kê theo dòng. Tối đa 100 KB mỗi lần."
    >
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="import-part">Part</Label>
          <select
            id="import-part"
            className={selectClass}
            value={part}
            onChange={(e) => setPart(e.target.value)}
          >
            {parts.map((p) => (
              <option key={p.code} value={p.code}>
                {p.code} · {p.nameVi}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="import-file">File .json</Label>
          <Input
            id="import-file"
            type="file"
            accept=".json,application/json"
            onChange={(e) => void onFile(e.target.files?.[0])}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="import-text">Hoặc dán JSON</Label>
        <textarea
          id="import-text"
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            setFileName(undefined)
          }}
          placeholder={ITEM_EXAMPLE}
          rows={10}
          spellCheck={false}
          className="rounded-lg border border-input bg-transparent p-3 font-mono
            text-xs outline-none focus-visible:border-ring focus-visible:ring-3
            focus-visible:ring-ring/50 dark:bg-input/30"
        />
        <p className="text-xs leading-relaxed text-muted-foreground">
          Theo Part: P1 có <code>scene</code> (mô tả ảnh), không có{' '}
          <code>text</code>; P2 có <code>text</code> + 3 lựa chọn,{' '}
          <code>accent</code>; P3/P4 có <code>transcript</code> (
          <code>{'[{ speaker: M|W|M2|W2|N, accent: US|GB|AU|CA, text }]'}</code>
          ) + 3 câu; P6/P7 có <code>passage</code> (P6 đánh dấu chỗ trống [1]…
          [4], P7 nhiều văn bản ngăn bằng dòng <code>---</code>).
        </p>
        <p className="text-xs text-muted-foreground">
          Tag kỹ năng hợp lệ:{' '}
          <span className="font-mono">
            {Object.keys(spec?.skillTags ?? {}).join(', ')}
          </span>
        </p>
      </div>
      <Button
        className="self-start"
        onClick={() => void submit()}
        disabled={!text.trim() || busy}
      >
        {busy && (
          <Loader2
            aria-hidden="true"
            className="animate-spin motion-reduce:animate-none"
          />
        )}
        Nhập
      </Button>
      {result && <ResultSummary result={result} />}
    </Panel>
  )
}

export function ImportCardsPanel({ exam }: { exam: string }) {
  const queryClient = useQueryClient()
  const { data: decks = [] } = useQuery(decksQueryOptions(exam))
  const systemDecks = decks.filter((d) => d.ownerId === null)
  const [deckId, setDeckId] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [csv, setCsv] = useState('')
  const [fileName, setFileName] = useState<string>()
  const [result, setResult] = useState<ImportResult>()
  const [busy, setBusy] = useState(false)

  async function submit() {
    setBusy(true)
    try {
      let target = deckId
      if (!target) {
        const created = await createDeck({
          exam,
          title: newTitle.trim(),
          language: 'en',
        })
        if (!created.data) {
          toast.error('Không tạo được bộ thẻ', {
            description: created.errors?.join(' · '),
          })
          return
        }
        target = created.data.id
        setDeckId(target)
        setNewTitle('')
      }
      const res = await importCards(target, csv, fileName)
      if (res.data) {
        setResult(res.data)
        toast.success(`Đã thêm ${res.data.succeeded} thẻ`)
        await queryClient.invalidateQueries({ queryKey: lingoKeys.all })
      } else
        toast.error('Không nhập được', { description: res.errors?.join(' · ') })
    } catch {
      toast.error('Không gửi được (file quá 90 KB?)')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Panel
      icon={FileSpreadsheet}
      title="Nhập từ vựng (CSV)"
      description="Dòng đầu là tiêu đề cột. Từ đã có trong bộ thẻ được bỏ qua."
    >
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="deck">Bộ thẻ</Label>
          <select
            id="deck"
            className={selectClass}
            value={deckId}
            onChange={(e) => setDeckId(e.target.value)}
          >
            <option value="">+ Bộ thẻ mới…</option>
            {systemDecks.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title} ({d.cards})
              </option>
            ))}
          </select>
        </div>
        {!deckId && (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="deck-title">Tên bộ thẻ mới</Label>
            <Input
              id="deck-title"
              value={newTitle}
              maxLength={100}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="csv-file">File .csv</Label>
          <Input
            id="csv-file"
            type="file"
            accept=".csv,text/csv"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (!file) return
              setFileName(file.name)
              void file.text().then(setCsv)
            }}
          />
        </div>
      </div>
      <pre
        className="overflow-x-auto rounded-lg bg-muted/40 p-3 font-mono text-xs
          text-muted-foreground"
      >
        {CSV_EXAMPLE}
      </pre>
      <Button
        className="self-start"
        onClick={() => void submit()}
        disabled={!csv.trim() || busy || (!deckId && !newTitle.trim())}
      >
        {busy && (
          <Loader2
            aria-hidden="true"
            className="animate-spin motion-reduce:animate-none"
          />
        )}
        Nhập {fileName ? `“${fileName}”` : ''}
      </Button>
      {result && <ResultSummary result={result} />}
    </Panel>
  )
}

/** Part 1: upload the photo the scene describes (required before publishing). */
function PhotoUpload({ item }: { item: AdminItem }) {
  const queryClient = useQueryClient()
  return (
    <FileUploadDialog
      trigger={
        <Button size="sm" variant="outline" className="self-start">
          <ImageUp aria-hidden />
          {item.imageKey ? 'Đổi ảnh' : 'Tải ảnh lên'}
        </Button>
      }
      title="Ảnh cho câu Part 1"
      description="Ảnh phải khớp mô tả cảnh: chỉ một lựa chọn mô tả đúng."
      accept={{
        'image/jpeg': ['.jpeg', '.jpg'],
        'image/png': ['.png'],
        'image/webp': ['.webp'],
      }}
      maxSize={MAX_UPLOAD_BYTES}
      maxFiles={1}
      upload={uploadToStorage}
      onRemove={({ key }) => deleteFromStorage(key)}
      confirmLabel="Gắn ảnh"
      onConfirm={async (files) => {
        const key = files[0]?.result.key
        if (!key) return
        const res = await withToast(setItemImage(item.id, key), {
          success: 'Đã gắn ảnh',
          error: 'Không gắn được ảnh',
        })
        if (res.errors) throw new Error(res.errors.join(' · '))
        await queryClient.invalidateQueries({ queryKey: lingoKeys.all })
      }}
    />
  )
}

function ItemCard({
  item,
  selected,
  onSelect,
}: {
  item: AdminItem
  selected: boolean
  onSelect: (checked: boolean) => void
}) {
  const content = (item.content ?? {}) as {
    passage?: string
    transcript?: ScriptLine[]
    scene?: string
  }
  return (
    <li
      className={cn(
        'flex gap-3 rounded-xl border bg-card p-5 shadow-xs transition-colors',
        selected && 'border-primary/40 bg-primary/5',
      )}
    >
      <input
        type="checkbox"
        aria-label={`Chọn item ${item.topic ?? item.id}`}
        checked={selected}
        onChange={(e) => onSelect(e.target.checked)}
        className="mt-1 size-4 cursor-pointer accent-primary"
      />
      <div className="flex flex-1 flex-col gap-3">
        <div
          className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm
            text-muted-foreground"
        >
          <span className="tabular-nums">
            {item.part} · {DIFFICULTY_LABEL[item.difficulty]}
            {item.topic && ` · ${item.topic}`}
          </span>
          <StatusDot
            status={item.status}
            label={STATUS_LABEL[item.status] ?? item.status}
          />
        </div>
        {content.scene && (
          <div className="flex flex-col gap-2 text-sm">
            <p>
              <span className="font-medium">Cảnh: </span>
              {content.scene}
            </p>
            <p className="text-muted-foreground">
              {item.imageKey
                ? `Ảnh: ${item.imageKey.split('/').pop()}`
                : 'Chưa có ảnh'}
            </p>
            <PhotoUpload item={item} />
          </div>
        )}
        {content.transcript && <Transcript lines={content.transcript} />}
        {content.passage && (
          <p
            className="max-h-48 overflow-y-auto rounded-lg bg-muted/40 p-3
              text-sm whitespace-pre-line"
          >
            {content.passage}
          </p>
        )}
        {item.questions.map((q) => {
          const prompt = q.prompt as { text?: string; options: string[] }
          const answer = (q.answer as { choice: number }).choice
          return (
            <div key={q.id} className="flex flex-col gap-1.5 text-sm">
              {prompt.text && <p className="font-medium">{prompt.text}</p>}
              <ul className="grid gap-1 sm:grid-cols-2">
                {prompt.options.map((o, i) => (
                  <li
                    key={i}
                    className={cn(
                      i === answer &&
                        'font-medium text-emerald-700 dark:text-emerald-300',
                    )}
                  >
                    {LETTERS[i]}. {o}{' '}
                    {i === answer && (
                      <Check aria-label="đáp án" className="inline size-3.5" />
                    )}
                  </li>
                ))}
              </ul>
              {q.explanationVi && (
                <p className="text-muted-foreground">{q.explanationVi}</p>
              )}
            </div>
          )
        })}
      </div>
    </li>
  )
}

export function ReviewQueuePanel({ exam }: { exam: string }) {
  const queryClient = useQueryClient()
  const { data: spec } = useQuery(examQueryOptions(exam))
  const parts = spec?.sections.flatMap((s) => s.parts) ?? []
  const [status, setStatus] = useState('DRAFT')
  const [part, setPart] = useState('')
  const query = {
    page: 1,
    pageSize: 50,
    filter: { exam, status, ...(part && { part }) },
  }
  const { data, isFetching } = useQuery(adminItemsQueryOptions(query))
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const items = data?.items ?? []

  async function apply(next: string) {
    const ids = [...selected]
    const res = await setItemStatus(ids, next)
    if (res.data) {
      toast.success(`Đã cập nhật ${res.data.updated} item`)
      setSelected(new Set())
      await queryClient.invalidateQueries({ queryKey: lingoKeys.all })
    } else
      toast.error('Không cập nhật được', {
        description: res.errors?.join(' · '),
      })
  }

  return (
    <section aria-labelledby="queue-heading" className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 id="queue-heading" className={sectionHeadingClass}>
            Hàng duyệt
          </h2>
          <p className="text-sm text-muted-foreground tabular-nums">
            {data ? `${data.total} item` : '…'}
            {isFetching && ' · đang tải'}
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <Label htmlFor="queue-part" className="sr-only">
            Part
          </Label>
          <select
            id="queue-part"
            className={selectClass}
            value={part}
            onChange={(e) => {
              setPart(e.target.value)
              setSelected(new Set())
            }}
          >
            <option value="">Mọi Part</option>
            {parts.map((p) => (
              <option key={p.code} value={p.code}>
                {p.code}
              </option>
            ))}
          </select>
          <Label htmlFor="status" className="sr-only">
            Trạng thái
          </Label>
          <select
            id="status"
            className={selectClass}
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              setSelected(new Set())
            }}
          >
            <option value="DRAFT">Chờ duyệt</option>
            <option value="NEEDS_REVIEW">Cần xem lại</option>
            <option value="PUBLISHED">Đã xuất bản</option>
            <option value="REJECTED">Đã loại</option>
          </select>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setSelected(
                selected.size === items.length
                  ? new Set()
                  : new Set(items.map((i) => i.id)),
              )
            }
            disabled={!items.length}
          >
            {selected.size === items.length && items.length
              ? 'Bỏ chọn'
              : 'Chọn tất cả'}
          </Button>
          {status !== 'PUBLISHED' && (
            <Button
              size="sm"
              disabled={!selected.size}
              onClick={() => void apply('PUBLISHED')}
            >
              <Check aria-hidden="true" />
              Xuất bản <span className="tabular-nums">({selected.size})</span>
            </Button>
          )}
          {status !== 'REJECTED' && (
            <Button
              size="sm"
              variant="destructive"
              disabled={!selected.size}
              onClick={() => void apply('REJECTED')}
            >
              <X aria-hidden="true" />
              Loại <span className="tabular-nums">({selected.size})</span>
            </Button>
          )}
        </div>
      </div>
      {items.length ? (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              selected={selected.has(item.id)}
              onSelect={(checked) =>
                setSelected((prev) => {
                  const next = new Set(prev)
                  if (checked) next.add(item.id)
                  else next.delete(item.id)
                  return next
                })
              }
            />
          ))}
        </ul>
      ) : (
        <p className={emptyClass}>Không có item nào ở trạng thái này</p>
      )}
    </section>
  )
}

const BATCH_STATUS: Record<string, string> = {
  RUNNING: 'Đang chạy',
  DONE: 'Xong',
  FAILED: 'Lỗi',
}

export function BatchesPanel() {
  const { data: batches = [] } = useQuery({
    ...batchesQueryOptions(),
    // AI runs report progress here: poll while one is running
    refetchInterval: (query) =>
      query.state.data?.some((b) => b.status === 'RUNNING') ? 3000 : false,
  })
  if (!batches.length) return null
  return (
    <section aria-labelledby="batches-heading" className="flex flex-col gap-3">
      <h2 id="batches-heading" className={sectionHeadingClass}>
        Lịch sử nhập và sinh AI
      </h2>
      <div className="overflow-x-auto rounded-xl border bg-card shadow-xs">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">Thời gian</th>
              <th className="px-3 py-2 font-medium">Nguồn</th>
              <th className="px-3 py-2 font-medium">Trạng thái</th>
              <th className="px-3 py-2 font-medium">Part</th>
              <th className="px-3 py-2 font-medium">File</th>
              <th className="px-3 py-2 text-right font-medium">Thành công</th>
              <th className="px-3 py-2 text-right font-medium">Lỗi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {batches.map((b) => (
              <tr key={b.id}>
                <td
                  className="px-3 py-2 whitespace-nowrap text-muted-foreground
                    tabular-nums"
                >
                  {formatDateTime(b.createdAt)}
                </td>
                <td className="px-3 py-2 font-mono text-xs">{b.source}</td>
                <td className="px-3 py-2" title={b.message ?? undefined}>
                  <span className="flex items-center gap-1.5">
                    {b.status === 'RUNNING' ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Loader2
                          aria-hidden
                          className="size-3.5 animate-spin text-muted-foreground
                            motion-reduce:animate-none"
                        />
                        {BATCH_STATUS[b.status]}
                      </span>
                    ) : (
                      <StatusDot
                        status={b.status}
                        label={BATCH_STATUS[b.status] ?? b.status}
                      />
                    )}
                    {b.message && (
                      <span className="text-xs text-destructive">
                        {b.message.slice(0, 60)}
                      </span>
                    )}
                  </span>
                </td>
                <td className="px-3 py-2">{b.part ?? '–'}</td>
                <td className="px-3 py-2">{b.fileName ?? '–'}</td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {b.succeeded}
                </td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {b.failed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
