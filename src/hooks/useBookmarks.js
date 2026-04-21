import { useState, useEffect, useCallback } from 'react'
import { getBookmarks, toggleArticleBookmark, toggleHelplineBookmark } from '../services/bookmarkService'
import useAuth from './useAuth'

export default function useBookmarks() {
  const { currentUser } = useAuth()
  const [bookmarks, setBookmarks] = useState({ articleIds: [], helplineIds: [] })

  useEffect(() => {
    if (!currentUser) return
    getBookmarks(currentUser.uid).then(setBookmarks)
  }, [currentUser])

  function isBookmarked(type, id) {
    if (type === 'article') return bookmarks.articleIds?.includes(id)
    if (type === 'helpline') return bookmarks.helplineIds?.includes(id)
    return false
  }

  const toggleBookmark = useCallback(
    async (type, id) => {
      if (!currentUser) return
      const isCurrent = isBookmarked(type, id)
      if (type === 'article') {
        await toggleArticleBookmark(currentUser.uid, id, isCurrent)
        setBookmarks((prev) => ({
          ...prev,
          articleIds: isCurrent
            ? prev.articleIds.filter((a) => a !== id)
            : [...prev.articleIds, id],
        }))
      } else if (type === 'helpline') {
        await toggleHelplineBookmark(currentUser.uid, id, isCurrent)
        setBookmarks((prev) => ({
          ...prev,
          helplineIds: isCurrent
            ? prev.helplineIds.filter((h) => h !== id)
            : [...prev.helplineIds, id],
        }))
      }
    },
    [currentUser, bookmarks]
  )

  return { bookmarks, isBookmarked, toggleBookmark }
}
