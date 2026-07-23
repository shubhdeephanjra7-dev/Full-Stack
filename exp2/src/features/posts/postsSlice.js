// Purpose: Redux slice to manage post data (CRUD operations)
// Explanation: This slice handles adding, updating, and deleting posts

import { createSlice } from '@reduxjs/toolkit';

// Initial state for posts (normalized - references platformId instead of platform name)
const initialState = [
  { id: 1, title: 'First Post', content: 'Hello world!', platformId: 1 },
  { id: 2, title: 'Second Post', content: 'Redux is fun', platformId: 2 },
  { id: 3, title: 'Third Post', content: 'React is awesome', platformId: 3 }
];

// Create slice for posts
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
    updatePost: (state, action) => {
      const index = state.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deletePost: (state, action) => {
      return state.filter(post => post.id !== action.payload);
    }
  }
});

export const { addPost, updatePost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
