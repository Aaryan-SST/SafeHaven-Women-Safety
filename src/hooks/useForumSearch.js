import { useState, useMemo, useEffect, useRef } from 'react'

export default function useForumSearch(posts) {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const timerRef = useRef(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setDebouncedQuery(query), 300)
    return () => clearTimeout(timerRef.current)
  }, [query])

  const filteredPosts = useMemo(() => {
    if (!debouncedQuery.trim()) return posts
    const q = debouncedQuery.toLowerCase()
    return posts.filter(
      (post) =>
        post.content?.toLowerCase().includes(q) ||
        post.alias?.toLowerCase().includes(q)
    )
  }, [posts, debouncedQuery])

  return { query, setQuery, filteredPosts }
}
