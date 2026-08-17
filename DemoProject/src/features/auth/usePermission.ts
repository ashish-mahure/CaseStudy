import { useMemo } from 'react'
import { canAccess } from './rbac'
import { useSession } from './useSession'
import type { PermissionDescriptor } from './types'

export function usePermission(permission: PermissionDescriptor) {
  const { session } = useSession()

  return useMemo(() => {
    if (!session) return false
    return canAccess(session.role, permission)
  }, [session, permission])
}

export default usePermission
