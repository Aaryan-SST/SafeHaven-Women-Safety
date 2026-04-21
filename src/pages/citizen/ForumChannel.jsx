import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageWrapper from '../../components/layout/PageWrapper'
import ChannelList from '../../components/forum/ChannelList'
import PostCard from '../../components/forum/PostCard'
import PostComposer from '../../components/forum/PostComposer'
import SearchBar from '../../components/shared/SearchBar'
import EmptyState from '../../components/shared/EmptyState'
import Spinner from '../../components/shared/Spinner'
import { subscribeToChannelPosts } from '../../services/forumService'
import useForumSearch from '../../hooks/useForumSearch'
import { FORUM_CHANNELS } from '../../utils/constants'

export default function ForumChannel() {
  const { channelId } = useParams()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const { query, setQuery, filteredPosts } = useForumSearch(posts)

  const channel = FORUM_CHANNELS.find((c) => c.id === channelId)

  useEffect(() => {
    setLoading(true)
    const unsub = subscribeToChannelPosts(channelId, (data) => {
      setPosts(data)
      setLoading(false)
    })
    return unsub
  }, [channelId])

  if (!channel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">Channel not found</p>
          <Link to="/forum" className="text-rose-600 hover:underline text-sm">← Back to Forum</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <PageWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <ChannelList />
          </aside>

          <div className="lg:col-span-3">
            {/* Channel Header */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl">{channel.icon}</span>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">{channel.name}</h1>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{channel.description}</p>
            </div>

            {/* Composer */}
            <PostComposer channelId={channelId} />

            {/* Search */}
            <div className="mt-4 mb-4">
              <SearchBar value={query} onChange={setQuery} placeholder="Search posts..." />
            </div>

            {/* Posts */}
            {loading ? (
              <div className="flex justify-center py-16"><Spinner size="lg" className="text-rose-500" /></div>
            ) : filteredPosts.length === 0 ? (
              <EmptyState
                icon={channel.icon}
                title={posts.length === 0 ? 'Be the first to post!' : 'No posts match your search'}
                description={posts.length === 0 ? 'Share your thoughts, experiences, or questions in this channel.' : 'Try different search terms.'}
              />
            ) : (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} canModerate={false} />
                ))}
              </div>
            )}
          </div>
        </div>
      </PageWrapper>
      <Footer />
    </>
  )
}
