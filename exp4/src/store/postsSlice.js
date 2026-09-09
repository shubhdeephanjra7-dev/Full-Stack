import { createSlice, nanoid } from '@reduxjs/toolkit';
import { samplePosts } from '../data/samplePosts';

const initialState = {
  items: samplePosts,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare({ title, description, date, time, platform, status }) {
        return {
          payload: {
            id: nanoid(),
            title,
            description: description || '',
            date,
            time,
            platform: platform || 'Instagram',
            status: status || 'Scheduled',
          },
        };
      },
    },

    updatePost(state, action) {
      const { id, changes } = action.payload;
      const post = state.items.find((p) => p.id === id);
      if (post) {
        Object.assign(post, changes);
      }
    },

    deletePost(state, action) {
      const id = action.payload;
      state.items = state.items.filter((p) => p.id !== id);
    },

    // Moves a post to a new date (and optionally a new time), e.g. via drag-and-drop.
    movePost(state, action) {
      const { id, date, time } = action.payload;
      const post = state.items.find((p) => p.id === id);
      if (post) {
        post.date = date;
        if (time !== undefined) post.time = time;
      }
    },

    updatePostStatus(state, action) {
      const { id, status } = action.payload;
      const post = state.items.find((p) => p.id === id);
      if (post) {
        post.status = status;
      }
    },
  },
});

export const { addPost, updatePost, deletePost, movePost, updatePostStatus } =
  postsSlice.actions;

export default postsSlice.reducer;

// ---- Selectors ----

export const selectAllPosts = (state) => state.posts.items;

export const selectPostsByDate = (state, date) =>
  state.posts.items.filter((p) => p.date === date);

export const selectPostsByStatus = (state, status) =>
  status === 'All'
    ? state.posts.items
    : state.posts.items.filter((p) => p.status === status);
