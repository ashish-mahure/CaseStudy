import { usePermission } from '../../auth/usePermission'
import { useSession } from '../../auth/useSession'
import type { ClaimsFilters } from '../types/claim'

interface ClaimsToolbarProps {
  filters: ClaimsFilters
  onChange: (next: ClaimsFilters) => void
  onRefresh: () => void
}

export function ClaimsToolbar({ filters, onChange, onRefresh }: ClaimsToolbarProps) {
  const { session } = useSession()
  const canApprove = usePermission({ resource: 'claims', action: 'approve' })
  const canWrite = usePermission({ resource: 'claims', action: 'write' })

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Search
            <input
              aria-label="Search claims"
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              placeholder="Claimant, policy, type"
              value={filters.search}
              onChange={(event) => onChange({ ...filters, search: event.target.value })}
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Status
            <select
              aria-label="Filter by status"
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              value={filters.status}
              onChange={(event) => onChange({ ...filters, status: event.target.value as ClaimsFilters['status'] })}
            >
              <option value="All">All</option>
              <option value="Draft">Draft</option>
              <option value="Review">Review</option>
              <option value="Approved">Approved</option>
              <option value="Flagged">Flagged</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Region
            <select
              aria-label="Filter by region"
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              value={filters.region}
              onChange={(event) => onChange({ ...filters, region: event.target.value })}
            >
              <option value="All">All</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Priority
            <select
              aria-label="Filter by priority"
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              value={filters.priority}
              onChange={(event) => onChange({ ...filters, priority: event.target.value as ClaimsFilters['priority'] })}
            >
              <option value="All">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
            Role: <span className="font-semibold text-slate-900">{session?.role ?? '—'}</span>
          </div>
          <button
            type="button"
            onClick={onRefresh}
            disabled={!canWrite}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Refresh data
          </button>
          <button
            type="button"
            disabled={!canApprove}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400"
          >
            Approve queue
          </button>
        </div>
      </div>
    </div>
  )
}
