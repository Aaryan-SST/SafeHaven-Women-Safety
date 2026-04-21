import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getReportsByUser } from '../../services/reportService'
import useAuth from '../../hooks/useAuth'
import Badge from '../shared/Badge'
import Spinner from '../shared/Spinner'
import { formatRelative } from '../../utils/formatters'
import { STATUS_LABELS, INCIDENT_TYPES } from '../../utils/constants'

export default function RecentReports() {
  const { currentUser } = useAuth()
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUser) return
    getReportsByUser(currentUser.uid)
      .then((r) => setReports(r.slice(0, 5)))
      .finally(() => setLoading(false))
  }, [currentUser])

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 dark:text-white">My Reports</h3>
        <Link to="/safety-map" className="text-sm text-rose-600 hover:text-rose-700 font-medium">
          View map →
        </Link>
      </div>
      {loading ? (
        <div className="flex justify-center py-8"><Spinner className="text-rose-500" /></div>
      ) : reports.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p className="text-3xl mb-2">📍</p>
          <p className="text-sm">No reports yet. Stay safe out there.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {reports.map((r) => {
            const incidentInfo = INCIDENT_TYPES.find((t) => t.value === r.incidentType)
            const statusInfo = STATUS_LABELS[r.status] || { label: r.status, color: 'gray' }
            return (
              <li key={r.id} className="flex items-center justify-between gap-3 py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {incidentInfo?.label || r.incidentType}
                  </p>
                  <p className="text-xs text-gray-400">{formatRelative(r.createdAt)}</p>
                </div>
                <Badge color={statusInfo.color}>{statusInfo.label}</Badge>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
