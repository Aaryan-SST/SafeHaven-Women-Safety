import Button from '../shared/Button'
import { approveNGO, rejectNGO } from '../../services/userService'
import { useToast } from '../../context/ToastContext'
import { useState } from 'react'
import { formatDate } from '../../utils/formatters'

export default function NGOApprovalCard({ ngo, onUpdated }) {
  const [loading, setLoading] = useState(null)
  const toast = useToast()

  async function handleApprove() {
    setLoading('approve')
    await approveNGO(ngo.uid)
    toast.success(`${ngo.organizationName} approved!`)
    onUpdated()
    setLoading(null)
  }

  async function handleReject() {
    setLoading('reject')
    await rejectNGO(ngo.uid)
    toast.info(`${ngo.organizationName} rejected.`)
    onUpdated()
    setLoading(null)
  }

  return (
    <div className="card p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-700 font-bold flex-shrink-0">
          {(ngo.organizationName || 'N').charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm">{ngo.organizationName}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{ngo.email}</p>
          <p className="text-xs text-gray-400">{ngo.state} · Registered {formatDate(ngo.createdAt)}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={handleApprove} size="sm" loading={loading === 'approve'} className="flex-1">Approve</Button>
        <Button onClick={handleReject} variant="danger" size="sm" loading={loading === 'reject'} className="flex-1">Reject</Button>
      </div>
    </div>
  )
}
