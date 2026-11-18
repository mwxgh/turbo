'use client'

import { useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { Button } from '@repo/ui/components/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog'
import { Input } from '@repo/ui/components/input'
import { Label } from '@repo/ui/components/label'

import { withToast } from '@/lib/action-toast'
import { updateGoal } from '@/lib/lingo-actions'
import { type Dashboard, lingoKeys } from '@/lib/queries/lingo'

/** Target score, exam date and new cards per day. */
export function GoalForm({
  exam,
  goal,
}: {
  exam: string
  goal: Dashboard['goal']
}) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState<string[]>()

  async function submit(form: FormData) {
    const target = ((form.get('targetScore') as string | null) ?? '').trim()
    const date = ((form.get('examDate') as string | null) ?? '').trim()
    const res = await withToast(
      updateGoal(exam, {
        targetScore: target ? Number(target) : null,
        examDate: date || null,
        newCardsPerDay: Number(form.get('newCardsPerDay')),
      }),
      { success: 'Đã lưu mục tiêu', error: 'Không lưu được mục tiêu' },
    )
    setErrors(res.errors)
    if (!res.errors) {
      setOpen(false)
      await queryClient.invalidateQueries({ queryKey: lingoKeys.all })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size="sm" variant="outline" className="mt-auto self-start" />
        }
      >
        {goal.targetScore ? 'Sửa mục tiêu' : 'Đặt mục tiêu'}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mục tiêu</DialogTitle>
          <DialogDescription>
            Điểm muốn đạt, ngày thi và số thẻ từ vựng mới mỗi ngày.
          </DialogDescription>
        </DialogHeader>
        <form
          action={(form) => void submit(form)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="targetScore">Điểm mục tiêu (10–990)</Label>
            <Input
              id="targetScore"
              name="targetScore"
              type="number"
              min={10}
              max={990}
              step={5}
              defaultValue={goal.targetScore ?? ''}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="examDate">Ngày thi</Label>
            <Input
              id="examDate"
              name="examDate"
              type="date"
              defaultValue={goal.examDate?.slice(0, 10) ?? ''}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="newCardsPerDay">Thẻ mới mỗi ngày</Label>
            <Input
              id="newCardsPerDay"
              name="newCardsPerDay"
              type="number"
              min={0}
              max={200}
              required
              defaultValue={goal.newCardsPerDay}
            />
          </div>
          {errors && (
            <p role="alert" className="text-sm text-destructive">
              {errors.join(' · ')}
            </p>
          )}
          <DialogFooter>
            <Button type="submit">Lưu</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
