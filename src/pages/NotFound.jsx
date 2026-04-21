import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function NotFound() {
  const { currentUser, getRoleHome } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-8xl mb-6">🛡️</div>
        <h1 className="text-6xl font-black text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4">Page not found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to={currentUser ? getRoleHome() : '/'}
          className="btn-primary"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
