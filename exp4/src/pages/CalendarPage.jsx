import React, { useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CalendarView, { postToEvent } from '../components/CalendarView'
import FilterBar from '../components/FilterBar'
import PostModal from '../components/PostModal'
import {
  selectPost,
  clearSelectedPost,
  deletePost,
  reschedulePost,
  setPlatformFilter,
  setStatusFilter
} from '../redux/postsSlice'

function CalendarPage({ onCloseAdd, onRequestEdit }) {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts.posts)
  const selectedPost = useSelector((state) => state.posts.selectedPost)
  const platformFilter = useSelector((state) => state.posts.filters.platform)
  const statusFilter = useSelector((state) => state.posts.filters.status)

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const platformMatch = platformFilter === 'All' || post.platform === platformFilter
      const statusMatch = statusFilter === 'All' || post.status === statusFilter
      return platformMatch && statusMatch
    })
  }, [posts, platformFilter, statusFilter])

  const calendarEvents = useMemo(() => {
    return filteredPosts.map((post) => postToEvent(post))
  }, [filteredPosts])

  const handleEventClick = useCallback((postId) => {
    const post = posts.find((p) => p.id === postId)
    if (post) {
      dispatch(selectPost(post))
    }
  }, [posts, dispatch])

  const handleEventDrop = useCallback((postId, newDate, newTime) => {
    dispatch(reschedulePost({ id: postId, date: newDate, time: newTime }))
  }, [dispatch])

  const handlePlatformChange = useCallback((value) => {
    dispatch(setPlatformFilter(value))
  }, [dispatch])

  const handleStatusChange = useCallback((value) => {
    dispatch(setStatusFilter(value))
  }, [dispatch])

  const handleDelete = useCallback((id) => {
    dispatch(deletePost(id))
  }, [dispatch])

  const handleCloseSelected = useCallback(() => {
    dispatch(clearSelectedPost())
  }, [dispatch])

  const handleSwitchToEdit = useCallback(() => {
    if (selectedPost) {
      onRequestEdit(selectedPost)
      dispatch(clearSelectedPost())
    }
  }, [selectedPost, onRequestEdit, dispatch])

  return (
    <div className="calendar-page" data-testid="calendar-page">
      <div className="page-header">
        <h2 className="page-title">Content Calendar</h2>
        <p className="page-subtitle">Manage and reschedule your posts with drag &amp; drop.</p>
      </div>

      <FilterBar
        platformFilter={platformFilter}
        statusFilter={statusFilter}
        onPlatformChange={handlePlatformChange}
        onStatusChange={handleStatusChange}
      />

      <div className="card calendar-card">
        <CalendarView
          events={calendarEvents}
          onEventClick={handleEventClick}
          onEventDrop={handleEventDrop}
        />
      </div>

      <PostModal
        isOpen={!!selectedPost}
        mode="details"
        initialData={selectedPost}
        onClose={handleCloseSelected}
        onSave={(modeArg) => {
          if (modeArg === 'edit') {
            handleSwitchToEdit()
          }
        }}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default CalendarPage
