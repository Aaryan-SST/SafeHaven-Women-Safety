import { useState } from 'react'
import Button from '../shared/Button'
import { updateReportStatus } from '../../services/reportService'
import { useToast } from '../../context/ToastContext'
import { REPORT_STATUSES, STATUS_LABELS } from '../../utils/constants'

const STATUS_OPTIONS = Object.values(REPORT_STATUSES).map((s) => ({
  value: s,
  label: STATUS_LABELS[s]?.label || s,
}))

export default function ReportStatusEditor({ report, onUpdated }) {
  const [status, setStatus] = useState(report.status)
  const [notes, setNotes] = useState(report.ngoNotes || '')
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  async function handleSave() {
    setLoading(true)
    await updateReportStatus(report.id, status, notes)
    toast.success('Report status updated.')
    if (onUpdated) onUpdated()
    setLoading(false)
  }

  return (
    <div className="space-y-3">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="input-field text-sm"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add notes about actions taken..."
        rows={3}
        className="input-field resize-none text-sm"
      />
      <Button onClick={handleSave} size="sm" loading={loading} fullWidth>
        Save Update
      </Button>
    </div>
  )
}
