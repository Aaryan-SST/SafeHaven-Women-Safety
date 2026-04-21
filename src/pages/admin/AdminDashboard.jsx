import { useEffect, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Sidebar from '../../components/layout/Sidebar'
import StatCard from '../../components/dashboard/StatCard'
import { ReportsByTypeChart, UserDistributionChart } from '../../components/admin/AnalyticsChart'
import { getPlatformAnalytics } from '../../services/analyticsService'
import Spinner from '../../components/shared/Spinner'

const ADMIN_SIDEBAR_LINKS = [
  { to: '/admin/dashboard', icon: '📊', label: 'Analytics', end: true },
  { to: '/admin/ngo-approvals', icon: '✅', label: 'NGO Approvals' },
  { to: '/admin/reports', icon: '📋', label: 'All Reports' },
  { to: '/admin/helplines', icon: '📞', label: 'Helplines' },
  { to: '/admin/articles', icon: '📚', label: 'Articles' },
]

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPlatformAnalytics().then(setAnalytics).finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-6">
            <Sidebar links={ADMIN_SIDEBAR_LINKS} />
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Platform Analytics 📊</h1>
              {loading ? (
                <div className="flex justify-center py-16"><Spinner size="lg" className="text-rose-500" /></div>
              ) : (
                <>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard icon="👥" label="Total Users" value={analytics?.totalUsers || 0} color="blue" />
                    <StatCard icon="📋" label="Total Reports" value={analytics?.totalReports || 0} color="orange" />
                    <StatCard icon="✅" label="Resolved Reports" value={analytics?.resolvedReports || 0} color="green" />
                    <StatCard icon="⏳" label="Pending NGOs" value={analytics?.pendingNGOs || 0} color="purple" />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ReportsByTypeChart data={analytics?.reportsByType} />
                    <UserDistributionChart
                      citizens={analytics?.citizens}
                      ngos={analytics?.ngos}
                      pendingNGOs={analytics?.pendingNGOs}
                    />
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    <StatCard icon="💬" label="Forum Posts" value={analytics?.totalForumPosts || 0} color="purple" />
                    <StatCard icon="📚" label="Published Articles" value={analytics?.publishedArticles || 0} color="blue" />
                    <StatCard icon="⏳" label="Pending Reports" value={analytics?.pendingReports || 0} color="rose" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
