// Purpose: Configure Redux store and combine all slices
// Explanation: This is the centralized store that holds all application state

import { configureStore } from '@reduxjs/toolkit';
// Import both reducers from their slices
import postsReducer from '../features/posts/postsSlice';
import platformsReducer from '../features/platforms/platformsSlice';

// Configure the store
export const store = configureStore({
  reducer: {
    // Add posts reducer to store
    posts: postsReducer,
    // Add platforms reducer to store
    platforms: platformsReducer
  }
});
