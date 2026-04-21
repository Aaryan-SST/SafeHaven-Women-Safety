import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { useToast } from '../../context/ToastContext'
import Button from '../../components/shared/Button'
import Input from '../../components/shared/Input'
import Select from '../../components/shared/Select'
import { INDIAN_STATES } from '../../utils/constants'

const ROLE_TABS = [
  { id: 'citizen', label: '👩 I need support', desc: 'Access safety tools, legal aid, and community' },
  { id: 'ngo', label: '🏢 I represent an NGO', desc: 'Help women by managing reports and counseling' },
]

export default function Register() {
  const [role, setRole] = useState('citizen')
  const [form, setForm] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    state: '',
    city: '',
    organizationName: '',
    organizationType: '',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const { register, getRoleHome } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  function validate() {
    const errs = {}
    if (!form.displayName.trim()) errs.displayName = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    if (form.password.length < 8) errs.password = 'Password must be at least 8 characters'
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    if (role === 'ngo' && !form.organizationName.trim()) errs.organizationName = 'Organization name is required'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      await register(form.email, form.password, role, {
        displayName: form.displayName,
        phone: form.phone || null,
        state: form.state || null,
        city: form.city || null,
        organizationName: form.organizationName || null,
      })
      toast.success(
        role === 'ngo'
          ? 'Registration submitted! Await admin approval.'
          : 'Account created! Welcome to SafeHaven.'
      )
      navigate(getRoleHome(), { replace: true })
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setErrors({ email: 'This email is already registered.' })
      } else {
        toast.error('Registration failed. Please try again.')
      }
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create your account</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Join the SafeHaven community</p>
        </div>

        {/* Role Tabs */}
        <div className="flex gap-2 mb-4">
          {ROLE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setRole(tab.id)}
              className={`flex-1 p-3 rounded-xl border-2 text-left transition-all ${
                role === tab.id
                  ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-rose-300'
              }`}
            >
              <p className={`text-sm font-semibold ${role === tab.id ? 'text-rose-700 dark:text-rose-400' : 'text-gray-700 dark:text-gray-300'}`}>
                {tab.label}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{tab.desc}</p>
            </button>
          ))}
        </div>

        <div className="card p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              value={form.displayName}
              onChange={(e) => setField('displayName', e.target.value)}
              placeholder="Your name"
              required
              error={errors.displayName}
            />
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setField('email', e.target.value)}
              placeholder="you@example.com"
              required
              error={errors.email}
              autoComplete="email"
            />
            <Input
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) => setField('password', e.target.value)}
              placeholder="Min 8 characters"
              required
              error={errors.password}
            />
            <Input
              label="Confirm Password"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setField('confirmPassword', e.target.value)}
              placeholder="Re-enter password"
              required
              error={errors.confirmPassword}
            />

            {role === 'ngo' && (
              <>
                <Input
                  label="Organization Name"
                  value={form.organizationName}
                  onChange={(e) => setField('organizationName', e.target.value)}
                  placeholder="Your NGO / Organization name"
                  required
                  error={errors.organizationName}
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setField('phone', e.target.value)}
                  placeholder="10-digit mobile number"
                />
              </>
            )}

            <Select
              label="State"
              value={form.state}
              onChange={(e) => setField('state', e.target.value)}
              options={INDIAN_STATES.map((s) => ({ value: s, label: s }))}
              placeholder="Select your state"
            />

            {role === 'ngo' && (
              <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
                ⚠️ NGO accounts require admin approval before access is granted (24–48 hours).
              </p>
            )}

            <Button type="submit" fullWidth loading={loading}>
              {role === 'ngo' ? 'Submit for Approval' : 'Create Account'}
            </Button>
          </form>
        </div>

        <p className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-rose-600 hover:text-rose-700 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
