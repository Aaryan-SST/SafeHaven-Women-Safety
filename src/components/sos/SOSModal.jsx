import { useState } from 'react'
import Modal from '../shared/Modal'
import Button from '../shared/Button'
import useSOS from '../../hooks/useSOS'
import useGeolocation from '../../hooks/useGeolocation'

export default function SOSModal({ isOpen, onClose }) {
  const { contacts, triggerSOS } = useSOS()
  const { coords, geoLoading, requestLocation } = useGeolocation()
  const [sent, setSent] = useState(false)

  function handleSend() {
    triggerSOS(coords)
    setSent(true)
    setTimeout(onClose, 2500)
  }

  function handleOpen() {
    setSent(false)
    requestLocation()
  }

  // Auto-request location when modal opens
  if (isOpen && !coords && !geoLoading) {
    requestLocation()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} hideClose={sent} size="sm">
      {sent ? (
        <div className="text-center py-4">
          <div className="text-5xl mb-4">✅</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Alert Sent!</h3>
          <p className="text-gray-500 dark:text-gray-400">
            WhatsApp alerts opened for {contacts.length} contact{contacts.length !== 1 ? 's' : ''}.
          </p>
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-4">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Contacts Set</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Please add emergency contacts in SOS Setup before triggering an alert.
          </p>
          <Button onClick={onClose} variant="secondary" fullWidth>Go to SOS Setup</Button>
        </div>
      ) : (
        <div>
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">🚨</div>
            <h3 className="text-xl font-bold text-red-600 mb-1">Send Emergency Alert?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This will send WhatsApp alerts{coords ? ' with your location' : ''} to:
            </p>
          </div>

          <ul className="space-y-2 mb-6">
            {contacts.map((c) => (
              <li key={c.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                <div className="w-8 h-8 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center text-rose-600 font-bold text-sm">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-900 dark:text-white">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.phone}</p>
                </div>
              </li>
            ))}
          </ul>

          {geoLoading && (
            <p className="text-xs text-center text-gray-500 mb-4">📍 Getting your location...</p>
          )}
          {coords && (
            <p className="text-xs text-center text-green-600 mb-4">📍 Location ready to share</p>
          )}

          <div className="flex gap-3">
            <Button onClick={onClose} variant="secondary" fullWidth>Cancel</Button>
            <Button onClick={handleSend} variant="danger" fullWidth>
              Send Alert
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
