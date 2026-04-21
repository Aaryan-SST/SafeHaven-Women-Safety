import { useState } from 'react'
import Button from '../shared/Button'
import Input from '../shared/Input'
import Select from '../shared/Select'
import { addHelpline } from '../../services/helplineService'
import { useToast } from '../../context/ToastContext'
import { HELPLINE_CATEGORIES } from '../../utils/constants'

export default function HelplineEditor({ onCreated }) {
  const [form, setForm] = useState({ name: '', number: '', description: '', category: '' })
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  function setField(k, v) { setForm((p) => ({ ...p, [k]: v })) }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.number || !form.category) { toast.error('Name, number and category required.'); return }
    setLoading(true)
    await addHelpline(form)
    toast.success('Helpline added!')
    setForm({ name: '', number: '', description: '', category: '' })
    if (onCreated) onCreated()
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="card p-5 space-y-4">
      <h3 className="font-bold text-gray-900 dark:text-white">Add New Helpline</h3>
      <Input label="Organization Name" value={form.name} onChange={(e) => setField('name', e.target.value)} required placeholder="e.g. National Women's Helpline" />
      <Input label="Number" value={form.number} onChange={(e) => setField('number', e.target.value)} required placeholder="e.g. 1091" />
      <Input label="Description (optional)" value={form.description} onChange={(e) => setField('description', e.target.value)} placeholder="Brief description" />
      <Select label="Category" value={form.category} onChange={(e) => setField('category', e.target.value)} options={HELPLINE_CATEGORIES} placeholder="Select category" required />
      <Button type="submit" loading={loading} fullWidth>Add Helpline</Button>
    </form>
  )
}
