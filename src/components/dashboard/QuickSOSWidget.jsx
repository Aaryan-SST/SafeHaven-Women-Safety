import { useState } from 'react'
import { Link } from 'react-router-dom'
import useSOS from '../../hooks/useSOS'
import SOSModal from '../sos/SOSModal'

export default function QuickSOSWidget() {
  const { contacts } = useSOS()
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="card p-5 border-2 border-rose-200 dark:border-rose-800 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-rose-900/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 dark:text-white">Emergency SOS</h3>
          <span className="text-2xl">🚨</span>
        </div>
        {contacts.length > 0 ? (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {contacts.length} trusted contact{contacts.length !== 1 ? 's' : ''} ready. One tap sends them your location.
            </p>
            <button
              onClick={() => setOpen(true)}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl transition-colors text-sm"
            >
              Trigger SOS Alert
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Set up emergency contacts so you can alert them instantly when you need help.
            </p>
            <Link
              to="/sos-setup"
              className="block w-full text-center bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl transition-colors text-sm"
            >
              Set Up SOS Now →
            </Link>
          </>
        )}
      </div>
      <SOSModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
