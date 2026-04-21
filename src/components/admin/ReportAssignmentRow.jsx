import { useState } from 'react'
import Badge from '../shared/Badge'
import Button from '../shared/Button'
import { assignReportToNGO } from '../../services/reportService'
import { useToast } from '../../context/ToastContext'
import { STATUS_LABELS, INCIDENT_TYPES } from '../../utils/constants'
import { formatDate } from '../../utils/formatters'

export default function ReportAssignmentRow({ report, ngos, onUpdated }) {
  const [selectedNGO, setSelectedNGO] = useState(report.assignedTo || '')
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  async function handleAssign() {
    if (!selectedNGO) return
    setLoading(true)
    await assignReportToNGO(report.id, selectedNGO)
    toast.success('Report assigned to NGO.')
    onUpdated()
    setLoading(false)
  }

  const incidentInfo = INCIDENT_TYPES.find((t) => t.value === report.incidentType)
  const statusInfo = STATUS_LABELS[report.status] || { label: report.status, color: 'gray' }

  return (
    <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
      <td className="py-3 px-4">
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{incidentInfo?.label || report.incidentType}</p>
          <p className="text-xs text-gray-400">{formatDate(report.createdAt)}</p>
        </div>
      </td>
      <td className="py-3 px-4 hidden md:table-cell">
        <p className="text-xs text-gray-600 dark:text-gray-400 max-w-xs truncate">{report.description}</p>
      </td>
      <td className="py-3 px-4">
        <Badge color={statusInfo.color}>{statusInfo.label}</Badge>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <select
            value={selectedNGO}
            onChange={(e) => setSelectedNGO(e.target.value)}
            className="input-field text-xs py-1.5 px-2"
          >
            <option value="">Select NGO</option>
            {ngos.map((ngo) => (
              <option key={ngo.uid} value={ngo.uid}>{ngo.organizationName || ngo.displayName}</option>
            ))}
          </select>
          <Button onClick={handleAssign} size="sm" loading={loading} disabled={!selectedNGO || selectedNGO === report.assignedTo}>
            Assign
          </Button>
        </div>
      </td>
    </tr>
  )
}
