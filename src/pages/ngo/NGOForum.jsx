import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Sidebar from '../../components/layout/Sidebar'
import PostCard from '../../components/forum/PostCard'
import Spinner from '../../components/shared/Spinner'
import EmptyState from '../../components/shared/EmptyState'
import { getReportedPosts, getChannelPosts } from '../../services/forumService'
import { FORUM_CHANNELS } from '../../utils/constants'

const NGO_SIDEBAR_LINKS = [
  { to: '/ngo/dashboard', icon: '🏠', label: 'Dashboard', end: true },
  { to: '/ngo/reports', icon: '📋', label: 'Reports' },
  { to: '/ngo/forum', icon: '💬', label: 'Forum Moderation' },
  { to: '/ngo/events', icon: '📅', label: 'Events' },
]

export default function NGOForum() {
  const [tab, setTab] = useState('reported')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedChannel, setSelectedChannel] = useState('general')

  useEffect(() => {
    setLoading(true)
    const fn = tab === 'reported' ? getReportedPosts() : getChannelPosts(selectedChannel)
    fn.then(setPosts).finally(() => setLoading(false))
  }, [tab, selectedChannel])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-6">
            <Sidebar links={NGO_SIDEBAR_LINKS} />
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Forum Moderation 💬</h1>
              <div className="flex gap-2 mb-4">
                <button onClick={() => setTab('reported')} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${tab === 'reported' ? 'bg-rose-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}>
                  Reported Posts
                </button>
                <button onClick={() => setTab('channel')} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${tab === 'channel' ? 'bg-rose-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}>
                  By Channel
                </button>
              </div>
              {tab === 'channel' && (
                <div className="flex gap-2 mb-4 flex-wrap">
                  {FORUM_CHANNELS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedChannel(c.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedChannel === c.id ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
                    >
                      {c.icon} {c.name}
                    </button>
                  ))}
                </div>
              )}
              {loading ? (
                <div className="flex justify-center py-16"><Spinner size="lg" className="text-rose-500" /></div>
              ) : posts.length === 0 ? (
                <EmptyState icon="💬" title={tab === 'reported' ? 'No reported posts' : 'No posts in this channel'} description="All clear!" />
              ) : (
                <div className="space-y-4">
                  {posts.map((p) => <PostCard key={p.id} post={p} canModerate={true} />)}
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
