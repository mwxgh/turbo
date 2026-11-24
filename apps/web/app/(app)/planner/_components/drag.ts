'use client'

import { type DragEvent, useState } from 'react'

/** Own MIME type: a drop zone only reacts to planner tasks, not to files or text. */
const TASK_TYPE = 'application/x-planner-task'

const isTaskDrag = (event: DragEvent) =>
  event.dataTransfer.types.includes(TASK_TYPE)

/** Props that make an element a draggable task (native HTML5 drag and drop). */
export function draggableTask(id: string) {
  return {
    draggable: true,
    'data-task-id': id,
    onDragStart: (event: DragEvent<HTMLElement>) => {
      event.dataTransfer.setData(TASK_TYPE, id)
      event.dataTransfer.effectAllowed = 'move'
      // After the browser took its drag image: only the card left behind fades
      const card = event.currentTarget
      requestAnimationFrame(() => (card.dataset.dragging = 'true'))
    },
    onDragEnd: (event: DragEvent<HTMLElement>) => {
      delete event.currentTarget.dataset.dragging
    },
  }
}

/**
 * A drop target for tasks. `over` is true while a task hovers it (for a highlight); `onOver` runs
 * on every move (e.g. to place an insertion line), `onDrop` gets the task id.
 */
export function useTaskDrop(
  onDrop: (id: string, event: DragEvent<HTMLElement>) => void,
  onOver?: (event: DragEvent<HTMLElement>) => void,
) {
  const [over, setOver] = useState(false)
  return {
    over,
    dropProps: {
      onDragOver: (event: DragEvent<HTMLElement>) => {
        if (!isTaskDrag(event)) return
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
        setOver(true)
        onOver?.(event)
      },
      onDragLeave: (event: DragEvent<HTMLElement>) => {
        // Moving onto a child fires dragleave on the parent: ignore it
        if (event.currentTarget.contains(event.relatedTarget as Node | null))
          return
        setOver(false)
      },
      onDrop: (event: DragEvent<HTMLElement>) => {
        setOver(false)
        const id = event.dataTransfer.getData(TASK_TYPE)
        if (!id) return
        event.preventDefault()
        event.stopPropagation()
        onDrop(id, event)
      },
    },
  }
}
