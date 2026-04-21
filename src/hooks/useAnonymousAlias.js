import { useMemo } from 'react'
import { generateAlias } from '../utils/aliasGenerator'
import useAuth from './useAuth'

export default function useAnonymousAlias() {
  const { currentUser } = useAuth()

  const alias = useMemo(() => {
    if (!currentUser) return 'Anonymous'
    const sessionKey = `sh-alias-${currentUser.uid}`
    let stored = sessionStorage.getItem(sessionKey)
    if (!stored) {
      stored = generateAlias(`${currentUser.uid}-${Date.now()}`)
      sessionStorage.setItem(sessionKey, stored)
    }
    return stored
  }, [currentUser])

  return alias
}
