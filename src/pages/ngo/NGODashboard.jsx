import { useEffect, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Sidebar from '../../components/layout/Sidebar'
import StatCard from '../../components/dashboard/StatCard'
import useAuth from '../../hooks/useAuth'
import { getAssignedReports } from '../../services/reportService'
import { getEventsByOrganiser } from '../../services/eventService'

const NGO_SIDEBAR_LINKS = [
  { to: '/ngo/dashboard', icon: '🏠', label: 'Dashboard', end: true },
  { to: '/ngo/reports', icon: '📋', label: 'Reports' },
  { to: '/ngo/forum', icon: '💬', label: 'Forum Moderation' },
  { to: '/ngo/events', icon: '📅', label: 'Events' },
]

export default function NGODashboard() {
  const { userProfile } = useAuth()
  const { currentUser } = useAuth()
  const [stats, setStats] = useState({ assigned: 0, pending: 0, resolved: 0, events: 0 })

  useEffect(() => {
    if (!currentUser) return
    Promise.all([
      getAssignedReports(currentUser.uid),
      getEventsByOrganiser(currentUser.uid),
    ]).then(([reports, events]) => {
      setStats({
        assigned: reports.length,
        pending: reports.filter((r) => r.status === 'assigned' || r.status === 'in_progress').length,
        resolved: reports.filter((r) => r.status === 'resolved').length,
        events: events.length,
      })
    })
  }, [currentUser])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-6">
            <Sidebar links={NGO_SIDEBAR_LINKS} />
            <div className="flex-1">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userProfile?.organizationName || 'NGO'} Dashboard 🏢
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your assigned reports, forum counseling, and events.</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard icon="📋" label="Assigned Reports" value={stats.assigned} color="blue" />
                <StatCard icon="⏳" label="Pending Action" value={stats.pending} color="orange" />
                <StatCard icon="✅" label="Resolved" value={stats.resolved} color="green" />
                <StatCard icon="📅" label="Events Organized" value={stats.events} color="purple" />
              </div>
              <div className="card p-5 text-center py-12">
                <p className="text-4xl mb-3">👋</p>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Thank you for your support</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
                  Your NGO plays a vital role in making communities safer. Use the sidebar to manage reports, engage in forum counseling, and organize events.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
