import { useEffect, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Sidebar from '../../components/layout/Sidebar'
import NGOApprovalCard from '../../components/admin/NGOApprovalCard'
import EmptyState from '../../components/shared/EmptyState'
import Spinner from '../../components/shared/Spinner'
import { getPendingNGOs } from '../../services/userService'

const ADMIN_SIDEBAR_LINKS = [
  { to: '/admin/dashboard', icon: '📊', label: 'Analytics', end: true },
  { to: '/admin/ngo-approvals', icon: '✅', label: 'NGO Approvals' },
  { to: '/admin/reports', icon: '📋', label: 'All Reports' },
  { to: '/admin/helplines', icon: '📞', label: 'Helplines' },
  { to: '/admin/articles', icon: '📚', label: 'Articles' },
]

export default function AdminNGOApprovals() {
  const [ngos, setNgos] = useState([])
  const [loading, setLoading] = useState(true)

  function load() {
    getPendingNGOs().then(setNgos).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-6">
            <Sidebar links={ADMIN_SIDEBAR_LINKS} />
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                NGO Approvals ✅ {!loading && <span className="text-gray-400 text-base">({ngos.length} pending)</span>}
              </h1>
              {loading ? (
                <div className="flex justify-center py-16"><Spinner size="lg" className="text-rose-500" /></div>
              ) : ngos.length === 0 ? (
                <EmptyState icon="✅" title="No pending approvals" description="All NGO registrations have been reviewed." />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ngos.map((ngo) => (
                    <NGOApprovalCard key={ngo.uid} ngo={ngo} onUpdated={load} />
                  ))}
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
