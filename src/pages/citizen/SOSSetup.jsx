import { useReducer, useState } from 'react'
import { nanoid } from 'nanoid'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageWrapper from '../../components/layout/PageWrapper'
import Button from '../../components/shared/Button'
import Input from '../../components/shared/Input'
import Textarea from '../../components/shared/Textarea'
import ContactCard from '../../components/sos/ContactCard'
import useSOS from '../../hooks/useSOS'
import { useToast } from '../../context/ToastContext'
import { MAX_SOS_CONTACTS, DEFAULT_ALERT_MESSAGE } from '../../utils/constants'
import { validatePhone } from '../../utils/validators'

const STEPS = ['Contacts', 'Message', 'Test & Save']

function reducer(state, action) {
  switch (action.type) {
    case 'NEXT': return { ...state, step: Math.min(state.step + 1, 2) }
    case 'PREV': return { ...state, step: Math.max(state.step - 1, 0) }
    case 'SET_STEP': return { ...state, step: action.step }
    default: return state
  }
}

export default function SOSSetup() {
  const { contacts: savedContacts, alertMessage: savedMsg, saveContacts, testSOS, sosLoading } = useSOS()
  const [{ step }, dispatch] = useReducer(reducer, { step: 0 })
  const [contacts, setContacts] = useState(savedContacts.length ? savedContacts : [])
  const [alertMessage, setAlertMessage] = useState(savedMsg || DEFAULT_ALERT_MESSAGE)
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [editingContact, setEditingContact] = useState(null)
  const [phoneError, setPhoneError] = useState('')
  const toast = useToast()

  function addContact() {
    if (!newName.trim()) { toast.error('Contact name is required'); return }
    if (!validatePhone(newPhone)) { setPhoneError('Enter a valid 10-digit Indian mobile number'); return }
    if (contacts.length >= MAX_SOS_CONTACTS) { toast.error(`Maximum ${MAX_SOS_CONTACTS} contacts allowed`); return }
    setPhoneError('')
    if (editingContact) {
      setContacts((prev) => prev.map((c) => c.id === editingContact ? { ...c, name: newName, phone: newPhone } : c))
      setEditingContact(null)
    } else {
      setContacts((prev) => [...prev, { id: nanoid(6), name: newName.trim(), phone: newPhone.trim() }])
    }
    setNewName('')
    setNewPhone('')
  }

  function removeContact(id) {
    setContacts((prev) => prev.filter((c) => c.id !== id))
  }

  function startEdit(contact) {
    setEditingContact(contact.id)
    setNewName(contact.name)
    setNewPhone(contact.phone)
  }

  async function handleSave() {
    await saveContacts(contacts, alertMessage)
    toast.success('SOS settings saved successfully!')
  }

  function handleTest() {
    if (!contacts.length) { toast.error('Add at least one contact first'); return }
    testSOS()
    toast.info('Test alerts opened! Your contacts received a clearly labeled test message.')
  }

  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">SOS Setup 🚨</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Configure your emergency alert system. In a crisis, one tap sends WhatsApp messages with your location to all contacts.
            </p>
          </div>

          {/* Step Progress */}
          <div className="flex items-center gap-2 mb-8">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <button
                  onClick={() => dispatch({ type: 'SET_STEP', step: i })}
                  className={`w-8 h-8 rounded-full text-sm font-bold flex-shrink-0 transition-colors ${
                    i === step ? 'bg-rose-600 text-white' :
                    i < step ? 'bg-rose-200 dark:bg-rose-800 text-rose-700 dark:text-rose-300' :
                    'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}
                >
                  {i < step ? '✓' : i + 1}
                </button>
                <span className={`text-sm font-medium hidden sm:block ${i === step ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                  {s}
                </span>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 ${i < step ? 'bg-rose-400' : 'bg-gray-200 dark:bg-gray-700'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="card p-6">
            {/* Step 0: Contacts */}
            {step === 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Emergency Contacts ({contacts.length}/{MAX_SOS_CONTACTS})
                </h2>

                {contacts.length > 0 && (
                  <div className="space-y-2 mb-6">
                    {contacts.map((c) => (
                      <ContactCard key={c.id} contact={c} onDelete={removeContact} onEdit={startEdit} />
                    ))}
                  </div>
                )}

                {contacts.length < MAX_SOS_CONTACTS && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-3">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {editingContact ? 'Edit Contact' : 'Add Contact'}
                    </h3>
                    <Input
                      label="Name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Contact's name"
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      value={newPhone}
                      onChange={(e) => { setNewPhone(e.target.value); setPhoneError('') }}
                      placeholder="10-digit mobile number"
                      error={phoneError}
                    />
                    <Button onClick={addContact} variant="secondary" size="sm">
                      {editingContact ? 'Update Contact' : '+ Add Contact'}
                    </Button>
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <Button onClick={() => dispatch({ type: 'NEXT' })} disabled={contacts.length === 0}>
                    Next →
                  </Button>
                </div>
              </div>
            )}

            {/* Step 1: Alert Message */}
            {step === 1 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Alert Message</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  This message (with your Google Maps location link appended) will be sent to all contacts via WhatsApp.
                </p>
                <Textarea
                  label="Your Alert Message"
                  value={alertMessage}
                  onChange={(e) => setAlertMessage(e.target.value)}
                  rows={4}
                  maxLength={200}
                />
                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-sm text-blue-700 dark:text-blue-400">
                  <strong>Preview:</strong> "{alertMessage} https://maps.google.com/?q=28.6139,77.2090"
                </div>
                <div className="mt-6 flex gap-3 justify-between">
                  <Button onClick={() => dispatch({ type: 'PREV' })} variant="secondary">← Back</Button>
                  <Button onClick={() => dispatch({ type: 'NEXT' })}>Next →</Button>
                </div>
              </div>
            )}

            {/* Step 2: Test & Save */}
            {step === 2 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Test & Save</h2>

                <div className="space-y-3 mb-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Contacts:</p>
                    {contacts.map((c) => (
                      <p key={c.id} className="text-sm text-gray-600 dark:text-gray-400">✓ {c.name} — {c.phone}</p>
                    ))}
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Alert Message:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{alertMessage}"</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button onClick={handleTest} variant="secondary" fullWidth>
                    📱 Send Test Alert (Safe — labeled as test)
                  </Button>
                  <Button onClick={handleSave} fullWidth loading={sosLoading}>
                    ✅ Save SOS Settings
                  </Button>
                </div>

                <div className="mt-6 flex justify-start">
                  <Button onClick={() => dispatch({ type: 'PREV' })} variant="ghost">← Back</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </PageWrapper>
      <Footer />
    </>
  )
}
