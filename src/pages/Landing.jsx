import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const FEATURES = [
  {
    icon: '🚨',
    title: 'Emergency SOS',
    desc: 'One-tap WhatsApp alert with your live location sent to up to 5 trusted contacts instantly.',
    color: 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/30',
    iconBg: 'bg-red-100 dark:bg-red-900/40',
  },
  {
    icon: '🗺️',
    title: 'Safety Map',
    desc: 'Community-reported incidents mapped in real time. Know which areas to avoid and stay safer.',
    color: 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-900/30',
    iconBg: 'bg-orange-100 dark:bg-orange-900/40',
  },
  {
    icon: '⚖️',
    title: 'Legal Aid',
    desc: 'Find pro-bono lawyers near you, filter by case type, and request a consultation discreetly.',
    color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30',
    iconBg: 'bg-blue-100 dark:bg-blue-900/40',
  },
  {
    icon: '💬',
    title: 'Anonymous Forum',
    desc: 'Share your story or seek support in moderated channels — completely anonymous, always safe.',
    color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-900/30',
    iconBg: 'bg-purple-100 dark:bg-purple-900/40',
  },
  {
    icon: '📞',
    title: 'Helpline Directory',
    desc: 'Every national and state-level helpline in one place — searchable, bookmarkable, always accessible.',
    color: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30',
    iconBg: 'bg-green-100 dark:bg-green-900/40',
  },
  {
    icon: '📚',
    title: 'Know Your Rights',
    desc: 'Plain-language guides on your legal rights — domestic violence, workplace, cyber, and more.',
    color: 'bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-900/30',
    iconBg: 'bg-rose-100 dark:bg-rose-900/40',
  },
]

const STATS = [
  { label: 'Women Protected', value: '10,000+' },
  { label: 'Legal Experts', value: '500+' },
  { label: 'NGO Partners', value: '80+' },
  { label: 'Cities Covered', value: '200+' },
]

const EMERGENCY_NUMBERS = [
  { name: 'Women Helpline', number: '1091' },
  { name: 'Police', number: '100' },
  { name: 'Emergency', number: '112' },
  { name: 'NCW Helpline', number: '7827-170-170' },
]

export default function Landing() {
  const { currentUser, getRoleHome } = useAuth()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* Navbar-like top bar for landing */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              Safe<span className="text-rose-600">Haven</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            {currentUser ? (
              <Link to={getRoleHome()} className="btn-primary text-sm py-2 px-4">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-2">
                  Sign in
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">
                  Join Free
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Emergency Strip */}
      <div className="fixed top-16 left-0 right-0 z-30 bg-rose-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-center gap-4 text-sm">
          <span className="font-semibold text-rose-100">🚨 Emergency:</span>
          {EMERGENCY_NUMBERS.map((n) => (
            <a key={n.number} href={`tel:${n.number}`} className="font-bold hover:text-rose-200 transition-colors">
              {n.name}: {n.number}
            </a>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="pt-36 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span>🛡️</span>
            <span>Your safety is our mission</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            Every woman deserves to feel{' '}
            <span className="text-rose-600">safe</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            SafeHaven combines emergency SOS, community safety mapping, legal aid, and anonymous peer support — everything you need, in one platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="btn-primary text-base py-3 px-8 w-full sm:w-auto">
              Join SafeHaven — It's Free
            </Link>
            <Link to="/helpline" className="btn-secondary text-base py-3 px-8 w-full sm:w-auto">
              View Helplines
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-rose-600">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold text-white">{s.value}</p>
                <p className="text-rose-200 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to stay safe
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              From emergency response to long-term empowerment — SafeHaven is your complete safety companion.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className={`p-6 rounded-2xl border ${f.color} transition-transform hover:-translate-y-1 duration-200`}
              >
                <div className={`w-12 h-12 ${f.iconBg} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How it works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create your account', desc: 'Sign up in 60 seconds. No personal details required beyond your email.' },
              { step: '02', title: 'Set up your SOS', desc: 'Add trusted contacts and a message. In an emergency, one tap alerts them all.' },
              { step: '03', title: 'Access your community', desc: 'Explore legal aid, the safety map, and the anonymous forum — all at your fingertips.' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 bg-rose-600 text-white rounded-2xl flex items-center justify-center text-xl font-black mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-rose-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            You don't have to face this alone
          </h2>
          <p className="text-rose-100 mb-8">
            Thousands of women use SafeHaven every day. Join a community that has your back.
          </p>
          <Link to="/register" className="inline-block bg-white text-rose-600 font-bold py-3 px-8 rounded-xl hover:bg-rose-50 transition-colors text-base">
            Get Started — Free Forever
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p>© {new Date().getFullYear()} SafeHaven. Built with care for every woman's safety.</p>
      </footer>
    </div>
  )
}
