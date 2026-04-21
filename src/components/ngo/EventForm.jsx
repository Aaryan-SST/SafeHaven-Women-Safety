import { useState } from 'react'
import Button from '../shared/Button'
import Input from '../shared/Input'
import Textarea from '../shared/Textarea'
import { createEvent } from '../../services/eventService'
import useAuth from '../../hooks/useAuth'
import { useToast } from '../../context/ToastContext'

export default function EventForm({ onCreated }) {
  const { currentUser, userProfile } = useAuth()
  const [form, setForm] = useState({ title: '', description: '', eventDate: '', location: '' })
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  function setField(k, v) { setForm((p) => ({ ...p, [k]: v })) }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.title || !form.eventDate || !form.location) {
      toast.error('Please fill all required fields.')
      return
    }
    setLoading(true)
    await createEvent({
      ...form,
      eventDate: new Date(form.eventDate),
      organiserUid: currentUser.uid,
      organiserName: userProfile?.organizationName || userProfile?.displayName || 'NGO',
    })
    toast.success('Event created!')
    setForm({ title: '', description: '', eventDate: '', location: '' })
    if (onCreated) onCreated()
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="card p-5 space-y-4">
      <h3 className="font-bold text-gray-900 dark:text-white">Create Awareness Event</h3>
      <Input label="Event Title" value={form.title} onChange={(e) => setField('title', e.target.value)} required placeholder="e.g. Safety Awareness Drive" />
      <Textarea label="Description" value={form.description} onChange={(e) => setField('description', e.target.value)} rows={3} placeholder="Describe the event..." />
      <Input label="Date & Time" type="datetime-local" value={form.eventDate} onChange={(e) => setField('eventDate', e.target.value)} required />
      <Input label="Location" value={form.location} onChange={(e) => setField('location', e.target.value)} required placeholder="City, venue or online" />
      <Button type="submit" loading={loading} fullWidth>Create Event</Button>
    </form>
  )
}
