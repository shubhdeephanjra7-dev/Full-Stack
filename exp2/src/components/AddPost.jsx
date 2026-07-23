// Purpose: Component to add a new post
// Explanation: Uses useSelector to get platforms, useDispatch to add post

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../features/posts/postsSlice';

function AddPost() {
  // Local state for form inputs
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [platformId, setPlatformId] = useState('');
  // Get platforms from store for dropdown
  const platforms = useSelector(state => state.platforms);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim() && platformId) {
      dispatch(addPost({
        id: Date.now(),
        title,
        content,
        platformId: Number(platformId)
      }));
      // Clear form
      setTitle('');
      setContent('');
      setPlatformId('');
    }
  };

  return (
    <div className="add-post">
      <h3>Add New Post</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <select
          value={platformId}
          onChange={(e) => setPlatformId(e.target.value)}
        >
          <option value="">Select Platform</option>
          {platforms.map(platform => (
            <option key={platform.id} value={platform.id}>
              {platform.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}

export default AddPost;
