import Select from '../shared/Select'
import Button from '../shared/Button'
import { INDIAN_STATES, CASE_TYPES, INDIAN_LANGUAGES } from '../../utils/constants'

export default function LawyerFilterPanel({ filters, setFilter, resetFilters }) {
  return (
    <div className="card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900 dark:text-white text-sm">Filters</h3>
        <button onClick={resetFilters} className="text-xs text-rose-600 hover:text-rose-700 font-medium">
          Reset
        </button>
      </div>

      <Select
        label="State"
        value={filters.state}
        onChange={(e) => setFilter('state', e.target.value)}
        options={INDIAN_STATES.map((s) => ({ value: s, label: s }))}
        placeholder="All states"
      />

      <Select
        label="Case Type"
        value={filters.caseType}
        onChange={(e) => setFilter('caseType', e.target.value)}
        options={CASE_TYPES}
        placeholder="All case types"
      />

      <Select
        label="Language"
        value={filters.language}
        onChange={(e) => setFilter('language', e.target.value)}
        options={INDIAN_LANGUAGES.map((l) => ({ value: l, label: l }))}
        placeholder="Any language"
      />

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={filters.proBonoOnly}
          onChange={(e) => setFilter('proBonoOnly', e.target.checked)}
          className="accent-rose-600 w-4 h-4"
        />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Pro-bono only</span>
      </label>
    </div>
  )
}
