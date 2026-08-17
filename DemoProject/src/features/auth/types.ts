export type Role = 'admin' | 'analyst' | 'reviewer' | 'viewer'

export interface UserSession {
  id: string
  name: string
  role: Role
  team: string
  email: string
}

export interface PermissionDescriptor {
  resource: 'claims' | 'documents' | 'audit'
  action: 'read' | 'write' | 'approve'
}
