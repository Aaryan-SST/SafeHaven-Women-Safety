import { useReducer, useState } from 'react'
import Modal from '../shared/Modal'
import Button from '../shared/Button'
import Input from '../shared/Input'
import Textarea from '../shared/Textarea'
import Select from '../shared/Select'
import FileUpload from '../shared/FileUpload'
import { INCIDENT_TYPES } from '../../utils/constants'
import { createReport } from '../../services/reportService'
import { uploadFile } from '../../services/storageService'
import useAuth from '../../hooks/useAuth'
import useGeolocation from '../../hooks/useGeolocation'
import { useToast } from '../../context/ToastContext'
import { nanoid } from 'nanoid'

const STEPS = ['Location', 'Incident Type', 'Description', 'Photo']

function reducer(state, action) {
  switch (action.type) {
    case 'NEXT': return { ...state, step: Math.min(state.step + 1, 3) }
    case 'PREV': return { ...state, step: Math.max(state.step - 1, 0) }
    case 'SET': return { ...state, [action.field]: action.value }
    case 'RESET': return { step: 0, incidentType: '', description: '', isAnonymous: true, photo: null, customLat: '', customLng: '' }
    default: return state
  }
}

export default function ReportModal({ isOpen, onClose }) {
  const { currentUser } = useAuth()
  const { coords, geoLoading, geoError, requestLocation } = useGeolocation()
  const [state, dispatch] = useReducer(reducer, {
    step: 0, incidentType: '', description: '', isAnonymous: true, photo: null, customLat: '', customLng: '',
  })
  const [uploadProgress, setUploadProgress] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()

  function handleClose() {
    dispatch({ type: 'RESET' })
    onClose()
  }

  async function handleSubmit() {
    setSubmitting(true)
    try {
      const lat = coords?.latitude || parseFloat(state.customLat)
      const lng = coords?.longitude || parseFloat(state.customLng)

      if (!lat || !lng) { toast.error('Please provide a location'); return }
      if (!state.incidentType) { toast.error('Please select an incident type'); return }
      if (!state.description.trim()) { toast.error('Please describe the incident'); return }

      let photoURL = null
      if (state.photo) {
        const path = `incident-reports/${nanoid()}-${state.photo.name}`
        photoURL = await uploadFile(path, state.photo, setUploadProgress)
      }

      await createReport({
        reportedBy: currentUser.uid,
        isAnonymous: state.isAnonymous,
        incidentType: state.incidentType,
        description: state.description,
        location: { lat, lng },
        photoURL,
      })

      toast.success('Report submitted. Thank you for keeping the community safer.')
      handleClose()
    } catch {
      toast.error('Failed to submit report. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Report an Incident" size="md">
      {/* Step indicator */}
      <div className="flex gap-1 mb-6">
        {STEPS.map((s, i) => (
          <div key={s} className={`flex-1 h-1.5 rounded-full transition-colors ${i <= state.step ? 'bg-rose-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
        ))}
      </div>
      <p className="text-xs text-gray-500 mb-4">Step {state.step + 1} of {STEPS.length}: <strong>{STEPS[state.step]}</strong></p>

      {/* Step 0: Location */}
      {state.step === 0 && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            We'll attach your location to the report so it appears on the community map.
          </p>
          <Button
            onClick={requestLocation}
            variant="secondary"
            fullWidth
            loading={geoLoading}
          >
            📍 Use My Current Location
          </Button>
          {coords && (
            <p className="text-xs text-green-600 dark:text-green-400 text-center">
              ✓ Location captured: {coords.latitude.toFixed(4)}, {coords.longitude.toFixed(4)}
            </p>
          )}
          {geoError && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p className="mb-2">Could not get automatic location. Enter manually:</p>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Latitude (e.g. 28.6139)" value={state.customLat} onChange={(e) => dispatch({ type: 'SET', field: 'customLat', value: e.target.value })} />
                <Input placeholder="Longitude (e.g. 77.2090)" value={state.customLng} onChange={(e) => dispatch({ type: 'SET', field: 'customLng', value: e.target.value })} />
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <input type="checkbox" id="anon" checked={state.isAnonymous} onChange={(e) => dispatch({ type: 'SET', field: 'isAnonymous', value: e.target.checked })} className="accent-rose-600" />
            <label htmlFor="anon" className="text-sm text-gray-700 dark:text-gray-300">Submit anonymously (recommended)</label>
          </div>
          <Button onClick={() => dispatch({ type: 'NEXT' })} fullWidth disabled={!coords && (!state.customLat || !state.customLng)}>
            Next →
          </Button>
        </div>
      )}

      {/* Step 1: Incident Type */}
      {state.step === 1 && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">What type of incident occurred?</p>
          {INCIDENT_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() => { dispatch({ type: 'SET', field: 'incidentType', value: type.value }); dispatch({ type: 'NEXT' }) }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                state.incidentType === type.value
                  ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20'
                  : 'border-gray-100 dark:border-gray-800 hover:border-rose-300 bg-white dark:bg-gray-800'
              }`}
            >
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: type.color }} />
              <span className="text-sm font-medium text-gray-900 dark:text-white">{type.label}</span>
            </button>
          ))}
          <Button onClick={() => dispatch({ type: 'PREV' })} variant="ghost" size="sm">← Back</Button>
        </div>
      )}

      {/* Step 2: Description */}
      {state.step === 2 && (
        <div className="space-y-4">
          <Textarea
            label="Describe what happened"
            value={state.description}
            onChange={(e) => dispatch({ type: 'SET', field: 'description', value: e.target.value })}
            placeholder="Describe the incident. Include time of day, what happened, any relevant details that could help others stay safe..."
            rows={5}
            maxLength={500}
            required
          />
          <div className="flex gap-3">
            <Button onClick={() => dispatch({ type: 'PREV' })} variant="secondary" fullWidth>← Back</Button>
            <Button onClick={() => dispatch({ type: 'NEXT' })} fullWidth disabled={!state.description.trim()}>
              Next →
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Photo */}
      {state.step === 3 && (
        <div className="space-y-4">
          <FileUpload
            label="Add a photo (optional, max 5MB)"
            onFileSelect={(file) => dispatch({ type: 'SET', field: 'photo', value: file })}
          />
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-rose-500 h-2 rounded-full transition-all" style={{ width: `${uploadProgress}%` }} />
            </div>
          )}
          <div className="flex gap-3">
            <Button onClick={() => dispatch({ type: 'PREV' })} variant="secondary" fullWidth>← Back</Button>
            <Button onClick={handleSubmit} fullWidth loading={submitting}>
              Submit Report
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
