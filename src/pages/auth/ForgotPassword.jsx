import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sendPasswordReset } from '../../services/authService'
import { useToast } from '../../context/ToastContext'
import Button from '../../components/shared/Button'
import Input from '../../components/shared/Input'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const toast = useToast()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await sendPasswordReset(email)
      setSent(true)
    } catch {
      toast.error('Could not send reset email. Check the email address.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <span className="text-4xl">🛡️</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reset password</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">We'll send you a reset link</p>
        </div>

        <div className="card p-6 shadow-sm">
          {sent ? (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">📧</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Check your email</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <Link to="/login">
                <Button variant="secondary" fullWidth>Back to sign in</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
              <Button type="submit" fullWidth loading={loading}>
                Send Reset Link
              </Button>
              <Link to="/login">
                <Button variant="ghost" fullWidth>Back to sign in</Button>
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
