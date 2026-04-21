import { useEffect, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Sidebar from '../../components/layout/Sidebar'
import ArticleUploadForm from '../../components/ngo/ArticleUploadForm'
import Badge from '../../components/shared/Badge'
import Spinner from '../../components/shared/Spinner'
import EmptyState from '../../components/shared/EmptyState'
import { getAllArticles, togglePublish, deleteArticle } from '../../services/articleService'
import { useToast } from '../../context/ToastContext'
import { ARTICLE_CATEGORIES } from '../../utils/constants'
import { formatDate } from '../../utils/formatters'

const ADMIN_SIDEBAR_LINKS = [
  { to: '/admin/dashboard', icon: '📊', label: 'Analytics', end: true },
  { to: '/admin/ngo-approvals', icon: '✅', label: 'NGO Approvals' },
  { to: '/admin/reports', icon: '📋', label: 'All Reports' },
  { to: '/admin/helplines', icon: '📞', label: 'Helplines' },
  { to: '/admin/articles', icon: '📚', label: 'Articles' },
]

export default function AdminArticles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  function load() { getAllArticles().then(setArticles).finally(() => setLoading(false)) }
  useEffect(() => { load() }, [])

  async function handleToggle(article) {
    await togglePublish(article.id, article.isPublished)
    toast.success(article.isPublished ? 'Article unpublished.' : 'Article published!')
    load()
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this article?')) return
    await deleteArticle(id)
    toast.success('Article deleted.')
    load()
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-6">
            <Sidebar links={ADMIN_SIDEBAR_LINKS} />
            <div className="flex-1 space-y-6">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Article Management 📚</h1>
              <ArticleUploadForm onCreated={load} />
              {loading ? (
                <div className="flex justify-center py-8"><Spinner className="text-rose-500" /></div>
              ) : articles.length === 0 ? (
                <EmptyState icon="📚" title="No articles yet" />
              ) : (
                <div className="space-y-3">
                  {articles.map((a) => {
                    const catInfo = ARTICLE_CATEGORIES.find((c) => c.value === a.category)
                    return (
                      <div key={a.id} className="card p-4 flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{a.title}</h3>
                            {catInfo && <Badge color="rose">{catInfo.label}</Badge>}
                            <Badge color={a.isPublished ? 'green' : 'yellow'}>{a.isPublished ? 'Published' : 'Draft'}</Badge>
                          </div>
                          <p className="text-xs text-gray-400">By {a.authorName} · {formatDate(a.createdAt)}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleToggle(a)}
                            className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${a.isPublished ? 'text-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100' : 'text-green-700 bg-green-50 dark:bg-green-900/20 hover:bg-green-100'}`}
                          >
                            {a.isPublished ? 'Unpublish' : 'Publish'}
                          </button>
                          <button onClick={() => handleDelete(a.id)} className="text-xs text-red-500 hover:text-red-700">Delete</button>
                        </div>
                      </div>
                    )
                  })}
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
