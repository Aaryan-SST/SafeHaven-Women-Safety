import Badge from '../shared/Badge'
import { HELPLINE_CATEGORIES } from '../../utils/constants'

export default function HelplineCard({ helpline, isBookmarked, onToggleBookmark }) {
  const catInfo = HELPLINE_CATEGORIES.find((c) => c.value === helpline.category)

  return (
    <div className="card p-4 flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate">{helpline.name}</h3>
          {catInfo && <Badge color={catInfo.color}>{catInfo.label}</Badge>}
        </div>
        {helpline.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{helpline.description}</p>
        )}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <a
          href={`tel:${helpline.number}`}
          className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
        >
          📞 {helpline.number}
        </a>
        <button
          onClick={() => onToggleBookmark('helpline', helpline.id)}
          className={`p-2 rounded-lg transition-colors ${isBookmarked ? 'text-rose-600 bg-rose-50 dark:bg-rose-900/20' : 'text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20'}`}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark helpline'}
        >
          <svg className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
