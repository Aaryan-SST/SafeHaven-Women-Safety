import { useState, useEffect, useMemo } from 'react'
import { subscribeToReports } from '../services/reportService'

export default function useMapPins() {
  const [pins, setPins] = useState([])
  const [filter, setFilter] = useState({ type: 'all', status: 'all' })

  useEffect(() => {
    const unsubscribe = subscribeToReports((reports) => {
      setPins(reports)
    })
    return unsubscribe
  }, [])

  const filteredPins = useMemo(() => {
    return pins.filter((pin) => {
      const typeMatch = filter.type === 'all' || pin.incidentType === filter.type
      const statusMatch = filter.status === 'all' || pin.status === filter.status
      return typeMatch && statusMatch
    })
  }, [pins, filter])

  return { pins, filteredPins, filter, setFilter }
}
