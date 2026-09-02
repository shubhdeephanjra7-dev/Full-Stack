import { createSlice } from '@reduxjs/toolkit'
import { initialPosts } from '../data/initialPosts'

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: initialPosts,
    selectedPost: null,
    filters: {
      platform: 'All',
      status: 'All'
    },
    toast: null
  },
  reducers: {
    addPost: (state, action) => {
      state.posts.push({
        ...action.payload,
        id: Date.now()
      })
      state.toast = { message: 'Post created successfully.', type: 'success' }
    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex(p => p.id === action.payload.id)
      if (index !== -1) {
        state.posts[index] = { ...state.posts[index], ...action.payload }
        state.toast = { message: 'Post updated successfully.', type: 'success' }
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(p => p.id !== action.payload)
      state.selectedPost = null
      state.toast = { message: 'Post deleted successfully.', type: 'danger' }
    },
    selectPost: (state, action) => {
      state.selectedPost = action.payload
    },
    clearSelectedPost: (state) => {
      state.selectedPost = null
    },
    reschedulePost: (state, action) => {
      const { id, date, time } = action.payload
      const index = state.posts.findIndex(p => p.id === id)
      if (index !== -1) {
        state.posts[index] = { ...state.posts[index], date, time }
        state.toast = { message: 'Post rescheduled successfully.', type: 'success' }
      }
    },
    setPlatformFilter: (state, action) => {
      state.filters.platform = action.payload
    },
    setStatusFilter: (state, action) => {
      state.filters.status = action.payload
    },
    clearToast: (state) => {
      state.toast = null
    }
  }
})

export const {
  addPost,
  updatePost,
  deletePost,
  selectPost,
  clearSelectedPost,
  reschedulePost,
  setPlatformFilter,
  setStatusFilter,
  clearToast
} = postsSlice.actions

export default postsSlice.reducer
