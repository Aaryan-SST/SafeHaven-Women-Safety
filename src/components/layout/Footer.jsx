import { Link } from 'react-router-dom'

const EMERGENCY_NUMBERS = [
  { name: 'Women Helpline', number: '1091' },
  { name: 'Police', number: '100' },
  { name: 'Ambulance', number: '108' },
  { name: 'NCW', number: '7827-170-170' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      {/* Emergency Strip */}
      <div className="bg-rose-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-center gap-6">
          <span className="text-rose-100 text-sm font-semibold">Emergency Numbers:</span>
          {EMERGENCY_NUMBERS.map((n) => (
            <a
              key={n.number}
              href={`tel:${n.number}`}
              className="flex items-center gap-1.5 text-white hover:text-rose-200 transition-colors text-sm font-bold"
            >
              <span>{n.name}:</span>
              <span>{n.number}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🛡️</span>
              <span className="text-xl font-bold text-rose-400">SafeHaven</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              A community-driven platform dedicated to women's safety, legal empowerment, and anonymous peer support across India.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-200 mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/helpline', label: 'Helplines' },
                { to: '/safety-map', label: 'Safety Map' },
                { to: '/legal-aid', label: 'Legal Aid' },
                { to: '/forum', label: 'Community Forum' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 hover:text-rose-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-200 mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>National Commission for Women</li>
              <li>Protection of Women from DV Act</li>
              <li>POCSO Act Information</li>
              <li>IT Act — Cyber Safety</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} SafeHaven. Built with care for every woman's safety.
        </div>
      </div>
    </footer>
  )
}
