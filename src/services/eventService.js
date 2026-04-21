import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import { db } from './firebase'

export async function getEvents() {
  const q = query(collection(db, 'events'), orderBy('eventDate', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function getEventsByOrganiser(uid) {
  const q = query(
    collection(db, 'events'),
    where('organiserUid', '==', uid),
    orderBy('eventDate', 'asc')
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function createEvent(data) {
  return addDoc(collection(db, 'events'), {
    ...data,
    createdAt: serverTimestamp(),
  })
}

export async function updateEvent(id, data) {
  return updateDoc(doc(db, 'events', id), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteEvent(id) {
  return deleteDoc(doc(db, 'events', id))
}
