import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import CalendarPage from './pages/CalendarPage'
import PostModal from './components/PostModal'
import Toast from './components/Toast'
import {
  addPost,
  updatePost,
  deletePost,
  clearToast
} from './redux/postsSlice'

function App() {
  const dispatch = useDispatch()
  const [activePage, setActivePage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalData, setEditModalData] = useState(null)
  const toast = useSelector((state) => state.posts.toast)

  const handleToggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev)
  }, [])

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  const handlePageChange = useCallback((pageId) => {
    setActivePage(pageId)
  }, [])

  const handleAddClick = useCallback(() => {
    setEditModalData(null)
    setCreateModalOpen(true)
  }, [])

  const handleCreateSubmit = useCallback((formData) => {
    dispatch(addPost(formData))
    setCreateModalOpen(false)
  }, [dispatch])

  const handleRequestEdit = useCallback((post) => {
    setCreateModalOpen(false)
    setEditModalData(post)
  }, [])

  const handleEditSubmit = useCallback((formData) => {
    if (editModalData) {
      dispatch(updatePost({ id: editModalData.id, ...formData }))
      setEditModalData(null)
    }
  }, [dispatch, editModalData])

  const handleEditDelete = useCallback(() => {
    if (editModalData) {
      dispatch(deletePost(editModalData.id))
      setEditModalData(null)
    }
  }, [dispatch, editModalData])

  const handleCloseModal = useCallback(() => {
    setCreateModalOpen(false)
    setEditModalData(null)
  }, [])

  const handleToastClose = useCallback(() => {
    dispatch(clearToast())
  }, [dispatch])

  const renderPlaceholder = (title) => (
    <div className="placeholder-page card">
      <h2 className="page-title">{title}</h2>
      <p className="text-muted">
        This page is a placeholder. Calendar and Dashboard are fully functional.
      </p>
    </div>
  )

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard onNavigateToCalendar={() => setActivePage('calendar')} />
      case 'calendar':
        return (
          <CalendarPage
            isAddOpen={null}
            onCloseAdd={handleCloseModal}
            onRequestEdit={handleRequestEdit}
          />
        )
      case 'posts':
        return renderPlaceholder('Posts')
      case 'analytics':
        return renderPlaceholder('Analytics')
      default:
        return renderPlaceholder('Dashboard')
    }
  }

  return (
    <div className="app-layout" data-testid="app-layout">
      <Sidebar
        activePage={activePage}
        onPageChange={handlePageChange}
        isOpen={sidebarOpen}
        onClose={handleCloseSidebar}
      />
      <div className="main-wrapper">
        <Header
          onToggleSidebar={handleToggleSidebar}
          onAddClick={handleAddClick}
        />
        <main className="main-content">
          {renderPage()}
        </main>
      </div>

      <PostModal
        isOpen={createModalOpen}
        mode="create"
        onClose={handleCloseModal}
        onSave={handleCreateSubmit}
      />

      <PostModal
        isOpen={!!editModalData}
        mode="edit"
        initialData={editModalData}
        onClose={handleCloseModal}
        onSave={handleEditSubmit}
        onDelete={handleEditDelete}
      />

      <Toast toast={toast} onClose={handleToastClose} />
    </div>
  )
}

export default App
