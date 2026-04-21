import { useState, useMemo, useCallback } from 'react'

const DEFAULT_FILTERS = {
  state: '',
  city: '',
  caseType: '',
  language: '',
  proBonoOnly: false,
  search: '',
}

export default function useLawyerFilter(lawyers) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const setFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const resetFilters = useCallback(() => setFilters(DEFAULT_FILTERS), [])

  const filteredLawyers = useMemo(() => {
    return lawyers.filter((lawyer) => {
      if (filters.state && lawyer.state !== filters.state) return false
      if (filters.city && !lawyer.city?.toLowerCase().includes(filters.city.toLowerCase())) return false
      if (filters.caseType && !lawyer.caseTypes?.includes(filters.caseType)) return false
      if (filters.language && !lawyer.languages?.includes(filters.language)) return false
      if (filters.proBonoOnly && !lawyer.isProBono) return false
      if (filters.search) {
        const q = filters.search.toLowerCase()
        const nameMatch = lawyer.name?.toLowerCase().includes(q)
        const cityMatch = lawyer.city?.toLowerCase().includes(q)
        const bioMatch = lawyer.bio?.toLowerCase().includes(q)
        if (!nameMatch && !cityMatch && !bioMatch) return false
      }
      return true
    })
  }, [lawyers, filters])

  return { filteredLawyers, filters, setFilter, resetFilters }
}
