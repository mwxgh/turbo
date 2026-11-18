'use client'

import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Loader2, Play } from 'lucide-react'

import { Button } from '@repo/ui/components/button'
import { toast } from '@repo/ui/components/sonner'
import { cn } from '@repo/ui/lib/utils'

import { startAttempt } from '@/lib/lingo-actions'
import type { ExamDetail } from '@/lib/queries/lingo'

const COUNTS = [5, 10, 20] as const
const DIFFICULTIES = [
  { value: '', label: 'Tất cả' },
  { value: 'EASY', label: 'Dễ' },
  { value: 'MEDIUM', label: 'Vừa' },
  { value: 'HARD', label: 'Khó' },
] as const

/** Radio group drawn as chips. */
function Chips<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: readonly {
    value: T
    label: string
    disabled?: boolean
    hint?: string
  }[]
  onChange: (value: T) => void
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-sm font-medium">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = option.value === value
          return (
            <label
              key={String(option.value)}
              className={cn(
                `inline-flex min-h-9 cursor-pointer items-center gap-1.5
                rounded-lg border px-3 text-sm transition-colors
                has-focus-visible:ring-3 has-focus-visible:ring-ring/50`,
                checked
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'hover:bg-muted',
                option.disabled &&
                  'cursor-not-allowed opacity-50 hover:bg-transparent',
              )}
            >
              <input
                type="radio"
                className="sr-only"
                name={label}
                checked={checked}
                disabled={option.disabled}
                onChange={() => onChange(option.value)}
              />
              {option.label}
              {option.hint && (
                <span
                  className={cn(
                    'text-xs',
                    checked ? 'opacity-80' : 'text-muted-foreground',
                  )}
                >
                  {option.hint}
                </span>
              )}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

/** Pick a part, how many questions and how hard, then start an attempt. */
export function QuickPractice({
  exam,
  spec,
  isAdmin,
}: {
  exam: string
  spec: ExamDetail
  isAdmin: boolean
}) {
  const router = useRouter()
  const parts = spec.sections.flatMap((s) => s.parts)
  const ready = parts.filter((p) => p.available && p.published > 0)
  const [part, setPart] = useState(ready[0]?.code ?? '')
  const [count, setCount] = useState<number>(10)
  const [difficulty, setDifficulty] = useState<string>('')
  const [starting, setStarting] = useState(false)

  async function start() {
    setStarting(true)
    try {
      const res = await startAttempt({
        exam,
        part,
        count,
        ...(difficulty && { difficulty }),
      })
      if (res.data) router.push(`/lingo/attempts/${res.data.id}`)
      else
        toast.error('Không bắt đầu được bài', {
          description: res.errors?.join(' · '),
        })
    } catch {
      toast.error('Không kết nối được máy chủ')
    } finally {
      setStarting(false)
    }
  }

  return (
    <section
      aria-labelledby="practice-heading"
      className="flex flex-col gap-5 rounded-xl border bg-card p-5"
    >
      <div className="flex flex-col gap-1">
        <h2 id="practice-heading" className="text-lg font-semibold">
          Luyện nhanh
        </h2>
        <p className="text-sm text-muted-foreground">
          Chấm khi nộp bài, có giải thích tiếng Việt cho từng câu. Câu chưa làm
          được ưu tiên.
        </p>
      </div>

      {ready.length === 0 ? (
        <p
          className="rounded-lg border border-dashed p-4 text-sm
            text-muted-foreground"
        >
          Chưa có câu hỏi nào được xuất bản.{' '}
          {isAdmin ? (
            <>
              Vào{' '}
              <Link
                href="/lingo/admin"
                className="font-medium text-foreground underline"
              >
                trang quản trị
              </Link>{' '}
              để nạp dữ liệu mẫu hoặc nhập đề.
            </>
          ) : (
            'Quay lại sau khi admin nhập đề nhé.'
          )}
        </p>
      ) : (
        <>
          <Chips
            label="Part"
            value={part}
            onChange={setPart}
            options={parts.map((p) => ({
              value: p.code,
              label: `${p.code.replace('P', 'Part ')} · ${p.nameVi}`,
              disabled: !p.available || p.published === 0,
              hint: p.available ? `${p.published} câu` : 'sắp có',
            }))}
          />
          <div className="flex flex-wrap gap-6">
            <Chips
              label="Số câu"
              value={count}
              onChange={setCount}
              options={COUNTS.map((c) => ({ value: c, label: String(c) }))}
            />
            <Chips
              label="Độ khó"
              value={difficulty}
              onChange={setDifficulty}
              options={DIFFICULTIES.map((d) => ({
                value: d.value,
                label: d.label,
                hint: d.value
                  ? spec.difficulties[d.value].replace(/^[^(]*\(|\)$/g, '')
                  : undefined,
              }))}
            />
          </div>
          <Button
            size="lg"
            className="self-start"
            disabled={!part || starting}
            onClick={() => void start()}
          >
            {starting ? (
              <Loader2
                aria-hidden="true"
                className="animate-spin motion-reduce:animate-none"
              />
            ) : (
              <Play aria-hidden="true" />
            )}
            {starting ? 'Đang chuẩn bị…' : 'Bắt đầu'}
          </Button>
        </>
      )}
    </section>
  )
}
