import { createContext, useContext, useEffect, useState } from 'react'
import { DUMMY_USERS } from '../data/dummyData'
import { STORAGE_KEYS, getItem, setItem, removeItem } from '../utils/storage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let storedUsers = getItem(STORAGE_KEYS.USERS)
    if (!storedUsers || storedUsers.length === 0) {
      storedUsers = DUMMY_USERS
      setItem(STORAGE_KEYS.USERS, storedUsers)
    }
    setUsers(storedUsers)

    const storedCurrentUser = getItem(STORAGE_KEYS.CURRENT_USER)
    if (storedCurrentUser) setCurrentUser(storedCurrentUser)

    setIsReady(true)
  }, [])

  function login({ email, password, role }) {
    const match = users.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === password &&
        u.role === role
    )
    if (!match) {
      return { success: false, message: 'Invalid email, password, or role.' }
    }
    setCurrentUser(match)
    setItem(STORAGE_KEYS.CURRENT_USER, match)
    return { success: true, user: match }
  }

  function logout() {
    setCurrentUser(null)
    removeItem(STORAGE_KEYS.CURRENT_USER)
  }

  function getAdminById(adminId) {
    return users.find((u) => u.id === adminId)
  }

  function getCollaboratorsForAdmin(adminId) {
    return users.filter((u) => u.role === 'collaborator' && u.adminId === adminId)
  }

  const value = {
    users,
    currentUser,
    isReady,
    login,
    logout,
    getAdminById,
    getCollaboratorsForAdmin
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
