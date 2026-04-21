import { useState, useEffect } from 'react'

export default function useGeolocation() {
  const [coords, setCoords] = useState(null)
  const [geoError, setGeoError] = useState(null)
  const [geoLoading, setGeoLoading] = useState(false)

  function requestLocation() {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser')
      return
    }
    setGeoLoading(true)
    setGeoError(null)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
        setGeoLoading(false)
      },
      (err) => {
        setGeoError(err.message)
        setGeoLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  return { coords, geoError, geoLoading, requestLocation }
}
