import { doc, getDoc, setDoc, serverTimestamp, collection, addDoc } from 'firebase/firestore'
import { db } from './firebase'
import { buildWhatsAppLinks, buildTestWhatsAppLinks } from '../utils/whatsappHelper'

export async function getSOSContacts(uid) {
  const snap = await getDoc(doc(db, 'sosContacts', uid))
  return snap.exists() ? snap.data() : { contacts: [], alertMessage: '' }
}

export async function saveSOSContacts(uid, contacts, alertMessage) {
  return setDoc(
    doc(db, 'sosContacts', uid),
    { uid, contacts, alertMessage, updatedAt: serverTimestamp() },
    { merge: true }
  )
}

export async function logSOSEvent(uid, coords) {
  return addDoc(collection(db, 'sosEvents'), {
    uid,
    coords: coords ? { lat: coords.latitude, lng: coords.longitude } : null,
    triggeredAt: serverTimestamp(),
  })
}

export function getWhatsAppLinks(contacts, alertMessage, coords) {
  return buildWhatsAppLinks(contacts, alertMessage, coords)
}

export function getTestWhatsAppLinks(contacts, alertMessage) {
  return buildTestWhatsAppLinks(contacts, alertMessage)
}
