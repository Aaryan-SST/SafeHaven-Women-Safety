import { useEffect, useState, useMemo } from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageWrapper from '../../components/layout/PageWrapper'
import HelplineCard from '../../components/helpline/HelplineCard'
import ArticleCard from '../../components/helpline/ArticleCard'
import SearchBar from '../../components/shared/SearchBar'
import EmptyState from '../../components/shared/EmptyState'
import Spinner from '../../components/shared/Spinner'
import { getHelplines } from '../../services/helplineService'
import { getPublishedArticles } from '../../services/articleService'
import useBookmarks from '../../hooks/useBookmarks'
import { HELPLINE_CATEGORIES, ARTICLE_CATEGORIES } from '../../utils/constants'

const TABS = [
  { id: 'helplines', label: '📞 Helplines' },
  { id: 'articles', label: '📚 Articles & Rights' },
]

export default function HelplineResources() {
  const [tab, setTab] = useState('helplines')
  const [helplines, setHelplines] = useState([])
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('all')
  const { isBookmarked, toggleBookmark } = useBookmarks()

  useEffect(() => {
    setLoading(true)
    Promise.all([getHelplines(), getPublishedArticles()])
      .then(([h, a]) => { setHelplines(h); setArticles(a) })
      .finally(() => setLoading(false))
  }, [])

  const filteredHelplines = useMemo(() => {
    return helplines.filter((h) => {
      const matchCat = catFilter === 'all' || h.category === catFilter
      const matchSearch = !search || h.name.toLowerCase().includes(search.toLowerCase()) || h.number.includes(search)
      return matchCat && matchSearch && h.isActive
    })
  }, [helplines, catFilter, search])

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchCat = catFilter === 'all' || a.category === catFilter
      const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [articles, catFilter, search])

  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Helplines & Resources 📞</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Every national helpline, support resource, and rights guide in one place — always accessible.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setCatFilter('all') }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                tab === t.id
                  ? 'bg-rose-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-rose-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder={tab === 'helplines' ? 'Search helplines or numbers...' : 'Search articles...'}
            className="flex-1"
          />
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setCatFilter('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${catFilter === 'all' ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}
            >
              All
            </button>
            {(tab === 'helplines' ? HELPLINE_CATEGORIES : ARTICLE_CATEGORIES).map((c) => (
              <button
                key={c.value}
                onClick={() => setCatFilter(c.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${catFilter === c.value ? 'bg-rose-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><Spinner size="lg" className="text-rose-500" /></div>
        ) : tab === 'helplines' ? (
          filteredHelplines.length === 0 ? (
            <EmptyState icon="📞" title="No helplines found" description="Try adjusting your search or filter." />
          ) : (
            <div className="space-y-3">
              {filteredHelplines.map((h) => (
                <HelplineCard
                  key={h.id}
                  helpline={h}
                  isBookmarked={isBookmarked('helpline', h.id)}
                  onToggleBookmark={toggleBookmark}
                />
              ))}
            </div>
          )
        ) : (
          filteredArticles.length === 0 ? (
            <EmptyState icon="📚" title="No articles found" description="Content is being added. Check back soon." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArticles.map((a) => (
                <ArticleCard
                  key={a.id}
                  article={a}
                  isBookmarked={isBookmarked('article', a.id)}
                  onToggleBookmark={toggleBookmark}
                />
              ))}
            </div>
          )
        )}
      </PageWrapper>
      <Footer />
    </>
  )
}
