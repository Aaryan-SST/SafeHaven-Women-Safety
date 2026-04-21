import { useState } from 'react'
import CounselorBadge from './CounselorBadge'
import UpvoteButton from './UpvoteButton'
import ReportPostButton from './ReportPostButton'
import CommentThread from './CommentThread'
import { formatRelative } from '../../utils/formatters'
import { removePost } from '../../services/forumService'
import useAuth from '../../hooks/useAuth'

export default function PostCard({ post, canModerate }) {
  const [commentsOpen, setCommentsOpen] = useState(false)
  const { currentUser } = useAuth()

  async function handleRemove() {
    if (window.confirm('Remove this post?')) await removePost(post.id)
  }

  return (
    <div className="card p-5">
      {/* Author */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {post.alias.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{post.alias}</span>
            {post.isCounselorPost && <CounselorBadge />}
          </div>
          <span className="text-xs text-gray-400">{formatRelative(post.createdAt)}</span>
        </div>
        {canModerate && (
          <button onClick={handleRemove} className="text-xs text-red-500 hover:text-red-700 ml-auto">
            Remove
          </button>
        )}
      </div>

      {/* Content */}
      <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed mb-4 whitespace-pre-wrap">
        {post.content}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <UpvoteButton post={post} />
        <button
          onClick={() => setCommentsOpen((o) => !o)}
          className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Reply
        </button>
        <span className="ml-auto">
          <ReportPostButton postId={post.id} />
        </span>
      </div>

      {/* Comment Thread */}
      <CommentThread postId={post.id} visible={commentsOpen} />
    </div>
  )
}
