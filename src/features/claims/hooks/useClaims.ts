import { useEffect, useMemo, useState } from 'react'
import type { ClaimRecord, ClaimsFilters } from '../types/claim'
import { mockServer } from '../../../mocks/mockServer'
import { useSession } from '../../auth/useSession'

export function useClaims() {
  const { session } = useSession()
  const [records, setRecords] = useState<ClaimRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<ClaimsFilters>({
    search: '',
    status: 'All',
    region: 'All',
    priority: 'All',
  })

  useEffect(() => {
    let mounted = true
    async function load() {
      if (!session) return
      setIsLoading(true)
      try {
        const rows = await mockServer.getClaims(session)
        if (!mounted) return
        setRecords(rows)
      } catch (err: any) {
        setError(err.message || 'Unable to load claims data.')
      } finally {
        if (mounted) setIsLoading(false)
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [session])

  const filteredRecords = useMemo(() => {
    const normalised = filters.search.trim().toLowerCase()

    return records.filter((record) => {
      const matchesSearch =
        normalised.length === 0 ||
        [record.claimantName, record.policyNumber, record.claimType, record.assignedTo]
          .join(' ')
          .toLowerCase()
          .includes(normalised)

      const matchesStatus = filters.status === 'All' || record.status === filters.status
      const matchesRegion = filters.region === 'All' || record.region === filters.region
      const matchesPriority = filters.priority === 'All' || record.priority === filters.priority

      return matchesSearch && matchesStatus && matchesRegion && matchesPriority
    })
  }, [records, filters])

  async function refresh() {
    if (!session) return
    setIsLoading(true)
    setError(null)
    try {
      const rows = await mockServer.getClaims(session)
      setRecords(rows)
    } catch (err: any) {
      setError(err.message || 'Unable to refresh claims')
    } finally {
      setIsLoading(false)
    }
  }

  async function approveClaim(claimId: string) {
    if (!session) throw new Error('Not authenticated')
    await mockServer.approveClaim(session, claimId)
    await refresh()
  }

  async function editClaim(claimId: string, patch: Partial<ClaimRecord>) {
    if (!session) throw new Error('Not authenticated')
    await mockServer.editClaim(session, claimId, patch)
    await refresh()
  }

  async function deleteClaim(claimId: string) {
    if (!session) throw new Error('Not authenticated')
    await mockServer.deleteClaim(session, claimId)
    await refresh()
  }

  return {
    records: filteredRecords,
    isLoading,
    error,
    filters,
    setFilters,
    refresh,
    approveClaim,
    editClaim,
    deleteClaim,
  }
}
