// Purpose: Component to display list of posts with title, content, platform name
// Explanation: Gets posts and platforms from store, finds platform by platformId

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePost, deletePost } from '../features/posts/postsSlice';

function PostList() {
  const posts = useSelector(state => state.posts);
  const platforms = useSelector(state => state.platforms);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editPlatformId, setEditPlatformId] = useState('');

  // Helper function to get platform name by id
  const getPlatformName = (id) => {
    const platform = platforms.find(p => p.id === id);
    return platform ? platform.name : 'Unknown';
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditPlatformId(post.platformId);
  };

  const handleUpdate = () => {
    dispatch(updatePost({
      id: editingId,
      title: editTitle,
      content: editContent,
      platformId: Number(editPlatformId)
    }));
    setEditingId(null);
  };

  return (
    <div className="post-list">
      <h3>Posts List</h3>
      <ul>
        {posts.map(post => (
          <li key={post.id} className="post-item">
            {editingId === post.id ? (
              <div>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                ></textarea>
                <select
                  value={editPlatformId}
                  onChange={(e) => setEditPlatformId(e.target.value)}
                >
                  {platforms.map(platform => (
                    <option key={platform.id} value={platform.id}>
                      {platform.name}
                    </option>
                  ))}
                </select>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <h4>{post.title}</h4>
                <p>{post.content}</p>
                <p><strong>Platform:</strong> {getPlatformName(post.platformId)}</p>
                <button onClick={() => handleEdit(post)}>Edit</button>
                <button onClick={() => dispatch(deletePost(post.id))}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
