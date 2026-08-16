import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import AdminPosts from './pages/AdminPosts'
import AdminCreatePost from './pages/AdminCreatePost'
import CollaboratorDashboard from './pages/CollaboratorDashboard'
import CollaboratorUpload from './pages/CollaboratorUpload'
import UserDashboard from './pages/UserDashboard'
import ProtectedRoute from './components/ProtectedRoute'

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Login /></PageWrapper>} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PageWrapper><AdminDashboard /></PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/posts"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PageWrapper><AdminPosts /></PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PageWrapper><AdminCreatePost /></PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/collaborator"
            element={
              <ProtectedRoute allowedRoles={['collaborator']}>
                <PageWrapper><CollaboratorDashboard /></PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/collaborator/upload"
            element={
              <ProtectedRoute allowedRoles={['collaborator']}>
                <PageWrapper><CollaboratorUpload /></PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <PageWrapper><UserDashboard /></PageWrapper>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        toastClassName="!rounded-2xl"
      />
    </>
  )
}
