import type { ClaimRecord } from '../features/claims/types/claim'
import type { UserSession } from '../features/auth/types'
import { canAccess } from '../features/auth/rbac'

function timeout<T>(value: T, ms = 220) {
  return new Promise<T>((resolve) => setTimeout(() => resolve(value), ms))
}

const SESSION: UserSession = {
  id: 'usr-1001',
  name: 'Maya Chen',
  role: 'reviewer',
  team: 'Claims Review',
  email: 'maya.chen@acme-insure.com',
}

// server-side seed lives here so mock server can enforce filters
const CLAIMS_SEED: ClaimRecord[] = Array.from({ length: 24000 }, (_, index) => ({
  id: `CLM-${String(index + 1).padStart(6, '0')}`,
  claimantName: `Claimant ${index + 1}`,
  policyNumber: `POL-${(index % 97) + 1}`,
  claimType: ['Auto', 'Property', 'Medical', 'Liability'][index % 4],
  status: (['Draft', 'Review', 'Approved', 'Flagged'] as ClaimRecord['status'][])[index % 4],
  incidentDate: new Date(2024, (index % 12), (index % 28) + 1).toISOString(),
  amount: 1200 + (index % 17) * 350,
  region: ['North', 'South', 'East', 'West'][index % 4],
  priority: (['Low', 'Medium', 'High'] as ClaimRecord['priority'][])[index % 3],
  assignedTo: ['A. Singh', 'L. Chen', 'M. Patel', 'D. Brooks'][index % 4],
  lastUpdated: new Date(2025, (index % 6), (index % 24) + 1).toISOString(),
  documents: [
    { id: `doc-${index + 1}-a`, name: 'Claim packet', sizeMb: 180 + (index % 7) * 20, status: 'Ready' },
    { id: `doc-${index + 1}-b`, name: 'Medical records', sizeMb: 420 + (index % 5) * 40, status: 'Processing' },
  ],
}))

export const mockServer = {
  async getSession(): Promise<UserSession> {
    return timeout(SESSION, 120)
  },

  async getClaims(session: UserSession): Promise<ClaimRecord[]> {
    // server-side RBAC example: 'viewer' only sees Approved records
    let rows = CLAIMS_SEED

    if (session.role === 'viewer') {
      rows = CLAIMS_SEED.filter((r) => r.status === 'Approved')
    }

    // reviewer sees all but can't see Drafts from other teams hypothetically
    // keep simple for demo

    return timeout(rows, 250)
  },

  async approveClaim(session: UserSession, claimId: string) {
    if (!canAccess(session.role, { resource: 'claims', action: 'approve' })) {
      const err: any = new Error('Forbidden')
      err.status = 403
      throw err
    }

    const idx = CLAIMS_SEED.findIndex((c) => c.id === claimId)
    if (idx === -1) {
      const err: any = new Error('Not found')
      err.status = 404
      throw err
    }

    CLAIMS_SEED[idx].status = 'Approved'
    CLAIMS_SEED[idx].lastUpdated = new Date().toISOString()

    return timeout({ ok: true })
  },

  async editClaim(session: UserSession, claimId: string, patch: Partial<ClaimRecord>) {
    if (!canAccess(session.role, { resource: 'claims', action: 'write' })) {
      const err: any = new Error('Forbidden')
      err.status = 403
      throw err
    }

    const idx = CLAIMS_SEED.findIndex((c) => c.id === claimId)
    if (idx === -1) {
      const err: any = new Error('Not found')
      err.status = 404
      throw err
    }

    CLAIMS_SEED[idx] = { ...CLAIMS_SEED[idx], ...patch, lastUpdated: new Date().toISOString() }
    return timeout({ ok: true, record: CLAIMS_SEED[idx] })
  },

  async deleteClaim(session: UserSession, claimId: string) {
    // restrict delete to admin for demo
    if (session.role !== 'admin') {
      const err: any = new Error('Forbidden')
      err.status = 403
      throw err
    }

    const idx = CLAIMS_SEED.findIndex((c) => c.id === claimId)
    if (idx === -1) {
      const err: any = new Error('Not found')
      err.status = 404
      throw err
    }

    CLAIMS_SEED.splice(idx, 1)
    return timeout({ ok: true })
  },
}

export default mockServer
