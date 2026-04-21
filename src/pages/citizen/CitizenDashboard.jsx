import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useSOS from '../../hooks/useSOS'
import PageWrapper from '../../components/layout/PageWrapper'
import StatCard from '../../components/dashboard/StatCard'
import QuickSOSWidget from '../../components/dashboard/QuickSOSWidget'
import RecentReports from '../../components/dashboard/RecentReports'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

const QUICK_LINKS = [
  { to: '/safety-map', icon: '🗺️', label: 'Safety Map', desc: 'View and report incidents near you', color: 'orange' },
  { to: '/legal-aid', icon: '⚖️', label: 'Legal Aid', desc: 'Find pro-bono lawyers', color: 'blue' },
  { to: '/forum', icon: '💬', label: 'Community Forum', desc: 'Connect anonymously', color: 'purple' },
  { to: '/helpline', icon: '📞', label: 'Helplines', desc: 'Emergency numbers & resources', color: 'green' },
]

export default function CitizenDashboard() {
  const { userProfile } = useAuth()
  const { contacts } = useSOS()
  const firstName = userProfile?.displayName?.split(' ')[0] || 'there'

  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            You're in SafeHaven. Here's your safety overview.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon="🚨" label="SOS Contacts" value={contacts.length} sub={contacts.length ? 'Ready to alert' : 'Setup needed'} color="rose" />
          <StatCard icon="🗺️" label="Safety Map" value="Live" sub="Community reports" color="orange" />
          <StatCard icon="⚖️" label="Legal Aid" value="500+" sub="Verified lawyers" color="blue" />
          <StatCard icon="💬" label="Forum Channels" value="5" sub="Anonymous support" color="purple" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* SOS Widget */}
          <div className="lg:col-span-1">
            <QuickSOSWidget />
          </div>

          {/* Recent Reports */}
          <div className="lg:col-span-2">
            <RecentReports />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="card p-4 hover:shadow-md transition-all hover:-translate-y-0.5 duration-200 group"
              >
                <span className="text-3xl block mb-3">{link.icon}</span>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  {link.label}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Safety Tip */}
        <div className="mt-8 card p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-100 dark:border-blue-900/30">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">Safety Tip of the Day</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Share your live location with a trusted contact when traveling to unfamiliar places at night. SafeHaven's SOS can alert them instantly if you feel unsafe.
              </p>
            </div>
          </div>
        </div>
      </PageWrapper>
      <Footer />
    </>
  )
}
