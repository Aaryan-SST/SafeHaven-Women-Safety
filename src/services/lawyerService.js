import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from './firebase'

export async function getLawyers() {
  const q = query(collection(db, 'lawyers'), orderBy('name'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function addLawyer(data) {
  return addDoc(collection(db, 'lawyers'), {
    ...data,
    rating: 0,
    reviewCount: 0,
    createdAt: serverTimestamp(),
  })
}

export async function updateLawyer(id, data) {
  return updateDoc(doc(db, 'lawyers', id), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteLawyer(id) {
  return deleteDoc(doc(db, 'lawyers', id))
}

export async function submitConsultationRequest(data) {
  return addDoc(collection(db, 'consultationRequests'), {
    ...data,
    status: 'pending',
    createdAt: serverTimestamp(),
  })
}

export async function getConsultationRequests(lawyerId) {
  const snap = await getDocs(collection(db, 'consultationRequests'))
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .filter((r) => r.lawyerId === lawyerId)
}

export async function updateConsultationStatus(requestId, status) {
  return updateDoc(doc(db, 'consultationRequests', requestId), { status })
}
