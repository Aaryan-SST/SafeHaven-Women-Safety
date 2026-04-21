import { useEffect, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageWrapper from '../../components/layout/PageWrapper'
import LawyerCard from '../../components/legal/LawyerCard'
import LawyerFilterPanel from '../../components/legal/LawyerFilterPanel'
import SearchBar from '../../components/shared/SearchBar'
import EmptyState from '../../components/shared/EmptyState'
import Spinner from '../../components/shared/Spinner'
import { getLawyers } from '../../services/lawyerService'
import useLawyerFilter from '../../hooks/useLawyerFilter'

export default function LegalAid() {
  const [lawyers, setLawyers] = useState([])
  const [loading, setLoading] = useState(true)
  const { filteredLawyers, filters, setFilter, resetFilters } = useLawyerFilter(lawyers)

  useEffect(() => {
    getLawyers()
      .then(setLawyers)
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Navbar />
      <PageWrapper>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Legal Aid Directory ⚖️</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Find verified lawyers who specialize in women's rights and offer pro-bono or affordable consultations.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <LawyerFilterPanel filters={filters} setFilter={setFilter} resetFilters={resetFilters} />
          </aside>

          {/* Main */}
          <div className="flex-1">
            {/* Search */}
            <SearchBar
              value={filters.search}
              onChange={(v) => setFilter('search', v)}
              placeholder="Search by name, city, or specialty..."
              className="mb-4"
            />

            {loading ? (
              <div className="flex justify-center py-16"><Spinner size="lg" className="text-rose-500" /></div>
            ) : filteredLawyers.length === 0 ? (
              <EmptyState
                icon="⚖️"
                title={lawyers.length === 0 ? 'Lawyer directory coming soon' : 'No matches found'}
                description={
                  lawyers.length === 0
                    ? 'We\'re onboarding verified lawyers. Check back soon or contact us to get listed.'
                    : 'Try adjusting your filters or search term.'
                }
              />
            ) : (
              <>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Showing {filteredLawyers.length} lawyer{filteredLawyers.length !== 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredLawyers.map((lawyer) => (
                    <LawyerCard key={lawyer.id} lawyer={lawyer} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-900/30">
          <p className="text-sm text-amber-700 dark:text-amber-400">
            <strong>Disclaimer:</strong> SafeHaven facilitates connections between citizens and legal professionals. We do not provide legal advice. Always consult a qualified lawyer for your specific situation.
          </p>
        </div>
      </PageWrapper>
      <Footer />
    </>
  )
}
