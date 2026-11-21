'use client'

import { type FormEvent, useState } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { BookA, Loader2, Sparkles, WandSparkles } from 'lucide-react'

import { Button } from '@repo/ui/components/button'
import { Input } from '@repo/ui/components/input'
import { Label } from '@repo/ui/components/label'
import { toast } from '@repo/ui/components/sonner'
import { Textarea } from '@repo/ui/components/textarea'

import { generateCards, generateItems, generateTest } from '@/lib/lingo-actions'
import {
  type ImportResult,
  decksQueryOptions,
  examQueryOptions,
  lingoKeys,
} from '@/lib/queries/lingo'

import { Panel, ResultSummary, selectClass } from './panel'

type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  EASY: 'Dễ',
  MEDIUM: 'Vừa',
  HARD: 'Khó',
}

function aiError(errors: string[] | undefined) {
  const text = errors?.join(' · ')
  return text?.includes('not configured')
    ? 'AI chưa được bật: đặt ARK_API_KEY và ARK_MODEL trong .env của api.'
    : text
}

function DifficultySelect({
  id,
  value,
  onChange,
}: {
  id: string
  value: Difficulty
  onChange: (value: Difficulty) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>Độ khó</Label>
      <select
        id={id}
        className={selectClass}
        value={value}
        onChange={(e) => onChange(e.target.value as Difficulty)}
      >
        {(Object.keys(DIFFICULTY_LABEL) as Difficulty[]).map((d) => (
          <option key={d} value={d}>
            {DIFFICULTY_LABEL[d]}
          </option>
        ))}
      </select>
    </div>
  )
}

function SelfCheck({
  id,
  checked,
  onChange,
}: {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label htmlFor={id} className="flex items-start gap-2 text-sm">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-4 accent-primary"
      />
      <span>
        AI tự kiểm đáp án
        <span className="block text-xs text-muted-foreground">
          Model làm lại câu vừa sinh; lệch đáp án → “Cần xem lại”. Tốn gấp đôi
          lượt gọi.
        </span>
      </span>
    </label>
  )
}

/** AI writes items of one part; they land in the review queue as drafts. */
export function GenerateItemsPanel({ exam }: { exam: string }) {
  const queryClient = useQueryClient()
  const { data: spec } = useQuery(examQueryOptions(exam))
  const parts = spec?.sections.flatMap((s) => s.parts) ?? []
  const [part, setPart] = useState('P5')
  const [count, setCount] = useState(10)
  const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM')
  const [topic, setTopic] = useState('')
  const [selfCheck, setSelfCheck] = useState(true)
  const [busy, setBusy] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    try {
      const res = await generateItems({
        exam,
        part,
        count,
        difficulty,
        selfCheck,
        ...(topic.trim() && { topic: topic.trim() }),
      })
      if (res.data) {
        toast.success('Đã bắt đầu sinh câu', {
          description:
            'Theo dõi ở “Lịch sử nhập”; câu xong vào hàng chờ duyệt.',
        })
        await queryClient.invalidateQueries({ queryKey: lingoKeys.batches() })
      } else
        toast.error('Không sinh được', { description: aiError(res.errors) })
    } catch {
      toast.error('Không kết nối được máy chủ')
    } finally {
      setBusy(false)
    }
  }

  const selected = parts.find((p) => p.code === part)
  return (
    <Panel
      icon={Sparkles}
      title="Sinh câu bằng AI"
      description="BytePlus viết item theo cấu trúc Part. Item vào hàng chờ duyệt, không tự xuất bản. Part 1 cần tải ảnh lên trước khi duyệt."
    >
      <form onSubmit={(e) => void submit(e)} className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="gen-part">Part</Label>
            <select
              id="gen-part"
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
            <Label htmlFor="gen-count">Số item</Label>
            <Input
              id="gen-count"
              type="number"
              min={1}
              max={50}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-24"
            />
          </div>
          <DifficultySelect
            id="gen-difficulty"
            value={difficulty}
            onChange={setDifficulty}
          />
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="gen-topic">Chủ đề (tuỳ chọn)</Label>
            <Input
              id="gen-topic"
              value={topic}
              maxLength={100}
              placeholder="Office, Travel…"
              onChange={(e) => setTopic(e.target.value)}
              className="w-40"
            />
          </div>
        </div>
        {selected && selected.questionsPerItem[1] > 1 && (
          <p className="text-xs text-muted-foreground">
            Mỗi item {selected.code} có {selected.questionsPerItem.join('–')}{' '}
            câu hỏi.
          </p>
        )}
        <SelfCheck id="gen-check" checked={selfCheck} onChange={setSelfCheck} />
        <Button type="submit" className="self-start" disabled={busy}>
          {busy ? (
            <Loader2
              aria-hidden
              className="animate-spin motion-reduce:animate-none"
            />
          ) : (
            <Sparkles aria-hidden />
          )}
          Sinh câu
        </Button>
      </form>
    </Panel>
  )
}

