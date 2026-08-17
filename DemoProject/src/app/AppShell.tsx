import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

export function AppShell() {
  return <RouterProvider router={router} />
}
