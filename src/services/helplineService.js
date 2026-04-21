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
} from 'firebase/firestore'
import { db } from './firebase'

export async function getHelplines() {
  const q = query(collection(db, 'helplines'), orderBy('name'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function addHelpline(data) {
  return addDoc(collection(db, 'helplines'), {
    ...data,
    isActive: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateHelpline(id, data) {
  return updateDoc(doc(db, 'helplines', id), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteHelpline(id) {
  return deleteDoc(doc(db, 'helplines', id))
}
