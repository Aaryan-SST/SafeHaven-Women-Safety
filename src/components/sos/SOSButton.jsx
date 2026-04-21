import { useState } from 'react'
import SOSModal from './SOSModal'
import useAuth from '../../hooks/useAuth'

export default function SOSButton() {
  const [open, setOpen] = useState(false)
  const { currentUser, userRole } = useAuth()

  if (!currentUser || userRole !== 'citizen') return null

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm px-3 py-1.5 rounded-lg transition-colors animate-pulse-slow focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
        aria-label="Emergency SOS"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        SOS
      </button>
      <SOSModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
