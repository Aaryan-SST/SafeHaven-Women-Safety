import { useState } from 'react'
import Button from '../shared/Button'
import useAuth from '../../hooks/useAuth'
import useAnonymousAlias from '../../hooks/useAnonymousAlias'
import { createPost } from '../../services/forumService'
import { useToast } from '../../context/ToastContext'

export default function PostComposer({ channelId, onPosted }) {
  const { currentUser, userRole } = useAuth()
  const alias = useAnonymousAlias()
  const [content, setContent] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!content.trim()) return
    setLoading(true)
    try {
      const isCounselor = userRole === 'ngo'
      await createPost({
        channelId,
        authorUid: currentUser.uid,
        alias: isAnonymous ? alias : (currentUser.displayName || alias),
        isAnonymous,
        content: content.trim(),
        isCounselorPost: isCounselor,
      })
      setContent('')
      if (onPosted) onPosted()
      toast.success('Post shared with the community.')
    } catch {
      toast.error('Failed to post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center text-rose-600 text-xs font-bold flex-shrink-0">
          {isAnonymous ? '?' : (currentUser?.displayName || 'U').charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Posting as <em>{isAnonymous ? alias : currentUser?.displayName}</em>
        </span>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts, experience, or question..."
        rows={3}
        maxLength={1000}
        className="input-field resize-none mb-3"
      />
      <div className="flex items-center justify-between gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="accent-rose-600"
          />
          <span className="text-xs text-gray-600 dark:text-gray-400">Post anonymously</span>
        </label>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{content.length}/1000</span>
          <Button type="submit" size="sm" loading={loading} disabled={!content.trim()}>
            Post
          </Button>
        </div>
      </div>
    </form>
  )
}
