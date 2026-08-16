// Small wrapper around localStorage so the rest of the app
// never has to think about JSON.stringify / JSON.parse or missing keys.

export const STORAGE_KEYS = {
  USERS: 'po_users',
  POSTS: 'po_posts',
  CURRENT_USER: 'po_current_user',
  SEEDED: 'po_seeded_v1'
}

export function getItem(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch (err) {
    console.error(`Failed to read "${key}" from localStorage`, err)
    return fallback
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.error(`Failed to write "${key}" to localStorage`, err)
  }
}

export function removeItem(key) {
  localStorage.removeItem(key)
}
