import {
  doc,
  getDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'

export async function getBookmarks(uid) {
  const snap = await getDoc(doc(db, 'bookmarks', uid))
  return snap.exists() ? snap.data() : { articleIds: [], helplineIds: [] }
}

export async function toggleArticleBookmark(uid, articleId, isCurrentlyBookmarked) {
  return setDoc(
    doc(db, 'bookmarks', uid),
    {
      uid,
      articleIds: isCurrentlyBookmarked ? arrayRemove(articleId) : arrayUnion(articleId),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  )
}

export async function toggleHelplineBookmark(uid, helplineId, isCurrentlyBookmarked) {
  return setDoc(
    doc(db, 'bookmarks', uid),
    {
      uid,
      helplineIds: isCurrentlyBookmarked ? arrayRemove(helplineId) : arrayUnion(helplineId),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  )
}
