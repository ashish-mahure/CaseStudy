import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useMemo, useRef } from 'react'
import type { ClaimRecord } from '../types/claim'
import { usePermission } from '../../auth/usePermission'
import { useSession } from '../../auth/useSession'

interface ClaimsTableProps {
  data: ClaimRecord[]
  isLoading: boolean
  selectedClaimId: string | null
  onSelectClaim: (claim: ClaimRecord) => void
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

// columns are built inside the component because permission hooks are used per-render

export function ClaimsTable({ data, isLoading, selectedClaimId, onSelectClaim }: ClaimsTableProps) {
  const parentRef = useRef<HTMLDivElement>(null)
  const { session } = useSession()
  const canWrite = usePermission({ resource: 'claims', action: 'write' })
  const canApprove = usePermission({ resource: 'claims', action: 'approve' })

  const columns: ColumnDef<ClaimRecord>[] = [
    {
      header: 'Claimant',
      accessorKey: 'claimantName',
      cell: ({ getValue }) => <span className="font-medium text-slate-900">{String(getValue())}</span>,
    },
    {
      header: 'Policy',
      accessorKey: 'policyNumber',
    },
    {
      header: 'Type',
      accessorKey: 'claimType',
      cell: ({ getValue }) => <span className="text-slate-600">{String(getValue())}</span>,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ getValue }) => {
        const status = String(getValue())
        const tone =
          status === 'Approved'
            ? 'bg-emerald-100 text-emerald-700'
            : status === 'Flagged'
              ? 'bg-amber-100 text-amber-700'
              : 'bg-slate-100 text-slate-700'

        return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>{status}</span>
      },
    },
    {
      header: 'Amount',
      accessorKey: 'amount',
      cell: ({ getValue }) => <span className="font-medium">{currency.format(Number(getValue()))}</span>,
    },
    {
      header: 'Region',
      accessorKey: 'region',
    },
    {
      header: 'Assigned',
      accessorKey: 'assignedTo',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const claim = row.original

        return (
          <div className="flex gap-2">
            {canWrite ? (
              <button
                type="button"
                className="rounded px-2 py-1 text-sm border border-slate-200 bg-white"
                onClick={(e) => {
                  e.stopPropagation()
                  // consume event; real handlers should call passed actions
                  // For demo, we open console
                  // eslint-disable-next-line no-console
                  console.log('Edit', claim.id)
                }}
              >
                Edit
              </button>
            ) : null}

            {session?.role === 'admin' ? (
              <button
                type="button"
                className="rounded px-2 py-1 text-sm border border-red-200 bg-white text-red-600"
                onClick={(e) => {
                  e.stopPropagation()
                  // eslint-disable-next-line no-console
                  console.log('Delete', claim.id)
                }}
              >
                Delete
              </button>
            ) : null}

            {canApprove ? (
              <button
                type="button"
                className="rounded px-2 py-1 text-sm border border-emerald-200 bg-white text-emerald-600"
                onClick={(e) => {
                  e.stopPropagation()
                  // eslint-disable-next-line no-console
                  console.log('Approve', claim.id)
                }}
              >
                Approve
              </button>
            ) : null}
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 8,
  })

  const virtualRows = rowVirtualizer.getVirtualItems()
  const totalSize = rowVirtualizer.getTotalSize()
  const paddingTop = virtualRows.length > 0 ? virtualRows[0]?.start ?? 0 : 0
  const paddingBottom = virtualRows.length > 0 ? totalSize - (virtualRows[virtualRows.length - 1]?.end ?? 0) : 0

  const rows = useMemo(() => table.getRowModel().rows, [table, data])

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-lg font-semibold text-slate-900">Claims inventory</h2>
        <p className="text-sm text-slate-600">Virtualized rows with client-side filtering and resilient loading states.</p>
      </div>

      <div ref={parentRef} className="h-[560px] overflow-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="border-b border-slate-200 px-4 py-3">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {paddingTop > 0 && <tr><td style={{ height: paddingTop }} /></tr>}
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index]
              if (!row) return null

              const isSelected = selectedClaimId === row.original.id

              return (
                <tr
                  key={row.id}
                  className={`cursor-pointer border-b border-slate-100 hover:bg-slate-50 ${isSelected ? 'bg-slate-100' : ''}`}
                  onClick={() => onSelectClaim(row.original)}
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      onSelectClaim(row.original)
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-slate-700">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              )
            })}
            {paddingBottom > 0 && <tr><td style={{ height: paddingBottom }} /></tr>}
          </tbody>
        </table>

        {isLoading && (
          <div className="flex items-center justify-center py-10 text-sm text-slate-600" role="status" aria-live="polite">
            Loading claims…
          </div>
        )}
      </div>
    </div>
  )
}
