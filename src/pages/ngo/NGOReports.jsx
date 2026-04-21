import { useEffect, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Sidebar from '../../components/layout/Sidebar'
import ReportStatusEditor from '../../components/ngo/ReportStatusEditor'
import Badge from '../../components/shared/Badge'
import Spinner from '../../components/shared/Spinner'
import EmptyState from '../../components/shared/EmptyState'
import { getAssignedReports } from '../../services/reportService'
import useAuth from '../../hooks/useAuth'
import { STATUS_LABELS, INCIDENT_TYPES } from '../../utils/constants'
import { formatDateTime } from '../../utils/formatters'

const NGO_SIDEBAR_LINKS = [
  { to: '/ngo/dashboard', icon: '🏠', label: 'Dashboard', end: true },
  { to: '/ngo/reports', icon: '📋', label: 'Reports' },
  { to: '/ngo/forum', icon: '💬', label: 'Forum Moderation' },
  { to: '/ngo/events', icon: '📅', label: 'Events' },
]

export default function NGOReports() {
  const { currentUser } = useAuth()
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)

  function load() {
    if (!currentUser) return
    getAssignedReports(currentUser.uid).then(setReports).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [currentUser])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-6">
            <Sidebar links={NGO_SIDEBAR_LINKS} />
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Assigned Reports 📋</h1>
              {loading ? (
                <div className="flex justify-center py-16"><Spinner size="lg" className="text-rose-500" /></div>
              ) : reports.length === 0 ? (
                <EmptyState icon="📋" title="No reports assigned" description="Admin will assign incident reports to your NGO based on your area of operation." />
              ) : (
                <div className="space-y-4">
                  {reports.map((r) => {
                    const incidentInfo = INCIDENT_TYPES.find((t) => t.value === r.incidentType)
                    const statusInfo = STATUS_LABELS[r.status] || { label: r.status, color: 'gray' }
                    return (
                      <div key={r.id} className="card p-5">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{incidentInfo?.label || r.incidentType}</h3>
                              <Badge color={statusInfo.color}>{statusInfo.label}</Badge>
                            </div>
                            <p className="text-xs text-gray-400">{formatDateTime(r.createdAt)} · {r.location?.lat?.toFixed(4)}, {r.location?.lng?.toFixed(4)}</p>
                          </div>
                          <button
                            onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                            className="text-xs text-rose-600 font-medium"
                          >
                            {expandedId === r.id ? 'Collapse' : 'Update'}
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{r.description}</p>
                        {r.ngoNotes && (
                          <p className="text-xs bg-gray-50 dark:bg-gray-800 rounded-lg p-2 text-gray-600 dark:text-gray-400 mb-3">
                            <strong>Previous note:</strong> {r.ngoNotes}
                          </p>
                        )}
                        {expandedId === r.id && (
                          <ReportStatusEditor report={r} onUpdated={() => { setExpandedId(null); load() }} />
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
