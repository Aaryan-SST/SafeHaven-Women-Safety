import { useState, useRef, useCallback } from 'react'
import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Button from '../../components/shared/Button'
import Badge from '../../components/shared/Badge'
import ReportModal from '../../components/map/ReportModal'
import useMapPins from '../../hooks/useMapPins'
import { INCIDENT_TYPES } from '../../utils/constants'
import { formatRelative } from '../../utils/formatters'

const PIN_COLORS = {
  harassment: '#f97316',
  assault: '#ef4444',
  stalking: '#a855f7',
  theft: '#3b82f6',
  cyber: '#06b6d4',
  other: '#6b7280',
}

const DEFAULT_CENTER = { lat: 20.5937, lng: 78.9629 } // India center

export default function SafetyMap() {
  const { filteredPins, filter, setFilter } = useMapPins()
  const [selectedPin, setSelectedPin] = useState(null)
  const [reportOpen, setReportOpen] = useState(false)
  const mapRef = useRef(null)

  const handleMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Community Safety Map 🗺️</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                {filteredPins.length} active report{filteredPins.length !== 1 ? 's' : ''} in your area
              </p>
            </div>
            <Button onClick={() => setReportOpen(true)}>
              + Report an Incident
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setFilter({ ...filter, type: 'all' })}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${filter.type === 'all' ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}
            >
              All Types
            </button>
            {INCIDENT_TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setFilter({ ...filter, type: t.value })}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${filter.type === t.value ? 'text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}
                style={filter.type === t.value ? { backgroundColor: t.color } : {}}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: filter.type === t.value ? 'white' : t.color }} />
                {t.label}
              </button>
            ))}
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-md" style={{ height: '60vh' }}>
            {apiKey && apiKey !== 'your_google_maps_api_key' ? (
              <APIProvider apiKey={apiKey}>
                <Map
                  defaultCenter={DEFAULT_CENTER}
                  defaultZoom={5}
                  mapId="safehaven-map"
                  onLoad={handleMapLoad}
                  gestureHandling="greedy"
                  disableDefaultUI={false}
                  style={{ width: '100%', height: '100%' }}
                >
                  {filteredPins.map((pin) => (
                    <AdvancedMarker
                      key={pin.id}
                      position={{ lat: pin.location?.lat, lng: pin.location?.lng }}
                      onClick={() => setSelectedPin(pin)}
                    >
                      <div
                        className="w-5 h-5 rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-125 transition-transform"
                        style={{ backgroundColor: PIN_COLORS[pin.incidentType] || PIN_COLORS.other }}
                      />
                    </AdvancedMarker>
                  ))}

                  {selectedPin && (
                    <InfoWindow
                      position={{ lat: selectedPin.location?.lat, lng: selectedPin.location?.lng }}
                      onCloseClick={() => setSelectedPin(null)}
                    >
                      <div className="p-2 max-w-xs">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: PIN_COLORS[selectedPin.incidentType] || PIN_COLORS.other }}
                          />
                          <span className="text-sm font-bold">
                            {INCIDENT_TYPES.find((t) => t.value === selectedPin.incidentType)?.label || selectedPin.incidentType}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{selectedPin.description}</p>
                        {selectedPin.photoURL && (
                          <img src={selectedPin.photoURL} alt="Incident" className="w-full h-24 object-cover rounded mb-2" />
                        )}
                        <p className="text-xs text-gray-400">{formatRelative(selectedPin.createdAt)}</p>
                        <div className="mt-1">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                            selectedPin.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {selectedPin.status}
                          </span>
                        </div>
                      </div>
                    </InfoWindow>
                  )}
                </Map>
              </APIProvider>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-center p-8">
                <div className="text-5xl mb-4">🗺️</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Google Maps API Key Required</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                  Add your <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">VITE_GOOGLE_MAPS_API_KEY</code> to your <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.env</code> file to enable the interactive map.
                </p>
              </div>
            )}
          </div>

          {/* Pin List */}
          {filteredPins.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Recent Reports</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredPins.slice(0, 9).map((pin) => {
                  const incidentInfo = INCIDENT_TYPES.find((t) => t.value === pin.incidentType)
                  return (
                    <div
                      key={pin.id}
                      onClick={() => setSelectedPin(pin)}
                      className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIN_COLORS[pin.incidentType] }} />
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{incidentInfo?.label}</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{pin.description}</p>
                      <p className="text-xs text-gray-400 mt-2">{formatRelative(pin.createdAt)}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <ReportModal isOpen={reportOpen} onClose={() => setReportOpen(false)} />
    </>
  )
}
