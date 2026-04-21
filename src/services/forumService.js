import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  increment,
  serverTimestamp,
  limit,
} from 'firebase/firestore'
import { db } from './firebase'

export function subscribeToChannelPosts(channelId, callback) {
  const q = query(
    collection(db, 'forumPosts'),
    where('channelId', '==', channelId),
    where('isRemoved', '==', false),
    orderBy('createdAt', 'desc'),
    limit(50)
  )
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  })
}

export async function getChannelPosts(channelId) {
  const q = query(
    collection(db, 'forumPosts'),
    where('channelId', '==', channelId),
    where('isRemoved', '==', false),
    orderBy('createdAt', 'desc'),
    limit(50)
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function createPost(data) {
  return addDoc(collection(db, 'forumPosts'), {
    ...data,
    upvotes: 0,
    upvotedBy: [],
    isReported: false,
    reportCount: 0,
    isRemoved: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function upvotePost(postId, uid) {
  return updateDoc(doc(db, 'forumPosts', postId), {
    upvotes: increment(1),
    upvotedBy: arrayUnion(uid),
  })
}

export async function removeUpvotePost(postId, uid) {
  return updateDoc(doc(db, 'forumPosts', postId), {
    upvotes: increment(-1),
    upvotedBy: arrayRemove(uid),
  })
}

export async function reportPost(postId) {
  return updateDoc(doc(db, 'forumPosts', postId), {
    reportCount: increment(1),
    isReported: true,
  })
}

export async function removePost(postId) {
  return updateDoc(doc(db, 'forumPosts', postId), { isRemoved: true })
}

export async function getComments(postId) {
  const q = query(
    collection(db, 'forumComments'),
    where('postId', '==', postId),
    where('isRemoved', '==', false),
    orderBy('createdAt', 'asc')
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function createComment(data) {
  return addDoc(collection(db, 'forumComments'), {
    ...data,
    upvotes: 0,
    upvotedBy: [],
    isReported: false,
    isRemoved: false,
    createdAt: serverTimestamp(),
  })
}

export async function upvoteComment(commentId, uid) {
  return updateDoc(doc(db, 'forumComments', commentId), {
    upvotes: increment(1),
    upvotedBy: arrayUnion(uid),
  })
}

export async function reportComment(commentId) {
  return updateDoc(doc(db, 'forumComments', commentId), {
    reportCount: increment(1),
    isReported: true,
  })
}

export async function removeComment(commentId) {
  return updateDoc(doc(db, 'forumComments', commentId), { isRemoved: true })
}

export async function getReportedPosts() {
  const q = query(
    collection(db, 'forumPosts'),
    where('isReported', '==', true),
    where('isRemoved', '==', false)
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}
