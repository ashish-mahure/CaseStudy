import type { PermissionDescriptor, Role } from './types'

const ROLE_PERMISSIONS: Record<Role, PermissionDescriptor[]> = {
  admin: [
    { resource: 'claims', action: 'read' },
    { resource: 'claims', action: 'write' },
    { resource: 'claims', action: 'approve' },
    { resource: 'documents', action: 'read' },
    { resource: 'documents', action: 'write' },
    { resource: 'audit', action: 'read' },
  ],
  analyst: [
    { resource: 'claims', action: 'read' },
    { resource: 'claims', action: 'write' },
    { resource: 'documents', action: 'read' },
  ],
  reviewer: [
    { resource: 'claims', action: 'read' },
    { resource: 'claims', action: 'approve' },
    { resource: 'documents', action: 'read' },
    { resource: 'audit', action: 'read' },
  ],
  viewer: [{ resource: 'claims', action: 'read' }, { resource: 'documents', action: 'read' }],
}

export function canAccess(role: Role, permission: PermissionDescriptor) {
  return ROLE_PERMISSIONS[role].some(
    (entry) => entry.resource === permission.resource && entry.action === permission.action,
  )
}
