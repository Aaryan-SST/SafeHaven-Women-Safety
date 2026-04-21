import { NavLink } from 'react-router-dom'
import { FORUM_CHANNELS } from '../../utils/constants'

export default function ChannelList() {
  return (
    <div className="card p-3 space-y-1">
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 mb-2">Channels</p>
      {FORUM_CHANNELS.map((channel) => (
        <NavLink
          key={channel.id}
          to={`/forum/${channel.id}`}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
              isActive
                ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 font-semibold'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`
          }
        >
          <span>{channel.icon}</span>
          <span className="truncate">{channel.name}</span>
        </NavLink>
      ))}
    </div>
  )
}
