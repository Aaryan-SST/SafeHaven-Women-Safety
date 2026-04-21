import { useState } from 'react'
import Modal from '../shared/Modal'
import Button from '../shared/Button'
import Input from '../shared/Input'
import Textarea from '../shared/Textarea'
import { submitConsultationRequest } from '../../services/lawyerService'
import useAuth from '../../hooks/useAuth'
import { useToast } from '../../context/ToastContext'

export default function ConsultationModal({ isOpen, onClose, lawyer }) {
  const { currentUser } = useAuth()
  const [form, setForm] = useState({ message: '', contactEmail: '', contactPhone: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const toast = useToast()

  function setField(k, v) { setForm((p) => ({ ...p, [k]: v })) }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.message.trim()) { toast.error('Please describe your situation'); return }
    if (!form.contactEmail.trim() && !form.contactPhone.trim()) {
      toast.error('Please provide at least one contact method'); return
    }
    setLoading(true)
    try {
      await submitConsultationRequest({
        citizenUid: currentUser.uid,
        lawyerId: lawyer.id,
        lawyerName: lawyer.name,
        message: form.message,
        contactEmail: form.contactEmail,
        contactPhone: form.contactPhone,
      })
      setDone(true)
    } catch {
      toast.error('Failed to submit request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleClose() {
    setDone(false)
    setForm({ message: '', contactEmail: '', contactPhone: '' })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={done ? undefined : `Request Consultation — ${lawyer?.name}`}>
      {done ? (
        <div className="text-center py-4">
          <div className="text-5xl mb-4">✅</div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Request Sent</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            {lawyer?.name} has received your consultation request and will reach out via your provided contact details.
          </p>
          <Button onClick={handleClose} variant="secondary" fullWidth>Close</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              Your request will be sent to <strong>{lawyer?.name}</strong>. They will contact you directly.
            </p>
          </div>
          <Textarea
            label="Describe your situation"
            value={form.message}
            onChange={(e) => setField('message', e.target.value)}
            placeholder="Briefly describe what legal help you need (max 500 characters)..."
            rows={4}
            maxLength={500}
            required
          />
          <Input
            label="Your email"
            type="email"
            value={form.contactEmail}
            onChange={(e) => setField('contactEmail', e.target.value)}
            placeholder="your@email.com"
          />
          <Input
            label="Your phone (optional)"
            type="tel"
            value={form.contactPhone}
            onChange={(e) => setField('contactPhone', e.target.value)}
            placeholder="10-digit mobile number"
          />
          <p className="text-xs text-gray-400">At least one contact method is required.</p>
          <Button type="submit" fullWidth loading={loading}>
            Send Request
          </Button>
        </form>
      )}
    </Modal>
  )
}
