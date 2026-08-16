import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ allowedRoles, children }) {
  const { currentUser, isReady } = useAuth()

  if (!isReady) return null

  if (!currentUser) return <Navigate to="/" replace />

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />
  }

  return children
}
