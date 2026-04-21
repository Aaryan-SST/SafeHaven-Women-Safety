import { NavLink } from 'react-router-dom'

export default function Sidebar({ links }) {
  return (
    <aside className="w-64 flex-shrink-0">
      <nav className="card p-3 space-y-1 sticky top-20">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
