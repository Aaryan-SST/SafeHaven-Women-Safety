import { useState, useEffect } from 'react'
import { getComments, createComment, upvoteComment } from '../../services/forumService'
import useAuth from '../../hooks/useAuth'
import useAnonymousAlias from '../../hooks/useAnonymousAlias'
import CounselorBadge from './CounselorBadge'
import { formatRelative } from '../../utils/formatters'
import Button from '../shared/Button'

export default function CommentThread({ postId, visible }) {
  const { currentUser, userRole } = useAuth()
  const alias = useAnonymousAlias()
  const [comments, setComments] = useState([])
  const [reply, setReply] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!visible) return
    setLoading(true)
    getComments(postId)
      .then(setComments)
      .finally(() => setLoading(false))
  }, [postId, visible])

  async function handleReply(e) {
    e.preventDefault()
    if (!reply.trim() || !currentUser) return
    setSubmitting(true)
    const newComment = await createComment({
      postId,
      authorUid: currentUser.uid,
      alias,
      isAnonymous: true,
      content: reply.trim(),
      isCounselorComment: userRole === 'ngo',
    })
    setReply('')
    getComments(postId).then(setComments)
    setSubmitting(false)
  }

  if (!visible) return null

  return (
    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 space-y-3">
      {loading ? (
        <p className="text-xs text-gray-400">Loading replies...</p>
      ) : (
        comments.map((c) => (
          <div key={c.id} className="flex gap-2">
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs text-gray-500 flex-shrink-0 mt-0.5">
              {c.alias.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{c.alias}</span>
                {c.isCounselorComment && <CounselorBadge />}
                <span className="text-xs text-gray-400">{formatRelative(c.createdAt)}</span>
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300">{c.content}</p>
            </div>
          </div>
        ))
      )}

      {/* Reply Box */}
      <form onSubmit={handleReply} className="flex gap-2 mt-2">
        <input
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Write a reply..."
          maxLength={500}
          className="flex-1 text-xs input-field py-1.5"
        />
        <Button type="submit" size="sm" loading={submitting} disabled={!reply.trim()}>
          Reply
        </Button>
      </form>
    </div>
  )
}
