import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './postsSlice'

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: {
      posts: postsReducer
    },
    preloadedState
  })
}

export default setupStore()
