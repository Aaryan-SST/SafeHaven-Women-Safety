import { useState } from 'react'
import { upvotePost, removeUpvotePost } from '../../services/forumService'
import useAuth from '../../hooks/useAuth'

export default function UpvoteButton({ post }) {
  const { currentUser } = useAuth()
  const hasUpvoted = post.upvotedBy?.includes(currentUser?.uid)
  const [localCount, setLocalCount] = useState(post.upvotes || 0)
  const [localUpvoted, setLocalUpvoted] = useState(hasUpvoted)

  async function toggle() {
    if (!currentUser) return
    if (localUpvoted) {
      setLocalCount((c) => c - 1)
      setLocalUpvoted(false)
      await removeUpvotePost(post.id, currentUser.uid)
    } else {
      setLocalCount((c) => c + 1)
      setLocalUpvoted(true)
      await upvotePost(post.id, currentUser.uid)
    }
  }

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
        localUpvoted
          ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600'
      }`}
    >
      <svg className="w-3.5 h-3.5" fill={localUpvoted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
      {localCount}
    </button>
  )
}
