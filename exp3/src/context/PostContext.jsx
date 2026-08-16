import { createContext, useContext, useEffect, useState } from 'react'
import { buildDummyPosts } from '../data/dummyData'
import { STORAGE_KEYS, getItem, setItem } from '../utils/storage'

const PostContext = createContext(null)

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let storedPosts = getItem(STORAGE_KEYS.POSTS)
    if (!storedPosts || storedPosts.length === 0) {
      storedPosts = buildDummyPosts()
      setItem(STORAGE_KEYS.POSTS, storedPosts)
    }
    setPosts(storedPosts)
    setIsReady(true)
  }, [])

  function persist(nextPosts) {
    setPosts(nextPosts)
    setItem(STORAGE_KEYS.POSTS, nextPosts)
  }

  function createPost(post) {
    const newPost = {
      id: `post-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'published',
      ...post
    }
    persist([newPost, ...posts])
    return newPost
  }

  function updatePost(id, updates) {
    const next = posts.map((p) => (p.id === id ? { ...p, ...updates } : p))
    persist(next)
  }

  function deletePost(id) {
    persist(posts.filter((p) => p.id !== id))
  }

  const value = { posts, isReady, createPost, updatePost, deletePost }

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}

export function usePosts() {
  const ctx = useContext(PostContext)
  if (!ctx) throw new Error('usePosts must be used within a PostProvider')
  return ctx
}
