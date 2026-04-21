import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore'
import { db } from './firebase'

export async function createReport(data) {
  return addDoc(collection(db, 'incidentReports'), {
    ...data,
    status: 'pending',
    assignedTo: null,
    ngoNotes: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function getReportsByUser(uid) {
  const q = query(
    collection(db, 'incidentReports'),
    where('reportedBy', '==', uid),
    orderBy('createdAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function getAllReports(statusFilter = null) {
  let q = query(collection(db, 'incidentReports'), orderBy('createdAt', 'desc'))
  if (statusFilter) {
    q = query(
      collection(db, 'incidentReports'),
      where('status', '==', statusFilter),
      orderBy('createdAt', 'desc')
    )
  }
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function getAssignedReports(ngoUid) {
  const q = query(
    collection(db, 'incidentReports'),
    where('assignedTo', '==', ngoUid),
    orderBy('createdAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function updateReportStatus(reportId, status, notes) {
  return updateDoc(doc(db, 'incidentReports', reportId), {
    status,
    ngoNotes: notes || null,
    updatedAt: serverTimestamp(),
  })
}

export async function assignReportToNGO(reportId, ngoUid) {
  return updateDoc(doc(db, 'incidentReports', reportId), {
    assignedTo: ngoUid,
    status: 'assigned',
    updatedAt: serverTimestamp(),
  })
}

export function subscribeToReports(callback) {
  const q = query(
    collection(db, 'incidentReports'),
    where('status', '!=', 'closed'),
    orderBy('status'),
    orderBy('createdAt', 'desc')
  )
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  })
}

export async function getReportStats() {
  const snap = await getDocs(collection(db, 'incidentReports'))
  const reports = snap.docs.map((d) => d.data())
  return {
    total: reports.length,
    pending: reports.filter((r) => r.status === 'pending').length,
    assigned: reports.filter((r) => r.status === 'assigned').length,
    resolved: reports.filter((r) => r.status === 'resolved').length,
  }
}
