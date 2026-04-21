import { useEffect, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Sidebar from '../../components/layout/Sidebar'
import ReportAssignmentRow from '../../components/admin/ReportAssignmentRow'
import Spinner from '../../components/shared/Spinner'
import EmptyState from '../../components/shared/EmptyState'
import { getAllReports } from '../../services/reportService'
import { getApprovedNGOs } from '../../services/userService'

const ADMIN_SIDEBAR_LINKS = [
  { to: '/admin/dashboard', icon: '📊', label: 'Analytics', end: true },
  { to: '/admin/ngo-approvals', icon: '✅', label: 'NGO Approvals' },
  { to: '/admin/reports', icon: '📋', label: 'All Reports' },
  { to: '/admin/helplines', icon: '📞', label: 'Helplines' },
  { to: '/admin/articles', icon: '📚', label: 'Articles' },
]

export default function AdminReports() {
  const [reports, setReports] = useState([])
  const [ngos, setNgos] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')

  function load() {
    Promise.all([
      getAllReports(statusFilter === 'all' ? null : statusFilter),
      getApprovedNGOs(),
    ]).then(([r, n]) => { setReports(r); setNgos(n) }).finally(() => setLoading(false))
  }

  useEffect(() => { setLoading(true); load() }, [statusFilter])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-6">
            <Sidebar links={ADMIN_SIDEBAR_LINKS} />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">All Reports 📋</h1>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-field w-40 text-sm py-2">
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              {loading ? (
                <div className="flex justify-center py-16"><Spinner size="lg" className="text-rose-500" /></div>
              ) : reports.length === 0 ? (
                <EmptyState icon="📋" title="No reports found" />
              ) : (
                <div className="card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">Incident</th>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-4 hidden md:table-cell">Description</th>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">Status</th>
                          <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">Assign NGO</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {reports.map((r) => (
                          <ReportAssignmentRow key={r.id} report={r} ngos={ngos} onUpdated={load} />
                        ))}
                      </tbody>
                    </table>
                  </div>
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
