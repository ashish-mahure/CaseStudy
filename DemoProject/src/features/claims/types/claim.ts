export type ClaimStatus = 'Draft' | 'Review' | 'Approved' | 'Flagged'

export interface ClaimDocumentSummary {
  id: string
  name: string
  sizeMb: number
  status: 'Ready' | 'Processing' | 'Error'
}

export interface ClaimRecord {
  id: string
  claimantName: string
  policyNumber: string
  claimType: string
  status: ClaimStatus
  incidentDate: string
  amount: number
  region: string
  priority: 'Low' | 'Medium' | 'High'
  assignedTo: string
  lastUpdated: string
  documents: ClaimDocumentSummary[]
}

export interface ClaimsFilters {
  search: string
  status: ClaimStatus | 'All'
  region: string
  priority: 'Low' | 'Medium' | 'High' | 'All'
}