/** AI writes every part, then a DRAFT test of those items (runs in the background). */
export function GenerateTestPanel({ exam }: { exam: string }) {
  const queryClient = useQueryClient()
  const [kind, setKind] = useState<'FULL' | 'MINI'>('MINI')
  const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM')
  const [title, setTitle] = useState('')
  const [topic, setTopic] = useState('')
  const [selfCheck, setSelfCheck] = useState(true)
  const [busy, setBusy] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    try {
      const res = await generateTest({
        exam,
        kind,
        difficulty,
        selfCheck,
        title: title.trim(),
        ...(topic.trim() && { topic: topic.trim() }),
      })
      if (res.data) {
        toast.success('Đã bắt đầu sinh đề', {
          description: 'Có thể mất vài phút. Xong sẽ có đề nháp trong “Bộ đề”.',
        })
        setTitle('')
        await queryClient.invalidateQueries({ queryKey: lingoKeys.batches() })
      } else
        toast.error('Không sinh được', { description: aiError(res.errors) })
    } catch {
      toast.error('Không kết nối được máy chủ')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Panel
      icon={WandSparkles}
      title="Sinh trọn bộ đề bằng AI"
      description="Sinh đủ 7 Part theo cấu trúc rồi ghép thành đề nháp. Mini ≈ 96 câu, Full = 200 câu (nhiều lượt gọi, tốn token hơn)."
    >
      <form onSubmit={(e) => void submit(e)} className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="gen-test-title">Tên đề</Label>
            <Input
              id="gen-test-title"
              required
              maxLength={150}
              value={title}
              placeholder="AI Test 01"
              onChange={(e) => setTitle(e.target.value)}
              className="w-48"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="gen-test-kind">Loại</Label>
            <select
              id="gen-test-kind"
              className={selectClass}
              value={kind}
              onChange={(e) => setKind(e.target.value as 'FULL' | 'MINI')}
            >
              <option value="MINI">Mini test</option>
              <option value="FULL">Full test</option>
            </select>
          </div>
          <DifficultySelect
            id="gen-test-difficulty"
            value={difficulty}
            onChange={setDifficulty}
          />
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="gen-test-topic">Chủ đề (tuỳ chọn)</Label>
            <Input
              id="gen-test-topic"
              value={topic}
              maxLength={100}
              onChange={(e) => setTopic(e.target.value)}
              className="w-40"
            />
          </div>
        </div>
        <SelfCheck
          id="gen-test-check"
          checked={selfCheck}
          onChange={setSelfCheck}
        />
        <Button
          type="submit"
          className="self-start"
          disabled={busy || !title.trim()}
        >
          {busy ? (
            <Loader2
              aria-hidden
              className="animate-spin motion-reduce:animate-none"
            />
          ) : (
            <WandSparkles aria-hidden />
          )}
          Sinh đề
        </Button>
      </form>
    </Panel>
  )
}

/** AI fills meaning, IPA and examples for bare terms of a system deck. */
export function GenerateCardsPanel({ exam }: { exam: string }) {
  const queryClient = useQueryClient()
  const { data: decks = [] } = useQuery(decksQueryOptions(exam))
  const systemDecks = decks.filter((d) => d.ownerId === null)
  const [deckId, setDeckId] = useState('')
  const [terms, setTerms] = useState('')
  const [result, setResult] = useState<ImportResult>()
  const [busy, setBusy] = useState(false)
  const list = [
    ...new Set(
      terms
        .split(/[\n,]/)
        .map((t) => t.trim())
        .filter(Boolean),
    ),
  ]

  async function submit(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    try {
      const res = await generateCards(deckId, list.slice(0, 50))
      if (res.data) {
        setResult(res.data)
        toast.success(`Đã thêm ${res.data.succeeded} thẻ`)
        setTerms('')
        await queryClient.invalidateQueries({ queryKey: lingoKeys.all })
      } else
        toast.error('Không sinh được thẻ', {
          description: aiError(res.errors),
        })
    } catch {
      toast.error('Không kết nối được máy chủ')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Panel
      icon={BookA}
      title="Điền thẻ từ vựng bằng AI"
      description="Nhập từ (mỗi dòng hoặc cách nhau bởi dấu phẩy, tối đa 50). AI điền nghĩa, phiên âm, ví dụ. Từ đã có trong bộ được bỏ qua."
    >
      <form onSubmit={(e) => void submit(e)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="gen-deck">Bộ thẻ</Label>
          <select
            id="gen-deck"
            required
            className={selectClass}
            value={deckId}
            onChange={(e) => setDeckId(e.target.value)}
          >
            <option value="">Chọn bộ thẻ hệ thống…</option>
            {systemDecks.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="gen-terms">Từ</Label>
          <Textarea
            id="gen-terms"
            rows={4}
            value={terms}
            placeholder={'invoice\nreimburse\nquarterly'}
            onChange={(e) => setTerms(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            {list.length} từ{list.length > 50 && ' (chỉ lấy 50 từ đầu)'}
          </p>
        </div>
        <Button
          type="submit"
          className="self-start"
          disabled={busy || !deckId || !list.length}
        >
          {busy ? (
            <Loader2
              aria-hidden
              className="animate-spin motion-reduce:animate-none"
            />
          ) : (
            <Sparkles aria-hidden />
          )}
          Điền thẻ
        </Button>
        {result && <ResultSummary result={result} />}
      </form>
    </Panel>
  )
}
