import { useEffect, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Sidebar from '../../components/layout/Sidebar'
import EventForm from '../../components/ngo/EventForm'
import EmptyState from '../../components/shared/EmptyState'
import Spinner from '../../components/shared/Spinner'
import Button from '../../components/shared/Button'
import { getEventsByOrganiser, deleteEvent } from '../../services/eventService'
import useAuth from '../../hooks/useAuth'
import { formatDateTime } from '../../utils/formatters'
import { useToast } from '../../context/ToastContext'

const NGO_SIDEBAR_LINKS = [
  { to: '/ngo/dashboard', icon: '🏠', label: 'Dashboard', end: true },
  { to: '/ngo/reports', icon: '📋', label: 'Reports' },
  { to: '/ngo/forum', icon: '💬', label: 'Forum Moderation' },
  { to: '/ngo/events', icon: '📅', label: 'Events' },
]

export default function NGOEvents() {
  const { currentUser } = useAuth()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  function load() {
    if (!currentUser) return
    getEventsByOrganiser(currentUser.uid).then(setEvents).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [currentUser])

  async function handleDelete(id) {
    if (!window.confirm('Delete this event?')) return
    await deleteEvent(id)
    toast.success('Event deleted.')
    load()
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-6">
            <Sidebar links={NGO_SIDEBAR_LINKS} />
            <div className="flex-1 space-y-6">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Awareness Events 📅</h1>
              <EventForm onCreated={load} />
              {loading ? (
                <div className="flex justify-center py-8"><Spinner className="text-rose-500" /></div>
              ) : events.length === 0 ? (
                <EmptyState icon="📅" title="No events yet" description="Create an awareness event to engage your community." />
              ) : (
                <div className="space-y-3">
                  {events.map((ev) => (
                    <div key={ev.id} className="card p-4 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{ev.title}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{formatDateTime(ev.eventDate)} · {ev.location}</p>
                        {ev.description && <p className="text-xs text-gray-400 mt-1 line-clamp-1">{ev.description}</p>}
                      </div>
                      <button onClick={() => handleDelete(ev.id)} className="text-xs text-red-500 hover:text-red-700 flex-shrink-0">Delete</button>
                    </div>
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
