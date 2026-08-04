import { useEffect, useMemo, useState } from 'react'
import type { UserSession } from './types'
import { mockServer } from '../../mocks/mockServer'

export function useSession() {
  const [session, setSession] = useState<UserSession | null>(null)

  useEffect(() => {
    let mounted = true
    mockServer.getSession().then((s) => {
      if (mounted) setSession(s)
    })

    return () => {
      mounted = false
    }
  }, [])

  return useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session),
    }),
    [session],
  )
}
