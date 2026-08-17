import { createBrowserRouter } from 'react-router-dom'
import { ClaimsDashboard } from '../features/claims/components/ClaimsDashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ClaimsDashboard />,
  },
])
