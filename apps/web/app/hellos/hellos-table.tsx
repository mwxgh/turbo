'use client'

import { useMemo, useState } from 'react'

import { Pencil, Trash2 } from 'lucide-react'

import {
  DataTable,
  actionsColumn,
  dataTableColumns,
  useListTable,
} from '@repo/ui/components/data-table'
import { formatDateTime } from '@repo/utils'

import { hellosListQueryOptions } from '../../lib/queries/hellos'
import type { Hello } from '../../lib/types'
import { HelloForm } from './hello-form'
import { useDeleteHello, useHelloActions } from './use-hello-mutations'

const col = dataTableColumns<Hello>()

/** Server-side list: sort, search, date filter and pages go through the API (URL state). */
export function HellosTable() {
  const [editingId, setEditingId] = useState<string | null>(null)
  const actions = useHelloActions()
  const { mutate: removeHello } = useDeleteHello()

  const columns = useMemo(
    () =>
      col.columns([
        col.accessor('message', {
          header: 'Message',
          enableSorting: true,
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
          enableSorting: true,
          meta: { filterVariant: 'dateRange' },
          // Displayed in Vietnam time
          cell: ({ getValue }) => (
            <time dateTime={getValue()} className="text-muted-foreground">
              {formatDateTime(getValue())}
            </time>
          ),
        }),
        // The editor row has its own Save / Cancel
        actionsColumn<Hello>((hello) =>
          hello.id === editingId
            ? []
            : [
                {
                  label: 'Edit',
                  icon: <Pencil />,
                  onClick: () => setEditingId(hello.id),
                },
                {
                  label: 'Delete',
                  icon: <Trash2 />,
                  variant: 'destructive',
                  onClick: () => removeHello(hello.id),
                },
              ],
        ),
      ]),
    [editingId, actions, removeHello],
  )

  const list = useListTable({
    columns,
    listQuery: hellosListQueryOptions,
    getRowId: (hello) => hello.id,
  })

  return (
    <DataTable
      list={list}
      searchPlaceholder="Search hellos…"
      emptyMessage="No hellos yet."
    />
  )
}
