import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageWrapper from '../../components/layout/PageWrapper'
import ChannelList from '../../components/forum/ChannelList'
import { FORUM_CHANNELS } from '../../utils/constants'

export default function Forum() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Community Forum 💬</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            An anonymous, safe space to share experiences, seek support, and connect with others. Your identity is always protected.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <ChannelList />
          </aside>

          <div className="lg:col-span-3 space-y-4">
            {/* Safety Notice */}
            <div className="card p-4 bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/30">
              <div className="flex items-start gap-3">
                <span className="text-xl">🔒</span>
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300 text-sm mb-1">Your anonymity is protected</h3>
                  <p className="text-xs text-blue-700 dark:text-blue-400">
                    Every post uses a randomly generated alias. Your real name is never shown to other users. Verified NGO counselors are marked with a green badge.
                  </p>
                </div>
              </div>
            </div>

            {/* Channel Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FORUM_CHANNELS.map((ch) => (
                <Link
                  key={ch.id}
                  to={`/forum/${ch.id}`}
                  className="card p-5 hover:shadow-md transition-all hover:-translate-y-0.5 duration-200 group"
                >
                  <div className="text-3xl mb-3">{ch.icon}</div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    {ch.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{ch.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </PageWrapper>
      <Footer />
    </>
  )
}
