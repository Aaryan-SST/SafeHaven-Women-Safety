import { useState } from 'react'
import { reportPost } from '../../services/forumService'
import { useToast } from '../../context/ToastContext'

export default function ReportPostButton({ postId }) {
  const [reported, setReported] = useState(false)
  const toast = useToast()

  async function handleReport() {
    if (reported) return
    await reportPost(postId)
    setReported(true)
    toast.info('Post reported. Our moderators will review it.')
  }

  return (
    <button
      onClick={handleReport}
      disabled={reported}
      className={`text-xs flex items-center gap-1 transition-colors ${
        reported ? 'text-gray-300 dark:text-gray-600 cursor-default' : 'text-gray-400 hover:text-red-500'
      }`}
    >
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
      </svg>
      {reported ? 'Reported' : 'Report'}
    </button>
  )
}
