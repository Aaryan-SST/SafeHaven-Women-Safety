import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from './firebase'

export async function getPlatformAnalytics() {
  const [usersSnap, reportsSnap, postsSnap, articlesSnap] = await Promise.all([
    getDocs(collection(db, 'users')),
    getDocs(collection(db, 'incidentReports')),
    getDocs(collection(db, 'forumPosts')),
    getDocs(query(collection(db, 'articles'), where('isPublished', '==', true))),
  ])

  const users = usersSnap.docs.map((d) => d.data())
  const reports = reportsSnap.docs.map((d) => d.data())
  const posts = postsSnap.docs.map((d) => d.data())

  const reportsByType = reports.reduce((acc, r) => {
    acc[r.incidentType] = (acc[r.incidentType] || 0) + 1
    return acc
  }, {})

  return {
    totalUsers: users.length,
    citizens: users.filter((u) => u.role === 'citizen').length,
    ngos: users.filter((u) => u.role === 'ngo' && u.isApproved).length,
    pendingNGOs: users.filter((u) => u.role === 'ngo' && !u.isApproved).length,
    totalReports: reports.length,
    pendingReports: reports.filter((r) => r.status === 'pending').length,
    resolvedReports: reports.filter((r) => r.status === 'resolved').length,
    totalForumPosts: posts.length,
    publishedArticles: articlesSnap.size,
    reportsByType,
  }
}
