import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

const platformColors = {
  'Instagram': { bg: '#CDB4DB', border: '#B598C9', text: '#343434' },
  'LinkedIn': { bg: '#BDE0FE', border: '#98C8EB', text: '#343434' },
  'Facebook': { bg: '#FFF1B6', border: '#E6D690', text: '#343434' },
  'Twitter/X': { bg: '#FFD6A5', border: '#E5BE8C', text: '#343434' }
}

const statusBadgeColors = {
  'Draft': '#E8E8E8',
  'Scheduled': '#A8DADC',
  'Published': '#BDE0FE'
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function PostsPage() {
  const posts = useSelector((state) => state.posts.posts)

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      const aKey = `${a.date}T${a.time}`
      const bKey = `${b.date}T${b.time}`
      return bKey.localeCompare(aKey)
    })
  }, [posts])

  if (posts.length === 0) {
    return (
      <div className="posts-page">
        <div className="page-header">
          <h2 className="page-title">Posts</h2>
          <p className="page-subtitle">Manage and view all your content.</p>
        </div>
        <div className="card empty-state">
          <p className="text-muted">No posts created yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="posts-page">
      <div className="page-header">
        <h2 className="page-title">Posts</h2>
        <p className="page-subtitle">{posts.length} total {posts.length === 1 ? 'post' : 'posts'}.</p>
      </div>
      <div className="posts-grid" data-testid="posts-grid">
        {sortedPosts.map((post) => {
          const pColors = platformColors[post.platform] || { bg: '#A8DADC', text: '#343434' }
          const sColor = statusBadgeColors[post.status] || '#E8E8E8'
          return (
            <article key={post.id} className="post-card card">
              <header className="post-card-header">
                <span
                  className="badge badge-platform"
                  style={{ backgroundColor: pColors.bg }}
                >
                  {post.platform}
                </span>
                <span
                  className="badge badge-status"
                  style={{ backgroundColor: sColor }}
                >
                  {post.status}
                </span>
              </header>
              <h3 className="post-card-title">{post.title}</h3>
              {post.description && (
                <p className="post-card-desc">{post.description}</p>
              )}
              <footer className="post-card-footer">
                <div className="post-card-meta">
                  <span className="post-meta-item">📅 {formatDate(post.date)}</span>
                  <span className="post-meta-item">🕐 {post.time}</span>
                </div>
              </footer>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default PostsPage
