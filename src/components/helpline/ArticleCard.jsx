import { Link } from 'react-router-dom'
import Badge from '../shared/Badge'
import { ARTICLE_CATEGORIES } from '../../utils/constants'
import { formatDate } from '../../utils/formatters'

export default function ArticleCard({ article, isBookmarked, onToggleBookmark }) {
  const catInfo = ARTICLE_CATEGORIES.find((c) => c.value === article.category)

  return (
    <div className="card p-5 flex flex-col">
      <div className="flex items-start justify-between gap-2 mb-2">
        {catInfo && <Badge color="rose">{catInfo.label}</Badge>}
        <button
          onClick={() => onToggleBookmark('article', article.id)}
          className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${isBookmarked ? 'text-rose-600' : 'text-gray-400 hover:text-rose-600'}`}
        >
          <svg className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>
      <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2 line-clamp-2 flex-1">
        {article.title}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
        {article.content?.replace(/[#*`]/g, '').slice(0, 120)}...
      </p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xs text-gray-400">{formatDate(article.createdAt)}</span>
        <Link
          to={`/helpline/article/${article.id}`}
          className="text-xs text-rose-600 hover:text-rose-700 font-semibold"
        >
          Read more →
        </Link>
      </div>
    </div>
  )
}
