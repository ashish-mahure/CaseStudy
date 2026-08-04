import { useMemo, useState } from 'react'
import { DocumentViewer } from '../../documents/components/DocumentViewer'
import { useSession } from '../../auth/useSession'
import { useClaims } from '../hooks/useClaims'
import { ClaimsTable } from './ClaimsTable'
import { ClaimsToolbar } from './ClaimsToolbar'

export function ClaimsDashboard() {
  const { records, isLoading, error, filters, setFilters, refresh } = useClaims()
  const { session } = useSession()
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null)

  const selectedClaim = useMemo(() => {
    return records.find((record) => record.id === selectedClaimId) ?? null
  }, [records, selectedClaimId])

  const summary = useMemo(() => {
    const total = records.length
    const flagged = records.filter((record) => record.status === 'Flagged').length
    const approved = records.filter((record) => record.status === 'Approved').length
    const totalAmount = records.reduce((sum, record) => sum + record.amount, 0)

    return {
      total,
      flagged,
      approved,
      totalAmount,
    }
  }, [records])

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Insurance operations</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Claims command center</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Built for high-volume review workflows with virtualized rendering, resilient loading states, and accessible interactions.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">{session?.name ?? '—'}</p>
              <p className="mt-1">{session ? session.role.toUpperCase() + ' · ' + session.team : '—'}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Visible claims</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{summary.total.toLocaleString()}</p>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Flagged</p>
              <p className="mt-2 text-2xl font-semibold text-amber-600">{summary.flagged.toLocaleString()}</p>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Escalated exposure</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-600">{summary.totalAmount.toLocaleString()}</p>
            </section>
          </div>
        </header>

        <ClaimsToolbar filters={filters} onChange={setFilters} onRefresh={refresh} />

        <DocumentViewer documentName={selectedClaim ? `${selectedClaim.claimantName} · ${selectedClaim.policyNumber}` : undefined} />

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
            {error}
          </div>
        ) : null}

        <ClaimsTable
          data={records}
          isLoading={isLoading}
          selectedClaimId={selectedClaimId}
          onSelectClaim={(claim) => setSelectedClaimId(claim.id)}
        />
      </div>
    </main>
  )
}
