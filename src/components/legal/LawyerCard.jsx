import { useState } from 'react'
import Badge from '../shared/Badge'
import ConsultationModal from './ConsultationModal'
import { CASE_TYPES } from '../../utils/constants'

export default function LawyerCard({ lawyer }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="card p-5 hover:shadow-md transition-all hover:-translate-y-0.5 duration-200">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            {lawyer.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">{lawyer.name}</h3>
              {lawyer.isProBono && <Badge color="green">Pro-Bono</Badge>}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{lawyer.city}, {lawyer.state}</p>
          </div>
          <div className="flex items-center gap-1 text-yellow-500 flex-shrink-0">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs text-gray-600 dark:text-gray-400">{lawyer.rating || '—'}</span>
          </div>
        </div>

        {lawyer.bio && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{lawyer.bio}</p>
        )}

        {/* Case Types */}
        {lawyer.caseTypes?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {lawyer.caseTypes.slice(0, 3).map((ct) => {
              const info = CASE_TYPES.find((c) => c.value === ct)
              return <Badge key={ct} color="blue">{info?.label || ct}</Badge>
            })}
            {lawyer.caseTypes.length > 3 && (
              <Badge color="gray">+{lawyer.caseTypes.length - 3}</Badge>
            )}
          </div>
        )}

        {/* Languages */}
        {lawyer.languages?.length > 0 && (
          <p className="text-xs text-gray-400 mb-3">🗣️ {lawyer.languages.join(', ')}</p>
        )}

        <button
          onClick={() => setOpen(true)}
          className="w-full btn-primary text-sm py-2"
        >
          Request Consultation
        </button>
      </div>
      <ConsultationModal isOpen={open} onClose={() => setOpen(false)} lawyer={lawyer} />
    </>
  )
}
