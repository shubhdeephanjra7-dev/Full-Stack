import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import StatCard from '../components/StatCard'

const COLORS = {
  total: '#A8DADC',
  scheduled: '#CDB4DB',
  published: '#BDE0FE',
  draft: '#FFD6A5'
}

const ICONS = {
  total: '📋',
  scheduled: '⏰',
  published: '✅',
  draft: '📝'
}

function Dashboard({ onNavigateToCalendar }) {
  const posts = useSelector((state) => state.posts.posts)

  const statistics = useMemo(() => {
    const total = posts.length
    const scheduled = posts.filter((p) => p.status === 'Scheduled').length
    const published = posts.filter((p) => p.status === 'Published').length
    const draft = posts.filter((p) => p.status === 'Draft').length
    return { total, scheduled, published, draft }
  }, [posts])

  const upcomingPosts = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    return posts
      .filter((p) => p.date >= today && p.status !== 'Published')
      .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
      .slice(0, 5)
  }, [posts])

  const recentPublished = useMemo(() => {
    return posts
      .filter((p) => p.status === 'Published')
      .sort((a, b) => `${b.date}T${b.time}`.localeCompare(`${a.date}T${a.time}`))
      .slice(0, 5)
  }, [posts])

  return (
    <div className="dashboard" data-testid="dashboard">
      <div className="page-header">
        <h2 className="page-title">Dashboard Overview</h2>
        <p className="page-subtitle">Welcome back! Here's your content at a glance.</p>
      </div>

      <div className="stats-grid">
        <StatCard
          label="Total Posts"
          value={statistics.total}
          bgColor={COLORS.total}
          icon={ICONS.total}
        />
        <StatCard
          label="Scheduled"
          value={statistics.scheduled}
          bgColor={COLORS.scheduled}
          icon={ICONS.scheduled}
        />
        <StatCard
          label="Published"
          value={statistics.published}
          bgColor={COLORS.published}
          icon={ICONS.published}
        />
        <StatCard
          label="Drafts"
          value={statistics.draft}
          bgColor={COLORS.draft}
          icon={ICONS.draft}
        />
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel card">
          <div className="panel-header">
            <h3 className="panel-title">Upcoming Posts</h3>
            <button className="btn btn-secondary btn-sm" onClick={onNavigateToCalendar}>
              View Calendar
            </button>
          </div>
          <div className="panel-body">
            {upcomingPosts.length === 0 ? (
              <p className="text-muted">No upcoming posts scheduled.</p>
            ) : (
              <ul className="post-list" data-testid="upcoming-posts-list">
                {upcomingPosts.map((post) => (
                  <li key={post.id} className="post-list-item">
                    <div className="post-list-info">
                      <span className={`badge-platform-sm platform-${post.platform.toLowerCase().replace(/[^a-z]/g, '')}`}>
                        {post.platform}
                      </span>
                      <span className="post-list-title">{post.title}</span>
                    </div>
                    <span className="post-list-date">
                      {post.date} · {post.time}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="dashboard-panel card">
          <div className="panel-header">
            <h3 className="panel-title">Recently Published</h3>
          </div>
          <div className="panel-body">
            {recentPublished.length === 0 ? (
              <p className="text-muted">No posts published yet.</p>
            ) : (
              <ul className="post-list" data-testid="published-posts-list">
                {recentPublished.map((post) => (
                  <li key={post.id} className="post-list-item">
                    <div className="post-list-info">
                      <span className={`badge-platform-sm platform-${post.platform.toLowerCase().replace(/[^a-z]/g, '')}`}>
                        {post.platform}
                      </span>
                      <span className="post-list-title">{post.title}</span>
                    </div>
                    <span className="post-list-date">
                      {post.date}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
