import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'

export async function createUserDocument(uid, data) {
  return setDoc(doc(db, 'users', uid), {
    uid,
    ...data,
    createdAt: serverTimestamp(),
  })
}

export async function getUserDocument(uid) {
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() ? snap.data() : null
}

export async function updateUserDocument(uid, data) {
  return updateDoc(doc(db, 'users', uid), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function getPendingNGOs() {
  const q = query(
    collection(db, 'users'),
    where('role', '==', 'ngo'),
    where('isApproved', '==', false)
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => d.data())
}

export async function getApprovedNGOs() {
  const q = query(
    collection(db, 'users'),
    where('role', '==', 'ngo'),
    where('isApproved', '==', true)
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => d.data())
}

export async function approveNGO(uid) {
  return updateDoc(doc(db, 'users', uid), { isApproved: true })
}

export async function rejectNGO(uid) {
  return updateDoc(doc(db, 'users', uid), {
    isApproved: false,
    isRejected: true,
    rejectedAt: serverTimestamp(),
  })
}

export async function getAllUsers() {
  const snap = await getDocs(collection(db, 'users'))
  return snap.docs.map((d) => d.data())
}

export async function getPlatformStats() {
  const snap = await getDocs(collection(db, 'users'))
  const users = snap.docs.map((d) => d.data())
  return {
    totalUsers: users.length,
    citizens: users.filter((u) => u.role === 'citizen').length,
    ngos: users.filter((u) => u.role === 'ngo' && u.isApproved).length,
  }
}
