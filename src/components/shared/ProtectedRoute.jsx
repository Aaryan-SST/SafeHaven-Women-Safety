import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import Spinner from './Spinner'

export default function ProtectedRoute({ children }) {
  const { currentUser, authLoading } = useAuth()
  const location = useLocation()

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Spinner size="lg" className="text-rose-500" />
      </div>
    )
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
