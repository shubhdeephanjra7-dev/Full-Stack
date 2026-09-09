import { memo } from 'react';
import Button from '../UI/Button';

function PostCard({ post, onEdit, onDelete }) {
  return (
    <li className="post-card" data-testid={`postcard-${post.id}`}>
      <div className="post-card__info">
        <span className="post-card__title">{post.title}</span>
        <span className="post-card__meta">
          {post.date} · {post.time} · {post.platform}
        </span>
      </div>
      <span className={`status-pill status-pill--${post.status.toLowerCase()}`}>
        {post.status}
      </span>
      <div className="post-card__actions">
        <Button variant="ghost" onClick={() => onEdit(post.id)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => onDelete(post.id)}>
          Delete
        </Button>
      </div>
    </li>
  );
}

export default memo(PostCard);
