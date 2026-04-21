import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'

export async function getPublishedArticles(category = null) {
  let q = query(
    collection(db, 'articles'),
    where('isPublished', '==', true),
    orderBy('createdAt', 'desc')
  )
  const snap = await getDocs(q)
  const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  if (category) return all.filter((a) => a.category === category)
  return all
}

export async function getAllArticles() {
  const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function getArticleById(id) {
  const snap = await getDoc(doc(db, 'articles', id))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function createArticle(data) {
  return addDoc(collection(db, 'articles'), {
    ...data,
    isPublished: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateArticle(id, data) {
  return updateDoc(doc(db, 'articles', id), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function togglePublish(id, current) {
  return updateDoc(doc(db, 'articles', id), {
    isPublished: !current,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteArticle(id) {
  return deleteDoc(doc(db, 'articles', id))
}
