import { describe, it, expect } from 'vitest'
import postsReducer, {
  addPost,
  updatePost,
  deletePost,
  selectPost,
  clearSelectedPost,
  reschedulePost,
  setPlatformFilter,
  setStatusFilter,
  clearToast
} from '../redux/postsSlice'

const samplePost = {
  id: 1,
  title: 'Test Post',
  platform: 'Instagram',
  date: '2026-09-05',
  time: '10:00',
  status: 'Scheduled',
  description: 'Test description'
}

const initialState = {
  posts: [samplePost],
  selectedPost: null,
  filters: { platform: 'All', status: 'All' },
  toast: null
}

describe('postsSlice', () => {
  it('should return the initial state', () => {
    expect(postsReducer(undefined, { type: undefined })).toEqual({
      posts: expect.any(Array),
      selectedPost: null,
      filters: { platform: 'All', status: 'All' },
      toast: null
    })
  })

  it('should handle addPost and assign an id + toast', () => {
    const newPost = {
      title: 'New Post',
      platform: 'LinkedIn',
      date: '2026-10-01',
      time: '09:00',
      status: 'Draft',
      description: 'Desc'
    }
    const state = postsReducer(initialState, addPost(newPost))
    expect(state.posts.length).toBe(2)
    expect(state.posts[1].title).toBe('New Post')
    expect(state.posts[1].id).toBeDefined()
    expect(state.toast.message).toContain('created')
  })

  it('should handle updatePost', () => {
    const state = postsReducer(initialState, updatePost({ id: 1, title: 'Updated Title' }))
    expect(state.posts[0].title).toBe('Updated Title')
    expect(state.posts[0].platform).toBe('Instagram')
    expect(state.toast.message).toContain('updated')
  })

  it('should handle deletePost and clear selected', () => {
    const stateWithSelected = { ...initialState, selectedPost: samplePost }
    const state = postsReducer(stateWithSelected, deletePost(1))
    expect(state.posts.length).toBe(0)
    expect(state.selectedPost).toBeNull()
    expect(state.toast.message).toContain('deleted')
  })

  it('should handle selectPost and clearSelectedPost', () => {
    let state = postsReducer(initialState, selectPost(samplePost))
    expect(state.selectedPost).toEqual(samplePost)
    state = postsReducer(state, clearSelectedPost())
    expect(state.selectedPost).toBeNull()
  })

  it('should handle reschedulePost (date and time)', () => {
    const state = postsReducer(initialState, reschedulePost({ id: 1, date: '2026-12-01', time: '14:00' }))
    expect(state.posts[0].date).toBe('2026-12-01')
    expect(state.posts[0].time).toBe('14:00')
    expect(state.toast.message).toContain('rescheduled')
  })

  it('should handle setPlatformFilter and setStatusFilter', () => {
    let state = postsReducer(initialState, setPlatformFilter('Instagram'))
    expect(state.filters.platform).toBe('Instagram')
    state = postsReducer(state, setStatusFilter('Draft'))
    expect(state.filters.status).toBe('Draft')
  })

  it('should handle clearToast', () => {
    const stateWithToast = { ...initialState, toast: { message: 'Hi', type: 'success' } }
    const state = postsReducer(stateWithToast, clearToast())
    expect(state.toast).toBeNull()
  })
})
