import { Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { getRoleHomePath } from '../../utils/roleGuards'
import Spinner from './Spinner'

export default function RoleRoute({ children, allowedRole }) {
  const { userRole, authLoading, userProfile } = useAuth()

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Spinner size="lg" className="text-rose-500" />
      </div>
    )
  }

  if (userRole !== allowedRole) {
    return <Navigate to={getRoleHomePath(userRole)} replace />
  }

  // NGO pending approval screen
  if (allowedRole === 'ngo' && userProfile && !userProfile.isApproved) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
        <div className="card p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">⏳</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Approval Pending</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Your NGO account is awaiting admin approval. You'll receive access once your organization is verified. This usually takes 24–48 hours.
          </p>
        </div>
      </div>
    )
  }

  return children
}
