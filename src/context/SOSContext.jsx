import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getSOSContacts, saveSOSContacts, logSOSEvent, getWhatsAppLinks, getTestWhatsAppLinks } from '../services/sosService'
import { DEFAULT_ALERT_MESSAGE } from '../utils/constants'
import { useAuthContext } from './AuthContext'

const SOSContext = createContext(null)

export function SOSProvider({ children }) {
  const { currentUser } = useAuthContext()
  const [contacts, setContacts] = useState([])
  const [alertMessage, setAlertMessage] = useState(DEFAULT_ALERT_MESSAGE)
  const [sosLoading, setSosLoading] = useState(false)
  const [lastTriggered, setLastTriggered] = useState(null)

  useEffect(() => {
    if (!currentUser) {
      setContacts([])
      setAlertMessage(DEFAULT_ALERT_MESSAGE)
      return
    }
    getSOSContacts(currentUser.uid).then((data) => {
      if (data.contacts?.length) setContacts(data.contacts)
      if (data.alertMessage) setAlertMessage(data.alertMessage)
    })
  }, [currentUser])

  async function saveContacts(newContacts, newMessage) {
    if (!currentUser) return
    setSosLoading(true)
    await saveSOSContacts(currentUser.uid, newContacts, newMessage)
    setContacts(newContacts)
    setAlertMessage(newMessage)
    setSosLoading(false)
  }

  const triggerSOS = useCallback(
    (coords = null) => {
      if (!contacts.length) return
      const links = getWhatsAppLinks(contacts, alertMessage, coords)
      links.forEach((link) => {
        window.open(link.url, '_blank', 'noopener,noreferrer')
      })
      setLastTriggered(new Date())
      if (currentUser) logSOSEvent(currentUser.uid, coords)
    },
    [contacts, alertMessage, currentUser]
  )

  const testSOS = useCallback(() => {
    if (!contacts.length) return
    const links = getTestWhatsAppLinks(contacts, alertMessage)
    links.forEach((link) => {
      window.open(link.url, '_blank', 'noopener,noreferrer')
    })
  }, [contacts, alertMessage])

  return (
    <SOSContext.Provider
      value={{
        contacts,
        alertMessage,
        sosLoading,
        lastTriggered,
        saveContacts,
        triggerSOS,
        testSOS,
      }}
    >
      {children}
    </SOSContext.Provider>
  )
}

export function useSOSContext() {
  const ctx = useContext(SOSContext)
  if (!ctx) throw new Error('useSOSContext must be used inside SOSProvider')
  return ctx
}
