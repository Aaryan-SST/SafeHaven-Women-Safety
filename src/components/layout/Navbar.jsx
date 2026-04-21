import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { useTheme } from '../../context/ThemeContext'
import SOSButton from '../sos/SOSButton'

const CITIZEN_LINKS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/safety-map', label: 'Safety Map' },
  { to: '/legal-aid', label: 'Legal Aid' },
  { to: '/forum', label: 'Forum' },
  { to: '/helpline', label: 'Helplines' },
]

const NGO_LINKS = [
  { to: '/ngo/dashboard', label: 'Dashboard' },
  { to: '/ngo/reports', label: 'Reports' },
  { to: '/ngo/forum', label: 'Forum' },
  { to: '/ngo/events', label: 'Events' },
]

const ADMIN_LINKS = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/ngo-approvals', label: 'NGOs' },
  { to: '/admin/reports', label: 'Reports' },
  { to: '/admin/helplines', label: 'Helplines' },
  { to: '/admin/articles', label: 'Articles' },
]

function getLinks(role) {
  if (role === 'citizen') return CITIZEN_LINKS
  if (role === 'ngo') return NGO_LINKS
  if (role === 'admin') return ADMIN_LINKS
  return []
}

export default function Navbar() {
  const { currentUser, userProfile, userRole, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const links = getLinks(userRole)

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  const roleBadgeColor = {
    citizen: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
    ngo: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    admin: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl">🛡️</span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              Safe<span className="text-rose-600">Haven</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          {currentUser && (
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* SOS Button — only visible to citizens */}
            <SOSButton />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Auth Actions */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-8 h-8 bg-rose-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {(userProfile?.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
                  </div>
                  <svg className="w-4 h-4 text-gray-500 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 card shadow-xl py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {userProfile?.displayName || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{currentUser.email}</p>
                      {userRole && (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${roleBadgeColor[userRole]}`}>
                          {userRole.toUpperCase()}
                        </span>
                      )}
                    </div>
                    {userRole === 'citizen' && (
                      <Link
                        to="/sos-setup"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <span>🚨</span> SOS Setup
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors px-3 py-2"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm py-2 px-4"
                >
                  Join
                </Link>
              </div>
            )}

            {/* Mobile Hamburger */}
            {currentUser && (
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && currentUser && (
          <div className="md:hidden border-t border-gray-100 dark:border-gray-800 py-3 space-y-1 animate-fade-in">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
