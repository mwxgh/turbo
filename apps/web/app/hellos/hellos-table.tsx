'use client'

import { useMemo, useState } from 'react'

import { Button } from '@repo/ui/components/button'
import { DataTable, dataTableColumns } from '@repo/ui/components/data-table'
import { formatDateTime } from '@repo/utils'

import type { Hello } from '../../lib/types'
import { HelloForm } from './hello-form'
import { useDeleteHello, useHelloActions } from './use-hello-mutations'

const col = dataTableColumns<Hello>()

export function HellosTable({ hellos }: { hellos: Hello[] }) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const actions = useHelloActions()
  const { mutate: removeHello } = useDeleteHello()

  const columns = useMemo(
    () =>
      col.columns([
        col.accessor('message', {
          header: 'Message',
          sortFn: 'alphanumeric',
          cell: ({ row }) =>
            row.original.id === editingId ? (
              <HelloForm
                action={(input) => actions.update(row.original.id, input)}
                defaultMessage={row.original.message}
                submitLabel="Save"
                inputLabel="Edit message"
                autoFocus
                onSuccess={() => setEditingId(null)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              row.original.message
            ),
        }),
        col.accessor('createdAt', {
          header: 'Created',
          sortFn: 'datetime',
          // ISO strings compare as dates; displayed in Vietnam time
          cell: ({ getValue }) => (
            <time dateTime={getValue()} className="text-muted-foreground">
              {formatDateTime(getValue())}
            </time>
          ),
        }),
        col.display({
          id: 'actions',
          header: () => <span className="sr-only">Actions</span>,
          cell: ({ row }) =>
            row.original.id === editingId ? null : (
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingId(row.original.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeHello(row.original.id)}
                >
                  Delete
                </Button>
              </div>
            ),
        }),
      ]),
    [editingId, actions, removeHello],
  )

  return (
    <DataTable
      columns={columns}
      data={hellos}
      getRowId={(hello) => hello.id}
      filterPlaceholder="Search hellos…"
      emptyMessage="No hellos yet."
    />
  )
}
