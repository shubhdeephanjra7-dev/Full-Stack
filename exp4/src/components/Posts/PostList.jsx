import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPostsByStatus } from '../../store/postsSlice';
import { STATUSES } from '../../data/samplePosts';
import PostCard from './PostCard';

const TABS = ['All', ...STATUSES];

// Compact management panel for viewing posts by status (Scheduled, Done,
// Draft, Posted). Kept separate from the calendar grid so it doesn't
// duplicate the calendar UI, per the "keep this compact" requirement.
export default function PostList({ onEdit, onDelete }) {
  const [tab, setTab] = useState('All');
  const posts = useSelector((state) => selectPostsByStatus(state, tab));

  const sorted = useMemo(
    () => [...posts].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)),
    [posts],
  );

  return (
    <section className="post-list" aria-label="Posts by status">
      <div className="post-list__tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            className={`tab ${tab === t ? 'tab--active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <ul className="post-list__items">
        {sorted.length === 0 && <li className="post-list__empty">No posts in this view.</li>}
        {sorted.map((post) => (
          <PostCard key={post.id} post={post} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </ul>
    </section>
  );
}
