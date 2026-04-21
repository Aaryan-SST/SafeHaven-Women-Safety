import { useState, useEffect } from 'react'
import { onSnapshot, query } from 'firebase/firestore'

export function useCollection(queryRef) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!queryRef) return
    const unsubscribe = onSnapshot(
      queryRef,
      (snap) => {
        setData(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )
    return unsubscribe
  }, [])

  return { data, loading, error }
}
