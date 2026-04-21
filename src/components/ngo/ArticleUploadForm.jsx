import { useState } from 'react'
import Button from '../shared/Button'
import Input from '../shared/Input'
import Select from '../shared/Select'
import { createArticle } from '../../services/articleService'
import useAuth from '../../hooks/useAuth'
import { useToast } from '../../context/ToastContext'
import { ARTICLE_CATEGORIES } from '../../utils/constants'

export default function ArticleUploadForm({ onCreated }) {
  const { currentUser, userProfile } = useAuth()
  const [form, setForm] = useState({ title: '', content: '', category: '' })
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  function setField(k, v) { setForm((p) => ({ ...p, [k]: v })) }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.title || !form.content || !form.category) { toast.error('All fields required.'); return }
    setLoading(true)
    await createArticle({
      ...form,
      authorUid: currentUser.uid,
      authorName: userProfile?.organizationName || userProfile?.displayName || 'NGO',
      authorRole: 'ngo',
      tags: [],
    })
    toast.success('Article submitted for admin review.')
    setForm({ title: '', content: '', category: '' })
    if (onCreated) onCreated()
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="card p-5 space-y-4">
      <h3 className="font-bold text-gray-900 dark:text-white">Submit an Article</h3>
      <Input label="Title" value={form.title} onChange={(e) => setField('title', e.target.value)} required placeholder="Article title" />
      <Select label="Category" value={form.category} onChange={(e) => setField('category', e.target.value)} options={ARTICLE_CATEGORIES} placeholder="Select category" required />
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Content (Markdown supported)</label>
        <textarea
          value={form.content}
          onChange={(e) => setField('content', e.target.value)}
          rows={8}
          placeholder="Write the article content in markdown..."
          className="input-field resize-y"
          required
        />
      </div>
      <Button type="submit" loading={loading} fullWidth>Submit for Review</Button>
    </form>
  )
}
