import { useEffect, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Sidebar from '../../components/layout/Sidebar'
import HelplineEditor from '../../components/admin/HelplineEditor'
import Badge from '../../components/shared/Badge'
import Button from '../../components/shared/Button'
import Spinner from '../../components/shared/Spinner'
import EmptyState from '../../components/shared/EmptyState'
import { getHelplines, deleteHelpline } from '../../services/helplineService'
import { useToast } from '../../context/ToastContext'
import { HELPLINE_CATEGORIES } from '../../utils/constants'

const ADMIN_SIDEBAR_LINKS = [
  { to: '/admin/dashboard', icon: '📊', label: 'Analytics', end: true },
  { to: '/admin/ngo-approvals', icon: '✅', label: 'NGO Approvals' },
  { to: '/admin/reports', icon: '📋', label: 'All Reports' },
  { to: '/admin/helplines', icon: '📞', label: 'Helplines' },
  { to: '/admin/articles', icon: '📚', label: 'Articles' },
]

export default function AdminHelplines() {
  const [helplines, setHelplines] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  function load() { getHelplines().then(setHelplines).finally(() => setLoading(false)) }
  useEffect(() => { load() }, [])

  async function handleDelete(id) {
    if (!window.confirm('Delete this helpline?')) return
    await deleteHelpline(id)
    toast.success('Helpline deleted.')
    load()
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-6">
            <Sidebar links={ADMIN_SIDEBAR_LINKS} />
            <div className="flex-1 space-y-6">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Helpline Management 📞</h1>
              <HelplineEditor onCreated={load} />
              {loading ? (
                <div className="flex justify-center py-8"><Spinner className="text-rose-500" /></div>
              ) : helplines.length === 0 ? (
                <EmptyState icon="📞" title="No helplines yet" description="Add the first helpline using the form above." />
              ) : (
                <div className="space-y-2">
                  {helplines.map((h) => {
                    const catInfo = HELPLINE_CATEGORIES.find((c) => c.value === h.category)
                    return (
                      <div key={h.id} className="card p-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <a href={`tel:${h.number}`} className="font-bold text-green-600 text-sm">{h.number}</a>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{h.name}</span>
                          {catInfo && <Badge color={catInfo.color}>{catInfo.label}</Badge>}
                        </div>
                        <button onClick={() => handleDelete(h.id)} className="text-xs text-red-500 hover:text-red-700 flex-shrink-0">Delete</button>
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
